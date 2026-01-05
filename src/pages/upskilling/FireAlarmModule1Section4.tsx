import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule1Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Fire Alarm: Category Comparison & Scenarios | Module 1 Sec 4';
    document.title = title;
    const desc = 'Compare L1–L3, P1/P2 and M systems with coverage notes, scenario-based choices, and a knowledge check aligned to BS 5839-1.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz Data (5 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which option best describes L1 coverage?',
      options: [
        'Detection on escape routes only',
        'Detection in high‑risk rooms only',
        'Automatic detection throughout all areas',
        'Manual call points only'
      ],
      correctAnswer: 2,
      explanation: 'L1 provides automatic detection throughout all areas to maximise life safety and early warning.'
    },
    {
      id: 2,
      question: 'L2 differs from L3 primarily because it:',
      options: [
        'Removes detection from escape routes',
        'Adds detection to defined high‑risk rooms off escape routes',
        'Requires VADs in all rooms by default',
        'Is for property protection only'
      ],
      correctAnswer: 1,
      explanation: 'L2 includes escape routes and specified high‑risk rooms; L3 focuses on routes and rooms opening onto them.'
    },
    {
      id: 3,
      question: 'For property protection across an entire site, insurers typically prefer:',
      options: [
        'P1',
        'P2',
        'M',
        'L4'
      ],
      correctAnswer: 0,
      explanation: 'P1 aims to detect any fire anywhere in the building at the earliest opportunity for asset protection.'
    },
    {
      id: 4,
      question: 'Which scenario most appropriately suits M only?',
      options: [
        'Hotel with sleeping risk',
        'Continuously occupied, very low‑risk, small office',
        'Warehouse with high‑bay racking',
        'School with science labs'
      ],
      correctAnswer: 1,
      explanation: 'Manual‑only systems may be acceptable where risk is low and occupants are awake, alert and trained.'
    },
    {
      id: 5,
      question: 'A multi‑storey office with plant rooms and server rooms commonly needs:',
      options: [
        'L1 only',
        'L3 for routes and P2 targeted to server/plant rooms',
        'M only',
        'No detection, call points only'
      ],
      correctAnswer: 1,
      explanation: 'L3 (life safety) for escape routes, plus P2 for high‑value/high‑risk rooms is a typical balanced approach.'
    }
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(undefined as unknown as number));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (idx: number) => {
    const next = [...selectedAnswers];
    next[currentQuestion] = idx;
    setSelectedAnswers(next);
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

  const score = selectedAnswers.reduce((acc, ans, i) => (ans === questions[i].correctAnswer ? acc + 1 : acc), 0);

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
              <BarChart className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Category Comparison Table + Scenarios</h1>
                <p className="text-lg text-gray-400">Practical examples and system comparisons</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 1.4</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Practical Examples</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>This section compares common BS 5839‑1 categories—L1 to L3 (life safety), P1/P2 (property protection) and M (manual)—then applies them to typical scenarios. Use it to justify selection during design and to communicate rationale to stakeholders.</p>
              <p>Always base final selection on the fire strategy and risk assessment, and coordinate with BS 7671 for safe electrical supplies and cabling to the system.</p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Differentiate L1, L2, L3, P1, P2 and M categories with typical coverage.</li>
                <li>Match categories to typical building scenarios and risks.</li>
                <li>Explain key coverage notes and detector spacing considerations.</li>
                <li>Articulate mixed L/P justifications from a fire strategy standpoint.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">L1 Systems</h3>
                <p className="mb-2">Complete automatic detection coverage throughout the building. Suitable for high‑risk premises and sleeping risks.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All rooms and circulation spaces, including voids where required.</li>
                  <li>Often required in hotels, care homes, large HMOs and complex buildings.</li>
                  <li>Maximises early warning for life safety and facilitates phased evacuation.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">L2 Systems</h3>
                <p className="mb-2">Detection in defined areas of high fire risk plus escape routes.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Targeted coverage for rooms with elevated risk (e.g. plant rooms, kitchens).</li>
                  <li>Common in offices, schools and retail where full L1 is not justified.</li>
                  <li>Balances risk, cost and disruption while protecting escape routes.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">L3 Systems</h3>
                <p className="mb-2">Detection on escape routes. Minimum life safety protection for smaller premises.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Corridors, lobbies, stairways and final exits.</li>
                  <li>Relies on fire being detected on, or spreading to, escape routes.</li>
                  <li>May be insufficient where rooms pose significant risk or sleeping risk exists.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">P1 / P2 Systems (Property Protection)</h3>
                <p className="mb-2">Property protection with complete (P1) or partial (P2) building coverage for asset protection.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>P1 aims to detect any fire anywhere in the building at the earliest opportunity.</li>
                  <li>P2 protects defined high‑value or high‑risk areas only.</li>
                  <li>Often specified by insurers to reduce loss and business interruption.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">M Category (Manual Only)</h3>
                <p className="mb-2">Manual call points only, relying on occupants to raise the alarm.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Appropriate only where risks are low and occupants are awake, alert and trained.</li>
                  <li>Typically combined with L or P categories to meet objectives.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Key Coverage Notes</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Point detectors typically provide up to 7.5 m radius coverage under standard ceilings (subject to BS 5839‑1 spacing rules).</li>
                  <li>Consider ceiling height, obstructions and environmental conditions.</li>
                  <li>Final selection must be justified by the Fire Risk Assessment and fire strategy.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Typical Scenarios</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="font-medium">Hotel or Care Home</span>: L1 (life safety) often combined with P1 for property protection.</li>
                  <li><span className="font-medium">Office (multi‑storey)</span>: L3 or L2 depending on risk; P2 for server/plant rooms.</li>
                  <li><span className="font-medium">Warehouse</span>: L3 for life safety routes plus P1/P2 depending on goods, storage height and insurer input.</li>
                  <li><span className="font-medium">School</span>: L2 in high‑risk areas with L3 on escape routes; P2 for IT suites or labs.</li>
                  <li><span className="font-medium">Small Retail</span>: L3 minimum; upgrade to L2 where back‑of‑house risks exist.</li>
                </ul>
                <p className="mt-2 text-sm text-gray-400">Note: Mixed categories (e.g. L2/P2) are common where both life safety and property protection objectives apply.</p>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="border border-green-600/30 bg-green-600/10">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario: Mixed‑Use Building</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <p>A ground‑floor retail unit with offices above. The strategy recommends <span className="text-yellow-400 font-semibold">L3</span> for escape routes across all storeys, <span className="text-yellow-400 font-semibold">L2</span> where back‑of‑house risks exist, and <span className="text-yellow-400 font-semibold">P2</span> targeted protection for the server room.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide zone plans and cause‑and‑effect for door control and HVAC shutdown.</li>
                <li>Co‑ordinate cabling routes and segregation with BS 7671; label and isolate the supply correctly.</li>
                <li>Engage the insurer early where high‑value stock or critical IT equipment is present.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>Choose L categories for life safety based on occupancy and layout; apply P categories for asset protection; use M in low‑risk, continuously occupied spaces only. Justify choices via the fire strategy and risk assessment.</p>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check: Categories & Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              {showResults ? (
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl font-bold text-yellow-400">Score: {score} / {questions.length}</p>
                    <p className="text-gray-400">({Math.round((score / questions.length) * 100)}%)</p>
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

                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
                      <Button onClick={handleNext} className="bg-yellow-400 text-black hover:bg-yellow-400">
                        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section4;
