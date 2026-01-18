import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ip65-protection",
    question: "What does IP65 protection provide against?",
    options: [
      "Dust ingress only",
      "Water jets from any direction and complete dust protection",
      "Water immersion only",
      "Basic splash protection"
    ],
    correctIndex: 1,
    explanation: "IP65 provides complete protection against dust ingress (first digit 6) and protection against water jets from any direction (second digit 5)."
  },
  {
    id: "fire-alarm-cable",
    question: "According to BS7671, which cable type is required for fire alarm circuits in escape routes?",
    options: [
      "Standard PVC cable",
      "Fire resistant cable with enhanced fire performance",
      "Armoured cable only",
      "Any cable with IP65 rating"
    ],
    correctIndex: 1,
    explanation: "Fire alarm circuits in escape routes must use fire resistant cables that maintain circuit integrity during fire conditions to ensure continued operation."
  },
  {
    id: "outdoor-factors",
    question: "What environmental factors must be considered when selecting outdoor electrical equipment?",
    options: [
      "Temperature range only",
      "UV radiation only",
      "Temperature range, UV radiation, moisture, and corrosive atmospheres",
      "Aesthetic appearance"
    ],
    correctIndex: 2,
    explanation: "All environmental factors including temperature extremes, UV radiation, moisture ingress, and potential corrosive atmospheres must be considered for outdoor installations."
  }
];

const faqs = [
  {
    question: "What is the purpose of environmental protection in BS7671?",
    answer: "Environmental protection ensures electrical equipment can safely operate in its intended environment throughout its service life, protecting against moisture, dust, chemicals, temperature extremes, and other external influences."
  },
  {
    question: "How do I determine the right IP rating for an installation?",
    answer: "Consider all environmental factors: indoor/outdoor location, exposure to water, dust levels, humidity, temperature variations, and any corrosive atmospheres. BS7671 provides guidance for special locations like bathrooms."
  },
  {
    question: "When is fire resistant cabling required?",
    answer: "Fire resistant cables are required for life safety systems that must continue operating during a fire - including fire alarms, emergency lighting, smoke extraction systems, and emergency voice communication systems."
  },
  {
    question: "What's the relationship between IP rating and fire resistance?",
    answer: "They address different hazards - IP ratings protect against environmental ingress (dust/water) while fire resistance maintains circuit integrity during fire. Equipment may need both depending on the application."
  }
];

const quizQuestion = {
  question: "Which IP rating is typically required for bathroom Zone 1 installations?",
  options: [
    "IP20",
    "IP44",
    "IPX4 minimum",
    "IP65"
  ],
  correctAnswer: 2,
  explanation: "Bathroom Zone 1 requires IPX4 minimum protection against water splashing from any direction, with higher ratings acceptable."
};

