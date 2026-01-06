import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Settings, Gauge, Activity, Zap, Brain, XCircle, Lightbulb, Users, TrendingDown } from 'lucide-react';
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

const InstrumentationModule5Section4 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What causes hunting?",
      options: [
        "Low controller gain",
        "Excessive gain or poor tuning causing oscillation",
        "Sensor malfunction",
        "Setpoint changes"
      ],
      correctAnswer: 1,
      explanation: "Hunting is caused by excessive controller gain or poor tuning, resulting in the system oscillating around the setpoint instead of settling."
    },
    {
      id: 2,
      question: "How do you reduce overshoot?",
      options: [
        "Increase proportional gain",
        "Decrease integral action and add derivative action",
        "Remove all derivative action",
        "Increase setpoint ramping"
      ],
      correctAnswer: 1,
      explanation: "Overshoot is reduced by decreasing integral action (slower accumulation) and adding derivative action (anticipates changes and provides braking)."
    },
    {
      id: 3,
      question: "What is lag?",
      options: [
        "System overshooting setpoint",
        "Oscillatory behavior",
        "Delayed response between input change and system reaction",
        "Steady-state error"
      ],
      correctAnswer: 2,
      explanation: "Lag is the delayed response between when an input change occurs and when the system begins to react, caused by process dynamics and dead time."
    },
    {
      id: 4,
      question: "What might cause loop instability?",
      options: [
        "Properly tuned parameters",
        "Excessive gain, poor sensor signals, or process changes",
        "Slow response time",
        "Low controller gain"
      ],
      correctAnswer: 1,
      explanation: "Loop instability can be caused by excessive controller gain, poor sensor signals, noise, process changes, or actuator problems that disrupt the control loop."
    },
    {
      id: 5,
      question: "How is tuning involved in fault correction?",
      options: [
        "Tuning is not related to faults",
        "Proper tuning prevents and corrects most control loop faults",
        "Only hardware fixes can correct faults",
        "Tuning only affects speed, not stability"
      ],
      correctAnswer: 1,
      explanation: "Proper PID tuning is essential for preventing and correcting most control loop faults by balancing responsiveness, stability, and accuracy."
    },
    {
      id: 6,
      question: "What is the most effective way to diagnose control loop problems?",
      options: [
        "Replace all components",
        "Systematic troubleshooting starting with trending analysis",
        "Increase all PID gains",
        "Switch to manual control permanently"
      ],
      correctAnswer: 1,
      explanation: "Systematic troubleshooting starting with trending analysis of PV, SP, and output signals provides the most effective diagnosis of control loop problems."
    },
    {
      id: 7,
      question: "What typically indicates a sensor problem in a control loop?",
      options: [
        "Smooth, stable control",
        "Noisy PV signal or unrealistic readings",
        "Perfect tracking of setpoint",
        "Consistent output values"
      ],
      correctAnswer: 1,
      explanation: "Sensor problems typically manifest as noisy PV signals, unrealistic readings, sudden jumps, or fixed values that don't respond to process changes."
    },
    {
      id: 8,
      question: "When should you consider switching to manual control?",
      options: [
        "Never, automatic is always better",
        "During emergencies, equipment failures, or major process upsets",
        "Only during maintenance",
        "When the process is running normally"
      ],
      correctAnswer: 1,
      explanation: "Manual control should be considered during emergencies, equipment failures, major process upsets, or when automatic control is causing unsafe conditions."
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
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../instrumentation-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
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
              Module 5 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Common Loop Faults: Hunting, Overshoot, Lag
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Identify what can go wrong in control loops and learn systematic troubleshooting approaches
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
                  <span>Recognize common control loop faults and their symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand the root causes of hunting, overshoot, and lag</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Learn systematic troubleshooting and corrective actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Apply diagnostic techniques using trending and data analysis</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Hunting (Oscillation) */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Activity className="h-5 w-5 text-elec-yellow" />
                Hunting (Oscillatory Behavior)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">What is Hunting?</h4>
                <p className="text-gray-300 mb-3">
                  Hunting is continuous oscillatory behavior where the process variable repeatedly cycles above and below the setpoint without settling to a stable value.
                </p>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h5 className="text-red-200 font-medium mb-2">Characteristics of Hunting</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• PV oscillates continuously around SP</li>
                        <li>• Controller output cycles regularly</li>
                        <li>• Never reaches steady state</li>
                        <li>• May have constant amplitude or growing</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Frequency Indicators:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Fast oscillation: High proportional gain</li>
                        <li>• Slow oscillation: Integral action too fast</li>
                        <li>• Complex oscillation: Multiple causes</li>
                        <li>• Growing oscillation: System instability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Root Causes of Hunting</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Tuning-Related Causes</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Excessive Proportional Gain:</strong> Controller overreacts to errors</li>
                      <li>• <strong>Integral Action Too Fast:</strong> Rapid error accumulation</li>
                      <li>• <strong>Insufficient Derivative:</strong> No damping of oscillations</li>
                      <li>• <strong>Wrong Control Action:</strong> Direct vs reverse acting</li>
                    </ul>
                  </div>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Hardware-Related Causes</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Actuator Problems:</strong> Sticking, dead band, hysteresis</li>
                      <li>• <strong>Sensor Issues:</strong> Noise, drift, poor location</li>
                      <li>• <strong>Process Changes:</strong> Different operating conditions</li>
                      <li>• <strong>Loop Interaction:</strong> Multiple loops affecting each other</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Solutions for Hunting</h4>
                <div className="space-y-3">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Immediate Actions</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-white font-medium mb-1">Tuning Adjustments:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Reduce proportional gain by 25-50%</li>
                          <li>• Increase integral time (slower action)</li>
                          <li>• Add or increase derivative action</li>
                          <li>• Verify control action direction</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-1">Hardware Checks:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Test actuator response and calibration</li>
                          <li>• Check sensor signal quality and noise</li>
                          <li>• Verify wiring and connections</li>
                          <li>• Inspect for mechanical binding</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overshoot */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <TrendingDown className="h-5 w-5 text-elec-yellow" />
                Overshoot Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Understanding Overshoot</h4>
                <p className="text-gray-300 mb-3">
                  Overshoot occurs when the process variable exceeds the setpoint before settling, indicating aggressive control action that provides too much correction.
                </p>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">Types of Overshoot</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Acceptable Overshoot</h6>
                      <p className="text-green-300 font-bold">5-15%</p>
                      <p className="text-gray-300 text-xs">Fast response, quick settling</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Excessive Overshoot</h6>
                      <p className="text-orange-300 font-bold">15-50%</p>
                      <p className="text-gray-300 text-xs">Poor control, instability risk</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white font-medium mb-2">Severe Overshoot</h6>
                      <p className="text-red-300 font-bold">&gt;50%</p>
                      <p className="text-gray-300 text-xs">Dangerous, requires immediate action</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Causes of Overshoot</h4>
                <div className="space-y-3">
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Primary Causes</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-white font-medium mb-2">Control Tuning:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>High Proportional Gain:</strong> Excessive immediate response</li>
                          <li>• <strong>Fast Integral Action:</strong> Too much correction accumulation</li>
                          <li>• <strong>Insufficient Derivative:</strong> No prediction/braking action</li>
                          <li>• <strong>Integral Windup:</strong> Accumulated error during saturation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-2">Process Characteristics:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>Process Dead Time:</strong> Delayed response to control action</li>
                          <li>• <strong>Large Time Constants:</strong> Slow process response</li>
                          <li>• <strong>Nonlinear Behavior:</strong> Process gain changes with conditions</li>
                          <li>• <strong>Load Disturbances:</strong> External upsets during response</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Overshoot Reduction Strategies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Tuning Solutions</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Reduce Proportional Gain:</strong> Less aggressive initial response</li>
                      <li>• <strong>Increase Integral Time:</strong> Slower error accumulation</li>
                      <li>• <strong>Add Derivative Action:</strong> Anticipate and brake approach</li>
                      <li>• <strong>Implement Anti-Windup:</strong> Prevent integral accumulation</li>
                    </ul>
                  </div>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Advanced Techniques</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Setpoint Ramping:</strong> Gradual setpoint changes</li>
                      <li>• <strong>Feed-Forward Control:</strong> Anticipate disturbances</li>
                      <li>• <strong>Gain Scheduling:</strong> Adaptive tuning parameters</li>
                      <li>• <strong>Model Predictive Control:</strong> Advanced algorithm</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lag Problems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Gauge className="h-5 w-5 text-elec-yellow" />
                Lag and Slow Response
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Types of Lag</h4>
                <p className="text-gray-300 mb-3">
                  Lag represents delays in the control system that slow response and reduce control effectiveness.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Dead Time (Transport Delay)</h5>
                    <p className="text-gray-300 text-sm mb-2">Time delay before any response is observed</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Material transport in pipes</li>
                      <li>• Signal processing delays</li>
                      <li>• Mechanical linkage delays</li>
                      <li>• Communication network delays</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Time Constant Lag</h5>
                    <p className="text-gray-300 text-sm mb-2">Exponential response delay due to system dynamics</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Thermal mass in heating systems</li>
                      <li>• Capacitive effects in tanks</li>
                      <li>• Sensor response time</li>
                      <li>• Actuator movement time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Impact of Lag on Control Performance</h4>
                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-yellow-200 font-medium mb-2">Performance Degradation</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Slower response to setpoint changes</li>
                        <li>• Reduced disturbance rejection</li>
                        <li>• Increased tendency to oscillate</li>
                        <li>• Lower maximum achievable gain</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-200 font-medium mb-2">Control Limitations</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Conservative tuning required</li>
                        <li>• Trade-off between speed and stability</li>
                        <li>• Difficulty handling fast disturbances</li>
                        <li>• Increased steady-state errors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Strategies for Lag Compensation</h4>
                <div className="space-y-3">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Design Improvements</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-white font-medium mb-1">Physical Modifications:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Relocate sensors closer to process</li>
                          <li>• Use faster responding sensors</li>
                          <li>• Minimize pipe lengths and volumes</li>
                          <li>• Upgrade actuators for faster response</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-1">Control Strategies:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Feed-forward compensation</li>
                          <li>• Smith predictor control</li>
                          <li>• Cascade control systems</li>
                          <li>• Advanced control algorithms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Systematic Troubleshooting */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Systematic Troubleshooting Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Step-by-Step Diagnostic Process</h4>
                <div className="space-y-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Phase 1: Data Collection and Analysis</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-white font-medium mb-1">1. Trend Analysis</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Plot PV, SP, and Output vs time</li>
                          <li>• Identify patterns and frequencies</li>
                          <li>• Look for correlation between signals</li>
                          <li>• Note timing of events and changes</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-1">2. Signal Quality Check</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Assess noise levels in PV signal</li>
                          <li>• Check for signal dropouts or spikes</li>
                          <li>• Verify signal ranges and scaling</li>
                          <li>• Test sensor responsiveness</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Phase 2: Component Testing</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-white font-medium mb-2">Sensor Testing:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Calibration verification</li>
                          <li>• Response time measurement</li>
                          <li>• Noise and stability assessment</li>
                          <li>• Physical inspection and cleaning</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-2">Actuator Testing:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Manual operation test</li>
                          <li>• Position feedback verification</li>
                          <li>• Stroke time measurement</li>
                          <li>• Hysteresis and dead band check</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Phase 3: Control System Analysis</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-white font-medium mb-1">Controller Configuration Review</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Verify PID parameters and units</li>
                          <li>• Check control action (direct/reverse)</li>
                          <li>• Review alarm and limit settings</li>
                          <li>• Validate input/output scaling</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-white font-medium mb-1">Performance Testing</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Step response test in manual mode</li>
                          <li>• Open loop characterization</li>
                          <li>• Closed loop performance assessment</li>
                          <li>• Disturbance response evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Common Diagnostic Tools</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Trending Software</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Historical data analysis</li>
                      <li>• Statistical process control</li>
                      <li>• Alarm and event correlation</li>
                      <li>• Performance benchmarking</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                    <h5 className="text-cyan-200 font-medium mb-2">Loop Analysis Tools</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Step response analysis</li>
                      <li>• Frequency response testing</li>
                      <li>• Control loop monitoring</li>
                      <li>• Performance indices calculation</li>
                    </ul>
                  </div>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">Field Instruments</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Multimeter and oscilloscope</li>
                      <li>• Signal generators and calibrators</li>
                      <li>• Pressure and temperature sources</li>
                      <li>• Communication analyzers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preventive Measures */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Preventive Measures and Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Maintenance Best Practices</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Regular Maintenance Tasks</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Monthly:</strong> Performance trend review</li>
                      <li>• <strong>Quarterly:</strong> Sensor calibration check</li>
                      <li>• <strong>Semi-Annual:</strong> Full loop testing</li>
                      <li>• <strong>Annual:</strong> Complete system audit</li>
                    </ul>
                  </div>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Performance Monitoring</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Continuous loop performance assessment</li>
                      <li>• Automated alarm and notification systems</li>
                      <li>• Statistical process control implementation</li>
                      <li>• Key performance indicator tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Design Considerations</h4>
                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                  <h5 className="text-yellow-200 font-medium mb-2">Fault-Tolerant Design Principles</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Redundancy:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Backup sensors and transmitters</li>
                        <li>• Redundant control systems</li>
                        <li>• Alternative control strategies</li>
                        <li>• Emergency shutdown systems</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Robust Operation:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Conservative tuning parameters</li>
                        <li>• Adequate safety margins</li>
                        <li>• Fail-safe control actions</li>
                        <li>• Comprehensive alarm systems</li>
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
                    <h4 className="font-medium text-white mb-2">HVAC System Fan Control Problem</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-200 font-medium">Problem:</span>
                        <p className="text-sm">A cooling fan in an HVAC system repeatedly speeds up and slows down, never maintaining steady operation. Room temperature fluctuates ±3°C around setpoint.</p>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium">Diagnosis:</span>
                        <p className="text-sm">Trending reveals classic hunting behavior with 2-minute oscillation period. High proportional gain and insufficient derivative action identified.</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Solution:</span>
                        <p className="text-sm">Reduced proportional gain by 40% and added derivative action. Result: stable operation with ±0.5°C temperature control.</p>
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
                Control loop faults like hunting, overshoot, and lag are common but fixable with systematic diagnosis and proper corrective actions. Understanding root causes, applying appropriate tuning adjustments, and implementing preventive maintenance ensures reliable control system performance. Effective troubleshooting combines data analysis, component testing, and methodical problem-solving approaches.
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
                    Test your understanding of control loop faults and troubleshooting methods.
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
                      <p className="text-green-400">Excellent! You understand control loop troubleshooting well.</p>
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

export default InstrumentationModule5Section4;