import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Users, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Customer Witness Testing & Sign-Off - Fire Alarm Course";
const DESCRIPTION = "Learn how to conduct structured customer witness testing, provide training, and complete formal handover procedures for fire alarm systems.";

const FireAlarmModule5Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Customer witness testing should be conducted:',
      options: [
        'Without a plan or structure',
        'Against pre-agreed scripts tied to the cause and effect matrix',
        'Randomly selecting tests on the day',
        'By email confirmation only'
      ],
      correctAnswer: 1,
      explanation: 'Use agreed test scripts mapped to the cause and effect matrix for structured, comprehensive witnessing.'
    },
    {
      id: 2,
      question: 'Who should be present during witness testing where interfaces are involved?',
      options: [
        'Anyone who is available',
        'Relevant stakeholders (e.g., FM, HVAC, lifts) with permits and isolations in place',
        'Only the security team',
        'No additional people required'
      ],
      correctAnswer: 1,
      explanation: 'Coordinate with stakeholders responsible for interfaced systems to safely test all interfaces.'
    },
    {
      id: 3,
      question: 'Formal acceptance requires:',
      options: [
        'Verbal confirmation only',
        'Signed witness sheets and completion certificates',
        'A telephone call',
        'No specific documentation'
      ],
      correctAnswer: 1,
      explanation: 'Formal sign-off requires signed documentation including witness sheets and certificates.'
    },
    {
      id: 4,
      question: 'Demonstrations should cover:',
      options: [
        'Only alarm activation',
        'Normal, fault, disablement, test and alarm states',
        'Only the silence button',
        'Nothing specific'
      ],
      correctAnswer: 1,
      explanation: 'Show system operation across all modes to the Responsible Person for comprehensive understanding.'
    },
    {
      id: 5,
      question: 'Training records should include:',
      options: [
        'First names only',
        'Attendees, date, scope covered and trainer signature',
        'No details required',
        'Photographs of the session'
      ],
      correctAnswer: 1,
      explanation: 'Maintain clear training evidence including attendance, scope and trainer details for handover.'
    },
    {
      id: 6,
      question: 'Post-acceptance, the client should receive:',
      options: [
        'No documents',
        'O&M manuals, configuration backup and contact details for maintenance',
        'A calendar only',
        'Unverified copies'
      ],
      correctAnswer: 1,
      explanation: 'Provide full documentation including O&M manuals and panel configuration backup.'
    },
    {
      id: 7,
      question: 'Any outstanding snags at sign-off should be:',
      options: [
        'Ignored',
        'Listed with target close-out dates and assigned responsibility',
        'Kept confidential',
        'Deleted from records'
      ],
      correctAnswer: 1,
      explanation: 'Manage outstanding items transparently with clear ownership and timelines.'
    },
    {
      id: 8,
      question: 'Fire drill and evacuation integration should be:',
      options: [
        'Not discussed',
        'Agreed with the Responsible Person and documented',
        'Left for a later date',
        'Randomly scheduled'
      ],
      correctAnswer: 1,
      explanation: 'Align with site procedures and document agreements for emergency response.'
    },
    {
      id: 9,
      question: 'What confirms event log integrity for handover?',
      options: [
        'Random entries',
        'Correct panel time and date settings with test records',
        'Colour theme selection',
        'Screensaver settings'
      ],
      correctAnswer: 1,
      explanation: 'Accurate timestamps and logs support traceability and demonstrate proper commissioning.'
    },
    {
      id: 10,
      question: 'Final sign-off is typically by:',
      options: [
        'An unknown person',
        'The client Responsible Person or appointed representative',
        'A local supplier',
        'Any person present'
      ],
      correctAnswer: 1,
      explanation: 'Formal acceptance is by the Responsible Person or their appointed representative.'
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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-course/module-5">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Module 5</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Users className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-xs font-medium text-elec-yellow/80 uppercase tracking-wider">Section 6 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Customer Witness Testing & Sign-Off</h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Structured witness testing, customer demonstrations, training delivery and formal handover procedures.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Scripted witness tests</strong> mapped to cause and effect matrix with stakeholder attendance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Training delivery</strong> with documented attendance and scope covered</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Formal sign-off</strong> by Responsible Person with complete documentation handover</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Prepare and conduct structured witness testing",
              "Coordinate stakeholders for interface demonstrations",
              "Deliver effective training to the Responsible Person",
              "Complete formal acceptance documentation",
              "Manage outstanding items and aftercare",
              "Document evacuation procedures and ARC arrangements"
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

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 01 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Pre-Witness Planning
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Thorough planning</strong> ensures witness testing runs smoothly and demonstrates system compliance effectively to the client.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Planning Checklist:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Hold readiness review to confirm documentation complete</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Verify drawings, C&E matrix and test records up to date</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Agree test scenarios and sequence with Responsible Person</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Plan isolations and confirm stakeholder attendance</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">Schedule witness testing when all relevant stakeholders can attend and interfaces can be safely tested.</p>
            </div>
          </section>

          {/* Section 02 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Scripted Live Tests
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Use <strong className="text-elec-yellow">pre-agreed test scripts</strong> mapped to the cause and effect matrix to systematically demonstrate all system functions.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Demonstrate All System States:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Normal:</strong> System healthy, no faults or alarms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Fault:</strong> Device removal, cable fault simulation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Disablement:</strong> Zone and device disablement procedures</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Test:</strong> Weekly test procedures and walk test mode</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Alarm:</strong> Full alarm activation and response</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
                <p className="text-sm font-semibold text-white mb-3">Evidence Capture:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Verify panel date and time settings are correct</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Capture photographs of key tests and outputs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Record results on signed witness sheets</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Safety and Risk Controls
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Safety controls</strong> must be in place before activating any alarms or testing interfaces with other building systems.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Safety Requirements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Permit-to-work in place where required</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />ARC and monitoring routes paused or notified</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Fire wardens briefed and in position</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Interface isolations authorised (HVAC, lifts, doors)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Agree contingency plans and communication protocols before commencing witness tests.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Check 1 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">You are about to demonstrate fire alarm activation that will trigger HVAC shutdown. What safety preparations are essential?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Notify the ARC and pause monitoring, brief fire wardens, obtain authorisation for HVAC shutdown, ensure HVAC personnel are present and aware, have a rollback plan, and confirm communications with building management.</p>
            </div>
          </div>

          {/* Section 04 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Training Delivery
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Provide <strong className="text-elec-yellow">comprehensive training</strong> to the Responsible Person and key staff on system operation, testing and basic maintenance.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Training Syllabus:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />CIE controls: silence, reset, disablements and acknowledge</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Weekly test procedures and documentation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Reading event logs and acknowledging faults</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Basic troubleshooting and fault indicators</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Escalation routes and maintenance contacts</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
                <p className="text-sm font-semibold text-white mb-3">Training Records Must Include:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Names of all attendees</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Date and duration of training</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Scope and topics covered</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Trainer name and signature</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 05 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Evidence and Acceptance
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Formal acceptance requires <strong className="text-white">signed documentation</strong> confirming the system has been demonstrated and accepted by the client.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Acceptance Documentation:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Signed witness sheets with test results</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Completion and commissioning certificates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Training attendance records</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />O&M manuals issued and acknowledged</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Panel configuration backup provided</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Final sign-off should be by the Responsible Person or their formally appointed representative.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Check 2 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">What should be included in training records for fire alarm handover?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Training records should include: names of all attendees, date and duration of training, scope and topics covered, and trainer name with signature. These records form part of the handover documentation.</p>
            </div>
          </div>

          {/* Section 06 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Post-Handover and Aftercare
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Following acceptance, establish clear <strong className="text-elec-yellow">aftercare arrangements</strong> and ensure any outstanding items are tracked to completion.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Outstanding Items Management:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Snag register with owners and target dates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Severity classification for prioritisation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Progress tracking and client updates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Close-out evidence and sign-off</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
                <p className="text-sm font-semibold text-white mb-3">Aftercare Arrangements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Maintenance contact details and response times</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />First maintenance visit scheduling</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />ARC monitoring arrangements confirmed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Fire drill integration documented</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Check 3 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">Some minor snags remain at the time of handover. How should these be managed?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Outstanding items should be documented in a snag register with clear ownership, target completion dates and severity classifications. Progress should be tracked and the client kept informed. Critical safety items must be resolved before acceptance.</p>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Practical Guidance</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-green-400" />
                <h4 className="text-sm font-semibold text-green-400">Pro Tips</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Provide quick-reference cards for common operations like weekly testing and fault acknowledgement
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Assess training effectiveness with a brief knowledge check or practical demonstration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Confirm handover contacts and response SLAs are clearly documented and understood
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <h4 className="text-sm font-semibold text-red-400">Common Mistakes</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Rushing witness testing without proper stakeholder coordination and safety controls
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to verify panel date and time settings affecting event log integrity
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not documenting training attendance leading to disputes about competence
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
              { q: "Can we conduct witness testing during normal working hours?", a: "Yes, with appropriate permits, notices and safety controls. Building occupants should be notified and fire wardens briefed. Some tests may need to be scheduled out of hours." },
              { q: "Who should sign the acceptance certificate?", a: "The Responsible Person under fire safety legislation or their formally appointed representative. Ensure they have authority to accept on behalf of the organisation." },
              { q: "What evidence is required for witness testing?", a: "Signed test scripts, event logs with correct timestamps, photographs of key tests, and signed witness sheets confirming satisfactory demonstration." },
              { q: "How do we handle failed tests during witnessing?", a: "Document the failure, investigate the cause, implement corrective action and retest. Only accept sign-off when all tests pass satisfactorily." },
              { q: "Should we include refresher training arrangements?", a: "Yes, agree a plan for refresher training with the client, particularly for new staff. Document recommended intervals and contact arrangements." },
              { q: "What if the Responsible Person cannot attend witness testing?", a: "They may appoint a competent representative with authority to sign off. Document this delegation clearly and ensure the representative understands their responsibilities." }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-2">{faq.q}</p>
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
              <p className="text-sm text-white/70 mb-4">Test your understanding of witness testing and handover with 10 questions.</p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="min-h-[44px] px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation"
              >
                Start Quiz
              </Button>
            </div>
          ) : showResults ? (
            <div className="space-y-6">
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-elec-yellow">{calculateScore()}/{questions.length}</p>
                <p className="text-sm text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
              </div>

              <div className="space-y-4">
                {questions.map((q, i) => {
                  const correct = selectedAnswers[i] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
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

              <Button
                onClick={resetQuiz}
                variant="outline"
                className="w-full min-h-[44px] border-white/20 text-white hover:bg-white/5 touch-manipulation"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

              <div>
                <p className="text-base font-semibold text-white mb-4">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
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
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex-1 min-h-[44px] border-white/20 text-white hover:bg-white/5 touch-manipulation disabled:opacity-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  className="flex-1 min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation disabled:opacity-50"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="outline" asChild className="flex-1 min-h-[44px] border-white/20 text-white hover:bg-white/5 touch-manipulation">
            <Link to="../section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation">
            <Link to="/upskilling/fire-alarm-course/module-6">
              Next Module
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule5Section6;
