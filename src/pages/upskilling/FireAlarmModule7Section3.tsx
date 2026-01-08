import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, FileText, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "BS 5839-1 Requirements - Fire Alarm Course";
const DESCRIPTION = "Understand BS 5839-1 for non-domestic fire detection systems including L and P categories, M systems, design principles and installation standards.";

const FireAlarmModule7Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What does the "L" in L category systems stand for?',
      options: [
        'Large building systems',
        'Life safety protection',
        'Limited coverage systems',
        'Local authority systems'
      ],
      correctAnswer: 1,
      explanation: 'L categories are designed primarily for Life safety, providing early warning to enable safe evacuation of building occupants.'
    },
    {
      id: 2,
      question: 'Which category provides automatic detection throughout ALL areas of a building?',
      options: [
        'L2',
        'L3',
        'L1',
        'P2'
      ],
      correctAnswer: 2,
      explanation: 'L1 provides the highest level of life safety protection with automatic detection throughout all areas of the building.'
    },
    {
      id: 3,
      question: 'What is the primary purpose of a P category system?',
      options: [
        'Personnel protection',
        'Property protection',
        'Public area coverage',
        'Partial building coverage'
      ],
      correctAnswer: 1,
      explanation: 'P categories are designed for Property protection, minimising damage to the building and contents by providing early fire detection.'
    },
    {
      id: 4,
      question: 'What does an M category system consist of?',
      options: [
        'Automatic detection only',
        'Manual call points only without automatic detection',
        'Mixed automatic and manual devices',
        'Monitoring equipment only'
      ],
      correctAnswer: 1,
      explanation: 'M (Manual) systems consist of manual call points only, with no automatic fire detection. They rely on people discovering and reporting fires.'
    },
    {
      id: 5,
      question: 'Which L category provides detection in escape routes PLUS rooms opening onto them?',
      options: [
        'L1',
        'L2',
        'L3',
        'L4'
      ],
      correctAnswer: 2,
      explanation: 'L3 provides detection in escape routes and all rooms that open directly onto escape routes, providing early warning if a fire develops near an escape path.'
    },
    {
      id: 6,
      question: 'What is the maximum spacing between point smoke detectors in rooms up to 5m high?',
      options: [
        '5.3m centres',
        '7.5m centres',
        '10.6m centres',
        '12.5m centres'
      ],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends 10.6m spacing between point smoke detectors in rooms up to 5m high for flat ceilings.'
    },
    {
      id: 7,
      question: 'How far from walls should point smoke detectors generally be positioned?',
      options: [
        'At least 300mm',
        'At least 500mm',
        'At least 1000mm',
        'No minimum distance'
      ],
      correctAnswer: 1,
      explanation: 'Point detectors should be at least 500mm from walls and obstructions to avoid dead air spaces that could delay smoke reaching the detector.'
    },
    {
      id: 8,
      question: 'What minimum sound level must fire alarms achieve at bed head height in sleeping areas?',
      options: [
        '65dB(A)',
        '70dB(A)',
        '75dB(A)',
        '85dB(A)'
      ],
      correctAnswer: 2,
      explanation: 'Fire alarms must achieve a minimum 75dB(A) at bed head height in sleeping areas to ensure occupants are awakened.'
    },
    {
      id: 9,
      question: 'What is the minimum standby power duration required for a fire alarm system?',
      options: [
        '12 hours',
        '24 hours',
        '48 hours',
        '72 hours'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 requires a minimum 24-hour standby power capacity followed by a 30-minute alarm period, or 72 hours for some enhanced systems.'
    },
    {
      id: 10,
      question: 'Which category covers escape routes only with no room detection?',
      options: [
        'L2',
        'L3',
        'L4',
        'L5'
      ],
      correctAnswer: 2,
      explanation: 'L4 provides automatic detection in escape routes only (corridors, stairways, lobbies) and is the minimum automatic coverage for life safety.'
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
            <Link to="../module-7">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 7</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <FileText className="h-7 w-7 text-rose-400" />
          </div>
          <span className="text-[11px] font-medium text-rose-400 uppercase tracking-wide">
            Section 3 of 4
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          BS 5839-1 Requirements
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Non-domestic fire detection and alarm systems: categories, design principles and installation standards.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
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

      {/* In 30 Seconds Card */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-rose-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-rose-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <span><strong>L categories</strong> (L1-L5) provide life safety protection with varying levels of coverage</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <span><strong>P categories</strong> (P1-P2) are designed for property protection</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <span><strong>M systems</strong> provide manual call points only without automatic detection</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the difference between L, P and M system categories",
            "Identify appropriate system categories for different building types",
            "Understand detector spacing and positioning requirements",
            "Describe sound level requirements for alarm devices",
            "Explain power supply and standby requirements",
            "Apply BS 5839-1 principles to system design"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-rose-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Introduction to BS 5839-1</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-white">BS 5839-1</strong> is the code of practice for fire detection and fire alarm systems in non-domestic premises. It covers design, installation, commissioning and maintenance.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Scope of BS 5839-1:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Commercial premises (offices, shops, factories)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Public buildings (schools, hospitals, care homes)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Common areas of residential buildings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Industrial and warehouse premises</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">BS 5839-1 does not apply to individual domestic dwellings - these are covered by BS 5839-6.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">L Categories - Life Safety Systems</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-rose-400">L categories</strong> are designed for <strong className="text-white">life safety</strong>, providing early warning to enable safe evacuation of building occupants.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">L Category Definitions:</p>
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">L1</span>
                    <span><strong className="text-white">Full coverage:</strong> Detection throughout ALL areas including toilets, cupboards and voids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">L2</span>
                    <span><strong className="text-white">Escape routes + high risk:</strong> Detection in escape routes plus defined high-risk areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">L3</span>
                    <span><strong className="text-white">Escape routes + rooms:</strong> Detection in escape routes and rooms opening onto them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">L4</span>
                    <span><strong className="text-white">Escape routes only:</strong> Detection in circulation spaces only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">L5</span>
                    <span><strong className="text-white">Engineered solution:</strong> Coverage to satisfy a specific fire safety objective</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">P Categories and M Systems</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-rose-400">P categories</strong> are designed for <strong className="text-white">property protection</strong>, minimising damage to the building and contents.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">P Category Definitions:</p>
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">P1</span>
                    <span><strong className="text-white">Full property coverage:</strong> Detection throughout ALL areas for maximum property protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-rose-400">P2</span>
                    <span><strong className="text-white">Defined areas:</strong> Detection in specified high-value or high-risk areas only</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3 mt-3">
                <p className="text-[13px] font-semibold text-white mb-2">M Systems (Manual):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Manual call points only - no automatic detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Relies on people discovering and reporting fires</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Minimum requirement for many premises</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Often combined with L or P categories for automatic detection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Check 1 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">A care home with sleeping accommodation requires maximum early warning for vulnerable residents. Which category is most appropriate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L1 - providing automatic detection throughout all areas. Care homes with sleeping residents require the highest level of life safety protection to maximise warning time.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Detector Spacing and Positioning</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 provides detailed guidance on <strong className="text-white">detector spacing</strong> to ensure adequate coverage whilst avoiding excessive installation costs.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Point Smoke Detector Spacing (Flat Ceilings up to 5m):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Maximum spacing:</strong> 10.6m between detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Maximum from walls:</strong> 7.5m to nearest detector</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Minimum from walls:</strong> 500mm from any wall or obstruction</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Maximum from ceiling:</strong> 25-150mm depending on type</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3 mt-3">
                <p className="text-[13px] font-semibold text-white mb-2">Point Heat Detector Spacing:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Maximum spacing:</strong> 7.5m between detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Maximum from walls:</strong> 5.3m to nearest detector</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Sound Levels and Alarm Devices</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm sounders must achieve minimum <strong className="text-white">sound levels</strong> to ensure all occupants can hear the alarm, regardless of location.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Minimum Sound Level Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>General areas:</strong> 65dB(A) minimum, or 5dB(A) above background noise</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Sleeping areas:</strong> 75dB(A) at bed head height</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>BS 5839-1:</strong> Recommends 65dB(A) at 3m for sounders</li>
                </ul>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                <p className="text-[13px] text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Visual alarm devices (VADs) should be provided where hearing-impaired people may be present, particularly in sanitary facilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Check 2 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">A hotel corridor is 25 metres long with a ceiling height of 2.8m. What is the maximum number of smoke detectors that could cover this corridor?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Two detectors could cover this corridor - maximum 10.6m spacing with 7.5m from end walls. However, three detectors may be needed depending on corridor width and actual layout.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Power Supply Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm systems must have <strong className="text-white">reliable power supplies</strong> with standby capacity to maintain operation during mains failure.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Standard Power Supply Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Primary supply:</strong> Dedicated mains supply from building distribution board</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Standby batteries:</strong> Minimum 24 hours standby + 30 minutes alarm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Enhanced standby:</strong> 72 hours for systems requiring extended autonomy</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" /><strong>Automatic changeover:</strong> Between mains and battery supplies</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3 mt-3">
                <p className="text-[13px] font-semibold text-white mb-2">Battery Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Sealed lead-acid or nickel-cadmium batteries typically used</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Automatic charging with fault indication</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Design life typically 4-5 years for lead-acid</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-rose-400" />Capacity calculation must account for system load</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Check 3 */}
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span className="text-[15px] font-semibold text-amber-400">Quick Check</span>
            </div>
            <p className="text-[15px] text-white/80 mb-3">What is the difference between an L2 and L3 system in terms of coverage?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L2 covers escape routes plus specifically identified high-risk rooms (based on fire risk assessment). L3 covers escape routes plus ALL rooms that open directly onto escape routes, regardless of individual room risk level.</p>
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
                  Always start with the fire risk assessment - let the risk drive system category selection, not cost
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider combining L and P categories - e.g. L3 for life safety plus P2 for server room protection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document your category selection rationale in the design specification for future reference
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
                  Selecting a lower category to reduce costs without proper risk assessment justification
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Installing detectors too close to walls where dead air can prevent smoke reaching them
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Forgetting to account for background noise when calculating sounder requirements
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
            { q: "Can L and P categories be combined in the same building?", a: "Yes - it is common to specify an L category for life safety plus a P category for additional property protection in high-value areas like server rooms or archives." },
            { q: "When should L1 be specified rather than L2?", a: "L1 is typically required for premises with sleeping risk (hotels, care homes), complex escape routes, or where the fire risk assessment identifies the need for full coverage." },
            { q: "What is an L5 system and when is it used?", a: "L5 is a bespoke category where detection is engineered to satisfy a specific fire safety objective that does not fit L1-L4 patterns - for example, protecting a specific process area." },
            { q: "Do all buildings require automatic detection?", a: "No - some low-risk premises may only need M (manual) systems. The fire risk assessment determines what level of detection is appropriate." },
            { q: "How do I calculate battery standby capacity?", a: "Calculate the total system load (quiescent current), multiply by standby duration (typically 24 hours), then add the alarm load for the alarm period (typically 30 minutes)." },
            { q: "Can detector spacing be reduced in high-ceiling areas?", a: "Detector spacing may need reducing in areas over 5m ceiling height. BS 5839-1 provides specific guidance for different ceiling heights and detector types." }
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
        <Card variant="ios-elevated" className="border-rose-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-rose-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of BS 5839-1 with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-rose-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-rose-500/20 border-rose-500/50 text-white'
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
            <Link to="../module-7/section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-7/section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule7Section3;
