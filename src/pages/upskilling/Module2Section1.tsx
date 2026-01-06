import { ArrowLeft, Shield, CheckCircle2, AlertCircle, Brain, XCircle } from 'lucide-react';
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

const Module2Section1 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the first step in the safe isolation procedure?",
      options: [
        "Switch off the circuit",
        "Identify the supply and associated circuits",
        "Test the proving unit",
        "Apply locks and labels"
      ],
      correctAnswer: 1,
      explanation: "Before any isolation work begins, you must first identify the supply and all associated circuits to ensure nothing is missed."
    },
    {
      id: 2,
      question: "How many test leads should be used when testing for dead?",
      options: [
        "One lead only",
        "Two separate test leads",
        "Either one or two leads",
        "Three leads for three-phase systems"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires the use of two separate test leads when testing for dead to ensure reliability and safety."
    },
    {
      id: 3,
      question: "When should you test your proving unit?",
      options: [
        "Only at the start of the day",
        "Before and after testing for dead",
        "Only after testing for dead",
        "Once per week"
      ],
      correctAnswer: 1,
      explanation: "The proving unit must be tested both before and after testing for dead to ensure it's working correctly throughout the procedure."
    },
    {
      id: 4,
      question: "What information must be included on isolation labels?",
      options: [
        "Name only",
        "Date only", 
        "Name, date, and contact details",
        "Just contact details"
      ],
      correctAnswer: 2,
      explanation: "Isolation labels must include the name of the person responsible, date of isolation, and contact details for identification and accountability."
    },
    {
      id: 5,
      question: "True or False: You can begin work immediately after switching off a circuit.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. The complete safe isolation procedure (identify, isolate, secure, test dead, test proving unit) must be followed before work can begin."
    },
    {
      id: 6,
      question: "What is the main purpose of GS38 finger guards on test probes?",
      options: [
        "To improve grip",
        "To prevent accidental contact with live parts",
        "To make the probes easier to see",
        "To protect the probe tips"
      ],
      correctAnswer: 1,
      explanation: "GS38 finger guards prevent accidental contact with live conductors during testing, reducing the risk of electric shock."
    },
    {
      id: 7,
      question: "In three-phase systems, how many isolation points might you need to consider?",
      options: [
        "One at the main isolator only",
        "Multiple points including transformers and sub-distribution",
        "Two points maximum",
        "Only at the equipment being worked on"
      ],
      correctAnswer: 1,
      explanation: "Three-phase systems often have multiple isolation points including main isolators, transformers, sub-distribution boards, and local isolators that must all be considered."
    },
    {
      id: 8,
      question: "What type of lock should be used for electrical isolation?",
      options: [
        "Any padlock will do",
        "A lock that only the person who applied it can remove",
        "A combination lock known to all staff",
        "No lock is needed if labels are applied"
      ],
      correctAnswer: 1,
      explanation: "Each person must use their own unique lock that only they can remove, ensuring individual control over the isolation."
    },
    {
      id: 9,
      question: "What should you do if you find a circuit that won't isolate properly?",
      options: [
        "Continue with the work anyway",
        "Try a different isolation method",
        "Stop work and investigate the problem",
        "Test it anyway to see if it's really live"
      ],
      correctAnswer: 2,
      explanation: "If isolation cannot be achieved properly, work must stop until the problem is investigated and resolved safely."
    },
    {
      id: 10,
      question: "Which voltage levels require special consideration for isolation procedures?",
      options: [
        "Only voltages above 1000V",
        "Only domestic voltage levels",
        "All voltage levels require proper isolation",
        "Only three-phase supplies"
      ],
      correctAnswer: 2,
      explanation: "All electrical supplies, regardless of voltage level, require proper safe isolation procedures to prevent harm."
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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <Badge 
            variant="secondary" 
            className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
          >
            Section 1
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Safe Isolation Procedures
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Essential safety protocols for electrical isolation and lock-off procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Intro */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Quick Intro</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed">
                Safe isolation is the foundation of electrical safety. This section covers the essential procedures 
                for safely isolating electrical supplies before testing or maintenance work. Proper isolation 
                procedures can prevent serious injury or death from electric shock.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Follow the 5-step safe isolation procedure correctly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Understand GS38 requirements for test equipment safety
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Apply proper notification and communication procedures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Safely isolate both single-phase and three-phase systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Apply proper lock-off and labelling procedures
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Communication and Notification */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Communication and Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Before Switching Off</h4>
                  <p className="text-white mb-3">
                    Always inform relevant people before isolation:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Building occupants who may be affected by power loss
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Other tradespeople working in the area
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Security systems and alarm monitoring companies
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Site management or duty electrician
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Critical Systems</h4>
                  <p className="text-white">
                    Special consideration must be given to circuits supplying:
                  </p>
                  <ul className="text-white space-y-2 mt-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Life support equipment
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Fire alarm and emergency lighting systems
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Security systems and CCTV
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Computer servers and data centres
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                      Refrigeration for food or medical storage
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The 7-Step Safe Isolation Procedure */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">The 7-Step Safe Isolation Procedure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 1: Select & Check Test Equipment</h4>
                  <p className="text-white">
                    Select an approved test lamp or voltage indicator complying with GS38. Ensure it's in good 
                    condition with proper finger guards and test leads.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 2: Prove on Known Live Supply</h4>
                  <p className="text-white">
                    Test your equipment on a known live source (proving unit or known live supply) to ensure 
                    it's working correctly before starting isolation.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 3: Identify the Supply</h4>
                  <p className="text-white">
                    Identify the supply and all associated circuits. Check drawings, labels, and circuit charts. 
                    Ensure you understand which circuits may be affected by the isolation.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 4: Isolate the Supply</h4>
                  <p className="text-white">
                    Switch off and disconnect the supply using appropriate isolation devices (main switches, 
                    isolators, circuit breakers, or fuses). Ensure isolation is at all relevant points.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 5: Secure the Isolation</h4>
                  <p className="text-white">
                    Apply locks and warning labels to prevent unauthorised re-energisation. Use appropriate 
                    locking devices and ensure labels include name, date, and contact details.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 6: Test the Circuit is Dead</h4>
                  <p className="text-white">
                    Use your voltage detection equipment to test the circuit is dead. Test between 
                    all live conductors and between live conductors and earth. Use two separate test leads.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-6 py-3">
                  <h4 className="text-elec-yellow font-semibold text-lg mb-2">Step 7: Prove Test Equipment Again</h4>
                  <p className="text-white">
                    Re-test your voltage detection equipment on the known live source (proving unit) to ensure 
                    it remained functional throughout the testing process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GS38 Safety Requirements */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">GS38 Safety Requirements for Test Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Test Lamp Requirements (GS38)</h4>
                  <p className="text-white mb-3">
                    HSE Guidance Note GS38 specifies safety requirements for electrical test equipment:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Test lamps must be clearly visible when energised
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Operating voltage should not exceed 50V AC or 120V DC
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Current should be limited to 0.5mA by series resistor
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Lamp should fail to 'safe' condition if damaged
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Finger Guards and Probe Safety</h4>
                  <p className="text-white mb-3">
                    Test probes must comply with GS38 safety requirements:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Finger guards must be fitted to prevent accidental contact
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Exposed metal tip should not exceed 2mm or be spring-loaded
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Leads must be adequately insulated and in good condition
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Should be clearly marked with voltage rating
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>Remember:</strong> GS38 equipment reduces risk but doesn't eliminate it. 
                    Always follow proper safe isolation procedures regardless of equipment used.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Single-Phase Safe Isolation */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Single-Phase Safe Isolation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Isolation Points</h4>
                  <p className="text-white mb-3">
                    Single-phase circuits typically require isolation at:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Main consumer unit MCB or RCBO
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Local isolation switches where fitted
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Equipment isolators or plugs/sockets
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Testing Requirements</h4>
                  <p className="text-white mb-3">Test between all combinations:</p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Line to Neutral (L-N)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Line to Earth (L-E)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Neutral to Earth (N-E)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three-Phase Safe Isolation */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Three-Phase Safe Isolation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Complex Isolation Requirements</h4>
                  <p className="text-white mb-3">
                    Three-phase systems present additional complexity and require careful consideration of:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Main three-phase isolator or switch disconnector
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Distribution board isolators and MCBs
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Transformer primary and secondary supplies
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Motor control centre isolators
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Sub-distribution and final circuit isolators
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Critical Safety Point: Earth Probe First</h4>
                  <div className="bg-red-900/20 p-4 rounded-lg mb-4">
                    <p className="text-red-300 font-semibold mb-2">
                      ALWAYS earth your probe before testing any three-phase system!
                    </p>
                    <p className="text-white text-sm">
                      This prevents dangerous potential differences from building up and protects you from shock. 
                      Connect your probe to a known good earth point before beginning any voltage tests.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Correct Testing Sequence</h4>
                  <p className="text-white mb-3">
                    Follow this specific order when testing three-phase systems for dead:
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h5 className="text-green-400 font-semibold mb-2">1. Earth-to-Phase Tests (FIRST)</h5>
                      <ul className="text-white space-y-1 text-sm">
                        <li>• Earth to L1 (E-L1)</li>
                        <li>• Earth to L2 (E-L2)</li>
                        <li>• Earth to L3 (E-L3)</li>
                      </ul>
                      <p className="text-gray-400 text-sm mt-2 italic">
                        Testing to earth first ensures safe potential difference before phase-to-phase testing
                      </p>
                    </div>

                    <div className="border-l-4 border-elec-yellow pl-4 py-2">
                      <h5 className="text-elec-yellow font-semibold mb-2">2. Phase-to-Phase Tests (SECOND)</h5>
                      <ul className="text-white space-y-1 text-sm">
                        <li>• L1 to L2</li>
                        <li>• L2 to L3</li>
                        <li>• L3 to L1</li>
                      </ul>
                      <p className="text-gray-400 text-sm mt-2 italic">
                        Only test phase-to-phase after confirming all phases are dead to earth
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <h5 className="text-purple-400 font-semibold mb-2">3. Neutral Tests (IF APPLICABLE)</h5>
                      <ul className="text-white space-y-1 text-sm">
                        <li>• Neutral to Earth (N-E)</li>
                        <li>• L1, L2, L3 to Neutral (if required)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-900/20 p-4 rounded-lg mt-4">
                    <p className="text-orange-300 text-sm">
                      <strong>Why This Order Matters:</strong> Testing earth-to-phase first ensures you're working 
                      with known safe potentials. If any phase still has voltage to earth, you'll detect it before 
                      attempting potentially dangerous phase-to-phase measurements.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Special Considerations</h4>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      Star/Delta motor connections - check both ends
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      Parallel cable runs - isolate all phases
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      Backup generators or UPS systems
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      Interlocked systems and automatic changeover switches
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>Practical Tip:</strong> Always carry a separate earth lead and establish a good earth 
                    connection before starting any three-phase testing. This is your safety lifeline.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proving Units and Test Equipment */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Proving Units and Test Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Voltage Detection Devices</h4>
                  <p className="text-white mb-3">
                    Use appropriate voltage detection equipment such as digital voltmeters, test lamps, 
                    or voltage indicators. Equipment must be suitable for the voltage and type of system.
                  </p>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Proving Units</h4>
                  <p className="text-white mb-3">
                    Proving units provide a known voltage source to verify test equipment is working. 
                    They must be used before and after every test-for-dead procedure.
                  </p>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Test Lead Requirements</h4>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Use two separate test leads when testing for dead
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Ensure leads are in good condition with no damage
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Check lead continuity before use
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lock-off and Labelling */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Lock-off and Labelling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Physical Locking</h4>
                  <p className="text-white mb-3">
                    Use appropriate locking devices such as padlocks, lockout hasps, or miniature circuit 
                    breaker lockouts. Each person working on the circuit should apply their own lock.
                  </p>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Warning Labels</h4>
                  <p className="text-white mb-3">Labels must include:</p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Name of the person responsible for the isolation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Date and time of isolation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Contact details (phone number)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                      Clear warning message
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-2">Multi-Person Working</h4>
                  <p className="text-white">
                    When multiple people are working on the same circuit, each person must apply their 
                    own lock and label. The circuit can only be re-energised when all locks are removed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* On-the-Job Scenario */}
          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white text-xl">On-the-Job Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Scenario:</h4>
                  <p className="text-white">
                    You're called to test a kitchen ring circuit in a domestic property. The homeowner 
                    mentions that some sockets aren't working, and they've been using extension leads 
                    from other rooms.
                  </p>
                </div>

                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Your approach:</h4>
                  <ol className="text-white space-y-2 list-decimal list-inside">
                    <li>Inform the homeowner you need to switch off the kitchen power temporarily</li>
                    <li>Locate and identify the kitchen ring circuit MCB in the consumer unit</li>
                    <li>Follow the 7-step isolation procedure completely</li>
                    <li>Test all sockets on the ring circuit using appropriate test methods</li>
                    <li>Only re-energise after completing all tests and removing locks/labels</li>
                  </ol>
                </div>

                <div className="bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>Key Point:</strong> Even in familiar domestic settings, never skip the isolation 
                    procedure. Kitchen circuits often supply multiple appliances and safety is paramount.
                  </p>
                </div>
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
                      What are the 7 steps of safe isolation?
                    </summary>
                    <div className="mt-3 text-white text-sm space-y-2">
                      <p>1. <strong>Select & Check</strong> - test equipment (GS38 compliant)</p>
                      <p>2. <strong>Prove on Live</strong> - test equipment on known live supply</p>
                      <p>3. <strong>Identify</strong> - the supply and associated circuits</p>
                      <p>4. <strong>Isolate</strong> - switch off and disconnect the supply</p>
                      <p>5. <strong>Secure</strong> - apply locks and warning labels</p>
                      <p>6. <strong>Test Dead</strong> - use voltage detection equipment</p>
                      <p>7. <strong>Prove Again</strong> - re-test equipment on known live supply</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Why test earth-to-phase first on three-phase systems?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Testing earth-to-phase first ensures you're working with safe potential differences. If any phase still has voltage to earth, you'll detect it before attempting potentially dangerous phase-to-phase measurements.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What information must be on isolation labels?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Name of person responsible, date and time of isolation, contact details (phone number), and a clear warning message.</p>
                    </div>
                  </details>
                </div>
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
                      Can I use just one test lead when testing for dead?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>No.</strong> BS 7671 specifically requires the use of two separate test leads when testing for dead. This provides redundancy and ensures reliability of the test.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Do I need to test the proving unit after every single test?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Yes.</strong> The proving unit must be tested both before and after the complete test-for-dead procedure to ensure your voltage detector remained functional throughout.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What if I can't find the right isolator for a circuit?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Stop work immediately.</strong> You must properly identify the supply before proceeding. Check circuit charts, trace cables, or consult with building management. Never guess or proceed without proper identification.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      Can I skip isolation for low voltage work like testing sockets?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p><strong>Never.</strong> All electrical work requires proper isolation regardless of voltage level. Domestic 230V supply can kill, and safe isolation procedures are mandatory for all testing work.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      What if someone else needs to access the same circuit?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Each person working on the circuit must apply their own lock and label. Use a lockout hasp or multi-lock device. The circuit can only be re-energised when ALL locks are removed by their respective owners.</p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-elec-yellow font-semibold flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">▶</span>
                      How long should I keep isolation labels in place?
                    </summary>
                    <div className="mt-3 text-white text-sm">
                      <p>Labels should remain in place for the entire duration of the work. Only remove locks and labels when the work is complete and the circuit is ready to be re-energised. Document the removal time.</p>
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
                <Shield className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Practical Exercises</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 1: Domestic Consumer Unit</h4>
                  <p className="text-white mb-3">
                    You need to test the downstairs lighting circuit in a domestic property.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                      <li>List the 5 steps you must follow</li>
                      <li>Identify what tests you need to perform</li>
                      <li>State what must be included on your isolation label</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 2: Three-Phase Motor Testing</h4>
                  <p className="text-white mb-3">
                    You're testing a three-phase motor feed in an industrial setting.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                      <li>List all possible isolation points you must consider</li>
                      <li>State the correct testing sequence (earth-to-phase first!)</li>
                      <li>Explain why you must earth your probe first</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-semibold mb-3">Exercise 3: Equipment Failure Scenario</h4>
                  <p className="text-white mb-3">
                    Your voltage detector isn't working on the proving unit after testing for dead.
                  </p>
                  <div className="bg-transparent/50 p-4 rounded-lg">
                    <p className="text-elec-yellow font-semibold mb-2">Your task:</p>
                    <p className="text-white text-sm">
                      What immediate actions must you take? Think about the implications 
                      and what this means for your test results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Always notify relevant people before switching off supplies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Use only GS38 compliant test equipment with finger guards
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Earth the probe first when testing three-phase systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Test earth-to-phase before phase-to-phase in three-phase systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  The 7-step safe isolation procedure is non-negotiable
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Always use a proving unit before and after testing for dead
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Two separate test leads are required when testing for dead
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white text-xl">Knowledge Check (10 Questions)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-white">
                    Test your understanding of safe isolation procedures.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-2"
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : showResults ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-elec-yellow">{percentage}%</div>
                    <p className="text-xl text-white">
                      You scored {score} out of {quizQuestions.length}
                    </p>
                    <p className="text-white">
                      {percentage >= 80 ? "Excellent! You have a solid understanding of safe isolation procedures." : 
                       percentage >= 60 ? "Good effort! Review the material and try again." : 
                       "Keep studying the safe isolation procedures and retake the quiz."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Review Your Answers:</h3>
                    {quizQuestions.map((question, index) => {
                      const userAnswer = selectedAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      return (
                        <div key={question.id} className="bg-transparent/80 p-4 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-white font-medium">Question {index + 1}: {question.question}</p>
                              <p className="text-white text-sm mt-1">
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
                      className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-6 py-2"
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
                      className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
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
                              ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                              : 'border-gray-600 bg-transparent/80 text-white hover:border-elec-yellow/30 hover:bg-elec-yellow/10'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="bg-gray-600 text-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2"
                    >
                      Previous
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Footer Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Link to="module-2/section-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-3 text-lg">
              Next Section: RAMS →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Module2Section1;