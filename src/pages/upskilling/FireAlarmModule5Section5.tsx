import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, FileCheck, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Commissioning Test Sheet Completion - Fire Alarm Course";
const DESCRIPTION = "Learn how to complete commissioning test sheets accurately including BS 5839-1 certificates, instrument calibration records, as-built drawings and O&M manual structure.";

const FireAlarmModule5Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Commissioning test sheets should be completed in accordance with:',
      options: [
        'Personal preference',
        'BS 5839-1 and client templates',
        'BS 7671 only',
        'No formal standard'
      ],
      correctAnswer: 1,
      explanation: 'Commissioning documentation should meet BS 5839-1 requirements and any client or consultant formats specified for the project.'
    },
    {
      id: 2,
      question: 'Instrument details recorded on test sheets should include:',
      options: [
        'Colour of the instrument',
        'Serial number and calibration date',
        'Installer favourite brand',
        'None of the above'
      ],
      correctAnswer: 1,
      explanation: 'Traceability requires serial numbers and calibration status to be recorded on test sheets for audit purposes.'
    },
    {
      id: 3,
      question: 'What must be attached to commissioning certificates?',
      options: [
        'Only site photographs',
        'Device lists, zone charts, C&E matrix and test records',
        'Only drawings',
        'Nothing additional is required'
      ],
      correctAnswer: 1,
      explanation: 'Provide a complete pack including device schedules, zone charts, cause and effect matrix, and all test records.'
    },
    {
      id: 4,
      question: 'Defects found during commissioning should be:',
      options: [
        'Ignored if minor',
        'Logged with corrective action and retest evidence',
        'Hidden from the client',
        'Left for the maintenance contractor'
      ],
      correctAnswer: 1,
      explanation: 'All defects must be recorded with corrective actions taken and evidence of retesting to close them out.'
    },
    {
      id: 5,
      question: 'As-built drawings should be:',
      options: [
        'Draft quality only',
        'Final, accurate and match the installed system including device IDs',
        'Optional for small systems',
        'Hand-drawn sketches'
      ],
      correctAnswer: 1,
      explanation: 'As-built drawings must accurately reflect the installed configuration for ongoing maintenance and modifications.'
    },
    {
      id: 6,
      question: 'Zone plans must:',
      options: [
        'Be omitted from documentation',
        'Be clear, accurate and posted adjacent to the CIE',
        'Be kept in a drawer',
        'Be optional for simple systems'
      ],
      correctAnswer: 1,
      explanation: 'Zone plans are mandatory under BS 5839-1 and must be displayed at the control panel for emergency response.'
    },
    {
      id: 7,
      question: 'Site acceptance requires:',
      options: [
        'Nothing documented',
        'Signed certificates, test sheets and training records',
        'Only verbal confirmation',
        'Photographs only'
      ],
      correctAnswer: 1,
      explanation: 'Formal acceptance is based on signed documentation and evidence of training provided to the Responsible Person.'
    },
    {
      id: 8,
      question: 'Battery calculations and autonomy verification should be:',
      options: [
        'Skipped for standard systems',
        'Included and signed-off in documentation',
        'Estimated only',
        'Done after handover'
      ],
      correctAnswer: 1,
      explanation: 'Include detailed calculations and verification of standby and alarm loads with sign-off confirmation.'
    },
    {
      id: 9,
      question: 'Who signs the commissioning certificate?',
      options: [
        'Any person on site',
        'The competent person responsible for commissioning',
        'The client only',
        'The electrician only'
      ],
      correctAnswer: 1,
      explanation: 'A competent person responsible for commissioning signs the certificate as required by BS 5839-1.'
    },
    {
      id: 10,
      question: 'What should be included in O&M manuals?',
      options: [
        'Marketing materials only',
        'As-builts, data sheets, certificates, C&E matrix and maintenance requirements',
        'Snag list only',
        'Nothing specific is required'
      ],
      correctAnswer: 1,
      explanation: 'Provide a comprehensive handover pack including all documentation needed for ongoing operation and maintenance.'
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
            <Link to="..">
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
              <FileCheck className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-xs font-medium text-elec-yellow/80 uppercase tracking-wider">Section 5 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Commissioning Test Sheet Completion</h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Documentation requirements, test sheet completion, and O&M manual structure for fire alarm commissioning.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">BS 5839-1 certificates</strong> with traceable test records and calibrated instruments</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">As-built drawings</strong> must match installed system with accurate device IDs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">O&M manuals</strong> provide comprehensive handover documentation for maintenance</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Complete BS 5839-1 certificates with traceable test records",
              "Record instrument serials and calibration dates correctly",
              "Produce accurate as-built drawings and zone plans",
              "Structure O&M manuals with required documentation",
              "Calculate and verify battery autonomy requirements",
              "Manage defects and close-out with proper evidence"
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
              Certificates and Test Records
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">BS 5839-1</strong> requires specific certificates and test records to demonstrate compliance. These must be completed accurately and retained for future reference.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Required Certificates:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Installation certificate confirming compliance with design</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Commissioning certificate with responsible person details</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Test sheets for loops, sound levels and interfaces</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />VAD coverage verification records</li>
                </ul>
              </div>
              <p className="text-sm text-white/60 italic">All certificates should reference the project specification and design documents.</p>
            </div>
          </section>

          {/* Section 02 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Instrument Traceability
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Test instruments used during commissioning must be <strong className="text-elec-yellow">traceable</strong> and within their calibration period. This ensures measurement accuracy and provides audit evidence.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Record on Test Sheets:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Instrument make and model</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Serial number</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Calibration date and expiry</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Calibration certificate reference</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Using instruments with expired calibration invalidates test results and can result in failed audits.
                </p>
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              As-Built Drawings and Zone Plans
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">As-built drawings</strong> must accurately reflect what has been installed, not just what was designed. Any variations from the original design must be clearly shown.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">As-Built Requirements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Accurate device locations with unique IDs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Cable routes and containment details</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Zone boundaries clearly marked</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Interface connections and locations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
                <p className="text-sm font-semibold text-white mb-3">Zone Plan Requirements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Clear, legible format suitable for emergency use</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Posted adjacent to the control panel</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Copy included in O&M documentation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Check 1 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">A commissioning engineer discovers that the actual detector locations differ from the design drawings. What action is required?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> The as-built drawings must be updated to show the actual installed locations. The device schedule must also be updated and the variation recorded with approval from the designer or consultant if significant.</p>
            </div>
          </div>

          {/* Section 04 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              O&M Manual Structure
            </h2>
            <div className="space-y-4 text-white/70">
              <p>The <strong className="text-elec-yellow">Operation and Maintenance (O&M) manual</strong> provides all documentation needed for ongoing system operation, testing and maintenance.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Recommended O&M Index:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 1:</strong> Overview, contacts and emergency procedures</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 2:</strong> System description and specification</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 3:</strong> Cause and effect matrix with revision history</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 4:</strong> As-built drawings and zone plans</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 5:</strong> Certificates and test sheets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 6:</strong> Equipment data sheets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 7:</strong> Maintenance requirements and schedules</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Section 8:</strong> Configuration backups and appendices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 05 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Battery Calculations and Autonomy
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Battery autonomy calculations</strong> must be included in the documentation to demonstrate the system meets standby requirements per BS EN 54-4 and BS 5839-1.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Calculation Requirements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Calculate total quiescent (standby) current</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Calculate alarm condition current</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Apply required capacity factors (typically 1.25)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Select battery with adequate margin</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Verify charger can recharge within 24 hours</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
                <p className="text-sm font-semibold text-white mb-3">Standard Requirements:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Normal:</strong> 24 hours standby + 30 minutes alarm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" /><strong className="text-white">Enhanced:</strong> 72 hours standby where specified</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Check 2 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">Why is it important to include the calibration date of test instruments on commissioning documentation?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Calibration dates provide traceability and prove that instruments were accurate at the time of testing. This is essential for audit purposes and demonstrates that test results are valid and reliable.</p>
            </div>
          </div>

          {/* Section 06 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Defect Management and Close-Out
            </h2>
            <div className="space-y-4 text-white/70">
              <p>Any <strong className="text-elec-yellow">defects or non-conformances</strong> found during commissioning must be recorded and closed out with evidence before final sign-off.</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-3">Defect Register Contents:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Unique defect reference number</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Description of the defect or non-conformance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Person responsible for correction</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Target completion date</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Corrective action taken</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-elec-yellow" />Retest evidence and sign-off</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Outstanding defects should be listed with agreed timescales at handover. Critical defects must be resolved before acceptance.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Check 3 */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Quick Check</span>
            </div>
            <p className="text-sm text-white/80 mb-3">What documentation should be provided as part of the O&M manual for a fire alarm system?</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> The O&M manual should include: system description, as-built drawings, zone plans, device schedules, cause and effect matrix, certificates, test sheets, equipment data sheets, maintenance requirements, and configuration backups.</p>
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
                  Use a completion checklist to verify all documentation is complete before witness testing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Maintain version control on all documents with approval signatures and dates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Provide both PDF and editable copies where appropriate for ongoing maintenance
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
                  Using design drawings as as-builts without updating for actual installed configuration
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to record instrument calibration details making test results untraceable
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Omitting battery calculations from documentation despite being required by BS 5839-1
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
              { q: "Are handwritten test sheets acceptable?", a: "Yes, provided they use legible, controlled templates with clear entries and proper signatures. Electronic records are preferred where available." },
              { q: "Should we include panel configuration backups in handover?", a: "Yes, provide safe copies of panel configuration with the version and date noted. This is essential for maintenance and disaster recovery." },
              { q: "Where should zone plans be displayed?", a: "Zone plans must be posted adjacent to the CIE for emergency response and a copy included in the O&M manual for reference." },
              { q: "How long should commissioning records be retained?", a: "Agree retention periods with the client or consultant. BS 5839-1 recommends keeping records for the life of the system or a minimum of 15 years." },
              { q: "What if defects cannot be closed before handover?", a: "Outstanding items should be listed in a snag register with owners, target dates and agreed severity classifications. Critical safety defects must be resolved first." },
              { q: "Do we need to provide training records?", a: "Yes, training records showing attendees, date, scope covered and trainer details should be included in the handover documentation." }
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
              <p className="text-sm text-white/70 mb-4">Test your understanding of commissioning documentation with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-5-section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation">
            <Link to="/study-centre/upskilling/fire-alarm-module-5-section-6">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule5Section5;
