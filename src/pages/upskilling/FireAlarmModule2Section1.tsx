import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wind, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Smoke Detectors - Fire Alarm Course Module 2";
const DESCRIPTION = "Learn about optical and ionisation smoke detectors, operating principles, siting requirements, and BS 5839-1 compliance for fire alarm systems.";

const FireAlarmModule2Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  // Quiz Data - 10 questions
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which smoke detector type is better for smouldering fires?',
      options: ['Optical (Photoelectric)', 'Ionisation', 'Heat - Fixed Temperature', 'Beam'],
      correctAnswer: 0,
      explanation: 'Optical detectors are more responsive to larger smoke particles from smouldering fires, making them ideal for bedrooms and escape routes.'
    },
    {
      id: 2,
      question: 'Which smoke detector type is more prone to nuisance alarms from cooking fumes?',
      options: ['Optical (Photoelectric)', 'Ionisation', 'Multisensor', 'Beam'],
      correctAnswer: 1,
      explanation: 'Ionisation detectors are more susceptible to nuisance alarms from cooking fumes and steam due to their sensitivity to smaller particles.'
    },
    {
      id: 3,
      question: 'What is the typical maximum coverage radius for a smoke detector on a flat ceiling?',
      options: ['5.0 m', '7.5 m', '10.0 m', '12.5 m'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 typically specifies 7.5 m radius coverage for smoke detectors, though this should be reduced for obstructions and room geometry.'
    },
    {
      id: 4,
      question: 'What minimum distance should smoke detectors be mounted from walls?',
      options: ['100 mm', '300 mm', '500 mm', '600 mm'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends smoke detectors should be at least 500 mm from walls to avoid dead air spaces where smoke may not reach.'
    },
    {
      id: 5,
      question: 'How does an optical smoke detector work?',
      options: [
        'By ionising air particles with a radioactive source',
        'By measuring temperature rise',
        'By detecting light scattered by smoke particles in a chamber',
        'By detecting infrared beam interruption'
      ],
      correctAnswer: 2,
      explanation: 'Optical detectors use a light source and photosensor - when smoke enters the chamber, particles scatter the light onto the sensor, triggering the alarm.'
    },
    {
      id: 6,
      question: 'In a sleeping risk area, which detector type is most appropriate?',
      options: ['Heat detector (fixed temperature)', 'Optical smoke detector', 'Ionisation smoke detector', 'Beam detector'],
      correctAnswer: 1,
      explanation: 'Optical smoke detectors provide the fastest response to smouldering fires common in bedrooms and are recommended for sleeping risk areas.'
    },
    {
      id: 7,
      question: 'Which detector type should be avoided in dusty environments?',
      options: [
        'Fixed temperature heat detector',
        'Rate-of-rise heat detector',
        'Optical smoke detector',
        'All smoke detectors (both ionisation and optical)'
      ],
      correctAnswer: 3,
      explanation: 'Both ionisation and optical smoke detectors can be affected by dust, leading to false alarms. Heat detectors are preferred in dusty environments.'
    },
    {
      id: 8,
      question: 'What is thermal stratification and why does it affect smoke detectors?',
      options: [
        'Hot air rises and can prevent smoke reaching ceiling detectors',
        'Cold air sinking improves detector response',
        'A method of cooling detectors',
        'The way detectors are manufactured'
      ],
      correctAnswer: 0,
      explanation: 'Thermal stratification occurs when hot air forms a layer below the ceiling, preventing smoke from reaching detectors. This is important in high spaces.'
    },
    {
      id: 9,
      question: 'Why are ionisation detectors becoming less common in the UK?',
      options: [
        'They are more expensive',
        'They contain radioactive material requiring special disposal',
        'They do not work with addressable systems',
        'They require more maintenance'
      ],
      correctAnswer: 1,
      explanation: 'Ionisation detectors contain a small radioactive source (Americium-241) which requires special handling and disposal, leading many to prefer optical types.'
    },
    {
      id: 10,
      question: 'What is the recommended maximum ceiling height for point smoke detectors?',
      options: ['6 m', '9 m', '10.5 m', '12 m'],
      correctAnswer: 2,
      explanation: 'BS 5839-1 recommends point smoke detectors up to 10.5 m ceiling height. Above this, beam or aspirating detection may be more appropriate.'
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Wind className="h-7 w-7 text-green-400" />
          </div>
          <span className="text-[11px] font-medium text-green-400 uppercase tracking-wide">
            Section 1 of 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Smoke Detectors
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding optical and ionisation smoke detector technologies, operating principles, and correct application per BS 5839-1.
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
              <span><strong>Optical detectors</strong> - best for smouldering fires, less prone to cooking fumes, recommended for bedrooms</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>Ionisation detectors</strong> - respond faster to flaming fires but more prone to false alarms</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong>7.5 m typical coverage radius</strong> - maintain 500 mm from walls, avoid dusty/steamy areas</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Explain how optical (photoelectric) smoke detectors work",
            "Explain how ionisation smoke detectors work",
            "Compare advantages and limitations of each detector type",
            "Apply BS 5839-1 siting and spacing requirements",
            "Select the appropriate smoke detector type for different environments",
            "Identify common causes of false alarms and mitigation strategies"
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
              <h3 className="text-[17px] font-semibold text-white">Introduction to Smoke Detection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Smoke detectors are the most common type of automatic fire detector, designed to provide <strong className="text-white">early warning</strong> by detecting smoke particles before a fire develops significantly.</p>
              <p>Under BS 5839-1, smoke detectors are essential for L category (life safety) systems, particularly in escape routes and sleeping accommodation where early detection is critical for safe evacuation.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Two Main Types:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Optical (Photoelectric) - uses light scattering</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Ionisation - uses radioactive source</li>
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
              <h3 className="text-[17px] font-semibold text-white">Optical (Photoelectric) Smoke Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> An optical detector contains a light source (LED) and a photosensor arranged so that light does not normally reach the sensor. When smoke enters the chamber, particles scatter the light onto the photosensor, triggering the alarm.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Characteristics:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Best for smouldering fires with large smoke particles</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Less prone to false alarms from cooking fumes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />No radioactive components - easier disposal</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Recommended for sleeping accommodation</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Typical applications: Bedrooms, hotel rooms, escape routes, offices, corridors.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Ionisation Smoke Detectors</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p><strong className="text-green-400">Operating Principle:</strong> Contains a small radioactive source (Americium-241) that ionises the air between two electrodes. When smoke enters, it disrupts the ion flow, changing the current and triggering the alarm.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Characteristics:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Responds faster to fast-flaming fires</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />More sensitive to smaller smoke particles</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />More prone to false alarms from cooking/steam</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Contains radioactive material - special disposal</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Ionisation detectors are becoming less common in the UK due to disposal requirements and nuisance alarm susceptibility.
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
            <p className="text-[15px] text-white/80 mb-3">A hotel bedroom requires smoke detection. Which detector type is most appropriate and why?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Optical (photoelectric) detector - better response to smouldering fires (common in bedrooms from cigarettes, bedding), less prone to false alarms, and no radioactive disposal concerns.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Siting and Spacing Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>BS 5839-1 provides specific guidance on smoke detector positioning to ensure effective coverage whilst avoiding false alarm sources.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Coverage radius:</strong> 7.5 m typical (flat ceiling)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Distance from walls:</strong> Minimum 500 mm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Maximum ceiling height:</strong> 10.5 m for point detectors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /><strong>Distance from light fittings:</strong> Minimum 500 mm</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Coverage must be reduced where beams, partitions, or obstructions affect smoke flow.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Environmental Considerations</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Selecting the right smoke detector requires consideration of the environment and potential false alarm sources.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-green-400 mb-2">Suitable Environments</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Offices and workspaces</li>
                    <li>Bedrooms and hotel rooms</li>
                    <li>Corridors and escape routes</li>
                    <li>Storage areas (clean)</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-[13px] font-semibold text-red-400 mb-2">Avoid or Use Caution</p>
                  <ul className="space-y-1 text-[13px]">
                    <li>Kitchens (use heat detectors)</li>
                    <li>Bathrooms with steam</li>
                    <li>Dusty environments</li>
                    <li>Near air diffusers</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">False Alarm Prevention</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>False alarms undermine confidence and can lead to dangerous complacency. Proper detector selection and siting are essential.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Mitigation Strategies:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Choose optical over ionisation near cooking areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Position away from air diffusers and vents</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Consider multisensor detectors for variable environments</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Regular maintenance and cleaning schedules</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" />Use heat detectors where smoke detection is inappropriate</li>
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
            <p className="text-[15px] text-white/80 mb-3">A warehouse has 12 m high ceilings. Can you use point smoke detectors?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> No - BS 5839-1 recommends point smoke detectors up to 10.5 m. For 12 m ceilings, consider beam detectors or aspirating smoke detection (ASD) systems.</p>
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
                  Default to optical detectors for most applications - they offer the best balance of sensitivity and false alarm resistance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Always check ceiling height and adjust detector type selection accordingly - stratification affects smoke reaching detectors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Document your detector selection rationale in the design documentation for future reference
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
                  Using smoke detectors in kitchens or steamy areas - this will cause repeated false alarms
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Mounting detectors too close to walls or in corners where dead air pockets form
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Ignoring ceiling height limitations - point detectors above 10.5 m may not detect smoke effectively
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
            { q: "Can I mix optical and ionisation detectors in the same system?", a: "Yes - you can use different detector types in different zones based on the environment. An addressable system will identify each detector individually." },
            { q: "How often should smoke detectors be tested?", a: "BS 5839-1 requires weekly functional testing on a rotation basis, plus annual servicing including smoke response testing." },
            { q: "What if a room has both cooking and sleeping?", a: "Consider a multisensor detector with adjustable sensitivity, or heat detection near cooking with smoke detection for sleeping areas." },
            { q: "Do all smoke detectors need to be addressable?", a: "Not for conventional systems, but addressable detectors are recommended for larger buildings to quickly identify the activated device location." },
            { q: "How do I dispose of ionisation detectors?", a: "Return to the manufacturer or a licensed radioactive waste disposal company. Never dispose of in general waste." },
            { q: "Can smoke detectors be painted?", a: "No - painting can block the sensing chamber entry and significantly reduce sensitivity. Replace with colour-matched detectors if aesthetics are important." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of smoke detectors with 10 questions.</p>
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
            <Link to="/study-centre/upskilling/fire-alarm-module-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="/study-centre/upskilling/fire-alarm-module-2-section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule2Section1;
