import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw, Server, Zap, Shield, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Control Panel Installation - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm control panel positioning, mounting, terminations and mains connection requirements per BS 5839-1 and BS 7671.";

const FireAlarmModule5Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'According to BS 5839-1, at what height should a fire alarm control panel be mounted?',
      options: [
        'Any convenient height',
        'Between 0.8m and 1.7m to the operating controls',
        'Above 2m for security',
        'Below 0.5m for accessibility'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 recommends that operating controls should be between 0.8m and 1.7m above floor level for accessibility and ease of operation.'
    },
    {
      id: 2,
      question: 'What is the minimum fire resistance period for the location where a fire alarm control panel is installed?',
      options: [
        'No requirement',
        '30 minutes fire resistance',
        'Same as escape routes - typically 30 or 60 minutes',
        '120 minutes'
      ],
      correctAnswer: 2,
      explanation: 'The CIE should be located in an area with appropriate fire resistance, typically matching escape route requirements to ensure the panel remains accessible during a fire event.'
    },
    {
      id: 3,
      question: 'What type of mains supply is required for a fire alarm control panel?',
      options: [
        'Any available socket outlet',
        'Dedicated circuit with double-pole isolation clearly labelled',
        'Shared circuit with emergency lighting',
        'Temporary builder supply'
      ],
      correctAnswer: 1,
      explanation: 'A dedicated supply with double-pole isolation is required to prevent inadvertent disconnection and ensure the fire alarm can be safely isolated for maintenance.'
    },
    {
      id: 4,
      question: 'Where should the mains isolator for a fire alarm panel be located?',
      options: [
        'In the main distribution board only',
        'Adjacent to the panel or within the panel enclosure',
        'In the building entrance',
        'In a locked cupboard'
      ],
      correctAnswer: 1,
      explanation: 'The isolator should be adjacent to the panel or within the enclosure for safe working and clear identification of the supply being controlled.'
    },
    {
      id: 5,
      question: 'What earth arrangement is typically required for fire alarm control panels?',
      options: [
        'No earth required for SELV systems',
        'Protective earth via supply cable and functional earth if specified',
        'Earth rod only',
        'Building structural steel'
      ],
      correctAnswer: 1,
      explanation: 'Protective earth is provided via the supply cable. Some panels also require a functional earth for EMC purposes as specified by the manufacturer.'
    },
    {
      id: 6,
      question: 'What cable entry method should be used for fire alarm control panels?',
      options: [
        'Any convenient knockout',
        'Through glands appropriate to cable type and environmental conditions',
        'Direct through holes without glands',
        'Via flexible conduit only'
      ],
      correctAnswer: 1,
      explanation: 'Cables should enter through appropriate glands matched to the cable type to maintain ingress protection and provide strain relief.'
    },
    {
      id: 7,
      question: 'What documentation must be displayed at or adjacent to a fire alarm control panel?',
      options: [
        'Installer contact details only',
        'Zone plan, operating instructions and building name',
        'Warranty certificate only',
        'No documentation required'
      ],
      correctAnswer: 1,
      explanation: 'BS 5839-1 requires a zone plan/chart to be displayed adjacent to the CIE showing detector/call point locations. Operating instructions should also be available.'
    },
    {
      id: 8,
      question: 'When installing battery backup, what should be verified?',
      options: [
        'Battery colour matches panel',
        'Capacity meets standby and alarm load requirements with margin',
        'Batteries are fully discharged',
        'Any 12V battery will work'
      ],
      correctAnswer: 1,
      explanation: 'Battery capacity must be calculated to provide the required standby period (typically 24-72 hours) plus alarm period (typically 30 minutes) with appropriate margin.'
    },
    {
      id: 9,
      question: 'What is the purpose of a dedicated fire alarm distribution board?',
      options: [
        'To save money on installation',
        'To provide monitored supplies for ancillary equipment',
        'It is never required',
        'For aesthetic purposes only'
      ],
      correctAnswer: 1,
      explanation: 'A dedicated distribution board provides monitored, protected supplies for door holders, interfaces and other ancillary fire safety equipment.'
    },
    {
      id: 10,
      question: 'What testing should be performed immediately after panel installation and power-up?',
      options: [
        'Full cause and effect testing',
        'Basic functionality, mains/battery changeover and fault indication',
        'Sound level measurements only',
        'No testing required until commissioning'
      ],
      correctAnswer: 1,
      explanation: 'Initial power-up tests verify basic panel operation, mains-to-battery changeover, fault indication and communication with any connected devices.'
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
            <Link to="../module-5">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 5</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Server className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-orange-400 uppercase tracking-wide">
            Section 2 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Control Panel Installation
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Panel positioning, mounting, terminations and mains connection requirements for fire alarm control and indicating equipment.
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-orange-400 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[15px] text-white/80">
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Location</strong> must be accessible, fire-protected and visible to building occupants and fire service</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Mains supply</strong> requires dedicated circuit, double-pole isolation and clear labelling per BS 7671</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Batteries</strong> must be correctly sized for standby and alarm periods with documented calculations</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Select appropriate locations for fire alarm control panels",
            "Install panels at correct height with secure fixings",
            "Connect mains supply with proper isolation and protection",
            "Size and install battery backup systems correctly",
            "Terminate field wiring using correct techniques",
            "Complete initial power-up testing and verification"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-orange-400">{i + 1}</span>
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
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Panel Location Requirements</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The fire alarm control and indicating equipment (CIE) location is <strong className="text-white">critical for system effectiveness</strong>. BS 5839-1 provides clear guidance on positioning requirements.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Location Criteria:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Ground floor entrance or fire service access point preferred</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Protected from fire with appropriate compartmentation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Continuously staffed location or monitored via remote signalling</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Accessible 24/7 without requiring keys from elsewhere</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Away from sources of interference, moisture or extreme temperatures</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Consider fire service access - panels near the main entrance allow rapid assessment of alarm location and system status.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Mounting Height & Fixings</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Panels must be mounted at a height that allows <strong className="text-white">comfortable operation</strong> while remaining secure and protected.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Height Requirements per BS 5839-1:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Operating controls between 0.8m and 1.7m above floor level</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Display visible without bending or stretching</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Consider wheelchair accessibility where required</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Allow adequate space for door opening and maintenance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Fixing Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><Shield className="h-3 w-3 text-orange-400" />Fixings appropriate to wall construction (masonry, stud, etc.)</li>
                  <li className="flex items-center gap-2"><Shield className="h-3 w-3 text-orange-400" />Minimum 4 fixing points for larger enclosures</li>
                  <li className="flex items-center gap-2"><Shield className="h-3 w-3 text-orange-400" />Consider weight including batteries when fully loaded</li>
                  <li className="flex items-center gap-2"><Shield className="h-3 w-3 text-orange-400" />Anti-tamper fixings in unsupervised areas if required</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Mains Supply Connection</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>The mains supply must comply with <strong className="text-white">both BS 5839-1 and BS 7671</strong>. A dedicated circuit ensures the fire alarm cannot be inadvertently disconnected.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Supply Requirements</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Dedicated circuit from distribution board</li>
                    <li>Double-pole isolation</li>
                    <li>Clearly labelled "FIRE ALARM - DO NOT SWITCH OFF"</li>
                    <li>Protected by appropriate overcurrent device</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Cable Specification</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Fire-resistant if passing through fire zones</li>
                    <li>Minimum 1.5mm² for typical installations</li>
                    <li>Volt drop within limits at full load</li>
                    <li>Protected from mechanical damage</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  The mains isolator must be clearly labelled and accessible. Consider lock-off provisions to prevent accidental disconnection during building works.
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
            <p className="text-[15px] text-white/80 mb-3">Why must the fire alarm have a dedicated mains supply circuit rather than sharing with other equipment?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> A dedicated circuit prevents the fire alarm being inadvertently disconnected when isolating other equipment. It also ensures the circuit is correctly labelled and that maintenance personnel understand its critical function.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Battery Installation & Sizing</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Standby batteries provide <strong className="text-white">essential backup power</strong> when mains fails. Correct sizing ensures the system remains operational throughout any power outage.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Battery Sizing per BS 5839-1:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Category L systems:</strong> 24 hours standby + 30 minutes alarm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Category P systems:</strong> 72 hours standby + 30 minutes alarm (if no monitoring)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>With ARC monitoring:</strong> 24 hours standby typically acceptable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Add 25% margin</strong> for battery ageing and temperature effects</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Installation Best Practice:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Install batteries in panel or adjacent secure enclosure</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Use fused connections as per manufacturer requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Label with installation date for replacement tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Verify charger output matches battery specification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Field Wiring Terminations</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Correct termination of field wiring ensures <strong className="text-white">reliable system operation</strong>. Poor terminations are a leading cause of system faults.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Termination Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Use correct ferrules or bootlace crimps for stranded cable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Tighten to manufacturer's specified torque</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Maintain correct polarity throughout</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Screen/drain wires terminated per EMC guidance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Adequate service loop for future maintenance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Cable Entry:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Use appropriate glands for cable type</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Maintain enclosure IP rating</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Provide strain relief on all cables</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Blank unused entries</li>
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
            <p className="text-[15px] text-white/80 mb-3">A Category L1 system in a building without ARC monitoring requires what battery standby period?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> For a Category L system, BS 5839-1 requires 24 hours standby plus 30 minutes alarm period. Without ARC monitoring, 72 hours may be required for P systems, but L systems typically require 24 hours minimum.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Initial Power-Up & Testing</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Before connecting field devices, perform <strong className="text-white">basic panel verification</strong> to ensure the CIE is functioning correctly.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Pre-Power Checks:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Verify mains voltage at isolator</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Check all internal connections secure</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Confirm battery polarity before connecting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Disconnect loop circuits for initial power-up</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Initial Power-Up Tests:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Panel powers up without errors</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Display and indicators functioning</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Mains/battery changeover operates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Battery charging correctly</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Open circuit faults indicated on loops</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Document all initial test results. Any faults should be investigated and resolved before connecting field wiring.</p>
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
            <p className="text-[15px] text-white/80 mb-3">Why should loop circuits be disconnected before initial panel power-up?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Disconnecting loops allows you to verify the panel powers up correctly without field wiring faults masking panel issues. It also prevents unexpected activations if any device is incorrectly wired or faulty.</p>
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
                  Install panel backbox first, then complete all cabling before fitting the panel chassis
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Label all cables at the panel end before termination - saves time and prevents errors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Take photographs of terminations before closing up for maintenance reference
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep spare fuses and a configuration backup in the panel enclosure
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
                  Installing panel too high - makes operation difficult and non-compliant
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Using undersized batteries without proper calculation documentation
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not labelling the mains isolator clearly - leads to accidental disconnection
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to verify charger output matches battery voltage and chemistry
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
            { q: "Can a fire alarm panel be installed in a cupboard?", a: "Only if the cupboard provides adequate ventilation, is fire-protected, remains accessible 24/7, and the panel display remains visible. Generally not recommended." },
            { q: "What if the building has no suitable ground floor location?", a: "Repeater panels or remote display units can be installed at ground floor entrance with the main CIE in a more practical location. Document the reasoning." },
            { q: "How often should batteries be replaced?", a: "Typically every 3-5 years depending on manufacturer guidance, environmental conditions and battery type. Date-label batteries and include in maintenance schedule." },
            { q: "Can I share containment with other services?", a: "Fire alarm cables should ideally have dedicated containment. If sharing, segregation requirements of BS 7671 must be met and fire-rating maintained." },
            { q: "What if the panel location changes during construction?", a: "Raise a formal change request, update drawings, verify the new location meets BS 5839-1 requirements, and obtain client/consultant approval before relocating." },
            { q: "Do I need a functional earth as well as protective earth?", a: "Some panels require a functional earth for EMC purposes. Check manufacturer documentation - this may be separate from the protective earth connection." }
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-400" />
              Knowledge Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of control panel installation with 10 questions.</p>
                <Button variant="ios-primary" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </div>
            ) : showResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-[34px] font-bold text-orange-400">{calculateScore()}/{questions.length}</p>
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
                              ? 'bg-orange-500/20 border-orange-500/50 text-white'
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
            <Link to="../module-5/section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-5/section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule5Section2;
