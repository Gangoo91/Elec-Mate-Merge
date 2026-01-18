import { ArrowLeft, ArrowRight, Package, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Estimating Materials from Drawings or Site Walkthroughs - Module 5.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to accurately estimate materials for electrical installations using technical drawings and site walkthroughs. Master material estimation best practices.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it important to allow for 5–10% wastage when estimating?",
    options: [
      "To make more profit",
      "To account for cutting waste and unexpected needs",
      "To impress clients",
      "It's not necessary"
    ],
    correctIndex: 1,
    explanation: "Wastage allowances account for cutting waste, terminations, and unexpected site requirements that weren't visible on drawings."
  },
  {
    id: 2,
    question: "Name one tool used to measure distances accurately from drawings.",
    options: [
      "Ruler",
      "Scale rule",
      "Calculator",
      "Computer"
    ],
    correctIndex: 1,
    explanation: "A scale rule is specifically designed to measure scaled distances on technical drawings accurately."
  },
  {
    id: 3,
    question: "What is the benefit of a site walkthrough compared to drawings alone?",
    options: [
      "It's faster",
      "It's cheaper",
      "Confirms actual site conditions and identifies obstacles",
      "It's not beneficial"
    ],
    correctIndex: 2,
    explanation: "Site walkthroughs reveal physical conditions, obstacles, and additional requirements not shown on drawings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main risk of under-estimating materials?",
    options: [
      "Higher profits",
      "Delays and project stoppages",
      "Better quality work",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Under-estimating leads to material shortages, causing work stoppages and project delays."
  },
  {
    id: 2,
    question: "True or False: Drawings alone always give enough information for accurate estimating.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "Drawings don't show all site conditions, obstacles, or practical installation challenges."
  },
  {
    id: 3,
    question: "What percentage should typically be added for wastage?",
    options: [
      "1–2%",
      "5–10%",
      "15–20%",
      "25–30%"
    ],
    correctAnswer: 1,
    explanation: "5–10% wastage allowance covers cutting waste, terminations, and minor unforeseen requirements."
  },
  {
    id: 4,
    question: "Which tool is used to measure scaled distances on drawings?",
    options: [
      "Tape measure",
      "Scale rule",
      "Calculator",
      "Spirit level"
    ],
    correctAnswer: 1,
    explanation: "A scale rule is designed specifically for measuring scaled distances on technical drawings."
  },
  {
    id: 5,
    question: "Why is it important to check site conditions during estimation?",
    options: [
      "To meet clients",
      "To identify obstacles and additional material needs",
      "To take photos",
      "To check weather"
    ],
    correctAnswer: 1,
    explanation: "Site conditions reveal obstacles, existing services, and additional requirements not shown on drawings."
  },
  {
    id: 6,
    question: "Name one common error in estimating cable lengths.",
    options: [
      "Using the wrong cable type",
      "Forgetting vertical drops or rises",
      "Ordering too much",
      "Using wrong colours"
    ],
    correctAnswer: 1,
    explanation: "Vertical drops, rises, and routing around obstacles are commonly forgotten when measuring from plan views."
  },
  {
    id: 7,
    question: "What should you always include besides cables and containment?",
    options: [
      "Tools",
      "Fixings, clips, grommets, and small consumables",
      "Spare parts",
      "Test equipment"
    ],
    correctAnswer: 1,
    explanation: "Small items like fixings, clips, and grommets are essential but easily forgotten in estimates."
  },
  {
    id: 8,
    question: "Who should verify the materials estimate for accuracy?",
    options: [
      "The client",
      "Team members or supervisors",
      "The supplier",
      "Nobody"
    ],
    correctAnswer: 1,
    explanation: "Peer review by team members or supervisors helps catch errors and improve accuracy."
  },
  {
    id: 9,
    question: "What is a benefit of using digital estimating software?",
    options: [
      "It's free",
      "Faster calculations and fewer manual errors",
      "It works offline",
      "It's easier to learn"
    ],
    correctAnswer: 1,
    explanation: "Digital software speeds up calculations and reduces manual measuring errors, though site verification is still needed."
  },
  {
    id: 10,
    question: "Give one example of a consequence of poor estimating.",
    options: [
      "Better quality work",
      "Cost overruns, wasted materials, or delayed project completion",
      "Improved efficiency",
      "Higher customer satisfaction"
    ],
    correctAnswer: 1,
    explanation: "Poor estimating leads to shortages, excess materials, cost overruns, and project delays."
  }
];

