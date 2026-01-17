import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Servicing & Maintenance - Fire Alarm Course";
const DESCRIPTION = "Learn professional fire alarm servicing procedures, preventive maintenance schedules and parts replacement per BS 5839-1.";

const FireAlarmModule6Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What qualification should a fire alarm service engineer hold as a minimum?',
      options: [
        'Any electrical qualification',
        'FIA or equivalent fire alarm competency certification',
        'Building management diploma',
        'No specific qualification required'
      ],
      correctAnswer: 1,
      explanation: 'Fire alarm service engineers should hold FIA (Fire Industry Association) or equivalent competency certification demonstrating fire alarm specific knowledge and skills.'
    },
    {
      id: 2,
      question: 'How often should a routine service visit be scheduled for most commercial premises?',
      options: [
        'Monthly',
        'Quarterly',
        'Six-monthly',
        'Annually only'
      ],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends six-monthly service visits for most commercial premises, with some high-risk premises requiring quarterly visits.'
    },
    {
      id: 3,
      question: 'What is the typical recommended replacement interval for smoke detectors?',
      options: [
        '5 years',
        '8-10 years',
        '15 years',
        'Only when they fail testing'
      ],
      correctAnswer: 1,
      explanation: 'Smoke detectors should typically be replaced every 8-10 years due to sensor degradation, regardless of testing performance.'
    },
    {
      id: 4,
      question: 'Before starting maintenance work, what must always be done first?',
      options: [
        'Test all detectors',
        'Notify the monitoring station and implement fire watch if required',
        'Replace all batteries',
        'Update the logbook'
      ],
      correctAnswer: 1,
      explanation: 'Always notify the monitoring station before maintenance to prevent false alarms. Implement fire watch procedures if the system will be impaired.'
    },
    {
      id: 5,
      question: 'What is the purpose of cleaning smoke detector chambers?',
      options: [
        'To improve appearance',
        'To remove contamination that causes false alarms or reduces sensitivity',
        'To meet insurance requirements only',
        'To extend battery life'
      ],
      correctAnswer: 1,
      explanation: 'Cleaning removes dust, insects, and contamination that can cause false alarms or reduce detector sensitivity to real smoke.'
    },
    {
      id: 6,
      question: 'When should standby batteries be replaced?',
      options: [
        'Only when they fail completely',
        'Every year regardless of condition',
        'When capacity drops below acceptable levels or every 3-5 years',
        'Every 10 years'
      ],
      correctAnswer: 2,
      explanation: 'Replace batteries when capacity testing shows inadequate performance or every 3-5 years as preventive maintenance, whichever comes first.'
    },
    {
      id: 7,
      question: 'What documentation must be completed after every service visit?',
      options: [
        'Invoice only',
        'Service report with device tests, findings, and recommendations',
        'Simple attendance record',
        'No documentation required for routine visits'
      ],
      correctAnswer: 1,
      explanation: 'A comprehensive service report documenting all tests performed, findings, defects, and recommendations must be provided after every visit.'
    },
    {
      id: 8,
      question: 'How should cable damage discovered during maintenance be addressed?',
      options: [
        'Tape over the damage and continue',
        'Note it for the next visit',
        'Repair or replace immediately and document the work',
        'Ignore minor damage'
      ],
      correctAnswer: 2,
      explanation: 'Cable damage compromises system integrity. Repair or replace damaged sections immediately and document all remedial work undertaken.'
    },
    {
      id: 9,
      question: 'What preventive maintenance should be performed on manual call points?',
      options: [
        'Replace all glasses annually',
        'Check operation, clean contacts, verify LED indication',
        'Paint them regularly',
        'No maintenance required'
      ],
      correctAnswer: 1,
      explanation: 'MCPs require testing for correct operation, cleaning of electrical contacts, and verification of LED indicators during service visits.'
    },
    {
      id: 10,
      question: 'What action is required if a service engineer identifies a critical safety defect?',
      options: [
        'Schedule repair for next visit',
        'Note in report and leave',
        'Immediately inform the responsible person and implement temporary measures',
        'Contact insurance company'
      ],
      correctAnswer: 2,
      explanation: 'Critical safety defects require immediate notification to the responsible person with temporary protective measures implemented before leaving site.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Wrench className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 2 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Servicing & Maintenance
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Service visit procedures, preventive maintenance programmes and component replacement strategies.
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
              <span><strong>Service visits</strong> should occur six-monthly for most premises, quarterly for high-risk</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Preventive maintenance</strong> includes detector cleaning, battery testing, and cable inspections</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Component replacement</strong> schedules prevent failures - smoke detectors every 8-10 years</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Plan and execute professional service visits per BS 5839-1",
            "Implement preventive maintenance programmes for all components",
            "Determine appropriate replacement intervals for system devices",
            "Apply correct pre-service procedures including ARC notification",
            "Document service findings and recommendations professionally",
            "Manage critical defects and implement temporary measures"
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
              <h3 className="text-[17px] font-semibold text-white">Service Visit Planning</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Professional service visits require <strong className="text-white">careful planning</strong> to ensure comprehensive maintenance whilst minimising disruption to building operations.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Service Frequency Guidelines:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Standard commercial: Six-monthly visits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />High-risk premises: Quarterly visits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Sleeping accommodation: Enhanced frequency</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Complex systems: May require additional visits</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Service frequency should be determined by risk assessment and system complexity.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Pre-Service Procedures</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Before commencing any maintenance work, <strong className="text-cyan-400">essential procedures</strong> must be followed to ensure safety and prevent false alarms.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Pre-Service Checklist:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Notify the Alarm Receiving Centre (ARC)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Inform building management and occupants</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Implement fire watch if system will be disabled</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Review previous service reports and logbook</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Prepare required tools and replacement parts</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Never disable a fire alarm system without implementing appropriate fire safety measures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Detector Maintenance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Detectors require <strong className="text-white">regular cleaning and testing</strong> to maintain sensitivity and prevent false alarms.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Smoke Detector Maintenance:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Clean chamber using approved methods (vacuum/air)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check for physical damage or contamination</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify secure mounting and correct orientation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Functional test using approved test equipment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Record sensitivity readings on addressable systems</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Never use silicone sprays or solvents that may damage detector sensors.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A smoke detector shows consistently high sensitivity readings. What maintenance action is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> High sensitivity usually indicates contamination. Clean the detector chamber thoroughly. If readings remain high after cleaning, the detector may need replacement due to sensor drift or damage.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Battery Maintenance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Standby batteries are <strong className="text-cyan-400">critical for system integrity</strong> during mains failure. Regular testing ensures adequate capacity.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Battery Maintenance Tasks:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check battery condition and terminals for corrosion</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Measure float voltage (typically 13.5-13.8V for 12V)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Load test to verify adequate capacity annually</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check charger output current and voltage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Replace every 3-5 years or when capacity fails</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Sealed lead-acid batteries should maintain system operation for 24-72 hours plus 30 minutes alarm.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Component Replacement Schedules</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-white">Preventive replacement</strong> reduces failures and maintains system reliability throughout service life.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Recommended Replacement Intervals:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Smoke detectors: 8-10 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Heat detectors: 10-15 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Standby batteries: 3-5 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Control panel: 15-20 years (consider upgrade)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />MCP glasses: As required after activation</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Replace like-for-like or with manufacturer-approved equivalents only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Service Documentation</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Comprehensive <strong className="text-cyan-400">service documentation</strong> demonstrates compliance and provides valuable system history.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Service Report Contents:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Date, time, and engineer details</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Tests performed and devices checked</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Defects found with severity classification</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Remedial work completed during visit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Outstanding recommendations and timescales</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Next service due date</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Retain service reports for minimum 3 years per BS 5839-1.</p>
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
            <p className="text-[15px] text-white/80 mb-3">During a service visit, you discover damaged cable insulation in a ceiling void. What action should you take?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Repair or replace the damaged cable section immediately if possible. If the damage is extensive, implement temporary measures, notify the responsible person, and schedule urgent follow-up. Document all findings and actions in the service report.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A client questions why smoke detectors need replacing when they still pass testing. How would you explain?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Detector sensors degrade over time due to environmental exposure. A detector may pass basic testing but have reduced sensitivity to real smoke. Manufacturer replacement intervals (typically 8-10 years) account for this gradual degradation that standard testing may not detect.</p>
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
                  Carry common spare parts to resolve minor faults during routine visits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Photograph defects and unusual conditions for documentation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Build relationships with building managers for better access and cooperation
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
                  Forgetting to notify the monitoring station before starting work
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using incorrect cleaning methods that damage detector sensors
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Leaving the system in test mode after completing maintenance
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
            { q: "Can the building owner perform their own maintenance?", a: "Weekly tests can be conducted by trained staff, but formal service visits must be performed by competent fire alarm engineers." },
            { q: "What if a detector type is obsolete?", a: "Source compatible replacements from the manufacturer or approved suppliers. System upgrade may be required if components are no longer available." },
            { q: "How long should a typical service visit take?", a: "Duration varies by system size. Allow approximately 2-4 hours for small systems, longer for large or complex installations." },
            { q: "Should I clean detectors during every visit?", a: "Visual inspection every visit, thorough cleaning annually or when contamination is identified. Some environments may need more frequent cleaning." },
            { q: "What qualifications should service engineers hold?", a: "FIA or equivalent competency certification, manufacturer training for specific systems, and appropriate health and safety qualifications." },
            { q: "Can service intervals be extended if no faults are found?", a: "No - BS 5839-1 service intervals are based on proactive maintenance principles. Consistent fault-free results indicate good maintenance, not reduced need." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of servicing and maintenance with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section2;
