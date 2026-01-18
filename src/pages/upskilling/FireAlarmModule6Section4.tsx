import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ClipboardList, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Module 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
            </div>
            <span className="text-sm text-white/50">Section 4 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Record Keeping & Logbooks</h1>
          <p className="text-white/70">Maintenance records, logbook entries and compliance evidence requirements.</p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Logbooks</strong> must record all tests, faults, false alarms, and system changes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Retention period</strong> is minimum 3 years per BS 5839-1 for authority inspection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Entries must be immediate</strong> - made before leaving site after any work or test</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Explain BS 5839-1 record retention requirements and their purpose",
              "Complete logbook entries correctly for all test and maintenance activities",
              "Document faults with sufficient detail for effective follow-up",
              "Record false alarms to support unwanted alarm reduction programmes",
              "Maintain digital records with appropriate security and audit trails",
              "Present records professionally for authority and insurance inspection"
            ].map((outcome, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-elec-yellow">{i + 1}</span>
                  </div>
                  <p className="text-sm text-white/80">{outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Requirements for Record Keeping
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">BS 5839-1 mandates comprehensive record keeping as <strong className="text-white">legal evidence of compliance</strong> with fire safety regulations.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Key Legal Requirements:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Minimum 3-year retention of all records</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Records available for fire authority inspection</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Insurance companies may require access</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Evidence of competent person involvement</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Poor record keeping can invalidate insurance and result in enforcement action.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Alarm Logbook Contents
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">The logbook is the <strong className="text-elec-yellow">central record</strong> of all fire alarm system activities and should be maintained throughout the system's life.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Essential Logbook Sections:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />System description and zone schedule</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Installation certificate and design data</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Weekly test records</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Service visit reports</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fault and remedial action log</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />False alarm register</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />System modifications record</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recording Weekly Tests
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Every weekly test must be <strong className="text-white">documented immediately</strong> with sufficient detail to demonstrate compliance.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Weekly Test Entry Requirements:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Date and time of test</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Name and signature of person conducting test</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Zone or device tested (rotating through all)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Test result (satisfactory/unsatisfactory)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Any faults observed with description</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Actions taken or required</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">A weekly test entry simply states "Test OK". Is this adequate?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> No - the entry lacks required detail. It should specify which zone/device was tested, the time, who conducted the test, and their signature. Without this detail, compliance cannot be demonstrated.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Recording Procedures
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Comprehensive fault recording enables <strong className="text-elec-yellow">effective remediation</strong> and helps identify recurring issues.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Fault Entry Requirements:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Date and time fault discovered</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Exact location (zone, device, address)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Nature of fault (detailed description)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Immediate actions taken</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Remedial work required</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Completion date and verification</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Critical faults must be escalated immediately - do not just record and wait.
              </p>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            False Alarm Recording
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Recording false alarms supports <strong className="text-white">unwanted alarm reduction</strong> and helps identify problem areas.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">False Alarm Record Contents:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Date and time of alarm activation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Zone and device that activated</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Cause of activation (if known)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Investigation findings</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Preventive measures implemented</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire brigade attendance (if applicable)</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">High false alarm rates may trigger fire brigade charging schemes.</p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Digital Record Systems
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Digital systems offer advantages but must meet <strong className="text-elec-yellow">specific security requirements</strong> to be acceptable.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Digital System Requirements:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Secure user authentication and access control</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Comprehensive audit trail of all entries</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Tamper-evident record storage</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Regular backup procedures</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Data protection compliance (GDPR)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Ability to produce printed reports</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Consider maintaining paper backup for critical records.</p>
          </div>
        </div>

        {/* Quick Check 2 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">The fire authority requests to see test records from 2 years ago. The records have been deleted to save storage space. What are the implications?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> This is a compliance breach - BS 5839-1 requires 3-year retention. The responsible person may face enforcement action, and insurance validity could be questioned. Always maintain records for the full retention period.</p>
          </div>
        </div>

        {/* Quick Check 3 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">A building has experienced 5 false alarms from the same detector in the past month. What should the logbook show?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Each incident should be recorded separately with investigation findings. The pattern should trigger escalated investigation, documented in the fault log. Actions might include detector cleaning, relocation, or type change - all documented with justification.</p>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Practical Guidance</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Pro Tips</h4>
              <ul className="space-y-2 text-sm text-white/70">
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
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-sm text-white/70">
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
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Can I use a spreadsheet as my logbook?", a: "Yes, if it meets security requirements - audit trails, access control, and tamper evidence. A dedicated fire alarm record system is preferable." },
              { q: "Who is responsible for maintaining the logbook?", a: "The responsible person (typically building owner/manager) has overall responsibility, but may delegate entries to trained staff or service engineers." },
              { q: "What if the logbook is lost or destroyed?", a: "Report to the responsible person immediately. Reconstruct what records are possible from service company copies. Implement better security for replacement." },
              { q: "Must service engineers update the logbook?", a: "Yes - service visit details must be entered before leaving site. Engineers should also review the logbook for any reported issues since the last visit." },
              { q: "How detailed should fault descriptions be?", a: "Detailed enough that another engineer could understand the issue without attending site. Include symptoms, location, suspected cause, and actions taken." },
              { q: "Should evacuations during tests be recorded?", a: "Yes - record any evacuation drills conducted, including timing, participation, and any issues identified. This demonstrates emergency procedure compliance." }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-sm text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Knowledge Check</h3>
          </div>

          {!showQuiz ? (
            <div className="text-center py-6">
              <p className="text-white/70 mb-4">Test your understanding of record keeping and logbooks with 10 questions.</p>
              <Button onClick={() => setShowQuiz(true)} className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation">
                Start Quiz
              </Button>
            </div>
          ) : showResults ? (
            <div className="space-y-6">
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-elec-yellow">{calculateScore()}/{questions.length}</p>
                <p className="text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
              </div>

              <div className="space-y-4">
                {questions.map((q, i) => {
                  const correct = selectedAnswers[i] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                      <p className={`text-sm ${correct ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {q.options[selectedAnswers[i]] ?? 'Not answered'} {correct ? '(Correct)' : '(Incorrect)'}
                      </p>
                      {!correct && (
                        <p className="text-sm text-white/50 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                      )}
                      <p className="text-sm text-white/70 mt-2">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <Button onClick={resetQuiz} variant="outline" className="w-full min-h-[44px] touch-manipulation border-white/20 text-white hover:bg-white/10">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

              <div>
                <p className="font-semibold text-white mb-4">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((opt, idx) => {
                    const selected = selectedAnswers[currentQuestion] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-lg border transition-all touch-manipulation min-h-[44px] ${
                          selected
                            ? 'bg-elec-yellow/20 border-elec-yellow/50 text-white'
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
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex-1 min-h-[44px] touch-manipulation border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  className="flex-1 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" asChild className="flex-1 min-h-[44px] touch-manipulation border-white/20 text-white hover:bg-white/10">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-5">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section4;
