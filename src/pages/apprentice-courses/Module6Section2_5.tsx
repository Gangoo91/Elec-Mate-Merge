import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_5 = () => {
  useSEO(
    "Confirming Circuit Labelling and Identification - Level 2 Electrical Installation",
    "BS 7671 labelling and identification requirements for DBs, devices, and isolation"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main reason for labelling circuits?",
      options: ["To look professional", "Safety – so circuits can be identified and isolated quickly", "To reduce costs", "To impress clients"],
      correctAnswer: 1,
      explanation: "Safety is the primary reason for labelling circuits, allowing for quick identification and safe isolation."
    },
    {
      id: 2,
      question: "Which regulation requires circuits to be identifiable?",
      options: ["BS 5839", "BS 7671", "BS 6423", "BS 1362"],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires all circuits to be identifiable."
    },
    {
      id: 3,
      question: "Name two places where labels are required.",
      options: ["Only on distribution boards", "Distribution boards and protective devices", "Only on isolators", "Only on cables"],
      correctAnswer: 1,
      explanation: "Labels are required on distribution boards, protective devices, isolators, and cables (on larger projects)."
    },
    {
      id: 4,
      question: "What should be included in a distribution board schedule?",
      options: ["Only circuit numbers", "Circuit reference, description, device rating, RCD/RCBO protection", "Only device ratings", "Only descriptions"],
      correctAnswer: 1,
      explanation: "A DB schedule must include circuit reference, load description, device rating, and RCD/RCBO protection details."
    },
    {
      id: 5,
      question: "True or False: Labelling is optional if the electrician remembers the circuits.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False — labelling is a regulatory requirement regardless of personal knowledge."
    },
    {
      id: 6,
      question: "What type of labels are preferred for durability?",
      options: ["Handwritten labels", "Printed labels", "Pencil markings", "Temporary stickers"],
      correctAnswer: 1,
      explanation: "Printed labels are preferred as they are more durable and legible than handwritten alternatives."
    },
    {
      id: 7,
      question: "What risk is created by poor labelling?",
      options: ["Increased costs", "Isolating the wrong circuit and creating safety hazards", "Longer installation time", "Client complaints"],
      correctAnswer: 1,
      explanation: "Poor labelling can lead to isolating the wrong circuit, creating serious safety hazards."
    },
    {
      id: 8,
      question: "Who is responsible for updating circuit labels after changes?",
      options: ["The client", "The electrician carrying out the work", "The inspector", "The building owner"],
      correctAnswer: 1,
      explanation: "The electrician performing modifications must update all relevant labelling immediately."
    },
    {
      id: 9,
      question: "Where should the circuit schedule be fixed?",
      options: ["In the office files only", "Inside or adjacent to the distribution board", "On the wall nearby", "In the client handbook"],
      correctAnswer: 1,
      explanation: "The circuit schedule must be fixed inside or adjacent to the distribution board for easy reference."
    },
    {
      id: 10,
      question: "In the real-world example, what happened due to poor labelling?",
      options: ["Power was lost to the whole building", "Emergency lighting was isolated by mistake, creating a safety risk", "The fire alarm stopped working", "All circuits were damaged"],
      correctAnswer: 1,
      explanation: "Emergency lighting was accidentally isolated instead of classroom lighting, creating a safety risk during evacuation drills."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 6.2.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Confirming Circuit Labelling and Identification
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              BS 7671 labelling and identification requirements for DBs, devices, and isolation
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Label presence: all circuits, devices, and isolators labelled</li>
                  <li>Legibility: clear, durable, professional appearance</li>
                  <li>Accuracy: labels match DB schedule and actual circuits</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Missing labels, illegible text, outdated information</li>
                  <li><strong>Use:</strong> Printed labels; cross-check to DB schedule</li>
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
                Clear and accurate labelling of circuits is vital for safety, compliance, and efficiency. Labels allow electricians, inspectors, and end users to quickly identify which circuits control which areas or equipment. Poor or missing labels can cause confusion, wasted time, and dangerous mistakes such as isolating the wrong circuit.
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
              <li>Explain why circuit labelling and identification are important</li>
              <li>Recognise what information should appear on labels</li>
              <li>Identify where labels should be fixed according to BS 7671</li>
              <li>Inspect and confirm that all circuits are correctly labelled</li>
              <li>Understand the risks of poor labelling and missing identification</li>
            </ul>
          </section>

          {/* Why Labelling Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Labelling Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safety Benefits:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Ensures circuits can be quickly identified and safely isolated</li>
                  <li>Prevents accidental energisation during maintenance work</li>
                  <li>Enables rapid emergency isolation when required</li>
                  <li>Reduces shock risks from working on wrong circuits</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Regulatory Compliance:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>BS 7671 requires all circuits to be identifiable</li>
                  <li>Supports inspection and testing requirements</li>
                  <li>Essential for electrical installation certificates</li>
                  <li>Required for insurance and building regulations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Operational Efficiency:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Saves time when carrying out fault finding and testing</li>
                  <li>Enables quick circuit identification during maintenance</li>
                  <li>Allows building occupants to understand their electrical system</li>
                  <li>Reduces call-out costs for electrical contractors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Safety Critical</p>
                <p className="text-sm">
                  Poor labelling is a contributing factor in many electrical accidents. Clear identification is not optional - it's a life-safety requirement.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="labelling-importance-check"
                question="Why must all circuits be labelled?"
                options={["To look professional", "For safety - quick identification and isolation", "To reduce costs", "Client preference"]}
                correctIndex={1}
                explanation="Circuit labelling is essential for safety, enabling quick identification and safe isolation of circuits."
              />
            </div>
          </section>

          {/* What Labels Should Include */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              What Labels Should Include
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Circuit Identification:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Circuit number or reference (e.g., C1, L1, R1)</li>
                  <li>Clear description of load/area served</li>
                  <li>Examples: "Lighting - Office 1," "Ring Final - Kitchen"</li>
                  <li>Emergency lighting circuits clearly distinguished</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Protection Device Details:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Protective device rating and type (e.g., "B32 MCB")</li>
                  <li>RCD/RCBO protection where applicable (e.g., "30mA RCD")</li>
                  <li>Time delay characteristics if relevant</li>
                  <li>Discrimination requirements for selectivity</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Best Practice</p>
                <p className="text-sm">
                  Use consistent naming conventions throughout the installation. Avoid abbreviations that may not be understood by others.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="label-content-check"
                question="What should a label on an MCB include?"
                options={["Just the circuit number", "Device rating, type, circuit description, and RCD protection", "Only the area served", "Manufacturer information"]}
                correctIndex={1}
                explanation="MCB labels should include device rating and type, circuit description, and RCD/RCBO protection details."
              />
            </div>
          </section>

          {/* Where Labelling is Required */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Where Labelling is Required
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Distribution Boards (DBs):</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Each circuit must be listed on a chart or schedule</li>
                  <li>Schedule fixed inside or adjacent to the DB</li>
                  <li>Laminated or weather-resistant in damp locations</li>
                  <li>Updated immediately after any circuit modifications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Protective Devices:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>MCBs, RCDs, and RCBOs must be individually labelled</li>
                  <li>Labels applied directly to or adjacent to devices</li>
                  <li>Emergency lighting and fire alarm circuits prominently marked</li>
                  <li>Fuse carriers and switch-fuses clearly identified</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Isolators and Switches:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Must show the equipment or circuit they isolate</li>
                  <li>Local isolators at machinery and equipment</li>
                  <li>Emergency stop controls clearly marked</li>
                  <li>Maintenance switches and changeover devices</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Compliance Note</p>
                <p className="text-sm">
                  The schedule or chart required by BS 7671 must be durable and clearly visible. Temporary or handwritten schedules should be replaced with permanent versions.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="label-location-check"
                question="Where should the circuit schedule be displayed?"
                options={["In a filing cabinet", "Inside or adjacent to the distribution board", "On the office wall", "In the client manual only"]}
                correctIndex={1}
                explanation="The circuit schedule must be fixed inside or adjacent to the distribution board for immediate reference."
              />
            </div>
          </section>

          {/* Risks of Poor Labelling */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Risks of Poor or Missing Labelling
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-3">Safety Hazards:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Isolating the wrong circuit - shock, fire, or equipment damage</li>
                  <li>Working on live circuits due to misidentification</li>
                  <li>Emergency services unable to safely isolate supplies</li>
                  <li>Confusion during emergency evacuations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Operational Problems:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Wasted time when fault-finding or testing</li>
                  <li>Increased labour costs for electrical work</li>
                  <li>Equipment damage from incorrect isolation</li>
                  <li>Inability to perform selective maintenance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Compliance Issues:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Failed compliance inspections and testing</li>
                  <li>Insurance claims potentially invalidated</li>
                  <li>Non-compliance with building regulations</li>
                  <li>Professional liability for electrical contractors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Critical Warning</p>
                <p className="text-sm">
                  Poor labelling has been identified as a contributing factor in electrical accidents. The consequences can include serious injury, death, and legal liability.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="labelling-risks-check"
                question="What risk is created by poor labelling?"
                options={["Higher electricity bills", "Isolating the wrong circuit and creating safety hazards", "Reduced equipment life", "Poor appearance"]}
                correctIndex={1}
                explanation="Poor labelling can lead to isolating the wrong circuit, potentially causing shock, fire, or equipment damage."
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
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Installation Process:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Always cross-check labels with test results and schedules</li>
                  <li>Use durable, legible labels resistant to heat and wear</li>
                  <li>Update labels immediately after alterations or additions</li>
                  <li>Ensure DB schedules are accurate and fixed securely</li>
                  <li>Never hand over an installation without full circuit identification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Tools & Techniques</p>
                <div className="text-sm space-y-1">
                  <p><strong>Label Printers:</strong> Professional thermal or laser printers for consistent, durable labels</p>
                  <p><strong>Engraved Tags:</strong> For harsh environments or permanent installations</p>
                  <p><strong>Cable Identification:</strong> Heat-shrink sleeves, tie-on tags, or printed cable markers</p>
                </div>
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
              <p className="font-medium text-red-400 mb-3">School Emergency Lighting Incident</p>
              <p className="text-sm text-white/80 mb-3">
                During routine maintenance in a school, an electrician attempted to isolate the lighting in a classroom. Due to poor labelling, they accidentally isolated the emergency lighting circuit instead.
              </p>
              <p className="text-sm text-white/80 mb-3">
                This left an area of the building without safety lighting during evacuation drills. The emergency lighting remained off for several hours before the error was discovered.
              </p>
              <p className="text-sm font-medium text-white">
                Outcome: Accurate labelling would have prevented this dangerous situation. The incident required a full review and comprehensive re-labelling programme.
              </p>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide - Labelling Essentials
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Label all circuits, breakers, and isolators</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Use clear descriptions (e.g., "Sockets - Office")</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Include device ratings and RCD protection details</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Fix a circuit schedule inside each DB</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Keep labels updated after alterations</span>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Terminations & Polarity
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-6">
                Next: Inspection Checklist
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_5;
