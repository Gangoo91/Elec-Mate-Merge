import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle, Wrench, HelpCircle, ChevronRight, ChevronLeft, Zap, Lock, Power, Eye, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { UnitsPocketCard } from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Principles of Safe Isolation - Inspection & Testing";
const DESCRIPTION = "Learn the fundamental principles of safe electrical isolation including GS38 requirements, isolation points, and the essential steps to work safely on electrical systems.";

const quickCheckQuestions = [
  {
    question: "What is the primary purpose of safe isolation?",
    options: ["To test the circuit", "To prevent electrical contact while working", "To save energy", "To reset circuit breakers"],
    correctAnswer: 1,
    explanation: "Safe isolation ensures that electrical equipment is disconnected from all sources of supply and cannot become live while work is being carried out."
  },
  {
    question: "Why should you never rely on a circuit breaker position to confirm isolation?",
    options: ["They're too small to see", "The handle position may not reflect the contact position", "They're always faulty", "Building regulations forbid it"],
    correctAnswer: 1,
    explanation: "Circuit breaker handles can move without the contacts operating, or contacts can fail internally. Always prove dead with an approved voltage indicator."
  },
  {
    question: "What document provides HSE guidance on safe isolation procedures?",
    options: ["BS 7671 Part 4", "GS38", "IEE Guidance Note 3", "Building Regulations Part P"],
    correctAnswer: 1,
    explanation: "GS38 (Electrical test equipment for use on low voltage electrical systems) is the HSE guidance document covering safe isolation procedures and test equipment."
  }
];

const quizQuestions = [
  {
    question: "The term 'isolation' in electrical work means:",
    options: ["Turning off a switch", "Disconnecting from all sources of supply to prevent re-energisation", "Putting barriers around equipment", "Testing the circuit"],
    correctAnswer: 1,
    explanation: "Isolation means disconnecting from all sources of electrical supply and taking steps to prevent re-energisation."
  },
  {
    question: "Which of these is NOT an acceptable isolation device?",
    options: ["Isolating switch (BS EN 60947-3)", "Circuit breaker used as an isolator", "Plug and socket", "Lamp switch"],
    correctAnswer: 3,
    explanation: "Lamp switches and similar control switches don't meet isolation requirements. Isolators must have visible contact separation or position indication."
  },
  {
    question: "Safe isolation is required under which regulation?",
    options: ["EAW Regulation 4 only", "EAW Regulation 12 and 13", "BS 7671 only", "Building Regulations"],
    correctAnswer: 1,
    explanation: "EAW Regulations 12 (means of cutting off supply) and 13 (precautions for dead working) require safe isolation procedures."
  },
  {
    question: "How many sources of supply might a circuit have?",
    options: ["Always one", "One or more - all must be identified and isolated", "Maximum of two", "It doesn't matter"],
    correctAnswer: 1,
    explanation: "Circuits may have multiple supply sources (generators, solar PV, UPS, alternative supplies). All sources must be identified and isolated."
  },
  {
    question: "Before working on any electrical equipment you should:",
    options: ["Assume it's safe", "Ask someone if it's isolated", "Personally verify isolation using proved test equipment", "Check the circuit label"],
    correctAnswer: 2,
    explanation: "You should personally verify isolation using approved voltage testing equipment that you have proved working before and after testing."
  },
  {
    question: "An isolation device must:",
    options: ["Be automatic", "Provide reliable position indication of contacts", "Be electronic", "Be remotely controlled"],
    correctAnswer: 1,
    explanation: "Isolation devices must indicate contact position reliably - either through visible contact gap or a reliable position indicator."
  },
  {
    question: "GS38 recommends that safe isolation should be:",
    options: ["Done only by qualified electricians", "Carried out by any person working on electrical equipment", "Optional for low-risk work", "Done remotely"],
    correctAnswer: 1,
    explanation: "Any person working on electrical equipment should follow safe isolation procedures - it's not limited to qualified electricians."
  },
  {
    question: "When working on a circuit with stored energy (capacitors), you should:",
    options: ["Ignore it - isolation is enough", "Allow time for discharge and verify", "Only worry about batteries", "Wear rubber gloves"],
    correctAnswer: 1,
    explanation: "Capacitors can hold dangerous charges even after isolation. Allow time for discharge and verify the energy is dissipated."
  },
  {
    question: "If you cannot identify all supply sources to equipment:",
    options: ["Proceed anyway", "Assume there's only one source", "Do not proceed until all sources are identified", "Ask the client"],
    correctAnswer: 2,
    explanation: "Never proceed with isolation until you have positively identified all sources of supply. Unknown sources could re-energise the equipment."
  },
  {
    question: "Safe isolation procedures apply to:",
    options: ["High voltage only", "New installations only", "All electrical work where there's risk of contact with live parts", "Commercial premises only"],
    correctAnswer: 2,
    explanation: "Safe isolation applies to all electrical work where there's risk of contact with live conductors - domestic, commercial, industrial, any voltage."
  }
];

