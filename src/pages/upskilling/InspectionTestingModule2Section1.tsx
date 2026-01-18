import { ArrowLeft, Zap, CheckCircle, Shield, AlertTriangle, Power, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Principles of Safe Isolation - Inspection & Testing";
const DESCRIPTION = "Learn the fundamental principles of safe electrical isolation including GS38 requirements, isolation points, and the essential steps to work safely on electrical systems.";

const quickCheckQuestions = [
  {
    id: "safe-isolation-purpose",
    question: "What is the primary purpose of safe isolation?",
    options: ["To test the circuit", "To prevent electrical contact while working", "To save energy", "To reset circuit breakers"],
    correctIndex: 1,
    explanation: "Safe isolation ensures that electrical equipment is disconnected from all sources of supply and cannot become live while work is being carried out."
  },
  {
    id: "circuit-breaker-position",
    question: "Why should you never rely on a circuit breaker position to confirm isolation?",
    options: ["They're too small to see", "The handle position may not reflect the contact position", "They're always faulty", "Building regulations forbid it"],
    correctIndex: 1,
    explanation: "Circuit breaker handles can move without the contacts operating, or contacts can fail internally. Always prove dead with an approved voltage indicator."
  },
  {
    id: "gs38-guidance",
    question: "What document provides HSE guidance on safe isolation procedures?",
    options: ["BS 7671 Part 4", "GS38", "IEE Guidance Note 3", "Building Regulations Part P"],
    correctIndex: 1,
    explanation: "GS38 (Electrical test equipment for use on low voltage electrical systems) is the HSE guidance document covering safe isolation procedures and test equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The term 'isolation' in electrical work means:",
    options: ["Turning off a switch", "Disconnecting from all sources of supply to prevent re-energisation", "Putting barriers around equipment", "Testing the circuit"],
    correctAnswer: 1,
    explanation: "Isolation means disconnecting from all sources of electrical supply and taking steps to prevent re-energisation."
  },
  {
    id: 2,
    question: "Which of these is NOT an acceptable isolation device?",
    options: ["Isolating switch (BS EN 60947-3)", "Circuit breaker used as an isolator", "Plug and socket", "Lamp switch"],
    correctAnswer: 3,
    explanation: "Lamp switches and similar control switches don't meet isolation requirements. Isolators must have visible contact separation or position indication."
  },
  {
    id: 3,
    question: "Safe isolation is required under which regulation?",
    options: ["EAW Regulation 4 only", "EAW Regulation 12 and 13", "BS 7671 only", "Building Regulations"],
    correctAnswer: 1,
    explanation: "EAW Regulations 12 (means of cutting off supply) and 13 (precautions for dead working) require safe isolation procedures."
  },
  {
    id: 4,
    question: "How many sources of supply might a circuit have?",
    options: ["Always one", "One or more - all must be identified and isolated", "Maximum of two", "It doesn't matter"],
    correctAnswer: 1,
    explanation: "Circuits may have multiple supply sources (generators, solar PV, UPS, alternative supplies). All sources must be identified and isolated."
  },
  {
    id: 5,
    question: "Before working on any electrical equipment you should:",
    options: ["Assume it's safe", "Ask someone if it's isolated", "Personally verify isolation using proved test equipment", "Check the circuit label"],
    correctAnswer: 2,
    explanation: "You should personally verify isolation using approved voltage testing equipment that you have proved working before and after testing."
  },
  {
    id: 6,
    question: "An isolation device must:",
    options: ["Be automatic", "Provide reliable position indication of contacts", "Be electronic", "Be remotely controlled"],
    correctAnswer: 1,
    explanation: "Isolation devices must indicate contact position reliably - either through visible contact gap or a reliable position indicator."
  },
  {
    id: 7,
    question: "GS38 recommends that safe isolation should be:",
    options: ["Done only by qualified electricians", "Carried out by any person working on electrical equipment", "Optional for low-risk work", "Done remotely"],
    correctAnswer: 1,
    explanation: "Any person working on electrical equipment should follow safe isolation procedures - it's not limited to qualified electricians."
  },
  {
    id: 8,
    question: "When working on a circuit with stored energy (capacitors), you should:",
    options: ["Ignore it - isolation is enough", "Allow time for discharge and verify", "Only worry about batteries", "Wear rubber gloves"],
    correctAnswer: 1,
    explanation: "Capacitors can hold dangerous charges even after isolation. Allow time for discharge and verify the energy is dissipated."
  },
  {
    id: 9,
    question: "If you cannot identify all supply sources to equipment:",
    options: ["Proceed anyway", "Assume there's only one source", "Do not proceed until all sources are identified", "Ask the client"],
    correctAnswer: 2,
    explanation: "Never proceed with isolation until you have positively identified all sources of supply. Unknown sources could re-energise the equipment."
  },
  {
    id: 10,
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

const InspectionTestingModule2Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Safe Isolation
          </h1>
          <p className="text-white/80">
            Understanding why safe isolation is essential and the fundamental principles that protect lives
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Prevent electrical contact while working</li>
              <li><strong>Key:</strong> Disconnect from ALL supply sources</li>
              <li><strong>Verify:</strong> Never trust switch position alone</li>
              <li><strong>Prove:</strong> Use approved voltage indicator</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Critical References</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>GS38:</strong> HSE electrical test equipment guidance</li>
              <li><strong>EAW Reg 12:</strong> Means of cutting off supply</li>
              <li><strong>EAW Reg 13:</strong> Precautions for dead working</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what safe isolation means",
              "Explain why safe isolation is critical",
              "Identify suitable isolation devices",
              "Recognise multiple supply sources",
              "Describe the isolation procedure steps",
              "Understand legal requirements for isolation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is Safe Isolation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Safe Isolation?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Safe isolation</strong> is the process of disconnecting electrical equipment from all sources of supply and taking steps to ensure it cannot become live while work is being carried out.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Critical Safety Principle</p>
                  <p className="text-white/80 mt-1 text-sm">
                    Every year in the UK, electrical accidents cause approximately 30 deaths and 350,000 injuries. Many of these could be prevented by proper safe isolation procedures.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Isolation Is More Than Switching Off</p>
              <p className="text-sm text-white/90 mb-3">Simply switching off is NOT safe isolation. Safe isolation includes:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <Power className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Identification</strong> of ALL sources of supply</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Disconnection</strong> using suitable isolation devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Securing</strong> against re-energisation (locking off)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Verification</strong> that the circuit is dead (prove-test-prove)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Why Safe Isolation is Critical */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why Safe Isolation is Critical
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The human body is vulnerable to electric current. Even low voltages can cause fatal injuries under certain conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">What Can Go Wrong Without Proper Isolation</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-white font-medium text-sm">Circuit Not Actually Isolated</p>
                  <p className="text-white/70 text-xs mt-1">Switch handle moved but contacts didn't open, or wrong circuit isolated.</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-white font-medium text-sm">Supply Restored During Work</p>
                  <p className="text-white/70 text-xs mt-1">Someone else switches the supply back on, not knowing work is being done.</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-white font-medium text-sm">Unknown Supply Source</p>
                  <p className="text-white/70 text-xs mt-1">Equipment fed from multiple sources - only one was isolated.</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-white font-medium text-sm">Stored Energy</p>
                  <p className="text-white/70 text-xs mt-1">Capacitors retain charge even after isolation - can deliver fatal shock.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consequences</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Electric shock - potentially fatal</li>
                <li>Arc flash - severe burns, blindness</li>
                <li>Falls from height after shock</li>
                <li>Fire and explosion</li>
                <li>Equipment damage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Isolation Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Isolation Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An <strong>isolation device</strong> is a device capable of cutting off the supply to all or part of an installation and which meets specific requirements for contact separation and position indication.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400 mb-2">Acceptable Isolation Devices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Switch-Disconnectors</strong> - BS EN 60947-3</li>
                  <li><strong>Isolating Switches</strong> - Visible contact gap</li>
                  <li><strong>Fuse Links (Removed)</strong> - Definite disconnection</li>
                  <li><strong>Plugs and Sockets</strong> - Up to 16A</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400 mb-2">NOT Acceptable for Isolation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Control Switches</strong> - Light switches, starters</li>
                  <li><strong>Contactors</strong> - Magnetically held</li>
                  <li><strong>Semiconductor Devices</strong> - No physical gap</li>
                  <li><strong>MCBs (usually)</strong> - Unless marked suitable</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Multiple Supply Sources */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Multiple Supply Sources
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most dangerous assumptions is that equipment has only one source of supply. Modern installations often have multiple supplies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Possible Supply Sources</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Mains supply</strong> - The normal DNO supply</li>
                <li><strong>Standby generators</strong> - May auto-start during power cuts</li>
                <li><strong>Solar PV</strong> - Can back-feed during daylight even if mains isolated</li>
                <li><strong>Battery systems / UPS</strong> - Provides power during mains failure</li>
                <li><strong>Alternative mains feeds</strong> - Second supply for critical loads</li>
                <li><strong>Capacitors</strong> - Store energy that must be discharged</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Solar PV Warning:</strong> PV systems generate electricity whenever exposed to light. Even with the mains isolated, DC conductors from panels to inverter can be live. AC may back-feed if the system isn't properly isolated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Safe Isolation Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Safe Isolation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The safe isolation procedure is a systematic approach that ensures equipment is safely disconnected from all supply sources before work begins.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">The Essential Steps</p>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-semibold text-sm">IDENTIFY</p>
                    <p className="text-white/70 text-xs">Identify the circuit/equipment and ALL sources of supply</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-semibold text-sm">ISOLATE</p>
                    <p className="text-white/70 text-xs">Disconnect from all supplies using appropriate isolation devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-semibold text-sm">SECURE</p>
                    <p className="text-white/70 text-xs">Lock off isolation devices and apply warning labels</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-semibold text-sm">PROVE</p>
                    <p className="text-white/70 text-xs">Prove your voltage indicator works on a known live source</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="text-white font-semibold text-sm">TEST</p>
                    <p className="text-white/70 text-xs">Test the circuit dead at the point of work</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex-shrink-0">6</span>
                  <div>
                    <p className="text-white font-semibold text-sm">RE-PROVE</p>
                    <p className="text-white/70 text-xs">Prove your voltage indicator still works on the known live source</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <p className="text-white font-semibold text-sm">Prove-Test-Prove</p>
              <p className="text-white/80 mt-2 text-sm">
                The prove-test-prove procedure (steps 4-6) is critical. It confirms your test equipment was working before you tested the circuit, and is still working after. If the tester failed between the tests, you'd know your "dead" reading was unreliable.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Legal Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Legal Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation isn't just good practice - it's a legal requirement under the Electricity at Work Regulations 1989.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-elec-yellow font-semibold text-sm">Regulation 12 - Means of Cutting Off Supply</p>
                <p className="text-white/80 mt-1 text-xs">Where necessary to prevent danger, suitable means must be available for cutting off the electrical supply to any electrical equipment.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-elec-yellow font-semibold text-sm">Regulation 13 - Precautions for Work on Dead Equipment</p>
                <p className="text-white/80 mt-1 text-xs">Adequate precautions must be taken to prevent equipment being made live while work is being carried out.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-elec-yellow font-semibold text-sm">Regulation 14 - Work on or Near Live Conductors</p>
                <p className="text-white/80 mt-1 text-xs">Live working is only permitted when it's unreasonable to work dead AND suitable precautions are taken.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Personal Responsibility:</strong> GS38 emphasises that each person is responsible for their own safety. You must personally verify isolation - don't rely on others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Isolation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review the installation - are there multiple supplies?</li>
                <li>Identify the correct circuit to be isolated</li>
                <li>Check your test equipment is working and in date</li>
                <li>Ensure you have lock-off equipment available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Trusting the circuit label without verifying</li>
                <li>Not checking for alternative supplies</li>
                <li>Skipping the prove-test-prove procedure</li>
                <li>Relying on someone else's isolation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always assume the circuit is live until YOU have proved it dead</li>
                <li>Use your own lock with your own key</li>
                <li>Test between all live conductors and earth</li>
                <li>Document the isolation in writing if required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Safe Isolation Reference"
            items={[
              { label: "GS38", value: "HSE electrical guidance" },
              { label: "EAW Reg 12", value: "Means of cutting off supply" },
              { label: "EAW Reg 13", value: "Precautions for work dead" },
              { label: "EAW Reg 14", value: "Work on live conductors" },
              { label: "BS EN 60947-3", value: "Isolator standard" },
              { label: "Prove-Test-Prove", value: "Essential procedure" },
              { label: "All sources", value: "Must be identified" },
              { label: "Lock off", value: "Prevent re-energisation" },
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule2Section1;
