/**
 * Level 3 Module 4 Section 5.1 - Selecting Correct Repair Methods
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Selecting Correct Repair Methods - Level 3 Module 4 Section 5.1";
const DESCRIPTION = "Master the selection of appropriate repair techniques including replacement, re-termination, re-insulation, and understanding when each method is most suitable for fault rectification.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When should complete cable replacement be chosen over re-termination?",
    options: [
      "When the cable is simply loose at the terminal",
      "When the cable shows signs of thermal damage along its length",
      "When the connection needs cleaning",
      "When the circuit breaker has tripped"
    ],
    correctIndex: 1,
    explanation: "Complete cable replacement is necessary when damage extends beyond the termination point. If thermal damage has affected the cable insulation along its length, re-termination alone would leave damaged cable in the installation, creating ongoing fire and shock risks."
  },
  {
    id: "check-2",
    question: "What is the primary consideration when selecting a repair method?",
    options: [
      "The cheapest option available",
      "The quickest method to restore power",
      "Ensuring the repair meets BS 7671 requirements and will be durable",
      "Using the same method as the original installation"
    ],
    correctIndex: 2,
    explanation: "While cost and time are factors, the primary consideration must always be that the repair meets BS 7671:2018 requirements and will provide a durable, safe solution. A cheap or quick fix that fails again creates more problems and potential safety hazards."
  },
  {
    id: "check-3",
    question: "When is re-insulation using heatshrink an appropriate repair method?",
    options: [
      "When conductors are completely severed",
      "When localised mechanical damage has exposed conductors but the cable is otherwise sound",
      "When the cable is undersized for the load",
      "When the insulation has degraded throughout the cable run"
    ],
    correctIndex: 1,
    explanation: "Re-insulation with heatshrink is appropriate when there is localised mechanical damage exposing conductors, but the cable and its insulation are otherwise in good condition. It provides IP2X protection and restores the insulation barrier at the specific point of damage."
  },
  {
    id: "check-4",
    question: "What must be verified before deciding on a repair method?",
    options: [
      "Only the visible symptoms of the fault",
      "The full extent of the damage and any underlying causes",
      "The customer's budget for repairs",
      "Whether spare parts are in stock"
    ],
    correctIndex: 1,
    explanation: "Before selecting a repair method, you must determine the full extent of damage and identify underlying causes. Treating symptoms without addressing root causes (like overloading causing overheating) means the fault will likely recur. Thorough diagnosis informs appropriate repair selection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A high resistance joint has caused localised overheating at a socket outlet terminal. The cable is discoloured for 50mm from the terminal. What is the most appropriate repair?",
    options: [
      "Simply re-tighten the terminal",
      "Cut back the cable to sound insulation and re-terminate",
      "Apply insulating tape over the discolouration",
      "Replace the entire circuit cable"
    ],
    correctAnswer: 1,
    explanation: "Cutting back to sound insulation and re-terminating removes the damaged section while preserving the cable. Simply re-tightening leaves damaged insulation that could fail. Tape is not an acceptable permanent repair. Full replacement is unnecessary if damage is localised."
  },
  {
    id: 2,
    question: "During fault diagnosis, you discover a cable has been rodent-damaged in a loft space with multiple points of insulation damage. What repair approach should be taken?",
    options: [
      "Apply heatshrink to each damaged point",
      "Use junction boxes to bypass damaged sections",
      "Replace the affected cable section entirely",
      "Wrap the damaged areas with self-amalgamating tape"
    ],
    correctAnswer: 2,
    explanation: "Multiple points of damage indicate the cable's integrity is compromised throughout. Replacement ensures the installation is fully compliant with BS 7671. Multiple joints or tape repairs create future failure points and don't meet the standard for permanent repairs."
  },
  {
    id: 3,
    question: "According to BS 7671, what is the minimum acceptable method for making permanent conductor joints?",
    options: [
      "Twist connection with insulating tape",
      "Mechanical connector or soldered joint with appropriate enclosure",
      "Wire nuts without enclosure",
      "Crimped connection without insulation"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 526.1 requires that connections be made using appropriate methods - mechanical connectors, soldering, welding, or similar - and must be accessible, enclosed, and provide adequate mechanical strength and insulation. Tape alone is not acceptable."
  },
  {
    id: 4,
    question: "A lighting circuit has tripped due to an earth fault. Investigation reveals a luminaire has failed, causing the fault. What is the correct repair approach?",
    options: [
      "Replace the fuse with a higher rating",
      "Bypass the RCD protection for that circuit",
      "Replace or repair the faulty luminaire and re-test the circuit",
      "Simply reset the circuit breaker without investigation"
    ],
    correctAnswer: 2,
    explanation: "The root cause is the faulty luminaire, which must be replaced or repaired. After repair, the circuit must be re-tested to confirm the earth fault is cleared and the installation is safe. Never bypass protection or use higher rated devices to mask faults."
  },
  {
    id: 5,
    question: "When selecting replacement accessories (sockets, switches), what BS 7671 requirement must be met?",
    options: [
      "They must be the same colour as originals",
      "They must be from the same manufacturer",
      "They must be suitable for the location and meet relevant product standards",
      "They must be the cheapest available option"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 511.1 requires that equipment be suitable for the installation conditions including voltage, current, frequency, environment, and any special conditions. Accessories must also comply with relevant product standards (e.g., BS 1363 for socket-outlets)."
  },
  {
    id: 6,
    question: "A cable has sustained mechanical damage where it passes through a metal enclosure without a grommet. What repairs are required?",
    options: [
      "Only fit a grommet to prevent future damage",
      "Replace the damaged cable section and fit appropriate grommet or bushing",
      "Apply tape to the damaged area",
      "Bend the metal away from the cable"
    ],
    correctAnswer: 1,
    explanation: "Both the damage and the cause must be addressed. The damaged cable must be replaced or cut back if damage is at the entry point. Additionally, an appropriate grommet or bushing must be fitted per BS 7671 Regulation 522.8.1 to prevent future damage."
  },
  {
    id: 7,
    question: "What documentation should inform your choice of repair method for an existing installation?",
    options: [
      "Only the current fault symptoms",
      "Original installation certificate, previous test results, and circuit schedules if available",
      "The customer's verbal description",
      "No documentation is needed for repairs"
    ],
    correctAnswer: 1,
    explanation: "Previous documentation helps understand the installation's design intent, original specifications, and history. This informs repair decisions - for example, knowing the original cable type helps select appropriate replacement cable, and previous test results show normal values to compare."
  },
  {
    id: 8,
    question: "During repair of a ring final circuit, you discover the ring has been broken (effectively making it a radial). What is the correct approach?",
    options: [
      "Leave it as a radial since it still works",
      "Restore the ring continuity and verify by testing",
      "Add additional sockets to compensate",
      "Increase the MCB rating"
    ],
    correctAnswer: 1,
    explanation: "A ring circuit is designed as a ring to share current between both legs. Breaking the ring means full circuit current flows through one leg only, potentially causing overloading. The ring must be restored and verified by ring continuity testing (r1, rn, r2) per BS 7671."
  },
  {
    id: 9,
    question: "What factor determines whether a cable joint is acceptable within a wall or ceiling void?",
    options: [
      "Joints are never acceptable in concealed locations",
      "The joint must be in an accessible enclosure or use maintenance-free jointing methods",
      "Any joint method is acceptable if concealed",
      "Only solder joints are permitted"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 526.3 requires connections to be accessible for inspection, testing, and maintenance. If concealment is unavoidable, maintenance-free methods (like certain proprietary jointing systems) may be used, or the joint must be in an accessible enclosure."
  },
  {
    id: 10,
    question: "When replacing a faulty MCB, what must you verify about the replacement device?",
    options: [
      "Only that it has the same current rating",
      "Rating, type characteristic, breaking capacity, and compatibility with the board",
      "Just that it physically fits the board",
      "Only the manufacturer name matches"
    ],
    correctAnswer: 1,
    explanation: "Replacement MCBs must match all relevant specifications: current rating, type (B, C, D), breaking capacity suitable for the prospective fault current, and physical/electrical compatibility with the consumer unit. BS 7671 requires protective devices to be correctly rated and coordinated."
  },
  {
    id: 11,
    question: "A customer wants the cheapest possible repair for a fault you've diagnosed. How should you respond?",
    options: [
      "Always provide the cheapest option as requested",
      "Explain the options, their implications for safety and durability, and recommend the compliant solution",
      "Refuse to do any work unless they accept the most expensive option",
      "Perform a temporary repair without proper notification"
    ],
    correctAnswer: 1,
    explanation: "Professional practice requires explaining options and their implications. You must recommend compliant solutions and explain risks of inadequate repairs. If a customer insists on non-compliant work, you should decline. Never compromise safety for cost without proper informed consent."
  },
  {
    id: 12,
    question: "After completing a repair involving replacement of a circuit cable, what testing is required before the circuit can be returned to service?",
    options: [
      "No testing is needed for repairs",
      "Only a visual inspection",
      "Relevant tests from the initial verification sequence for the affected circuit",
      "Only functional testing of the load"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires that after alterations or repairs, relevant tests from the initial verification sequence be performed. For cable replacement, this includes continuity, insulation resistance, polarity, earth fault loop impedance, and functional tests. Results must be recorded."
  }
];

const faqs = [
  {
    question: "Can I use the same cable for a repair that was used in the original installation even if standards have changed?",
    answer: "Generally yes, provided the cable still meets current BS 7671 requirements and is suitable for the installation conditions. However, if the original cable type is no longer compliant (e.g., doesn't meet current fire performance requirements in escape routes), you must use compliant cable for the repair. The repair must meet current standards, not historical ones."
  },
  {
    question: "Is it acceptable to use terminal block connectors ('chocolate blocks') for permanent cable joints?",
    answer: "Strip terminal connectors can be used but have limitations. They must be in an accessible, appropriate enclosure (junction box), properly rated for the circuit, and the conductors must be correctly prepared and secured. For concealed locations, maintenance-free proprietary connectors (like Wago or similar) are often preferred as they provide more reliable, tamper-resistant connections."
  },
  {
    question: "When should I recommend complete rewire versus localised repairs?",
    answer: "Consider complete rewire when: the installation is very old (pre-1970s wiring types), multiple circuits show deterioration, insulation resistance is generally poor across the installation, there's evidence of systemic problems (perished insulation, outdated earthing), or cumulative repair costs approach rewire cost. Individual repairs suit isolated faults in otherwise sound installations."
  },
  {
    question: "How do I decide between repairing and replacing equipment like consumer units?",
    answer: "Replace when: the unit doesn't meet current standards (particularly Amendment 3 requirements for consumer unit enclosure material in domestic premises), parts aren't available, damage is structural, or the unit lacks capacity for proper protection. Repair (component replacement) is acceptable when the unit meets standards and only a specific component has failed."
  },
  {
    question: "What if the repair I need to make requires altering the original circuit design?",
    answer: "Alterations affecting the original design require careful consideration. Changes must still meet BS 7671 requirements. For example, if cable damage means a shorter route, you must verify cable sizing is still adequate and that volt drop remains acceptable. Significant changes may require a Minor Works Certificate or full EIC rather than just repair documentation."
  },
  {
    question: "Can repairs be completed in stages, or must everything be done at once?",
    answer: "Staged repairs can be acceptable if each stage leaves the installation safe. Dangerous conditions must be made safe immediately. Priority repairs (C2 coded items) should be completed promptly. Lower priority improvements can be scheduled. However, you must ensure partial repairs don't create new hazards and that the customer understands the status at each stage."
  }
];

const Level3Module4Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Selecting Correct Repair Methods
          </h1>
          <p className="text-white/80">
            Choosing appropriate techniques: replacement, re-termination, and re-insulation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Replacement:</strong> When component/cable is beyond repair</li>
              <li><strong>Re-termination:</strong> For loose or damaged connections</li>
              <li><strong>Re-insulation:</strong> For localised insulation damage</li>
              <li><strong>Always:</strong> Address root cause, not just symptoms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Principle</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> Repairs must meet current standards</li>
              <li><strong>Durability:</strong> Repair should last, not just work</li>
              <li><strong>Documentation:</strong> Record what was done and why</li>
              <li><strong>Testing:</strong> Verify repair before returning to service</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate repair methods based on fault diagnosis",
              "Understand when replacement is necessary versus repair",
              "Apply correct re-termination techniques for various conductor types",
              "Use re-insulation methods that meet BS 7671 requirements",
              "Consider cost-effectiveness while maintaining compliance",
              "Document repair decisions and justify chosen methods"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Repair Decision Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Repair Decision Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct repair method is not simply about fixing what's broken - it's about restoring the installation to a safe, compliant condition that will remain reliable. This decision process begins before you pick up a tool, starting with thorough diagnosis and assessment of the full extent of damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The decision framework considers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Extent of damage:</strong> Is damage localised or does it affect a wider area?</li>
                <li><strong>Root cause:</strong> What caused the fault and has this been addressed?</li>
                <li><strong>Component condition:</strong> Is the affected component repairable or must it be replaced?</li>
                <li><strong>Compliance:</strong> Will the repair meet current BS 7671:2018 requirements?</li>
                <li><strong>Durability:</strong> Will the repair provide a lasting solution?</li>
                <li><strong>Cost-effectiveness:</strong> Is repair economical versus replacement?</li>
              </ul>
            </div>

            <p>
              A common mistake is treating only the visible symptom. For example, finding a burned terminal and simply replacing the socket outlet without investigating why it overheated. If the cause was an overloaded circuit or loose connection at the consumer unit, the problem will recur. Proper repair addresses both the damage and its cause.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The goal is not just to make something work, but to restore it to a safe, compliant, and durable condition. A repair that fails after six months isn't a successful repair - it's a delayed failure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Replacement Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Replacement Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Replacement is often the most appropriate repair method when damage is extensive, when components have failed completely, or when the original installation no longer meets current standards. While replacement typically costs more than repair, it often provides the most reliable long-term solution.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Replace Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Thermal damage extending beyond termination point</li>
                  <li>Multiple points of mechanical damage</li>
                  <li>Insulation degradation throughout (low IR readings)</li>
                  <li>Cable type no longer meets standards for location</li>
                  <li>Undersized cable discovered during investigation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Replace Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Structural damage to enclosures</li>
                  <li>Consumer units not meeting Amendment 3 requirements</li>
                  <li>Obsolete equipment with no spare parts</li>
                  <li>Equipment no longer suitable for changed conditions</li>
                  <li>Multiple component failures indicating systemic issues</li>
                </ul>
              </div>
            </div>

            <p>
              When replacing cables, ensure the replacement meets current standards. BS 7671 requires cables to be suitable for the installation conditions, correctly sized for the load and protective device, and meet any special requirements for the location (such as fire performance in escape routes per Regulation 422.2).
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Replacing a damaged section of ring final circuit cable requires matching the conductor size (typically 2.5mm²), insulation type (usually 70°C thermoplastic), and ensuring any joints are made correctly using appropriate enclosures and connectors per Regulation 526.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Re-termination Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Re-termination Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Re-termination is appropriate when the connection itself has failed but the cable and equipment are otherwise sound. This is common for faults caused by loose connections, thermal cycling, or initial poor workmanship. Proper re-termination technique is crucial - a poorly made connection will fail again.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Re-termination procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Cut back to sound conductor:</strong> Remove any section with heat damage, corrosion, or work hardening</li>
                <li><strong>2. Prepare correctly:</strong> Strip to correct length, don't damage conductor strands</li>
                <li><strong>3. Use appropriate method:</strong> Screw terminals, compression fittings, or push-fit connectors as appropriate</li>
                <li><strong>4. Secure properly:</strong> Correct torque for screw terminals, full insertion for push-fit</li>
                <li><strong>5. Verify:</strong> Check connection is mechanically sound and conductors are fully captured</li>
              </ul>
            </div>

            <p>
              For stranded conductors, take particular care that all strands are captured in the terminal. A common cause of high resistance joints is loose strands that escape the terminal clamp. For larger conductors, consider using ferrules to keep strands together and provide a better termination surface.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Screw Terminals</p>
                <p className="text-white/90 text-xs">Tighten to manufacturer's torque - typically 0.5-1.2Nm for accessories</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Push-fit Connectors</p>
                <p className="text-white/90 text-xs">Insert to gauge mark, verify by gentle pull test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Compression Lugs</p>
                <p className="text-white/90 text-xs">Use correct size die and verify crimp with pull test</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> BS 7671 Regulation 526.2 requires connections to remain effective for electrical continuity, mechanical strength, and protection against corrosion throughout the installation's intended life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Re-insulation Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Re-insulation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Re-insulation is appropriate when localised damage has exposed conductors but the cable and its insulation are otherwise in good condition. The key is that damage must be genuinely localised - if insulation has degraded generally (indicated by low insulation resistance readings throughout), re-insulation of visible damage points won't address the underlying problem.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Acceptable re-insulation methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heatshrink sleeving:</strong> Provides IP2X protection when correctly sized and applied with heat gun</li>
                <li><strong>Self-amalgamating tape:</strong> Suitable for some applications, creates waterproof seal when stretched and wrapped</li>
                <li><strong>Proprietary repair kits:</strong> Some manufacturers provide kits for cable repairs meeting specific standards</li>
                <li><strong>Junction box enclosure:</strong> Cutting and rejoining with proper connectors in accessible enclosure</li>
              </ul>
            </div>

            <p>
              Standard PVC insulating tape, while useful for temporary protection during work, is not generally considered an acceptable permanent repair method. It can degrade over time, unwrap, and doesn't provide the same level of protection as purpose-designed solutions. For accessible locations where tape might be considered, heatshrink is almost always the better choice.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A cable has been damaged by a nail passing through a wall. The nail has been removed, leaving a clean hole through the outer sheath and one conductor's insulation. If the conductor itself is undamaged, cleaning the area and applying appropriate heatshrink sleeving can provide an effective repair. However, if the conductor is nicked or damaged, the cable section should be replaced.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Section 05: Component-Specific Repair Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Component-Specific Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different components require different approaches to repair. Understanding the specific requirements for each type of equipment ensures your repairs meet appropriate standards and will provide reliable service.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consumer Units and Distribution Boards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check if replacement MCBs/RCBOs are available for the board type</li>
                  <li>Verify breaking capacity is adequate for installation PSCC</li>
                  <li>For domestic premises, Amendment 3 requires non-combustible enclosures</li>
                  <li>Consider complete replacement if multiple issues or board is obsolete</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accessories (Sockets, Switches, etc.)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Replacement must suit the location (IP rating, etc.)</li>
                  <li>Must comply with relevant product standards</li>
                  <li>Check mounting box condition - damaged boxes should be replaced</li>
                  <li>Ensure earth terminal is adequate for circuit CPC size</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Light Fittings and Luminaires</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Replace like-for-like where possible for consistent performance</li>
                  <li>Consider energy efficiency when upgrading (LED replacements)</li>
                  <li>Verify thermal rating of supply cable suits replacement fitting</li>
                  <li>Maintain fire barrier integrity in ceiling penetrations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed Equipment and Appliances</p>
                <ul className="text-sm text-white space-y-1">
                  <li>May be manufacturer repair only (warranties, specialist knowledge)</li>
                  <li>Verify supply capacity if replacing with different equipment</li>
                  <li>Check isolation and switching provisions remain adequate</li>
                  <li>Update labelling if equipment type changes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Repairs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm the full extent of damage through testing and inspection</li>
                <li>Identify and address the root cause of the fault</li>
                <li>Plan the repair method and gather required materials</li>
                <li>Ensure you have appropriate test equipment to verify the repair</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Material Selection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use cables and equipment rated for the application</li>
                <li>Match conductor sizes and types to existing installation where appropriate</li>
                <li>Select accessories suitable for the environmental conditions</li>
                <li>Use connectors and enclosures that meet BS 7671 requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Quick fixes:</strong> Don't use temporary solutions as permanent repairs</li>
                <li><strong>Undersizing:</strong> Never replace cable with smaller size even for short sections</li>
                <li><strong>Ignoring cause:</strong> Always address what caused the fault, not just the damage</li>
                <li><strong>Skipping tests:</strong> Always verify repairs with appropriate testing</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Repair Method Selection</p>
                <ul className="space-y-0.5">
                  <li>Localised terminal damage = Re-terminate</li>
                  <li>Localised insulation damage = Re-insulate</li>
                  <li>Extended damage = Replace section</li>
                  <li>Systemic deterioration = Consider rewire</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Reg 526 - Connections and joints</li>
                  <li>Reg 511 - Equipment selection</li>
                  <li>Reg 522 - External influences</li>
                  <li>Reg 422 - Fire precautions</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 4.5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-2">
              Next: BS7671 Compliance After Repair
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section5_1;
