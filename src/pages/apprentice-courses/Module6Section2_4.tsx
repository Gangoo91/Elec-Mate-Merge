import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_4 = () => {
  useSEO(
    "Verifying Correct Terminations and Polarity - Level 2 Electrical Installation",
    "Understanding BS 7671 requirements for correct terminations and polarity verification in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What risk is caused by a loose termination?",
      options: ["Low voltage", "Overheating and potential fire", "Reduced efficiency", "Increased cost"],
      correctAnswer: 1,
      explanation: "Loose terminations cause resistance, leading to heat build-up and potential fire risks."
    },
    {
      id: 2,
      question: "True or False: It is acceptable for a switch to break the neutral conductor.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False — switches must break the live conductor to ensure safe isolation."
    },
    {
      id: 3,
      question: "What is reversed polarity?",
      options: ["Voltage too high", "Current too low", "When live and neutral conductors are swapped", "When earth is missing"],
      correctAnswer: 2,
      explanation: "Reversed polarity occurs when live and neutral conductors are incorrectly connected, swapping their positions."
    },
    {
      id: 4,
      question: "Why must earth conductors be sleeved green/yellow?",
      options: ["For aesthetic reasons", "To comply with identification standards", "To improve conductivity", "To reduce cost"],
      correctAnswer: 1,
      explanation: "Green/yellow sleeving ensures compliance with BS 7671 conductor identification standards."
    },
    {
      id: 5,
      question: "Name one tool used to confirm polarity after installation.",
      options: ["Screwdriver", "Multimeter or polarity tester", "Wire strippers", "Crimping tool"],
      correctAnswer: 1,
      explanation: "Multimeters and polarity testers can confirm correct polarity after visual inspection."
    },
    {
      id: 6,
      question: "What can over-tightening a terminal screw cause?",
      options: ["Better connection", "Damage to the conductor or threads", "Improved safety", "Reduced resistance"],
      correctAnswer: 1,
      explanation: "Over-tightening can damage conductor strands or strip terminal threads, creating poor connections."
    },
    {
      id: 7,
      question: "Why is incorrect polarity especially dangerous in lighting circuits?",
      options: ["Higher voltage", "Because fittings can remain live even when switched off", "Reduced illumination", "Increased energy consumption"],
      correctAnswer: 1,
      explanation: "With incorrect polarity, switches break the neutral instead of live, leaving fittings energised when 'off'."
    },
    {
      id: 8,
      question: "What standard sets requirements for polarity and terminations?",
      options: ["BS 5839", "BS 6423", "BS 7671", "BS 1362"],
      correctAnswer: 2,
      explanation: "BS 7671 (IET Wiring Regulations) sets the requirements for polarity and terminations."
    },
    {
      id: 9,
      question: "What is one sign of poor terminations during inspection?",
      options: ["Bright copper colour", "Discolouration or melting at terminals", "Clean connections", "Proper torque settings"],
      correctAnswer: 1,
      explanation: "Discolouration or melting indicates overheating caused by poor terminations."
    },
    {
      id: 10,
      question: "Can multiple conductors be placed in one terminal?",
      options: ["Never allowed", "Always acceptable", "Only if the terminal is designed to accommodate them safely", "Only with special tools"],
      correctAnswer: 2,
      explanation: "Multiple conductors can only be placed in terminals specifically designed and rated for multiple connections."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Verifying Correct Terminations and Polarity
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Ensuring correct terminations and polarity for safe and compliant electrical installations
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Terminations: tight, secure, correctly identified</li>
                  <li>Polarity: switches break live conductor, not neutral</li>
                  <li>Common faults: loose connections, reversed polarity</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Discolouration, loose screws, wrong colours</li>
                  <li><strong>Use:</strong> Correct screwdrivers, torque settings, multimeter</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Once cables are routed and installed, ensuring correct terminations and polarity is essential. Poor terminations lead to overheating, arcing, and failures, while incorrect polarity can make equipment unsafe or even lethal.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain the importance of correct terminations in electrical safety</li>
              <li>Recognise common termination faults (loose, over-tightened, or damaged)</li>
              <li>Understand the significance of polarity in socket outlets, lighting points, and switches</li>
              <li>Verify polarity visually and through testing</li>
              <li>Apply BS 7671 requirements for safe and compliant terminations</li>
            </ul>
          </section>

          {/* Terminations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Terminations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical terminations must be mechanically sound, electrically secure, and properly identified to ensure safe operation and prevent failures.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Mechanical Requirements:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Must be tight and secure without over-tightening</li>
                  <li>No visible strands outside terminal blocks</li>
                  <li>Appropriate conductor preparation and stripping</li>
                  <li>Correct torque settings where specified by manufacturer</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Conductor Identification:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Brown:</strong> Live conductor (L1, L2, L3)</li>
                  <li><strong>Blue:</strong> Neutral conductor (N)</li>
                  <li><strong>Green/Yellow:</strong> Earth/protective conductor (PE)</li>
                  <li>Ensure correct sleeving where core colours change</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Practical Tip</p>
                <p className="text-sm">
                  Use the correct screwdriver size to avoid slipping or under/over tightening. Many terminal failures result from incorrect tools or excessive force during installation.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="terminations-check"
                question="What colour should the earth conductor be sleeved?"
                options={["Brown", "Blue", "Green/Yellow", "Black"]}
                correctIndex={2}
                explanation="Earth conductors must be sleeved green/yellow to comply with BS 7671 identification standards."
              />
            </div>
          </section>

          {/* Polarity */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Polarity
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Correct polarity ensures that switches and protective devices operate on the live conductor, maintaining safety when circuits are supposedly isolated.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Switch Operation:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Switches must break the live conductor, never the neutral</li>
                  <li>Single-pole switches connected to live side only</li>
                  <li>Incorrect polarity leaves circuits energised when switched 'off'</li>
                  <li>Essential for maintenance safety and shock prevention</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Socket Outlets:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Live conductor to right-hand pin when viewed from front</li>
                  <li>Neutral to left-hand pin</li>
                  <li>Earth to top pin (longest and first to make contact)</li>
                  <li>Reversed polarity affects RCD operation and appliance safety</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Lighting Circuits:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Live to switch, switched live to lamp</li>
                  <li>Neutral direct to lamp (no switching)</li>
                  <li>Edison screw lamps: live to centre contact, neutral to thread</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Safety Critical</p>
                <p className="text-sm">
                  Incorrect polarity can leave appliances and fittings live when switches are off, creating a serious shock risk during maintenance or lamp replacement.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="polarity-check"
                question="Which conductor should a switch always break?"
                options={["Neutral", "Earth", "Live", "Any conductor"]}
                correctIndex={2}
                explanation="Switches must always break the live conductor to ensure safe isolation when switched off."
              />
            </div>
          </section>

          {/* Common Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Common Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-3">Termination Problems:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Loose connections causing overheating and arcing</li>
                  <li>Over-tightened terminals damaging conductor strands</li>
                  <li>Multiple conductors forced into single-conductor terminals</li>
                  <li>Exposed conductor strands beyond terminal blocks</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Polarity Errors:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Reversed polarity (live and neutral swapped)</li>
                  <li>Switches connected to neutral instead of live</li>
                  <li>Socket outlets with incorrect pin connections</li>
                  <li>Edison screw lamps with live to thread instead of centre</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Earth Connection Issues:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Earth conductor not connected or poorly terminated</li>
                  <li>Missing green/yellow sleeving on earth conductors</li>
                  <li>Inadequate earth continuity through metalwork</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Critical Warning</p>
                <p className="text-sm">
                  Always confirm all conductors are correctly identified and sleeved before energising any circuit. Incorrect identification can cause serious safety hazards.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="faults-check"
                question="What could happen if a termination is loose?"
                options={["Nothing serious", "Overheating and potential fire", "Better connections", "Lower energy bills"]}
                correctIndex={1}
                explanation="Loose terminations create high resistance, leading to heat build-up that can cause fires and component failures."
              />
            </div>
          </section>

          {/* Inspection Points */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Inspection Points
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Visual Inspection:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Check cable colours against circuit function requirements</li>
                  <li>Ensure earth conductors are sleeved green/yellow throughout</li>
                  <li>Verify polarity visually where possible</li>
                  <li>Look for signs of overheating, discolouration, or poor contact</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Instrument Testing:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Use multimeter or polarity tester to confirm connections</li>
                  <li>Test continuity between switch and load terminals</li>
                  <li>Verify earth continuity to all exposed metalwork</li>
                  <li>Confirm RCD polarity sensitivity and operation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Quality Assurance</p>
                <p className="text-sm">
                  After visual inspection, always confirm polarity with test instruments. Visual checks help identify obvious issues, but proper testing confirms electrical compliance.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="inspection-check"
                question="Why is it unsafe if polarity is reversed in a socket outlet?"
                options={["It costs more electricity", "Appliances may remain live when switched off", "It looks unprofessional", "Nothing happens"]}
                correctIndex={1}
                explanation="Reversed polarity means appliances with single-pole switches remain energised when switched off, creating shock risks."
              />
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <p><strong>Tool Selection:</strong> Always use the correct screwdriver size to avoid slipping or under/over tightening. Keep tools in good condition and use torque settings where specified.</p>
                <p><strong>Conductor Preparation:</strong> Strip conductors to the correct length - no exposed copper beyond terminals, but sufficient length for secure connection within the terminal block.</p>
                <p><strong>Quality Checks:</strong> After visual inspection, confirm polarity with a multimeter or polarity tester. Visual checks alone are insufficient for compliance verification.</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="font-medium text-red-400 mb-3">Commercial Office Incident</p>
              <p className="text-sm text-white/80 mb-3">
                In a commercial office fit-out, a lighting circuit was wired with reversed polarity. When an electrician replaced a lamp, the fitting remained live even though the switch was off, leading to an electric shock incident.
              </p>
              <p className="text-sm text-white/80 mb-3">
                Investigation found the live and neutral reversed at a junction box.
              </p>
              <p className="text-sm font-medium text-white">
                Prevention: A proper polarity check during installation would have prevented this dangerous situation.
              </p>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide - Terminations & Polarity
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Tight, secure, and correctly sleeved conductors</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Switches must break the live conductor</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Earth always connected and correctly sleeved</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Confirm polarity with test instruments</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Knowledge Check: Terminations & Polarity" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cable Routes & Zones
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-5">
                Next: Circuit Labelling
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_4;
