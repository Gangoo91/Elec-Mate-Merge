import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Labelling and Identification Standards - MOET Module 3.3.5";
const DESCRIPTION = "Comprehensive guide to electrical labelling and identification standards for maintenance technicians: circuit identification, cable labelling, warning notices, BS 7671 requirements, BS EN 81346, and documentation practices under ST1426.";

const quickCheckQuestions = [
  {
    id: "circuit-chart",
    question: "What does BS 7671 Regulation 514.9 require at every distribution board?",
    options: [
      "A photograph of the installation",
      "A durable circuit chart or schedule identifying every circuit, its protective device, its intended purpose and the areas served",
      "Only the company logo",
      "A list of authorised persons"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 514.9 requires a durable circuit chart or schedule at every distribution board (or within close proximity). It must identify every circuit by its protective device reference, describe the circuit's purpose and the area served. The chart must be accurate and kept up to date. An out-of-date or missing circuit chart is one of the most common defects found during periodic inspections and makes safe isolation extremely difficult."
  },
  {
    id: "safety-signs",
    question: "What warning label is required on any enclosure where a voltage exceeding 230 V exists between simultaneously accessible terminals?",
    options: [
      "A blue information sign",
      "A yellow warning triangle with the text 'Danger — 400 V' (or the actual voltage) in accordance with the Health and Safety (Safety Signs and Signals) Regulations 1996",
      "A green first-aid sign",
      "No label is required"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 514.10 requires a warning label where a voltage exceeding 230 V to earth exists between simultaneously accessible terminals or where different nominal voltages exist within the same enclosure. The label format must comply with BS EN ISO 7010 and the Health and Safety (Safety Signs and Signals) Regulations 1996 — a yellow warning triangle with black text. This warns maintenance technicians of the voltage hazard before they open the enclosure."
  },
  {
    id: "cable-marking",
    question: "How should cables be identified at each end and at accessible points along their route?",
    options: [
      "By colour only",
      "Using durable labels or tags showing the circuit number, voltage, origin and destination — matching the cable schedule and circuit chart",
      "Cables do not need labelling",
      "By the installer's initials"
    ],
    correctIndex: 1,
    explanation: "Good practice (and BS 7671 Regulation 514.8) requires cables to be identified at their origin, termination and at all accessible intermediate points. Labels should include the circuit reference number, origin (distribution board reference), destination, and cable type/size. Labels must be durable and legible throughout the installation's life. Without proper cable identification, maintenance work becomes dangerous — the wrong cable could be cut, disconnected or worked on while live."
  },
  {
    id: "label-material",
    question: "What is the most important characteristic of labels used for permanent electrical identification?",
    options: [
      "They should be handwritten for a personal touch",
      "They must be durable, legible and resistant to the environmental conditions at the point of installation throughout the life of the installation",
      "They should match the wall colour",
      "They only need to last for one year"
    ],
    correctIndex: 1,
    explanation: "Permanent electrical labels must withstand the environmental conditions at their location for the entire life of the installation. This means resistance to heat, UV exposure, moisture, chemicals, oil and normal wear. Machine-produced labels (engraved laminate, industrial label printer, anodised aluminium) are required for permanent installations. Handwritten labels are not acceptable. Labels that fade, peel or become illegible defeat their purpose and create a safety hazard by providing no information or, worse, incorrect information."
  }
];

const quizQuestions = [
  { id: 1, question: "BS EN 81346 provides:", options: ["Cable current ratings", "A structured system for the designation of industrial plant, systems and equipment using reference designations and aspect-based classification", "Fire alarm zone numbering", "Electrical test procedures"], correctAnswer: 1, explanation: "BS EN 81346 (Industrial systems, installations and equipment — Structuring principles and reference designations) provides a hierarchical coding system for identifying plant, systems and equipment. It uses aspect-based classification with letter codes (e.g., Q for switching device, M for motor, K for relay). This standard provides a consistent, international framework for equipment labelling that is essential for large industrial and commercial installations." },
  { id: 2, question: "A label stating 'Caution — dual supply' is required when:", options: ["Two different cable sizes are used", "An installation or enclosure can be energised from more than one source of supply (e.g., normal and standby generator)", "The neutral is shared between circuits", "The installation has two distribution boards"], correctAnswer: 1, explanation: "BS 7671 Regulation 514.15 requires a warning label at the point of connection of every source of supply when an installation can be energised from more than one source. This is critical safety information — a maintenance technician who isolates one supply but is unaware of the second supply could be fatally injured. The label must be visible and positioned at every point where it is possible to isolate or access the installation." },
  { id: 3, question: "The minimum information required on a distribution board circuit chart includes:", options: ["Just the circuit numbers", "Circuit number, protective device type and rating, conductor size, circuit description and areas served", "Only the installer's name", "Only the date of installation"], correctAnswer: 1, explanation: "A compliant circuit chart must include: the circuit reference number; the type and rating of each protective device (MCB, RCBO, fuse); the conductor size; a clear description of what the circuit supplies; and the area(s) served. Additional useful information includes RCD rating, maximum Zs value and cable type. The chart must be accurate, durable and updated whenever modifications are made." },
  { id: 4, question: "Colour coding for safety signs follows:", options: ["No particular standard", "BS EN ISO 7010 / Health and Safety Regulations: red for prohibition/fire, yellow for warning, blue for mandatory, green for safe condition", "The installer's preference", "BS 7671 cable colour codes"], correctAnswer: 1, explanation: "Safety sign colours are standardised: red for prohibition (no entry, do not switch on) and fire equipment; yellow for warning (danger, caution, risk of electric shock); blue for mandatory instruction (must wear PPE, switch off before opening); and green for safe condition (emergency exit, first aid). These colours are defined by BS EN ISO 7010 and enforced by the Health and Safety (Safety Signs and Signals) Regulations 1996." },
  { id: 5, question: "Engraved or printed labels for switchgear identification should be:", options: ["Handwritten for speed", "Machine-produced, durable, securely fixed, clearly legible and resistant to the environmental conditions at the point of installation", "Written in pencil for easy update", "Optional for industrial installations"], correctAnswer: 1, explanation: "Labels for permanent identification of switchgear, controls and equipment must be durable — resistant to heat, moisture, chemicals, UV exposure and normal wear. They should be machine-produced (engraved laminate, printed labels, or industrial label printers) for legibility and professionalism. Handwritten labels are not acceptable for permanent installations. Labels must be securely fixed (not relying on adhesive alone in harsh environments) and positioned where they are clearly visible." },
  { id: 6, question: "When a periodic inspection finds an out-of-date circuit chart, the inspector should:", options: ["Ignore it", "Record it as a defect (typically C3 improvement recommended or C2 if circuit identification is inadequate for safe isolation), and recommend the chart be updated as part of remedial works", "Replace the entire distribution board", "Rewrite it themselves during the inspection"], correctAnswer: 1, explanation: "An out-of-date or missing circuit chart is recorded as a defect during periodic inspection. If the lack of accurate circuit identification could affect the ability to safely isolate circuits (making it potentially dangerous), it would be classified as C2 (requiring urgent attention). If the chart exists but has minor omissions, it may be classified as C3 (improvement recommended). The duty holder is responsible for ensuring the chart is updated." },
  { id: 7, question: "Cable identification at intermediate points (such as where cables pass through a switch room) is important because:", options: ["It improves the appearance", "It allows maintenance technicians to identify individual cables without tracing them from their origin, reducing the risk of working on the wrong cable and enabling faster fault diagnosis", "It is only required for data cables", "It has no practical purpose"], correctAnswer: 1, explanation: "Intermediate cable identification prevents the dangerous and time-consuming process of cable tracing. In a switch room or cable basement with hundreds of cables, positive identification at the point of access is essential for safe isolation, fault diagnosis and modification work. Without labels, a technician may cut or disconnect the wrong cable, causing an unplanned outage or creating a safety hazard." },
  { id: 8, question: "The label 'Safety Electrical Connection — Do Not Remove' is required on:", options: ["All cable glands", "Earthing and bonding connections that are not part of a circuit and may not be obviously necessary (e.g., main bonding conductors, supplementary bonding), to prevent their removal by uninformed persons", "All socket outlets", "Circuit breaker handles"], correctAnswer: 1, explanation: "BS 7671 Regulation 514.13 requires permanent labels at earthing and bonding connections that might not be recognised as essential safety connections. Main equipotential bonding conductors, supplementary bonding conductors and earthing arrangements can appear as unnecessary wires to uninformed persons (plumbers, builders, decorators) who may remove them. The label provides a clear warning that removal could endanger lives." },
  { id: 9, question: "In a large industrial installation, equipment reference designations following BS EN 81346 typically use:", options: ["Random numbers", "A hierarchical structure: location code, system code, and equipment code, allowing unique identification of every item in the installation", "The manufacturer's serial number", "Only the floor number"], correctAnswer: 1, explanation: "BS EN 81346 uses a hierarchical structure: the location code identifies where the equipment is (building, floor, room); the system code identifies which system it belongs to (lighting, power, HVAC); and the equipment code identifies the specific item (motor, contactor, circuit breaker). This allows every item in a complex installation to have a unique, systematic reference that can be used on drawings, labels, maintenance records and CMMS systems." },
  { id: 10, question: "RCD test button labels ('Test quarterly') are required by:", options: ["BS 7671, which requires a notice at or near the RCD instructing that the device should be tested at quarterly intervals using the integral test button", "Insurance requirements only", "The RCD manufacturer only", "They are optional"], correctAnswer: 0, explanation: "BS 7671 Regulation 514.12 requires a durable notice fixed at or near the origin of the installation or at the RCD stating that the device should be tested at regular intervals (typically quarterly) by pressing the integral test button, and that if the device does not trip when tested, the user should seek expert advice. This is a functional safety notice that is frequently missing during periodic inspections." },
  { id: 11, question: "When labelling a control panel, the terminal identification should:", options: ["Be left to the maintenance technician to figure out", "Match the terminal markings on the circuit diagram exactly, allowing a technician to trace any circuit from drawing to panel without ambiguity", "Use any convenient numbering system", "Only identify power terminals"], correctAnswer: 1, explanation: "Terminal identification in a control panel must correspond exactly to the circuit diagrams, wiring diagrams and terminal schedules. This one-to-one relationship between drawing and physical installation is essential for fault diagnosis, modification and maintenance. If terminal labels do not match the drawings, every maintenance task becomes slower and more error-prone. IEC 61439 requires this correspondence as part of the technical documentation package." },
  { id: 12, question: "During maintenance, a label that has become illegible should be:", options: ["Ignored", "Replaced immediately with a new, durable label carrying the same information, and the maintenance record updated to reflect the replacement", "Covered with tape", "Left as is until the next periodic inspection"], correctAnswer: 1, explanation: "Illegible labels are a safety hazard — they defeat the purpose of the labelling system. Any illegible label discovered during maintenance should be replaced immediately with a new label carrying the correct information. This applies to circuit charts, cable labels, warning notices and equipment identification labels. Label replacement should be recorded in the maintenance log. Using the opportunity of maintenance access to check and replace worn labels is a best practice that improves overall installation safety." }
];

const faqs = [
  { question: "What type of label material should I use for different environments?", answer: "Indoor, clean, dry environments: laminated paper or vinyl labels. Industrial environments (heat, oil, chemicals): engraved laminate (Traffolyte), stainless steel or anodised aluminium. Outdoor: UV-resistant laminate, stainless steel or anodised aluminium. Corrosive atmospheres: stainless steel or chemical-resistant polymer. Cable labels: heat-shrink markers for permanent identification; self-laminating wrap-around labels for intermediate points. Always check that the adhesive is suitable for the surface and temperature range." },
  { question: "Is there a standard for electrical equipment numbering?", answer: "BS EN 81346 provides the international standard for reference designations in industrial installations. It uses letter codes for equipment types (Q = switching device, M = motor, K = relay, T = transformer, F = fuse) combined with sequential numbers within each system. Many organisations have their own numbering conventions based on this standard. Consistency is the key — whatever system is used, it must be applied uniformly across the entire installation and match all documentation." },
  { question: "What labels are required by BS 7671?", answer: "BS 7671 requires: circuit charts at distribution boards (Reg 514.9); voltage warning labels where >230 V between accessible terminals (Reg 514.10); earthing and bonding labels (Reg 514.13); RCD test notices (Reg 514.12); dual/alternative supply warnings (Reg 514.15); periodic inspection date notices (Reg 514.12); and labels for non-standard circuits or special conditions. Additional labels may be required by other standards (fire alarm — BS 5839, emergency lighting — BS 5266)." },
  { question: "How do I update a circuit chart after modifications?", answer: "After any modification: (1) update the circuit chart to reflect the change (new circuits, amended descriptions, changed protective device ratings); (2) verify the chart against the actual installation; (3) sign and date the update; (4) if the chart is badly worn or has multiple corrections, produce a new chart. Many modern installations use electronic circuit chart systems that can be updated and reprinted easily. Always ensure a copy is physically present at the distribution board." },
  { question: "What is the best practice for labelling cables in complex installations?", answer: "Use a systematic cable numbering scheme that identifies: the origin (source board/panel reference); the circuit number; and optionally the destination. For example, 'DB-A/C15/AHU-3' means Distribution Board A, Circuit 15, to Air Handling Unit 3. Apply labels at both ends and at all accessible intermediate points (every cable tray bend, every access point, every floor/wall penetration). Use durable, machine-printed labels — handwritten markers fade and become illegible. Maintain a master cable schedule that lists every cable with its full identification." }
];

const MOETModule3Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 3.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Labelling and Identification Standards
          </h1>
          <p className="text-white/80">
            Identification systems, labelling standards and documentation for safe electrical maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Circuit charts:</strong> Required at every DB (BS 7671 Reg 514.9)</li>
              <li className="pl-1"><strong>Warning labels:</strong> Voltage, dual supply, earthing notices</li>
              <li className="pl-1"><strong>Cable marking:</strong> At origin, destination and intermediate points</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 81346, BS EN ISO 7010, BS 7671 Part 5</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safe isolation:</strong> Correct identification prevents wrong-circuit work</li>
              <li className="pl-1"><strong>Updates:</strong> Charts must be updated after every modification</li>
              <li className="pl-1"><strong>Inspection:</strong> Missing or illegible labels are recordable defects</li>
              <li className="pl-1"><strong>ST1426:</strong> Documentation and record-keeping competency</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the BS 7671 requirements for circuit charts and warning labels",
              "Apply cable identification practices at origin, destination and intermediate points",
              "Describe the BS EN 81346 reference designation system for industrial equipment",
              "Identify the safety sign colour standards under BS EN ISO 7010",
              "Maintain and update labelling systems following installation modifications",
              "Recognise labelling defects during periodic inspection and maintenance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Circuit Charts and Distribution Board Labelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The circuit chart is arguably the most important single document for safe electrical maintenance. It is the first thing a maintenance technician looks at when identifying a circuit for isolation, fault-finding or modification. An accurate, up-to-date circuit chart enables safe isolation; an inaccurate or missing chart makes every maintenance task potentially dangerous.
            </p>
            <p>
              BS 7671 Regulation 514.9 requires a durable chart or schedule at or near every distribution board identifying each circuit by its protective device, describing what it supplies, and indicating the area served. This is not optional — it is a mandatory requirement of the Wiring Regulations.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Chart Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Format:</strong> Clear, legible table format with circuit number, device type/rating, conductor size, description and area served</li>
                <li className="pl-1"><strong>Durability:</strong> Laminated or in a protective sleeve; resistant to the environment (heat, moisture, dust)</li>
                <li className="pl-1"><strong>Accuracy:</strong> Must exactly match the current installation — update after every modification</li>
                <li className="pl-1"><strong>Position:</strong> Fixed at or adjacent to the distribution board, visible when the board is accessed</li>
                <li className="pl-1"><strong>Spares:</strong> Blank entries for spare ways should be marked as 'Spare' — not left blank</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Cost of Poor Circuit Identification</p>
              <p className="text-sm text-white">
                HSE incident reports document cases where maintenance technicians isolated the wrong circuit because of inaccurate or missing circuit charts. In the worst cases, this resulted in work being carried out on a live circuit with fatal consequences. Even in less serious cases, wrong-circuit isolation causes unplanned outages, data loss and disruption to critical services. Always verify isolation by proving dead — never rely solely on the circuit chart.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Circuit Chart Formats and Templates</h3>
              <p className="text-sm text-white mb-3">
                While BS 7671 specifies the minimum information required, the format and level of detail in a
                circuit chart can vary significantly. Using a comprehensive format saves time during every
                subsequent maintenance task.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Basic format (minimum):</strong> Circuit number, protective device type and rating, circuit description, areas served — meets BS 7671 Regulation 514.9</li>
                <li className="pl-1"><strong>Enhanced format (recommended):</strong> Adds conductor size, cable type, RCD details, maximum Zs, measured Zs, IR reading — provides essential test data for future inspections</li>
                <li className="pl-1"><strong>Digital format:</strong> Electronic circuit charts linked to a database; can be updated remotely, printed on demand, and cross-referenced with CMMS work orders and test records</li>
                <li className="pl-1"><strong>Photographic supplement:</strong> Photographs of the distribution board interior, showing circuit breaker positions and cable routes — invaluable for remote fault diagnosis</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When you modify an installation (add a circuit, change a protective device, rewire a circuit to a different area), update the circuit chart immediately. Do not leave it for someone else to do — it will be forgotten.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Warning Labels and Safety Notices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Warning labels and safety notices are a critical layer of protection in electrical installations. They communicate hazards, provide instructions, and alert maintenance technicians to non-obvious dangers. BS 7671 specifies several mandatory warning labels, and additional labels are required by other regulations and standards. Missing or incorrect labels are frequently recorded as defects during periodic inspections.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Labels under BS 7671</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Label</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Voltage warning</td><td className="border border-white/10 px-3 py-2">514.10</td><td className="border border-white/10 px-3 py-2">Where exceeding 230 V between accessible terminals</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Earthing/bonding notice</td><td className="border border-white/10 px-3 py-2">514.13</td><td className="border border-white/10 px-3 py-2">At earthing and bonding connections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">RCD test notice</td><td className="border border-white/10 px-3 py-2">514.12</td><td className="border border-white/10 px-3 py-2">At or near origin or RCD location</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Dual/alternative supply</td><td className="border border-white/10 px-3 py-2">514.15</td><td className="border border-white/10 px-3 py-2">Where more than one source of supply exists</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Mixed colours warning</td><td className="border border-white/10 px-3 py-2">514.14</td><td className="border border-white/10 px-3 py-2">Where old and new colour codes are present</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Periodic inspection date</td><td className="border border-white/10 px-3 py-2">514.12</td><td className="border border-white/10 px-3 py-2">At or near the origin of the installation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Safety Sign Colour Standards</h3>
              <p className="text-sm text-white mb-3">
                Safety signs and labels must comply with the Health and Safety (Safety Signs and Signals)
                Regulations 1996 and BS EN ISO 7010. The colour system is standardised and must not be used
                for any other purpose.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Red</td><td className="border border-white/10 px-3 py-2">Prohibition / fire equipment</td><td className="border border-white/10 px-3 py-2">"Do Not Switch On" isolation tags</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Yellow</td><td className="border border-white/10 px-3 py-2">Warning / caution</td><td className="border border-white/10 px-3 py-2">"Danger — 400 V" voltage warnings</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Blue</td><td className="border border-white/10 px-3 py-2">Mandatory instruction</td><td className="border border-white/10 px-3 py-2">"Switch Off Before Opening"</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Green</td><td className="border border-white/10 px-3 py-2">Safe condition</td><td className="border border-white/10 px-3 py-2">Emergency exit routes, first-aid points</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Additional Safety Notices</h3>
              <p className="text-sm text-white mb-3">
                Beyond the mandatory labels specified in BS 7671, other regulations and standards require
                additional safety notices in specific situations. Maintenance technicians must be aware of
                these additional requirements.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire alarm panels (BS 5839-1):</strong> Zone charts showing detector locations, cause and effect matrices, and zone descriptions must be displayed at the fire alarm control panel</li>
                <li className="pl-1"><strong>Emergency lighting (BS 5266-1):</strong> Log books must be maintained at a designated location, with notices indicating the testing schedule and responsible person</li>
                <li className="pl-1"><strong>UPS systems:</strong> Warning labels indicating that circuits remain live when the mains supply is disconnected; must be present at the UPS, at each distribution board fed by the UPS, and at each socket outlet on a UPS-supplied circuit</li>
                <li className="pl-1"><strong>Photovoltaic systems:</strong> DC isolation warnings at the inverter, at the consumer unit, and at the meter position — solar panels generate DC voltage whenever exposed to light, even when the AC supply is isolated</li>
                <li className="pl-1"><strong>Battery systems:</strong> Chemical hazard warnings, DC shock risk notices, and emergency procedures displayed at battery installations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Warning labels save lives. A dual-supply warning at a distribution
              board alerts a technician that isolating the main switch alone may not make the board dead.
              Without this label, a fatally dangerous assumption could be made. Always check for and install
              required labels during every maintenance visit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable and Equipment Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond distribution board labelling, every cable and piece of equipment in an installation should be uniquely identified. In large industrial and commercial buildings with hundreds or thousands of cables and items of switchgear, positive identification is the foundation of safe and efficient maintenance.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Identification Methods</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat-shrink markers:</strong> Permanent, durable, resistant to heat and chemicals; ideal for SWA cable identification at glands</li>
                <li className="pl-1"><strong>Wrap-around labels:</strong> Self-laminating labels that wrap around the cable and protect the printed text; good for intermediate points</li>
                <li className="pl-1"><strong>Cable tags:</strong> Tie-on tags for larger cables on trays and ladders; must be secured to prevent loss</li>
                <li className="pl-1"><strong>Colour bands:</strong> Painted or applied colour bands for circuit or system identification on cable trays</li>
                <li className="pl-1"><strong>Direct printing:</strong> Industrial cable labelling machines print directly onto the cable sheath; permanent but requires access</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">BS EN 81346 Equipment Designation</h3>
              <p className="text-sm text-white mb-3">
                For large industrial installations, BS EN 81346 provides a structured reference designation system. Equipment is identified by a hierarchical code indicating its location, the system it belongs to, and its specific function. This creates a unique identifier for every item that can be used consistently across drawings, CMMS systems, spare parts records and physical labels.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Q:</strong> Switching device (circuit breaker, isolator, contactor)</li>
                <li className="pl-1"><strong>M:</strong> Motor</li>
                <li className="pl-1"><strong>K:</strong> Relay, contactor (control function)</li>
                <li className="pl-1"><strong>T:</strong> Transformer</li>
                <li className="pl-1"><strong>F:</strong> Protective device (fuse, overload relay)</li>
                <li className="pl-1"><strong>W:</strong> Cable, conductor, busbar</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Control Panel Terminal Identification</h3>
              <p className="text-sm text-white mb-3">
                Within control panels, every terminal must be uniquely identified and correspond exactly to the
                circuit diagrams and wiring schedules. This one-to-one relationship between drawing and physical
                installation is essential for fault diagnosis, modification and maintenance.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Terminal numbering:</strong> Sequential numbering within each terminal rail, matching the wiring diagram terminal schedule</li>
                <li className="pl-1"><strong>Wire numbering:</strong> Every wire within the panel should carry a ferrule marker or wrap-around label with its circuit reference</li>
                <li className="pl-1"><strong>Component labelling:</strong> Every component (contactor, relay, MCB, VSD) must carry a label matching its drawing reference designation</li>
                <li className="pl-1"><strong>Drawing pockets:</strong> Panels should contain a pocket or holder for the current circuit diagrams — accessible without removing the panel door</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Case Study: Cable Misidentification</p>
              <p className="text-sm text-white">
                In a reported industrial incident, a maintenance technician needed to disconnect a cable in a
                basement cable rack containing over 200 cables. No intermediate cable labels had been applied,
                and the cable schedule was out of date following several modifications. The technician identified
                the cable by colour and position, but disconnected the wrong cable — a supply to a critical
                process system. The resulting unplanned shutdown cost the facility an estimated 100,000 pounds
                in lost production. Had the cables been correctly labelled at the cable rack access point, the
                correct cable could have been positively identified in seconds.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Equipment Nameplate Information</h3>
              <p className="text-sm text-white mb-3">
                Equipment nameplates and rating plates are a form of identification that maintenance technicians
                rely on daily. Understanding what information they contain and where to find it is essential for
                safe and accurate maintenance work.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor nameplates:</strong> Rated voltage, full-load current, power factor, speed, frame size, insulation class, duty rating — essential for protective device selection and cable sizing</li>
                <li className="pl-1"><strong>Switchgear ratings:</strong> Rated current, rated voltage, prospective fault level, IP rating, operating temperature range — critical for replacement specifications</li>
                <li className="pl-1"><strong>Transformer nameplates:</strong> kVA rating, primary and secondary voltages, impedance percentage, vector group, cooling type — needed for fault calculations</li>
                <li className="pl-1"><strong>Maintenance tip:</strong> If a nameplate is missing or illegible, record the equipment details from drawings, commissioning records, or the manufacturer's records before fitting a replacement label</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A labelling system is only as good as its maintenance. Labels must be
              checked during every maintenance visit and replaced immediately if damaged, illegible or incorrect.
              An outdated label is worse than no label — it provides false information that could lead to
              dangerous errors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintaining Identification Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Labelling and identification are not one-time installation tasks — they require ongoing maintenance. Labels degrade over time due to heat, UV exposure, chemicals and physical damage. Circuit charts become outdated when modifications are made but documentation is not updated. A commitment to maintaining the identification system is a hallmark of a well-managed installation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Label Maintenance Checklist</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Check all labels for legibility during every maintenance visit</li>
                  <li className="pl-1">Replace degraded or damaged labels immediately</li>
                  <li className="pl-1">Verify circuit charts match the actual installation</li>
                  <li className="pl-1">Update documentation after every modification</li>
                  <li className="pl-1">Check all mandatory warning labels are present</li>
                  <li className="pl-1">Photograph label condition as part of maintenance records</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Documentation</h3>
                <p className="text-sm text-white">
                  Modern maintenance practice increasingly uses digital tools for documentation: QR codes linking to digital circuit charts and cable schedules; CMMS (Computerised Maintenance Management Systems) with equipment databases referencing BS EN 81346 designations; digital twins of installations for remote identification; and photographic records of label conditions. These tools supplement, but do not replace, the physical labels required at the point of access.
                </p>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Label Material Selection Guide</h3>
              <p className="text-sm text-white mb-3">
                Selecting the correct label material for the environment ensures labels remain legible and
                functional throughout the installation's life. The wrong material will degrade, losing its
                protective function.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Indoor, clean, dry</td><td className="border border-white/10 px-3 py-2">Laminated vinyl, engraved laminate</td><td className="border border-white/10 px-3 py-2">Most economical; industrial label printers produce durable results</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Industrial (heat, oil)</td><td className="border border-white/10 px-3 py-2">Engraved Traffolyte, stainless steel</td><td className="border border-white/10 px-3 py-2">Resistant to chemicals, heat and physical damage</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Outdoor / UV exposed</td><td className="border border-white/10 px-3 py-2">Anodised aluminium, UV-resistant laminate</td><td className="border border-white/10 px-3 py-2">Standard vinyl fades rapidly in direct sunlight</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Corrosive / chemical</td><td className="border border-white/10 px-3 py-2">Stainless steel, chemical-resistant polymer</td><td className="border border-white/10 px-3 py-2">Must resist specific chemicals present in the environment</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cable identification</td><td className="border border-white/10 px-3 py-2">Heat-shrink markers, self-laminating wrap-around</td><td className="border border-white/10 px-3 py-2">Heat-shrink for permanent; wrap-around for intermediate points</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Label Audit Process</h3>
              <p className="text-sm text-white mb-3">
                A systematic label audit during routine maintenance visits ensures that the identification
                system remains effective and compliant. This should be a standard part of every planned
                maintenance activity.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Check all mandatory BS 7671 labels are present (circuit charts, voltage warnings, earthing notices, RCD test notices, dual supply warnings)</li>
                <li className="pl-1"><strong>Step 2:</strong> Verify circuit chart accuracy — compare at least 3 random circuits against the physical installation</li>
                <li className="pl-1"><strong>Step 3:</strong> Inspect cable labels for legibility — replace any that are faded, damaged or peeling</li>
                <li className="pl-1"><strong>Step 4:</strong> Check equipment identification labels match current drawings and CMMS records</li>
                <li className="pl-1"><strong>Step 5:</strong> Record audit findings in the maintenance log, including any labels replaced and any discrepancies found</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Documentation is a living system. Every modification, every label
              replacement, every circuit chart update must be recorded. An installation's documentation quality
              is a direct reflection of its maintenance quality.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Periodic Inspection Findings and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Labelling deficiencies are among the most frequently recorded findings during periodic inspection and testing (EICR). Missing circuit charts, absent warning labels, illegible cable identification and incorrect equipment labelling all constitute non-compliances that must be addressed. Understanding how inspectors assess labelling helps maintenance technicians maintain installations to the required standard between inspections.
            </p>
            <p>
              The severity of labelling deficiencies is assessed using the EICR coding system. A missing dual-supply warning where a generator is present would typically be classified as C2 (potentially dangerous — urgent remedial action required), because a technician who is unaware of the second supply could be fatally injured. A faded but still legible circuit chart might be classified as C3 (improvement recommended). Understanding this classification helps prioritise remedial work.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Labelling Defects Found During Inspection</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing circuit chart:</strong> No chart at distribution board — C2 if circuits cannot be safely identified</li>
                <li className="pl-1"><strong>Inaccurate circuit chart:</strong> Chart does not reflect current installation — C2 or C3 depending on severity</li>
                <li className="pl-1"><strong>Missing voltage warning:</strong> No 400 V label on three-phase enclosure — C2</li>
                <li className="pl-1"><strong>Missing dual supply warning:</strong> Generator or alternative supply present without label — C2</li>
                <li className="pl-1"><strong>Missing earthing/bonding label:</strong> No 'Safety Electrical Connection' labels — C3</li>
                <li className="pl-1"><strong>Missing RCD test notice:</strong> No quarterly test reminder notice — C3</li>
                <li className="pl-1"><strong>Missing mixed colours notice:</strong> Old and new colour codes present without warning — C3</li>
                <li className="pl-1"><strong>Illegible cable labels:</strong> Cable identification unreadable — C3</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Proactive Maintenance Approach</h3>
              <p className="text-sm text-white">
                Rather than waiting for an inspector to identify labelling deficiencies, a proactive maintenance approach includes labelling checks in every routine inspection. A simple checklist — circuit chart accuracy, all mandatory warning labels present, cable identification legible, equipment labels matching drawings — takes minutes to complete but can prevent dangerous situations and avoid remedial costs after periodic inspection. Many organisations now include label condition photography in their maintenance records, creating a visual audit trail.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">EICR Labelling Deficiency Classification</h3>
              <p className="text-sm text-white mb-3">
                Inspectors classify labelling deficiencies using the EICR coding system. Understanding these
                classifications helps maintenance technicians prioritise remedial work and maintain installations
                between periodic inspections.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Deficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Missing circuit chart — circuits unidentifiable</td><td className="border border-white/10 px-3 py-2">C2</td><td className="border border-white/10 px-3 py-2">Urgent remedial action required</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Missing dual supply warning</td><td className="border border-white/10 px-3 py-2">C2</td><td className="border border-white/10 px-3 py-2">Urgent — potentially dangerous</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Missing voltage warning (400 V)</td><td className="border border-white/10 px-3 py-2">C2</td><td className="border border-white/10 px-3 py-2">Urgent — risk of electric shock</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Circuit chart inaccurate (minor)</td><td className="border border-white/10 px-3 py-2">C3</td><td className="border border-white/10 px-3 py-2">Improvement recommended</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Missing earthing/bonding label</td><td className="border border-white/10 px-3 py-2">C3</td><td className="border border-white/10 px-3 py-2">Improvement recommended</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Missing RCD test notice</td><td className="border border-white/10 px-3 py-2">C3</td><td className="border border-white/10 px-3 py-2">Improvement recommended</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must maintain accurate records and
              ensure installation documentation remains current. This includes circuit charts, cable schedules,
              equipment registers and all labelling systems. Record-keeping is assessed as part of the end-point
              assessment portfolio evidence.
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
                <p className="font-medium text-white mb-1">BS 7671 Mandatory Labels</p>
                <ul className="space-y-0.5">
                  <li>Circuit chart at every DB (Reg 514.9)</li>
                  <li>Voltage warning where &gt;230 V (Reg 514.10)</li>
                  <li>RCD test notice (Reg 514.12)</li>
                  <li>Earthing/bonding labels (Reg 514.13)</li>
                  <li>Mixed colours warning (Reg 514.14)</li>
                  <li>Dual/alternative supply (Reg 514.15)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 81346 — equipment reference designations</li>
                  <li>BS EN ISO 7010 — safety sign symbols</li>
                  <li>Safety signs colours: red, yellow, blue, green</li>
                  <li>Cable labels at origin, destination, intermediate points</li>
                  <li>Update charts immediately after every modification</li>
                  <li>Replace illegible labels as found during maintenance</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Trunking &amp; Conduits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section3_5;