const BS7671Module5Section6 = () => {
  useSEO({
    title: "Environmental Protection Requirements | BS7671 Module 5.6",
    description: "Learn about environmental protection requirements including IP ratings, fire resistance, and corrosion protection per BS7671."
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
            <Link to="/electrician/upskilling/bs7671-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Protection Requirements
          </h1>
          <p className="text-white/80">
            Comprehensive requirements for protecting electrical equipment
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Environment:</strong> Consider all external influences</li>
              <li><strong>IP selection:</strong> Match rating to conditions</li>
              <li><strong>Fire circuits:</strong> Maintain integrity in fire</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Factors</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Moisture:</strong> Water, humidity, condensation</li>
              <li><strong>Contamination:</strong> Dust, chemicals, pollution</li>
              <li><strong>Temperature:</strong> Extremes and cycling</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How to assess environmental factors for equipment selection",
              "Requirements for different location categories",
              "Fire resistance requirements for safety circuits",
              "Practical application of protection requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Environmental Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Environmental Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS7671 requires equipment to be suitable for the environmental conditions it will encounter. This includes assessing external influences that could affect performance and safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Influences (A Codes)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>AA:</strong> Ambient temperature</li>
                  <li><strong>AB:</strong> Atmospheric humidity</li>
                  <li><strong>AC:</strong> Altitude</li>
                  <li><strong>AD:</strong> Presence of water</li>
                  <li><strong>AE:</strong> Presence of foreign solid bodies</li>
                  <li><strong>AF:</strong> Corrosive substances</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Location:</strong> Indoor, outdoor, underground</li>
                  <li><strong>Exposure:</strong> Direct weather, sheltered</li>
                  <li><strong>Activity:</strong> Industrial process, clean environment</li>
                  <li><strong>Maintenance:</strong> Access frequency, cleaning</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2: Location Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Location Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different locations have specific requirements based on their environmental characteristics. BS7671 Part 7 covers special installations and locations.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-2">Bathrooms & Showers</p>
                <p className="text-sm text-white/90 mb-3">Water and humidity exposure</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Zone-based IP requirements</li>
                  <li>• SELV/PELV in zones 0 and 1</li>
                  <li>• Supplementary bonding</li>
                  <li>• RCD protection 30mA</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-orange-400 mb-2">Swimming Pools</p>
                <p className="text-sm text-white/90 mb-3">Wet environment, conductive</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Zone 0, 1, 2 definitions</li>
                  <li>• Restricted equipment types</li>
                  <li>• Enhanced bonding requirements</li>
                  <li>• Chemical resistance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-red-400 mb-2">Agricultural & Horticultural</p>
                <p className="text-sm text-white/90 mb-3">Dust, moisture, animals</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Higher IP ratings needed</li>
                  <li>• Rodent protection</li>
                  <li>• Corrosion from ammonia</li>
                  <li>• Fire risk from combustibles</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3: Fire Safety Circuits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Safety Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuits for life safety systems must maintain operation during fire conditions. BS7671 and BS5839 provide requirements for fire-resistant installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire-Resistant Circuit Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cables:</strong> Fire-resistant type (FP, MI)</li>
                  <li><strong>Supports:</strong> Fire-rated fixings</li>
                  <li><strong>Segregation:</strong> From other cables</li>
                  <li><strong>Testing:</strong> Enhanced inspection regime</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Integrity Durations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>30 minutes:</strong> Small single-storey</li>
                  <li><strong>60 minutes:</strong> Multi-storey buildings</li>
                  <li><strong>120 minutes:</strong> High-rise, complex</li>
                  <li><strong>180 minutes:</strong> Special applications</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Systems Requiring Fire-Resistant Wiring:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Fire Detection</p>
                  <p className="text-white/90 text-xs">Alarm and detection</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Emergency Lighting</p>
                  <p className="text-white/90 text-xs">Escape illumination</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Smoke Control</p>
                  <p className="text-white/90 text-xs">Extract ventilation</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Firefighting Lifts</p>
                  <p className="text-white/90 text-xs">Fire service use</p>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4: Practical Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When applying environmental protection requirements, practical factors must be considered alongside regulatory compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Accessibility:</strong> Maintenance access</li>
                  <li><strong>Ventilation:</strong> Heat dissipation</li>
                  <li><strong>Drainage:</strong> Moisture management</li>
                  <li><strong>Cable routes:</strong> Protected runs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Inspection:</strong> Visual checks for damage</li>
                  <li><strong>Seals:</strong> Regular replacement</li>
                  <li><strong>Cleaning:</strong> Contamination removal</li>
                  <li><strong>Testing:</strong> Insulation resistance</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Common Installation Mistakes</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li><strong>Under-specifying:</strong> Not considering worst-case conditions</li>
                <li><strong>Cable entry:</strong> Unsealed or incorrectly sealed glands</li>
                <li><strong>Condensation:</strong> Not providing drainage or heating</li>
                <li><strong>UV exposure:</strong> Using non-UV stable materials outdoors</li>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">External Influences</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Temperature (AA)</li>
                <li>• Humidity (AB)</li>
                <li>• Water presence (AD)</li>
                <li>• Corrosive substances (AF)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Special Locations</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Bathrooms (Part 701)</li>
                <li>• Swimming pools (Part 702)</li>
                <li>• Agricultural (Part 705)</li>
                <li>• Construction sites (Part 704)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Fire Circuits</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Fire-resistant cables</li>
                <li>• Fire-rated supports</li>
                <li>• Segregation required</li>
                <li>• Enhanced testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
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
            <Link to="/study-centre/upskilling/bs7671-module-5-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6">
              Next: Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module5Section6;
