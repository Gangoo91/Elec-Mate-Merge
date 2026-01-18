import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Home, CheckCircle, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "BS 5839-6 Requirements - Fire Alarm Course";
const DESCRIPTION = "Master BS 5839-6 for domestic fire detection systems including grades A-F, LD categories and requirements for dwelling houses and flats.";

const FireAlarmModule7Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary difference between BS 5839-1 and BS 5839-6?',
      options: [
        'BS 5839-6 is for larger buildings',
        'BS 5839-6 covers domestic dwellings only',
        'BS 5839-1 is the newer standard',
        'There is no difference'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-6 specifically covers fire detection and fire alarm systems in domestic premises (dwellings), whilst BS 5839-1 covers non-domestic premises.'
    },
    {
      id: 2,
      question: 'What does Grade D refer to in BS 5839-6?',
      options: [
        'Battery-powered detectors only',
        'Mains-powered alarms with integral standby supply',
        'Panel-based system with dedicated wiring',
        'Wireless interconnected system'
      ],
      correctAnswer: 1,
      explanation: 'Grade D systems use mains-powered smoke/heat alarms with an integral standby power supply (typically a battery). This is the most common grade for new-build houses.'
    },
    {
      id: 3,
      question: 'Which category provides detection throughout all rooms of a dwelling?',
      options: [
        'LD1',
        'LD2',
        'LD3',
        'PD1'
      ],
      correctAnswer: 0,
      explanation: 'LD1 provides full coverage throughout the dwelling - all circulation spaces (hallways, landings) plus all rooms where a fire might start.'
    },
    {
      id: 4,
      question: 'What minimum protection does LD3 provide?',
      options: [
        'All rooms including bathrooms',
        'Escape routes only (halls, stairs, landings)',
        'Bedrooms and living rooms only',
        'Kitchen and garage only'
      ],
      correctAnswer: 1,
      explanation: 'LD3 provides the minimum coverage for life safety - detection in circulation spaces (escape routes) only, such as hallways, stairs and landings.'
    },
    {
      id: 5,
      question: 'What type of detector should be installed in kitchens?',
      options: [
        'Optical smoke detector',
        'Ionisation smoke detector',
        'Heat detector',
        'No detector is required in kitchens'
      ],
      correctAnswer: 2,
      explanation: 'Heat detectors should be used in kitchens to avoid false alarms from cooking. Smoke detectors are not suitable due to cooking fumes.'
    },
    {
      id: 6,
      question: 'In a Grade A system, what does the control equipment comprise?',
      options: [
        'Individual battery-powered alarms',
        'A fire alarm control panel with separate power supply',
        'Mains-powered alarms linked by radio',
        'A simple junction box'
      ],
      correctAnswer: 1,
      explanation: 'Grade A is the highest grade, comprising a fire alarm control and indicating panel (CIE) with a separate power supply, similar to commercial systems.'
    },
    {
      id: 7,
      question: 'What is the minimum requirement for a new-build house under Building Regulations?',
      options: [
        'Grade F, Category LD3',
        'Grade D, Category LD2',
        'Grade A, Category LD1',
        'Grade E, Category LD3'
      ],
      correctAnswer: 1,
      explanation: 'Building Regulations typically require Grade D (mains with battery backup) at Category LD2 (circulation spaces plus high-risk rooms like kitchens) as a minimum for new houses.'
    },
    {
      id: 8,
      question: 'What interconnection requirement applies to Grade D systems?',
      options: [
        'No interconnection required',
        'Wired or wireless interconnection so all alarms sound together',
        'Only hardwired interconnection is acceptable',
        'Only the hall alarm needs to sound'
      ],
      correctAnswer: 1,
      explanation: 'Grade D systems require interlinked alarms so that when one detector operates, all alarms in the dwelling sound. This can be achieved by hardwired or radio interconnection.'
    },
    {
      id: 9,
      question: 'Where should a smoke detector be positioned in relation to a bedroom door?',
      options: [
        'Inside the bedroom only',
        'At least 3 metres from the door',
        'Within 3 metres of the bedroom door in the circulation space',
        'The position does not matter'
      ],
      correctAnswer: 2,
      explanation: 'Smoke detectors on escape routes should be positioned within 3 metres of bedroom doors to provide early warning to sleeping occupants.'
    },
    {
      id: 10,
      question: 'What is the minimum standby duration for a Grade D alarm battery?',
      options: [
        '24 hours',
        '72 hours',
        '1 week',
        'No minimum specified'
      ],
      correctAnswer: 1,
      explanation: 'Grade D alarms with integral standby supply should maintain protection for at least 72 hours after mains failure, followed by a 4-minute alarm signal.'
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
            <Home className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-xs font-medium text-elec-yellow uppercase tracking-wide">
            Section 4 of 4
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          BS 5839-6 Requirements
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
          Domestic fire detection and alarm systems: grades, LD categories and requirements for dwellings.
        </p>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            30-35 mins
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
              <span><strong className="text-white">Grades A-F</strong> define system components and power arrangements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">LD categories</strong> (LD1-LD3) define extent of detection coverage</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">New-build houses</strong> typically require Grade D, Category LD2 minimum</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 sm:px-6 pb-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the difference between system grades A-F",
            "Identify appropriate LD categories for different dwellings",
            "Understand positioning requirements for domestic detectors",
            "Describe interconnection and power supply requirements",
            "Apply BS 5839-6 requirements to domestic installations",
            "Select appropriate detector types for different rooms"
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
            <h3 className="text-lg font-semibold text-white">Introduction to BS 5839-6</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-white">BS 5839-6</strong> is the code of practice for fire detection and fire alarm systems in <strong className="text-elec-yellow">domestic premises</strong>. It applies to dwelling houses, flats, maisonettes and similar residential properties.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Key Scope of BS 5839-6:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Individual dwelling houses (detached, semi-detached, terraced)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Individual flats and maisonettes</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Sheltered housing individual units</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Houses in Multiple Occupation (HMOs) - individual units</li>
              </ul>
            </div>
            <p className="text-sm text-white/60 italic">Common areas of blocks of flats are covered by BS 5839-1, not BS 5839-6.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">02</span>
            <h3 className="text-lg font-semibold text-white">System Grades (A-F)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-elec-yellow">Grades</strong> define the <strong className="text-white">type of system components</strong> and how they are powered and interconnected.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Grade Definitions:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">A</span>
                  <span><strong className="text-white">Control panel system:</strong> CIE panel + separate PSU + Category L type detectors (highest grade)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">B</span>
                  <span><strong className="text-white">Panel with mains alarms:</strong> Control panel + mains-powered domestic alarms with standby</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">C</span>
                  <span><strong className="text-white">Mains + central PSU:</strong> Mains-powered alarms connected to common central PSU</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">D</span>
                  <span><strong className="text-white">Mains + integral standby:</strong> Mains-powered alarms with built-in battery backup (most common)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">E</span>
                  <span><strong className="text-white">Mains only:</strong> Mains-powered alarms without standby supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">F</span>
                  <span><strong className="text-white">Battery only:</strong> Battery-powered alarms with no mains connection (lowest grade)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">03</span>
            <h3 className="text-lg font-semibold text-white">LD Categories (Coverage)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-elec-yellow">LD categories</strong> define the <strong className="text-white">extent of detection coverage</strong> within the dwelling. LD stands for "Life safety Detection".</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">LD Category Definitions:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-7 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">LD1</span>
                  <span><strong className="text-white">Full coverage:</strong> Detection in all circulation spaces AND all rooms where fire could start (excluding bathrooms/WCs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-7 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">LD2</span>
                  <span><strong className="text-white">Circulation + high risk:</strong> All circulation spaces plus specified high-risk rooms (kitchens, main living room)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-7 h-5 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">LD3</span>
                  <span><strong className="text-white">Circulation only:</strong> Detection in escape routes only - hallways, stairs and landings (minimum protection)</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                LD3 is the minimum acceptable level for life safety. A dwelling should never have less protection than LD3.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Check 1 */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-base font-semibold text-amber-400">Quick Check</span>
          </div>
          <p className="text-sm text-white/80 mb-3">A new three-bedroom house is being built. What minimum grade and category is required by Building Regulations?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Grade D (mains with integral standby battery) at Category LD2 (smoke alarms in hallway, landing and principal habitable room, plus heat alarm in kitchen). All alarms must be interlinked.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">04</span>
            <h3 className="text-lg font-semibold text-white">Detector Selection and Positioning</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Correct <strong className="text-white">detector selection and positioning</strong> is critical for effective protection without excessive false alarms.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Detector Type by Location:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Hallways/Landings:</strong> Optical or ionisation smoke detectors</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Living rooms:</strong> Optical smoke detectors (less affected by dust)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Kitchens:</strong> Heat detectors only (to avoid cooking alarms)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Bedrooms:</strong> Optical smoke detectors if LD1/LD2 coverage</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Garages:</strong> Heat detectors (petrol fumes can affect smoke detectors)</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Key Positioning Requirements:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />On ceiling, at least 300mm from walls/light fittings</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Within 3 metres of bedroom doors (on landing)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Within 7.5 metres of any part of the room</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Maximum 10.6m between smoke detectors on same level</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">05</span>
            <h3 className="text-lg font-semibold text-white">Interconnection and Power Supply</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>All fire alarms in a dwelling must be <strong className="text-elec-yellow">interconnected</strong> so that when one activates, all alarms sound throughout the property.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Interconnection Methods:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Hardwired:</strong> Dedicated interconnection cable (3-core + earth typically)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Wireless/Radio:</strong> RF link between compatible alarms</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" /><strong className="text-white">Mixed:</strong> Some hardwired with radio-linked extensions</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Grade D Power Requirements:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Mains supply via dedicated circuit or lighting circuit</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Integral battery standby (typically lithium 10-year or replaceable)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Minimum 72-hour standby after mains failure</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />4-minute alarm signal at end of standby period</li>
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
          <p className="text-sm text-white/80 mb-3">Why should a heat detector rather than smoke detector be used in a kitchen?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Smoke detectors in kitchens cause frequent false alarms from cooking fumes and steam. Heat detectors respond to temperature rise and are not affected by normal cooking activities, reducing nuisance alarms whilst still providing fire protection.</p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">06</span>
            <h3 className="text-lg font-semibold text-white">Special Situations and HMOs</h3>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Some dwellings have <strong className="text-white">special requirements</strong> beyond the standard Building Regulations minimum.</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-2">Houses in Multiple Occupation (HMOs):</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Higher risk due to multiple independent occupants</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Grade A or B system often required (fire alarm panel)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />LD1 or LD2 coverage typically required</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Common areas may need BS 5839-1 system</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-white mb-2">Sheltered Housing and Care:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />May require Grade A/B with remote monitoring</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Consideration for vulnerable/mobility-impaired occupants</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Visual alarm devices for hearing-impaired residents</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-elec-yellow" />Link to warden/monitoring centre typically required</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                HMO licensing often requires specific fire detection standards - always check local authority requirements.
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
          <p className="text-sm text-white/80 mb-3">What is the key difference between Grade D and Grade F systems?</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-white/70"><strong className="text-white">Answer:</strong> Grade D uses mains power with integral battery backup, providing reliable power with automatic standby. Grade F is battery-only with no mains connection, relying entirely on batteries which must be replaced periodically and offer less reliable long-term protection.</p>
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
                Always recommend 10-year sealed battery alarms for Grade D - eliminates battery replacement issues
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Test interconnection during installation - activate each alarm and verify all others sound
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Leave clear written instructions for the householder including test procedures and replacement intervals
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
            <h4 className="text-base font-semibold text-red-400 mb-2">Common Mistakes</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Installing smoke detectors in kitchens - always use heat detectors to avoid nuisance alarms
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Placing detectors too close to walls or light fittings where dead air affects performance
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                Forgetting to test interconnection - each alarm must be tested to confirm all units sound
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
            { q: "Can I use Grade F (battery-only) alarms in a new-build house?", a: "No - Building Regulations require Grade D minimum for new-build houses. Grade F is only acceptable as a temporary measure or in existing properties where mains installation is not reasonably practicable." },
            { q: "What is the difference between LD2 and LD3?", a: "LD3 covers circulation spaces only (halls, landings, stairs). LD2 adds coverage in principal rooms - typically the main living room and kitchen (with heat detector). LD2 provides earlier warning." },
            { q: "How often should domestic fire alarms be tested?", a: "Alarms should be tested weekly using the test button. Batteries (if replaceable) should be replaced annually or as indicated by the low battery warning. Alarms should be replaced every 10 years." },
            { q: "Do I need a carbon monoxide alarm as well as smoke alarms?", a: "Yes - since October 2022, Building Regulations require CO alarms in rooms containing fixed combustion appliances (boilers, fires, stoves) except gas cookers." },
            { q: "Can I install wireless alarms in a new-build?", a: "Yes - wireless (radio-linked) interconnection is acceptable for Grade D systems provided the alarms meet the relevant product standards and provide reliable interconnection." },
            { q: "What documentation should I provide after installing a domestic system?", a: "Provide an installation certificate, system layout drawing showing detector locations, operating and maintenance instructions, and details of the system grade and category installed." }
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
              <p className="text-sm text-white/70 mb-4">Test your understanding of BS 5839-6 with 10 questions.</p>
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
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 min-h-[44px] bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
          >
            <Link to="/upskilling/fire-alarm-course/mock-exam">
              Mock Exam
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule7Section4;
