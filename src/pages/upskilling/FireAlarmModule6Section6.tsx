import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Users, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      explanation: 'A complete documentation package must be provided, including certificates, as-fitted drawings, zone charts, operating instructions, and maintenance requirements.'
    },
    {
      id: 4,
      question: 'What should basic user training include?',
      options: [
        'Programming and configuration only',
        'Panel operation, responding to alarms, silencing, resetting, and weekly testing',
        'Fault diagnosis',
        'System design principles'
      ],
      correctAnswer: 1,
      explanation: 'Basic training should cover panel operation, responding to different alarm types, silencing, resetting, conducting weekly tests, and when to call for help.'
    },
    {
      id: 5,
      question: 'When should the handover process begin?',
      options: [
        'After the building is occupied',
        'During the design phase with planning, completed before occupation',
        'Only when requested by the client',
        'After the first fault occurs'
      ],
      correctAnswer: 1,
      explanation: 'Handover planning should begin during design, with formal handover completed before building occupation to ensure safe operation from day one.'
    },
    {
      id: 6,
      question: 'What ongoing support should typically be offered?',
      options: [
        'None after handover',
        '24/7 emergency call-out, planned maintenance, and technical advice',
        'Email support only',
        'Annual inspections only'
      ],
      correctAnswer: 1,
      explanation: 'Comprehensive ongoing support includes 24/7 emergency response, planned maintenance visits, technical advice, and system upgrades as needed.'
    },
    {
      id: 7,
      question: 'How should training effectiveness be verified?',
      options: [
        'Training is assumed effective if delivered',
        'Practical demonstration by trainees and documented competency assessment',
        'Written exam only',
        'No verification needed'
      ],
      correctAnswer: 1,
      explanation: 'Training should be verified through practical demonstration where trainees show they can perform required tasks, with documented assessment.'
    },
    {
      id: 8,
      question: 'What should be included in the emergency procedures handed over?',
      options: [
        'Fire brigade phone number only',
        'Response procedures for different alarm types, evacuation routes, assembly points, and escalation contacts',
        'Basic panel location',
        'Insurance contact'
      ],
      correctAnswer: 1,
      explanation: 'Emergency procedures should cover response to different alarm types, evacuation procedures, assembly points, roles and responsibilities, and escalation contacts.'
    },
    {
      id: 9,
      question: 'How often should refresher training be conducted?',
      options: [
        'Never - initial training is sufficient',
        'Annually or when staff change, system modifications occur, or procedures change',
        'Every 5 years',
        'Only if requested'
      ],
      correctAnswer: 1,
      explanation: 'Refresher training should be conducted annually, when responsible persons change, after system modifications, or when procedures are updated.'
    },
    {
      id: 10,
      question: 'What is the significance of a signed handover acceptance?',
      options: [
        'It has no significance',
        'It confirms the client accepts responsibility and has received required training and documentation',
        'It ends all warranties',
        'It is only for filing'
      ],
      correctAnswer: 1,
      explanation: 'Signed acceptance formally confirms transfer of responsibility, receipt of documentation, completion of training, and acknowledgement of ongoing obligations.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 6</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Users className="h-7 w-7 text-cyan-400" />
          </div>
          <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide">
            Section 6 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Handover & Client Training
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          User training delivery, documentation packages and ongoing support procedures.
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
              <span><strong>Handover</strong> transfers responsibility with complete documentation and training</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Training</strong> ensures users can operate, test, and respond to alarms correctly</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong>Ongoing support</strong> maintains system effectiveness throughout its operational life</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Plan and execute professional system handover procedures",
            "Deliver effective user training appropriate to audience roles",
            "Compile comprehensive documentation packages for clients",
            "Establish ongoing support and maintenance arrangements",
            "Verify training effectiveness through practical assessment",
            "Manage client relationships for long-term service delivery"
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
              <h3 className="text-[17px] font-semibold text-white">The Handover Process</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Handover formally <strong className="text-white">transfers responsibility</strong> for the fire alarm system from installer to client, ensuring safe ongoing operation.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Handover Process Steps:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Complete all verification testing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Prepare documentation package</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Conduct user training sessions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Review emergency procedures</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Establish ongoing support arrangements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Obtain signed acceptance</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Never hand over a system without completing all steps - incomplete handover creates safety and liability issues.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Documentation Package Contents</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>A comprehensive <strong className="text-cyan-400">documentation package</strong> enables effective ongoing management and maintenance.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Essential Documentation:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Certificate of Compliance and installation certificate</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />As-fitted drawings with device locations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Zone chart and cause-and-effect matrix</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Operating and maintenance instructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Fire alarm logbook</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Equipment data sheets and warranties</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Emergency contact information</li>
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
              <h3 className="text-[17px] font-semibold text-white">User Training Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-white">Effective training</strong> ensures users can safely operate the system and respond appropriately to alarm events.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Basic User Training Topics:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Panel layout and indicator meanings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Responding to fire alarms and fault conditions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Silencing, acknowledging, and resetting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Conducting weekly tests</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Making logbook entries</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />When to call for professional assistance</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Training should be role-appropriate - not everyone needs advanced knowledge.
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
            <p className="text-[15px] text-white/80 mb-3">A trainee can explain what each panel button does but cannot demonstrate resetting after a test alarm. Is training complete?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - training must include practical demonstration of skills, not just theoretical knowledge. The trainee should practice resetting the panel until they can do it confidently and correctly.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Emergency Procedures</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Clear <strong className="text-cyan-400">emergency procedures</strong> ensure appropriate response to different alarm scenarios.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Emergency Procedure Elements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Response to fire alarm activation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Response to fault conditions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Investigation before silencing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />When to evacuate vs investigate</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Fire brigade notification criteria</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Escalation contacts and procedures</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Procedures should be tailored to the specific premises and its fire risk assessment.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Ongoing Support Arrangements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-white">Ongoing support</strong> ensures the system remains effective throughout its operational life.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Support Services to Offer:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Planned maintenance contracts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />24/7 emergency call-out service</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Technical helpline support</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />System modifications and extensions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Refresher training sessions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Spare parts supply</li>
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
              <h3 className="text-[17px] font-semibold text-white">Training Verification and Records</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Training must be <strong className="text-cyan-400">verified and documented</strong> to demonstrate competence and compliance.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Training Record Contents:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Date and duration of training</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Name and signature of trainer</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Names and roles of trainees</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Topics covered</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Practical assessments completed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-cyan-400" />Trainee signatures confirming understanding</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Training records should be kept for the duration of system operation.
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
            <p className="text-[15px] text-white/80 mb-3">A building changes security company, resulting in all trained staff being replaced. What action is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The new staff require full training on the fire alarm system before taking responsibility. Arrange training session covering panel operation, testing procedures, emergency response, and logbook completion. Document the training.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A client refuses to sign the handover acceptance, stating they need more time to review the documentation. How should you proceed?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Allow reasonable time for review, but clarify that formal responsibility transfer requires signed acceptance. Document that documentation was provided and training offered. Schedule a follow-up meeting to complete handover. Do not leave without a clear plan for completion.</p>
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
                  Prepare a simple quick-reference card with key panel operations for day-to-day use
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Conduct training during a quiet period when distractions are minimised
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Follow up after handover to address any questions that arise during initial operation
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
                  Rushing through training to meet time constraints - inadequate training creates safety risks
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Assuming users will read the manual - most will rely on what they remember from training
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not establishing ongoing support arrangements before leaving site
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
            { q: "How long should training sessions take?", a: "Allow 1-2 hours for basic user training, longer for complex systems. Quality is more important than speed - ensure understanding before completing." },
            { q: "What if the responsible person is unavailable for training?", a: "Reschedule to ensure the key person receives training. Training deputies is important but should not replace training the main responsible person." },
            { q: "Should training be repeated for night shift staff?", a: "Yes - all staff who may need to respond to alarms should receive appropriate training. Consider shift patterns when scheduling sessions." },
            { q: "How do I handle language barriers during training?", a: "Use visual aids, practical demonstrations, and consider translated materials. Confirm understanding through practical demonstration rather than verbal confirmation alone." },
            { q: "What if the client says they already know how to use fire alarms?", a: "Systems vary significantly. Provide system-specific training covering this particular installation's features, even if the person has general experience." },
            { q: "Who pays for refresher training?", a: "This should be established in the maintenance contract. Initial training is typically included in installation cost; ongoing training may be charged separately." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of handover and client training with 10 questions.</p>
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

      {/* Module Completion Card */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-[20px] font-bold text-white mb-2">Module 6 Complete</h3>
            <p className="text-[15px] text-white/70 mb-4">
              Congratulations! You have completed the Testing, Servicing & Certification module. You now understand BS 5839-1 testing requirements, servicing procedures, fault diagnosis, record keeping, certification, and client handover.
            </p>
            <Button variant="ios-primary" asChild>
              <Link to="/study-centre/upskilling/fire-alarm-module-7">
                Continue to Module 7
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-6-section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-7">
              Next Module
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule6Section6;
