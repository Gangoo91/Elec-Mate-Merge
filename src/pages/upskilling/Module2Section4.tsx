import { ArrowLeft, Wrench, CheckCircle, AlertCircle, BookOpen, Brain, Settings, Zap, Eye, FileText, HardHat, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const Module2Section4 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  const quizQuestions: QuizQuestionType[] = [
    {
      id: 1,
      question: "Which instrument is used to measure earth fault loop impedance?",
      options: [
        "Continuity tester",
        "RCD tester", 
        "Loop impedance tester",
        "Voltage indicator"
      ],
      correctAnswer: 2,
      explanation: "Loop impedance testers are specifically designed to measure earth fault loop impedance (Zs/Ze) to verify protective device operation."
    },
    {
      id: 2,
      question: "What standard must all electrical test instruments comply with?",
      options: [
        "BS EN 61010",
        "BS EN 61557",
        "ISO 45001",
        "BS 7671"
      ],
      correctAnswer: 1,
      explanation: "BS EN 61557 is the standard that specifies safety and performance requirements for electrical measuring instruments used for testing electrical installations."
    },
    {
      id: 3,
      question: "How often should test instruments typically be calibrated?",
      options: [
        "Every 3 months",
        "Every 6 months",
        "Every 12 months",
        "Every 24 months"
      ],
      correctAnswer: 2,
      explanation: "Test instruments should typically be calibrated every 12 months to ensure accuracy and compliance, though some manufacturers may specify different intervals."
    },
    {
      id: 4,
      question: "What tool should be used to verify your voltage tester is working correctly?",
      options: [
        "Multimeter",
        "Proving unit",
        "Loop tester",
        "Another voltage tester"
      ],
      correctAnswer: 1,
      explanation: "A proving unit provides a known voltage source to verify that your voltage tester is working correctly before and after use."
    },
    {
      id: 5,
      question: "True or False: A multifunction tester can replace individual specialized testers.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "True. Modern multifunction testers (MFT) combine several testing functions into one device, capable of replacing multiple individual testers while maintaining accuracy and compliance."
    },
    {
      id: 6,
      question: "What is the minimum test current required for continuity testing?",
      options: [
        "100mA",
        "200mA",
        "500mA", 
        "1A"
      ],
      correctAnswer: 1,
      explanation: "BS EN 61557 requires a minimum test current of 200mA for continuity testing to ensure reliable measurements and proper verification of conductor integrity."
    },
    {
      id: 7,
      question: "Which voltage should be used for insulation resistance testing on 230V circuits?",
      options: [
        "250V DC",
        "500V DC",
        "1000V DC",
        "1500V DC"
      ],
      correctAnswer: 1,
      explanation: "500V DC is the standard test voltage for insulation resistance testing on circuits operating up to 500V, including standard 230V installations."
    },
    {
      id: 8,
      question: "What feature allows earth fault loop impedance testing without tripping RCDs?",
      options: [
        "High current testing",
        "Low impedance mode",
        "Non-trip testing",
        "Auto-ranging"
      ],
      correctAnswer: 2,
      explanation: "Non-trip testing uses low test currents that won't cause RCDs to operate, allowing loop impedance measurement on circuits protected by RCDs."
    },
    {
      id: 9,
      question: "What is the purpose of temperature compensation in test instruments?",
      options: [
        "To protect the instrument from overheating",
        "To adjust readings for ambient temperature effects",
        "To calibrate the internal temperature sensor",
        "To prevent condensation damage"
      ],
      correctAnswer: 1,
      explanation: "Temperature compensation adjusts measurement readings to account for the effect of ambient temperature on conductor resistance, ensuring accurate results."
    },
    {
      id: 10,
      question: "Which feature is most important for professional electrical testing in varying site conditions?",
      options: [
        "Colour display screen",
        "Bluetooth connectivity",
        "Robust construction and IP rating",
        "Multiple language support"
      ],
      correctAnswer: 2,
      explanation: "Robust construction and appropriate IP rating ensure the instrument can withstand harsh site conditions while maintaining accuracy and safety."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== undefined) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedAnswer(undefined);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow text-sm">
              Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Test Instruments Overview
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive guide to multifunction testers, RCD testers and specialist equipment selection for professional electrical testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed mb-4">
                Professional electrical testing requires specialised instruments that can accurately measure electrical parameters 
                whilst ensuring operator safety. The selection of appropriate test equipment is fundamental to producing reliable 
                test results and maintaining compliance with BS 7671.
              </p>
              <p className="text-white leading-relaxed">
                This section provides comprehensive coverage of essential test instruments, their specific applications, compliance 
                requirements, and selection criteria for different testing scenarios. Understanding your test equipment capabilities 
                and limitations is crucial for safe and effective electrical testing.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
              <ul className="text-white space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Identify and select appropriate test instruments for specific testing requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand the capabilities and limitations of different instrument types</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Recognise compliance standards and safety requirements for test equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Apply proper calibration and maintenance procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Evaluate instrument features for professional testing applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Essential Test Instruments */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Essential Test Instruments for BS 7671 Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Core Testing Equipment Requirements
                </h3>
                <p className="text-white mb-6">
                  To carry out comprehensive inspection and testing under BS 7671, electricians must have access to instruments 
                  capable of performing all required tests safely and accurately. The equipment must comply with relevant standards 
                  and be properly calibrated and maintained.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-transparent/80 p-6 rounded-lg">
                    <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Dead Testing Instruments
                    </h4>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• <strong>Insulation Resistance Tester:</strong> 250V, 500V, 1000V test voltages</li>
                      <li>• <strong>Continuity Tester:</strong> Minimum 200mA test current</li>
                      <li>• <strong>Low Resistance Ohmmeter:</strong> For bonding verification</li>
                      <li>• <strong>Polarity Testing Equipment:</strong> Non-contact or safe methods</li>
                    </ul>
                  </div>
                  
                  <div className="bg-transparent/80 p-6 rounded-lg">
                    <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Live Testing Instruments
                    </h4>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• <strong>Earth Fault Loop Impedance Tester:</strong> Ze/Zs measurement</li>
                      <li>• <strong>RCD Tester:</strong> All types and ratings</li>
                      <li>• <strong>Prospective Fault Current Tester:</strong> PSCC/PEFC</li>
                      <li>• <strong>Phase Sequence Indicator:</strong> Three-phase systems</li>
                    </ul>
                  </div>
                  
                  <div className="bg-transparent/80 p-6 rounded-lg">
                    <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Safety and Verification Equipment
                    </h4>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• <strong>Voltage Indicator:</strong> GS38 compliant two-pole tester</li>
                      <li>• <strong>Proving Unit:</strong> Known voltage source for verification</li>
                      <li>• <strong>Lock-off Devices:</strong> Isolation security</li>
                      <li>• <strong>Personal Protective Equipment:</strong> As per risk assessment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-transparent/80 p-6 rounded-lg">
                    <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Advanced and Multifunction Options
                    </h4>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• <strong>Multifunction Tester (MFT):</strong> Combined testing capabilities</li>
                      <li>• <strong>Installation Tester:</strong> Complete test suites</li>
                      <li>• <strong>Data Logging Equipment:</strong> Automatic recording</li>
                      <li>• <strong>Portable Appliance Testers:</strong> PAT testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Instrument Functions */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Detailed Instrument Functions and Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="bg-transparent p-6 rounded-lg border border-gray-700">
                <h4 className="text-elec-yellow font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Continuity Testing Equipment
                </h4>
                <p className="text-white mb-4">
                  Verifies the integrity of protective conductors and ensures fault current paths are established. 
                  Critical for confirming that protective devices will operate correctly during fault conditions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Primary Functions:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• CPC (Circuit Protective Conductor) continuity verification</li>
                      <li>• Main equipotential bonding conductor checks</li>
                      <li>• Supplementary bonding verification</li>
                      <li>• Ring final circuit continuity (end-to-end and cross-over)</li>
                      <li>• Cable integrity testing and fault location</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Technical Requirements:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Test current: 200mA minimum (BS EN 61557)</li>
                      <li>• Open circuit voltage: 4V to 24V DC</li>
                      <li>• Resolution: 0.01 ohm minimum for accurate readings</li>
                      <li>• Null function for test lead resistance compensation</li>
                      <li>• Auto-ranging capability for convenience</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-6 rounded-lg border border-gray-700">
                <h4 className="text-elec-yellow font-semibold mb-4">Insulation Resistance Testing</h4>
                <p className="text-white mb-4">
                  Measures resistance between conductors and to earth to detect insulation breakdown, moisture ingress, 
                  or deterioration that could lead to dangerous conditions or equipment failure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Test Voltages Required:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• 250V DC for SELV/PELV circuits</li>
                      <li>• 500V DC for circuits up to 500V (standard installations)</li>
                      <li>• 1000V DC for circuits above 500V</li>
                      <li>• Variable test voltages for special applications</li>
                      <li>• Automatic voltage selection based on circuit type</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Performance Standards:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Minimum reading: 1MΩ for most circuits</li>
                      <li>• Test duration: typically 60 seconds for stable reading</li>
                      <li>• Automatic discharge function after testing</li>
                      <li>• Protection against back EMF from circuits</li>
                      <li>• Measurement range up to 999GΩ on quality instruments</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-6 rounded-lg border border-gray-700">
                <h4 className="text-elec-yellow font-semibold mb-4">Earth Fault Loop Impedance Testing</h4>
                <p className="text-white mb-4">
                  Measures the impedance of the earth fault current path to verify that sufficient fault current will flow 
                  to operate protective devices within required disconnection times specified in BS 7671.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Measurement Types:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Ze - External earth fault loop impedance</li>
                      <li>• Zs - Total earth fault loop impedance at final circuits</li>
                      <li>• R1+R2 calculations and verification</li>
                      <li>• Non-trip testing capabilities for RCD-protected circuits</li>
                      <li>• High current testing for accurate fault current assessment</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Advanced Features:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Temperature compensation for conductor resistance</li>
                      <li>• Noise rejection filters for industrial environments</li>
                      <li>• Multiple measurement techniques for accuracy</li>
                      <li>• Automatic range selection and averaging</li>
                      <li>• Data logging capabilities with timestamps</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-6 rounded-lg border border-gray-700">
                <h4 className="text-elec-yellow font-semibold mb-4">RCD Testing Equipment</h4>
                <p className="text-white mb-4">
                  Specialised instruments for testing residual current devices to ensure they provide adequate protection 
                  against electric shock and comply with their rated specifications and BS EN 61008/61009 standards.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Essential Test Functions:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Trip time measurement at various test currents</li>
                      <li>• Ramp testing for precise trip threshold determination</li>
                      <li>• No-trip testing at 50% rated current</li>
                      <li>• Contact voltage measurement during earth fault</li>
                      <li>• Phase angle selection for worst-case testing scenarios</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Test Current Capabilities:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Standard RCD ratings: 10mA, 30mA, 100mA, 300mA, 500mA</li>
                      <li>• Test multipliers: x0.5, x1, x5 for comprehensive testing</li>
                      <li>• High resolution timing measurement (±1ms accuracy)</li>
                      <li>• Automatic test sequence options for efficiency</li>
                      <li>• Type A, AC, and B RCD compatibility testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multifunction Tester Advantages */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Multifunction Tester Advantages and Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-600/20 p-6 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-4">Advantages of MFT Systems</h4>
                  <ul className="text-green-200 space-y-2 text-sm">
                    <li>• Consolidated testing reduces equipment carrying requirements</li>
                    <li>• Consistent user interface across all test functions</li>
                    <li>• Integrated data logging and reporting capabilities</li>
                    <li>• Cost-effective compared to multiple individual instruments</li>
                    <li>• Single calibration schedule simplifies maintenance</li>
                    <li>• Reduced training requirements for operators</li>
                    <li>• Better integration with computer systems and software</li>
                    <li>• Automatic test sequencing for increased efficiency</li>
                  </ul>
                </div>
                
                <div className="bg-orange-900/20 border border-orange-600/20 p-6 rounded-lg">
                  <h4 className="text-orange-400 font-semibold mb-4">Considerations and Limitations</h4>
                  <ul className="text-orange-200 space-y-2 text-sm">
                    <li>• Single instrument failure affects all testing capabilities</li>
                    <li>• May not offer the same precision as dedicated instruments</li>
                    <li>• Higher initial investment compared to basic testers</li>
                    <li>• More complex operation requiring comprehensive training</li>
                    <li>• Battery life considerations with multiple functions</li>
                    <li>• Software updates and compatibility issues</li>
                    <li>• Limited customisation for specialist applications</li>
                    <li>• Repair costs may be higher due to complexity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600/20 p-6 rounded-lg">
                <h4 className="text-elec-yellow font-semibold mb-4">Selection Criteria for Professional Use</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-blue-300 font-semibold mb-2">Technical Requirements:</h5>
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• Compliance with BS EN 61557 standard</li>
                      <li>• Appropriate measurement ranges and resolution</li>
                      <li>• Non-trip testing capability for RCD circuits</li>
                      <li>• Temperature compensation features</li>
                      <li>• Noise immunity for industrial environments</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-blue-300 font-semibold mb-2">Practical Considerations:</h5>
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• Robust construction and appropriate IP rating</li>
                      <li>• Clear display readable in various lighting conditions</li>
                      <li>• Intuitive user interface and navigation</li>
                      <li>• Adequate battery life for full working day</li>
                      <li>• Available accessories and test leads</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration and Maintenance */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Calibration and Maintenance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <h4 className="text-elec-yellow font-semibold mb-4">Calibration Standards and Frequency</h4>
                <p className="text-white mb-4">
                  Regular calibration ensures test instruments maintain accuracy and comply with BS EN 61557 requirements. 
                  Calibration must be traceable to national standards and performed by accredited laboratories.
                </p>
                
                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h5 className="text-white font-semibold mb-3">Typical Calibration Intervals:</h5>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-600">
                        <TableHead className="text-white">Instrument Type</TableHead>
                        <TableHead className="text-white">Standard Interval</TableHead>
                        <TableHead className="text-white">Critical Parameters</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-600">
                        <TableCell className="text-white">Multifunction Tester</TableCell>
                        <TableCell className="text-white">12 months</TableCell>
                        <TableCell className="text-white">All measurement functions</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-600">
                        <TableCell className="text-white">RCD Tester</TableCell>
                        <TableCell className="text-white">12 months</TableCell>
                        <TableCell className="text-white">Trip time accuracy, test currents</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-600">
                        <TableCell className="text-white">Loop Impedance Tester</TableCell>
                        <TableCell className="text-white">12 months</TableCell>
                        <TableCell className="text-white">Impedance measurement accuracy</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-600">
                        <TableCell className="text-white">Insulation Tester</TableCell>
                        <TableCell className="text-white">12 months</TableCell>
                        <TableCell className="text-white">Test voltages, current leakage</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-600">
                        <TableCell className="text-white">Voltage Indicator</TableCell>
                        <TableCell className="text-white">6 months</TableCell>
                        <TableCell className="text-white">Voltage detection thresholds</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-4">Daily and Pre-Use Checks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-3">Visual Inspection:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Case integrity and damage assessment</li>
                      <li>• Display clarity and function</li>
                      <li>• Test lead condition and insulation</li>
                      <li>• Probe tip condition and finger guards</li>
                      <li>• Battery level and charging status</li>
                      <li>• Calibration date validity</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-3">Functional Testing:</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• Proving unit verification before use</li>
                      <li>• Null/zero function operation</li>
                      <li>• Auto-ranging function verification</li>
                      <li>• Display and audible indicator function</li>
                      <li>• Safety feature operation</li>
                      <li>• Data storage and recall functions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-600/20 p-4 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">Critical Safety Reminders</h4>
                <ul className="text-red-200 space-y-1 text-sm">
                  <li>• Never use instruments beyond their calibration date</li>
                  <li>• Always verify instrument operation with a proving unit</li>
                  <li>• Report any damage or malfunction immediately</li>
                  <li>• Ensure proper storage in appropriate cases</li>
                  <li>• Keep calibration certificates readily available</li>
                  <li>• Follow manufacturer's maintenance schedules</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Quick Knowledge Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What standard must electrical test instruments comply with?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>BS EN 61557</strong> specifies safety and performance requirements for electrical measuring instruments used for testing electrical installations.</p>
                    </div>
...
                    <div className="mt-3 text-white text-sm">
                      <p>Non-trip testing allows measurement of earth fault loop impedance on RCD-protected circuits without causing the RCD to operate, enabling testing without disrupting the installation.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What is the purpose of non-trip loop testing?
                    </summary>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardHat className="h-5 w-5 text-elec-yellow" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-blue-900/20 border border-blue-600/20 p-4 rounded-lg">
                <h4 className="text-elec-yellow font-semibold mb-2">Scenario: Multi-Site Commercial Testing Contract</h4>
                <p className="text-blue-200 text-sm">
                  You've been awarded a contract to conduct periodic inspection and testing across 15 retail outlets 
                  for a major chain. Each site has different configurations including domestic-type supplies, small power 
                  distribution, lighting circuits, and various protection devices including different RCD types.
                </p>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-3">Equipment Selection Process:</h4>
                <div className="space-y-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Primary Instrument Choice</h5>
                    <p className="text-white text-sm mb-2">Selected: High-specification multifunction tester with data logging</p>
                     <ul className="text-white space-y-1 text-sm">
                      <li>• Covers all required BS 7671 tests in one instrument</li>
                      <li>• Automatic data logging reduces paperwork and errors</li>
                      <li>• Consistent results across all sites</li>
                      <li>• Bluetooth connectivity for instant report generation</li>
                      <li>• Non-trip testing for RCD-protected circuits</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Supporting Equipment</h5>
                     <ul className="text-white space-y-1 text-sm">
                      <li>• <strong>Dedicated RCD tester:</strong> Backup for complex RCD testing scenarios</li>
                      <li>• <strong>PAT tester:</strong> Portable appliance testing requirements</li>
                      <li>• <strong>Phase rotation tester:</strong> Three-phase motor circuits</li>
                      <li>• <strong>Voltage indicator set:</strong> Multiple test leads for different scenarios</li>
                      <li>• <strong>Proving unit:</strong> Calibrated voltage source for safety verification</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Practical Considerations</h5>
                    <ul className="text-white space-y-1 text-sm">
                      <li>• All instruments within current calibration dates</li>
                      <li>• Spare test leads and accessories for each site</li>
                      <li>• Robust carrying cases for transport between sites</li>
                      <li>• Battery chargers and power adaptors</li>
                      <li>• Software licences for report generation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                <p className="text-green-300 font-semibold">Project Outcome:</p>
                <p className="text-green-200 text-sm">
                  The comprehensive equipment selection enabled efficient testing across all sites with consistent, 
                  accurate results. Automated data logging reduced time on site by 30% and eliminated transcription 
                  errors, leading to client satisfaction and contract renewal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I use a basic multimeter for electrical installation testing?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p><strong>No.</strong> Basic multimeters don't meet BS EN 61557 requirements and lack the specific test functions, safety features, and accuracy needed for BS 7671 compliance testing.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How do I know if my test instrument needs recalibrating?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p>Check the calibration certificate date - typically 12 months for most instruments. Also look for erratic readings, failure to zero correctly, or damage to the instrument.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What's the difference between high-current and non-trip loop testing?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p>High-current testing uses normal fault-level currents for accurate measurements but may trip RCDs. Non-trip testing uses lower currents that won't trip RCDs but may be less accurate on some circuits.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I test Type B RCDs with a standard RCD tester?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p>Standard RCD testers only work with Type AC and Type A RCDs. Type B RCDs require specialist test equipment capable of generating DC residual currents and mixed frequencies.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Should I buy individual testers or a multifunction tester?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p>For professional electrical contractors, multifunction testers offer better value, consistency, and efficiency. Individual testers may be suitable for specialists or as backup equipment.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What happens if I use an out-of-calibration instrument?
                    </summary>
                     <div className="mt-3 text-white text-sm">
                      <p>Results may be inaccurate and legally invalid. Insurance may not cover claims, regulatory approval may be withdrawn, and you could face prosecution for non-compliance with safety standards.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How do I choose the right IP rating for site conditions?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>IP54 minimum for normal indoor use, IP65 for dusty/wet environments, IP67 for harsh industrial conditions. Consider the working environment and protection needed for reliable operation.</p>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exercises */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Practical Exercises</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 1: Instrument Selection Matrix</h4>
                   <p className="text-white mb-3">
                    Create a decision matrix for selecting test instruments for different project types.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                      <li>Define project types (domestic, commercial, industrial)</li>
                      <li>List required test functions for each project type</li>
                      <li>Compare individual vs multifunction instruments</li>
                      <li>Consider budget, accuracy, and efficiency factors</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 2: Calibration Schedule Planning</h4>
                   <p className="text-white mb-3">
                    Develop a calibration and maintenance schedule for a test equipment inventory.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Include:</p>
                     <ul className="text-white text-sm space-y-1 list-disc list-inside">
                      <li>Equipment inventory with serial numbers and purchase dates</li>
                      <li>Calibration intervals and due dates</li>
                      <li>Daily check procedures and documentation</li>
                      <li>Budget planning for calibration costs</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 3: Cost-Benefit Analysis</h4>
                  <p className="text-white mb-3">
                    Compare the total cost of ownership for different instrument strategies.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Calculate:</p>
                    <ul className="text-white text-sm space-y-1 list-disc list-inside">
                      <li>Initial purchase costs for different options</li>
                      <li>Annual calibration and maintenance costs</li>
                      <li>Time savings and productivity improvements</li>
                      <li>5-year total cost of ownership comparison</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-green-900/20 border-green-600/20">
            <CardHeader>
              <CardTitle className="text-green-400">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="list-disc list-inside space-y-2">
                <li>Professional electrical testing requires instruments that comply with BS EN 61557 standards</li>
                <li>Multifunction testers offer efficiency and consistency but individual instruments provide specialisation</li>
                <li>Regular calibration every 12 months is essential for accuracy and legal compliance</li>
                <li>Daily pre-use checks and proving unit verification ensure safe and reliable operation</li>
                <li>Selection criteria must consider technical requirements, environmental conditions, and practical needs</li>
                <li>Proper maintenance and documentation protect both safety and business interests</li>
                <li>Investment in quality instruments with appropriate features improves efficiency and professionalism</li>
                <li>Understanding instrument capabilities and limitations is crucial for accurate testing and compliance</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Knowledge Check (10 Questions)</CardTitle>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <QuizResults 
                  questions={quizQuestions} 
                  selectedAnswers={selectedAnswers} 
                  onRestart={restartQuiz}
                />
              ) : (
                <div className="space-y-6">
                  <QuizProgress 
                    currentQuestion={currentQuestion} 
                    totalQuestions={quizQuestions.length} 
                  />
                  
                  <QuizQuestion
                    question={quizQuestions[currentQuestion]}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                  />

                  {selectedAnswer !== undefined && quizQuestions[currentQuestion].explanation && (
                    <Card className="bg-green-900/20 border-green-600/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-green-400 font-semibold text-sm mb-1">Explanation:</p>
                            <p className="text-green-200 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={quizQuestions.length}
                    selectedAnswer={selectedAnswer}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastQuestion={currentQuestion === quizQuestions.length - 1}
                  />
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module2Section4;