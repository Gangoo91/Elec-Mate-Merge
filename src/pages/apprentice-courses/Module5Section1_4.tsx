import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Interpreting Floorplans and Circuit Layouts - Module 5.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to read electrical floorplans, circuit layouts, and cable routes. Master safe cable zones and accurate positioning for compliant electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What do floorplans show in electrical drawings?",
    options: ["Only the building structure", "Building layout with positions of electrical equipment", "Just the electrical circuits", "Cable sizes and ratings"],
    correctIndex: 1,
    explanation: "Floorplans show the building layout with the positions of all electrical equipment, accessories, and containment systems."
  },
  {
    id: 2,
    question: "Why should electrical layouts be cross-checked on-site?",
    options: ["It's not necessary", "Buildings may differ from drawings", "To waste time", "Because drawings are always wrong"],
    correctIndex: 1,
    explanation: "Buildings may differ slightly from drawings due to construction variations, making on-site verification essential for accurate installation."
  },
  {
    id: 3,
    question: "What is the risk of ignoring safe cable zones?",
    options: ["No risk at all", "Accidental damage and safety hazards", "Better cable runs", "Easier installation"],
    correctIndex: 1,
    explanation: "Ignoring safe cable zones increases the risk of accidental damage from drilling or fixing, creating safety hazards and potential failures."
  }
];

