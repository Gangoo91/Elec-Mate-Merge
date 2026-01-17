import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, RotateCcw, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Record Keeping & Logbooks - Fire Alarm Course";
const DESCRIPTION = "Master fire alarm documentation requirements: logbook entries, maintenance records and compliance evidence per BS 5839-1.";

const FireAlarmModule6Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'How long must fire alarm test and maintenance records be retained?',
      options: [
        '1 year minimum',
        '2 years minimum',
        '3 years minimum',
        '5 years minimum'
      ],
      correctAnswer: 2,
      explanation: 'BS 5839-1 requires fire alarm records to be retained for a minimum of 3 years for inspection by fire authorities and insurers.'
    },
    {
      id: 2,
      question: 'What information must be recorded after every weekly test?',
      options: [
        'Just the date',
        'Date, time, person conducting test, zone tested, and results',
        'Only if a fault was found',
        'Simple pass/fail notation'
      ],
      correctAnswer: 1,
      explanation: 'Weekly test entries must include date, time, name of person conducting the test, zone or device tested, results, and any faults found.'
    },
    {
      id: 3,
      question: 'Who should have access to the fire alarm logbook?',
      options: [
        'Only the building owner',
        'Only fire alarm engineers',
        'Responsible persons, fire authorities, insurers, and service engineers',
        'Anyone who requests it'
      ],
      correctAnswer: 2,
      explanation: 'The logbook should be accessible to responsible persons, fire authorities during inspections, insurance assessors, and service engineers.'
    },
    {
      id: 4,
      question: 'What must be recorded when a fault is discovered?',
      options: [
        'Just that a fault occurred',
        'Date, time, location, nature of fault, action taken, and completion date',
        'Only the repair cost',
        'Name of person who found it'
      ],
      correctAnswer: 1,
      explanation: 'Fault records must include full details: discovery date/time, exact location, fault description, immediate actions, remedial work, and completion verification.'
    },
    {
      id: 5,
      question: 'Where should the fire alarm logbook be kept?',
      options: [
        'At the fire alarm service company office',
        'In a secure location near the fire alarm control panel',
        'In the building manager\'s home',
        'Only in digital format online'
      ],
      correctAnswer: 1,
      explanation: 'The logbook should be kept in a secure but accessible location near the main fire alarm control panel for easy access during tests and inspections.'
    },
    {
      id: 6,
      question: 'What information should be recorded about false alarms?',
      options: [
        'Nothing - false alarms don\'t need recording',
        'Just the date',
        'Date, time, zone, cause investigation, and preventive measures taken',
        'Only if reported to fire brigade'
      ],
      correctAnswer: 2,
      explanation: 'False alarms require detailed recording including cause investigation and measures taken to prevent recurrence, supporting unwanted alarm reduction programmes.'
    },
    {
      id: 7,
      question: 'When must the logbook be updated after a service visit?',
      options: [
        'Within 28 days',
        'At the next visit',
        'Before the engineer leaves site',
        'When convenient'
      ],
      correctAnswer: 2,
      explanation: 'Service visit details must be entered in the logbook before the engineer leaves site, ensuring immediate documentation of all work performed.'
    },
    {
      id: 8,
      question: 'What system modifications require logbook documentation?',
      options: [
        'Only major upgrades',
        'All modifications including additions, removals, and programming changes',
        'Only detector changes',
        'None - modifications are tracked elsewhere'
      ],
      correctAnswer: 1,
      explanation: 'All system modifications must be documented, including device additions/removals, zone changes, programming alterations, and any system extensions.'
    },
    {
      id: 9,
      question: 'Digital record systems must provide:',
      options: [
        'Basic data storage only',
        'Audit trails showing who made entries and when',
        'Colour printing capability',
        'Social media integration'
      ],
      correctAnswer: 1,
      explanation: 'Digital systems must maintain comprehensive audit trails showing user identification, date/time of entries, and any modifications made to records.'
    },
    {
      id: 10,
      question: 'What should be recorded when the system is taken out of service for maintenance?',
      options: [
        'Nothing special',
        'Start time, end time, zones affected, fire safety measures implemented',
        'Just the date',
        'Only if longer than 24 hours'
      ],
      correctAnswer: 1,
      explanation: 'System outages require recording start/end times, affected areas, and compensatory fire safety measures implemented during the maintenance period.'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 6</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <ClipboardList className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 4 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Record Keeping & Logbooks
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Maintenance records, logbook entries and compliance evidence requirements.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            20-25 mins
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
              <span><strong>Logbooks</strong> must record all tests, faults, false alarms, and system changes</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Retention period</strong> is minimum 3 years per BS 5839-1 for authority inspection</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Entries must be immediate</strong> - made before leaving site after any work or test</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain BS 5839-1 record retention requirements and their purpose",
            "Complete logbook entries correctly for all test and maintenance activities",
            "Document faults with sufficient detail for effective follow-up",
            "Record false alarms to support unwanted alarm reduction programmes",
            "Maintain digital records with appropriate security and audit trails",
            "Present records professionally for authority and insurance inspection"
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
              <h3 className="text-[17px] font-semibold text-white">Legal Requirements for Record Keeping</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 mandates comprehensive record keeping as <strong className="text-white">legal evidence of compliance</strong> with fire safety regulations.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Legal Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Minimum 3-year retention of all records</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Records available for fire authority inspection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Insurance companies may require access</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Evidence of competent person involvement</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Poor record keeping can invalidate insurance and result in enforcement action.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Fire Alarm Logbook Contents</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The logbook is the <strong className="text-cyan-400">central record</strong> of all fire alarm system activities and should be maintained throughout the system's life.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Essential Logbook Sections:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />System description and zone schedule</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Installation certificate and design data</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Weekly test records</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Service visit reports</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Fault and remedial action log</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />False alarm register</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />System modifications record</li>
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
              <h3 className="text-[17px] font-semibold text-white">Recording Weekly Tests</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Every weekly test must be <strong className="text-white">documented immediately</strong> with sufficient detail to demonstrate compliance.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Weekly Test Entry Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Date and time of test</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Name and signature of person conducting test</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Zone or device tested (rotating through all)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test result (satisfactory/unsatisfactory)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Any faults observed with description</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Actions taken or required</li>
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
            <p className="text-[15px] text-white/80 mb-3">A weekly test entry simply states "Test OK". Is this adequate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - the entry lacks required detail. It should specify which zone/device was tested, the time, who conducted the test, and their signature. Without this detail, compliance cannot be demonstrated.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Fault Recording Procedures</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Comprehensive fault recording enables <strong className="text-cyan-400">effective remediation</strong> and helps identify recurring issues.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Fault Entry Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Date and time fault discovered</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Exact location (zone, device, address)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Nature of fault (detailed description)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Immediate actions taken</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Remedial work required</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Completion date and verification</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Critical faults must be escalated immediately - do not just record and wait.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">False Alarm Recording</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Recording false alarms supports <strong className="text-white">unwanted alarm reduction</strong> and helps identify problem areas.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">False Alarm Record Contents:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Date and time of alarm activation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Zone and device that activated</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Cause of activation (if known)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Investigation findings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Preventive measures implemented</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Fire brigade attendance (if applicable)</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">High false alarm rates may trigger fire brigade charging schemes.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Digital Record Systems</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Digital systems offer advantages but must meet <strong className="text-cyan-400">specific security requirements</strong> to be acceptable.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Digital System Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Secure user authentication and access control</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Comprehensive audit trail of all entries</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Tamper-evident record storage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Regular backup procedures</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Data protection compliance (GDPR)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Ability to produce printed reports</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Consider maintaining paper backup for critical records.</p>
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
            <p className="text-[15px] text-white/80 mb-3">The fire authority requests to see test records from 2 years ago. The records have been deleted to save storage space. What are the implications?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> This is a compliance breach - BS 5839-1 requires 3-year retention. The responsible person may face enforcement action, and insurance validity could be questioned. Always maintain records for the full retention period.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A building has experienced 5 false alarms from the same detector in the past month. What should the logbook show?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Each incident should be recorded separately with investigation findings. The pattern should trigger escalated investigation, documented in the fault log. Actions might include detector cleaning, relocation, or type change - all documented with justification.</p>
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
                  Use standardised forms to ensure all required information is captured
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Review records periodically to identify trends and recurring issues
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep the logbook secure but accessible - near the main panel is ideal
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
                  Vague entries that lack specific details about what was tested or found
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Backdating entries or completing records in batches rather than immediately
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Deleting or destroying records before the 3-year retention period
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
            { q: "Can I use a spreadsheet as my logbook?", a: "Yes, if it meets security requirements - audit trails, access control, and tamper evidence. A dedicated fire alarm record system is preferable." },
            { q: "Who is responsible for maintaining the logbook?", a: "The responsible person (typically building owner/manager) has overall responsibility, but may delegate entries to trained staff or service engineers." },
            { q: "What if the logbook is lost or destroyed?", a: "Report to the responsible person immediately. Reconstruct what records are possible from service company copies. Implement better security for replacement." },
            { q: "Must service engineers update the logbook?", a: "Yes - service visit details must be entered before leaving site. Engineers should also review the logbook for any reported issues since the last visit." },
            { q: "How detailed should fault descriptions be?", a: "Detailed enough that another engineer could understand the issue without attending site. Include symptoms, location, suspected cause, and actions taken." },
            { q: "Should evacuations during tests be recorded?", a: "Yes - record any evacuation drills conducted, including timing, participation, and any issues identified. This demonstrates emergency procedure compliance." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of record keeping and logbooks with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section4;
