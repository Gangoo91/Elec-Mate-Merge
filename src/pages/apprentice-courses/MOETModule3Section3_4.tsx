import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Trunking, Conduits and Cable Management - MOET Module 3.3.4";
const DESCRIPTION = "Comprehensive guide to cable containment systems for electrical maintenance technicians: trunking, conduit, cable tray, cable ladder, basket systems, installation methods, capacity calculations and BS 7671 compliance under ST1426.";

const quickCheckQuestions = [
  {
    id: "conduit-capacity",
    question: "What determines the maximum number of cables that can be drawn into a conduit?",
    options: [
      "The conduit colour",
      "The space factor — cables must not occupy more than 40% of the conduit internal cross-sectional area to allow adequate heat dissipation and cable pulling",
      "The conduit length only",
      "There is no limit"
    ],
    correctIndex: 1,
    explanation: "The space factor (also called fill factor) limits cable occupancy to 40% of the conduit internal cross-sectional area (BS 7671 and IET On-Site Guide). This ensures adequate air circulation for heat dissipation, prevents cable damage during installation (excessive friction), and allows future cables to be added or replaced. Overfilling conduit causes cable overheating, insulation damage and makes future maintenance extremely difficult."
  },
  {
    id: "trunking-segregation",
    question: "Why must power and data cables be segregated in trunking systems?",
    options: [
      "To make the installation look tidier",
      "To prevent electromagnetic interference from power cables inducing noise in data and signal cables, and to comply with BS 7671 Regulation 528.1",
      "To make cables easier to count",
      "Segregation is not required"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 528.1 requires that where cables of different voltage bands share a common containment system, they must either be physically segregated by a barrier or partition, or each cable must be insulated for the highest voltage present. Power cables generate electromagnetic fields that can induce noise and interference in data, control and telecommunications cables, causing equipment malfunction. Segregated compartments in trunking or separate containment systems are the standard solutions."
  },
  {
    id: "conduit-type",
    question: "What is the key difference between heavy gauge (HG) and light gauge (LG) steel conduit?",
    options: [
      "HG conduit is painted and LG is not",
      "HG conduit has a thicker wall allowing it to be threaded and used as a CPC, while LG conduit is thinner and joined with slip couplings requiring a separate CPC",
      "They are the same",
      "LG conduit is used outdoors and HG indoors"
    ],
    correctIndex: 1,
    explanation: "Heavy gauge (HG) steel conduit (typically 1.6 mm wall thickness for 20 mm) has sufficient wall thickness to be threaded for screwed fittings and can serve as a circuit protective conductor (CPC) if the joints maintain reliable continuity. Light gauge (LG) conduit has thinner walls (typically 1.0 mm), uses slip-type (push-fit) couplings, and cannot reliably serve as a CPC — a separate earth conductor must be installed within it. HG is standard for industrial installations; LG is used in less demanding domestic and commercial work."
  },
  {
    id: "cable-tray",
    question: "What maintenance consideration is most important for cable tray installations?",
    options: [
      "The tray colour",
      "Ensuring cables are properly supported, clipped at regular intervals, and that the tray is not overloaded beyond its rated capacity, with adequate spacing for heat dissipation",
      "That all cables run perfectly straight",
      "That cables are visible from the floor"
    ],
    correctIndex: 1,
    explanation: "Cable tray maintenance requires: verifying cables are correctly supported and clipped (unsupported cables sag and can be damaged); checking the tray is not overloaded (new cables added during modifications); ensuring cable spacing allows heat dissipation; verifying earth continuity of metallic trays; checking for physical damage to trays and cables; and confirming fire barriers are maintained where trays pass through fire compartment walls."
  }
];

const quizQuestions = [
  { id: 1, question: "The 40% space factor for conduit means:", options: ["40% of cables must be the same size", "Cables must not occupy more than 40% of the conduit internal cross-sectional area", "Conduit must be 40% full at all times", "40% of conduit runs must include inspection fittings"], correctAnswer: 1, explanation: "The 40% space factor limits total cable cross-sectional area to 40% of the conduit bore. This allows adequate air circulation for cooling, reduces friction during cable installation, and leaves space for future additions. For a 20 mm conduit with 15.1 mm internal diameter (179 mm squared area), the maximum cable fill is approximately 71 mm squared." },
  { id: 2, question: "PVC conduit is preferred over steel conduit when:", options: ["Higher mechanical protection is needed", "The installation is in a corrosive environment (chemical plants, swimming pools) or where a non-metallic, non-magnetic containment is required", "The conduit must serve as a CPC", "Maximum fire resistance is required"], correctAnswer: 1, explanation: "PVC conduit is corrosion-resistant, non-conductive and non-magnetic. It is ideal for corrosive environments (chemical plants, swimming pools, food processing) where steel would corrode, and in locations near sensitive equipment where ferrous conduit could cause electromagnetic interference. However, PVC conduit cannot serve as a CPC, has lower mechanical impact resistance than steel, and softens at elevated temperatures." },
  { id: 3, question: "When installing trunking through a fire-rated wall or floor, you must:", options: ["Just fill the gap with expanding foam", "Install a proprietary fire barrier or fire-stopping system within the trunking at the point of penetration, restoring the fire rating of the compartment", "Leave it open for ventilation", "Paint the trunking red"], correctAnswer: 1, explanation: "Where trunking penetrates fire compartment walls or floors, the fire resistance of the wall must be maintained. Proprietary fire barriers (intumescent pillows, collars or fire-rated sealant) must be installed within the trunking at the penetration point. These systems expand when exposed to fire, sealing the trunking and preventing fire and smoke spread. Failure to maintain fire barriers is a common finding during fire risk assessments and can constitute a criminal offence." },
  { id: 4, question: "Cable basket (wire mesh) containment is increasingly used because:", options: ["It is the cheapest option", "It provides good ventilation for cables (aiding heat dissipation), is quick to install, allows easy cable addition, and is visible for inspection without opening covers", "It has the highest IP rating", "It is required by BS 7671"], correctAnswer: 1, explanation: "Cable basket (mesh tray) systems offer excellent ventilation, allowing cables to dissipate heat more effectively than enclosed trunking. They are quick to install, cables can be laid in without threading, and additional cables can be added easily during future modifications. The open design allows visual inspection of cables without removing covers. They are particularly popular in commercial buildings, data centres and raised floor installations." },
  { id: 5, question: "The maximum distance between fixings for 20 mm heavy gauge steel conduit on a horizontal run is:", options: ["500 mm", "1,000 mm", "1,750 mm (approximately 1.75 m), with additional fixings within 300 mm of each accessory box", "3,000 mm"], correctAnswer: 2, explanation: "BS 7671 Table 4A (IET On-Site Guide) specifies maximum support spacings for conduit: 1,750 mm for 20 mm HG steel conduit on horizontal runs, with fixings within 300 mm of each accessory point (boxes, bends, tees). Vertical runs allow slightly greater spacing. Undersupported conduit sags, creates stress on joints, and can separate at couplings — particularly problematic when the conduit serves as a CPC." },
  { id: 6, question: "Dado trunking in commercial offices typically provides:", options: ["Only power outlets", "Segregated compartments for power, data and telecommunications services at desk height, allowing flexible reconfiguration of workstations", "Structural support for partitions", "Fire protection only"], correctAnswer: 1, explanation: "Dado trunking (perimeter trunking) is installed at desk height (typically 450-500 mm from floor level) around the perimeter of commercial offices. It provides segregated compartments for power, data/LAN and telecommunications cabling, with snap-fit outlet plates for flexible positioning. This allows workstations to be reconfigured without rewiring — a significant advantage for maintenance and facilities management in modern offices." },
  { id: 7, question: "When adding new cables to existing conduit, the maintenance technician must:", options: ["Force the cables in regardless", "Verify the existing cable fill does not already exceed the space factor, confirm the new cables will not breach it, and check that the additional heat load from new cables does not require derating of existing cables", "Remove all existing cables first", "Only check if the conduit is empty"], correctAnswer: 1, explanation: "Adding cables to existing conduit requires checking: the current cable fill against the space factor; whether adding new cables will exceed 40% fill; the impact on grouping correction factors (more cables means more mutual heating, potentially derating all cables in the conduit); and whether the new circuit is compatible with existing circuits (voltage band segregation). This check is frequently overlooked during modification work, leading to overheated conduit runs." },
  { id: 8, question: "Galvanised cable ladder is used instead of cable tray when:", options: ["The cables are small", "Heavy or large-diameter cables need to be supported over long spans, as ladder provides greater load-bearing capacity and longer support spacings than perforated tray", "The installation is domestic", "Cost is the only consideration"], correctAnswer: 1, explanation: "Cable ladder has higher load-bearing capacity than perforated cable tray and can span longer distances between supports. It is used for heavy power cables (large SWA cables, HV cables) and for runs where long spans between fixing points are needed (across open plant rooms, between buildings). The open rung design also provides excellent ventilation. Cable ladder is standard for main cable routes in industrial installations, power stations and substations." },
  { id: 9, question: "Flexible conduit is used in maintenance applications for:", options: ["All conduit installations", "Final connections to equipment subject to vibration or movement (motors, compressors, machines), where rigid conduit would crack or transmit vibration forces to the containment system", "Decorative purposes", "Underground installations"], correctAnswer: 1, explanation: "Flexible conduit (metallic or non-metallic) is used for final connections to vibrating equipment — motors, compressors, pumps, production machines — where rigid conduit would be subject to fatigue failure from continuous vibration. It also accommodates alignment tolerances during installation and allows limited equipment movement for maintenance access. Metallic flexible conduit provides EMC screening; non-metallic types are lighter but require a separate CPC." },
  { id: 10, question: "The earth continuity of a steel conduit system is verified by:", options: ["Visual inspection only", "A low-resistance ohmmeter (continuity tester) measuring the resistance of the conduit between the distribution board earth terminal and the furthest accessory on each circuit, confirming it meets the R2 value used in cable calculations", "A voltage test", "An insulation resistance test"], correctAnswer: 1, explanation: "Where steel conduit serves as the CPC, its continuity must be verified by measurement using a low-resistance ohmmeter. The test measures the resistance from the distribution board main earth terminal to each accessory point via the conduit. This R2 value is used in the earth fault loop impedance calculation (Zs = Ze + R1 + R2). Poor joints, corroded fittings or damaged sections increase R2 and may prevent the protective device from operating within the required disconnection time." },
  { id: 11, question: "Mini-trunking is commonly used for:", options: ["Main power distribution", "Surface-mounted wiring additions in occupied buildings (offices, retail, healthcare) where chasing walls or lifting floors is impractical, providing a neat, accessible containment for small numbers of cables", "Underground cable routes", "HV installations"], correctAnswer: 1, explanation: "Mini-trunking (typically 16 x 16 mm to 40 x 25 mm) is the standard containment for surface-mounted wiring additions in occupied buildings. It provides a neat, paintable, accessible route for small numbers of cables (typically 1-4 singles) when concealed wiring is impractical. It is widely used for additional socket outlets, data points and lighting circuits in offices, retail premises and healthcare facilities. Self-adhesive and clip-fix versions are available." },
  { id: 12, question: "During periodic inspection, cable containment systems should be checked for:", options: ["Only the cable sizes", "Physical damage, corrosion, loose or missing fixings, overloading, maintained fire barriers at penetrations, earth continuity of metallic systems, and presence of unauthorised cables or modifications", "Only the colour", "Nothing — containment does not require inspection"], correctAnswer: 1, explanation: "Cable containment inspection covers: physical condition (damage, corrosion, deformation); fixings (secure, adequate spacing, condition); cable fill (overloading from modifications); fire barriers (maintained at all penetrations through fire-rated walls and floors); earth continuity (metallic conduit and tray); segregation (power/data separation maintained); and any unauthorised additions or modifications that may not comply with BS 7671." }
];

const faqs = [
  { question: "How do I calculate the maximum number of cables in a conduit?", answer: "Calculate the total cross-sectional area of all cables (including insulation) using pi x r squared for each cable. This total must not exceed 40% of the conduit internal cross-sectional area. For example, a 20 mm HG conduit has an internal diameter of approximately 15.1 mm, giving an internal area of 179 mm squared. The maximum cable fill is 179 x 0.40 = 71.6 mm squared. A 2.5 mm squared PVC single has an overall diameter of approximately 4.1 mm (area 13.2 mm squared), so you could fit 5 cables maximum (5 x 13.2 = 66 mm squared)." },
  { question: "Can I mix power and data cables in the same trunking?", answer: "Yes, but only if they are physically segregated by a solid barrier or partition within the trunking, or if all cables are insulated for the highest voltage present (BS 7671 Regulation 528.1). Most commercial trunking systems have integral compartments for this purpose. Without segregation, electromagnetic interference from power cables will degrade data signal quality, causing network errors and equipment malfunction. Fibre optic data cables are immune to electromagnetic interference and do not require segregation." },
  { question: "What is the difference between cable tray and cable ladder?", answer: "Cable tray is a flat, usually perforated, metal or GRP channel that supports cables along its length. Cable ladder has two side rails connected by cross-rungs, similar to a ladder. Ladder has higher load-bearing capacity and can span longer distances between supports, making it suitable for heavy cables and long spans. Tray provides continuous cable support and is better for smaller cables that might sag between ladder rungs. Industrial installations often use both — ladder for main cable routes and tray for branch runs." },
  { question: "How do I maintain fire barriers in cable containment?", answer: "Fire barriers must be inspected regularly and after any cable additions or modifications. Check that: intumescent materials are intact and undamaged; no gaps exist around cables or within the trunking; labels identifying the fire rating are legible; and that no unauthorised cables have been passed through the barrier without re-sealing. After adding cables, the fire barrier must be reinstated using materials compatible with the original installation. Fire barrier maintenance is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005." },
  { question: "When should I use stainless steel conduit instead of galvanised?", answer: "Stainless steel conduit is required in environments where galvanised steel would corrode: food processing plants (hygiene requirements), coastal locations (salt air), chemical plants (corrosive atmospheres), and cleanroom environments (particle shedding from corrosion). It is significantly more expensive than galvanised but provides a much longer service life in corrosive conditions. Stainless steel conduit can also serve as a CPC, provided all joints maintain reliable continuity." }
];

const MOETModule3Section3_4 = () => {
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
            <span>Module 3.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trunking, Conduits and Cable Management
          </h1>
          <p className="text-white/80">
            Cable containment systems, routing and management practices for industrial and commercial installations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Space factor:</strong> 40% maximum cable fill for conduit</li>
              <li className="pl-1"><strong>Segregation:</strong> Power and data separated (BS 7671 Reg 528.1)</li>
              <li className="pl-1"><strong>Types:</strong> Conduit, trunking, cable tray, ladder, basket</li>
              <li className="pl-1"><strong>Fire safety:</strong> Barriers at all penetrations through fire walls</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Modifications:</strong> Check fill factor before adding cables</li>
              <li className="pl-1"><strong>Earth continuity:</strong> Metallic conduit/tray as CPC must be verified</li>
              <li className="pl-1"><strong>Fire barriers:</strong> Reinstate after every cable addition</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to installation and maintenance competencies</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate cable containment systems for different installation environments",
              "Calculate conduit and trunking capacity using the space factor method",
              "Apply BS 7671 requirements for cable segregation in shared containment",
              "Explain the fire-stopping requirements at containment penetrations",
              "Identify conduit types (HG steel, LG steel, PVC) and their applications",
              "Carry out maintenance inspections of cable containment systems"
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
            Conduit Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conduit is one of the oldest and most widely used cable containment methods in electrical installations. It provides mechanical protection for cables, can serve as a circuit protective conductor (in the case of heavy gauge steel), and allows cables to be drawn in and withdrawn for future modifications. Understanding conduit types, sizing and installation is a core competency for maintenance technicians.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conduit Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Jointing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CPC?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Heavy gauge (HG)</td><td className="border border-white/10 px-3 py-2">Galvanised steel</td><td className="border border-white/10 px-3 py-2">Screwed fittings</td><td className="border border-white/10 px-3 py-2">Yes, if continuity verified</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Light gauge (LG)</td><td className="border border-white/10 px-3 py-2">Galvanised steel</td><td className="border border-white/10 px-3 py-2">Slip couplings</td><td className="border border-white/10 px-3 py-2">No — separate CPC needed</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Rigid PVC</td><td className="border border-white/10 px-3 py-2">PVC</td><td className="border border-white/10 px-3 py-2">Solvent-weld or push-fit</td><td className="border border-white/10 px-3 py-2">No — separate CPC needed</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Flexible metallic</td><td className="border border-white/10 px-3 py-2">Spirally wound steel</td><td className="border border-white/10 px-3 py-2">Adaptors to rigid conduit</td><td className="border border-white/10 px-3 py-2">Not reliable — separate CPC</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Stainless steel</td><td className="border border-white/10 px-3 py-2">316 stainless</td><td className="border border-white/10 px-3 py-2">Screwed fittings</td><td className="border border-white/10 px-3 py-2">Yes, if continuity verified</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conduit Sizing and Space Factor</h3>
              <p className="text-sm text-white mb-3">
                The space factor rule limits cable fill to 40% of the conduit internal cross-sectional area. This is not just a recommendation — it is essential for cable cooling and practical cable installation. Overfilled conduit causes overheating, insulation damage, and makes it impossible to add or replace cables.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>20 mm conduit:</strong> Internal area approximately 179 mm squared; max cable fill 71 mm squared</li>
                <li className="pl-1"><strong>25 mm conduit:</strong> Internal area approximately 277 mm squared; max cable fill 111 mm squared</li>
                <li className="pl-1"><strong>32 mm conduit:</strong> Internal area approximately 466 mm squared; max cable fill 186 mm squared</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conduit Installation Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Support spacings:</strong> HG steel conduit — 1,750 mm horizontal, with fixings within 300 mm of every accessory point</li>
                <li className="pl-1"><strong>Bending:</strong> Use a proper conduit bending machine; internal radius must not be less than 2.5 times the conduit diameter to prevent cable damage during pulling</li>
                <li className="pl-1"><strong>Expansion joints:</strong> Required on long straight runs (over 9 m) of PVC conduit to accommodate thermal expansion — PVC expands approximately 6 mm per metre per 50 degrees C temperature change</li>
                <li className="pl-1"><strong>Inspection fittings:</strong> Draw boxes or inspection bends required at regular intervals (typically every 10 m or after two right-angle bends) to allow cables to be drawn in</li>
                <li className="pl-1"><strong>Drainage:</strong> External conduit runs must be arranged to allow moisture drainage; low points should have drain fittings to prevent water accumulation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conduit Accessories and Fittings</h3>
              <p className="text-sm text-white mb-3">
                A complete conduit system requires a range of accessories for direction changes, junctions,
                terminations and access points. Selecting the correct fitting is essential for a compliant and
                maintainable installation.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Through boxes:</strong> Allow cable access at straight runs; essential at regular intervals (every 10 m or after two right-angle bends) for cable drawing</li>
                <li className="pl-1"><strong>Angle boxes:</strong> Provide access at 90-degree bends where space does not permit a swept bend; cables enter and exit at right angles</li>
                <li className="pl-1"><strong>Tee boxes:</strong> Junction points where a branch conduit run meets a main run</li>
                <li className="pl-1"><strong>Terminal boxes:</strong> End points where conduit meets a switch, socket outlet or other accessory; provide the mounting point for the faceplate</li>
                <li className="pl-1"><strong>Adaptable boxes:</strong> Larger junction boxes with knockouts on all sides; used where multiple conduit runs converge or where a transition to trunking is needed</li>
                <li className="pl-1"><strong>Couplings:</strong> Screwed (HG) or slip-type (LG) for joining conduit lengths; screwed couplings provide reliable earth continuity, slip couplings do not</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When adding cables during maintenance modifications, always check the existing conduit fill. Adding just one more cable to an already full conduit can cause overheating of all cables in the run and violate the space factor requirement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Trunking Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trunking provides a larger-capacity containment system than conduit and is ideal for runs carrying multiple circuits. Unlike conduit, trunking allows cables to be laid in (rather than pulled through), making installation and modification significantly easier. Trunking ranges from small mini-trunking for surface additions to large floor-standing systems for main cable distribution.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Trunking Types and Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mini-trunking:</strong> 16 x 16 mm to 40 x 25 mm; surface-mounted additions in occupied buildings; snap-on lid</li>
                <li className="pl-1"><strong>Dado trunking:</strong> Multi-compartment perimeter trunking at desk height; power, data and telecoms segregation</li>
                <li className="pl-1"><strong>Skirting trunking:</strong> Replaces standard skirting board; concealed cable route at floor level</li>
                <li className="pl-1"><strong>Floor trunking:</strong> Cast into or laid on screed; flush floor boxes for power and data in open-plan offices</li>
                <li className="pl-1"><strong>Lighting trunking:</strong> Overhead track systems for suspended luminaires in retail and commercial buildings</li>
                <li className="pl-1"><strong>Power busbar trunking:</strong> Pre-fabricated busbar systems for high-current distribution (see Section 3.3.1)</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Trunking Capacity Calculation</h3>
              <p className="text-sm text-white">
                Trunking sizing uses a similar space factor to conduit but applied differently. The IET On-Site Guide provides trunking cable capacity tables based on the number and size of conductors. For segregated trunking, each compartment is sized independently. When modifying an installation, always verify the existing trunking capacity before adding new cables — particularly in older buildings where trunking may already be at or near capacity.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Trunking Accessories and Fittings</h3>
              <p className="text-sm text-white mb-3">
                A complete trunking system uses a range of accessories to create a professional, functional
                installation. Understanding these components is important for maintenance and modification work.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flat bends:</strong> 90-degree horizontal direction changes; internal radius must not damage cables</li>
                <li className="pl-1"><strong>Internal and external bends:</strong> Vertical direction changes at walls and ceilings</li>
                <li className="pl-1"><strong>Flat tees and crosses:</strong> Junction points for branch runs</li>
                <li className="pl-1"><strong>Reducer fittings:</strong> Transition between different trunking sizes</li>
                <li className="pl-1"><strong>End caps:</strong> Close off trunking ends to maintain IP rating and prevent pest entry</li>
                <li className="pl-1"><strong>Fire barrier kits:</strong> Proprietary intumescent barriers for fire compartment penetrations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Trunking Installation and Support</h3>
              <p className="text-sm text-white mb-3">
                Correct installation of trunking is essential for both structural integrity and cable protection.
                Poorly supported trunking can sag, separate at joints, and allow covers to fall off — exposing
                cables and creating a safety hazard.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Support spacings:</strong> Manufacturer-specified, typically 1.2-1.5 m for standard sizes; additional supports within 300 mm of each change of direction, junction or termination</li>
                <li className="pl-1"><strong>Wall fixings:</strong> Must be appropriate for the wall construction and the expected cable weight — a fully loaded 150 x 150 mm trunking run can weigh several kilograms per metre</li>
                <li className="pl-1"><strong>Joint alignment:</strong> Trunking sections must be aligned accurately at joints; misalignment creates edges that can damage cable insulation during installation</li>
                <li className="pl-1"><strong>Earth bonding:</strong> Metallic trunking sections must be bonded across joints using earth straps or bonding conductors if the joint does not provide reliable continuity</li>
                <li className="pl-1"><strong>Lid retention:</strong> Lid clips or screws must be intact along the entire run; a missing section of lid exposes cables to damage and reduces the containment IP rating</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Segregation within trunking is not optional. BS 7671 Regulation 528.1 requires physical separation between circuits of different voltage bands. Many trunking systems have integral partitions for this purpose — ensure they are correctly installed and not removed during modifications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Tray, Ladder and Basket Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Open containment systems — cable tray, cable ladder and cable basket — are the workhorses of industrial and commercial cable distribution. They offer excellent cable ventilation, easy cable addition and removal, visual accessibility for inspection, and the ability to carry high cable loads over long distances. Selecting the right system depends on the cable weight, environment and access requirements.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Containment Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Perforated cable tray</td><td className="border border-white/10 px-3 py-2">Medium</td><td className="border border-white/10 px-3 py-2">General distribution, branch routes, lighter cables</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cable ladder</td><td className="border border-white/10 px-3 py-2">Heavy</td><td className="border border-white/10 px-3 py-2">Main cable routes, heavy SWA cables, long spans</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cable basket (mesh)</td><td className="border border-white/10 px-3 py-2">Light to medium</td><td className="border border-white/10 px-3 py-2">Data cables, offices, quick installation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fire Stopping at Containment Penetrations</p>
              <p className="text-sm text-white">
                Every cable containment penetration through a fire-rated wall or floor must be fire-stopped to maintain the fire compartment integrity. This applies to conduit, trunking, cable tray and cable ladder. Proprietary fire barrier systems (intumescent pillows, batts, sealants or collars) must be installed and maintained. After any cable addition or removal through a fire barrier, the barrier must be reinstated immediately. Failure to maintain fire barriers is one of the most common findings during fire risk assessments and is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Support on Tray and Ladder</h3>
              <p className="text-sm text-white mb-3">
                Cables on trays and ladders must be properly supported to prevent damage and maintain their
                current-carrying capacity. Poor cable management on open containment is a common maintenance issue.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-layer vs multi-layer:</strong> BS 7671 grouping factors differ significantly — cables in a single layer touching have a better derating factor than cables in trefoil or multi-layer arrangements</li>
                <li className="pl-1"><strong>Clipping:</strong> Cables on horizontal trays should be secured with clips or ties at regular intervals (typically every 300 mm for small cables, 600 mm for larger SWA cables) to prevent movement</li>
                <li className="pl-1"><strong>Vertical runs:</strong> Cables on vertical tray or ladder must be individually secured to prevent slippage — the cable weight can damage terminations at the top and glands at the bottom</li>
                <li className="pl-1"><strong>Bend radii:</strong> Cable tray bends must accommodate the minimum bending radius of the largest cable in the run</li>
                <li className="pl-1"><strong>Spare capacity:</strong> Good design practice reserves 20-30% of tray capacity for future cable additions during maintenance modifications</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Basket (Wire Mesh) Systems</h3>
              <p className="text-sm text-white mb-3">
                Cable basket has become increasingly popular in commercial buildings, data centres and retail
                environments. Its open mesh construction offers several practical advantages for installation
                and maintenance.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ventilation:</strong> The open mesh provides excellent air circulation, allowing cables to dissipate heat more effectively than enclosed trunking — this can improve cable current ratings</li>
                <li className="pl-1"><strong>Visibility:</strong> Cables are visible without removing covers, allowing quick visual inspection and easier cable identification during maintenance</li>
                <li className="pl-1"><strong>Installation speed:</strong> Cables can be laid in from the top without threading; tool-free splice connectors join sections quickly</li>
                <li className="pl-1"><strong>Flexibility:</strong> Basket can be field-cut and bent to accommodate site variations; no specialist bending tools required</li>
                <li className="pl-1"><strong>Limitations:</strong> Lower mechanical protection than enclosed trunking; not suitable for areas where cables need protection from falling objects, liquids or rodents</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Metallic cable tray and ladder must be earthed and the earth
              continuity verified. Where sections are joined using standard fishplates and bolts, the joint
              resistance must be checked — corroded or poorly fitted joints can create high-resistance earth
              paths.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance and Inspection of Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment systems are often overlooked during maintenance, yet their condition directly affects cable safety and longevity. Corroded conduit, overloaded trunking, missing fire barriers and damaged cable tray are all common findings during periodic inspections. A systematic approach to containment maintenance prevents cable failures and ensures continued compliance.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Containment Inspection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Physical condition:</strong> Damage, corrosion, deformation, missing covers or lids</li>
                <li className="pl-1"><strong>Fixings:</strong> Secure, correct spacing, no missing clips or brackets</li>
                <li className="pl-1"><strong>Cable fill:</strong> No overloading; space factor compliant; cables properly supported</li>
                <li className="pl-1"><strong>Segregation:</strong> Power and data separation maintained; barriers in place</li>
                <li className="pl-1"><strong>Fire barriers:</strong> Present and intact at all fire compartment penetrations</li>
                <li className="pl-1"><strong>Earth continuity:</strong> Metallic conduit and tray tested for continuity</li>
                <li className="pl-1"><strong>Modifications:</strong> All additions documented and compliant</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Maintenance Issues</h3>
                <p className="text-sm text-white">
                  The most common containment defects found during periodic inspections are: missing trunking lids (exposing cables to damage and reducing IP rating); corroded steel conduit in damp environments; overloaded cable trays following modifications; fire barriers removed or not reinstated after cable additions; and flexible conduit connections to motors that have fatigued and cracked due to vibration.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</h3>
                <p className="text-sm text-white">
                  All modifications to cable containment must be documented. This includes: updated cable route drawings; amended cable schedules showing new circuits; fire barrier reinstatement records; and any changes to conduit fill or trunking capacity. Without accurate documentation, future maintenance work becomes guesswork, increasing the risk of errors and non-compliance.
                </p>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Conduit System Earth Continuity</h3>
              <p className="text-sm text-white mb-3">
                Where heavy gauge steel conduit is used as the circuit protective conductor, the integrity of
                every joint in the conduit run is critical for safety. A single high-resistance joint can prevent
                the protective device from operating within the required disconnection time during an earth fault.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Testing method:</strong> Use a low-resistance ohmmeter to measure R2 from the distribution board earth terminal to the furthest accessory on each circuit</li>
                <li className="pl-1"><strong>Acceptable values:</strong> The measured R2 must be consistent with the conduit length and cross-sectional area — unexpectedly high values indicate poor joints</li>
                <li className="pl-1"><strong>Joint types:</strong> Screwed joints on HG conduit provide the most reliable continuity; slip couplings on LG conduit are not reliable for earth continuity</li>
                <li className="pl-1"><strong>Remedial action:</strong> If conduit earth continuity is unsatisfactory, install a separate CPC within the conduit rather than attempting to improve joint continuity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Containment Labelling Requirements</h3>
              <p className="text-sm text-white mb-3">
                Cable containment systems should be labelled to identify the circuits they carry and to provide
                warnings where necessary. This aids safe isolation and maintenance access.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Circuit identification:</strong> Large trunking runs and cable trays carrying multiple circuits should have periodic labels identifying the circuits within — this prevents accidental disturbance of the wrong cable</li>
                <li className="pl-1"><strong>Voltage warning:</strong> Where containment carries circuits at different voltages (e.g., LV and ELV in segregated compartments), labels must identify the voltage in each compartment</li>
                <li className="pl-1"><strong>Fire barrier locations:</strong> Fire barriers within containment should be identified with labels showing the fire rating and the date of last inspection</li>
                <li className="pl-1"><strong>Route markers:</strong> In large buildings with extensive containment routes, directional labels help maintenance technicians trace cable routes without opening every section of lid or cover</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Modification Management</p>
              <p className="text-sm text-white">
                Every modification to a cable containment system — adding cables, removing cables, changing
                routes, or installing new containment — must be documented. This includes updating cable
                schedules, route drawings, and fire barrier records. Undocumented modifications are one of the
                most common causes of overloaded containment, missing fire barriers, and incorrect cable
                identification during future maintenance work.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must be able to install, maintain
              and inspect cable containment systems. This includes selecting the correct containment for the
              application, calculating cable fill capacity, and ensuring compliance with BS 7671 and fire
              safety regulations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Special Environments and Future Containment Trends
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different installation environments demand specific containment solutions. Corrosive atmospheres, high-temperature areas, clean rooms, hazardous zones and outdoor locations each present unique challenges that standard galvanised steel containment cannot address. Maintenance technicians must understand why a particular containment type was specified and ensure that replacements or additions maintain the same protection level.
            </p>
            <p>
              The containment industry is also evolving, with new materials and systems entering the market. Glass-reinforced plastic (GRP) containment is increasingly used in corrosive environments. Modular busbar trunking systems are replacing traditional cable distribution in some applications. Pre-fabricated cable management modules speed up installation on large projects. Understanding these trends prepares maintenance technicians for the systems they will encounter in modern installations.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environment-Specific Containment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Corrosive environments:</strong> Stainless steel or GRP containment; galvanised steel corrodes rapidly in chemical, coastal and food-processing environments</li>
                <li className="pl-1"><strong>Hazardous areas (ATEX):</strong> Certified containment with sealed entries, flame-proof fittings and Ex-rated glands; incorrect containment in an Ex zone is a serious compliance failure</li>
                <li className="pl-1"><strong>Clean rooms:</strong> Sealed, particle-free containment preventing contamination; no galvanised coatings (particle shedding); stainless steel or powder-coated systems</li>
                <li className="pl-1"><strong>High temperature:</strong> Steel containment preferred over PVC (which softens above 60 degrees C); fire-rated cable clips for life-safety circuits</li>
                <li className="pl-1"><strong>Outdoor/exposed:</strong> Hot-dip galvanised or marine-grade stainless; weatherproof cable glands; UV-resistant PVC</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Emerging Containment Technologies</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Busbar trunking:</strong> Pre-fabricated power distribution systems replacing large SWA cable runs for high-current distribution; lower installation cost, easier modification, better heat dissipation</li>
                <li className="pl-1"><strong>Modular cable management:</strong> Click-fit, tool-free containment systems reducing installation time; particularly popular in data centres and commercial fit-outs</li>
                <li className="pl-1"><strong>Intelligent containment:</strong> Containment with integrated sensors monitoring temperature, cable fill and fire barrier integrity; providing real-time data to building management systems</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Containment Selection Decision Factors</h3>
              <p className="text-sm text-white mb-3">
                When selecting containment for a new installation or replacing damaged containment during
                maintenance, several factors must be considered simultaneously to arrive at the correct
                specification.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable weight and number:</strong> Determines the structural requirement — light data cables can use basket; heavy SWA cables need ladder</li>
                <li className="pl-1"><strong>Access requirements:</strong> Frequent cable additions favour trunking or tray (lay-in); infrequent access is acceptable with conduit (pull-through)</li>
                <li className="pl-1"><strong>Environmental conditions:</strong> Temperature, humidity, chemicals, UV exposure, mechanical risk — all determine material selection</li>
                <li className="pl-1"><strong>Fire rating:</strong> Containment passing through fire compartments must be fire-stopped; some containment systems have integral fire barrier solutions</li>
                <li className="pl-1"><strong>Aesthetic requirements:</strong> Visible containment in public areas may need mini-trunking or dado trunking rather than exposed cable tray</li>
                <li className="pl-1"><strong>Cost and programme:</strong> Basket and tray are typically fastest to install; conduit and trunking require more labour but provide higher protection</li>
                <li className="pl-1"><strong>Future expansion:</strong> Design for 20-30% spare capacity to accommodate future cable additions without requiring new containment runs</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> When specifying replacement containment in special environments, always verify the original specification and the reasons for selecting that particular material and type. Substituting a cheaper alternative can compromise safety, compliance and the longevity of the cable installation.
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
                <p className="font-medium text-white mb-1">Containment Types</p>
                <ul className="space-y-0.5">
                  <li>HG steel conduit — threaded, can be CPC</li>
                  <li>LG steel conduit — slip couplings, separate CPC needed</li>
                  <li>PVC conduit — corrosion-resistant, separate CPC needed</li>
                  <li>Trunking — higher capacity, lay-in cables</li>
                  <li>Cable tray — open, ventilated, medium loads</li>
                  <li>Cable ladder — heavy loads, long spans</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Rules</p>
                <ul className="space-y-0.5">
                  <li>40% space factor for conduit cable fill</li>
                  <li>Segregation: power and data separated (Reg 528.1)</li>
                  <li>Fire barriers at all compartment penetrations</li>
                  <li>Earth continuity verified on metallic containment</li>
                  <li>Support spacings per BS 7671 / IET On-Site Guide</li>
                  <li>Reinstate fire barriers after every cable addition</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Terminations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section3-5">
              Next: Labelling Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section3_4;
