import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Terminations and Connectors - MOET Module 3.3.3";
const DESCRIPTION = "Comprehensive guide to cable terminations and connectors for electrical maintenance technicians: crimping, soldering, mechanical connectors, gland types, torque requirements and BS 7671 compliance under ST1426.";

const quickCheckQuestions = [
  {
    id: "crimp-quality",
    question: "What is the most reliable method of verifying a crimp termination?",
    options: [
      "A visual check only",
      "A pull test to confirm mechanical strength, combined with a visual inspection for correct die selection and full conductor insertion",
      "Checking the colour of the crimp lug",
      "Measuring the cable voltage"
    ],
    correctIndex: 1,
    explanation: "A quality crimp must be verified by both pull test (applying a calibrated force to confirm the crimp will not pull apart under service conditions) and visual inspection (confirming the correct crimp die was used, all conductor strands are captured, and the insulation grip is secure). Many manufacturers specify minimum pull-out forces for each lug size. Simply looking at a crimp cannot confirm internal conductor compression."
  },
  {
    id: "gland-selection",
    question: "What determines the correct cable gland type for an SWA cable installation?",
    options: [
      "The cable colour",
      "The cable outer diameter, armour type (wire or tape), the environment (indoor/outdoor) and whether the armour is used as a CPC",
      "The panel manufacturer's preference",
      "The cheapest option available"
    ],
    correctIndex: 1,
    explanation: "Cable gland selection depends on: the cable outer diameter (the gland must grip the sheath securely); the armour type (SWA uses BW/CW glands, STA uses different glands); the environment (indoor glands differ from weatherproof outdoor types); and whether the armour serves as a CPC (the gland must provide a reliable, low-resistance earth path). An incorrectly selected gland can result in poor IP protection, unreliable earth continuity and cable damage."
  },
  {
    id: "torque-importance",
    question: "Why is correct torque critical for electrical terminations?",
    options: [
      "To make the installation look professional",
      "Under-torque causes high-resistance joints leading to overheating; over-torque damages conductors and terminal components, both creating fire and failure risks",
      "It is only important for appearance",
      "Torque settings only matter for high-voltage connections"
    ],
    correctIndex: 1,
    explanation: "Correct torque is essential for reliable electrical connections. Under-torqued connections have insufficient contact pressure, creating a high-resistance joint that generates heat proportional to I squared R. Over time, this causes oxidation, further increases resistance, and can lead to thermal runaway, insulation damage and fire. Over-torqued connections can deform or shear conductors, crack terminal housings and damage threads, creating equally dangerous conditions."
  },
  {
    id: "ferrule-purpose",
    question: "Why should ferrules be fitted to stranded conductors before terminating into spring-cage or screw-cage terminals?",
    options: [
      "To change the wire colour",
      "To prevent individual strands from splaying, ensure all strands make contact with the terminal, and provide a consistent, repeatable connection",
      "To increase the conductor size",
      "Ferrules are only decorative"
    ],
    correctIndex: 1,
    explanation: "Ferrules (bootlace ferrules) compress all strands of a stranded conductor into a single solid-ended termination. Without a ferrule, individual strands can splay during insertion, miss the terminal contact surface, or short to adjacent terminals. Ferrules are particularly important for spring-cage terminals and are required by many panel manufacturers. They also prevent strand damage from the tightening action of screw terminals, ensuring all strands contribute to current carrying."
  }
];

