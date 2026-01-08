import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Thermometer, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Heat Detectors - Fire Alarm Course Module 2";
const DESCRIPTION = "Learn about fixed temperature and rate-of-rise heat detectors, BS 5839-1 classifications, siting requirements, and appropriate applications.";

const FireAlarmModule2Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data - 10 questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Where would you typically use a rate-of-rise heat detector?',
      options: ['Office', 'Kitchen', 'Escape route', 'Hotel bedroom'],
      correctAnswer: 1,
      explanation: 'Rate-of-rise heat detectors suit kitchens and similar areas where smoke detection would cause false alarms from cooking fumes.'
    },
    {
      id: 2,
      question: 'Which detector classification indicates a rate-of-rise heat detector?',
      options: ['A1S', 'A1R', 'CS', 'BR'],
      correctAnswer: 1,
      explanation: 'A1R indicates a Class A1 rate-of-rise heat detector. The "R" suffix denotes rate-of-rise functionality.'
    },
    {
      id: 3,
      question: 'What is the typical maximum coverage radius for a heat detector (Class A1)?',
      options: ['3.0 m', '5.3 m', '7.5 m', '10.0 m'],
      correctAnswer: 1,
      explanation: 'Class A1 heat detectors typically have a maximum coverage radius of 5.3 m under BS 5839-1, compared to 7.5 m for smoke detectors.'
    },
    {
      id: 4,
      question: 'What is the primary disadvantage of heat detectors compared to smoke detectors?',
      options: [
        'Higher cost',
        'Slower response time - fire must be more developed',
        'More prone to false alarms',
        'Require more maintenance'
      ],
      correctAnswer: 1,
      explanation: 'Heat detectors only respond once significant heat is generated, meaning the fire must be more developed before detection occurs.'
    },
    {
      id: 5,
      question: 'At what temperature does a typical fixed temperature heat detector activate?',
      options: ['47°C', '57°C', '67°C', '77°C'],
      correctAnswer: 1,
      explanation: 'Most fixed temperature heat detectors activate at around 57°C, though higher ratings are available for warmer environments.'
    },
    {
      id: 6,
      question: 'Why should heat detectors NOT be used in sleeping accommodation?',
      options: [
        'They are too expensive',
        'They respond too slowly to provide adequate warning time',
        'They cause false alarms',
        'BS 5839-1 prohibits their use'
      ],
      correctAnswer: 1,
      explanation: 'Heat detectors respond later than smoke detectors, potentially not providing enough warning time for sleeping occupants to evacuate safely.'
    },
    {
      id: 7,
      question: 'What does the "S" suffix indicate in heat detector classification (e.g., A1S)?',
      options: [
        'Special application',
        'Static/fixed temperature only',
        'High sensitivity',
        'Standard rating'
      ],
      correctAnswer: 1,
      explanation: 'The "S" suffix indicates a static (fixed temperature) heat detector that activates at a set threshold temperature.'
    },
    {
      id: 8,
      question: 'Which heat detector type combines both fixed temperature and rate-of-rise sensing?',
      options: [
        'Class A1S',
        'Class A1R',
        'Combined A1S/A1R',
        'Multisensor'
      ],
      correctAnswer: 2,
      explanation: 'Combined detectors (A1S/A1R) incorporate both sensing methods, providing both rate-of-rise and fixed maximum temperature activation.'
    },
    {
      id: 9,
      question: 'In which environment would a higher temperature rating heat detector be appropriate?',
      options: [
        'Office space',
        'Boiler room',
        'Corridor',
        'Bedroom'
      ],
      correctAnswer: 1,
      explanation: 'Boiler rooms and similar hot environments require higher temperature rating detectors to avoid false alarms from normal ambient temperatures.'
    },
    {
      id: 10,
      question: 'What is a key advantage of heat detectors over smoke detectors?',
      options: [
        'Faster response time',
        'Not affected by dust, steam, or fumes',
        'Greater coverage area',
        'Lower installation cost'
      ],
      correctAnswer: 1,
      explanation: 'Heat detectors are unaffected by dust, steam, aerosols, and fumes that would cause false alarms with smoke detectors.'
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
            <Link to="../module-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 2</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Thermometer className="h-7 w-7 text-green-400" />
          </div>
          <span className="text-[11px] font-medium text-green-400 uppercase tracking-wide">
            Section 2 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Heat Detectors
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding fixed temperature and rate-of-rise heat detector technologies, classifications, and correct application per BS 5839-1.
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
      <section className="px-4 pb-6 max-w-4xl mx-auto">
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
              <span><strong>Fixed temperature (S)</strong> - activates at set threshold (typically 57°C)</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Rate-of-rise (R)</strong> - activates on rapid temperature increase (6-8°C/min)</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Best for kitchens, boiler rooms, dusty areas</strong> - immune to smoke/steam false alarms</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain how fixed temperature heat detectors work",
            "Explain how rate-of-rise heat detectors work",
            "Interpret BS 5839-1 heat detector classifications",
            "Apply heat detector siting and spacing requirements",
            "Select appropriate heat detector types for different environments",
            "Understand limitations compared to smoke detection"
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
      <section className="px-4 pb-6 max-w-4xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Introduction to Heat Detection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Heat detectors respond to <strong className="text-white">elevated temperatures</strong> rather than smoke particles. They are ideal for environments where smoke detectors would cause false alarms, such as kitchens, boiler rooms, and dusty workshops.</p>
              <p>The key trade-off is <strong className="text-white">response time</strong> - a fire must be more developed to generate sufficient heat, meaning heat detectors provide less early warning than smoke detectors.</p>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Heat detectors should NOT be used as the primary detection in sleeping accommodation due to slower response.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Fixed Temperature (Static) Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> Activates when the surrounding air temperature reaches a predetermined threshold. The most common rating is <strong className="text-white">57°C</strong>, though higher ratings (e.g., 78°C, 90°C) are available for warmer environments.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Classification Suffix: S (Static)</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />A1S - Class A1 fixed temperature</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />A2S - Class A2 fixed temperature</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />BS, CS, DS - Other classes with varying response</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Boiler rooms, laundries, areas with normally elevated temperatures.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Rate-of-Rise Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> Activates when temperature increases rapidly - typically <strong className="text-white">6-8°C per minute</strong>. This responds faster than fixed temperature detection to developing fires.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Classification Suffix: R (Rate-of-rise)</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />A1R - Class A1 rate-of-rise</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Responds to rapid temperature changes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Faster response than fixed temperature in most fires</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Kitchens, garages, workshops - where temperature normally remains stable.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A commercial kitchen requires fire detection but smoke detectors cause constant false alarms. What detector type should you specify?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Rate-of-rise heat detector (A1R) - responds to rapid temperature increases from fire but is unaffected by cooking fumes and steam.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">BS 5839-1 Classifications</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Heat detectors are classified by their response characteristics under BS EN 54-5.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-white">Class</th>
                      <th className="text-left py-2 pr-4 text-white/70">Response Time</th>
                      <th className="text-left py-2 text-white/70">Coverage Radius</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-green-400 font-medium">A1</td>
                      <td className="py-2 pr-4">Fastest</td>
                      <td className="py-2">5.3 m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-green-400 font-medium">A2</td>
                      <td className="py-2 pr-4">Very fast</td>
                      <td className="py-2">5.3 m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-green-400 font-medium">B</td>
                      <td className="py-2 pr-4">Fast</td>
                      <td className="py-2">5.3 m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-green-400 font-medium">C</td>
                      <td className="py-2 pr-4">Standard</td>
                      <td className="py-2">5.3 m</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-green-400 font-medium">D, E, F, G</td>
                      <td className="py-2 pr-4">Slower (special use)</td>
                      <td className="py-2">Varies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-white/60 italic">Note: Class A1 and A2 are most commonly specified for fire alarm systems.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Siting and Spacing Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Heat detectors have smaller coverage areas than smoke detectors due to their sensing method.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Requirements (BS 5839-1):</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Coverage radius:</strong> 5.3 m for Class A1/A2 (flat ceiling)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Distance from walls:</strong> Minimum 500 mm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Ceiling mounting:</strong> 25-150 mm below apex for pitched roofs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Temperature rating:</strong> Select appropriate for ambient conditions</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Choose detector temperature rating at least 25°C above maximum expected ambient temperature.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Application Guidelines</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Selecting between fixed temperature and rate-of-rise depends on the environment characteristics.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-green-400 mb-2">Rate-of-Rise (A1R)</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Kitchens and cooking areas</li>
                    <li>Garages and vehicle areas</li>
                    <li>Workshops (stable temperature)</li>
                    <li>Storage areas</li>
                  </ul>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-orange-400 mb-2">Fixed Temperature (A1S)</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Boiler rooms</li>
                    <li>Laundries</li>
                    <li>Areas with fluctuating temperatures</li>
                    <li>Hot process environments</li>
                  </ul>
                </div>
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
            <p className="text-[15px] text-white/80 mb-3">A boiler room has ambient temperatures up to 45°C. What detector type and rating would you specify?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Fixed temperature heat detector (A1S) with 78°C rating - at least 25°C above maximum ambient. Rate-of-rise could false alarm from normal boiler cycling.</p>
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
                  Combined detectors (A1S/A1R) provide both rate-of-rise response and fixed temperature backup
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Always document the rationale for heat detector selection over smoke detection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider multisensor detectors as an alternative where both types might be appropriate
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
                  Using heat detectors where fast detection is critical (sleeping accommodation)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Selecting temperature rating too close to ambient - causes false alarms
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using rate-of-rise in areas with rapid legitimate temperature changes
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
            { q: "Can I use heat detectors in escape routes?", a: "Generally no - smoke detectors are required on escape routes for early warning. Heat detectors may supplement but not replace smoke detection." },
            { q: "What if a kitchen opens directly onto a corridor?", a: "Use heat detection in the kitchen and smoke detection in the corridor. Consider a multisensor at the transition point." },
            { q: "How do I choose between A1 and A2 class?", a: "A1 is the fastest response and most commonly specified. A2 may be used where slightly slower response is acceptable." },
            { q: "Can heat detectors be used with addressable systems?", a: "Yes - addressable heat detectors are available and recommended for larger installations to identify exact device locations." },
            { q: "Do heat detectors require regular testing?", a: "Yes - weekly functional testing on rotation and annual servicing including thermal response testing per BS 5839-1." },
            { q: "What is the maximum ceiling height for heat detectors?", a: "BS 5839-1 recommends Class A1/A2 heat detectors up to 9 m ceiling height. Above this, consider linear heat detection or other solutions." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of heat detectors with 10 questions.</p>
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
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="../module-2/section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-2/section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule2Section2;
