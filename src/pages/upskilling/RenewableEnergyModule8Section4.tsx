import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fire Safety, AC/DC Isolation & Labelling Standards - Renewable Energy Module 8";
const DESCRIPTION = "Learn essential fire safety requirements, AC and DC isolation procedures, and labelling standards for solar PV and battery storage installations to ensure safe systems.";

const quickCheckQuestions = [
  {
    id: "fire-safety-check-1",
    question: "Why do solar PV systems present unique fire safety challenges?",
    options: [
      "They generate excessive heat",
      "DC circuits remain energised when sunlight is present, even when AC is isolated",
      "Inverters are fire hazards",
      "Solar panels are flammable"
    ],
    correctIndex: 1,
    explanation: "Solar PV systems generate DC power whenever sunlight reaches the panels, meaning DC circuits can remain energised even when the AC supply is isolated. This requires specific isolation and labelling procedures."
  },
  {
    id: "fire-safety-check-2",
    question: "What is the primary purpose of DC isolation switches in PV systems?",
    options: [
      "To improve system efficiency",
      "To enable safe maintenance and emergency disconnection of DC circuits",
      "To regulate power output",
      "To connect to the grid"
    ],
    correctIndex: 1,
    explanation: "DC isolation switches allow safe disconnection of DC circuits for maintenance work and emergency situations, enabling personnel to de-energise sections of the system safely."
  },
  {
    id: "fire-safety-check-3",
    question: "What information must be displayed on fire service labels near the meter?",
    options: [
      "Customer contact details only",
      "Presence and location of solar PV/battery systems and isolation switch locations",
      "System efficiency data",
      "Installation date only"
    ],
    correctIndex: 1,
    explanation: "Fire service labels must clearly indicate the presence of solar PV and/or battery systems, their locations, and the positions of all isolation devices to enable safe emergency response."
  },
  {
    id: "fire-safety-check-4",
    question: "Where should battery storage systems NOT be installed?",
    options: [
      "In garages",
      "In utility rooms",
      "In escape routes or near means of escape",
      "In external enclosures"
    ],
    correctIndex: 2,
    explanation: "Battery storage systems should not be installed in escape routes, including hallways that form part of the means of escape, due to fire safety risks associated with lithium-ion batteries."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What standard specifically addresses labelling requirements for PV systems?",
    options: [
      "BS 7671 only",
      "BS EN 62446 and BS 7671",
      "G98 only",
      "MCS guidance only"
    ],
    correctAnswer: 1,
    explanation: "BS EN 62446 (PV system documentation, commissioning and maintenance) and BS 7671 (Wiring Regulations) both contain requirements for labelling of PV systems and associated electrical equipment."
  },
  {
    id: 2,
    question: "What colour are danger labels indicating DC voltage hazards typically?",
    options: [
      "Blue on white",
      "Yellow with black text/symbols",
      "Green on white",
      "Red on blue"
    ],
    correctAnswer: 1,
    explanation: "Danger labels for DC voltage hazards are typically yellow with black text and symbols, conforming to safety sign standards. This colour combination provides high visibility and indicates caution."
  },
  {
    id: 3,
    question: "At what voltage level do DC circuits require particular safety consideration?",
    options: [
      "Any DC voltage",
      "DC voltages exceeding 120V are considered higher risk",
      "Only above 400V DC",
      "DC is always safer than AC"
    ],
    correctAnswer: 1,
    explanation: "While all DC circuits require proper safety measures, DC voltages exceeding 120V are considered higher risk and require particular attention to isolation, labelling, and safe working procedures."
  },
  {
    id: 4,
    question: "What is the purpose of a rapid shutdown system in solar PV?",
    options: [
      "To increase efficiency",
      "To quickly reduce DC voltage at the array to safe levels",
      "To disconnect from the grid",
      "To prevent overcharging batteries"
    ],
    correctAnswer: 1,
    explanation: "Rapid shutdown systems quickly reduce DC voltage at the array level to safe levels within a short time of activation, enhancing safety for emergency responders and maintenance personnel."
  },
  {
    id: 5,
    question: "Where must isolation switch locations be documented?",
    options: [
      "Only in installer records",
      "In handover documentation and displayed on warning labels",
      "Only on the inverter",
      "Only in DNO records"
    ],
    correctAnswer: 1,
    explanation: "Isolation switch locations must be documented in customer handover documentation and displayed on warning labels at key locations including the meter position, to enable safe emergency response."
  },
  {
    id: 6,
    question: "What fire detection consideration applies to battery storage installations?",
    options: [
      "No additional detection required",
      "Smoke detection coverage may need extending to battery locations",
      "Only heat detectors are suitable",
      "Fire detection is optional"
    ],
    correctAnswer: 1,
    explanation: "Battery storage locations may require additional fire detection coverage. If the installation location is not covered by existing detection, extending smoke detection systems may be necessary."
  },
  {
    id: 7,
    question: "What should cable labels indicate on DC cables?",
    options: [
      "Cable colour only",
      "DC voltage warning and polarity identification",
      "Installation date",
      "Installer name"
    ],
    correctAnswer: 1,
    explanation: "DC cable labels should indicate voltage warnings (that DC is present) and may include polarity identification (positive/negative) to aid safe identification during maintenance."
  },
  {
    id: 8,
    question: "What isolation arrangement is required for maintenance of string inverters?",
    options: [
      "AC isolation only",
      "Both AC and DC isolation points that can be locked off",
      "Only the main switch",
      "No isolation required"
    ],
    correctAnswer: 1,
    explanation: "Safe maintenance of string inverters requires both AC isolation (from the supply/consumer unit) and DC isolation (from the PV array) that can be locked off to prevent inadvertent re-energisation."
  },
  {
    id: 9,
    question: "What mounting surface requirement applies to battery installations?",
    options: [
      "Any surface is acceptable",
      "Non-combustible or fire-resistant mounting surfaces are preferred",
      "Only external mounting",
      "Only floor mounting"
    ],
    correctAnswer: 1,
    explanation: "Battery systems should ideally be mounted on non-combustible or fire-resistant surfaces to minimise fire spread risk in the event of a thermal incident. MCS guidance addresses mounting requirements."
  },
  {
    id: 10,
    question: "What information should the inverter label include?",
    options: [
      "Only the manufacturer name",
      "AC and DC ratings, isolation locations, and safety warnings",
      "Only the serial number",
      "Only the installation date"
    ],
    correctAnswer: 1,
    explanation: "Inverter labels should include AC and DC voltage and current ratings, locations of isolation switches, appropriate safety warnings, and identification that this is part of a PV/generation system."
  }
];