const quizQuestions = [
  { id: 1, question: "A compression crimp lug relies on:", options: ["Solder to make the electrical connection", "Mechanical deformation of the lug barrel onto the conductor using a calibrated crimping tool, creating a gas-tight joint", "Friction grip alone", "Adhesive within the barrel"], correctAnswer: 1, explanation: "Compression crimping permanently deforms the lug barrel around the conductor using a calibrated hydraulic or ratchet crimping tool with the correct die set. The resulting joint is gas-tight, preventing oxidation at the conductor-lug interface. The quality of the crimp depends entirely on using the correct tool, die size and technique. Hand-squeezed or plier-crimped lugs do not achieve the required compression and are unreliable." },
  { id: 2, question: "When terminating MI (mineral insulated) cable, the most critical step is:", options: ["Choosing the correct sheath colour", "Ensuring the seal is moisture-tight to prevent hygroscopic MgO insulation from absorbing moisture, which would drastically reduce insulation resistance", "Making the cable as short as possible", "Using the largest available pot"], correctAnswer: 1, explanation: "Magnesium oxide insulation is hygroscopic — it rapidly absorbs moisture from the atmosphere. Even brief exposure to humid air can reduce insulation resistance from hundreds of megohms to less than 1 megohm. The termination pot must create a completely moisture-tight seal. Failed MI cable terminations are one of the most common causes of low insulation resistance readings in fire alarm and emergency lighting circuits." },
  { id: 3, question: "The purpose of a cable gland cone and armour clamp in a BW-type gland is:", options: ["Only to provide strain relief", "To grip the cable inner sheath with the cone for strain relief, and to clamp the SWA armour wires between the gland body and locknut for earth continuity and mechanical retention", "To improve the cable's appearance", "To provide waterproofing only"], correctAnswer: 1, explanation: "A BW (indoor) gland has two functions: the compression cone grips the cable inner sheath to provide strain relief (preventing the cable pulling out); and the armour clamp (between the gland body and locknut) captures the individual armour wires, providing both mechanical retention and — critically — a reliable low-resistance earth path from the cable armour to the panel enclosure via the gland and locknut." },
  { id: 4, question: "A CW-type cable gland differs from a BW-type by:", options: ["Being smaller", "Including a weather seal (neoprene shroud) to protect against moisture ingress, making it suitable for outdoor installations", "Being made of aluminium", "Having no armour clamp"], correctAnswer: 1, explanation: "CW glands include all the features of a BW gland plus an additional weather seal — typically a neoprene shroud — that seals around the cable outer sheath to prevent moisture ingress. This makes CW glands suitable for outdoor installations and any location where water or moisture may be present. Using a BW gland in an outdoor or wet location compromises the enclosure's IP rating and allows moisture into the gland, causing corrosion." },
  { id: 5, question: "Spring-cage terminals (as used in modern distribution boards and control panels) offer which advantage over screw terminals?", options: ["They are cheaper to manufacture", "They maintain constant contact pressure over time, are vibration-resistant and do not require periodic retorquing", "They can carry higher currents", "They are colour-coded"], correctAnswer: 1, explanation: "Spring-cage terminals use a precision spring to maintain constant contact pressure on the conductor. Unlike screw terminals, they do not loosen due to thermal cycling, vibration or conductor creep (particularly important with aluminium conductors). This eliminates the need for periodic retorquing during maintenance. They also provide faster, tool-free wiring for stranded conductors with ferrules." },
  { id: 6, question: "Ferrules should be used on stranded conductors when:", options: ["The conductor is very large", "Terminating into spring-cage or screw-cage terminals to prevent strand separation, ensure all strands make contact, and provide a reliable, repeatable connection", "The cable is armoured", "The installation is outdoors"], correctAnswer: 1, explanation: "Ferrules (bootlace ferrules or cord-end ferrules) compress all strands of a stranded conductor into a single solid-ended termination. Without a ferrule, individual strands can splay, miss the terminal contact, or short to adjacent terminals. Ferrules are particularly important for spring-cage terminals and are required by many panel manufacturers. They also prevent strand damage from screw terminal tightening." },
  { id: 7, question: "The correct tool for crimping a 50 mm squared copper compression lug is:", options: ["A pair of standard combination pliers", "A hydraulic crimping tool with the manufacturer-specified die set matched to the lug barrel size", "A hammer and cold chisel", "Any adjustable crimp tool"], correctAnswer: 1, explanation: "Large compression lugs (typically 16 mm squared and above) require hydraulic crimping tools with matched die sets. The die set must match the lug manufacturer and barrel dimensions — dies are not interchangeable between manufacturers. The hydraulic tool provides the consistent, calibrated force needed for a gas-tight joint. Using incorrect tools (pliers, hammers, wrong dies) produces unreliable joints that will overheat in service." },
  { id: 8, question: "When re-terminating a cable during maintenance, the technician should:", options: ["Reuse the existing lug and gland", "Cut back to clean, undamaged conductor; use a new correctly sized lug; crimp with the correct tool and die; and verify with pull test and visual inspection", "Solder the conductor directly to the busbar", "Wrap the conductor around the terminal post"], correctAnswer: 1, explanation: "During re-termination: cut back the conductor to expose clean, undamaged copper; select a new lug matched to the conductor size and terminal stud/bar; apply the correct crimp using the specified tool and die; verify the crimp mechanically (pull test) and visually; and apply insulation (heat-shrink or tape) as required. Reusing old lugs risks a poor connection due to work-hardened barrel material and residual oxidation." },
  { id: 9, question: "The maximum permissible temperature for a bolted busbar joint is:", options: ["Unlimited", "Typically 90 degrees C for copper busbars, with the temperature rise above ambient not exceeding values specified in IEC 61439 (typically 70 K for accessible surfaces)", "200 degrees C", "The same as the cable insulation rating"], correctAnswer: 1, explanation: "IEC 61439 specifies maximum temperature rises for busbar connections: typically 70 K above ambient for surfaces accessible during normal operation. For a 40 degrees C ambient, this means a maximum of 110 degrees C. In practice, well-maintained bolted joints should operate well below this limit. Thermographic surveys during maintenance detect joints approaching these temperatures, indicating the need for re-torquing or joint refurbishment." },
  { id: 10, question: "An EMC cable gland achieves 360-degree screen termination by:", options: ["Using a standard BW gland with foil tape", "Clamping the cable braid or foil screen around its full circumference to the metallic gland body, which is bonded to the panel earth via the gland plate", "Connecting a single earth wire from the screen to a terminal", "Using plastic glands with earth tags"], correctAnswer: 1, explanation: "Effective EMC screening requires 360-degree (circumferential) termination of the cable screen to the enclosure earth. EMC glands achieve this by clamping the cable's braided screen or foil around its full circumference to the metallic gland body. The gland body is then bonded to the panel enclosure via the gland plate. A single pigtail earth wire from the screen is not effective — it creates an antenna that can radiate interference rather than screening it." },
  { id: 11, question: "Soldered electrical connections in maintenance work are:", options: ["The preferred method for all connections", "Generally discouraged for power circuits due to solder creep under load, but acceptable for specific signal and electronic applications where mechanical stress is minimal", "Not permitted under any circumstances", "Only used for aluminium conductors"], correctAnswer: 1, explanation: "Solder is a relatively soft alloy that can creep (deform slowly) under sustained mechanical pressure and elevated temperature. In power circuits, where connections carry significant current and experience thermal cycling, soldered joints can loosen and develop high resistance over time. BS 7671 does not prohibit soldering, but compression crimping is the preferred method for power connections. Soldering remains appropriate for PCB work, electronic components and some low-current signal connections." },
  { id: 12, question: "During periodic inspection, a thermographic survey of cable terminations reveals:", options: ["The cable colour", "Hot spots indicating high-resistance connections that require immediate investigation, re-torquing or replacement before they cause failure", "The cable current-carrying capacity", "The cable length"], correctAnswer: 1, explanation: "Thermographic (infrared) surveys are the most effective non-invasive method for detecting failing terminations. A high-resistance connection generates heat proportional to I squared R, which shows as a hot spot on the thermal image. Industry practice is to categorise findings by temperature differential: less than 10 K above reference (monitor), 10-30 K (plan repair), 30-60 K (urgent repair), above 60 K (immediate action). Regular thermographic surveys are a key element of preventive maintenance programmes." }
];

