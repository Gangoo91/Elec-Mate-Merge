import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Shield, Gauge, CircuitBoard, Timer, FileCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule7Section5 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Protective Device Operation | Module 7 Section 5 | Inspection & Testing",
    description: "Verify that MCBs, RCBOs, fuses and other protective devices operate correctly and coordinate for proper circuit protection."
  });

  const learningOutcomes = [
    { icon: Shield, text: "Verify MCB and RCBO operation and ratings" },
    { icon: Gauge, text: "Test fuse carriers and connections" },
    { icon: CircuitBoard, text: "Check isolator and switch-disconnector function" },
    { icon: Timer, text: "Verify time-delay devices and coordination" },
    { icon: FileCheck, text: "Confirm device labelling and schedules" },
    { icon: CheckCircle2, text: "Document protective device verification" }
  ];

  const quizQuestions = [
    {
      question: "When checking an MCB, what should be verified during functional testing?",
      options: [
        "Its earth fault loop impedance",
        "It can be switched on/off and the mechanism operates correctly",
        "Its prospective fault current rating only",
        "The cable size connected to it"
      ],
      correctAnswer: 1,
      explanation: "Functional testing of an MCB verifies the switching mechanism operates correctly - it can be switched on and off freely, doesn't stick, and the position indicator shows correctly."
    },
    {
      question: "What visual check should be performed on a fuse carrier?",
      options: [
        "The fuse wire colour",
        "Correct fuse rating for the circuit and secure carrier fit",
        "The temperature of the fuse",
        "The fuse manufacturer's logo"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection of fuse carriers should verify: correct fuse rating matches the circuit design, carrier fits securely without loose connections, and the fuse is the correct type (BS 88, BS 1361, etc.)."
    },
    {
      question: "An MCB won't stay in the ON position when switched. What does this indicate?",
      options: [
        "The MCB is working correctly",
        "There is likely a fault on the circuit or the MCB is defective",
        "The load is too small",
        "Normal behaviour for a new MCB"
      ],
      correctAnswer: 1,
      explanation: "If an MCB won't stay ON, either there's a fault on the circuit causing immediate trip (short circuit, earth fault, overload) or the MCB mechanism is defective. Investigation is required."
    },
    {
      question: "For an RCBO, which functional aspects need verification?",
      options: [
        "Only the RCD test button",
        "Only the MCB switching",
        "Both RCD function (test button) and MCB switching mechanism",
        "Only the label is readable"
      ],
      correctAnswer: 2,
      explanation: "An RCBO combines MCB and RCD functions, so both must be functionally tested: verify the switching mechanism operates and the test button trips the device."
    },
    {
      question: "When checking consumer unit labelling, what is required?",
      options: [
        "Manufacturer's name only",
        "Each circuit should be clearly identified and labels should be accurate",
        "Only the main switch needs labelling",
        "Labels are optional if drawings exist"
      ],
      correctAnswer: 1,
      explanation: "Regulation 514.9.1 requires every circuit to be identified. Labels should clearly describe each circuit and be accurate, durable, and legible. This aids safe isolation."
    },
    {
      question: "A main switch doesn't fully isolate - some circuits remain live. This is:",
      options: [
        "Acceptable if those circuits are on different phases",
        "A serious defect requiring immediate attention",
        "Normal for a split-load board",
        "Only an issue for three-phase supplies"
      ],
      correctAnswer: 1,
      explanation: "A main switch must isolate all circuits it's designed to control. Circuits remaining live indicates a wiring fault or incorrect switch specification - this is a serious safety defect."
    },
    {
      question: "What should be checked about the consumer unit or distribution board enclosure?",
      options: [
        "Only that it's the correct colour",
        "Secure mounting, covers intact, IP rating maintained, no damage",
        "Only that it has a main switch",
        "That it matches other installations"
      ],
      correctAnswer: 1,
      explanation: "Enclosure inspection includes: secure mounting, all covers/blanks fitted, no damage compromising IP rating, adequate clearances, and suitable for the environment."
    },
    {
      question: "For protective device coordination, what should be verified?",
      options: [
        "All devices are the same brand",
        "Upstream devices are rated higher than downstream devices",
        "All devices have the same rating",
        "Devices are installed in alphabetical order"
      ],
      correctAnswer: 1,
      explanation: "Coordination (discrimination) requires upstream devices to be rated appropriately so they don't trip before downstream devices during faults, unless both are designed to trip together."
    },
    {
      question: "A surge protection device (SPD) has a status indicator showing fault. What action is required?",
      options: [
        "No action - continue using",
        "Replace or investigate as the SPD may no longer provide protection",
        "Reset the indicator",
        "Wait for it to clear automatically"
      ],
      correctAnswer: 1,
      explanation: "SPD fault indication means the device may no longer provide surge protection. It should be replaced or investigated by a competent person to restore protection."
    },
    {
      question: "When recording protective device verification, what should be documented?",
      options: [
        "Nothing - it's just a visual check",
        "Device types, ratings, and any defects found",
        "Only the total number of devices",
        "Just the main switch rating"
      ],
      correctAnswer: 1,
      explanation: "The schedule of inspections and circuit chart should record device types (MCB, RCBO, fuse), ratings (current and breaking capacity), and any defects or observations noted."
    }
  ];

  const faqData = [
    {
      question: "Should I operate every MCB during functional testing?",
      answer: "Yes. Every MCB should be switched off and on to verify the mechanism operates correctly. This also confirms the switching doesn't cause issues (arc, sticking, position indicator). Warn occupants before testing as loads will be interrupted."
    },
    {
      question: "How do I check if fuse ratings are correct?",
      answer: "Compare the fuse rating against the circuit design (check conductor size, load requirements, and cable current-carrying capacity). The fuse rating should not exceed the cable current-carrying capacity and should provide adequate protection for the load."
    },
    {
      question: "What if a protective device has no visible rating?",
      answer: "All protective devices must have ratings clearly marked. If rating markings are illegible, damaged, or missing, the device should be replaced. You cannot safely verify protection without knowing the rating."
    },
    {
      question: "Should I test MCB tripping under fault conditions?",
      answer: "No - MCBs are tested during manufacture and certified to standards. Functional testing verifies the mechanism operates (switching on/off). Deliberately overloading or short-circuiting to test tripping is dangerous and unnecessary."
    },
    {
      question: "What's the difference between isolators and circuit breakers?",
      answer: "Circuit breakers (MCBs) provide automatic protection and can break fault currents. Isolators (switch-disconnectors) are designed to disconnect circuits that are already off-load. Verify each type is used correctly for its intended purpose."
    },
    {
      question: "Are there special requirements for metal consumer units?",
      answer: "Metal consumer units require all cable entries to use appropriate glands or grommets, the enclosure must be earthed, and any unused entries must be blanked. Verify the internal earth bar connections to the enclosure."
    }
  ];

  const pocketCardUnits = [
    { name: "MCB Test", symbol: "Switch", unit: "on/off" },
    { name: "RCBO Test", symbol: "Both", unit: "functions" },
    { name: "RCD Test", symbol: "Button", unit: "operation" },
    { name: "Labelling", symbol: "514.9.1", unit: "required" },
    { name: "Main Switch", symbol: "Isolate", unit: "all circuits" },
    { name: "SPD Status", symbol: "Check", unit: "indicator" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
            className="flex items-center gap-2 text-rose-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 7</span>
          </button>
          <span className="text-white/60 text-sm">5 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-full mb-4">
            <span className="text-rose-400 text-sm font-medium">Module 7 • Polarity & Functional Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Protective Device Operation
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Verify that MCBs, RCBOs, fuses and other protective devices are correctly installed, rated, and function as intended.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-rose-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Operate every MCB/RCBO to verify switching mechanism</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Verify device ratings match circuit requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Check labelling is accurate and legible</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <span className="text-white/90 text-base">{outcome.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">MCB and RCBO Verification</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Miniature circuit breakers (MCBs) and residual current circuit breakers with overcurrent protection (RCBOs) require both visual and functional verification:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">MCB/RCBO Checks</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Rating matches circuit design (In, type, Icn)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Switching mechanism operates freely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Position indicator shows correct state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Secure mounting on DIN rail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Terminal connections secure</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-2">RCBO Additional Check</h4>
                <p className="text-white/70 text-sm">Test button should trip the device - verify RCD function operates in addition to MCB switching.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Fuse and Fuse Carrier Inspection</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Where fuses are used for circuit protection, careful inspection ensures correct ratings and secure installation:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">BS 88 (HRC) Fuses</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Verify correct fuse rating for circuit</li>
                    <li>• Check carrier fits securely without gaps</li>
                    <li>• Confirm fuse-link contacts are clean</li>
                    <li>• Check indicator (if fitted) shows healthy</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">BS 1361 Consumer Unit Fuses</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Rating marked on carrier matches circuit</li>
                    <li>• Carrier inserted fully and securely</li>
                    <li>• No signs of overheating or arcing</li>
                    <li>• Correct colour coding matches rating</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">BS 3036 Rewirable Fuses</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Correct fuse wire rating (not oversized)</li>
                    <li>• Single strand of wire only</li>
                    <li>• Properly secured at both terminals</li>
                    <li>• Carrier complete with ceramic tube</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A BS 3036 rewirable fuse carrier has two strands of 15A wire twisted together. Is this acceptable?"
            answer="No. Only a single strand of correct rating fuse wire should be used. Multiple strands increase the current-carrying capacity beyond the rating, compromising protection. This must be corrected."
            color="rose"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Main Switch and Isolators</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Main switches and isolators provide the means of isolation required by Regulation 537.2. Their correct function is critical for safety:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Main Switch Verification</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Isolates ALL live conductors (L1, L2, L3, N where required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Clear ON/OFF position indication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Mechanism operates smoothly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Rating suitable for installation demand</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Critical check:</strong> Verify the main switch actually de-energises all circuits. Test each circuit is dead after operating the main switch.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Circuit Labelling Verification</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Regulation 514.9.1 requires identification of circuits. Clear, accurate labelling is essential for safe operation and maintenance:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Labelling Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Every circuit clearly identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Labels legible and durable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Description accurate (e.g., "Kitchen Sockets" not just "Sockets")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Device ratings visible or on circuit chart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Warning labels where required (RCD test frequency, isolation points)</span>
                  </li>
                </ul>
              </div>
              <p>
                A circuit chart should be provided showing circuit numbers, descriptions, protective device types and ratings, and associated RCDs.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A consumer unit has labels but they're faded and barely readable. What should be done?"
            answer="Labels should be replaced with clear, durable identification. This is a defect under Regulation 514.9.1. While not dangerous, unclear labelling compromises safe isolation and should be recorded and rectified."
            color="rose"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Enclosure Condition</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The consumer unit or distribution board enclosure is part of the protective measures. Verify its condition during inspection:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Physical Condition</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• No damage, cracks, or deformation</li>
                    <li>• All covers securely fitted</li>
                    <li>• Blanking plates in unused ways</li>
                    <li>• Cable entries properly grommeted/glanded</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Metal Enclosures</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Enclosure properly earthed</li>
                    <li>• All cable entries use appropriate glands</li>
                    <li>• No sharp edges at entries</li>
                    <li>• IP rating maintained</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Mounting</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Securely fixed to structure</li>
                    <li>• Appropriate height for operation</li>
                    <li>• Adequate working space in front</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">SPDs and Additional Devices</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Modern installations may include surge protection devices (SPDs) and other supplementary protective devices that require verification:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">SPD Verification</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Status indicator shows healthy (green/no fault)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Correct type for location (Type 1, 2, or 3)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Short connections to earth bar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Associated overcurrent protection correct</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    If an SPD status indicator shows fault (typically red or flashing), the device should be replaced as it may no longer provide surge protection.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="An SPD installed 3 years ago has a red status indicator. The installation passes all other tests. What should be recorded?"
            answer="The SPD fault should be recorded as a C3 observation (improvement recommended) or C2 if deemed potentially dangerous. The occupier should be advised the surge protection is no longer functioning and replacement is recommended."
            color="rose"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Warn Occupants</h4>
                  <p className="text-white/60 text-sm">Operating every MCB will interrupt circuits - warn before testing</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Check Coordination</h4>
                  <p className="text-white/60 text-sm">Verify upstream devices are rated higher than downstream for discrimination</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Don't Force Switches</h4>
                  <p className="text-white/60 text-sm">If a switch won't operate, investigate - don't force it</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <Card key={index} variant="ios" className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 active:bg-white/5 transition-colors touch-manipulation"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-white/40 transition-transform shrink-0",
                    expandedFaq === index && "rotate-180"
                  )} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="Protective Device Reference"
            units={pocketCardUnits}
            color="rose"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="rose"
          />
        </section>

        {/* Module Completion Card */}
        <Card variant="ios-elevated" className="mb-8 border-rose-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module 7 Complete!</h3>
            <p className="text-white/60 mb-4">
              You've mastered polarity testing, phase rotation, functional testing, and protective device verification.
            </p>
            <p className="text-rose-400 text-sm">
              Continue to Module 8: Visual Inspection & Documentation →
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-rose-500 hover:bg-rose-600"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
          >
            Continue to Module 8
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
          >
            Back to Module 7
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule7Section5;
