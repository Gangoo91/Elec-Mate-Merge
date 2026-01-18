/**
 * Level 3 Module 2 Section 3.4 - Safety Considerations and Installation
 * Battery storage safety, fire risks, ventilation, and installation requirements
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
const TITLE = "Battery Safety and Installation - Level 3 Module 2 Section 3.4";
const DESCRIPTION = "Safety considerations for battery storage installations including fire risks, ventilation requirements, location selection, and electrical installation standards.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is thermal runaway in lithium-ion batteries?",
    options: [
      "Normal heat generation during charging",
      "A self-accelerating reaction that can cause fire or explosion",
      "Heat from the inverter affecting the battery",
      "Temperature increase from ambient conditions"
    ],
    correctIndex: 1,
    explanation: "Thermal runaway is a dangerous chain reaction where heat causes chemical reactions that generate more heat, potentially leading to fire or explosion. It can be triggered by overcharging, physical damage, internal short circuits, or external heat sources. Proper BMS protection and installation practices prevent this."
  },
  {
    id: "check-2",
    question: "What minimum IP rating is typically required for indoor battery installations?",
    options: [
      "IP20",
      "IP44",
      "IP65",
      "No IP rating required indoors"
    ],
    correctIndex: 0,
    explanation: "IP20 is typically the minimum for indoor installations, protecting against objects larger than 12mm. Higher ratings (IP44+) are needed for locations with moisture risk. Outdoor or garage installations often require IP54 or IP65. Always check manufacturer specifications for the specific installation environment."
  },
  {
    id: "check-3",
    question: "Why must battery systems have a means of isolation clearly labelled?",
    options: [
      "For warranty purposes only",
      "To allow safe maintenance and emergency disconnection",
      "To meet aesthetic requirements",
      "Only required for commercial installations"
    ],
    correctIndex: 1,
    explanation: "Clear isolation means is required so that electricians, emergency services, and building occupants can safely disconnect the battery during maintenance or emergencies. This is a regulatory requirement under BS 7671 and manufacturer instructions. Labels must identify the isolator and indicate the presence of battery storage."
  },
  {
    id: "check-4",
    question: "What is the typical clearance requirement around battery installations for maintenance access?",
    options: [
      "No clearance required",
      "100mm on all sides",
      "Manufacturer-specified, typically 200-500mm front and sides",
      "1 metre on all sides"
    ],
    correctIndex: 2,
    explanation: "Manufacturer specifications vary but typically require 200-500mm clearance at the front for access and on sides for ventilation and heat dissipation. Always follow the specific manufacturer's installation manual. Inadequate clearance can void warranties and create safety hazards."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following can trigger thermal runaway in a lithium-ion battery?",
    options: [
      "Normal discharging at rated current",
      "Physical damage causing internal short circuit",
      "Operating at room temperature",
      "Slow charging at low current"
    ],
    correctAnswer: 1,
    explanation: "Physical damage can cause internal short circuits that generate intense localised heat, triggering thermal runaway. Other triggers include overcharging, over-discharging, external fire, and manufacturing defects. The BMS provides protection against electrical triggers but cannot prevent damage from physical abuse."
  },
  {
    id: 2,
    question: "Where should domestic battery storage systems NOT be installed?",
    options: [
      "In a garage",
      "In a utility room",
      "On an escape route or near the main exit",
      "Against an external wall"
    ],
    correctAnswer: 2,
    explanation: "Battery systems should not be installed on escape routes or near main exits as a fire could block evacuation. Fire services recommend locations that do not impede escape and allow emergency access. Living spaces, bedrooms, and areas under stairs are also typically unsuitable."
  },
  {
    id: 3,
    question: "What type of fire extinguisher is recommended for lithium-ion battery fires?",
    options: [
      "Water only",
      "CO2 only",
      "ABC dry powder or specialist lithium battery extinguisher",
      "Foam only"
    ],
    correctAnswer: 2,
    explanation: "ABC dry powder or specialist lithium battery extinguishers are recommended. Water can be used in large quantities to cool cells but presents electrical and chemical hazards. CO2 may not be effective. For significant fires, evacuation and fire service attendance is the appropriate response."
  },
  {
    id: 4,
    question: "What ventilation requirement applies to most LFP battery installations?",
    options: [
      "Mechanical ventilation is always mandatory",
      "No ventilation required - LFP batteries are sealed",
      "Natural ventilation adequate for most domestic LFP systems",
      "Forced air cooling is required"
    ],
    correctAnswer: 2,
    explanation: "Most domestic LFP battery systems are sealed and generate minimal heat under normal operation. Natural ventilation (avoiding enclosed, unventilated spaces) is typically adequate. Manufacturer guidelines must be followed. Some larger or NMC-based systems may have specific mechanical ventilation requirements."
  },
  {
    id: 5,
    question: "What is the purpose of the 'caution: battery storage' label required at the main distribution board?",
    options: [
      "Advertising the battery system",
      "To alert emergency services and electricians to the presence of stored energy",
      "For insurance documentation only",
      "To comply with planning permission"
    ],
    correctAnswer: 1,
    explanation: "Warning labels at the consumer unit alert firefighters and electricians that the installation includes battery storage, which remains energised even when the mains is isolated. This is critical safety information that affects emergency response procedures and safe isolation for maintenance."
  },
  {
    id: 6,
    question: "According to BS 7671, what earth fault protection considerations apply to battery systems?",
    options: [
      "No specific requirements exist",
      "Standard 30mA RCD protection is always sufficient",
      "Protection appropriate to the system type must be provided; manufacturer guidance applies",
      "Only fuses are permitted"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires appropriate earth fault protection. Battery system requirements vary - some inverters have built-in protection, others require external devices. RCDs may not be suitable for all DC circuits. Follow manufacturer guidance and applicable BS 7671 requirements for the specific installation."
  },
  {
    id: 7,
    question: "What is the recommended action if you smell unusual odours from a battery system?",
    options: [
      "Continue monitoring but take no immediate action",
      "Ventilate the area and contact the manufacturer",
      "Isolate the system if safe to do so, ventilate, evacuate, and call emergency services if necessary",
      "Spray water on the battery to cool it"
    ],
    correctAnswer: 2,
    explanation: "Unusual odours (sweet, chemical, or burning smells) may indicate cell damage or early thermal runaway. If safe, isolate the system at a remote point (not at the battery). Ventilate the area, evacuate occupants, and contact emergency services if the smell persists or worsens. Do not approach a damaged or venting battery."
  },
  {
    id: 8,
    question: "What documentation must be provided to the customer after battery installation?",
    options: [
      "Just the sales receipt",
      "Electrical Installation Certificate, user manual, and emergency procedures",
      "Only the manufacturer's warranty card",
      "DNO notification receipt only"
    ],
    correctAnswer: 1,
    explanation: "Customers must receive an Electrical Installation Certificate (or Minor Works for additions), manufacturer documentation including user manual, emergency shutdown procedures, warranty information, and maintenance guidance. DNO notification confirmation and system commissioning records should also be provided."
  },
  {
    id: 9,
    question: "Why might a battery system require a dedicated circuit from the consumer unit?",
    options: [
      "To make metering easier",
      "To ensure adequate fault protection and prevent overloading shared circuits",
      "For aesthetic reasons only",
      "Dedicated circuits are never required"
    ],
    correctAnswer: 1,
    explanation: "Battery systems, especially their inverters, draw significant power and may have specific protection requirements. A dedicated circuit ensures appropriate cable sizing, overcurrent protection, and isolation capability. It also simplifies fault finding and prevents the battery system from affecting other circuits."
  },
  {
    id: 10,
    question: "What should be verified regarding the floor/wall mounting surface for battery installation?",
    options: [
      "Only the colour needs to match",
      "Structural adequacy for weight, fire resistance, and any required separation distances",
      "Only that it's level",
      "Surface material is not important"
    ],
    correctAnswer: 1,
    explanation: "The mounting surface must support the battery's weight (some systems exceed 100kg), have appropriate fire resistance, and maintain required separation distances from combustible materials. Wall-mounted batteries require suitable fixings into masonry or structural elements. Floor installations may need non-combustible surfaces."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Are lithium batteries safe to install in homes?",
    answer: "Modern LFP batteries from reputable manufacturers are considered safe for domestic installation when correctly specified and installed. They include multiple layers of protection (BMS, fusing, contactors) and have excellent thermal stability. Following manufacturer guidelines, proper location selection, and correct installation practices ensures safe operation."
  },
  {
    question: "What should homeowners do if they suspect a battery problem?",
    answer: "If unusual noises, smells, swelling, or heat are noticed: do not touch the battery, isolate it remotely if a safe disconnect exists, ventilate the area, evacuate occupants, and call emergency services if the situation appears dangerous. For less urgent concerns, contact the installer or manufacturer. Never attempt to open or repair battery cells."
  },
  {
    question: "Do battery installations require building regulations approval?",
    answer: "Generally, battery storage is notifiable electrical work under Part P in England and must be certified by a competent person scheme member or inspected by Building Control. Specific building regulations regarding fire safety, structural loading, and ventilation may also apply. Check local requirements as they can vary."
  },
  {
    question: "Can batteries be installed in flats or apartments?",
    answer: "Installation in flats requires careful consideration of fire compartmentation, means of escape, and freeholder/management company approval. Some buildings may prohibit battery storage due to fire safety concerns, especially in communal areas or where installations could affect escape routes. Individual assessment is essential."
  },
  {
    question: "What fire service guidance exists for battery storage?",
    answer: "Fire services recommend: not installing on escape routes, providing clear labelling, maintaining access for emergency response, following manufacturer location guidelines, and informing local fire service of large installations. Some services provide specific guidance documents. The National Fire Chiefs Council offers resources on battery storage safety."
  },
  {
    question: "How often should battery systems be inspected?",
    answer: "Most manufacturers recommend annual visual inspection and system health check. The Electrical Installation Certificate requires periodic inspection at intervals not exceeding those specified (typically 5 years for domestic, less for commercial). BMS data should be reviewed regularly to identify any developing issues."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section3_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module2-section3">
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
            <span>Module 2.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Considerations and Installation
          </h1>
          <p className="text-white/80">
            Ensuring safe battery storage through proper installation and risk management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Thermal runaway:</strong> Main lithium battery hazard - prevented by BMS and proper installation</li>
              <li><strong>Location:</strong> Not on escape routes, adequate ventilation, structural support</li>
              <li><strong>Labelling:</strong> Required at battery, isolator, and consumer unit</li>
              <li><strong>Documentation:</strong> EIC, user manual, emergency procedures mandatory</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Warning labels, isolation points, ventilation provision</li>
              <li><strong>Use:</strong> Manufacturer installation guide for location requirements</li>
              <li><strong>Apply:</strong> Fire service guidance for emergency access planning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understanding thermal runaway and prevention measures",
              "Location selection criteria for safe installation",
              "Ventilation and environmental requirements",
              "Required safety labelling and documentation",
              "Emergency procedures and fire safety considerations",
              "Electrical installation requirements per BS 7671"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Battery Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While modern lithium batteries are inherently safe when properly designed and installed, understanding potential hazards is essential for risk management. The primary concern is thermal runaway - a self-accelerating chemical reaction that can lead to fire or explosion.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal runaway triggers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overcharging:</strong> Charging beyond safe voltage limits (BMS prevents this)</li>
                <li><strong>Over-discharging:</strong> Depleting below minimum voltage (BMS prevents this)</li>
                <li><strong>Physical damage:</strong> Crushing, puncturing, or impact causing internal shorts</li>
                <li><strong>External heat:</strong> Fire or extreme ambient temperatures</li>
                <li><strong>Manufacturing defects:</strong> Internal contamination or damage (rare in quality products)</li>
              </ul>
            </div>

            <p>
              LFP batteries have significantly better thermal stability than NMC or other lithium chemistries. The phosphate cathode structure remains stable at higher temperatures, making thermal runaway much less likely even under abuse conditions. This is a key reason LFP dominates domestic storage applications.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The BMS provides primary protection against electrical causes of thermal runaway. Proper installation and location selection protect against physical and environmental causes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Location Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting an appropriate installation location is critical for safety. The location affects fire risk, emergency access, maintenance feasibility, and system performance. Fire service guidance and manufacturer requirements must both be satisfied.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitable Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Garage (most common domestic location)</li>
                  <li>Utility room with ventilation</li>
                  <li>Purpose-built enclosure outdoors</li>
                  <li>Plant room in commercial buildings</li>
                  <li>Against external walls (fire spread consideration)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unsuitable Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>On escape routes or near main exits</li>
                  <li>In bedrooms or living spaces</li>
                  <li>Under stairs (escape route)</li>
                  <li>Enclosed spaces without ventilation</li>
                  <li>Near heat sources or flammable materials</li>
                </ul>
              </div>
            </div>

            <p>
              Consider the weight of the system - floor-standing batteries can exceed 100kg. Wall-mounted units require secure fixing into masonry or structural elements. Vibration, temperature extremes, and moisture exposure affect both safety and lifespan.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery storage installations must comply with BS 7671, manufacturer requirements, and relevant building regulations. Key considerations include circuit protection, isolation provisions, cable sizing, and environmental protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical installation requirements:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Dedicated circuit:</strong> From consumer unit with appropriate overcurrent protection</li>
                <li><strong>Isolation:</strong> Accessible means to isolate battery system (AC and DC where applicable)</li>
                <li><strong>Cable sizing:</strong> Appropriate for maximum currents and installation method</li>
                <li><strong>Earth fault protection:</strong> As required by manufacturer and BS 7671</li>
                <li><strong>Surge protection:</strong> SPD protection where required by risk assessment</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A typical 5kW hybrid inverter installation requires a dedicated 32A circuit from the consumer unit, with appropriately rated isolator adjacent to the unit, correctly sized DC cabling from battery to inverter, and communication cabling for BMS-inverter connection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Labelling and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper labelling ensures that emergency services, future electricians, and building occupants are aware of the battery installation and can respond appropriately. Documentation provides essential information for safe operation and maintenance.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">At Battery</p>
                <p className="text-white/90 text-xs">Warning label, isolation instructions, emergency contact</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">At Consumer Unit</p>
                <p className="text-white/90 text-xs">"Caution: Battery Storage System" with location indicated</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">At Meter Position</p>
                <p className="text-white/90 text-xs">DNO warning label for generation/storage systems</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required documentation for handover:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Electrical Installation Certificate (BS 7671 compliant)</li>
                <li>Manufacturer's installation and user manuals</li>
                <li>Emergency shutdown procedures</li>
                <li>Warranty documentation and registration</li>
                <li>DNO notification confirmation (G98/G99)</li>
                <li>Commissioning records and system settings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Emergency services use warning labels to assess risks before entering properties. Clear, durable labels in standardised locations are a legal requirement and could save lives.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey location for structural adequacy, ventilation, and access</li>
                <li>Check fire service guidance for location suitability</li>
                <li>Verify building regulations requirements (Part P notification)</li>
                <li>Assess cable routes and distances for DC and AC connections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow manufacturer mounting instructions precisely</li>
                <li>Maintain specified clearances for ventilation and access</li>
                <li>Secure all connections - loose connections cause fires</li>
                <li>Install all required labels before commissioning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing on escape routes</strong> - creates evacuation hazard in emergency</li>
                <li><strong>Insufficient ventilation</strong> - causes overheating and reduced lifespan</li>
                <li><strong>Missing labels</strong> - endangers emergency responders and future workers</li>
                <li><strong>Inadequate fixing</strong> - heavy batteries can fall causing damage and injury</li>
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
                <p className="font-medium text-white mb-1">Safety Labels Required</p>
                <ul className="space-y-0.5">
                  <li>At battery: Warning + isolation instructions</li>
                  <li>At consumer unit: "Battery Storage System"</li>
                  <li>At meter: DNO generation/storage label</li>
                  <li>At isolator: "Battery Isolator"</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Location Checklist</p>
                <ul className="space-y-0.5">
                  <li>Not on escape route</li>
                  <li>Adequate ventilation</li>
                  <li>Structural support for weight</li>
                  <li>Maintenance access clearance</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PV and Grid Integration
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3-5">
              Next: Maintenance and Lifecycle
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section3_4;
