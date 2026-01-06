/**
 * Level 3 Module 8 Section 2.2 - Wiring Techniques Review
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Review of essential wiring techniques required for practical assessments
 */

import { ArrowLeft, Zap, CheckCircle, Cable, Wrench, AlertTriangle, CircuitBoard, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Wiring Techniques Review - Level 3 Module 8 Section 2.2";
const DESCRIPTION = "Review of essential wiring techniques required for practical assessments. Master cable preparation, termination methods, and professional installation standards.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When stripping cable sheath, how much insulation should typically be removed?",
    options: [
      "As much as possible to make termination easier",
      "Just enough for secure termination without excessive exposed conductor",
      "Leave all insulation in place",
      "Remove all insulation up to 100mm from the termination"
    ],
    correctIndex: 1,
    explanation: "Strip just enough sheath and insulation for a secure termination. Excessive stripping leaves exposed conductor vulnerable to damage and accidental contact; insufficient stripping prevents secure connection."
  },
  {
    id: "check-2",
    question: "What is the maximum recommended bend radius for most PVC cables?",
    options: [
      "No minimum - cables can be bent at any angle",
      "Four times the overall cable diameter for fixed installations",
      "Equal to the cable diameter",
      "Ten times the cable diameter minimum"
    ],
    correctIndex: 1,
    explanation: "BS 7671 generally requires a minimum bend radius of four times the overall cable diameter for fixed wiring (or as specified by manufacturer). Tighter bends can damage insulation and conductors."
  },
  {
    id: "check-3",
    question: "Why must ferrules be used when terminating stranded conductors in screw terminals?",
    options: [
      "They make the installation look professional",
      "They prevent strand separation and ensure all strands are captured in the terminal",
      "They are only required for aluminium conductors",
      "Ferrules are optional for all installations"
    ],
    correctIndex: 1,
    explanation: "Ferrules prevent individual strands from escaping the terminal or splaying when the screw is tightened. Loose strands can cause high-resistance joints or short circuits, creating fire and shock hazards."
  },
  {
    id: "check-4",
    question: "What should you check after tightening a terminal connection?",
    options: [
      "Nothing - tightening is the final step",
      "That the conductor is secure, insulation is not trapped, and correct conductor is in correct terminal",
      "Only that the screw is tight",
      "That the connection looks clean"
    ],
    correctIndex: 1,
    explanation: "After tightening, verify: conductor is mechanically secure (gentle pull test), no insulation is trapped under the terminal, and the correct conductor is in the correct terminal position (polarity)."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of maintaining correct cable bending radius?",
    options: [
      "To save cable during installation",
      "To prevent damage to conductors and insulation",
      "To make the installation look neater",
      "There is no important purpose"
    ],
    correctAnswer: 1,
    explanation: "Correct bending radius prevents mechanical damage to both conductors (which can fracture) and insulation (which can crack or thin). Damaged cables create safety hazards and can fail over time."
  },
  {
    id: 2,
    question: "When using cable clips to secure cables, what determines the clip spacing?",
    options: [
      "Personal preference of the installer",
      "Cable type, size, and whether horizontal or vertical run",
      "Whatever clips are available",
      "Clips should be as far apart as possible"
    ],
    correctAnswer: 1,
    explanation: "Clip spacing depends on cable type, size, and orientation. BS 7671 Table 4E4A provides guidance. Insufficient clips allow cable sag and movement; excessive clips waste time and materials."
  },
  {
    id: 3,
    question: "What is the correct method for stripping twin and earth cable sheath?",
    options: [
      "Use a knife to cut through the sheath anywhere",
      "Score the sheath lightly without damaging inner insulation, then strip carefully",
      "Pull the sheath off forcefully",
      "Cut deep to ensure complete removal"
    ],
    correctAnswer: 1,
    explanation: "Score the outer sheath lightly using appropriate tools (cable stripper or knife used carefully) without cutting into inner insulation. Deep cuts damage conductor insulation, creating potential faults."
  },
  {
    id: 4,
    question: "What colour sleeving is required on the circuit protective conductor in twin and earth cable?",
    options: [
      "Blue",
      "Brown",
      "Green and yellow striped",
      "No sleeving is required"
    ],
    correctAnswer: 2,
    explanation: "The bare CPC in twin and earth cable must be sleeved with green and yellow striped sleeving to identify it as a protective conductor. This is a regulatory requirement (BS 7671)."
  },
  {
    id: 5,
    question: "When terminating cables in a consumer unit, what is the correct sequence?",
    options: [
      "Any order is acceptable",
      "Neutral first, then line, then earth",
      "Earth first, then neutral, then line (protective conductor first)",
      "Line first as it's most important"
    ],
    correctAnswer: 2,
    explanation: "Connect protective conductors first, then neutral, then line. This sequence ensures protection is in place before potentially live connections and follows good practice for safety."
  },
  {
    id: 6,
    question: "What torque setting should be used for terminal screws?",
    options: [
      "As tight as physically possible",
      "Manufacturer's specified torque setting",
      "Hand tight is sufficient",
      "Torque settings don't matter"
    ],
    correctAnswer: 1,
    explanation: "Use the manufacturer's specified torque setting. Over-tightening can damage terminals and conductors; under-tightening creates high-resistance joints. A calibrated torque screwdriver ensures correct tightening."
  },
  {
    id: 7,
    question: "How should cables enter a metal back box?",
    options: [
      "Through any available hole",
      "Through appropriate knockouts with grommets fitted to protect cables",
      "By drilling new holes wherever convenient",
      "Cable entry method doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "Use appropriate knockouts with rubber grommets fitted to protect cable sheath from the sharp metal edges. This prevents damage to insulation which could cause faults or shock hazards."
  },
  {
    id: 8,
    question: "What is the purpose of leaving a 'drip loop' in external cable entries?",
    options: [
      "To allow for future cable extension",
      "To prevent water tracking along the cable into the enclosure",
      "To take up slack in the cable",
      "Drip loops are not required"
    ],
    correctAnswer: 1,
    explanation: "A drip loop ensures the cable entry point is higher than adjacent cable sections, so water running down the cable drips off rather than entering the enclosure along the cable surface."
  },
  {
    id: 9,
    question: "When wiring a ring final circuit, what must be verified about the connections?",
    options: [
      "Only that all sockets work",
      "That both legs of the ring are complete and correctly connected at origin and all accessories",
      "Just that the circuit breaker is correct size",
      "Ring circuits don't require special verification"
    ],
    correctAnswer: 1,
    explanation: "Ring circuits require verification that both legs are complete (not broken) and correctly connected at all points. Incorrect connections can overload one leg or create open circuits - testing confirms integrity."
  },
  {
    id: 10,
    question: "What should you do if a terminal won't accept the conductor even after correct stripping?",
    options: [
      "Force it in regardless",
      "Check conductor size against terminal rating; if incompatible, use appropriate method or different terminal",
      "Cut strands off until it fits",
      "Use a larger terminal screw"
    ],
    correctAnswer: 1,
    explanation: "Never force connections or modify conductors inappropriately. Check the conductor size is suitable for the terminal. If not, use the correct termination method (ferrule, crimp, etc.) or appropriate terminal."
  },
  {
    id: 11,
    question: "Where should cable joints be made in fixed wiring installations?",
    options: [
      "Anywhere along the cable route",
      "In accessible junction boxes or within accessory enclosures",
      "Joints are not permitted in fixed wiring",
      "Hidden behind plaster for neatness"
    ],
    correctAnswer: 1,
    explanation: "Joints must be accessible for inspection and maintenance. They should be made in junction boxes or within accessory enclosures, not buried in walls or ceilings where they cannot be accessed."
  },
  {
    id: 12,
    question: "What is the purpose of cable identification at distribution boards?",
    options: [
      "To make the installation look professional",
      "To enable safe isolation and circuit identification for future work",
      "It's optional and rarely needed",
      "Only required for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Clear circuit identification enables safe isolation for maintenance and fault finding. It's a regulatory requirement that protects future workers by clearly indicating which circuits feed which areas."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How do I know what torque setting to use for different terminals?",
    answer: "Torque settings are specified by the equipment manufacturer - check the device instructions or markings on the terminal. Common values range from 0.5 Nm for small terminals to 2.5 Nm for larger connections. Using a calibrated torque screwdriver ensures correct tightening without guessing."
  },
  {
    question: "Can I use the same stripping technique for all cable types?",
    answer: "No - different cables require different techniques. Twin and earth requires careful sheath scoring; SWA cables need specialist tools for armouring; flexible cables need care not to nick strands. Practice with each cable type you'll encounter in assessments."
  },
  {
    question: "What if I damage insulation while stripping?",
    answer: "If insulation is damaged (nicked, cut, or compromised), that section must be cut off and re-stripped. Using damaged cable creates potential fault points. In assessments, damaged cable may lose marks or cause failure if presenting safety concerns."
  },
  {
    question: "How do I achieve neat cable runs in practical assessments?",
    answer: "Plan cable routes before starting. Use appropriate containment or clips at correct intervals. Keep cables parallel where they run together. Avoid tight bends. Take time to dress cables neatly into enclosures. Neatness demonstrates professional competence."
  },
  {
    question: "Should I use crimps or screw terminals for connections?",
    answer: "Use the termination method specified or appropriate for the equipment. Screw terminals are common in accessories; crimps may be required for certain connections. Know how to use both methods correctly. Never mix methods inappropriately."
  },
  {
    question: "How tight should cable clips be?",
    answer: "Clips should hold the cable securely without deforming the sheath. Over-tight clips can damage insulation; loose clips allow cable movement. The cable should be held firmly but not squeezed."
  }
];

// ============================================
// CABLE TYPES DATA
// ============================================
const cableTypes = [
  {
    name: "Twin & Earth (6242Y)",
    applications: "Most domestic fixed wiring - lighting, sockets, spurs",
    keyTechniques: ["Score outer sheath carefully", "Sleeve CPC green/yellow", "Maintain bend radius"],
    commonSizes: "1.0mm², 1.5mm², 2.5mm², 4.0mm², 6.0mm²"
  },
  {
    name: "Three-Core & Earth (6243Y)",
    applications: "Two-way switching, immersion heaters, cookers with separate neutral",
    keyTechniques: ["Identify cores correctly (brown, black, grey)", "Sleeve CPC", "Use ferrules for stranded"],
    commonSizes: "1.0mm², 1.5mm², 2.5mm²"
  },
  {
    name: "Flexible Cable (3183Y, 3183TQ)",
    applications: "Appliance connections, pendant drops, portable equipment",
    keyTechniques: ["Use ferrules for all terminations", "Strain relief essential", "Avoid overtightening"],
    commonSizes: "0.75mm², 1.0mm², 1.5mm², 2.5mm²"
  },
  {
    name: "SWA Cable",
    applications: "External underground, industrial, high mechanical protection needed",
    keyTechniques: ["Specialist glands required", "Earth armouring correctly", "Maintain IP rating"],
    commonSizes: "1.5mm² to 400mm²"
  }
];

// ============================================
// TERMINATION METHODS
// ============================================
const terminationMethods = [
  {
    method: "Screw Terminal (Pillar)",
    description: "Conductor inserted from side, screw clamps from above",
    tips: ["Insert fully before tightening", "No insulation under screw", "Use ferrules for stranded"],
    commonUse: "Most accessories, consumer units, junction boxes"
  },
  {
    method: "Screw Terminal (Tunnel)",
    description: "Conductor passes through tunnel, screw clamps directly",
    tips: ["Strip correct length", "Ensure screw contacts conductor not insulation", "Check security"],
    commonUse: "Industrial equipment, some switchgear"
  },
  {
    method: "Spring-Cage (Push-fit)",
    description: "Conductor pushed in, spring mechanism grips",
    tips: ["Strip to marked depth", "Insert straight", "Test security with pull"],
    commonUse: "Modern accessories, quick-connect devices"
  },
  {
    method: "Crimp Connection",
    description: "Metal sleeve compressed onto conductor(s)",
    tips: ["Correct crimp for conductor size", "Use proper crimping tool", "Inspect completed crimp"],
    commonUse: "Junction boxes, motor connections, high-current joints"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wiring Techniques Review
          </h1>
          <p className="text-white/80">
            Essential wiring skills for practical assessment success
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Stripping:</strong> Just enough - no more, no damage</li>
              <li><strong>Terminations:</strong> Secure, correct torque, no trapped insulation</li>
              <li><strong>Cable Runs:</strong> Neat, clipped, correct bending radius</li>
              <li><strong>Standard:</strong> Every connection safe and professional</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Poor terminations cause high resistance joints</li>
              <li><strong>Use:</strong> Ferrules prevent strand separation</li>
              <li><strong>Apply:</strong> Torque settings ensure reliable connections</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Master cable preparation techniques for different cable types",
              "Execute secure terminations using appropriate methods",
              "Apply correct bending radii and clip spacings",
              "Identify and use correct conductor identification",
              "Achieve professional workmanship standards",
              "Avoid common wiring errors that cost marks"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cable Preparation Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cable preparation is the foundation of quality electrical installation work. Poor preparation leads to connection failures, safety hazards, and lost marks in assessments. The key principles apply across all cable types: remove just enough insulation, avoid damage, and prepare for secure connection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Stripping Principles:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Measure First:</strong> Before cutting, identify how much sheath and insulation needs to be removed for the specific terminal or connection. Different accessories require different strip lengths - check manufacturer guidance.</li>
                <li><strong>Appropriate Tools:</strong> Use proper cable stripping tools rather than improvising. Side cutters can nick conductors; Stanley knives can cut too deep. Purpose-designed strippers give consistent results with practice.</li>
                <li><strong>Score Don't Cut:</strong> When removing outer sheath from twin and earth, score lightly around the circumference then snap and pull - don't cut through. Deep cuts damage inner insulation.</li>
                <li><strong>Inspect After Stripping:</strong> Check for any damage to conductor or inner insulation. Nicked conductors can fracture; damaged insulation can cause faults. If in doubt, cut off and re-strip.</li>
                <li><strong>No Excessive Bare Conductor:</strong> Only expose enough conductor for secure termination. Long sections of exposed conductor create shock and short-circuit hazards.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Twin and Earth Stripping Sequence:</p>
              <ol className="text-xs text-white/90 space-y-1 ml-4">
                <li>1. Measure required sheath removal length for enclosure entry plus working room</li>
                <li>2. Score outer grey sheath with cable stripper or careful knife cut (light pressure only)</li>
                <li>3. Snap and pull sheath away from score line</li>
                <li>4. Separate conductors and cut away outer sheath neatly</li>
                <li>5. Sleeve the bare CPC with green/yellow sleeving</li>
                <li>6. Strip inner insulation to correct length for terminals</li>
                <li>7. Inspect all conductors for damage before terminating</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Assessment Reality:</strong> Assessors look for evidence of care in cable preparation. Rushed stripping that damages insulation or leaves excessive bare conductor indicates poor technique and costs marks.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Termination Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Secure electrical terminations are critical for both safety and system reliability. A poor termination creates a high-resistance joint that can overheat, cause fires, or fail completely. Different termination methods suit different applications - know when and how to use each correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {terminationMethods.map((term, index) => (
                <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CircuitBoard className="h-4 w-4 text-elec-yellow" />
                    <p className="text-sm font-medium text-white">{term.method}</p>
                  </div>
                  <p className="text-xs text-white/70 mb-2">{term.description}</p>
                  <ul className="text-xs text-white/80 space-y-0.5">
                    {term.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-elec-yellow/60 mt-2">Common use: {term.commonUse}</p>
                </div>
              ))}
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Universal Termination Principles:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Conductor Fully Inserted:</strong> The conductor must be fully inserted into the terminal before tightening. Partial insertion creates weak connections that can pull out or develop high resistance.</li>
                <li><strong>No Insulation Trapped:</strong> Only bare conductor should be under the terminal. Insulation trapped under screws prevents proper electrical contact and creates high-resistance joints.</li>
                <li><strong>Correct Torque:</strong> Use manufacturer-specified torque settings. Over-tightening damages conductors and terminals; under-tightening creates loose connections that can arc.</li>
                <li><strong>Security Check:</strong> After tightening, perform a gentle pull test to confirm the conductor is secure. This catches incorrectly made connections before they cause problems.</li>
                <li><strong>Visual Inspection:</strong> After termination, visually inspect. Is the conductor secure? Is insulation clear of the terminal? Is the correct conductor in the correct terminal?</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Stranded Conductors Warning</p>
                  <p className="text-xs text-white/90">
                    Stranded conductors (flexible cables) must use ferrules when terminated in screw terminals. Without ferrules, individual strands can escape or splay, causing high-resistance connections, short circuits, or complete disconnection. This is a common assessment failure point.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional Tip:</strong> Develop a systematic termination routine: strip, insert fully, check position, tighten to torque, verify secure, visual inspect. Consistent routines prevent errors under assessment pressure.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Routing and Support
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              How cables are routed and supported affects both safety and professional appearance. BS 7671 provides specific guidance on cable installation methods, bending radii, and support requirements. Following these standards demonstrates competence and earns marks in assessments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Routing Principles:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Permitted Zones:</strong> Surface cables should run in defined zones - horizontally within 150mm of ceiling/floor, or vertically from accessories. Cables outside these zones are vulnerable to damage from fixings.</li>
                <li><strong>Avoid Damage Risks:</strong> Route cables away from potential damage sources - heat, mechanical stress, sharp edges. Use appropriate containment in high-risk areas.</li>
                <li><strong>Accessibility:</strong> Consider access for future maintenance. Don't route cables where they cannot be inspected or replaced without major work.</li>
                <li><strong>Separation:</strong> Maintain separation from non-electrical services where required. Keep circuits separated where necessary (e.g., fire alarm circuits from other wiring).</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Bending Radius</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Minimum 4x cable diameter for fixed PVC cables</li>
                  <li>Larger radius for SWA and MICC cables</li>
                  <li>Check manufacturer data for specific cables</li>
                  <li>Tight bends damage insulation and conductors</li>
                  <li>Allow extra radius for multi-core cables</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Clip Spacing</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Horizontal: 250mm for twin and earth up to 9mm</li>
                  <li>Vertical: 400mm for same cable type</li>
                  <li>Additional clips at changes of direction</li>
                  <li>Support within 150mm of enclosure entry</li>
                  <li>Refer to BS 7671 Table 4E4A for full guidance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Enclosure Entry:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Metal Boxes:</strong> Use designated knockouts. Always fit grommets to protect cable sheath from sharp edges. Ensure grommet is correctly seated.</li>
                <li><strong>Plastic Boxes:</strong> Use entry points provided. Although less sharp than metal, still take care not to damage cable on entry.</li>
                <li><strong>IP-Rated Enclosures:</strong> Use appropriate cable glands to maintain IP rating. Incorrect entry compromises protection against water and dust.</li>
                <li><strong>Cable Glands:</strong> Select correct gland size for cable. Ensure complete seal around cable sheath. Tighten to manufacturer specification.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Workmanship Note:</strong> Neat, organised cable runs demonstrate professional competence. Take time to dress cables properly - parallel runs, consistent clip positions, tidy entry to enclosures. This visual quality affects assessment marks.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Errors and Quality Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common wiring errors helps you avoid them. Many assessment failures result from the same repeated mistakes - errors that are easily prevented with awareness and proper technique. Build quality checks into your working routine.
            </p>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Common Errors</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Nicked insulation from careless stripping</li>
                  <li>Excessive bare conductor exposed</li>
                  <li>Insulation trapped under terminals</li>
                  <li>Loose connections (under-torqued)</li>
                  <li>Conductor damage from over-tightening</li>
                  <li>No green/yellow sleeve on CPC</li>
                  <li>Wrong conductor in wrong terminal</li>
                  <li>Tight cable bends exceeding minimum radius</li>
                  <li>Missing grommets at metal box entries</li>
                  <li>Poor cable support (sagging runs)</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Quality Indicators</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Clean, undamaged insulation throughout</li>
                  <li>Correct strip length for each terminal</li>
                  <li>All terminals correctly torqued</li>
                  <li>Conductors pass pull test</li>
                  <li>All CPCs sleeved correctly</li>
                  <li>Polarity correct at all points</li>
                  <li>Smooth cable bends, no kinks</li>
                  <li>Consistent clip spacing</li>
                  <li>Neat entry to all enclosures</li>
                  <li>Professional overall appearance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Self-Check Routine:</p>
              <p className="text-sm text-white/90 mb-2">
                Build these checks into your workflow - don't leave everything until the end:
              </p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>After Each Termination:</strong> Visual check - secure? Correct terminal? No trapped insulation? If stranded, ferrule used?</li>
                <li><strong>After Each Accessory:</strong> All connections correct? Polarity correct? Accessory level and secure? Covers fitted correctly?</li>
                <li><strong>After Each Cable Run:</strong> Bends within radius? Clips at correct intervals? Entry to enclosures neat? Protected from damage?</li>
                <li><strong>Before Testing:</strong> All covers in place? All connections complete? Visual inspection passed? Safe to test?</li>
                <li><strong>Before Handover:</strong> Documentation complete? Test results recorded? Work area tidy? Ready for assessor review?</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Error Recovery</p>
                  <p className="text-xs text-white/90">
                    If you spot an error in your work, correct it properly. Do not try to hide mistakes - assessors notice, and attempting to conceal errors demonstrates poor professional practice. Proper correction shows competence; attempting to hide errors shows the opposite.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Time Management:</strong> Quality checks take seconds but can save significant time by catching errors early. A termination corrected immediately takes moments; one discovered during final testing requires backtracking and rework.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* CABLE TYPES REFERENCE */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Cable Types Reference</h2>

          <div className="space-y-4">
            {cableTypes.map((cable, index) => (
              <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{cable.name}</h3>
                  <span className="text-xs text-elec-yellow/70">{cable.commonSizes}</span>
                </div>
                <p className="text-xs text-white/70 mb-2">{cable.applications}</p>
                <div className="flex flex-wrap gap-2">
                  {cable.keyTechniques.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Tools for Wiring</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cable strippers (automatic or manual) suitable for cable types used</li>
                <li>Side cutters of appropriate size</li>
                <li>Torque screwdriver with correct bits and settings</li>
                <li>Crimping tool if crimps will be used</li>
                <li>Selection of screwdrivers (flat and Phillips)</li>
                <li>Green/yellow sleeving in appropriate sizes</li>
                <li>Ferrules and ferrule crimper for flexible cables</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Assessment Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Practice stripping each cable type until consistently clean</li>
                <li>Practice terminations until they become automatic</li>
                <li>Time yourself to understand realistic working pace</li>
                <li>Have someone check your work to catch habits you've missed</li>
                <li>Practice using torque screwdriver - feel what correct torque is like</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Assessment Day Reminders</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Check tools before starting</strong> - Missing or faulty tools waste assessment time</li>
                <li><strong>Work steadily</strong> - Rushing causes errors; panic destroys technique</li>
                <li><strong>Check as you go</strong> - Build quality verification into your workflow</li>
                <li><strong>If you make a mistake, fix it properly</strong> - Don't bodge or hide</li>
                <li><strong>Presentation matters</strong> - Neat work demonstrates competence</li>
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

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Wiring Standards</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Termination Checklist</p>
                <ul className="space-y-0.5">
                  <li>Conductor fully inserted</li>
                  <li>No insulation under terminal</li>
                  <li>Correct torque applied</li>
                  <li>Passes gentle pull test</li>
                  <li>Correct conductor, correct terminal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cable Support (Twin & Earth)</p>
                <ul className="space-y-0.5">
                  <li>Horizontal: 250mm clip spacing</li>
                  <li>Vertical: 400mm clip spacing</li>
                  <li>Minimum bend: 4x cable diameter</li>
                  <li>Support within 150mm of entry</li>
                  <li>Additional clips at direction changes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Practical Assessment Guide
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section2-3">
              Next: Safe Isolation Practice
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section2_2;
