import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Jointing and Termination - MOET Module 4.4.3";
const DESCRIPTION = "Comprehensive guide to cable jointing and termination techniques for maintenance technicians: straight joints, branch joints, heat shrink, cold shrink, resin joints, SWA glands, multicore termination, crimping, torque requirements and post-jointing testing under BS 7671.";

const quickCheckQuestions = [
  {
    id: "straight-joint",
    question: "What is the primary purpose of a straight-through cable joint?",
    options: [
      "To change the cable from single-core to multicore",
      "To repair a damaged section of cable or extend a cable run while maintaining electrical continuity, insulation integrity and mechanical protection",
      "To reduce the cable cross-sectional area",
      "To convert AC to DC"
    ],
    correctIndex: 1,
    explanation: "A straight-through joint connects two cable ends to maintain electrical continuity, restore insulation integrity and provide mechanical protection equivalent to the original cable. The joint must maintain the cable's current-carrying capacity, insulation resistance, and where applicable, the earth continuity of the armour or screen."
  },
  {
    id: "swa-gland",
    question: "When terminating a steel wire armoured (SWA) cable, the gland serves which dual function?",
    options: [
      "It provides a watertight seal only",
      "It mechanically clamps the cable armour to provide both mechanical retention and an earth continuity connection through the armour",
      "It only provides an earth connection",
      "It is purely decorative"
    ],
    correctIndex: 1,
    explanation: "An SWA cable gland (e.g., CW or BW type) serves two critical functions: it mechanically clamps the wire armour to provide strain relief and cable retention, and it provides a low-resistance earth continuity connection between the cable armour and the earthing system of the enclosure. Both functions are essential for safety — failure of either can result in cable pull-out or loss of earth continuity."
  },
  {
    id: "crimp-tool",
    question: "Why must crimped connections be made using the correct die size in a calibrated crimp tool?",
    options: [
      "To make the crimp look neat",
      "To achieve the correct compression that ensures a gas-tight connection with the specified mechanical strength and current-carrying capacity",
      "Because regulations require a specific colour of crimp",
      "To satisfy insurance requirements only"
    ],
    correctIndex: 1,
    explanation: "Correct crimp die size produces the precise compression needed for a gas-tight metal-to-metal contact between the conductor and the crimp terminal. Under-crimping results in a loose connection with high resistance, leading to overheating. Over-crimping damages the conductor strands, reducing the cross-sectional area and weakening the joint. Only calibrated tools with matching dies produce reliable crimps."
  },
  {
    id: "ir-after-joint",
    question: "What minimum insulation resistance value would you expect to achieve after completing a cable joint on a 400 V circuit?",
    options: [
      "0.25 MΩ",
      "0.5 MΩ",
      "1.0 MΩ or greater (per BS 7671 Table 6.3)",
      "10 kΩ"
    ],
    correctIndex: 2,
    explanation: "BS 7671 Table 6.3 specifies a minimum insulation resistance of 1.0 MΩ for circuits operating above 50 V up to and including 500 V, tested at 500 V DC. A properly made joint should achieve significantly higher values — typically tens or hundreds of megohms. A reading at or near the minimum indicates a potential issue with the joint quality that warrants investigation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which type of cable joint uses pre-formed rubber sleeves that contract under tension when a support core is removed?",
    options: [
      "Heat shrink joint",
      "Cold shrink joint",
      "Resin-filled joint",
      "Mechanical compression joint"
    ],
    correctAnswer: 1,
    explanation: "Cold shrink joints use EPDM rubber sleeves that are factory-expanded and held on a support core. When the core is removed at installation, the sleeve contracts under its own elasticity to grip the cable tightly. Cold shrink technology requires no heat source, making it safer for use in confined spaces, hazardous areas and where open flames are prohibited."
  },
  {
    id: 2,
    question: "When making a heat shrink joint, the heat gun temperature should be:",
    options: [
      "As high as possible to speed up the process",
      "Set to the temperature recommended by the joint kit manufacturer and applied evenly, working from the centre outward to expel air and moisture",
      "Applied to one spot until fully shrunk before moving on",
      "The same temperature regardless of the cable size or joint type"
    ],
    correctAnswer: 1,
    explanation: "The heat gun must be set to the manufacturer's recommended temperature (typically 100-130°C for standard heat shrink). Heat must be applied evenly, working from the centre of the joint outward towards each end to expel trapped air and moisture. Overheating damages the cable insulation and can cause the heat shrink material to burn or become brittle. Uneven heating results in incomplete shrinkage and potential voids."
  },
  {
    id: 3,
    question: "Resin-filled cable joints are particularly suitable for:",
    options: [
      "Temporary repairs only",
      "Situations where the joint may be submerged in water or buried directly in the ground, as the resin provides a watertight and mechanically robust seal",
      "Indoor lighting circuits only",
      "Joints where future disassembly is required"
    ],
    correctAnswer: 1,
    explanation: "Resin joints provide excellent protection against moisture ingress and mechanical damage, making them the preferred choice for underground cable joints and joints in damp or submerged locations. The two-part resin is mixed and poured into a mould around the joint, where it sets to form a solid, waterproof and electrically insulating barrier. Once set, resin joints are permanent and cannot be disassembled."
  },
  {
    id: 4,
    question: "When stripping SWA cable for gland termination, the critical dimensions are:",
    options: [
      "Not important — strip as much as needed",
      "The armour strip length (determined by the gland size), the outer sheath strip length, the inner sheath strip length, and the conductor tail length — all specified in the gland manufacturer's installation guide",
      "Only the conductor tail length matters",
      "All cables are stripped to the same dimensions regardless of size"
    ],
    correctAnswer: 1,
    explanation: "Each dimension is critical for a correct gland installation: the outer sheath strip length must allow the gland compression ring to seat correctly, the armour strip length must provide enough armour for the gland to clamp securely, the inner sheath strip provides insulation between the armour and conductors, and the conductor tails must be long enough for termination but not so long as to create excess conductor in the enclosure."
  },
  {
    id: 5,
    question: "The correct crimping sequence for a bootlace ferrule on a stranded conductor is:",
    options: [
      "Insert the conductor, then crimp with pliers",
      "Twist the strands tightly, insert fully into the ferrule, and crimp with the correct tool using the matching die — verify the ferrule is correctly shaped with no strand visible outside the ferrule",
      "Solder the strands first, then insert into the ferrule",
      "Cut the conductor flush and push directly into the terminal"
    ],
    correctAnswer: 1,
    explanation: "Stranded conductors must be fully inserted into the bootlace ferrule without pre-twisting (which can prevent full insertion). The ferrule is then crimped using the correct tool with the matching die size. The crimp should produce a clean, symmetrical compression with all strands contained within the ferrule. Soldering before crimping is incorrect as solder creep under terminal pressure can cause a loose connection over time."
  },
  {
    id: 6,
    question: "What type of SWA gland is suitable for indoor use with a cable entering a steel enclosure?",
    options: [
      "CW type (indoor/outdoor weatherproof)",
      "BW type (indoor unarmoured cable gland)",
      "CW type for outdoor, BW type for indoor — but for SWA cable entering steel enclosures, a CW gland with an earthing tag is typically used",
      "Any gland will work regardless of location"
    ],
    correctAnswer: 2,
    explanation: "For SWA cables entering steel enclosures indoors, a CW-type gland is typically used as it provides a complete armour clamp, seal and earth continuity. BW-type glands are designed for single-core or unarmoured cables. The CW gland's compression ring and cone grip the wire armour, and an internal earth tag provides the earth continuity path. For outdoor or weatherproof applications, glands with additional sealing may be required."
  },
  {
    id: 7,
    question: "Why should cable cores be individually identified (marked) before jointing?",
    options: [
      "To make the joint look professional",
      "To ensure correct phase identification is maintained across the joint — incorrect phasing can cause motor reversal, equipment damage, or dangerous cross-connections",
      "Identification is not necessary for joints",
      "Only for three-phase cables above 25 mm²"
    ],
    correctAnswer: 1,
    explanation: "Core identification ensures that each conductor is reconnected to its correct counterpart across the joint. In three-phase circuits, incorrect phasing causes motor reversal and equipment damage. In control circuits, cross-connections can cause dangerous maloperation. BS 7671 requires cable identification throughout, and joints must maintain this identification using colour-coded heat shrink sleeves, ferrule markers or other permanent marking methods."
  },
  {
    id: 8,
    question: "After completing a cable joint, which tests should be carried out BEFORE the cable is re-energised?",
    options: [
      "No testing is required — visual inspection is sufficient",
      "Insulation resistance test between all conductors and earth and between conductors, continuity test of all conductors through the joint, and visual inspection of the completed joint",
      "Only a continuity test",
      "Only a voltage test"
    ],
    correctAnswer: 1,
    explanation: "After jointing, a minimum of three tests must be carried out: insulation resistance (to confirm the joint's insulation integrity — minimum 1.0 MΩ for LV per BS 7671), continuity (to confirm each conductor is correctly connected through the joint with acceptable resistance), and a thorough visual inspection (to check for exposed conductors, correct sealing, and mechanical integrity). These tests verify both the electrical and physical quality of the joint."
  },
  {
    id: 9,
    question: "What is the purpose of stress control in medium voltage (MV) cable terminations?",
    options: [
      "To make the termination physically stronger",
      "To control the electrical stress concentration at the point where the cable insulation screen is cut back, preventing partial discharge and eventual insulation breakdown",
      "To reduce the weight of the termination",
      "To improve the cable's current-carrying capacity"
    ],
    correctAnswer: 1,
    explanation: "At the screen cut-back point of an MV cable, the electric field concentration increases dramatically. Without stress control, this concentrated field causes partial discharge (corona) which progressively degrades the insulation, eventually leading to flashover and cable failure. Stress control tubes, cones or grading materials redistribute the electric field to manageable levels, preventing partial discharge and ensuring long-term reliability."
  },
  {
    id: 10,
    question: "Torque values for electrical terminal connections are important because:",
    options: [
      "They are only a guideline and can be ignored",
      "Correct torque ensures a reliable low-resistance connection — too loose causes overheating, too tight damages the terminal or conductor",
      "Higher torque always means a better connection",
      "Torque only matters for connections above 100 A"
    ],
    correctAnswer: 1,
    explanation: "Torque-controlled connections are essential for reliable electrical joints. Under-torqued connections result in high contact resistance and localised heating — a leading cause of electrical fires. Over-torqued connections damage terminal threads, crush conductor strands, and crack terminal blocks, all of which create unreliable connections. BS 7671 Regulation 526.2 requires connections to be mechanically and electrically reliable, and manufacturer's torque specifications provide the benchmark."
  },
  {
    id: 11,
    question: "When jointing XLPE-insulated cables, which precaution is particularly important compared to PVC cables?",
    options: [
      "XLPE cables are easier to joint than PVC",
      "XLPE insulation must be handled with extreme cleanliness — contamination (fingerprints, moisture, dust) on the insulation surface can cause partial discharge sites and eventual failure",
      "XLPE cables cannot be jointed at all",
      "No special precautions are needed"
    ],
    correctAnswer: 1,
    explanation: "XLPE (cross-linked polyethylene) insulation is highly sensitive to contamination. Even fingerprints or microscopic dust particles can create weak points in the insulation where partial discharge can initiate under voltage stress. Jointing XLPE cables requires scrupulous cleanliness: clean hands or gloves, lint-free cleaning materials, and protection from rain, dust and condensation. This is especially critical for MV and HV cable joints where the voltage stress is high."
  },
  {
    id: 12,
    question: "A branch joint (tee joint) in a cable differs from a straight joint in that:",
    options: [
      "It is simpler to make",
      "It allows a new cable to be connected into an existing cable run without breaking the through circuit, creating a T-shaped junction",
      "It can only be used underground",
      "It does not require insulation resistance testing"
    ],
    correctAnswer: 1,
    explanation: "A branch (tee) joint allows a tap-off connection from an existing cable without interrupting the through circuit. The joint must maintain the current-carrying capacity of both the through cable and the branch, provide adequate insulation for all conductors, and where applicable, maintain the earth continuity of the cable armour for all three cable sections. Branch joints are more complex than straight joints and require careful planning of conductor connections and insulation build-up."
  }
];

