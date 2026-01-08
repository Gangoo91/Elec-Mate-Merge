import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Detection Zones - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 detection zone categories: L1-L5 life safety and P1-P2 property protection, coverage requirements, and system selection.";

const FireAlarmModule3Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which best describes an L1 system?',
      options: ['Escape routes only', 'Escape routes plus defined high-risk areas', 'Complete building coverage', 'No automatic detection'],
      correctAnswer: 2,
      explanation: 'L1 provides automatic detection throughout the entire building for maximum life safety.'
    },
    {
      id: 2,
      question: 'What distinguishes L2 from L3?',
      options: ['L2 has fewer detectors', 'L2 includes defined high-risk rooms in addition to escape routes', 'They are identical', 'L2 excludes escape routes'],
      correctAnswer: 1,
      explanation: 'L2 covers escape routes plus specified high-risk areas; L3 focuses on escape routes only.'
    },
    {
      id: 3,
      question: 'A P1 system primarily addresses what objective?',
      options: ['Life safety only', 'Property protection across the whole building', 'Voice alarm only', 'VAD synchronisation'],
      correctAnswer: 1,
      explanation: 'P1 aims for comprehensive detection for property protection across the entire premises.'
    },
    {
      id: 4,
      question: 'What is a common audibility aim for general areas?',
      options: ['55 dB(A)', '65 dB(A) or 5 dB above ambient', '75 dB(A) everywhere', '90 dB(A)'],
      correctAnswer: 1,
      explanation: 'Typical aim is 65 dB(A) or 5 dB above ambient noise - whichever is greater.'
    },
    {
      id: 5,
      question: 'When are visual alarm devices typically required?',
      options: ['Always', 'Where noise/accessibility demands visual warning', 'Never', 'Only outdoors'],
      correctAnswer: 1,
      explanation: 'Use VADs for noisy spaces and to support accessibility - choose the correct category and placement.'
    },
    {
      id: 6,
      question: 'What type of coverage does an L4 system provide?',
      options: ['Full building detection', 'Escape route circulation spaces only', 'Defined high-risk areas only', 'Property protection throughout'],
      correctAnswer: 1,
      explanation: 'L4 systems cover escape route circulation spaces only - more limited than L3.'
    },
    {
      id: 7,
      question: 'What is the primary purpose of an L5 system?',
      options: ['Complete property protection', 'Full life safety throughout building', 'Localised objectives for particular risks or process areas', 'Escape routes plus high-risk areas'],
      correctAnswer: 2,
      explanation: 'L5 is designed for specific localised objectives, such as protecting particular processes or defined risk areas.'
    },
    {
      id: 8,
      question: 'What audibility level is typically required in sleeping areas?',
      options: ['55 dB(A)', '65 dB(A)', '75 dB(A) at the bedhead with doors closed', '85 dB(A) throughout'],
      correctAnswer: 2,
      explanation: 'Sleeping risk areas typically require 75 dB(A) at the bedhead with bedroom doors closed to ensure occupants are awakened.'
    },
    {
      id: 9,
      question: 'What is a P2 system designed for?',
      options: ['Complete building property protection', 'Detection in defined high-risk areas only', 'Life safety in escape routes', 'Voice alarm coverage'],
      correctAnswer: 1,
      explanation: 'P2 provides property protection detection only in defined high-risk areas, rather than throughout the entire building like P1.'
    },
    {
      id: 10,
      question: 'Which system category would typically be specified for a residential care home?',
      options: ['L5 - localised coverage only', 'L3 - escape routes only', 'L1 - complete building coverage', 'P2 - high-risk areas only'],
      correctAnswer: 2,
      explanation: 'Care homes typically require L1 coverage due to sleeping risk and vulnerability of occupants.'
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
            <Link to="../module-3">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 3</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Shield className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 2 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Detection Zones
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding BS 5839-1 L and P category systems, coverage requirements, and system selection criteria.
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
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-amber-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>L categories (L1-L5)</strong> are for life safety - providing early warning for evacuation</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>P categories (P1-P2)</strong> are for property protection - early detection to minimise damage</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Selection</strong> based on fire risk assessment, building use, and occupancy characteristics</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Differentiate L1-L5 life safety categories and typical applications",
            "Understand P1-P2 property protection aims and coverage",
            "Apply audibility and visibility targets for occupant warning",
            "Select appropriate system category based on risk assessment",
            "Identify sleeping risk requirements and special considerations",
            "Avoid common pitfalls in category selection and specification"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-amber-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Life Safety Categories (L1-L5)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>L categories under BS 5839-1 are designed to protect <strong className="text-white">life safety</strong> by providing early warning for evacuation:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">L1:</strong> Detection throughout all areas of the building</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">L2:</strong> Escape routes plus defined high-risk areas (kitchens, plant rooms)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">L3:</strong> Escape routes plus all rooms opening directly onto them</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">L4:</strong> Escape route circulation spaces only</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">L5:</strong> Localised objectives for particular risks or process areas</span></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Property Protection Categories (P1-P2)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>P categories focus on <strong className="text-white">property protection</strong> through early detection to minimise fire damage and business interruption:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <ul className="space-y-2 text-[13px]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">P1:</strong> Detection throughout for early intervention and loss minimisation</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">P2:</strong> Detection in defined high-risk areas only (server rooms, stores)</span></li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">P categories can be combined with L categories - for example, L3 plus P2 for escape route protection and property protection in high-value areas.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Typical Building Applications</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Category Selection Examples:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>L1:</strong> Care homes, hospitals, HMOs, hotels</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>L2:</strong> Offices, schools, retail with back-of-house risks</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>L3:</strong> Medium-risk premises with standard escape routes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>L4:</strong> Low-risk premises with simple layouts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>P1/P2:</strong> Warehouses, data centres, heritage buildings</li>
                </ul>
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
            <p className="text-[15px] text-white/80 mb-3">A three-storey office building has a server room and electrical switch room. Which category combination provides appropriate coverage?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L2 (escape routes plus high-risk areas) combined with P2 for the server room would typically be appropriate - life safety on escape routes plus enhanced detection in the high-value server room for property protection.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Audibility Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Sounders must provide adequate warning to all occupants regardless of location or activity:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">BS 5839-1 Audibility Targets:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>General areas:</strong> 65 dB(A) or 5 dB above ambient (whichever greater)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Sleeping areas:</strong> 75 dB(A) at the bedhead with doors closed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Voice alarm:</strong> Prioritise intelligibility over loudness (STI)</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Sleeping risk premises must achieve 75 dB(A) at the bedhead - this often requires sounders within or adjacent to bedrooms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Visual Alarm Devices (VADs)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>VADs (beacons) provide visual warning where audibility alone may be insufficient:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">EN 54-23 VAD Categories:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category W:</strong> Wall-mounted devices</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category C:</strong> Ceiling-mounted devices</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category O:</strong> Open area devices</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Synchronise multiple VADs to reduce photosensitive risk and provide a clearer, unified signal.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A care home with 24 beds is being designed. Which category and what special considerations apply?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> L1 is typically required for care homes with sleeping accommodation. Special considerations include 75 dB(A) at bedhead, VADs for hearing-impaired residents, and coordination with staff alert systems and phased evacuation strategy.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Category Selection Process</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Category selection should be driven by the fire risk assessment and fire strategy:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Selection Factors:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Building use and occupancy type (sleeping risk?)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Occupant vulnerability and mobility</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Fire risk assessment findings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Evacuation strategy (simultaneous, phased, defend-in-place)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Insurance and regulatory requirements</li>
                </ul>
              </div>
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
                  Always start with the fire risk assessment - let risk drive category selection, not cost
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  For sleeping risk, default to L1 unless the fire strategy specifically justifies L2
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document the rationale for category selection in design documentation
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
                  Specifying L3 where L2 or L1 is needed for the risk profile
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Forgetting sleeping risk audibility requirements (75 dB(A) at bedhead)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Omitting VADs in noisy or accessibility-critical environments
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
            { q: "Can I combine L and P categories in the same building?", a: "Yes - it's common to specify L3 for life safety on escape routes plus P2 for property protection in high-value areas like server rooms." },
            { q: "Is L5 a lesser option than L4?", a: "No - L5 is a bespoke category for specific objectives, not a reduced coverage option. Coverage is determined by the fire strategy requirement." },
            { q: "Who decides which category is required?", a: "The fire risk assessment and fire strategy determine requirements. The designer specifies the category to meet those requirements." },
            { q: "Can the category be changed after installation?", a: "Yes, but this requires a formal variation and update to certificates. Changes should be justified by updated risk assessment." },
            { q: "What detects better for sleeping risk - smoke or heat?", a: "Smoke detectors generally provide earlier warning for smouldering fires, which is critical for sleeping risk. Heat detectors are only used where smoke detection is inappropriate." },
            { q: "How do I specify VAD requirements?", a: "Specify EN 54-23 compliant VADs with appropriate category (W/C/O) and coverage volume. Ensure line-of-sight to occupied areas and synchronisation where multiple devices are visible." }
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
        <Card variant="ios-elevated" className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of detection zone categories with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-amber-400">{calculateScore()}/{questions.length}</p>
                  <p className="text-[15px] text-white/70">({Math.round((calculateScore() / questions.length) * 100)}% correct)</p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const correct = selectedAnswers[i] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[15px] font-semibold text-white mb-2">Q{i + 1}. {q.question}</p>
                        <p className={`text-[13px] ${correct ? 'text-green-400' : 'text-red-400'}`}>
                          Your answer: {q.options[selectedAnswers[i]] ?? 'Not answered'} {correct ? '' : ''}
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
                              ? 'bg-amber-500/20 border-amber-500/50 text-white'
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
            <Link to="../module-3/section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-3/section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section2;
