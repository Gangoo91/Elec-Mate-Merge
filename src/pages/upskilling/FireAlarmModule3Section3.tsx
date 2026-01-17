import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Sounder Zones - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 sounder zone design: audibility requirements, alarm signals, voice alarm systems, VADs, and phased evacuation considerations.";

const FireAlarmModule3Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the general audibility target for fire alarm sounders in most occupied areas?',
      options: ['55 dB(A)', '65 dB(A) or 5 dB above ambient', '75 dB(A) everywhere', '85 dB(A)'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 specifies 65 dB(A) or 5 dB above ambient noise - whichever is greater.'
    },
    {
      id: 2,
      question: 'What audibility level is required at the bedhead in sleeping accommodation?',
      options: ['55 dB(A)', '65 dB(A)', '75 dB(A) with doors closed', '85 dB(A)'],
      correctAnswer: 2,
      explanation: 'Sleeping areas require 75 dB(A) at the bedhead with bedroom doors closed to ensure occupants are awakened.'
    },
    {
      id: 3,
      question: 'Why should multiple visual alarm devices (VADs) be synchronised?',
      options: ['To save power', 'To reduce photosensitive risk and provide clear, unified signalling', 'For aesthetic reasons', 'It is not required'],
      correctAnswer: 1,
      explanation: 'Synchronised VADs reduce photosensitive risk and provide clearer, more recognisable warning signals.'
    },
    {
      id: 4,
      question: 'What distinguishes an "alert" signal from an "evacuate" signal in phased evacuation?',
      options: ['Volume only', 'Alert prepares occupants to standby; evacuate instructs immediate departure', 'They are identical', 'Alert is visual only'],
      correctAnswer: 1,
      explanation: 'Alert signals prepare occupants in adjacent areas while evacuate signals instruct immediate departure from the affected zone.'
    },
    {
      id: 5,
      question: 'For voice alarm systems, what is more important than maximum loudness?',
      options: ['Lowest cost', 'Intelligibility (speech transmission index)', 'Number of speakers', 'Aesthetic appearance'],
      correctAnswer: 1,
      explanation: 'Speech intelligibility (measured by STI) is critical - occupants must understand evacuation instructions clearly.'
    },
    {
      id: 6,
      question: 'What is the primary purpose of sounder zones in fire alarm design?',
      options: ['Reduce equipment costs', 'Enable selective alerting based on fire location and evacuation strategy', 'Simplify wiring', 'Meet aesthetic requirements'],
      correctAnswer: 1,
      explanation: 'Sounder zones enable selective alerting, supporting phased evacuation and preventing unnecessary building-wide alarm.'
    },
    {
      id: 7,
      question: 'When should different alarm tones be used within the same building?',
      options: ['Never - one tone throughout', 'To distinguish different alarm types (e.g., fire vs. gas)', 'Based on occupant preferences', 'Only in hospitals'],
      correctAnswer: 1,
      explanation: 'Different tones can distinguish alarm types (fire, gas, security) but must be clearly recognisable and documented in fire procedures.'
    },
    {
      id: 8,
      question: 'What consideration is needed for sounder placement in high-ceiling areas?',
      options: ['Ceiling height has no effect', 'Sound may need to be supplemented or speakers angled to maintain audibility at occupant level', 'Only VADs are needed', 'Use louder sounders automatically'],
      correctAnswer: 1,
      explanation: 'High ceilings can affect sound distribution; supplementary wall-mounted sounders or angled speakers may be needed to maintain audibility at floor level.'
    },
    {
      id: 9,
      question: 'How should class change or test signals differ from fire alarms?',
      options: ['They should sound identical', 'Clearly distinguishable tones to prevent confusion or inappropriate response', 'No signal should be used', 'Visual only'],
      correctAnswer: 1,
      explanation: 'Test and class change signals must be clearly distinguishable from fire alarms to prevent confusion and maintain appropriate response to actual fire signals.'
    },
    {
      id: 10,
      question: 'What documentation should specify sounder zone arrangements?',
      options: ['No documentation needed', 'Cause and effect matrix and zone drawings', 'Only verbal instructions', 'Manufacturer catalogues only'],
      correctAnswer: 1,
      explanation: 'Cause and effect documentation and zone drawings must clearly specify which sounders operate for each detection zone and scenario.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Volume2 className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 3 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Sounder Zones
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Designing effective alarm signalling with audibility, voice alarm, VADs, and phased evacuation support.
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
              <span><strong>Audibility targets:</strong> 65 dB(A) or +5 dB general areas; 75 dB(A) at bedhead for sleeping risk</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Sounder zones</strong> enable selective alerting and support phased evacuation strategies</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Voice alarm</strong> prioritises intelligibility; <strong>VADs</strong> support hearing-impaired and noisy areas</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Apply BS 5839-1 audibility requirements for general and sleeping areas",
            "Design sounder zones to support evacuation strategy",
            "Specify voice alarm systems with appropriate intelligibility",
            "Select and position VADs for effective visual warning",
            "Understand alert vs evacuate signalling for phased evacuation",
            "Coordinate sounder zones with cause and effect programming"
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
              <h3 className="text-[17px] font-semibold text-white">Audibility Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm sounders must provide adequate warning throughout all occupied areas:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">BS 5839-1 Audibility Targets:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>General areas:</strong> 65 dB(A) or 5 dB above ambient (whichever greater)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Sleeping areas:</strong> 75 dB(A) at the bedhead with doors closed</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Noisy environments:</strong> consider ambient noise levels during occupied hours</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Sound level calculations should account for absorption, distance, and intervening barriers.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Sounder Zone Design</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Sounder zones enable <strong className="text-white">selective alerting</strong> based on fire location and evacuation strategy:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Zone Design Principles:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Align sounder zones with evacuation strategy (phased/simultaneous)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Consider floor-by-floor or area-based zoning for phased evacuation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Protected stairs may have separate sounder arrangements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Coordinate with cause and effect matrix for each detection zone</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Alert and Evacuate Signals</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Phased evacuation uses distinct signals to control occupant movement:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Signal Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">Alert:</strong> Intermittent tone or message - prepare to leave, await further instruction</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-3 w-3 text-amber-400 mt-1" /><span><strong className="text-amber-400">Evacuate:</strong> Continuous tone or urgent message - leave immediately</span></li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Fire floor and floor above typically receive immediate evacuate signal; other floors receive alert.
                </p>
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
            <p className="text-[15px] text-white/80 mb-3">A hotel has noisy plant on the ground floor with ambient levels around 70 dB(A). What sounder level is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Sounders must achieve 75 dB(A) (5 dB above the 70 dB(A) ambient). Additionally, as a hotel with sleeping risk, bedrooms require 75 dB(A) at bedhead regardless of ambient levels.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Voice Alarm Systems</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Voice alarm provides clear spoken instructions rather than tones alone:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Voice Alarm Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Intelligibility:</strong> Prioritise STI (Speech Transmission Index) over loudness</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Reverberation:</strong> Control acoustic environment to maintain clarity</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Messages:</strong> Pre-recorded and live announcement capability</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Zoning:</strong> Enable targeted messages per zone or floor</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Voice alarm is particularly valuable for phased evacuation, multilingual environments, and complex buildings.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Visual Alarm Devices (VADs)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>VADs provide visual warning for hearing-impaired occupants and noisy environments:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">EN 54-23 Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category W:</strong> Wall-mounted - coverage specified in height x width</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category C:</strong> Ceiling-mounted - circular coverage pattern</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Category O:</strong> Open area - large space coverage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Synchronisation:</strong> Required where multiple VADs are visible</li>
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
            <p className="text-[15px] text-white/80 mb-3">Why must VADs be synchronised when multiple devices are visible from the same location?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Synchronisation reduces photosensitive epilepsy risk and provides a clearer, more recognisable warning signal. Unsynchronised flashing can cause disorientation and discomfort.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Sounder Placement Considerations</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Effective sounder placement ensures audibility throughout the protected area:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Placement Factors:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Account for room acoustics, absorption, and barriers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />High ceilings may require wall-mounted or angled speakers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Open-plan areas need distributed coverage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" />Avoid excessive loudness causing masking or distress</li>
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
                  Measure ambient noise during typical occupied hours, not when the building is empty
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider future use changes - plant rooms may become occupied spaces
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document sounder zones clearly in cause and effect matrix for commissioning
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
                  Ignoring sleeping risk audibility requirements (75 dB(A) at bedhead)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Omitting VADs in noisy areas or accessibility-critical spaces
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Unsynchronised VADs where multiple devices are visible
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
            { q: "Can sounder zones differ from detection zones?", a: "Yes - sounder zones are designed around evacuation strategy and may not match detection zones exactly. The cause and effect matrix defines how detection zones trigger sounder zones." },
            { q: "Is voice alarm always required?", a: "No - voice alarm is beneficial for complex buildings, phased evacuation, and multilingual environments but is not mandatory for all premises." },
            { q: "How do I calculate required sounder coverage?", a: "Use manufacturer data for sounder output and coverage patterns. Account for distance attenuation, absorption, and barriers. Verify with commissioning measurements." },
            { q: "Do VADs replace sounders?", a: "No - VADs supplement sounders. They provide visual warning for hearing-impaired occupants and noisy areas but do not replace audible warning." },
            { q: "What about test and class change signals?", a: "These must be clearly distinguishable from fire alarms. Use different tones, patterns, or pre-announcements to prevent confusion." },
            { q: "How should sounders operate during a fire drill?", a: "Fire drills should use the same signals as actual fire conditions to ensure familiarity. Brief occupants beforehand and record the drill in the logbook." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of sounder zones with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section3;
