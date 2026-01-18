import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Wrench, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Checking Fixings, Cable Routes, and Terminations - Module 4.6.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master the final inspection techniques for electrical installations. Learn to verify secure fixings, safe cable routes, and reliable terminations for BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the purpose of safe wiring zones?",
    options: ["To reduce cable costs", "To protect cables from accidental damage", "To improve electrical performance", "To meet aesthetic requirements"],
    correctIndex: 1,
    explanation: "Safe wiring zones protect cables from accidental damage during building work by defining specific areas where cables should be routed, such as vertically and horizontally from outlets."
  },
  {
    id: 2,
    question: "Name one tool that ensures terminations are tightened correctly.",
    options: ["Standard screwdriver", "Torque screwdriver", "Wire strippers", "Multimeter"],
    correctIndex: 1,
    explanation: "A torque screwdriver ensures terminal screws are tightened to the manufacturer's specified torque, preventing over-tightening that could damage conductors or under-tightening that creates loose connections."
  },
  {
    id: 3,
    question: "Why should multi-stranded conductors be fitted with ferrules?",
    options: ["To reduce cost", "To ensure secure connection and prevent strand breakage", "To improve conductivity", "To meet colour coding requirements"],
    correctIndex: 1,
    explanation: "Ferrules prevent individual strands of multi-stranded conductors from breaking or becoming loose in terminals, ensuring a secure and reliable electrical connection."
  }
];

