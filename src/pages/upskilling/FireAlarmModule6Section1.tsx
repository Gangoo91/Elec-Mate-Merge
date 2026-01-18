import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ClipboardCheck, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Routine Testing Requirements - Fire Alarm Course";
const DESCRIPTION = "Master BS 5839-1 fire alarm testing schedules: weekly, monthly, quarterly and annual test procedures with documentation requirements.";

const FireAlarmModule6Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'According to BS 5839-1, how frequently must weekly tests be conducted?',
      options: [
        'Every 7 days with no tolerance',
        'Every 7 days with a tolerance of plus or minus 1 day',
        'Every Monday without exception',
        'Every 10 days maximum'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 requires weekly tests every 7 days with a tolerance of plus or minus 1 day (24 hours) to allow for operational flexibility.'
    },
    {
      id: 2,
      question: 'What percentage of manual call points should be tested each quarter?',
      options: [
        '10% of all MCPs',
        '25% of all MCPs',
        '50% of all MCPs',
        '100% of all MCPs'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 requires 25% of manual call points to be tested quarterly, ensuring all MCPs are tested within a 12-month period.'
    },
    {
      id: 3,
      question: 'During weekly testing, which component must always be tested?',
      options: [
        'Every smoke detector in the building',
        'All sounder circuits',
        'At least one zone via a manual call point or detector',
        'The standby batteries under full load'
      ],
      correctAnswer: 2,
      explanation: 'Weekly tests require activation of at least one zone using a manual call point or detector to verify panel response and alarm operation.'
    },
    {
      id: 4,
      question: 'What is the minimum sound level required from alarm sounders in occupied areas?',
      options: [
        '60 dB(A) at any point',
        '65 dB(A) at any occupied point',
        '75 dB(A) throughout the building',
        '85 dB(A) minimum everywhere'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 requires a minimum of 65 dB(A) at any occupied point, rising to 75 dB(A) where background noise is high or in sleeping accommodation.'
    },
    {
      id: 5,
      question: 'How often must the standby power supply capacity be verified?',
      options: [
        'Weekly',
        'Monthly',
        'Quarterly',
        'Annually'
      ],
      correctAnswer: 3,
      explanation: 'Annual testing must verify standby battery capacity can support the system for the required duration (typically 24-72 hours plus 30 minutes alarm).'
    },
    {
      id: 6,
      question: 'What action is required if a weekly test reveals a fault?',
      options: [
        'Wait until the next scheduled service',
        'Record it and continue with normal operation',
        'Record immediately and arrange repair based on fault severity',
        'Shut down the system until repaired'
      ],
      correctAnswer: 2,
      explanation: 'Faults must be recorded immediately in the logbook and repairs arranged according to severity - critical faults require immediate action.'
    },
    {
      id: 7,
      question: 'Which document must be completed after every routine test?',
      options: [
        'Installation certificate',
        'Fire alarm logbook entry',
        'Building risk assessment',
        'Insurance notification'
      ],
      correctAnswer: 1,
      explanation: 'Every routine test must be recorded in the fire alarm logbook with date, time, test performed, results, and tester signature.'
    },
    {
      id: 8,
      question: 'What is the recommended maximum test duration to minimise disruption?',
      options: [
        '5 minutes',
        '10 minutes',
        '30 minutes',
        '1 hour'
      ],
      correctAnswer: 1,
      explanation: 'Weekly tests should typically be completed within 10 minutes to minimise disruption whilst achieving thorough verification.'
    },
    {
      id: 9,
      question: 'Who is permitted to conduct weekly fire alarm tests?',
      options: [
        'Only qualified fire alarm engineers',
        'Only the building owner',
        'A trained responsible person',
        'Anyone available at the time'
      ],
      correctAnswer: 2,
      explanation: 'Weekly tests may be conducted by a trained responsible person who understands the system and test procedures.'
    },
    {
      id: 10,
      question: 'What must be checked on the control panel during every weekly test?',
      options: [
        'Only the power LED',
        'All indicator LEDs, display, and any fault conditions',
        'Just the alarm output',
        'Only the battery voltage'
      ],
      correctAnswer: 1,
      explanation: 'Weekly checks must verify all indicator LEDs, display readouts, and confirm no fault conditions are present on the control panel.'
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
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <ClipboardCheck className="h-4 w-4" />
            <span>Module 6 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Routine Testing Requirements
          </h1>
          <p className="text-white/80">
            Weekly, monthly, quarterly and annual test schedules per BS 5839-1 for maintaining fire alarm system reliability
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              6 learning outcomes
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              25-30 mins
            </span>
          </div>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong>Weekly tests</strong> check one zone via MCP/detector, verify panel indicators, and record in logbook</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong>Quarterly tests</strong> cover 25% of MCPs and detectors, ensuring full coverage within 12 months</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong>Annual tests</strong> require 100% device testing, battery capacity verification, and cause-and-effect checks</span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-2">
              <li><strong>Spot:</strong> Test schedule boards near fire panels showing last test dates</li>
              <li><strong>Use:</strong> Follow rotation patterns to ensure all devices get tested within required timeframes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the BS 5839-1 testing schedule hierarchy from weekly to annual",
              "Conduct weekly tests including zone activation and panel verification",
              "Implement quarterly detector and MCP sampling programmes",
              "Execute annual comprehensive testing including battery capacity",
              "Document all test results correctly in the fire alarm logbook",
              "Identify when faults require immediate versus scheduled attention"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 5839-1 Testing Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>BS 5839-1 establishes a <strong>tiered testing regime</strong> designed to ensure fire alarm systems remain fully operational throughout their service life. The testing hierarchy balances thoroughness with practicality.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Testing Frequency Hierarchy:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Weekly: Basic functionality and zone checks</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Monthly: Extended checks and visual inspection</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Quarterly: 25% device sampling rotation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Annually: Comprehensive 100% verification</li>
              </ul>
            </div>
            <p className="text-sm text-white/80 italic">The testing regime applies to all fire alarm systems regardless of size or category.</p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Weekly Test Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Weekly tests verify <strong className="text-elec-yellow">basic system functionality</strong> and can be performed by a trained responsible person. Tests must occur every 7 days with a tolerance of plus or minus 1 day.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Weekly Test Checklist:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Activate at least one zone using an MCP or detector</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify control panel indicates the correct zone</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Confirm sounders operate in the activated zone</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Check all panel LEDs and display for faults</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Record results in the fire alarm logbook</li>
              </ul>
            </div>
            <p className="text-sm text-white/80 italic">Use a different call point each week to ensure all are tested over time.</p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Monthly Test Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Monthly tests extend the weekly checks to include <strong>visual inspections</strong> and verification of ancillary equipment connections.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Monthly Test Additions:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Visual check of all accessible detectors for damage</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Inspect MCPs for damage, obstruction, or tampering</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify remote monitoring transmission (if fitted)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Check standby battery voltage readings</li>
              </ul>
            </div>
            <p className="text-sm text-white/80 italic">Monthly checks help identify emerging issues before they become critical.</p>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white mb-3">A weekly test is due on Friday, but the responsible person is on leave. When is the latest the test can be performed?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white"><strong>Answer:</strong> Saturday (the following day). BS 5839-1 allows a tolerance of plus or minus 1 day, so the test can be done Thursday through Saturday without non-compliance.</p>
          </div>
        </div>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Quarterly Test Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Quarterly testing introduces <strong className="text-elec-yellow">systematic device sampling</strong>, ensuring all detectors and MCPs are functionally tested within a 12-month cycle.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Quarterly Testing Requirements:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Test 25% of all manual call points</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Functionally test 25% of all detectors</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify sounder audibility in sampled areas</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Document which devices were tested</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Maintain a rotation schedule to ensure different devices are tested each quarter.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Annual Test Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Annual testing is the most comprehensive inspection, requiring <strong>100% verification</strong> of all system components by a competent person.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Annual Test Scope:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Functional test of every detector using appropriate method</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Test every manual call point for correct operation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify standby battery capacity (load test)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Check cause-and-effect programming operates correctly</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Test all ancillary equipment interfaces</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify sound levels meet minimum requirements</li>
              </ul>
            </div>
            <p className="text-sm text-white/80 italic">Annual tests must be conducted by a competent fire alarm engineer with appropriate qualifications.</p>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Sound Level Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Sound level verification ensures <strong className="text-elec-yellow">alarm audibility</strong> meets BS 5839-1 requirements for effective occupant warning.</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Sound Level Requirements:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Minimum 65 dB(A) at any occupied point</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Minimum 75 dB(A) where background noise exceeds 60 dB(A)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Minimum 75 dB(A) at bedhead in sleeping accommodation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Measurements using calibrated sound level meter</li>
              </ul>
            </div>
            <p className="text-sm text-white/80 italic">Sound level meters must be calibrated within the previous 12 months.</p>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white mb-3">A building has 40 manual call points. How many must be tested in each quarterly inspection?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white"><strong>Answer:</strong> 10 MCPs (25% of 40). This ensures all 40 are tested across four quarterly inspections within the year.</p>
          </div>
        </div>

        {/* Quick Check 3 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white mb-3">During an annual test, a detector fails to respond. What should happen?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white"><strong>Answer:</strong> Record the fault immediately, investigate the cause (wiring, detector, or base), replace if necessary, and document the remedial action. The system should not be certified until all devices function correctly.</p>
          </div>
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Schedule weekly tests at the same time each week to establish routine and minimise disruption
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Create a device rotation schedule for quarterly testing to ensure systematic coverage
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Warn building occupants before testing to prevent unnecessary evacuations
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Testing the same call point every week</strong> — rotate through all devices systematically</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Failing to silence alarms promptly</strong> — causes unnecessary disturbance to occupants</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Not informing monitoring station</strong> — results in false alarm charges and emergency response</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can weekly tests be skipped during holidays?", a: "No - the 7-day tolerance only allows tests to be conducted a day early or late. Extended gaps breach BS 5839-1 requirements." },
              { q: "Who is responsible for weekly testing?", a: "The duty holder (typically building owner/manager) is responsible, but testing can be delegated to any trained responsible person." },
              { q: "Do I need special equipment for weekly tests?", a: "No special equipment is needed for weekly tests. An MCP test key and access to the control panel are sufficient." },
              { q: "What if quarterly testing reveals multiple failures?", a: "Multiple failures may indicate systemic issues. Stop testing, investigate the cause, and consider a full system inspection." },
              { q: "Must annual tests include evacuation drills?", a: "Evacuation drills are required annually in premises where people sleep. For other premises, regular drills are recommended but not mandatory." },
              { q: "How long should test records be retained?", a: "BS 5839-1 requires records to be retained for at least 3 years and made available for inspection by authorities." }
            ].map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.q}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              <h2 className="text-lg font-semibold text-white">Knowledge Check</h2>
            </div>

            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-sm text-white mb-4">Test your understanding of routine testing requirements with 10 questions.</p>
                <Button size="lg" className="min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-elec-yellow">{calculateScore()}/{questions.length}</p>
                  <p className="text-sm text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const correct = selectedAnswers[i] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                        <p className={`text-sm ${correct ? 'text-green-400' : 'text-red-400'}`}>
                          Your answer: {q.options[selectedAnswers[i]] ?? '—'} {correct ? '✓' : '✗'}
                        </p>
                        {!correct && (
                          <p className="text-sm text-white/60 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                        )}
                        <p className="text-sm text-white/80 mt-2">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>

                <Button variant="ghost" size="lg" onClick={resetQuiz} className="w-full min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98] gap-2">
                  <RotateCcw className="h-4 w-4" />
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
                          className={`w-full text-left p-4 rounded-lg border transition-all touch-manipulation min-h-[48px] ${
                            selected
                              ? 'bg-elec-yellow/20 border-elec-yellow/50 text-white'
                              : 'bg-white/5 border-white/10 text-white active:bg-white/10'
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
                    variant="ghost"
                    size="lg"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex-1 min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
                  >
                    Previous
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestion] === -1}
                    className="flex-1 min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Navigation Footer */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FireAlarmModule6Section1;