const faqs = [
  {
    question: "What's the difference between switching off and isolation?",
    answer: "Switching off is simply operating a switch to stop current flow. Isolation is a formal process of disconnecting from ALL supply sources and taking steps (locking off, proving dead) to ensure the circuit cannot become live while work is carried out."
  },
  {
    question: "Can I use a consumer unit main switch as an isolator?",
    answer: "Modern consumer unit main switches are typically designed as switch-disconnectors (isolators) and can be used for isolation. However, you should verify this from the device markings. The main switch must be locked off and the installation proved dead."
  },
  {
    question: "Do I need to isolate for every inspection and test?",
    answer: "Dead tests require isolation. Visual inspection should be done with the supply isolated where possible. Live tests obviously require the supply connected - but dead tests must be completed first to confirm the installation is safe."
  },
  {
    question: "What if someone else says they've isolated the circuit?",
    answer: "Never rely on someone else's word that a circuit is dead. You must personally verify isolation using approved test equipment that you have proved working. This is a fundamental safety principle - you are responsible for your own safety."
  },
  {
    question: "How do I identify all supply sources?",
    answer: "Examine documentation, trace wiring, check for alternative feeds, standby generators, solar PV, UPS systems, and battery supplies. If in doubt, speak to the duty holder. Never assume there's only one source."
  },
  {
    question: "Can I isolate at the socket for a portable appliance?",
    answer: "Yes - removing a plug from a socket provides isolation for portable equipment. However, for fixed equipment or testing an installation, you need to isolate at the distribution board or upstream isolation point."
  }
];

const referenceItems = [
  { label: "GS38", value: "HSE electrical guidance" },
  { label: "EAW Reg 12", value: "Means of cutting off supply" },
  { label: "EAW Reg 13", value: "Precautions for work dead" },
  { label: "EAW Reg 14", value: "Work on live conductors" },
  { label: "BS EN 60947-3", value: "Isolator standard" },
  { label: "Prove-Test-Prove", value: "Essential procedure" },
  { label: "All sources", value: "Must be identified" },
  { label: "Lock off", value: "Prevent re-energisation" },
];

