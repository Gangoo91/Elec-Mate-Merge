import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ae1-code",
    question: "What does the environmental influence code AE1 refer to?",
    options: [
      "High temperature environment",
      "Presence of water (rain protection not required)",
      "Corrosive environment",
      "High impact risk"
    ],
    correctIndex: 1,
    explanation: "AE1 refers to environmental conditions where rain protection is not required—typically indoor dry locations. The AE codes cover climatic conditions related to presence of water."
  },
  {
    id: "mechanical-influence",
    question: "Which code series relates to mechanical influences like impact and vibration?",
    options: [
      "AE codes (climatic)",
      "BE codes (mechanical)",
      "AF codes (chemical)",
      "AD codes (water)"
    ],
    correctIndex: 1,
    explanation: "BE codes relate to mechanical influences including impact (AG), vibration (AH), and other physical forces that could damage electrical equipment. These determine enclosure strength requirements."
  },
  {
    id: "chemical-exposure",
    question: "What code relates to corrosion and chemical exposure risk?",
    options: [
      "AE (climatic)",
      "BE (mechanical)",
      "AF (chemical)",
      "AD (water)"
    ],
    correctIndex: 2,
    explanation: "AF codes relate to chemical influences including corrosive substances, pollutants, and chemicals that can damage electrical equipment and cables. Critical in industrial environments."
  }
];

const faqs = [
  {
    question: "Why is environmental assessment so critical for installations?",
    answer: "Environmental conditions are often the determining factor between successful long-term installations and premature failure. Poor assessment leads to cable insulation degradation, corrosion hazards, water ingress, and UV damage—resulting in equipment failure, safety hazards, and costly replacements within months instead of the expected 25+ year lifespan."
  },
  {
    question: "How do I identify the correct IP rating for an enclosure?",
    answer: "First assess the environmental influence codes (AD for water, AE for humidity/condensation, BE for solids). Then cross-reference with IP rating requirements in BS 7671 or manufacturer guidance. For example, AD4 (water splashes) typically requires IP X4 minimum, while AD7 (immersion) requires IP X7 or higher."
  },
  {
    question: "What materials should I use in chemically aggressive environments?",
    answer: "Avoid standard PVC in chemical environments—it becomes brittle when exposed to many solvents and cleaning agents. Consider stainless steel conduit, specialised polymer containment systems, or LSZH (Low Smoke Zero Halogen) cables depending on the specific chemicals present. Always verify material compatibility."
  },
  {
    question: "Do I need UV-resistant cables for all outdoor installations?",
    answer: "Yes. Standard cable sheathing degrades under UV exposure, becoming brittle and cracked over time. For outdoor installations use cables with UV-stabilised outer sheathing, or install in UV-protected containment. Even indirect sunlight through windows can cause damage over extended periods."
  }
];

const quizQuestion = {
  question: "Why is UV protection important for external cabling?",
  options: [
    "It improves conductivity",
    "UV degrades cable insulation causing brittleness and failure",
    "It reduces installation costs",
    "It's only cosmetic"
  ],
  correctAnswer: 1,
  explanation: "UV radiation degrades many cable insulation materials, causing them to become brittle, crack, and fail over time. This creates electrical hazards and requires premature replacement. UV-stabilised materials or protective enclosures are essential for outdoor installations."
};

