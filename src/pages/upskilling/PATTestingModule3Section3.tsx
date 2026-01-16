import { ArrowLeft, Thermometer, CheckCircle, Eye, HelpCircle, Lightbulb, AlertTriangle, Bookmark, ChevronRight, ChevronLeft, Flame, Shield, Ban, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Signs of Overheating or Modification - PAT Testing Course";
const DESCRIPTION = "Learn to identify visual signs of overheating, thermal damage, and unauthorized modifications during PAT testing visual inspection.";

const quickCheckQuestions = [
  {
    id: "m3s3-qc1",
    question: "What does brown or yellow discolouration on a white plug typically indicate?",
    options: [
      "The plug is very old",
      "UV damage from sunlight",
      "Previous overheating at that location",
      "Manufacturing defect"
    ],
    correctIndex: 2,
    explanation: "Brown or yellow discolouration on white plastic typically indicates previous overheating. Heat causes plastic to degrade and change colour, often concentrated around terminals or the fuse carrier where loose connections or overloaded circuits generate excess heat."
  },
  {
    id: "m3s3-qc2",
    question: "Which modification is acceptable on a portable appliance?",
    options: [
      "A longer cable fitted by a qualified person",
      "Additional ventilation holes drilled in the casing",
      "Safety guards removed for easier access",
      "Both A and B are acceptable"
    ],
    correctIndex: 0,
    explanation: "A longer cable properly fitted by a qualified person can be acceptable if done correctly with appropriate cable. However, drilling holes, removing guards, or other modifications that affect the appliance's safety design are not acceptable and would result in a fail."
  },
  {
    id: "m3s3-qc3",
    question: "What should you do if you find a missing safety interlock on an appliance?",
    options: [
      "Pass it if the appliance still functions",
      "Note it but pass if other safety features work",
      "Fail the appliance - it's a serious safety defect",
      "Replace it yourself during the test"
    ],
    correctIndex: 2,
    explanation: "A missing safety interlock is a serious defect that must result in failure. Interlocks prevent access to dangerous parts while energised - their absence could allow contact with live parts or moving components. The appliance must be repaired by a competent person before use."
  }
];

const quizQuestions = [
  {
    question: "What is the most common cause of overheating at a plug terminal?",
    options: [
      "The plug being too old",
      "A loose connection causing arcing",
      "Using the appliance outdoors",
      "The cable being too long"
    ],
    correctAnswer: 1
  },
  {
    question: "Signs of thermal damage on a cable include:",
    options: [
      "The cable being slightly dusty",
      "Hardened, cracked, or discoloured sheath",
      "Minor surface scratches",
      "The cable being coiled when stored"
    ],
    correctAnswer: 1
  },
  {
    question: "An appliance has had ventilation slots covered with tape. What is the correct action?",
    options: [
      "Pass - it keeps dust out",
      "Remove the tape and pass",
      "Fail - blocked ventilation could cause overheating",
      "Only fail if the appliance feels warm"
    ],
    correctAnswer: 2
  },
  {
    question: "What does a burnt smell from an appliance indicate?",
    options: [
      "Normal operation for heating appliances",
      "The appliance needs cleaning",
      "Potential internal overheating or damage - investigate",
      "The fuse needs replacing"
    ],
    correctAnswer: 2
  },
  {
    question: "Which of these is an acceptable modification?",
    options: [
      "Replacing a damaged plug with a correct replacement",
      "Bypassing a thermal cut-out that keeps tripping",
      "Removing the earth pin from a Class I plug",
      "Taping over exposed wires"
    ],
    correctAnswer: 0
  },
  {
    question: "Melted plastic around a socket outlet connection point suggests:",
    options: [
      "The socket is too small",
      "Poor connection causing arcing and heat buildup",
      "Normal wear and tear",
      "The appliance is too powerful"
    ],
    correctAnswer: 1
  },
  {
    question: "What should you check if plug pins show discolouration or pitting?",
    options: [
      "Nothing - this is normal with use",
      "The socket outlets being used",
      "Both the socket and any signs of arcing or overheating",
      "Only the fuse rating"
    ],
    correctAnswer: 2
  },
  {
    question: "An electric heater has had its thermal cut-out bridged with wire. What is the result?",
    options: [
      "Pass - it will work better now",
      "Pass if no other faults found",
      "Immediate fail - critical safety device bypassed",
      "Refer to manufacturer only"
    ],
    correctAnswer: 2
  },
  {
    question: "Which is NOT a sign of previous overheating?",
    options: [
      "Brown staining around terminals",
      "Bubbled or blistered plastic",
      "Light dust accumulation",
      "Charred or blackened areas"
    ],
    correctAnswer: 2
  },
  {
    question: "A user reports their kettle 'smells funny' when used. What should you do?",
    options: [
      "Tell them it's normal for kettles",
      "Clean the kettle and pass it",
      "Investigate for signs of overheating or insulation breakdown",
      "Replace the fuse and pass"
    ],
    correctAnswer: 2
  }
];

const faqs = [
  {
    q: "How can I tell the difference between age-related discolouration and heat damage?",
    a: "Heat damage is usually localised to specific areas - around terminals, fuse carriers, or connection points. It often appears as brown/yellow staining with distinct edges. Age-related yellowing tends to be uniform across the whole item and is caused by UV exposure. Heat damage may also show physical changes like bubbling, warping, or brittleness in the affected area."
  },
  {
    q: "What if an appliance has been modified but appears to work safely?",
    a: "Any modification that affects the original safety design should result in a fail, regardless of whether it 'appears' to work. Modifications may affect protection in ways not visible during inspection - for example, additional holes may compromise IP rating or insulation. Only properly documented repairs by competent persons using correct parts should be accepted."
  },
  {
    q: "Should I open appliances to check for internal overheating signs?",
    a: "Standard PAT testing doesn't require opening appliance casings, and doing so may void warranties or damage seals. However, if external signs suggest internal problems (smell, visible damage, performance issues reported by users), the appliance should be failed and referred for inspection by someone competent to open and repair it."
  },
  {
    q: "Can slight warmth during operation indicate a problem?",
    a: "Some warmth is normal for many appliances, especially those with transformers, motors, or heating elements. Concern arises when heat is excessive, localised to unexpected areas (especially connections), or the appliance becomes too hot to touch comfortably. Compare to similar appliances or manufacturer specifications if unsure."
  },
  {
    q: "What about appliances with burnt-out fuses found during testing?",
    a: "A blown fuse itself isn't necessarily a fail - fuses do their job by blowing when needed. However, investigate why it blew: check for signs of overheating, correct fuse rating, and appliance condition. If there's evidence of repeated blowing, overheating, or underlying faults, fail the appliance for investigation."
  },
  {
    q: "How do I handle user modifications to IT equipment?",
    a: "IT equipment commonly has user modifications (RAM upgrades, hard drive replacements) which are generally acceptable if done properly. However, modifications to power supply units, cases that affect cooling, or removal of safety covers should result in a fail. Focus on whether the modification affects electrical safety rather than general functionality."
  }
];

const PATTestingModule3Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/70 hover:text-elec-yellow hover:bg-white/5 -ml-2 touch-manipulation active:scale-95 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Module 3</span>
            </Button>
          </Link>
          <span className="text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full">
            Section 3 of 5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-elec-yellow mb-3">
            <Thermometer className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Signs of Overheating or Modification
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Detecting thermal damage and unauthorized changes
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">In 30 Seconds</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Look for discolouration, melted plastic, burn marks, and unusual smells. Check for missing covers, bypassed safety devices, and DIY modifications.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Spot It / Use It</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Brown staining = past overheating. Missing guards = immediate fail. Bridged safety devices = critical failure. Always investigate unusual smells.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Recognise signs of previous overheating",
              "Identify thermal damage to components",
              "Spot unauthorized modifications",
              "Assess missing or bypassed safety devices",
              "Evaluate improvised repairs",
              "Make appropriate pass/fail decisions"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Overheating Indicators */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Recognising Overheating Signs</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Overheating is one of the primary causes of electrical fires. Learning to spot the early warning signs can prevent serious incidents.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                Visual Signs of Overheating
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-sm mb-2">Severe (Immediate Fail)</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Charring or blackening of components</li>
                    <li>• Melted or deformed plastic</li>
                    <li>• Visible burn marks or fire damage</li>
                    <li>• Bubbling or blistering of surfaces</li>
                    <li>• Evidence of arcing (pitting, carbon tracks)</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <h4 className="text-amber-400 font-semibold text-sm mb-2">Warning Signs (Investigate Further)</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Brown or yellow discolouration on white plastics</li>
                    <li>• Localized colour changes around terminals</li>
                    <li>• Hardened or brittle cable near heat sources</li>
                    <li>• Unusual smell (burning, electrical, plastic)</li>
                    <li>• Excessive warmth during normal operation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common Overheating Locations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Plug Terminals</p>
                  <p className="text-white/60 text-xs">Loose connections cause arcing and heat</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Fuse Carrier</p>
                  <p className="text-white/60 text-xs">Poor fuse contact generates heat</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Cable Entry Points</p>
                  <p className="text-white/60 text-xs">Internal conductor damage creates resistance</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium text-sm">Appliance Connections</p>
                  <p className="text-white/60 text-xs">Terminal blocks and internal wiring</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">What Causes Overheating?</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">1.</span>
                  <div>
                    <p className="text-white font-medium">Loose Connections</p>
                    <p className="text-white/60">High resistance at poor contacts generates heat. The most common cause.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">2.</span>
                  <div>
                    <p className="text-white font-medium">Overloading</p>
                    <p className="text-white/60">Drawing more current than components are rated for.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">3.</span>
                  <div>
                    <p className="text-white font-medium">Damaged Conductors</p>
                    <p className="text-white/60">Broken strands reduce conductor area, increasing resistance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">4.</span>
                  <div>
                    <p className="text-white font-medium">Blocked Ventilation</p>
                    <p className="text-white/60">Heat cannot escape, leading to thermal buildup.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">5.</span>
                  <div>
                    <p className="text-white font-medium">Arcing</p>
                    <p className="text-white/60">Electrical discharge across gaps generates intense localized heat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Thermal Damage Assessment */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Thermal Damage Assessment</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Different materials show thermal damage in different ways. Understanding these signs helps you assess the severity of past overheating events.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Plastic and Insulation Damage</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Discolouration</p>
                  <p className="text-white/60 text-sm">White plastics turn yellow/brown. Usually indicates temperatures above 60-80°C sustained over time.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Softening/Deformation</p>
                  <p className="text-white/60 text-sm">PVC softens around 80°C, deforms permanently. Indicates serious overheating event.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Bubbling/Blistering</p>
                  <p className="text-white/60 text-sm">Gas release from decomposing plastic. Indicates temperatures over 150°C.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Brittleness/Cracking</p>
                  <p className="text-white/60 text-sm">Repeated heating cycles damage plastic structure. May crumble when touched.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Charring</p>
                  <p className="text-white/60 text-sm">Black carbonised material. Indicates sustained temperatures over 300°C - fire risk.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Metal Component Damage</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Discolouration (Heat Tint)</p>
                  <p className="text-white/60 text-sm">Copper turns from bright to dull brown/black with oxidation. Brass may show rainbow colours.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Pitting</p>
                  <p className="text-white/60 text-sm">Small craters from arcing. Often seen on plug pins and socket contacts.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Welding/Fusion</p>
                  <p className="text-white/60 text-sm">Components stuck together from melting. Indicates very high temperatures from arcing.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Cable-Specific Heat Damage</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Hardened sheath</strong> - Loss of flexibility indicates heat degradation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Cracked insulation</strong> - Often seen near appliance entry where heat builds up</span>
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Fused conductors</strong> - Strands melted together from internal arcing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Sticky or tacky sheath</strong> - Plasticizers migrating out due to heat</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Unauthorized Modifications */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Identifying Unauthorized Modifications</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Modifications to appliances can compromise their safety design. Some changes are acceptable; many are not.
            </p>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <Ban className="w-4 h-4" />
                Unacceptable Modifications (Immediate Fail)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <div>
                    <p className="text-white font-medium">Bypassed Safety Devices</p>
                    <p className="text-white/60 text-sm">Thermal cut-outs, pressure switches, or interlocks bridged or removed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">2.</span>
                  <div>
                    <p className="text-white font-medium">Removed Guards or Covers</p>
                    <p className="text-white/60 text-sm">Safety covers, finger guards, or protective shields missing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">3.</span>
                  <div>
                    <p className="text-white font-medium">Additional Holes or Openings</p>
                    <p className="text-white/60 text-sm">Holes drilled for cables, ventilation, or access compromise IP rating and insulation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">4.</span>
                  <div>
                    <p className="text-white font-medium">Non-Original Components</p>
                    <p className="text-white/60 text-sm">Incorrect replacement parts that affect safety (wrong rating, size, type)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">5. </span>
                  <div>
                    <p className="text-white font-medium">Disabled Earth Connection</p>
                    <p className="text-white/60 text-sm">Earth conductor cut, disconnected, or removed from Class I appliances</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">6.</span>
                  <div>
                    <p className="text-white font-medium">Blocked Ventilation</p>
                    <p className="text-white/60 text-sm">Vents covered with tape, labels, or other materials</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Potentially Acceptable Modifications
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong className="text-white">Replacement plug</strong> - If correct type and properly wired</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong className="text-white">Replacement cable</strong> - If correct specification and properly fitted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong className="text-white">User-serviceable parts</strong> - Fuses, filters, bags as per manufacturer instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong className="text-white">IT equipment upgrades</strong> - RAM, drives if not affecting power/safety</span>
                </li>
              </ul>
              <p className="text-white/60 text-sm mt-3 italic">
                Note: Even acceptable modifications should be done by competent persons using correct components.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-elec-yellow" />
                Clues That Modifications Have Been Made
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Non-matching screws or fasteners</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Tool marks on case or components</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Broken or missing warranty seals</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Parts that don't match original specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Evidence of glue, tape, or improvised repairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Components newer than the appliance age suggests</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Missing Safety Features */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Missing or Bypassed Safety Features</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Safety devices are built into appliances for good reason. Any missing or bypassed safety feature is a serious concern.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common Safety Features to Check</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Thermal Cut-outs</p>
                  <p className="text-white/60 text-sm">Prevent overheating. Found in heaters, irons, kettles, hair dryers. Must operate freely - not bridged.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Interlocks</p>
                  <p className="text-white/60 text-sm">Prevent operation when guards removed. Common on food processors, shredders, washing machines.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Guards and Covers</p>
                  <p className="text-white/60 text-sm">Protect against contact with moving parts or live components. Must be present and secure.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Ventilation Grilles</p>
                  <p className="text-white/60 text-sm">Allow cooling airflow. Must not be blocked, damaged, or missing.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-medium">Pressure Relief Devices</p>
                  <p className="text-white/60 text-sm">Prevent dangerous pressure buildup. Found on steam appliances, pressure cookers.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">Signs of Bypassed Safety Devices</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Wires bridging across switch or thermostat terminals</li>
                    <li>• Interlock switches taped or held in the 'on' position</li>
                    <li>• Safety cut-out replaced with direct wire connection</li>
                    <li>• Thermal fuses removed or replaced with wire links</li>
                    <li>• Pressure relief valves blocked or sealed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Improvised Repairs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Recognising Improvised Repairs</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Improvised or temporary repairs are common but rarely safe. Learn to spot them and understand why they're problematic.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common Improvised Repairs (All = Fail)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Tape repairs</p>
                    <p className="text-white/60 text-sm">Electrical tape, insulating tape, duct tape, or any other tape covering damage or joints</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Wire wrapping</p>
                    <p className="text-white/60 text-sm">Bare wires twisted together without proper termination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Foil fuse bypass</p>
                    <p className="text-white/60 text-sm">Kitchen foil, wire, or other conductor wrapped around fuse</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Cable ties as strain relief</p>
                    <p className="text-white/60 text-sm">Cable ties used to hold damaged cables or replace proper grips</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Glued components</p>
                    <p className="text-white/60 text-sm">Hot glue, superglue, or adhesives holding electrical components</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Cardboard/paper insulation</p>
                    <p className="text-white/60 text-sm">Non-approved materials used as insulation or spacers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Why "Temporary" Repairs Are Dangerous</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Temporary repairs often become permanent. Tape deteriorates over time, especially with heat. Improvised materials aren't rated for electrical use. What seems like a 'quick fix' can lead to fires, electric shock, or equipment damage. There is no such thing as an acceptable temporary electrical repair.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Practical Guidance</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Overheating/Modification Checklist
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">1.</span>
                  <span>Check for discolouration around all connection points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <span>Look for melted, bubbled, or charred plastic anywhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">3.</span>
                  <span>Smell for burning or electrical odours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">4.</span>
                  <span>Verify all guards and covers are present and secure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">5.</span>
                  <span>Check ventilation is not blocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">6.</span>
                  <span>Look for signs of modification or improvised repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">7.</span>
                  <span>Check safety interlocks operate correctly</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Automatic Fail Conditions
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Any charring, burn marks, or fire damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Melted or significantly deformed components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Missing safety guards or interlocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Bypassed thermal or safety cut-outs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Any improvised repair (tape, foil, wire wrapping)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none touch-manipulation">
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-elec-yellow" />
              Quick Reference: Heat Damage Severity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>Normal:</strong> Uniform slight yellowing with age (UV), light dust</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded-lg">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>Investigate:</strong> Localised discolouration, slight warping, unusual smell</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded-lg">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>Fail:</strong> Charring, melting, burn marks, bubbling, arcing damage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 3 Quiz: Overheating and Modifications"
            questions={quizQuestions}
            moduleId="pat-m3s3"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Link to="../pat-testing-module-3-section-2" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Section 2</span>
            </Button>
          </Link>
          <Link to="../pat-testing-module-3-section-4" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Next: Section 4</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default PATTestingModule3Section3;
