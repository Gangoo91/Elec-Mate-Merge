import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing and Segregation | Fibre Optics Module 3";
const DESCRIPTION = "Learn earthing requirements for fibre optic installations, segregation from power cables, EMC considerations, and compliance with BS 7671 for optical cable systems.";

const quickCheckQuestions = [
  {
    id: "earthing-qc1",
    question: "Do fibre optic cables require electrical earthing?",
    options: [
      "Yes, always",
      "Only the metallic strength members",
      "No, fibre is non-conductive",
      "Only outdoor cables"
    ],
    correctIndex: 1,
    explanation: "While optical fibres themselves are non-conductive, armoured cables and cables with metallic strength members (steel wire, aluminium) must have these elements properly earthed."
  },
  {
    id: "earthing-qc2",
    question: "What is the minimum separation distance between fibre and power cables in shared containment?",
    options: [
      "No separation needed",
      "25mm physical barrier",
      "Depends on voltage and containment type",
      "Always 300mm"
    ],
    correctIndex: 2,
    explanation: "Separation requirements depend on voltage levels, containment type, and applicable standards. BS 7671 and BS EN 50174 provide specific guidance for different scenarios."
  },
  {
    id: "earthing-qc3",
    question: "Why might fibre cables still need segregation from power despite being non-conductive?",
    options: [
      "Electrical interference to fibres",
      "Heat damage and mechanical protection",
      "Fibre cables carry voltage",
      "Regulatory requirement only"
    ],
    correctIndex: 1,
    explanation: "While fibres do not suffer electrical interference, cables can be damaged by heat from power cables and need protection from accidental damage during power cable maintenance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which component of an armoured fibre cable requires earthing?",
    options: [
      "The optical fibre",
      "The outer jacket",
      "The steel wire armour",
      "The buffer tubes"
    ],
    correctAnswer: 2,
    explanation: "Steel wire armour (SWA) must be earthed at both ends to prevent shock hazards from induced voltages."
  },
  {
    id: 2,
    question: "What is the purpose of earthing metallic cable elements?",
    options: [
      "Improve signal quality",
      "Safety - prevent shock hazard",
      "Reduce attenuation",
      "Increase bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Earthing metallic elements prevents shock hazards from induced voltages from nearby power sources or fault conditions."
  },
  {
    id: 3,
    question: "According to BS EN 50174-2, what is the minimum separation for fibre from LV cables in steel trunking?",
    options: [
      "No separation with steel barrier",
      "50mm minimum",
      "150mm minimum",
      "Complete segregation required"
    ],
    correctAnswer: 0,
    explanation: "Steel trunking provides inherent segregation, allowing reduced or no separation depending on voltage levels."
  },
  {
    id: 4,
    question: "What standard covers EMC requirements for data cable installations?",
    options: [
      "BS 7671",
      "BS EN 50174-2",
      "BS 476",
      "BS 8519"
    ],
    correctAnswer: 1,
    explanation: "BS EN 50174-2 provides specific guidance for data cabling installation including EMC and segregation requirements."
  },
  {
    id: 5,
    question: "How should SWA fibre cables be earthed at each end?",
    options: [
      "Through cable glands to earth terminal",
      "No earthing required",
      "Tape connection to armour",
      "Connect to cable tray only"
    ],
    correctAnswer: 0,
    explanation: "SWA cables should be earthed through appropriate cable glands connected to the main earth terminal."
  },
  {
    id: 6,
    question: "What is a key benefit of fibre regarding EMC?",
    options: [
      "Requires shielding",
      "Immune to electromagnetic interference",
      "Generates less EMI",
      "Needs filtered connectors"
    ],
    correctAnswer: 1,
    explanation: "Fibre optics are completely immune to electromagnetic interference as light signals are unaffected by electromagnetic fields."
  },
  {
    id: 7,
    question: "When running fibre alongside 11kV power cables, what is required?",
    options: [
      "No special requirements",
      "Physical separation and possibly metallic conduit",
      "Fibre cannot be installed near HV",
      "Just use armoured fibre"
    ],
    correctAnswer: 1,
    explanation: "High voltage installations require physical separation and may need additional protection like metallic conduit."
  },
  {
    id: 8,
    question: "What happens if metallic strength members are left unearthed?",
    options: [
      "Signal degradation",
      "Potential shock hazard from induced voltages",
      "No practical effect",
      "Increased attenuation"
    ],
    correctAnswer: 1,
    explanation: "Unearthed metallic elements can accumulate induced voltages creating potential shock hazards."
  },
  {
    id: 9,
    question: "In telecommunications equipment rooms, what earthing system is typically used?",
    options: [
      "TN-S only",
      "Mesh-bonded earth network (MBEN)",
      "TT earthing",
      "No earthing required"
    ],
    correctAnswer: 1,
    explanation: "Mesh-bonded earthing networks (MBEN) are typically used in equipment rooms to provide low-impedance earth paths."
  },
  {
    id: 10,
    question: "What documentation should record fibre cable earthing?",
    options: [
      "Optical test results only",
      "Electrical installation certificate/as-built drawings",
      "No documentation needed",
      "Manufacturer warranty only"
    ],
    correctAnswer: 1,
    explanation: "Earthing arrangements should be documented on electrical installation certificates and as-built drawings."
  }
];

const faqs = [
  {
    question: "Why earth fibre cables if they do not carry electricity?",
    answer: "While the optical fibres themselves are non-conductive, many fibre cables contain metallic elements for strength or armour protection. These can pick up induced voltages from nearby power sources, lightning, or fault conditions. Earthing these elements prevents potential shock hazards and ensures safety compliance."
  },
  {
    question: "Can fibre and power cables share the same tray?",
    answer: "Yes, under certain conditions. BS EN 50174-2 allows shared containment with appropriate barriers or separation. Steel trunking provides inherent segregation. The key factors are voltage level, barrier type, and whether the power cables operate at temperatures that could affect fibre cable ratings."
  },
  {
    question: "Do all-dielectric fibre cables need any earthing?",
    answer: "All-dielectric cables have no metallic components and do not require electrical earthing. However, if they are installed with metallic cable tray or conduit, those containment systems still need earthing per BS 7671. All-dielectric cables are often preferred near sensitive equipment or in high-voltage environments."
  },
  {
    question: "What about fibre in lightning-prone areas?",
    answer: "All-dielectric cables offer protection from lightning as they will not conduct current. Cables with metallic elements need proper earthing at building entry points. For critical installations, consider surge protection on any copper elements and earth metallic cable armour to lightning protection systems."
  },
  {
    question: "How does segregation differ for indoor vs outdoor cables?",
    answer: "Indoor cables typically run in structured cabling environments with specific containment rules. Outdoor cables may parallel power lines and require greater separation distances or physical protection. Underground installations often specify minimum burial depths and separation from other services."
  },
  {
    question: "What is the relationship between BS 7671 and BS EN 50174?",
    answer: "BS 7671 covers electrical safety including earthing requirements for any metallic cable elements. BS EN 50174 provides specific guidance for data and communications cabling including fibre, covering installation practices, segregation, and EMC. Both should be followed, with BS 7671 taking precedence for electrical safety matters."
  }
];

const FiberOpticsModule3Section6 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing and Segregation
          </h1>
          <p className="text-white/80">
            Metallic element earthing, power cable separation, and EMC
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Earthing:</strong> Required for metallic elements only</li>
              <li><strong>SWA cables:</strong> Earth armour at both ends</li>
              <li><strong>Segregation:</strong> Protects from heat and damage</li>
              <li><strong>EMC benefit:</strong> Fibre immune to interference</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Earth bonding clamps on armour</li>
              <li><strong>Spot:</strong> Segregated cable trays (coloured)</li>
              <li><strong>Use:</strong> BS 7671 for earthing requirements</li>
              <li><strong>Use:</strong> BS EN 50174-2 for separation distances</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Earthing requirements for metallic elements",
              "Segregation from power cables",
              "EMC and interference considerations",
              "All-dielectric cable applications",
              "Compliance with BS 7671 and BS EN 50174",
              "Documentation and testing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Earthing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Earthing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While optical fibres are non-conductive and do not require earthing, many fibre cables contain metallic elements that must be properly earthed for electrical safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Metallic Elements in Fibre Cables:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Steel Wire Armour (SWA):</strong> Galvanised steel wires for mechanical protection - must be earthed at both ends</li>
                <li><strong>Aluminium tape:</strong> Moisture barrier in some designs - earth if accessible</li>
                <li><strong>Steel strength members:</strong> Central or peripheral strength elements - require earthing</li>
                <li><strong>Metallic armouring:</strong> Corrugated steel or aluminium - continuous earthing path needed</li>
                <li><strong>Copper conductors:</strong> Hybrid cables with copper pairs - standard electrical earthing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principle:</p>
              <p className="text-sm text-white">
                Any metallic element in or on a cable can pick up induced voltages from nearby power sources, lightning, or fault conditions. Proper earthing provides a safe path for these currents and prevents potential shock hazards. This applies regardless of whether the cable carries optical or electrical signals.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Armoured Cable Earthing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Earth at both ends via cable glands</li>
                <li>Use appropriate SWA glands</li>
                <li>Continuous earth path through armour</li>
                <li>Connect to main earth terminal</li>
                <li>Maximum 1 ohm end-to-end resistance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Strength Member Earthing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify steel or metallic members</li>
                <li>Earth at termination points</li>
                <li>Use manufacturer's hardware</li>
                <li>Verify continuity after installation</li>
                <li>Document connections</li>
              </ul>
            </div>

            <p>
              Where cables enter buildings, earthing provides protection against external voltage rise. For lightning-prone areas, ensure metallic elements connect to the building's lightning protection system earth network where present.
            </p>
          </div>
        </section>

        {/* Section 2: Segregation from Power Cables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Segregation from Power Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Although fibre optics are immune to electromagnetic interference, proper segregation from power cables is still required for safety, thermal, and maintenance reasons.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Segregate Fibre from Power?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat damage:</strong> Power cables generate heat that can exceed fibre jacket ratings</li>
                <li><strong>Safe access:</strong> Maintenance on power systems without disturbing data cables</li>
                <li><strong>Fault conditions:</strong> Power faults can damage adjacent cables</li>
                <li><strong>Future flexibility:</strong> Independent routing for changes</li>
                <li><strong>Regulatory compliance:</strong> BS EN 50174 and client specifications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS EN 50174-2 Separation Requirements:</p>
              <p className="text-sm text-white mb-2">Minimum separation distances between IT cables (including fibre) and power cables:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unscreened in plastic, &lt;20kVA:</strong> 200mm</li>
                <li><strong>Unscreened in plastic, 20-100kVA:</strong> 300mm</li>
                <li><strong>Unscreened in plastic, &gt;100kVA:</strong> 600mm</li>
                <li><strong>Metal with barrier, &lt;20kVA:</strong> 50mm</li>
                <li><strong>Metal with barrier, 20-100kVA:</strong> 100mm</li>
                <li><strong>Steel trunking, &lt;20kVA:</strong> 0mm (barrier required)</li>
                <li><strong>Separate steel trunking:</strong> 0mm (any power level)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Segregation Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Separate containment:</strong> Dedicated fibre tray/trunking (often yellow or orange)</li>
                <li><strong>Physical barriers:</strong> Steel dividers in shared trunking</li>
                <li><strong>Vertical separation:</strong> Different tray levels</li>
                <li><strong>Horizontal separation:</strong> Opposite walls of corridor</li>
                <li><strong>Separate routes:</strong> Completely independent pathways</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: EMC and Interference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            EMC and Interference Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic Compatibility (EMC) is a significant advantage of fibre optics. Unlike copper cables, fibres are completely immune to electromagnetic interference, making them ideal for many challenging environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fibre EMC Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No EMI susceptibility:</strong> Light signals unaffected by electromagnetic fields</li>
                <li><strong>No EMI emission:</strong> Fibre does not radiate interference to affect other systems</li>
                <li><strong>Ground loop immunity:</strong> No electrical connection between ends</li>
                <li><strong>Lightning protection:</strong> All-dielectric cables cannot conduct surge currents</li>
                <li><strong>No crosstalk:</strong> No electrical coupling between fibres</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ideal Applications for EMC Immunity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Industrial environments with motors/drives</li>
                <li>Near high-power transmitters</li>
                <li>Healthcare MRI suites</li>
                <li>Power generation facilities</li>
                <li>Railway and transport systems</li>
                <li>Military and secure facilities</li>
                <li>Laboratory environments</li>
                <li>Broadcast facilities</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Equipment Considerations:</p>
              <p className="text-sm text-white">
                While the fibre itself is EMI-immune, the electronic equipment at each end (transceivers, switches, patch panels) requires normal EMC precautions. Proper earthing of equipment enclosures, screened cabinets, and filtered power supplies may still be needed. The fibre link provides galvanic isolation between these locations.
              </p>
            </div>

            <p>
              In environments with extreme EMI (near arc welders, VFDs, or radio transmitters), fibre optics may be the only viable transmission medium. The additional cost of optical equipment is often justified by the reliability and immunity to interference.
            </p>
          </div>
        </section>

        {/* Section 4: All-Dielectric Cables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            All-Dielectric Cable Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All-dielectric fibre cables contain no metallic elements whatsoever, providing complete electrical isolation. They are often specified where metallic cables would create safety or operational issues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">All-Dielectric Cable Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>ADSS (All-Dielectric Self-Supporting):</strong> Overhead cables without messenger wire, using aramid or FRP strength members</li>
                <li><strong>LSZH indoor cables:</strong> Standard indoor cables using glass-reinforced plastic (GRP) or aramid strength</li>
                <li><strong>GYFTY outdoor:</strong> Non-metallic loose tube outdoor cables</li>
                <li><strong>Micro-duct cables:</strong> Blown fibre with dielectric construction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>No earthing required</li>
                <li>Lightning-safe</li>
                <li>No induced voltages</li>
                <li>Complete galvanic isolation</li>
                <li>Can cross voltage boundaries</li>
                <li>Ideal near HV equipment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Less mechanical protection</li>
                <li>More vulnerable to rodents</li>
                <li>May need additional protection</li>
                <li>Higher cost for equivalent strength</li>
                <li>Limited burial depth ratings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High voltage substations:</strong> Data links between control systems across voltage zones</li>
                <li><strong>Aviation:</strong> Near navigation aids and radar systems</li>
                <li><strong>Power line crossings:</strong> ADSS cables spanning HV transmission lines</li>
                <li><strong>Explosive atmospheres:</strong> ATEX zones where sparks must be prevented</li>
                <li><strong>Medical imaging:</strong> MRI and CT scanner environments</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Compliance with Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Compliance with Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic installations must comply with multiple standards covering electrical safety, cabling installation, and EMC. Understanding which standards apply ensures compliant installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671 (IET Wiring Regulations):</strong> Electrical safety including earthing of metallic cable elements, containment earthing, and segregation from power</li>
                <li><strong>BS EN 50174-1:</strong> Installation specification and quality assurance</li>
                <li><strong>BS EN 50174-2:</strong> Installation planning including EMC, segregation, and containment requirements</li>
                <li><strong>BS EN 50174-3:</strong> Outdoor installations and building entry</li>
                <li><strong>BS EN 50346:</strong> Testing of installed cabling</li>
                <li><strong>BS EN 50310:</strong> Telecommunications bonding and earthing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Chapter 41:</strong> Protection against electric shock - earthing requirements</li>
                <li><strong>Chapter 52:</strong> Selection and erection of cables - including segregation</li>
                <li><strong>Section 528:</strong> Proximity to other services</li>
                <li><strong>Appendix 4:</strong> Current ratings considering thermal effects</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Telecommunications Earthing:</p>
              <p className="text-sm text-white mb-2">BS EN 50310 and BS EN 50174-2 provide specific guidance for telecommunications installations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mesh-Bonded Earthing Network (MBEN) for equipment rooms</li>
                <li>Telecommunications Main Earth (TME) connection point</li>
                <li>Equipment cabinet earthing requirements</li>
                <li>Patch panel and rack bonding</li>
              </ul>
            </div>

            <p>
              For client-specific installations, always check contract specifications. Many organisations have internal standards that exceed regulatory minimums, particularly for financial, healthcare, and government sectors.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation and Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation of earthing arrangements and segregation compliance is essential for handover, maintenance, and regulatory compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>As-built drawings:</strong> Show cable routes, containment types, and separation distances</li>
                <li><strong>Earthing schedules:</strong> List all earth connections for metallic elements</li>
                <li><strong>Electrical installation certificate:</strong> If metallic elements required earthing verification</li>
                <li><strong>Test results:</strong> Earth continuity measurements</li>
                <li><strong>Photographs:</strong> Key installation details including earthing connections</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth Continuity Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test armour to earth terminal</li>
                <li>Maximum 1 ohm end-to-end</li>
                <li>Use low-resistance ohmmeter</li>
                <li>Test at both ends</li>
                <li>Record in test documentation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inspection Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cable gland properly tightened</li>
                <li>Armour connection secure</li>
                <li>Earth conductor sized correctly</li>
                <li>Containment bonding complete</li>
                <li>Labels in place</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation:</p>
              <p className="text-sm text-white mb-2">Include earthing and segregation information in the O&M manual:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Earthing arrangement schematic</li>
                <li>Test certificates and results</li>
                <li>Maintenance requirements</li>
                <li>Manufacturer data for glands and hardware</li>
                <li>As-built containment layouts showing segregation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Identify metallic elements early:</strong> Check cable datasheets for construction details before installation</li>
                <li><strong>Select appropriate glands:</strong> Match gland type to cable construction (SWA vs non-armoured)</li>
                <li><strong>Plan containment:</strong> Determine segregation requirements during design phase</li>
                <li><strong>Use colour coding:</strong> Yellow/orange trays or labels for fibre routes</li>
                <li><strong>Test before handover:</strong> Verify earth continuity on all metallic elements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting armour earthing</strong> - Assuming fibre cables do not need electrical work</li>
                <li><strong>Wrong gland type</strong> - Using non-metallic glands where earthing is needed</li>
                <li><strong>Insufficient separation</strong> - Running fibre too close to power in shared containment</li>
                <li><strong>Missing documentation</strong> - No records of earthing connections or test results</li>
                <li><strong>Ignoring heat</strong> - Not considering thermal effects from adjacent power cables</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">High Voltage Environments</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Consider all-dielectric:</strong> Eliminates induced voltage concerns</li>
                <li><strong>Increase separation:</strong> Greater distances from HV cables</li>
                <li><strong>Metallic protection:</strong> Steel conduit may provide additional shielding</li>
                <li><strong>Specialist advice:</strong> Consult HV specialists for substation installations</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Earthing and Segregation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Earthing Checklist</p>
                <ul className="space-y-0.5">
                  <li>Identify all metallic elements</li>
                  <li>Select appropriate cable glands</li>
                  <li>Earth armour at both ends</li>
                  <li>Test continuity (&lt;1 ohm)</li>
                  <li>Document all connections</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Segregation Rules</p>
                <ul className="space-y-0.5">
                  <li>Check voltage and power levels</li>
                  <li>Apply BS EN 50174 distances</li>
                  <li>Use barriers where required</li>
                  <li>Consider thermal effects</li>
                  <li>Mark routes clearly</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4">
              <strong>Key standards:</strong> BS 7671 | BS EN 50174-2 | BS EN 50310 | BS EN 50346
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Firestop Rules
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/fibre-optics/module-4">
              Next Module: Fusion Splicing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule3Section6;
