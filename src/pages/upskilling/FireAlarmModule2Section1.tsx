import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';

import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule2Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Detectors: Smoke, Heat, Multisensor, Beam | Module 2 Sec 1';
    document.title = title;
    const desc = 'Understand detector technologies, applications, siting and false alarm management per BS 5839-1, with a practical scenario and quiz.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  // Quiz Data (12 questions)
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which smoke detector type is better for smouldering fires?',
      options: ['Optical (Photoelectric)', 'Ionisation', 'Heat – Fixed Temperature', 'Beam'],
      correctAnswer: 0,
      explanation: 'Optical detectors are more responsive to larger smoke particles from smouldering fires.'
    },
    {
      id: 2,
      question: 'Where would you typically use a rate-of-rise heat detector?',
      options: ['Office', 'Kitchen', 'Escape route', 'Hotel bedroom'],
      correctAnswer: 1,
      explanation: 'Rate-of-rise heat detectors suit kitchens and similar areas where smoke detection would cause false alarms.'
    },
    {
      id: 3,
      question: 'What is the main advantage of a multisensor detector?',
      options: ['Cheaper than single-technology detectors', 'Can replace MCPs', 'Combines detection methods for better reliability', 'Works without a power supply'],
      correctAnswer: 2,
      explanation: 'Multisensors combine smoke and heat sensing (often with algorithms) to improve reliability and reduce false alarms.'
    },
    {
      id: 4,
      question: 'True or False: Beam detectors are suitable for high-ceiling warehouses.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'Beam detectors can protect large, high spaces effectively when designed and aligned correctly.'
    },
    {
      id: 5,
      question: 'Which smoke detector type is more prone to nuisance alarms from cooking fumes?',
      options: ['Optical (Photoelectric)', 'Ionisation', 'Multisensor', 'Beam'],
      correctAnswer: 1,
      explanation: 'Ionisation detectors are more susceptible to nuisance from cooking fumes and steam.'
    },
    {
      id: 6,
      question: 'What is the typical maximum coverage radius for a smoke detector in a flat ceiling?',
      options: ['5.0 m', '7.5 m', '10.0 m', '12.5 m'],
      correctAnswer: 1,
      explanation: 'BS 5839 typically specifies 7.5 m radius coverage for smoke detectors, though this should be reduced for obstructions and room geometry.'
    },
    {
      id: 7,
      question: 'Which detector type should be avoided in dusty environments?',
      options: ['Fixed temperature heat detector', 'Ionisation smoke detector', 'Rate-of-rise heat detector', 'Both ionisation and optical smoke detectors'],
      correctAnswer: 3,
      explanation: 'Both ionisation and optical smoke detectors can be affected by dust, leading to false alarms. Heat detectors are preferred in dusty environments.'
    },
    {
      id: 8,
      question: 'What is a key consideration when positioning beam detectors?',
      options: ['They must be mounted horizontally only', 'Alignment and regular maintenance to prevent false alarms', 'They can only be used outdoors', 'They require mains power only'],
      correctAnswer: 1,
      explanation: 'Beam detectors require precise alignment between transmitter and receiver, and regular cleaning to prevent dust or misalignment causing false alarms.'
    },
    {
      id: 9,
      question: 'Which detector classification indicates a rate-of-rise heat detector?',
      options: ['A1S', 'A1R', 'CS', 'BR'],
      correctAnswer: 1,
      explanation: 'A1R indicates a Class A1 rate-of-rise heat detector. The "R" suffix denotes rate-of-rise functionality.'
    },
    {
      id: 10,
      question: 'What is thermal stratification and why does it matter for detector placement?',
      options: ['Hot air rises and can prevent smoke reaching ceiling detectors', 'Cold air sinking improves detector response', 'A method of cooling detectors', 'The way heat detectors are manufactured'],
      correctAnswer: 0,
      explanation: 'Thermal stratification occurs when hot air forms a layer below the ceiling, preventing smoke from reaching detectors. This is particularly important in high spaces.'
    },
    {
      id: 11,
      question: 'What minimum distance should detectors be mounted from walls and beams?',
      options: ['100 mm', '300 mm', '600 mm', '1000 mm'],
      correctAnswer: 2,
      explanation: 'BS 5839 recommends detectors should be at least 600 mm from walls, beams, and light fittings to avoid dead air spaces.'
    },
    {
      id: 12,
      question: 'In a sleeping risk area, which detector type is most appropriate?',
      options: ['Heat detector (fixed temperature)', 'Optical smoke detector', 'Ionisation smoke detector', 'Beam detector'],
      correctAnswer: 1,
      explanation: 'Optical smoke detectors provide the fastest response to smouldering fires common in bedrooms (e.g., cigarettes, bedding) and are recommended for sleeping risk areas.'
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
      <div>
        <Link to="../fire-alarm-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
          <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Search className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Smoke, Heat, Multisensor, and Beam Detectors</h1>
                <p className="text-lg sm:text-xl text-gray-400">Detector technologies, applications and siting considerations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 2.1</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">30 minutes</Badge>
            </div>
          </div>

          {/* Colour Banner: At‑a‑Glance */}
          <Card className="bg-transparent border-transparent">
            <CardContent className="p-0">
              <AccentPanel tone="teal" title="At‑a‑Glance: Quick Detector Picks">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Offices/corridors: Optical smoke or multisensor for reliability.</li>
                  <li>Kitchens/steamy areas: Rate‑of‑rise heat (A1/R) or suitably configured multisensor.</li>
                  <li>High/large spaces: Beam detection; confirm alignment and coverage.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <AccentPanel tone="green">
                <p>Selecting the right type of detector is a core part of fire alarm system design. The wrong choice can lead to delayed detection, nuisance false alarms, and non-compliance with BS 5839. Each type of detector is designed to respond to a specific fire characteristic, such as smoke particles, heat, or a combination of signals.</p>
                <p>If you put a smoke detector in a steamy kitchen, it will almost certainly create false alarms. If you put a heat detector in an office, it may detect a fire too late. Choosing correctly ensures the system triggers promptly in a real emergency, while staying quiet in normal conditions.</p>
                <p>Understanding how each detector type works — and where it should and should not be installed — allows installers to create systems that are both effective and compliant, saving lives and reducing costly disruptions.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="indigo">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Identify the main types of fire detectors and how they work.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Match detector types to the right environments.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Recognise the advantages and limitations of each type.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Apply BS 5839 recommendations to detector selection.</span></li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

           <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Detector Types and Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Smoke Detectors</h3>
                  <AccentPanel tone="blue">
                    <p className="font-medium">Optical (Photoelectric)</p>
                    <p>Detects larger smoke particles from smouldering fires by scattering light inside a sensing chamber.</p>
                    <ul className="list-disc pl-6 mt-1 space-y-1">
                      <li><span className="font-medium">Advantages:</span> Less prone to false alarms from cooking fumes than ionisation types.</li>
                      <li><span className="font-medium">Best for:</span> Offices, bedrooms, escape routes.</li>
                    </ul>
                  </AccentPanel>
                  <AccentPanel tone="blue">
                    <p className="font-medium">Ionisation</p>
                    <p>Detects smaller smoke particles from fast-flaming fires using a small radioactive source to ionise the air.</p>
                    <ul className="list-disc pl-6 mt-1 space-y-1">
                      <li><span className="font-medium">Advantages:</span> Very fast response to flaming fires.</li>
                      <li><span className="font-medium">Limitations:</span> More prone to nuisance alarms from cooking fumes and steam.</li>
                      <li><span className="font-medium">Best for:</span> Areas away from kitchens or steam.</li>
                    </ul>
                  </AccentPanel>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Heat Detectors</h3>
                  <AccentPanel tone="amber">
                    <ul className="list-disc pl-6 space-y-1">
                      <li><span className="font-medium">Fixed Temperature:</span> Activates when a set temperature (e.g., 57°C) is reached.</li>
                      <li><span className="font-medium">Rate-of-Rise:</span> Activates when temperature rises rapidly (e.g., 6–8°C per minute).</li>
                    </ul>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><span className="font-medium">Advantages:</span> Not affected by dust, steam, or smoke.</li>
                      <li><span className="font-medium">Best for:</span> Kitchens, boiler rooms, garages.</li>
                      <li><span className="font-medium">Limitations:</span> Slower to respond than smoke detectors in many fires.</li>
                    </ul>
                  </AccentPanel>
                  <h3 className="text-lg font-semibold text-yellow-400">Multisensor Detectors</h3>
                  <AccentPanel tone="purple">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Combine smoke and heat sensing to improve reliability.</li>
                      <li>Intelligent algorithms help reduce false alarms while maintaining sensitivity.</li>
                      <li><span className="font-medium">Best for:</span> Variable environments such as hotel corridors or public areas.</li>
                    </ul>
                  </AccentPanel>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400">Beam Detectors</h3>
                <AccentPanel tone="teal" className="mt-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Send an infrared beam between a transmitter and receiver; smoke obscures the beam and triggers an alarm.</li>
                    <li>Can cover large areas (up to 100 m), ideal for open spaces with high ceilings.</li>
                    <li><span className="font-medium">Best for:</span> Warehouses, sports halls, atriums.</li>
                  </ul>
                </AccentPanel>
              </div>
          </CardContent>
          </Card>

          {/* Siting and Spacing Essentials (BS 5839-1) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Siting and Spacing Essentials (BS 5839-1)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <AccentPanel tone="blue">
                  <p className="font-semibold">Smoke Detectors</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Max coverage typically 7.5 m radius; reduce for obstructions.</li>
                    <li>Keep at least 600 mm from walls, beams and light fittings.</li>
                    <li>Avoid kitchens and steamy areas; consider heat or multisensor.</li>
                  </ul>
                </AccentPanel>
                <AccentPanel tone="amber">
                  <p className="font-semibold">Heat Detectors</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Max coverage typically 5 m radius (A1/R); check manufacturer data.</li>
                    <li>Mount at ceiling apex; 25–150 mm below for pitched roofs.</li>
                    <li>Use rate-of-rise in kitchens; fixed temp in hot stable areas.</li>
                  </ul>
                </AccentPanel>
              </div>
            </CardContent>
          </Card>

          {/* Reducing False Alarms */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Reducing False Alarms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="rose">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Select multisensor in variable environments and consider alarm verification where supported.</li>
                  <li>Site away from air supply diffusers and steam sources.</li>
                  <li>Follow maintenance schedules; contamination increases sensitivity drift.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

           {/* Environmental Factors */}
           <Card className="bg-card border-transparent">
             <CardHeader>
               <CardTitle className="text-white">Environmental Factors in Selection</CardTitle>
             </CardHeader>
             <CardContent className="text-gray-300">
               <AccentPanel tone="teal">
                 <ul className="list-disc pl-6 space-y-1">
                   <li>Ambient conditions (dust, humidity, temperature).</li>
                   <li>Ceiling height and room size.</li>
                   <li>Potential fire risk sources.</li>
                   <li>Likelihood of false alarms from normal activity.</li>
                 </ul>
               </AccentPanel>
             </CardContent>
           </Card>

           {/* Real-World Example */}
           <Card className="bg-card border-transparent">
             <CardHeader>
               <CardTitle className="text-white">Real-World Example</CardTitle>
             </CardHeader>
             <CardContent className="text-gray-300 space-y-3">
               <AccentPanel tone="amber">
                 <p>A warehouse owner fitted point smoke detectors at 12 m high ceilings. These detectors struggled to detect smoke quickly due to stratification and distance from the fire source. The system was upgraded to use beam detectors spanning the warehouse width, detecting smoke much faster and meeting BS 5839 compliance.</p>
               </AccentPanel>
             </CardContent>
           </Card>

           {/* Common Mistakes to Avoid */}
           <Card className="bg-card border-transparent">
             <CardHeader>
               <CardTitle className="text-white">Common Mistakes to Avoid</CardTitle>
             </CardHeader>
             <CardContent className="text-gray-300">
               <AccentPanel tone="rose">
                 <ul className="list-disc pl-6 space-y-1">
                   <li>Using smoke detectors in areas with high steam or dust.</li>
                   <li>Using heat detectors where fast detection is critical (e.g., sleeping accommodation).</li>
                   <li>Not considering ceiling height limitations for certain detector types.</li>
                 </ul>
               </AccentPanel>
             </CardContent>
           </Card>

          {/* BS 7671 Coordination */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671 Coordination: Cabling, Segregation and Labelling</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use fire‑resistant cables with metal fixings/supports; avoid plastic clips alone on escape routes.</li>
                  <li>Segregate fire alarm circuits from LV power and data; maintain separation and clear identification.</li>
                  <li>Label isolators, interfaces and EOL devices; provide updated zone plans and circuit schedules.</li>
                  <li>Coordinate earthing/bonding and interfaces (doors, HVAC) with documented cause‑and‑effect.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          {/* Summary & Selection Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary & Selection Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="green">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Match detector type to environment: smoke for clean areas, heat for kitchens/dirty/humid spaces, multisensor for variable conditions, beam for high/large volumes.</li>
                  <li>Check siting limits (e.g., coverage radii, distances from walls/obstructions, ceiling heights).</li>
                  <li>Plan for false alarm reduction and maintenance access; follow manufacturer data and BS 5839‑1.</li>
                  <li>Coordinate wiring, segregation and labelling to BS 7671; record decisions in the logbook.</li>
                </ul>
              </AccentPanel>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check: Detector Selection</CardTitle>
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
                      <Button onClick={handleNext} className="bg-yellow-400 text-black hover:bg-yellow-400" disabled={selectedAnswers[currentQuestion] === undefined}>
                        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../fire-alarm-module-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module
              </Button>
            </Link>
            <Link to="../fire-alarm-module-2-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section: Manual Call Points
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule2Section1;
