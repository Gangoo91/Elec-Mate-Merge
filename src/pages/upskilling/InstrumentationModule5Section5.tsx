import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, TrendingUp, BarChart, Settings, Zap, Brain, XCircle, Lightbulb, Users, Gauge } from 'lucide-react';
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

const InstrumentationModule5Section5 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the main goal of loop tuning?",
      options: [
        "To make the system as fast as possible",
        "To eliminate all oscillations",
        "To optimize performance while maintaining stability",
        "To reduce energy consumption"
      ],
      correctAnswer: 2,
      explanation: "Loop tuning aims to optimize system performance (speed, accuracy, robustness) while maintaining stability and avoiding oscillations or instability."
    },
    {
      id: 2,
      question: "What indicates an over-tuned (aggressive) control loop?",
      options: [
        "Slow response to setpoint changes",
        "Large steady-state error",
        "Oscillations and overshoot",
        "Poor load disturbance rejection"
      ],
      correctAnswer: 2,
      explanation: "Over-tuned or aggressive control loops exhibit oscillations, overshoot, and potentially unstable behavior due to excessive gain or inappropriate tuning parameters."
    },
    {
      id: 3,
      question: "Which tuning method is most conservative?",
      options: [
        "Ziegler-Nichols",
        "Lambda tuning",
        "Cohen-Coon",
        "Ultimate gain method"
      ],
      correctAnswer: 1,
      explanation: "Lambda tuning is more conservative than Ziegler-Nichols, providing better stability margins and reduced overshoot at the cost of slower response."
    },
    {
      id: 4,
      question: "What is the gain margin in a control system?",
      options: [
        "The maximum allowable gain",
        "The gain at which oscillation starts",
        "How much gain can be increased before instability",
        "The proportional gain setting"
      ],
      correctAnswer: 2,
      explanation: "Gain margin indicates how much the loop gain can be increased before the system becomes unstable. It's a measure of stability robustness."
    },
    {
      id: 5,
      question: "What is dead time compensation used for?",
      options: [
        "Eliminating measurement noise",
        "Improving response to processes with significant delays",
        "Reducing steady-state error",
        "Preventing integral windup"
      ],
      correctAnswer: 1,
      explanation: "Dead time compensation (like Smith Predictor) is used to improve control performance for processes with significant transportation delays or dead time."
    },
    {
      id: 6,
      question: "Why should control loops be tested with realistic disturbances?",
      options: [
        "To verify theoretical calculations",
        "To ensure robust performance under actual operating conditions",
        "To determine maximum output limits",
        "To calibrate the measurement devices"
      ],
      correctAnswer: 1,
      explanation: "Testing with realistic disturbances ensures the control loop will perform well under actual operating conditions, not just ideal laboratory conditions."
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
        <Link to="../instrumentation-module-5">
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
              Module 5 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Loop Tuning and Stability Considerations
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Advanced techniques for optimizing control loop performance and ensuring system stability
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
                  <span>Apply advanced tuning methods for different process types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand stability criteria and margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Implement dead time compensation techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Evaluate and optimize loop performance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Advanced Tuning Methods */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Advanced Tuning Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Process-Specific Tuning Approaches</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Self-Regulating Processes</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Processes that naturally reach a steady state (e.g., temperature control)
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Use standard Z-N or Lambda tuning</li>
                      <li>• Moderate integral action</li>
                      <li>• Derivative helpful for large processes</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Integrating Processes</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Processes that continue to change without feedback (e.g., level control)
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Use PI control (no derivative)</li>
                      <li>• Conservative integral action</li>
                      <li>• Focus on stability over speed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Model-Based Tuning</h4>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">Internal Model Control (IMC)</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Uses a process model to design the controller and predict system behavior
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Advantages:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Systematic approach</li>
                        <li>• Predictable performance</li>
                        <li>• Handles dead time well</li>
                        <li>• Robust to model uncertainty</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Requirements:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Accurate process model</li>
                        <li>• More complex implementation</li>
                        <li>• Higher computational requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Adaptive and Auto-Tuning</h4>
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                  <h5 className="text-cyan-200 font-medium mb-2">Modern Adaptive Controllers</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Controllers that automatically adjust their parameters based on process changes
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Pattern Recognition:</h6>
                      <p className="text-gray-300 text-xs">Identifies oscillations, overshoot, and performance degradation</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Relay Feedback:</h6>
                      <p className="text-gray-300 text-xs">Uses relay oscillations to identify critical parameters</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Continuous Adaptation:</h6>
                      <p className="text-gray-300 text-xs">Monitors performance and adjusts parameters in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stability Analysis */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Gauge className="h-5 w-5 text-elec-yellow" />
                Stability Analysis and Margins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Stability Criteria</h4>
                <p className="text-gray-300 mb-3">
                  Understanding when a control system will remain stable under various conditions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Gain Margin</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      How much the loop gain can be increased before instability occurs
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Typical target: 6-10 dB</li>
                      <li>• Higher values = more conservative</li>
                      <li>• Measured at phase crossover frequency</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Phase Margin</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Additional phase lag that can be tolerated before instability
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Typical target: 30-60 degrees</li>
                      <li>• Higher values = better damping</li>
                      <li>• Measured at gain crossover frequency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Frequency Domain Analysis</h4>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h5 className="text-orange-200 font-medium mb-2">Bode Plot Analysis</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Graphical method for analyzing system stability and performance
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Magnitude Plot:</h6>
                      <p className="text-gray-300 text-xs">Shows gain vs frequency, indicates gain margin</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Phase Plot:</h6>
                      <p className="text-gray-300 text-xs">Shows phase shift vs frequency, indicates phase margin</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Bandwidth:</h6>
                      <p className="text-gray-300 text-xs">Frequency range where system responds effectively</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Robustness Considerations</h4>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h5 className="text-red-200 font-medium mb-2">Uncertainty Factors</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Real systems have uncertainties that can affect stability
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Model Uncertainty:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Process gain variations</li>
                        <li>• Time constant changes</li>
                        <li>• Dead time variations</li>
                        <li>• Nonlinear behavior</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">External Factors:</h6>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Measurement noise</li>
                        <li>• Actuator limitations</li>
                        <li>• Environmental changes</li>
                        <li>• Wear and aging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dead Time Compensation */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Dead Time Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Understanding Dead Time</h4>
                <p className="text-gray-300 mb-3">
                  Dead time (transportation delay) occurs when there's a delay between controller action and measurable response
                </p>
                <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                  <h5 className="text-blue-200 font-medium mb-2">Common Sources of Dead Time</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Physical Delays:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Fluid transport in pipes</li>
                        <li>• Heat conduction through materials</li>
                        <li>• Chemical reaction time</li>
                        <li>• Material mixing time</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">System Delays:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Measurement filtering</li>
                        <li>• Communication delays</li>
                        <li>• Actuator response time</li>
                        <li>• Sampling intervals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Smith Predictor</h4>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h5 className="text-green-200 font-medium mb-2">Predictive Control Strategy</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Uses a process model to predict what the output would be without dead time
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">How It Works:</h6>
                      <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                        <li>Controller acts on predicted process variable</li>
                        <li>Model predicts immediate response</li>
                        <li>Actual measurement corrects model errors</li>
                        <li>System behaves as if no dead time exists</li>
                      </ol>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Benefits:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Dramatically improved performance</li>
                        <li>• Reduced overshoot and settling time</li>
                        <li>• Better disturbance rejection</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Requirements:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Accurate process model</li>
                        <li>• Known dead time value</li>
                        <li>• Model-plant mismatch handling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Alternative Compensation Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Dahlin Controller</h5>
                    <p className="text-gray-300 text-sm mb-2">Digital controller designed for dead time processes</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Finite settling time response</li>
                      <li>• Good for digital systems</li>
                      <li>• Requires accurate model</li>
                    </ul>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Fuzzy Logic Control</h5>
                    <p className="text-gray-300 text-sm mb-2">Rule-based control that can handle dead time</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• No mathematical model needed</li>
                      <li>• Robust to uncertainties</li>
                      <li>• Expert knowledge based</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Evaluation */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <BarChart className="h-5 w-5 text-elec-yellow" />
                Performance Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Key Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Time Domain Metrics</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Rise time (0-90% of setpoint)</li>
                      <li>• Settling time (within 2% of setpoint)</li>
                      <li>• Overshoot percentage</li>
                      <li>• Steady-state error</li>
                      <li>• Decay ratio (oscillation damping)</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Frequency Domain Metrics</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Bandwidth (response frequency range)</li>
                      <li>• Resonant peak (maximum amplification)</li>
                      <li>• Phase margin and gain margin</li>
                      <li>• Crossover frequencies</li>
                      <li>• Sensitivity functions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Integrated Performance Indices</h4>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">Common Performance Indices</h5>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">IAE (Integral Absolute Error):</h6>
                      <p className="text-gray-300 text-sm">∫|error| dt - Penalizes all errors equally</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">ISE (Integral Square Error):</h6>
                      <p className="text-gray-300 text-sm">∫error² dt - Penalizes large errors more heavily</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">ITAE (Integral Time Absolute Error):</h6>
                      <p className="text-gray-300 text-sm">∫t|error| dt - Emphasizes reducing errors quickly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Practical Testing Methods</h4>
                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                  <h5 className="text-yellow-200 font-medium mb-2">Loop Performance Assessment</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Step Response Test:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Change setpoint by 5-10%</li>
                        <li>• Record complete response</li>
                        <li>• Measure time domain metrics</li>
                        <li>• Check for oscillations</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Disturbance Test:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Apply known load disturbance</li>
                        <li>• Measure recovery time</li>
                        <li>• Check maximum deviation</li>
                        <li>• Verify steady-state return</li>
                      </ul>
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
                    <h4 className="font-medium text-white mb-2">Chemical Reactor Temperature Control</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-200 font-medium">Challenge:</span>
                        <p className="text-sm">A chemical reactor has significant dead time (3 minutes) and is sensitive to temperature overshoot which can damage the catalyst.</p>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium">Solution:</span>
                        <p className="text-sm">Implement Smith Predictor with conservative tuning. Use model-based feed-forward control for known disturbances like feed rate changes.</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Result:</span>
                        <p className="text-sm">Dead time compensation reduces settling time by 70% while maintaining tight temperature control without overshoot.</p>
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
                Advanced loop tuning requires understanding process characteristics, stability margins, and performance requirements. Modern techniques like model-based control and dead time compensation can dramatically improve performance, but require careful implementation and robust design to handle real-world uncertainties.
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
                    Test your understanding of advanced loop tuning and stability concepts.
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
                      <p className="text-green-400">Excellent! You understand advanced control principles well.</p>
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

export default InstrumentationModule5Section5;