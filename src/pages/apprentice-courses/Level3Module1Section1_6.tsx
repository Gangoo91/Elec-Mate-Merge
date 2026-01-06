import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Clock, ArrowUpFromLine, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level3Module1Section1_6 = () => {
  useSEO(
    "Working at Height Regulations 2005 - Level 3 Module 1 Section 1.6",
    "Understanding legal requirements for safe working at height in the electrical industry - hierarchy of controls, equipment requirements, and electrical-specific risks"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "According to the Working at Height Regulations 2005, what constitutes 'working at height'?",
      options: [
        "Only work above 2 metres",
        "Only work on scaffolding",
        "A place from which a person could fall and be injured",
        "Only work on roofs"
      ],
      correctAnswer: 2,
      explanation: "The regulations define working at height as any work in a place from which a person could fall a distance liable to cause personal injury - regardless of how high it is. There is no minimum height threshold."
    },
    {
      id: 2,
      question: "What is the correct hierarchy of control measures for working at height?",
      options: [
        "Mitigate, Prevent, Avoid",
        "Prevent, Avoid, Mitigate",
        "Avoid, Prevent, Mitigate",
        "Use PPE first, then other measures"
      ],
      correctAnswer: 2,
      explanation: "The hierarchy is: AVOID working at height where possible, PREVENT falls using the right equipment, then MITIGATE the consequences of a fall if it cannot be prevented. This order must be followed."
    },
    {
      id: 3,
      question: "What is the correct angle ratio for positioning a ladder against a wall?",
      options: [
        "1:2 ratio",
        "1:3 ratio",
        "1:4 ratio",
        "1:5 ratio"
      ],
      correctAnswer: 2,
      explanation: "The 1:4 ratio means for every 4 metres of height, the base should be 1 metre out from the wall. This ensures stability and reduces the risk of the ladder slipping backwards or sideways."
    },
    {
      id: 4,
      question: "What training certification is required for operating Mobile Elevating Work Platforms (MEWPs)?",
      options: [
        "CSCS card only",
        "IPAF training certification",
        "No formal training required",
        "First aid certificate"
      ],
      correctAnswer: 1,
      explanation: "IPAF (International Powered Access Federation) certification is the industry-recognised training standard for MEWP operators. It covers safe operation, pre-use checks, emergency procedures, and machine-specific familiarisation."
    },
    {
      id: 5,
      question: "What does a GREEN scaffold tag indicate?",
      options: [
        "Scaffold is incomplete - do not use",
        "Scaffold has been inspected and is safe to use",
        "Scaffold requires maintenance",
        "Scaffold is being dismantled"
      ],
      correctAnswer: 1,
      explanation: "A green tag indicates the scaffold has been inspected by a competent person and is safe for use. Red or other warning tags indicate incomplete or unsafe scaffolds that must not be used."
    },
    {
      id: 6,
      question: "Which type of protection takes priority under the regulations - collective or personal?",
      options: [
        "Personal protection always",
        "Collective protection takes priority over personal",
        "They are equally important",
        "It depends on the height"
      ],
      correctAnswer: 1,
      explanation: "Collective protection measures (guard rails, netting) that protect everyone without requiring individual action are preferred over personal protection (harnesses) that only protect individuals and require correct fitting and use."
    },
    {
      id: 7,
      question: "What is the '3 points of contact' rule when using a ladder?",
      options: [
        "Have 3 people hold the ladder",
        "Extend ladder 3 rungs above landing",
        "Always maintain 2 hands and 1 foot OR 2 feet and 1 hand on the ladder",
        "Check ladder at 3 different points"
      ],
      correctAnswer: 2,
      explanation: "The 3 points of contact rule ensures stability by maintaining constant grip on the ladder - either 2 hands and 1 foot, or 2 feet and 1 hand at all times during climbing."
    },
    {
      id: 8,
      question: "When working near fragile surfaces like roof lights, what precautions must be taken?",
      options: [
        "Work quickly to reduce exposure time",
        "Use crawling boards and barriers, never step directly on fragile materials",
        "Only work in dry conditions",
        "Wear safety boots"
      ],
      correctAnswer: 1,
      explanation: "Fragile surfaces require crawling boards to distribute weight, barriers to prevent approach, and clear warning signs. Never step directly on fragile materials - they can give way without warning."
    },
    {
      id: 9,
      question: "At what wind speed should work at height typically be suspended?",
      options: [
        "Above 10 mph",
        "Above 17 mph (Beaufort Force 5)",
        "Above 30 mph",
        "Wind speed is not a consideration"
      ],
      correctAnswer: 1,
      explanation: "Work at height should generally be suspended when wind reaches Beaufort Force 5 (17+ mph) or earlier when handling lightweight materials. Site-specific risk assessments determine exact limits."
    },
    {
      id: 10,
      question: "Why is electrical shock particularly dangerous when working at height?",
      options: [
        "Electricity is stronger at height",
        "Equipment doesn't work properly at height",
        "Shock can cause muscle contractions or unconsciousness leading to falls",
        "It isn't more dangerous at height"
      ],
      correctAnswer: 2,
      explanation: "Electrical shock at height is especially dangerous because the resulting involuntary muscle contractions or loss of consciousness can directly cause falls, combining two serious hazards into one potentially fatal incident."
    },
    {
      id: 11,
      question: "How far must a ladder extend above the landing point?",
      options: [
        "500mm (2 rungs)",
        "750mm (2.5 rungs)",
        "At least 1 metre (3 rungs)",
        "It doesn't need to extend above"
      ],
      correctAnswer: 2,
      explanation: "Ladders must extend at least 1 metre (approximately 3 rungs) above the landing point to provide a secure handhold when stepping on and off the ladder at the top."
    },
    {
      id: 12,
      question: "How often must scaffolds be inspected at minimum?",
      options: [
        "Daily",
        "Weekly (at intervals not exceeding 7 days)",
        "Monthly",
        "Only before first use"
      ],
      correctAnswer: 1,
      explanation: "Scaffolds must be inspected by a competent person before first use, after any alteration, after any event affecting stability (like adverse weather), and at regular intervals not exceeding 7 days."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            to="../level3-module1-section1"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white active:text-elec-yellow text-sm sm:text-base min-h-[44px] touch-manipulation transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Section 1</span>
          </Link>
          <span className="inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-xs sm:text-sm font-medium">
            1.6
          </span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">

          {/* HEADER */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-sm font-medium">
              <ArrowUpFromLine className="w-4 h-4" />
              Section 1.6
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Working at Height Regulations 2005
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Understanding legal requirements for safe working at height in the electrical industry
            </p>
          </header>

          {/* QUICK SUMMARY BOX */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">In 30 Seconds</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Falls from height are a leading cause of death in construction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Definition: "a place from which a person could fall and be injured"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Hierarchy: Avoid - Prevent - Mitigate (in that order)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Collective protection preferred over personal protection
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Spot it / Use it</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Spot:</strong> Fragile surfaces, unprotected edges, unsafe equipment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Use:</strong> 1:4 ladder ratio, 3 points contact, scaffold tags
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Check:</strong> Weather, equipment inspection, rescue plan
                </li>
              </ul>
            </div>
          </div>

          {/* LEARNING OUTCOMES */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <p className="text-white/70 mb-4 text-sm sm:text-base">By the end of this section, you will be able to:</p>
            <ul className="space-y-3">
              {[
                "Define what constitutes working at height under the 2005 Regulations",
                "Apply the hierarchy of control measures: Avoid, Prevent, Mitigate",
                "Understand equipment requirements for ladders, scaffolds, and MEWPs",
                "Explain the difference between collective and personal protection",
                "Recognise specific risks associated with electrical work at height",
                "Describe appropriate weather-related precautions for work at height"
              ].map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm sm:text-base">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 01: What Constitutes Working at Height */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">What Constitutes Working at Height</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Working at Height Regulations 2005</strong> define working at height as work in any place where, if precautions were not taken, a person could fall a distance liable to cause personal injury. This definition is deliberately broad and has significant implications for electricians.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-1">Critical Point: No Minimum Height</h4>
                    <p className="text-white/80 text-sm">
                      There is <strong className="text-white">no minimum height</strong> specified in the regulations. Work at height includes stepping onto a small platform, working from a ladder, working on a flat roof, or working near any edge or opening. If you could fall and be injured, the regulations apply.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-3">Common at-height scenarios for electricians:</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Accessing ceiling voids for cable installation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Working from ladders to install lighting or accessories
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Working on scaffolding during construction projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Accessing distribution boards mounted at height
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Working on lighting columns and street furniture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Installing cable tray systems at high level
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Roof work including solar panel installations
                  </li>
                </ul>
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                The regulations place duties on employers, the self-employed, and anyone who controls the work of others. All work at height must be <strong className="text-white">properly planned</strong> by competent people, <strong className="text-white">appropriately supervised</strong>, and carried out in a manner that is as safe as reasonably practicable.
              </p>
            </div>

            <InlineCheck
              id="definition-check"
              question="At what minimum height do the Working at Height Regulations apply?"
              options={[
                "2 metres",
                "3 metres",
                "There is no minimum height - they apply wherever you could fall and be injured",
                "1.5 metres"
              ]}
              correctIndex={2}
              explanation="The regulations apply at ANY height where a person could fall and be injured. There is no minimum height threshold - even stepping onto a small platform is covered if there is fall risk."
            />
          </section>

          {/* SECTION 02: Hierarchy of Controls */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Hierarchy of Controls (Avoid, Prevent, Mitigate)</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                The regulations establish a clear hierarchy of control measures that must be followed <strong className="text-white">in sequence</strong>. This hierarchy prioritises eliminating the risk entirely, then preventing falls, and finally minimising consequences. You cannot skip ahead in the hierarchy.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">1. AVOID working at height</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    This is always the first consideration. Can the work be done from ground level? Can equipment be assembled at ground level and lifted into position? Can prefabricated cable management systems reduce the need for work at height? Modern construction techniques often allow significant reduction in work at height through better planning and prefabrication.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-semibold text-amber-400 mb-2">2. PREVENT falls by using the right equipment</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    When work at height cannot be avoided, preventing falls is the next priority. This includes using appropriate work platforms, guard rails, scaffolding, or MEWPs. The regulations require that <strong className="text-white">collective protection measures</strong> (those protecting everyone) take priority over <strong className="text-white">personal protection measures</strong> (those protecting individuals).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">3. MITIGATE the consequences of a fall</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Only when avoiding and preventing are not reasonably practicable should you use equipment that minimises the distance and consequences of a fall. This includes safety nets, soft landing systems, and personal fall arrest systems (harnesses and lanyards).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Collective vs Personal Protection</h4>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-2">Collective Protection (Preferred)</p>
                    <ul className="space-y-1 text-sm text-white/80">
                      <li>* Guard rails and barriers</li>
                      <li>* Toe boards</li>
                      <li>* Safety netting</li>
                      <li>* Covered openings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-2">Personal Protection (Secondary)</p>
                    <ul className="space-y-1 text-sm text-white/80">
                      <li>* Safety harnesses</li>
                      <li>* Lanyards</li>
                      <li>* Fall arrest systems</li>
                      <li>* Work restraint systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="hierarchy-check"
              question="What is the correct order of the hierarchy of controls for working at height?"
              options={[
                "Prevent, Avoid, Mitigate",
                "Mitigate, Prevent, Avoid",
                "Avoid, Prevent, Mitigate",
                "Use PPE first, then consider alternatives"
              ]}
              correctIndex={2}
              explanation="The correct hierarchy is: AVOID (don't work at height if possible), PREVENT (use equipment to stop falls), then MITIGATE (minimise consequences if a fall occurs). This order prioritises elimination over protection."
            />
          </section>

          {/* SECTION 03: Equipment Requirements */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Equipment Requirements - Ladders, Scaffolds, MEWPs</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">LADDERS</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  Ladders should only be used for <strong className="text-white">short duration work</strong> (typically up to 30 minutes) or where a risk assessment shows other equipment is not justified.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="p-3 rounded-lg bg-[#1a1a1a]">
                    <p className="text-white font-medium text-sm mb-2">The 1:4 Ratio</p>
                    <p className="text-white/70 text-xs">For every 4 metres of height, the base should be 1 metre out from the wall. This ensures stability.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1a1a1a]">
                    <p className="text-white font-medium text-sm mb-2">3 Points of Contact</p>
                    <p className="text-white/70 text-xs">Always maintain 2 hands + 1 foot OR 2 feet + 1 hand on the ladder at all times.</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-white/80 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Extend at least 1 metre (3 rungs) above the landing point
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Position on firm, level ground and secure at top, bottom, or both
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Use Class 1 industrial ladders for work - domestic ladders are not suitable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Never use for work requiring both hands free or heavy lifting
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">SCAFFOLDING</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  Must be erected, altered, and dismantled by <strong className="text-white">competent persons</strong> only. Inspection is critical.
                </p>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-3">
                  <p className="text-green-400 font-medium text-sm">GREEN TAG = Inspected and safe to use</p>
                  <p className="text-white/70 text-xs mt-1">Red or warning tags indicate incomplete or unsafe scaffolds - DO NOT USE</p>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  <strong className="text-white">Inspection requirements:</strong>
                </p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>* Before first use</li>
                  <li>* After any alteration</li>
                  <li>* After any event affecting stability (adverse weather)</li>
                  <li>* At intervals not exceeding 7 days</li>
                </ul>
                <p className="text-white/80 text-sm leading-relaxed mt-3">
                  Scaffold requirements include guard rails at 950mm minimum height, intermediate guard rails, toe boards at least 150mm high, fully boarded platforms with no gaps exceeding 25mm, and internal access via ladders or stair towers.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">MEWPs (Mobile Elevating Work Platforms)</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  Includes cherry pickers, scissor lifts, and boom lifts. Operators must hold valid <strong className="text-white">IPAF certification</strong>.
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    IPAF training covers safe operation, pre-use checks, and emergency procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Pre-use checks: ground conditions, overhead hazards, machine condition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Do not use in wind speeds exceeding Beaufort Force 5 (17+ mph)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    Fall restraint or arrest equipment usually required in boom-type MEWPs
                  </li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id="equipment-check"
              question="What does a GREEN scaffold tag indicate?"
              options={[
                "Scaffold is being erected - stay away",
                "Scaffold has been inspected and is safe for use",
                "Scaffold requires maintenance",
                "Scaffold is for dismantling only"
              ]}
              correctIndex={1}
              explanation="A green scaffold tag indicates that the scaffold has been inspected by a competent person and is safe to use. Always check for the tag before using any scaffold - red or warning tags mean DO NOT USE."
            />
          </section>

          {/* SECTION 04: Electrical Work at Height - Specific Risks */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Electrical Work at Height - Specific Risks</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Electrical work at height presents a <strong className="text-white">unique combination of hazards</strong> that require specific control measures. The primary concern is that electrical shock can cause involuntary muscle contractions or loss of consciousness, directly leading to falls.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-1">Combined Hazards Warning</h4>
                    <p className="text-white/80 text-sm">
                      When electrical hazards and fall hazards combine, the consequences can be fatal. A minor shock that would cause no lasting injury at ground level could cause a fatal fall from height. Both sets of safety procedures must be rigorously followed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Lighting Columns and Street Furniture</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Work on lighting columns combines fall risks with electrical hazards and traffic risks. Isolation must be verified before climbing - never rely on time switches or assumed off conditions. Use insulated tools and maintain safe working distances from live parts even when working on the column structure.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Distribution Boards at Height</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Common in industrial and commercial settings. Access may require ladders, scaffolding, or MEWPs. Work often requires both hands, making fall protection critical. Circuit isolation and safe isolation procedures must be followed, with additional consideration for emergency response at height.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Roof Work and Solar Installations</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Edge protection is essential, and fragile surface warnings must be heeded. DC systems in solar installations remain energised during daylight - isolation may not be possible. Work near overhead power lines requires safe clearance distances (typically 15m horizontal for lines up to 132kV).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-semibold text-amber-400 mb-2">Weather Conditions</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Wet conditions increase both slip hazards and electrical risk. Wind speeds exceeding Beaufort Force 5 (approximately 17 mph) should trigger work cessation. Lightning risk requires immediate suspension of all work at height, particularly on exposed structures or near overhead lines.
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id="electrical-check"
              question="Why is electrical shock particularly dangerous when working at height?"
              options={[
                "It isn't more dangerous at height",
                "Shock can cause muscle contractions or unconsciousness leading to falls",
                "Electricity is stronger at height",
                "Equipment doesn't work properly at height"
              ]}
              correctIndex={1}
              explanation="Electrical shock at height is especially dangerous because the resulting involuntary muscle contractions or loss of consciousness can directly cause falls, combining two serious hazards into one potentially fatal incident."
            />
          </section>

          {/* REAL-WORLD EXAMPLE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white">Real-World Case: The Lighting Column Incident</h3>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                <strong className="text-white">The Situation:</strong> An experienced electrician was tasked with replacing a faulty lamp in a lighting column. He had done this work hundreds of times and decided to save time by not fully isolating the supply, relying on the time switch to keep the circuit off during daylight hours.
              </p>
              <p>
                <strong className="text-white">What Went Wrong:</strong> Unknown to the electrician, a timer fault had occurred and the circuit energised while he was working at the top of the column. He received an electric shock that caused him to release his grip. Although he was wearing a harness, the shock caused him to fall sideways, striking his head on the column structure.
              </p>
              <p>
                <strong className="text-white">The Consequences:</strong> The electrician suffered a serious head injury and was unable to work for six months. The investigation revealed multiple failures: no proper isolation procedure, inadequate risk assessment, and failure to use appropriate head protection.
              </p>
              <p>
                <strong className="text-white">The Lesson:</strong> When electrical work and work at height combine, BOTH sets of safety procedures must be rigorously followed. Never take shortcuts with isolation procedures, especially when working at height where shock consequences are amplified by fall risk.
              </p>
            </div>
          </div>

          {/* PRACTICAL GUIDANCE */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance - Working at Height Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">Before Starting Work</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Complete risk assessment for the task
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Can the work be done from ground level?
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Select appropriate access equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Check all equipment before use
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Verify scaffold tags and inspection records
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">During Work</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Check weather - suspend if unsafe
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Ensure rescue plan is in place
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Maintain 3 points of contact on ladders
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Keep area below clear of dropped objects
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Complete electrical isolation before work
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow transition-colors flex items-center justify-between">
                  <span>Do I need training to use a ladder?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  While formal certification isn't required for ladder use, competency training is necessary. Users must understand correct positioning (1:4 ratio), 3 points of contact, securing methods, inspection requirements, and appropriate use limits. Many employers provide ladder safety training.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow transition-colors flex items-center justify-between">
                  <span>How often must scaffolds be inspected?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Scaffolds must be inspected before first use, after substantial alteration, after any event likely to affect stability (such as adverse weather), and at regular intervals not exceeding 7 days. Inspection records must be kept and available on site.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow transition-colors flex items-center justify-between">
                  <span>Can I use a ladder for electrical work?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Ladders may be used for short-duration electrical work where risk assessment shows they are appropriate. However, work requiring both hands free, heavy lifting, or extended duration should use alternative access equipment. Never use metal ladders near live electrical equipment.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow transition-colors flex items-center justify-between">
                  <span>What IPAF categories do electricians typically need?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Most electricians benefit from Category 3a (scissor lifts) and Category 3b (boom lifts). The specific category depends on the MEWP types used on your sites. Training is valid for 5 years, and familiarisation is required for each specific machine type.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow transition-colors flex items-center justify-between">
                  <span>What are fragile surfaces and how do I work near them?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Fragile surfaces include roof lights, corroded metal sheeting, cement fibre sheets, and glass panels. Never step directly on fragile materials - they can give way without warning. Use crawling boards to distribute weight, install barriers to prevent approach, and ensure clear warning signs are displayed.
                </p>
              </details>
            </div>
          </div>

          {/* QUICK REFERENCE / POCKET GUIDE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide - Working at Height</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">The Hierarchy:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>1. <strong className="text-white">AVOID</strong> working at height</li>
                  <li>2. <strong className="text-white">PREVENT</strong> falls with equipment</li>
                  <li>3. <strong className="text-white">MITIGATE</strong> fall consequences</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Ladder Safety:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>* 1:4 ratio (1m out per 4m up)</li>
                  <li>* 3 points of contact always</li>
                  <li>* Extend 1m above landing</li>
                  <li>* Secure top and/or bottom</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#1a1a1a] border border-white/10">
              <p className="text-white/80 text-sm text-center">
                <strong className="text-elec-yellow">Remember:</strong> Falls from height are a leading cause of workplace deaths - EVERY task at height deserves proper planning and protection!
              </p>
            </div>
          </div>

          {/* QUIZ */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <Quiz questions={quizQuestions} />
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              to="../level3-module1-section1"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Section 1
            </Link>
            <Link
              to="../level3-module1-section1-7"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-elec-yellow text-[#1a1a1a] font-medium hover:bg-elec-yellow/90 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              Next: 1.7 Employer vs Employee Responsibilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section1_6;
