import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Activity, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section5 = () => {
  useSEO({
    title: 'Earth Fault Monitoring | Fire Alarm Module 4 Section 5',
    description: 'Learn about earth fault monitoring requirements, fault location methods, insulation resistance testing and troubleshooting for BS 5839-1 fire alarm systems.'
  });

  // Quiz questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Earth faults can:',
      options: ['Improve performance', 'Cause false alarms or system malfunction', 'Be ignored', 'Only affect chargers'],
      correctAnswer: 1,
      explanation: 'Earth faults can disrupt correct operation, cause false alarms or prevent proper fault indication.'
    },
    {
      id: 2,
      question: 'Typical IR measurement for fire alarm circuits expects values of:',
      options: ['Less than 10k ohms', 'At least 2M ohms to earth, higher preferred', 'Exactly 1 ohm', 'Below 100 ohms'],
      correctAnswer: 1,
      explanation: 'Maintain high insulation values, minimum 2M ohms, to earth to ensure correct operation.'
    },
    {
      id: 3,
      question: 'Earth fault indication should be:',
      options: ['Hidden from operators', 'Clearly displayed at the CIE', 'Only recorded internally', 'Ignored unless multiple'],
      correctAnswer: 1,
      explanation: 'Faults must be clearly indicated so they can be investigated and rectified promptly.'
    },
    {
      id: 4,
      question: 'The minimum insulation resistance for fire alarm circuits per BS 5839-1 is typically:',
      options: ['100 ohms', '1k ohms', '2M ohms to earth', '100M ohms'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 expects at least 2M ohms insulation resistance between circuits and earth to ensure reliable operation.'
    },
    {
      id: 5,
      question: 'Earth fault monitoring in modern panels typically:',
      options: ['Only checks at commissioning', 'Continuously monitors circuit insulation', 'Requires external equipment', 'Checks once per year'],
      correctAnswer: 1,
      explanation: 'Modern panels have built-in earth fault monitoring that continuously checks insulation to earth.'
    },
    {
      id: 6,
      question: 'Tracking down an earth fault is best done by:',
      options: ['Ignoring it until it clears', 'Systematic disconnection/reconnection to isolate the faulty section', 'Replacing the entire system', 'Waiting for a second fault'],
      correctAnswer: 1,
      explanation: 'Use divide-and-conquer: disconnect sections systematically to narrow down the fault location.'
    },
    {
      id: 7,
      question: 'Water ingress commonly causes earth faults at:',
      options: ['Battery terminals only', 'Field devices, junction boxes and cable entries', 'The control panel display', 'Nowhere specific'],
      correctAnswer: 1,
      explanation: 'Water enters at devices and connection points, reducing insulation resistance and causing earth faults.'
    },
    {
      id: 8,
      question: 'When testing IR during commissioning, you should:',
      options: ['Ignore manufacturer limits', 'Record readings and compare to minimum standards and manufacturer data', 'Only test the supply cable', 'Use mains voltage for testing'],
      correctAnswer: 1,
      explanation: 'Record all readings, compare against minimum 2M ohms and any manufacturer-specific requirements.'
    },
    {
      id: 9,
      question: 'An intermittent earth fault might be caused by:',
      options: ['A permanent short circuit', 'Moisture, loose connections or damaged insulation that varies with conditions', 'Correct installation', 'High-quality materials'],
      correctAnswer: 1,
      explanation: 'Intermittent faults often relate to environmental conditions (humidity, temperature) affecting marginal insulation.'
    },
    {
      id: 10,
      question: 'Split earth monitoring reports:',
      options: ['Overall system health only', 'Earth faults on positive and negative circuits separately', 'Battery voltage', 'Loop addresses'],
      correctAnswer: 1,
      explanation: 'Split monitoring helps identify which side of the circuit has the fault for faster diagnosis.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Activity className="h-7 w-7 text-purple-400" />
          </div>
          <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wide">
            Section 5 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Earth Fault Monitoring
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understand earth fault monitoring principles, insulation resistance requirements, fault location techniques and troubleshooting strategies.
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
                <span>Earth faults can cause false alarms, missed alarms or system malfunction - they must be investigated</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>BS 5839-1 requires minimum 2M ohms insulation resistance to earth on fire alarm circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>Modern panels provide continuous earth fault monitoring with split positive/negative indication</span>
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
            'Explain why earth fault monitoring is critical for reliable fire alarm operation',
            'Measure and record insulation resistance to BS 5839-1 requirements',
            'Interpret earth fault indications on fire alarm control panels',
            'Apply systematic fault-finding techniques to locate earth faults',
            'Identify common causes of earth faults in fire alarm installations',
            'Document and report earth fault investigations and remediation'
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
              <CardTitle className="text-[17px] text-white">Why Earth Faults Matter</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Fire alarm systems use floating DC circuits. Earth faults - unintended connections to earth - can cause unpredictable behaviour and compromise life safety.
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-[13px] text-amber-200">
                <strong>Critical:</strong> A single earth fault may not cause immediate problems, but a second fault could create a short circuit bypassing normal protection, causing false alarms, missed alarms or system failure.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Consequences of Earth Faults:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>False alarms from circuit imbalance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Devices not responding correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Communication failures on loops</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Undetected faults leading to second failure</span>
                </li>
              </ul>
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
              <CardTitle className="text-[17px] text-white">Insulation Resistance Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              BS 5839-1 specifies minimum insulation resistance values to ensure reliable operation. These must be tested during commissioning and periodically.
            </p>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-2">Minimum Requirements:</h4>
              <ul className="space-y-1 text-[13px]">
                <li><strong>Between circuits and earth:</strong> 2M ohms minimum</li>
                <li><strong>Test voltage:</strong> 500V DC (unless manufacturer specifies otherwise)</li>
                <li><strong>Disconnect sensitive equipment</strong> before testing</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Testing Procedure:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Isolate system from batteries and mains</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Test between each circuit conductor and earth</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Record readings for each circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Compare against previous readings if available</span>
                </li>
              </ul>
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
                  During commissioning, you measure 1.5M ohms IR on a loop circuit. Does this meet BS 5839-1 requirements? What action would you take?
                </p>
                <p className="text-[12px] text-white/50 mt-2 italic">
                  Consider: 2M ohm minimum, investigation required, potential causes
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
              <CardTitle className="text-[17px] text-white">Panel Earth Fault Monitoring</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Modern fire alarm panels incorporate continuous earth fault monitoring. Understanding how this works helps with fault diagnosis.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Basic Monitoring</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Detects when circuit insulation drops below threshold</li>
                  <li>Displays "Earth Fault" on panel</li>
                  <li>May indicate affected loop or zone</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Split Earth Monitoring</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Monitors positive and negative sides separately</li>
                  <li>Indicates which polarity has the fault</li>
                  <li>Faster diagnosis - know which conductor to focus on</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Advanced Features</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>IR value display in some panels</li>
                  <li>Loop isolation for systematic testing</li>
                  <li>Event logging for intermittent faults</li>
                </ul>
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
              <CardTitle className="text-[17px] text-white">Common Causes of Earth Faults</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Understanding common causes helps target your investigation and prevent recurrence.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Environmental</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Water ingress at devices or junction boxes</li>
                  <li>Condensation in unheated areas</li>
                  <li>High humidity environments</li>
                  <li>Corrosion from chemicals or salt air</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Installation Defects</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Damaged insulation during pulling or stripping</li>
                  <li>Over-tightened glands crushing cable</li>
                  <li>Metal swarf in enclosures</li>
                  <li>Incorrect termination at devices</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Equipment Faults</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Faulty devices with internal breakdown</li>
                  <li>Damaged device bases or covers</li>
                  <li>Failed cable glands or seals</li>
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
                  An earth fault appears intermittently on wet days and clears on dry days. What would this suggest about the cause and where would you focus your investigation?
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
              <CardTitle className="text-[17px] text-white">Fault Location Techniques</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Systematic fault-finding minimises disruption and quickly locates the problem.
            </p>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-[13px] font-semibold text-white/90 mb-2">Divide and Conquer Method:</h4>
              <ol className="space-y-2 text-[13px]">
                <li>1. Note which circuits/loops show the fault</li>
                <li>2. Disconnect half the devices on the affected circuit</li>
                <li>3. Check if fault clears - if yes, fault is in disconnected section</li>
                <li>4. Continue halving until you isolate the faulty device or section</li>
                <li>5. Test the specific device and cable to confirm</li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-white/90">Additional Techniques:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Use panel loop isolation features if available</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Check event log for timing and patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Visual inspection of suspect areas (water damage, construction work)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>IR testing of individual cable sections once isolated</span>
                </li>
              </ul>
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
              <CardTitle className="text-[17px] text-white">Documentation and Prevention</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[15px] text-white/70">
            <p>
              Proper documentation helps track trends and prevents recurrence of earth fault issues.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Recording Requirements</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Date/time of fault appearance and clearance</li>
                  <li>Affected circuits and IR readings</li>
                  <li>Root cause identified</li>
                  <li>Remedial action taken</li>
                  <li>Post-repair IR readings</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <h4 className="text-[13px] font-semibold text-white/90 mb-2">Prevention Strategies</h4>
                <ul className="space-y-1 text-[13px]">
                  <li>Proper cable gland selection and installation</li>
                  <li>IP-rated enclosures for harsh environments</li>
                  <li>Regular inspection during maintenance visits</li>
                  <li>Trend analysis of IR readings over time</li>
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
            'Check the panel event log for timing patterns - intermittent faults often correlate with environmental conditions',
            'Keep a torch handy - many earth faults are visible as water staining or corrosion at terminations',
            'Record IR readings during routine maintenance to spot deteriorating trends before faults develop'
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
            'Ignoring intermittent earth faults - they indicate a developing problem that will worsen',
            'Not recording commissioning IR readings - makes future troubleshooting much harder',
            'Replacing devices without investigating root cause - the problem often returns'
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
            { q: 'Can I ignore an earth fault if the system still works?', a: 'No - the system is compromised and a second fault could cause serious malfunction. Investigate promptly.' },
            { q: 'What IR test voltage should I use?', a: 'Typically 500V DC unless the manufacturer specifies otherwise. Disconnect sensitive electronics first.' },
            { q: 'How do I test IR with devices connected?', a: 'Generally you should disconnect devices or test at the panel with circuits isolated. Follow manufacturer guidance.' },
            { q: 'What causes intermittent earth faults?', a: 'Usually moisture-related - condensation, humidity changes or minor water ingress that varies with conditions.' },
            { q: 'Should I record earth fault events?', a: 'Yes - log all faults, investigations and repairs in the system log book and maintenance records.' },
            { q: 'Can damaged cable cause earth faults?', a: 'Yes - crushed, nicked or water-damaged insulation is a common cause. Check for physical damage during investigation.' }
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
            <CardTitle className="text-[17px] text-white">Knowledge Check: Earth Fault Monitoring</CardTitle>
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

      {/* Module Completion Banner */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios" className="border-purple-500/30 bg-purple-500/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[15px] font-semibold text-white mb-1">Module 4 Complete!</p>
                <p className="text-[13px] text-white/70">
                  You have completed all sections covering power supplies, batteries, cables, wiring methods and earth fault monitoring. Continue to Module 5 to learn about detection devices and their applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <div className="flex justify-between items-center py-4 border-t border-white/10">
          <Button variant="outline" asChild className="border-white/20 text-white/70">
            <Link to="../module-4/section-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
            <Link to="../module-5">
              Next Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule4Section5;
