import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m7s3-check1",
    question: "What is the minimum IP rating for electrical equipment in agricultural buildings?",
    options: ["IP44", "IP54", "IP55", "IP65"],
    correctIndex: 0,
    explanation: "Agricultural buildings require IP44 minimum protection, though IP54 or higher is recommended for areas with dust, moisture, or corrosive atmospheres."
  },
  {
    id: "bs7671-m7s3-check2",
    question: "What maximum disconnection time applies to socket outlets in agricultural locations?",
    options: ["5 seconds", "1 second", "0.4 seconds", "0.2 seconds"],
    correctIndex: 2,
    explanation: "Socket outlets up to 32A in agricultural locations must disconnect within 0.4 seconds. The harsh environment increases shock risk."
  },
  {
    id: "bs7671-m7s3-check3",
    question: "Why are livestock at greater risk from electric shock than humans?",
    options: [
      "They are larger",
      "Lower body resistance and greater touch voltage sensitivity",
      "They are outdoors more",
      "They have wet feet"
    ],
    correctIndex: 1,
    explanation: "Livestock have lower body resistance than humans and are more sensitive to touch voltages. What might cause mild discomfort to humans can be fatal to animals."
  }
];

const faqs = [
  {
    question: "Can standard domestic wiring accessories be used in agricultural buildings?",
    answer: "No. Agricultural locations require equipment with enhanced IP ratings (minimum IP44), corrosion resistance, and mechanical protection. Standard domestic accessories don't meet these requirements."
  },
  {
    question: "Is RCD protection mandatory for all circuits in agricultural locations?",
    answer: "Yes, 30mA RCD protection is required for all circuits in agricultural and horticultural premises, including lighting and fixed equipment circuits."
  },
  {
    question: "What special requirements apply to installations near livestock?",
    answer: "Reduced touch voltage limits (25V AC), supplementary equipotential bonding of all extraneous metalwork, and protection against mechanical damage from animals are required."
  },
  {
    question: "How should cables be installed in agricultural buildings?",
    answer: "Cables should be protected against mechanical damage (SWA or conduit), UV degradation for outdoor runs, and corrosive atmospheres. Avoid running cables where livestock can access them."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An outdoor socket in a garden is fed by a cable buried in the ground. What protection must the cable have?",
  options: [
    "Standard PVC insulation only",
    "Mechanical protection (armoured cable or conduit)",
    "Fire-resistant sheath",
    "Anti-corrosion coating only"
  ],
  correctAnswer: 1,
  explanation: "Underground cables require mechanical protection, typically achieved using steel wire armoured (SWA) cable or installation in conduit, to protect against accidental damage during digging."
  }
];

