import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Assembling and Joining Containment - Module 4.4.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master the use of couplers, saddles, and bushes for containment assembly. Learn proper joining techniques, electrical continuity, and BS 7671 compliance for safe installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a bush when fitted to conduit ends?",
    options: ["To join conduit sections", "To protect cables from sharp edges", "To support conduit runs"],
    correctIndex: 1,
    explanation: "Bushes are fitted to conduit ends to protect cables from sharp edges and prevent insulation damage, as required by BS 7671."
  },
  {
    id: 2,
    question: "Why must metallic conduit joints maintain electrical continuity?",
    options: ["For aesthetic purposes", "To act as protective conductor (CPC)", "To prevent thermal expansion"],
    correctIndex: 1,
    explanation: "Metallic containment may be used as a protective conductor (CPC), so electrical continuity must be maintained throughout the installation."
  },
  {
    id: 3,
    question: "What torque consideration applies when fitting saddles to PVC conduit?",
    options: ["Over-tightening can deform PVC", "Maximum torque for strength", "No torque limits apply"],
    correctIndex: 0,
    explanation: "Excessive torque on saddles can deform PVC conduit and create stress points. Follow manufacturer's torque specifications."
  }
];

const Module4Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the function of a coupler?",
      options: ["To support conduit", "To join two sections of containment", "To protect cables from sharp edges", "To align saddles"],
      correctAnswer: 1,
      explanation: "Couplers are specifically designed to join two sections of containment together, ensuring mechanical strength and continuity."
    },
    {
      id: 2,
      question: "True or False: Bushes are only required for steel conduit.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. BS 7671 requires protection at cable entry points regardless of conduit material - bushes are required for both steel and PVC conduit."
    },
    {
      id: 3,
      question: "Which accessory is used to secure conduit to a wall?",
      options: ["Coupler", "Bush", "Saddle", "Gland"],
      correctAnswer: 2,
      explanation: "Saddles are used to support and secure conduit or trunking to a surface such as a wall or ceiling."
    },
    {
      id: 4,
      question: "Why is deburring important before fitting a coupler?",
      options: ["For aesthetics only", "To prevent cable damage and ensure proper fit", "It's not necessary", "To reduce costs"],
      correctAnswer: 1,
      explanation: "Deburring removes sharp edges that could damage cables and ensures the coupler fits properly without interference."
    },
    {
      id: 5,
      question: "What should you do if two pieces of steel conduit don't make good electrical contact?",
      options: ["Ignore it", "Clean the surfaces or fit an earth strap", "Use PVC instead", "Add more saddles"],
      correctAnswer: 1,
      explanation: "Clean contact surfaces or use earth straps to maintain electrical continuity where paint or coatings interfere."
    },
    {
      id: 6,
      question: "Name one situation where corrosion-resistant saddles are necessary.",
      options: ["Indoor dry locations", "Outdoor or damp environments", "Computer rooms", "Domestic installations"],
      correctAnswer: 1,
      explanation: "Outdoor or damp environments require corrosion-resistant saddles to maintain structural integrity over time."
    },
    {
      id: 7,
      question: "What is the risk of missing bushes at cable entry points?",
      options: ["No risk", "Cable insulation damage leading to faults", "Reduced capacity", "Poor aesthetics"],
      correctAnswer: 1,
      explanation: "Without bushes, sharp edges can cut into cable insulation, causing short circuits and potentially dangerous faults."
    },
    {
      id: 8,
      question: "Why is alignment important when joining containment?",
      options: ["For cost reduction", "Prevents strain on cables and ensures compliance", "Reduces installation time", "Improves colour matching"],
      correctAnswer: 1,
      explanation: "Proper alignment prevents strain on cables and ensures a neat, compliant installation that meets BS 7671 requirements."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Assembling and Joining Containment
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the use of couplers, saddles, and bushes for safe containment assembly, maintaining mechanical strength and electrical continuity.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">In 30 Seconds</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Couplers, saddles, and bushes ensure safe containment assembly</li>
                  <li>• Correct joining maintains mechanical strength and electrical continuity</li>
                  <li>• Poor assembly leads to cable damage and failed inspections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Spot it / Use it</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• <strong>Spot:</strong> Cut containment ends, joining points, cable entry points</li>
                  <li>• <strong>Use:</strong> Manufacturer datasheets, torque specifications, continuity tester</li>
                  <li>• <strong>Check:</strong> Bush protection, proper alignment, electrical continuity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Identify different containment fittings (couplers, saddles, bushes) and their specific functions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Correctly select and install appropriate fittings for different containment types and materials</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Ensure joints maintain mechanical strength and electrical continuity as required by BS 7671</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Apply proper assembly sequence to prevent cable damage and ensure professional installation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Avoid common assembly mistakes that compromise safety and regulatory compliance</span>
              </li>
            </ul>
          </section>

          {/* Couplers */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Couplers and Basic Assembly Principles
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Couplers are essential for joining containment sections and must ensure both mechanical strength and electrical continuity.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Coupler Types and Applications</p>
                <p className="text-sm mb-2"><strong>Steel conduit couplers:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Compression type: 15-25Nm torque, no thread compound required</li>
                  <li>• Set screw type: M6 screws, 8-12Nm torque on conduit surface</li>
                  <li>• Running thread: full thread engagement, PTFE tape for sealing</li>
                  <li>• Quick-connect: push-fit with locking collar, 500N pull-out force</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>PVC conduit joining methods:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Solvent weld: 40mm overlap minimum, 24hr cure time</li>
                  <li>• Push-fit with seals: 20mm insertion depth, visual marking</li>
                  <li>• Expansion couplers: allow 5mm movement per 10°C change</li>
                  <li>• Flexible couplers: accommodate 15° angular movement</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Critical requirement:</strong> All couplers must maintain IP rating of containment system</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Assembly Sequence and Preparation</p>
                <p className="text-sm mb-2"><strong>Pre-assembly requirements:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Cut to precise length: ±2mm tolerance for professional fit</li>
                  <li>• Deburr all edges: remove burrs to 0.1mm radius maximum</li>
                  <li>• Clean surfaces: remove oil, paint chips, metal filings</li>
                  <li>• Inspect for damage: reject bent, cracked, or oversized sections</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Critical alignment procedures:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Use laser level for runs over 10m length</li>
                  <li>• Template jigs for multiple parallel runs</li>
                  <li>• Check alignment before final tightening</li>
                  <li>• Maximum 2mm deviation per metre allowed</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Professional tip:</strong> Mark conduit orientation before cutting to maintain consistent alignment</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Tray and Trunking Joining Systems</p>
                <p className="text-sm mb-2"><strong>Cable tray couplers:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Flange-to-flange: M8 bolts, 25Nm torque, spring washers</li>
                  <li>• Fishplate joiners: 50mm overlap, 4-bolt minimum fixing</li>
                  <li>• Sliding joiners: for thermal expansion, 20mm movement range</li>
                  <li>• Reducer couplers: gradual size change over 300mm minimum</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Trunking assembly methods:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Clip-together: audible click confirmation, 200N retention</li>
                  <li>• Screw-fix lids: M4 screws every 200mm centres</li>
                  <li>• Gasket seals: IP54 rating minimum for damp locations</li>
                  <li>• Earth continuity: &lt;0.1Ω resistance through joints</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Load consideration:</strong> Reduce coupler spacing by 25% for fully loaded tray systems</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="couplers-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Saddles */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Saddles and Support Systems
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Saddles provide critical support and must be correctly specified for load, material, and environmental conditions.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Saddle Types and Load Ratings</p>
                <p className="text-sm mb-2"><strong>Fixed saddles specifications:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Standard duty: 25kg load rating, M8 wall fixing minimum</li>
                  <li>• Heavy duty: 50kg load rating, M10 chemical anchor fixing</li>
                  <li>• Extra heavy: 100kg+ rating, through-bolt fixing required</li>
                  <li>• Spacer saddles: 10-50mm standoff, maintain ventilation gap</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Adjustable saddle features:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Size range: 20-32mm adjustable aperture typical</li>
                  <li>• Rubber liner: prevents galvanic corrosion on dissimilar metals</li>
                  <li>• Locking mechanism: prevents loosening under vibration</li>
                  <li>• Rotation capability: ±15° angular adjustment</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Safety factor:</strong> Select saddles rated at 150% of maximum anticipated load</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Material Compatibility and Environmental Factors</p>
                <p className="text-sm mb-2"><strong>PVC containment saddles:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Thermal expansion: 0.07mm/m/°C coefficient matching</li>
                  <li>• UV stabilised: minimum 10-year outdoor warranty</li>
                  <li>• Torque limits: 5-8Nm maximum to prevent deformation</li>
                  <li>• Insulation properties: maintain 500V test voltage rating</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Metal containment considerations:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Galvanised steel: minimum 85μm coating thickness</li>
                  <li>• Stainless steel: grade 316 for marine/chemical environments</li>
                  <li>• Earthing continuity: &lt;0.1Ω through saddle to mounting</li>
                  <li>• Bi-metallic protection: nylon washers prevent galvanic corrosion</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Environmental rating:</strong> IP65 minimum for outdoor saddle assemblies</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="saddles-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Bushes */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Bushes and Cable Protection
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Bushes are mandatory for cable protection and must be correctly specified for containment type and application.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Bush Types and BS 7671 Requirements</p>
                <p className="text-sm mb-2"><strong>Regulatory compliance:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• BS 7671 Section 522: protection required at all cable entry points</li>
                  <li>• Minimum bend radius: 4x cable diameter maintained</li>
                  <li>• Edge radius: &gt;2mm on all cable contact surfaces</li>
                  <li>• Material compatibility: no adverse chemical reaction with cable</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Bush material specifications:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• PVC bushes: for PVC conduit, UV stabilised, -20°C to +60°C rating</li>
                  <li>• Nylon bushes: high strength, -40°C to +85°C, chemical resistant</li>
                  <li>• Brass bushes: steel conduit, earthed installations, marine grade</li>
                  <li>• Rubber grommets: flexible entries, IP65 sealing capability</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Critical requirement:</strong> Bush must be fitted before cable installation to prevent damage</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Installation Techniques and Sizing</p>
                <p className="text-sm mb-2"><strong>Sizing criteria:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Bush bore: 25% larger than cable bundle diameter</li>
                  <li>• Entry taper: 45° minimum for easy cable insertion</li>
                  <li>• Retention method: snap-fit, threaded, or push-fit types</li>
                  <li>• Multiple cables: individual protection or oversized bush</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Special application requirements:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Fire barriers: intumescent bushes expand when heated</li>
                  <li>• Hazardous areas: certified Ex rating for explosive atmospheres</li>
                  <li>• Data cables: EMC screened bushes maintain integrity</li>
                  <li>• Wall penetrations: both sides protection mandatory</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Quality indicator:</strong> No visible cable indentation or stress points at bush interface</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bushes-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Electrical Continuity */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Electrical Continuity and Professional Assembly
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Maintaining electrical continuity and professional assembly standards ensures safety and regulatory compliance.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Electrical Continuity Testing and Maintenance</p>
                <p className="text-sm mb-2"><strong>Testing requirements (BS 7671):</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Continuity test: &lt;0.1Ω resistance between any two points</li>
                  <li>• Test current: minimum 200mA for accurate measurement</li>
                  <li>• Joint cleaning: wire brush to bright metal before assembly</li>
                  <li>• Contact grease: prevent oxidation on outdoor joints</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Earth strap installations:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• 4.0mm² minimum cross-sectional area for CPC duty</li>
                  <li>• Mechanical protection where damage risk exists</li>
                  <li>• Star washers: ensure positive electrical contact</li>
                  <li>• Identification: green/yellow sleeving required</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Paint removal:</strong> 25mm minimum area around electrical contact points</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Professional Assembly Standards and Common Errors</p>
                <p className="text-sm mb-2"><strong>Assembly sequence checklist:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Measure and cut accurately: ±2mm tolerance maximum</li>
                  <li>• Deburr and clean: file smooth, remove debris</li>
                  <li>• Test fit components: before final assembly</li>
                  <li>• Install bushes first: before cable pulling commences</li>
                  <li>• Align and secure: check straightness before tightening</li>
                  <li>• Test continuity: verify electrical path integrity</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>Critical errors to avoid:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Forcing damaged fittings: replace rather than compromise</li>
                  <li>• Mixed manufacturer components: compatibility not guaranteed</li>
                  <li>• Over-torquing plastic: follow manufacturer specifications</li>
                  <li>• Missing earth straps: where paint interrupts continuity</li>
                  <li>• Inadequate support: at changes of direction</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Professional standard:</strong> All joints should appear factory-made when complete</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
              <div className="text-white/80 space-y-4 text-sm">
                <p>
                  In a warehouse installation, PVC conduit was cut without deburring, and bushes were not fitted at cable entry points. Over time, the sharp edges cut into the cable insulation, causing a short circuit that resulted in:
                </p>
                <ul className="ml-4 space-y-1">
                  <li>• Complete shutdown of the automated conveyor system</li>
                  <li>• 8 hours of production downtime costing £25,000</li>
                  <li>• Emergency call-out charges for fault-finding</li>
                  <li>• Replacement of 40 metres of damaged multicore cable</li>
                  <li>• Full rewiring of the affected containment section</li>
                </ul>
                <div className="p-3 rounded bg-white/5 mt-4">
                  <p className="font-medium text-white mb-2">Lesson Learned</p>
                  <p>
                    The remedial work involved cutting out all affected sections, properly deburring all new cuts, and fitting appropriate bushes at every cable entry point. The installation now meets BS 7671 requirements and has operated fault-free for over three years. Total remedial cost exceeded £8,000 - far more than the original bush cost of £50.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm">
                Correct assembly of containment systems using appropriate couplers, saddles, and bushes ensures mechanical strength, electrical continuity, and cable protection. Following manufacturer specifications, maintaining proper torque settings, and ensuring electrical continuity where required creates safe, compliant installations that meet BS 7671 standards and provide long-term reliability.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Test your understanding of containment assembly and joining techniques"
          />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Spacing Rules
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                Next: Cable Pulling Techniques
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section4_3;
