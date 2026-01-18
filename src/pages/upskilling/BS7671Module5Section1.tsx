import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ip65-meaning",
    question: "What does IP65 indicate in equipment specification?",
    options: ["Limited dust ingress, dripping water protection", "Dust tight, protection against water jets from any direction", "Complete dust protection, protection against immersion", "No dust protection, splashing water protection"],
    correctIndex: 1,
    explanation: "IP65 means the equipment is dust-tight (6) and protected against water jets from any direction (5), making it suitable for harsh industrial environments."
  },
  {
    id: "temp-rating-why",
    question: "Why must temperature ratings be considered in equipment selection?",
    options: ["To comply with colour coding", "To ensure equipment operates safely within thermal limits and doesn't degrade", "To determine voltage rating", "To calculate installation cost"],
    correctIndex: 1,
    explanation: "Temperature ratings ensure equipment operates safely within thermal limits, preventing overheating, insulation breakdown, and premature failure."
  },
  {
    id: "under-rated-switchgear",
    question: "What could happen if switchgear is under-rated for the current load?",
    options: ["Improved efficiency", "Overheating, contact welding, fire risk, and system failure", "Reduced maintenance", "Better power factor"],
    correctIndex: 1,
    explanation: "Under-rated switchgear can overheat, leading to contact welding, arcing, fire risk, and catastrophic system failure due to inability to handle the current safely."
  }
];

const faqs = [
  {
    question: "What's the relationship between IP rating and installation location?",
    answer: "IP rating must match environmental conditions: IP20 for indoor dry locations, IP44+ for bathrooms, IP65+ for outdoor/washdown areas, IP67+ for underground applications."
  },
  {
    question: "Why are manufacturer instructions legally important?",
    answer: "Following manufacturer instructions is a legal requirement under BS 7671. Non-compliance can void warranties, create liability issues, and compromise safety and insurance coverage."
  },
  {
    question: "How do I select equipment for high ambient temperatures?",
    answer: "Apply derating factors from manufacturer data, or select equipment with higher temperature ratings. Standard ratings assume 30-40°C ambient - higher temperatures require capacity reduction."
  },
  {
    question: "What's the significance of insulation classes?",
    answer: "Insulation classes (A, B, F, H) indicate maximum continuous operating temperatures: A=105°C, B=130°C, F=155°C, H=180°C. Higher classes suit higher-temperature applications."
  }
];

const quizQuestion = {
  question: "Which regulation in BS 7671 covers equipment suitability?",
  options: [
    "Part 3 - Assessment of general characteristics",
    "Part 5 - Selection and erection of equipment",
    "Part 4 - Protection for safety",
    "Part 6 - Inspection and testing"
  ],
  correctAnswer: 1,
  explanation: "Part 5 of BS 7671 covers the selection and erection of equipment, including requirements for suitability, ratings, and environmental considerations."
};

