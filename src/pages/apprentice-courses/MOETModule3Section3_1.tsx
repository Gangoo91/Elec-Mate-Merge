import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Layout and Design of Control Panels - MOET Module 3.3.1";
const DESCRIPTION = "Comprehensive guide to control panel layout and design for electrical maintenance technicians: design principles, component arrangement, IEC 61439, thermal management, documentation and maintenance considerations under ST1426.";

const quickCheckQuestions = [
  {
    id: "panel-standard",
    question: "Which standard governs the design and construction of low-voltage switchgear and controlgear assemblies?",
    options: [
      "BS 7671",
      "IEC 61439 (BS EN 61439)",
      "BS 5839",
      "IEC 60947"
    ],
    correctIndex: 1,
    explanation: "IEC 61439 (implemented in the UK as BS EN 61439) is the standard for low-voltage switchgear and controlgear assemblies (commonly known as control panels, MCCs and distribution boards). It replaced the previous IEC 60439 and requires either design verification by testing or by calculation/comparison. BS 7671 covers the installation wiring that connects to the panel, while IEC 60947 covers individual components within the panel."
  },
  {
    id: "segregation",
    question: "What is the purpose of internal separation (segregation) within a control panel?",
    options: [
      "To make the panel look neater",
      "To provide protection against contact with live parts of adjacent functional units and to minimise the effects of arcing faults",
      "To reduce the panel weight",
      "To simplify painting"
    ],
    correctIndex: 1,
    explanation: "Internal separation (defined in IEC 61439 as Forms 1-4) provides protection against accidental contact with live parts in adjacent sections and limits the propagation of internal arc faults. Higher forms of separation (Form 3b, Form 4) provide greater protection but increase cost and panel size. The form of separation required depends on the application and the level of access required during operation and maintenance."
  },
  {
    id: "thermal",
    question: "What is the most common cause of premature component failure inside a control panel?",
    options: [
      "Vibration",
      "Excessive internal temperature due to inadequate thermal management",
      "Humidity",
      "Power surges"
    ],
    correctIndex: 1,
    explanation: "Excessive internal temperature is the most common cause of premature component failure, particularly for electronic components, capacitors and contactors. For every 10 degrees C above the rated temperature, component life approximately halves. Thermal management through ventilation, forced cooling, adequate spacing and appropriate IP rating is a critical design consideration. IEC 61439 requires temperature rise verification as part of the design process."
  },
  {
    id: "documentation",
    question: "Which documents must be supplied with a control panel to comply with IEC 61439?",
    options: [
      "Only a certificate of conformity",
      "Technical documentation including single-line diagram, layout drawing, circuit diagrams, component schedules, temperature rise data and routine test results",
      "Only the component datasheets",
      "Only the operating manual"
    ],
    correctIndex: 1,
    explanation: "IEC 61439 requires comprehensive technical documentation: single-line diagram showing the electrical arrangement; layout drawings showing component positions; circuit diagrams (schematic and wiring diagrams); component schedules listing all items with ratings; temperature rise verification data; short-circuit withstand verification; and routine test certificates for each panel. This documentation is essential for maintenance and modification work."
  }
];

