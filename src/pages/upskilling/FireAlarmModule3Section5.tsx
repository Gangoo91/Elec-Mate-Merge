import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Special Applications - Fire Alarm Course";
const DESCRIPTION = "BS 5839-1 special applications: aspirating detection, flame detectors, duct detection, special environments, and heritage building considerations.";

const FireAlarmModule3Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary advantage of aspirating smoke detection (ASD)?',
      options: ['Lower cost than point detectors', 'Very early warning through continuous air sampling and high sensitivity', 'No maintenance required', 'Works without power'],
      correctAnswer: 1,
      explanation: 'ASD provides very early warning by continuously sampling air through a pipe network and detecting smoke at much lower concentrations than point detectors.'
    },
    {
      id: 2,
      question: 'When are flame detectors typically used?',
      options: ['In all buildings', 'In environments where smoke may not be present or where very fast fire development is expected', 'Only outdoors', 'Never in the UK'],
      correctAnswer: 1,
      explanation: 'Flame detectors are used for fast-developing fires involving flammable liquids/gases, or where smoke may dissipate before reaching conventional detectors (e.g., outdoor or high-airflow areas).'
    },
    {
      id: 3,
      question: 'What is the purpose of duct smoke detection?',
      options: ['Detect smoke outside the building', 'Detect smoke being distributed through HVAC systems before it spreads to occupied areas', 'Replace room detectors', 'Monitor outdoor air quality'],
      correctAnswer: 1,
      explanation: 'Duct detectors identify smoke being transported through HVAC systems, enabling early shutdown or smoke control before contamination spreads to occupied areas.'
    },
    {
      id: 4,
      question: 'What special consideration applies to detection in dusty environments?',
      options: ['Standard smoke detectors work fine', 'Use detectors designed for harsh environments with appropriate filtration or technology', 'Detection is not required', 'Only heat detectors are permitted'],
      correctAnswer: 1,
      explanation: 'Dusty environments require detectors with appropriate filtration, shielding, or alternative technologies (e.g., beam detectors, heat detectors) to prevent false alarms and ensure reliable detection.'
    },
    {
      id: 5,
      question: 'Why might heritage buildings require special detection approaches?',
      options: ['They do not need fire detection', 'Conservation requirements may limit visible equipment and cable routes', 'Only wireless systems are permitted', 'BS 5839-1 does not apply'],
      correctAnswer: 1,
      explanation: 'Heritage buildings often have conservation restrictions limiting visible cables and equipment; discrete mounting, wireless systems, or concealed detection may be needed.'
    },
    {
      id: 6,
      question: 'What type of detection is often used in clean rooms and data centres?',
      options: ['Standard point smoke detectors only', 'Aspirating smoke detection for very early warning without false alarms', 'Heat detectors only', 'No detection required'],
      correctAnswer: 1,
      explanation: 'ASD is commonly used in clean rooms and data centres for very early warning while maintaining clean room standards and minimising false alarm risk.'
    },
    {
      id: 7,
      question: 'How do optical beam detectors work?',
      options: ['Detecting heat only', 'Transmitting an infrared beam between transmitter and receiver; smoke reduces received signal', 'Using radioactive sources', 'Sampling air through pipes'],
      correctAnswer: 1,
      explanation: 'Beam detectors transmit an infrared beam between a transmitter and receiver; smoke particles scatter or absorb light, reducing the received signal and triggering an alarm.'
    },
    {
      id: 8,
      question: 'What factor is critical when installing aspirating detection sampling pipes?',
      options: ['Pipe colour matching decor', 'Correct sampling hole size and spacing to ensure representative air sampling', 'Only vertical runs are permitted', 'Pipes must be visible'],
      correctAnswer: 1,
      explanation: 'Sampling hole size and spacing determine airflow balance and detection sensitivity; incorrect design leads to uneven sampling and missed or delayed detection.'
    },
    {
      id: 9,
      question: 'When might linear heat detection (LHD) be used?',
      options: ['Only in cold stores', 'Along cable runs, conveyors, or where detection over a linear path is more practical than point detection', 'Only outdoors', 'Never in modern buildings'],
      correctAnswer: 1,
      explanation: 'Linear heat detection is well-suited to protecting cable trays, conveyors, tunnels, and other linear risks where discrete detection along the full length is needed.'
    },
    {
      id: 10,
      question: 'What challenge do high-airflow environments present for smoke detection?',
      options: ['No challenges exist', 'Smoke dilution may prevent detection or delay alarm significantly', 'Only flame detectors work', 'Heat detectors are faster in airflow'],
      correctAnswer: 1,
      explanation: 'High airflow dilutes smoke, potentially preventing it from reaching detectors or significantly delaying alarm. Duct detection, ASD, or closer detector spacing may be needed.'
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
            <Link to="../module-3">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 3</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Wrench className="h-7 w-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
            Section 5 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Special Applications
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Specialist detection technologies and challenging environments including ASD, flame detectors, and heritage buildings.
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
              <span><strong>Aspirating detection (ASD)</strong> provides very early warning for high-value assets and critical infrastructure</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Specialist detectors</strong> (flame, beam, LHD) address specific hazards and environments</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span><strong>Heritage and harsh environments</strong> require careful technology selection and installation methods</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain aspirating smoke detection principles and applications",
            "Select appropriate detection for special hazards (flame, beam, LHD)",
            "Design for challenging environments (dusty, cold, high-airflow)",
            "Address heritage building detection requirements",
            "Apply duct detection for HVAC smoke control",
            "Integrate specialist detection with conventional systems"
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
              <h3 className="text-[17px] font-semibold text-white">Aspirating Smoke Detection (ASD)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>ASD continuously samples air through a pipe network, providing very early warning of fire development:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">ASD Characteristics:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Very early warning:</strong> detects smoke at much lower concentrations than point detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Sampling network:</strong> pipes with calibrated holes draw air to central detector</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>High-value protection:</strong> data centres, clean rooms, heritage buildings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>EN 54-20:</strong> specifies sensitivity classes (A, B, C) for different applications</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Flame Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Flame detectors respond to the electromagnetic radiation from flames:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Flame Detector Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>IR (Infrared):</strong> detects infrared radiation from flames</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>UV (Ultraviolet):</strong> responds to UV radiation from flames</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Multi-spectrum:</strong> combines IR and UV for reduced false alarms</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Flame detectors require line-of-sight to the fire location and are suited to fast-developing fires involving flammable liquids/gases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Optical Beam Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Beam detectors use infrared beams to detect smoke across large areas:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Beam Detector Applications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>High ceilings:</strong> warehouses, atriums, churches</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Large open areas:</strong> exhibition halls, sports facilities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Maintenance access:</strong> easier than point detectors at height</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Mounting:</strong> requires stable mounting to prevent drift</li>
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
            <p className="text-[15px] text-white/80 mb-3">A data centre requires very early warning of incipient fire to allow pre-action response. Which detection technology is most appropriate?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Aspirating smoke detection (ASD) is the most appropriate choice. It provides very early warning at the incipient stage, allows air sampling from under-floor voids and ceiling spaces, and can be designed to avoid false alarms while maintaining high sensitivity.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Linear Heat Detection (LHD)</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>LHD uses continuous sensing cables to detect heat along their length:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">LHD Applications:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Cable trays:</strong> protecting cable routes from fire spread</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Conveyors:</strong> industrial process monitoring</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Tunnels:</strong> road and rail tunnel protection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Cold stores:</strong> withstands low temperatures where point detectors may fail</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Duct Smoke Detection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Duct detectors monitor HVAC systems to prevent smoke distribution:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Duct Detection Considerations:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Sampling tubes:</strong> extend across duct cross-section</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Airflow:</strong> minimum and maximum airflow rates apply</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Actions:</strong> HVAC shutdown, damper closure, or smoke control mode</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Access:</strong> ensure maintenance access for testing</li>
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
            <p className="text-[15px] text-white/80 mb-3">A Grade I listed building needs fire detection but the conservation officer has restricted visible cables and devices. What approaches might be suitable?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Consider aspirating detection with concealed sampling pipes, wireless detection systems, or discrete mounting with colour-matched devices. Coordinate with the conservation officer early in design to agree acceptable approaches that meet both fire safety and conservation requirements.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Challenging Environments</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Special consideration is needed for harsh or unusual conditions:</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Environment Solutions:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Dusty:</strong> filtered detectors, beam detectors, or heat detection</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Cold stores:</strong> LHD or specially rated detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>High-airflow:</strong> duct detection, ASD, or increased detector density</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Outdoor:</strong> weatherproof housings, flame detectors, or beam detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-amber-400" /><strong>Explosive:</strong> ATEX/IECEx rated equipment for hazardous areas</li>
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
                  For ASD, involve the manufacturer early to ensure correct pipe design and sensitivity settings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Engage conservation officers early for heritage buildings to agree detection approach
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document special detector justifications and maintenance requirements clearly
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
                  Specifying ASD without proper pipe network design calculations
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Forgetting maintenance access for duct detectors in ceiling voids
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using standard detectors in environments requiring specialist solutions
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
            { q: "Can ASD replace conventional point detection?", a: "Yes - ASD can provide equivalent or superior coverage. Design must follow EN 54-20 and manufacturer guidance. A single ASD unit can replace multiple point detectors in appropriate applications." },
            { q: "Do flame detectors work in all fire scenarios?", a: "No - flame detectors require line-of-sight and are best suited to fast-developing fires with visible flames. They may not detect smouldering fires before visible flame develops." },
            { q: "How often should ASD be maintained?", a: "Follow manufacturer guidance and BS 5839-1 recommendations. Typically annual service with periodic filter replacement and flow verification." },
            { q: "Can wireless detectors be used in heritage buildings?", a: "Yes - wireless systems can reduce visible cabling. Ensure adequate radio coverage and follow manufacturer guidance for battery replacement and signal monitoring." },
            { q: "What testing is needed for duct detectors?", a: "Regular functional testing using approved test methods (smoke simulation or detector removal for test). Verify HVAC interface actions operate correctly." },
            { q: "How do I specify detection for a cold store?", a: "Consider LHD rated for low temperatures, or point detectors rated for the temperature range. Standard smoke detectors may not function reliably at very low temperatures." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of special applications with 10 questions.</p>
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
            <Link to="../module-3/section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-3/section-6">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule3Section5;