const Module4Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation covers electrical connections in BS 7671?",
      options: ["522", "526", "421", "110"],
      correctAnswer: 1,
      explanation: "BS 7671 Regulation 526 covers electrical connections, specifying that they must be suitable for the conditions and secure throughout the expected lifetime of the installation."
    },
    {
      id: 2,
      question: "True or False: You can leave cables loosely supported if they will be hidden behind plaster.",
      options: ["True", "False", "Only for low voltage circuits", "Only temporarily during installation"],
      correctAnswer: 1,
      explanation: "False - all cables must be properly supported regardless of whether they're visible or hidden. Loose cables can cause damage, create hazards, and fail to meet BS 7671 requirements."
    },
    {
      id: 3,
      question: "Name two safe wiring zones.",
      options: ["Diagonal and curved paths", "Horizontal above switches/sockets, vertical from switches/sockets", "Random routing for shortest path", "Only vertical routes"],
      correctAnswer: 1,
      explanation: "Safe wiring zones include horizontal routes within 150mm of the top of the room and within 150mm of angles between walls, and vertical routes within 150mm either side of switches and sockets."
    },
    {
      id: 4,
      question: "What should be used when terminating multi-stranded conductors?",
      options: ["Wire nuts", "Ferrules", "Electrical tape", "Cable ties"],
      correctAnswer: 1,
      explanation: "Ferrules should be used when terminating multi-stranded conductors to prevent individual strands from breaking or becoming loose, ensuring a secure connection."
    },
    {
      id: 5,
      question: "Why is over-tightening terminal screws a problem?",
      options: ["It improves conductivity", "It can damage conductors and reduce connection integrity", "It makes maintenance easier", "It prevents corrosion"],
      correctAnswer: 1,
      explanation: "Over-tightening can damage conductors, strip threads, or crack terminals, all of which reduce connection integrity and can lead to loose connections over time."
    },
    {
      id: 6,
      question: "Which tool should be used to achieve manufacturer-specified torque?",
      options: ["Standard screwdriver", "Torque screwdriver", "Power drill", "Allen key"],
      correctAnswer: 1,
      explanation: "A torque screwdriver (or torque wrench) ensures terminal screws are tightened to the exact torque specified by the manufacturer, preventing damage from over-tightening."
    },
    {
      id: 7,
      question: "Name one protective measure for cables passing through metal enclosures.",
      options: ["Copper tape", "Grommet or sleeve", "Electrical tape", "Cable marker"],
      correctAnswer: 1,
      explanation: "Grommets or sleeves protect cable insulation from damage when passing through sharp metal edges of enclosures, preventing potential short circuits and electric shock hazards."
    },
    {
      id: 8,
      question: "Give one consequence of loose terminations.",
      options: ["Improved efficiency", "Overheating, arcing, potential fire hazard", "Better conductivity", "Reduced maintenance requirements"],
      correctAnswer: 1,
      explanation: "Loose terminations create high resistance connections that can cause overheating, arcing, and potentially fire hazards, as well as equipment failure and reduced system reliability."
    }
  ];

  const faqs = [
    {
      question: "Can I route cables diagonally if it's the shortest path?",
      answer: "No — cables must follow vertical or horizontal safe zones unless mechanically protected. Diagonal routing increases the risk of accidental damage during building work and doesn't comply with BS 7671 requirements for cable protection."
    },
    {
      question: "Is it acceptable to leave a small amount of copper visible outside the terminal?",
      answer: "No — exposed copper increases the risk of short circuits and should be avoided. All bare conductor should be contained within the terminal, with only the insulated portion visible outside."
    },
    {
      question: "Do I need to check fixings if the containment system feels solid?",
      answer: "Yes — visual and physical checks are essential, as internal fixings may still be loose or unsuitable. A system that feels solid on the surface may have individual fixing points that are compromised."
    },
    {
      question: "What spacing should be maintained for containment system supports?",
      answer: "Follow manufacturer guidance and BS 7671 requirements. Typical spacing is 1.5m for steel conduit, 1m for PVC conduit, and varies for trunking and cable tray depending on size and loading."
    },
    {
      question: "How do I verify that cable routes follow safe zones in finished installations?",
      answer: "Use cable detection equipment to trace routes, check installation drawings, and verify that visible cable entry/exit points align with safe zone requirements. Any deviations should be investigated and corrected."
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
              Back to Section 6
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Checking Fixings, Cable Routes, and Terminations
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the final inspection techniques to ensure all fixings are secure, cable routes follow safe zones, and terminations meet BS 7671 standards
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Final inspection ensures secure fixings, safe cable routes, and reliable terminations</li>
                  <li>Incorrect fixings or poor terminations can cause safety hazards and equipment damage</li>
                  <li>Compliance with BS 7671 requires systematic checking of all installation elements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Loose fixings, unsafe cable routes, faulty terminations</li>
                  <li><strong>Use:</strong> Torque screwdrivers, cable detectors, inspection procedures</li>
                  <li><strong>Check:</strong> Safe zones, secure connections, mechanical integrity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Verify that all fixings are secure and suitable for the mounting surface</li>
              <li>Check that cable routes comply with safe wiring zones</li>
              <li>Confirm that all terminations are correctly stripped, connected, and tightened</li>
              <li>Identify and rectify common faults with fixings and terminations</li>
              <li>Apply best practice for long-term reliability</li>
            </ul>
          </section>

          {/* Checking Fixings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Checking Fixings
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Secure fixings are essential for mechanical protection and long-term reliability of electrical installations.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-white mb-2">Fixing Selection and Suitability</p>
                <p className="text-sm mb-2"><strong>Surface compatibility:</strong> Ensure screws, clips, saddles, or brackets are appropriate for the mounting surface.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Masonry fixings: Use appropriate plugs or anchors for concrete/brick walls</li>
                  <li>Plasterboard fixings: Use cavity fixings or locate studs for heavy loads</li>
                  <li>Metal surface fixings: Use self-tapping screws or through-bolts as appropriate</li>
                  <li>Wooden fixings: Use wood screws of appropriate length and gauge</li>
                </ul>
                <p className="text-sm mb-2"><strong>Tightness verification:</strong> Fixings should be tight but not over-torqued to avoid damage.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Hand-tight plus quarter turn for most plastic fixings</li>
                  <li>Manufacturer's torque specifications for critical applications</li>
                  <li>Visual inspection for surface damage or distortion</li>
                  <li>No movement when gentle force is applied to installed components</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Containment support:</strong> Brackets and supports for conduit, trunking, and tray must follow manufacturer spacing guidance
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="safe-zones-check"
                question={quickCheckQuestions[0].question}
                options={quickCheckQuestions[0].options}
                correctIndex={quickCheckQuestions[0].correctIndex}
                explanation={quickCheckQuestions[0].explanation}
              />
            </div>
          </section>

          {/* Cable Route Verification */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Cable Route Verification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proper cable routing ensures protection from damage and compliance with Building Regulations.</p>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-white mb-2">Safe Wiring Zone Compliance</p>
                <p className="text-sm mb-2"><strong>Prescribed zones:</strong> Cables should follow pre-planned safe wiring zones as per Building Regulations Part P.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Horizontal zones: Within 150mm of room edges and junction of walls/ceiling</li>
                  <li>Vertical zones: Within 150mm either side of switches, sockets, and outlets</li>
                  <li>Mechanical protection required for cables outside these zones</li>
                  <li>No diagonal routing unless cables are mechanically protected</li>
                </ul>
                <p className="text-sm mb-2"><strong>Environmental considerations:</strong> Route cables away from hazards and maintain proper separation.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Avoid routing near heat sources unless cables are rated for high temperatures</li>
                  <li>Maintain adequate separation between mains and data/low-voltage cables</li>
                  <li>Protect cables from moisture, chemicals, and mechanical damage</li>
                  <li>Use grommets, sleeves, or conduit when passing through walls or floors</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Protection methods:</strong> Use appropriate barriers for cables passing through structural elements
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="termination-tools-check"
                question={quickCheckQuestions[1].question}
                options={quickCheckQuestions[1].options}
                correctIndex={quickCheckQuestions[1].correctIndex}
                explanation={quickCheckQuestions[1].explanation}
              />
            </div>
          </section>

          {/* Termination Checks */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Termination Checks
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proper terminations are critical for electrical safety and system reliability.</p>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <p className="font-semibold text-white mb-2">Termination Quality and Security</p>
                <p className="text-sm mb-2"><strong>Stripping and preparation:</strong> Cable ends should be stripped to the correct length with no exposed copper.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Strip length should match terminal requirements (typically 10-12mm)</li>
                  <li>No bare copper should be visible outside the terminal</li>
                  <li>Clean cuts with no nicked or damaged conductors</li>
                  <li>Remove any sharp edges or burrs from conductor ends</li>
                </ul>
                <p className="text-sm mb-2"><strong>Connection security:</strong> Conductors must be fully inserted and securely clamped.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Conductors fully inserted into terminals without gaps</li>
                  <li>Multi-stranded conductors terminated with ferrules where required</li>
                  <li>Terminal screws tightened to manufacturer specifications</li>
                  <li>Avoid over-tightening that could damage conductors or terminals</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Testing security:</strong> Gently tug cables at terminations to ensure they are secure
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="ferrules-check"
                question={quickCheckQuestions[2].question}
                options={quickCheckQuestions[2].options}
                correctIndex={quickCheckQuestions[2].correctIndex}
                explanation={quickCheckQuestions[2].explanation}
              />
            </div>
          </section>

          {/* Testing Mechanical Security */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Testing Mechanical Security
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Physical testing verifies the integrity of connections and fixings.</p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-white mb-2">Physical Testing Procedures</p>
                <p className="text-sm mb-2"><strong>Connection testing:</strong> Verify security without damaging components.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Gently tug cables at terminations to check security</li>
                  <li>Check terminal screws are tightened to correct torque if specified</li>
                  <li>Inspect connections for signs of overheating or arcing</li>
                  <li>Verify no movement in terminated conductors</li>
                </ul>
                <p className="text-sm mb-2"><strong>Visual inspection:</strong> Look for signs of damage or deterioration.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Check for discoloration indicating overheating</li>
                  <li>Look for arc marks or carbonisation around terminals</li>
                  <li>Inspect for cracked or damaged terminal blocks</li>
                  <li>Verify adequate clearances between live parts</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Documentation:</strong> Record any defects found and remedial actions taken
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-white/10">
                <p className="font-medium text-white mb-2">Essential Tools and Equipment</p>
                <p className="text-sm text-white/80 mb-2"><strong>Basic tools:</strong> Screwdrivers (slotted and Phillips), torque screwdriver, inspection torch, cable detector, measuring tape.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Testing equipment:</strong> Multimeter, insulation resistance tester, socket tester, continuity tester.</p>
                <p className="text-sm text-white/80"><strong>Installation materials:</strong> Cable ties, grommets, bushes, ferrules, cable markers, warning labels.</p>
              </div>

              <div className="p-4 rounded-lg border border-green-400/30 bg-green-500/5">
                <p className="font-medium text-white mb-2">Inspection Sequence</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li><strong>1. Visual inspection:</strong> Check all visible fixings, cable routes, and terminations before any testing</li>
                  <li><strong>2. Mechanical testing:</strong> Gently test fixing security and termination tightness</li>
                  <li><strong>3. Route verification:</strong> Use cable detector to confirm hidden cable paths follow safe zones</li>
                  <li><strong>4. Documentation:</strong> Record findings, defects, and remedial actions on inspection sheets</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-amber-400/30 bg-amber-500/5">
                <p className="font-medium text-white mb-2">Common Inspection Points</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li><strong>Consumer units:</strong> Check main switch, RCD, and MCB terminations. Verify all conductors are secure</li>
                  <li><strong>Socket outlets:</strong> Ensure back boxes are secure, terminals tight, and earth continuity maintained</li>
                  <li><strong>Light fittings:</strong> Check ceiling fixings can support weight, terminals secure, and earth connections made</li>
                  <li><strong>Junction boxes:</strong> Verify all connections are accessible, secure, and properly identified</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-world Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-white mb-2">Case Study 1: Hotel Refurbishment</p>
                <p className="text-sm text-white/80 mb-2"><strong>Problem:</strong> During final testing, several sockets failed the polarity test despite initial visual inspection appearing satisfactory.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Investigation:</strong> Detailed inspection revealed loose neutral connections in several socket outlets. The terminals appeared connected but weren't adequately tightened.</p>
                <p className="text-sm text-white/80"><strong>Lesson:</strong> Visual inspection alone isn't sufficient — physical testing of connections is essential, and time pressure never justifies shortcuts in safety procedures.</p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-semibold text-white mb-2">Case Study 2: Office Block Cable Damage</p>
                <p className="text-sm text-white/80 mb-2"><strong>Problem:</strong> Six months after completion, an office block experienced intermittent power failures.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Root cause:</strong> Cables had been routed diagonally to save time and materials, without mechanical protection. Later fit-out work damaged these hidden cables.</p>
                <p className="text-sm text-white/80"><strong>Lesson:</strong> Safe zone compliance isn't just a regulation — it's practical protection that prevents costly failures and safety hazards.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/80">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Summary & Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-white">Fixing Verification Essentials</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-white/80 list-disc pl-4">
                    <li><strong>Surface compatibility:</strong> Match fixing type to mounting surface</li>
                    <li><strong>Proper tightness:</strong> Hand-tight plus quarter turn for plastic fixings</li>
                    <li><strong>Support spacing:</strong> Follow manufacturer guidance</li>
                    <li><strong>Load verification:</strong> Ensure fixings can handle loads</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-elec-yellow" />
                    <h3 className="font-semibold text-white">Safe Wiring Zone Compliance</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-white/80 list-disc pl-4">
                    <li><strong>Horizontal zones:</strong> Within 150mm of ceiling and wall junctions</li>
                    <li><strong>Vertical zones:</strong> Within 150mm either side of switches/sockets</li>
                    <li><strong>No diagonal routing:</strong> Unless mechanically protected</li>
                    <li><strong>Protection methods:</strong> Grommets, sleeves, conduit for wall penetrations</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white">Termination Excellence</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-white/80">
                  <div>
                    <p className="font-medium mb-2">Conductor Preparation:</p>
                    <ul className="space-y-1 list-disc pl-4">
                      <li>Correct strip length</li>
                      <li>Clean, undamaged cores</li>
                      <li>Ferrules for multi-stranded</li>
                      <li>No exposed copper</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Connection Quality:</p>
                    <ul className="space-y-1 list-disc pl-4">
                      <li>Proper torque settings</li>
                      <li>Secure mechanical hold</li>
                      <li>Correct polarity</li>
                      <li>Adequate clearances</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Professional Tools:</p>
                    <ul className="space-y-1 list-disc pl-4">
                      <li>Torque screwdrivers</li>
                      <li>Ferrule crimps</li>
                      <li>Cable strippers</li>
                      <li>Inspection torches</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white">BS 7671 Compliance Requirements</h3>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p><strong>Regulation 526:</strong> All electrical connections must be suitable for conditions and secure throughout installation lifetime</p>
                  <p><strong>Chapter 52:</strong> Wiring systems must be selected and erected to avoid damage during expected service life</p>
                  <p><strong>Building Regulations Part P:</strong> Cable routes must follow prescribed safe zones unless mechanically protected</p>
                </div>
              </div>

              <div className="text-center p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
                <p className="text-white font-medium mb-2">
                  Remember: Every fixing, route, and termination you inspect contributes to the overall safety and reliability of the electrical installation.
                </p>
                <p className="text-sm text-white/80">
                  Systematic checking using proper tools and techniques ensures compliance, prevents failures, and protects both property and people.
                </p>
              </div>
            </div>
          </section>

          {/* Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} title="Checking Fixings, Cable Routes, and Terminations" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Insulation Resistance Testing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-5">
                Next: Identifying and Rectifying Defects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_4;
