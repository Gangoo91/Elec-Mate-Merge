import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw, Cable, Plug, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Wiring & Terminations - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm cable installation, termination techniques, testing and compliance with BS 5839-1 and BS 7671.";

const FireAlarmModule5Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What type of cable is typically required for fire alarm circuits that need to continue operating during a fire?',
      options: [
        'Standard PVC insulated cable',
        'Fire-resistant cable complying with BS 7629 or BS 8434',
        'Armoured cable only',
        'Any red-coloured cable'
      ],
      correctAnswer: 1,
      explanation: 'Fire-resistant cables meeting BS 7629 or BS 8434 are required for circuits that must maintain operation during a fire, such as certain sounder and mains supply circuits.'
    },
    {
      id: 2,
      question: 'What is the maximum permitted loop resistance for most addressable fire alarm systems?',
      options: [
        '10 ohms',
        'As specified by the panel manufacturer, typically 20-50 ohms',
        '100 ohms',
        'No limit'
      ],
      correctAnswer: 1,
      explanation: 'Maximum loop resistance varies by manufacturer but is typically between 20-50 ohms. Always check the specific panel documentation for exact limits.'
    },
    {
      id: 3,
      question: 'When installing fire alarm cables in trunking, what segregation is required from mains cables?',
      options: [
        'No segregation needed',
        'Segregation as per BS 7671, typically a barrier or separate compartment',
        'Different colour trunking only',
        'At least 2m separation'
      ],
      correctAnswer: 1,
      explanation: 'BS 7671 requires segregation between fire alarm (Band I) and mains cables (Band II). This can be achieved with barriers, separate compartments, or spacing as specified.'
    },
    {
      id: 4,
      question: 'What purpose does the screen (foil) on fire alarm cable serve?',
      options: [
        'Colour coding only',
        'Electromagnetic interference (EMI) protection',
        'Fire resistance',
        'Additional conductor'
      ],
      correctAnswer: 1,
      explanation: 'The screen provides protection against electromagnetic interference which could cause false alarms or communication failures on addressable loops.'
    },
    {
      id: 5,
      question: 'How should the cable screen be terminated at addressable devices?',
      options: [
        'Cut off and discard',
        'Per manufacturer instructions - typically connected at panel end only',
        'Connected to both ends always',
        'Wrapped around the cable'
      ],
      correctAnswer: 1,
      explanation: 'Screen termination varies by manufacturer. Typically, the screen is only earthed at the panel end to avoid earth loops, but always follow manufacturer guidance.'
    },
    {
      id: 6,
      question: 'What insulation resistance is typically required for fire alarm circuits?',
      options: [
        '0.5 M ohms',
        '2 M ohms minimum between conductors and earth',
        '100 ohms',
        'No testing required'
      ],
      correctAnswer: 1,
      explanation: 'A minimum insulation resistance of 2 M ohms is typically required between conductors and earth, tested at 500V DC.'
    },
    {
      id: 7,
      question: 'What is the typical minimum cable size for fire alarm detection circuits?',
      options: [
        '0.5mm²',
        '1.0mm² or 1.5mm² depending on circuit length',
        '2.5mm²',
        '4.0mm²'
      ],
      correctAnswer: 1,
      explanation: 'Detection circuits typically use 1.0mm² or 1.5mm² cable, with larger sizes for longer runs to keep resistance within limits and ensure adequate current capacity.'
    },
    {
      id: 8,
      question: 'When terminating stranded conductors, what should be used?',
      options: [
        'Bare wire twisted tightly',
        'Ferrules (bootlace crimps) appropriate to conductor size',
        'Solder only',
        'Tape wrapped ends'
      ],
      correctAnswer: 1,
      explanation: 'Ferrules prevent strand separation, ensure consistent contact area, and prevent damage from terminal tightening. They should match the conductor size.'
    },
    {
      id: 9,
      question: 'What continuity test should be performed on newly installed fire alarm cables?',
      options: [
        'Just check for shorts',
        'End-to-end resistance of each conductor plus insulation between conductors',
        'Visual inspection only',
        'No testing until commissioning'
      ],
      correctAnswer: 1,
      explanation: 'Cable testing should include continuity of each conductor, insulation resistance between conductors and to earth, plus checks for short circuits.'
    },
    {
      id: 10,
      question: 'What labelling is required for fire alarm cables at the panel?',
      options: [
        'No labelling required',
        'Clear identification of circuit purpose, zones served and destination',
        'Manufacturer name only',
        'Date of installation only'
      ],
      correctAnswer: 1,
      explanation: 'Cables must be clearly labelled at the panel with circuit purpose, zones served and destinations to aid maintenance and fault finding.'
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
            <Link to="../module-5">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 5</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Cable className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-orange-400 uppercase tracking-wide">
            Section 4 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Wiring & Terminations
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Cable installation methods, termination techniques, testing requirements and compliance with BS 5839-1 and BS 7671.
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-orange-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Fire-resistant cables</strong> (BS 7629/8434) required for circuits operating during fire conditions</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Segregation</strong> from mains cables required per BS 7671 to prevent interference</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Test all cables</strong> for continuity and insulation resistance before connecting to equipment</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Select appropriate cable types for different circuit functions",
            "Install cables with correct segregation and support",
            "Terminate conductors using proper techniques and ferrules",
            "Test installed cables before equipment connection",
            "Document cable test results for handover",
            "Identify and resolve common wiring faults"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-orange-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Cable Types & Selection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Correct cable selection ensures <strong className="text-white">system reliability and compliance</strong>. Different circuits have different requirements based on their function during a fire.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Standard Fire Alarm Cable:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Red sheathed, screened cable for detection circuits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />1.0mm² or 1.5mm² typical for addressable loops</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />2-core for conventional, 2 or 4-core for addressable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Foil screen with drain wire for EMI protection</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Fire-Resistant Cable (BS 7629/8434):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Required for circuits operating during fire</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Sounder circuits in phased evacuation systems</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Mains supply to panel (if crossing fire zones)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Voice alarm and emergency lighting interfaces</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Cable Installation Methods</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Cables must be installed with <strong className="text-white">appropriate support and protection</strong> to ensure long-term reliability and maintainability.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Support Methods</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Cable tray at 300mm maximum centres</li>
                    <li>Conduit for mechanical protection</li>
                    <li>Trunking with appropriate segregation</li>
                    <li>Cable clips for surface runs</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Protection Requirements</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Mechanical protection where exposed</li>
                    <li>Fire stopping at compartment boundaries</li>
                    <li>IP rating maintained through enclosures</li>
                    <li>Bend radius not less than 6x diameter</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Fire-resistant cables lose their rating if damaged during installation. Handle with care and use appropriate bend radii.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Segregation Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 7671 requires <strong className="text-white">segregation between fire alarm and mains cables</strong> to prevent electromagnetic interference and ensure circuit integrity.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Band I (Fire Alarm) vs Band II (Mains) Segregation:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Physical barrier within common trunking</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Separate compartments with earthed dividers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Minimum spacing if no barrier (typically 50mm)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Separate containment systems preferred</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Document segregation methods on as-built drawings. Non-compliant segregation can cause false alarms and communication failures.</p>
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
            <p className="text-[15px] text-white/80 mb-3">Fire alarm cables need to run through common trunking with mains power cables. What segregation is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> A physical barrier (earthed metal partition) must separate the fire alarm cables (Band I) from mains cables (Band II), or they must be in separate compartments. Simply running them on opposite sides without a barrier is not compliant.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Termination Techniques</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Proper termination ensures <strong className="text-white">reliable connections</strong> that will not deteriorate over the system's lifespan.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Plug className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">Ferrule Requirements:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Use ferrules (bootlace crimps) on all stranded conductors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Match ferrule size to conductor cross-section</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Crimp with correct tool - not pliers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Insulated ferrules preferred in terminals</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Screen Termination:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Follow manufacturer's guidance precisely</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Typically earthed at panel end only</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Cut back and insulate at device end</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Avoid earth loops that cause interference</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Cable Testing</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>All cables must be <strong className="text-white">tested before connection</strong> to panel and devices to identify faults early.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">Required Tests:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Continuity:</strong> End-to-end resistance of each conductor</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Insulation:</strong> Minimum 2 M ohms at 500V DC between conductors and earth</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Short circuit:</strong> No shorts between conductors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Screen continuity:</strong> If screened cable used</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Loop Resistance Calculation:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Calculate expected resistance based on cable length</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />1.0mm² copper = approximately 18 ohms/km</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />1.5mm² copper = approximately 12 ohms/km</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Verify within panel manufacturer's limits</li>
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
            <p className="text-[15px] text-white/80 mb-3">An addressable loop uses 800m of 1.5mm² cable. What is the approximate loop resistance and is this likely to be acceptable?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> 800m of 1.5mm² cable = approximately 0.8 x 12 = 9.6 ohms outgoing + 9.6 ohms return = 19.2 ohms total loop resistance. This is typically within acceptable limits (most panels allow 20-50 ohms) but check specific manufacturer documentation.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Documentation & Labelling</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Proper documentation and labelling is <strong className="text-white">essential for maintenance and fault finding</strong> throughout the system's operational life.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Cable Labelling Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Label both ends of every cable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Include circuit reference and destination</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Use durable labels resistant to fading</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Match labelling to drawing references</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Test Records:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Record all test results during installation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Include date, tester name and instrument used</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Note any faults found and corrective action</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Include in handover documentation</li>
                </ul>
              </div>
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
            <p className="text-[15px] text-white/80 mb-3">Why is it important to test cables before connecting them to the fire alarm panel?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Testing before connection identifies faults while cables are accessible and before potential damage to equipment. A short circuit could damage the panel. Insulation faults may not show immediately but cause intermittent problems later. It is easier to rectify issues before devices are fitted.</p>
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
                  Label cables as you install them - much easier than trying to trace later
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Leave service loops at both ends - allows for repositioning and re-termination
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Test each cable as you install it rather than all at the end
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep a stock of the correct size ferrules - saves multiple trips
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
                  Using standard cable where fire-resistant is required
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not using ferrules on stranded conductors - leads to poor connections
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Earthing cable screens at both ends - creates earth loops
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Exceeding bend radius on fire-resistant cables - damages insulation
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
            { q: "Can I use junction boxes on fire alarm circuits?", a: "Yes, but they must be accessible for maintenance, fire-rated where required, and clearly labelled. Minimise joints where possible as they are potential fault points." },
            { q: "What if insulation resistance is below 2 M ohms?", a: "Investigate and rectify. Common causes include moisture ingress, damaged insulation, or contamination at terminations. Do not connect faulty cables to equipment." },
            { q: "Can fire alarm cables share containment with data cables?", a: "Generally yes - data cables are also Band I. However, check for EMC requirements especially with network cables. Some panel manufacturers have specific guidance." },
            { q: "Why do some cables have 4 cores?", a: "Some addressable systems use 4-core cable for outgoing and return paths, or for combined detection and sounder circuits. Check system design and panel requirements." },
            { q: "How do I know if fire-resistant cable is required?", a: "Check the system design. Generally required for any circuit that must operate during evacuation - sounders, voice alarm, emergency lighting interfaces and certain supply cables." },
            { q: "What about cables in ceiling voids?", a: "Must be properly supported, protected from damage, and routed to allow access for maintenance. Fire stopping required at compartment boundaries." }
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of wiring and terminations with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-orange-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-orange-500/20 border-orange-500/50 text-white'
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
            <Link to="../module-5/section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-5/section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule5Section4;
