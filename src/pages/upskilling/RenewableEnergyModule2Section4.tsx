import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section4 = () => {
  useSEO({
    title: "Mounting Systems & Structural Considerations | Solar PV",
    description: "Understanding roof and ground mounting systems with structural analysis and engineering requirements."
  });

  const quizQuestions = [
    {
      question: "What is the additional roof loading for ballasted mounting systems?",
      options: ["5-10 kg/m squared", "15-25 kg/m squared", "30-40 kg/m squared", "50-60 kg/m squared"],
      correctAnswer: 1,
      explanation: "Ballasted systems add 15-25 kg/m squared additional roof loading to hold panels in place without penetrations."
    },
    {
      question: "Which mounting method is best for flat roofs?",
      options: ["Penetrative with tile hooks", "Ballasted or fixed", "Standing seam clamping", "Ground screws"],
      correctAnswer: 1,
      explanation: "Flat membrane roofs are ideally suited for ballasted or fixed mounting systems."
    },
    {
      question: "What is the basic wind speed range in inland UK areas?",
      options: ["15-18 m/s", "22-24 m/s", "28-30 m/s", "32-35 m/s"],
      correctAnswer: 1,
      explanation: "Inland UK areas have basic wind speeds of 22-24 m/s according to BS EN 1991-1-4."
    },
    {
      question: "Which aluminium alloy is commonly used for mounting systems?",
      options: ["2024-T3", "6061-T6", "7075-T6", "5052-H32"],
      correctAnswer: 1,
      explanation: "6061-T6 and 6063-T5 aluminium alloys are commonly used for their strength-to-weight ratio and corrosion resistance."
    },
    {
      question: "What should fastener material be for coastal installations?",
      options: ["Zinc-plated steel", "304 stainless steel", "316 stainless steel minimum", "Galvanised steel"],
      correctAnswer: 2,
      explanation: "Coastal installations require 316 stainless steel minimum for fasteners to resist salt corrosion."
    },
    {
      question: "What is the typical ground snow load range in the UK?",
      options: ["0.1-0.2 kN/m squared", "0.4-1.0 kN/m squared", "1.5-2.0 kN/m squared", "2.5-3.0 kN/m squared"],
      correctAnswer: 1,
      explanation: "UK ground snow loads typically range from 0.4-1.0 kN/m squared depending on altitude."
    },
    {
      question: "What foundation type requires minimal excavation?",
      options: ["Concrete footings", "Driven piles", "Ground screws", "Helical piles"],
      correctAnswer: 2,
      explanation: "Ground screws offer a minimal excavation alternative for ground-mounted systems."
    },
    {
      question: "What anodising thickness is recommended for marine environments?",
      options: ["10 micrometres", "15 micrometres", "25 micrometres", "50 micrometres"],
      correctAnswer: 2,
      explanation: "25 micrometres hard anodised finish is recommended for coastal/marine installations."
    },
    {
      question: "When is a chartered structural engineer required?",
      options: ["All installations", "Systems over 4kWp", "Systems over 50kWp or complex", "Only listed buildings"],
      correctAnswer: 2,
      explanation: "Systems over 50kWp or complex installations require full structural analysis by a chartered structural engineer."
    },
    {
      question: "What causes galvanic corrosion in mounting systems?",
      options: ["UV exposure", "Thermal cycling", "Direct contact between dissimilar metals", "Chemical exposure"],
      correctAnswer: 2,
      explanation: "Galvanic corrosion occurs when dissimilar metals are in direct contact in the presence of an electrolyte."
    }
  ];

  return (
    <div className="bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Mounting Systems &amp; Structural Considerations
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Roof &amp; Ground Mounting Engineering
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Ballast Weight</div>
            <div className="text-white font-semibold">15-25 kg/m²</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">UK Wind Speed</div>
            <div className="text-white font-semibold">22-29 m/s</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Understand roof vs ground mount advantages and disadvantages</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Consider wind, snow, and uplift forces in structural design</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Select proper anchoring methods and materials for different applications</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Roof Mounting Systems
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Roof-mounted systems are the most common solar installation type. Bad mounting equals system failure - structural soundness is non-negotiable in solar design.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Penetrative Mounting</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Method:</strong> Bolts penetrate roof</li>
                  <li>• <strong className="text-white">Advantages:</strong> Strong, cost-effective</li>
                  <li>• <strong className="text-white">Materials:</strong> Stainless bolts, EPDM</li>
                  <li>• <strong className="text-white">Key:</strong> Proper waterproofing</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Ballasted Mounting</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Method:</strong> Weight holds system</li>
                  <li>• <strong className="text-white">Advantages:</strong> No penetrations</li>
                  <li>• <strong className="text-white">Weight:</strong> 15-25 kg/m² loading</li>
                  <li>• <strong className="text-white">Key:</strong> Adequate roof capacity</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Roof Type Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Concrete tile:</strong> Penetrative with tile hooks, locate rafters</li>
                <li>• <strong className="text-white">Clay tile:</strong> Fragile - tile replacement or specialist fixings</li>
                <li>• <strong className="text-white">Metal/standing seam:</strong> Clamp-on systems, no penetrations</li>
                <li>• <strong className="text-white">Flat membrane:</strong> Ballasted or fixed, protect membrane</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the additional roof loading for ballasted mounting systems?"
          options={["5-10 kg/m squared", "15-25 kg/m squared", "30-40 kg/m squared"]}
          correctIndex={1}
          explanation="Ballasted systems add 15-25 kg/m squared to hold panels in place without penetrating the roof."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wind Load Calculations (BS EN 1991)
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Wind loading is often the governing design factor for solar mounting systems. BS EN 1991-1-4 provides the framework for wind load calculations in the UK.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Key Wind Factors</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Basic speed:</strong> 21-29 m/s in UK</li>
                  <li>• <strong className="text-white">Terrain:</strong> Affects exposure</li>
                  <li>• <strong className="text-white">Building height:</strong> Higher = more load</li>
                  <li>• <strong className="text-white">Panel position:</strong> Edge/corner zones</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Critical Load Cases</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Uplift:</strong> Negative pressure lifts</li>
                  <li>• <strong className="text-white">Positive:</strong> Wind pushing down</li>
                  <li>• <strong className="text-white">Lateral:</strong> Horizontal forces</li>
                  <li>• <strong className="text-white">Edge effects:</strong> Higher loads</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">UK Design Wind Speeds:</h4>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="font-medium text-white">Inland</p>
                  <p>22-24 m/s</p>
                </div>
                <div>
                  <p className="font-medium text-white">Coastal</p>
                  <p>26-28 m/s</p>
                </div>
                <div>
                  <p className="font-medium text-white">Scotland/Exposed</p>
                  <p>Up to 29 m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the basic wind speed range in inland UK areas?"
          options={["15-18 m/s", "22-24 m/s", "28-30 m/s"]}
          correctIndex={1}
          explanation="Inland UK areas have basic wind speeds of 22-24 m/s according to BS EN 1991-1-4."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Structural Material Selection
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Material selection affects system longevity, maintenance requirements, and structural performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Aluminium Systems</h4>
                <ul className="text-sm space-y-1">
                  <li>• Lightweight, corrosion resistant</li>
                  <li>• 6061-T6, 6063-T5 alloys</li>
                  <li>• Good strength-to-weight ratio</li>
                  <li>• 25+ year lifespan</li>
                  <li>• Higher cost, lower maintenance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Steel Systems</h4>
                <ul className="text-sm space-y-1">
                  <li>• High strength, lower cost</li>
                  <li>• Galvanised or stainless</li>
                  <li>• Requires protective coatings</li>
                  <li>• Heavier than aluminium</li>
                  <li>• Ground mount preferred</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Material Compatibility:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Galvanic corrosion:</strong> Avoid dissimilar metal contact</li>
                <li>• <strong className="text-white">Fasteners:</strong> Match material to structure (stainless preferred)</li>
                <li>• <strong className="text-white">Coastal:</strong> 316 stainless, 25μm anodising, marine-grade</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Which fastener material is required for coastal installations?"
          options={["Zinc-plated steel", "304 stainless steel", "316 stainless steel minimum"]}
          correctIndex={2}
          explanation="Coastal installations require 316 stainless steel minimum to resist salt corrosion."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ground Mount Systems
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Ground-mounted systems offer flexibility in orientation and tilt but require foundation design and site preparation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Foundation Types</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Concrete footings:</strong> Most robust</li>
                  <li>• <strong className="text-white">Driven piles:</strong> Steel posts</li>
                  <li>• <strong className="text-white">Helical piles:</strong> Difficult soils</li>
                  <li>• <strong className="text-white">Ground screws:</strong> Minimal excavation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Ground Mount Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• Optimal orientation possible</li>
                  <li>• Easy maintenance access</li>
                  <li>• Better air circulation/cooling</li>
                  <li>• Easy to expand</li>
                  <li>• Tracking options available</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Site Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Soil conditions:</strong> Geotechnical survey for large systems</li>
                <li>• <strong className="text-white">Drainage:</strong> Prevent water pooling</li>
                <li>• <strong className="text-white">Access:</strong> Maintenance vehicle routes</li>
                <li>• <strong className="text-white">Security:</strong> Fencing and anti-theft measures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Structural Assessment Requirements
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The level of structural assessment required depends on system size, complexity, and building type.
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">&lt; 4kWp domestic</span>
                <span className="text-sm">Basic check by installer</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">4-50kWp commercial</span>
                <span className="text-sm">Structural engineer review</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">&gt; 50kWp or complex</span>
                <span className="text-sm">Chartered engineer required</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">Listed buildings</span>
                <span className="text-sm">Conservation specialist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Practical Guidance</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <strong className="text-white">Always locate rafters:</strong> Use a stud finder or measure from roof void before drilling any penetrations.
            </p>
            <p>
              <strong className="text-white">Waterproofing is critical:</strong> Use proper EPDM flashings, butyl tape, and sealants - failures cause expensive water damage.
            </p>
            <p>
              <strong className="text-white">Leave safety margins:</strong> Design for 900V when 1000V is the limit; account for worst-case wind and snow combinations.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Can any roof support solar panels?</h4>
              <p className="text-white/70 text-sm">Most roofs can support solar, but older or weaker structures may need reinforcement. Always assess roof age, condition, and loading capacity before installation.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What causes roof leaks after solar installation?</h4>
              <p className="text-white/70 text-sm">Improper waterproofing of penetrations, damaged tiles during installation, or failed sealants over time. Using proper flashing systems and quality sealants prevents most issues.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why is edge mounting more challenging?</h4>
              <p className="text-white/70 text-sm">Wind loads increase significantly near building edges due to wind flow patterns. Edge and corner zones can experience 2-3 times higher loads than central areas.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">When should I choose ground mount over roof mount?</h4>
              <p className="text-white/70 text-sm">Consider ground mount when roof orientation is poor, structural capacity is limited, shading is unavoidable, or you need tracking systems. Also preferred for large commercial installations.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do I prevent galvanic corrosion?</h4>
              <p className="text-white/70 text-sm">Use isolation materials between dissimilar metals, specify compatible fasteners (stainless with aluminium is acceptable), and use appropriate coatings for steel components.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is the warranty period for mounting systems?</h4>
              <p className="text-white/70 text-sm">Quality mounting systems offer 10-25 year warranties. Match mounting system warranty to panel warranty - the structure should outlast the panels it supports.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 4 Quiz: Mounting Systems"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="../section-5">
              Next Section
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section4;
