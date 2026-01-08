import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Battery, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section2 = () => {
  useSEO({
    title: 'Secondary Power & Battery Sizing | Fire Alarm Module 4 Section 2',
    description: 'Learn battery autonomy periods, sizing calculations, charger capacity, temperature effects and verification for BS 5839-1 fire alarm systems.'
  });

  // Quiz questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Autonomy is the ability to:',
      options: ['Run with mains present', 'Operate for the required standby and alarm periods on battery', 'Charge faster', 'Increase loop addresses'],
      correctAnswer: 1,
      explanation: 'Autonomy covers standby plus alarm periods on battery to meet the design/standard.'
    },
    {
      id: 2,
      question: 'Battery sizing must consider:',
      options: ['Standby only', 'Alarm only', 'Standby + alarm and temperature/ageing factors', 'Only charger current'],
      correctAnswer: 2,
      explanation: 'Use total Ah for standby and alarm; apply derating for temperature and ageing per manufacturer guidance.'
    },
    {
      id: 3,
      question: 'Charger capacity should be:',
      options: ['Less than standby current', 'Sufficient to recharge within specified time while supporting load', 'Ignored', 'Equal to alarm current'],
      correctAnswer: 1,
      explanation: 'The charger must recharge batteries in the permitted time while supporting system loads.'
    },
    {
      id: 4,
      question: 'What is the typical standby autonomy period required for a Category L system?',
      options: ['12 hours', '24 hours', '48 hours', '72 hours'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 typically requires 24 hours standby plus 30 minutes alarm for most Category L systems, though the fire strategy may specify different requirements.'
    },
    {
      id: 5,
      question: 'Temperature affects capacity by:',
      options: ['Increasing at low temperature', 'No effect', 'Reducing effective Ah in colder environments', 'Only affecting charger'],
      correctAnswer: 2,
      explanation: 'Battery capacity reduces at lower temperatures; apply manufacturer derating.'
    },
    {
      id: 6,
      question: 'Ageing allowance is typically:',
      options: ['0%', 'Considered per manufacturer (e.g., +10-30%)', 'Always 100%', 'Ignored'],
      correctAnswer: 1,
      explanation: 'Allow for capacity loss over service life as specified by the manufacturer.'
    },
    {
      id: 7,
      question: 'When calculating battery capacity for a system with 24h standby at 0.5A and 30min alarm at 2A, the minimum Ah before derating is:',
      options: ['1 Ah', '12 Ah', '13 Ah', '24 Ah'],
      correctAnswer: 2,
      explanation: 'Calculate: (0.5A x 24h) + (2A x 0.5h) = 12 + 1 = 13 Ah minimum before applying derating factors.'
    },
    {
      id: 8,
      question: 'VRLA batteries should be installed:',
      options: ['In any orientation', 'Upright as specified by manufacturer data', 'Always horizontal', 'Upside down for better performance'],
      correctAnswer: 1,
      explanation: 'Follow manufacturer installation requirements for orientation, ventilation and environmental conditions to ensure proper operation and service life.'
    },
    {
      id: 9,
      question: 'The typical recharge time specified for fire alarm batteries after discharge is:',
      options: ['6 hours', '12 hours', '24 hours', '48 hours'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 typically requires batteries to be recharged to 80% capacity within 24 hours of restoration of mains supply.'
    },
    {
      id: 10,
      question: 'Battery replacement is typically recommended after:',
      options: ['1 year regardless of condition', '3-5 years or per manufacturer guidance', '10 years minimum', 'Never, batteries last forever'],
      correctAnswer: 1,
      explanation: 'VRLA batteries typically require replacement every 3-5 years, though this depends on manufacturer recommendations and actual capacity testing results.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Battery className="h-7 w-7 text-purple-400" />
          </div>
          <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wide">
            Section 2 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Secondary Power & Battery Sizing
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Master battery capacity calculations, autonomy requirements, derating factors and charger verification for reliable backup power.
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
                <span>Battery capacity must cover standby period (typically 24h) plus alarm duration (typically 30 mins) per BS 5839-1</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Apply derating factors for temperature (cold reduces capacity) and ageing (typically 25-50% extra)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Charger must recharge batteries to 80% within 24 hours while maintaining system operation</span>
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
            'Calculate Ah requirements from current and time for standby and alarm periods',
            'Apply derating factors for temperature and ageing per manufacturer guidance',
            'Verify charger can recharge batteries within the specified timeframe',
            'Select appropriate battery types and understand installation requirements',
            'Understand autonomy requirements for different system categories',
            'Commission and test battery backup systems to BS 5839-1'
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
              <CardTitle className="text-[17px] text-white">Autonomy Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Autonomy is the duration the fire alarm system can operate on battery power alone. BS 5839-1 specifies minimum requirements based on system category and building use.
            </p>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-2">Typical Requirements:</h4>
              <ul className="space-y-1 text-[13px]">
                <li><strong>Category L systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li><strong>Category M systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li><strong>Category P systems:</strong> 24-72 hours depending on response capability</li>
              </ul>
            </div>
            <p className="text-[13px]">
              The fire strategy document may specify different requirements. Always confirm autonomy periods during design.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">02</span>
              <CardTitle className="text-[17px] text-white">Battery Sizing Method</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Calculate battery capacity systematically using current draws and time periods. The basic formula is: Ah = Current (A) x Time (h).
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Step 1: Standby Capacity</h4>
                <p className="text-[13px]">Standby Ah = Standby Current (A) x Standby Period (h)</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Step 2: Alarm Capacity</h4>
                <p className="text-[13px]">Alarm Ah = Alarm Current (A) x Alarm Period (h)</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Step 3: Total + Derating</h4>
                <p className="text-[13px]">Total Ah = (Standby Ah + Alarm Ah) x Derating Factor</p>
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
              <CardTitle className="text-[17px] text-white">Worked Example</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-3">Category L System Calculation:</h4>
              <div className="space-y-2 text-[13px]">
                <p><strong>Given:</strong></p>
                <ul className="pl-4 space-y-1">
                  <li>Standby current: 0.45A</li>
                  <li>Standby period: 24 hours</li>
                  <li>Alarm current: 1.95A</li>
                  <li>Alarm period: 0.5 hours (30 minutes)</li>
                </ul>
                <p className="mt-3"><strong>Calculation:</strong></p>
                <ul className="pl-4 space-y-1">
                  <li>Standby Ah = 0.45A x 24h = 10.8 Ah</li>
                  <li>Alarm Ah = 1.95A x 0.5h = 0.98 Ah</li>
                  <li>Total = 10.8 + 0.98 = 11.78 Ah</li>
                  <li>With 30% derating: 11.78 x 1.3 = 15.3 Ah</li>
                </ul>
                <p className="mt-3 text-purple-300">
                  <strong>Selection:</strong> Choose 17 Ah batteries (next standard size). For 24V systems, use 2 x 12V 17Ah in series.
                </p>
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
                  A system has 0.6A standby current and 2.5A alarm current. Calculate the minimum battery capacity for 24h standby + 30min alarm, then apply a 25% derating factor.
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Hint: (0.6 x 24) + (2.5 x 0.5) = ? Ah, then multiply by 1.25
                </p>
              </div>
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
              <CardTitle className="text-[17px] text-white">Derating Factors</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Real-world battery capacity is affected by temperature, age and discharge rate. Apply derating factors to ensure adequate capacity throughout battery life.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Temperature Derating</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>VRLA capacity reduces significantly below 20C</li>
                  <li>At 0C, capacity may be only 80% of rated value</li>
                  <li>Use manufacturer temperature curves for accurate derating</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Ageing Derating</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Capacity reduces over service life</li>
                  <li>Typically allow 10-30% extra capacity for ageing</li>
                  <li>Plan for 3-5 year battery replacement cycle</li>
                </ul>
              </div>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-[13px] text-amber-200">
                <strong>Practical Guidance:</strong> A combined derating factor of 1.25-1.5 (25-50% extra capacity) is commonly used to cover both temperature and ageing effects.
              </p>
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
              <CardTitle className="text-[17px] text-white">Charger Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              The charger must be capable of recharging depleted batteries within the specified time while also supporting the system standby load.
            </p>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Key Requirements:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Recharge to 80% capacity within 24 hours of mains restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Maintain system operation during charging</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Charger voltage and current must match battery specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Temperature compensation may be required for extreme environments</span>
                </li>
              </ul>
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
                  If a system has 17Ah batteries and 0.5A standby load, what minimum charger current is needed to recharge from fully discharged to 80% within 24 hours?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Consider: (17Ah x 0.8) / 24h = charge current, plus standby load
                </p>
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
              <CardTitle className="text-[17px] text-white">Battery Types and Installation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              VRLA (Valve Regulated Lead Acid) batteries are standard for fire alarm panels. Follow manufacturer requirements for installation and maintenance.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Installation Requirements</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Install upright as specified by manufacturer</li>
                  <li>Ensure adequate ventilation per BS 7671</li>
                  <li>Protect against temperature extremes</li>
                  <li>Use correct fusing and cabling</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Commissioning Checks</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Measure quiescent and alarm current</li>
                  <li>Simulate mains fail and verify changeover</li>
                  <li>Check charger voltage and current settings</li>
                  <li>Record battery date code and capacity</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pro Tips */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Pro Tips</h2>
        <div className="space-y-3">
          {[
            'Always select the next standard battery size above your calculated requirement - never round down',
            'Record battery date codes during installation for accurate replacement scheduling',
            'Measure actual standby and alarm currents during commissioning to verify your calculations'
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
            'Forgetting to include derating factors for temperature and ageing in calculations',
            'Using batteries with insufficient capacity for the charger to recharge within 24 hours',
            'Installing batteries in locations with extreme temperatures without additional derating'
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
            { q: 'Can I oversize batteries?', a: 'Yes, if the charger can recharge them within the specified time and the enclosure has space. Larger batteries provide extra resilience.' },
            { q: 'What Ah size should I choose?', a: 'Select the next standard size above your derated calculation. Common sizes are 7Ah, 12Ah, 17Ah, 24Ah, 38Ah.' },
            { q: 'Do batteries need ventilation?', a: 'Follow manufacturer and BS 7671 guidance. VRLA batteries produce minimal gas but adequate ventilation is still required.' },
            { q: 'How often should batteries be replaced?', a: 'Typically every 3-5 years, or when capacity testing shows significant degradation. Record replacement dates.' },
            { q: 'What if the panel is in a cold location?', a: 'Apply additional temperature derating or consider relocating the panel/batteries to a warmer environment.' },
            { q: 'Can I use lithium batteries instead?', a: 'Only if specifically approved by the panel manufacturer and meeting BS EN 54-4 requirements. Most panels are designed for VRLA.' }
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
            <CardTitle className="text-[17px] text-white">Knowledge Check: Battery Sizing</CardTitle>
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
            <Link to="../module-4/section-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link to="../module-4/section-3">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule4Section2;
