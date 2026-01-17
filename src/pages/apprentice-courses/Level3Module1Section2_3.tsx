/**
 * Level 3 Module 1 Section 2.3 - Hierarchy of Controls
 *
 * Covers: Eliminate, Substitute, Engineering Controls, Administrative Controls, PPE
 * Design: Follows Level3ContentTemplate.tsx exactly
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Hierarchy of Controls - Level 3 Module 1 Section 2.3";
const DESCRIPTION = "Master the hierarchy of controls for electrical work: elimination, substitution, engineering controls, administrative controls, and PPE. Learn why order matters and how to apply each level effectively.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the MOST effective control measure in the hierarchy?",
    options: [
      "PPE (Personal Protective Equipment)",
      "Administrative controls",
      "Elimination",
      "Engineering controls"
    ],
    correctIndex: 2,
    explanation: "Elimination is the most effective control because it completely removes the hazard. If there's no hazard, there's no risk. All other controls manage a hazard that still exists - elimination removes it entirely."
  },
  {
    id: "check-2",
    question: "For electrical work, what does 'elimination' typically mean?",
    options: [
      "Removing the electrician from the hazard",
      "Isolating the circuit so there's no electrical energy present",
      "Using insulated tools",
      "Working in pairs"
    ],
    correctIndex: 1,
    explanation: "For electrical work, elimination means making the equipment dead - isolating and proving the absence of electrical energy. Once properly isolated, the electrical hazard is eliminated at source, not just managed."
  },
  {
    id: "check-3",
    question: "Why are engineering controls ranked higher than administrative controls?",
    options: [
      "They are cheaper",
      "They physically separate workers from hazards without relying on human behaviour",
      "They are easier to implement",
      "Regulations require engineering controls first"
    ],
    correctIndex: 1,
    explanation: "Engineering controls physically separate workers from hazards (barriers, interlocks, guards). They don't depend on people remembering procedures or following rules - they work automatically. Administrative controls rely on correct human behaviour, which can fail."
  },
  {
    id: "check-4",
    question: "When should PPE be used as the primary control for electrical work?",
    options: [
      "Whenever available",
      "For all electrical work",
      "Only as a last resort when higher-level controls are not reasonably practicable",
      "PPE is always the primary control"
    ],
    correctIndex: 2,
    explanation: "PPE is the last resort in the hierarchy. It should only be relied upon when elimination, substitution, engineering, and administrative controls cannot adequately control the risk. PPE only protects the wearer and depends on correct selection, fit, and use."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the correct order of the hierarchy of controls from most to least effective?",
    options: [
      "PPE, Admin, Engineering, Substitution, Elimination",
      "Elimination, Substitution, Engineering, Administration, PPE",
      "Engineering, Elimination, Admin, PPE, Substitution",
      "Admin, Engineering, Substitution, PPE, Elimination"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy from most to least effective is: Elimination (remove the hazard), Substitution (replace with something less hazardous), Engineering controls (physical barriers/guards), Administrative controls (procedures/training), and PPE (personal protection)."
  },
  {
    id: 2,
    question: "An electrician decides to run new cable on surface trunking instead of chasing walls that may contain asbestos. What level of control is this?",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 1,
    explanation: "This is substitution - replacing a hazardous method (chasing asbestos-containing walls) with a less hazardous alternative (surface trunking). The work still gets done, but the asbestos exposure hazard is avoided."
  },
  {
    id: 3,
    question: "Which of these is an engineering control for electrical hazards?",
    options: [
      "Training workers to recognise electrical hazards",
      "Installing RCD protection on circuits",
      "Writing a safe system of work",
      "Wearing insulated gloves"
    ],
    correctAnswer: 1,
    explanation: "RCD protection is an engineering control - it's a physical device that automatically disconnects the supply when it detects a fault. It doesn't rely on human behaviour to operate. Training and procedures are administrative; gloves are PPE."
  },
  {
    id: 4,
    question: "Why does the hierarchy exist?",
    options: [
      "To make safety documentation more complex",
      "Because controls at the top are more reliable and less dependent on human behaviour",
      "Because PPE is too expensive",
      "To satisfy regulatory requirements only"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy exists because controls at the top (elimination, substitution, engineering) are inherently more reliable - they don't depend on people remembering procedures or using PPE correctly. Controls at the bottom rely on consistent human behaviour, which is less reliable."
  },
  {
    id: 5,
    question: "A permit to work system requiring authorisation before live working is what type of control?",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 3,
    explanation: "A permit to work is an administrative control - it's a documented procedure that controls how work is authorised and carried out. It relies on people following the system correctly. Administrative controls include procedures, training, signage, and supervision."
  },
  {
    id: 6,
    question: "What is the key limitation of PPE as a control measure?",
    options: [
      "It's too expensive for most jobs",
      "It only protects the individual wearer and depends on correct selection and use",
      "It's uncomfortable to wear",
      "It's not allowed on UK construction sites"
    ],
    correctAnswer: 1,
    explanation: "PPE's key limitations are: it only protects the wearer (not others), it depends on correct selection for the hazard, proper fit, correct use, and consistent wearing. If any of these fail, protection fails. Higher-level controls protect everyone without depending on individual behaviour."
  },
  {
    id: 7,
    question: "Which control measure would reduce the hazard if someone accidentally contacts a live conductor?",
    options: [
      "Warning signs (administrative)",
      "30mA RCD protection (engineering)",
      "Training (administrative)",
      "Permits to work (administrative)"
    ],
    correctAnswer: 1,
    explanation: "A 30mA RCD is an engineering control that automatically disconnects the supply fast enough to reduce the severity of electric shock. It doesn't prevent contact but reduces harm if contact occurs. Signs, training, and permits might prevent contact but don't help once contact is made."
  },
  {
    id: 8,
    question: "An employer installs interlocked guards on a switchgear panel so doors cannot be opened while energised. What control level is this?",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 2,
    explanation: "Interlocked guards are engineering controls - physical devices that automatically prevent access to hazards. They work regardless of human behaviour (you physically cannot open the door while energised). This is more reliable than relying on workers to check before opening."
  },
  {
    id: 9,
    question: "What does 'substitution' mean in relation to electrical work hazards?",
    options: [
      "Replacing one electrician with another",
      "Replacing a hazardous process, substance, or equipment with a less hazardous alternative",
      "Substituting PPE for engineering controls",
      "Using a permit instead of a method statement"
    ],
    correctAnswer: 1,
    explanation: "Substitution means replacing something hazardous with something less hazardous. Examples include using 110V tools instead of 230V, using LED lights instead of fluorescent tubes with hazardous components, or using mechanical fixings instead of soldering."
  },
  {
    id: 10,
    question: "Which statement about combining controls is correct?",
    options: [
      "Only one control level should be used per hazard",
      "Multiple levels can and often should be combined for adequate protection",
      "Combining controls is not allowed",
      "PPE replaces all other controls if worn correctly"
    ],
    correctAnswer: 1,
    explanation: "Controls are often combined for adequate protection. For example, isolation (elimination) + lock-off (engineering) + permit to work (administrative) + insulated tools (PPE) provides defence in depth. Higher-level controls remain the priority, with lower-level controls as backup."
  },
  {
    id: 11,
    question: "Why is safe isolation (making equipment dead) classified as 'elimination'?",
    options: [
      "Because it eliminates the worker from the area",
      "Because it eliminates the electrical energy, removing the hazard at source",
      "Because it eliminates the need for PPE",
      "Because it eliminates paperwork"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation eliminates the electrical energy from the equipment being worked on. With no electrical energy present, the electrical hazard is eliminated at source - not just controlled or managed, but removed entirely. This is why isolation is the gold standard for electrical safety."
  },
  {
    id: 12,
    question: "A contractor provides clear warning signs around electrical work areas. This is:",
    options: [
      "Elimination - it eliminates people entering",
      "Engineering - it's a physical barrier",
      "Administrative - it provides information requiring people to act on it",
      "PPE - it protects individuals"
    ],
    correctAnswer: 2,
    explanation: "Warning signs are administrative controls - they provide information and rely on people reading, understanding, and acting on them. They don't physically prevent access (that would be engineering) and they don't remove the hazard (that would be elimination). Their effectiveness depends entirely on human behaviour."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I always have to use elimination before anything else?",
    answer: "You must consider elimination first and use it if reasonably practicable. However, there are situations where elimination isn't possible - you can't eliminate the hazard from a circuit you need to work live on (though live working should be avoided where possible). In such cases, you work down the hierarchy, using the most effective controls that are reasonably practicable."
  },
  {
    question: "Can I use PPE as my only control measure?",
    answer: "PPE should never be the sole control measure if higher-level controls are reasonably practicable. You must demonstrate you've considered and implemented higher-level controls first. PPE is a last resort and backup. For electrical work, isolation (elimination) should almost always be the primary control."
  },
  {
    question: "What's the difference between engineering controls and administrative controls?",
    answer: "Engineering controls are physical things that work automatically - barriers, guards, interlocks, RCDs. They don't require human action to be effective. Administrative controls rely on people following procedures, acting on information, or being supervised. Engineering controls are preferred because they're less dependent on human behaviour."
  },
  {
    question: "How do I know if a control is 'reasonably practicable'?",
    answer: "You must balance the risk against the sacrifice (cost, time, effort) needed to avert it. A high risk requires more effort to control than a low risk. If a control is grossly disproportionate to the risk, it may not be reasonably practicable. However, for serious risks like electrocution, most controls will be considered reasonably practicable."
  },
  {
    question: "Why is isolation considered elimination rather than engineering?",
    answer: "When you isolate a circuit, you remove the electrical energy - the hazard itself is eliminated, not just controlled. An interlock that prevents access to live parts is engineering (the hazard remains but you're separated from it). Isolation removes the hazard at source, making the equipment safe rather than just restricting access to it."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hierarchy of Controls
          </h1>
          <p className="text-white/80">
            Understanding why elimination comes first and PPE comes last
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>1. Eliminate:</strong> Remove the hazard entirely (isolation)</li>
              <li><strong>2. Substitute:</strong> Replace with less hazardous alternative</li>
              <li><strong>3. Engineer:</strong> Physical barriers, guards, interlocks</li>
              <li><strong>4. Admin:</strong> Procedures, training, permits, signs</li>
              <li><strong>5. PPE:</strong> Last resort personal protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Top controls don't rely on human behaviour</li>
              <li><strong>Use:</strong> Start at the top, work down only if needed</li>
              <li><strong>Apply:</strong> Often combine multiple levels for safety</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand each level of the hierarchy and its effectiveness",
              "Apply elimination (safe isolation) as the primary control for electrical work",
              "Identify substitution opportunities in everyday electrical tasks",
              "Recognise engineering controls vs administrative controls",
              "Know when and why PPE should be used",
              "Combine multiple control levels for adequate protection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ----------------------------------------
            CONTENT SECTION 01 - Elimination
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Elimination - Remove the Hazard Entirely
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Elimination is the most effective control because it completely removes the hazard - if the hazard doesn't exist, it can't cause harm. Every other control measure manages a hazard that's still present; elimination removes it entirely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">For electrical work, elimination means:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Safe isolation:</strong> Making equipment dead removes the electrical energy completely</li>
                <li>- <strong>Permanent disconnection:</strong> Removing circuits no longer required</li>
                <li>- <strong>Design changes:</strong> Designing out hazards at planning stage</li>
                <li>- <strong>Using battery-powered equipment:</strong> Eliminates mains voltage hazard entirely</li>
              </ul>
            </div>

            <p>
              <strong>Why isolation is elimination:</strong> When you properly isolate a circuit and prove it dead, you've removed the electrical energy - the hazard itself. The conductors are still there, but without energy they cannot cause electric shock or arc flash. This is fundamentally different from engineering controls that keep you away from an energised hazard.
            </p>

            <div className="p-4 rounded bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Trade Example - Consumer Unit Change</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Without elimination: Working with 230V/400V present = major shock and arc flash risk</li>
                <li>With elimination: Isolate at DNO cutout, prove dead = electrical hazard removed</li>
                <li>Result: The work can proceed without any electrical hazard present</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The first question should always be "Can we eliminate this hazard?" For most electrical work, the answer is yes - through safe isolation. Live working should be the exception, not the norm.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02 - Substitution
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Substitution - Replace with Less Hazardous Alternative
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Substitution means replacing a hazardous process, material, or equipment with something less hazardous. The work still gets done, but with reduced risk. This is the second most effective control because it fundamentally reduces the hazard level.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common substitution examples in electrical work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>110V tools instead of 230V:</strong> Reduced shock severity if contact occurs</li>
                <li>- <strong>Battery tools instead of mains:</strong> Eliminates mains shock risk entirely</li>
                <li>- <strong>LED lighting instead of fluorescent:</strong> No mercury disposal hazard</li>
                <li>- <strong>Crimping instead of soldering:</strong> No hot work, no fumes</li>
                <li>- <strong>Surface wiring instead of chasing:</strong> Avoids disturbing asbestos or dust</li>
                <li>- <strong>Pre-assembled components:</strong> Reduces on-site work in hazardous locations</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-red-400/80 mb-2">Higher Risk</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>230V portable tools on construction site</li>
                  <li>Chasing walls in unknown building</li>
                  <li>Traditional tube fluorescent lights</li>
                  <li>Lead-based solder</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-green-400/80 mb-2">Lower Risk (Substituted)</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>110V CTE tools or battery powered</li>
                  <li>Surface trunking or existing routes</li>
                  <li>LED replacement tubes or fittings</li>
                  <li>Lead-free solder or crimped joints</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> On a construction site, the client specifies chasing for new cables. You identify the walls may contain asbestos. Substitution: propose surface-mounted mini-trunking instead. The aesthetic impact is minimal, but the asbestos exposure risk is eliminated.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Substitution often requires thinking creatively about alternatives. The question to ask is: "Is there another way to achieve this that presents less risk?"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03 - Engineering Controls
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Engineering Controls - Physical Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering controls physically separate people from hazards without relying on human behaviour. They work automatically - a guard doesn't require someone to remember to use it, and an RCD doesn't require activation when a fault occurs. This is why they're more reliable than administrative controls or PPE.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Engineering controls for electrical work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>RCD protection:</strong> Automatically disconnects on earth fault</li>
                <li>- <strong>Physical barriers:</strong> Screens, enclosures preventing access to live parts</li>
                <li>- <strong>Interlocks:</strong> Switches that prevent access while energised</li>
                <li>- <strong>Lock-off devices:</strong> Physical locks preventing re-energisation</li>
                <li>- <strong>Insulated covers:</strong> Shrouded busbar chambers, insulated terminals</li>
                <li>- <strong>IP-rated enclosures:</strong> Protection against ingress and contact</li>
                <li>- <strong>Restricted access:</strong> Locked electrical rooms, switchboards</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Point: Engineering vs Elimination</p>
              <p className="text-xs text-white/90">
                Engineering controls keep you separated from a hazard that still exists. A locked switchroom door (engineering) keeps people away from energised equipment - the electrical hazard is still present. Safe isolation (elimination) removes the electrical energy - the hazard itself no longer exists. Both are valuable, but elimination is more effective where practicable.
              </p>
            </div>

            <p>
              <strong>Lock-off devices</strong> are particularly important for electrical work. Once you've isolated a circuit, a lock-off device physically prevents anyone else from re-energising it. This is an engineering control because it doesn't rely on communication or cooperation - even if someone wants to switch it back on, they physically cannot.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Engineering controls are favoured because they work regardless of human behaviour. A well-designed interlock doesn't require training, motivation, or memory - it just works.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04 - Admin and PPE
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Administrative Controls and PPE - The Last Lines
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Administrative controls</strong> rely on people following procedures, acting on information, or being supervised. They're less reliable than engineering controls because human behaviour is variable - people forget, take shortcuts, or misunderstand. However, they remain essential parts of safe systems of work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Administrative controls for electrical work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Permits to work:</strong> Formal authorisation before high-risk work</li>
                <li>- <strong>Method statements:</strong> Documented safe procedures</li>
                <li>- <strong>Training and competence:</strong> Ensuring workers know the risks and controls</li>
                <li>- <strong>Warning signs and labels:</strong> Information at point of hazard</li>
                <li>- <strong>Supervision:</strong> Overseeing work to ensure compliance</li>
                <li>- <strong>Communication:</strong> Briefings, toolbox talks, handovers</li>
                <li>- <strong>Scheduling:</strong> Timing work to reduce exposure or conflict</li>
              </ul>
            </div>

            <p>
              <strong>PPE (Personal Protective Equipment)</strong> is the last resort - used when hazards cannot be adequately controlled by other means. For electrical work, PPE includes insulated gloves, arc flash suits, safety glasses, and insulated tools. PPE has significant limitations:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">PPE Limitations</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Only protects the individual wearer</li>
                  <li>- Depends on correct selection for hazard</li>
                  <li>- Requires proper fit and adjustment</li>
                  <li>- Must be worn consistently</li>
                  <li>- Can be uncomfortable, leading to non-use</li>
                  <li>- Degrades over time</li>
                  <li>- Can create new hazards (reduced dexterity)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Common Electrical PPE</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Insulated gloves (class-rated for voltage)</li>
                  <li>- Arc flash face shields</li>
                  <li>- Arc-rated clothing</li>
                  <li>- Safety glasses/goggles</li>
                  <li>- VDE insulated tools (1000V rated)</li>
                  <li>- Insulating matting</li>
                  <li>- Safety footwear</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For a consumer unit change, the control strategy might be: Isolation (elimination) + lock-off (engineering) + permit/method statement (administrative) + insulated tools as backup (PPE). If isolation fails to be proved dead, the other controls provide defence in depth - but PPE alone would never be acceptable as the primary control.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> PPE is your last line of defence, not your first. It's there for when everything else hasn't been enough - or has failed. Always implement higher-level controls first.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Applying the Hierarchy on Site</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Always start at the top: Can I eliminate this hazard?</li>
                <li>- For electrical work, isolation is usually possible - make it your default</li>
                <li>- Document why higher controls aren't used if you go lower in hierarchy</li>
                <li>- Combine controls - don't rely on just one level</li>
                <li>- Review controls if circumstances change</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When You Can't Eliminate</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Live fault-finding: Use substitution (lowest voltage test points first)</li>
                <li>- Live testing: Engineering controls (RCD, barriers) + admin (permit) + PPE</li>
                <li>- Inspection of energised equipment: Admin (competent person, procedure) + PPE</li>
                <li>- Document justification for any live work in method statement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Jumping to PPE</strong> - Using insulated gloves without first considering isolation</li>
                <li><strong>Confusing levels</strong> - Calling warning signs "engineering controls" (they're admin)</li>
                <li><strong>Single-layer protection</strong> - Relying on one control when multiple should be combined</li>
                <li><strong>Accepting live working too easily</strong> - Not challenging whether isolation is really impracticable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Hierarchy of Controls</h3>
            <div className="space-y-3 text-xs text-white">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">1</span>
                <div>
                  <p className="font-medium">Elimination</p>
                  <p className="text-white/70">Remove hazard completely - safe isolation, design out</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">2</span>
                <div>
                  <p className="font-medium">Substitution</p>
                  <p className="text-white/70">Replace with less hazardous - 110V, battery tools</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</span>
                <div>
                  <p className="font-medium">Engineering</p>
                  <p className="text-white/70">Physical barriers - RCDs, interlocks, lock-offs, guards</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">4</span>
                <div>
                  <p className="font-medium">Administrative</p>
                  <p className="text-white/70">Procedures - permits, training, signs, supervision</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold">5</span>
                <div>
                  <p className="font-medium">PPE</p>
                  <p className="text-white/70">Last resort - insulated gloves, arc flash PPE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Method Statements
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2-4">
              Next: Dynamic Risk Assessments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section2_3;
