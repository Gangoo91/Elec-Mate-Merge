import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Flame, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "L Category Systems (Life Safety) - Fire Alarm Course";
const DESCRIPTION = "Understand BS 5839-1 fire alarm L categories: L1-L5 with examples, coverage, and compliance requirements for life safety detection.";

const FireAlarmModule1Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary purpose of L category systems under BS 5839-1?',
      options: [
        'Property protection and business continuity',
        'Life safety through early warning for evacuation',
        'Manual activation only via call points',
        'Automatic fire suppression'
      ],
      correctAnswer: 1,
      explanation: 'L category systems are designed for life safety, providing early detection and warning to enable safe evacuation.'
    },
    {
      id: 2,
      question: 'Which of the following best describes an L1 system?',
      options: [
        'Coverage limited to escape routes only',
        'Automatic detection throughout all areas where a fire could start',
        'Manual call points only',
        'Detection in high-risk areas only'
      ],
      correctAnswer: 1,
      explanation: 'L1 provides automatic detection throughout all areas of the building to maximise life safety.'
    },
    {
      id: 3,
      question: 'An L2 system provides detection in which areas?',
      options: [
        'Escape routes only',
        'Escape routes plus defined high-risk rooms',
        'All areas of the building',
        'Only plant rooms and stores'
      ],
      correctAnswer: 1,
      explanation: 'L2 provides detection in escape routes and specified high-risk rooms that open onto them.'
    },
    {
      id: 4,
      question: 'What is the key characteristic of an L5 system?',
      options: [
        'Detection throughout the entire building',
        'Manual call points only',
        'Localised detection in specific areas to satisfy a particular objective',
        'Detection in escape routes and all adjoining rooms'
      ],
      correctAnswer: 2,
      explanation: 'L5 is a bespoke category providing localised protection engineered to meet a specific need or objective.'
    },
    {
      id: 5,
      question: 'Which building type would most likely require an L1 system?',
      options: [
        'Small single-storey office',
        'Care home with sleeping accommodation',
        'Retail unit with constant supervision',
        'Industrial warehouse'
      ],
      correctAnswer: 1,
      explanation: 'Care homes and premises with sleeping risk typically require L1 for maximum early warning and life safety.'
    },
    {
      id: 6,
      question: 'An L4 system provides detection in which areas?',
      options: [
        'Throughout all areas of the building',
        'Escape routes only',
        'High-risk rooms only',
        'Property protection areas only'
      ],
      correctAnswer: 1,
      explanation: 'L4 systems provide automatic detection on escape routes only, offering basic life safety coverage.'
    },
    {
      id: 7,
      question: 'Which statement about L3 systems is correct?',
      options: [
        'L3 includes detection in all high-risk rooms',
        'L3 provides detection on escape routes and rooms opening directly onto them',
        'L3 is suitable for property protection only',
        'L3 requires manual call points to be omitted'
      ],
      correctAnswer: 1,
      explanation: 'L3 systems provide automatic detection on escape routes plus rooms that open directly onto those escape routes.'
    },
    {
      id: 8,
      question: 'For sleeping risk premises, which is the minimum recommended L category?',
      options: [
        'L4',
        'L5',
        'L1 or L2 depending on layout',
        'L3'
      ],
      correctAnswer: 2,
      explanation: 'Sleeping risk premises typically require L1 for full coverage or L2 where justified by the fire strategy.'
    },
    {
      id: 9,
      question: 'What determines the specific coverage requirements for L5?',
      options: [
        'BS 5839-1 prescribes exact areas',
        'The fire strategy and specific risk to be addressed',
        'Insurance company requirements only',
        'Building age'
      ],
      correctAnswer: 1,
      explanation: 'L5 coverage is determined by the fire strategy to address specific risks identified in the fire risk assessment.'
    },
    {
      id: 10,
      question: 'Which factor does NOT typically influence the choice between L1 and L2?',
      options: [
        'Presence of sleeping accommodation',
        'Building complexity and layout',
        'Cost of detector equipment',
        'Fire strategy requirements'
      ],
      correctAnswer: 2,
      explanation: 'Category selection should be based on risk assessment and fire strategy, not primarily on cost considerations.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Flame className="h-7 w-7 text-blue-400" />
          </div>
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide">
            Section 1 of 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          L Category Systems (Life Safety)
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding BS 5839-1 L categories and their application for life safety detection in buildings.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            25-30 mins
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
              <span><strong>L categories</strong> are designed for life safety, providing early warning for evacuation</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>L1 = full coverage</strong>, L2/L3 = escape routes + risk areas, L4 = routes only, L5 = bespoke</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Sleeping risk</strong> premises typically require L1 or L2 for maximum early warning</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Define the purpose of L category fire alarm systems",
            "Differentiate between L1, L2, L3, L4 and L5 coverage",
            "Identify typical building applications for each L category",
            "Explain the relationship between sleeping risk and L category selection",
            "Reference BS 5839-1 requirements for life safety detection",
            "Apply L category selection principles to scenarios"
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
              <h3 className="text-[17px] font-semibold text-white">What Are L Categories?</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>L categories under BS 5839-1 are specifically designed to protect <strong className="text-white">life safety</strong>. The primary objective is to provide early warning of fire to enable safe evacuation of occupants before escape routes become impassable.</p>
              <p>The "L" stands for "Life" protection. These systems prioritise detection speed and coverage to maximise warning time for building occupants.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">L1 - Full Coverage</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">L1</strong> provides automatic fire detection throughout all areas of the building where a fire might start. This is the highest level of life safety protection.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">L1 Coverage Includes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />All rooms including offices, stores, toilets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />All circulation spaces (corridors, lobbies, stairs)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Roof voids and floor voids where required</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Plant rooms and technical spaces</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Care homes, hotels, hospitals, HMOs with sleeping risk, complex public buildings.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">L2 - Escape Routes + High Risk</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">L2</strong> provides detection in all escape routes, plus defined <strong className="text-white">high-risk rooms</strong> that could present a hazard or open onto escape routes.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">L2 High-Risk Rooms Typically Include:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Electrical intake rooms and switch rooms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Plant rooms and boiler rooms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Kitchens (with appropriate detector type)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Storage areas with high fire load</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Offices, schools, retail with back-of-house risks.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A three-storey office building has a server room and electrical switch room. Which L category provides appropriate coverage?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L2 would typically be appropriate - detection on escape routes plus targeted coverage in the server room and switch room as high-risk areas.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">L3 - Escape Routes + Adjoining Rooms</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">L3</strong> provides detection in escape routes and in <strong className="text-white">all rooms that open onto them</strong>. This ensures early warning if fire develops in any room adjacent to an escape route.</p>
              <p>L3 differs from L2 in that it doesn't specifically target high-risk rooms - instead, it provides detection in ALL rooms opening onto escape routes, regardless of their risk level.</p>
              <p className="text-[13px] text-white/60 italic">Typical applications: Medium-risk premises where routes protection plus adjoining room coverage is justified.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">L4 - Escape Routes Only</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">L4</strong> provides the <strong className="text-white">minimum life safety coverage</strong> - automatic detection on escape routes only (corridors, lobbies, stairways).</p>
              <p>L4 relies on fire being detected once it has spread to, or developed in, the escape route. This provides less early warning than L1-L3.</p>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  L4 may be insufficient where rooms pose significant fire risk or where sleeping accommodation exists.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">L5 - Bespoke Coverage</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">L5</strong> is a <strong className="text-white">bespoke category</strong> where detection is provided in specific areas to satisfy a particular fire safety objective identified in the fire risk assessment.</p>
              <p>L5 is not a "lesser" category than L4 - it's a flexible option where coverage is engineered to meet a specific need that doesn't fit L1-L4 patterns.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">L5 Examples:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Detection in a specific high-risk process area only</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Coverage to satisfy a specific fire strategy requirement</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Localised protection for a defined evacuation zone</li>
                </ul>
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
            <p className="text-[15px] text-white/80 mb-3">A care home with 24 beds requires maximum early warning. Which L category is most appropriate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L1 - Care homes with sleeping accommodation require full coverage throughout all areas to maximise early warning and enable safe evacuation of vulnerable occupants.</p>
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
                  Always start with the fire risk assessment - let risk drive category selection, not cost
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  For sleeping risk, default to L1 unless the fire strategy specifically justifies L2
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document the rationale for category selection in design documentation
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
                  Selecting a lower category to reduce cost without proper risk justification
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using L4 where sleeping risk exists - this is rarely appropriate
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Confusing L categories (life safety) with P categories (property protection)
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
            { q: "Can I combine L and P categories in the same building?", a: "Yes - it's common to specify L3 for life safety on escape routes plus P2 for property protection in high-value areas like server rooms." },
            { q: "Does L1 always require detection in roof voids?", a: "Not always - BS 5839-1 provides guidance on when void detection is required based on void construction and fire risk." },
            { q: "Is L5 a 'cheaper' option than L4?", a: "No - L5 is a bespoke category for specific needs, not a reduced coverage option. Coverage is determined by the fire strategy objective." },
            { q: "Who decides which L category is required?", a: "The fire risk assessment and fire strategy determine requirements. The designer specifies the category to meet those requirements." },
            { q: "Can the category be changed after installation?", a: "Yes, but this requires a formal variation and update to certificates. Changes should be justified by updated risk assessment." },
            { q: "What's the difference between L2 and L3?", a: "L2 targets specific high-risk rooms plus escape routes. L3 covers ALL rooms opening onto escape routes, regardless of individual risk level." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of L category fire alarm systems with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-1-section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule1Section1;
