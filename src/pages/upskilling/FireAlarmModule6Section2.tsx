import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Module 6</span>
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
              <Wrench className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-xs font-medium text-elec-yellow/80 uppercase tracking-wider">Section 2 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Servicing & Maintenance</h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Service visit procedures, preventive maintenance programmes and component replacement strategies.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Service visits</strong> should occur six-monthly for most premises, quarterly for high-risk</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Preventive maintenance</strong> includes detector cleaning, battery testing, and cable inspections</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Component replacement</strong> schedules prevent failures - smoke detectors every 8-10 years</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Plan and execute professional service visits per BS 5839-1",
              "Implement preventive maintenance programmes for all components",
              "Determine appropriate replacement intervals for system devices",
              "Apply correct pre-service procedures including ARC notification",
              "Document service findings and recommendations professionally",
              "Manage critical defects and implement temporary measures"
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
              Service Visit Planning
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Professional service visits require <strong className="text-white">careful planning</strong> to ensure comprehensive maintenance whilst minimising disruption to building operations.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Service Frequency Guidelines:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Standard commercial: Six-monthly visits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />High-risk premises: Quarterly visits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Sleeping accommodation: Enhanced frequency</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Complex systems: May require additional visits</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">Service frequency should be determined by risk assessment and system complexity.</p>
            </div>
          </section>

          {/* Section 02 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Pre-Service Procedures
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Before commencing any maintenance work, <strong className="text-elec-yellow">essential procedures</strong> must be followed to ensure safety and prevent false alarms.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Pre-Service Checklist:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Notify the Alarm Receiving Centre (ARC)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Inform building management and occupants</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Implement fire watch if system will be disabled</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Review previous service reports and logbook</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Prepare required tools and replacement parts</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Never disable a fire alarm system without implementing appropriate fire safety measures.
                </p>
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Detector Maintenance
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Detectors require <strong className="text-white">regular cleaning and testing</strong> to maintain sensitivity and prevent false alarms.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Smoke Detector Maintenance:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Clean chamber using approved methods (vacuum/air)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Check for physical damage or contamination</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Verify secure mounting and correct orientation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Functional test using approved test equipment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Record sensitivity readings on addressable systems</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">Never use silicone sprays or solvents that may damage detector sensors.</p>
            </div>
          </section>

          {/* Quick Check 1 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">A smoke detector shows consistently high sensitivity readings. What maintenance action is required?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> High sensitivity usually indicates contamination. Clean the detector chamber thoroughly. If readings remain high after cleaning, the detector may need replacement due to sensor drift or damage.</p>
            </div>
          </div>

          {/* Section 04 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Battery Maintenance
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Standby batteries are <strong className="text-elec-yellow">critical for system integrity</strong> during mains failure. Regular testing ensures adequate capacity.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Battery Maintenance Tasks:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Check battery condition and terminals for corrosion</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Measure float voltage (typically 13.5-13.8V for 12V)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Load test to verify adequate capacity annually</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Check charger output current and voltage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Replace every 3-5 years or when capacity fails</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">Sealed lead-acid batteries should maintain system operation for 24-72 hours plus 30 minutes alarm.</p>
            </div>
          </section>

          {/* Section 05 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Component Replacement Schedules
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Preventive replacement</strong> reduces failures and maintains system reliability throughout service life.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Recommended Replacement Intervals:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Smoke detectors: 8-10 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Heat detectors: 10-15 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Standby batteries: 3-5 years</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Control panel: 15-20 years (consider upgrade)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />MCP glasses: As required after activation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Replace like-for-like or with manufacturer-approved equivalents only.
                </p>
              </div>
            </div>
          </section>

          {/* Section 06 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Service Documentation
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Comprehensive <strong className="text-elec-yellow">service documentation</strong> demonstrates compliance and provides valuable system history.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Service Report Contents:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Date, time, and engineer details</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Tests performed and devices checked</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Defects found with severity classification</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Remedial work completed during visit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Outstanding recommendations and timescales</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Next service due date</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">Retain service reports for minimum 3 years per BS 5839-1.</p>
            </div>
          </section>

          {/* Quick Check 2 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">During a service visit, you discover damaged cable insulation in a ceiling void. What action should you take?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Repair or replace the damaged cable section immediately if possible. If the damage is extensive, implement temporary measures, notify the responsible person, and schedule urgent follow-up. Document all findings and actions in the service report.</p>
            </div>
          </div>

          {/* Quick Check 3 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">A client questions why smoke detectors need replacing when they still pass testing. How would you explain?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Detector sensors degrade over time due to environmental exposure. A detector may pass basic testing but have reduced sensitivity to real smoke. Manufacturer replacement intervals (typically 8-10 years) account for this gradual degradation that standard testing may not detect.</p>
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
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <h4 className="text-sm font-semibold text-red-400">Common Mistakes</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
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
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Can the building owner perform their own maintenance?", a: "Weekly tests can be conducted by trained staff, but formal service visits must be performed by competent fire alarm engineers." },
              { q: "What if a detector type is obsolete?", a: "Source compatible replacements from the manufacturer or approved suppliers. System upgrade may be required if components are no longer available." },
              { q: "How long should a typical service visit take?", a: "Duration varies by system size. Allow approximately 2-4 hours for small systems, longer for large or complex installations." },
              { q: "Should I clean detectors during every visit?", a: "Visual inspection every visit, thorough cleaning annually or when contamination is identified. Some environments may need more frequent cleaning." },
              { q: "What qualifications should service engineers hold?", a: "FIA or equivalent competency certification, manufacturer training for specific systems, and appropriate health and safety qualifications." },
              { q: "Can service intervals be extended if no faults are found?", a: "No - BS 5839-1 service intervals are based on proactive maintenance principles. Consistent fault-free results indicate good maintenance, not reduced need." }
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
              <p className="text-sm text-white/70 mb-4">Test your understanding of servicing and maintenance with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-3">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section2;
