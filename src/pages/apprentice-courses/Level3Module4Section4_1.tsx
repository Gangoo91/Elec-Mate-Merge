/**
 * Level 3 Module 4 Section 4.1 - Visual Inspection Techniques
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Visual Inspection Techniques - Level 3 Module 4 Section 4.1";
const DESCRIPTION = "Master systematic visual inspection methods for identifying electrical faults, understanding BS 7671 inspection requirements, and recognising visual indicators of defects.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "According to BS 7671, when should visual inspection be carried out in relation to testing?",
    options: [
      "After all testing is complete",
      "Before testing and preferably with the supply disconnected",
      "Only during periodic inspection",
      "Simultaneously with live testing"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 643.1 requires visual inspection to be carried out before testing and preferably with the supply disconnected. This sequence ensures safety and allows identification of obvious faults before energising or testing circuits."
  },
  {
    id: "check-2",
    question: "What does discolouration around a terminal typically indicate?",
    options: [
      "Normal wear and tear",
      "Correct torque settings applied",
      "Overheating due to loose connection or overload",
      "High-quality installation work"
    ],
    correctIndex: 2,
    explanation: "Discolouration (yellowing, browning, or charring) around terminals is a key visual indicator of overheating. This is caused by high resistance joints from loose connections, or by overloading. It indicates a fire risk requiring immediate attention."
  },
  {
    id: "check-3",
    question: "Which of the following is NOT typically checked during visual inspection per BS 7671?",
    options: [
      "Correct connection of conductors",
      "Presence of fire barriers and seals",
      "Actual earth fault loop impedance values",
      "Condition of insulation and cable sheath"
    ],
    correctIndex: 2,
    explanation: "Earth fault loop impedance values require instrument testing - they cannot be determined by visual inspection alone. Visual inspection covers physical condition, correct installation, labelling, accessibility, and compliance with design documentation."
  },
  {
    id: "check-4",
    question: "Why is checking for thermal damage to cable insulation particularly important during visual inspection?",
    options: [
      "It affects the cable colour coding",
      "Thermal damage can reduce insulation resistance and cause earth faults or short circuits",
      "It indicates the cable manufacturer's quality",
      "Thermal damage only affects appearance, not safety"
    ],
    correctIndex: 1,
    explanation: "Thermal damage degrades cable insulation, reducing its dielectric strength and insulation resistance. This can lead to earth faults, short circuits, or fire. Identifying thermal damage visually prevents these failures before they occur."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "During initial verification visual inspection, you notice a section of cable has been painted over. What should you do?",
    options: [
      "Ignore it as paint provides additional protection",
      "Record it as a departure from BS 7671 as paint can affect cable current-carrying capacity",
      "Remove the paint immediately",
      "Accept it if the cable is correctly sized"
    ],
    correctAnswer: 1,
    explanation: "Paint and other coatings on cables can affect their current-carrying capacity by reducing heat dissipation. BS 7671 requires cables to be installed in accordance with manufacturer's instructions, and painting is not typically permitted. This should be recorded as a departure."
  },
  {
    id: 2,
    question: "What visual check confirms correct polarity at a socket outlet without using test instruments?",
    options: [
      "It cannot be confirmed visually",
      "Checking the wiring colours at the terminals match L-brown, N-blue, E-green/yellow",
      "Looking at the socket face design",
      "Checking the circuit label"
    ],
    correctAnswer: 1,
    explanation: "While instrument testing confirms polarity, a visual check of terminal connections can identify obvious polarity errors. Brown/live should be on the right terminal (looking at the face), blue/neutral on left, and green/yellow CPC at top. However, instrument testing is still required."
  },
  {
    id: 3,
    question: "During visual inspection of a consumer unit, you find an MCB with 'C32' marked on it protecting a ring final circuit. What should you verify?",
    options: [
      "That the circuit is not being overloaded",
      "That the MCB rating is suitable for the cable size and circuit design",
      "That all C-type MCBs are replaced with B-type",
      "That the consumer unit is RCD protected"
    ],
    correctAnswer: 1,
    explanation: "A C32 MCB may be acceptable for a ring final circuit if the cable size is adequate and the higher instantaneous trip current (5-10 In for Type C) is appropriate for the application. Visual inspection should verify MCB ratings against the circuit design documentation and cable sizing."
  },
  {
    id: 4,
    question: "What is the primary purpose of checking fire barriers and seals during visual inspection?",
    options: [
      "To verify the installation looks professional",
      "To confirm fire compartmentalisation has been maintained where cables pass through fire-resistant elements",
      "To check that water cannot enter the installation",
      "To ensure cables are securely fixed"
    ],
    correctAnswer: 1,
    explanation: "Fire barriers and seals maintain the fire resistance of building elements (walls, floors, ceilings) where cables pass through. Without proper sealing, fire can spread through cable routes. Regulation 527.2 requires sealing to maintain fire-resistant elements."
  },
  {
    id: 5,
    question: "You observe green/brown staining around a brass gland on SWA cable. What does this indicate?",
    options: [
      "Normal oxidation that can be ignored",
      "Water ingress causing corrosion - requires investigation",
      "The gland was correctly installed",
      "The armour has been correctly earthed"
    ],
    correctAnswer: 1,
    explanation: "Green/brown staining around brass glands indicates water ingress and corrosion. This compromises the IP rating, can cause earth continuity issues with the armour, and may lead to cable insulation degradation. The cause must be investigated and the gland replaced."
  },
  {
    id: 6,
    question: "During inspection of a three-phase distribution board, you notice one busbar has darker discolouration than the others. What fault does this suggest?",
    options: [
      "The board is three-phase and working correctly",
      "Unbalanced loading or a high-resistance connection on that phase",
      "Normal variation in busbar appearance",
      "The phase sequence is incorrect"
    ],
    correctAnswer: 1,
    explanation: "Uneven discolouration on busbars indicates different temperatures between phases. This suggests either unbalanced loading (one phase carrying more current) or a high-resistance connection on the discoloured phase. Both require investigation and correction."
  },
  {
    id: 7,
    question: "What should be visually checked regarding cable support in vertical runs?",
    options: [
      "That cables are loosely supported to allow expansion",
      "That support spacing prevents excessive strain on cables and connections",
      "That cables can move freely in the vertical run",
      "That only the top connection is secured"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 4A requires specific support intervals for cables. In vertical runs, inadequate support causes cable weight to strain terminations, potentially causing disconnection or high-resistance joints. Support spacing must prevent excessive mechanical stress."
  },
  {
    id: 8,
    question: "You are inspecting a bathroom installation. What visual checks are specific to this location?",
    options: [
      "Only checking the light fitting is working",
      "Verifying zone compliance, IP ratings, RCD protection notices, and absence of accessories in zones 0-1",
      "Checking all sockets have RCD protection",
      "Ensuring there is adequate ventilation"
    ],
    correctAnswer: 1,
    explanation: "Bathroom inspection per Section 701 includes verifying equipment is suitable for its zone (0, 1, 2, or outside zones), has appropriate IP ratings (IPX4 minimum for zone 1), supplementary bonding if required, and that socket outlets are at least 3m from zone 1 unless they are SELV or for shavers."
  },
  {
    id: 9,
    question: "What visual indication suggests a cable may have been subjected to overcurrent in the past?",
    options: [
      "Bright, shiny conductor strands",
      "Discolouration of insulation, melted or deformed sheath, or oxidised conductors",
      "Standard flexible cable appearance",
      "Clean, undamaged outer sheath"
    ],
    correctAnswer: 1,
    explanation: "Historical overcurrent causes thermal damage visible as discoloured, melted, or deformed insulation/sheath, and oxidised (blackened/dulled) conductors at terminations. Even if the circuit now works, this damage may have compromised insulation integrity."
  },
  {
    id: 10,
    question: "During visual inspection of an agricultural installation, what additional consideration applies?",
    options: [
      "Only IP20 equipment is required",
      "Equipment must be suitable for the environment including dust, moisture, chemicals, and livestock interference",
      "Standard domestic installation rules apply",
      "Visual inspection is not required"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Section 705 covers agricultural installations. Visual inspection must verify equipment suitability for harsh environmental conditions including dust, moisture, corrosive chemicals (fertilisers, cleaning agents), mechanical damage from livestock, and enhanced earth fault protection requirements."
  },
  {
    id: 11,
    question: "What does checking for 'suitability of accessories and equipment' involve during visual inspection?",
    options: [
      "Only checking they are the correct colour",
      "Verifying voltage rating, current rating, IP rating, and suitability for the environmental conditions",
      "Confirming they are from approved manufacturers",
      "Checking they have been installed recently"
    ],
    correctAnswer: 1,
    explanation: "Suitability verification includes checking equipment ratings match the circuit (voltage, current), IP ratings are appropriate for the location, and equipment can withstand environmental conditions (temperature, humidity, corrosion, UV, vibration, impact). Labels and markings provide this information."
  },
  {
    id: 12,
    question: "You find that circuit charts at the consumer unit are blank or illegible. What classification should this receive on an EICR?",
    options: [
      "No action required - this is normal",
      "C3 - Improvement recommended for informative purposes",
      "C2 - Potentially dangerous, requiring urgent remedial action",
      "C1 - Danger present requiring immediate action"
    ],
    correctAnswer: 1,
    explanation: "Missing or illegible circuit charts (required by Regulation 514.9) are typically classified as C3 - improvement recommended. While not immediately dangerous, they hinder safe isolation and maintenance. In some contexts (commercial/industrial), this may warrant C2 if it significantly affects safety management."
  }
];

const faqs = [
  {
    question: "What is the correct sequence of inspection and testing according to BS 7671?",
    answer: "BS 7671 requires visual inspection to be completed BEFORE testing begins. The inspection should preferably be carried out with the supply disconnected. This sequence ensures obvious faults are identified before any power is applied or instrument tests are conducted, enhancing safety for the inspector and preventing damage from testing faulty circuits."
  },
  {
    question: "How do I know if a visual defect should fail an EICR?",
    answer: "Code C1 (danger present) is for defects requiring immediate action - exposed live parts, immediate fire risks, or absent basic protection. Code C2 (potentially dangerous) is for defects likely to cause danger - inadequate earthing, damaged insulation, overcurrent protection issues. Code C3 (improvement recommended) is for non-compliance that doesn't pose immediate danger. Professional judgement is required, considering the specific installation and usage."
  },
  {
    question: "What tools are needed for visual inspection?",
    answer: "Basic visual inspection requires good lighting (torch/headlamp), a mirror for inspecting behind equipment, appropriate screwdrivers to remove covers, a camera for recording defects, the installation documentation for comparison, and PPE. No electrical test instruments are used during visual inspection itself, though a voltage indicator may be needed to confirm isolation."
  },
  {
    question: "Can I carry out visual inspection on an energised installation?",
    answer: "While visual inspection should preferably be done de-energised (Regulation 643.1), it can be carried out energised if necessary. However, opening enclosures and examining live parts energised requires appropriate precautions, risk assessments, and may require additional PPE. Certain aspects like terminal security cannot be safely checked whilst live."
  },
  {
    question: "What documentation should I compare against during visual inspection?",
    answer: "Compare against: circuit charts/schedules, design specifications, previous EICRs/EICs, fire strategy documents (for fire barriers), manufacturer's installation instructions, and relevant British Standards. Absence of documentation doesn't prevent inspection but should be noted as a limitation. The inspector must still verify compliance with current BS 7671."
  },
  {
    question: "How long should a thorough visual inspection take?",
    answer: "Duration depends on installation size and complexity. A domestic consumer unit might take 30-60 minutes for detailed visual inspection. Commercial installations require proportionally more time. Rushing visual inspection leads to missed defects. Allow adequate time to remove covers, inspect terminations, trace cable routes, and properly document findings."
  }
];

const Level3Module4Section4_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module4-section4">
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
            <span>Module 4.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Visual Inspection Techniques
          </h1>
          <p className="text-white/80">
            Systematic methods for identifying faults and non-compliance through careful observation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sequence:</strong> Visual inspection BEFORE testing</li>
              <li><strong>State:</strong> Preferably with supply disconnected</li>
              <li><strong>Purpose:</strong> Identify obvious defects safely</li>
              <li><strong>Reference:</strong> BS 7671 Regulations 643.1-643.6</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Discolouration = overheating/fire risk</li>
              <li><strong>Spot:</strong> Damaged sheath = mechanical damage</li>
              <li><strong>Use:</strong> Check cable colours match terminals</li>
              <li><strong>Use:</strong> Verify IP ratings match location</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and sequence of visual inspection per BS 7671",
              "Identify key visual indicators of electrical faults and defects",
              "Apply systematic inspection methods to different installation types",
              "Recognise signs of thermal damage, mechanical damage, and deterioration",
              "Assess suitability of equipment for environmental conditions",
              "Document and classify visual inspection findings appropriately"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Purpose and Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose and BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is the first stage of verification, carried out before any testing begins. BS 7671 Regulation 643.1 is explicit: inspection shall precede testing and shall normally be done with the installation disconnected from the supply. This sequence is critical for safety - obvious faults identified visually prevent dangerous situations during testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Regulation 643.2 requires verification that equipment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complies with safety requirements of the appropriate British or Harmonised Standard</li>
                <li>Is correctly selected and erected in accordance with the Regulations</li>
                <li>Is not visibly damaged or defective so as to impair safety</li>
                <li>Is suitable for the environmental conditions (IP rating, temperature, UV exposure)</li>
                <li>Has protective devices correctly sized for circuit protection</li>
              </ul>
            </div>

            <p>
              The inspection checklist in BS 7671 Regulation 643.3 provides a minimum list of items to inspect, but professional judgement determines what is appropriate for each installation. A simple domestic extension requires less extensive inspection than a complex industrial installation, but the principles remain the same.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Visual inspection cannot replace testing, but it can identify faults that testing might miss - physical damage, unsuitable equipment, poor workmanship, and fire risks from overheating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Key Visual Indicators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Visual Indicators of Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective visual inspection requires knowing what to look for. Faults leave visible evidence - thermal damage, physical damage, corrosion, and deterioration all have characteristic appearances that trained inspectors recognise instantly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Damage Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Discolouration (yellowing, browning, charring) around terminals</li>
                  <li>Melted or deformed plastic enclosures</li>
                  <li>Oxidised (blackened) conductor strands</li>
                  <li>Burnt smell even without visible damage</li>
                  <li>Bubbled or cracked paint on metalwork</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Damage Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cut, abraded, or crushed cable sheath</li>
                  <li>Exposed conductor insulation or bare conductors</li>
                  <li>Cracked or broken enclosures</li>
                  <li>Missing blanks or knockouts</li>
                  <li>Deformed cable glands or compression marks</li>
                </ul>
              </div>
            </div>

            <p>
              Corrosion is particularly important in harsh environments. Look for green verdigris on copper, white powder on aluminium, and rust on ferrous metals. Corrosion at terminations increases resistance, leading to heating - so corrosion often precedes thermal damage.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A consumer unit inspection reveals brown discolouration around one MCB. The plastic is slightly melted. This indicates a high-resistance connection - probably a loose terminal. The circuit must be isolated, the MCB and wiring checked, connections re-made with correct torque, and the damaged MCB replaced.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Systematic Inspection Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Systematic Inspection Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic approach ensures nothing is missed. Work logically through the installation from the origin (intake) outwards to the final circuits. At each point, check the same categories of items consistently.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Regulation 643.3 inspection checklist categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connection of conductors:</strong> Correct polarity, secure terminations, correct conductor identification</li>
                <li><strong>Identification and notices:</strong> Circuit charts, warning labels, safety notices present and legible</li>
                <li><strong>Basic and fault protection:</strong> Enclosures intact, barriers present, protective devices correctly rated</li>
                <li><strong>Fire precautions:</strong> Cable penetration seals, fire barriers, segregation of circuits</li>
                <li><strong>Selection and erection:</strong> Cable sizing, support spacing, protection from external influences</li>
                <li><strong>Special installations:</strong> Bathroom zones, outdoor equipment, special location requirements</li>
              </ul>
            </div>

            <p>
              Documentation is essential. Record what you inspect, what you find, and any limitations on your inspection (areas not accessible, covers not removed). Photographs provide valuable evidence of defects and support your written findings.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you cannot access an area to inspect it, record this as a limitation. Never assume something is acceptable just because you cannot see it - state clearly what was and was not inspected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Environmental and Location Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Environmental and Location Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every installation exists in an environment that affects its safety. Visual inspection must verify that equipment is suitable for its location. BS 7671 Part 7 covers special installations and locations with additional requirements that must be visually verified.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP Ratings</p>
                <p className="text-white/90 text-xs">Check equipment IP rating suits the location's dust and water exposure</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Temperature</p>
                <p className="text-white/90 text-xs">Verify equipment rated for ambient temperature range at installation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">UV/Sunlight</p>
                <p className="text-white/90 text-xs">Outdoor cables must be UV resistant - check for degradation</p>
              </div>
            </div>

            <p>
              Special locations require specific visual checks. Bathrooms: verify zone compliance and IP ratings. Swimming pools: check SELV supplies and equipotential bonding visibility. Outdoor installations: verify weatherproofing and UV resistance. Agricultural buildings: check for livestock damage and chemical corrosion.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Inspecting an outdoor socket outlet, you observe the cover seal is cracked and the cable gland shows signs of water ingress (green staining). The socket is marked IP44 but the damage has compromised this rating. Record as C2 - the weatherproofing must be restored or the installation made suitable for outdoor use.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Inspection Preparation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain all available documentation - previous certificates, circuit charts, design specifications</li>
                <li>Arrange safe isolation and confirm with voltage indicator (GS38 compliant)</li>
                <li>Prepare tools: torch, screwdrivers, mirror, camera, notebook, PPE</li>
                <li>Plan your route through the installation systematically</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Inspection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work from origin outwards - consumer unit/distribution boards first, then circuits</li>
                <li>Open enclosures carefully and photograph before disturbing connections</li>
                <li>Check torque on accessible terminals (if appropriate tools available)</li>
                <li>Document every defect with location, description, and photo reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing the inspection</strong> - Inadequate time leads to missed defects</li>
                <li><strong>Not opening enclosures</strong> - Many faults are inside consumer units and junction boxes</li>
                <li><strong>Poor documentation</strong> - "Everything OK" is not adequate - record what you checked</li>
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
                <p className="font-medium text-white mb-1">Visual Indicators</p>
                <ul className="space-y-0.5">
                  <li>Brown/yellow discolouration = Overheating</li>
                  <li>Melted plastic = Serious thermal fault</li>
                  <li>Green staining = Corrosion/water ingress</li>
                  <li>Damaged sheath = Mechanical damage</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>643.1 - Inspection before testing</li>
                  <li>643.2 - What to verify</li>
                  <li>643.3 - Items to inspect</li>
                  <li>514.9 - Circuit chart requirements</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section3-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Overheating and Insulation Breakdown
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section4-2">
              Next: Continuity and Insulation Resistance Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section4_1;
