import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What is the most common cause of overheating at a plug terminal?",
    options: ["The plug being too old", "A loose connection causing arcing", "Using the appliance outdoors", "The cable being too long"],
    correctAnswer: 1,
    explanation: "Loose connections cause high resistance which generates heat. This is the most common cause of overheating at terminals."
  },
  {
    id: 2,
    question: "Signs of thermal damage on a cable include:",
    options: ["The cable being slightly dusty", "Hardened, cracked, or discoloured sheath", "Minor surface scratches", "The cable being coiled when stored"],
    correctAnswer: 1,
    explanation: "Hardened, cracked, or discoloured cable sheath indicates heat damage."
  },
  {
    id: 3,
    question: "An appliance has had ventilation slots covered with tape. What is the correct action?",
    options: ["Pass - it keeps dust out", "Remove the tape and pass", "Fail - blocked ventilation could cause overheating", "Only fail if the appliance feels warm"],
    correctAnswer: 2,
    explanation: "Blocked ventilation is a modification that could cause dangerous overheating. The appliance should fail."
  },
  {
    id: 4,
    question: "What does a burnt smell from an appliance indicate?",
    options: ["Normal operation for heating appliances", "The appliance needs cleaning", "Potential internal overheating or damage - investigate", "The fuse needs replacing"],
    correctAnswer: 2,
    explanation: "A burnt smell requires investigation as it may indicate internal overheating or insulation damage."
  },
  {
    id: 5,
    question: "Which of these is an acceptable modification?",
    options: ["Replacing a damaged plug with a correct replacement", "Bypassing a thermal cut-out that keeps tripping", "Removing the earth pin from a Class I plug", "Taping over exposed wires"],
    correctAnswer: 0,
    explanation: "Replacing a damaged plug with the correct replacement is acceptable repair, not a problematic modification."
  },
  {
    id: 6,
    question: "Melted plastic around a socket outlet connection point suggests:",
    options: ["The socket is too small", "Poor connection causing arcing and heat buildup", "Normal wear and tear", "The appliance is too powerful"],
    correctAnswer: 1,
    explanation: "Melted plastic indicates significant heat from poor connections or arcing."
  },
  {
    id: 7,
    question: "What should you check if plug pins show discolouration or pitting?",
    options: ["Nothing - this is normal with use", "The socket outlets being used", "Both the socket and any signs of arcing or overheating", "Only the fuse rating"],
    correctAnswer: 2,
    explanation: "Discoloured or pitted pins require investigation of both the plug and the sockets being used."
  },
  {
    id: 8,
    question: "An electric heater has had its thermal cut-out bridged with wire. What is the result?",
    options: ["Pass - it will work better now", "Pass if no other faults found", "Immediate fail - critical safety device bypassed", "Refer to manufacturer only"],
    correctAnswer: 2,
    explanation: "Bypassing a thermal cut-out removes essential safety protection. This is an immediate fail."
  },
  {
    id: 9,
    question: "Which is NOT a sign of previous overheating?",
    options: ["Brown staining around terminals", "Bubbled or blistered plastic", "Light dust accumulation", "Charred or blackened areas"],
    correctAnswer: 2,
    explanation: "Light dust accumulation is normal. The other options all indicate heat damage."
  },
  {
    id: 10,
    question: "A user reports their kettle 'smells funny' when used. What should you do?",
    options: ["Tell them it's normal for kettles", "Clean the kettle and pass it", "Investigate for signs of overheating or insulation breakdown", "Replace the fuse and pass"],
    correctAnswer: 2,
    explanation: "Unusual smells require investigation for potential overheating or insulation problems."
  }
];

const faqs = [
  {
    question: "How can I tell the difference between age-related discolouration and heat damage?",
    answer: "Heat damage is usually localised to specific areas - around terminals, fuse carriers, or connection points. It often appears as brown/yellow staining with distinct edges. Age-related yellowing tends to be uniform across the whole item and is caused by UV exposure. Heat damage may also show physical changes like bubbling, warping, or brittleness in the affected area."
  },
  {
    question: "What if an appliance has been modified but appears to work safely?",
    answer: "Any modification that affects the original safety design should result in a fail, regardless of whether it 'appears' to work. Modifications may affect protection in ways not visible during inspection - for example, additional holes may compromise IP rating or insulation. Only properly documented repairs by competent persons using correct parts should be accepted."
  },
  {
    question: "Should I open appliances to check for internal overheating signs?",
    answer: "Standard PAT testing doesn't require opening appliance casings, and doing so may void warranties or damage seals. However, if external signs suggest internal problems (smell, visible damage, performance issues reported by users), the appliance should be failed and referred for inspection by someone competent to open and repair it."
  },
  {
    question: "Can slight warmth during operation indicate a problem?",
    answer: "Some warmth is normal for many appliances, especially those with transformers, motors, or heating elements. Concern arises when heat is excessive, localised to unexpected areas (especially connections), or the appliance becomes too hot to touch comfortably. Compare to similar appliances or manufacturer specifications if unsure."
  },
  {
    question: "What about appliances with burnt-out fuses found during testing?",
    answer: "A blown fuse itself isn't necessarily a fail - fuses do their job by blowing when needed. However, investigate why it blew: check for signs of overheating, correct fuse rating, and appliance condition. If there's evidence of repeated blowing, overheating, or underlying faults, fail the appliance for investigation."
  },
  {
    question: "How do I handle user modifications to IT equipment?",
    answer: "IT equipment commonly has user modifications (RAM upgrades, hard drive replacements) which are generally acceptable if done properly. However, modifications to power supply units, cases that affect cooling, or removal of safety covers should result in a fail. Focus on whether the modification affects electrical safety rather than general functionality."
  }
];

