import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Hand, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Manual Call Points - Fire Alarm Course Module 2";
const DESCRIPTION = "Learn about manual call point requirements, positioning, mounting heights, accessibility, and BS 5839-1 compliance for fire alarm systems.";

const FireAlarmModule2Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data - 10 questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the recommended mounting height for a manual call point according to BS 5839-1?',
      options: ['1.0 m plus or minus 100 mm', '1.4 m plus or minus 200 mm', '1.6 m plus or minus 200 mm', '1.2 m plus or minus 100 mm'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 recommends MCP centres at 1.4 m above finished floor level with a tolerance of plus or minus 200 mm for accessibility.'
    },
    {
      id: 2,
      question: 'What is the maximum travel distance to a manual call point in a normal risk environment?',
      options: ['25 m', '30 m', '45 m', '60 m'],
      correctAnswer: 2,
      explanation: 'Typical maximum travel distance is 45 m in normal risk premises. Reduce to around 25 m in higher-risk or unfamiliar premises.'
    },
    {
      id: 3,
      question: 'Where must manual call points be positioned?',
      options: [
        'At all final exits only',
        'At storey exits, final exits, and along escape routes',
        'Next to fire extinguishers only',
        'In plant rooms only'
      ],
      correctAnswer: 1,
      explanation: 'Place MCPs at storey exits, final exits and along escape routes so occupants can raise the alarm quickly while evacuating.'
    },
    {
      id: 4,
      question: 'How often should each MCP be tested according to BS 5839-1?',
      options: ['Every day', 'Every week (rotating different MCP)', 'Every month', 'Every 6 months'],
      correctAnswer: 1,
      explanation: 'Weekly user tests normally activate a different MCP each time, with records maintained in the logbook.'
    },
    {
      id: 5,
      question: 'What colour should a manual call point typically be?',
      options: ['Yellow', 'Green', 'Red', 'Blue'],
      correctAnswer: 2,
      explanation: 'Manual call points should be red to ensure high visibility and immediate recognition as a fire safety device.'
    },
    {
      id: 6,
      question: 'What should be done with a manual call point after it has been activated?',
      options: [
        'It resets automatically',
        'It must be manually reset using a key or tool',
        'It should be replaced',
        'Nothing, it stays activated'
      ],
      correctAnswer: 1,
      explanation: 'MCPs latch when activated and must be manually reset using a key or tool to prevent accidental reactivation and confirm investigation.'
    },
    {
      id: 7,
      question: 'Why is the travel distance to MCPs reduced in high-risk or unfamiliar environments?',
      options: [
        'To save on installation costs',
        'People may be less familiar with escape routes and need faster alarm activation',
        'MCPs are cheaper in bulk',
        'It looks better aesthetically'
      ],
      correctAnswer: 1,
      explanation: 'In high-risk or unfamiliar buildings, reduced travel distances ensure occupants can quickly raise the alarm even if unfamiliar with the layout.'
    },
    {
      id: 8,
      question: 'What type of protective cover might be used on MCPs in vandal-prone areas?',
      options: [
        'Metal cage that prevents operation',
        'Transparent cover that does not impede operation',
        'Thick padding',
        'No cover should be used'
      ],
      correctAnswer: 1,
      explanation: 'Protective covers should not prevent or significantly delay operation. Transparent covers provide protection while maintaining accessibility.'
    },
    {
      id: 9,
      question: 'What is the purpose of signage near manual call points?',
      options: [
        'Decoration only',
        'To indicate the MCP location if not immediately obvious',
        'Required by law in all cases',
        'To advertise the manufacturer'
      ],
      correctAnswer: 1,
      explanation: 'Signage helps identify MCP locations where visibility might be limited or the MCP is not immediately obvious to building users.'
    },
    {
      id: 10,
      question: 'In outdoor or harsh environments, what special consideration is needed for MCPs?',
      options: [
        'They should not be installed',
        'Use standard indoor MCPs',
        'Use weatherproof MCPs rated for the environment',
        'Paint them a different colour'
      ],
      correctAnswer: 2,
      explanation: 'Outdoor or harsh environment MCPs must be weatherproof and protected against physical damage, moisture, and temperature extremes.'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 2</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Hand className="h-7 w-7 text-green-400" />
          </div>
          <span className="text-[11px] font-medium text-green-400 uppercase tracking-wide">
            Section 3 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Manual Call Points
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding manual call point requirements, positioning, mounting heights, and accessibility per BS 5839-1.
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
        <Card variant="ios-elevated" className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-green-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Mount at 1.4 m</strong> (plus or minus 200 mm) - accessible for standing adults and wheelchair users</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Maximum 45 m travel distance</strong> - reduce to 25 m for high-risk or unfamiliar premises</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Red colour, clearly visible</strong> - positioned at storey exits, final exits and escape routes</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "State the correct mounting height for MCPs per BS 5839-1",
            "Apply travel distance requirements for different risk categories",
            "Identify key positioning requirements for accessibility",
            "Explain MCP operation, testing and resetting procedures",
            "Select appropriate MCPs for different environments",
            "Understand signage and identification requirements"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-green-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Introduction to Manual Call Points</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Manual Call Points (MCPs) are a <strong className="text-white">critical component</strong> of fire detection and alarm systems, allowing any building occupant to trigger an alarm manually in the event of a fire.</p>
              <p>They provide a human-activated safety mechanism that complements automatic detection devices such as smoke, heat, or multisensor detectors.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Functions:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Enable manual alarm activation by any occupant</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Complement automatic detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Provide alarm capability even if detectors fail</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Mounting Height Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 specifies precise mounting height requirements to ensure <strong className="text-white">accessibility for all users</strong>.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Height Specification:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Centre of operating element:</strong> 1.4 m above FFL</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Tolerance:</strong> Plus or minus 200 mm (1.2 m to 1.6 m)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Accessibility:</strong> Usable by standing adults and wheelchair users</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">This height allows access for most building occupants while preventing accidental activation.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Positioning and Travel Distances</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>MCPs must be located on <strong className="text-white">escape routes</strong> with appropriate travel distances to ensure quick activation during evacuation.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-green-400 mb-2">Normal Risk Premises</p>
                  <ul className="space-y-1 text-[13px]">
                    <li><strong>Maximum travel:</strong> 45 m</li>
                    <li>Offices, shops, schools</li>
                    <li>Staff familiar with layout</li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-amber-400 mb-2">High-Risk/Unfamiliar</p>
                  <ul className="space-y-1 text-[13px]">
                    <li><strong>Maximum travel:</strong> 25 m</li>
                    <li>Public buildings, hotels</li>
                    <li>Visitors unfamiliar with building</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Required Locations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />At every storey exit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />At every final exit from the building</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Along escape routes at appropriate intervals</li>
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
            <p className="text-[15px] text-white/80 mb-3">A three-storey office building had MCPs installed only at final exits on the ground floor. Is this compliant?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - MCPs must be provided at every storey exit, not just final exits. Staff on upper floors would have to travel down stairs to raise the alarm, losing valuable time.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Visibility and Accessibility</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>MCPs must be <strong className="text-white">clearly visible and unobstructed</strong> to ensure immediate recognition and access.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Colour:</strong> Red for high visibility</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Signage:</strong> Where not immediately obvious</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Illumination:</strong> Consider illuminated MCPs in low-light areas</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" /><strong>Not obstructed:</strong> By doors, furniture, or stored items</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Operation and Resetting</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Modern MCPs use various activation mechanisms and require <strong className="text-white">manual resetting</strong> after operation.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Activation Methods:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Break glass (traditional frangible element)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Resettable plastic element (modern type)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Lift flap and press button</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">After Activation:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />MCPs latch in activated state</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Require key or tool to reset</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Glass replacement needed for break-glass types</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Environmental and Special Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Different environments require <strong className="text-white">appropriate MCP specifications</strong>.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Special Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Outdoor locations:</strong> Weatherproof (IP65+) MCPs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Vandal-prone areas:</strong> Protective covers (transparent)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Hazardous areas:</strong> ATEX/intrinsically safe versions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Corrosive environments:</strong> Stainless steel or plastic</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Protective covers must not prevent or significantly delay operation - use transparent hinged covers that sound a local alarm when lifted.
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
            <p className="text-[15px] text-white/80 mb-3">An MCP is positioned behind a door that, when open, obscures it from view. Is this acceptable?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - MCPs must be visible and unobstructed. Relocate to a position where it remains visible regardless of door position, or use signage to indicate its location.</p>
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
                  Walk the escape routes to verify travel distances - do not rely solely on drawings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider occupants with mobility impairments when positioning MCPs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Use resettable MCPs where possible to reduce maintenance costs
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
                  Installing MCPs behind opening doors, making them inaccessible
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Mounting MCPs too high or too low outside the specified tolerance
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not providing MCPs at every storey exit in multi-storey buildings
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
            { q: "Do MCPs need to be on the same circuit as automatic detectors?", a: "MCPs can be on the same zones as detectors, but are often zoned separately to help identify whether the alarm was manually or automatically initiated." },
            { q: "Can MCPs be tested using the panel test function?", a: "No - MCPs must be physically operated during testing to verify mechanical operation, not just electrical function." },
            { q: "What if an MCP is constantly being vandalised?", a: "Use protective covers with local sounders. Consider CCTV coverage. Do not remove the MCP - consider relocating if genuinely problematic." },
            { q: "Are blue MCPs acceptable?", a: "No - MCPs must be red per BS 5839-1. Blue indicates gas release systems, not fire alarms." },
            { q: "Do MCPs need unique addresses in addressable systems?", a: "Yes - each MCP should have a unique address to identify its exact location on the system." },
            { q: "Can I use wireless MCPs?", a: "Yes - wireless MCPs are available and must comply with the same positioning requirements as wired units." }
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
        <Card variant="ios-elevated" className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of manual call points with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-green-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-green-500/20 border-green-500/50 text-white'
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
            <Link to="/study-centre/upskilling/fire-alarm-module-2-section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-2-section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule2Section3;
