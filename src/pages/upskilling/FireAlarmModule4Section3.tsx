import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Cable, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section3 = () => {
  useSEO({
    title: 'Cable Types & Fire Resistance | Fire Alarm Module 4 Section 3',
    description: 'Learn about fire-resisting cable types (FP200, MICC), enhanced vs standard cables, LSZH requirements, terminations and applications for BS 5839-1.'
  });

  // Quiz questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Enhanced fire-resisting cable is typically used for:',
      options: ['Any LV distribution', 'Circuits required to operate for longer in fire conditions', 'Decorative effect', 'Short temporary wiring'],
      correctAnswer: 1,
      explanation: 'Where circuits must remain operational for a defined period, enhanced performance cable may be required.'
    },
    {
      id: 2,
      question: 'MICC cables provide:',
      options: ['Poor fire resistance', 'Excellent fire survivability with correct termination', 'Only data transmission', 'No mechanical strength'],
      correctAnswer: 1,
      explanation: 'Mineral insulated copper cable (MICC) offers high fire resistance when properly installed and terminated.'
    },
    {
      id: 3,
      question: 'LSZH means:',
      options: ['Low Smoke Zero Halogen', 'Lightweight Strong Zinc Housing', 'Low Static Zero Humidity', 'Long Service Zero Heat'],
      correctAnswer: 0,
      explanation: 'Low Smoke Zero Halogen materials reduce toxic smoke in a fire.'
    },
    {
      id: 4,
      question: 'FP200 Gold cable provides fire survivability for:',
      options: ['30 minutes at 650C', '120 minutes at 842C', '60 minutes at 550C', '15 minutes at 400C'],
      correctAnswer: 1,
      explanation: 'FP200 Gold is an enhanced fire-resisting cable tested to maintain circuit integrity for 120 minutes at 842C per BS 8491.'
    },
    {
      id: 5,
      question: 'Bend radius should be:',
      options: ['Ignored', 'Per manufacturer data to avoid damage', 'As tight as possible', 'Only a visual estimate'],
      correctAnswer: 1,
      explanation: 'Follow manufacturer limits to maintain cable integrity.'
    },
    {
      id: 6,
      question: 'The main advantage of using screened cable for detector loops is:',
      options: ['Lower cost', 'Reduced electromagnetic interference pickup', 'Easier to strip', 'Better fire resistance'],
      correctAnswer: 1,
      explanation: 'Screened cables with properly earthed screens reduce EMC susceptibility, important near sources of electrical noise.'
    },
    {
      id: 7,
      question: 'When terminating MICC cable, moisture ingress is prevented by:',
      options: ['Leaving the end open', 'Using proper sealing glands with compound or sleeves', 'Wrapping in electrical tape', 'Painting the end'],
      correctAnswer: 1,
      explanation: 'MICC terminations require proper sealing glands and moisture-excluding compound to prevent magnesium oxide insulation degradation.'
    },
    {
      id: 8,
      question: 'Standard fire-resisting cable for fire alarms should meet at least:',
      options: ['No specific standard', 'BS EN 50200 PH classification (IEC 60331)', 'Domestic cable standards only', 'CAT5e data cable standards'],
      correctAnswer: 1,
      explanation: 'Standard performance fire alarm cables should meet BS EN 50200 (formerly IEC 60331) for circuit integrity under fire conditions.'
    },
    {
      id: 9,
      question: 'Cable cores should be identified at terminations using:',
      options: ['Memory only', 'Permanent identification per BS 7671 and manufacturer requirements', 'Pencil markings', 'Coloured tape that can fall off'],
      correctAnswer: 1,
      explanation: 'Proper permanent identification of cores aids installation, testing, maintenance and troubleshooting throughout system life.'
    },
    {
      id: 10,
      question: 'Enhanced cable is often required for:',
      options: ['Circuits supporting evacuation/critical control', 'Decorative lighting', 'Temporary tools', 'Spare cores'],
      correctAnswer: 0,
      explanation: 'Critical functions may need enhanced survivability.'
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module-4">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 4</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Cable className="h-7 w-7 text-purple-400" />
          </div>
          <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wide">
            Section 3 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Cable Types & Fire Resistance
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understand fire-resisting cable types, selection criteria, termination requirements and application guidance for BS 5839-1 compliant installations.
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
                <span>Standard fire-resisting cables (e.g., FP200) maintain circuit integrity for 30 mins; enhanced cables (e.g., FP200 Gold) for 120 mins</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>MICC provides excellent fire resistance but requires specialist termination techniques to prevent moisture ingress</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>LSZH (Low Smoke Zero Halogen) sheaths reduce toxic emissions - essential in escape routes and enclosed spaces</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Differentiate between standard and enhanced fire-resisting cables',
            'Select appropriate cable types for different fire alarm circuits',
            'Apply correct termination techniques for FP-type and MICC cables',
            'Understand LSZH requirements and smoke/toxicity considerations',
            'Implement EMC strategies using screened cables and earthing',
            'Maintain cable integrity through proper handling and installation'
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">01</span>
              <CardTitle className="text-[17px] text-white">Standard vs Enhanced Fire-Resisting Cables</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Fire alarm cables must maintain circuit integrity during fire conditions. BS 5839-1 distinguishes between standard and enhanced performance requirements.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Standard Performance</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Maintains circuit integrity for approximately 30 minutes</li>
                  <li>Tested to BS EN 50200 / IEC 60331</li>
                  <li>Suitable for most detection and alarm circuits</li>
                  <li>Example: FP200 (red sheath)</li>
                </ul>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Enhanced Performance</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Maintains circuit integrity for 120 minutes at 842C</li>
                  <li>Tested to BS 8491</li>
                  <li>Required for critical evacuation and control circuits</li>
                  <li>Example: FP200 Gold (white sheath)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">02</span>
              <CardTitle className="text-[17px] text-white">Common Cable Types</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">FP-Type Cables</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>FP200: Standard fire-resistant, LSZH sheath</li>
                  <li>FP200 Gold: Enhanced survivability, 120-minute rating</li>
                  <li>Easier to install than MICC, good availability</li>
                  <li>Available screened or unscreened</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">MICC (Mineral Insulated Copper Cable)</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Copper conductors in magnesium oxide insulation</li>
                  <li>Excellent fire resistance and mechanical strength</li>
                  <li>Requires specialist termination skills</li>
                  <li>Moisture-sensitive - correct sealing essential</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Screened Cables</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Braided or foil screen reduces EMC interference</li>
                  <li>Essential near power cables, motors, VFDs</li>
                  <li>Screen must be correctly earthed per design</li>
                  <li>Use drain wire for termination</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Check 1 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios" className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-amber-200 mb-1">Quick Check</p>
                <p className="text-[13px] text-white/70">
                  A voice alarm system in a high-rise building requires cables to maintain operation during evacuation. Would you specify standard or enhanced cable, and why?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Consider: evacuation time, phased evacuation, fire strategy requirements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">03</span>
              <CardTitle className="text-[17px] text-white">LSZH Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Low Smoke Zero Halogen (LSZH) cable sheaths are essential in fire alarm installations to minimise toxic smoke during a fire.
            </p>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Why LSZH Matters:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>PVC releases hydrogen chloride (HCl) when burning - toxic and corrosive</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>LSZH materials produce minimal smoke and no halogen gases</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Essential in escape routes and confined spaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Often specified throughout the building for consistency</span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-[13px] text-amber-200">
                <strong>Note:</strong> Fire-resisting cables for fire alarms should always have LSZH sheaths. Check specification requirements carefully.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">04</span>
              <CardTitle className="text-[17px] text-white">Termination Best Practice</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Correct termination is essential to maintain fire resistance ratings and ensure reliable operation.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">FP-Type Cable</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Use compatible glands certified for the cable type</li>
                  <li>Maintain correct bend radius (typically 6x cable diameter)</li>
                  <li>Avoid damage to insulation during stripping</li>
                  <li>Apply correct torque to terminals</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">MICC Cable</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Use manufacturer-approved pot and seal kits</li>
                  <li>Heat and dry if moisture suspected before potting</li>
                  <li>Apply sealing compound correctly to exclude moisture</li>
                  <li>Form tails neatly with appropriate sleeving</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Screened Cable</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Earth screen at one end only (typically panel end) unless specified</li>
                  <li>Use drain wire for clean termination</li>
                  <li>Insulate unterminated screen ends</li>
                  <li>Document screen strategy for maintainers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Check 2 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios" className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-amber-200 mb-1">Quick Check</p>
                <p className="text-[13px] text-white/70">
                  Why should cable screens typically be earthed at only one end, and what happens if you earth both ends?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Think about: earth loop currents, interference, induced voltages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">05</span>
              <CardTitle className="text-[17px] text-white">Cable Selection by Circuit Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Different circuits have different requirements. Match cable selection to the circuit function and fire strategy.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Detection Loops</h4>
                <p className="text-[13px]">Standard fire-resistant, screened if near interference sources. Consider 1.5mm2 for long runs to manage volt drop.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Sounder/VAD Circuits</h4>
                <p className="text-[13px]">Standard or enhanced depending on evacuation strategy. Size for current and volt drop (1.5mm2 or 2.5mm2 typical).</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Critical Interface Circuits</h4>
                <p className="text-[13px]">Enhanced cable for fire/smoke control, emergency lighting interfaces. Consider fire strategy requirements.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Mains Supply</h4>
                <p className="text-[13px]">Fire-resistant if passing through fire risk areas. Coordinate with BS 7671 requirements.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">06</span>
              <CardTitle className="text-[17px] text-white">Handling and Installation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Correct handling protects cable integrity and maintains fire performance ratings.
            </p>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Key Practices:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Observe minimum bend radius throughout installation - not just at terminations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Avoid mechanical damage - do not stand on cables or crush during installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Protect cut ends from moisture until terminated (especially MICC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Use correct stripping tools - avoid nicking conductor insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Label all cores at terminations for future maintenance</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pro Tips */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Pro Tips</h2>
        <div className="space-y-3">
          {[
            'Keep MICC cable ends sealed with tape until you are ready to terminate - moisture destroys the insulation',
            'When using screened cable, document which end the screen is earthed at for future maintainers',
            'Check the fire strategy document early - it will specify where enhanced cable is required'
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Common Mistakes</h2>
        <div className="space-y-3">
          {[
            'Using standard cable where enhanced is specified in the fire strategy',
            'Damaging cable sheath or insulation with tight bends or crushing during installation',
            'Earthing cable screens at both ends, creating earth loops and interference problems'
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: 'Do I always need enhanced cable?', a: 'No - only where the fire strategy or design requires extended survivability. Most circuits use standard fire-resistant cable.' },
            { q: 'Is MICC better than FP-type?', a: 'Both can meet requirements. MICC offers superior fire resistance but requires specialist skills. FP-type is easier to install with good performance.' },
            { q: 'What about LSZH requirements?', a: 'Use LSZH where specified or where reduced toxic smoke is required. Most fire alarm cables are now LSZH as standard.' },
            { q: 'How do I identify cable ratings?', a: 'Check manufacturer data sheets. Cable markings should include fire rating standards (e.g., BS EN 50200, BS 8491).' },
            { q: 'Can I use standard domestic cable?', a: 'No - fire alarm circuits require fire-resistant cables to maintain operation during a fire. PVC cables are not suitable.' },
            { q: 'What size cable for sounder circuits?', a: 'Calculate based on device current and volt drop. Typically 1.5mm2, increasing to 2.5mm2 for long runs or high loads.' }
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <CardTitle className="text-[17px] text-white">Knowledge Check: Cable Types</CardTitle>
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
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <div className="flex justify-between items-center py-4 border-t border-white/10">
          <Button variant="outline" asChild className="border-white/20 text-white/70">
            <Link to="../module-4/section-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link to="../module-4/section-4">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule4Section3;