const PATTestingModule3Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signs of Overheating or Modification
          </h1>
          <p className="text-white/80">
            Detecting thermal damage and unauthorised changes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Overheating:</strong> Discolouration, melted plastic, burn marks</li>
              <li><strong>Causes:</strong> Loose connections, overloading, blocked vents</li>
              <li><strong>Modifications:</strong> Missing covers, bypassed safety devices</li>
              <li><strong>Action:</strong> Investigate unusual smells immediately</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Brown staining around terminals = past overheating</li>
              <li><strong>Spot:</strong> Missing guards = immediate fail</li>
              <li><strong>Spot:</strong> Bridged safety devices = critical failure</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Recognise signs of previous overheating",
              "Identify thermal damage to components",
              "Spot unauthorised modifications",
              "Assess missing or bypassed safety devices",
              "Evaluate improvised repairs",
              "Make appropriate pass/fail decisions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Recognising Overheating Signs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Recognising Overheating Signs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overheating is one of the primary causes of electrical fires. Learning to spot the early warning signs can prevent serious incidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Severe Signs (Immediate Fail):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Charring or blackening of components</li>
                <li>Melted or deformed plastic</li>
                <li>Visible burn marks or fire damage</li>
                <li>Bubbling or blistering of surfaces</li>
                <li>Evidence of arcing (pitting, carbon tracks)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Warning Signs (Investigate Further):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Brown or yellow discolouration on white plastics</li>
                <li>Localised colour changes around terminals</li>
                <li>Hardened or brittle cable near heat sources</li>
                <li>Unusual smell (burning, electrical, plastic)</li>
                <li>Excessive warmth during normal operation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Overheating Locations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plug terminals:</strong> Loose connections cause arcing and heat</li>
                <li><strong>Fuse carrier:</strong> Poor fuse contact generates heat</li>
                <li><strong>Cable entry points:</strong> Internal conductor damage creates resistance</li>
                <li><strong>Appliance connections:</strong> Terminal blocks and internal wiring</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What Causes Overheating?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Loose connections:</strong> High resistance at poor contacts generates heat (most common)</li>
                <li><strong>Overloading:</strong> Drawing more current than components are rated for</li>
                <li><strong>Damaged conductors:</strong> Broken strands reduce conductor area, increasing resistance</li>
                <li><strong>Blocked ventilation:</strong> Heat cannot escape, leading to thermal buildup</li>
                <li><strong>Arcing:</strong> Electrical discharge across gaps generates intense localised heat</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Thermal Damage Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thermal Damage Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different materials show thermal damage in different ways. Understanding these signs helps you assess the severity of past overheating events.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Plastic and Insulation Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Discolouration:</strong> White plastics turn yellow/brown. Indicates temperatures above 60-80°C sustained over time.</li>
                <li><strong>Softening/Deformation:</strong> PVC softens around 80°C, deforms permanently. Indicates serious overheating.</li>
                <li><strong>Bubbling/Blistering:</strong> Gas release from decomposing plastic. Indicates temperatures over 150°C.</li>
                <li><strong>Brittleness/Cracking:</strong> Repeated heating cycles damage plastic structure. May crumble when touched.</li>
                <li><strong>Charring:</strong> Black carbonised material. Indicates sustained temperatures over 300°C - fire risk.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Metal Component Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Discolouration (Heat Tint):</strong> Copper turns from bright to dull brown/black with oxidation. Brass may show rainbow colours.</li>
                <li><strong>Pitting:</strong> Small craters from arcing. Often seen on plug pins and socket contacts.</li>
                <li><strong>Welding/Fusion:</strong> Components stuck together from melting. Indicates very high temperatures from arcing.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable-Specific Heat Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hardened sheath:</strong> Loss of flexibility indicates heat degradation</li>
                <li><strong>Cracked insulation:</strong> Often seen near appliance entry where heat builds up</li>
                <li><strong>Fused conductors:</strong> Strands melted together from internal arcing</li>
                <li><strong>Sticky or tacky sheath:</strong> Plasticisers migrating out due to heat</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Identifying Unauthorised Modifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Identifying Unauthorised Modifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modifications to appliances can compromise their safety design. Some changes are acceptable; many are not.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Unacceptable Modifications (Immediate Fail):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bypassed safety devices:</strong> Thermal cut-outs, pressure switches, or interlocks bridged or removed</li>
                <li><strong>Removed guards or covers:</strong> Safety covers, finger guards, or protective shields missing</li>
                <li><strong>Additional holes or openings:</strong> Holes drilled for cables, ventilation, or access compromise IP rating and insulation</li>
                <li><strong>Non-original components:</strong> Incorrect replacement parts that affect safety (wrong rating, size, type)</li>
                <li><strong>Disabled earth connection:</strong> Earth conductor cut, disconnected, or removed from Class I appliances</li>
                <li><strong>Blocked ventilation:</strong> Vents covered with tape, labels, or other materials</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Potentially Acceptable Modifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Replacement plug:</strong> If correct type and properly wired</li>
                <li><strong>Replacement cable:</strong> If correct specification and properly fitted</li>
                <li><strong>User-serviceable parts:</strong> Fuses, filters, bags as per manufacturer instructions</li>
                <li><strong>IT equipment upgrades:</strong> RAM, drives if not affecting power/safety</li>
              </ul>
              <p className="text-sm text-white mt-2">Note: Even acceptable modifications should be done by competent persons using correct components.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Clues That Modifications Have Been Made:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Non-matching screws or fasteners</li>
                <li>Tool marks on case or components</li>
                <li>Broken or missing warranty seals</li>
                <li>Parts that don't match original specifications</li>
                <li>Evidence of glue, tape, or improvised repairs</li>
                <li>Components newer than the appliance age suggests</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Missing or Bypassed Safety Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Missing or Bypassed Safety Features
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety devices are built into appliances for good reason. Any missing or bypassed safety feature is a serious concern.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Safety Features to Check:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Thermal cut-outs:</strong> Prevent overheating. Found in heaters, irons, kettles, hair dryers. Must operate freely - not bridged.</li>
                <li><strong>Interlocks:</strong> Prevent operation when guards removed. Common on food processors, shredders, washing machines.</li>
                <li><strong>Guards and covers:</strong> Protect against contact with moving parts or live components. Must be present and secure.</li>
                <li><strong>Ventilation grilles:</strong> Allow cooling airflow. Must not be blocked, damaged, or missing.</li>
                <li><strong>Pressure relief devices:</strong> Prevent dangerous pressure buildup. Found on steam appliances, pressure cookers.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Signs of Bypassed Safety Devices:</strong> Wires bridging across switch or thermostat terminals, interlock switches taped or held in 'on' position, safety cut-out replaced with direct wire connection, thermal fuses removed or replaced with wire links, pressure relief valves blocked or sealed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Recognising Improvised Repairs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recognising Improvised Repairs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Improvised or temporary repairs are common but rarely safe. Learn to spot them and understand why they're problematic.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Improvised Repairs (All = Fail):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tape repairs:</strong> Electrical tape, insulating tape, duct tape, or any other tape covering damage or joints</li>
                <li><strong>Wire wrapping:</strong> Bare wires twisted together without proper termination</li>
                <li><strong>Foil fuse bypass:</strong> Kitchen foil, wire, or other conductor wrapped around fuse</li>
                <li><strong>Cable ties as strain relief:</strong> Cable ties used to hold damaged cables or replace proper grips</li>
                <li><strong>Glued components:</strong> Hot glue, superglue, or adhesives holding electrical components</li>
                <li><strong>Cardboard/paper insulation:</strong> Non-approved materials used as insulation or spacers</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Why "Temporary" Repairs Are Dangerous:</strong> Temporary repairs often become permanent. Tape deteriorates over time, especially with heat. Improvised materials aren't rated for electrical use. What seems like a 'quick fix' can lead to fires, electric shock, or equipment damage. There is no such thing as an acceptable temporary electrical repair.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Overheating/Modification Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Check for discolouration around all connection points</li>
                <li>2. Look for melted, bubbled, or charred plastic anywhere</li>
                <li>3. Smell for burning or electrical odours</li>
                <li>4. Verify all guards and covers are present and secure</li>
                <li>5. Check ventilation is not blocked</li>
                <li>6. Look for signs of modification or improvised repair</li>
                <li>7. Check safety interlocks operate correctly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Automatic Fail Conditions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Any charring, burn marks, or fire damage</strong></li>
                <li><strong>Melted or significantly deformed components</strong></li>
                <li><strong>Missing safety guards or interlocks</strong></li>
                <li><strong>Bypassed thermal or safety cut-outs</strong></li>
                <li><strong>Any improvised repair (tape, foil, wire wrapping)</strong></li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Heat Damage Severity</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">NORMAL</p>
                <ul className="space-y-0.5">
                  <li>Uniform slight yellowing (UV)</li>
                  <li>Light dust accumulation</li>
                  <li>No physical changes</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">INVESTIGATE</p>
                <ul className="space-y-0.5">
                  <li>Localised discolouration</li>
                  <li>Slight warping</li>
                  <li>Unusual smell</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">FAIL</p>
                <ul className="space-y-0.5">
                  <li>Charring or melting</li>
                  <li>Burn marks or bubbling</li>
                  <li>Arcing damage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule3Section3;
