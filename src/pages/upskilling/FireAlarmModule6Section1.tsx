import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ClipboardCheck, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-6">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 6</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <ClipboardCheck className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 1 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Routine Testing Requirements
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Weekly, monthly, quarterly and annual test schedules per BS 5839-1 for maintaining fire alarm system reliability.
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
              <span><strong>Weekly tests</strong> check one zone via MCP/detector, verify panel indicators, and record in logbook</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Quarterly tests</strong> cover 25% of MCPs and detectors, ensuring full coverage within 12 months</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Annual tests</strong> require 100% device testing, battery capacity verification, and cause-and-effect checks</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the BS 5839-1 testing schedule hierarchy from weekly to annual",
            "Conduct weekly tests including zone activation and panel verification",
            "Implement quarterly detector and MCP sampling programmes",
            "Execute annual comprehensive testing including battery capacity",
            "Document all test results correctly in the fire alarm logbook",
            "Identify when faults require immediate versus scheduled attention"
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
              <h3 className="text-[17px] font-semibold text-white">BS 5839-1 Testing Framework</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 establishes a <strong className="text-white">tiered testing regime</strong> designed to ensure fire alarm systems remain fully operational throughout their service life. The testing hierarchy balances thoroughness with practicality.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Testing Frequency Hierarchy:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Weekly: Basic functionality and zone checks</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Monthly: Extended checks and visual inspection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Quarterly: 25% device sampling rotation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Annually: Comprehensive 100% verification</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">The testing regime applies to all fire alarm systems regardless of size or category.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Weekly Test Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Weekly tests verify <strong className="text-cyan-400">basic system functionality</strong> and can be performed by a trained responsible person. Tests must occur every 7 days with a tolerance of plus or minus 1 day.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Weekly Test Checklist:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Activate at least one zone using an MCP or detector</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify control panel indicates the correct zone</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Confirm sounders operate in the activated zone</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check all panel LEDs and display for faults</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Record results in the fire alarm logbook</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Use a different call point each week to ensure all are tested over time.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Monthly Test Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Monthly tests extend the weekly checks to include <strong className="text-white">visual inspections</strong> and verification of ancillary equipment connections.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Monthly Test Additions:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Visual check of all accessible detectors for damage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Inspect MCPs for damage, obstruction, or tampering</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify remote monitoring transmission (if fitted)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check standby battery voltage readings</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Monthly checks help identify emerging issues before they become critical.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A weekly test is due on Friday, but the responsible person is on leave. When is the latest the test can be performed?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Saturday (the following day). BS 5839-1 allows a tolerance of plus or minus 1 day, so the test can be done Thursday through Saturday without non-compliance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Quarterly Test Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Quarterly testing introduces <strong className="text-cyan-400">systematic device sampling</strong>, ensuring all detectors and MCPs are functionally tested within a 12-month cycle.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Quarterly Testing Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test 25% of all manual call points</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Functionally test 25% of all detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify sounder audibility in sampled areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Document which devices were tested</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Maintain a rotation schedule to ensure different devices are tested each quarter.
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
              <h3 className="text-[17px] font-semibold text-white">Annual Test Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Annual testing is the most comprehensive inspection, requiring <strong className="text-white">100% verification</strong> of all system components by a competent person.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Annual Test Scope:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Functional test of every detector using appropriate method</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test every manual call point for correct operation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify standby battery capacity (load test)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check cause-and-effect programming operates correctly</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Test all ancillary equipment interfaces</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify sound levels meet minimum requirements</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Annual tests must be conducted by a competent fire alarm engineer with appropriate qualifications.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Sound Level Testing</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Sound level verification ensures <strong className="text-cyan-400">alarm audibility</strong> meets BS 5839-1 requirements for effective occupant warning.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Sound Level Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Minimum 65 dB(A) at any occupied point</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Minimum 75 dB(A) where background noise exceeds 60 dB(A)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Minimum 75 dB(A) at bedhead in sleeping accommodation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Measurements using calibrated sound level meter</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Sound level meters must be calibrated within the previous 12 months.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A building has 40 manual call points. How many must be tested in each quarterly inspection?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> 10 MCPs (25% of 40). This ensures all 40 are tested across four quarterly inspections within the year.</p>
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
            <p className="text-[15px] text-white/80 mb-3">During an annual test, a detector fails to respond. What should happen?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Record the fault immediately, investigate the cause (wiring, detector, or base), replace if necessary, and document the remedial action. The system should not be certified until all devices function correctly.</p>
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
            </CardContent>
          </Card>

          <Card variant="ios" className="border-red-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Testing the same call point every week instead of rotating through all devices
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to silence the alarm promptly, causing unnecessary disturbance
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not informing the monitoring station before testing, causing false alarm charges
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
            { q: "Can weekly tests be skipped during holidays?", a: "No - the 7-day tolerance only allows tests to be conducted a day early or late. Extended gaps breach BS 5839-1 requirements." },
            { q: "Who is responsible for weekly testing?", a: "The duty holder (typically building owner/manager) is responsible, but testing can be delegated to any trained responsible person." },
            { q: "Do I need special equipment for weekly tests?", a: "No special equipment is needed for weekly tests. An MCP test key and access to the control panel are sufficient." },
            { q: "What if quarterly testing reveals multiple failures?", a: "Multiple failures may indicate systemic issues. Stop testing, investigate the cause, and consider a full system inspection." },
            { q: "Must annual tests include evacuation drills?", a: "Evacuation drills are required annually in premises where people sleep. For other premises, regular drills are recommended but not mandatory." },
            { q: "How long should test records be retained?", a: "BS 5839-1 requires records to be retained for at least 3 years and made available for inspection by authorities." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of routine testing requirements with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section1;
