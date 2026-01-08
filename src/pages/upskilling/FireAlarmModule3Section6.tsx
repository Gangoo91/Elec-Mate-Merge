import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Settings, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Cause & Effect Design - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 cause and effect design: programming logic, delays, coincidence, interfaces, documentation, and commissioning procedures.";

const FireAlarmModule3Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary purpose of a cause and effect matrix?',
      options: ['To list equipment costs', 'To document how system inputs produce outputs including delays and interface actions', 'To record maintenance dates', 'To show cable routes only'],
      correctAnswer: 1,
      explanation: 'The C&E matrix clearly defines the relationship between inputs (detectors, MCPs) and outputs (sounders, interfaces) including any logic like delays or coincidence.'
    },
    {
      id: 2,
      question: 'An investigation delay (where permitted) is used to:',
      options: ['Speed up evacuation', 'Allow brief checking before full evacuation', 'Silence faults', 'Reduce detector sensitivity'],
      correctAnswer: 1,
      explanation: 'An investigation delay allows staff to check the source of an alarm before triggering full evacuation, where the fire strategy permits.'
    },
    {
      id: 3,
      question: 'Coincidence (double knock) typically means:',
      options: ['Any single device triggers evacuation', 'Two independent triggers are required before specific actions occur', 'No alarm is raised', 'Only manual call points operate'],
      correctAnswer: 1,
      explanation: 'Coincidence requires two separate inputs (e.g., two detectors in the same area) before triggering certain outputs, reducing unwanted evacuations.'
    },
    {
      id: 4,
      question: 'Why should manual call points typically override investigation delays?',
      options: ['They should not override delays', 'Manual activation indicates confirmed emergency requiring immediate evacuation', 'To test the delay function', 'MCPs are less important than detectors'],
      correctAnswer: 1,
      explanation: 'Manual call point operation indicates a person has confirmed an emergency situation, warranting immediate full evacuation without delay.'
    },
    {
      id: 5,
      question: 'What documentation should be provided with the cause and effect matrix?',
      options: ['No documentation needed', 'Interface schedules, test procedures, and commissioning records', 'Only manufacturer catalogues', 'Verbal descriptions only'],
      correctAnswer: 1,
      explanation: 'Complete documentation includes interface schedules defining each output, test procedures, and commissioning records showing verification of each function.'
    },
    {
      id: 6,
      question: 'What is meant by "alert" and "evacuate" signals in phased evacuation?',
      options: ['Same tone everywhere', 'Alert prepares adjacent areas; evacuate instructs immediate departure', 'They are identical signals', 'Alert is visual only'],
      correctAnswer: 1,
      explanation: 'Distinct signals enable phased response: alert warns adjacent areas to standby while evacuate signals immediate departure from affected zones.'
    },
    {
      id: 7,
      question: 'How should interfaces fail when power is lost?',
      options: ['Remain in last state', 'Fail to a safe state (e.g., doors released, plant shut down)', 'Lock all doors', 'Continue normal operation'],
      correctAnswer: 1,
      explanation: 'Fail-safe design ensures interfaces move to safe states on power loss: fire doors close, essential plant shuts down, access control releases.'
    },
    {
      id: 8,
      question: 'What is a common interface action for fire alarm activation?',
      options: ['Start HVAC fans on fire', 'Release electromagnetic door hold-opens', 'Open all windows', 'Start lifts to top floor'],
      correctAnswer: 1,
      explanation: 'Door hold-opens are typically released on alarm; other common interfaces include lift recall, HVAC shutdown, and smoke control activation.'
    },
    {
      id: 9,
      question: 'Why must interface circuits be monitored?',
      options: ['Monitoring is not required', 'To detect faults ensuring interface reliability before emergency', 'Only for counting operations', 'For aesthetic purposes'],
      correctAnswer: 1,
      explanation: 'Interface monitoring detects wiring faults before an emergency, ensuring critical functions like door release and HVAC shutdown will operate when needed.'
    },
    {
      id: 10,
      question: 'What should happen after building alterations affecting fire alarm zones?',
      options: ['Nothing - system continues unchanged', 'Update zone plans, C&E matrix, and record changes in logbook', 'Remove the fire alarm system', 'Only update every 5 years'],
      correctAnswer: 1,
      explanation: 'All documentation must be updated after alterations, including zone plans, C&E matrix, and logbook entries, to maintain compliance and correct system operation.'
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
            <Link to="../module-3">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 3</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 6</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Settings className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 6 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Cause & Effect Design
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Programming system logic, interfaces, documentation, and commissioning for reliable fire alarm operation.
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-amber-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>C&E matrix</strong> documents inputs, logic (delays/coincidence), and outputs for all scenarios</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Interfaces</strong> must be fail-safe and monitored: doors, lifts, HVAC, plant shutdown</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Commission and document</strong> all functions with witnessed tests and handover records</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Develop cause and effect matrices aligned with fire strategy",
            "Programme investigation delays and coincidence logic appropriately",
            "Integrate interfaces with doors, lifts, HVAC, and plant systems",
            "Design fail-safe and monitored interface circuits",
            "Commission and document system functions with test evidence",
            "Maintain documentation through building lifecycle changes"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-amber-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Cause and Effect Matrix</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The C&E matrix is the core document defining system behaviour:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Matrix Components:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Inputs:</strong> detectors, MCPs, interfaces (by zone/address)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Logic:</strong> delays, coincidence, overrides, escalation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Outputs:</strong> sounders, VADs, interfaces, remote signalling</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Scenarios:</strong> normal alarm, fault, test mode, power failure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Delays and Coincidence</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Delays and coincidence can reduce unwanted evacuations but must be carefully justified:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Delay Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">Investigation delay:</strong> allows staff to check before full evacuation (typically 1-3 mins)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">Coincidence:</strong> requires two independent triggers before action</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">MCP override:</strong> manual activation bypasses delays</span></li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Delays must be agreed with the responsible person and documented in the fire risk assessment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Alert and Evacuate Signals</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Phased evacuation requires distinct signalling for different areas:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Signal Design:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Alert:</strong> intermittent tone - prepare, await instruction</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Evacuate:</strong> continuous tone - leave immediately</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Fire floor + above:</strong> immediate evacuate signal</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Other floors:</strong> alert, then progressive evacuation</li>
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
            <p className="text-[15px] text-white/80 mb-3">A hotel uses a 2-minute investigation delay for automatic detectors. What should happen if someone operates a manual call point?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The manual call point should override the investigation delay and trigger immediate full evacuation. MCP operation indicates someone has confirmed an emergency, so delays should not apply.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Interface Integration</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Common interfaces with other building systems:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Typical Interfaces:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Door hold-opens:</strong> release on alarm to close fire doors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Lifts:</strong> recall to ground floor, disable call buttons</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>HVAC:</strong> shutdown or smoke control mode as designed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Access control:</strong> fail-safe release for evacuation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Plant shutdown:</strong> gas, machinery, process equipment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Fail-Safe and Monitoring</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Interface circuits must be designed for reliability:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Design Principles:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Fail-safe:</strong> move to safe state on power loss or fault</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Monitored:</strong> detect open/short circuit faults</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Independence:</strong> avoid single points of failure</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Testing:</strong> verify fail-safe behaviour during commissioning</li>
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
            <p className="text-[15px] text-white/80 mb-3">What should happen to electromagnetic door hold-opens if the fire alarm system loses power?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The hold-opens should release (fail-safe) so fire doors close automatically. This ensures compartmentation is maintained even if the fire alarm system is not powered. The magnetic hold-opens require power to hold doors open.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Commissioning and Documentation</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Complete documentation supports ongoing operation and maintenance:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Documentation Package:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>C&E matrix:</strong> complete with all scenarios and variations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Test records:</strong> witnessed commissioning of each function</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>As-built drawings:</strong> accurate device positions and zones</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Interface schedules:</strong> connections and actions for each system</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>O&M manual:</strong> operation, maintenance, and test procedures</li>
                </ul>
              </div>
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
                  Develop the C&E matrix early in design and validate with all stakeholders
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Test each interface fail-safe condition during commissioning, not just normal operation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep the C&E matrix updated after any system changes and record in the logbook
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
                  Using unjustified delays without fire risk assessment agreement
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Unmonitored interface circuits that could fail without indication
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Missing documentation making future maintenance impossible
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
            { q: "Who approves investigation delays?", a: "Delays must be agreed with the responsible person (usually the building owner/manager) and documented in the fire risk assessment. The fire strategy should support their use." },
            { q: "How often should interface functions be tested?", a: "Follow BS 5839-1 recommendations - typically weekly for at least one device, quarterly for a proportion, and annually for 100% including interface fail-safe behaviour." },
            { q: "Can coincidence be used in sleeping risk premises?", a: "Generally not recommended for sleeping risk due to delayed response. Where used, ensure very short investigation periods and robust staff response procedures." },
            { q: "What if the C&E matrix changes after handover?", a: "Any changes must be documented, recorded in the logbook, and the matrix updated. Major changes may require variation certificates and updated commissioning." },
            { q: "How should interfaces to third-party systems be documented?", a: "Document the connection point, signal type, expected action, fail-safe behaviour, and responsible parties for each interface in the interface schedule." },
            { q: "What testing verifies coincidence logic?", a: "Activate each trigger independently (should not cause full action), then activate both together (should trigger action). Document both test conditions." }
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
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of cause and effect design with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-amber-400">{calculateScore()}/{questions.length}</p>
                  <p className="text-[15px] text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const correct = selectedAnswers[i] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[15px] font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                        <p className={`text-[13px] ${correct ? 'text-green-400' : 'text-red-400'}`}>
                          Your answer: {q.options[selectedAnswers[i]] ?? 'Not answered'} {correct ? '' : ''}
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
                              ? 'bg-amber-500/20 border-amber-500/50 text-white'
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
            <Link to="../module-3/section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-4">
              Next Module
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section6;
