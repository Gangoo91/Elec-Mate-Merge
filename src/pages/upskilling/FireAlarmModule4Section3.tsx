import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Types & Fire Resistance - Fire Alarm Module 4 Section 3";
const DESCRIPTION = "Learn about fire-resisting cable types (FP200, MICC), enhanced vs standard cables, LSZH requirements, terminations and applications for BS 5839-1.";

const quickCheckQuestions = [
  {
    id: "enhanced-cable",
    question: "Enhanced fire-resisting cable is typically used for:",
    options: [
      "Any LV distribution",
      "Circuits required to operate for longer in fire conditions",
      "Decorative effect",
      "Short temporary wiring"
    ],
    correctIndex: 1,
    explanation: "Where circuits must remain operational for a defined period, enhanced performance cable may be required."
  },
  {
    id: "lszh-meaning",
    question: "LSZH means:",
    options: [
      "Low Smoke Zero Halogen",
      "Lightweight Strong Zinc Housing",
      "Low Static Zero Humidity",
      "Long Service Zero Heat"
    ],
    correctIndex: 0,
    explanation: "Low Smoke Zero Halogen materials reduce toxic smoke in a fire."
  },
  {
    id: "screen-earthing",
    question: "Cable screens should typically be earthed at:",
    options: [
      "Both ends always",
      "One end only (typically panel end) unless specified otherwise",
      "Neither end",
      "Every junction box"
    ],
    correctIndex: 1,
    explanation: "Earthing at one end prevents earth loop currents while providing screening effectiveness."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Enhanced fire-resisting cable is typically used for:",
    options: ["Any LV distribution", "Circuits required to operate for longer in fire conditions", "Decorative effect", "Short temporary wiring"],
    correctAnswer: 1,
    explanation: "Where circuits must remain operational for a defined period, enhanced performance cable may be required."
  },
  {
    id: 2,
    question: "MICC cables provide:",
    options: ["Poor fire resistance", "Excellent fire survivability with correct termination", "Only data transmission", "No mechanical strength"],
    correctAnswer: 1,
    explanation: "Mineral insulated copper cable (MICC) offers high fire resistance when properly installed and terminated."
  },
  {
    id: 3,
    question: "LSZH means:",
    options: ["Low Smoke Zero Halogen", "Lightweight Strong Zinc Housing", "Low Static Zero Humidity", "Long Service Zero Heat"],
    correctAnswer: 0,
    explanation: "Low Smoke Zero Halogen materials reduce toxic smoke in a fire."
  },
  {
    id: 4,
    question: "FP200 Gold cable provides fire survivability for:",
    options: ["30 minutes at 650C", "120 minutes at 842C", "60 minutes at 550C", "15 minutes at 400C"],
    correctAnswer: 1,
    explanation: "FP200 Gold is an enhanced fire-resisting cable tested to maintain circuit integrity for 120 minutes at 842C per BS 8491."
  },
  {
    id: 5,
    question: "Bend radius should be:",
    options: ["Ignored", "Per manufacturer data to avoid damage", "As tight as possible", "Only a visual estimate"],
    correctAnswer: 1,
    explanation: "Follow manufacturer limits to maintain cable integrity."
  },
  {
    id: 6,
    question: "The main advantage of using screened cable for detector loops is:",
    options: ["Lower cost", "Reduced electromagnetic interference pickup", "Easier to strip", "Better fire resistance"],
    correctAnswer: 1,
    explanation: "Screened cables with properly earthed screens reduce EMC susceptibility, important near sources of electrical noise."
  },
  {
    id: 7,
    question: "When terminating MICC cable, moisture ingress is prevented by:",
    options: ["Leaving the end open", "Using proper sealing glands with compound or sleeves", "Wrapping in electrical tape", "Painting the end"],
    correctAnswer: 1,
    explanation: "MICC terminations require proper sealing glands and moisture-excluding compound to prevent magnesium oxide insulation degradation."
  },
  {
    id: 8,
    question: "Standard fire-resisting cable for fire alarms should meet at least:",
    options: ["No specific standard", "BS EN 50200 PH classification (IEC 60331)", "Domestic cable standards only", "CAT5e data cable standards"],
    correctAnswer: 1,
    explanation: "Standard performance fire alarm cables should meet BS EN 50200 (formerly IEC 60331) for circuit integrity under fire conditions."
  },
  {
    id: 9,
    question: "Cable cores should be identified at terminations using:",
    options: ["Memory only", "Permanent identification per BS 7671 and manufacturer requirements", "Pencil markings", "Coloured tape that can fall off"],
    correctAnswer: 1,
    explanation: "Proper permanent identification of cores aids installation, testing, maintenance and troubleshooting throughout system life."
  },
  {
    id: 10,
    question: "Enhanced cable is often required for:",
    options: ["Circuits supporting evacuation/critical control", "Decorative lighting", "Temporary tools", "Spare cores"],
    correctAnswer: 0,
    explanation: "Critical functions may need enhanced survivability."
  }
];