const BS7671Module5Section1 = () => {
  useSEO({
    title: "Equipment Ratings and Suitability | BS7671 Module 5.1",
    description: "Learn about equipment ratings, IP protection, temperature considerations, and suitability assessment for BS 7671 compliant installations."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
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
            <span>Module 5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Equipment Ratings and Suitability
          </h1>
          <p className="text-white/80">
            Ensuring Appropriate Equipment Selection
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage:</strong> Rating must exceed system voltage + variations</li>
              <li><strong>Current:</strong> Match load, fault levels, and future growth</li>
              <li><strong>IP Rating:</strong> Select for environment (dust/water ingress)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Equipment labels, data plates, manufacturer specs</li>
              <li><strong>Use:</strong> Match ratings to application requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand voltage, current, and temperature ratings",
              "Identify how suitability is determined by environment",
              "Apply IP ratings for equipment protection selection",
              "Follow manufacturer requirements and compatibility"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Voltage and Current */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage and Current Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment must be rated to match or exceed supply conditions and operating parameters to ensure safe and reliable operation throughout its expected lifetime.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Nominal:</strong> Rating must meet/exceed system voltage</li>
                  <li><strong>Variations:</strong> Allow for ±10% on LV systems</li>
                  <li><strong>Insulation:</strong> Withstand overvoltages and surges</li>
                  <li><strong>Altitude:</strong> Effects on insulation strength</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Continuous:</strong> Normal operating current capacity</li>
                  <li><strong>Load Growth:</strong> Future expansion allowance</li>
                  <li><strong>Fault Current:</strong> Breaking and making capacity</li>
                  <li><strong>Derating:</strong> Temperature and installation effects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Temperature Ratings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Temperature Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature ratings ensure equipment operates safely within thermal limits and doesn't degrade prematurely. Both ambient and operating temperatures must be considered.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ambient Temperature</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standard:</strong> Typically -5°C to +40°C</li>
                  <li><strong>Extended:</strong> -25°C to +55°C available</li>
                  <li><strong>Consider:</strong> Seasonal variations, solar exposure</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Classes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Class A:</strong> 105°C continuous</li>
                  <li><strong>Class B:</strong> 130°C continuous</li>
                  <li><strong>Class F:</strong> 155°C continuous</li>
                  <li><strong>Class H:</strong> 180°C continuous</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: IP Ratings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ingress Protection (IP) Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP ratings define protection levels against solid objects (dust) and liquids (water). Proper selection prevents equipment damage and ensures safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Digit (Solids)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IP2X:</strong> Finger protection ({'>'}12.5mm)</li>
                  <li><strong>IP4X:</strong> Tool protection ({'>'}1mm)</li>
                  <li><strong>IP5X:</strong> Dust protected</li>
                  <li><strong>IP6X:</strong> Dust tight</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Second Digit (Liquids)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IPX4:</strong> Splashing water</li>
                  <li><strong>IPX5:</strong> Water jets</li>
                  <li><strong>IPX6:</strong> Powerful jets</li>
                  <li><strong>IPX7/8:</strong> Immersion</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP20</p>
                <p className="text-white/90 text-xs">Indoor dry locations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP44/IP65</p>
                <p className="text-white/90 text-xs">Bathrooms/outdoor</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IP67</p>
                <p className="text-white/90 text-xs">Underground</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Environmental Exposure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Environmental Exposure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment must be suitable for environmental conditions throughout its operational life, including heat, moisture, corrosion, and mechanical stress.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature:</strong> Ambient ranges, solar radiation</li>
                  <li><strong>Humidity:</strong> Condensation risk</li>
                  <li><strong>Mechanical:</strong> Vibration, impact, wind</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chemical Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Corrosion:</strong> Salt spray, industrial chemicals</li>
                  <li><strong>Contamination:</strong> Dust, oil, biological</li>
                  <li><strong>Materials:</strong> UV-resistant, chemical-resistant</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Manufacturer Instructions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Manufacturer Instructions and Compatibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Manufacturer instructions provide essential legal compliance requirements and specific installation parameters necessary for safe, reliable operation and regulatory compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Mounting orientations and clearances</li>
                  <li>Connection torque specifications</li>
                  <li>Earthing and bonding requirements</li>
                  <li>Environmental condition limits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Aspects</p>
                <ul className="text-sm text-white space-y-1">
                  <li>BS 7671 and product standard conformity</li>
                  <li>CE/UKCA marking requirements</li>
                  <li>Warranty and liability implications</li>
                  <li>Documentation and certification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warehouse Socket Outlet Installation</p>
              <p className="text-sm mb-3">
                You're installing socket outlets in a warehouse with damp conditions and occasional water spray from cleaning operations.
              </p>
              <p className="text-sm mb-2">
                <strong>Assessment:</strong> IP44 minimum, but IP65 recommended for cleaning operations. Corrosion-resistant materials needed.
              </p>
              <p className="text-sm mb-2">
                <strong>Selection:</strong> Industrial socket outlets IP65 rated, appropriate current ratings for expected loads, MCB coordination verified.
              </p>
              <p className="text-sm">
                <strong>Outcome:</strong> Safe, reliable installation suitable for industrial environment with extended service life.
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Common IP Ratings</p>
              <ul className="space-y-0.5">
                <li>IP20: Indoor dry</li>
                <li>IP44: Bathroom zones</li>
                <li>IP65: Outdoor/industrial</li>
                <li>IP67: Underground</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Insulation Classes</p>
              <ul className="space-y-0.5">
                <li>Class A: 105°C</li>
                <li>Class B: 130°C</li>
                <li>Class F: 155°C</li>
                <li>Class H: 180°C</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-5-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module5Section1;