const faqs = [
  { question: "How often should I retorque electrical connections?", answer: "Industry best practice recommends retorquing all power connections within the first 6-12 months after initial installation (to account for conductor settling and thermal cycling), then at regular intervals during periodic maintenance — typically annually for critical connections and every 3-5 years for general distribution. Connections subject to vibration (motor terminals, generators) should be checked more frequently. Always retorque to the manufacturer's specification, not 'as tight as possible'." },
  { question: "Can I use copper lugs on aluminium conductors?", answer: "No — direct copper-to-aluminium contact causes galvanic corrosion, leading to increased resistance and eventual joint failure. Use bimetallic lugs (aluminium barrel with copper palm) or apply anti-oxidation compound and use aluminium-specific terminals. Aluminium connections also require periodic retorquing due to the metal's tendency to creep under pressure. This is particularly important in older installations where aluminium was commonly used for larger cables." },
  { question: "What is the correct torque for a typical M8 terminal on a busbar?", answer: "Torque values depend on the terminal manufacturer, conductor material and bolt grade. Typical values for M8 brass terminals are 8-12 Nm; for M8 steel bolts in busbar joints, 20-25 Nm. Always refer to the manufacturer's specific torque table — these vary significantly between products. Use a calibrated torque wrench, not a spanner. Record the torque applied as part of the maintenance documentation." },
  { question: "When should I use heat-shrink vs tape on terminations?", answer: "Heat-shrink tubing provides a superior, permanent, mechanically robust insulation covering that will not unravel. Use heat-shrink for all permanent power connections, particularly where cables are subject to movement, vibration or environmental exposure. Self-amalgamating tape is suitable for temporary repairs and moisture sealing. PVC insulation tape is the minimum standard for low-stress indoor connections but degrades over time and in heat. For fire-rated circuits, ensure any covering materials are also fire-rated." },
  { question: "How do I select the correct ferrule size?", answer: "Ferrule selection is based on the conductor cross-sectional area (mm squared) and the type of terminal. The ferrule must match the conductor size exactly — a ferrule that is too large will not grip the conductor properly, and one that is too small will not accommodate all strands. Ferrules are colour-coded by size (e.g., red for 1.0 mm squared, blue for 2.5 mm squared, black for 1.5 mm squared). Always use the matching ferrule crimping tool with the correct die for the ferrule size." }
];

