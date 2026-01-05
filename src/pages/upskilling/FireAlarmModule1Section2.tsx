import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Building, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule1Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Choosing Fire Alarm System Type | Module 1 Section 2';
    document.title = title;
    const desc = 'Learn how to select the correct BS 5839-1 fire alarm category and detection strategy based on building risk, occupancy, and evacuation method.';
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
      question: 'Which factor most strongly influences phased evacuation design?',
      options: [
        'Presence of manual call points',
        'Number of stair cores',
        'Evacuation strategy and building height/occupancy',
        'Availability of beam detection'
      ],
      correctAnswer: 2,
      explanation: 'Phased evacuation is typically used in tall or complex buildings; the chosen evacuation strategy drives zoning and alarm logic.'
    },
    {
      id: 2,
      question: 'A small single-storey office with continuous staff presence and low fire load most likely requires:',
      options: [
        'M only',
        'L1',
        'P1',
        'L3 with VADs throughout'
      ],
      correctAnswer: 0,
      explanation: 'In some low-risk, continuously occupied spaces, an M system (manual only) can be acceptable subject to risk assessment.'
    },
    {
      id: 3,
      question: 'Which detection method is often best for very high atria or warehouses?',
      options: [
        'Point heat detectors',
        'Aspirating detection only',
        'Beam detectors (optical linear) across large open spans',
        'Only manual call points'
      ],
      correctAnswer: 2,
      explanation: 'Beam detectors are effective in large, open, and high spaces where point detectors are impractical.'
    },
    {
      id: 4,
      question: 'What document should define interfacing such as smoke control, lifts, sprinklers, or gas shutoff?',
      options: [
        'Manufacturer’s installation manual',
        'Cause-and-effect matrix aligned with the fire strategy',
        'As-fitted drawings only',
        'Weekly test log book'
      ],
      correctAnswer: 1,
      explanation: 'A cause-and-effect matrix agreed with stakeholders details the required outputs and logic under BS 5839-1.'
    },
    {
      id: 5,
      question: 'For sleeping risk (e.g., hotels), the minimum typical life safety category is often:',
      options: [
        'L4',
        'L3',
        'L2 or L1 depending on layout and risk',
        'M only'
      ],
      correctAnswer: 2,
      explanation: 'Sleeping risk usually requires enhanced coverage (L2 or L1) to ensure early warning in rooms and escape routes.'
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
    <div className="min-h-screen bg-background text-foreground">
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
              <Building className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Choosing the Right System Type for the Building</h1>
                <p className="text-lg text-gray-400">Selection criteria, detection methods and cause-and-effect</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 1.2</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">System Selection</Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Assess building factors that drive L/P/M category and detection strategy.</li>
                <li>Relate evacuation strategy to zoning, alarm devices and control logic.</li>
                <li>Select suitable detector technologies for different spaces.</li>
                <li>Define cause-and-effect and interfacing aligned to the fire strategy.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Assessment Criteria */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Building Assessment Criteria</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">Occupancy</span>: sleeping risk, vulnerable persons, staff familiarity.</li>
                <li><span className="text-yellow-400 font-semibold">Geometry</span>: height, floor area, compartmentation, travel distances.</li>
                <li><span className="text-yellow-400 font-semibold">Fire load & ignition</span>: processes, kitchens, plant rooms, storage.</li>
                <li><span className="text-yellow-400 font-semibold">Management</span>: staffing, maintenance regime, false alarm control.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Evacuation Strategy */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Evacuation Strategy & Alarm Devices</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p><span className="text-yellow-400 font-semibold">Simultaneous</span>: All occupants evacuate on alarm – typical for smaller/simple buildings.</p>
              <p><span className="text-yellow-400 font-semibold">Phased</span>: By zones/floors with prioritised alert/evacuate signals – typical for tall/complex buildings.</p>
              <p>Meet audibility requirements and visual alarm device (VAD) coverage where required by risk or accessibility needs.</p>
            </CardContent>
          </Card>

          {/* Colour Callout */}
          <Card className="bg-yellow-400/10 border-yellow-400/30 border">
            <CardHeader>
              <CardTitle className="text-yellow-400">Design rule: Phased vs Simultaneous</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-200">
              Use phased evacuation when building height/complexity demands prioritised movement and protected routes. Plan alert/evacuate tones, zone dependencies and staged outputs in the cause‑and‑effect.
            </CardContent>
          </Card>

          {/* Detection Selection */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Selecting Detection Methods</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Point smoke/multi-sensor: offices, corridors; balance sensitivity and false alarm management.</li>
                <li>Heat detectors: kitchens/steam-prone areas where smoke detection is unsuitable.</li>
                <li>Beam detection: large open or high spaces (atriums, warehouses).</li>
                <li>Aspirating detection (ASD): early warning/high sensitivity or harsh environments.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Colour Callout */}
          <Card className="bg-accent-teal/15 border-accent-teal/40 border">
            <CardHeader>
              <CardTitle className="text-accent-teal">False alarm strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-200">
              Specify detector type and siting to minimise unwanted alarms. Consider multi‑sensor with algorithms, time‑of‑day sensitivities, staff training, and documented investigation delays where permitted.
            </CardContent>
          </Card>

          {/* Cause and Effect */}
          <Card className="border border-blue-600/30 bg-yellow-400/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Cause-and-Effect & Interfacing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Define outputs to smoke control, lifts, access control, gas shutoff, plant, sprinklers.</li>
                <li>Agree logic and delays with stakeholders; document clearly for commissioning and maintenance.</li>
                <li>Zone plans, as-fitted drawings and user training complete the handover pack.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Detector Selection Matrix */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Detector Selection Matrix (Quick Guide)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="text-yellow-400 font-semibold">Offices/corridors</span>: Smoke or multi-sensor with false alarm management.</li>
                <li><span className="text-yellow-400 font-semibold">Kitchens/steam</span>: Heat (rate-of-rise or fixed) – avoid smoke.</li>
                <li><span className="text-yellow-400 font-semibold">Atriums/warehouses</span>: Beam detection; consider ASD for very early warning.</li>
                <li><span className="text-yellow-400 font-semibold">Dirty/harsh areas</span>: ASD with suitable filtration or heat as appropriate.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Case Studies */}
          <Card className="border border-green-600/30 bg-green-600/10">
            <CardHeader>
              <CardTitle className="text-white">Case Studies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md border border-yellow-400/30 bg-card/50">
                  <p className="text-yellow-400 font-semibold mb-1">Hotel (Sleeping Risk)</p>
                  <p>L2/L1 to provide early warning in rooms and corridors; phased evacuation with alert then evacuate signals.</p>
                </div>
                <div className="p-4 rounded-md border border-yellow-400/30 bg-card/50">
                  <p className="text-yellow-400 font-semibold mb-1">Warehouse (High/High Spaces)</p>
                  <p>Beam detectors across aisles; ASD for early warning; robust false alarm management due to dust.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning & Handover */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning & Handover</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Verify cause-and-effect and device zoning; audibility/VADs to plan.</li>
                <li>Provide certificates, as-fitted drawings, zone plans, logbook and user training.</li>
                <li>Agree maintenance regime and responsibilities with the Responsible Person.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Pre-Design Checklist */}
          <Card className="border border-blue-600/30 bg-yellow-400/10">
            <CardHeader>
              <CardTitle className="text-white">Pre-Design Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Fire strategy and evacuation method confirmed.</li>
                <li>Category (L/P/M) defined with rationale.</li>
                <li>Detector types matched to environments; false alarm risks addressed.</li>
                <li>Interfaces documented and tested; maintenance plan agreed.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>System selection blends occupancy risk, building form, management, detection suitability and evacuation strategy, all aligned to the fire strategy and BS 5839-1.</p>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check: System Selection</CardTitle>
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

export default FireAlarmModule1Section2;