const practicalGuidance = [
  "Thoroughly review all electrical drawings including layout plans, sections, elevations, and electrical schedules. Highlight key circuits, containment runs, accessories, and any special requirements.",
  "Conduct a comprehensive site walkthrough with drawings in hand. Take measurements, photographs, and detailed notes of actual conditions, obstacles, and access routes.",
  "Calculate material needs systematically using appropriate tools (scale rules for drawings, tape measures/laser measures on site). Break down estimates by circuit and installation area.",
  "Apply realistic allowances for wastage (5-10%) and unforeseen site issues. Consider project complexity, installation method, and site access when determining allowances.",
  "Create detailed, organised materials lists categorised by type (cables, containment, accessories, fixings). Include part numbers, specifications, and delivery requirements.",
  "Cross-check estimates with experienced team members or supervisors. Use peer review to catch potential errors and improve accuracy.",
  "Factor in delivery lead times and potential material availability issues when finalising order quantities and timing."
];

const pocketGuideItems = [
  "Review all electrical drawings thoroughly - plans, sections, schedules.",
  "Conduct site walkthrough with drawings - confirm actual conditions.",
  "Use appropriate measurement tools - scale rules, tape measures, laser measures.",
  "Add realistic wastage allowances - typically 5-10% depending on complexity.",
  "Include all consumables - fixings, clips, grommets, cable ties, markers.",
  "Document special requirements - fire barriers, specialist fixings, access issues.",
  "Cross-check estimates with experienced colleagues before finalising.",
  "Consider delivery times and material availability in planning.",
  "Keep detailed records for future reference and continuous improvement."
];