const MOETModule3Section3_3 = () => {
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
            <span>Module 3.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Terminations and Connectors
          </h1>
          <p className="text-white/80">
            Termination techniques, connector types and installation methods for reliable electrical connections
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Crimping:</strong> Compression lugs with calibrated tools and correct dies</li>
              <li className="pl-1"><strong>Glands:</strong> BW (indoor), CW (outdoor), EMC (screened cables)</li>
              <li className="pl-1"><strong>Torque:</strong> Manufacturer-specified values, calibrated wrench</li>
              <li className="pl-1"><strong>Verification:</strong> Pull test, thermographic survey, continuity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hot spots:</strong> Failing terminations are the top cause of electrical fires</li>
              <li className="pl-1"><strong>Re-torquing:</strong> Annual checks prevent thermal runaway failures</li>
              <li className="pl-1"><strong>MI cable:</strong> Specialist termination; moisture ingress is critical</li>
              <li className="pl-1"><strong>ST1426:</strong> Core competence in termination and connection skills</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply correct crimping techniques using calibrated tools and matched die sets",
              "Select appropriate cable glands for different cable types and environments",
              "Explain the importance of torque control for electrical terminations",
              "Describe termination methods for MI cable, SWA cable and screened cables",
              "Identify common termination failures and their causes during maintenance",
              "Use thermographic surveys and pull tests to verify termination integrity"
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
            Compression Crimping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compression crimping is the preferred method for making power cable terminations in industrial and commercial electrical installations. A properly executed crimp creates a gas-tight, mechanically strong, low-resistance connection between the conductor and the terminal lug. The quality of the joint depends entirely on using the correct lug, the correct tool, and the correct technique.
            </p>
            <p>
              The crimping process permanently deforms the lug barrel around the conductor, compressing the individual strands into intimate contact with the barrel wall. This creates a cold-weld joint that is mechanically stronger than the conductor itself. Unlike soldered joints, crimped connections do not soften with heat and do not suffer from solder creep under sustained load.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crimping Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lug selection:</strong> Match the lug barrel size to the conductor cross-sectional area and the palm hole to the terminal stud size</li>
                <li className="pl-1"><strong>Conductor preparation:</strong> Cut conductor square, remove insulation to the correct length (barrel depth plus 2-3 mm), do not nick or cut individual strands</li>
                <li className="pl-1"><strong>Die selection:</strong> Use the die specified by the lug manufacturer for that specific barrel size — dies are not interchangeable between manufacturers</li>
                <li className="pl-1"><strong>Tool calibration:</strong> Hydraulic tools must be regularly serviced and calibrated; ratchet tools must complete full cycle</li>
                <li className="pl-1"><strong>Verification:</strong> Visual check (full die indent, no strand protrusion, insulation grip) plus pull test to manufacturer's minimum force</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Crimping Failures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong die:</strong> Lug barrel not fully compressed, creating voids that oxidise and increase resistance</li>
                <li className="pl-1"><strong>Incomplete insertion:</strong> Conductor not fully inserted into barrel, reducing contact area</li>
                <li className="pl-1"><strong>Strand damage:</strong> Nicked strands during insulation stripping reduce the effective conductor area</li>
                <li className="pl-1"><strong>Wrong lug size:</strong> Oversized barrel does not compress fully; undersized barrel cannot accommodate all strands</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Crimp Tool Types</h3>
              <p className="text-sm text-white mb-3">
                Different conductor sizes require different crimping tools. Using the wrong tool type is a
                common cause of unreliable terminations.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hand ratchet crimpers:</strong> For conductor sizes up to 16 mm squared; the ratchet mechanism ensures the crimp cycle is completed before the tool can be released</li>
                <li className="pl-1"><strong>Hydraulic crimpers:</strong> For conductor sizes from 16 mm squared to 630 mm squared; provide the consistent, high force needed for reliable large-cable terminations</li>
                <li className="pl-1"><strong>Battery-powered crimpers:</strong> Portable hydraulic tools with interchangeable die heads; increasingly used for on-site work where mains power is unavailable</li>
                <li className="pl-1"><strong>Ferrule crimpers:</strong> Dedicated tools for bootlace ferrules; use a square or hexagonal profile matched to the ferrule design</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conductor Preparation for Crimping</h3>
              <p className="text-sm text-white mb-3">
                The quality of any crimp termination begins with correct conductor preparation. Poor preparation
                is responsible for more crimp failures than incorrect tool or die selection.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stripping length:</strong> Strip insulation to the exact barrel depth plus 2-3 mm — too short means insufficient contact area; too long means exposed conductor outside the barrel</li>
                <li className="pl-1"><strong>Stripping tool:</strong> Use a calibrated stripping tool set to the correct conductor diameter — side cutters and knives nick strands, reducing the effective cross-sectional area</li>
                <li className="pl-1"><strong>Strand inspection:</strong> After stripping, inspect all strands — any nicked, cut or missing strands reduce the conductor's current-carrying capacity and must be addressed by cutting back to undamaged conductor</li>
                <li className="pl-1"><strong>Conductor cleaning:</strong> For aluminium conductors, abrade the surface immediately before insertion to remove the oxide layer, then apply anti-oxidation compound</li>
                <li className="pl-1"><strong>Conductor alignment:</strong> Ensure all strands are aligned and none are crossed over or doubled back before inserting into the lug barrel</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A well-crimped joint has lower resistance than the equivalent length of conductor. A poorly crimped joint is a ticking time bomb — it will generate heat, oxidise, increase in resistance and eventually fail, potentially causing a fire.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Glands and Entry Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable glands serve three critical functions: they provide a secure mechanical anchor for the cable, they maintain the IP rating of the enclosure, and — for armoured cables — they establish the earth continuity path through the cable armour. Selecting and installing the correct gland is as important as the cable itself.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gland Types for SWA Cables</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gland Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Feature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">BW</td><td className="border border-white/10 px-3 py-2">Indoor, dry locations</td><td className="border border-white/10 px-3 py-2">Standard indoor gland with armour clamp</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">CW</td><td className="border border-white/10 px-3 py-2">Outdoor, wet or damp locations</td><td className="border border-white/10 px-3 py-2">Weather seal (neoprene shroud) added</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">E1W</td><td className="border border-white/10 px-3 py-2">Hazardous areas (Ex zones)</td><td className="border border-white/10 px-3 py-2">Certified flameproof/increased safety</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A2</td><td className="border border-white/10 px-3 py-2">Non-armoured cable, indoor</td><td className="border border-white/10 px-3 py-2">Compression seal on outer sheath only</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">EMC</td><td className="border border-white/10 px-3 py-2">Screened/shielded cables</td><td className="border border-white/10 px-3 py-2">360-degree screen clamp for EMC integrity</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">SWA Cable Gland Installation Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Cut outer sheath to expose armour wires (length depends on gland size)</li>
                <li className="pl-1"><strong>Step 2:</strong> Fan out armour wires evenly around the cable circumference</li>
                <li className="pl-1"><strong>Step 3:</strong> Slide gland back-nut and cone onto cable</li>
                <li className="pl-1"><strong>Step 4:</strong> Cut armour wires to length (typically 10-15 mm proud of cone)</li>
                <li className="pl-1"><strong>Step 5:</strong> Insert cable through gland body mounted in enclosure</li>
                <li className="pl-1"><strong>Step 6:</strong> Seat armour wires around cone, tighten back-nut to compress cone and clamp armour</li>
                <li className="pl-1"><strong>Step 7:</strong> Fit earth tag and locknut; tighten to specified torque</li>
                <li className="pl-1"><strong>Step 8:</strong> Verify mechanical security and earth continuity</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Gland Sizing and Selection</h3>
              <p className="text-sm text-white mb-3">
                Correct gland sizing is essential. A gland that is too large for the cable cannot grip the
                sheath properly, compromising strain relief and IP rating. A gland that is too small cannot
                accommodate the cable and will damage the sheath during tightening.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Size selection:</strong> Match the gland to the cable outer diameter — manufacturers provide range charts showing minimum and maximum cable diameters for each gland size</li>
                <li className="pl-1"><strong>Thread size:</strong> Standard metric thread sizes (M16, M20, M25, M32, M40, M50, M63, M75) for panel entry; must match the gland plate knockout or drilled hole</li>
                <li className="pl-1"><strong>Material selection:</strong> Brass is standard; nickel-plated brass for slightly corrosive environments; stainless steel for highly corrosive environments; nylon for non-metallic requirements</li>
                <li className="pl-1"><strong>Earth tag:</strong> Always fit the earth tag between the gland locknut and the panel, with the tag connected to the panel earth bar — this provides the armour-to-earth continuity path</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Gland Installation Errors</p>
              <p className="text-sm text-white">
                Frequent gland installation errors include: armour wires cut too short (failing to engage in the
                clamp ring); armour wires not evenly distributed around the circumference (creating an off-centre
                clamp); back-nut not tightened sufficiently (loose cable, poor earth); earth tag omitted or not
                connected; and using BW glands in outdoor locations where CW glands are required. Each of these
                errors compromises either the mechanical retention, IP rating or earth continuity of the
                installation.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">IP Rating and Gland Performance</h3>
              <p className="text-sm text-white mb-3">
                The IP (Ingress Protection) rating of an enclosure is only as good as its weakest entry point.
                Cable glands must maintain the enclosure's specified IP rating when correctly installed.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IP66 requirement:</strong> For outdoor or wash-down environments; CW glands with correctly seated weather seals and neoprene washers are essential</li>
                <li className="pl-1"><strong>IP68 requirement:</strong> For submersible or continuously wet applications; specialist sealed glands with compression O-rings required</li>
                <li className="pl-1"><strong>Blank entries:</strong> All unused knockouts and gland holes must be sealed with blanking plugs rated for the enclosure IP rating — a single open entry reduces the entire enclosure to IP00</li>
                <li className="pl-1"><strong>Maintenance check:</strong> During periodic inspection, verify all glands are tight, seals are intact, and no blank entries have been removed without being re-sealed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Every gland must be correctly tightened — loose glands allow cable
              movement, compromise IP rating and create unreliable earth paths. Blank off all unused gland
              holes to maintain the enclosure IP rating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Torque Control and Connection Integrity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The reliability of every electrical connection depends on maintaining the correct contact pressure throughout its service life. This pressure is controlled by the torque applied to the terminal fastener. Too little torque creates a loose, high-resistance connection; too much torque damages the conductor, the terminal or both. Using a calibrated torque wrench and the manufacturer's specified values is not optional — it is an essential safety requirement.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Torque Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Torque Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">MCB terminals</td><td className="border border-white/10 px-3 py-2">2.0-3.5 Nm</td><td className="border border-white/10 px-3 py-2">Check manufacturer's marking on device</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">MCCB terminals</td><td className="border border-white/10 px-3 py-2">5-15 Nm</td><td className="border border-white/10 px-3 py-2">Varies significantly by rating</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Busbar bolted joints (M8)</td><td className="border border-white/10 px-3 py-2">20-25 Nm</td><td className="border border-white/10 px-3 py-2">Depends on bolt grade and washer type</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Busbar bolted joints (M10)</td><td className="border border-white/10 px-3 py-2">35-45 Nm</td><td className="border border-white/10 px-3 py-2">Belleville washers maintain pressure</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">DIN rail terminals</td><td className="border border-white/10 px-3 py-2">0.5-1.2 Nm</td><td className="border border-white/10 px-3 py-2">Marked on terminal housing</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The High-Resistance Joint Problem</p>
              <p className="text-sm text-white">
                A high-resistance joint generates heat according to P = I squared R. As the joint heats up, oxidation increases, further raising resistance. This creates a positive feedback loop — thermal runaway — that can reach temperatures sufficient to ignite surrounding insulation and cause fire. Thermographic surveys during maintenance detect these developing faults before they reach dangerous temperatures. High-resistance joints are the leading cause of electrical fires in commercial and industrial installations.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Torque Wrench Selection and Use</h3>
              <p className="text-sm text-white mb-3">
                Using the correct torque wrench for the application is as important as knowing the correct torque
                value. Different connection types require different torque ranges and tool types.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Click-type torque wrench:</strong> The most common type for electrical work; provides an audible click when the set torque is reached; available in ranges from 0.5-50 Nm</li>
                <li className="pl-1"><strong>Torque screwdriver:</strong> For small terminals (DIN rail terminals, MCB connections) where a standard torque wrench cannot access; typical range 0.2-5 Nm</li>
                <li className="pl-1"><strong>Digital torque wrench:</strong> Provides exact torque readout; useful for documenting torque values in maintenance records; can store data for multiple connections</li>
                <li className="pl-1"><strong>Calibration:</strong> Torque tools must be calibrated regularly (typically annually) and a calibration certificate maintained — an out-of-calibration tool provides false assurance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Every maintenance inspection should include connection torque checks on power terminations. The first retorque after installation is particularly important, as conductors settle under sustained pressure and thermal cycling, reducing the initial clamping force.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ferrules, Spring-Cage Terminals and Modern Connection Methods</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern control panels increasingly use spring-cage and push-in terminal technology instead of traditional screw terminals. These terminals offer faster installation, consistent contact pressure and vibration resistance. However, they require correct conductor preparation — particularly the use of ferrules on stranded conductors — to achieve reliable connections.
            </p>
            <p>
              Ferrules (also called bootlace ferrules or cord-end ferrules) are small metal sleeves crimped onto the stripped end of a stranded conductor, converting it into a solid, precisely sized termination. They are colour-coded by conductor size and must be crimped with the correct ferrule crimping tool — never with pliers or side cutters. The ferrule ensures that all conductor strands are captured and compressed, preventing strand separation and ensuring full current-carrying contact with the terminal.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Terminal Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Need</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Screw terminal</td><td className="border border-white/10 px-3 py-2">Familiar, widely available, accepts solid or stranded</td><td className="border border-white/10 px-3 py-2">Periodic retorquing required</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Spring-cage</td><td className="border border-white/10 px-3 py-2">Constant pressure, vibration-resistant, no retorque</td><td className="border border-white/10 px-3 py-2">Ferrules essential for stranded conductors</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Push-in</td><td className="border border-white/10 px-3 py-2">Tool-free insertion (solid or ferrule), fastest wiring</td><td className="border border-white/10 px-3 py-2">Ferrules required for stranded; release tool needed</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Insulation displacement</td><td className="border border-white/10 px-3 py-2">No stripping required, gas-tight joint</td><td className="border border-white/10 px-3 py-2">Single-use; must be replaced if disturbed</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Ferrule Colour Coding and Selection</h3>
              <p className="text-sm text-white mb-3">
                Ferrules are colour-coded by conductor size to ensure correct selection. Using the wrong ferrule
                size is a common error that results in unreliable connections.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ferrule Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">0.5 mm squared</td><td className="border border-white/10 px-3 py-2">White</td><td className="border border-white/10 px-3 py-2">Signal wiring, PLC inputs</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">0.75 mm squared</td><td className="border border-white/10 px-3 py-2">Grey</td><td className="border border-white/10 px-3 py-2">Control circuits</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">1.0 mm squared</td><td className="border border-white/10 px-3 py-2">Red</td><td className="border border-white/10 px-3 py-2">Control and light power circuits</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">1.5 mm squared</td><td className="border border-white/10 px-3 py-2">Black</td><td className="border border-white/10 px-3 py-2">Contactor coils, lighting</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2.5 mm squared</td><td className="border border-white/10 px-3 py-2">Blue</td><td className="border border-white/10 px-3 py-2">Power circuits, motor controls</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4.0 mm squared</td><td className="border border-white/10 px-3 py-2">Grey</td><td className="border border-white/10 px-3 py-2">Higher-rated power connections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">6.0 mm squared</td><td className="border border-white/10 px-3 py-2">Yellow</td><td className="border border-white/10 px-3 py-2">Sub-distribution connections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">10 mm squared</td><td className="border border-white/10 px-3 py-2">Red</td><td className="border border-white/10 px-3 py-2">Main power connections</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Spring-cage terminals eliminate the need for periodic retorquing — a significant maintenance advantage. However, they absolutely require ferrules on stranded conductors. Inserting a bare stranded conductor into a spring-cage terminal will result in strand separation and an unreliable connection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Specialist Terminations and Maintenance Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond standard crimping and bolted connections, maintenance technicians encounter specialist termination methods that require additional training and equipment. MI cable termination, plug-in busbar connections, and high-voltage cable terminations each have unique requirements and failure modes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MI Cable Termination</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Strip sheath using dedicated MI stripping tool — do not use a hacksaw (copper filings short-circuit conductors)</li>
                  <li className="pl-1">Fit the sealing disc and screw-on pot quickly to minimise moisture absorption</li>
                  <li className="pl-1">Fill the pot with compound and fit the disc and gland nut</li>
                  <li className="pl-1">If insulation resistance is low, the seal has failed — the entire termination must be remade</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Plug-in Connections</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Used in MCC drawout units and plug-in busbar systems</li>
                  <li className="pl-1">Silver-plated contacts maintain low resistance and prevent welding</li>
                  <li className="pl-1">Check contact pressure springs during maintenance</li>
                  <li className="pl-1">Clean contacts with approved contact cleaner — never use abrasives</li>
                </ul>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Maintenance Inspection Checklist for Terminations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Check for discolouration (overheating), corrosion, loose connections, damaged insulation</li>
                <li className="pl-1"><strong>Thermographic survey:</strong> Scan all power terminations under load — compare with reference temperatures</li>
                <li className="pl-1"><strong>Torque verification:</strong> Check and re-torque all power connections to manufacturer specification</li>
                <li className="pl-1"><strong>Continuity testing:</strong> Verify earth continuity through glands, armour and protective conductors</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> Test MI cable terminations for moisture ingress</li>
                <li className="pl-1"><strong>Documentation:</strong> Record all findings, torque values and any remedial actions taken</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Soldering in Electrical Maintenance</h3>
              <p className="text-sm text-white mb-3">
                While compression crimping is the preferred method for power connections, soldering still has
                a role in certain maintenance applications. Understanding when soldering is and is not
                appropriate prevents both unsafe connections and unnecessary rework.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Acceptable applications:</strong> PCB repair, electronic component replacement, low-current signal connections, temporary test connections</li>
                <li className="pl-1"><strong>Not acceptable:</strong> Power circuit connections subject to vibration, heat cycling or mechanical stress — solder creep under sustained load causes joint failure</li>
                <li className="pl-1"><strong>Lead-free solder:</strong> RoHS compliance requires lead-free solder for most applications; higher melting point requires adjusted technique</li>
                <li className="pl-1"><strong>Flux selection:</strong> Use rosin-core flux for electrical connections; acid-core flux (used in plumbing) causes corrosion and must never be used on electrical connections</li>
                <li className="pl-1"><strong>Joint quality:</strong> A good solder joint is shiny and concave; a cold joint (dull, grainy appearance) has high resistance and will fail</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Insulation Materials for Terminations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat-shrink tubing:</strong> Provides a permanent, mechanically robust seal; available in adhesive-lined versions for moisture protection; shrinks to fit tightly around the termination</li>
                <li className="pl-1"><strong>Self-amalgamating tape:</strong> Fuses to itself forming a solid rubber mass; excellent for moisture sealing; stretches to conform to irregular shapes</li>
                <li className="pl-1"><strong>PVC insulation tape:</strong> Minimum standard for basic indoor connections; degrades in heat and UV; not suitable for permanent outdoor or industrial use</li>
                <li className="pl-1"><strong>Fire-rated coverings:</strong> Required on fire-rated cable terminations; standard materials may not maintain integrity during fire conditions</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate competence in making safe, reliable electrical connections using appropriate tools and techniques. Termination quality is assessed as part of the end-point assessment practical observation.
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
                <p className="font-medium text-white mb-1">Termination Methods</p>
                <ul className="space-y-0.5">
                  <li>Compression crimp — calibrated tool, matched die, pull test</li>
                  <li>BW gland — indoor SWA, armour clamp + cone</li>
                  <li>CW gland — outdoor SWA, adds weather seal</li>
                  <li>EMC gland — 360-degree screen termination</li>
                  <li>Ferrules — essential for spring-cage terminals</li>
                  <li>MI termination — moisture-tight seal critical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Checks</p>
                <ul className="space-y-0.5">
                  <li>Thermographic survey — detect high-resistance joints</li>
                  <li>Retorque all power connections annually</li>
                  <li>Pull test on new crimp terminations</li>
                  <li>Earth continuity through glands and armour</li>
                  <li>Insulation resistance on MI cable terminations</li>
                  <li>Visual check for discolouration and corrosion</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Types
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-4">
              Next: Trunking &amp; Conduits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section3_3;
