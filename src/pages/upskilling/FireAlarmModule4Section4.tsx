import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Route, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section4 = () => {
  useSEO({
    title: 'Wiring Methods & Protection | Fire Alarm Module 4 Section 4',
    description: 'Learn about cable routing, segregation, mechanical protection and fixings to prevent premature collapse per BS 5839-1 and BS 7671.'
  });

  // Quiz questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Segregation reduces:',
      options: ['Cable cost', 'EMC interference and fault risk', 'Colour choice', 'Fire rating requirements'],
      correctAnswer: 1,
      explanation: 'Segregation from LV power and other services helps avoid interference and faults.'
    },
    {
      id: 2,
      question: 'Fixings must:',
      options: ['Be plastic where hidden', 'Resist premature collapse in fire conditions', 'Be optional', 'Use cable ties only'],
      correctAnswer: 1,
      explanation: 'Use metal fixings/supports to prevent collapse (BS 7671 Reg 521.10.202).'
    },
    {
      id: 3,
      question: 'Penetrations should be:',
      options: ['Left open', 'Sealed with appropriate fire-stopping systems', 'Covered with tape', 'Ignored'],
      correctAnswer: 1,
      explanation: 'Maintain fire compartmentation; use approved sealing systems.'
    },
    {
      id: 4,
      question: 'The minimum segregation distance between fire alarm cables and 230V power cables should be:',
      options: ['No separation needed', 'As per manufacturer guidance, typically 300mm or use physical barrier', 'Exactly 50mm always', '1 metre minimum'],
      correctAnswer: 1,
      explanation: 'Follow manufacturer recommendations; typically 300mm separation or use screening/barriers to prevent EMC issues and reduce fault risk.'
    },
    {
      id: 5,
      question: 'Fire-resisting cable support spacing should typically not exceed:',
      options: ['No limit', 'Manufacturer recommendations, commonly 300-400mm for horizontal runs', '1 metre', '2 metres'],
      correctAnswer: 1,
      explanation: 'Close support spacing maintains cable position and prevents premature collapse in fire; follow manufacturer data sheets.'
    },
    {
      id: 6,
      question: 'Cables passing through fire compartment walls must:',
      options: ['Be left with gaps around them', 'Be firestopped with tested systems maintaining compartmentation', 'Use expanding foam only', 'Be bundled tightly'],
      correctAnswer: 1,
      explanation: 'Use proprietary firestopping systems tested to maintain the fire resistance rating of the compartment boundary.'
    },
    {
      id: 7,
      question: 'When installing cables in ceiling voids, consider:',
      options: ['Hiding them behind insulation', 'Accessibility for testing/maintenance and protection from building trades', 'Installing without support', 'Using domestic cable'],
      correctAnswer: 1,
      explanation: 'Plan routes for access, protect from damage by other trades, and maintain proper support and separation.'
    },
    {
      id: 8,
      question: 'Vertical cable runs should be supported to prevent:',
      options: ['The cable looking untidy', 'Mechanical stress and cable sheath damage under its own weight', 'People seeing them', 'Improved performance'],
      correctAnswer: 1,
      explanation: 'Adequate vertical support prevents cable weight causing sheath damage, core breakage or joint failure over time.'
    },
    {
      id: 9,
      question: 'Where crossing LV power, you should:',
      options: ['Tape together', 'Cross at right angles and maintain separation', 'Twist around each other', 'Share the same conduit without separation'],
      correctAnswer: 1,
      explanation: 'Reduce coupling and maintain segregation.'
    },
    {
      id: 10,
      question: 'Containment choice should consider:',
      options: ['Only colour', 'Environment, fire performance and EMC', 'Cheapest cost', 'What is in stock'],
      correctAnswer: 1,
      explanation: 'Select appropriate materials and construction.'
    }
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(Array(questions.length).fill(undefined));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (idx: number) => {
    const next = [...selectedAnswers];
    next[currentQuestion] = idx;
    setSelectedAnswers(next);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(q => q + 1);
    else setShowResults(true);
  };

  const handlePrevious = () => setCurrentQuestion(q => Math.max(0, q - 1));

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(undefined));
    setShowResults(false);
  };

  const score = selectedAnswers.reduce((acc, ans, i) => (ans === questions[i].correctAnswer ? acc + 1 : acc), 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module-4">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 4</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Route className="h-7 w-7 text-purple-400" />
          </div>
          <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wide">
            Section 4 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Wiring Methods & Protection
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Master cable routing rules, segregation requirements, mechanical protection and fire-resistant fixings per BS 5839-1 and BS 7671.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            25-30 minutes
          </span>
        </div>
      </section>

      {/* In 30 Seconds Card */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-white/80 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-400" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[13px] text-white/70">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Segregate fire alarm cables from LV power (typically 300mm or physical barrier) to prevent interference</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Use metallic fixings (not plastic alone) to prevent premature collapse in fire - BS 7671 Reg 521.10.202</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Seal all penetrations through fire compartment walls with tested firestopping systems</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Apply correct segregation distances from power cables and other services',
            'Select appropriate fixings and supports for fire alarm cables',
            'Maintain fire compartmentation with correct penetration sealing',
            'Route cables for accessibility and protection from damage',
            'Coordinate with BS 7671 requirements for wiring systems',
            'Document and photograph installation for handover records'
          ].map((outcome, idx) => (
            <Card key={idx} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-white/80">{outcome}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">01</span>
              <CardTitle className="text-[17px] text-white">Segregation Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Fire alarm cables must be segregated from power cables to prevent electromagnetic interference (EMC) and reduce fault risk.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Separation Distances</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Typically 300mm from LV power cables in free air</li>
                  <li>Use physical barrier (metallic) if closer separation needed</li>
                  <li>Screened cables reduce required separation</li>
                  <li>Follow manufacturer guidance for specific requirements</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Crossing Power Cables</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Cross at right angles to minimise coupling</li>
                  <li>Maintain minimum separation at crossing point</li>
                  <li>Consider additional screening if parallel runs unavoidable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">02</span>
              <CardTitle className="text-[17px] text-white">Cable Fixings and Supports</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              BS 7671 Regulation 521.10.202 requires fire alarm cables to be supported so they do not prematurely collapse in fire conditions.
            </p>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-2">Key Requirement:</h4>
              <p className="text-[13px]">
                Use metallic fixings and supports at intervals specified by the manufacturer. Plastic clips alone are not acceptable for fire alarm cables on escape routes.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Acceptable Methods:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Metal cable clips with metallic fixings to structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Cable basket/tray with metallic supports</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Metal conduit or trunking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Metallic cable ties at appropriate intervals</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Check 1 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios" className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-amber-200 mb-1">Quick Check</p>
                <p className="text-[13px] text-white/70">
                  Fire alarm cables are installed using plastic clips in a ceiling void. What regulation does this potentially breach, and what would you recommend?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Consider: BS 7671 Reg 521.10.202, premature collapse, escape routes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">03</span>
              <CardTitle className="text-[17px] text-white">Support Spacing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Support spacing must maintain cable position and prevent sagging or damage. Follow manufacturer recommendations.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Horizontal Runs</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Typically 300-400mm maximum spacing for FP cables</li>
                  <li>Closer spacing near changes of direction</li>
                  <li>Support immediately before and after entries/exits</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Vertical Runs</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Support to prevent cable weight causing damage</li>
                  <li>Use cleats or saddles at appropriate intervals</li>
                  <li>Consider thermal expansion for long vertical drops</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">04</span>
              <CardTitle className="text-[17px] text-white">Fire Compartment Penetrations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Cables passing through fire-resisting walls and floors must be sealed to maintain compartmentation. This is a life safety requirement.
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-[13px] text-amber-200">
                <strong>Critical:</strong> Use tested and certified firestopping systems. Expanding foam alone is rarely adequate. Maintain the fire resistance rating of the element being penetrated.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Firestopping Methods:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Intumescent sealants and mastics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Proprietary cable transits and sleeves</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Fire-resistant pillows and wraps</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Mortar or cement-based fillers for larger openings</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Check 2 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios" className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-amber-200 mb-1">Quick Check</p>
                <p className="text-[13px] text-white/70">
                  You discover that a contractor has used standard expanding foam to seal cable penetrations through a 60-minute fire wall. What action should you take?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">05</span>
              <CardTitle className="text-[17px] text-white">Route Planning</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Plan cable routes to protect cables from damage and allow future access for testing and maintenance.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Route Considerations</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Avoid areas of mechanical damage risk</li>
                  <li>Keep clear of heat sources and hot pipes</li>
                  <li>Plan for maintenance access</li>
                  <li>Consider coordination with other services</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Ceiling Voids</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Protect from building trades during construction</li>
                  <li>Route above access panels where possible</li>
                  <li>Maintain segregation in shared voids</li>
                  <li>Label routes for future identification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">06</span>
              <CardTitle className="text-[17px] text-white">Containment Selection</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Select containment systems appropriate to the environment, fire performance requirements and EMC considerations.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Metallic Containment</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Provides mechanical protection and EMC screening</li>
                  <li>Steel trunking, conduit or cable basket</li>
                  <li>Bond to earth for screening effectiveness</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Environmental Considerations</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Stainless steel or coated in corrosive environments</li>
                  <li>IP rating for external or wet locations</li>
                  <li>Fire-rated containment for enhanced circuits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pro Tips */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Pro Tips</h2>
        <div className="space-y-3">
          {[
            'Photograph all firestopping works before they are covered up - this evidence is valuable for handover and future maintenance',
            'Label cable routes at regular intervals and at penetration points for future identification',
            'Keep a record of segregation distances and containment types used for the O&M manual'
          ].map((tip, idx) => (
            <Card key={idx} variant="ios" className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-white/80">{tip}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Common Mistakes</h2>
        <div className="space-y-3">
          {[
            'Using plastic clips as sole support for fire alarm cables on escape routes',
            'Leaving cable penetrations unsealed or using inadequate firestopping materials',
            'Running fire alarm cables in shared containment with power cables without proper segregation'
          ].map((mistake, idx) => (
            <Card key={idx} variant="ios" className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-white/80">{mistake}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: 'Can I use plastic clips under metal trunking lids?', a: 'No - plastic clips cannot be the sole support. Use metallic clips or ensure the trunking lid provides adequate support.' },
            { q: 'How far should fire alarm cables be from LV power?', a: 'Typically 300mm in free air, or use physical barriers/screening. Follow manufacturer guidance for specific requirements.' },
            { q: 'Do I need to seal small gaps around cables?', a: 'Yes - all penetrations through fire compartment boundaries must be sealed with appropriate firestopping systems.' },
            { q: 'What documentation is needed for firestopping?', a: 'Record location, materials used, fire rating and photograph before covering. Include in handover documentation.' },
            { q: 'Can I use cable ties for support?', a: 'Metallic cable ties can be acceptable as part of a support system, but check manufacturer guidance and fire rating requirements.' },
            { q: 'How do I coordinate with other trades?', a: 'Agree cable routes early, mark containment as fire alarm, and inspect before ceiling closure. Document any deviations.' }
          ].map((faq, idx) => (
            <Card key={idx} variant="ios">
              <CardContent className="p-4">
                <p className="text-[13px] font-semibold text-white/90 mb-2">{faq.q}</p>
                <p className="text-[13px] text-white/60">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <CardTitle className="text-[17px] text-white">Knowledge Check: Wiring Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {showResults ? (
              <div className="space-y-6">
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-bold text-purple-400">Score: {score} / {questions.length}</p>
                  <p className="text-white/50">({Math.round((score / questions.length) * 100)}%)</p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const correct = selectedAnswers[i] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <p className="font-semibold text-white text-[14px]">Q{i + 1}. {q.question}</p>
                        <p className={`text-[13px] mt-1 ${correct ? 'text-green-400' : 'text-red-400'}`}>
                          Your answer: {q.options[selectedAnswers[i] ?? 0] ?? '-'} {correct ? '(Correct)' : '(Incorrect)'}
                        </p>
                        {!correct && (
                          <p className="text-[13px] text-white/50">Correct: {q.options[q.correctAnswer]}</p>
                        )}
                        <p className="text-[12px] text-white/60 mt-2">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button onClick={resetQuiz} className="bg-purple-500 hover:bg-purple-600 text-white">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restart Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

                <div>
                  <p className="text-[15px] font-semibold text-white mb-3">Q{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((opt, idx) => {
                      const selected = selectedAnswers[currentQuestion] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          className={`w-full text-left p-3 rounded-xl border transition-colors text-[14px] ${
                            selected ? 'bg-purple-500 text-white border-purple-500' : 'border-white/20 hover:bg-white/5 text-white/80'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0} className="border-white/20 text-white/70">
                      Previous
                    </Button>
                    <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600 text-white" disabled={selectedAnswers[currentQuestion] === undefined}>
                      {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <div className="flex justify-between items-center py-4 border-t border-white/10">
          <Button variant="outline" asChild className="border-white/20 text-white/70">
            <Link to="../module-4/section-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link to="../module-4/section-5">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule4Section4;