const quizQuestions = [
  { id: 1, question: "IEC 61439 replaced the previous standard:", options: ["IEC 60529", "IEC 60439", "IEC 60947", "IEC 61000"], correctAnswer: 1, explanation: "IEC 61439 replaced IEC 60439. The key change was replacing type-testing with design verification, which can be achieved by testing, calculation or comparison with a reference design. This allows greater flexibility for panel manufacturers while maintaining the same safety standards." },
  { id: 2, question: "The IP rating of a control panel refers to:", options: ["Its internal power rating", "Its degree of protection against ingress of solid objects and water", "Its insulation performance", "Its installation priority"], correctAnswer: 1, explanation: "The IP (Ingress Protection) rating, defined by IEC 60529, indicates the degree of protection the enclosure provides against ingress of solid objects (first digit, 0-6) and water (second digit, 0-9). For example, IP54 means protection against dust ingress (5) and splashing water from any direction (4). The required IP rating depends on the installation environment." },
  { id: 3, question: "Internal separation Form 3b provides:", options: ["No internal separation", "Separation of busbars from functional units, and separation of functional units from each other, including separation of their terminals", "Only separation of busbars", "Total compartmentalisation"], correctAnswer: 1, explanation: "Form 3b provides separation of busbars from functional units, separation of functional units from each other, and separation of the terminals of functional units from each other (but not from the busbars). This allows individual units to be maintained without exposing adjacent units' live parts. Form 4 provides full compartmentalisation including terminal separation from busbars." },
  { id: 4, question: "When designing a control panel layout, DIN rail-mounted components should have:", options: ["No spacing between them", "Adequate spacing for heat dissipation and access for maintenance, as specified by the component manufacturer", "Maximum density to save space", "Random placement"], correctAnswer: 1, explanation: "Component manufacturers specify minimum spacing (derating distances) around their products to allow adequate heat dissipation. Ignoring these spacing requirements causes overheating and premature failure. Additionally, sufficient space must be provided for cable connections, test probe access during maintenance, and component replacement without disturbing adjacent equipment." },
  { id: 5, question: "The purpose of a gland plate on a control panel is:", options: ["To provide a clean appearance", "To provide a sealed entry point for cables entering the enclosure, maintaining the IP rating", "To mount components inside the panel", "To display the panel nameplate"], correctAnswer: 1, explanation: "The gland plate provides a dedicated area for cable glands, which seal around the incoming and outgoing cables to maintain the enclosure's IP rating. Glands must be correctly sized for the cable diameter and tightened to the correct torque. Unused gland holes must be blanked off to maintain the IP rating." },
  { id: 6, question: "A control panel thermal management calculation must consider:", options: ["Only the ambient temperature", "Internal heat generation from all components (losses), ambient temperature, enclosure surface area, ventilation method and IP rating", "Only the motor full-load current", "Only the panel colour"], correctAnswer: 1, explanation: "Thermal management calculations must account for: total internal power dissipation (from contactors, overloads, VSDs, transformers, resistors); ambient temperature at the installation location; enclosure surface area and material; ventilation method (natural convection, forced ventilation, air conditioning); and the IP rating (higher IP restricts natural ventilation). IEC 61439 Annex L provides the calculation methodology." },
  { id: 7, question: "Anti-condensation heaters in a control panel are used to:", options: ["Heat the panel for comfort", "Prevent condensation forming on components during cold periods when the panel is not in use, avoiding moisture-related insulation failures", "Speed up component operation", "Reduce energy consumption"], correctAnswer: 1, explanation: "Anti-condensation heaters maintain the internal panel temperature slightly above the dew point when the panel is de-energised or lightly loaded (e.g., overnight, weekends). This prevents moisture condensation on insulation surfaces, terminals and electronic components, which can cause tracking, corrosion and insulation failure. They are essential in environments with high humidity or significant temperature variations." },
  { id: 8, question: "The door interlock on a control panel typically:", options: ["Locks the door permanently", "Prevents the door from being opened while the main switch is in the ON position, and prevents the switch from being turned ON while the door is open", "Controls the panel lighting", "Operates the emergency stop"], correctAnswer: 1, explanation: "Door interlocks are a safety feature that prevents access to live parts while the panel is energised. The interlock typically has a defeat mechanism (requiring a tool or deliberate action) for authorised persons who need access for live testing or fault-finding. BS 7671 Regulation 729.1 requires switchgear to be accessible only to authorised persons and the interlock supports this requirement." },
  { id: 9, question: "The main busbar system in a control panel carries:", options: ["Only the control circuit current", "The full load current of all connected circuits, distributing power from the main incoming supply to individual functional units", "Only the earth current", "Only the neutral current"], correctAnswer: 1, explanation: "The main busbars carry the full load current and distribute it to individual functional units (circuit breakers, contactors, VSDs) via tap-off connections. Busbars are sized for continuous current rating, short-circuit withstand and temperature rise. Copper busbars are most common; aluminium is used in larger installations. The busbar cross-sectional area, support spacing and joint design are all critical factors." },
  { id: 10, question: "When modifying an existing control panel, the maintenance technician must:", options: ["Just add the new component anywhere", "Ensure the modification complies with the original design verification, update documentation, and verify that thermal management and short-circuit ratings are not compromised", "Only inform the client", "Only update the nameplate"], correctAnswer: 1, explanation: "Modifications to an IEC 61439-compliant panel must not compromise the original design verification. This means checking that: the additional heat load does not exceed the thermal management capacity; the short-circuit rating is not affected; the form of separation is maintained; all documentation (drawings, schedules, certificates) is updated; and the modification is carried out by a competent person. Significant modifications may require re-verification." },
  { id: 11, question: "EMC (Electromagnetic Compatibility) considerations in panel design include:", options: ["Only the panel colour", "Segregation of power and control circuits, correct cable routing, screened cables, EMC glands and filters to prevent electromagnetic interference", "Only the earthing arrangement", "Only component selection"], correctAnswer: 1, explanation: "EMC is a critical design consideration, particularly in panels containing VSDs, PLCs and other electronic equipment. Measures include: physical segregation of power and control wiring; dedicated cable routes for signal cables; use of screened cables with 360-degree EMC gland termination; EMC filters on VSD inputs; proper earthing of cable screens; and maintaining short, direct earth connections. Poor EMC practice causes control system malfunctions and nuisance trips." },
  { id: 12, question: "The routine tests required by IEC 61439 for each completed panel include:", options: ["Only a visual inspection", "Visual inspection, insulation resistance test, dielectric withstand test (if applicable), protective circuit continuity and verification of wiring and function", "Only a power-on test", "Only checking the nameplate"], correctAnswer: 1, explanation: "IEC 61439 requires routine verification for every panel produced: inspection of the assembly (construction, wiring, documentation); dielectric withstand test or insulation resistance measurement; verification of protective measures (continuity of protective circuits); mechanical function test (operation of mechanical components, interlocks, locks); and verification of wiring, operational performance and function. These tests must be documented and records kept." }
];

