import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ClipboardCheck, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Category Selection & Risk Assessment - Fire Alarm Course";
const DESCRIPTION = "Learn how to select the correct BS 5839-1 fire alarm category based on fire risk assessment, building use, and fire strategy requirements.";

const FireAlarmModule1Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary driver for fire alarm category selection?',
      options: [
        'Cost of installation',
        'Fire risk assessment and fire strategy',
        'Building age',
        'Number of occupants only'
      ],
      correctAnswer: 1,
      explanation: 'Category selection must be based on fire risk assessment findings and the requirements of the fire strategy.'
    },
    {
      id: 2,
      question: 'Which document formally defines the fire alarm category required?',
      options: [
        'Weekly test logbook',
        'Maintenance contract',
        'Fire strategy document',
        'Insurance policy only'
      ],
      correctAnswer: 2,
      explanation: 'The fire strategy document defines life safety provisions including the required fire alarm category.'
    },
    {
      id: 3,
      question: 'When selecting between L1 and L2, what is the key consideration?',
      options: [
        'Installation cost only',
        'Whether full coverage or targeted high-risk coverage meets life safety objectives',
        'Age of the building',
        'Number of floors only'
      ],
      correctAnswer: 1,
      explanation: 'The choice depends on whether the fire strategy requires comprehensive (L1) or targeted (L2) detection.'
    },
    {
      id: 4,
      question: 'A mixed-use building with offices and a warehouse might require:',
      options: [
        'M category throughout',
        'L3 for offices, P1 for warehouse - combined categories',
        'No fire alarm system',
        'Only call points'
      ],
      correctAnswer: 1,
      explanation: 'Different zones may have different needs - life safety for offices, property protection for warehouse.'
    },
    {
      id: 5,
      question: 'Who should be consulted during category selection?',
      options: [
        'Only the building owner',
        'Fire engineer, insurer, and building control as appropriate',
        'Only the fire alarm installer',
        'The general contractor only'
      ],
      correctAnswer: 1,
      explanation: 'Category selection may involve multiple stakeholders depending on building type and requirements.'
    },
    {
      id: 6,
      question: 'If the fire risk assessment identifies sleeping risk, which categories are typically considered?',
      options: [
        'M or P2 only',
        'L1 or L2 depending on building layout',
        'L4 only',
        'P1 only'
      ],
      correctAnswer: 1,
      explanation: 'Sleeping risk requires enhanced life safety detection, typically L1 for full coverage or L2 for targeted.'
    },
    {
      id: 7,
      question: 'What should happen if the fire risk assessment is updated?',
      options: [
        'No action needed',
        'Category selection should be reviewed and system upgraded if necessary',
        'Only test more frequently',
        'Remove the existing system'
      ],
      correctAnswer: 1,
      explanation: 'Changes in risk may require changes to category selection and system design.'
    },
    {
      id: 8,
      question: 'Cause-and-effect documentation should be developed:',
      options: [
        'After installation is complete',
        'During design stage in consultation with stakeholders',
        'Only if requested by the user',
        'By the maintenance contractor'
      ],
      correctAnswer: 1,
      explanation: 'Cause-and-effect should be agreed during design to ensure the system meets all operational requirements.'
    },
    {
      id: 9,
      question: 'Which factor would NOT typically influence category selection?',
      options: [
        'Occupancy type (sleeping, public, etc.)',
        'Fire load and ignition sources',
        'Colour of the building exterior',
        'Evacuation strategy'
      ],
      correctAnswer: 2,
      explanation: 'Category selection is based on risk, occupancy, and strategy - not aesthetic factors.'
    },
    {
      id: 10,
      question: 'For a school with science labs, how would you approach category selection?',
      options: [
        'M throughout as it is low risk',
        'L2 with detection on escape routes plus targeted coverage in high-risk labs',
        'No fire alarm needed',
        'P1 only for property protection'
      ],
      correctAnswer: 1,
      explanation: 'Schools typically require L2 - escape route protection plus detection in high-risk areas like labs.'
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
            <Link to="../module-1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <ClipboardCheck className="h-7 w-7 text-blue-400" />
          </div>
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide">
            Section 4 of 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Category Selection & Risk Assessment
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Applying fire risk assessment principles to select the appropriate BS 5839-1 category for any building.
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
        <Card variant="ios-elevated" className="border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-blue-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Fire risk assessment</strong> drives category selection - not cost or convenience</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Fire strategy</strong> document defines the required category and coverage</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong>Multiple stakeholders</strong> may need consulting: fire engineer, insurer, building control</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Link fire risk assessment to category selection",
            "Identify key factors influencing category choice",
            "Apply selection principles to different building types",
            "Understand stakeholder consultation requirements",
            "Document and justify category selection",
            "Review and update categories when risks change"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-blue-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">The Selection Process</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm category selection is a <strong className="text-white">systematic process</strong> driven by risk, not by cost or convenience:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ol className="space-y-2 text-[13px] list-decimal pl-4">
                  <li>Review fire risk assessment findings</li>
                  <li>Identify life safety and property protection objectives</li>
                  <li>Consult fire strategy document requirements</li>
                  <li>Consider stakeholder requirements (insurer, building control)</li>
                  <li>Select appropriate L/P/M category combination</li>
                  <li>Document rationale and justification</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Key Selection Factors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The following factors <strong className="text-white">influence category selection</strong>:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Occupancy type</strong> - sleeping, public, vulnerable persons</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Fire load</strong> - fuel, storage, processes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Ignition sources</strong> - electrical, heating, cooking</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Building layout</strong> - escape routes, compartmentation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Evacuation strategy</strong> - simultaneous, phased, progressive</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Asset value</strong> - high-value equipment, stock, data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Common Building Scenarios</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Typical category selections for <strong className="text-white">common building types</strong>:</p>
              <div className="space-y-2">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-1">Hotels / Care Homes</p>
                  <p className="text-[13px]">L1 (full coverage) due to sleeping risk and vulnerable occupants</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-1">Offices</p>
                  <p className="text-[13px]">L2 or L3 + P2 for server rooms. Full L1 rarely justified.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-1">Schools</p>
                  <p className="text-[13px]">L2 with detection on routes plus labs, kitchens, stores</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-1">Warehouses</p>
                  <p className="text-[13px]">L3 for escape routes + P1 for property (insurer-driven)</p>
                </div>
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
            <p className="text-[15px] text-white/80 mb-3">A new 4-storey office building has open-plan floors, a basement car park, server room, and ground floor restaurant. How would you approach category selection?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L2 for life safety (escape routes + high-risk rooms like the restaurant kitchen), P2 for the server room. Car park may need separate consideration for ventilation system integration.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Stakeholder Consultation</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Category selection may require <strong className="text-white">consultation with multiple parties</strong>:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Fire engineer</strong> - fire strategy, system design</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Building control</strong> - Building Regulations compliance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Insurer</strong> - property protection requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Client/operator</strong> - operational needs, false alarm management</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" /><strong>Fire and rescue service</strong> - for complex or high-risk buildings</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Record all consultations and agreements in design documentation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Cause-and-Effect Matrix</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The <strong className="text-white">cause-and-effect matrix</strong> documents what happens when the fire alarm activates:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Sounder activation zones and sequences</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Fire door release (magnetic holders)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Smoke ventilation and damper control</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Lift recall to ground/fire floor</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />HVAC shutdown or fire mode</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-blue-400" />Gas shut-off in kitchens/plant</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60">Develop cause-and-effect during design stage with all relevant stakeholders.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Reviewing and Updating</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Category selection should be <strong className="text-white">reviewed when</strong>:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Building use or occupancy changes</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Fire risk assessment is updated</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Building layout or compartmentation changes</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Insurer requirements change</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Regulations or standards are updated</li>
                </ul>
              </div>
              <p>Document any changes with updated certificates and cause-and-effect.</p>
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
            <p className="text-[15px] text-white/80 mb-3">An L3 office building is adding a 24-hour call centre that will have night shift workers. Does the category need reviewing?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Yes - the change to 24-hour occupation may affect the risk assessment. Consider whether L3 still provides adequate warning during night shifts when fewer people are present to raise manual alarm.</p>
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
                  Start with the fire strategy document - let it drive your category selection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Engage insurers early if property protection is likely to be required
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document your rationale clearly - you may need to justify decisions later
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
                  Selecting category based on cost without proper risk justification
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not reviewing category when building use changes
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to consult all relevant stakeholders during design
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
            { q: "Who ultimately decides the fire alarm category?", a: "The category should be defined in the fire strategy. The designer specifies a system to meet those requirements, which may be reviewed by building control." },
            { q: "Can the client choose a lower category to save money?", a: "Not if it conflicts with fire strategy requirements or risk assessment findings. Life safety must take priority over cost." },
            { q: "What if insurer and fire strategy requirements differ?", a: "Meet both - the higher standard applies. Document clearly which areas serve which purpose." },
            { q: "How often should category selection be reviewed?", a: "Whenever there are significant changes to building use, layout, or occupancy. Also when the fire risk assessment is updated." },
            { q: "Can I specify a higher category than required?", a: "Yes - there's no upper limit. A client may choose L1 where L2 would suffice, though this increases cost and false alarm potential." },
            { q: "What documentation is needed for category selection?", a: "Design certificate, specification, cause-and-effect matrix, and reference to fire strategy. Keep records of stakeholder consultations." }
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
        <Card variant="ios-elevated" className="border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of category selection and risk assessment with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-blue-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-blue-500/20 border-blue-500/50 text-white'
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
            <Link to="../module-1/section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-2">
              Next Module
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule1Section4;
