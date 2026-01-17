import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Beam & Aspirating Detectors - Fire Alarm Course Module 2";
const DESCRIPTION = "Learn about beam detectors and aspirating smoke detection (ASD) systems for high spaces and challenging environments per BS 5839-1.";

const FireAlarmModule2Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data - 10 questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What type of environment is best suited for beam detectors?',
      options: [
        'Small offices',
        'Large open spaces with high ceilings (warehouses, atriums)',
        'Bedrooms',
        'Kitchens'
      ],
      correctAnswer: 1,
      explanation: 'Beam detectors are ideal for large open spaces with high ceilings where point detectors would be impractical or ineffective due to stratification.'
    },
    {
      id: 2,
      question: 'How does an optical beam detector work?',
      options: [
        'By measuring temperature changes',
        'By detecting infrared beam obscuration caused by smoke',
        'By ionising air particles',
        'By sampling air through pipes'
      ],
      correctAnswer: 1,
      explanation: 'Beam detectors project an infrared beam from a transmitter to a receiver. Smoke reduces the beam signal strength, triggering an alarm when obscuration exceeds the threshold.'
    },
    {
      id: 3,
      question: 'What is the typical maximum path length for a standard beam detector?',
      options: ['25 m', '50 m', '100 m', '200 m'],
      correctAnswer: 2,
      explanation: 'Standard beam detectors typically cover path lengths up to 100 m, though extended range versions are available for longer distances.'
    },
    {
      id: 4,
      question: 'What does ASD stand for in fire detection?',
      options: [
        'Automatic Sensor Device',
        'Aspirating Smoke Detection',
        'Advanced Safety Detector',
        'Addressable Smoke Detector'
      ],
      correctAnswer: 1,
      explanation: 'ASD (Aspirating Smoke Detection) uses a fan to draw air samples through a network of pipes to a central detection chamber.'
    },
    {
      id: 5,
      question: 'What is a key advantage of aspirating smoke detection systems?',
      options: [
        'Lower installation cost',
        'Very early warning with high sensitivity detection',
        'No maintenance required',
        'Works in any temperature'
      ],
      correctAnswer: 1,
      explanation: 'ASD systems provide very early warning by detecting smoke at much lower levels than point detectors, making them ideal for high-value or mission-critical areas.'
    },
    {
      id: 6,
      question: 'Why might beam detectors give false alarms in buildings with large windows?',
      options: [
        'They are affected by moisture',
        'Sunlight can interfere with the infrared beam',
        'Windows block the beam',
        'Glass causes reflections'
      ],
      correctAnswer: 1,
      explanation: 'Direct sunlight can interfere with the infrared beam, causing false alarms. Careful positioning and consideration of sun paths is essential.'
    },
    {
      id: 7,
      question: 'What is the purpose of the sampling network in an ASD system?',
      options: [
        'To distribute sound throughout the building',
        'To collect air samples from protected areas and transport them to the detector',
        'To provide power to detectors',
        'To cool the detection chamber'
      ],
      correctAnswer: 1,
      explanation: 'The sampling network (pipes with small holes) continuously draws air from the protected area to the central detection unit for analysis.'
    },
    {
      id: 8,
      question: 'In which environment would ASD be preferred over point detectors?',
      options: [
        'Standard offices',
        'Server rooms, clean rooms, and cold stores',
        'Bedrooms',
        'Corridors'
      ],
      correctAnswer: 1,
      explanation: 'ASD is ideal for server rooms (very early warning), clean rooms (discrete sampling), and cold stores (detector can be in controlled environment).'
    },
    {
      id: 9,
      question: 'What is a reflective beam detector?',
      options: [
        'A beam detector with polished casing',
        'A beam detector with transmitter and receiver in one unit, using a remote reflector',
        'A detector that uses visible light',
        'A detector that reflects sound waves'
      ],
      correctAnswer: 1,
      explanation: 'Reflective beam detectors have the transmitter and receiver combined in one unit, with the beam reflecting off a remote reflector prism, simplifying installation.'
    },
    {
      id: 10,
      question: 'What maintenance consideration is important for ASD systems?',
      options: [
        'No maintenance is needed',
        'Regular filter cleaning/replacement and airflow verification',
        'Weekly battery replacement',
        'Daily calibration'
      ],
      correctAnswer: 1,
      explanation: 'ASD systems require regular maintenance including filter cleaning or replacement and verification that sampling pipes are not blocked or damaged.'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 2</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Maximize2 className="h-7 w-7 text-green-400" />
          </div>
          <span className="text-[11px] font-medium text-green-400 uppercase tracking-wide">
            Section 5 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Beam & Aspirating Detectors
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding optical beam detectors and aspirating smoke detection (ASD) systems for high spaces and challenging environments.
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
        <Card variant="ios-elevated" className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-green-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Beam detectors</strong> - ideal for large open spaces with high ceilings, detect smoke obscuring an infrared beam</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Aspirating (ASD)</strong> - very early warning, samples air through pipe network, ideal for server rooms and clean rooms</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Both overcome stratification</strong> - effective where point detectors would not work at height</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain how optical beam detectors work",
            "Describe aspirating smoke detection principles",
            "Identify appropriate applications for beam detectors",
            "Identify appropriate applications for ASD systems",
            "Understand installation and maintenance considerations",
            "Apply BS 5839-1 requirements for specialist detection"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-green-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Introduction to Specialist Detection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Standard point detectors are effective in most environments, but <strong className="text-white">large open spaces and challenging conditions</strong> require specialist detection technologies.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">When Specialist Detection Is Needed:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />High ceilings where smoke may stratify</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Large open spaces (warehouses, atriums, hangars)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Very early warning required (server rooms, heritage)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Extreme temperatures (cold stores, furnace areas)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Optical Beam Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> A transmitter projects an infrared beam across the protected space to a receiver. When smoke enters the beam path, it reduces the received signal strength. Activation occurs when obscuration exceeds the alarm threshold.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Two Main Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>End-to-end:</strong> Separate transmitter and receiver units</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Reflective:</strong> Combined unit with remote reflector prism</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Typical Specifications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Path length:</strong> 5 m to 100 m (standard)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Coverage width:</strong> 7.5 m to 15 m each side of beam</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Height range:</strong> Typically above 10.5 m (where point detectors are limited)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Beam Detector Applications</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Beam detectors are ideal for <strong className="text-white">large volume spaces</strong> where point detection is impractical.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-green-400 mb-2">Ideal Applications</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Warehouses and logistics centres</li>
                    <li>Atriums and shopping centres</li>
                    <li>Aircraft hangars</li>
                    <li>Churches and cathedrals</li>
                    <li>Sports halls and arenas</li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-amber-400 mb-2">Considerations</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Building movement/vibration</li>
                    <li>Sunlight interference</li>
                    <li>Steam/aerosol environments</li>
                    <li>Maintenance access at height</li>
                  </ul>
                </div>
              </div>
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
            <p className="text-[15px] text-white/80 mb-3">A warehouse has 15 m high ceilings and large skylights. What detection method might be suitable, and what installation consideration is important?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Beam detectors would be suitable for the high ceiling. Important consideration: position beams to avoid direct sunlight through skylights causing false alarms or signal interference.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Aspirating Smoke Detection (ASD)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> A fan continuously draws air samples through a network of pipes with small sampling holes. Air is transported to a central detection unit containing a highly sensitive laser-based smoke detection chamber.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">System Components:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Sampling network:</strong> Pipes with strategically placed holes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Detection unit:</strong> Contains fan, filter, and detector</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Filter:</strong> Removes dust to prevent contamination</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Aspirator fan:</strong> Draws air through the system</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Sensitivity Classes (BS EN 54-20):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Class A:</strong> Very high sensitivity (0.025% obs/m)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Class B:</strong> Enhanced sensitivity (0.10% obs/m)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Class C:</strong> Standard sensitivity (0.20% obs/m)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">ASD Applications</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>ASD provides <strong className="text-white">very early warning</strong> and is essential for high-value and mission-critical applications.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Ideal Applications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Data centres/server rooms:</strong> Very early warning to protect equipment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Clean rooms:</strong> Discrete sampling without visible devices</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Cold stores/freezers:</strong> Detector in controlled environment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Heritage buildings:</strong> Discrete protection, early warning</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>High-rise atriums:</strong> Sampling at multiple levels</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Prisons:</strong> Vandal-resistant (no exposed devices)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Installation and Maintenance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Both beam and ASD systems require <strong className="text-white">careful design and regular maintenance</strong>.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-white mb-2">Beam Detector Maintenance</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Regular alignment checks</li>
                    <li>Lens cleaning (dust/dirt)</li>
                    <li>Signal strength verification</li>
                    <li>Annual functional testing</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-white mb-2">ASD System Maintenance</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Filter cleaning/replacement</li>
                    <li>Airflow verification</li>
                    <li>Pipe network integrity check</li>
                    <li>Transport time testing</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ASD systems require specialist commissioning and maintenance. Ensure the installer and maintenance provider have appropriate training and experience.
                </p>
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
            <p className="text-[15px] text-white/80 mb-3">A client requires fire detection in a frozen food warehouse operating at -25C. Why would ASD be a better choice than point smoke detectors?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> ASD is ideal because the detection unit can be located in a temperature-controlled environment outside the freezer, while only the sampling pipes are exposed to extreme cold. Point detectors may not function reliably at such low temperatures.</p>
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
                  Consider building movement when specifying beam detectors - auto-alignment features help maintain reliable operation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  For ASD, calculate transport times during design to ensure detection within required timeframes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider using multiple beams at different heights in very high spaces to detect smoke at different stratification levels
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
                  Ignoring sunlight paths when positioning beam detectors - causes false alarms
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to provide adequate access for beam detector alignment and maintenance
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Neglecting ASD filter maintenance - blocked filters reduce sensitivity and airflow
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
            { q: "Can beam detectors be used in smoky environments?", a: "No - environments with normal levels of smoke, dust or steam can cause false alarms. Consider alternative detection methods for such areas." },
            { q: "How do I know which ASD sensitivity class to specify?", a: "Class A for very early warning (data centres), Class B for enhanced sensitivity (important areas), Class C for standard applications. The fire risk assessment should guide selection." },
            { q: "What happens if an ASD sampling pipe gets blocked?", a: "Modern ASD systems monitor airflow and will indicate a fault condition if the flow drops below acceptable levels. Regular maintenance checks pipe integrity." },
            { q: "Can beam and ASD systems connect to addressable panels?", a: "Yes - both can connect to addressable fire alarm systems. ASD systems can provide zone information based on which sampling points detected smoke." },
            { q: "Do beam detectors work in heritage buildings?", a: "Yes - reflective beam detectors can be discrete. However, ASD may be preferred where visual impact must be minimised." },
            { q: "What is the maximum sampling pipe length for ASD?", a: "Depends on the system - typically up to 100-200 m of pipe per detector, but transport time must be verified during design." }
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
        <Card variant="ios-elevated" className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of beam and aspirating detectors with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-green-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-green-500/20 border-green-500/50 text-white'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-2-section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-3">
              Next Module
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule2Section5;