const faqs = [
  {
    question: "Can I use a straight connector block (choc block) as a permanent cable joint?",
    answer: "Connector blocks (strip connectors) can be used for permanent connections only when installed in a suitable enclosure that provides mechanical protection and maintains the IP rating required for the installation location. They should not be used as buried or concealed joints, nor where they may be subject to vibration or mechanical stress. For underground joints, buried joints, or high-current connections, purpose-designed joint kits (heat shrink, cold shrink, or resin) should always be used."
  },
  {
    question: "What is the difference between a CW and a BW cable gland?",
    answer: "CW (Cable Wire) glands are designed for SWA (steel wire armoured) cables and provide armour clamping, cable retention and earth continuity. They consist of an outer gland body, compression ring, cone and locknut. BW (Brass Weather) glands are designed for non-armoured cables and provide cable retention and sealing only — they do not clamp armour. Using a BW gland on an SWA cable would fail to clamp the armour and would not provide earth continuity through the armour."
  },
  {
    question: "Is soldering acceptable for making permanent electrical connections?",
    answer: "BS 7671 Regulation 526.1 permits soldered connections but requires them to be made in accordance with the relevant standards and to provide adequate mechanical strength independent of the solder. In practice, soldered connections are being increasingly replaced by crimped connections which provide more consistent and reliable results. Soldered connections are susceptible to dry joints, flux corrosion, and solder creep under terminal clamp pressure. Where soldering is used, the conductor must be mechanically secured before soldering."
  },
  {
    question: "How do I determine the correct gland size for a cable?",
    answer: "The gland size is determined by the cable's overall diameter (including outer sheath). Each gland size has a specified range of cable diameters it can accommodate. Refer to the gland manufacturer's selection chart, which cross-references cable type and size to the correct gland. For example, a 4-core 10 mm² SWA cable typically requires a 25 mm (25S) CW gland. Using an incorrect gland size will result in either an inadequate seal and clamp (too large) or inability to fit (too small)."
  },
  {
    question: "Why should I never twist stranded conductors before inserting them into bootlace ferrules?",
    answer: "Pre-twisting stranded conductors before inserting them into a bootlace ferrule can prevent the individual strands from spreading evenly within the ferrule barrel, potentially leaving some strands outside or creating voids inside. The strands should be naturally aligned and pushed straight into the ferrule, ensuring all strands are captured. The crimping action then compresses all strands uniformly within the ferrule, creating a gas-tight connection. Soldering before ferrule insertion is also incorrect, as solder creep under clamp pressure can cause connections to loosen over time."
  }
];