const faqs = [
  {
    question: "Do I always need enhanced cable?",
    answer: "No - only where the fire strategy or design requires extended survivability. Most circuits use standard fire-resistant cable."
  },
  {
    question: "Is MICC better than FP-type?",
    answer: "Both can meet requirements. MICC offers superior fire resistance but requires specialist skills. FP-type is easier to install with good performance."
  },
  {
    question: "What about LSZH requirements?",
    answer: "Use LSZH where specified or where reduced toxic smoke is required. Most fire alarm cables are now LSZH as standard."
  },
  {
    question: "How do I identify cable ratings?",
    answer: "Check manufacturer data sheets. Cable markings should include fire rating standards (e.g., BS EN 50200, BS 8491)."
  },
  {
    question: "Can I use standard domestic cable?",
    answer: "No - fire alarm circuits require fire-resistant cables to maintain operation during a fire. PVC cables are not suitable."
  },
  {
    question: "What size cable for sounder circuits?",
    answer: "Calculate based on device current and volt drop. Typically 1.5mm2, increasing to 2.5mm2 for long runs or high loads."
  }
];

const FireAlarmModule4Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-4">
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
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Types & Fire Resistance
          </h1>
          <p className="text-white/80">
            Fire-resisting cable selection, LSZH requirements and termination techniques
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standard:</strong> FP200 - 30 min fire resistance</li>
              <li><strong>Enhanced:</strong> FP200 Gold - 120 min at 842C</li>
              <li><strong>MICC:</strong> Excellent but needs specialist termination</li>
              <li><strong>LSZH:</strong> Low Smoke Zero Halogen - reduce toxic fumes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check fire strategy for enhanced requirement</li>
              <li><strong>Use:</strong> Screened cable near EMC sources</li>
              <li><strong>Apply:</strong> Earth screen at panel end only</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between standard and enhanced fire-resisting cables",
              "Select appropriate cable types for different fire alarm circuits",
              "Apply correct termination techniques for FP-type and MICC cables",
              "Understand LSZH requirements and smoke/toxicity considerations",
              "Implement EMC strategies using screened cables and earthing",
              "Maintain cable integrity through proper handling and installation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Standard vs Enhanced */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Standard vs Enhanced Fire-Resisting Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm cables must maintain circuit integrity during fire conditions. BS 5839-1 distinguishes between standard and enhanced performance requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Performance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maintains circuit integrity for approximately 30 minutes</li>
                  <li>Tested to BS EN 50200 / IEC 60331</li>
                  <li>Suitable for most detection and alarm circuits</li>
                  <li>Example: FP200 (red sheath)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enhanced Performance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maintains circuit integrity for 120 minutes at 842C</li>
                  <li>Tested to BS 8491</li>
                  <li>Required for critical evacuation and control circuits</li>
                  <li>Example: FP200 Gold (white sheath)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Common Cable Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">FP-Type Cables</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>FP200: Standard fire-resistant, LSZH sheath</li>
                  <li>FP200 Gold: Enhanced survivability, 120-minute rating</li>
                  <li>Easier to install than MICC, good availability</li>
                  <li>Available screened or unscreened</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MICC (Mineral Insulated Copper Cable)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Copper conductors in magnesium oxide insulation</li>
                  <li>Excellent fire resistance and mechanical strength</li>
                  <li>Requires specialist termination skills</li>
                  <li>Moisture-sensitive - correct sealing essential</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Screened Cables</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Braided or foil screen reduces EMC interference</li>
                  <li>Essential near power cables, motors, VFDs</li>
                  <li>Screen must be correctly earthed per design</li>
                  <li>Use drain wire for termination</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: LSZH Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LSZH Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Low Smoke Zero Halogen (LSZH) cable sheaths are essential in fire alarm installations to minimise toxic smoke during a fire.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why LSZH Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>PVC releases hydrogen chloride (HCl) when burning - toxic and corrosive</li>
                <li>LSZH materials produce minimal smoke and no halogen gases</li>
                <li>Essential in escape routes and confined spaces</li>
                <li>Often specified throughout the building for consistency</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Note:</strong> Fire-resisting cables for fire alarms should always have LSZH sheaths. Check specification requirements carefully.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Termination Best Practice */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Termination Best Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct termination is essential to maintain fire resistance ratings and ensure reliable operation.
            </p>

            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">FP-Type Cable</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Use compatible glands certified for the cable type</li>
                  <li>Maintain correct bend radius (typically 6x cable diameter)</li>
                  <li>Avoid damage to insulation during stripping</li>
                  <li>Apply correct torque to terminals</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MICC Cable</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Use manufacturer-approved pot and seal kits</li>
                  <li>Heat and dry if moisture suspected before potting</li>
                  <li>Apply sealing compound correctly to exclude moisture</li>
                  <li>Form tails neatly with appropriate sleeving</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Screened Cable</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Earth screen at one end only (typically panel end) unless specified</li>
                  <li>Use drain wire for clean termination</li>
                  <li>Insulate unterminated screen ends</li>
                  <li>Document screen strategy for maintainers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Cable Selection by Circuit */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cable Selection by Circuit Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different circuits have different requirements. Match cable selection to the circuit function and fire strategy.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Detection Loops</p>
                <p className="text-sm text-white">Standard fire-resistant, screened if near interference sources. Consider 1.5mm2 for long runs to manage volt drop.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Sounder/VAD Circuits</p>
                <p className="text-sm text-white">Standard or enhanced depending on evacuation strategy. Size for current and volt drop (1.5mm2 or 2.5mm2 typical).</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-1">Critical Interface Circuits</p>
                <p className="text-sm text-white">Enhanced cable for fire/smoke control, emergency lighting interfaces. Consider fire strategy requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Handling and Installation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Handling and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct handling protects cable integrity and maintains fire performance ratings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Observe minimum bend radius throughout installation - not just at terminations</li>
                <li>Avoid mechanical damage - do not stand on cables or crush during installation</li>
                <li>Protect cut ends from moisture until terminated (especially MICC)</li>
                <li>Use correct stripping tools - avoid nicking conductor insulation</li>
                <li>Label all cores at terminations for future maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check fire strategy document early - it specifies where enhanced cable is required</li>
                <li>Consider EMC environment when specifying screened vs unscreened</li>
                <li>Size cables for both current capacity and voltage drop</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep MICC cable ends sealed with tape until you are ready to terminate</li>
                <li>Document which end the screen is earthed at for future maintainers</li>
                <li>Photograph critical terminations before enclosure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using standard cable where enhanced is specified</strong> - in the fire strategy</li>
                <li><strong>Damaging cable sheath or insulation</strong> - with tight bends or crushing during installation</li>
                <li><strong>Earthing cable screens at both ends</strong> - creating earth loops and interference problems</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Cable Types</p>
                <ul className="space-y-0.5">
                  <li>FP200 = Standard (30 min)</li>
                  <li>FP200 Gold = Enhanced (120 min)</li>
                  <li>MICC = Specialist termination</li>
                  <li>LSZH = Low smoke, no halogens</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Termination</p>
                <ul className="space-y-0.5">
                  <li>Maintain bend radius</li>
                  <li>Screen earth at one end</li>
                  <li>Seal MICC against moisture</li>
                  <li>Document screen strategy</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule4Section3;
