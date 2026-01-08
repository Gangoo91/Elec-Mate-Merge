import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Hand, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "M Category Systems (Manual) - Fire Alarm Course";
const DESCRIPTION = "Learn about BS 5839-1 M category manual fire alarm systems: when they are appropriate, limitations, and compliance requirements.";

const FireAlarmModule1Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What does an M category fire alarm system consist of?',
      options: [
        'Automatic smoke detectors throughout',
        'Manual call points and alarm sounders only',
        'Heat detectors on escape routes',
        'Beam detectors in open spaces'
      ],
      correctAnswer: 1,
      explanation: 'M category systems rely on manual call points (MCPs) and sounders only, with no automatic detection.'
    },
    {
      id: 2,
      question: 'In which type of premises might M category be acceptable?',
      options: [
        'Hotels with sleeping accommodation',
        'Continuously occupied, low-risk, small premises',
        'Large warehouses with high-value stock',
        'Care homes with vulnerable occupants'
      ],
      correctAnswer: 1,
      explanation: 'M category may be suitable where risk is low, space is continuously occupied, and occupants can quickly raise the alarm.'
    },
    {
      id: 3,
      question: 'M category is NOT suitable where:',
      options: [
        'Occupants are continuously present',
        'The fire risk is low',
        'Sleeping accommodation exists',
        'The building is single-storey'
      ],
      correctAnswer: 2,
      explanation: 'Sleeping risk requires automatic detection as occupants may not be awake to discover and report a fire.'
    },
    {
      id: 4,
      question: 'What is the main limitation of M category systems?',
      options: [
        'Too expensive to install',
        'Relies on human detection and action to raise alarm',
        'Cannot include sounders',
        'Not permitted under Building Regulations'
      ],
      correctAnswer: 1,
      explanation: 'M systems depend entirely on humans noticing a fire and activating a call point, delaying warning until discovery.'
    },
    {
      id: 5,
      question: 'Manual call points in M systems should be located:',
      options: [
        'Only at the main entrance',
        'On escape routes, especially near exits and floor landings',
        'In plant rooms only',
        'Outside the building'
      ],
      correctAnswer: 1,
      explanation: 'MCPs should be positioned on escape routes so occupants can raise the alarm while evacuating.'
    },
    {
      id: 6,
      question: 'What maximum travel distance to a call point does BS 5839-1 recommend?',
      options: [
        '15 metres',
        '30 metres',
        '45 metres',
        '60 metres'
      ],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends MCPs be positioned so that no one needs to travel more than 45m to reach one.'
    },
    {
      id: 7,
      question: 'For M category, what audibility level should sounders achieve?',
      options: [
        '55 dB(A)',
        '60 dB(A)',
        '65 dB(A) minimum, 75 dB(A) for sleeping risk',
        'No specific requirement'
      ],
      correctAnswer: 2,
      explanation: 'Sounders must achieve 65 dB(A) minimum throughout, or 75 dB(A) at bed head level where sleeping risk exists.'
    },
    {
      id: 8,
      question: 'Can M category be combined with other categories?',
      options: [
        'No, M must be used alone',
        'Yes, often combined with L or P for additional automatic detection',
        'Only with P1',
        'Only in industrial premises'
      ],
      correctAnswer: 1,
      explanation: 'M is often combined with L or P categories - MCPs supplement automatic detection for manual alarm raising.'
    },
    {
      id: 9,
      question: 'Weekly testing of M category systems should include:',
      options: [
        'Testing all call points at once',
        'Testing at least one different call point each week on rotation',
        'No testing is required',
        'Only testing sounders'
      ],
      correctAnswer: 1,
      explanation: 'At least one MCP should be tested weekly, rotating through all call points over time.'
    },
    {
      id: 10,
      question: 'If a building currently has M category but changes to sleeping use, what is required?',
      options: [
        'No change needed',
        'Upgrade to an appropriate L category with automatic detection',
        'Add more call points only',
        'Remove the system entirely'
      ],
      correctAnswer: 1,
      explanation: 'Sleeping accommodation requires automatic detection - the system must be upgraded to L1, L2, or appropriate L category.'
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module-1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Hand className="h-7 w-7 text-blue-400" />
          </div>
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide">
            Section 3 of 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          M Category Systems (Manual)
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding when manual-only fire alarm systems are appropriate and their limitations.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            15-20 mins
          </span>
        </div>
      </section>

      {/* In 30 Seconds Card */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
              <span><strong>M category</strong> = manual call points + sounders only, no automatic detection</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Suitable only</strong> for low-risk, continuously occupied premises without sleeping</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Relies on humans</strong> to discover fire and activate call point - slower response</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Define the components of an M category system",
            "Identify when M category is appropriate",
            "Explain the limitations of manual-only systems",
            "Understand MCP positioning requirements",
            "Apply sounder audibility requirements",
            "Recognise when M must be upgraded to L category"
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
      <section className="px-4 pb-6 max-w-4xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">What Is M Category?</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-blue-400">M category</strong> is a <strong className="text-white">manual-only</strong> fire alarm system consisting of:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Manual Call Points (MCPs) - break glass units</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Alarm sounders throughout the building</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Fire alarm control panel</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />NO automatic detection (smoke/heat detectors)</li>
                </ul>
              </div>
              <p>The system relies entirely on <strong className="text-white">human detection</strong> - someone must see, smell, or otherwise notice a fire and then manually activate a call point.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">When Is M Category Appropriate?</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>M category may be acceptable where <strong className="text-white">all</strong> of the following apply:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Low fire risk</strong> - minimal fire load and ignition sources</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Continuously occupied</strong> - people present to detect fire</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Simple layout</strong> - fire visible from occupied areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>No sleeping</strong> - occupants awake and alert</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Trained occupants</strong> - know how to raise alarm</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical examples: Small single-storey offices with open plan layout and constant staff presence.</p>
            </div>
          </CardContent>
        </Card>

        {/* Warning Card */}
        <Card variant="ios" className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-[17px] font-semibold text-red-400">M Category Is NOT Suitable When:</h3>
            </div>
            <ul className="space-y-2 text-[13px] text-white/70">
              <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-red-400" />Sleeping accommodation exists (hotels, care homes, HMOs)</li>
              <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-red-400" />Premises are unoccupied for periods</li>
              <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-red-400" />High fire risk areas are not visible</li>
              <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-red-400" />Phased evacuation is required</li>
              <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-red-400" />Vulnerable occupants who need early warning</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">MCP Positioning Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Manual call points must be positioned so occupants can <strong className="text-white">easily reach one while evacuating</strong>:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Maximum <strong>45m travel distance</strong> to nearest MCP</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />At each <strong>final exit</strong> from the building</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />At each <strong>floor level landing</strong> of stairways</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Mounted at <strong>1.4m height</strong> (centre of device)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Clearly <strong>visible and accessible</strong></li>
                </ul>
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
            <p className="text-[15px] text-white/80 mb-3">A small office has 6 staff working 9-5 in an open-plan layout. At night and weekends the office is empty. Is M category appropriate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> M alone may not be appropriate as the premises are unoccupied outside working hours. An L category with automatic detection would provide protection when the building is empty.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Sounder Audibility Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Alarm sounders must achieve <strong className="text-white">adequate sound levels</strong> throughout the building:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>65 dB(A)</strong> minimum throughout occupied areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>75 dB(A)</strong> at bed head level (sleeping risk)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />5 dB above ambient background noise</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />VADs for hearing-impaired where required</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60">Note: Even M systems with no sleeping risk must achieve 65 dB(A) minimum throughout.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Testing and Maintenance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>M systems require <strong className="text-white">regular testing</strong> like all fire alarm systems:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Weekly test</strong> - activate one MCP (rotate through all)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Record in logbook</strong> - date, time, MCP tested, result</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>6-monthly service</strong> by competent person</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Annual inspection</strong> of all components</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">When M Must Be Upgraded</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>M category must be <strong className="text-white">upgraded to an L category</strong> when:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Building use changes to include sleeping</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Risk assessment identifies higher fire risk</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Premises become unoccupied for periods</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Building layout changes with hidden fire risks</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Fire strategy or insurer requires automatic detection</li>
                </ul>
              </div>
              <p>Any upgrade must be formally designed, certified, and documented.</p>
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
            <p className="text-[15px] text-white/80 mb-3">An office with M category is converting to a boutique hotel with 8 bedrooms. What action is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The M system must be upgraded to at least L2 (probably L1) to provide automatic detection for sleeping accommodation. The existing MCPs can remain as part of the upgraded system.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Practical Guidance</h2>
        <div className="space-y-3">
          <Card variant="ios" className="border-green-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-green-400 mb-2">Pro Tips</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Always question whether M is truly appropriate - err on the side of automatic detection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document the justification for M category clearly in design documentation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Review M category suitability whenever building use or occupancy changes
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
                  Specifying M to save cost when automatic detection is needed
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not upgrading when building use changes to include sleeping
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Assuming "small" or "simple" automatically means M is suitable
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Is M category ever used on its own in modern buildings?", a: "Rarely - most buildings now require some automatic detection. M is often combined with L or P categories." },
            { q: "Can I add a few smoke detectors to an M system?", a: "Yes - this would make it a combined category. Document clearly which areas have automatic detection." },
            { q: "Do MCPs need to be glass break type?", a: "Not necessarily - resettable MCPs are available. Glass break remains common and familiar to users." },
            { q: "What's the minimum number of MCPs for M category?", a: "No fixed minimum - positioning is based on travel distance (45m max) and exit/landing locations." },
            { q: "If my building is M category, does weekly testing apply?", a: "Yes - all fire alarm categories require weekly testing of at least one call point." },
            { q: "Can B&B accommodation use M category?", a: "No - any sleeping accommodation requires automatic detection (L category)." }
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of M category fire alarm systems with 10 questions.</p>
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
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="../module-1/section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-1/section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule1Section3;
