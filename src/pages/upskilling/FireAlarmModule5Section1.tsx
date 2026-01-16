import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Wrench, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Target, Clock, BookOpen, RotateCcw, ClipboardList, Users, HardHat, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const TITLE = "Pre-Installation Planning - Fire Alarm Course";
const DESCRIPTION = "Learn about site surveys, coordination with other trades, health & safety requirements and logistics planning for fire alarm installations per BS 5839-1.";

const FireAlarmModule5Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the primary purpose of a pre-installation site survey?',
      options: [
        'To estimate material costs only',
        'To verify design assumptions and identify site-specific challenges',
        'To meet insurance requirements',
        'To train the installation team'
      ],
      correctAnswer: 1,
      explanation: 'Site surveys verify that design assumptions are correct and identify any site-specific challenges that may affect installation methods or timescales.'
    },
    {
      id: 2,
      question: 'Which document should be reviewed before commencing any fire alarm installation?',
      options: [
        'Building insurance certificate',
        'Fire alarm system design and cause & effect matrix',
        'Tenant contact details',
        'Previous utility bills'
      ],
      correctAnswer: 1,
      explanation: 'The fire alarm design documentation and cause & effect matrix must be reviewed to understand system requirements, device locations and integration requirements.'
    },
    {
      id: 3,
      question: 'What minimum notice should typically be given to building occupants before disruptive installation work?',
      options: [
        '24 hours',
        '48-72 hours depending on building type',
        '1 week',
        'No notice required'
      ],
      correctAnswer: 1,
      explanation: 'Typically 48-72 hours notice is appropriate, though this varies by building type and occupancy. Care homes and hospitals may require longer notice periods.'
    },
    {
      id: 4,
      question: 'Who is responsible for ensuring adequate first aid provision on a fire alarm installation project?',
      options: [
        'The building owner',
        'The principal contractor or installing company',
        'Local emergency services',
        'Individual installers'
      ],
      correctAnswer: 1,
      explanation: 'The principal contractor or installing company must ensure adequate first aid provision, trained first aiders and appropriate equipment are available on site.'
    },
    {
      id: 5,
      question: 'What should be established before drilling into walls or ceilings on site?',
      options: [
        'Paint colour',
        'Presence of asbestos, services and structural elements',
        'Building age only',
        'Room temperature'
      ],
      correctAnswer: 1,
      explanation: 'Before drilling, installers must establish the presence of asbestos, hidden services (electrical, gas, water) and structural elements to avoid hazards and damage.'
    },
    {
      id: 6,
      question: 'What is a method statement in the context of fire alarm installation?',
      options: [
        'A list of materials required',
        'A document describing how work will be carried out safely',
        'A financial quotation',
        'A warranty certificate'
      ],
      correctAnswer: 1,
      explanation: 'A method statement describes the sequence of work and how it will be carried out safely, identifying hazards and control measures for each task.'
    },
    {
      id: 7,
      question: 'When should cable delivery be scheduled on a multi-storey installation?',
      options: [
        'All at the start of the project',
        'Phased to match installation progress and available storage',
        'Only when containment is complete throughout',
        'After all devices are installed'
      ],
      correctAnswer: 1,
      explanation: 'Cable deliveries should be phased to match installation progress, considering available secure storage and the practicalities of distributing materials to work areas.'
    },
    {
      id: 8,
      question: 'What coordination is required with mechanical services contractors?',
      options: [
        'None - fire alarm is independent',
        'Duct detector positions, damper interfaces and plant room access',
        'Only electrical supply requirements',
        'Paint colours only'
      ],
      correctAnswer: 1,
      explanation: 'Coordination with mechanical contractors is essential for duct detector positions, fire damper interfaces, plant room detector locations and AHU shutdown requirements.'
    },
    {
      id: 9,
      question: 'What personal protective equipment is typically required for fire alarm installation?',
      options: [
        'Safety boots only',
        'Safety boots, eye protection, gloves and hard hat where required',
        'High-visibility clothing only',
        'No PPE required for fire alarm work'
      ],
      correctAnswer: 1,
      explanation: 'Typical PPE includes safety boots, eye protection (especially when drilling), gloves for cable handling, and hard hats on construction sites or where overhead hazards exist.'
    },
    {
      id: 10,
      question: 'What should be documented during the pre-installation survey regarding existing systems?',
      options: [
        'Manufacturer names only',
        'Condition, compatibility, spare capacity and interface requirements',
        'Installation date only',
        'Colour of existing equipment'
      ],
      correctAnswer: 1,
      explanation: 'Surveys must document existing system condition, compatibility with new equipment, spare capacity for expansion, and interface requirements for integration.'
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
            <Link to="../module-5">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 5</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <ClipboardList className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-orange-400 uppercase tracking-wide">
            Section 1 of 6
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Pre-Installation Planning
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Site surveys, coordination with other trades, health & safety requirements and logistics planning for successful fire alarm installations.
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
              <span><strong>Site surveys</strong> verify design assumptions and identify cable routes, fixings and access constraints</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Coordination</strong> with other trades is essential - especially mechanical, electrical and building management systems</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span><strong>Health & safety</strong> planning includes risk assessments, method statements, permits and PPE requirements</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <h2 className="text-[13px] font-semibold text-white/50 uppercase tracking-wide mb-3">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Conduct effective pre-installation site surveys",
            "Identify coordination requirements with other trades",
            "Prepare risk assessments and method statements",
            "Plan material logistics and phased deliveries",
            "Establish permit-to-work requirements",
            "Document site conditions and constraints"
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
      <section className="px-4 pb-6 max-w-3xl mx-auto space-y-6">
        {/* Section 01 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">01</span>
              <h3 className="text-[17px] font-semibold text-white">Site Survey Fundamentals</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>A thorough pre-installation survey is <strong className="text-white">essential for project success</strong>. The survey verifies design assumptions, identifies site-specific challenges and informs accurate programming and resource planning.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Key Survey Activities:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Verify proposed device locations against actual site conditions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Identify cable routes and containment requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Check ceiling types, heights and access methods</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Document existing services and potential obstructions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Photograph key areas for reference during installation</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">Always obtain drawings and specifications before the survey to compare design intent with site reality.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 02 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">02</span>
              <h3 className="text-[17px] font-semibold text-white">Design Document Review</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Before any installation work begins, the design documentation must be <strong className="text-white">thoroughly reviewed and understood</strong> by all team members involved in the installation.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Essential Documents to Review:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Fire alarm layout drawings with device positions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Cause and effect matrix showing system responses</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />System specification and equipment schedules</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Cable schedules with types and quantities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Interface requirements with other systems</li>
                </ul>
              </div>
              <p>Pay particular attention to the <strong className="text-orange-400">cause and effect matrix</strong> - this defines how the system responds to different alarm conditions and is critical for correct zone allocation and output programming.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 03 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">03</span>
              <h3 className="text-[17px] font-semibold text-white">Trade Coordination</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm installation requires <strong className="text-white">careful coordination</strong> with multiple trades. Poor coordination leads to delays, rework and compromised system performance.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Mechanical Services</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Duct detector locations</li>
                    <li>Fire damper interfaces</li>
                    <li>AHU shutdown control</li>
                    <li>Plant room access</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Electrical Services</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>Mains supply position</li>
                    <li>Containment sharing</li>
                    <li>Emergency lighting links</li>
                    <li>Door holder supplies</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Building Management</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>BMS interface protocols</li>
                    <li>Fault monitoring outputs</li>
                    <li>Plant control integration</li>
                    <li>Shared containment routes</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-orange-400" />
                    <p className="text-[13px] font-semibold text-white">Ceiling Contractors</p>
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/60">
                    <li>First fix timing</li>
                    <li>Backbox installation</li>
                    <li>Access panel positions</li>
                    <li>Detector base locations</li>
                  </ul>
                </div>
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
            <p className="text-[15px] text-white/80 mb-3">Why is coordination with ceiling contractors particularly important for fire alarm installation?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Detector bases must be installed at first fix before ceiling tiles are fitted. If timing is missed, significant rework is required to access ceiling voids. Access panels must also be positioned to allow future maintenance access.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 04 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">04</span>
              <h3 className="text-[17px] font-semibold text-white">Health & Safety Planning</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Fire alarm installation involves various hazards that must be controlled through proper <strong className="text-white">risk assessment and method statements</strong> (RAMS).</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">Common Hazards to Address:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Working at height - ladders, scaffolds, MEWPs</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Asbestos - survey required before intrusive work</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Hidden services - electrical, gas, water in walls/ceilings</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Manual handling - cable drums, panels, equipment</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Electrical shock - working near live equipment</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-amber-400" />Dust and debris - drilling, cutting operations</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-[13px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Never drill into walls or ceilings without first checking for asbestos and buried services using appropriate detection equipment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 05 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">05</span>
              <h3 className="text-[17px] font-semibold text-white">Permit Systems & Access</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Many sites require formal <strong className="text-white">permit-to-work systems</strong> for fire alarm installation, particularly in occupied buildings, healthcare premises and industrial facilities.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[13px] font-semibold text-white mb-2">Common Permit Requirements:</p>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Hot work permits</strong> - required for soldering or heat-producing activities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Fire system isolation permits</strong> - when disabling existing systems</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Roof access permits</strong> - for work on or accessing roof areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Confined space permits</strong> - for work in risers, voids, tanks</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" /><strong>Electrical isolation certificates</strong> - for work on mains supplies</li>
                </ul>
              </div>
              <p>Establish permit requirements during the planning phase and factor <strong className="text-orange-400">permit processing time</strong> into the programme - some permits require 24-48 hours notice.</p>
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
            <p className="text-[15px] text-white/80 mb-3">You need to install fire alarm equipment in an operational hospital. What additional planning considerations apply?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Hospital work requires infection control protocols, restricted access to clinical areas, coordination with ward managers, out-of-hours working in sensitive areas, special permit systems and longer notification periods. Fire system isolations require careful management with estates teams.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 06 */}
        <Card variant="ios">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">06</span>
              <h3 className="text-[17px] font-semibold text-white">Material Logistics & Storage</h3>
            </div>
            <div className="space-y-3 text-[15px] text-white/70">
              <p>Effective <strong className="text-white">material logistics</strong> prevents delays, reduces waste and ensures installation quality. Poor logistics planning is a common cause of project delays.</p>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-orange-400" />
                  <p className="text-[13px] font-semibold text-white">Logistics Planning Checklist:</p>
                </div>
                <ul className="space-y-1 text-[13px]">
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Identify secure storage locations for equipment and cable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Plan delivery access routes and unloading areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Schedule phased deliveries to match installation progress</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Arrange internal distribution to work areas</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Establish material tracking and sign-out procedures</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-orange-400" />Plan waste disposal and recycling arrangements</li>
                </ul>
              </div>
              <p className="text-[13px] text-white/60 italic">On multi-floor buildings, consider how materials will be distributed vertically - goods lifts, crane access or manual handling up stairs all affect programme and costs.</p>
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
            <p className="text-[15px] text-white/80 mb-3">Why should fire alarm cable deliveries be phased rather than delivered all at once?</p>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-[13px] text-white/70"><strong className="text-white">Answer:</strong> Phased deliveries reduce storage space requirements, minimise damage from repeated handling, reduce theft risk, improve cash flow and ensure materials arrive when actually needed rather than sitting unused. Large cable deliveries also require significant handling resources.</p>
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
                  Photograph everything during surveys - it saves return visits and resolves disputes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Build relationships with site managers and facilities teams early - they control access
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Always have a contingency plan for site access issues - weather, security, other trades
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Carry spare cable detection equipment - buried services are the biggest hazard
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
                  Starting installation without reviewing the cause and effect matrix properly
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Underestimating ceiling void access requirements - leads to expensive rework
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Failing to coordinate first fix timing with ceiling contractors
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Not checking asbestos register before any intrusive work
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
            { q: "How long should a pre-installation survey take?", a: "Survey duration depends on building size and complexity. A small office might take 2-3 hours; a hospital could take several days. Allow adequate time rather than rushing." },
            { q: "Who should attend the site survey?", a: "Ideally the project manager, lead installer and designer. Having the designer present helps resolve queries immediately and confirms or adjusts the design on site." },
            { q: "What if site conditions differ significantly from drawings?", a: "Document discrepancies with photographs and measurements. Issue a formal site query (RFI) to the designer and client before proceeding. Changes may require design revision." },
            { q: "How do I handle existing fire systems during installation?", a: "Existing systems must remain operational unless formally isolated under permit. Coordinate isolations with building management and ensure fire watches are in place during system downtime." },
            { q: "What PPE is required for fire alarm installation?", a: "Minimum requirements typically include safety boots, eye protection and gloves. Hard hats required on construction sites. Hi-vis may be required on some sites. Always check site rules." },
            { q: "How far in advance should permits be requested?", a: "Allow 24-48 hours minimum for standard permits. Some sites require 5 working days for certain permits. Healthcare and secure sites often have longer lead times." }
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
                <p className="text-[15px] text-white/70 mb-4">Test your understanding of pre-installation planning with 10 questions.</p>
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
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 py-4 border-t border-white/10">
          <Button variant="ios-secondary" asChild className="flex-1">
            <Link to="../module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button variant="ios-primary" asChild className="flex-1">
            <Link to="../module-5/section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FireAlarmModule5Section1;
