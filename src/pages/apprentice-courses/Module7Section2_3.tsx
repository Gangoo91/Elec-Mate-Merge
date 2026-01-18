import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_3 = () => {
  useSEO(
    "Earth Faults and Leakage Currents - Level 2 Module 7 Section 2.3",
    "Understanding earth faults, leakage currents, and protective measures in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is an earth fault?",
      options: [
        "When a live conductor makes contact with earth or exposed conductive parts",
        "When neutral and line conductors touch",
        "When current flows through the protective conductor normally",
        "When RCD operates correctly"
      ],
      correctAnswer: 0,
      explanation: "An earth fault occurs when a live conductor makes contact with earth or exposed conductive parts, creating a dangerous condition."
    },
    {
      id: 2,
      question: "What happens if a line conductor touches exposed earthed metalwork?",
      options: [
        "Nothing happens",
        "The metalwork becomes live and dangerous",
        "The circuit becomes more efficient",
        "Only the RCD will be affected"
      ],
      correctAnswer: 1,
      explanation: "When a line conductor touches exposed earthed metalwork, that metalwork becomes live, creating a serious shock risk."
    },
    {
      id: 3,
      question: "How is leakage current different from a full earth fault?",
      options: [
        "Leakage current is much larger",
        "Leakage current is a small, unintended flow to earth",
        "Leakage current only occurs in old installations",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Leakage current is a small, unintended current that flows continuously through insulation or damp conditions, while earth faults usually involve higher currents."
    },
    {
      id: 4,
      question: "What risk do earth faults pose to people?",
      options: [
        "No risk if protective devices work",
        "Electric shock from exposed metalwork becoming live",
        "Only equipment damage",
        "Reduced energy efficiency"
      ],
      correctAnswer: 1,
      explanation: "Earth faults pose a serious risk of electric shock as exposed metalwork can become live and dangerous to touch."
    },
    {
      id: 5,
      question: "What risk do leakage currents pose to installations?",
      options: [
        "No risk at all",
        "Nuisance tripping of RCDs and potential overheating",
        "Improved safety",
        "Better energy efficiency"
      ],
      correctAnswer: 1,
      explanation: "Leakage currents can cause nuisance RCD tripping, loss of supply, and potential overheating over time."
    },
    {
      id: 6,
      question: "Which device detects current imbalance caused by leakage?",
      options: [
        "MCB",
        "Fuse",
        "RCD",
        "Isolator"
      ],
      correctAnswer: 2,
      explanation: "RCDs (Residual Current Devices) monitor current balance between live and neutral and trip if leakage to earth is detected."
    },
    {
      id: 7,
      question: "True or False: All earth faults cause high fault currents.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Some earth faults, particularly through high impedance paths, may not cause high currents but are still dangerous."
    },
    {
      id: 8,
      question: "What can cause leakage currents in electrical installations?",
      options: [
        "Perfect insulation",
        "Leakage currents from damp conditions or equipment filters",
        "Correct earthing",
        "Low resistance conductors"
      ],
      correctAnswer: 1,
      explanation: "Leakage currents from damp conditions, equipment filters, or deteriorating insulation can cause nuisance RCD tripping."
    },
    {
      id: 9,
      question: "Which tool directly measures leakage current to earth?",
      options: [
        "Standard multimeter",
        "Earth-leakage clamp meter",
        "Basic continuity tester",
        "Standard ammeter"
      ],
      correctAnswer: 1,
      explanation: "Earth-leakage clamp meters are specifically designed to measure small currents flowing to earth without breaking the circuit."
    },
    {
      id: 10,
      question: "Which BS 7671 part covers selection and erection of RCDs?",
      options: [
        "Part 411",
        "Part 531",
        "Part 514",
        "Part 522"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Part 531 covers the selection and erection of devices for protection against electric shock, including RCDs."
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
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span>Section 2.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Earth Faults and Leakage Currents
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Understanding earth faults, leakage currents, and protective measures in electrical installations
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              An <strong className="text-white">earth fault</strong> occurs when a live conductor makes contact with earth or exposed conductive parts, creating serious risk of electric shock and equipment damage. <strong className="text-white">Leakage currents</strong> are smaller, persistent flows that can cause nuisance RCD tripping and operational problems.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Earth Faults and Leakage Current Fundamentals
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <h4 className="font-medium text-elec-yellow">Definitions and Key Differences</h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <h5 className="font-medium text-red-300 mb-2">Earth Fault</h5>
                  <p className="text-sm mb-3 text-red-200/80">An electrical fault where a live conductor makes direct contact with earth or exposed conductive parts, creating an immediate dangerous condition.</p>
                  <ul className="text-sm space-y-1 text-red-200/80">
                    <li>• Typically involves higher currents (hundreds of mA to several amps)</li>
                    <li>• Creates immediate danger - exposed parts become live</li>
                    <li>• Usually causes immediate RCD operation</li>
                    <li>• Requires urgent investigation and rectification</li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                  <h5 className="font-medium text-amber-300 mb-2">Leakage Current</h5>
                  <p className="text-sm mb-3 text-amber-200/80">Small amounts of current that flow continuously to earth through insulation or designed paths (such as EMC filters).</p>
                  <ul className="text-sm space-y-1 text-amber-200/80">
                    <li>• Much smaller currents (typically 1-10mA per circuit)</li>
                    <li>• Persistent but not immediately dangerous</li>
                    <li>• Can cause nuisance RCD tripping when cumulative</li>
                    <li>• Sometimes normal (in IT equipment with filters)</li>
                  </ul>
                </div>
              </div>

              <h4 className="font-medium text-elec-yellow mt-6">Common Causes and Contributing Factors</h4>

              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h5 className="font-medium text-red-300 mb-2">Earth Fault Causes</h5>
                <ul className="text-sm space-y-1 text-red-200/80">
                  <li>• <strong className="text-red-300">Mechanical damage:</strong> Nails, screws, or tools penetrating cable insulation</li>
                  <li>• <strong className="text-red-300">Water ingress:</strong> Moisture entering electrical equipment or accessories</li>
                  <li>• <strong className="text-red-300">Insulation failure:</strong> Age, heat, or chemical degradation of cable insulation</li>
                  <li>• <strong className="text-red-300">Installation errors:</strong> Loose connections allowing conductors to touch metalwork</li>
                  <li>• <strong className="text-red-300">Environmental factors:</strong> Rodent damage, UV degradation, or corrosive atmospheres</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h5 className="font-medium text-amber-300 mb-2">Leakage Current Sources</h5>
                <ul className="text-sm space-y-1 text-amber-200/80">
                  <li>• <strong className="text-amber-300">EMC filters:</strong> Built-in capacitors in IT equipment (normal operation)</li>
                  <li>• <strong className="text-amber-300">Capacitive coupling:</strong> Long cable runs creating natural capacitance to earth</li>
                  <li>• <strong className="text-amber-300">Moisture ingress:</strong> Gradual water penetration reducing insulation resistance</li>
                  <li>• <strong className="text-amber-300">Deteriorating insulation:</strong> Gradual breakdown allowing small current paths</li>
                  <li>• <strong className="text-amber-300">Dirty surfaces:</strong> Contaminated insulators providing conductive paths</li>
                </ul>
              </div>

              <h4 className="font-medium text-elec-yellow mt-6">Safety Risks and Effects</h4>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-red-400 mb-2">Immediate Safety Risks</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Electric shock:</strong> Exposed metalwork becomes live and dangerous to touch</li>
                  <li>• <strong className="text-white">Fire risk:</strong> Arcing at fault points can ignite combustible materials</li>
                  <li>• <strong className="text-white">Equipment damage:</strong> Fault currents can damage sensitive electronic equipment</li>
                  <li>• <strong className="text-white">Loss of protection:</strong> Earth fault affecting protective conductor systems</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-orange-400 mb-2">Operational Problems</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Nuisance tripping:</strong> RCDs operate unnecessarily, causing supply interruption</li>
                  <li>• <strong className="text-white">Reduced availability:</strong> Frequent supply interruptions affect productivity and safety systems</li>
                  <li>• <strong className="text-white">Cumulative effects:</strong> Multiple small leakage currents can sum to trip 30mA RCDs</li>
                  <li>• <strong className="text-white">Heating effects:</strong> Persistent leakage can cause localised heating and further insulation degradation</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="earth-fault-fundamentals"
                question="What is the key difference between an earth fault and leakage current?"
                options={[
                  "There is no difference",
                  "Earth faults involve higher currents and immediate danger; leakage currents are smaller but persistent",
                  "Leakage currents are more dangerous",
                  "Earth faults only occur in old installations"
                ]}
                correctIndex={1}
                explanation="Earth faults typically involve higher currents and create immediate danger, while leakage currents are smaller but persistent and can cause cumulative problems."
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Protection Systems and BS 7671 Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <h4 className="font-medium text-green-400">Residual Current Device (RCD) Protection</h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">How RCDs Work</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Monitor current balance between live and neutral conductors</li>
                    <li>• Detect imbalance when current flows to earth</li>
                    <li>• Trip when imbalance exceeds rated sensitivity</li>
                    <li>• Provide protection against both earth faults and electric shock</li>
                    <li>• Must disconnect within specified time limits (typically 300ms)</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">RCD Types and Applications</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong className="text-white">30mA:</strong> Personal protection, socket outlets, bathrooms</li>
                    <li>• <strong className="text-white">100mA:</strong> Fire protection in older installations</li>
                    <li>• <strong className="text-white">300mA:</strong> Large installations requiring discrimination</li>
                    <li>• <strong className="text-white">RCBOs:</strong> Combined overcurrent and residual current protection</li>
                    <li>• <strong className="text-white">Time-delayed:</strong> Upstream discrimination in series arrangements</li>
                  </ul>
                </div>
              </div>

              <h4 className="font-medium text-green-400 mt-6">BS 7671 Requirements and Standards</h4>

              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <h5 className="font-medium text-blue-300 mb-2">Key BS 7671 Requirements</h5>
                <ul className="text-sm space-y-1 text-blue-200/80">
                  <li>• <strong className="text-blue-300">Section 411:</strong> Protective measures - basic protection and fault protection</li>
                  <li>• <strong className="text-blue-300">Section 531:</strong> Selection and erection of RCDs and protective devices</li>
                  <li>• <strong className="text-blue-300">30mA additional protection:</strong> Required for socket outlets up to 20A and mobile equipment</li>
                  <li>• <strong className="text-blue-300">Maximum disconnection times:</strong> 0.4s for final circuits, 5s for distribution circuits</li>
                  <li>• <strong className="text-blue-300">Special locations:</strong> Enhanced protection requirements (bathrooms, swimming pools, etc.)</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                <h5 className="font-medium text-purple-300 mb-2">Design Considerations</h5>
                <ul className="text-sm space-y-1 text-purple-200/80">
                  <li>• <strong className="text-purple-300">Discrimination and selectivity:</strong> Use time-delayed RCDs in series arrangements</li>
                  <li>• <strong className="text-purple-300">Split-load design:</strong> Separate circuits to prevent total loss of supply</li>
                  <li>• <strong className="text-purple-300">RCD sensitivity selection:</strong> Balance between protection and nuisance tripping</li>
                  <li>• <strong className="text-purple-300">Leakage assessment:</strong> Consider cumulative leakage when grouping circuits</li>
                  <li>• <strong className="text-purple-300">RCBO per circuit:</strong> Individual protection reduces nuisance tripping impact</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="protection-systems"
                question="Which BS 7671 section covers selection and erection of RCDs?"
                options={[
                  "Section 411",
                  "Section 531",
                  "Section 514",
                  "Section 522"
                ]}
                correctIndex={1}
                explanation="BS 7671 Section 531 covers the selection and erection of devices for protection against electric shock, including RCDs."
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Testing, Diagnosis and Troubleshooting
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <h4 className="font-medium text-purple-400">Systematic Testing Process</h4>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-white mb-3">Step-by-Step Investigation</h5>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li><strong className="text-white">Initial assessment:</strong> Review symptoms, check RCD operations, gather user reports</li>
                  <li><strong className="text-white">Visual inspection:</strong> Check for obvious damage, water ingress, loose connections, or burning</li>
                  <li><strong className="text-white">Safe isolation:</strong> Ensure circuits are safely isolated before detailed investigation</li>
                  <li><strong className="text-white">CPC continuity testing:</strong> Verify earth paths are intact using low-resistance ohmmeter</li>
                  <li><strong className="text-white">Insulation resistance tests:</strong> Test with sensitive equipment isolated to avoid damage</li>
                  <li><strong className="text-white">RCD functional testing:</strong> Perform ramp test and time measurement using RCD tester</li>
                  <li><strong className="text-white">Earth leakage measurement:</strong> Use clamp meter to measure actual leakage currents</li>
                  <li><strong className="text-white">Load assessment:</strong> Evaluate individual circuit contributions to total leakage</li>
                  <li><strong className="text-white">Documentation:</strong> Record findings and compare with acceptable limits</li>
                </ol>
              </div>

              <h4 className="font-medium text-purple-400 mt-6">Testing Equipment and Techniques</h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">Essential Test Equipment</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong className="text-white">Earth leakage clamp meter:</strong> Measures current to earth without circuit interruption</li>
                    <li>• <strong className="text-white">Insulation resistance tester:</strong> 500V DC test for cable and equipment insulation</li>
                    <li>• <strong className="text-white">RCD tester:</strong> Functional testing and trip time measurement</li>
                    <li>• <strong className="text-white">Low resistance ohmmeter:</strong> CPC continuity and bonding verification</li>
                    <li>• <strong className="text-white">PAT tester:</strong> Portable appliance earth leakage measurement</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">Test Standards and Limits</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong className="text-white">Insulation resistance:</strong> Minimum 1MΩ for final circuits</li>
                    <li>• <strong className="text-white">RCD trip time:</strong> Maximum 300ms at rated current for 30mA devices</li>
                    <li>• <strong className="text-white">Earth leakage per circuit:</strong> Typically &lt; 1mA for lighting, &lt; 3.5mA for other circuits</li>
                    <li>• <strong className="text-white">Total installation leakage:</strong> Should not exceed 25% of RCD rating</li>
                    <li>• <strong className="text-white">Class I appliances:</strong> Leakage typically &lt; 3.5mA</li>
                  </ul>
                </div>
              </div>

              <h4 className="font-medium text-purple-400 mt-6">Troubleshooting Common Issues</h4>

              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h5 className="font-medium text-red-300 mb-2">Nuisance RCD Tripping</h5>
                <ul className="text-sm space-y-1 text-red-200/80">
                  <li>• <strong className="text-red-300">Identify cumulative leakage:</strong> Test individual circuits to find high contributors</li>
                  <li>• <strong className="text-red-300">Temporary disconnection:</strong> Isolate suspected circuits to confirm source</li>
                  <li>• <strong className="text-red-300">Load redistribution:</strong> Move high-leakage equipment to separate RCD</li>
                  <li>• <strong className="text-red-300">Equipment assessment:</strong> Check IT equipment, fluorescent lighting, motors</li>
                  <li>• <strong className="text-red-300">Environmental factors:</strong> Consider moisture, temperature, and installation conditions</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h5 className="font-medium text-amber-300 mb-2">RCD Won't Reset</h5>
                <ul className="text-sm space-y-1 text-amber-200/80">
                  <li>• <strong className="text-amber-300">Earth fault present:</strong> High current flow preventing reset</li>
                  <li>• <strong className="text-amber-300">Damaged RCD:</strong> Internal mechanism failure requiring replacement</li>
                  <li>• <strong className="text-amber-300">Mechanical obstruction:</strong> Physical damage to reset mechanism</li>
                  <li>• <strong className="text-amber-300">Persistent fault:</strong> Ongoing earth fault maintaining trip condition</li>
                  <li>• <strong className="text-amber-300">Neutral-earth short:</strong> N-E fault in downstream circuits</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="testing-diagnosis"
                question="Which tool directly measures leakage current to earth without breaking the circuit?"
                options={[
                  "Standard multimeter",
                  "Earth-leakage clamp meter",
                  "Basic continuity tester",
                  "Standard ammeter"
                ]}
                correctIndex={1}
                explanation="Earth-leakage clamp meters are specifically designed to measure small currents flowing to earth without breaking the circuit."
              />
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Practical Guidance
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Safe Investigation Procedure</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Isolate supply and confirm dead before investigation</li>
                  <li>Check for obvious visual signs of damage or water ingress</li>
                  <li>Test earth continuity to verify protective conductor integrity</li>
                  <li>Perform insulation resistance tests with sensitive equipment disconnected</li>
                  <li>Re-energise and test RCD operation at low current levels first</li>
                  <li>Use earth leakage clamp meter to identify problem circuits</li>
                </ol>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-3">Testing Equipment Required</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong className="text-white">RCD tester:</strong> For trip time and sensitivity testing</li>
                  <li>• <strong className="text-white">Insulation resistance tester:</strong> 500V minimum for circuits</li>
                  <li>• <strong className="text-white">Earth leakage clamp meter:</strong> To measure actual leakage currents</li>
                  <li>• <strong className="text-white">Low resistance ohmmeter:</strong> For earth continuity testing</li>
                  <li>• <strong className="text-white">Proving unit:</strong> To verify test instrument operation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real World Example
            </h2>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-medium text-white mb-3">Office Building RCD Nuisance Tripping</h4>
              <div className="space-y-3 text-sm">
                <p><strong className="text-white">Problem:</strong> An office building experienced repeated RCD tripping on the ground floor lighting and power circuits, causing disruption to computer equipment and loss of productivity.</p>
                <p><strong className="text-white">Investigation:</strong> Initial testing showed no obvious faults - insulation resistance values were acceptable and RCD sensitivity was correct. However, earth leakage clamp meter readings revealed 25mA of leakage current on the circuit.</p>
                <p><strong className="text-white">Root Cause:</strong> Water had seeped into a floor-level socket outlet through damaged trunking, creating a leakage path to earth. The 30mA RCD was operating correctly but nuisance tripping occurred during peak load periods when the additional leakage pushed total current above the trip threshold.</p>
                <p><strong className="text-white">Solution:</strong> The damaged socket was replaced, trunking was resealed, and the circuit was transferred to an RCBO to provide individual protection and prevent future nuisance tripping affecting other circuits.</p>
                <p><strong className="text-white">Lesson:</strong> Even small amounts of leakage current can cause significant operational problems. Regular testing and use of appropriate test equipment is essential for identifying problems before they cause disruption.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="font-medium text-white mb-2">Q: Why do RCDs trip when there's no fault?</h4>
                <p className="text-sm text-white/70">A: This is usually due to cumulative leakage currents from multiple sources exceeding the RCD sensitivity. Electronic equipment, damp conditions, and ageing insulation all contribute small leakage currents that can sum to trip 30mA RCDs.</p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h4 className="font-medium text-white mb-2">Q: Is it safe to increase RCD sensitivity to prevent tripping?</h4>
                <p className="text-sm text-white/70">A: No. RCD sensitivity should not be increased as this reduces protection levels. Instead, identify and address the source of leakage or use RCBO design to limit the impact of tripping.</p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <h4 className="font-medium text-white mb-2">Q: How often should RCDs be tested?</h4>
                <p className="text-sm text-white/70">A: RCDs should be tested using the integral test button monthly by the user, and comprehensively tested by a qualified electrician during periodic inspection and testing as required by BS 7671.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Summary</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <h4 className="font-medium text-white mb-2">Key Points:</h4>
                  <ul className="space-y-1 text-white/70">
                    <li>• Earth faults create immediate shock risks by making metalwork live</li>
                    <li>• Leakage currents cause operational problems through nuisance RCD tripping</li>
                    <li>• Both conditions require systematic testing and proper protective devices</li>
                    <li>• RCDs provide essential protection but must be properly coordinated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Best Practice:</h4>
                  <ul className="space-y-1 text-white/70">
                    <li>• Regular inspection and testing prevents problems developing</li>
                    <li>• Proper cable routing and IP ratings reduce fault likelihood</li>
                    <li>• RCBO-per-circuit design minimises disruption from faults</li>
                    <li>• Documentation of leakage sources aids future troubleshooting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of earth faults and leakage currents" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] justify-center sm:justify-start"
              asChild
            >
              <Link to="../2-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Short Circuits
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-black justify-center sm:justify-start"
              asChild
            >
              <Link to="../2-4">
                Next: Overload Conditions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_3;
