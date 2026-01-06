import { ArrowLeft, Zap, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_4 = () => {
  useSEO(
    "Verifying Correct Terminations and Polarity - Level 2 Electrical Installation",
    "Understanding BS 7671 requirements for correct terminations and polarity verification in electrical installations"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What risk is caused by a loose termination?",
      options: [
        "Low voltage",
        "Overheating and potential fire",
        "Reduced efficiency",
        "Increased cost"
      ],
      correctAnswer: 1,
      explanation: "Loose terminations cause resistance, leading to heat build-up and potential fire risks."
    },
    {
      id: 2,
      question: "True or False: It is acceptable for a switch to break the neutral conductor.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False — switches must break the live conductor to ensure safe isolation."
    },
    {
      id: 3,
      question: "What is reversed polarity?",
      options: [
        "Voltage too high",
        "Current too low",
        "When live and neutral conductors are swapped",
        "When earth is missing"
      ],
      correctAnswer: 2,
      explanation: "Reversed polarity occurs when live and neutral conductors are incorrectly connected, swapping their positions."
    },
    {
      id: 4,
      question: "Why must earth conductors be sleeved green/yellow?",
      options: [
        "For aesthetic reasons",
        "To comply with identification standards",
        "To improve conductivity",
        "To reduce cost"
      ],
      correctAnswer: 1,
      explanation: "Green/yellow sleeving ensures compliance with BS 7671 conductor identification standards."
    },
    {
      id: 5,
      question: "Name one tool used to confirm polarity after installation.",
      options: [
        "Screwdriver",
        "Multimeter or polarity tester",
        "Wire strippers",
        "Crimping tool"
      ],
      correctAnswer: 1,
      explanation: "Multimeters and polarity testers can confirm correct polarity after visual inspection."
    },
    {
      id: 6,
      question: "What can over-tightening a terminal screw cause?",
      options: [
        "Better connection",
        "Damage to the conductor or threads",
        "Improved safety",
        "Reduced resistance"
      ],
      correctAnswer: 1,
      explanation: "Over-tightening can damage conductor strands or strip terminal threads, creating poor connections."
    },
    {
      id: 7,
      question: "Why is incorrect polarity especially dangerous in lighting circuits?",
      options: [
        "Higher voltage",
        "Because fittings can remain live even when switched off",
        "Reduced illumination",
        "Increased energy consumption"
      ],
      correctAnswer: 1,
      explanation: "With incorrect polarity, switches break the neutral instead of live, leaving fittings energised when 'off'."
    },
    {
      id: 8,
      question: "What standard sets requirements for polarity and terminations?",
      options: [
        "BS 5839",
        "BS 6423",
        "BS 7671",
        "BS 1362"
      ],
      correctAnswer: 2,
      explanation: "BS 7671 (IET Wiring Regulations) sets the requirements for polarity and terminations."
    },
    {
      id: 9,
      question: "What is one sign of poor terminations during inspection?",
      options: [
        "Bright copper colour",
        "Discolouration or melting at terminals",
        "Clean connections",
        "Proper torque settings"
      ],
      correctAnswer: 1,
      explanation: "Discolouration or melting indicates overheating caused by poor terminations."
    },
    {
      id: 10,
      question: "Can multiple conductors be placed in one terminal?",
      options: [
        "Never allowed",
        "Always acceptable",
        "Only if the terminal is designed to accommodate them safely",
        "Only with special tools"
      ],
      correctAnswer: 2,
      explanation: "Multiple conductors can only be placed in terminals specifically designed and rated for multiple connections."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.2.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Verifying Correct Terminations and Polarity
          </h1>
          <p className="text-white">
            Ensuring correct terminations and polarity for safe and compliant electrical installations
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Terminations: tight, secure, correctly identified (brown-live, blue-neutral, green/yellow-earth)</li>
                <li>Polarity: switches break live conductor, not neutral</li>
                <li>Common faults: loose connections, reversed polarity, poor earth connections</li>
                <li>Testing: visual inspection plus polarity testing with instruments</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Discolouration, loose screws, wrong colours, multiple conductors crammed</li>
                <li><strong>Use:</strong> Correct screwdrivers, torque settings, multimeter, polarity tester</li>
                <li><strong>Check:</strong> BS 7671 compliance; conductor colours; switch operation; earth continuity</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Once cables are routed and installed, ensuring correct terminations and polarity is essential. Poor terminations lead to overheating, arcing, and failures, while incorrect polarity can make equipment unsafe or even lethal. Visual inspection of connections helps identify obvious issues before testing confirms compliance.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the importance of correct terminations in electrical safety.</li>
            <li>Recognise common termination faults (loose, over-tightened, or damaged).</li>
            <li>Understand the significance of polarity in socket outlets, lighting points, and switches.</li>
            <li>Verify polarity visually and through testing.</li>
            <li>Apply BS 7671 requirements for safe and compliant terminations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Terminations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Terminations</h3>
            <p className="text-base text-white mb-4">
              Electrical terminations must be mechanically sound, electrically secure, and properly identified to ensure safe operation and prevent failures.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Proper Termination Standards</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Mechanical Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Must be tight and secure without over-tightening</li>
                          <li>No visible strands outside terminal blocks</li>
                          <li>Appropriate conductor preparation and stripping</li>
                          <li>No damage to conductor strands or terminal threads</li>
                          <li>Correct torque settings where specified by manufacturer</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Electrical Safety:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Low resistance connections prevent heat build-up</li>
                          <li>No exposed live conductors beyond terminal housing</li>
                          <li>Proper screening and separation of different voltages</li>
                          <li>Protection against vibration and thermal cycling</li>
                          <li>Adequate short-circuit withstand capability</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Conductor Identification:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Brown:</strong> Live conductor (L1, L2, L3)</li>
                          <li><strong>Blue:</strong> Neutral conductor (N)</li>
                          <li><strong>Green/Yellow:</strong> Earth/protective conductor (PE)</li>
                          <li>Ensure correct sleeving where core colours change</li>
                          <li>Maintain identification throughout the installation</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Practical Tip</p>
                        <p className="text-xs sm:text-sm text-white">
                          Use the correct screwdriver size to avoid slipping or under/over tightening. Many terminal failures result from incorrect tools or excessive force during installation.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800 mt-3">
                        <p className="font-medium text-emerald-700 dark:text-elec-yellow mb-2">Inspector's Note</p>
                        <p className="text-xs sm:text-sm text-white">
                          Check manufacturer's torque settings for devices like MCBs and RCBOs. Over-tightening can damage the device, while under-tightening creates high resistance connections.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="terminations-check"
            question="What colour should the earth conductor be sleeved?"
            options={["Brown", "Blue", "Green/Yellow", "Black"]}
            correctIndex={2}
            explanation="Earth conductors must be sleeved green/yellow to comply with BS 7671 identification standards."
          />
          <Separator className="my-6" />

          {/* 2. Polarity */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Polarity</h3>
            <p className="text-base text-white mb-4">
              Correct polarity ensures that switches and protective devices operate on the live conductor, maintaining safety when circuits are supposedly isolated.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Polarity Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Switch Operation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Switches must break the live conductor, never the neutral</li>
                          <li>Single-pole switches connected to live side only</li>
                          <li>Two-way switching maintains live conductor switching</li>
                          <li>Incorrect polarity leaves circuits energised when switched 'off'</li>
                          <li>Essential for maintenance safety and shock prevention</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Socket Outlets:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Live conductor to right-hand pin when viewed from front</li>
                          <li>Neutral to left-hand pin</li>
                          <li>Earth to top pin (longest and first to make contact)</li>
                          <li>Reversed polarity affects RCD operation and appliance safety</li>
                          <li>Critical for equipment with single-pole switches</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Lighting Circuits:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Live to switch, switched live to lamp</li>
                          <li>Neutral direct to lamp (no switching)</li>
                          <li>Edison screw lamps: live to centre contact, neutral to thread</li>
                          <li>Bayonet lamps: correct terminal identification essential</li>
                          <li>Emergency lighting circuits require careful polarity verification</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Safety Critical</p>
                        <p className="text-xs sm:text-sm text-white">
                          Incorrect polarity can leave appliances and fittings live when switches are off, creating a serious shock risk during maintenance or lamp replacement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="polarity-check"
            question="Which conductor should a switch always break?"
            options={["Neutral", "Earth", "Live", "Any conductor"]}
            correctIndex={2}
            explanation="Switches must always break the live conductor to ensure safe isolation when switched off."
          />
          <Separator className="my-6" />

          {/* 3. Common Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Common Faults</h3>
            <p className="text-base text-white mb-4">
              Understanding typical termination and polarity faults helps inspectors identify problems quickly and take corrective action.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Typical Installation Faults</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Termination Problems:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Loose connections causing overheating and arcing</li>
                          <li>Over-tightened terminals damaging conductor strands</li>
                          <li>Multiple conductors forced into single-conductor terminals</li>
                          <li>Exposed conductor strands beyond terminal blocks</li>
                          <li>Wrong terminal size for conductor cross-sectional area</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Polarity Errors:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Reversed polarity (live and neutral swapped)</li>
                          <li>Switches connected to neutral instead of live</li>
                          <li>Socket outlets with incorrect pin connections</li>
                          <li>Edison screw lamps with live to thread instead of centre</li>
                          <li>Two-way switching circuits with polarity reversal</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Earth Connection Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Earth conductor not connected or poorly terminated</li>
                          <li>Missing green/yellow sleeving on earth conductors</li>
                          <li>Inadequate earth continuity through metalwork</li>
                          <li>Damaged earth conductors during installation</li>
                          <li>Wrong conductor used for earthing functions</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Critical Warning</p>
                        <p className="text-xs sm:text-sm text-white">
                          Always confirm all conductors are correctly identified and sleeved before energising any circuit. Incorrect identification can cause serious safety hazards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="faults-check"
            question="What could happen if a termination is loose?"
            options={["Nothing serious", "Overheating and potential fire", "Better connections", "Lower energy bills"]}
            correctIndex={1}
            explanation="Loose terminations create high resistance, leading to heat build-up that can cause fires and component failures."
          />
          <Separator className="my-6" />

          {/* 4. Inspection Points */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Inspection Points</h3>
            <p className="text-base text-white mb-4">
              Systematic inspection of terminations and polarity requires both visual examination and instrument testing to confirm compliance.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Inspection Methodology</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Visual Inspection:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Check cable colours against circuit function requirements</li>
                          <li>Ensure earth conductors are sleeved green/yellow throughout</li>
                          <li>Verify polarity visually where possible (e.g., live to switch line)</li>
                          <li>Look for signs of overheating, discolouration, or poor contact at terminals</li>
                          <li>Confirm no exposed conductor strands beyond terminals</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Instrument Testing:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Use multimeter or polarity tester to confirm connections</li>
                          <li>Test continuity between switch and load terminals</li>
                          <li>Verify earth continuity to all exposed metalwork</li>
                          <li>Check insulation resistance between conductors</li>
                          <li>Confirm RCD polarity sensitivity and operation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Documentation Review:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Compare installation against circuit diagrams</li>
                          <li>Verify compliance with manufacturer's instructions</li>
                          <li>Check termination methods against BS 7671 requirements</li>
                          <li>Record any deviations or non-compliances found</li>
                          <li>Update as-built drawings with actual installations</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Quality Assurance</p>
                        <p className="text-xs sm:text-sm text-white">
                          After visual inspection, always confirm polarity with test instruments. Visual checks help identify obvious issues, but proper testing confirms electrical compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="inspection-check"
            question="Why is it unsafe if polarity is reversed in a socket outlet?"
            options={["It costs more electricity", "Appliances may remain live when switched off", "It looks unprofessional", "Nothing happens"]}
            correctIndex={1}
            explanation="Reversed polarity means appliances with single-pole switches remain energised when switched off, creating shock risks."
          />
          <Separator className="my-6" />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4 text-base text-white">
            <div className="space-y-3">
              <p><strong>Tool Selection:</strong> Always use the correct screwdriver size to avoid slipping or under/over tightening. Keep tools in good condition and use torque settings where specified.</p>
              
              <p><strong>Conductor Preparation:</strong> Strip conductors to the correct length - no exposed copper beyond terminals, but sufficient length for secure connection within the terminal block.</p>
              
              <p><strong>Quality Checks:</strong> After visual inspection, confirm polarity with a multimeter or polarity tester. Visual checks alone are insufficient for compliance verification.</p>
              
              <p><strong>Documentation:</strong> Record all termination methods and polarity arrangements. This helps future maintenance and demonstrates compliance with regulations.</p>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-elec-yellow/30">
            <p className="text-base text-white">
              In a commercial office fit-out, a lighting circuit was wired with reversed polarity. When an electrician replaced a lamp, the fitting remained live even though the switch was off, leading to an electric shock incident. Investigation found the live and neutral reversed at a junction box. The issue could have been avoided with a proper polarity check during installation.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white mb-2">Q: Can polarity be checked by visual inspection alone?</p>
              <p className="text-white">A: No — visual checks help, but polarity must also be confirmed by testing.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Q: Is reversed polarity always dangerous?</p>
              <p className="text-white">A: Yes, because it can leave appliances and fittings live when switched off.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Q: Do all terminations require torque tightening?</p>
              <p className="text-white">A: Not all, but many devices specify torque values — always follow manufacturer guidance.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide – Terminations & Polarity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-white">
                <span className="text-green-500">✅</span>
                <span>Tight, secure, and correctly sleeved conductors.</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <span className="text-green-500">✅</span>
                <span>Switches must break the live conductor.</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-white">
                <span className="text-green-500">✅</span>
                <span>Earth always connected and correctly sleeved.</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <span className="text-green-500">✅</span>
                <span>Confirm polarity with test instruments.</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Recap</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow">Termination Safety</h3>
                </div>
                <p className="text-xs sm:text-sm text-white">
                  Good terminations prevent overheating and fire risks. Proper conductor preparation, correct tightness, and appropriate tools are essential for safe connections.
                </p>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow">Polarity Requirements</h3>
                </div>
                <p className="text-xs sm:text-sm text-white">
                  Correct polarity ensures safe operation of switches and outlets. Switches must break live conductors to prevent equipment remaining energised when 'off'.
                </p>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Testing Standards</h3>
                </div>
                <p className="text-xs sm:text-sm text-white">
                  Both visual checks and testing are essential to confirm compliance with BS 7671. Visual inspection identifies obvious faults; instruments verify electrical integrity.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">4</div>
                  <h3 className="font-semibold text-red-600 dark:text-elec-yellow">Common Hazards</h3>
                </div>
                <p className="text-xs sm:text-sm text-white">
                  Mistakes in terminations or polarity can lead to severe electrical hazards including shock, fire, and equipment damage. Prevention through proper procedures is critical.
                </p>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow text-white flex items-center justify-center text-sm font-bold">5</div>
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow">Professional Standards</h3>
                </div>
                <p className="text-xs sm:text-sm text-white">
                  Follow manufacturer's instructions, use correct tools and torque settings, and maintain proper documentation. These practices ensure compliance and future maintainability.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Quiz
          title="Knowledge Check: Terminations & Polarity"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
          <Button variant="outline" asChild>
            <Link to="../2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Routes & Zones
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="..">
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section2_4;