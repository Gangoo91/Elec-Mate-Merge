import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fixing and Supporting Containment Systems - Module 4.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master fixing and supporting techniques for conduit, trunking, and cable trays. Learn proper spacing, load calculations, and BS 7671 compliance for secure installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it essential to follow manufacturer spacing guidelines for containment supports?",
    options: ["To save materials", "To prevent sagging and maintain load capacity", "To make installation faster"],
    correctIndex: 1,
    explanation: "Correct spacing prevents sagging, maintains structural integrity, and ensures the containment can safely carry its intended load without failure."
  },
  {
    id: 2,
    question: "What is the maximum recommended saddle spacing for horizontal PVC conduit?",
    options: ["2.5m", "1.2m", "3.0m"],
    correctIndex: 1,
    explanation: "PVC conduit requires closer spacing (1.2m max) due to its flexibility and thermal expansion properties compared to steel conduit."
  },
  {
    id: 3,
    question: "Which fixing type is most suitable for heavy loads in concrete ceilings?",
    options: ["Wall plugs", "Drop-in anchors", "Self-tapping screws"],
    correctIndex: 1,
    explanation: "Drop-in anchors provide the highest load capacity and most secure fixing for heavy containment systems in concrete substrates."
  }
];

const Module4Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical maximum saddle spacing for horizontal steel conduit?",
      options: ["1.2 m", "2.5 m", "3.0 m"],
      correctAnswer: 1,
      explanation: "Steel conduit can be supported at 2.5m intervals due to its structural strength and rigidity compared to PVC."
    },
    {
      id: 2,
      question: "Which fixing is most suitable for securing to concrete ceilings for heavy loads?",
      options: ["Wood screws", "Drop-in anchors", "Hollow wall anchors"],
      correctAnswer: 1,
      explanation: "Drop-in anchors provide the highest load capacity and most secure connection to concrete substrates."
    },
    {
      id: 3,
      question: "True or False: It's acceptable to drill into a surface without checking for hidden services if you're confident in the layout.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Always use detection equipment to check for hidden services - confidence in layout is not sufficient for safety."
    },
    {
      id: 4,
      question: "What type of fixing is best for damp environments?",
      options: ["Standard steel fixings", "Stainless steel or galvanised fixings", "Plastic fixings only"],
      correctAnswer: 1,
      explanation: "Stainless steel or galvanised fixings resist corrosion in damp conditions, ensuring long-term installation integrity."
    },
    {
      id: 5,
      question: "Why is PVC conduit spaced closer than steel conduit?",
      options: ["PVC is heavier", "PVC is more flexible and sags more easily", "PVC is cheaper"],
      correctAnswer: 1,
      explanation: "PVC's flexibility means it requires closer support spacing to prevent sagging and maintain proper cable protection."
    },
    {
      id: 6,
      question: "Name two common fixing mistakes.",
      options: ["Over-tightening and using wrong fixing type", "Under-tightening and correct spacing", "Proper marking and level installation"],
      correctAnswer: 0,
      explanation: "Over-tightening can deform containment, while wrong fixing types may not provide adequate support or fail under load."
    },
    {
      id: 7,
      question: "What extra consideration should be made when working near vibrating equipment?",
      options: ["Use standard fixings", "Use vibration-resistant fixings and locking nuts", "Increase spacing between supports"],
      correctAnswer: 1,
      explanation: "Vibration can loosen standard fixings over time, so vibration-resistant fixings and locking nuts prevent failure."
    },
    {
      id: 8,
      question: "Why should supports be added near bends and junctions?",
      options: ["To look more professional", "To provide extra strength and prevent sagging or movement", "To use more materials"],
      correctAnswer: 1,
      explanation: "Bends and junctions create stress concentration points requiring additional support to maintain structural integrity."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 4.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Fixing and Supporting Containment Systems
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the principles of secure fixing and supporting for conduit, trunking, and cable trays to ensure safe, compliant, and durable installations.
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
                  <li>• Proper fixing prevents sagging, vibration damage, and cable stress</li>
                  <li>• Correct spacing maintains structural integrity over time</li>
                  <li>• Right fixing selection ensures BS 7671 compliance and safety</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Spot it / Use it</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• <strong>Spot:</strong> Substrate type, load requirements, environmental conditions</li>
                  <li>• <strong>Use:</strong> Correct fixings, proper spacing, appropriate tools</li>
                  <li>• <strong>Check:</strong> Level installation, secure fixings, no sagging</li>
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
                <span>Identify correct fixings and supports for different containment systems and substrates</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Apply manufacturer guidelines and BS 7671 spacing requirements effectively</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Select appropriate fixing methods for various wall, ceiling, and floor materials</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Install containment systems that are secure, aligned, and load-compliant</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <span>Recognise and prevent common fixing faults and installation errors</span>
              </li>
            </ul>
          </section>

          {/* Fixing Selection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Fixing Selection and Substrate Assessment
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Correct fixing selection is critical for safe, secure, and long-lasting containment installations.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Masonry and Blockwork Fixings</p>
                <p className="text-sm mb-2"><strong>Primary choice:</strong> Wall plugs (brown for masonry, grey for dense block) with corrosion-resistant screws.</p>
                <p className="text-sm mb-2"><strong>Load capacity:</strong> 8mm plugs = 25kg, 10mm plugs = 40kg, 12mm plugs = 60kg per fixing point.</p>
                <p className="text-sm mb-2"><strong>Installation process:</strong></p>
                <ol className="text-sm ml-4 mb-2 list-decimal space-y-1">
                  <li>Drill hole to exact plug diameter using masonry bit</li>
                  <li>Clear debris with blow-out pump or vacuum</li>
                  <li>Insert plug fully flush with surface</li>
                  <li>Drive screw leaving 5-8mm for bracket engagement</li>
                </ol>
                <p className="text-xs text-white/60 mt-2"><strong>Critical tip:</strong> Always use hammer drill setting for consistent hole quality in masonry</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Concrete and Heavy-Duty Applications</p>
                <p className="text-sm mb-2"><strong>Drop-in anchors:</strong> M8 = 500kg, M10 = 800kg, M12 = 1200kg safe working load.</p>
                <p className="text-sm mb-2"><strong>Chemical anchors:</strong> For highest loads and critical applications (up to 2000kg per point).</p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Minimum concrete strength: C20/25 for standard anchors</li>
                  <li>• Edge distance: minimum 5 × anchor diameter</li>
                  <li>• Spacing: minimum 10 × anchor diameter between fixings</li>
                  <li>• Embedment depth: 8-12 × anchor diameter depending on load</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Safety factor:</strong> Always apply 4:1 safety factor to manufacturer's ultimate load rating</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Hollow Walls and Special Substrates</p>
                <p className="text-sm mb-2"><strong>Plasterboard:</strong> Spring toggles (25kg), metal cavity fixings (15kg), or find studs for screw fixing (40kg+).</p>
                <p className="text-sm mb-2"><strong>Steel framework:</strong> Self-drilling screws with EPDM washers, M6-M8 for light loads, M10-M12 for heavy.</p>
                <p className="text-sm"><strong>Timber substrates:</strong> Coach screws minimum 50mm penetration, pilot holes at 80% thread diameter.</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Environmental and Corrosion Considerations</p>
                <p className="text-sm mb-2"><strong>Damp locations:</strong> Marine-grade stainless steel (316L) or hot-dip galvanised to BS EN ISO 1461.</p>
                <p className="text-sm mb-2"><strong>External installations:</strong> A4 stainless steel minimum, with appropriate gaskets and sealing.</p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Standard internal: Zinc-plated steel (12μm minimum coating)</li>
                  <li>• Damp internal: A2 stainless steel or 42μm galvanising</li>
                  <li>• External/aggressive: A4 stainless steel or marine coating systems</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Cost vs benefit:</strong> Premium fixings cost 20% more but prevent 90% of corrosion failures</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fixing-selection-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Support Systems */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Support Systems and Spacing Requirements
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Proper support design and spacing is crucial for maintaining containment integrity and preventing failures.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Conduit Support Specifications</p>
                <p className="text-sm mb-2"><strong>Steel conduit spacing:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Horizontal runs: 2.5m maximum, 2.0m preferred for professional appearance</li>
                  <li>• Vertical runs: 3.0m maximum with clips at each floor level</li>
                  <li>• Additional supports: 300mm from bends, 150mm from junction boxes</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>PVC conduit spacing (more flexible):</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Horizontal: 1.2m maximum (1.0m in hot environments &gt;30°C)</li>
                  <li>• Vertical: 1.5m maximum with expansion couplings every 6m</li>
                  <li>• Temperature compensation: reduce spacing by 20% for each 10°C above 20°C</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Thermal expansion:</strong> PVC expands 0.6mm per metre per 10°C temperature rise</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Cable Tray and Basket Systems</p>
                <p className="text-sm mb-2"><strong>Standard spacing guidelines:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Light duty (&lt;25kg/m): 2.0m spacing maximum</li>
                  <li>• Medium duty (25-50kg/m): 1.5m spacing standard</li>
                  <li>• Heavy duty (&gt;50kg/m): 1.0m spacing or engineered supports</li>
                  <li>• Perforated tray: 10% closer spacing than solid tray</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Deflection limit:</strong> Maximum sag = span length ÷ 200 for professional installations</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Trunking Support Requirements</p>
                <p className="text-sm mb-2"><strong>Metal trunking:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Standard sections: 1.5m spacing for sizes up to 100×50mm</li>
                  <li>• Large sections (&gt;150mm): 1.2m spacing or engineer design</li>
                  <li>• Vertical runs: support at each floor level plus intermediate supports</li>
                </ul>
                <p className="text-sm mt-2 mb-2"><strong>PVC trunking:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• All sizes: 1.0m maximum spacing due to flexibility</li>
                  <li>• High-temperature areas: 0.8m spacing (&gt;25°C ambient)</li>
                  <li>• Use expansion couplings for runs &gt;10m in length</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="spacing-requirements-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Installation Techniques */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Installation Techniques and Quality Control
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Professional installation techniques ensure accuracy, safety, and long-term reliability.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Pre-Installation Planning and Marking</p>
                <p className="text-sm mb-2"><strong>Service detection protocol:</strong></p>
                <ol className="text-sm ml-4 list-decimal space-y-1">
                  <li>Use CAT scanner for electrical services (power off if possible)</li>
                  <li>Check for water pipes with acoustic detector</li>
                  <li>Scan for gas pipes with specialist detector</li>
                  <li>Mark all detected services before drilling</li>
                  <li>Cross-reference with building services drawings if available</li>
                </ol>
                <p className="text-sm mt-2 mb-2"><strong>Accurate marking techniques:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Use laser level for runs &gt;5m to maintain alignment</li>
                  <li>• Chalk line for shorter runs and marking multiple points</li>
                  <li>• Centre punch all drilling points to prevent bit wander</li>
                  <li>• Use paper template for repetitive bracket patterns</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Professional standard:</strong> ±3mm tolerance over 10m run length for visual acceptability</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Drilling and Fixing Installation Process</p>
                <p className="text-sm mb-2"><strong>Drilling best practices:</strong></p>
                <ol className="text-sm ml-4 list-decimal space-y-1">
                  <li>Start with slow speed to establish hole position</li>
                  <li>Increase to full speed once hole is established</li>
                  <li>Withdraw drill periodically to clear debris</li>
                  <li>Use blow-out pump or vacuum to clean hole completely</li>
                  <li>Check hole depth with depth gauge or marked drill bit</li>
                </ol>
                <p className="text-sm mt-2 mb-2"><strong>Quality installation checks:</strong></p>
                <ul className="text-sm ml-4 space-y-1">
                  <li>• Fixing flush with substrate surface (not sunken or proud)</li>
                  <li>• Correct torque applied - tight but not over-tightened</li>
                  <li>• No damage to containment during installation</li>
                  <li>• Bracket level and plumb checked with spirit level</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Torque guide:</strong> M8 fixings = 15Nm, M10 = 25Nm, M12 = 40Nm (adjust for substrate)</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="installation-techniques-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Common Faults */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Common Faults and Prevention Strategies
            </h2>
            <div className="text-white/80 space-y-6">
              <p>
                Understanding and preventing common fixing faults saves time, materials, and ensures installation integrity.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Over-Tightening and Deformation Issues</p>
                <ul className="text-sm space-y-1">
                  <li>• Crushed PVC conduit from excessive clamp pressure</li>
                  <li>• Distorted metal trunking from over-tight bracket screws</li>
                  <li>• Stress cracking around mounting holes</li>
                  <li>• Reduced internal space affecting cable capacity</li>
                </ul>
                <p className="text-xs text-white/60 mt-2"><strong>Rule of thumb:</strong> "Snug plus 1/4 turn" for plastic substrates, "firm resistance" for metal</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Inappropriate Fixing Selection</p>
                <ul className="text-sm space-y-1">
                  <li>• Wall plugs in hollow blocks - inadequate grip, eventual failure</li>
                  <li>• Standard screws in damp areas - corrosion and joint failure</li>
                  <li>• Under-rated fixings for load - gradual loosening and sagging</li>
                  <li>• Wrong drill bit size - loose fit or plug damage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Spacing and Alignment Errors</p>
                <ul className="text-sm space-y-1">
                  <li>• Visible sagging between support points</li>
                  <li>• Excessive stress on fixings leading to premature failure</li>
                  <li>• Difficulty in cable installation due to containment deformation</li>
                  <li>• Non-compliance with BS 7671 and manufacturer specifications</li>
                </ul>
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
                  During an industrial installation, a contractor installed cable tray supports every 3 metres instead of the specified 1.5 metres to save on materials and installation time. The tray was initially acceptable when empty, but once loaded with the full complement of power and control cables (approximately 45kg per metre), significant sagging occurred.
                </p>
                <p>
                  The sagging caused cables to compress against each other, damaging insulation and creating potential fire risks. During the electrical inspection, the installation failed due to visible deformation and non-compliance with manufacturer specifications.
                </p>
                <p>
                  The rework cost included 3 days additional labour, new support materials, and project delay penalties. The total additional cost was over £8,000 - far exceeding the original £300 saving from reducing support points.
                </p>
                <div className="p-3 rounded bg-white/5 mt-4">
                  <p className="font-medium text-white mb-2">Lesson Learned</p>
                  <ul className="space-y-1">
                    <li>• Always follow manufacturer spacing guidelines - they account for full load conditions</li>
                    <li>• Factor in the complete cable load during support design, not just tray weight</li>
                    <li>• False economy on supports often results in much higher remedial costs</li>
                  </ul>
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
              <div className="text-white/80 space-y-3 text-sm">
                <p>
                  Proper fixing and supporting of containment systems is fundamental to electrical installation safety, compliance, and longevity. The correct selection of fixings based on substrate type, load requirements, and environmental conditions ensures reliable performance throughout the installation's life.
                </p>
                <p>
                  Adherence to manufacturer spacing guidelines and BS 7671 requirements prevents sagging, stress concentration, and premature failure. Quality installation techniques, including proper marking, drilling, and torque application, deliver professional results that meet inspection requirements and client expectations.
                </p>
                <p>
                  Understanding common faults and prevention strategies enables proactive quality control, reducing costly remedial work and ensuring first-time compliance with electrical standards and building regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 4
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                Next: Spacing Rules
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section4_1;