const faqs = [
  {
    question: "What is the difference between a 'type-tested assembly' and a 'partially type-tested assembly'?",
    answer: "Under the previous IEC 60439, assemblies were classified as type-tested (TTA) or partially type-tested (PTTA). This classification has been replaced in IEC 61439 by the concept of 'design verification', which can be achieved by testing, calculation or comparison with a tested reference design. All assemblies must now demonstrate compliance through one of these verification methods, making the old TTA/PTTA distinction obsolete."
  },
  {
    question: "How do I determine the correct IP rating for a control panel?",
    answer: "The IP rating depends on the installation environment. Indoor, clean, dry locations typically require IP31 or IP41. Indoor locations with dust or occasional moisture (factories, workshops) typically need IP54. Outdoor installations or wash-down areas may need IP55 or IP65. Hazardous areas may have specific requirements. BS 7671 Table 52.2 provides guidance on selecting enclosures based on external influences."
  },
  {
    question: "What is derating and when does it apply to panel components?",
    answer: "Derating means reducing the rated capacity of a component due to operating conditions that differ from the standard reference conditions. The most common derating factor is temperature — contactors, circuit breakers and MCBs all have reduced current ratings at higher ambient temperatures. Other derating factors include altitude (above 2,000 m), mounting orientation and grouping. Manufacturer data sheets provide derating curves and tables."
  },
  {
    question: "Can I install a VSD inside an existing MCC panel?",
    answer: "Potentially, but several factors must be assessed: the VSD generates significant heat (typically 3-5% of rated power) which may exceed the panel's thermal management capacity; the VSD produces harmonics and EMC emissions requiring physical segregation from control circuits; the short-circuit rating of the panel must accommodate the VSD connection; and adequate space for the VSD, its input/output filters and ventilation clearances must be available. A thermal management recalculation is essential."
  },
  {
    question: "What maintenance tasks should be performed on control panels?",
    answer: "Regular panel maintenance includes: visual inspection for signs of overheating (discoloration, melted insulation), dust and debris (clean with a vacuum or compressed air with the panel isolated), checking connection torques (thermal cycling loosens connections over time), verifying ventilation (clean filters, check fan operation), testing door interlocks and safety features, thermographic survey of all connections under load, and verifying that documentation is up to date and accessible. Annual maintenance is typical for most installations."
  }
];

