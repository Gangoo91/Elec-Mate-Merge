import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Sounders & VADs - Fire Alarm Course Module 2";
const DESCRIPTION = "Learn about fire alarm sounders, visual alarm devices (VADs), sound pressure levels, BS 5839-1 requirements, and accessibility considerations.";

const FireAlarmModule2Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data - 10 questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the minimum sound pressure level (SPL) required for a fire alarm sounder at the bedhead in sleeping accommodation?',
      options: ['60 dB(A)', '65 dB(A)', '75 dB(A)', '85 dB(A)'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 requires a minimum of 75 dB(A) at the bedhead in sleeping accommodation to ensure the alarm is heard and wakes sleeping occupants.'
    },
    {
      id: 2,
      question: 'What is the minimum SPL requirement in areas where occupants are awake?',
      options: ['60 dB(A) or 5 dB above ambient', '65 dB(A) or 5 dB above ambient', '65 dB(A)', '75 dB(A)'],
      correctAnswer: 1,
      explanation: 'In areas where occupants are awake, sounders must achieve 65 dB(A), or 5 dB above any background noise likely to persist for more than 30 seconds.'
    },
    {
      id: 3,
      question: 'What is the purpose of Visual Alarm Devices (VADs)?',
      options: [
        'To provide illumination during evacuation',
        'To alert people with hearing impairments',
        'To indicate the location of fire',
        'To replace sounders in all areas'
      ],
      correctAnswer: 1,
      explanation: 'VADs provide visual warning for deaf or hearing-impaired occupants who may not hear audible fire alarms.'
    },
    {
      id: 4,
      question: 'What colour should fire alarm VADs typically produce?',
      options: ['Blue', 'Amber', 'Red', 'Green'],
      correctAnswer: 2,
      explanation: 'Fire alarm VADs should produce red or white light. Red is the traditional fire alarm colour, though white is permitted and often provides better visibility.'
    },
    {
      id: 5,
      question: 'Where are VADs specifically required by BS 5839-1?',
      options: [
        'In every room',
        'In areas with deaf or hearing-impaired occupants',
        'Only in bedrooms',
        'Only in corridors'
      ],
      correctAnswer: 1,
      explanation: 'VADs are required where hearing-impaired people are likely to be alone and may not hear the audible alarm, such as disabled toilets, bedrooms, or workstations.'
    },
    {
      id: 6,
      question: 'What is the maximum SPL to avoid causing discomfort?',
      options: ['100 dB(A)', '110 dB(A)', '120 dB(A)', '130 dB(A)'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends the SPL should not exceed 120 dB(A) at any point to prevent discomfort and potential hearing damage.'
    },
    {
      id: 7,
      question: 'Why might different sounder tones be used in a building?',
      options: [
        'To create musical variety',
        'To distinguish between fire alarm and other alerts (e.g., evacuation vs alert)',
        'Because cheaper sounders have different tones',
        'For aesthetic reasons only'
      ],
      correctAnswer: 1,
      explanation: 'Different tones can distinguish the fire alarm from other building alerts and can signal different evacuation strategies (e.g., phased evacuation).'
    },
    {
      id: 8,
      question: 'What type of sounder might be used in a noisy industrial environment?',
      options: [
        'Standard electronic sounder',
        'High-power sounder or multiple sounders',
        'Voice alarm system',
        'Both B and C may be appropriate'
      ],
      correctAnswer: 3,
      explanation: 'Noisy environments may require high-power sounders or voice alarm systems. Multiple sounders can be distributed to achieve coverage.'
    },
    {
      id: 9,
      question: 'What is a key benefit of voice alarm systems over traditional sounders?',
      options: [
        'They are cheaper to install',
        'They provide clear spoken instructions to aid evacuation',
        'They are louder than sounders',
        'They do not require regular testing'
      ],
      correctAnswer: 1,
      explanation: 'Voice alarm systems provide clear spoken instructions, which can be particularly useful in complex buildings or where occupants are unfamiliar with evacuation procedures.'
    },
    {
      id: 10,
      question: 'In a phased evacuation building, what do the two different alert and evacuate signals indicate?',
      options: [
        'Fault and normal operation',
        'Alert (prepare to evacuate) and Evacuate (leave immediately)',
        'Test mode and live mode',
        'Fire in zone and all clear'
      ],
      correctAnswer: 1,
      explanation: 'In phased evacuation, the alert signal warns staff to prepare for evacuation while the evacuate signal indicates immediate evacuation is required.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 4</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Volume2 className="h-7 w-7 text-green-400" />
          </div>
          <span className="text-[11px] font-medium text-green-400 uppercase tracking-wide">
            Section 4 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Sounders & VADs
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding fire alarm warning devices: audible sounders, visual alarm devices, and voice alarm systems per BS 5839-1.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            6 learning outcomes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            25-30 mins
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
              <span><strong>75 dB(A) at bedhead</strong> for sleeping areas, 65 dB(A) or 5 dB above ambient for awake areas</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>VADs required</strong> where hearing-impaired people may be alone and unable to hear alarms</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Voice alarms</strong> provide spoken instructions, ideal for complex or unfamiliar buildings</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "State BS 5839-1 sound pressure level requirements",
            "Explain the purpose and placement of VADs",
            "Describe different sounder types and their applications",
            "Understand voice alarm system benefits",
            "Apply accessibility requirements for warning devices",
            "Design appropriate warning device coverage"
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
              <h3 className="text-[17px] font-semibold text-white">Introduction to Warning Devices</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm warning devices alert building occupants to evacuate. They must be <strong className="text-white">audible and/or visible</strong> throughout the building to ensure everyone receives adequate warning.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Types of Warning Devices:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Audible sounders (bells, electronic sounders)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Visual Alarm Devices (VADs) - flashing beacons</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Voice alarm systems - spoken messages</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Combined sounder/VAD units</li>
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
              <h3 className="text-[17px] font-semibold text-white">Sound Pressure Level Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 specifies <strong className="text-white">minimum sound levels</strong> to ensure alarms can be heard throughout the building.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-green-400 mb-2">Sleeping Accommodation</p>
                  <ul className="space-y-1 text-[13px]">
                    <li><strong>Minimum 75 dB(A)</strong> at bedhead</li>
                    <li>Must wake sleeping occupants</li>
                    <li>With all doors closed</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-blue-400 mb-2">Awake Occupants</p>
                  <ul className="space-y-1 text-[13px]">
                    <li><strong>Minimum 65 dB(A)</strong></li>
                    <li>Or 5 dB above ambient noise</li>
                    <li>Whichever is greater</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Maximum SPL should not exceed 120 dB(A) to prevent discomfort and hearing damage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Visual Alarm Devices (VADs)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>VADs provide <strong className="text-white">visual warning</strong> for people who are deaf or hearing-impaired and may not hear audible alarms.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Where VADs Are Required:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Disabled WCs and accessible facilities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Bedrooms in premises with hearing-impaired occupants</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Workstations where employees may be alone</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Noisy environments where sounders may not be heard</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">VAD Specifications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Colour:</strong> Red or white flash</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Flash rate:</strong> 0.5 to 2 Hz (1-4 flashes per second)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Coverage:</strong> Must be visible from all positions</li>
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
            <p className="text-[15px] text-white/80 mb-3">A hotel bedroom measures 68 dB(A) at the pillow with the door closed. Is this compliant for sleeping accommodation?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - sleeping accommodation requires a minimum of 75 dB(A) at the bedhead. Additional sounders or higher-output devices are needed.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Types of Sounders</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Various sounder types are available to suit different environments and requirements.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Common Sounder Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Electronic sounders:</strong> Most common, adjustable tone/volume</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Bells:</strong> Traditional, distinctive sound</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>High-power sounders:</strong> For noisy environments</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Sounder/VAD combinations:</strong> Integrated audible and visual</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">All sounders should produce a consistent tone throughout the building to avoid confusion.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Voice Alarm Systems</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Voice alarm systems provide <strong className="text-white">spoken messages</strong> instead of or in addition to traditional tones.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Benefits of Voice Alarm:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Clear evacuation instructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Supports phased evacuation strategies</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Can provide zone-specific messages</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Reduces panic through clear communication</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Multi-language capability for diverse buildings</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Voice alarm must comply with BS 5839-8 for design, installation and maintenance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Phased Evacuation Signalling</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>In buildings with <strong className="text-white">phased evacuation</strong>, different signals indicate alert and evacuate stages.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-amber-400 mb-2">Alert Signal</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Intermittent tone</li>
                    <li>Staff prepare for evacuation</li>
                    <li>Fire wardens investigate</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-red-400 mb-2">Evacuate Signal</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Continuous tone</li>
                    <li>Immediate evacuation required</li>
                    <li>All occupants leave building</li>
                  </ul>
                </div>
              </div>
              <p className="text-[13px] text-white/60 italic">Staff training is essential to ensure correct response to each signal type.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A disabled WC is located away from the main corridor. What warning device provision is required?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> A VAD (visual alarm device) must be installed inside the WC to alert hearing-impaired users who may not hear the main sounders.</p>
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
            <p className="text-[15px] text-white/80 mb-3">A factory floor has background noise levels of 85 dB(A). What SPL should the fire alarm achieve?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> At least 90 dB(A) - sounders must achieve 5 dB above the persistent background noise of 85 dB(A). Consider high-power sounders or VADs.</p>
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
                  Measure actual sound levels during commissioning with calibrated equipment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider using combined sounder/VAD units to reduce installation costs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  In voice alarm systems, use pre-recorded messages for consistency
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
                  Not measuring sound levels at the pillow position in bedrooms
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Omitting VADs in disabled WCs and accessible facilities
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using different sounder tones in different areas causing confusion
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
            { q: "Can I use green VADs for the fire alarm?", a: "No - green is typically reserved for emergency exit signage. Fire alarm VADs should be red or white." },
            { q: "How do I test VADs?", a: "VADs should be tested during weekly tests by visual inspection to confirm correct operation. Annual service should include detailed checks." },
            { q: "What if occupants are wearing ear protection?", a: "Consider additional measures such as VADs, personal pager systems, or flashing lights on machinery that stop when the alarm activates." },
            { q: "Do I need sounders in every room?", a: "Not necessarily - sounders must achieve the required SPL at all points. Open-plan areas may require fewer devices than cellular offices." },
            { q: "Can voice alarm replace traditional sounders?", a: "Yes - voice alarm systems can be the primary warning method, but must still achieve the required sound levels and include a warning tone." },
            { q: "What tone should fire alarm sounders produce?", a: "BS 5839-1 recommends a continuous or modulating tone. The key requirement is consistency throughout the building." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of sounders and VADs with 10 questions.</p>
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
            <Link to="../module-2/section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-2/section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule2Section4;