const BS7671Module3Section3 = () => {
  useSEO({
    title: "External Influences & Installation Conditions | BS 7671 Module 3.3",
    description: "Learn to assess environmental conditions and select appropriate materials and IP ratings using BS 7671 influence codes for reliable electrical installations."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            External Influences & Installation Conditions
          </h1>
          <p className="text-white/80">
            Environmental conditions affecting material selection and installation methods
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Environmental conditions determine material and method selection</li>
              <li><strong>Codes:</strong> AD (water), AE (humidity), AF (chemical), AG (impact), AH (vibration)</li>
              <li><strong>Critical:</strong> Wrong materials = premature failure, safety hazards, costly replacement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Survey:</strong> Assess every location before specifying materials</li>
              <li><strong>Reference:</strong> BS 7671 Chapter 32 and Appendix 5</li>
              <li><strong>IP ratings:</strong> Match enclosure protection to environmental codes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and classify environmental conditions using BS 7671 influence codes",
              "Assess environmental factors and their impact on material selection",
              "Select appropriate IP ratings for different environments",
              "Specify cable types suitable for harsh conditions",
              "Plan installations for long-term environmental resistance",
              "Avoid common material selection errors in challenging locations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Environmental Influence Codes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Environmental Influence Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Chapter 32 provides a systematic classification for environmental conditions using alphanumeric codes. These codes describe the environment's characteristics and directly influence equipment selection and installation methods.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3 text-elec-yellow font-medium">Code</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Category</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AD</td>
                    <td className="p-3">Presence of water</td>
                    <td className="p-3 text-white/70 text-xs">AD1 (negligible) to AD8 (submerged)</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AE</td>
                    <td className="p-3">Presence of foreign solid bodies</td>
                    <td className="p-3 text-white/70 text-xs">AE1 (negligible) to AE6 (heavy dust)</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AF</td>
                    <td className="p-3">Corrosive/polluting substances</td>
                    <td className="p-3 text-white/70 text-xs">AF1 (negligible) to AF4 (continuous corrosion)</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AG</td>
                    <td className="p-3">Impact</td>
                    <td className="p-3 text-white/70 text-xs">AG1 (low) to AG4 (very high impact risk)</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AH</td>
                    <td className="p-3">Vibration</td>
                    <td className="p-3 text-white/70 text-xs">AH1 (low) to AH3 (high vibration)</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">AN</td>
                    <td className="p-3">Solar radiation</td>
                    <td className="p-3 text-white/70 text-xs">AN1 (low) to AN3 (high UV exposure)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Consequences of Poor Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Cable insulation degradation within months</li>
                  <li>• Corrosion creating shock hazards</li>
                  <li>• Water ingress causing earth faults</li>
                  <li>• UV damage making cables brittle</li>
                  <li>• Chemical exposure compromising safety</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Benefits of Proper Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Installations lasting 25+ years</li>
                  <li>• Minimal maintenance costs</li>
                  <li>• Consistent safety performance</li>
                  <li>• Warranty compliance</li>
                  <li>• Professional reputation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: IP Ratings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IP Rating Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IP (Ingress Protection) rating system defines the protection level of enclosures against solid objects and water. Understanding IP codes is essential for selecting appropriate equipment.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">IP Rating Format: IP XY</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">First Digit (X) - Solids</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>0:</strong> No protection</li>
                    <li><strong>1:</strong> Objects &gt;50mm</li>
                    <li><strong>2:</strong> Objects &gt;12.5mm (fingers)</li>
                    <li><strong>4:</strong> Objects &gt;1mm (tools/wires)</li>
                    <li><strong>5:</strong> Dust protected</li>
                    <li><strong>6:</strong> Dust tight</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Second Digit (Y) - Liquids</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>0:</strong> No protection</li>
                    <li><strong>1:</strong> Vertical drips</li>
                    <li><strong>4:</strong> Splashing water</li>
                    <li><strong>5:</strong> Water jets</li>
                    <li><strong>6:</strong> Powerful jets</li>
                    <li><strong>7:</strong> Temporary immersion</li>
                    <li><strong>8:</strong> Continuous immersion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common IP Rating Applications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IP20:</strong> Indoor dry locations (domestic consumer units)</li>
                <li><strong>IP44:</strong> Protected outdoor locations (under canopy)</li>
                <li><strong>IP55:</strong> Exposed outdoor equipment</li>
                <li><strong>IP65:</strong> Wash-down areas, food processing</li>
                <li><strong>IP66:</strong> High-pressure cleaning environments</li>
                <li><strong>IP67:</strong> Temporary submersion possible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Material Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Material Selection for Harsh Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different environmental conditions require specific material choices. Standard materials that work in domestic settings may fail rapidly in industrial, outdoor, or chemically aggressive environments.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection Criteria</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>SWA:</strong> Mechanical protection, direct burial</li>
                  <li><strong>LSZH:</strong> Low smoke for escape routes</li>
                  <li><strong>UV-stabilised:</strong> Outdoor exposure</li>
                  <li><strong>Oil-resistant:</strong> Industrial environments</li>
                  <li><strong>Fire-resistant:</strong> Emergency circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Stainless steel:</strong> Corrosive environments</li>
                  <li><strong>GRP:</strong> Chemical resistance</li>
                  <li><strong>Galvanised steel:</strong> General industrial</li>
                  <li><strong>PVC:</strong> Indoor dry locations only</li>
                  <li><strong>HDPE:</strong> Underground/direct burial</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Material Selection Errors</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• PVC conduit in cold stores (becomes brittle below 0°C)</li>
                <li>• Standard cables in food processing (chemical cleaning attack)</li>
                <li>• Non-UV cables outdoors (degradation within 2-3 years)</li>
                <li>• Zinc-plated fixings in swimming pools (corrosion)</li>
                <li>• Standard enclosures in dusty environments (IP rating too low)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Environmental Survey */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Conducting Environmental Surveys
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic environmental survey before installation prevents costly errors. Document all conditions and match them to BS 7671 influence codes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Survey Checklist:</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Water exposure:</strong> Rain, splashing, immersion, humidity, condensation</li>
                <li><strong>2. Temperature range:</strong> Ambient, extremes, thermal cycling</li>
                <li><strong>3. Chemical presence:</strong> Cleaning agents, process chemicals, pollutants</li>
                <li><strong>4. Mechanical risks:</strong> Impact, vibration, vehicle traffic</li>
                <li><strong>5. UV/solar exposure:</strong> Direct sunlight, indirect through glazing</li>
                <li><strong>6. Dust/particles:</strong> Type, quantity, abrasiveness</li>
                <li><strong>7. Future changes:</strong> Planned process alterations, building modifications</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-medium text-red-400 mb-3">Food Factory Installation Failure</h3>
            <p className="text-sm text-white mb-3">
              A contractor installs PVC conduit in a food factory where regular cleaning uses caustic chemicals. Within months, the conduit is brittle and damaged—non-compliant due to poor material selection. The entire installation requires replacement at significant cost.
            </p>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Correct Approach:</p>
              <p className="text-sm text-white">
                Environmental survey identifies AF2 (chemical exposure). Specification includes chemical-resistant conduit (stainless steel or specialised polymer) and IP66-rated enclosures. Installation remains compliant and safe for decades.
              </p>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow mb-1">Key Influence Codes</p>
              <ul className="space-y-0.5 text-white/90">
                <li>AD: Water presence</li>
                <li>AE: Foreign solid bodies</li>
                <li>AF: Corrosive substances</li>
                <li>AG: Impact risk</li>
                <li>AH: Vibration</li>
                <li>AN: Solar radiation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Common IP Requirements</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Indoor dry: IP20 minimum</li>
                <li>Bathroom zones: IP44-IP67</li>
                <li>Outdoor general: IP44-IP55</li>
                <li>Food processing: IP65-IP66</li>
                <li>Submersion: IP67-IP68</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
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
            <Link to="/study-centre/upskilling/bs7671-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module3Section3;
