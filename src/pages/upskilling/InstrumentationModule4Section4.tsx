import { ArrowLeft, Gauge, CheckCircle2, AlertTriangle, Eye, Settings, Zap, Activity, Brain, XCircle } from 'lucide-react';
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

const InstrumentationModule4Section4 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which tool visualizes electrical waveforms?",
      options: [
        "Multimeter",
        "Clamp meter",
        "Oscilloscope",
        "Frequency counter"
      ],
      correctAnswer: 2,
      explanation: "Oscilloscopes display voltage waveforms over time, allowing analysis of signal shape, timing, and characteristics that other instruments cannot show."
    },
    {
      id: 2,
      question: "Why use a clamp meter over direct current testing?",
      options: [
        "More accurate readings",
        "Cheaper to purchase",
        "No need to break the circuit for measurement",
        "Better for AC measurements only"
      ],
      correctAnswer: 2,
      explanation: "Clamp meters measure current non-intrusively by detecting the magnetic field around a conductor, eliminating the need to disconnect circuits."
    },
    {
      id: 3,
      question: "What feature protects a multimeter from overload?",
      options: [
        "Auto-ranging",
        "Fuse protection",
        "Digital display",
        "Probe leads"
      ],
      correctAnswer: 1,
      explanation: "Fuse protection prevents damage to the meter's internal circuits when excessive current flows through the measurement path."
    },
    {
      id: 4,
      question: "When is an oscilloscope preferred over a DMM?",
      options: [
        "For basic voltage measurements",
        "When you need to see waveform details and timing",
        "For resistance measurements",
        "For current measurements only"
      ],
      correctAnswer: 1,
      explanation: "Oscilloscopes excel at showing signal behaviour over time, revealing details like distortion, noise, and timing that DMMs cannot display."
    },
    {
      id: 5,
      question: "What safety precaution should you follow with all measurement tools?",
      options: [
        "Always use the highest range setting",
        "Check instrument ratings match circuit conditions",
        "Only use digital instruments",
        "Avoid using probes"
      ],
      correctAnswer: 1,
      explanation: "Always verify that the instrument's voltage, current, and frequency ratings are suitable for the circuit being measured to prevent damage and ensure safety."
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
            <Gauge className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Measurement Equipment: Multimeters, Clamp Meters, Oscilloscopes
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            With the right tool, you can make the right diagnosis. This section explores key electrical measurement instruments
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
                With the right tool, you can make the right diagnosis. This section explores key electrical measurement instruments used in modern industrial and laboratory environments. Understanding each tool's capabilities and limitations is essential for effective troubleshooting and system analysis.
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
                  <span>Understand the function and capabilities of each instrument type</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Select appropriate measurement tools for specific applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Use measurement instruments safely and effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Recognise the advantages and limitations of each tool</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Apply proper measurement techniques and best practices</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Digital Multimeters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-yellow-400" />
                Digital Multimeters (DMMs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">The Swiss Army Knife of Electrical Measurement</h4>
                  <p className="text-gray-300 mb-3">
                    Digital multimeters are the most versatile and commonly used electrical test instruments:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Basic Functions</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• DC and AC voltage measurement</li>
                        <li>• DC and AC current measurement</li>
                        <li>• Resistance and continuity testing</li>
                        <li>• Diode and transistor testing</li>
                        <li>• Frequency and capacitance (advanced models)</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Key Advantages</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• High accuracy and resolution</li>
                        <li>• Auto-ranging capability</li>
                        <li>• Digital display - no parallax errors</li>
                        <li>• Wide measurement ranges</li>
                        <li>• Data logging features (some models)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Types of Digital Multimeters</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Handheld DMMs</h5>
                      <p className="text-gray-300 text-sm mb-2">Portable units for field work and general troubleshooting</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• 3½ to 4½ digit resolution typically</li>
                        <li>• Battery powered for portability</li>
                        <li>• Rugged construction for field use</li>
                        <li>• CAT II/III/IV safety ratings</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Bench DMMs</h5>
                      <p className="text-gray-300 text-sm mb-2">High-precision instruments for laboratory and calibration work</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• 5½ to 8½ digit resolution</li>
                        <li>• Superior accuracy specifications</li>
                        <li>• Computer interface capabilities</li>
                        <li>• Advanced mathematical functions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Safety Features</h4>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Input protection fuses on current ranges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>High voltage input protection circuits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>CAT ratings for installation safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Low battery and overload indicators</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clamp Meters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Activity className="h-5 w-5 text-yellow-400" />
                Clamp Meters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Non-Contact Current Measurement</h4>
                  <p className="text-gray-300 mb-3">
                    Clamp meters measure current by detecting the magnetic field around a conductor:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">How They Work</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Magnetic field detection principle</li>
                        <li>• Transformer action in AC measurements</li>
                        <li>• Hall effect sensors for DC (some models)</li>
                        <li>• Current transformer secondary output</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Key Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• No circuit interruption required</li>
                        <li>• Safe measurements on live circuits</li>
                        <li>• Quick readings for troubleshooting</li>
                        <li>• Suitable for high current measurements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Types and Applications</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                      <h5 className="text-yellow-200 font-medium mb-2">AC Current Clamps</h5>
                      <p className="text-gray-300 text-sm mb-2">Most common type for general electrical work</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Transformer-based measurement</li>
                        <li>• Accurate for sinusoidal waveforms</li>
                        <li>• Lower cost and simpler construction</li>
                        <li>• Ideal for power system measurements</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">AC/DC Current Clamps</h5>
                      <p className="text-gray-300 text-sm mb-2">Advanced clamps for both AC and DC measurements</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Hall effect sensor technology</li>
                        <li>• More expensive but versatile</li>
                        <li>• Essential for DC motor circuits</li>
                        <li>• Battery and automotive applications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Limitations and Considerations</h4>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Lower accuracy than series measurement</li>
                      <li>• Sensitive to conductor position in jaw</li>
                      <li>• May be affected by adjacent conductors</li>
                      <li>• Limited resolution for small currents</li>
                      <li>• Zero adjustment needed for DC models</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oscilloscopes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Zap className="h-5 w-5 text-yellow-400" />
                Oscilloscopes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Visualizing Electrical Signals</h4>
                  <p className="text-gray-300 mb-3">
                    Oscilloscopes display voltage waveforms over time, revealing signal characteristics invisible to other instruments:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">What They Show</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Signal amplitude and frequency</li>
                        <li>• Rise and fall times</li>
                        <li>• Distortion and noise content</li>
                        <li>• Phase relationships between signals</li>
                        <li>• Transient events and glitches</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Key Capabilities</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Time domain analysis</li>
                        <li>• Frequency domain (FFT)</li>
                        <li>• Multiple channel comparison</li>
                        <li>• Advanced triggering options</li>
                        <li>• Mathematical operations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Types of Oscilloscopes</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Digital Storage Oscilloscopes (DSO)</h5>
                      <p className="text-gray-300 text-sm mb-2">Most common type in modern applications</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Digital signal processing and storage</li>
                        <li>• Freeze and analyse captured waveforms</li>
                        <li>• Advanced measurement capabilities</li>
                        <li>• Computer connectivity options</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Mixed Signal Oscilloscopes (MSO)</h5>
                      <p className="text-gray-300 text-sm mb-2">Combines oscilloscope with logic analyser functions</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Analogue and digital channel inputs</li>
                        <li>• Protocol analysis capabilities</li>
                        <li>• Ideal for embedded system debugging</li>
                        <li>• Timing correlation between domains</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Key Specifications</h4>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2">Bandwidth</h5>
                        <p className="text-gray-300 text-sm">Determines highest frequency that can be accurately measured</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Sample Rate</h5>
                        <p className="text-gray-300 text-sm">How frequently the scope samples the input signal</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Memory Depth</h5>
                        <p className="text-gray-300 text-sm">Amount of data that can be captured and stored</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Number of Channels</h5>
                        <p className="text-gray-300 text-sm">How many signals can be viewed simultaneously</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Selection Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">When to Use Each Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card/80 rounded-lg p-4 border-l-4 border-yellow-400/30">
                  <h4 className="text-blue-200 font-medium mb-2">Use DMMs For:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Precise DC measurements</li>
                    <li>• RMS AC voltage/current</li>
                    <li>• Resistance and continuity</li>
                    <li>• Component testing</li>
                    <li>• General troubleshooting</li>
                  </ul>
                </div>
                <div className="bg-card/80 rounded-lg p-4 border-l-4 border-green-500/50">
                  <h4 className="text-green-200 font-medium mb-2">Use Clamp Meters For:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Live circuit current measurement</li>
                    <li>• High current applications</li>
                    <li>• Power system diagnostics</li>
                    <li>• Quick current checks</li>
                    <li>• Load monitoring</li>
                  </ul>
                </div>
                <div className="bg-card/80 rounded-lg p-4 border-l-4 border-purple-500/50">
                  <h4 className="text-purple-200 font-medium mb-2">Use Oscilloscopes For:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Waveform analysis</li>
                    <li>• Signal timing measurements</li>
                    <li>• Noise and distortion analysis</li>
                    <li>• Transient capture</li>
                    <li>• Protocol debugging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Best Practices and Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-200 font-medium mb-2">Safety First</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Verify instrument CAT ratings before use</li>
                    <li>• Check probe leads for damage regularly</li>
                    <li>• Use appropriate PPE for electrical work</li>
                    <li>• Never exceed instrument specifications</li>
                    <li>• Understand arc flash risks in power systems</li>
                  </ul>
                </div>

                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-2">Measurement Accuracy Tips</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Select appropriate measurement range</li>
                    <li>• Allow instruments to warm up</li>
                    <li>• Use proper probe techniques</li>
                    <li>• Consider measurement loading effects</li>
                    <li>• Perform regular calibration checks</li>
                  </ul>
                </div>

                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-200 font-medium mb-2">Maintenance Guidelines</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Keep instruments clean and dry</li>
                    <li>• Store in appropriate cases when not in use</li>
                    <li>• Replace fuses with correct ratings only</li>
                    <li>• Check battery levels regularly</li>
                    <li>• Schedule periodic calibration service</li>
                  </ul>
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
                    <h4 className="font-medium text-white mb-2">Motor Starter Troubleshooting</h4>
                    <p className="text-gray-300 leading-relaxed">
                      When troubleshooting a motor starter circuit, a technician uses multiple instruments strategically. A clamp meter reveals excessive inrush current of 8x normal instead of the expected 6x, suggesting a mechanical binding issue. An oscilloscope confirms this by showing the current waveform has irregular spikes during startup. Finally, a DMM verifies that all control voltages are within specification, confirming the problem is mechanical rather than electrical. This systematic approach using appropriate tools quickly isolates the root cause.
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
                Measurement tools each serve a distinct role in electrical diagnostics and system analysis. Knowing when and how to use them elevates your diagnostic capabilities and ensures safe, efficient troubleshooting. The key is matching the right instrument to the specific measurement requirements and understanding each tool's strengths and limitations.
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
                    Test your understanding of measurement equipment capabilities and applications.
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
                      <p className="text-green-400">Excellent work! You understand measurement equipment well.</p>
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

export default InstrumentationModule4Section4;