const faqs = [
  {
    question: "What labels are required for a domestic PV installation?",
    answer: "Required labels include: warning labels on the consumer unit indicating PV supply; DC warning labels on the inverter, DC isolator, and along DC cable routes; fire service label near the meter showing system presence and isolation locations; and labels on AC isolation devices. Labels must be durable and legible for the life of the installation."
  },
  {
    question: "Can I install batteries in an integral garage?",
    answer: "Battery installation in integral garages may be acceptable but requires careful consideration. The garage should not form part of an escape route, fire detection should cover the space, and separation from living areas should be maintained. Some local authorities and fire services have specific requirements - check local guidance and consider fire service access."
  },
  {
    question: "What is required for DC cable protection in roof spaces?",
    answer: "DC cables in roof spaces should be protected from physical damage, supported appropriately, and routed away from other services where possible. Cable ratings must account for elevated temperatures in roof spaces. Cables should be clearly labelled at regular intervals to indicate they are DC PV cables that may be live when the sun is shining."
  },
  {
    question: "How do I demonstrate compliance with fire safety requirements?",
    answer: "Documentation should include risk assessment for battery location, photographic evidence of labels and their locations, records of fire detection arrangements, and confirmation that installation follows MCS standards (which incorporate fire safety requirements). The customer handover pack should include emergency procedures and shutdown instructions."
  },
  {
    question: "Are arc fault detection devices (AFDDs) required for PV systems?",
    answer: "While not currently mandatory in BS 7671 for all PV circuits, AFDDs provide additional protection against arc faults which can cause fires. Some installations, particularly those in higher-risk locations, may benefit from AFDD protection. MCS and manufacturer guidance may recommend AFDDs for certain applications."
  },
  {
    question: "What emergency information should be provided to customers?",
    answer: "Customers should receive clear instructions on isolation procedures, including which switches to operate in an emergency. They should know what to tell emergency services (that solar PV/batteries are present), understand that DC may remain live until panels are covered or it gets dark, and have contact details for their installer for non-emergency technical issues."
  }
];

