import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Zap, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section1 = () => {
  useSEO({
    title: 'Primary Power Supplies | Fire Alarm Module 4 Section 1',
    description: 'Learn about mains supply requirements, PSU ratings, load calculations, monitoring and UK compliance for BS 5839-1 fire alarm systems.'
  });

  // Quiz questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Power supplies should be monitored for:',
      options: ['Voltage only', 'Presence, fault and battery condition', 'Frequency only', 'Nothing is monitored'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 expects monitoring of supply presence and faults; battery condition is also monitored by the CIE.'
    },
    {
      id: 2,
      question: 'Load calculations must consider:',
      options: ['Standby only', 'Alarm only', 'Both standby and alarm currents including safety factors', 'Charger current only'],
      correctAnswer: 2,
      explanation: 'You must calculate both standby and full alarm current and include appropriate margins.'
    },
    {
      id: 3,
      question: 'Mains supply for CIE should generally be taken from:',
      options: ['A socket ring final', 'A local lighting circuit', 'A dedicated, labelled circuit from the distribution board', 'Any convenient spur'],
      correctAnswer: 2,
      explanation: 'A dedicated, labelled circuit is typical good practice to avoid inadvertent isolation.'
    },
    {
      id: 4,
      question: 'Voltage drop on alarm circuits should be:',
      options: ['Ignored', 'Within manufacturer limits to ensure device operation', 'Above 10V', 'Exactly 0V'],
      correctAnswer: 1,
      explanation: 'Keep within device and panel instructions so sounders/VADs and interfaces operate correctly.'
    },
    {
      id: 5,
      question: 'Which UK wiring regulation addresses prevention of premature collapse of cables?',
      options: ['BS 7671 411.3.3', 'BS 7671 521.10.202', 'BS 7671 433.1', 'BS 7671 560.7.1'],
      correctAnswer: 1,
      explanation: 'BS 7671 Reg 521.10.202 requires suitable metallic fixings/supports so wiring systems do not collapse in fire.'
    },
    {
      id: 6,
      question: 'Preferred isolation for the fire alarm mains supply is:',
      options: ['Unlabelled MCB anywhere', 'A clearly labelled, lockable device at the origin or local DB', 'A plug and socket', 'A spur with neon'],
      correctAnswer: 1,
      explanation: 'Provide a labelled isolator; avoid accidental disconnection and follow manufacturer guidance.'
    },
    {
      id: 7,
      question: 'RCD protection on fire alarm mains supply should be:',
      options: ['Always fitted', 'Avoided or coordinated per BS 5839-1 to prevent nuisance disconnection', 'Set to 10mA', 'Required by BS 7671 in all cases'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 advises avoiding RCD protection where possible, or using time-delayed types to prevent unwanted tripping affecting life safety systems.'
    },
    {
      id: 8,
      question: 'PSU rating selection should:',
      options: ['Exactly match calculated alarm current with no margin', 'Exceed calculated loads with allowance for diversity and growth', 'Ignore standby consumption', 'Be based on cable size only'],
      correctAnswer: 1,
      explanation: 'Allow headroom for real-world variation, manufacturer advice and future expansion.'
    },
    {
      id: 9,
      question: 'Supply circuit identification should include:',
      options: ['No special label', 'A durable label stating Fire Alarm - Do Not Switch Off', 'Pencil marks', 'Temporary tape'],
      correctAnswer: 1,
      explanation: 'Clear, durable labelling helps prevent inadvertent isolation.'
    },
    {
      id: 10,
      question: 'When verifying PSU capacity during commissioning, you should measure:',
      options: ['Mains voltage only', 'Standby current and full alarm current with all devices operating', 'Battery voltage only', 'Cable resistance only'],
      correctAnswer: 1,
      explanation: 'Practical verification involves measuring actual currents in both standby and full alarm conditions to confirm calculations and PSU adequacy.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Zap className="h-7 w-7 text-purple-400" />
          </div>
          <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wide">
            Section 1 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Primary Power Supplies
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Learn about mains supply requirements, PSU ratings, load calculations and monitoring for BS 5839-1 compliant fire alarm systems.
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
                <span>Fire alarm panels require a dedicated, labelled mains supply from the distribution board to prevent accidental isolation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>PSU capacity must cover both standby and alarm loads with appropriate margins for surge and future expansion</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Supply presence, faults and battery condition must be monitored and indicated at the CIE per BS 5839-1</span>
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
            'Identify suitable mains supply arrangements and isolation requirements',
            'Calculate PSU loading for standby and alarm conditions',
            'Apply voltage drop limits to ensure device performance',
            'Implement monitoring and fault indication requirements',
            'Coordinate fire alarm supplies with BS 7671 requirements',
            'Verify and document power supply arrangements during commissioning'
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
              <CardTitle className="text-[17px] text-white">Mains Supply Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Fire alarm control and indicating equipment (CIE) requires a reliable mains supply that cannot be inadvertently disconnected. BS 5839-1 and BS 7671 both influence the design of this supply.
            </p>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Key Requirements:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Dedicated circuit from the distribution board with local means of isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Clear, durable labelling: "Fire Alarm - Do Not Switch Off"</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Isolator in a secure location accessible only to authorised personnel</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Protective device ratings per manufacturer recommendations</span>
                </li>
              </ul>
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
              <CardTitle className="text-[17px] text-white">RCD Considerations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Residual current devices (RCDs) can cause unwanted tripping of fire alarm supplies. BS 5839-1 provides specific guidance on their use.
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-[13px] text-amber-200">
                <strong>BS 5839-1 Recommendation:</strong> Where possible, avoid RCD protection on fire alarm circuits. If required, use time-delayed types (S-type) and ensure discrimination with downstream devices.
              </p>
            </div>
            <p>
              The risk of an RCD tripping and disabling the fire alarm system may outweigh the shock protection benefits in many installations. Document your decision and coordinate with BS 7671 requirements.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-purple-400">03</span>
              <CardTitle className="text-[17px] text-white">Load Calculation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Accurate load calculations ensure the PSU can support the system in all operating conditions. Calculate separately for standby and alarm modes.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Standby Current</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Panel quiescent current</li>
                  <li>Loop device currents (all detectors, interfaces)</li>
                  <li>Ancillary equipment (repeaters, graphics)</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Alarm Current</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>All sounders and VADs at full output</li>
                  <li>Relay and interface activation</li>
                  <li>Panel in alarm mode</li>
                </ul>
              </div>
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
                  If standby current is 450mA and alarm current is 1.95A, what minimum PSU rating would you specify, and why might you choose higher?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Consider: surge capacity, future expansion, manufacturer recommendations, and typical safety margins (20-50%).
                </p>
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
              <CardTitle className="text-[17px] text-white">Worked Example: PSU Sizing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-3">Example Calculation:</h4>
              <div className="space-y-2 text-[13px]">
                <p><strong>Standby loads:</strong></p>
                <ul className="pl-4 space-y-1">
                  <li>Panel quiescent: 120mA</li>
                  <li>Loop devices: 280mA</li>
                  <li>Interfaces: 50mA</li>
                  <li><strong>Total standby: 450mA</strong></li>
                </ul>
                <p className="mt-3"><strong>Alarm loads:</strong></p>
                <ul className="pl-4 space-y-1">
                  <li>Sounders/VADs: 1.6A</li>
                  <li>Relays: 150mA</li>
                  <li>Panel alarm mode: 200mA</li>
                  <li><strong>Total alarm: 1.95A</strong></li>
                </ul>
                <p className="mt-3 text-purple-300">
                  <strong>Specification:</strong> PSU rated minimum 2A continuous with surge capacity per manufacturer data. Consider 2.5A or 3A for headroom.
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
              <CardTitle className="text-[17px] text-white">Voltage Drop Considerations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Excessive voltage drop can prevent sounders, VADs and interfaces from operating correctly during alarm conditions.
            </p>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Key Considerations:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Calculate for worst-case alarm current and longest cable run</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Check manufacturer minimum operating voltage for each device type</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Allow for battery end-of-discharge voltage, not just nominal voltage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Consider using larger cable CSA or multiple circuits for long runs</span>
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
                  A sounder circuit has 15 devices each drawing 100mA at 24V. The cable run is 80m using 1.5mm2 cable. How would you verify the devices will operate correctly?
                </p>
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
              <CardTitle className="text-[17px] text-white">Monitoring and Fault Indication</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              BS 5839-1 requires comprehensive monitoring of power supply status with clear indication at the CIE.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Monitored Conditions</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Mains supply presence (healthy/failed)</li>
                  <li>Battery condition (healthy/fault/low)</li>
                  <li>Charger operation (charging/fault)</li>
                  <li>PSU output voltage and load</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Commissioning Verification</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Simulate mains failure - verify battery changeover</li>
                  <li>Confirm fault indications display correctly</li>
                  <li>Measure charger voltage and current</li>
                  <li>Check labels on supply isolator</li>
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
            'Document all load calculations in the commissioning records - show your working',
            'Always measure actual standby and alarm currents during commissioning to verify calculations',
            'Consider voltage at end-of-battery-life, not just new battery voltage, for worst-case calculations'
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
            'Undersized PSU leading to brownouts during alarm - always include safety margins',
            'Supply taken from shared circuits that can be inadvertently switched off',
            'Ignoring voltage drop on long sounder/VAD circuits causing device malfunction'
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
            { q: 'Can I use a shared socket circuit for the fire alarm?', a: 'No - use a dedicated, labelled circuit from the distribution board to prevent inadvertent isolation.' },
            { q: 'How much PSU margin should I allow?', a: 'Follow manufacturer guidance; commonly 20-50% depending on loads and future expansion needs.' },
            { q: 'Does BS 7671 apply to fire alarm power supplies?', a: 'Yes - supply cabling, earthing, identification and fixings must all comply with BS 7671.' },
            { q: 'What labelling is required at the supply isolator?', a: 'A durable label stating "Fire Alarm - Do Not Switch Off" or similar wording.' },
            { q: 'Should I fit an RCD on the fire alarm circuit?', a: 'Generally avoid RCDs if possible; if required, use time-delayed (S-type) to prevent nuisance tripping.' },
            { q: 'How do I verify PSU adequacy during commissioning?', a: 'Measure actual standby and alarm currents with all devices operating and compare to PSU rating.' }
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
            <CardTitle className="text-[17px] text-white">Knowledge Check: Primary Power Supplies</CardTitle>
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
            <Link to="../module-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Module Overview
            </Link>
          </Button>
          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link to="../module-4/section-2">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule4Section1;
