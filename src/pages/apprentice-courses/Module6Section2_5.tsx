import { ArrowLeft, FileCheck, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_5 = () => {
  useSEO(
    "Confirming Circuit Labelling and Identification - Level 2 Electrical Installation",
    "BS 7671 labelling and identification requirements for DBs, devices, and isolation"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main reason for labelling circuits?",
      options: [
        "To look professional",
        "Safety – so circuits can be identified and isolated quickly",
        "To reduce costs",
        "To impress clients"
      ],
      correctAnswer: 1,
      explanation: "Safety is the primary reason for labelling circuits, allowing for quick identification and safe isolation."
    },
    {
      id: 2,
      question: "Which regulation requires circuits to be identifiable?",
      options: [
        "BS 5839",
        "BS 7671",
        "BS 6423",
        "BS 1362"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires all circuits to be identifiable."
    },
    {
      id: 3,
      question: "Name two places where labels are required.",
      options: [
        "Only on distribution boards",
        "Distribution boards and protective devices",
        "Only on isolators",
        "Only on cables"
      ],
      correctAnswer: 1,
      explanation: "Labels are required on distribution boards, protective devices, isolators, and cables (on larger projects)."
    },
    {
      id: 4,
      question: "What should be included in a distribution board schedule?",
      options: [
        "Only circuit numbers",
        "Circuit reference, description, device rating, RCD/RCBO protection",
        "Only device ratings",
        "Only descriptions"
      ],
      correctAnswer: 1,
      explanation: "A DB schedule must include circuit reference, load description, device rating, and RCD/RCBO protection details."
    },
    {
      id: 5,
      question: "True or False: Labelling is optional if the electrician remembers the circuits.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False — labelling is a regulatory requirement regardless of personal knowledge."
    },
    {
      id: 6,
      question: "What type of labels are preferred for durability?",
      options: [
        "Handwritten labels",
        "Printed labels",
        "Pencil markings",
        "Temporary stickers"
      ],
      correctAnswer: 1,
      explanation: "Printed labels are preferred as they are more durable and legible than handwritten alternatives."
    },
    {
      id: 7,
      question: "What risk is created by poor labelling?",
      options: [
        "Increased costs",
        "Isolating the wrong circuit and creating safety hazards",
        "Longer installation time",
        "Client complaints"
      ],
      correctAnswer: 1,
      explanation: "Poor labelling can lead to isolating the wrong circuit, creating serious safety hazards."
    },
    {
      id: 8,
      question: "Who is responsible for updating circuit labels after changes?",
      options: [
        "The client",
        "The electrician carrying out the work",
        "The inspector",
        "The building owner"
      ],
      correctAnswer: 1,
      explanation: "The electrician performing modifications must update all relevant labelling immediately."
    },
    {
      id: 9,
      question: "Where should the circuit schedule be fixed?",
      options: [
        "In the office files only",
        "Inside or adjacent to the distribution board",
        "On the wall nearby",
        "In the client handbook"
      ],
      correctAnswer: 1,
      explanation: "The circuit schedule must be fixed inside or adjacent to the distribution board for easy reference."
    },
    {
      id: 10,
      question: "In the real-world example, what happened due to poor labelling?",
      options: [
        "Power was lost to the whole building",
        "Emergency lighting was isolated by mistake, creating a safety risk",
        "The fire alarm stopped working",
        "All circuits were damaged"
      ],
      correctAnswer: 1,
      explanation: "Emergency lighting was accidentally isolated instead of classroom lighting, creating a safety risk during evacuation drills."
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
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.2.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Confirming Circuit Labelling and Identification
          </h1>
          <p className="text-white">
            BS 7671 labelling and identification requirements for DBs, devices, and isolation
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
                <li>Label presence: all circuits, devices, and isolators labelled</li>
                <li>Legibility: clear, durable, professional appearance</li>
                <li>Accuracy: labels match DB schedule and actual circuits</li>
                <li>RCD/RCBO reference: protection type clearly indicated</li>
                <li>Device rating: MCB/fuse ratings shown on labels</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing labels, illegible text, outdated information, handwritten temporary labels</li>
                <li><strong>Use:</strong> Printed, durable labels; cross-check to DB schedule; tag isolators</li>
                <li><strong>Check:</strong> DB schedule inside/adjacent to board; update after alterations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Clear and accurate labelling of circuits is vital for safety, compliance, and efficiency. Labels allow electricians, inspectors, and end users to quickly identify which circuits control which areas or equipment. Poor or missing labels can cause confusion, wasted time, and dangerous mistakes such as isolating the wrong circuit.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain why circuit labelling and identification are important.</li>
            <li>Recognise what information should appear on labels.</li>
            <li>Identify where labels should be fixed according to BS 7671.</li>
            <li>Inspect and confirm that all circuits are correctly labelled.</li>
            <li>Understand the risks of poor labelling and missing identification.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Why Labelling Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Why Labelling Matters</h3>
            <p className="text-base text-white mb-4">
              Circuit labelling serves multiple critical functions beyond basic compliance, forming the foundation for safe electrical operation and maintenance.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Safety and Compliance Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Ensures circuits can be quickly identified and safely isolated</li>
                          <li>Prevents accidental energisation during maintenance work</li>
                          <li>Enables rapid emergency isolation when required</li>
                          <li>Reduces shock risks from working on wrong circuits</li>
                          <li>Facilitates proper lock-out/tag-out procedures</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Regulatory Compliance:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>BS 7671 requires all circuits to be identifiable</li>
                          <li>Supports inspection and testing requirements</li>
                          <li>Essential for electrical installation certificates</li>
                          <li>Required for insurance and building regulations</li>
                          <li>Demonstrates professional installation standards</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Operational Efficiency:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Saves time when carrying out fault finding and testing</li>
                          <li>Enables quick circuit identification during maintenance</li>
                          <li>Allows building occupants to understand their electrical system</li>
                          <li>Reduces call-out costs for electrical contractors</li>
                          <li>Supports planned maintenance schedules</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Safety Critical</p>
                        <p className="text-xs sm:text-sm text-white">
                          Poor labelling is a contributing factor in many electrical accidents. Clear identification is not optional—it's a life-safety requirement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="labelling-importance-check"
            question="Why must all circuits be labelled?"
            options={["To look professional", "For safety - quick identification and isolation", "To reduce costs", "Client preference"]}
            correctIndex={1}
            explanation="Circuit labelling is essential for safety, enabling quick identification and safe isolation of circuits."
          />
          <Separator className="my-6" />

          {/* 2. What Labels Should Include */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. What Labels Should Include</h3>
            <p className="text-base text-white mb-4">
              Effective labels must contain sufficient information to unambiguously identify circuits and their characteristics for safe operation.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Essential Label Information</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Circuit Identification:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Circuit number or reference (e.g., C1, L1, R1)</li>
                          <li>Clear description of load/area served</li>
                          <li>Examples: "Lighting – Office 1," "Ring Final – Kitchen"</li>
                          <li>Sub-main distribution identification where applicable</li>
                          <li>Emergency lighting circuits clearly distinguished</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Protection Device Details:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Protective device rating and type (e.g., "B32 MCB")</li>
                          <li>RCD/RCBO protection where applicable (e.g., "30mA RCD")</li>
                          <li>Time delay characteristics if relevant</li>
                          <li>Discrimination requirements for selectivity</li>
                          <li>Arc fault protection where fitted</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Additional Information:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Maximum demand or designed current where relevant</li>
                          <li>Cable type and size for critical circuits</li>
                          <li>Installation method or routing information</li>
                          <li>Special operating conditions or restrictions</li>
                          <li>Maintenance or testing schedules for critical systems</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Best Practice</p>
                        <p className="text-xs sm:text-sm text-white">
                          Use consistent naming conventions throughout the installation. Avoid abbreviations that may not be understood by others.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="label-content-check"
            question="What should a label on an MCB include?"
            options={["Just the circuit number", "Device rating, type, circuit description, and RCD protection", "Only the area served", "Manufacturer information"]}
            correctIndex={1}
            explanation="MCB labels should include device rating and type, circuit description, and RCD/RCBO protection details."
          />
          <Separator className="my-6" />

          {/* 3. Where Labelling is Required */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Where Labelling is Required</h3>
            <p className="text-base text-white mb-4">
              BS 7671 specifies locations where labelling is mandatory to ensure comprehensive circuit identification throughout electrical installations.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Mandatory Labelling Locations</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Distribution Boards (DBs):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Each circuit must be listed on a chart or schedule</li>
                          <li>Schedule fixed inside or adjacent to the DB</li>
                          <li>Laminated or weather-resistant in damp locations</li>
                          <li>Updated immediately after any circuit modifications</li>
                          <li>Include main switch rating and supply arrangements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Protective Devices:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>MCBs, RCDs, and RCBOs must be individually labelled</li>
                          <li>Labels applied directly to or adjacent to devices</li>
                          <li>Fuse carriers and switch-fuses clearly identified</li>
                          <li>Emergency lighting and fire alarm circuits prominently marked</li>
                          <li>Special systems (IT, PELV) clearly distinguished</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Isolators and Switches:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Must show the equipment or circuit they isolate</li>
                          <li>Local isolators at machinery and equipment</li>
                          <li>Emergency stop controls clearly marked</li>
                          <li>Maintenance switches and changeover devices</li>
                          <li>Functional earthing switches where applicable</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Cables (Larger Projects):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Tags or markers identifying circuit and function</li>
                          <li>Cable routes through multiple areas or buildings</li>
                          <li>Junction boxes and connection points</li>
                          <li>Cable entries to equipment and panels</li>
                          <li>Underground cable route markers where required</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Compliance Note</p>
                        <p className="text-xs sm:text-sm text-white">
                          The schedule or chart required by BS 7671 must be durable and clearly visible. Temporary or handwritten schedules should be replaced with permanent versions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="label-location-check"
            question="Where should the circuit schedule be displayed?"
            options={["In a filing cabinet", "Inside or adjacent to the distribution board", "On the office wall", "In the client manual only"]}
            correctIndex={1}
            explanation="The circuit schedule must be fixed inside or adjacent to the distribution board for immediate reference."
          />
          <Separator className="my-6" />

          {/* 4. Risks of Poor or Missing Labelling */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Risks of Poor or Missing Labelling</h3>
            <p className="text-base text-white mb-4">
              Inadequate labelling creates multiple safety, compliance, and operational risks that can have serious consequences for installation safety and reliability.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Serious Consequences of Poor Labelling</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety Hazards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Isolating the wrong circuit → shock, fire, or damage to equipment</li>
                          <li>Working on live circuits due to misidentification</li>
                          <li>Inadequate isolation during maintenance work</li>
                          <li>Emergency services unable to safely isolate supplies</li>
                          <li>Confusion during emergency evacuations</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Operational Problems:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Wasted time when fault-finding or testing</li>
                          <li>Increased labour costs for electrical work</li>
                          <li>Equipment damage from incorrect isolation</li>
                          <li>Production downtime in commercial installations</li>
                          <li>Inability to perform selective maintenance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Compliance Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Failed compliance inspections and testing</li>
                          <li>Insurance claims potentially invalidated</li>
                          <li>Non-compliance with building regulations</li>
                          <li>Professional liability for electrical contractors</li>
                          <li>Delayed project handovers and certifications</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Future Maintenance Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Safety risks for future electricians and users</li>
                          <li>Difficulty performing routine maintenance safely</li>
                          <li>Problems during installation modifications or extensions</li>
                          <li>Challenges for building services coordination</li>
                          <li>Increased risk of cross-service interference</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Critical Warning</p>
                        <p className="text-xs sm:text-sm text-white">
                          Poor labelling has been identified as a contributing factor in electrical accidents. The consequences can include serious injury, death, and legal liability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="labelling-risks-check"
            question="What risk is created by poor labelling?"
            options={["Higher electricity bills", "Isolating the wrong circuit and creating safety hazards", "Reduced equipment life", "Poor appearance"]}
            correctIndex={1}
            explanation="Poor labelling can lead to isolating the wrong circuit, potentially causing shock, fire, or equipment damage."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-3">Installation Process</h3>
              <ul className="list-disc pl-6 space-y-2 text-base text-white">
                <li>Always cross-check labels with test results and schedules</li>
                <li>Use durable, legible labels resistant to heat and wear</li>
                <li>Update labels immediately after alterations or additions</li>
                <li>Ensure distribution board schedules are accurate and fixed securely inside or next to the DB</li>
                <li>Never hand over an installation without full circuit identification</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium text-yellow-700 dark:text-elec-yellow mb-3">Tools & Techniques</h4>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li><strong>Label Printers:</strong> Professional thermal or laser printers for consistent, durable labels</li>
                <li><strong>Engraved/Laminated Tags:</strong> For harsh environments or permanent installations</li>
                <li><strong>Heat-Resistant Markers:</strong> For temporary marking during installation</li>
                <li><strong>Cable Identification:</strong> Heat-shrink sleeves, tie-on tags, or printed cable markers</li>
                <li><strong>Digital Tools:</strong> Smartphone apps for generating and printing professional labels</li>
              </ul>
            </div>

            <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-700 dark:text-elec-yellow mb-3">Maintenance & Updates</h4>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li><strong>Regular Checks:</strong> Verify label legibility during routine inspections</li>
                <li><strong>Standard Conventions:</strong> Maintain consistent naming throughout the installation</li>
                <li><strong>Documentation:</strong> Keep digital copies of all schedules and labelling schemes</li>
                <li><strong>Handover Packs:</strong> Provide clients with spare labels and updating procedures</li>
                <li><strong>Modification Records:</strong> Document all labelling changes in installation records</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Real-World Example</h2>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded border border-orange-200 dark:border-orange-800">
            <p className="text-base text-white mb-4">
              <strong>School Emergency Lighting Incident:</strong>
            </p>
            <p className="text-base text-white mb-4">
              During routine maintenance in a school, an electrician attempted to isolate the lighting in a classroom. Due to poor labelling, they accidentally isolated the emergency lighting circuit instead. This left an area of the building without safety lighting during evacuation drills.
            </p>
            <p className="text-base text-white mb-4">
              The emergency lighting remained off for several hours before the error was discovered, creating a serious safety risk. The incident was only identified when the fire marshal arrived for a planned evacuation exercise.
            </p>
            <p className="text-base text-white">
              <strong>Outcome:</strong> Accurate labelling would have prevented this dangerous situation. The incident required a full review of the electrical installation and led to a comprehensive re-labelling programme throughout the school.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-2">Q: Can handwritten labels be used?</h3>
              <p className="text-base text-white">
                A: Yes, if they are legible and durable, but printed labels are preferred for professionalism and longevity.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: Who is responsible for updating labels after modifications?</h3>
              <p className="text-base text-white">
                A: The electrician carrying out the work must update all relevant labelling immediately upon completion.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: Do clients need to understand circuit labelling?</h3>
              <p className="text-base text-white">
                A: Yes, labelling should be clear enough for non-technical users to follow for basic isolation requirements.
              </p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Pocket Guide – Labelling Essentials</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              <span className="text-base text-white">Label all circuits, breakers, and isolators</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              <span className="text-base text-white">Use clear descriptions (e.g., "Sockets – Office")</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              <span className="text-base text-white">Include device ratings and RCD protection details</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              <span className="text-base text-white">Fix a circuit schedule inside each DB</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
              <span className="text-base text-white">Keep labels updated after alterations</span>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Recap</h2>
          <p className="text-base text-white mb-6">
            In this subsection, you learned the importance of confirming circuit labelling and identification. You now understand what information labels should include, where they must be fixed, and how they improve safety, compliance, and efficiency.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-emerald-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-elec-yellow dark:text-elec-yellow" />
                <h3 className="font-medium text-blue-700 dark:text-elec-yellow">Safety & Isolation</h3>
              </div>
              <p className="text-xs sm:text-sm text-white">
                Proper labelling enables quick circuit identification and safe isolation, preventing dangerous mistakes during maintenance.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-purple-600 dark:text-elec-yellow" />
                <h3 className="font-medium text-purple-700 dark:text-elec-yellow">Information Completeness</h3>
              </div>
              <p className="text-xs sm:text-sm text-white">
                Labels must include circuit reference, load description, device ratings, and RCD/RCBO protection details.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-medium text-green-700 dark:text-green-400">Location Requirements</h3>
              </div>
              <p className="text-xs sm:text-sm text-white">
                Labels required on DBs, protective devices, isolators, and cables. Schedules must be fixed inside or adjacent to DBs.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-elec-yellow" />
                <h3 className="font-medium text-orange-700 dark:text-elec-yellow">Maintenance & Updates</h3>
              </div>
              <p className="text-xs sm:text-sm text-white">
                Labels must be updated immediately after any modifications. Use durable materials and consistent naming conventions.
              </p>
            </div>
            
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center gap-3 mb-3">
                <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-medium text-indigo-700 dark:text-indigo-400">Compliance & Records</h3>
              </div>
              <p className="text-xs sm:text-sm text-white">
                BS 7671 requires all circuits to be identifiable. Poor labelling creates safety risks and compliance failures.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline" asChild>
            <Link to="../2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Terminations & Polarity
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

export default Module6Section2_5;