const Module5Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What do floorplans show in electrical drawings?",
      options: [
        "Only the building structure",
        "Building layout with positions of electrical equipment",
        "Just the electrical circuits",
        "Cable sizes and ratings"
      ],
      correctAnswer: 1,
      explanation: "Floorplans show the building layout with the positions of all electrical equipment, accessories, and containment systems."
    },
    {
      id: 2,
      question: "What do circuit layouts show?",
      options: [
        "Building structure only",
        "How accessories connect to distribution boards",
        "Cable colours",
        "Installation costs"
      ],
      correctAnswer: 1,
      explanation: "Circuit layouts show how electrical accessories and equipment connect back to distribution boards and how circuits are organised."
    },
    {
      id: 3,
      question: "What is often used to identify circuits?",
      options: [
        "Colours only",
        "Circuit numbers or codes",
        "Arrow directions",
        "Line thickness"
      ],
      correctAnswer: 1,
      explanation: "Circuit numbers or codes (like L1/01) are used to identify and track individual circuits throughout the installation."
    },
    {
      id: 4,
      question: "True or False: Cable routes can run anywhere if protected.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Cable routes must follow designated safe zones to reduce the risk of accidental damage and comply with BS 7671 regulations."
    },
    {
      id: 5,
      question: "Why should electrical layouts be cross-checked on-site?",
      options: [
        "It's not necessary",
        "Buildings may differ from drawings",
        "To waste time",
        "Because drawings are always wrong"
      ],
      correctAnswer: 1,
      explanation: "Buildings may differ slightly from drawings due to construction variations, making on-site verification essential for accurate installation."
    },
    {
      id: 6,
      question: "What do arrows on cable route drawings usually represent?",
      options: [
        "Wind direction",
        "Direction of cable runs",
        "North direction",
        "Traffic flow"
      ],
      correctAnswer: 1,
      explanation: "Arrows indicate the direction of cable runs and the routing path that cables should follow through the building."
    },
    {
      id: 7,
      question: "Who should confirm changes if the plan does not match the site?",
      options: [
        "Another apprentice",
        "The client directly",
        "The site supervisor",
        "Nobody, just improvise"
      ],
      correctAnswer: 2,
      explanation: "Always consult the site supervisor when there are discrepancies between drawings and actual site conditions."
    },
    {
      id: 8,
      question: "What is the risk of ignoring safe cable zones?",
      options: [
        "No risk at all",
        "Accidental damage and safety hazards",
        "Better cable runs",
        "Easier installation"
      ],
      correctAnswer: 1,
      explanation: "Ignoring safe cable zones increases the risk of accidental damage from drilling or fixing, creating safety hazards and potential failures."
    },
    {
      id: 9,
      question: "What must electricians do before transferring positions to site?",
      options: [
        "Start installing immediately",
        "Measure and check against the drawing",
        "Guess the positions",
        "Ask the client"
      ],
      correctAnswer: 1,
      explanation: "Always measure and check positions against the drawing to ensure accurate placement of electrical equipment and accessories."
    },
    {
      id: 10,
      question: "Which document might include cable sizes if not shown on the layout?",
      options: [
        "The building permit",
        "The specification",
        "The invoice",
        "The health and safety file"
      ],
      correctAnswer: 1,
      explanation: "The specification document typically contains detailed technical information like cable sizes, ratings, and installation methods when not shown on layout drawings."
    }
  ];

  const faqs = [
    {
      question: "How do I know if my measurements are accurate?",
      answer: "Always double-check measurements using the scale and given dimensions on the drawing. Use running dimensions where provided and verify critical positions with a supervisor."
    },
    {
      question: "What should I do if the building doesn't match the drawing?",
      answer: "Stop work immediately and consult your supervisor. Document the differences with photos and measurements, and obtain written approval before proceeding with any changes."
    },
    {
      question: "Are cable routes shown on all electrical drawings?",
      answer: "Not always. Some drawings show general routes while others provide detailed cable paths. Check if there are separate cable route drawings or containment layouts for your project."
    },
    {
      question: "How do I coordinate with other trades when setting out?",
      answer: "Attend coordination meetings, check for service clashes before installation, and communicate any positioning concerns early. Mark out your work clearly to avoid conflicts."
    },
    {
      question: "What if I find cables in areas not shown on the drawing?",
      answer: "Existing installations may not be shown on new work drawings. Always use cable detection equipment and treat any found cables as live until proven otherwise. Inform your supervisor immediately."
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
              Back to Section 5.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Interpreting Floorplans, Circuit Layouts, and Cable Routes
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the interpretation of building-integrated electrical drawings for accurate and safe installation work.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li>Electrical installations must integrate with building structures using floorplans.</li>
                  <li>Circuit layouts show equipment positions, cable routes, and connections.</li>
                  <li>Always follow safe cable zones and verify site conditions match drawings.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li><strong>Spot:</strong> Equipment positions, circuit numbers, cable routes, safe zones.</li>
                  <li><strong>Use:</strong> Measurements for positioning, circuit codes for identification.</li>
                  <li><strong>Check:</strong> Site conditions, other services, coordinate with trades.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Read and interpret electrical floorplans effectively.</li>
              <li>Understand circuit layouts and their numbering systems.</li>
              <li>Identify cable routes and containment pathways.</li>
              <li>Apply this knowledge to set out installations accurately on-site.</li>
            </ul>
          </section>

          {/* Understanding Floorplans */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Floorplans
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Building structure integration:</strong> Show how electrical equipment fits within the physical building</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Equipment locations:</strong> Precise positions of switches, sockets, lights, and distribution boards</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Containment runs:</strong> Routes for trunking, conduit, and cable management systems</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Architectural coordination:</strong> Integration with doors, windows, and structural elements</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-300 font-medium">
                  Floorplans are the bridge between electrical design and physical installation, showing exactly
                  where everything should be positioned within the building structure.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="floorplan-check"
            question="What do electrical floorplans show?"
            options={[
              "Only building structure",
              "Building structure with precise positions of electrical equipment",
              "Just cable specifications",
              "Only architectural features"
            ]}
            correctIndex={1}
            explanation="Floorplans show the building structure with precise positions of electrical equipment, accessories, and containment systems integrated with architectural features."
          />

          <div className="border-t border-white/10 my-8" />

          {/* Circuit Layouts and Numbering */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Circuit Layouts and Numbering
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3 mb-4">
                <p><strong className="text-white">Connection mapping:</strong> Shows how accessories connect back to distribution boards</p>
                <p><strong className="text-white">Circuit identification:</strong> Each circuit has unique numbers or codes (e.g., L1/01, L2/03)</p>
                <p><strong className="text-white">Load distribution:</strong> How electrical loads are balanced across circuits</p>
                <p><strong className="text-white">Protection coordination:</strong> Links to MCBs, RCDs, and other protective devices</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <h4 className="font-semibold text-white mb-2">Circuit Coding Examples:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>L1/01 - Lighting circuit 1</li>
                    <li>L2/02 - Lighting circuit 2</li>
                    <li>P1/03 - Power circuit 1</li>
                    <li>P2/04 - Power circuit 2</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <h4 className="font-semibold text-white mb-2">Layout Information:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Circuit routes and paths</li>
                    <li>Junction box locations</li>
                    <li>Switch drop positions</li>
                    <li>Cable core identification</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="circuit-identification-check"
            question="How are individual circuits typically identified on layout drawings?"
            options={[
              "By cable colour only",
              "Using circuit numbers or codes like L1/01",
              "By line thickness",
              "Random numbering"
            ]}
            correctIndex={1}
            explanation="Circuit numbers or codes like L1/01 for lighting circuits or P1/03 for power circuits allow clear tracking throughout the installation."
          />

          <div className="border-t border-white/10 my-8" />

          {/* Cable Routes and Safe Zones */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Cable Routes and Safe Zones
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Critical Safety Requirements
                </h4>
                <div className="space-y-2 text-sm">
                  <p>• Cable routes must follow designated safe zones</p>
                  <p>• Vertical and horizontal routes must comply with BS 7671</p>
                  <p>• Proper protection required outside safe zones</p>
                  <p>• Coordination with other services essential</p>
                </div>
              </div>

              <div className="space-y-3">
                <p><strong className="text-white">Route marking:</strong> Lines, arrows, or symbols show cable pathways</p>
                <p><strong className="text-white">Safe zone compliance:</strong> 150mm from corners, 50mm from ceiling/floor edges</p>
                <p><strong className="text-white">Containment integration:</strong> Routes through trunking, conduit, or cable trays</p>
                <p><strong className="text-white">Access considerations:</strong> Maintenance and future modifications</p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="text-elec-yellow font-medium mb-2">Spot it / Use it</p>
                <p className="text-sm text-white/80">
                  Always trace cable routes on drawings before starting installation. Look for arrows, routing
                  symbols, and containment indicators to understand the complete cable path.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-zones-check"
            question="Why must cable routes follow safe zones?"
            options={[
              "To make installation easier",
              "To reduce risk of damage and comply with BS 7671",
              "They don't need to follow safe zones",
              "For aesthetic reasons only"
            ]}
            correctIndex={1}
            explanation="Safe zones reduce the risk of accidental damage from drilling or fixing operations and ensure compliance with BS 7671 safety regulations."
          />

          <div className="border-t border-white/10 my-8" />

          {/* Practical Site Application */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Practical Site Application
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3 mb-4">
                <p><strong className="text-white">Position transfer:</strong> Use measurements to accurately locate equipment on-site</p>
                <p><strong className="text-white">Verification process:</strong> Check that building matches drawing dimensions</p>
                <p><strong className="text-white">Trade coordination:</strong> Confirm positions don't clash with other services</p>
                <p><strong className="text-white">Quality control:</strong> Mark out positions before fixing or cutting</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Setting Out Process:</h4>
                  <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li>Establish reference points</li>
                    <li>Take measurements from drawings</li>
                    <li>Mark positions temporarily</li>
                    <li>Verify with supervisor</li>
                    <li>Proceed with installation</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Common Checks:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Wall thickness variations</li>
                    <li>Structural beam positions</li>
                    <li>Service pipe locations</li>
                    <li>Door and window alignment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="site-conditions-check"
            question="What should be done if site conditions don't match the drawing?"
            options={[
              "Make changes immediately",
              "Ignore the differences",
              "Raise the issue with the site supervisor",
              "Guess what to do"
            ]}
            correctIndex={2}
            explanation="Always raise issues with the site supervisor or project manager before making any changes to ensure proper authorisation and documentation."
          />

          <div className="border-t border-white/10 my-8" />

          {/* Cross-Trade Coordination */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Cross-Trade Coordination
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3 mb-4">
                <p><strong className="text-white">Service integration:</strong> Coordinate with plumbing, HVAC, and data installations</p>
                <p><strong className="text-white">Structural awareness:</strong> Avoid drilling into load-bearing elements</p>
                <p><strong className="text-white">Access requirements:</strong> Ensure other trades can reach their equipment</p>
                <p><strong className="text-white">Installation sequence:</strong> Plan work order with other contractors</p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <h4 className="font-semibold text-white mb-2">Coordination Benefits:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Prevents costly clashes and rework</li>
                  <li>Ensures efficient use of space</li>
                  <li>Maintains project timelines</li>
                  <li>Improves overall installation quality</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="coordination-check"
            question="Why is coordination with other trades essential?"
            options={[
              "It's not really necessary",
              "To prevent clashes and ensure quality",
              "Only for large projects",
              "Just for final inspections"
            ]}
            correctIndex={1}
            explanation="Coordination prevents service clashes, ensures efficient space utilisation, maintains project timelines, and achieves high-quality integrated building services."
          />

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p className="font-medium text-white mb-2">Housing Development Safe Zone Violation</p>
                  <p className="text-sm mb-3">
                    In a new housing project, cables were run outside of designated safe zones shown in the drawings.
                    The installation appeared correct initially, but during second fix work, a joiner's drill bit hit
                    a hidden cable while installing kitchen units.
                  </p>

                  <div className="p-3 rounded-lg bg-amber-500/10 mb-3">
                    <p className="font-medium text-white mb-2 text-sm">Consequences:</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Complete circuit failure affecting multiple rooms</li>
                      <li>Emergency electrician call-out costs</li>
                      <li>Kitchen installation delays</li>
                      <li>Wall damage requiring redecoration</li>
                      <li>Potential safety hazard from damaged cable</li>
                    </ul>
                  </div>

                  <p className="text-sm font-medium text-white">
                    Total cost: £850 in repairs, delays, and remedial work. This could have been prevented by
                    following the safe zone routes clearly marked on the installation drawings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left min-h-[48px] touch-manipulation active:bg-white/5"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Always match drawings to site conditions</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Use safe zones for all cable routes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Follow circuit numbers carefully</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Coordinate with other trades</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Take accurate measurements before fixing</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mark positions temporarily first</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Confirm discrepancies with supervisor</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Document any agreed changes</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4">
              <p>In this subsection, you learned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>How to interpret floorplans, circuit layouts, and cable routes</li>
                <li>The critical role of safe zones in protecting cables</li>
                <li>The importance of accurate measurements and site verification</li>
                <li>Coordination requirements with other building trades</li>
                <li>Practical application techniques for setting out installations</li>
              </ul>
              <p className="mt-4 font-medium text-elec-yellow">
                Accurate interpretation of floorplans and layouts ensures safe, compliant, and well-coordinated electrical installations.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <div className="mb-10">
            <Quiz
              title="Floorplans and Circuit Layouts Quiz"
              questions={quizQuestions}
            />
          </div>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-5">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section1_4;
