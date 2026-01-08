import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module-6">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 6</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Award className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 5 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Verification & Certification
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          System verification, certificates of compliance and third-party approval processes.
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
              <span><strong>Verification</strong> confirms 100% of devices work correctly and system meets design spec</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Certificates</strong> are issued by competent persons with supporting documentation</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Third-party approval</strong> (BAFE) provides independent quality assurance</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the purpose and scope of fire alarm system verification",
            "Conduct comprehensive verification testing per BS 5839-1",
            "Complete Certificates of Compliance accurately and completely",
            "Understand the role and value of third-party certification",
            "Compile documentation packages for system handover",
            "Manage non-compliance findings during verification"
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
      <section className="px-4 pb-6 max-w-4xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Purpose of System Verification</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Verification confirms that the installed fire alarm system <strong className="text-white">meets design requirements</strong> and complies with BS 5839-1.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Verification Objectives:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Confirm all devices installed and functioning correctly</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verify coverage meets system category requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Check cause-and-effect programming operates correctly</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Validate sound levels meet minimum requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Confirm documentation is complete and accurate</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Verification should be performed by someone independent of the installation team where possible.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Verification Testing Procedures</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Verification requires <strong className="text-cyan-400">100% testing</strong> of all system components, unlike routine quarterly sampling.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Verification Test Checklist:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Every detector - functional test with appropriate stimulus</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Every manual call point - activation and reset</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Every sounder/beacon - operation and audibility/visibility</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Control panel - all functions and indications</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Power supplies - mains and standby battery</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Ancillary interfaces - door holders, dampers, lifts</li>
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
              <h3 className="text-[17px] font-semibold text-white">Certificate of Compliance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The Certificate of Compliance is a <strong className="text-white">formal declaration</strong> that the system meets BS 5839-1 requirements.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Certificate Contents:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Premises details and system description</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />System category and type (L1/L2/P1/P2 etc.)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Declaration of compliance with BS 5839-1</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Any departures from standard with justification</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Name and signature of competent person</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Company details and third-party certification</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Never issue a certificate if the system does not fully comply - document variations first.
                </p>
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
            <p className="text-[15px] text-white/80 mb-3">During verification, you discover that sound levels in one area are below 65 dB(A). Can you still issue a certificate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - sound levels not meeting the minimum is a non-compliance. You must either add sounders to achieve compliance, or document this as a departure from the standard with risk assessment justification. The certificate should not be issued until the issue is resolved or formally documented.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Third-Party Certification</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Third-party certification schemes like <strong className="text-cyan-400">BAFE</strong> provide independent assurance of company competence.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">BAFE Certification Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Quality management system (ISO 9001 or equivalent)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Competent personnel with verified qualifications</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Appropriate insurance and trading history</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Regular audits and inspections</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Complaints handling procedures</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">BAFE SP203-1 covers design, installation, commissioning and maintenance of fire detection systems.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Documentation Package</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>A comprehensive <strong className="text-white">documentation package</strong> must accompany the Certificate of Compliance.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Required Documentation:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />As-fitted drawings showing all device locations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Zone chart with device schedules</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Cause-and-effect matrix</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Operating and maintenance instructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Verification test results</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Equipment data sheets and certificates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Managing Non-Compliance</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Non-compliance discovered during verification must be <strong className="text-cyan-400">documented and resolved</strong> before certification.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Non-Compliance Management:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Document all deficiencies in detail</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Notify responsible person immediately</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Plan and implement remedial actions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Re-test affected elements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Update documentation to reflect changes</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Departures from standard require documented risk assessment and client agreement.
                </p>
              </div>
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
            <p className="text-[15px] text-white/80 mb-3">A client asks if third-party certification is legally required. How would you respond?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Third-party certification is not a legal requirement, but is often required by insurers and may be specified in lease agreements. It provides independent verification of competence and is increasingly expected for commercial premises. Some building control authorities also require it.</p>
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
            <p className="text-[15px] text-white/80 mb-3">What is the difference between the installation certificate and the Certificate of Compliance?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The installation certificate confirms the work was carried out by the named company. The Certificate of Compliance specifically declares that the system meets BS 5839-1 requirements. Both are typically issued together but serve different purposes - one confirms who did the work, the other confirms it meets the standard.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Practical Guidance</h2>

        <div className="space-y-3">
          <Card variant="ios" className="border-green-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-green-400 mb-2">Pro Tips</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
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
            </CardContent>
          </Card>

          <Card variant="ios" className="border-red-500/20">
            <CardContent className="p-4">
              <h4 className="text-[15px] font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[13px] text-white/70">
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "How long does verification typically take?", a: "Duration depends on system size. Allow approximately 1-2 days for small systems, proportionally longer for large installations. Plan adequately to avoid rushing." },
            { q: "Can the installer verify their own work?", a: "Yes, but ideally verification should involve someone independent of the installation team to provide objectivity. Large organisations often have separate commissioning teams." },
            { q: "What if modifications are made after certification?", a: "Significant modifications require re-verification of affected areas and potentially a new or amended certificate. Minor modifications should be documented in the logbook." },
            { q: "Is there a standard certificate format?", a: "BS 5839-1 provides model certificates in the annexes. Third-party certified companies use approved formats. The content must meet standard requirements regardless of format." },
            { q: "Who keeps the original certificate?", a: "The original certificate should be kept with the system logbook at the premises. Copies should be retained by the installing/maintaining company and may be required by insurers." },
            { q: "Can certification be withdrawn?", a: "Third-party certification can be withdrawn if audits reveal non-compliance. This is serious and should be avoided through maintaining quality standards." }
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of verification and certification with 10 questions.</p>
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
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="../module-6/section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-6/section-6">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section5;