const BS7671Module7Section3 = () => {
  useSEO({
    title: "Outdoor and Agricultural Installations | BS7671 Module 7.3",
    description: "Learn BS 7671 Part 705 requirements for agricultural, horticultural, and outdoor electrical installations including livestock protection."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Outdoor and Agricultural Installations
          </h1>
          <p className="text-white/80">
            Environmental challenges and livestock protection requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 705:</strong> Agricultural and horticultural premises</li>
              <li><strong>IP rating:</strong> Minimum IP44 for equipment</li>
              <li><strong>Livestock:</strong> 25V touch voltage limit</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Farms, stables, greenhouses, garden installations</li>
              <li><strong>Use:</strong> Enhanced IP ratings, SWA cables, 30mA RCD on all circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Part 705 scope and application",
              "Environmental influences on equipment selection",
              "Livestock protection requirements",
              "Cable selection and installation methods",
              "Supplementary equipotential bonding",
              "Testing requirements for agricultural locations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Environmental Influences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Agricultural and outdoor installations face severe environmental challenges that
              require equipment selection beyond normal domestic or commercial standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Influences</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Moisture:</strong> Rain, condensation, humidity</li>
                  <li><strong>Dust:</strong> Grain, hay, feed particles</li>
                  <li><strong>Corrosion:</strong> Ammonia, chemicals, fertilisers</li>
                  <li><strong>Temperature:</strong> Frost to high summer heat</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Risks</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Impact:</strong> Machinery, tools, livestock</li>
                  <li><strong>Vibration:</strong> Farm machinery operation</li>
                  <li><strong>UV degradation:</strong> Sunlight exposure</li>
                  <li><strong>Rodent damage:</strong> Cable gnawing</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP44</p>
                <p className="text-white/90 text-xs">Minimum rating</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP54/IP55</p>
                <p className="text-white/90 text-xs">Dusty environments</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP65+</p>
                <p className="text-white/90 text-xs">Wash-down areas</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Agricultural installations require enhanced protection measures due to the
              increased risk from environmental factors and the presence of livestock.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RCD Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>30mA RCD required on ALL circuits (not just socket outlets)</li>
                <li>Includes lighting, fixed equipment, and distribution circuits</li>
                <li>Consider selective RCD arrangements to prevent total loss</li>
                <li>Time-delayed RCDs at origin, 30mA at final circuits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disconnection Times:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Socket outlets ≤32A:</strong> 0.4 seconds maximum</li>
                <li><strong>Fixed equipment:</strong> 5 seconds (with conditions)</li>
                <li><strong>TT systems:</strong> RCD provides disconnection</li>
              </ul>
            </div>

            <p>
              The combination of moisture, earthed metalwork, and potential for contact with
              true earth (standing on damp ground) creates an elevated shock risk that
              necessitates these stringent requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Livestock Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Animals are significantly more vulnerable to electric shock than humans.
              Special protective measures are essential in any location where livestock
              may come into contact with electrical equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Animals Are Vulnerable</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lower body resistance than humans</li>
                  <li>Greater contact area (hooves, wet skin)</li>
                  <li>Heart closer to contact points</li>
                  <li>Unable to release grip reflexively</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Measures</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Touch voltage:</strong> 25V AC limit</li>
                  <li><strong>Bonding:</strong> All metalwork bonded</li>
                  <li><strong>Protection:</strong> Against mechanical damage</li>
                  <li><strong>Height:</strong> Out of animal reach</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supplementary Equipotential Bonding:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Bond all extraneous metalwork within livestock areas</li>
                <li>Include metal stalls, water pipes, feeding equipment</li>
                <li>Use 4mm² copper minimum for bonding conductors</li>
                <li>Verify bond resistance ≤0.05Ω in livestock areas</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cable Selection and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection for agricultural installations must account for the harsh
              environment, mechanical risks, and potential for corrosive atmospheres.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Cable Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>SWA:</strong> Mechanical protection + earth</li>
                  <li><strong>XLPE:</strong> Higher temperature rating</li>
                  <li><strong>UV resistant:</strong> For outdoor exposed runs</li>
                  <li><strong>Conduit/trunking:</strong> Additional protection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Above 2.5m height where accessible to animals</li>
                  <li>Protected by conduit in vulnerable locations</li>
                  <li>Buried cables minimum 600mm depth</li>
                  <li>Route marker tape above buried cables</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>PVC cables in exposed outdoor locations (UV)</li>
                <li>Unprotected cables where animals can reach</li>
                <li>Standard wiring accessories without IP rating</li>
                <li>Metal conduit in corrosive atmospheres without protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess environmental influences (moisture, dust, chemicals)</li>
                <li>Select equipment with appropriate IP rating</li>
                <li>Install 30mA RCD protection on all circuits</li>
                <li>Provide supplementary bonding in livestock areas</li>
                <li>Use SWA or protected cables throughout</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate IP rating:</strong> — Using domestic accessories outdoors</li>
                <li><strong>Missing bonding:</strong> — Not bonding metalwork near animals</li>
                <li><strong>PVC outdoors:</strong> — UV degradation causes failure</li>
                <li><strong>Cable routing:</strong> — Within reach of livestock</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5">
                <li>BS 7671 Part 705</li>
                <li>BS 7671 Section 705.411 (Protection)</li>
                <li>BS 7671 Section 705.415 (Bonding)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Values</p>
              <ul className="space-y-0.5">
                <li>Touch voltage: 25V AC (livestock)</li>
                <li>RCD: 30mA all circuits</li>
                <li>IP rating: IP44 minimum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-7-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-7-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module7Section3;