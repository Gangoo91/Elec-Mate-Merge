import { ArrowLeft, BarChart, CheckCircle2, AlertTriangle, Eye, Clock, Activity, Brain, XCircle } from 'lucide-react';
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

const InstrumentationModule4Section2 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the inverse of frequency?",
      options: [
        "Amplitude",
        "Period",
        "Wavelength",
        "Phase"
      ],
      correctAnswer: 1,
      explanation: "Period is the time taken for one complete cycle, which is the inverse of frequency (T = 1/f)."
    },
    {
      id: 2,
      question: "What tool is best for measuring pulse width?",
      options: [
        "Frequency counter only",
        "Oscilloscope",
        "Standard multimeter",
        "Clamp meter"
      ],
      correctAnswer: 1,
      explanation: "Oscilloscopes can visualise waveforms and measure time-based parameters like pulse width directly from the display."
    },
    {
      id: 3,
      question: "What's the standard frequency for UK mains power?",
      options: [
        "60Hz",
        "50Hz",
        "25Hz",
        "100Hz"
      ],
      correctAnswer: 1,
      explanation: "UK mains power operates at 50Hz, compared to 60Hz in North America."
    },
    {
      id: 4,
      question: "How is frequency used in rotating machinery diagnostics?",
      options: [
        "It indicates power consumption",
        "It shows speed and can reveal mechanical problems",
        "It measures electrical efficiency",
        "It determines voltage levels"
      ],
      correctAnswer: 1,
      explanation: "Frequency measurements can indicate motor speed and help identify mechanical issues like bearing problems or misalignment."
    },
    {
      id: 5,
      question: "What could cause unstable frequency readings?",
      options: [
        "Perfect system operation",
        "Signal noise or loose connections",
        "Too much power",
        "Low temperature"
      ],
      correctAnswer: 1,
      explanation: "Unstable readings are often caused by electrical noise, poor connections, or interference affecting the measurement circuit."
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
            <BarChart className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Frequency and Time-Based Measurements
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Beyond voltage and current, frequency and time-based signals carry vital information about electrical and mechanical systems
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
                Beyond voltage and current, frequency and time-based signals carry vital information about electrical and mechanical systems. This section explores how to measure and interpret these dynamic parameters that reveal system behaviour over time.
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
                  Measure frequency and understand its significance in electrical systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Analyse signal timing and period measurements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Apply frequency analysis to rotating equipment diagnostics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Select appropriate tools for time-domain measurements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Troubleshoot frequency-related problems in industrial systems
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Frequency Fundamentals */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <BarChart className="h-5 w-5 text-elec-yellow" />
                Frequency Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">What is Frequency?</h4>
                  <p className="text-gray-300 mb-3">
                    Frequency is the number of complete cycles that occur in one second, measured in Hertz (Hz):
                  </p>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-blue-200 text-lg font-mono">f = 1/T</p>
                      <p className="text-gray-300 text-sm mt-2">where f = frequency (Hz) and T = period (seconds)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Common Frequency Applications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Power Systems</span>
                          <p className="text-gray-300 text-sm">50Hz (UK) / 60Hz (US) mains frequency</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Motor Control</span>
                          <p className="text-gray-300 text-sm">Variable frequency drives (VFDs)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Communications</span>
                          <p className="text-gray-300 text-sm">Radio and data transmission</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Sensors</span>
                          <p className="text-gray-300 text-sm">Speed and position feedback</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Process Control</span>
                          <p className="text-gray-300 text-sm">Flow and vibration monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white font-medium">Diagnostics</span>
                          <p className="text-gray-300 text-sm">Equipment health monitoring</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time-Based Measurements */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Clock className="h-5 w-5 text-elec-yellow" />
                Period and Pulse Width Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Period Measurement</h4>
                  <p className="text-gray-300 mb-3">
                    Period is the time for one complete cycle - critical for understanding signal timing:
                  </p>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Key Applications</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Motor speed calculation (RPM = 60 × frequency)</li>
                      <li>• Digital signal timing verification</li>
                      <li>• Oscillator stability testing</li>
                      <li>• Power quality analysis</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Pulse Width and Duty Cycle</h4>
                  <p className="text-gray-300 mb-3">
                    Important for PWM (Pulse Width Modulation) systems and digital circuits:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Pulse Width</h5>
                      <p className="text-gray-300 text-sm">Duration of the high or low portion of a square wave signal</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Duty Cycle</h5>
                      <p className="text-gray-300 text-sm">Percentage of time signal is high during one complete cycle</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Digital Signal Analysis</h4>
                  <p className="text-gray-300 mb-3">
                    Modern systems rely heavily on digital timing:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Setup and hold times in microprocessor systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Clock jitter and stability measurements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Communication protocol timing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      PWM motor control verification
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurement Tools */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Activity className="h-5 w-5 text-elec-yellow" />
                Measurement Tools and Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Frequency Counters</h4>
                  <p className="text-gray-300 mb-3">
                    Dedicated instruments for precise frequency measurement:
                  </p>
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-blue-200 font-medium mb-2">Advantages</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Very high accuracy (ppm levels)</li>
                          <li>• Wide frequency range</li>
                          <li>• Direct digital readout</li>
                          <li>• Statistical functions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-blue-200 font-medium mb-2">Typical Applications</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Crystal oscillator testing</li>
                          <li>• Transmitter frequency verification</li>
                          <li>• Motor speed monitoring</li>
                          <li>• Calibration standards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Digital Multimeters</h4>
                  <p className="text-gray-300 mb-3">
                    Many modern DMMs include frequency measurement capabilities:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Convenient for general-purpose measurements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Typically accurate to 0.01% or better
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Range from Hz to MHz in most instruments
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      Limited by input signal conditioning requirements
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Oscilloscopes</h4>
                  <p className="text-gray-300 mb-3">
                    Essential for visualizing and measuring time-domain signals:
                  </p>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Unique Advantages</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Visual waveform analysis</li>
                      <li>• Pulse width and timing measurements</li>
                      <li>• Rise time and fall time analysis</li>
                      <li>• Jitter and noise visualization</li>
                      <li>• Multiple signal comparison</li>
                      <li>• FFT frequency domain analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Applications */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Practical Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-elec-yellow/30">
                  <h4 className="text-blue-200 font-medium mb-2">Variable Frequency Drives</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Output frequency verification</li>
                    <li>• Motor speed control validation</li>
                    <li>• Harmonic distortion analysis</li>
                    <li>• Efficiency optimization</li>
                  </ul>
                </div>
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-green-500/50">
                  <h4 className="text-green-200 font-medium mb-2">Encoder Systems</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Position feedback verification</li>
                    <li>• Speed measurement accuracy</li>
                    <li>• Signal integrity checking</li>
                    <li>• Timing synchronization</li>
                  </ul>
                </div>
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-purple-500/50">
                  <h4 className="text-purple-200 font-medium mb-2">Process Monitoring</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Flow rate measurement</li>
                    <li>• Vibration analysis</li>
                    <li>• Temperature cycling monitoring</li>
                    <li>• Equipment health assessment</li>
                  </ul>
                </div>
                <div className="bg-transparent/80 rounded-lg p-4 border-l-4 border-orange-500/50">
                  <h4 className="text-orange-200 font-medium mb-2">Communication Systems</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Data transmission rates</li>
                    <li>• Protocol timing verification</li>
                    <li>• Clock synchronization</li>
                    <li>• Signal quality assessment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Common Issues and Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-200 font-medium mb-2">Signal Noise</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Electrical noise can cause unstable or incorrect frequency readings.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use proper shielding and grounding</li>
                    <li>• Check for loose connections</li>
                    <li>• Consider signal conditioning</li>
                    <li>• Verify measurement ground reference</li>
                  </ul>
                </div>

                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="text-orange-200 font-medium mb-2">Input Sensitivity</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Weak signals may not trigger measurement circuits properly.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Check signal amplitude requirements</li>
                    <li>• Use appropriate coupling (AC/DC)</li>
                    <li>• Consider signal amplification</li>
                    <li>• Verify trigger settings on oscilloscopes</li>
                  </ul>
                </div>

                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-medium mb-2">Measurement Range</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Choosing the wrong measurement range can lead to errors.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Verify instrument frequency range</li>
                    <li>• Use appropriate time base settings</li>
                    <li>• Consider bandwidth limitations</li>
                    <li>• Check for aliasing in sampling systems</li>
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
                    <h4 className="font-medium text-white mb-2">Conveyor Speed Monitoring</h4>
                    <p className="text-gray-300 leading-relaxed">
                      A bottling line uses frequency sensors to detect conveyor speed. The normal frequency is 25Hz, corresponding to optimal throughput. When technicians notice frequency dropping to 22Hz, they investigate and find a worn drive belt causing slippage. The frequency measurement provided early warning before complete system failure, preventing costly downtime and product loss.
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
                Understanding frequency and time-based readings enables engineers to maintain system stability and detect abnormalities early. These measurements are crucial for modern industrial systems where timing, synchronization, and dynamic behavior determine overall system performance and reliability.
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
                    Test your understanding of frequency and time-based measurement principles.
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

export default InstrumentationModule4Section2;