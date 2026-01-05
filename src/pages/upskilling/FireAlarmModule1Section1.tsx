import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule1Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Fire Alarm Categories L, P, M | Module 1 Section 1';
    document.title = title;
    const desc = 'Understand BS 5839-1 fire alarm categories: L (life safety), P (property), and M (manual) with examples, compliance notes, and a quiz.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

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
      question: 'P category systems (P1/P2) principally address:',
      options: [
        'Life safety in sleeping accommodation',
        'Evacuation of vulnerable persons',
        'Protection of property and business assets',
        'Phased evacuation requirements'
      ],
      correctAnswer: 2,
      explanation: 'P categories are specified for property protection – P1 for coverage throughout; P2 targeted at defined high-risk areas.'
    },
    {
      id: 4,
      question: 'M category systems rely on:',
      options: [
        'Automatic smoke and heat detection',
        'Manual call points and sounders only',
        'Beam detectors in open spaces',
        'Aspirating detection systems'
      ],
      correctAnswer: 1,
      explanation: 'M systems are manual only – using MCPs and sounders – with no automatic detection.'
    },
    {
      id: 5,
      question: 'Which pairing is correct?',
      options: [
        'L3: detection in plant rooms only',
        'P1: detection in escape routes only',
        'L2: detection in escape routes plus high-risk rooms off them',
        'P2: detection throughout the building'
      ],
      correctAnswer: 2,
      explanation: 'L2 provides detection in escape routes and in specified high-risk rooms that open onto them.'
    }
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(undefined as unknown as number));
  const [showResults, setShowResults] = useState(false);

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
    setSelectedAnswers(Array(questions.length).fill(undefined as unknown as number));
    setShowResults(false);
  };

  const calculateScore = () =>
    selectedAnswers.reduce((acc, ans, i) => (ans === questions[i].correctAnswer ? acc + 1 : acc), 0);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">What Are L, P, and M Categories?</h1>
                <p className="text-lg text-gray-400">Understanding fire alarm classifications in BS 5839-1</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 1.1</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Fire Alarm Systems</Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Differentiate L, P and M categories and their primary intent.</li>
                <li>Explain sub-categories L1–L5 and P1–P2 with typical coverage.</li>
                <li>Identify when manual-only systems (M) may be acceptable.</li>
                <li>Reference BS 5839-1 responsibilities for design, installation and certification.</li>
              </ul>
            </CardContent>
          </Card>

          {/* L Category */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">L Category Systems (Life Safety)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Designed to protect life by providing early warning for evacuation.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">L1</span>: Automatic detection throughout all areas.</li>
                <li><span className="text-yellow-400 font-semibold">L2</span>: Detection on escape routes and high-risk rooms opening onto them.</li>
                <li><span className="text-yellow-400 font-semibold">L3</span>: Detection on escape routes and rooms opening onto them.</li>
                <li><span className="text-yellow-400 font-semibold">L4</span>: Detection on escape routes only.</li>
                <li><span className="text-yellow-400 font-semibold">L5</span>: Localised special risk coverage, engineered to a specific need.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Colour Callout */}
          <Card className="bg-accent-purple/15 border-accent-purple/40 border">
            <CardHeader>
              <CardTitle className="text-accent-purple">Design tip: Choosing L1–L5</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-200">
              Match coverage to risk and layout: use L1 for maximum life safety; L2 for escape routes plus high‑risk rooms; L3 for escape routes and rooms off them; L4 for routes only; L5 for localised special risks.
            </CardContent>
          </Card>

          {/* P Category */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">P Category Systems (Property Protection)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Intended to minimise property damage and business interruption.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">P1</span>: Automatic detection throughout all areas.</li>
                <li><span className="text-yellow-400 font-semibold">P2</span>: Automatic detection in defined high-risk areas only.</li>
              </ul>
            </CardContent>
          </Card>

          {/* M Category */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">M Category Systems (Manual)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Manual call points and alarm sounders only. No automatic detection. Used in low risk, continuously occupied spaces where early manual raising of alarm is reliable.</p>
              <p className="text-gray-400">Note: Where sleeping risk or phased evacuation is present, M alone is generally unsuitable.</p>
            </CardContent>
          </Card>

          {/* Colour Callout */}
          <Card className="bg-accent-green/15 border-accent-green/40 border">
            <CardHeader>
              <CardTitle className="text-accent-green">Checkpoint: Is M suitable?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-200">
              Use M only where: risk is low, space is continuously occupied, alarm can be raised quickly by occupants, and there is no sleeping risk. Otherwise specify an appropriate L category system.
            </CardContent>
          </Card>

          {/* Compliance Callout */}
          <Card className="border border-red-600/30 bg-red-600/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                BS 5839-1 Compliance & Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Define design category (L/P/M) based on risk assessment and fire strategy.</li>
                <li>Document cause-and-effect; interface requirements; audibility/visibility criteria.</li>
                <li>Issue design, installation and commissioning certificates for traceability.</li>
                <li>Provide user training and a maintenance regime per the Standard.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="border border-blue-600/30 bg-yellow-400/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Reference: L vs P vs M</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">L (Life)</span>: Early warning for evacuation – choose L1–L5 by risk and layout.</li>
                <li><span className="text-yellow-400 font-semibold">P (Property)</span>: Protect assets/continuity – P1 throughout, P2 target high-risk areas.</li>
                <li><span className="text-yellow-400 font-semibold">M (Manual)</span>: MCPs + sounders only – suitable in low-risk, continuously occupied areas.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Typical Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Typical Applications</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">L1</span>: Care homes, hotels, hospitals, complex public buildings.</li>
                <li><span className="text-yellow-400 font-semibold">L2/L3</span>: Offices, schools – escape routes plus adjoining rooms (L2 adds high-risk rooms).</li>
                <li><span className="text-yellow-400 font-semibold">P1/P2</span>: Manufacturing, data centres, plant rooms, high-value storage.</li>
                <li><span className="text-yellow-400 font-semibold">M</span>: Small, low-risk workplaces with constant supervision.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Maintenance & Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Maintenance & Testing (BS 5839-1)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>User weekly test of at least one MCP; record in the logbook.</li>
                <li>Routine inspection and servicing by a competent person at periods not exceeding 6 months.</li>
                <li>Maintain records: faults, false alarms, changes to use/structure, and any disablements.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Pitfalls & False Alarms */}
          <Card className="border border-red-600/30 bg-red-600/10">
            <CardHeader>
              <CardTitle className="text-white">Common Pitfalls & False Alarm Reduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Choose appropriate detector type for environment (avoid smoke in kitchens; consider multi-sensor).</li>
                <li>Manage works/maintenance to prevent unwanted alarms (isolate where necessary with controls).</li>
                <li>Implement investigation delays only where permitted and documented in cause-and-effect.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>L categories focus on evacuation safety; P categories on property protection; M is manual-only. Select the category that aligns with the building’s risks and fire strategy.</p>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check: L, P and M Categories</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              {showResults ? (
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl font-bold text-yellow-400">Score: {calculateScore()} / {questions.length}</p>
                    <p className="text-gray-400">({Math.round((calculateScore() / questions.length) * 100)}%)</p>
                  </div>

                  <div className="space-y-4">
                    {questions.map((q, i) => {
                      const correct = selectedAnswers[i] === q.correctAnswer;
                      return (
                        <div key={q.id} className="p-4 rounded-md border border-gray-700">
                          <p className="font-semibold text-white">Q{i + 1}. {q.question}</p>
                          <p className={correct ? 'text-green-400' : 'text-red-400'}>
                            Your answer: {q.options[selectedAnswers[i] ?? 0] ?? '—'} {correct ? '(Correct)' : '(Incorrect)'}
                          </p>
                          {!correct && (
                            <p className="text-gray-400">Correct: {q.options[q.correctAnswer]}</p>
                          )}
                          <p className="text-gray-300 mt-1">Explanation: {q.explanation}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={resetQuiz} className="bg-yellow-400 text-black hover:bg-yellow-400">Restart Quiz</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

                  <div>
                    <p className="text-lg font-semibold text-white mb-2">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                    <div className="space-y-2">
                      {questions[currentQuestion].options.map((opt, idx) => {
                        const selected = selectedAnswers[currentQuestion] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSelect(idx)}
                            className={`w-full text-left p-3 rounded-md border transition-colors ${
                              selected ? 'bg-yellow-400 text-black border-yellow-400' : 'border-gray-700 hover:bg-card'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                    selectedAnswer={selectedAnswers[currentQuestion]}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastQuestion={currentQuestion === questions.length - 1}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section1;