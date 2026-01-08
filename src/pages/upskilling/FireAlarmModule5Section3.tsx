import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw, Radio, Volume2, Eye, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Device Installation - Fire Alarm Course";
const DESCRIPTION = "Learn about detector mounting, manual call point positioning and sounder installation requirements per BS 5839-1.";

const FireAlarmModule5Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'At what height should manual call points (MCPs) be mounted according to BS 5839-1?',
      options: [
        '0.8m to 1.0m above floor level',
        '1.4m above floor level to the operating element',
        '1.8m above floor level',
        'Any height convenient for the installer'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 recommends MCPs be mounted at 1.4m above floor level to the operating element for accessibility and compliance with DDA requirements.'
    },
    {
      id: 2,
      question: 'What is the maximum travel distance to an MCP from any point on an escape route?',
      options: [
        '15m',
        '30m',
        '45m',
        '60m'
      ],
      correctAnswer: 2,
      explanation: 'MCPs should be positioned so that no person need travel more than 45m to reach a call point on the floor. Near exits is preferable.'
    },
    {
      id: 3,
      question: 'What is the typical mounting height for point-type smoke detectors on flat ceilings?',
      options: [
        'Within 500mm of walls',
        'At ceiling level or within 50mm of ceiling',
        '300mm below ceiling level',
        'At any height above 2m'
      ],
      correctAnswer: 1,
      explanation: 'Point detectors should be mounted at ceiling level or within 50mm of the ceiling surface to detect rising smoke effectively.'
    },
    {
      id: 4,
      question: 'What minimum sound level must fire alarm sounders achieve at bed-head level in sleeping accommodation?',
      options: [
        '55 dB(A)',
        '65 dB(A)',
        '75 dB(A)',
        '85 dB(A)'
      ],
      correctAnswer: 2,
      explanation: 'BS 5839-1 requires a minimum of 75 dB(A) at bed-head level in sleeping areas to ensure occupants are awakened by the alarm.'
    },
    {
      id: 5,
      question: 'What is the minimum sound level required throughout all other areas of a building?',
      options: [
        '55 dB(A)',
        '65 dB(A)',
        '75 dB(A)',
        '85 dB(A)'
      ],
      correctAnswer: 1,
      explanation: 'A minimum of 65 dB(A) is required throughout all areas of the building, or 5 dB(A) above ambient noise if this is higher.'
    },
    {
      id: 6,
      question: 'How far from a wall corner should a point detector be positioned?',
      options: [
        'No minimum distance',
        'At least 300mm from corners and obstructions',
        'At least 1m from corners',
        'Within 100mm of corner'
      ],
      correctAnswer: 1,
      explanation: 'Detectors should be positioned at least 300mm from walls and obstructions to avoid dead air spaces where smoke may not reach the detector.'
    },
    {
      id: 7,
      question: 'When installing beam detectors, what is the typical height range above floor level?',
      options: [
        '1-2m',
        '3-5m',
        '6-25m typically',
        'Any height'
      ],
      correctAnswer: 2,
      explanation: 'Beam detectors are typically used for high ceiling applications, generally between 6m and 25m, where point detectors would be impractical.'
    },
    {
      id: 8,
      question: 'What should be considered when positioning visual alarm devices (VADs)?',
      options: [
        'Colour preference only',
        'Coverage pattern, mounting height and potential obstructions',
        'Distance from sounders only',
        'Building age'
      ],
      correctAnswer: 1,
      explanation: 'VADs must be positioned considering their coverage pattern, mounting height requirements, and any obstructions that could reduce visibility.'
    },
    {
      id: 9,
      question: 'What special requirement applies to MCPs at final exits?',
      options: [
        'No special requirement',
        'Must be adjacent to and on the same side as the door opening',
        'Must be above 2m height',
        'Must be red in colour'
      ],
      correctAnswer: 1,
      explanation: 'MCPs at final exits should be positioned adjacent to and on the same side as the door opening to allow easy activation when evacuating.'
    },
    {
      id: 10,
      question: 'What fixing consideration is important for detector bases in suspended ceilings?',
      options: [
        'Any clip will do',
        'Independent support to structure, not relying on ceiling tile alone',
        'Ceiling tile can support all detectors',
        'Magnetic fixing preferred'
      ],
      correctAnswer: 1,
      explanation: 'Detector bases in suspended ceilings must have independent support to the structure above, not rely solely on ceiling tiles which may not support the weight.'
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
            <Link to="../module-5">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 5</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Radio className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-orange-400 uppercase tracking-wide">
            Section 3 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Device Installation
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Detector mounting, manual call point positioning, sounder installation and visual alarm device placement per BS 5839-1.
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-orange-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Detectors</strong> mount at ceiling level, 300mm from walls/obstructions, with spacing per manufacturer data</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>MCPs</strong> at 1.4m height, within 45m travel distance, adjacent to exits on escape routes</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Sounders</strong> must achieve 75 dB(A) at bed-head in sleeping areas, 65 dB(A) elsewhere</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Install point-type detectors at correct height and spacing",
            "Position manual call points for accessibility and coverage",
            "Mount sounders to achieve required sound levels",
            "Install visual alarm devices with appropriate coverage",
            "Select correct fixings for different substrates",
            "Apply BS 5839-1 siting requirements to real scenarios"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-orange-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Point Detector Installation</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Point-type detectors (smoke, heat, multi-sensor) are the <strong className="text-white">most common device type</strong>. Correct positioning ensures reliable detection of fire conditions.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Mounting Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />At ceiling level or within 50mm of ceiling surface</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Minimum 300mm from walls and obstructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />500mm from luminaires and HVAC outlets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Coverage spacing per manufacturer and ceiling height</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Typical Coverage (flat ceilings up to 10.5m):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Optical smoke: 7.5m radius typical</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Heat Grade A1: 5.3m radius typical</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Always check manufacturer's specific data sheets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Manual Call Point Positioning</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Manual call points (MCPs) allow building occupants to <strong className="text-white">manually trigger the alarm</strong>. Positioning is critical for accessibility and rapid evacuation.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Height & Position</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>1.4m to operating element</li>
                    <li>Unobstructed access</li>
                    <li>Adjacent to final exits</li>
                    <li>On escape routes</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Coverage</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>45m maximum travel distance</li>
                    <li>Each floor level covered</li>
                    <li>Each fire exit location</li>
                    <li>Stairway landings</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  MCPs at final exits must be positioned on the same side as the door opening so occupants can activate while evacuating.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Sounder Installation</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm sounders must achieve <strong className="text-white">minimum sound pressure levels</strong> throughout the building to ensure all occupants are alerted.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">Sound Level Requirements:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Sleeping areas:</strong> 75 dB(A) minimum at bed-head level</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>All other areas:</strong> 65 dB(A) minimum throughout</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>High ambient noise:</strong> 5 dB(A) above ambient level</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Plant rooms:</strong> Consider hearing protection requirements</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Positioning Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Corridor sounders typically at 15m centres</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Consider sound absorption of room furnishings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Account for closed doors reducing sound transmission</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Mount at high level for better distribution</li>
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
            <p className="text-[15px] text-white/80 mb-3">A hotel bedroom door when closed reduces corridor sounder level to 60 dB(A). Is this compliant for sleeping accommodation?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - 75 dB(A) is required at bed-head level in sleeping accommodation. A sounder or sounder-beacon would need to be installed within the bedroom to achieve compliance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Visual Alarm Devices (VADs)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Visual alarm devices supplement sounders to alert those who are <strong className="text-white">deaf or hard of hearing</strong>, or in areas where audible alarms may not be effective.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">VAD Categories per BS EN 54-23:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>W (Wall):</strong> Mounted on wall, coverage in front</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>C (Ceiling):</strong> Mounted on ceiling, coverage below</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>O (Open):</strong> Coverage in all directions</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Installation Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Coverage volume specified by manufacturer</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Avoid positioning where direct sunlight competes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Consider room layout and potential obstructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Synchronisation required for multiple VADs in view</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Fixing Methods & Substrates</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Selecting the <strong className="text-white">correct fixings</strong> for different substrates ensures devices remain secure throughout their service life.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Common Substrates & Fixings:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Concrete/masonry:</strong> Nylon plugs with appropriate screws</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Plasterboard:</strong> Spring toggles or cavity fixings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Suspended ceilings:</strong> Independent support to structure</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Metal surfaces:</strong> Self-tapping screws or threaded studs</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Detector bases in suspended ceilings must be independently supported from the structure above - never rely on ceiling tiles alone.
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
            <p className="text-[15px] text-white/80 mb-3">Why must multiple VADs visible from the same location be synchronised?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Unsynchronised flashing can cause disorientation and may trigger photosensitive conditions in susceptible individuals. Synchronisation ensures a consistent, recognisable alarm signal.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Special Detector Types</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Beyond point detectors, several <strong className="text-white">specialist detector types</strong> address specific application requirements.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Beam Detectors:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Suitable for high ceilings (typically 6-25m)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Transmitter and receiver require stable mounting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Avoid locations with structural movement</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Beam path must remain unobstructed</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Duct Detectors:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Installed in HVAC ductwork for smoke detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Coordinate with mechanical contractor for positioning</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Sampling tubes installed per manufacturer guidance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Access required for maintenance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Aspirating Smoke Detection (ASD):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Very early warning detection for high-value areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Pipe network draws air samples to detector unit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Pipe routing and sampling hole positions critical</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Requires specialist design and installation</li>
                </ul>
              </div>
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
            <p className="text-[15px] text-white/80 mb-3">A warehouse has a 15m high ceiling. Which detector type would be most appropriate and why?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Beam detectors would be appropriate for a 15m ceiling. Point detectors become less effective at greater heights due to smoke cooling and dispersing before reaching ceiling level. Beam detectors can be positioned at optimal height for early detection.</p>
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
                  Mark detector positions on ceiling grid before installing - ensures even spacing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Use a laser level for consistent MCP heights along corridors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Install detector bases at first fix, heads at second fix after decoration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Photograph device locations before ceiling tiles are installed
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
                  Positioning detectors too close to air conditioning vents
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Installing MCPs behind doors or in locations not visible to occupants
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Relying on ceiling tiles to support detector bases without independent fixing
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Assuming corridor sounders will achieve required levels in bedrooms
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
            { q: "Can smoke detectors be installed in kitchens?", a: "Generally no - heat detectors are preferred due to cooking fumes causing false alarms. Multi-sensor detectors with appropriate algorithms may be suitable in some situations." },
            { q: "What about detectors in bathrooms and shower rooms?", a: "Heat detectors can be used if detection is required. Smoke detectors are generally unsuitable due to steam. Consider whether detection is actually needed based on risk assessment." },
            { q: "How do I handle sloped ceilings?", a: "Detectors should be mounted at the apex or within 600mm of it. For steeper pitches, additional detectors may be needed at lower levels. Refer to BS 5839-1 guidance." },
            { q: "Can MCPs be recessed into walls?", a: "Yes, provided the operating element remains easily identifiable and accessible. The recess must not obstruct operation or visibility." },
            { q: "What if the design shows fewer sounders than needed for coverage?", a: "Raise a technical query with the designer before proceeding. Sound level verification at commissioning may reveal the issue - better to address early." },
            { q: "Do all VADs need to be the same colour?", a: "VADs for fire alarm should produce red or white flashing light. Consistency within a building aids recognition. Check specification requirements." }
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of device installation with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-orange-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-orange-500/20 border-orange-500/50 text-white'
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
            <Link to="../module-5/section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-5/section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule5Section3;