const MOETModule4Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 4.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Jointing and Termination
          </h1>
          <p className="text-white/80">
            Straight joints, branch joints, heat shrink, cold shrink, resin joints, SWA glands, crimping and torque requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Straight/branch joints:</strong> Restore continuity, insulation and mechanical protection</li>
              <li className="pl-1"><strong>Heat/cold shrink:</strong> Two main jointing technologies for LV and MV cables</li>
              <li className="pl-1"><strong>SWA glands:</strong> Mechanical retention plus earth continuity through armour</li>
              <li className="pl-1"><strong>Test after jointing:</strong> IR, continuity and visual inspection are mandatory</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Standards and Guidance</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671 Reg 526:</strong> Electrical connections — reliability and accessibility</li>
              <li className="pl-1"><strong>BS 7671 Reg 522.8:</strong> Joints and connections — protection and enclosure</li>
              <li className="pl-1"><strong>BS 6346/BS 5467:</strong> PVC and XLPE cable construction standards</li>
              <li className="pl-1"><strong>ST1426:</strong> Cable installation and termination competences</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe straight joint and branch joint construction techniques for LV cables",
              "Compare heat shrink, cold shrink and resin joint technologies and their applications",
              "Correctly terminate SWA cables using CW-type glands with earth continuity",
              "Apply crimping techniques using calibrated tools and correct die sizes",
              "Specify and apply correct torque values for electrical terminal connections",
              "Carry out post-jointing testing including insulation resistance and continuity"
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
            Straight Joints and Branch Joints
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable joints are required when a cable must be repaired, extended, or when a new circuit must
              be tapped from an existing cable run. The quality of the joint directly affects the reliability,
              safety and longevity of the installation. A poorly made joint can result in high-resistance
              connections (causing overheating and fire), insulation failure (causing earth faults or short
              circuits), or mechanical failure (allowing moisture ingress and eventual cable failure).
            </p>
            <p>
              BS 7671 Regulation 526.3 requires that every connection shall be accessible for inspection,
              testing and maintenance unless it is a joint designed to be buried in the ground, a joint
              in a compound-filled enclosure, or a connection between a cold tail and the heating element
              of a ceiling or floor heating system. This means most cable joints must be in accessible
              positions — typically in junction boxes, distribution boards or purpose-made joint enclosures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Straight Joint Construction — Key Steps</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Prepare cable ends:</strong> Strip the outer sheath, armour (if SWA), bedding and core insulation to the dimensions specified in the joint kit instructions</li>
                <li className="pl-1"><strong>Clean and identify cores:</strong> Clean all surfaces with the supplied solvent wipes. Apply colour identification sleeves to maintain phase identification</li>
                <li className="pl-1"><strong>Connect conductors:</strong> Use the supplied connector barrels, compression connectors or mechanical connectors. Ensure full conductor insertion and correct crimp/torque</li>
                <li className="pl-1"><strong>Insulate individual cores:</strong> Apply core insulation using heat shrink sleeves, cold shrink tubes, or self-amalgamating tape built up to the required thickness</li>
                <li className="pl-1"><strong>Reconstruct armour continuity:</strong> For SWA cables, connect the armour wires across the joint using earth straps or the joint body</li>
                <li className="pl-1"><strong>Apply outer protection:</strong> Heat shrink, cold shrink or resin encapsulation to provide the overall mechanical and moisture protection</li>
                <li className="pl-1"><strong>Test:</strong> Insulation resistance, continuity, and visual inspection before burial or concealment</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Branch (Tee) Joint Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Through circuit integrity:</strong> The through cable must not be cut — individual cores are exposed for the branch connection</li>
                <li className="pl-1"><strong>Branch connection:</strong> Tap connectors or compression connectors join the branch conductors to the through conductors</li>
                <li className="pl-1"><strong>Current rating:</strong> The branch connection and branch cable must be rated for the branch circuit current</li>
                <li className="pl-1"><strong>Protection:</strong> The branch circuit must have appropriate overcurrent protection at or near the point of connection</li>
                <li className="pl-1"><strong>Armour continuity:</strong> All three cable armours must be bonded together at the joint</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Heat Shrink, Cold Shrink and Resin Joint Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three main technologies are used for cable jointing and termination in maintenance work:
              heat shrink, cold shrink and resin-filled joints. Each has specific advantages and applications,
              and the maintenance technician must understand when to use each technology and the correct
              installation procedures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Joint Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Shrink</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cold Shrink</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Heat source needed</td>
                      <td className="border border-white/10 px-3 py-2">Yes — gas torch or heat gun</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Suitable for hazardous areas</td>
                      <td className="border border-white/10 px-3 py-2">Restricted — open flame risk</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                      <td className="border border-white/10 px-3 py-2">Yes (once cured)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Moisture resistance</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Reusable/repairable</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">No (but removable)</td>
                      <td className="border border-white/10 px-3 py-2">No (permanent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Best application</td>
                      <td className="border border-white/10 px-3 py-2">General LV/MV joints</td>
                      <td className="border border-white/10 px-3 py-2">MV terminations, confined spaces</td>
                      <td className="border border-white/10 px-3 py-2">Underground, submerged joints</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Heat Shrink Application Best Practice</p>
              <p className="text-sm text-white">
                When applying heat shrink materials, always work from the centre outward to expel air and
                moisture. Use a rotating motion to apply heat evenly around the circumference. Avoid
                overheating — the material should shrink smoothly without bubbling, burning or becoming brittle.
                Look for adhesive 'squeeze-out' at the ends of adhesive-lined heat shrink, which confirms
                a complete seal. Allow adequate cooling before handling or applying mechanical stress to the joint.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SWA Gland Termination and Multicore Cable Termination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Steel wire armoured (SWA) cables are the most commonly used power cables in UK commercial and
              industrial installations. Correct gland termination is essential for mechanical retention of
              the cable, maintenance of the IP rating of the enclosure, and continuity of the earth path
              through the cable armour to the earthing system.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Gland Installation Procedure (CW Type)</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Measure and mark:</strong> Refer to the gland installation dimensions for the cable size. Mark the outer sheath strip, armour strip and inner sheath strip positions</li>
                <li className="pl-1"><strong>Strip outer sheath:</strong> Score carefully around the cable, taking care not to cut into the armour wires. Remove the sheath cleanly</li>
                <li className="pl-1"><strong>Fit back nut:</strong> Thread the gland back nut over the cable before cutting the armour</li>
                <li className="pl-1"><strong>Cut armour wires:</strong> Cut each wire individually with armour wire cutters. Fan the wires outward evenly around the circumference</li>
                <li className="pl-1"><strong>Remove bedding:</strong> Strip the bedding (inner sheath) to expose the cores</li>
                <li className="pl-1"><strong>Fit gland body:</strong> Slide the gland body over the fanned armour wires into the enclosure knockout. Secure with the gland locknut inside the enclosure</li>
                <li className="pl-1"><strong>Cone and compression:</strong> Fit the cone over the armour wires, then tighten the back nut to compress the armour wires between the cone and the gland body</li>
                <li className="pl-1"><strong>Earth tag:</strong> If an external earth is required, fit the earth tag between the locknut and the enclosure</li>
                <li className="pl-1"><strong>Verify:</strong> Check the armour is firmly clamped (cable cannot be pulled out), earth continuity is confirmed, and the seal is complete</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multicore Cable Core Identification (BS 7671)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single phase:</strong> Brown (line), blue (neutral), green/yellow (earth) — or grey (line), black (neutral) for older installations</li>
                <li className="pl-1"><strong>Three phase:</strong> Brown (L1), black (L2), grey (L3), blue (N), green/yellow (earth)</li>
                <li className="pl-1"><strong>SWA with reduced cores:</strong> If the cable has fewer colours, heat shrink sleeves of the correct colour must be applied at each termination point</li>
                <li className="pl-1"><strong>Control cables:</strong> Core numbering is used — reference cable schedule for identification</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Crimping Techniques, Torque Requirements and Post-Jointing Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of electrical connections is determined by the method of making the connection and
              the force applied. Crimping and torquing are the two primary methods of creating reliable,
              low-resistance connections. Both require the correct tools and technique — improvisation with
              incorrect tools is a leading cause of connection failures, overheating and fires.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crimping Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tool selection:</strong> Use a calibrated crimp tool with interchangeable dies matched to the terminal type and conductor size</li>
                <li className="pl-1"><strong>Conductor preparation:</strong> Strip insulation to the correct length — no more, no less. Clean the conductor if corroded</li>
                <li className="pl-1"><strong>Terminal selection:</strong> Match the terminal's barrel size to the conductor cross-sectional area. Colour-coded terminals: red (0.5-1.5 mm²), blue (1.5-2.5 mm²), yellow (4-6 mm²)</li>
                <li className="pl-1"><strong>Full insertion:</strong> The conductor must be fully inserted into the crimp barrel — verify by checking through the inspection window</li>
                <li className="pl-1"><strong>Crimp position:</strong> Crimp in the barrel zone only, not on the insulation grip or the transition zone</li>
                <li className="pl-1"><strong>Verification:</strong> The completed crimp should be symmetrical, with no cracks, and should not rotate or pull off the conductor under moderate manual force</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Torque Requirements for Common Terminals</p>
              <p className="text-sm text-white mb-3">
                Torque values vary by manufacturer and terminal type. Always refer to the specific manufacturer's
                data. The following are typical ranges for guidance:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>M3.5 terminals (MCBs, RCDs):</strong> 1.2-2.0 Nm typically</li>
                <li className="pl-1"><strong>M4 terminals (small contactors, relays):</strong> 1.5-2.5 Nm typically</li>
                <li className="pl-1"><strong>M5 terminals (distribution equipment):</strong> 2.5-4.0 Nm typically</li>
                <li className="pl-1"><strong>M6 terminals (switchgear, busbars):</strong> 4.0-8.0 Nm typically</li>
                <li className="pl-1"><strong>M8-M10 terminals (HV equipment):</strong> 10-25 Nm typically</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Jointing Test Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation resistance:</strong> Test between all conductors and earth, and between conductors. Minimum 1.0 MΩ at 500 V DC for LV circuits (BS 7671 Table 6.3)</li>
                <li className="pl-1"><strong>Continuity:</strong> Measure and record the resistance of each conductor through the joint. Compare with calculated values to confirm correct connection</li>
                <li className="pl-1"><strong>Earth continuity:</strong> For SWA cables, verify the armour continuity through the joint and confirm the gland earth connection</li>
                <li className="pl-1"><strong>Visual inspection:</strong> Check for exposed conductors, correct sealing, mechanical integrity, correct phase identification, and overall workmanship</li>
                <li className="pl-1"><strong>High-voltage test (MV joints):</strong> For medium voltage joints, a DC withstand test or VLF test may be required per the joint manufacturer's commissioning procedure</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Cable jointing and termination is a core practical competence for
              maintenance technicians. The ability to produce reliable, safe and correctly tested cable joints
              is essential for maintaining the integrity of electrical installations and preventing faults,
              fires and injuries.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Cable Jointing and Termination"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Component Removal
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-4">
              Next: Use of Approved Spare Parts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section4_3;
