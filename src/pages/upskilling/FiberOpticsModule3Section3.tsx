import { ArrowLeft, Route, CheckCircle, Lightbulb, AlertTriangle, HelpCircle, Grid, Box, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { SingleQuestionQuiz } from "@/components/apprentice-courses/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Routing and Containment | Fibre Optics Module 3";
const DESCRIPTION = "Master fibre optic cable routing through tray, conduit, basket, and duct systems. Learn UK containment standards, fill ratios, and installation techniques for reliable networks.";

const quickCheckQuestions = [
  {
    id: "fo-m3s3-qc1",
    question: "What is the recommended maximum fill ratio for fibre cables in conduit?",
    options: ["25%", "40%", "60%", "80%"],
    correctIndex: 1,
    explanation: "The standard maximum fill ratio for conduit is 40% of cross-sectional area. This allows for cable movement during pulling and future additions."
  },
  {
    id: "fo-m3s3-qc2",
    question: "Cable basket (wire mesh) containment is particularly suited for:",
    options: ["High EMI environments", "Outdoor installations", "Flexible routing with good ventilation", "Fire-rated applications only"],
    correctIndex: 2,
    explanation: "Cable basket provides excellent ventilation for heat dissipation, flexible routing options, and easy cable additions. It's ideal for data centres and open ceiling installations."
  },
  {
    id: "fo-m3s3-qc3",
    question: "When routing fibre cables alongside power cables, the minimum separation is:",
    options: ["No separation required", "25mm", "50mm or physical barrier", "300mm always"],
    correctIndex: 2,
    explanation: "BS 6701 recommends minimum 50mm separation or a physical barrier between fibre and power cables to prevent damage from heat and electromagnetic interference with any metallic elements."
  }
];

const quizQuestions = [
  {
    question: "Cable tray is available in which common configurations?",
    options: ["Solid bottom only", "Ladder and perforated types", "Mesh only", "Enclosed tube only"],
    correctAnswer: 1
  },
  {
    question: "The purpose of innerduct within a larger duct is to:",
    options: ["Increase pulling tension", "Subdivide space and maintain bend radius", "Add fire resistance", "Reduce installation cost"],
    correctAnswer: 1
  },
  {
    question: "When calculating conduit fill, fibre cable jam ratio should be:",
    options: ["Above 1.0", "Exactly 1.0", "Below 0.8 (ideally 0.6)", "Not considered"],
    correctAnswer: 2
  },
  {
    question: "Underground duct systems for fibre should include:",
    options: ["Manholes or access chambers at intervals", "Direct burial without chambers", "Only straight runs", "No draw ropes"],
    correctAnswer: 0
  },
  {
    question: "Vertical cable runs in risers should be supported at intervals not exceeding:",
    options: ["500mm", "1-1.5 metres", "3 metres", "5 metres"],
    correctAnswer: 1
  },
  {
    question: "When fibre cables must cross power cables:",
    options: ["Route parallel for maximum distance", "Cross at right angles", "No precautions needed", "Only at junction boxes"],
    correctAnswer: 1
  },
  {
    question: "Cable tray bends should maintain a radius of:",
    options: ["Equal to tray width", "No requirement", "Minimum cable bend radius or greater", "30mm fixed"],
    correctAnswer: 2
  },
  {
    question: "Pull boxes are installed in conduit runs to:",
    options: ["Store spare cable", "Break up long pulls and change direction", "Provide test points", "Mount transceivers"],
    correctAnswer: 1
  },
  {
    question: "The recommended maximum pull length for fibre in conduit is typically:",
    options: ["10m", "30m", "60-100m depending on cable and bends", "Unlimited"],
    correctAnswer: 2
  },
  {
    question: "Segregation from data (Cat6/Cat6A) cables is:",
    options: ["Required - minimum 300mm", "Required - minimum 50mm", "Not required - can share containment", "Only required for shielded data cables"],
    correctAnswer: 2
  }
];

const faqs = [
  {
    question: "Can fibre cables share containment with copper data cables?",
    answer: "Yes—fibre cables can share containment with copper data cables (Cat5e, Cat6, Cat6A) as there's no electromagnetic coupling risk. The glass fibre is immune to interference. However, maintain good cable management practices and don't overload containment. Some organisations prefer separation for management simplicity."
  },
  {
    question: "Do I need special containment for external fibre routes?",
    answer: "External routes typically use underground duct (HDPE or PVC), buried direct (armoured cable), or aerial messenger wire. Standard internal tray/basket isn't rated for outdoor use. Use UV-resistant materials for exposed runs. Duct should be watertight with proper sealing at chambers and building entries."
  },
  {
    question: "How do I calculate if my conduit is large enough?",
    answer: "Calculate total cable cross-sectional area, divide by conduit internal area—keep below 40% fill. For multiple cables, check jam ratio (conduit diameter ÷ cable diameter) is below 0.8 to prevent jamming. Use manufacturer software or tables for complex pulls. Include spare capacity for future cables."
  },
  {
    question: "What's the difference between ladder rack and cable tray?",
    answer: "Ladder rack has side rails with cross-members (rungs) and open bottom—excellent ventilation, best for heavy cable loads and data centres. Cable tray has a solid or perforated bottom—better for smaller cables, prevents sagging, may meet fire requirements. Both available in steel or aluminium with various finishes."
  },
  {
    question: "Can I use plastic conduit for fibre?",
    answer: "Yes—PVC and HDPE conduit are commonly used for fibre. PVC is rigid and suits internal use. HDPE (high-density polyethylene) is flexible and used for external/underground routes. Ensure conduit is approved for the application and fire ratings meet building requirements for internal use."
  },
  {
    question: "How do I maintain bend radius at containment direction changes?",
    answer: "Use appropriate fittings: 90° swept bends with adequate inner radius (not sharp corners), reducers when changing size, tee-pieces with proper radius. For tray, use internal/external radius bends that match or exceed cable bend requirements. Check all direction changes before pulling cable."
  }
];

const FiberOpticsModule3Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Route className="h-4 w-4" />
            Module 3 - Section 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Routing and Containment
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Cable tray, conduit, basket, and duct systems for fibre installation
          </p>
        </section>

        {/* Quick Summary Boxes */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-2">In 30 Seconds</h3>
            <p className="text-sm text-white">
              Conduit fill: 40% max. Tray: maintain bend radius at fittings. Basket: great ventilation. Segregate from power (50mm min). Support vertical runs every 1-1.5m.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Route It / Install It</h3>
            <p className="text-sm text-white">
              Plan route before pulling. Check bend radius at all turns. Use appropriate fittings. Leave draw cord for future pulls. Label routes and containment.
            </p>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
            <CheckCircle className="h-5 w-5 text-green-400" />
            What You Will Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Cable tray and ladder rack installation",
              "Conduit sizing and fill ratios",
              "Wire basket containment systems",
              "Underground duct installation",
              "Segregation requirements",
              "Support and fixings for vertical runs"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Cable Tray Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold text-white">Cable Tray Systems</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Cable tray provides a continuous support system for routing fibre cables across long horizontal and vertical distances. Available in various configurations, tray systems are widely used in commercial buildings, data centres, and industrial facilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  Ladder Rack
                </h4>
                <ul className="text-sm space-y-1 text-white">
                  <li>- Side rails with cross rungs</li>
                  <li>- Open bottom for ventilation</li>
                  <li>- High load capacity</li>
                  <li>- Data centre standard</li>
                  <li>- Easy cable addition</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  Solid/Perforated Tray
                </h4>
                <ul className="text-sm space-y-1 text-white">
                  <li>- Continuous bottom support</li>
                  <li>- Prevents cable sag</li>
                  <li>- Better for small cables</li>
                  <li>- May meet fire requirements</li>
                  <li>- Perforations aid ventilation</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Tray Installation Requirements</h4>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Support spacing:</strong> Maximum 1.5-2m for horizontal runs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Bends:</strong> Use swept bends maintaining minimum cable radius</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Earthing:</strong> Metallic tray must be bonded to earth (BS 7671)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Cover:</strong> Use where mechanical protection or fire rating required</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Fill:</strong> Leave 25% space for future cables and maintenance access</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Tray Bend Radius
              </h4>
              <p className="text-sm text-white">
                Factory-made tray bends come in standard radii (typically 150mm, 300mm, 450mm inside radius). Verify the bend radius of fittings exceeds the minimum bend radius for all cables that will be installed. A 90° bend with 150mm inner radius may be insufficient for larger fibre cables requiring 200mm minimum radius.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 02: Conduit Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold text-white">Conduit Systems</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Conduit provides enclosed protection for fibre cables, particularly useful where cables must be concealed in walls, floors, or protected from damage. Proper sizing is critical to enable installation and future cable additions.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Conduit Types</h4>
              <div className="space-y-3 text-sm text-white">
                <div>
                  <h5 className="font-medium text-white">Steel Conduit</h5>
                  <p>Galvanised or stainless steel. High mechanical protection. Requires earthing. Used in industrial environments or where EMI shielding beneficial for any metallic cable elements.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">PVC Conduit</h5>
                  <p>Rigid PVC for internal use. Round or oval profiles. Light, easy to install. Check fire rating for building requirements. Common for data cabling.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Flexible Conduit</h5>
                  <p>Metal or plastic corrugated tube. Allows routing around obstacles. Not for long runs due to increased friction. Useful for final connection to equipment.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
              <h4 className="font-semibold text-blue-400 mb-2">Conduit Fill Ratio</h4>
              <p className="text-sm mb-3 text-white">
                Maximum fill ratio ensures cables can be pulled without damage and allows for expansion:
              </p>
              <ul className="text-sm space-y-1 text-white">
                <li>- <strong>Single cable:</strong> 53% maximum cross-sectional fill</li>
                <li>- <strong>Two cables:</strong> 31% maximum</li>
                <li>- <strong>Three or more:</strong> 40% maximum</li>
                <li>- <strong>Best practice:</strong> Aim for 25-30% for future capacity</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Jam Ratio Calculation</h4>
              <p className="text-sm text-white mb-2">
                For multiple cables, the <strong>jam ratio</strong> predicts whether cables will jam during pulling:
              </p>
              <div className="bg-white/5 rounded p-3 text-sm font-mono text-white">
                Jam Ratio = Conduit ID ÷ Cable OD
              </div>
              <ul className="text-sm space-y-1 mt-3 text-white">
                <li>- <strong>Below 0.6:</strong> No jamming risk</li>
                <li>- <strong>0.6 - 0.8:</strong> Acceptable, careful installation</li>
                <li>- <strong>Above 0.8:</strong> High jam risk - use larger conduit</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Pull Boxes
              </h4>
              <p className="text-sm text-white">
                Install <strong>pull boxes</strong> to break up long conduit runs, change direction, or provide access points. Recommended at maximum 30m intervals for straight runs, and at direction changes exceeding 90° cumulative. Pull boxes make installation easier and enable future cable additions without full re-pulls.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 03: Wire Basket Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold text-white">Wire Basket Systems</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Cable basket (wire mesh tray) has become popular for data and fibre cable installations due to its flexibility, ventilation, and ease of cable management. The open mesh design allows excellent airflow and simple cable additions.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Basket System Benefits</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-white mb-2">Advantages</h5>
                  <ul className="space-y-1 text-white">
                    <li>- Excellent ventilation/cooling</li>
                    <li>- Easy cable additions</li>
                    <li>- Lightweight construction</li>
                    <li>- Flexible routing</li>
                    <li>- Quick installation</li>
                    <li>- Visual cable inspection</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Considerations</h5>
                  <ul className="space-y-1 text-white">
                    <li>- Limited mechanical protection</li>
                    <li>- Not for exposed outdoor use</li>
                    <li>- May not meet some fire codes</li>
                    <li>- Cables visible (aesthetics)</li>
                    <li>- Requires proper support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
              <h4 className="font-semibold text-blue-400 mb-2">Data Centre Applications</h4>
              <p className="text-sm text-white">
                Wire basket is the preferred containment in many data centres. The open design allows hot exhaust air from equipment to dissipate rather than being trapped. Multiple tiers can run above cabinets—typically separating power, fibre, and copper runs. Standard colours (often yellow for fibre) aid identification.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Installation Guidelines</h4>
              <ul className="text-sm space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Support:</strong> Maximum 1.5m centres, closer for heavy loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Fill:</strong> Cables should not extend above basket sides</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Bends:</strong> Use proprietary bend fittings with adequate radius</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Earthing:</strong> Metal basket must be earthed per BS 7671</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Finish:</strong> Zinc plated, hot-dip galvanised, or powder-coated</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Underground Duct Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold text-white">Underground Duct Systems</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Underground duct provides the primary route for external fibre cables between buildings, to street cabinets, and for campus/metropolitan networks. Proper duct installation is critical for long-term reliability and future cable capacity.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Duct Types</h4>
              <div className="space-y-3 text-sm text-white">
                <div>
                  <h5 className="font-medium text-white">HDPE Duct</h5>
                  <p>High-density polyethylene. Flexible, supplied in coils. Standard for direct-buried and pulled installations. Black or coloured for identification. 32mm-110mm typical sizes.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">PVC Duct</h5>
                  <p>Rigid PVC in straight lengths. Used for building entries and shorter runs. Requires more joints than HDPE. 50mm-150mm typical sizes.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Micro-Duct</h5>
                  <p>Small bore (5-14mm) for fibre blowing. Multiple tubes in bundle or within larger duct. Enables incremental fibre deployment. FTTH and metro networks.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Duct Installation Requirements</h4>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Depth:</strong> Minimum 450mm in footways, 600mm in carriageways (NJUG guidance)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Bedding:</strong> 50mm sand bed below duct, 75mm cover above</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Warning:</strong> Marker tape 300mm above duct</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Draw cord:</strong> Install cord/rope for future cable pulls</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Seal:</strong> Seal duct ends to prevent water/debris ingress</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CircleDot className="h-4 w-4" />
                Chambers and Manholes
              </h4>
              <p className="text-sm text-white">
                Install <strong>access chambers</strong> at regular intervals (typically 200-300m maximum), at direction changes, and at junction points. Chambers allow pulling, jointing, and future maintenance access. Size chambers for the number of ducts and anticipated work. Include cable racks or saddles for proper cable management within chambers.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 05: Segregation Requirements */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold text-white">Segregation Requirements</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              While fibre cables are immune to electromagnetic interference, <strong>segregation</strong> from power cables remains important for physical protection, heat management, and compliance with installation standards.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Segregation from Power Cables</h4>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Minimum separation:</strong> 50mm or physical barrier</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Crossings:</strong> Cross at right angles, minimise parallel runs</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>High voltage:</strong> Increase separation for &gt;1kV systems</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Heat sources:</strong> Consider cable heating from power cables</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
              <h4 className="font-semibold text-blue-400 mb-2">Why Segregate If Fibre Is Immune to EMI?</h4>
              <p className="text-sm text-white">
                Segregation protects against: <strong>physical damage</strong> during power cable maintenance, <strong>heat</strong> from high-current cables degrading fibre jacket, and <strong>induced voltage</strong> in any metallic elements (armour, strength members). Additionally, regulatory compliance (BS 6701, BS 7671) requires segregation regardless of cable type.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Can Share With</h4>
                <ul className="text-sm space-y-1 text-white">
                  <li>- Copper data cables (Cat5/6/6A)</li>
                  <li>- Telephone cables</li>
                  <li>- Coaxial (CATV)</li>
                  <li>- Security/alarm cables</li>
                  <li>- Control cables (extra-low voltage)</li>
                </ul>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2">Segregate From</h4>
                <ul className="text-sm space-y-1 text-white">
                  <li>- Mains power (230V/400V)</li>
                  <li>- High voltage systems</li>
                  <li>- Lightning protection</li>
                  <li>- Generator feeds</li>
                  <li>- Unscreened motor cables</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Vertical Runs and Support */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-background font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold text-white">Vertical Runs and Support</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Vertical cable runs in risers and shafts require special attention to <strong>support</strong> and <strong>strain relief</strong>. Cable weight accumulates over height, and without proper support, cables can stretch, stress connectors, or pull out of terminations.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Vertical Support Requirements</h4>
              <div className="space-y-2 text-sm text-white">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Indoor tight-buffer cables</span>
                  <span className="font-medium">1m maximum intervals</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>External/armoured cables</span>
                  <span className="font-medium">1.5m maximum intervals</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>At top of vertical run</span>
                  <span className="font-medium">Anchor clamp/strain relief</span>
                </div>
                <div className="flex justify-between">
                  <span>At floor penetrations</span>
                  <span className="font-medium">Support and firestop</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Cable Weight Consideration
              </h4>
              <p className="text-sm text-white">
                For long vertical drops (multi-storey buildings), calculate cumulative cable weight. Standard fibre cable weighs 20-50kg per 100m. Over a 30m drop, that's 6-15kg pulling on the top termination. Use <strong>intermediate anchor points</strong> or cable clamps that grip without crushing to distribute weight.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Riser Best Practices
              </h4>
              <ul className="text-sm space-y-1 text-white">
                <li>- Use dedicated fibre risers where possible</li>
                <li>- Install cable management brackets at each floor</li>
                <li>- Provide service loops at floor entry points</li>
                <li>- Label cables clearly at each accessible point</li>
                <li>- Ensure firestop compliance at penetrations</li>
                <li>- Install riser-rated cable (Cca minimum)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Route className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Route Planning</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Survey route completely before installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Identify all bend locations and verify radius compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Plan pull points and intermediate access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Consider future cable additions in sizing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Installation Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always leave draw cord/rope for future pulls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use lubricant on conduit pulls over 30m</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Secure cables properly—do not rely on friction alone</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Overfilling conduit (exceeding 40% fill)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using sharp 90° bends instead of swept fittings</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Not supporting vertical runs adequately</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Forgetting to earth metallic containment</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs - Static Display */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="p-6 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Route className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Containment
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Fill Ratios</h4>
              <div className="space-y-1 text-white">
                <p><strong>Conduit (multi-cable):</strong> 40% max</p>
                <p><strong>Tray:</strong> 50% or below sides</p>
                <p><strong>Jam ratio:</strong> Keep below 0.8</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Segregation</h4>
              <div className="space-y-1 text-white">
                <p><strong>From power:</strong> 50mm or barrier</p>
                <p><strong>From data:</strong> Not required</p>
                <p><strong>Crossings:</strong> Right angles</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-elec-yellow/30 text-sm text-white">
            <p><strong>Vertical support:</strong> 1-1.5m intervals | <strong>Tray support:</strong> 1.5-2m intervals</p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Routing and Containment Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="../section-2"
            className="flex items-center gap-2 text-white hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Bend Radius</span>
          </Link>
          <Link
            to="../section-4"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Splice Enclosures</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section3;
