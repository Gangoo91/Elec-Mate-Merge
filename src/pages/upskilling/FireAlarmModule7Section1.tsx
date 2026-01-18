import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Scale, CheckCircle, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Fire Safety Legislation - Fire Alarm Course";
const DESCRIPTION = "Understand the Regulatory Reform (Fire Safety) Order 2005, responsible person duties, fire risk assessments and enforcement powers.";

const FireAlarmModule7Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'When did the Regulatory Reform (Fire Safety) Order 2005 come into force?',
      options: [
        '1 January 2005',
        '1 October 2006',
        '1 April 2007',
        '1 January 2008'
      ],
      correctAnswer: 1,
      explanation: 'The RR(FS)O 2005 came into force on 1 October 2006, replacing previous fire safety legislation with a risk-based approach.'
    },
    {
      id: 2,
      question: 'Who is defined as the "Responsible Person" under the RR(FS)O 2005?',
      options: [
        'Only the fire and rescue service',
        'The building owner or employer with control of the premises',
        'The local authority building control officer',
        'Any employee working in the building'
      ],
      correctAnswer: 1,
      explanation: 'The Responsible Person is typically the employer, building owner, landlord or anyone with control of the premises.'
    },
    {
      id: 3,
      question: 'What is the primary legal document that replaced fire certificates?',
      options: [
        'Building Regulations Part B',
        'BS 5839-1',
        'Fire Risk Assessment',
        'Fire Safety Certificate'
      ],
      correctAnswer: 2,
      explanation: 'The RR(FS)O 2005 abolished fire certificates and replaced them with a requirement for fire risk assessments.'
    },
    {
      id: 4,
      question: 'Which premises are NOT covered by the Regulatory Reform (Fire Safety) Order 2005?',
      options: [
        'Offices and shops',
        'Single private dwellings',
        'Hotels and hostels',
        'Factories and warehouses'
      ],
      correctAnswer: 1,
      explanation: 'Single private dwellings are excluded from the RR(FS)O 2005 - they are covered by other regulations including Building Regulations.'
    },
    {
      id: 5,
      question: 'How often should a fire risk assessment be reviewed?',
      options: [
        'Every 5 years',
        'Only when the fire service requests it',
        'Regularly, and when there are significant changes',
        'Once at initial occupation only'
      ],
      correctAnswer: 2,
      explanation: 'Fire risk assessments must be reviewed regularly and particularly when there are significant changes to the premises, occupancy or use.'
    },
    {
      id: 6,
      question: 'What is an Alterations Notice under the RR(FS)O 2005?',
      options: [
        'A requirement to demolish a building',
        'A notice requiring the fire authority to be notified before making certain changes',
        'Permission to alter fire alarm systems',
        'A building control notification'
      ],
      correctAnswer: 1,
      explanation: 'An Alterations Notice requires the Responsible Person to notify the fire authority before making changes that could increase fire risk.'
    },
    {
      id: 7,
      question: 'What is the maximum penalty for failure to comply with an Enforcement Notice?',
      options: [
        'A written warning only',
        'A fine only',
        'Up to 2 years imprisonment and/or unlimited fine',
        'Closure of the business for 1 month'
      ],
      correctAnswer: 2,
      explanation: 'Failure to comply with an Enforcement Notice can result in up to 2 years imprisonment and/or an unlimited fine on conviction.'
    },
    {
      id: 8,
      question: 'What is Article 17 of the RR(FS)O concerned with?',
      options: [
        'Fire detection and warning systems',
        'Maintenance of firefighting equipment',
        'Emergency routes and exits',
        'Fire safety training'
      ],
      correctAnswer: 0,
      explanation: 'Article 17 specifically deals with fire detection and warning requirements in regulated premises.'
    },
    {
      id: 9,
      question: 'Who enforces the Regulatory Reform (Fire Safety) Order 2005?',
      options: [
        'Local Authority Building Control',
        'Health and Safety Executive only',
        'Fire and Rescue Authority',
        'The Police'
      ],
      correctAnswer: 2,
      explanation: 'The Fire and Rescue Authority is the primary enforcing authority for the RR(FS)O 2005 in most premises.'
    },
    {
      id: 10,
      question: 'What must a fire risk assessment identify?',
      options: [
        'Only the location of fire extinguishers',
        'Fire hazards, people at risk and appropriate fire safety measures',
        'The cost of fire alarm systems',
        'Insurance requirements only'
      ],
      correctAnswer: 1,
      explanation: 'A fire risk assessment must identify fire hazards, people at risk, evaluate the risks and determine appropriate preventive and protective measures.'
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
            <Link to="/electrician/upskilling/fire-alarm-module-7">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Scale className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-xs font-medium text-elec-yellow uppercase tracking-wide">
            Section 1 of 4
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Fire Safety Legislation
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
          Understanding the Regulatory Reform (Fire Safety) Order 2005 and the legal framework for fire safety in England and Wales.
        </p>
        <div className="flex items-center gap-4 text-sm text-white/50">
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

      {/* Quick Summary */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">RR(FS)O 2005</strong> replaced fire certificates with a risk-based approach from 1 October 2006</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Responsible Person</strong> must conduct and maintain a suitable fire risk assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Enforcement</strong> by Fire and Rescue Authority with powers including prohibition notices</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the purpose and scope of the RR(FS)O 2005",
            "Identify who qualifies as the Responsible Person",
            "Describe the five-step fire risk assessment process",
            "Understand enforcement powers and penalties",
            "Explain Articles 8-22 fire safety duties",
            "Apply legislation requirements to workplace scenarios"
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
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto space-y-6">
        {/* Section 01 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">01</span>
            <h3 className="text-lg font-semibold text-white">The Regulatory Reform (Fire Safety) Order 2005</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>The <strong className="text-white">Regulatory Reform (Fire Safety) Order 2005</strong> (commonly known as the RR(FS)O or Fire Safety Order) came into force on <strong className="text-elec-yellow">1 October 2006</strong>. It applies to England and Wales.</p>
            <p>This legislation replaced over 70 pieces of previous fire safety law with a single, risk-based approach. It abolished the old fire certificate system and placed responsibility directly on those who control premises.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Key Legislation Replaced:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire Precautions Act 1971</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire Precautions (Workplace) Regulations 1997</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire Certificates (Special Premises) Regulations 1976</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Various sector-specific fire regulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 02 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">02</span>
            <h3 className="text-lg font-semibold text-white">The Responsible Person</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>The <strong className="text-elec-yellow">Responsible Person</strong> is the individual or organisation with ultimate responsibility for fire safety in regulated premises. This is defined in Article 3 of the Order.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">The Responsible Person May Be:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />The employer (for workplaces)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />The person with control of the premises</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />The owner of the building</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />The landlord (for common areas of residential buildings)</li>
              </ul>
            </div>
            <p>Where multiple people share control of premises, they must cooperate and coordinate their fire safety arrangements. Each person is responsible for the parts they control.</p>
          </div>
        </div>

        {/* Section 03 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">03</span>
            <h3 className="text-lg font-semibold text-white">Fire Risk Assessment Requirements</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Article 9 requires the Responsible Person to carry out a <strong className="text-white">suitable and sufficient fire risk assessment</strong>. This replaced the old fire certificate system.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Five Steps of Fire Risk Assessment:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">1</span>
                  <span><strong className="text-white">Identify fire hazards</strong> - sources of ignition, fuel and oxygen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">2</span>
                  <span><strong className="text-white">Identify people at risk</strong> - employees, visitors, vulnerable persons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">3</span>
                  <span><strong className="text-white">Evaluate risks</strong> - remove/reduce hazards, protect people</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">4</span>
                  <span><strong className="text-white">Record findings</strong> - document significant findings and actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">5</span>
                  <span><strong className="text-white">Review regularly</strong> - keep assessment up to date</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">For premises with 5 or more employees, the significant findings must be recorded in writing.</p>
          </div>
        </div>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">A small business has 3 employees. Must they record their fire risk assessment in writing?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Technically, written recording is only legally required for premises with 5+ employees. However, it is strongly recommended to record all fire risk assessments as evidence of compliance and for review purposes.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">04</span>
            <h3 className="text-lg font-semibold text-white">General Fire Precautions (Articles 8-22)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>The Order specifies <strong className="text-white">general fire precautions</strong> that the Responsible Person must implement based on the fire risk assessment.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Key Articles:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-elec-yellow font-semibold">Art.14:</span> Emergency routes and exits - adequate, kept clear, illuminated</li>
                <li className="flex items-start gap-2"><span className="text-elec-yellow font-semibold">Art.17:</span> Fire detection and warning - appropriate detection and alarm systems</li>
                <li className="flex items-start gap-2"><span className="text-elec-yellow font-semibold">Art.13:</span> Firefighting equipment - appropriate and accessible</li>
                <li className="flex items-start gap-2"><span className="text-elec-yellow font-semibold">Art.21:</span> Training - employees receive adequate instruction</li>
                <li className="flex items-start gap-2"><span className="text-elec-yellow font-semibold">Art.22:</span> Cooperation - duty to cooperate with others sharing premises</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Article 17 specifically requires fire detection and warning systems appropriate to the risk - this directly links to fire alarm requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">05</span>
            <h3 className="text-lg font-semibold text-white">Enforcement and Penalties</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>The <strong className="text-elec-yellow">Fire and Rescue Authority</strong> is the enforcing authority for most premises. They have extensive powers to ensure compliance.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Enforcement Options:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />
                  <span><strong className="text-white">Informal advice</strong> - guidance to improve compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />
                  <span><strong className="text-white">Enforcement Notice</strong> - formal requirement to take action within specified timeframe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />
                  <span><strong className="text-white">Prohibition Notice</strong> - immediate restriction or closure where serious risk exists</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />
                  <span><strong className="text-white">Alterations Notice</strong> - requirement to notify before making specified changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />
                  <span><strong className="text-white">Prosecution</strong> - criminal proceedings for serious breaches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Check 2 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">A fire inspector issues a Prohibition Notice on a nightclub. Can the club continue operating?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> No. A Prohibition Notice takes immediate effect and prohibits or restricts use of the premises until the serious fire risk is remedied. Operating in breach is a criminal offence.</p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">06</span>
            <h3 className="text-lg font-semibold text-white">Penalties and Criminal Liability</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Failure to comply with the RR(FS)O 2005 can result in <strong className="text-white">criminal prosecution</strong> with significant penalties.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Maximum Penalties (On Indictment):</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Failure to comply with duty:</strong> Unlimited fine</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Failure to comply with Enforcement Notice:</strong> 2 years imprisonment and/or unlimited fine</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Failure to comply with Prohibition Notice:</strong> 2 years imprisonment and/or unlimited fine</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Following the Grenfell Tower tragedy, the Fire Safety Act 2021 amended the RR(FS)O to clarify that it applies to the structure, external walls and flat entrance doors of multi-occupied residential buildings.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Check 3 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">Which Article of the RR(FS)O 2005 relates specifically to fire detection and warning systems?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Article 17 deals with fire detection and fire warning. It requires the Responsible Person to ensure premises are equipped with appropriate fire detection and alarm systems.</p>
          </div>
        </div>
      </section>

      {/* Practical Guidance */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Practical Guidance</h2>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-white/5 border border-green-500/20">
            <h4 className="text-base font-semibold text-green-400 mb-2">Pro Tips</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Always check who the Responsible Person is before starting any fire alarm work - they authorise changes
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Fire risk assessments should inform fire alarm specification - reference them in design documentation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Keep records of all fire alarm work - these form part of the fire safety documentation
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
            <h4 className="text-base font-semibold text-red-400 mb-2">Common Mistakes</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Assuming building management handles all fire safety - everyone has duties
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Treating fire risk assessment as a one-off exercise - it must be reviewed regularly
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Ignoring the need to notify the fire authority before changes in premises with Alterations Notices
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Does the RR(FS)O 2005 apply to Scotland and Northern Ireland?", a: "No. Scotland has the Fire (Scotland) Act 2005 and Fire Safety (Scotland) Regulations 2006. Northern Ireland has the Fire and Rescue Services (Northern Ireland) Order 2006." },
            { q: "Who should carry out the fire risk assessment?", a: "The Responsible Person can do it themselves if competent, or appoint a competent person. For complex premises, a qualified fire risk assessor is recommended." },
            { q: "How often must fire risk assessments be reviewed?", a: "There is no fixed period - review should be regular and triggered by significant changes such as alterations, changes in occupancy, or after a fire incident." },
            { q: "Does the Order apply to domestic premises?", a: "Single private dwellings are excluded. However, common areas of blocks of flats, HMOs and similar residential buildings are covered." },
            { q: "What happens if there are multiple Responsible Persons?", a: "Article 22 requires them to cooperate and coordinate. Each remains responsible for their area of control, but they must work together." },
            { q: "Can I appeal against an Enforcement Notice?", a: "Yes. Appeals are made to the Magistrates' Court (or in Scotland, the Sheriff Court) within 21 days of the notice being served." }
          ].map((faq, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-base font-semibold text-white mb-2">{faq.q}</p>
              <p className="text-sm text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <div className="p-4 rounded-lg bg-white/5 border border-elec-yellow/20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Knowledge Check</h3>
          </div>

          {!showQuiz ? (
            <div className="text-center py-6">
              <p className="text-sm text-white/70 mb-4">Test your understanding of fire safety legislation with 10 questions.</p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="min-h-[44px] px-6 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
              >
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
                    <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-base font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                      <p className={`text-sm ${correct ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {q.options[selectedAnswers[i]] ?? '—'} {correct ? '✓' : '✗'}
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
                className="w-full min-h-[44px] gap-2 bg-white/10 text-white hover:bg-white/20 touch-manipulation active:scale-[0.98]"
              >
                <RotateCcw className="h-4 w-4" />
                Restart Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

              <div>
                <p className="text-lg font-semibold text-white mb-4">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((opt, idx) => {
                    const selected = selectedAnswers[currentQuestion] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all touch-manipulation ${
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
                  className="flex-1 min-h-[44px] bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 touch-manipulation active:scale-[0.98]"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  className="flex-1 min-h-[44px] bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation active:scale-[0.98]"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 sm:px-6 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button
            variant="ghost"
            asChild
            className="flex-1 min-h-[44px] bg-white/5 text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
          >
            <Link to="/electrician/upskilling/fire-alarm-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 min-h-[44px] bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
          >
            <Link to="../section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule7Section1;