const Module5Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Should I always do both a drawing estimate and a site walkthrough?",
      answer: "Absolutely yes. Drawings provide scale, layout, and specified requirements, while site walkthroughs reveal actual physical conditions, obstacles, and practical installation challenges. This combination typically improves estimate accuracy by 15-25%."
    },
    {
      question: "How do I estimate cable ties, clips, and fixings accurately?",
      answer: "Use standard spacing rules: cable clips every 300mm for T&E cables on walls, 400mm for SWA cables, 600mm for cable trays. Check BS 7671 for specific requirements. Different surfaces (masonry, plasterboard, steel) require different fixing types and quantities."
    },
    {
      question: "Can digital software help with material estimation?",
      answer: "Yes, digital take-off software like Planswift or Bluebeam significantly speeds up calculations and reduces manual measuring errors. However, always verify critical measurements on-site and cross-check software outputs for accuracy."
    },
    {
      question: "What's the biggest mistake electricians make when estimating?",
      answer: "Forgetting vertical cable runs and underestimating small consumables. Plan views don't always show floor-to-ceiling heights clearly, and items like grommets, cable ties, and additional fixings are easily overlooked but essential for proper installation."
    },
    {
      question: "How do I handle estimates for refurbishment work?",
      answer: "Refurbishments require extra caution. Allow 15-20% wastage instead of 5-10%, as existing buildings often have unexpected obstacles, asbestos issues, and structural complications not shown on drawings. Always inspect thoroughly before estimating."
    },
    {
      question: "Should I include spare materials in my estimates?",
      answer: "For large projects, include 2-5% spare cable and key accessories for future maintenance and minor modifications. This is separate from wastage allowances and should be clearly itemised for the client."
    },
    {
      question: "How accurate should my estimates be?",
      answer: "Professional estimates should be within 5% of actual requirements for straightforward installations, 10% for complex projects. Higher variance suggests inadequate site survey or calculation errors."
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.4.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Estimating Materials from Drawings or Site Walkthroughs
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to accurately estimate materials for electrical installations using technical drawings and site surveys.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="text-white/90 space-y-2 text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Always combine drawing estimates with site walkthroughs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Add 5–10% wastage allowance for cutting and errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Use scale rules for accurate measurement from drawings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Include all consumables - fixings, clips, grommets</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>
                Accurate estimation of materials is critical in electrical installation projects. Whether using technical drawings or conducting on-site walkthroughs, estimating ensures you have the right amount of cables, containment, accessories, and consumables. Poor estimating can lead to delays, shortages, overspending, or wasted resources.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-sm text-white/80">
                      Accurate material estimation in electrical projects reduces waste by up to 30% and prevents costly delays that can impact entire construction schedules. Projects with accurate estimates show 40% fewer emergency orders and improved project profitability.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Industry Standard:</strong> BS 7671 requires proper planning and adequate materials to ensure safe and compliant electrical installations.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p className="mb-4">By the end of this subsection, you will be able to:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Drawing Interpretation Skills</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Read and interpret electrical layout drawings, sections, and elevations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Use scale rules to measure distances accurately from 1:50, 1:100 drawings
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Extract material specifications from electrical schedules and legends
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Identify all circuit routes, containment paths, and equipment positions
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Site Assessment Skills</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Conduct thorough site walkthroughs to verify drawing accuracy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Identify physical obstacles, structural constraints, and access issues
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Measure actual distances using tape measures and laser measures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Document site conditions and additional material requirements
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Calculation & Planning</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Calculate cable lengths including vertical drops and containment routing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Estimate containment quantities (trunking, conduit, cable tray)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Apply appropriate wastage factors (5-10%) for different installation types
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Account for fixings, clips, and consumables using industry standards
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Professional Practice</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Recognise risks and consequences of under- or over-ordering materials
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Create clear, organised material lists for procurement and installation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Implement quality control checks and peer review processes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Apply BS 7671 requirements for proper planning and material selection
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Importance of Accurate Estimation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Importance of Accurate Estimation
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Accurate material estimation is the foundation of successful electrical installations:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-3">Project Success Benefits</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Ensures work completion without delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Prevents over-purchasing and material waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Supports accurate pricing for projects and quotations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Maintains professional reputation and client trust</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-white/80">
                  <strong className="text-green-400">Professional Impact:</strong> Accurate estimation demonstrates competence and builds long-term client relationships.
                </p>
              </div>
            </div>
          </section>

          {/* Estimation from Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Estimation from Drawings
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Technical drawings provide the foundation for material calculations:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Key Steps:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Review drawings</strong> - layouts, schedules, specifications</li>
                  <li><strong>Identify routes</strong> - cable runs, containment paths, accessories</li>
                  <li><strong>Use scale rules</strong> - measure distances accurately (1:50, 1:100 scales)</li>
                  <li><strong>Apply calculations</strong> - diversity factors and load requirements</li>
                  <li><strong>Allow wastage</strong> - typically 5–10% depending on project complexity</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-3">Common Drawing Scales</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p><strong>Plans:</strong> 1:50 or 1:100</p>
                    <p><strong>Details:</strong> 1:20 or 1:25</p>
                  </div>
                  <div>
                    <p><strong>Sections:</strong> 1:50</p>
                    <p><strong>Elevations:</strong> 1:100</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Circuit Information</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Circuit reference numbers</li>
                    <li>• Cable types and sizes</li>
                    <li>• Protective device ratings</li>
                    <li>• Load ratings and diversity</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Physical Layout</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Equipment positions</li>
                    <li>• Containment routes</li>
                    <li>• Floor levels and heights</li>
                    <li>• Building structure details</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-2">Measurement Techniques</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Horizontal runs:</strong> Use plan views and scale rules</li>
                  <li><strong>Vertical runs:</strong> Check sections and elevations for heights</li>
                  <li><strong>Cable trays:</strong> Measure all changes in direction and levels</li>
                  <li><strong>Containment:</strong> Include all bends, tees, and reducers</li>
                  <li><strong>Accessories:</strong> Count outlets, switches, and junction boxes</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="drawings-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Site Walkthroughs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Site Walkthroughs
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Physical site verification ensures estimates match real conditions and reveals information that drawings cannot show:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Essential Site Inspection Steps:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Access verification:</strong> Check route accessibility for installation</li>
                  <li><strong>Structural obstacles:</strong> Identify beams, existing services, HVAC systems</li>
                  <li><strong>Floor-to-ceiling heights:</strong> Measure actual dimensions for vertical runs</li>
                  <li><strong>Wall construction:</strong> Determine fixing requirements (masonry, plasterboard, steel)</li>
                  <li><strong>Existing services:</strong> Note other trades' installations that may affect routes</li>
                  <li><strong>Fire stopping:</strong> Identify compartment walls requiring special penetrations</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Potential Issues</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Congested ceiling voids</li>
                    <li>• Asbestos-containing materials</li>
                    <li>• Narrow access routes</li>
                    <li>• Live electrical systems nearby</li>
                    <li>• Water pipes in cable routes</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Additional Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Extra containment supports</li>
                    <li>• Specialist fixings for surfaces</li>
                    <li>• Longer cable runs than planned</li>
                    <li>• Additional junction boxes</li>
                    <li>• Fire barrier materials</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-2">Documentation During Site Visit</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Photographs:</strong> Take photos of complex routing areas and obstacles</li>
                  <li><strong>Measurements:</strong> Record actual distances, especially vertical drops</li>
                  <li><strong>Notes:</strong> Document special requirements and material modifications</li>
                  <li><strong>Sketches:</strong> Draw alternative routes if necessary</li>
                  <li><strong>Coordination:</strong> Note other trades' work that affects installation</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-white/80">
                  <strong className="text-orange-400">Professional Tip:</strong> Site conditions often differ from drawings by 10-20%—this is why experienced electricians never rely on drawings alone for material estimates.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="walkthrough-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Worked Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Worked Examples
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Practical estimation calculations for common scenarios:</p>
              <FormulaList
                items={[
                  {
                    text: "Cable Length with Wastage: Total Length = Measured Length × 1.1 (10% wastage)"
                  },
                  {
                    text: "Conduit Fixings: Clips Required = (Cable Length ÷ 300mm) + 1"
                  },
                  {
                    text: "Trunking Couplers: Couplers = (Total Length ÷ 3m) - 1"
                  }
                ]}
              />
            </div>
          </section>

          {/* Materials Take-off Checklist */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Materials Take-off Checklist
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-2">Primary Materials</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Cables (all types and sizes)</li>
                  <li>• Containment (conduit, trunking, cable tray)</li>
                  <li>• Distribution boards and enclosures</li>
                  <li>• Accessories (sockets, switches, lights)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Consumables</h4>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Fixings and clips</li>
                  <li>• Grommets and bushes</li>
                  <li>• Cable ties and markers</li>
                  <li>• Couplers and adaptors</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="wastage-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="space-y-3">
              {practicalGuidance.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow/20 text-elec-yellow rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-white/85 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Real World Example
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-2">Case Study: School Refurbishment Gone Wrong</h3>
                <p className="text-white/80 mb-3">
                  An experienced electrical contractor estimated a school refurbishment project based solely on architectural drawings. The drawings showed clear ceiling spaces and straightforward cable routes. The estimate included standard 5% wastage allowance.
                </p>
                <p className="text-white/80 mb-3">
                  <strong className="text-white">Reality on site:</strong> The existing building had extensive asbestos ceiling tiles, congested service voids with large HVAC ducts, and structural steelwork not shown on drawings. Cable routes had to be completely re-planned, requiring 40% more cable length and additional containment.
                </p>
                <p className="text-white/80">
                  <strong className="text-white">Consequences:</strong> 15% material shortfall, two-week project delay, emergency delivery costs, and strained client relationship. Total additional cost exceeded £8,000 on a £45,000 project.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-2">How This Could Have Been Prevented</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Comprehensive site survey before estimating</li>
                  <li>• Asbestos survey review (standard for buildings pre-1980)</li>
                  <li>• Ceiling void inspection using access hatches</li>
                  <li>• 15-20% wastage allowance for refurbishment work</li>
                  <li>• Contingency allowance for unforeseen complications</li>
                  <li>• Early liaison with other trades about service routes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white/80">
                  <strong className="text-elec-yellow">Lesson learned:</strong> This contractor now allocates a full day for site surveys on refurbishment projects and has never had a major material shortage since. The initial time investment saves significant costs and maintains professional reputation.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-white/80 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Pocket Guide – Estimating Materials
            </h2>
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-elec-yellow/20 border border-elec-yellow/30">
              <div className="space-y-2">
                {pocketGuideItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Recap
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>
                In this comprehensive subsection, you have mastered the critical skill of accurate material estimation for electrical installations. This fundamental competency directly impacts project success, profitability, and professional reputation.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Key Skills Acquired</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Reading and interpreting electrical drawings and specifications</li>
                    <li>• Using scale rules and measurement tools accurately</li>
                    <li>• Conducting systematic site surveys and documentation</li>
                    <li>• Applying appropriate wastage factors and allowances</li>
                    <li>• Creating organised, detailed material lists</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Professional Benefits</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Reduced project delays and cost overruns</li>
                    <li>• Improved client satisfaction and repeat business</li>
                    <li>• Enhanced professional reputation and competence</li>
                    <li>• Better project planning and resource management</li>
                    <li>• Compliance with BS 7671 planning requirements</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-white/80">
                  <strong className="text-amber-400">Remember:</strong> Accurate estimation is both an art and a science—combining technical measurement skills with practical experience and site awareness. Every project teaches valuable lessons that improve future estimates.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              questions={quizQuestions}
              title="Module 5 Section 4.1 - Estimating Materials Quiz"
            />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 4
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                Next: Ordering Materials
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section4_1;
