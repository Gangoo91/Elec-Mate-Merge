import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle, AlertTriangle, HelpCircle, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Verification & Certification - Fire Alarm Course";
const DESCRIPTION = "Learn fire alarm system verification, certificates of compliance, third-party approval and BS 5839-1 certification requirements.";

const FireAlarmModule6Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the purpose of system verification?',
      options: [
        'To test the installer\'s competence',
        'To confirm the system meets design specification and BS 5839-1',
        'To satisfy insurance requirements only',
        'To check system appearance'
      ],
      correctAnswer: 1,
      explanation: 'System verification confirms that the installed system meets the original design specification and complies with BS 5839-1 requirements.'
    },
    {
      id: 2,
      question: 'Who should issue a Certificate of Compliance for a fire alarm installation?',
      options: [
        'The building owner',
        'The fire brigade',
        'A competent person from the installing/maintaining company',
        'The local authority'
      ],
      correctAnswer: 2,
      explanation: 'The Certificate of Compliance must be issued by a competent person representing the company responsible for installation or maintenance.'
    },
    {
      id: 3,
      question: 'What does third-party certification (e.g., BAFE) demonstrate?',
      options: [
        'That the company has insurance',
        'Independent verification of company competence and quality systems',
        'That equipment is made in the UK',
        'That prices are competitive'
      ],
      correctAnswer: 1,
      explanation: 'Third-party certification provides independent verification that a company has competent staff, quality management systems, and follows industry standards.'
    },
    {
      id: 4,
      question: 'What documents should accompany a Certificate of Compliance?',
      options: [
        'Just the certificate itself',
        'As-fitted drawings, zone chart, operating instructions, device schedules',
        'Only the invoice',
        'Marketing brochures'
      ],
      correctAnswer: 1,
      explanation: 'The certificate should be accompanied by comprehensive documentation including as-fitted drawings, zone charts, operating instructions, and device schedules.'
    },
    {
      id: 5,
      question: 'When should verification testing be performed?',
      options: [
        'Only after 12 months of operation',
        'At completion of installation and after significant modifications',
        'Only when requested by insurers',
        'Every 5 years'
      ],
      correctAnswer: 1,
      explanation: 'Verification testing should be performed at completion of new installations and following any significant modifications to the system.'
    },
    {
      id: 6,
      question: 'What percentage of devices must be tested during verification?',
      options: [
        '25% sampling',
        '50% sampling',
        '75% sampling',
        '100% - all devices'
      ],
      correctAnswer: 3,
      explanation: 'Verification requires 100% testing of all devices to confirm every component functions correctly within the system.'
    },
    {
      id: 7,
      question: 'What is BAFE in relation to fire alarm certification?',
      options: [
        'A government department',
        'A third-party certification body for fire protection companies',
        'A type of detector',
        'An insurance company'
      ],
      correctAnswer: 1,
      explanation: 'BAFE (British Approvals for Fire Equipment) is a UKAS-accredited third-party certification body that certifies fire protection companies.'
    },
    {
      id: 8,
      question: 'What should happen if verification testing reveals non-compliance?',
      options: [
        'Issue the certificate anyway',
        'Document deficiencies, rectify, and re-test before certification',
        'Notify the police',
        'Reduce the system category'
      ],
      correctAnswer: 1,
      explanation: 'Non-compliance must be documented, deficiencies rectified, and re-testing performed. Certification can only be issued when full compliance is achieved.'
    },
    {
      id: 9,
      question: 'Who typically requires third-party certification for fire alarm systems?',
      options: [
        'No one - it\'s optional',
        'Insurance companies, landlords, and some building control authorities',
        'Only hospitals',
        'Only manufacturers'
      ],
      correctAnswer: 1,
      explanation: 'Insurance companies often require third-party certification, as do many landlords and building control authorities, particularly for larger or higher-risk premises.'
    },
    {
      id: 10,
      question: 'How long should certificates and verification records be retained?',
      options: [
        '1 year',
        '3 years minimum, ideally for system lifetime',
        '6 months',
        'They can be discarded after handover'
      ],
      correctAnswer: 1,
      explanation: 'Records should be retained for minimum 3 years per BS 5839-1, though best practice is to keep them for the system\'s lifetime for reference and compliance evidence.'
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
            <Link to="/electrician/upskilling/fire-alarm-course/module-6">
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
              <Award className="h-5 w-5 text-elec-yellow" />
            </div>
            <span className="text-sm text-white/50">Section 5 of 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Verification & Certification</h1>
          <p className="text-white/70">System verification, certificates of compliance and third-party approval processes.</p>
        </div>

        {/* Quick Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Verification</strong> confirms 100% of devices work correctly and system meets design spec</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Certificates</strong> are issued by competent persons with supporting documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Third-party approval</strong> (BAFE) provides independent quality assurance</span>
            </li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Explain the purpose and scope of fire alarm system verification",
              "Conduct comprehensive verification testing per BS 5839-1",
              "Complete Certificates of Compliance accurately and completely",
              "Understand the role and value of third-party certification",
              "Compile documentation packages for system handover",
              "Manage non-compliance findings during verification"
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
            Purpose of System Verification
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Verification confirms that the installed fire alarm system <strong className="text-white">meets design requirements</strong> and complies with BS 5839-1.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Verification Objectives:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Confirm all devices installed and functioning correctly</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verify coverage meets system category requirements</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Check cause-and-effect programming operates correctly</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Validate sound levels meet minimum requirements</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Confirm documentation is complete and accurate</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Verification should be performed by someone independent of the installation team where possible.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Verification Testing Procedures
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Verification requires <strong className="text-elec-yellow">100% testing</strong> of all system components, unlike routine quarterly sampling.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Verification Test Checklist:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Every detector - functional test with appropriate stimulus</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Every manual call point - activation and reset</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Every sounder/beacon - operation and audibility/visibility</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Control panel - all functions and indications</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Power supplies - mains and standby battery</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Ancillary interfaces - door holders, dampers, lifts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Certificate of Compliance
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">The Certificate of Compliance is a <strong className="text-white">formal declaration</strong> that the system meets BS 5839-1 requirements.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Certificate Contents:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Premises details and system description</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />System category and type (L1/L2/P1/P2 etc.)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Declaration of compliance with BS 5839-1</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Any departures from standard with justification</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Name and signature of competent person</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Company details and third-party certification</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Never issue a certificate if the system does not fully comply - document variations first.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">During verification, you discover that sound levels in one area are below 65 dB(A). Can you still issue a certificate?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> No - sound levels not meeting the minimum is a non-compliance. You must either add sounders to achieve compliance, or document this as a departure from the standard with risk assessment justification. The certificate should not be issued until the issue is resolved or formally documented.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Third-Party Certification
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Third-party certification schemes like <strong className="text-elec-yellow">BAFE</strong> provide independent assurance of company competence.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">BAFE Certification Requirements:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Quality management system (ISO 9001 or equivalent)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Competent personnel with verified qualifications</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Appropriate insurance and trading history</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Regular audits and inspections</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Complaints handling procedures</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">BAFE SP203-1 covers design, installation, commissioning and maintenance of fire detection systems.</p>
          </div>
        </div>

        {/* Section 05 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation Package
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">A comprehensive <strong className="text-white">documentation package</strong> must accompany the Certificate of Compliance.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Required Documentation:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />As-fitted drawings showing all device locations</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Zone chart with device schedules</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Cause-and-effect matrix</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Operating and maintenance instructions</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Verification test results</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Equipment data sheets and certificates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Managing Non-Compliance
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <p className="text-white/70">Non-compliance discovered during verification must be <strong className="text-elec-yellow">documented and resolved</strong> before certification.</p>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm font-semibold text-white mb-2">Non-Compliance Management:</p>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Document all deficiencies in detail</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Notify responsible person immediately</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Plan and implement remedial actions</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Re-test affected elements</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Update documentation to reflect changes</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Departures from standard require documented risk assessment and client agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Check 2 */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-elec-yellow">Quick Check</span>
          </div>
          <p className="text-white/80 mb-3">A client asks if third-party certification is legally required. How would you respond?</p>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Third-party certification is not a legal requirement, but is often required by insurers and may be specified in lease agreements. It provides independent verification of competence and is increasingly expected for commercial premises. Some building control authorities also require it.</p>
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
                  Use a systematic checklist during verification to ensure nothing is missed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Photograph any areas of concern for documentation purposes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Involve the client in cause-and-effect testing so they understand system operation
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Issuing certificates before completing all verification tests
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to document departures from standard with risk assessment
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Providing incomplete documentation packages at handover
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
              { q: "How long does verification typically take?", a: "Duration depends on system size. Allow approximately 1-2 days for small systems, proportionally longer for large installations. Plan adequately to avoid rushing." },
              { q: "Can the installer verify their own work?", a: "Yes, but ideally verification should involve someone independent of the installation team to provide objectivity. Large organisations often have separate commissioning teams." },
              { q: "What if modifications are made after certification?", a: "Significant modifications require re-verification of affected areas and potentially a new or amended certificate. Minor modifications should be documented in the logbook." },
              { q: "Is there a standard certificate format?", a: "BS 5839-1 provides model certificates in the annexes. Third-party certified companies use approved formats. The content must meet standard requirements regardless of format." },
              { q: "Who keeps the original certificate?", a: "The original certificate should be kept with the system logbook at the premises. Copies should be retained by the installing/maintaining company and may be required by insurers." },
              { q: "Can certification be withdrawn?", a: "Third-party certification can be withdrawn if audits reveal non-compliance. This is serious and should be avoided through maintaining quality standards." }
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
              <p className="text-white/70 mb-4">Test your understanding of verification and certification with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild className="flex-1 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-6">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section5;
