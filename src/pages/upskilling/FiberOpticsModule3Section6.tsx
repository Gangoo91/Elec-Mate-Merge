import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Shield, AlertTriangle, Layers, Cable, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing and Segregation - Fiber Optics Technology";
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
    explanation: "While fibres don't suffer electrical interference, cables can be damaged by heat from power cables and need protection from accidental damage during power cable maintenance."
  }
];

const quizQuestions = [
  {
    question: "Which component of an armoured fibre cable requires earthing?",
    options: [
      "The optical fibre",
      "The outer jacket",
      "The steel wire armour",
      "The buffer tubes"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of earthing metallic cable elements?",
    options: [
      "Improve signal quality",
      "Safety - prevent shock hazard",
      "Reduce attenuation",
      "Increase bandwidth"
    ],
    correctAnswer: 1
  },
  {
    question: "According to BS EN 50174-2, what is the minimum separation for fibre from LV cables in steel trunking?",
    options: [
      "No separation with steel barrier",
      "50mm minimum",
      "150mm minimum",
      "Complete segregation required"
    ],
    correctAnswer: 0
  },
  {
    question: "What standard covers EMC requirements for data cable installations?",
    options: [
      "BS 7671",
      "BS EN 50174-2",
      "BS 476",
      "BS 8519"
    ],
    correctAnswer: 1
  },
  {
    question: "How should SWA fibre cables be earthed at each end?",
    options: [
      "Through cable glands to earth terminal",
      "No earthing required",
      "Tape connection to armour",
      "Connect to cable tray only"
    ],
    correctAnswer: 0
  },
  {
    question: "What is a key benefit of fibre regarding EMC?",
    options: [
      "Requires shielding",
      "Immune to electromagnetic interference",
      "Generates less EMI",
      "Needs filtered connectors"
    ],
    correctAnswer: 1
  },
  {
    question: "When running fibre alongside 11kV power cables, what is required?",
    options: [
      "No special requirements",
      "Physical separation and possibly metallic conduit",
      "Fibre cannot be installed near HV",
      "Just use armoured fibre"
    ],
    correctAnswer: 1
  },
  {
    question: "What happens if metallic strength members are left unearthed?",
    options: [
      "Signal degradation",
      "Potential shock hazard from induced voltages",
      "No practical effect",
      "Increased attenuation"
    ],
    correctAnswer: 1
  },
  {
    question: "In telecommunications equipment rooms, what earthing system is typically used?",
    options: [
      "TN-S only",
      "Mesh-bonded earth network (MBEN)",
      "TT earthing",
      "No earthing required"
    ],
    correctAnswer: 1
  },
  {
    question: "What documentation should record fibre cable earthing?",
    options: [
      "Optical test results only",
      "Electrical installation certificate/as-built drawings",
      "No documentation needed",
      "Manufacturer warranty only"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Why earth fibre cables if they don't carry electricity?",
    answer: "While the optical fibres themselves are non-conductive, many fibre cables contain metallic elements for strength or armour protection. These can pick up induced voltages from nearby power sources, lightning, or fault conditions. Earthing these elements prevents potential shock hazards and ensures safety compliance."
  },
  {
    question: "Can fibre and power cables share the same tray?",
    answer: "Yes, under certain conditions. BS EN 50174-2 allows shared containment with appropriate barriers or separation. Steel trunking provides inherent segregation. The key factors are voltage level, barrier type, and whether the power cables operate at temperatures that could affect fibre cable ratings."
  },
  {
    question: "Do all-dielectric fibre cables need any earthing?",
    answer: "All-dielectric cables have no metallic components and don't require electrical earthing. However, if they're installed with metallic cable tray or conduit, those containment systems still need earthing per BS 7671. All-dielectric cables are often preferred near sensitive equipment or in high-voltage environments."
  },
  {
    question: "What about fibre in lightning-prone areas?",
    answer: "All-dielectric cables offer protection from lightning as they won't conduct current. Cables with metallic elements need proper earthing at building entry points. For critical installations, consider surge protection on any copper elements and earth metallic cable armour to lightning protection systems."
  },
  {
    question: "How does segregation differ for indoor vs outdoor cables?",
    answer: "Indoor cables typically run in structured cabling environments with specific containment rules. Outdoor cables may parallel power lines and require greater separation distances or physical protection. Underground installations often specify minimum burial depths and separation from other services."
  },
  {
    question: "What's the relationship between BS 7671 and BS EN 50174?",
    answer: "BS 7671 covers electrical safety including earthing requirements for any metallic cable elements. BS EN 50174 provides specific guidance for data and communications cabling including fibre, covering installation practices, segregation, and EMC. Both should be followed, with BS 7671 taking precedence for electrical safety matters."
  }
];

const FiberOpticsModule3Section6 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module3"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 3</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 6 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Shield className="w-4 h-4" />
            Module 3 · Section 6
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Earthing and Segregation
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Fibre optic cables with metallic components (armour, strength members) require proper
            earthing for safety. Segregation from power cables protects against heat damage and
            provides safe access for maintenance. All-dielectric cables offer benefits where
            electrical isolation is critical. Follow BS 7671 for earthing and BS EN 50174 for
            cable separation requirements.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-5 border border-emerald-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">Spot it</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Earth bonding clamps on armour</li>
                <li>• Segregated cable trays (coloured)</li>
                <li>• Separation barriers in trunking</li>
                <li>• Earth terminal connections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">Use it</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Earth SWA at both ends</li>
                <li>• Maintain separation distances</li>
                <li>• Use physical barriers when required</li>
                <li>• Document earthing connections</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Earthing requirements for metallic elements",
              "Segregation from power cables",
              "EMC and interference considerations",
              "All-dielectric cable applications",
              "Compliance with BS 7671 and BS EN 50174",
              "Documentation and testing"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Earthing Requirements */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Earthing Requirements</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              While optical fibres are non-conductive and don't require earthing, many fibre cables
              contain metallic elements that must be properly earthed for electrical safety.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Cable className="w-4 h-4 text-green-400" />
                Metallic Elements in Fibre Cables
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Steel Wire Armour (SWA):</strong> Galvanised steel wires for mechanical protection - must be earthed at both ends</li>
                <li><strong>Aluminium tape:</strong> Moisture barrier in some designs - earth if accessible</li>
                <li><strong>Steel strength members:</strong> Central or peripheral strength elements - require earthing</li>
                <li><strong>Metallic armouring:</strong> Corrugated steel or aluminium - continuous earthing path needed</li>
                <li><strong>Copper conductors:</strong> Hybrid cables with copper pairs - standard electrical earthing</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Key Principle</h4>
              <p className="text-sm">
                Any metallic element in or on a cable can pick up induced voltages from nearby power
                sources, lightning, or fault conditions. Proper earthing provides a safe path for these
                currents and prevents potential shock hazards. This applies regardless of whether the
                cable carries optical or electrical signals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">Armoured Cable Earthing</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Earth at both ends via cable glands</li>
                  <li>• Use appropriate SWA glands</li>
                  <li>• Continuous earth path through armour</li>
                  <li>• Connect to main earth terminal</li>
                  <li>• Maximum 1Ω end-to-end resistance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-emerald-400 mb-2">Strength Member Earthing</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Identify steel or metallic members</li>
                  <li>• Earth at termination points</li>
                  <li>• Use manufacturer's hardware</li>
                  <li>• Verify continuity after installation</li>
                  <li>• Document connections</li>
                </ul>
              </div>
            </div>

            <p>
              Where cables enter buildings, earthing provides protection against external voltage
              rise. For lightning-prone areas, ensure metallic elements connect to the building's
              lightning protection system earth network where present.
            </p>
          </div>
        </section>

        {/* Section 2: Segregation from Power Cables */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Segregation from Power Cables</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Although fibre optics are immune to electromagnetic interference, proper segregation
              from power cables is still required for safety, thermal, and maintenance reasons.
            </p>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Why Segregate Fibre from Power?
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Heat damage:</strong> Power cables generate heat that can exceed fibre jacket ratings</li>
                <li>• <strong>Safe access:</strong> Maintenance on power systems without disturbing data cables</li>
                <li>• <strong>Fault conditions:</strong> Power faults can damage adjacent cables</li>
                <li>• <strong>Future flexibility:</strong> Independent routing for changes</li>
                <li>• <strong>Regulatory compliance:</strong> BS EN 50174 and client specifications</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                BS EN 50174-2 Separation Requirements
              </h4>
              <p className="text-sm mb-3 text-white/70">
                Minimum separation distances between IT cables (including fibre) and power cables:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Containment Type</th>
                      <th className="pb-2 text-white/80">&lt;20kVA</th>
                      <th className="pb-2 text-white/80">20-100kVA</th>
                      <th className="pb-2 text-white/80">&gt;100kVA</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Unscreened in plastic</td>
                      <td>200mm</td>
                      <td>300mm</td>
                      <td>600mm</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Unscreened, metal with barrier</td>
                      <td>50mm</td>
                      <td>100mm</td>
                      <td>200mm</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Screened or steel trunking</td>
                      <td>0mm*</td>
                      <td>50mm</td>
                      <td>100mm</td>
                    </tr>
                    <tr>
                      <td className="py-2">Separate steel trunking</td>
                      <td>0mm</td>
                      <td>0mm</td>
                      <td>0mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/50 mt-2">* Still requires physical barrier</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Practical Segregation Methods</h4>
              <ul className="text-sm space-y-2 text-white/70">
                <li>• <strong>Separate containment:</strong> Dedicated fibre tray/trunking (often yellow or orange)</li>
                <li>• <strong>Physical barriers:</strong> Steel dividers in shared trunking</li>
                <li>• <strong>Vertical separation:</strong> Different tray levels</li>
                <li>• <strong>Horizontal separation:</strong> Opposite walls of corridor</li>
                <li>• <strong>Separate routes:</strong> Completely independent pathways</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: EMC and Interference */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">EMC and Interference Considerations</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Electromagnetic Compatibility (EMC) is a significant advantage of fibre optics.
              Unlike copper cables, fibres are completely immune to electromagnetic interference,
              making them ideal for many challenging environments.
            </p>

            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">Fibre EMC Advantages</h4>
              <ul className="text-sm space-y-2 text-white/80">
                <li>• <strong>No EMI susceptibility:</strong> Light signals unaffected by electromagnetic fields</li>
                <li>• <strong>No EMI emission:</strong> Fibre doesn't radiate interference to affect other systems</li>
                <li>• <strong>Ground loop immunity:</strong> No electrical connection between ends</li>
                <li>• <strong>Lightning protection:</strong> All-dielectric cables cannot conduct surge currents</li>
                <li>• <strong>No crosstalk:</strong> No electrical coupling between fibres</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Ideal Applications for EMC Immunity</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Industrial environments with motors/drives</li>
                  <li>• Near high-power transmitters</li>
                  <li>• Healthcare MRI suites</li>
                  <li>• Power generation facilities</li>
                </ul>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Railway and transport systems</li>
                  <li>• Military and secure facilities</li>
                  <li>• Laboratory environments</li>
                  <li>• Broadcast facilities</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Active Equipment Considerations</h4>
              <p className="text-sm text-white/80">
                While the fibre itself is EMI-immune, the electronic equipment at each end
                (transceivers, switches, patch panels) requires normal EMC precautions. Proper
                earthing of equipment enclosures, screened cabinets, and filtered power supplies
                may still be needed. The fibre link provides galvanic isolation between these
                locations.
              </p>
            </div>

            <p>
              In environments with extreme EMI (near arc welders, VFDs, or radio transmitters),
              fibre optics may be the only viable transmission medium. The additional cost of
              optical equipment is often justified by the reliability and immunity to interference.
            </p>
          </div>
        </section>

        {/* Section 4: All-Dielectric Cables */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">All-Dielectric Cable Applications</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              All-dielectric fibre cables contain no metallic elements whatsoever, providing
              complete electrical isolation. They're often specified where metallic cables
              would create safety or operational issues.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">All-Dielectric Cable Types</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>ADSS (All-Dielectric Self-Supporting):</strong> Overhead cables without messenger wire, using aramid or FRP strength members</li>
                <li><strong>LSZH indoor cables:</strong> Standard indoor cables using glass-reinforced plastic (GRP) or aramid strength</li>
                <li><strong>GYFTY outdoor:</strong> Non-metallic loose tube outdoor cables</li>
                <li><strong>Micro-duct cables:</strong> Blown fibre with dielectric construction</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• No earthing required</li>
                  <li>• Lightning-safe</li>
                  <li>• No induced voltages</li>
                  <li>• Complete galvanic isolation</li>
                  <li>• Can cross voltage boundaries</li>
                  <li>• Ideal near HV equipment</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">Considerations</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Less mechanical protection</li>
                  <li>• More vulnerable to rodents</li>
                  <li>• May need additional protection</li>
                  <li>• Higher cost for equivalent strength</li>
                  <li>• Limited burial depth ratings</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Key Applications</h4>
              <ul className="text-sm space-y-2 text-white/70">
                <li>• <strong>High voltage substations:</strong> Data links between control systems across voltage zones</li>
                <li>• <strong>Aviation:</strong> Near navigation aids and radar systems</li>
                <li>• <strong>Power line crossings:</strong> ADSS cables spanning HV transmission lines</li>
                <li>• <strong>Explosive atmospheres:</strong> ATEX zones where sparks must be prevented</li>
                <li>• <strong>Medical imaging:</strong> MRI and CT scanner environments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Compliance with Standards */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Compliance with Standards</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre optic installations must comply with multiple standards covering electrical
              safety, cabling installation, and EMC. Understanding which standards apply ensures
              compliant installations.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-400" />
                Key Standards
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>BS 7671 (IET Wiring Regulations):</strong> Electrical safety including earthing of metallic cable elements, containment earthing, and segregation from power</li>
                <li><strong>BS EN 50174-1:</strong> Installation specification and quality assurance</li>
                <li><strong>BS EN 50174-2:</strong> Installation planning including EMC, segregation, and containment requirements</li>
                <li><strong>BS EN 50174-3:</strong> Outdoor installations and building entry</li>
                <li><strong>BS EN 50346:</strong> Testing of installed cabling</li>
                <li><strong>BS EN 50310:</strong> Telecommunications bonding and earthing</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                BS 7671 Key Requirements
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Chapter 41:</strong> Protection against electric shock - earthing requirements</li>
                <li>• <strong>Chapter 52:</strong> Selection and erection of cables - including segregation</li>
                <li>• <strong>Section 528:</strong> Proximity to other services</li>
                <li>• <strong>Appendix 4:</strong> Current ratings considering thermal effects</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Telecommunications Earthing</h4>
              <p className="text-sm text-white/70 mb-2">
                BS EN 50310 and BS EN 50174-2 provide specific guidance for telecommunications
                installations:
              </p>
              <ul className="text-sm space-y-1 text-white/70">
                <li>• Mesh-Bonded Earthing Network (MBEN) for equipment rooms</li>
                <li>• Telecommunications Main Earth (TME) connection point</li>
                <li>• Equipment cabinet earthing requirements</li>
                <li>• Patch panel and rack bonding</li>
              </ul>
            </div>

            <p>
              For client-specific installations, always check contract specifications. Many
              organisations have internal standards that exceed regulatory minimums, particularly
              for financial, healthcare, and government sectors.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation and Testing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Documentation and Testing</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper documentation of earthing arrangements and segregation compliance is
              essential for handover, maintenance, and regulatory compliance.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Documentation Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>As-built drawings:</strong> Show cable routes, containment types, and separation distances</li>
                <li><strong>Earthing schedules:</strong> List all earth connections for metallic elements</li>
                <li><strong>Electrical installation certificate:</strong> If metallic elements required earthing verification</li>
                <li><strong>Test results:</strong> Earth continuity measurements</li>
                <li><strong>Photographs:</strong> Key installation details including earthing connections</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Earth Continuity Testing</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Test armour to earth terminal</li>
                  <li>• Maximum 1Ω end-to-end</li>
                  <li>• Use low-resistance ohmmeter</li>
                  <li>• Test at both ends</li>
                  <li>• Record in test documentation</li>
                </ul>
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                <h4 className="font-semibold text-emerald-400 mb-2">Inspection Points</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Cable gland properly tightened</li>
                  <li>• Armour connection secure</li>
                  <li>• Earth conductor sized correctly</li>
                  <li>• Containment bonding complete</li>
                  <li>• Labels in place</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Handover Documentation</h4>
              <p className="text-sm text-white/80">
                Include earthing and segregation information in the O&M manual:
              </p>
              <ul className="text-sm text-white/70 mt-2 space-y-1">
                <li>• Earthing arrangement schematic</li>
                <li>• Test certificates and results</li>
                <li>• Maintenance requirements</li>
                <li>• Manufacturer data for glands and hardware</li>
                <li>• As-built containment layouts showing segregation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Installation Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Identify metallic elements early:</strong> Check cable datasheets for construction details before installation</li>
                <li>• <strong>Select appropriate glands:</strong> Match gland type to cable construction (SWA vs non-armoured)</li>
                <li>• <strong>Plan containment:</strong> Determine segregation requirements during design phase</li>
                <li>• <strong>Use colour coding:</strong> Yellow/orange trays or labels for fibre routes</li>
                <li>• <strong>Test before handover:</strong> Verify earth continuity on all metallic elements</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Forgetting armour earthing:</strong> Assuming fibre cables don't need electrical work</li>
                <li>• <strong>Wrong gland type:</strong> Using non-metallic glands where earthing is needed</li>
                <li>• <strong>Insufficient separation:</strong> Running fibre too close to power in shared containment</li>
                <li>• <strong>Missing documentation:</strong> No records of earthing connections or test results</li>
                <li>• <strong>Ignoring heat:</strong> Not considering thermal effects from adjacent power cables</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
              <h4 className="font-semibold text-yellow-400 mb-2">High Voltage Environments</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Consider all-dielectric:</strong> Eliminates induced voltage concerns</li>
                <li>• <strong>Increase separation:</strong> Greater distances from HV cables</li>
                <li>• <strong>Metallic protection:</strong> Steel conduit may provide additional shielding</li>
                <li>• <strong>Specialist advice:</strong> Consult HV specialists for substation installations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-sm font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Quick Reference: Earthing & Segregation
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-300 mb-2">Earthing Checklist</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Identify all metallic elements</li>
                  <li>☐ Select appropriate cable glands</li>
                  <li>☐ Earth armour at both ends</li>
                  <li>☐ Test continuity (&lt;1Ω)</li>
                  <li>☐ Document all connections</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-2">Segregation Rules</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Check voltage and power levels</li>
                  <li>☐ Apply BS EN 50174 distances</li>
                  <li>☐ Use barriers where required</li>
                  <li>☐ Consider thermal effects</li>
                  <li>☐ Mark routes clearly</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Key standards: BS 7671 · BS EN 50174-2 · BS EN 50310 · BS EN 50346
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module3/section5"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Firestop and Penetration Rules
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next Module: Fusion Splicing
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section6;
