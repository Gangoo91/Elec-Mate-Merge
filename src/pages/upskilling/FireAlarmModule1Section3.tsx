import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule1Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Fire Alarm: Legal & Insurance | Module 1 Sec 3';
    document.title = title;
    const desc = 'UK legal drivers (RRFSO), Building Regulations (ADB), BS 5839-1/BS 7671 links, insurer expectations, and documentation—with quiz.';
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
      question: 'Under the RRFSO, who is primarily responsible for ensuring adequate fire precautions?',
      options: [
        'The fire alarm manufacturer',
        'The Responsible Person for the premises',
        'The local fire and rescue service',
        'The insurance assessor'
      ],
      correctAnswer: 1,
      explanation: 'RRFSO places duties on the Responsible Person to ensure adequate fire precautions based on a suitable and sufficient fire risk assessment.'
    },
    {
      id: 2,
      question: 'Which document typically defines interfaces (e.g. smoke control, lifts, gas shutoff)?',
      options: [
        'Weekly test logbook',
        'Cause-and-effect matrix aligned to fire strategy',
        'As-fitted drawings only',
        'Manufacturer’s data sheet'
      ],
      correctAnswer: 1,
      explanation: 'Cause-and-effect documents required outputs/logic and should be agreed with stakeholders per BS 5839-1.'
    },
    {
      id: 3,
      question: 'BS 7671 is most relevant to which aspect of fire alarm systems?',
      options: [
        'Audibility levels of sounders',
        'Electrical supply, protection, segregation and cabling to the fire alarm',
        'Detector spacing rules',
        'Evacuation signage colours'
      ],
      correctAnswer: 1,
      explanation: 'BS 7671 covers electrical installation requirements including dedicated supplies, protection and segregation.'
    },
    {
      id: 4,
      question: 'Insurers most commonly specify which category for property protection?',
      options: [
        'L3',
        'M',
        'P1 or targeted P2 depending on risk',
        'L5 only'
      ],
      correctAnswer: 2,
      explanation: 'Insurers often require P1 for wide coverage or P2 to protect high‑value/high‑risk areas, sometimes via certified companies.'
    },
    {
      id: 5,
      question: 'Which certificates should be issued and retained under BS 5839-1?',
      options: [
        'Risk assessment only',
        'Design, Installation, Commissioning and Handover certificates',
        'Competent person’s ID card only',
        'None—certification is optional'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 expects issue and retention of the full certificate set along with as-fitted drawings and zoning diagram.'
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
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Legal and Insurance Drivers</h1>
                <p className="text-lg text-gray-400">Regulatory requirements and insurance considerations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 1.3</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Compliance</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>Fire alarm provision in the UK is driven by the Regulatory Reform (Fire Safety) Order 2005 (RRFSO), Building Regulations (Approved Document B), and standards such as BS 5839-1. Electrical integration must align with BS 7671. Insurers may impose additional requirements to reduce loss and downtime.</p>
              <p>This section outlines the legal framework, insurer expectations, documentation, and the links between BS 5839‑1 and BS 7671 for safe, compliant installations.</p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Explain the duties of the Responsible Person under the RRFSO.</li>
                <li>Describe Building Regulations triggers and the role of the fire strategy.</li>
                <li>Relate BS 5839-1 recommendations to BS 7671 electrical requirements.</li>
                <li>Identify insurer expectations and essential certification/documentation.</li>
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
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Regulatory Reform (Fire Safety) Order 2005 (RRFSO)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Requires a suitable and sufficient fire risk assessment; implement findings.</li>
                  <li>Mandates maintenance of fire detection and alarm systems where identified.</li>
                  <li>Applies to most non‑domestic premises in England and Wales.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Building Regulations (Approved Document B)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Sets performance requirements for means of warning and escape.</li>
                  <li>New builds/alterations must satisfy ADB via the fire strategy and design team.</li>
                  <li>Alarm provision determined by use, occupancy and evacuation strategy.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">British Standards</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="font-medium">BS 5839‑1</span>: Design, installation, commissioning and maintenance recommendations.</li>
                  <li><span className="font-medium">BS 7671</span>: Supplies, circuit protection, segregation and cabling to the fire alarm system.</li>
                  <li><span className="font-medium">EN 54</span>: Product standards for panels, detectors, sounders, etc.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Roles and Competence</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="font-medium">Responsible Person</span>: ensures provision, maintenance and record keeping.</li>
                  <li><span className="font-medium">Competent Persons</span>: design/install/maintain; third‑party certification recommended.</li>
                  <li>Logbook and prompt action on faults and false alarm trends are essential.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Insurer Expectations</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>May require P1/P2 property protection and third‑party certificated firms (e.g. LPCB/BAFE).</li>
                  <li>Expect EN 54 equipment and clear cause‑and‑effect documentation.</li>
                  <li>Maintenance and false alarm management can affect cover/claims.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Certificates and Records</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Issue Design, Installation, Commissioning and Handover certificates.</li>
                  <li>Provide as‑fitted drawings, zoning diagram and cause‑and‑effect matrix.</li>
                  <li>Maintain a logbook; implement periodic inspection and testing.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Electrical Integration (BS 7671)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dedicated, correctly protected supply with isolation and labelling.</li>
                  <li>Segregate from other services; use fire‑resistant cabling as recommended in BS 5839‑1.</li>
                  <li>Consider standby capacity and discrimination to maintain integrity.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="border border-blue-600/30 bg-yellow-400/10">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario: Office Refurbishment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <p>A four‑storey office undergoes refurbishment with a new server room and reception layout. The risk assessment and fire strategy call for <span className="text-yellow-400 font-semibold">L2</span> life safety coverage with <span className="text-yellow-400 font-semibold">P2</span> protection to the server room. Insurers require third‑party certificated contractors and a tested cause‑and‑effect.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Document interfaces to access control and AHU shutdown in the cause‑and‑effect.</li>
                <li>Provide a dedicated labelled supply to the panel per BS 7671 with correct isolation.</li>
                <li>Issue full certification set and update the fire safety manual and logbook.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>Compliance blends RRFSO duties, Building Regulations, BS 5839‑1 recommendations and BS 7671 electrical safety, often alongside insurer requirements. Clear documentation and competent practice underpin safety and insurability.</p>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check: Legal & Insurance</CardTitle>
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

export default FireAlarmModule1Section3;
