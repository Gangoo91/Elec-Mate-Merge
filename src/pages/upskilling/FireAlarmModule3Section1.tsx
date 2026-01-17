import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Map, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Zone Planning Principles - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 zone planning principles: aligning zones with fire compartments, zone size limits, search distances, and zone plan requirements.";

const FireAlarmModule3Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is a common maximum area for a detection zone under BS 5839-1?',
      options: ['500 m2', '1000 m2', '2000 m2', 'No limit'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 typically limits a zone to about 2000 m2 to support quick location of alarms.'
    },
    {
      id: 2,
      question: 'Why should zones align with fire compartments?',
      options: ['For decoration', 'To simplify cabling', 'To aid firefighting and evacuation by matching building fabric', 'To reduce device count'],
      correctAnswer: 2,
      explanation: 'Zones that follow fire compartments make it faster to understand fire spread and respond safely.'
    },
    {
      id: 3,
      question: 'What is the typical maximum initial search distance within a zone?',
      options: ['10 m', '20 m', '30 m', '60 m'],
      correctAnswer: 2,
      explanation: 'Limiting search distance to about 30 m helps responders find the alarm source quickly.'
    },
    {
      id: 4,
      question: 'How should vertical shafts (stairs/lifts) be zoned?',
      options: ['As part of adjacent rooms', 'As a distinct zone per vertical shaft', 'Combine all shafts into one zone', 'Never zoned'],
      correctAnswer: 1,
      explanation: 'Stair/lift shafts are typically separate zones to reflect vertical risk and aid response.'
    },
    {
      id: 5,
      question: 'What must be provided at the CIE relating to zones?',
      options: ['A random sketch', 'No drawing is needed', 'A clear zone plan with "You are here", orientation and boundaries', 'Only a device list'],
      correctAnswer: 2,
      explanation: 'Provide a legible, oriented zone plan located at the control and indicating equipment.'
    },
    {
      id: 6,
      question: 'What is the minimum general recommendation for zones per storey?',
      options: ['No zoning required', 'At least one zone per floor', 'Multiple storeys can share one zone', 'Only ground floor needs zones'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 generally recommends at least one zone per storey as a minimum, with large floors subdivided further.'
    },
    {
      id: 7,
      question: 'Why should plant rooms typically be separate zones?',
      options: ['To save money', 'They are low risk areas', 'To enable quick identification of high-risk areas requiring immediate attention', 'Plant rooms do not need detection'],
      correctAnswer: 2,
      explanation: 'Plant rooms often contain high-risk equipment and warrant separate zoning for rapid response and clear indication.'
    },
    {
      id: 8,
      question: 'What should happen to zone plans after building alterations?',
      options: ['Leave them unchanged', 'Update them and record changes in the logbook', 'Remove them entirely', 'Only update every 5 years'],
      correctAnswer: 1,
      explanation: 'Zone plans must be kept up to date after alterations, with changes recorded in the system logbook for compliance and safety.'
    },
    {
      id: 9,
      question: 'How should zone identification labels be chosen?',
      options: ['Random numbers', 'Cryptic codes only the installer knows', 'Clear names matching drawings and signage', 'Leave them as factory defaults'],
      correctAnswer: 2,
      explanation: 'Zone labels must be clear and consistent across panel displays, drawings, and site signage so responders instantly understand locations.'
    },
    {
      id: 10,
      question: 'What is a key problem with zones that cross fire compartment boundaries?',
      options: ['It saves cable runs', 'It confuses responders and undermines compartmentation strategy', 'It increases device count', 'It improves aesthetics'],
      correctAnswer: 1,
      explanation: 'Zones crossing compartment boundaries create confusion about fire location and undermine the building fire containment strategy.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Map className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 1 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Zone Planning Principles
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding BS 5839-1 zone planning principles, fire compartment alignment, and zone plan requirements.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            20-25 mins
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
              <span><strong>Zones</strong> translate building layout into clear indications for responders and aid rapid fire location</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Align with compartments</strong> - zones should follow fire compartment boundaries and building structure</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Key limits</strong>: max 2000 m2, one zone per floor minimum, 30 m search distance</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain the purpose and principles of zone planning",
            "Align detection zones with fire compartments and building boundaries",
            "Apply typical limits for zone size and search distance",
            "Plan vertical zoning for stairs, lifts and shafts",
            "Prepare compliant, legible zone plans at the CIE",
            "Identify common zone planning mistakes and pitfalls"
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
              <h3 className="text-[17px] font-semibold text-white">What Is Zone Planning?</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Zone planning divides a building into logical areas for fire detection purposes. Each zone provides a <strong className="text-white">distinct indication</strong> at the fire alarm control panel, enabling responders to quickly locate the origin of an alarm.</p>
              <p>Effective zone planning is critical for fire safety - it directly affects how quickly fire brigade personnel and building management can identify and respond to a fire event.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">BS 5839-1 Zone Size Limits</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 provides guidance on zone sizing to ensure alarms can be investigated promptly:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Limits:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Zone area:</strong> commonly not more than 2000 m2</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Storeys:</strong> generally one zone per floor minimum</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Search distance:</strong> aim for 30 m or less within a zone</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Vertical circulation:</strong> treat stairs/lifts as separate zones</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Large open floors should be subdivided to maintain manageable search distances.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Aligning Zones with Fire Compartments</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire compartments are structural divisions designed to contain fire spread. <strong className="text-amber-400">Zones should follow compartment lines</strong> to provide meaningful indications during a fire event.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Compartment Alignment Principles:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Follow compartment lines and structural boundaries</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Avoid zones straddling multiple compartments</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Provide distinct zones for protected escape routes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Reflect phased/defend-in-place strategies with appropriate zones</li>
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
            <p className="text-[15px] text-white/80 mb-3">A large open-plan office of 3500 m2 occupies an entire floor. How should it be zoned?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The floor should be subdivided into at least two zones (ideally more) to keep each zone under 2000 m2 and maintain a 30 m search distance. Zone boundaries could follow logical divisions such as department areas or structural grid lines.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Vertical Zoning Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Vertical circulation routes present specific fire risks and require careful zone planning:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Vertical Zone Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Stair cores:</strong> typically separate zones for each protected stair</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Lift shafts:</strong> zone separately from adjacent floors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Service risers:</strong> consider separate zoning where significant</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Voids:</strong> zone where protected or containing significant cabling</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Vertical zones enable rapid identification if fire enters a protected escape route.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Zone Plan Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>A zone plan must be displayed at the fire alarm control equipment to aid emergency response:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Zone Plan Must Include:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>"You are here"</strong> marker showing CIE location</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Orientation</strong> (north arrow) and floor levels</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Clear zone boundaries</strong> with consistent labelling</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Key facilities:</strong> stairs, lifts, risers, plant rooms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Legend</strong> for symbols and colours used</li>
                </ul>
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
            <p className="text-[15px] text-white/80 mb-3">A building has undergone refurbishment with new partitions and room layouts. What action is required for the fire alarm system?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> The zone plan at the CIE must be updated to reflect the new layout. Changes should be recorded in the system logbook, and detector positions may need review to ensure continued compliance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Zone Identification and Labelling</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Clear, consistent zone identification is essential for emergency response:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Labelling Best Practice:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Use clear names and numbers (e.g., "Floor 03 - East Office")</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Ensure panel displays match drawings and site signage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Avoid cryptic codes that only installers understand</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Maintain consistency across all documentation</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Responders must instantly understand zone locations - unclear labelling delays response and risks lives.
                </p>
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
                  Obtain fire compartment drawings early in design and plan zones to match
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider cause-and-effect requirements when defining zone boundaries
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Walk the site with the zone plan to verify it makes sense in practice
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
                  Zones that cross fire compartment boundaries without clear rationale
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Excessive zone size leading to long search distances and confusion
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Missing or outdated zone plans at the CIE after building changes
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
            { q: "Can a zone span multiple floors?", a: "Generally no - BS 5839-1 recommends at least one zone per floor. Vertical shafts (stairs/lifts) are exceptions as they inherently span multiple levels." },
            { q: "How do voids affect zone planning?", a: "Ceiling voids should be zoned where they are protected spaces or contain significant fire risk/cabling. Ensure void detection indications make sense to responders." },
            { q: "What if the building layout changes after installation?", a: "Zone plans must be updated and changes recorded in the logbook. Detector positions may need review to ensure coverage remains compliant." },
            { q: "Should plant rooms always be separate zones?", a: "Generally yes - plant rooms often contain high-risk equipment and separate zoning enables rapid identification and targeted response." },
            { q: "How do I coordinate zones with phased evacuation?", a: "Zone boundaries should support the evacuation strategy, enabling selective alert/evacuate signalling by floor or area as defined in the cause-and-effect." },
            { q: "What is the relationship between zones and loops?", a: "Zones are logical divisions for indication purposes. Loops are wiring topology. A single loop can serve multiple zones, and a zone can span multiple loops." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of zone planning principles with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section1;