const RenewableEnergyModule8Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-8">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Fire Safety & Isolation</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 8 - Section 4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Fire Safety, AC/DC Isolation & Labelling
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Essential safety requirements for solar PV and battery storage installations
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">DC Hazard:</span> PV arrays remain energised whenever illuminated
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Dual Isolation:</span> Both AC and DC isolation points required
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Clear Labelling:</span> Fire service and warning labels essential
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Battery Location:</span> Must not compromise escape routes
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Fire risks specific to PV and battery systems",
            "AC and DC isolation requirements and procedures",
            "Labelling standards and placement requirements",
            "Battery storage fire safety considerations",
            "Emergency procedures and documentation"
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Fire Safety Principles</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Solar PV and battery storage systems introduce fire safety considerations that differ from conventional electrical installations. Understanding these risks enables proper system design and installation that minimises hazards.
            </p>
            <p>
              <span className="text-white font-medium">PV-Specific Risks:</span> Solar panels generate DC electricity whenever illuminated. Unlike AC systems that can be fully isolated at a single point, the DC side of a PV system remains energised from the panels down to the DC isolator. This means even with AC power isolated, DC voltages can be present.
            </p>
            <p>
              <span className="text-white font-medium">Arc Fault Hazards:</span> DC arcs in PV systems can sustain and generate significant heat, potentially causing fires. Poor connections, damaged cables, or faulty components can initiate arcing. Proper installation quality, appropriate cable management, and regular inspection help prevent arc faults.
            </p>
            <p>
              <span className="text-white font-medium">Battery Risks:</span> Lithium-ion batteries can experience thermal runaway if damaged, overcharged, or subjected to manufacturing defects. This can result in fires that are difficult to extinguish and produce toxic fumes. Proper system design, quality products, and appropriate installation locations mitigate these risks.
            </p>
            <p>
              <span className="text-white font-medium">Emergency Response:</span> Fire services need to know that PV and battery systems are present to respond safely. Clear labelling, accessible isolation points, and customer awareness of emergency procedures all contribute to safe incident response.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">AC and DC Isolation Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Effective isolation arrangements enable safe maintenance, emergency disconnection, and system testing. Both AC and DC sides of solar PV installations require properly rated isolation devices.
            </p>
            <p>
              <span className="text-white font-medium">AC Isolation:</span> The AC side requires isolation from the consumer unit or distribution board. This is typically provided by an AC isolator adjacent to the inverter and a dedicated circuit breaker or switch in the consumer unit. These devices must be accessible and clearly labelled.
            </p>
            <p>
              <span className="text-white font-medium">DC Isolation:</span> DC isolators disconnect the PV array from the inverter. They must be rated for DC use at the appropriate voltage and current levels. DC-rated devices are essential as AC-rated switches cannot safely break DC circuits. Locating the DC isolator adjacent to the inverter provides a clear isolation point.
            </p>
            <p>
              <span className="text-white font-medium">Rooftop Isolation:</span> For larger systems or where rapid shutdown is required, isolation at roof level may be necessary. This could include string-level isolation or module-level power electronics (MLPE) that can rapidly de-energise conductors on the roof.
            </p>
            <p>
              <span className="text-white font-medium">Lockable Isolation:</span> Isolation devices should be capable of being locked in the off position to prevent inadvertent re-energisation during maintenance. This enables safe working practices in accordance with isolation and permit-to-work procedures.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Labelling Standards</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Comprehensive labelling is essential for safe operation, maintenance, and emergency response. Labels must be durable, clearly legible, and positioned where they will be seen by those who need the information.
            </p>
            <p>
              <span className="text-white font-medium">Fire Service Label:</span> A label must be displayed at or near the electricity meter to alert emergency services to the presence of PV and/or battery systems. This label should indicate that a PV system is installed, the location of DC and AC isolators, the presence and location of any battery storage, and emergency shutdown procedures.
            </p>
            <p>
              <span className="text-white font-medium">Consumer Unit Labels:</span> The consumer unit must be labelled to indicate that it is supplied by a PV system and show the location of isolation devices. Warning text should indicate that the installation may still be energised from the PV system after isolation from the consumer unit.
            </p>
            <p>
              <span className="text-white font-medium">DC Warning Labels:</span> All DC components including the inverter, DC isolator, junction boxes, and cable routes should bear DC warning labels. These alert personnel that DC voltage may be present and that circuits can remain live when illuminated.
            </p>
            <p>
              <span className="text-white font-medium">Inverter Labels:</span> Inverters should display their electrical ratings, the presence and location of isolation devices, and appropriate warning symbols. Clear identification helps maintenance personnel and emergency responders understand the installation.
            </p>
            <p>
              <span className="text-white font-medium">Label Standards:</span> Labels should comply with relevant standards for safety signs, using appropriate colours and symbols. They must be UV-resistant and durable for external locations, remaining legible for the life of the installation.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Battery Storage Fire Safety</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Battery storage systems require specific fire safety considerations due to the energy storage density of lithium-ion cells and their potential failure modes.
            </p>
            <p>
              <span className="text-white font-medium">Location Selection:</span> Batteries should not be installed in escape routes or locations where fire could impede evacuation. Suitable locations include garages, utility rooms, or external enclosures. The chosen location should allow fire detection, have adequate ventilation, and provide separation from living spaces.
            </p>
            <p>
              <span className="text-white font-medium">Mounting Requirements:</span> Install batteries on non-combustible or fire-resistant surfaces where possible. Maintain clearances recommended by manufacturers to allow air circulation and heat dissipation. Avoid installation above heat sources or in locations prone to high temperatures.
            </p>
            <p>
              <span className="text-white font-medium">Fire Detection:</span> Ensure fire detection coverage extends to battery locations. If existing smoke detection does not cover the installation area, additional detectors may be required. Interconnection with the dwelling's detection system ensures occupants are alerted to any incident.
            </p>
            <p>
              <span className="text-white font-medium">Ventilation:</span> While modern lithium-ion batteries are sealed units under normal operation, ventilation in the installation area helps dissipate heat during normal charging and prevents accumulation of any gases in the unlikely event of cell venting.
            </p>
            <p>
              <span className="text-white font-medium">Separation:</span> Consider separation between multiple battery units and from other combustible materials. Manufacturer guidance on installation clearances should be followed. For larger installations, compartmentation may be required.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Documentation and Procedures</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Proper documentation supports safe operation throughout the system's life and provides essential information for emergency response.
            </p>
            <p>
              <span className="text-white font-medium">Handover Information:</span> Customers must receive clear information about their system including location of all isolation devices, step-by-step emergency shutdown procedure, what to tell emergency services, restrictions on system use, and maintenance requirements.
            </p>
            <p>
              <span className="text-white font-medium">Emergency Shutdown Card:</span> Provide a simple, laminated card showing emergency shutdown steps that can be kept near the consumer unit or meter. This enables anyone in the property to safely isolate the system if needed.
            </p>
            <p>
              <span className="text-white font-medium">Installation Records:</span> Retain records including photographs of label locations and content, schematic diagrams showing isolation points, risk assessment for battery location, and test records confirming isolation device function.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Procedures:</span> Document safe isolation procedures for routine maintenance, including confirmation of isolation before work, testing for absence of voltage, and safe re-energisation procedures.
            </p>
            <p>
              <span className="text-white font-medium">Updates:</span> If the system is modified, update all documentation, labels, and handover information to reflect changes. Ensuring documentation remains accurate is essential for ongoing safety.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Quality labels:</span> Invest in high-quality, durable labels. Cheap labels fade, peel, or become illegible, compromising safety information. Professional labelling reflects well on installation quality.
            </p>
            <p>
              <span className="text-white font-medium">Photograph everything:</span> Take photographs of all labels, isolation points, and cable routes as part of commissioning. These records support future maintenance and demonstrate compliance if questions arise.
            </p>
            <p>
              <span className="text-white font-medium">Customer education:</span> Take time to explain isolation procedures to customers during handover. Demonstrate how to operate isolation switches and explain when and why they might need to use them.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Fire Safety and Isolation Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-5">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section4;
