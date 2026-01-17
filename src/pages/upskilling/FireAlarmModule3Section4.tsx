import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Ruler, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Detector Spacing & Coverage - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 detector spacing requirements: ceiling heights, room shapes, obstructions, beam detectors, and coverage calculations for fire detection.";

const FireAlarmModule3Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the typical maximum spacing for point smoke detectors in rooms with flat ceilings up to 10.5 m?',
      options: ['5.3 m radius coverage', '7.5 m between detectors', '10 m between detectors', '15 m between detectors'],
      correctAnswer: 0,
      explanation: 'BS 5839-1 typically specifies 5.3 m radius coverage for point smoke detectors in standard conditions, giving about 10.6 m between detectors.'
    },
    {
      id: 2,
      question: 'How does ceiling height affect detector spacing?',
      options: ['No effect', 'Higher ceilings may require closer spacing due to smoke stratification', 'Higher ceilings always need wider spacing', 'Only heat detectors are affected'],
      correctAnswer: 1,
      explanation: 'Higher ceilings can cause smoke stratification and cooling, potentially requiring closer detector spacing or alternative detection methods.'
    },
    {
      id: 3,
      question: 'What is the maximum distance from a wall to the nearest detector?',
      options: ['2.5 m', 'Half the spacing distance', 'Full spacing distance', '10 m'],
      correctAnswer: 1,
      explanation: 'Detectors should be positioned no more than half the spacing distance from walls to ensure coverage to room edges.'
    },
    {
      id: 4,
      question: 'When might beam detectors be more appropriate than point detectors?',
      options: ['In small offices', 'In high-ceiling or large open-span areas', 'In sleeping accommodation', 'Only outdoors'],
      correctAnswer: 1,
      explanation: 'Beam detectors are well-suited to high ceilings and large open spaces where point detectors would be difficult to access for maintenance.'
    },
    {
      id: 5,
      question: 'How do downstand beams affect detector placement?',
      options: ['No effect', 'Beams over 600 mm may require additional detectors in bays', 'All beams require separate detection', 'Beams always reduce coverage'],
      correctAnswer: 1,
      explanation: 'Significant downstand beams (typically over 600 mm) can trap smoke and may require separate detection within the created bays.'
    },
    {
      id: 6,
      question: 'What factor must be considered when positioning heat detectors compared to smoke detectors?',
      options: ['Heat detectors can be placed anywhere', 'Heat detectors typically require closer spacing than smoke detectors', 'Heat detectors need more distance from walls', 'Heat and smoke detectors have identical spacing'],
      correctAnswer: 1,
      explanation: 'Heat detectors typically have smaller coverage areas than smoke detectors due to how heat dissipates, often requiring closer spacing.'
    },
    {
      id: 7,
      question: 'What is the purpose of considering airflow patterns when positioning detectors?',
      options: ['Aesthetics only', 'Ensure smoke reaches detectors and is not dispersed before detection', 'Reduce cable lengths', 'Meet architectural requirements'],
      correctAnswer: 1,
      explanation: 'Airflow from HVAC systems can affect smoke travel; detectors should be positioned to ensure smoke reaches them rather than being dispersed.'
    },
    {
      id: 8,
      question: 'At what minimum distance should point detectors be kept from air supply diffusers?',
      options: ['No minimum distance', 'At least 0.5 m from the edge of the diffuser', 'At least 5 m', '1 metre exactly'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 recommends keeping point detectors at least 0.5 m from air supply diffusers to prevent dilution of smoke before detection.'
    },
    {
      id: 9,
      question: 'How should sloped ceilings affect detector positioning?',
      options: ['Place detectors at lowest point only', 'Position within 600 mm of apex and consider horizontal coverage', 'Slope has no effect on placement', 'Only use heat detectors on slopes'],
      correctAnswer: 1,
      explanation: 'On sloped ceilings, smoke rises to the apex; detectors should be positioned within 600 mm horizontally of the apex while maintaining required coverage.'
    },
    {
      id: 10,
      question: 'What documentation should support detector layout design?',
      options: ['No documentation needed', 'Calculations showing spacing compliance and drawings marking positions', 'Only verbal agreements', 'Manufacturer preference letters'],
      correctAnswer: 1,
      explanation: 'Detector layouts should be supported by spacing calculations demonstrating BS 5839-1 compliance and clear drawings showing positions relative to room features.'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-3">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 3</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Ruler className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 4 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Detector Spacing & Coverage
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          BS 5839-1 spacing requirements for smoke and heat detectors, beam detectors, and coverage calculations.
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
              <span><strong>Point smoke detectors:</strong> typically 5.3 m radius coverage; half spacing to walls</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Ceiling height matters:</strong> higher ceilings may need closer spacing or beam detectors</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Obstructions:</strong> beams over 600 mm, HVAC diffusers, and apex positions affect placement</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Apply BS 5839-1 spacing requirements for smoke and heat detectors",
            "Calculate detector positions for various room shapes and sizes",
            "Account for ceiling height and stratification effects",
            "Position detectors relative to beams, vents, and obstructions",
            "Select appropriate detection for high-ceiling and open-plan spaces",
            "Document detector layouts with compliant spacing calculations"
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
      <section className="px-4 pb-6 max-w-3xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Point Detector Spacing Basics</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 provides spacing guidance based on detector type and ceiling height:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Standard Spacing (flat ceilings up to 10.5 m):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Smoke detectors:</strong> 5.3 m radius coverage (7.5 m between if square layout)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Heat detectors:</strong> typically 5.3 m radius for Grade A1 (varies by grade)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Wall distance:</strong> maximum half spacing from walls</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Ceiling distance:</strong> 25-600 mm below ceiling (typically 25-150 mm)</li>
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
              <h3 className="text-[17px] font-semibold text-white">Ceiling Height Considerations</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Ceiling height affects smoke behaviour and detector performance:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Height Effects:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Up to 10.5 m:</strong> standard spacing typically applies</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>10.5-12 m:</strong> reduced spacing may be needed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Above 12 m:</strong> consider beam detectors or specialist solutions</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Stratification: hot smoke may cool before reaching high ceilings and form a layer below ceiling level.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Beams and Obstructions</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Downstand beams and obstructions affect smoke flow and detector coverage:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Beam Guidance:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Beams less than 10% ceiling height:</strong> generally ignore for spacing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Beams over 600 mm depth:</strong> may create bays requiring separate detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Bay width:</strong> if less than 7 m, single bay may be acceptable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Position:</strong> centre detectors within bays, not directly under beams</li>
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
            <p className="text-[15px] text-white/80 mb-3">A warehouse has a flat ceiling at 8 m height with structural beams creating 4 m wide bays, each beam projecting 800 mm below ceiling. How should detectors be positioned?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> With 800 mm deep beams (over 600 mm threshold), each bay should be treated as a separate detection area. Since bays are 4 m wide (less than 7 m), a single row of detectors centred in each bay may suffice, but spacing between detectors should meet standard requirements.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">HVAC and Airflow Effects</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Airflow from ventilation systems affects smoke travel and detection:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">HVAC Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Diffusers:</strong> keep detectors at least 0.5 m from air supply diffusers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>High airflow:</strong> may dilute smoke - consider closer spacing or duct detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Return air:</strong> duct detectors can provide early warning in recirculating systems</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Air changes:</strong> very high air change rates may warrant specialist advice</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Beam Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Beam (optical beam) detectors are suitable for large, high spaces:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Beam Detector Applications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>High ceilings:</strong> effective up to 25 m or more depending on type</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Large spans:</strong> paths up to 100 m possible with some models</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Mounting height:</strong> position within 600 mm of ceiling, or at stratification level</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Coverage width:</strong> typically 7.5 m either side of beam path</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Beam detectors offer good maintenance access compared to point detectors at height.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A sports hall has a ceiling height of 14 m. Why might point smoke detectors be problematic, and what alternative should be considered?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> At 14 m, smoke may stratify below ceiling level before reaching point detectors. Beam detectors mounted at an appropriate level (potentially multiple levels for stratification) or aspirating detection should be considered. Point detector maintenance access is also challenging at this height.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Sloped and Irregular Ceilings</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Non-flat ceilings require special consideration for detector positioning:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Sloped Ceiling Rules:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Apex position:</strong> detector within 600 mm horizontally of highest point</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Coverage:</strong> maintain horizontal spacing requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Steep slopes:</strong> may need detectors on sloped surface plus apex</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Valleys:</strong> treat like beams - smoke may collect in troughs</li>
                </ul>
              </div>
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
                  Draw detector positions on scaled drawings and verify spacing with measurements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Visit site to assess ceiling obstructions not shown on drawings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider maintenance access when positioning high-level detectors
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
                  Exceeding maximum spacing without documented justification
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Ignoring deep beams that create separate smoke reservoirs
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Positioning detectors directly in HVAC airflow paths
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
            { q: "Can I exceed standard spacing with risk assessment justification?", a: "BS 5839-1 allows engineered solutions with appropriate justification, but spacing deviations should be documented and agreed with the responsible person and AHJ if applicable." },
            { q: "How do I handle suspended ceilings with voids?", a: "Voids may need separate detection depending on contents (cables, combustibles) and construction. Treat void detection as a separate zone where installed." },
            { q: "What spacing applies to multi-sensor detectors?", a: "Multi-sensor detectors should generally be spaced according to the most restrictive element (typically heat) unless manufacturer guidance indicates otherwise." },
            { q: "Do aspirating systems have different spacing rules?", a: "Yes - aspirating detection has its own design criteria based on sampling pipe layout and hole spacing. Follow manufacturer guidance and EN 54-20 requirements." },
            { q: "How close to walls can detectors be mounted?", a: "Detectors should not be closer than 0.5 m from walls to avoid dead air spaces, but should be within half the standard spacing distance for coverage." },
            { q: "What if the room is smaller than standard spacing allows?", a: "Small rooms still need at least one detector regardless of spacing calculations. A single detector in a small room is acceptable." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of detector spacing with 10 questions.</p>
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
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section4;
