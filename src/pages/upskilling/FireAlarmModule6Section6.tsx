import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Users, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Handover & Client Training - Fire Alarm Course";
const DESCRIPTION = "Master fire alarm system handover procedures, user training delivery and ongoing support per BS 5839-1.";

const FireAlarmModule6Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary purpose of system handover?',
      options: [
        'To complete the invoice',
        'To transfer responsibility and ensure users can operate the system safely',
        'To end the warranty period',
        'To satisfy insurance requirements only'
      ],
      correctAnswer: 1,
      explanation: 'Handover transfers responsibility to the client and ensures they can operate, test, and manage the fire alarm system safely and effectively.'
    },
    {
      id: 2,
      question: 'Who should receive fire alarm training?',
      options: [
        'Only the building owner',
        'Only security staff',
        'All responsible persons who will operate or manage the system',
        'Just the receptionist'
      ],
      correctAnswer: 2,
      explanation: 'All responsible persons who will operate, test, or manage the system should receive appropriate training for their role.'
    },
    {
      id: 3,
      question: 'What documentation must be provided at handover?',
      options: [
        'Just the warranty card',
        'Complete documentation package including certificates, drawings, and operating instructions',
        'Invoice only',
        'Marketing materials'
      ],
      correctAnswer: 1,
      explanation: 'A complete documentation package including certificates, as-fitted drawings, zone charts, and operating instructions must be provided.'
    },
    {
      id: 4,
      question: 'What practical demonstration should be included in user training?',
      options: [
        'Only how to silence alarms',
        'Panel operation, weekly testing, fault recognition and emergency procedures',
        'Just how to call for service',
        'Only fire drill procedures'
      ],
      correctAnswer: 1,
      explanation: 'Training should cover panel operation, weekly testing procedures, fault recognition and response, and emergency actions.'
    },
    {
      id: 5,
      question: 'When should handover training be conducted?',
      options: [
        'After the warranty expires',
        'Before the system is brought into service',
        'Only if the client requests it',
        'At the first annual service'
      ],
      correctAnswer: 1,
      explanation: 'Training must be completed before the system is brought into operational service to ensure safe and effective use from day one.'
    },
    {
      id: 6,
      question: 'What should happen if staff changes occur after handover?',
      options: [
        'Nothing - original training is sufficient',
        'New staff should receive appropriate training for their role',
        'Training is only needed if there are system changes',
        'Wait until the annual service'
      ],
      correctAnswer: 1,
      explanation: 'When staff with fire alarm responsibilities change, new personnel must receive appropriate training to maintain competent system management.'
    },
    {
      id: 7,
      question: 'What level of training should security staff receive?',
      options: [
        'Basic awareness only',
        'Comprehensive operator training including all panel functions',
        'No training is needed for security',
        'Engineering level training'
      ],
      correctAnswer: 1,
      explanation: 'Security staff often serve as first responders to alarms and should receive comprehensive training on all relevant panel operations and emergency procedures.'
    },
    {
      id: 8,
      question: 'What should be included in the operating instructions?',
      options: [
        'Sales information only',
        'Panel controls, alarm response, testing, fault reporting and emergency contacts',
        'Just manufacturer warranty',
        'Building regulations'
      ],
      correctAnswer: 1,
      explanation: 'Operating instructions should cover all aspects of day-to-day operation including controls, alarm response, testing procedures, and contact information.'
    },
    {
      id: 9,
      question: 'How should training attendance be recorded?',
      options: [
        'No record is needed',
        'Documented in the logbook with names, dates and topics covered',
        'Just a verbal confirmation',
        'Only if requested by insurers'
      ],
      correctAnswer: 1,
      explanation: 'Training attendance should be documented in the logbook with attendee names, dates, and topics covered for compliance and liability purposes.'
    },
    {
      id: 10,
      question: 'What ongoing support should be offered after handover?',
      options: [
        'None - handover ends all responsibility',
        '24-hour helpline, maintenance contract options and refresher training',
        'Only emergency callout',
        'Just annual service'
      ],
      correctAnswer: 1,
      explanation: 'Ongoing support typically includes helpline access, maintenance contract options, and availability of refresher training as needed.'
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
    <div className="bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-6">
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
              <Users className="h-5 w-5 text-elec-yellow" />
            </div>
            <span className="text-sm text-white/50">Section 6 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Handover & Client Training</h1>
          <p className="text-white/70">System handover procedures, user training delivery and ongoing support.</p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Handover</strong> transfers responsibility and ensures users can operate the system safely</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Training</strong> must cover panel operation, weekly testing, fault response and emergencies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Documentation</strong> should be complete and handed over before system goes live</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Plan and conduct effective system handover procedures",
              "Identify training needs for different user groups",
              "Deliver comprehensive operator training sessions",
              "Provide complete documentation packages at handover",
              "Establish ongoing support arrangements with clients",
              "Document training and handover activities appropriately"
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
            Handover Process Overview
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Handover is the <strong className="text-white">formal transfer of responsibility</strong> from installer to client, marking when the system becomes operational.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Handover Checklist:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verification testing complete and documented</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />All documentation prepared and organised</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Training sessions scheduled with key personnel</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Logbook established and initial entries made</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Ongoing support arrangements confirmed</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Never handover a system before training has been delivered and accepted.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Documentation Package
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">A complete <strong className="text-elec-yellow">documentation package</strong> is essential for effective system management.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Required Documents:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Certificate of Compliance</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />As-fitted drawings and zone chart</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Operating and maintenance instructions</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Cause-and-effect matrix</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Device schedules and specifications</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire alarm logbook</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Warranty information and service contacts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Identifying Training Needs
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Different personnel require <strong className="text-white">different levels of training</strong> based on their roles and responsibilities.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Training Levels by Role:</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-1" />
                  <span><strong className="text-white">Responsible Person:</strong> Full understanding of system, compliance requirements, management responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-1" />
                  <span><strong className="text-white">Security/Reception:</strong> Panel operation, alarm response, fault recognition, emergency contacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-1" />
                  <span><strong className="text-white">Maintenance Staff:</strong> Weekly testing procedures, visual inspection, logbook entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-1" />
                  <span><strong className="text-white">General Staff:</strong> Awareness of system, call point operation, evacuation procedures</span>
                </li>
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
          <p className="text-white/80 mb-3">The security manager has changed since handover. What action is required?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> The new security manager should receive comprehensive training appropriate to their role before assuming responsibility. This should be documented in the logbook and may be arranged through the maintaining company.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Operator Training Content
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Comprehensive operator training ensures staff can <strong className="text-elec-yellow">manage the system effectively</strong> in all situations.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Training Topics:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />System overview and zone layout</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Panel controls and displays</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Normal operating state recognition</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire alarm response procedures</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fault condition recognition and response</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Silencing and resetting alarms</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Weekly testing procedures</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Logbook entries and record keeping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Demonstrations
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Hands-on practice is <strong className="text-white">essential for confidence</strong> in operating the system.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Practical Exercises:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Activate a detector and observe panel response</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Silence alarms using correct procedure</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Reset system after alarm condition</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Navigate through panel menus</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Conduct a weekly test with trainee leading</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Complete logbook entries</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Always ensure building occupants are warned before any training that activates alarms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Ongoing Support Arrangements
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Establishing <strong className="text-elec-yellow">ongoing support arrangements</strong> ensures continued effective system management.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Support Options to Discuss:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Maintenance contract options and coverage</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Emergency callout arrangements</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Helpline availability for queries</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Refresher training availability</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />System extension or modification services</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Spare parts availability and ordering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Check 2 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">A client wants to bring the system live immediately without training as they are short-staffed. How should you respond?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Explain that training is essential before handover - operating an unfamiliar system could result in incorrect responses to alarms or faults, potentially endangering life. Offer flexible training times or a phased approach, but do not compromise on training delivery.</p>
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
                  Use the actual panel during training rather than just describing controls
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Provide written quick reference guides for common operations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Allow trainees to practise - hands-on experience builds confidence
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Rushing through training to meet deadlines
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to document who attended training and what was covered
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not providing contact details for ongoing support
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
              { q: "How long should handover training take?", a: "Typically 1-2 hours for basic operator training, longer for responsible persons or complex systems. Allow sufficient time for questions and practice." },
              { q: "What if the client refuses training?", a: "Document the refusal in writing and advise of the implications. Consider not completing handover until training is accepted, or obtain signed acknowledgment of risks." },
              { q: "Should training be repeated for shift staff?", a: "Yes - all staff who may need to operate the system should receive training. Schedule sessions for different shifts as needed." },
              { q: "Can we provide video training instead?", a: "Video can supplement but not replace hands-on training. Staff must have practical experience with the actual system before assuming responsibility." },
              { q: "What if the client has questions after handover?", a: "This is normal - provide helpline contact details. Many queries can be resolved by phone. Schedule follow-up visits if complex issues arise." },
              { q: "Should we test trainee understanding?", a: "Yes - ask questions during training and have trainees demonstrate operations. Ensure they can confidently perform key tasks before completing handover." }
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
              <p className="text-white/70 mb-4">Test your understanding of handover and client training with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-7">
              Module 7
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section6;