const MOETModule3Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Layout and Design of Control Panels
          </h1>
          <p className="text-white/80">
            Control panel design principles, component arrangement and IEC 61439 compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Standard:</strong> IEC 61439 (BS EN 61439) governs panel design</li>
              <li className="pl-1"><strong>Separation:</strong> Forms 1-4 define internal segregation levels</li>
              <li className="pl-1"><strong>Thermal:</strong> Manage heat dissipation to protect components</li>
              <li className="pl-1"><strong>Documentation:</strong> SLDs, schematics, schedules and test records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Access:</strong> Design affects how easily components can be maintained</li>
              <li className="pl-1"><strong>Interlocks:</strong> Door interlocks prevent access to live parts</li>
              <li className="pl-1"><strong>Modifications:</strong> Must not compromise original design verification</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to electrical plant knowledge and maintenance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the requirements of IEC 61439 for control panel design and verification",
              "Describe the forms of internal separation and their maintenance implications",
              "Assess thermal management requirements for control panel installations",
              "Identify the documentation required with a compliant control panel assembly",
              "Apply safe working practices when maintaining and modifying control panels",
              "Evaluate EMC considerations in panel design and component layout"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: IEC 61439 and Panel Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            IEC 61439 and Panel Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control panels — whether motor control centres (MCCs), power distribution boards or process control
              panels — are at the heart of every industrial and commercial electrical installation. Their design,
              construction and verification are governed by IEC 61439, implemented in the UK as BS EN 61439.
              Understanding this standard is essential for maintenance technicians who work on, maintain and modify
              these assemblies.
            </p>
            <p>
              IEC 61439 replaced the previous IEC 60439 series and introduced the concept of design verification
              to replace the old type-test/partially type-tested classification. Design verification can be achieved
              by testing, calculation or comparison with a tested reference design. This applies to the original
              manufacturer, but maintenance technicians need to understand the implications when carrying out
              modifications.
            </p>
            <p>
              The standard is published in several parts, each covering a specific type of assembly. Part 1 sets
              out the general rules applicable to all assemblies, while subsequent parts cover specific assembly
              types including power switchgear assemblies, distribution boards, assemblies for construction sites,
              cable distribution cabinets and busbar trunking systems. A maintenance technician working across
              different installations will encounter assemblies covered by several parts of the standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 61439 Series — Key Parts</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Part</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">61439-1</td><td className="border border-white/10 px-3 py-2">General rules</td><td className="border border-white/10 px-3 py-2">Common requirements for all assemblies</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">61439-2</td><td className="border border-white/10 px-3 py-2">Power switchgear assemblies (PSC)</td><td className="border border-white/10 px-3 py-2">Main distribution boards, MCCs</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">61439-3</td><td className="border border-white/10 px-3 py-2">Distribution boards (DBO)</td><td className="border border-white/10 px-3 py-2">Final distribution boards, consumer units</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">61439-4</td><td className="border border-white/10 px-3 py-2">Assemblies for construction sites</td><td className="border border-white/10 px-3 py-2">Temporary site distribution boards</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">61439-5</td><td className="border border-white/10 px-3 py-2">Cable distribution cabinets</td><td className="border border-white/10 px-3 py-2">External utility distribution pillars</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">61439-6</td><td className="border border-white/10 px-3 py-2">Busbar trunking systems</td><td className="border border-white/10 px-3 py-2">Factory busbar distribution systems</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Verification Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Testing:</strong> Full laboratory testing of the assembly design under fault and load conditions — the most rigorous method</li>
                <li className="pl-1"><strong>Calculation:</strong> Mathematical analysis of thermal, short-circuit and dielectric performance using proven engineering methods</li>
                <li className="pl-1"><strong>Comparison:</strong> Comparing the assembly design with a reference design that has already been verified by testing — the most common method for bespoke panels</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Rating Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical IP Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Indoor, clean, dry</td><td className="border border-white/10 px-3 py-2">IP31 / IP41</td><td className="border border-white/10 px-3 py-2">Electrical switch rooms, clean plant rooms</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Indoor, dusty or damp</td><td className="border border-white/10 px-3 py-2">IP54</td><td className="border border-white/10 px-3 py-2">Factories, workshops, process areas</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Outdoor</td><td className="border border-white/10 px-3 py-2">IP55 / IP65</td><td className="border border-white/10 px-3 py-2">Weatherproof enclosures, external substations</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Wash-down areas</td><td className="border border-white/10 px-3 py-2">IP65 / IP66</td><td className="border border-white/10 px-3 py-2">Food processing, pharmaceutical, dairy</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Any modification to an IEC 61439 assembly must maintain the original
              design verification. If a modification changes the thermal, short-circuit or protection
              characteristics, the panel may need re-verification. Always consult the panel documentation and the
              original manufacturer's guidelines before making changes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Internal Separation and Component Layout */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Internal Separation and Component Layout
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The internal arrangement of a control panel determines both safety and maintainability. IEC 61439
              defines forms of internal separation (Forms 1 through 4) that provide progressively greater
              protection against contact with live parts and containment of internal faults. The form of
              separation specified depends on the application, the level of access required during operation, and
              the competence of the persons who will maintain the panel.
            </p>
            <p>
              For maintenance technicians, the form of separation directly affects how work is carried out. A
              Form 1 panel (no internal separation) requires complete isolation before any work can be done —
              opening the door exposes all live parts simultaneously. A Form 4b panel (full compartmentalisation)
              allows individual functional units to be withdrawn and maintained while adjacent units remain
              energised and in service. The choice of separation form is therefore a balance between initial cost
              and ongoing operational flexibility.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forms of Internal Separation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">1</td><td className="border border-white/10 px-3 py-2">No internal separation</td><td className="border border-white/10 px-3 py-2">Full isolation required for any access</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2a</td><td className="border border-white/10 px-3 py-2">Busbars separated from functional units</td><td className="border border-white/10 px-3 py-2">Busbars protected during unit maintenance</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2b</td><td className="border border-white/10 px-3 py-2">As 2a, plus terminals separated from busbars</td><td className="border border-white/10 px-3 py-2">Terminal access without busbar exposure</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3a</td><td className="border border-white/10 px-3 py-2">Separation between functional units, but not their terminals</td><td className="border border-white/10 px-3 py-2">Work on one unit without exposing adjacent units</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3b</td><td className="border border-white/10 px-3 py-2">As 3a, plus terminal separation between units</td><td className="border border-white/10 px-3 py-2">Full unit and terminal isolation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4a</td><td className="border border-white/10 px-3 py-2">As 3b, plus separation of outgoing terminals from busbars</td><td className="border border-white/10 px-3 py-2">Maximum protection during maintenance</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4b</td><td className="border border-white/10 px-3 py-2">Full compartmentalisation including terminal compartments</td><td className="border border-white/10 px-3 py-2">Individual unit access while panel remains live</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Component Layout Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat management:</strong> Heat-generating components (VSDs, braking resistors, large contactors) placed at the top of the panel to allow natural convection</li>
                <li className="pl-1"><strong>Accessibility:</strong> Components requiring frequent adjustment or replacement placed at accessible heights (typically 400-1,800 mm from floor)</li>
                <li className="pl-1"><strong>Segregation:</strong> Power circuits physically separated from control and signal circuits to minimise EMC interference</li>
                <li className="pl-1"><strong>Logical grouping:</strong> Related functional units grouped together (e.g., all motor starters for a single process line)</li>
                <li className="pl-1"><strong>Clearances:</strong> Manufacturer-specified derating distances maintained around all components</li>
                <li className="pl-1"><strong>Wiring routes:</strong> Dedicated cable ducts for power, control and signal wiring, with adequate bending radii at all turns</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Arc Fault Containment</p>
              <p className="text-sm text-white">
                Internal separation also plays a role in limiting the damage from internal arc faults. An arc
                fault within a Form 1 panel can propagate throughout the entire assembly, causing extensive
                damage and potentially injuring anyone nearby. Higher forms of separation contain the arc energy
                within the affected compartment, limiting damage and protecting adjacent circuits. Some critical
                installations specify arc-resistant panels tested to IEC 61641, which are designed to vent arc
                energy safely through designated relief paths.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Busbar Design and Sizing</h3>
              <p className="text-sm text-white mb-3">
                The busbar system is the backbone of a control panel, distributing power from the incoming supply
                to all functional units. Busbars are typically manufactured from high-conductivity copper, though
                aluminium is used in larger installations where weight and cost are factors. The busbar design must
                account for continuous current rating, short-circuit withstand, temperature rise and mechanical
                forces during fault conditions.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cross-sectional area:</strong> Determined by the continuous current rating and permissible temperature rise</li>
                <li className="pl-1"><strong>Support spacing:</strong> Busbars must be supported at intervals that withstand electromagnetic forces during short-circuit faults</li>
                <li className="pl-1"><strong>Jointing:</strong> Bolted connections must be correctly torqued with Belleville (disc spring) washers to maintain contact pressure during thermal cycling</li>
                <li className="pl-1"><strong>Insulation:</strong> Busbars may be bare, sleeved or fully insulated — the level of insulation affects the form of separation achievable</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Higher forms of separation enable maintenance on individual functional
              units without isolating the entire panel. This significantly reduces downtime and is particularly
              important in continuous process industries where a full panel shutdown is extremely costly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Thermal Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every component inside a control panel generates heat during operation. Contactors, circuit
              breakers, cable terminations, VSDs and transformers all contribute to the internal temperature
              rise. If the internal temperature exceeds the rated operating temperature of any component, its
              performance degrades and its life is significantly shortened. Effective thermal management is
              therefore a critical aspect of panel design and ongoing maintenance.
            </p>
            <p>
              The relationship between temperature and component life follows the Arrhenius equation — for many
              electronic components and insulation materials, every 10 degrees C increase above the rated
              temperature approximately halves the expected service life. A panel designed to operate at 40
              degrees C internal temperature that actually runs at 60 degrees C will see electronic component
              life reduced by approximately 75%. This makes thermal management not just a reliability issue but
              a significant cost factor over the panel's life.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IP Impact</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Natural convection</td><td className="border border-white/10 px-3 py-2">Maintained</td><td className="border border-white/10 px-3 py-2">Low-power panels in controlled environments</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Forced ventilation (fans)</td><td className="border border-white/10 px-3 py-2">Reduced (typically IP43)</td><td className="border border-white/10 px-3 py-2">Medium-power panels in clean environments</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Air-to-air heat exchanger</td><td className="border border-white/10 px-3 py-2">Maintained</td><td className="border border-white/10 px-3 py-2">Dusty or corrosive environments</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Panel air conditioning</td><td className="border border-white/10 px-3 py-2">Maintained</td><td className="border border-white/10 px-3 py-2">High ambient temperatures, precision control</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Thermal Management Failures</p>
              <p className="text-sm text-white">
                Common thermal failures include: blocked ventilation grilles (equipment stored against panels);
                failed or disconnected fans; clogged air filters (the single most common cause); failed air
                conditioning units on outdoor panels; and excessive component density after modifications.
                During maintenance inspections, always check internal temperature (thermographic survey) and
                the condition of all cooling system components.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">IEC 61439 Temperature Rise Limits</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accessible external surfaces:</strong> Maximum 70 K above ambient (typically 110 degrees C at 40 degrees C ambient)</li>
                <li className="pl-1"><strong>Terminals for external cables:</strong> Maximum 70 K rise</li>
                <li className="pl-1"><strong>Busbars and conductors:</strong> Maximum temperature depends on insulation class and material</li>
                <li className="pl-1"><strong>Operating handles and controls:</strong> Metal 15 K, non-metal 25 K rise above ambient</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Anti-Condensation Protection</h3>
              <p className="text-sm text-white">
                In environments with high humidity or significant temperature fluctuations, condensation can form
                on internal panel surfaces when the panel temperature drops below the dew point — typically
                overnight or during weekends when the panel is lightly loaded. Condensation on insulation surfaces
                causes tracking (surface leakage currents that carbonise insulation), corrosion of metallic
                components and degradation of electronic circuits. Anti-condensation heaters — thermostatically
                controlled low-wattage heaters — maintain the internal temperature above the dew point and are
                essential in outdoor panels, coastal locations and unheated plant rooms.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> IEC 61439 requires that the temperature rise inside the panel does not
              exceed specified limits when all circuits are carrying their rated current at the rated ambient
              temperature. This must be verified by testing, calculation or comparison as part of the design
              verification process.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Documentation and Panel Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Panel Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation is not just a regulatory requirement — it is the essential foundation
              for safe and effective panel maintenance. Without accurate drawings, circuit diagrams and component
              schedules, maintenance work becomes dangerous guesswork. As a maintenance technician, you must both
              use and maintain this documentation throughout the panel's operational life.
            </p>
            <p>
              The documentation package for a control panel serves multiple purposes: it enables safe isolation
              by identifying all sources of supply; it supports fault diagnosis by providing circuit logic and
              component values; it facilitates modification work by showing the existing arrangement and design
              parameters; and it provides the basis for spare parts procurement by listing all components with
              their specifications. Losing or failing to update panel documentation is one of the most common —
              and most serious — maintenance failures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Panel Documentation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-line diagram (SLD):</strong> Shows the overall electrical arrangement — switchgear, busbars, protection devices and their interconnections</li>
                <li className="pl-1"><strong>General arrangement drawing:</strong> Physical layout showing component positions within the enclosure</li>
                <li className="pl-1"><strong>Circuit diagrams (schematics):</strong> Detailed electrical circuits for each functional unit — power circuits, control circuits and interlocks</li>
                <li className="pl-1"><strong>Wiring diagrams:</strong> Terminal-to-terminal connections showing cable numbers, terminal identifiers and wire colours</li>
                <li className="pl-1"><strong>Component schedule:</strong> List of all components with manufacturer, model number, rating and location reference</li>
                <li className="pl-1"><strong>Design verification records:</strong> Temperature rise data, short-circuit withstand verification, IP verification</li>
                <li className="pl-1"><strong>Routine test certificates:</strong> Records of factory acceptance testing for each panel</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Panel Maintenance Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Annual thermographic survey:</strong> Scan all connections, busbars and components under load to detect hot spots — the single most effective preventive maintenance technique for panels</li>
                <li className="pl-1"><strong>Connection torque checks:</strong> Re-torque all main connections periodically — thermal cycling causes gradual loosening that increases resistance and generates heat</li>
                <li className="pl-1"><strong>Cleaning:</strong> Vacuum dust and debris with the panel isolated; clean ventilation filters monthly in dusty environments</li>
                <li className="pl-1"><strong>Interlock testing:</strong> Verify all door interlocks, key interlocks and safety devices operate correctly</li>
                <li className="pl-1"><strong>Documentation update:</strong> After any modification, update all affected drawings and schedules immediately — do not leave this for later</li>
                <li className="pl-1"><strong>Insulation resistance testing:</strong> Measure insulation resistance of busbars and main circuits during planned shutdowns</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Case Study: The Importance of Documentation</h3>
              <p className="text-sm text-white">
                In a reported incident at a manufacturing plant, a maintenance technician needed to isolate a
                single motor starter within an MCC for contactor replacement. The panel documentation had not been
                updated following a modification three years earlier, and the circuit labelling no longer matched
                the drawings. The technician isolated what he believed was the correct circuit, but the motor
                remained energised — the modification had changed the busbar tap-off arrangement. Fortunately, the
                technician proved dead before touching any connections and discovered the error. The investigation
                found that four separate modifications had been made to the panel without any documentation updates,
                making safe working extremely difficult for all subsequent maintenance.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must be able to interpret technical
              drawings and schematics, carry out maintenance and fault-finding on control panels, and maintain
              accurate maintenance records. These are core competence requirements for the electrical maintenance
              pathway.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: EMC Considerations and Wiring Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            EMC Considerations and Wiring Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic compatibility (EMC) is an increasingly important aspect of control panel design
              and maintenance. Modern panels frequently contain variable speed drives, programmable logic
              controllers, electronic metering and communication interfaces alongside power circuits carrying
              hundreds of amperes. Without proper EMC measures, electromagnetic interference from power circuits
              can cause control system malfunctions, nuisance trips, inaccurate readings and communication
              failures.
            </p>
            <p>
              The EMC Directive (2014/30/EU, retained in UK law) requires that electrical equipment does not
              generate excessive electromagnetic emissions and is sufficiently immune to external interference.
              Panel manufacturers must demonstrate compliance, and maintenance technicians must ensure that EMC
              measures are maintained during modification and repair work. Replacing a screened cable with an
              unscreened one, or removing an EMC filter during a VSD replacement, can introduce EMC problems
              that are difficult to diagnose.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">EMC Best Practice in Panel Design</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Physical segregation:</strong> Power and control/signal wiring routed in separate cable ducts, crossing at 90 degrees where unavoidable</li>
                <li className="pl-1"><strong>Screened cables:</strong> All signal and communication cables use screened (shielded) types with the screen terminated at 360 degrees via EMC glands</li>
                <li className="pl-1"><strong>EMC filters:</strong> Input and output filters on VSDs to contain harmonic currents and high-frequency switching noise</li>
                <li className="pl-1"><strong>Earth references:</strong> Dedicated EMC earth bar connected to the panel earth with short, wide conductors — not long pigtail wires</li>
                <li className="pl-1"><strong>Cable entry:</strong> Power cables and signal cables enter the panel through separate gland plates where possible</li>
                <li className="pl-1"><strong>Ferrite cores:</strong> Applied to signal cables where additional high-frequency noise suppression is required</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common EMC Problems</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">PLC analogue inputs reading erratically due to VSD switching noise</li>
                  <li className="pl-1">Communication bus (Profibus, Modbus) dropouts from inadequate cable screening</li>
                  <li className="pl-1">Nuisance RCD tripping caused by VSD leakage currents</li>
                  <li className="pl-1">Temperature transmitter readings fluctuating when nearby motor starts</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance EMC Checks</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Verify cable screen connections at all EMC glands</li>
                  <li className="pl-1">Check power/signal cable segregation is maintained</li>
                  <li className="pl-1">Confirm EMC filters are fitted and operational</li>
                  <li className="pl-1">Inspect earth connections for corrosion or loosening</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">VSD Installation Considerations</p>
              <p className="text-sm text-white">
                Variable speed drives are the single biggest source of EMC issues in control panels. Their
                high-frequency switching (typically 4-16 kHz) generates significant conducted and radiated
                emissions. Proper VSD installation requires: input EMC filter; screened motor cable with
                360-degree termination at both ends; maximum cable length compliance (manufacturer-specified);
                output choke or du/dt filter for long motor cable runs; and segregation of VSD power cables
                from all control and signal wiring. Failure to follow these practices can cause widespread
                interference throughout the panel and to external equipment.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> When replacing a VSD or modifying a panel containing VSDs, always reinstall
              EMC filters and maintain cable screening. If the original EMC measures are not documented, consult
              the VSD manufacturer's installation guide for the specific EMC requirements. Poor EMC practice is
              one of the most common causes of intermittent control system faults.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">IEC 61439 Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Design verification: by testing, calculation or comparison</li>
                  <li>Forms of separation: 1, 2a, 2b, 3a, 3b, 4a, 4b</li>
                  <li>Temperature rise limits per IEC 61439 Annex L</li>
                  <li>Short-circuit withstand verification</li>
                  <li>Routine tests: insulation, continuity, function</li>
                  <li>Full technical documentation package</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Essentials</p>
                <ul className="space-y-0.5">
                  <li>Annual thermographic survey under load</li>
                  <li>Connection retorquing at manufacturer values</li>
                  <li>Ventilation filter cleaning and fan checks</li>
                  <li>Door interlock and safety device testing</li>
                  <li>Documentation update after every modification</li>
                  <li>EMC screen and filter verification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-2">
              Next: Cable Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section3_1;
