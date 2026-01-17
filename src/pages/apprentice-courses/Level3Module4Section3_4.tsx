/**
 * Level 3 Module 4 Section 3.4 - Earthing and Bonding Issues
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing and Bonding Issues - Level 3 Module 4 Section 3.4";
const DESCRIPTION = "Diagnose problems with earthing arrangements and protective bonding, understand TN, TT, and IT systems, and identify faults that compromise electrical safety.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Earth fault loop impedance (Zs) on a circuit measures 2.5 ohms, but the maximum permitted for a 32A Type B MCB is 1.37 ohms. What is the consequence?",
    options: [
      "The circuit will trip too quickly",
      "The MCB may not trip fast enough during an earth fault to prevent electric shock",
      "The RCD will compensate for the high impedance",
      "The circuit cable is undersized"
    ],
    correctIndex: 1,
    explanation: "High Zs means lower fault current, meaning the MCB takes longer to trip. With Zs of 2.5 ohms, fault current would be only 92A (230/2.5), requiring the MCB to operate on thermal rather than magnetic trip. This may exceed the 0.4s disconnection time required for socket circuits, creating shock risk."
  },
  {
    id: "check-2",
    question: "You measure 0V between the main earth terminal and incoming water pipe, but 8V between the MET and incoming gas pipe. What does this indicate?",
    options: [
      "The water bonding is incorrect",
      "The gas bonding is missing or has high resistance",
      "The supply neutral is faulty",
      "Normal readings for a TT installation"
    ],
    correctIndex: 1,
    explanation: "In a correctly bonded installation, all bonded services should be at the same potential as the MET - very low or zero voltage between them. 8V between MET and gas pipe indicates the bonding connection is broken, has high resistance, or is missing entirely. This is a serious safety issue requiring immediate attention."
  },
  {
    id: "check-3",
    question: "A TT installation has an earth electrode resistance of 180 ohms. The RCD is 30mA. Is this arrangement compliant?",
    options: [
      "No - 180 ohms is far too high for any installation",
      "Yes - provided the 30mA RCD operates within 50V touch voltage (RA x IΔn must not exceed 50V)",
      "No - TT installations require electrode resistance below 20 ohms",
      "Yes - any electrode resistance is acceptable with RCD protection"
    ],
    correctIndex: 1,
    explanation: "For a TT system, BS 7671 requires RA x IΔn is less than or equal to 50V. Here, 180 x 0.03 = 5.4V, well within the 50V limit. The RCD will trip before dangerous touch voltages develop. However, very high electrode resistance can cause RCD testing issues and is generally improved where practical."
  },
  {
    id: "check-4",
    question: "During testing, you discover the earthing conductor from the consumer unit to the MET has been routed through a steel conduit. Is this acceptable?",
    options: [
      "Yes - conduit provides additional protection for the earthing conductor",
      "No - the conduit may become an unintended parallel earth path",
      "Yes - provided the conduit is also bonded at both ends",
      "No - earthing conductors must always be bare copper"
    ],
    correctIndex: 1,
    explanation: "Running an earthing conductor through steel conduit creates a parallel path for fault current through the conduit itself. This may reduce effective earthing conductor cross-section if the conduit is not rated, or create confusion during testing. The earthing conductor should be routed separately and clearly identified."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An installation has PME (TN-C-S) earthing but the DNO cut-out label warns 'PME restrictions apply - check with DNO before connecting'. What requires special attention?",
    options: [
      "Only lighting circuits can be connected",
      "Extraneous-conductive-parts in contact with earth (buried pipes) need careful bonding consideration",
      "The installation must use smaller than normal earthing conductors",
      "RCD protection is not required on any circuits"
    ],
    correctAnswer: 1,
    explanation: "PME restrictions relate to the risk of the combined PEN conductor becoming open-circuit, which could make bonded metalwork rise to dangerous potential. Special consideration is needed for installations with extraneous-conductive-parts in contact with true earth (outdoor installations, farms, petrol stations) where alternative earthing may be required."
  },
  {
    id: 2,
    question: "You're testing main bonding and find 0.12 ohms between the MET and the water stopcock. The bonding conductor is 10mm2. Is this acceptable?",
    options: [
      "Yes - this is within the typical 0.05 ohms R2 for a 10mm2 conductor",
      "No - the reading is higher than expected and indicates a poor connection",
      "Yes - any reading below 1 ohm is acceptable for main bonding",
      "No - 10mm2 is inadequate for main bonding"
    ],
    correctAnswer: 1,
    explanation: "10mm2 copper has resistance around 1.83 milliohms per metre. For a typical short bonding run of 3-4 metres, expected resistance is 0.005-0.007 ohms. 0.12 ohms is much higher, indicating a loose clamp, corroded connection, or damaged conductor. Investigate and rectify."
  },
  {
    id: 3,
    question: "An older property has no main bonding to water or gas services. The supply is TN-S. What is the first consideration?",
    options: [
      "This is acceptable for TN-S as the supply earth is reliable",
      "Main bonding is required for all installations regardless of earthing system",
      "Add bonding immediately without further investigation",
      "Convert to TT earthing to avoid the need for bonding"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 411.3.1.2 requires main protective bonding in all TN and TT systems. The type of supply earth doesn't eliminate the need - bonding equalises potential between extraneous-conductive-parts and the installation earth. Recommend installation of appropriate main bonding conductors."
  },
  {
    id: 4,
    question: "During an EICR, you find supplementary bonding in a bathroom connecting all exposed and extraneous-conductive-parts, but no RCD protection on bathroom circuits. What is your classification?",
    options: [
      "C1 - Danger present due to missing RCD",
      "C2 - The supplementary bonding provides alternative protection",
      "C3 - Improvement recommended but not essential",
      "No action - supplementary bonding is an acceptable alternative to RCD"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires 30mA RCD protection for bathroom circuits. Supplementary bonding alone does not provide equivalent protection - it only reduces touch voltage between simultaneously accessible parts. Missing RCD protection in bathrooms is typically classified C1 (danger present) as it affects shock protection."
  },
  {
    id: 5,
    question: "A Ze test shows 0.8 ohms at a TN-S installation. Six months later, it measures 1.2 ohms. What should you investigate?",
    options: [
      "Nothing - small variations are normal with different test instruments",
      "Deterioration of the supply earthing connection or internal earth path",
      "The DNO has changed the supply impedance",
      "The main bonding has degraded"
    ],
    correctAnswer: 1,
    explanation: "A 50% increase in Ze is significant and suggests deterioration. In TN-S systems, check the earthing conductor connection to the supply cable armour or sheath, the connections at the MET, and any corrosion of the supply cable earth. Main bonding doesn't affect Ze but should also be checked if investigating earth issues."
  },
  {
    id: 6,
    question: "Testing continuity of the CPC on a circuit shows 0.6 ohms, but individual sections show 0.15 ohms each for four sections. What does the discrepancy indicate?",
    options: [
      "Normal variation in test readings",
      "The CPCs are routed through different paths and not series-connected",
      "A high resistance joint in the CPC path",
      "Test instrument calibration error"
    ],
    correctAnswer: 2,
    explanation: "Four sections at 0.15 ohms each should total 0.6 ohms if series-connected. The end-to-end reading of 0.6 ohms matches, but this is coincidental. More likely, there's a high-resistance joint adding resistance that masks in full testing. Test each joint individually to locate the poor connection."
  },
  {
    id: 7,
    question: "An agricultural installation uses TT earthing. The customer has installed a new metal feeding system that makes contact with the ground. What bonding consideration applies?",
    options: [
      "Bond the feeding system to the installation MET",
      "Consider if the feeding system creates an extraneous-conductive-part in parallel with the earth electrode",
      "No additional bonding required if equipment is Class II",
      "Install an isolating transformer for the feeding system circuit"
    ],
    correctAnswer: 1,
    explanation: "Metal structures in contact with ground act as earth electrodes. In a TT system, if fault current can flow through the feeding system to true earth, it may bypass the installation's RCD protection. Consider separate earth electrode for this structure, equipotential bonding, or RCD protection specifically for circuits feeding this area."
  },
  {
    id: 8,
    question: "You find a property where the gas meter has been replaced and the main bonding clamp is now attached to plastic pipe. What action is required?",
    options: [
      "No action - plastic pipe doesn't need bonding",
      "Relocate the bonding clamp to the first metallic section of the gas installation after the meter",
      "Install a new earth electrode as the bonding is no longer effective",
      "Report to the gas supplier as this is their responsibility"
    ],
    correctAnswer: 1,
    explanation: "The bonding requirement is for metallic services that could introduce earth potential or become live during a fault. If the incoming gas pipe is now plastic, bonding that plastic achieves nothing. Relocate the bonding clamp to the first accessible metallic pipework after the plastic section (often at the gas boiler inlet)."
  },
  {
    id: 9,
    question: "A Zs reading of 0.45 ohms is obtained on a ring circuit. When testing at a socket, external earth fault loop tester reads 0.52 ohms. What explains the difference?",
    options: [
      "Test instrument error - readings should be identical",
      "The socket CPC connection has additional resistance not present in the calculation",
      "Normal variation between test methods",
      "The ring has a break affecting some readings"
    ],
    correctAnswer: 1,
    explanation: "Calculated Zs (Ze + R1+R2) should equal measured Zs. A measured value 0.07 ohms higher suggests additional resistance in the actual earth path - typically at socket terminals, the accessory back box connection, or the connection to the wiring. Check terminations at the socket tested."
  },
  {
    id: 10,
    question: "During refurbishment, you discover the main earthing conductor passes through a void before reaching the MET and has been partially damaged by rodents. What should you do?",
    options: [
      "Wrap the damage with insulation tape and continue",
      "Replace the earthing conductor completely or provide mechanical protection",
      "Add a parallel earthing conductor to compensate",
      "Test the conductor - if resistance is acceptable, leave as is"
    ],
    correctAnswer: 1,
    explanation: "Damaged earthing conductors compromise safety critical paths. Rodent damage often leaves sharp edges that cut remaining strands, and the damage may worsen. Replace the conductor or, if that's impractical, provide robust mechanical protection (metal conduit, trunking) to prevent further damage and protect the damaged section."
  },
  {
    id: 11,
    question: "A property has multiple earth electrodes for different outbuildings, all connected to the main MET. Ze measures 0.35 ohms, but individual electrode resistance tests show 40 ohms, 55 ohms, and 60 ohms. What explains this?",
    options: [
      "Ze should equal the sum of electrode resistances",
      "The parallel combination of electrodes plus the supply earth gives the Ze reading",
      "One or more electrodes is disconnected",
      "The test method for electrode resistance is inaccurate"
    ],
    correctAnswer: 1,
    explanation: "Ze includes the supply path (TN contribution) in parallel with local electrodes. Multiple electrodes in parallel reduce total resistance. Additionally, if this is TNS/TN-C-S, the supply earth provides a low-impedance path that dominates. The individual electrode readings are valid for their standalone resistance."
  },
  {
    id: 12,
    question: "Testing supplementary bonding in a bathroom, you measure 0.5 ohms between the bath waste connection and a metallic radiator. Maximum permitted is 0.04 ohms (derived from 50V/(1200/Zs)). What action is required?",
    options: [
      "The installation is dangerous and requires immediate bonding",
      "This is acceptable as supplementary bonding is no longer mandatory with RCD protection",
      "Check if both items are exposed-conductive-parts or if one is extraneous",
      "Install 4mm2 supplementary bonding between the two"
    ],
    correctAnswer: 1,
    explanation: "With 30mA RCD protection on all bathroom circuits (as required by current BS 7671), supplementary bonding may be omitted provided the main bonding and circuit CPCs are adequate. If RCD protection is confirmed, the lack of supplementary bonding meeting the 0.04 ohm limit is not necessarily a defect."
  }
];

const faqs = [
  {
    question: "What's the difference between protective bonding and functional earthing?",
    answer: "Protective bonding connects extraneous-conductive-parts to the installation earth to prevent dangerous touch voltages during a fault - it's a safety measure. Functional earthing provides a reference point for electronic equipment operation (computers, medical equipment) - it's for equipment function, not safety. Both may use the same physical earth point but serve different purposes."
  },
  {
    question: "Why is the main bonding conductor larger than individual circuit CPCs?",
    answer: "Main bonding conductors may need to carry fault current from multiple circuits simultaneously if a fault occurs on services. They also need to withstand thermal stress from high fault currents for longer duration as they're upstream of individual circuit protection. BS 7671 Table 54.8 specifies minimum sizes related to supply protective device rating."
  },
  {
    question: "How do I test if an installation is TN-S, TN-C-S, or TT?",
    answer: "Visual inspection at the origin: TN-S has a separate earth conductor from the supply cable (usually the armour or sheath). TN-C-S has the neutral and earth combined in the supply (PEN conductor) with a distributor-provided earth terminal. TT has no supply earth - look for an earth electrode and typically higher Ze values. Check the distributor's documentation when available."
  },
  {
    question: "Can I use water or gas pipes as earth electrodes?",
    answer: "No - BS 7671 prohibits using water, gas, or other metallic services as the primary earth electrode. Modern installations increasingly have plastic sections that interrupt any earth path. These services must be bonded to prevent voltage differences, but the installation's earthing must be independent - either from the supply (TN) or a dedicated electrode (TT)."
  },
  {
    question: "What causes high earth electrode resistance?",
    answer: "Electrode resistance depends on soil resistivity and electrode dimensions. High resistance is caused by: dry soil (common in summer), sandy or rocky ground, insufficient electrode depth or length, corroded electrode, poor contact between electrode and soil. Solutions include driving electrodes deeper, installing multiple electrodes in parallel, treating soil, or using specialist electrode types."
  },
  {
    question: "Why might main bonding be disconnected during gas or water work?",
    answer: "When services are worked on, bonding may be temporarily disconnected. Plumbers and gas fitters sometimes don't reconnect it, or the work creates a new plastic section that invalidates the bonding position. After any service work in a property, check that main bonding is correctly installed and connected to metallic sections of the services."
  }
];

const Level3Module4Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3">
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
            <span>Module 4.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing and Bonding Issues
          </h1>
          <p className="text-white/80">
            Diagnosing faults in earthing systems and protective bonding arrangements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>High Zs:</strong> Slow disconnection, shock risk - check earth path</li>
              <li><strong>High Ze:</strong> Supply earth problem or TT system issues</li>
              <li><strong>Bonding voltage:</strong> Should be near zero between MET and services</li>
              <li><strong>Missing bonding:</strong> Potential shock hazard - install immediately</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Corroded clamps = failing bonding connection</li>
              <li><strong>Spot:</strong> Voltage between MET and services = bonding issue</li>
              <li><strong>Use:</strong> R2 test verifies CPC continuity throughout circuit</li>
              <li><strong>Use:</strong> Ze vs Zs comparison reveals circuit earth problems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify faults in TN-S, TN-C-S, and TT earthing systems",
              "Test and verify main protective bonding connections",
              "Diagnose high earth fault loop impedance causes",
              "Understand the role of supplementary bonding",
              "Recognise earthing arrangements during inspections",
              "Apply BS 7671 requirements to earthing defects"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Earthing System Types and Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Earthing System Types and Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earthing system determines how an installation connects to the general mass of earth and how it responds during a fault. Different systems have different vulnerabilities and testing requirements. Recognising the earthing system type is the first step in diagnosing earthing faults.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN-S System</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Separate earth from supply cable sheath/armour</li>
                  <li>Low Ze (typically 0.35-0.8 ohms)</li>
                  <li>Common fault: corroded sheath connection</li>
                  <li>Check: connection at cut-out, cable condition</li>
                  <li>Older systems - increasingly rare in new supplies</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN-C-S (PME) System</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Combined neutral/earth in supply (PEN)</li>
                  <li>Very low Ze (typically 0.2-0.35 ohms)</li>
                  <li>Common fault: open PEN conductor risk</li>
                  <li>Special restrictions apply for some locations</li>
                  <li>Most common in modern UK installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT System</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Local earth electrode required</li>
                  <li>Higher Ze (typically 20-200 ohms)</li>
                  <li>Common fault: high electrode resistance</li>
                  <li>RCD essential for fault protection</li>
                  <li>Rural areas, temporary supplies</li>
                </ul>
              </div>
            </div>

            <p>
              Each system has characteristic faults. TN-S suffers from corroding cable connections. TN-C-S has inherent PEN conductor risks requiring bonding consideration. TT systems need regular electrode testing, especially after dry summers when soil resistivity increases dramatically.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Reference:</strong> Chapter 31 specifies earthing arrangements and conductor sizes. Regulation 411.4.2 covers TN system automatic disconnection requirements. Regulation 411.5 covers TT system requirements including mandatory RCD protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Main Protective Bonding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Main Protective Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main protective bonding connects extraneous-conductive-parts (metalwork not part of the electrical installation but capable of introducing a potential) to the main earthing terminal. This ensures that during a fault, all accessible metalwork rises and falls together, preventing dangerous potential differences that could cause shock.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main bonding requirements (BS 7671):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Water installation:</strong> Connect to incoming metal water service pipe, within 600mm of the stopcock</li>
                <li><strong>Gas installation:</strong> Connect to incoming metal gas installation pipe, within 600mm of the meter</li>
                <li><strong>Other services:</strong> Oil supply pipes, central heating systems, any metal structure entering the building</li>
                <li><strong>Conductor size:</strong> Minimum 6mm2 copper, or half the supply earthing conductor size, or as per Table 54.8</li>
              </ul>
            </div>

            <p>
              Common bonding faults include: disconnected clamps after service work, corroded connections especially in damp locations, undersized conductors on older installations, and bonding attached to plastic sections where services have been updated. Always verify bonding visually and by testing.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A customer reports tingling from their metal sink when touching a radiator. Investigation finds the main water bonding clamp has corroded through, leaving the water pipework (connected to sink) at a different potential from the heating system (connected via gas bonding). Cleaning and replacing the water bonding clamp resolves the issue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Circuit Protective Conductors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Circuit Protective Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The circuit protective conductor (CPC) provides the return path for earth fault current on each circuit. It must have sufficiently low resistance to ensure enough fault current flows to trip the protective device quickly. CPC faults are among the most dangerous as they may not be apparent until a fault occurs - then there's no protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CPC Fault Symptoms</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High Zs readings on specific circuits</li>
                  <li>Variation in Zs readings around ring circuits</li>
                  <li>No continuity between socket earth and MET</li>
                  <li>RCD not tripping on test (downstream fault)</li>
                  <li>Tingling from appliance casings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CPC Fault Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Loose terminations at accessories</li>
                  <li>Damaged cable - rodents, nails, abrasion</li>
                  <li>Corroded connections in junction boxes</li>
                  <li>Missing earth connection at socket plates</li>
                  <li>Earth cores not stripped and terminated</li>
                </ul>
              </div>
            </div>

            <p>
              Testing CPCs requires systematic approach. End-to-end testing on ring circuits reveals breaks. Socket-by-socket r1+r2 testing reveals high-resistance joints. Always test at the furthest point from the consumer unit where impedance is highest. Compare calculated Zs (Ze + R1+R2) with measured Zs - a significant difference indicates CPC problems.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When Zs is much higher than calculated, but R1+R2 tests correctly, check connections at the consumer unit earth bar and the main earthing terminal. These joints carry fault current from multiple circuits and can develop high resistance from thermal cycling.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Earth Electrode Issues */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Electrode Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In TT systems (and some special installations), the earth electrode is the installation's connection to earth. Unlike TN systems where the supply provides a low-impedance earth path, TT systems rely entirely on the electrode's contact with the soil. This creates unique maintenance and testing requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting electrode resistance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Soil type:</strong> Clay and loam have low resistivity; sand, gravel, rock have high resistivity</li>
                <li><strong>Moisture content:</strong> Dry soil dramatically increases resistance - summer readings often higher than winter</li>
                <li><strong>Electrode depth:</strong> Deeper electrodes reach more stable moisture levels and more soil</li>
                <li><strong>Electrode condition:</strong> Corrosion reduces effective contact area over time</li>
                <li><strong>Connections:</strong> Clamps can corrode, especially in acidic soils</li>
              </ul>
            </div>

            <p>
              Earth electrode testing requires the fall-of-potential method using auxiliary electrodes. Simple resistance measurement with a multimeter doesn't give accurate electrode resistance. Record readings and monitor trends - gradually increasing resistance suggests electrode deterioration requiring attention.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A rural cottage TT installation trips its RCD when the RCD is tested, but won't trip using the installation tester. Investigation shows electrode resistance has risen to 400 ohms due to summer drought. At 400 ohms with 30mA trip current, touch voltage would reach 12V (within limit), but the RCD tester can't inject sufficient current to actually trip the device. Watering the electrode area temporarily reduces resistance; long-term solution is additional electrode(s) or soil treatment.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Fault Diagnosis Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify earthing system type (TN-S, TN-C-S, TT) from visual inspection</li>
                <li>2. Test Ze at the origin - compare with expected values for the system type</li>
                <li>3. Test main bonding continuity - should be very low resistance to MET</li>
                <li>4. Test Zs on circuits and compare with calculated values (Ze + R1+R2)</li>
                <li>5. Investigate any discrepancies starting at the origin and working outward</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Main Bonding Inspection Points</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check clamps are on metallic pipe sections, not plastic</li>
                <li>Verify clamps are tight and connections not corroded</li>
                <li>Confirm bonding conductor is correctly sized (check supply protection rating)</li>
                <li>Ensure routing is protected where exposed to damage</li>
                <li>Test for voltage between MET and bonded services (should be near zero)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming bonding is present</strong> - Always physically trace and test bonding connections</li>
                <li><strong>Testing Ze with bonding connected</strong> - Parallel paths give falsely low readings</li>
                <li><strong>Accepting high Zs on TT</strong> - Even TT systems have Zs limits; high readings need RCD verification</li>
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
                <p className="font-medium text-white mb-1">Typical Ze Values</p>
                <ul className="space-y-0.5">
                  <li>TN-S: 0.35 - 0.8 ohms</li>
                  <li>TN-C-S: 0.2 - 0.35 ohms</li>
                  <li>TT: 20 - 200 ohms (electrode resistance)</li>
                  <li>Maximum measured Ze = 0.8 x tabulated Zs</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Main Bonding Conductor Sizes</p>
                <ul className="space-y-0.5">
                  <li>Minimum: 6mm2 copper</li>
                  <li>PME supply: 10mm2 minimum</li>
                  <li>Generally: half earthing conductor size</li>
                  <li>See BS 7671 Table 54.8 for full requirements</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Protective Device Tripping
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3-5">
              Next: Appliance and Equipment Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section3_4;
