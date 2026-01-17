import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "P Category Systems (Property Protection) - Fire Alarm Course";
const DESCRIPTION = "Learn about BS 5839-1 P categories for property protection: P1 and P2 coverage, insurer requirements, and system selection.";

const FireAlarmModule1Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary purpose of P category systems under BS 5839-1?',
      options: [
        'Life safety through early warning for evacuation',
        'Property protection and minimising asset damage',
        'Manual activation only via call points',
        'Providing emergency lighting'
      ],
      correctAnswer: 1,
      explanation: 'P category systems are designed for property protection, aiming to minimise damage to buildings and contents.'
    },
    {
      id: 2,
      question: 'Which of the following best describes a P1 system?',
      options: [
        'Detection in high-risk areas only',
        'Automatic detection throughout all areas for maximum property protection',
        'Manual call points only',
        'Detection on escape routes only'
      ],
      correctAnswer: 1,
      explanation: 'P1 provides automatic detection throughout all areas to detect any fire at the earliest possible stage for property protection.'
    },
    {
      id: 3,
      question: 'A P2 system provides detection in which areas?',
      options: [
        'Escape routes only',
        'All areas of the building',
        'Defined high-value or high-risk areas only',
        'Only plant rooms and stores'
      ],
      correctAnswer: 2,
      explanation: 'P2 provides targeted detection in defined high-value or high-risk areas where property protection is specifically required.'
    },
    {
      id: 4,
      question: 'Insurers typically require property protection to be provided by:',
      options: [
        'M category only',
        'L4 systems',
        'P1 or P2 depending on risk and coverage requirements',
        'Manual call points only'
      ],
      correctAnswer: 2,
      explanation: 'Insurers commonly specify P1 for comprehensive coverage or P2 for targeted high-value area protection.'
    },
    {
      id: 5,
      question: 'Which building area would most likely require P2 protection?',
      options: [
        'General office space',
        'Server room or data centre',
        'Reception area',
        'Toilet facilities'
      ],
      correctAnswer: 1,
      explanation: 'Server rooms and data centres contain high-value equipment requiring targeted property protection.'
    },
    {
      id: 6,
      question: 'Can P and L categories be combined in the same building?',
      options: [
        'No, only one category can be specified',
        'Yes, it is common to combine L3 for life safety with P2 for property protection',
        'Only if required by Building Regulations',
        'Only in industrial premises'
      ],
      correctAnswer: 1,
      explanation: 'Combined categories are common - L categories address life safety while P categories address property protection objectives.'
    },
    {
      id: 7,
      question: 'What is a key difference between P1 and L1?',
      options: [
        'P1 covers more areas',
        'L1 is for life safety, P1 is for property protection - coverage may be similar but objectives differ',
        'P1 does not require automatic detection',
        'L1 is cheaper to install'
      ],
      correctAnswer: 1,
      explanation: 'While coverage may be similar, L1 prioritises early warning for evacuation whereas P1 prioritises early detection for asset protection.'
    },
    {
      id: 8,
      question: 'Third-party certification for fire alarm contractors is often required by:',
      options: [
        'Building Regulations only',
        'Insurers to ensure quality and competence',
        'The fire brigade',
        'Local planning authorities'
      ],
      correctAnswer: 1,
      explanation: 'Insurers frequently require third-party certified contractors (BAFE, LPCB) to ensure installation quality and reduce risk.'
    },
    {
      id: 9,
      question: 'For a warehouse storing high-value goods, which P category is most appropriate?',
      options: [
        'No P category needed',
        'P1 for comprehensive protection throughout',
        'P2 for targeted areas only',
        'M category'
      ],
      correctAnswer: 1,
      explanation: 'Warehouses with high-value goods typically require P1 for comprehensive early detection throughout all storage areas.'
    },
    {
      id: 10,
      question: 'What documentation should specify the extent of P category coverage?',
      options: [
        'Weekly test records only',
        'The fire strategy, risk assessment, and design documentation',
        'Insurance policy only',
        'User training manual'
      ],
      correctAnswer: 1,
      explanation: 'P category coverage should be defined in the fire strategy and design documentation, often informed by insurer requirements.'
    }
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((q) => q + 1);
    else setShowResults(true);
  };

  const handlePrevious = () => setCurrentQuestion((q) => Math.max(0, q - 1));

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setShowResults(false);
  };

  const calculateScore = () =>
    selectedAnswers.reduce((acc, ans, i) => (ans === questions[i].correctAnswer ? acc + 1 : acc), 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Shield className="h-7 w-7 text-blue-400" />
          </div>
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide">
            Section 2 of 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          P Category Systems (Property)
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding BS 5839-1 P categories for property protection, asset preservation, and insurer requirements.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            20-25 mins
          </span>
        </div>
      </section>

      {/* In 30 Seconds Card */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-blue-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>P categories</strong> protect property and assets, not primarily life safety</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>P1 = full coverage</strong> throughout, P2 = targeted high-value areas only</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Insurers</strong> commonly specify P categories to reduce loss and business interruption</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Define the purpose of P category fire alarm systems",
            "Differentiate between P1 and P2 coverage requirements",
            "Identify typical applications for property protection",
            "Explain insurer requirements and third-party certification",
            "Understand how to combine L and P categories",
            "Apply P category selection principles to scenarios"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-blue-400">{i + 1}</span>
                </div>
                <p className="text-[13px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-6 max-w-3xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">What Are P Categories?</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>P categories under BS 5839-1 are designed to protect <strong className="text-white">property and assets</strong>. The primary objective is early detection to minimise damage to buildings, contents, and enable rapid response to protect business continuity.</p>
              <p>The "P" stands for "Property" protection. These systems prioritise detection coverage to protect valuable assets and reduce financial loss from fire damage.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">P1 - Full Property Protection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">P1</strong> provides automatic fire detection throughout <strong className="text-white">all areas</strong> of the building. The aim is to detect any fire anywhere at the earliest possible stage.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">P1 Coverage Includes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />All storage and production areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />All offices and ancillary spaces</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Plant rooms and service areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Roof and floor voids where fire could spread</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Warehouses with valuable stock, manufacturing, data centres requiring comprehensive protection.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">P2 - Targeted Property Protection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">P2</strong> provides detection in <strong className="text-white">defined high-value or high-risk areas</strong> only. This is a targeted approach where comprehensive coverage isn't justified.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">P2 Target Areas Typically Include:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Server rooms and IT infrastructure</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />High-value equipment areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Critical process areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Valuable stock storage locations</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Office buildings with server rooms, retail with high-value stockrooms.</p>
            </div>
          </CardContent>
        </Card>

        {/* Inline Check 1 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">A distribution warehouse stores £2 million of goods. The insurer wants comprehensive fire protection. Which P category is appropriate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> P1 - Comprehensive detection throughout all storage areas to detect any fire at the earliest stage and protect the high-value stock.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Insurer Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Insurers commonly specify P category systems to <strong className="text-white">reduce their risk exposure</strong>. Requirements may include:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />P1 or P2 coverage as appropriate to risk</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Third-party certified contractors (BAFE, LPCB)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />EN 54 compliant equipment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Remote monitoring or ARC connection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Regular maintenance and testing records</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Failure to meet insurer requirements may invalidate cover or result in claim reduction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Combining L and P Categories</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>It's common to <strong className="text-white">combine L and P categories</strong> in the same building when both life safety and property protection objectives apply:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Typical Combinations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />L3 for escape routes + P2 for server rooms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />L2 for life safety + P1 for warehouse areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />L1/P1 combined where both objectives require full coverage</li>
                </ul>
              </div>
              <p>When categories are combined, specify clearly which areas fall under which category in the design documentation.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">P vs L: Key Differences</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>While P1 and L1 may have similar coverage, their <strong className="text-white">objectives differ significantly</strong>:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-2">L Categories</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>• Early warning for evacuation</li>
                    <li>• Protect human life</li>
                    <li>• Driven by fire risk assessment</li>
                    <li>• Regulatory/moral obligation</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-2">P Categories</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>• Early detection for response</li>
                    <li>• Protect property/assets</li>
                    <li>• Driven by value/business need</li>
                    <li>• Commercial/insurance obligation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inline Check 2 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">An office building has a critical server room requiring protection but the general office areas only need life safety coverage. How would you specify this?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L3 (or L2) for life safety coverage on escape routes and high-risk rooms, plus P2 targeted at the server room for property protection.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Practical Guidance</h2>
        <div className="space-y-3">
          <Card variant="ios" className="border-green-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-green-400 mb-2">Pro Tips</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Engage with insurers early in the design process to confirm their requirements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Use third-party certified contractors to satisfy both insurer and quality requirements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document combined L/P categories clearly in design specifications
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="ios" className="border-red-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Assuming P categories provide life safety - they don't replace L categories
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not confirming insurer requirements before specifying system category
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using uncertified contractors for insurance-required installations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Do P categories meet life safety requirements?", a: "Not necessarily - P categories focus on property protection. Life safety should be addressed through appropriate L category coverage." },
            { q: "What certification do insurers typically require?", a: "Third-party certification such as BAFE SP203-1 or LPCB LPS 1014 for fire detection and alarm installation companies." },
            { q: "Can P2 be specified without any L category?", a: "Technically yes, but most buildings need some life safety provision. P2 alone wouldn't address evacuation warning requirements." },
            { q: "How do I know if an insurer requires P1 or P2?", a: "Contact the insurer or broker directly. Requirements depend on building use, value, and risk profile." },
            { q: "Does P1 require monitoring to a remote centre?", a: "Not by default, but insurers often require Alarm Receiving Centre (ARC) connection for high-value premises." },
            { q: "What happens if insurer requirements aren't met?", a: "Insurance cover may be invalidated or claims may be reduced. Always confirm and document compliance." }
          ].map((faq, i) => (
            <Card key={i} variant="ios">
              <CardContent className="p-4">
                <p className="text-[15px] font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-[13px] text-white/70">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of P category fire alarm systems with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-blue-400">{calculateScore()}/{questions.length}</p>
                  <p className="text-[15px] text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
                </div>
                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const correct = selectedAnswers[i] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[15px] font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                        <p className={`text-[13px] ${correct ? 'text-green-400' : 'text-red-400'}`}>
                          Your answer: {q.options[selectedAnswers[i]] ?? '—'} {correct ? '✓' : '✗'}
                        </p>
                        {!correct && (
                          <p className="text-[13px] text-white/50 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                        )}
                        <p className="text-[13px] text-white/70 mt-2">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
                <Button variant="ios-secondary" onClick={resetQuiz} className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Restart Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />
                <div>
                  <p className="text-[17px] font-semibold text-white mb-4">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((opt, idx) => {
                      const selected = selectedAnswers[currentQuestion] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          className={`w-full text-left p-4 rounded-xl border transition-all touch-manipulation ${
                            selected
                              ? 'bg-blue-500/20 border-blue-500/50 text-white'
                              : 'bg-white/5 border-white/10 text-white/80 active:bg-white/10'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="ios-secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ios-primary"
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestion] === -1}
                    className="flex-1"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-1-section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-1-section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule1Section2;
