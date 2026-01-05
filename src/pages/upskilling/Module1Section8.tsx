
import { ArrowLeft, BookOpen, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const Module1Section8 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does EICR stand for?",
      options: [
        "Electrical Installation Compliance Record",
        "Electrical Inspection Condition Record", 
        "Electrical Installation Condition Report",
        "Electrical Insulation Confirmation Report"
      ],
      correctAnswer: 2,
      explanation: "EICR stands for Electrical Installation Condition Report, which is used during periodic inspection to assess the safety and condition of existing electrical installations."
    },
    {
      id: 2,
      question: "What is Zs?",
      options: [
        "Resistance of the CPC",
        "Loop impedance of the fault path",
        "Insulation resistance of the socket",
        "Zener test current"
      ],
      correctAnswer: 1,
      explanation: "Zs is the Earth Fault Loop Impedance - the total impedance from the source to the point of fault and back through the earth path."
    },
    {
      id: 3,
      question: "True or False: MEIWC is used for full rewires.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. MEIWC (Minor Electrical Installation Works Certificate) is used for small additions or changes, not full rewires. Full rewires require an EIC (Electrical Installation Certificate)."
    },
    {
      id: 4,
      question: "Which device trips if earth leakage is detected?",
      options: [
        "MCB",
        "SPD",
        "RCD",
        "RCBO"
      ],
      correctAnswer: 2,
      explanation: "RCD (Residual Current Device) trips when detecting imbalance between line and neutral currents, typically caused by earth leakage."
    },
    {
      id: 5,
      question: "What does IR testing check for?",
      options: [
        "Circuit loading",
        "Cable routing",
        "Insulation damage or faults",
        "Voltage drop"
      ],
      correctAnswer: 2,
      explanation: "IR (Insulation Resistance) testing checks the condition of insulation between conductors to identify potential insulation damage or faults."
    },
    {
      id: 6,
      question: "What does PSC stand for?",
      options: [
        "Protective Safety Current",
        "Prospective Short Circuit",
        "Power Supply Connection",
        "Primary Safety Control"
      ],
      correctAnswer: 1,
      explanation: "PSC stands for Prospective Short Circuit - the maximum current that could flow during a short circuit fault between live conductors."
    },
    {
      id: 7,
      question: "Which regulation in EAWR 1989 requires competent persons?",
      options: [
        "Regulation 4",
        "Regulation 12",
        "Regulation 16",
        "Regulation 20"
      ],
      correctAnswer: 2,
      explanation: "Regulation 16 of EAWR 1989 specifically requires that persons working on electrical systems must be competent or under appropriate supervision."
    },
    {
      id: 8,
      question: "What does CPC stand for?",
      options: [
        "Circuit Protection Cable",
        "Circuit Protective Conductor",
        "Central Power Connection",
        "Continuous Power Cable"
      ],
      correctAnswer: 1,
      explanation: "CPC stands for Circuit Protective Conductor - the earth wire that provides the path for fault current in a circuit."
    },
    {
      id: 9,
      question: "What is the minimum insulation resistance for circuits up to 500V?",
      options: [
        "0.5 MΩ",
        "1 MΩ",
        "2 MΩ",
        "5 MΩ"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits rated up to 500V to ensure adequate insulation."
    },
    {
      id: 10,
      question: "What does functional testing verify?",
      options: [
        "Cable insulation condition",
        "Earth fault loop impedance",
        "Correct operation of switches and controls",
        "Prospective fault current"
      ],
      correctAnswer: 2,
      explanation: "Functional testing verifies the correct operation of switches, controls, indicators, and other equipment to ensure they work as intended."
    }
  ];

  const terms = [
    {
      term: "BS7671",
      definition: "British Standard for electrical installations, also known as the IET Wiring Regulations."
    },
    {
      term: "EAWR 1989",
      definition: "Electricity at Work Regulations – the law requiring all electrical work to be safe."
    },
    {
      term: "EIC",
      definition: "Electrical Installation Certificate – used for new installations or major alterations."
    },
    {
      term: "MEIWC",
      definition: "Minor Electrical Installation Works Certificate – used for small additions or changes."
    },
    {
      term: "EICR",
      definition: "Electrical Installation Condition Report – used during periodic inspection."
    },
    {
      term: "CPC",
      definition: "Circuit Protective Conductor – the earth wire in a circuit."
    },
    {
      term: "Zs",
      definition: "Earth Fault Loop Impedance – total impedance from the source to the point of fault and back."
    },
    {
      term: "Ze",
      definition: "External Earth Fault Loop Impedance – measured at the incoming supply."
    },
    {
      term: "PSC / PEFC",
      definition: "Prospective Short Circuit / Earth Fault Current – the maximum current that could flow in a fault."
    },
    {
      term: "RCD",
      definition: "Residual Current Device – trips when detecting imbalance (e.g. earth leakage)."
    },
    {
      term: "IR",
      definition: "Insulation Resistance – checks insulation condition between conductors."
    },
    {
      term: "Polarity",
      definition: "Verifies correct connection of line, neutral, and earth conductors."
    },
    {
      term: "Functional Testing",
      definition: "Tests that confirm correct operation of switches, controls, and devices."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <Badge 
            variant="secondary" 
            className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
          >
            Section 8
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Terminology Refresher
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Quick-reference glossary of common inspection and testing terms
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Quick Intro */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white text-xl">Quick Intro</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed">
                This section gives you a comprehensive quick-reference glossary of essential inspection and testing terms. 
                These will appear throughout the course, in BS 7671, on certificates, and in the field. Master these terms to build confidence and professional competency.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Recognise key industry terms used in testing and inspection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Understand abbreviations commonly found in BS7671 and on certificates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Build confidence reading and completing test documents
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Apply terminology correctly in professional communications
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Interpret test results using industry-standard language
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Core Terms & Definitions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Essential Terminology Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* Core Testing Terms */}
                <div className="mb-6">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-4 border-b border-yellow-400/30 pb-2">Core Testing & Inspection Terms</h4>
                  <div className="grid gap-3">
                    {terms.slice(0, 6).map((item, index) => (
                      <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2 bg-card/50">
                        <h4 className="text-yellow-400 font-semibold text-lg">{item.term}</h4>
                        <p className="text-white mt-1">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testing Measurements */}
                <div className="mb-6">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-4 border-b border-yellow-400/30 pb-2">Testing Measurements & Values</h4>
                  <div className="grid gap-3">
                    {terms.slice(6, 13).map((item, index) => (
                      <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2 bg-blue-900/10">
                        <h4 className="text-yellow-400 font-semibold text-lg">{item.term}</h4>
                        <p className="text-white mt-1">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Professional Terms */}
                <div className="mb-6">
                  <h4 className="text-green-400 font-semibold text-lg mb-4 border-b border-green-400/30 pb-2">Additional Professional Terms</h4>
                  <div className="grid gap-3">
                    {[
                      { term: "MCB", definition: "Miniature Circuit Breaker - automatic switch providing overcurrent protection for circuits." },
                      { term: "RCBO", definition: "Residual Current Breaker with Overcurrent protection - combines RCD and MCB functions." },
                      { term: "SPD", definition: "Surge Protection Device - protects against voltage spikes and transient overvoltages." },
                      { term: "TNS/TNC-S", definition: "Earthing system types - describes how the supply earth and neutral are configured." },
                      { term: "PME", definition: "Protective Multiple Earthing - specific type of supply earthing arrangement." },
                      { term: "R1 + R2", definition: "Combined resistance of line and CPC conductors in a circuit." },
                      { term: "rcd", definition: "Residual current (sensitivity rating of RCD, e.g., 30mA)." },
                      { term: "PFC", definition: "Prospective Fault Current - maximum current that could flow during a fault condition." },
                      { term: "SELV/PELV", definition: "Safety Extra Low Voltage/Protective Extra Low Voltage - systems operating at ≤50V AC." },
                      { term: "IP Rating", definition: "Ingress Protection rating - defines protection against solids and liquids (e.g., IP65)." },
                      { term: "Continuity", definition: "Test confirming complete electrical path exists in protective conductors and bonding." },
                      { term: "Ring Final", definition: "Circuit configuration where conductors form a complete ring back to the distribution board." },
                      { term: "Radial Circuit", definition: "Circuit configuration where conductors run from source to end point without returning." },
                      { term: "Cross-sectional Area", definition: "Size of conductor measured in mm² - determines current carrying capacity." },
                      { term: "Diversity", definition: "Statistical reduction applied to design calculations based on simultaneous usage." }
                    ].map((item, index) => (
                      <div key={index} className="border-l-4 border-green-400 pl-4 py-2 bg-green-900/10">
                        <h4 className="text-green-400 font-semibold text-lg">{item.term}</h4>
                        <p className="text-white mt-1">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurement Units & Values */}
                <div className="mb-6">
                  <h4 className="text-purple-400 font-semibold text-lg mb-4 border-b border-purple-400/30 pb-2">Critical Measurement Units & Typical Values</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-400/30">
                      <h5 className="text-purple-300 font-semibold mb-3">Resistance & Impedance</h5>
                      <ul className="space-y-2 text-sm text-white">
                        <li>• Ohms (Ω) - basic unit of resistance</li>
                        <li>• Milliohms (mΩ) - 1/1000th of an ohm</li>
                        <li>• Megaohms (MΩ) - 1,000,000 ohms</li>
                        <li>• Typical Zs values: 0.35Ω - 1.44Ω</li>
                        <li>• Min IR values: 1MΩ (circuits ≤500V)</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-400/30">
                      <h5 className="text-purple-300 font-semibold mb-3">Current & Voltage</h5>
                      <ul className="space-y-2 text-sm text-white">
                        <li>• Amperes (A) - current flow</li>
                        <li>• Milliamperes (mA) - 1/1000th amp</li>
                        <li>• Volts (V) - electrical potential</li>
                        <li>• RCD ratings: 30mA, 100mA, 300mA</li>
                        <li>• UK supply: 230V single phase, 400V three phase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Learning Section */}
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
                Interactive Learning Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-900/40 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-blue-300 font-semibold mb-3">Term Matching Challenge</h4>
                  <p className="text-white text-sm mb-3">Match the abbreviation to its full meaning:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-blue-800/30 rounded">
                      <span className="text-blue-200 font-medium">EICR</span>
                      <span className="text-white">→</span>
                      <span className="text-gray-300">Electrical Installation Condition Report</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-800/30 rounded">
                      <span className="text-blue-200 font-medium">CPC</span>
                      <span className="text-white">→</span>
                      <span className="text-gray-300">Circuit Protective Conductor</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-800/30 rounded">
                      <span className="text-blue-200 font-medium">RCD</span>
                      <span className="text-white">→</span>
                      <span className="text-gray-300">Residual Current Device</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/40 p-4 rounded-lg border border-purple-400/30">
                  <h4 className="text-purple-300 font-semibold mb-3">Fill-in-the-Blank Scenarios</h4>
                  <p className="text-white text-sm mb-3">Complete these professional statements:</p>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-purple-800/30 rounded">
                      <p className="text-white">"The <span className="text-purple-300 font-medium">Zs</span> reading of 1.2Ω exceeds the maximum permitted value."</p>
                    </div>
                    <div className="p-3 bg-purple-800/30 rounded">
                      <p className="text-white">"<span className="text-purple-300 font-medium">IR</span> testing revealed 0.8MΩ, which is below the required 1MΩ minimum."</p>
                    </div>
                    <div className="p-3 bg-purple-800/30 rounded">
                      <p className="text-white">"The <span className="text-purple-300 font-medium">RCD</span> tripped at 28mA within the required time limit."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg border border-green-400/30">
                <h4 className="text-green-300 font-semibold mb-3">Certificate Reading Practice</h4>
                <p className="text-white text-sm mb-3">Understanding terminology as it appears on real certificates:</p>
                <div className="grid md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-gray-800/50 p-3 rounded border border-green-400/20">
                    <h5 className="text-green-300 font-medium mb-2">EIC Section</h5>
                    <ul className="text-white space-y-1">
                      <li>• Design current (Ib)</li>
                      <li>• Protective device (In)</li>
                      <li>• Cable CSA (mm²)</li>
                      <li>• Method of installation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded border border-green-400/20">
                    <h5 className="text-green-300 font-medium mb-2">Test Results</h5>
                    <ul className="text-white space-y-1">
                      <li>• R1 + R2 (mΩ)</li>
                      <li>• Zs (Ω)</li>
                      <li>• IR (MΩ)</li>
                      <li>• RCD trip time (ms)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded border border-green-400/20">
                    <h5 className="text-green-300 font-medium mb-2">EICR Codes</h5>
                    <ul className="text-white space-y-1">
                      <li>• C1 - Danger present</li>
                      <li>• C2 - Potentially dangerous</li>
                      <li>• C3 - Improvement recommended</li>
                      <li>• FI - Further investigation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Real-World Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-yellow-400 font-semibold text-lg">Where You'll Encounter These Terms</h4>
                  <div className="space-y-3">
                    <div className="bg-card/50 p-3 rounded-lg border-l-4 border-yellow-400">
                      <h5 className="text-white font-medium mb-1">BS 7671 Regulations</h5>
                      <p className="text-white text-sm">Technical requirements, test procedures, and compliance criteria reference these terms throughout.</p>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg border-l-4 border-yellow-400">
                      <h5 className="text-white font-medium mb-1">Test Certificates</h5>
                      <p className="text-white text-sm">EIC, MEIWC, and EICR forms use abbreviations and technical terms for efficient documentation.</p>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg border-l-4 border-green-400">
                      <h5 className="text-white font-medium mb-1">Equipment Manuals</h5>
                      <p className="text-white text-sm">Testing instrument instructions and specifications use industry-standard terminology.</p>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg border-l-4 border-purple-400">
                      <h5 className="text-white font-medium mb-1">Professional Communication</h5>
                      <p className="text-white text-sm">Reports, emails, and discussions with clients and colleagues require precise technical language.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-yellow-400 font-semibold text-lg">Common Misunderstandings</h4>
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-400/30">
                      <h5 className="text-red-300 font-medium mb-1">❌ "Zs" vs "Ze"</h5>
                      <p className="text-white text-sm">Ze is external (supply), Zs is total loop impedance including the circuit.</p>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-400/30">
                      <h5 className="text-red-300 font-medium mb-1">❌ "RCD" vs "RCBO"</h5>
                      <p className="text-white text-sm">RCD detects leakage only; RCBO combines RCD function with overcurrent protection.</p>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-400/30">
                      <h5 className="text-red-300 font-medium mb-1">❌ "EIC" vs "EICR"</h5>
                      <p className="text-white text-sm">EIC for new work/major changes; EICR for periodic inspection of existing installations.</p>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-400/30">
                      <h5 className="text-red-300 font-medium mb-1">❌ Resistance Units</h5>
                      <p className="text-white text-sm">mΩ (milliohms) for low resistance, Ω (ohms) for impedance, MΩ (megaohms) for insulation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* On-the-Job Tip */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white text-xl">Professional Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-blue-300 font-semibold mb-2">Memory Aids</h4>
                  <p className="text-white text-sm mb-3">
                    Create acronyms and associations to remember complex terms. For example: "RCD Rapidly Cuts Danger" or "Zs = Zero to Source (and back)".
                  </p>
                  <h4 className="text-blue-300 font-semibold mb-2">Reference Strategy</h4>
                  <p className="text-white text-sm">
                    Keep this glossary accessible during training and early career work. Gradually, these terms become second nature through regular use.
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-300 font-semibold mb-2">Professional Presentation</h4>
                  <p className="text-white text-sm mb-3">
                    Using correct terminology demonstrates competency and professionalism. Clients and colleagues recognise proper technical language.
                  </p>
                  <h4 className="text-blue-300 font-semibold mb-2">Continuous Learning</h4>
                  <p className="text-white text-sm">
                    Industry terminology evolves with technology and standards. Stay current through CPD and professional development activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  These terms appear in test reports, wiring diagrams, and exams
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Knowing them saves time, prevents mistakes, and builds confidence
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Bookmark this list for revision and site use
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Proper terminology demonstrates professional competency
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Understanding abbreviations speeds up certificate completion
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: EICR</h4>
                  <p className="text-sm">What does EICR stand for?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Electrical Installation Condition Report</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Earth Fault Loop</h4>
                  <p className="text-sm">What does Zs measure?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Earth Fault Loop Impedance - total impedance from source to fault and back</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: CPC</h4>
                  <p className="text-sm">What does CPC stand for?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Circuit Protective Conductor (the earth wire)</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: RCD Function</h4>
                  <p className="text-sm">What causes an RCD to trip?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Imbalance between line and neutral currents (earth leakage)</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Why do I need to learn all these technical terms?</h4>
                  <p className="text-sm text-white">A: These terms are the language of electrical inspection and testing. You'll encounter them in BS 7671, on certificates, in equipment manuals, and when communicating with other professionals. Understanding them is essential for competency.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What's the difference between Ze and Zs?</h4>
                  <p className="text-sm text-white">A: Ze is the External Earth Fault Loop Impedance measured at the incoming supply. Zs is the total Earth Fault Loop Impedance measured at the final circuit. Zs includes Ze plus the impedance of the circuit protective conductor.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Are there other terms I should know beyond this list?</h4>
                  <p className="text-sm text-gray-300">A: Yes, this covers the core terms for Module 1. As you progress through the course, you'll encounter more specialized terminology related to specific testing procedures, equipment types, and installation methods.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How should I remember all these abbreviations?</h4>
                  <p className="text-sm text-gray-300">A: Focus on understanding what each one measures or represents rather than just memorizing letters. For example, remember that Zs measures the complete earth fault path, not just that it starts with 'Z'. Understanding the function helps retention.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Will I be tested on these terms in exams?</h4>
                  <p className="text-sm text-gray-300">A: Absolutely. Professional electrical qualifications, including City & Guilds 2391, will test your knowledge of electrical terminology. More importantly, you need to understand these terms to work safely and effectively.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: Should I create my own abbreviations for notes?</h4>
                  <p className="text-sm text-gray-300">A: Stick to industry-standard abbreviations to avoid confusion. When completing certificates or communicating with others, always use the correct standard terminology. Consistency prevents misunderstandings and ensures professional credibility.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Aids */}
          <Card className="bg-green-600/10 border-green-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-400" />
                Memory Aids for Key Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Testing Certificates</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>EIC:</strong> New installations (E-I-C = Electrical Installation Certificate)</li>
                    <li>• <strong>EICR:</strong> Periodic checks (add 'R' for Report)</li>
                    <li>• <strong>MEIWC:</strong> Minor work (starts with 'M' for Minor)</li>
                  </ul>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Impedance Terms</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Ze:</strong> External (starts with 'E')</li>
                    <li>• <strong>Zs:</strong> System total (includes 's' for system)</li>
                    <li>• Both measure earth fault loop impedance paths</li>
                  </ul>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Protection Devices</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>RCD:</strong> Residual Current (watches for imbalance)</li>
                    <li>• <strong>MCB:</strong> Miniature Circuit Breaker (overcurrent)</li>
                    <li>• <strong>RCBO:</strong> Combines both functions</li>
                  </ul>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Testing Types</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>IR:</strong> Insulation Resistance (between conductors)</li>
                    <li>• <strong>PSC/PEFC:</strong> Prospective fault currents</li>
                    <li>• <strong>Functional:</strong> Does it work as intended?</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Comprehensive Quiz - 10 Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your knowledge of electrical terminology with this expanded 10-question quiz covering all the key terms and concepts you'll encounter in inspection and testing.
              </p>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    Test your knowledge of the terminology covered in this section.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-yellow-400 text-black hover:bg-yellow-400 font-semibold px-8 py-2"
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : showResults ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-yellow-400">{percentage}%</div>
                    <p className="text-xl text-white">
                      You scored {score} out of {quizQuestions.length}
                    </p>
                    <p className="text-gray-300">
                      {percentage >= 80 ? "Excellent work!" : 
                       percentage >= 60 ? "Good effort! Review the terminology and try again." : 
                       "Keep studying the terminology and retake the quiz."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Review Your Answers:</h3>
                    {quizQuestions.map((question, index) => {
                      const userAnswer = selectedAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      return (
                        <div key={question.id} className="bg-card/80 p-4 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-white font-medium">Question {index + 1}: {question.question}</p>
                              <p className="text-gray-300 text-sm mt-1">
                                Your answer: {question.options[userAnswer]} 
                                {!isCorrect && (
                                  <span className="text-red-400"> (Incorrect)</span>
                                )}
                              </p>
                              {!isCorrect && (
                                <p className="text-green-400 text-sm">
                                  Correct answer: {question.options[question.correctAnswer]}
                                </p>
                              )}
                              {question.explanation && (
                                <p className="text-gray-400 text-sm mt-2 italic">
                                  {question.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={resetQuiz}
                      className="bg-yellow-400 text-black hover:bg-yellow-400 font-semibold px-6 py-2"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% Complete</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">
                      {currentQuestion.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? 'border-yellow-400 bg-yellow-600/20 text-white'
                              : 'border-gray-600 bg-card/80 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                          }`}
                        >
                          <span className="font-medium mr-3">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-yellow-400 text-black hover:bg-yellow-400 font-semibold disabled:opacity-50"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
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

export default Module1Section8;
