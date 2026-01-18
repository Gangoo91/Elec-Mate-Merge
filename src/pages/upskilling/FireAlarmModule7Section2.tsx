import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Building, CheckCircle, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Building Regulations - Fire Alarm Course";
const DESCRIPTION = "Learn about Approved Document B, Building Control notification requirements and competent persons schemes for fire alarm compliance.";

const FireAlarmModule7Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which Approved Document specifically covers fire safety requirements in buildings?',
      options: [
        'Approved Document A - Structure',
        'Approved Document B - Fire Safety',
        'Approved Document M - Access',
        'Approved Document P - Electrical Safety'
      ],
      correctAnswer: 1,
      explanation: 'Approved Document B provides guidance on meeting Building Regulations requirements for fire safety, including means of escape and fire detection.'
    },
    {
      id: 2,
      question: 'What is the minimum smoke alarm requirement for a new-build two-storey house under Building Regulations?',
      options: [
        'One smoke alarm on the ground floor only',
        'Smoke alarms on each storey with a circulation space',
        'Smoke alarms in every room',
        'No requirement for houses'
      ],
      correctAnswer: 1,
      explanation: 'Building Regulations require at least one smoke alarm on each storey containing a habitable room, typically positioned in circulation spaces.'
    },
    {
      id: 3,
      question: 'What grade of fire detection system is typically required in new-build houses?',
      options: [
        'Grade A with control panel',
        'Grade B with mains supply',
        'Grade D with mains supply and standby',
        'Grade F battery only'
      ],
      correctAnswer: 2,
      explanation: 'New-build houses typically require Grade D systems - mains-powered smoke alarms with integral standby supply (battery backup).'
    },
    {
      id: 4,
      question: 'When must Building Control be notified of fire alarm installation work?',
      options: [
        'Never - it is not building work',
        'Only for commercial properties',
        'When it forms part of notifiable building work',
        'Only for wireless systems'
      ],
      correctAnswer: 2,
      explanation: 'Fire alarm installation must be notified when part of building work that requires Building Regulations approval, such as new builds or material alterations.'
    },
    {
      id: 5,
      question: 'What is a Competent Person Scheme in relation to fire alarms?',
      options: [
        'A government training programme',
        'A scheme allowing self-certification of compliance',
        'An insurance requirement only',
        'A fire service inspection programme'
      ],
      correctAnswer: 1,
      explanation: 'Competent Person Schemes allow registered installers to self-certify that work complies with Building Regulations without separate Building Control notification.'
    },
    {
      id: 6,
      question: 'What does Approved Document B Volume 1 primarily cover?',
      options: [
        'Commercial buildings',
        'Dwelling houses',
        'Industrial premises',
        'Public buildings'
      ],
      correctAnswer: 1,
      explanation: 'Approved Document B Volume 1 covers fire safety requirements for dwelling houses, flats and maisonettes.'
    },
    {
      id: 7,
      question: 'In a new-build flat, where must a heat detector be located?',
      options: [
        'In the living room',
        'In the bedroom',
        'In the kitchen',
        'In the bathroom'
      ],
      correctAnswer: 2,
      explanation: 'Heat detectors (rather than smoke detectors) should be located in kitchens to provide detection whilst avoiding false alarms from cooking.'
    },
    {
      id: 8,
      question: 'What is the purpose of a Building Regulations Completion Certificate?',
      options: [
        'To certify insurance cover',
        'To confirm work complies with Building Regulations',
        'To register the property for council tax',
        'To confirm fire service approval'
      ],
      correctAnswer: 1,
      explanation: 'A Completion Certificate confirms that building work has been inspected and complies with Building Regulations requirements.'
    },
    {
      id: 9,
      question: 'Which organisation typically administers Competent Person Schemes for fire detection?',
      options: [
        'The Fire Service',
        'Local Authorities only',
        'Third-party certification bodies approved by DLUHC',
        'Insurance companies'
      ],
      correctAnswer: 2,
      explanation: 'Competent Person Schemes are administered by certification bodies approved by the Department for Levelling Up, Housing and Communities (DLUHC).'
    },
    {
      id: 10,
      question: 'What happens if fire alarm work is completed without required Building Regulations approval?',
      options: [
        'Nothing - approval is optional',
        'The work may need to be opened up for inspection or enforcement action taken',
        'Only a verbal warning is issued',
        'The installer is automatically qualified'
      ],
      correctAnswer: 1,
      explanation: 'Failure to obtain Building Regulations approval can result in enforcement action, including requiring work to be opened up for inspection or even removed.'
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
            <Building className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-xs font-medium text-elec-yellow uppercase tracking-wide">
            Section 2 of 4
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Building Regulations
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
          Approved Document B requirements, Building Control notification and competent persons schemes for fire alarm compliance.
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
              <span><strong className="text-white">Approved Document B</strong> provides guidance on fire safety for Building Regulations compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Building Control notification</strong> required for fire alarm work forming part of building work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Competent Person Schemes</strong> allow self-certification without separate notification</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the structure and purpose of Approved Document B",
            "Identify fire detection requirements for dwellings",
            "Understand Building Control notification requirements",
            "Describe the role of Competent Person Schemes",
            "Differentiate between compliance routes for fire alarm work",
            "Apply Building Regulations requirements to installations"
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
            <h3 className="text-lg font-semibold text-white">Approved Document B Overview</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-white">Approved Document B (Fire Safety)</strong> provides practical guidance on meeting Building Regulations requirements for fire safety in buildings. It is published by the government and regularly updated.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Approved Document B Structure:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Volume 1:</strong> Dwelling houses, flats and maisonettes</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Volume 2:</strong> Buildings other than dwellings</li>
              </ul>
            </div>
            <p>The document covers five key areas: <strong className="text-elec-yellow">B1</strong> Means of warning and escape, <strong className="text-elec-yellow">B2</strong> Internal fire spread (linings), <strong className="text-elec-yellow">B3</strong> Internal fire spread (structure), <strong className="text-elec-yellow">B4</strong> External fire spread, and <strong className="text-elec-yellow">B5</strong> Access and facilities for the fire service.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">02</span>
            <h3 className="text-lg font-semibold text-white">Fire Detection Requirements for Dwellings</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Section B1 of Approved Document B specifies minimum fire detection requirements for new-build dwellings. These requirements reference <strong className="text-elec-yellow">BS 5839-6</strong> for system grades and categories.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Minimum Requirements for Houses:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Smoke alarm on every storey with habitable room</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Heat alarm in principal habitable room (if no separate kitchen)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Mains powered with integral standby supply (Grade D)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Interlinked throughout the property</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Since October 2022, the regulations also require carbon monoxide alarms in rooms with fixed combustion appliances (excluding gas cookers).</p>
          </div>
        </div>

        {/* Section 03 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">03</span>
            <h3 className="text-lg font-semibold text-white">Requirements for Flats and Maisonettes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Flats and maisonettes have additional requirements due to the presence of common areas and multiple dwellings sharing a building.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Within Individual Flats:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Grade D1 or D2 system (Category LD2 or LD3)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Smoke alarms in escape routes and principal habitable room</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Heat alarm in kitchen</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Common Areas:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Fire detection system may be required depending on building height and layout</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Typically BS 5839-1 Category L system in common areas</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Must be designed by competent fire engineer for complex buildings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">A new-build three-storey house requires fire detection. What is the minimum system grade and where must detectors be located?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Minimum Grade D (mains with battery backup), with interlinked smoke alarms on all three storeys in circulation spaces. A heat alarm should be in the kitchen if it opens onto the escape route.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">04</span>
            <h3 className="text-lg font-semibold text-white">Building Control Notification</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Fire alarm installation may require <strong className="text-white">Building Control notification</strong> depending on the circumstances of the work.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">When Notification is Required:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />New building construction</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Material alterations to existing buildings</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Change of use requiring upgraded fire protection</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Loft conversions and extensions</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Standalone fire alarm installations in existing buildings (not part of building work) do not require Building Control notification but must still comply with relevant standards.
              </p>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">05</span>
            <h3 className="text-lg font-semibold text-white">Competent Person Schemes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-elec-yellow">Competent Person Schemes</strong> allow registered installers to self-certify that work complies with Building Regulations without requiring separate Building Control inspection.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Key Features of Competent Person Schemes:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Registered installers assessed for competence</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Self-certification of Building Regulations compliance</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Notification to local authority by scheme operator</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Certificate issued to building owner</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Fire Detection Scheme Operators Include:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />NAPIT (National Association of Professional Inspectors and Testers)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />NICEIC (National Inspection Council for Electrical Installation Contracting)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />BAFE (British Approvals for Fire Equipment)</li>
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
          <p className="text-sm text-white/80 mb-3">An installer completes fire alarm work in a loft conversion but is not registered with a Competent Person Scheme. What must happen?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Building Control must be notified of the work. The local authority (or Approved Inspector) will inspect and issue a completion certificate if the work complies. Failure to notify is a breach of Building Regulations.</p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">06</span>
            <h3 className="text-lg font-semibold text-white">Compliance Routes and Documentation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>There are two main routes to demonstrate compliance with Building Regulations for fire alarm work.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Route 1 - Building Control Application:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Submit Building Notice or Full Plans application</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Building Control inspects work at key stages</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Completion Certificate issued on satisfactory completion</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Route 2 - Competent Person Scheme:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Registered installer completes work</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Installer self-certifies compliance</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Scheme operator notifies local authority</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5" />Certificate of compliance issued to owner</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Check 3 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">What documents should a homeowner receive after a Competent Person Scheme installer completes fire alarm work?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> The homeowner should receive a Building Regulations Compliance Certificate from the scheme operator, plus an installation certificate and operating instructions for the fire alarm system.</p>
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
                Always check if work requires Building Control notification before starting - especially for extensions and conversions
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Keep up to date with Competent Person Scheme registration - lapsed registration means you cannot self-certify
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Provide clear documentation to the customer including system design, test certificates and operating instructions
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
            <h4 className="text-base font-semibold text-red-400 mb-2">Common Mistakes</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Assuming all fire alarm work is exempt from Building Regulations - it depends on the circumstances
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Failing to notify Building Control when required - this can cause problems for property sales
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Installing smoke alarms in kitchens - use heat alarms to avoid nuisance alarms from cooking
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
            { q: "Is Approved Document B legally binding?", a: "The Approved Document provides guidance - it is not mandatory. However, following it is the easiest way to demonstrate compliance. Alternative approaches are acceptable if they meet the functional requirements." },
            { q: "Can existing buildings be required to upgrade fire detection?", a: "Building Regulations generally apply only to new work. However, the RR(FS)O may require improvements to fire safety measures in existing buildings based on the fire risk assessment." },
            { q: "What is the difference between a Building Notice and Full Plans?", a: "A Building Notice is a simpler process for smaller works - no plans approval needed. Full Plans involves submitting detailed drawings for approval before work starts - required for larger or complex projects." },
            { q: "Do I need to be on a Competent Person Scheme to install fire alarms?", a: "No - anyone can install fire alarms. But only registered scheme members can self-certify Building Regulations compliance. Others must use Building Control." },
            { q: "How long must Building Regulations records be kept?", a: "Local authorities must keep Building Control records for at least 15 years. You should keep your own records indefinitely as they may be needed for property transactions." },
            { q: "What happens if work does not comply with Building Regulations?", a: "The local authority can require work to be altered or removed. In serious cases, prosecution is possible. Non-compliance can also affect property sales and insurance." }
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
              <p className="text-sm text-white/70 mb-4">Test your understanding of Building Regulations with 10 questions.</p>
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
            <Link to="../section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 min-h-[44px] bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
          >
            <Link to="../section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule7Section2;