const InspectionTestingModule2Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 2</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Shield className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 2 • Section 1
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Principles of Safe Isolation
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          Understanding why safe isolation is essential and the fundamental principles that protect lives when working on electrical systems.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Safe isolation disconnects equipment from ALL supply sources and prevents re-energisation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Never trust a switch position - always prove dead with approved test equipment</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">The prove-test-prove procedure is essential - verify your tester works before AND after</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Understand what safe isolation means",
            "Explain why safe isolation is critical",
            "Identify suitable isolation devices",
            "Recognise multiple supply sources",
            "Describe the isolation procedure steps",
            "Understand legal requirements for isolation"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">What is Safe Isolation?</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Safe isolation</strong> is the process of disconnecting electrical equipment from all sources of supply and taking steps to ensure it cannot become live while work is being carried out.
            </p>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Critical Safety Principle</p>
                  <p className="text-white/80 mt-1">
                    Every year in the UK, electrical accidents cause approximately 30 deaths and 350,000 injuries. Many of these could be prevented by proper safe isolation procedures.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Safe Isolation Is More Than Switching Off</h3>
            <p>
              Simply switching off is NOT safe isolation. Safe isolation includes:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li className="flex items-start gap-3">
                <Power className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Identification</strong> of ALL sources of supply</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Disconnection</strong> using suitable isolation devices</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Securing</strong> against re-energisation (locking off)</span>
              </li>
              <li className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Verification</strong> that the circuit is dead (prove-test-prove)</span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Why Safe Isolation is Critical</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The human body is vulnerable to electric current. Even low voltages can cause fatal injuries under certain conditions.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">What Can Go Wrong Without Proper Isolation</h3>
            <div className="space-y-3">
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Circuit Not Actually Isolated</p>
                    <p className="text-[14px] text-white/70">Switch handle moved but contacts didn't open, or wrong circuit isolated.</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <Power className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Supply Restored During Work</p>
                    <p className="text-[14px] text-white/70">Someone else switches the supply back on, not knowing work is being done.</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Unknown Supply Source</p>
                    <p className="text-[14px] text-white/70">Equipment fed from multiple sources - only one was isolated.</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Stored Energy</p>
                    <p className="text-[14px] text-white/70">Capacitors retain charge even after isolation - can deliver fatal shock.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Consequences</h3>
            <ul className="space-y-2 ml-4">
              <li>• Electric shock - potentially fatal</li>
              <li>• Arc flash - severe burns, blindness</li>
              <li>• Falls from height after shock</li>
              <li>• Fire and explosion</li>
              <li>• Equipment damage</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Isolation Devices</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              An <strong className="text-white">isolation device</strong> is a device capable of cutting off the supply to all or part of an installation and which meets specific requirements for contact separation and position indication.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Acceptable Isolation Devices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-white font-semibold">Switch-Disconnectors</p>
                <p className="text-[13px] text-white/60">BS EN 60947-3 devices designed for isolation</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-white font-semibold">Isolating Switches</p>
                <p className="text-[13px] text-white/60">Provide visible contact gap or positive indication</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-white font-semibold">Fuse Links (Removed)</p>
                <p className="text-[13px] text-white/60">Provides definite disconnection when removed</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-white font-semibold">Plugs and Sockets</p>
                <p className="text-[13px] text-white/60">Suitable for equipment rated up to 16A</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">NOT Acceptable for Isolation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 mb-2" />
                <p className="text-white font-semibold">Control Switches</p>
                <p className="text-[13px] text-white/60">Light switches, motor starters - not designed for isolation</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 mb-2" />
                <p className="text-white font-semibold">Contactors</p>
                <p className="text-[13px] text-white/60">Magnetically held - will close if coil energised</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 mb-2" />
                <p className="text-white font-semibold">Semiconductor Devices</p>
                <p className="text-[13px] text-white/60">No physical contact separation</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 mb-2" />
                <p className="text-white font-semibold">MCBs (in most cases)</p>
                <p className="text-[13px] text-white/60">Unless specifically marked as suitable for isolation</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">Multiple Supply Sources</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              One of the most dangerous assumptions is that equipment has only one source of supply. Modern installations often have multiple supplies.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Possible Supply Sources</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Mains supply</strong> - The normal DNO supply</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Standby generators</strong> - May auto-start during power cuts</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Solar PV</strong> - Can back-feed during daylight even if mains isolated</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Battery systems / UPS</strong> - Provides power during mains failure</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Alternative mains feeds</strong> - Second supply for critical loads</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Capacitors</strong> - Store energy that must be discharged</span>
              </li>
            </ul>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  <strong className="text-white">Solar PV Warning:</strong> PV systems generate electricity whenever exposed to light. Even with the mains isolated, DC conductors from panels to inverter can be live. AC may back-feed if the system isn't properly isolated.
                </p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">How to Identify All Sources</h3>
            <ul className="space-y-2 ml-4">
              <li>• Review site documentation and schematics</li>
              <li>• Trace all incoming supplies visually</li>
              <li>• Check for generator connections</li>
              <li>• Look for PV panels on the roof</li>
              <li>• Ask the duty holder about alternative supplies</li>
              <li>• Look for UPS systems serving critical equipment</li>
              <li>• Check for changeover switches</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">The Safe Isolation Procedure</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The safe isolation procedure is a systematic approach that ensures equipment is safely disconnected from all supply sources before work begins.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">The Essential Steps</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">1</span>
                <div>
                  <p className="text-white font-semibold">IDENTIFY</p>
                  <p className="text-[14px] text-white/70">Identify the circuit/equipment to be worked on and ALL sources of supply</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">2</span>
                <div>
                  <p className="text-white font-semibold">ISOLATE</p>
                  <p className="text-[14px] text-white/70">Disconnect from all supplies using appropriate isolation devices</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">3</span>
                <div>
                  <p className="text-white font-semibold">SECURE</p>
                  <p className="text-[14px] text-white/70">Lock off isolation devices and apply warning labels</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-white font-semibold">PROVE</p>
                  <p className="text-[14px] text-white/70">Prove your voltage indicator works on a known live source</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">5</span>
                <div>
                  <p className="text-white font-semibold">TEST</p>
                  <p className="text-[14px] text-white/70">Test the circuit dead at the point of work</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">6</span>
                <div>
                  <p className="text-white font-semibold">RE-PROVE</p>
                  <p className="text-[14px] text-white/70">Prove your voltage indicator still works on the known live source</p>
                </div>
              </li>
            </ol>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20 mt-4">
              <p className="text-white font-semibold">Prove-Test-Prove</p>
              <p className="text-white/80 mt-2">
                The prove-test-prove procedure (steps 4-6) is critical. It confirms your test equipment was working before you tested the circuit, and is still working after. If the tester failed between the tests, you'd know your "dead" reading was unreliable.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Legal Requirements</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Safe isolation isn't just good practice - it's a legal requirement under the Electricity at Work Regulations 1989.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Key Regulations</h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">Regulation 12 - Means of Cutting Off Supply</p>
                <p className="text-white/80 mt-1">Where necessary to prevent danger, suitable means must be available for cutting off the electrical supply to any electrical equipment.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">Regulation 13 - Precautions for Work on Dead Equipment</p>
                <p className="text-white/80 mt-1">Adequate precautions must be taken to prevent equipment being made live while work is being carried out.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">Regulation 14 - Work on or Near Live Conductors</p>
                <p className="text-white/80 mt-1">Live working is only permitted when it's unreasonable to work dead AND suitable precautions are taken.</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">HSE Guidance - GS38</h3>
            <p>
              <strong className="text-white">GS38</strong> provides practical guidance on:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Safe isolation procedures</li>
              <li>• Test equipment requirements</li>
              <li>• Proving units</li>
              <li>• Personal responsibility for safety</li>
            </ul>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  <strong className="text-white">Personal Responsibility:</strong> GS38 emphasises that each person is responsible for their own safety. You must personally verify isolation - don't rely on others.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Before Isolation</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Review the installation - are there multiple supplies?</li>
                <li>• Identify the correct circuit to be isolated</li>
                <li>• Check your test equipment is working and in date</li>
                <li>• Ensure you have lock-off equipment available</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Trusting the circuit label without verifying</li>
                <li>• Not checking for alternative supplies</li>
                <li>• Skipping the prove-test-prove procedure</li>
                <li>• Relying on someone else's isolation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Best Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Always assume the circuit is live until YOU have proved it dead</li>
                <li>• Use your own lock with your own key</li>
                <li>• Test between all live conductors and earth</li>
                <li>• Document the isolation in writing if required</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <UnitsPocketCard
          title="Safe Isolation Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 1 Quiz"
          description="Test your knowledge of safe isolation principles"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1 opacity-50" disabled>
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="../section2">
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule2Section1;
