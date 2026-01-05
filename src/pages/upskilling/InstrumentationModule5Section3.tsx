import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, TrendingUp, BarChart, Settings, Zap, Brain, XCircle, Lightbulb, Users, Calculator } from 'lucide-react';
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

const InstrumentationModule5Section3 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does the I term fix?",
      options: [
        "Immediate response problems",
        "Steady-state errors and offset",
        "Overshoot problems",
        "Response speed issues"
      ],
      correctAnswer: 1,
      explanation: "The Integral term eliminates steady-state errors and offset by accumulating error over time and providing continuous correction until the error reaches zero."
    },
    {
      id: 2,
      question: "When is D useful?",
      options: [
        "When the system is too slow",
        "When there's steady-state error",
        "When there's overshoot and oscillation",
        "When the setpoint changes frequently"
      ],
      correctAnswer: 2,
      explanation: "Derivative action is most useful when there's overshoot and oscillation because it predicts future error based on rate of change and provides stabilizing action."
    },
    {
      id: 3,
      question: "What's the risk of too much P?",
      options: [
        "System becomes too slow",
        "Steady-state error increases",
        "System becomes unstable and oscillates",
        "Power consumption increases"
      ],
      correctAnswer: 2,
      explanation: "Excessive proportional gain makes the system unstable, causing oscillations and potentially leading to system instability as the controller overreacts to small errors."
    },
    {
      id: 4,
      question: "Can PID loops self-correct?",
      options: [
        "No, they require manual adjustment",
        "Yes, through the integral action",
        "Only with derivative action",
        "Only at steady state"
      ],
      correctAnswer: 1,
      explanation: "PID loops can self-correct primarily through integral action, which automatically adjusts the output to eliminate persistent errors over time."
    },
    {
      id: 5,
      question: "Why use all 3 terms?",
      options: [
        "It's always required by standards",
        "Each addresses different aspects of control performance",
        "It makes tuning easier",
        "It reduces system cost"
      ],
      correctAnswer: 1,
      explanation: "Each PID term addresses different aspects: P provides immediate response, I eliminates steady-state error, and D provides stability and reduces overshoot."
    },
    {
      id: 6,
      question: "What is the most common PID tuning method?",
      options: [
        "Trial and error",
        "Ziegler-Nichols method",
        "Computer simulation",
        "Manufacturer recommendations"
      ],
      correctAnswer: 1,
      explanation: "The Ziegler-Nichols method is the most widely used classical tuning method, providing systematic rules for determining PID parameters based on plant characteristics."
    },
    {
      id: 7,
      question: "What happens when integral windup occurs?",
      options: [
        "The system responds too quickly",
        "The controller output saturates and causes poor performance",
        "The derivative action becomes too strong",
        "The system becomes more stable"
      ],
      correctAnswer: 1,
      explanation: "Integral windup occurs when the integral term accumulates a large value during output saturation, causing poor control performance and excessive overshoot when conditions change."
    },
    {
      id: 8,
      question: "Which PID term responds to the rate of change of error?",
      options: [
        "Proportional",
        "Integral",
        "Derivative",
        "All three equally"
      ],
      correctAnswer: 2,
      explanation: "The Derivative term responds to the rate of change of error (de/dt), providing predictive action based on how quickly the error is changing."
    }
  ];

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
        <Link to="../instrumentation-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            PID Control Basics (Proportional, Integral, Derivative)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understand the three pillars of PID control and how they create precise automated systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Define each term in PID control and understand their mathematical relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Recognize the effects of P, I, and D on system behavior and performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Learn how tuning parameters impact stability and responsiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Apply real-world tuning methods and best practices</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PID Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Calculator className="h-5 w-5 text-yellow-400" />
                PID Control Algorithm Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">The PID Equation</h4>
                <p className="text-gray-300 mb-3">
                  The PID controller calculates an output value based on the weighted sum of three terms:
                </p>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <h5 className="text-blue-200 font-medium text-xl mb-3">Output = Kp × e + Ki × ∫e dt + Kd × de/dt</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Proportional (P)</h6>
                      <p className="text-green-300 text-sm mb-1">Kp × e</p>
                      <p className="text-gray-300 text-xs">Immediate response to current error</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Integral (I)</h6>
                      <p className="text-blue-300 text-sm mb-1">Ki × ∫e dt</p>
                      <p className="text-gray-300 text-xs">Accumulates error over time</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Derivative (D)</h6>
                      <p className="text-orange-300 text-sm mb-1">Kd × de/dt</p>
                      <p className="text-gray-300 text-xs">Predicts future error trend</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Alternative PID Forms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Standard Form</h5>
                    <p className="text-gray-300 text-sm mb-2">Kp(1 + 1/(Ti×s) + Td×s)</p>
                    <p className="text-gray-400 text-xs">Ti = integral time, Td = derivative time</p>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Parallel Form</h5>
                    <p className="text-gray-300 text-sm mb-2">Kp + Ki/s + Kd×s</p>
                    <p className="text-gray-400 text-xs">Independent gain settings</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proportional Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <BarChart className="h-5 w-5 text-yellow-400" />
                Proportional (P) Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">How Proportional Control Works</h4>
                <p className="text-gray-300 mb-3">
                  Proportional control provides an output that is directly proportional to the error. The larger the error, the larger the corrective action.
                </p>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h5 className="text-green-200 font-medium mb-2">P Action: Output = Kp × Error</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Characteristics:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Immediate response to error</li>
                        <li>• Output proportional to error magnitude</li>
                        <li>• Simple to understand and tune</li>
                        <li>• Fast initial response</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Limitations:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Creates steady-state offset</li>
                        <li>• Cannot eliminate residual error</li>
                        <li>• May cause oscillation if too high</li>
                        <li>• Sensitive to noise</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Proportional Gain Effects</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">Low Kp</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Slow response</li>
                      <li>• Large steady-state error</li>
                      <li>• Very stable</li>
                      <li>• Sluggish performance</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Optimal Kp</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Fast response</li>
                      <li>• Minimal overshoot</li>
                      <li>• Good stability</li>
                      <li>• Acceptable offset</li>
                    </ul>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">High Kp</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Very fast response</li>
                      <li>• Oscillatory behavior</li>
                      <li>• Potential instability</li>
                      <li>• Noise amplification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Proportional Band Concept</h4>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <p className="text-gray-300 mb-3">
                    Proportional Band (PB) is an alternative way to express proportional gain:
                  </p>
                  <div className="text-center mb-3">
                    <p className="text-yellow-200 font-medium">PB% = 100/Kp</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Narrow PB (High Gain):</h6>
                      <p className="text-gray-300 text-sm">Small error range causes full output change</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Wide PB (Low Gain):</h6>
                      <p className="text-gray-300 text-sm">Large error range needed for full output</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integral Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Integral (I) Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">How Integral Control Works</h4>
                <p className="text-gray-300 mb-3">
                  Integral control accumulates error over time and provides correction proportional to both the magnitude and duration of the error.
                </p>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h5 className="text-blue-200 font-medium mb-2">I Action: Output = Ki × ∫Error dt</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Purpose:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Eliminates steady-state error</li>
                        <li>• Provides automatic reset</li>
                        <li>• Improves accuracy</li>
                        <li>• Handles load disturbances</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Operation:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Continues to act until error = 0</li>
                        <li>• Slower response than P action</li>
                        <li>• Can cause overshoot</li>
                        <li>• Memory of past errors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Integral Time and Reset Rate</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Integral Time (Ti)</h5>
                    <p className="text-gray-300 text-sm mb-2">Time for integral action to equal proportional action</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Measured in minutes or seconds</li>
                      <li>• Longer Ti = slower integral action</li>
                      <li>• Typical range: 0.1 to 10 minutes</li>
                    </ul>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Reset Rate (1/Ti)</h5>
                    <p className="text-gray-300 text-sm mb-2">Number of times per minute integral equals proportional</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Measured in repeats per minute</li>
                      <li>• Higher rate = faster integral action</li>
                      <li>• Typical range: 0.1 to 10 repeats/min</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Integral Windup</h4>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h5 className="text-red-200 font-medium mb-2">Understanding Windup</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Occurs when the controller output saturates (reaches maximum or minimum) while error persists, causing the integral term to accumulate to very large values.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Causes:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Large setpoint changes</li>
                        <li>• Output saturation limits</li>
                        <li>• Process equipment limitations</li>
                        <li>• Extended error conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Solutions:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Anti-windup algorithms</li>
                        <li>• Conditional integration</li>
                        <li>• Output clamping</li>
                        <li>• Back-calculation methods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Derivative Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Zap className="h-5 w-5 text-yellow-400" />
                Derivative (D) Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">How Derivative Control Works</h4>
                <p className="text-gray-300 mb-3">
                  Derivative control responds to the rate of change of error, providing predictive action based on error trends.
                </p>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">D Action: Output = Kd × (de/dt)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Benefits:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Reduces overshoot</li>
                        <li>• Improves stability</li>
                        <li>• Anticipates error trends</li>
                        <li>• Speeds up response</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Limitations:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Amplifies noise</li>
                        <li>• No steady-state contribution</li>
                        <li>• Requires noise filtering</li>
                        <li>• Sensitive to measurement quality</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Derivative Time Constant</h4>
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                  <h5 className="text-cyan-200 font-medium mb-2">Derivative Time (Td)</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Time by which derivative action advances the effect of proportional action
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h6 className="text-white font-medium">Small Td</h6>
                      <p className="text-gray-300 text-xs">Minimal derivative effect</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium">Optimal Td</h6>
                      <p className="text-gray-300 text-xs">Balanced stability and response</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium">Large Td</h6>
                      <p className="text-gray-300 text-xs">Excessive noise amplification</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Derivative Filtering</h4>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h5 className="text-orange-200 font-medium mb-2">Real Derivative Implementation</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Practical derivative control includes filtering to prevent noise amplification:
                  </p>
                  <div className="text-center mb-3">
                    <p className="text-orange-200 font-medium">D(s) = Kd × s / (1 + Tf × s)</p>
                  </div>
                  <p className="text-gray-300 text-xs text-center">
                    Tf = filter time constant (typically Td/8 to Td/4)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PID Tuning Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">PID Tuning Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Ziegler-Nichols Method</h4>
                <p className="text-gray-300 mb-3">
                  The most widely used classical tuning method, providing systematic rules for determining PID parameters.
                </p>
                <div className="space-y-4">
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Closed Loop Method (Ultimate Gain)</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-white font-medium mb-1">Procedure:</h6>
                        <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                          <li>Set Ki = 0 and Kd = 0 (P control only)</li>
                          <li>Gradually increase Kp until sustained oscillation occurs</li>
                          <li>Record Ultimate Gain (Ku) and Ultimate Period (Tu)</li>
                          <li>Apply Z-N tuning rules</li>
                        </ol>
                      </div>
                      <div className="bg-gray-700/50 rounded p-3">
                        <h6 className="text-white font-medium mb-2">Z-N Tuning Rules:</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-green-200 font-medium">P Control:</p>
                            <p className="text-gray-300">Kp = 0.5 × Ku</p>
                          </div>
                          <div>
                            <p className="text-blue-200 font-medium">PI Control:</p>
                            <p className="text-gray-300">Kp = 0.45 × Ku</p>
                            <p className="text-gray-300">Ti = Tu / 1.2</p>
                          </div>
                          <div>
                            <p className="text-purple-200 font-medium">PID Control:</p>
                            <p className="text-gray-300">Kp = 0.6 × Ku</p>
                            <p className="text-gray-300">Ti = Tu / 2</p>
                            <p className="text-gray-300">Td = Tu / 8</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Open Loop Method (Process Reaction)</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-white font-medium mb-1">Procedure:</h6>
                        <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                          <li>Set controller to manual mode</li>
                          <li>Apply step change to output (5-20%)</li>
                          <li>Record process response curve</li>
                          <li>Determine process gain (K), time constant (T), and dead time (L)</li>
                          <li>Apply Z-N open loop rules</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Modern Tuning Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Lambda Tuning</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Based on desired closed-loop time constant</li>
                      <li>• Provides more conservative tuning</li>
                      <li>• Better for noisy processes</li>
                      <li>• Reduced overshoot and oscillation</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                    <h5 className="text-cyan-200 font-medium mb-2">Auto-Tuning</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Automated parameter identification</li>
                      <li>• Real-time adaptation</li>
                      <li>• Continuous optimization</li>
                      <li>• Handles process changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Manual Tuning Guidelines</h4>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <h5 className="text-yellow-200 font-medium mb-2">Step-by-Step Manual Tuning</h5>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Step 1: Start with P Only</h6>
                      <p className="text-gray-300 text-sm">Increase Kp until response is fast but stable (slight overshoot acceptable)</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Step 2: Add Integral</h6>
                      <p className="text-gray-300 text-sm">Start with long integral time, gradually decrease until steady-state error is eliminated</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Step 3: Add Derivative (if needed)</h6>
                      <p className="text-gray-300 text-sm">Start small, increase gradually until overshoot is reduced without excessive noise</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Step 4: Fine-tune</h6>
                      <p className="text-gray-300 text-sm">Make small adjustments to optimize performance for your specific application</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Real-World Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Industrial Oven Temperature Control</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-200 font-medium">Problem:</span>
                        <p className="text-sm">An industrial oven heats too slowly, drifts off target temperature over time, and overshoots when setpoint changes.</p>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium">Solution:</span>
                        <p className="text-sm">Increase P gain for faster response, add I action to eliminate drift, and implement D action to reduce overshoot and improve stability.</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Result:</span>
                        <p className="text-sm">Optimal PID tuning provides fast, accurate temperature control with minimal overshoot and zero steady-state error.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                PID control allows systems to adapt quickly, accurately, and consistently using all three control terms. Proportional provides immediate response, Integral eliminates steady-state errors, and Derivative improves stability. Proper tuning balances responsiveness with stability for optimal control performance.
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
                    Test your understanding of PID control principles and tuning methods.
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
                      <p className="text-green-400">Excellent! You understand PID control principles well.</p>
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

export default InstrumentationModule5Section3;