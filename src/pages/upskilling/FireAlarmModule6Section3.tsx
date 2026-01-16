import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Search, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Fault Finding Techniques - Fire Alarm Course";
const DESCRIPTION = "Master systematic diagnosis of fire alarm faults, common problems and professional repair procedures per BS 5839-1.";

const FireAlarmModule6Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the first step in systematic fault finding?',
      options: [
        'Replace the suspected faulty device',
        'Check the control panel display and fault indicators',
        'Test all detectors in the building',
        'Contact the equipment manufacturer'
      ],
      correctAnswer: 1,
      explanation: 'Always start at the control panel - check displays, fault indicators, and event logs to identify the nature and location of the fault before investigating further.'
    },
    {
      id: 2,
      question: 'What voltage should be used for insulation resistance testing on fire alarm circuits?',
      options: [
        '250V DC',
        '500V DC',
        '1000V DC',
        '230V AC'
      ],
      correctAnswer: 1,
      explanation: 'BS 7671 specifies 500V DC for insulation resistance testing of fire alarm circuits to identify earth faults and insulation breakdown.'
    },
    {
      id: 3,
      question: 'An earth fault on an addressable loop typically causes:',
      options: [
        'All devices to stop working immediately',
        'Loop fault indication and possible communication errors',
        'Continuous alarm sounding',
        'No visible symptoms'
      ],
      correctAnswer: 1,
      explanation: 'Earth faults on addressable loops cause fault indications and may cause communication errors or device addressing problems depending on severity.'
    },
    {
      id: 4,
      question: 'What is the typical value of an end-of-line resistor in conventional systems?',
      options: [
        '1 kohm',
        '4.7 kohm',
        '10 kohm',
        '47 kohm'
      ],
      correctAnswer: 1,
      explanation: '4.7 kohm is the standard end-of-line resistor value used in most UK fire alarm systems to monitor circuit integrity.'
    },
    {
      id: 5,
      question: 'Which tool is essential for tracing cable routes in concealed installations?',
      options: [
        'Sound level meter',
        'Cable locator or toner',
        'Insulation tester only',
        'Temperature probe'
      ],
      correctAnswer: 1,
      explanation: 'A cable locator or toner enables tracing of concealed cables to identify break points or routing without destructive investigation.'
    },
    {
      id: 6,
      question: 'What is the most common cause of intermittent detector faults?',
      options: [
        'Incorrect detector type',
        'Poor cable connections or terminal corrosion',
        'Wrong sensitivity setting',
        'Excessive cable length'
      ],
      correctAnswer: 1,
      explanation: 'Intermittent faults are commonly caused by poor connections that make and break contact, often due to loose terminals or corrosion.'
    },
    {
      id: 7,
      question: 'When diagnosing a zone fault, what should you check after isolating the zone?',
      options: [
        'Only the control panel',
        'Whether the fault indication clears, confirming fault is on that zone',
        'All other zones',
        'The building fire risk assessment'
      ],
      correctAnswer: 1,
      explanation: 'If the fault clears when a zone is isolated, this confirms the fault is on that zone circuit, allowing focused investigation.'
    },
    {
      id: 8,
      question: 'What causes voltage drop issues on long addressable loops?',
      options: [
        'Too many detectors',
        'Excessive loop length or undersized cables',
        'Wrong detector type',
        'Panel software error'
      ],
      correctAnswer: 1,
      explanation: 'Voltage drop occurs when loop length exceeds design limits or cables are undersized, causing communication errors at distant devices.'
    },
    {
      id: 9,
      question: 'How should you approach a fault that only occurs at specific times?',
      options: [
        'Ignore it if the system works most of the time',
        'Investigate environmental factors at those times (heating, lighting, building use)',
        'Replace all devices',
        'Reduce system sensitivity'
      ],
      correctAnswer: 1,
      explanation: 'Time-specific faults often relate to environmental factors - heating cycles, lighting changes, or building activities that affect conditions.'
    },
    {
      id: 10,
      question: 'What is the minimum acceptable insulation resistance for fire alarm circuits?',
      options: [
        '0.5 megohms',
        '1.0 megohms',
        '2.0 megohms',
        '0.25 megohms'
      ],
      correctAnswer: 0,
      explanation: 'The minimum acceptable insulation resistance is 0.5 megohms per BS 7671, though higher values indicate better circuit condition.'
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
            <Link to="../module-6">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 6</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Search className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 3 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Fault Finding Techniques
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Systematic diagnosis methods, common fault types and professional repair procedures.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            30-35 mins
          </span>
        </div>
      </section>

      {/* In 30 Seconds Card */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-cyan-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-cyan-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Start at the panel</strong> - check displays, fault LEDs, and event logs before investigating field devices</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Systematic isolation</strong> narrows down fault location - zone by zone, device by device</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Test equipment</strong> is essential - multimeter, insulation tester (500V DC), cable locator</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Apply systematic fault finding methodology starting at the control panel",
            "Diagnose earth faults using insulation resistance testing techniques",
            "Identify and resolve open circuit and short circuit faults",
            "Troubleshoot addressable loop communication problems",
            "Use appropriate test equipment safely and effectively",
            "Document fault diagnosis and repair actions professionally"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-cyan-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Systematic Fault Finding Approach</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Effective fault finding requires a <strong className="text-white">methodical approach</strong> that starts with information gathering before physical investigation.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Fault Finding Methodology:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Step 1: Check control panel - fault type, zone, event log</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Step 2: Gather information - when did it start, any changes?</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Step 3: Isolate and test - narrow down the location</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Step 4: Identify root cause - not just symptoms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Step 5: Repair and verify - test before restoring service</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Never assume - always verify each step before proceeding to the next.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Earth Fault Diagnosis</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Earth faults are among the most common issues and can cause <strong className="text-cyan-400">intermittent problems</strong> or system instability.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Earth Fault Symptoms:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Earth fault LED illuminated on panel</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Intermittent zone or device faults</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Communication errors on addressable systems</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />System instability in damp conditions</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Common Earth Fault Causes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Water ingress in junction boxes or devices</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Cable damage from building works</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Corroded terminals or connections</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Insulation breakdown due to age or heat</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Insulation Resistance Testing</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Insulation resistance testing at <strong className="text-white">500V DC</strong> identifies insulation breakdown between conductors and earth.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Test Procedure:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Isolate the circuit from the control panel</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test between positive conductor and earth</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test between negative conductor and earth</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Minimum acceptable: 0.5 megohms</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Disconnect all devices before testing - 500V can damage electronic components.
                </p>
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
            <p className="text-[15px] text-white/80 mb-3">An earth fault appears intermittently, only during wet weather. Where would you focus your investigation?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Focus on external cable routes, junction boxes exposed to weather, devices in unheated areas, and any locations where water ingress is possible. Check seals, glands, and enclosure integrity.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Open Circuit Faults</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Open circuit faults indicate a <strong className="text-cyan-400">break in circuit continuity</strong>, preventing signal transmission.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Open Circuit Causes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Broken or severed cables</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Loose or disconnected terminals</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Failed end-of-line resistor (conventional)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Removed or damaged device</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Diagnosis Method:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Measure resistance across circuit at panel</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Should read EOL value (typically 4.7 kohm)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Infinite reading confirms open circuit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Half-split method to locate break point</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Short Circuit Faults</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Short circuits create <strong className="text-white">unintended connections</strong> between conductors, triggering fault conditions.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Short Circuit Indicators:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Very low or zero resistance reading</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Blown fuses or tripped protection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Continuous alarm or fault condition</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Overheating at fault location</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Common Short Circuit Causes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Cable damage exposing conductors</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Incorrect wiring at device or junction</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Water bridging terminals</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Faulty device with internal short</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Addressable Loop Faults</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Addressable systems have unique fault types related to <strong className="text-cyan-400">digital communication</strong> between panel and devices.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Communication Fault Causes:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Voltage drop on long cable runs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Electrical interference from other services</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Duplicate device addresses</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Incorrect device type programmed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Poor connections causing data corruption</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Use panel diagnostics to identify specific device communication issues.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A conventional zone shows a fault. Resistance measurement at the panel reads infinite. What does this indicate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> An open circuit fault - the circuit continuity is broken somewhere between the panel and the end-of-line resistor. Check for broken cables, loose connections, or removed devices.</p>
            </div>
          </CardContent>
        </Card>

        {/* Inline Check 3 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">Multiple devices at the far end of an addressable loop show communication errors. What is the likely cause?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Voltage drop - the loop is too long or cables are undersized. Check voltage at distant devices and compare with panel output. Solutions include upgrading cable size or installing a loop powered repeater.</p>
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
                  Always check the event log - it often shows when the fault first occurred and any patterns
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Use the half-split method to quickly locate breaks in long cable runs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep a basic toolkit including multimeter, insulation tester, and cable locator
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
                  Replacing components without finding the root cause - the fault often returns
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Forgetting to disconnect devices before insulation testing - damaging electronics
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not documenting the fault and repair - missing valuable diagnostic history
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
            { q: "What is the half-split method?", a: "Disconnect the circuit at the midpoint and test each half. The faulty half will show abnormal readings. Repeat until you isolate the fault location." },
            { q: "Why do faults sometimes appear and disappear?", a: "Intermittent faults are often caused by loose connections, temperature-related expansion/contraction, or moisture that comes and goes with environmental changes." },
            { q: "Can I use a standard multimeter for fault finding?", a: "Yes for continuity and resistance, but you need a proper insulation tester for 500V DC testing. Some multimeters have this function built in." },
            { q: "How do I find a fault in a concealed cable?", a: "Use a cable locator/toner to trace the route, then use time domain reflectometry (TDR) if available, or the half-split method at accessible junction points." },
            { q: "What if I cannot find the fault?", a: "Document all tests performed, consider environmental factors, and if necessary escalate to manufacturer technical support with full diagnostic information." },
            { q: "Should I replace a device that keeps causing faults?", a: "Only after eliminating wiring and environmental causes. If the device is genuinely faulty, replace with same type and document the change." }
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
        <Card variant="ios-elevated" className="border-cyan-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of fault finding techniques with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-cyan-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
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
            <Link to="../module-6/section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-6/section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section3;
