/**
 * Level 3 Module 2 Section 1.4 - Energy Performance Certificates (EPCs)
 *
 * Understanding EPCs and their role in building energy efficiency compliance
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Energy Performance Certificates (EPCs) - Level 3 Module 2 Section 1.4";
const DESCRIPTION = "Understanding Energy Performance Certificates and how electrical installations affect building energy ratings. EPC compliance for electricians.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does an EPC rating of 'A' indicate?",
    options: [
      "Average energy performance",
      "The most energy efficient rating",
      "Acceptable but not efficient",
      "Assessment not complete"
    ],
    correctIndex: 1,
    explanation: "EPC ratings run from A to G, with A being the most energy efficient and G being the least efficient. An A rating indicates excellent energy performance."
  },
  {
    id: "check-2",
    question: "When is an EPC legally required for a property?",
    options: [
      "Only when building new properties",
      "When selling, renting, or building a property",
      "Every five years for all buildings",
      "Only for commercial properties"
    ],
    correctIndex: 1,
    explanation: "EPCs are legally required when a property is sold, let, or constructed. They must be made available to prospective buyers or tenants and are valid for 10 years."
  },
  {
    id: "check-3",
    question: "How long is an EPC valid for?",
    options: [
      "1 year",
      "5 years",
      "10 years",
      "Indefinitely"
    ],
    correctIndex: 2,
    explanation: "An EPC is valid for 10 years from the date of issue. A new certificate is only required when selling or letting, or if the owner wants an updated assessment after making improvements."
  },
  {
    id: "check-4",
    question: "Which electrical improvement is most likely to improve an EPC rating?",
    options: [
      "Installing more socket outlets",
      "Upgrading to LED lighting throughout",
      "Adding a larger consumer unit",
      "Installing additional circuits"
    ],
    correctIndex: 1,
    explanation: "LED lighting significantly reduces energy consumption compared to traditional lighting, which improves the building's energy efficiency and therefore its EPC rating."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "EPCs rate properties on a scale from:",
    options: [
      "1 to 10",
      "A to G",
      "Bronze to Platinum",
      "Low to High"
    ],
    correctAnswer: 1,
    explanation: "EPCs use a scale from A to G, similar to appliance energy labels. A is the most efficient (lowest running costs) and G is the least efficient."
  },
  {
    id: 2,
    question: "An EPC must be produced by:",
    options: [
      "Any qualified electrician",
      "The property owner",
      "An accredited Domestic Energy Assessor (DEA)",
      "Building Control"
    ],
    correctAnswer: 2,
    explanation: "EPCs can only be produced by accredited Domestic Energy Assessors (DEAs) for dwellings, or Non-Domestic Energy Assessors (NDEAs) for commercial buildings."
  },
  {
    id: 3,
    question: "What is the minimum EPC rating required for rental properties in England and Wales?",
    options: [
      "Rating D",
      "Rating E",
      "Rating C",
      "No minimum requirement"
    ],
    correctAnswer: 1,
    explanation: "The Minimum Energy Efficiency Standards (MEES) require rental properties to have a minimum EPC rating of E. Properties rated F or G cannot legally be let unless exempt."
  },
  {
    id: 4,
    question: "Which of these electrical installations would NOT typically improve an EPC rating?",
    options: [
      "Solar PV panels",
      "LED lighting upgrade",
      "Additional socket outlets",
      "Smart heating controls"
    ],
    correctAnswer: 2,
    explanation: "Additional socket outlets don't affect energy efficiency. Solar PV, LED lighting, and smart heating controls all reduce energy consumption or generate renewable energy, improving the EPC rating."
  },
  {
    id: 5,
    question: "How does solar PV affect an EPC assessment?",
    options: [
      "It has no effect on EPC ratings",
      "It improves the rating by reducing net energy consumption",
      "It only affects commercial EPCs",
      "It requires a separate certificate"
    ],
    correctAnswer: 1,
    explanation: "Solar PV significantly improves EPC ratings because it generates renewable electricity on-site, reducing the building's net energy consumption from the grid."
  },
  {
    id: 6,
    question: "The EPC report includes:",
    options: [
      "Only the current energy rating",
      "Current rating and recommended improvements",
      "Only recommended improvements",
      "Building insurance information"
    ],
    correctAnswer: 1,
    explanation: "EPCs include both the current energy efficiency rating and a list of recommended improvements with their potential impact on the rating and estimated costs."
  },
  {
    id: 7,
    question: "What lighting type provides the best contribution to EPC ratings?",
    options: [
      "Halogen lighting",
      "Compact fluorescent (CFL)",
      "LED lighting",
      "Standard incandescent"
    ],
    correctAnswer: 2,
    explanation: "LED lighting is the most energy efficient, typically achieving over 100 lumens per watt. This provides the best contribution to EPC ratings compared to other lighting technologies."
  },
  {
    id: 8,
    question: "Which heating system type would typically achieve the best EPC rating when combined with renewable electricity?",
    options: [
      "Gas boiler",
      "Oil boiler",
      "Heat pump",
      "Electric resistance heating"
    ],
    correctAnswer: 2,
    explanation: "Heat pumps are 3-4 times more efficient than direct electric heating. Combined with renewable electricity (or grid electricity which is decarbonising), they achieve excellent EPC ratings."
  },
  {
    id: 9,
    question: "Smart heating controls improve EPC ratings because they:",
    options: [
      "Look modern and attractive",
      "Allow more precise control reducing wasted energy",
      "Are required by Building Regulations",
      "Connect to the internet"
    ],
    correctAnswer: 1,
    explanation: "Smart heating controls improve efficiency by enabling more precise temperature control, scheduling, and zone control, reducing wasted energy from heating unoccupied spaces or overheating."
  },
  {
    id: 10,
    question: "From 2025, the government proposes rental properties should achieve minimum rating of:",
    options: [
      "Rating E",
      "Rating D",
      "Rating C",
      "Rating B"
    ],
    correctAnswer: 2,
    explanation: "The government has proposed raising the minimum EPC requirement for rental properties to band C from 2025 for new tenancies. This will require significant upgrades to many properties."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do electricians need to understand EPCs?",
    answer: "Yes, understanding EPCs helps electricians advise customers on improvements that will benefit their property's energy rating. Installing efficient lighting, solar PV, smart controls, and EV charging points can all positively impact EPC ratings and property value."
  },
  {
    question: "Can I produce an EPC as a qualified electrician?",
    answer: "No, EPCs can only be produced by accredited energy assessors (DEAs or NDEAs). However, you can work alongside assessors and provide information about electrical installations. Your work in upgrading lighting and installing renewable technologies directly affects the rating achieved."
  },
  {
    question: "What happens if a rental property fails to meet minimum EPC requirements?",
    answer: "Landlords who let properties below the minimum E rating can face penalties of up to £5,000 per property. They must either improve the property or register a valid exemption. The fines for non-compliance increase for continued breaches."
  },
  {
    question: "How much can LED lighting improve an EPC rating?",
    answer: "Upgrading all lighting to LED can improve an EPC by several points. The exact impact depends on the starting point and the proportion of total energy used for lighting. Combined with other measures, it can be the difference between EPC bands."
  },
  {
    question: "Does EV charging affect EPC ratings?",
    answer: "Standard EV charging doesn't directly appear in current EPC assessments as it's a vehicle charger rather than a building system. However, smart charging with solar PV integration can demonstrate lower overall energy consumption for the property."
  },
  {
    question: "Are there exemptions from EPC requirements?",
    answer: "Yes, some properties are exempt including listed buildings where improvements would unacceptably alter their character, temporary buildings, and certain industrial sites. Landlords can also claim exemptions if all cost-effective improvements have been made but the property still doesn't reach E rating."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Performance Certificates
          </h1>
          <p className="text-white/80">
            Understanding EPCs and how electrical work affects energy ratings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EPC scale:</strong> A (best) to G (worst)</li>
              <li><strong>Validity:</strong> 10 years</li>
              <li><strong>Minimum rental:</strong> Currently E, proposed C from 2025</li>
              <li><strong>Required:</strong> When selling, letting, or building</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> EPC displayed in property listings</li>
              <li><strong>Use:</strong> Recommend LED upgrades to improve rating</li>
              <li><strong>Apply:</strong> Install solar PV to boost EPC significantly</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "What EPCs are and how the rating system works",
              "Legal requirements for EPC display and compliance",
              "How electrical installations affect EPC ratings",
              "MEES regulations for rental properties",
              "Electrical improvements that boost EPC ratings",
              "Working with energy assessors"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is an EPC?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Energy Performance Certificate (EPC) rates a building's energy efficiency on a scale from A (most efficient) to G (least efficient). It provides an estimate of energy costs and recommends improvements. EPCs are required when buildings are sold, let, or constructed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EPC ratings explained:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A (92-100):</strong> Extremely efficient - lowest energy bills</li>
                <li><strong>B (81-91):</strong> Very efficient - typical for new builds</li>
                <li><strong>C (69-80):</strong> Good efficiency - target for most upgrades</li>
                <li><strong>D (55-68):</strong> Average efficiency - typical older properties</li>
                <li><strong>E (39-54):</strong> Minimum legal requirement for rentals</li>
                <li><strong>F (21-38) / G (1-20):</strong> Poor efficiency - cannot be legally let</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> EPCs are produced by accredited energy assessors, not electricians. However, your installation work directly impacts the rating achieved.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Legal Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Energy Performance of Buildings Regulations require EPCs whenever a property is built, sold, or let. The Minimum Energy Efficiency Standards (MEES) set minimum ratings for rental properties, with significant penalties for non-compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Marketing property for sale or let</li>
                  <li>Before construction work completes</li>
                  <li>Available to prospective buyers/tenants</li>
                  <li>Displayed in commercial buildings over 250m2</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEES Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum E rating for rental properties</li>
                  <li>Proposed C rating from 2025</li>
                  <li>Penalties up to £5,000 for non-compliance</li>
                  <li>Exemptions available in certain cases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Installations and EPC Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several types of electrical installation directly impact EPC ratings. Understanding this helps you advise customers and provide services that add value to their properties beyond just the installation itself.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A landlord needs to improve their rental property from E to D before reletting. By installing LED lighting throughout and adding smart heating controls, you help them achieve this upgrade while also reducing tenant energy bills.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">High-impact electrical improvements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Solar PV:</strong> Major positive impact - can move up multiple bands</li>
                <li><strong>LED lighting:</strong> Moderate impact - better with low-energy fittings</li>
                <li><strong>Heat pump circuits:</strong> High impact when replacing gas/oil</li>
                <li><strong>Smart heating controls:</strong> Moderate impact - improves efficiency</li>
                <li><strong>Battery storage:</strong> Enhances solar PV benefit</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Future EPC Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The government is progressively tightening EPC requirements as part of Net Zero commitments. Understanding future requirements helps you advise customers on future-proofing their properties and creates business opportunities.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2025</p>
                <p className="text-white/90 text-xs">Proposed minimum C for new tenancies</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2028</p>
                <p className="text-white/90 text-xs">All rental properties to meet new minimum</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2030+</p>
                <p className="text-white/90 text-xs">Potentially higher standards required</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Properties requiring upgrades to meet future EPC minimums represent significant work opportunities. Helping customers plan ahead positions you as a knowledgeable advisor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask if they have an EPC and what rating they need to achieve</li>
                <li>Explain how your proposed work will impact their rating</li>
                <li>Suggest complementary improvements (e.g., solar + battery)</li>
                <li>Consider future minimum requirements when specifying</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">High-Value EPC Improvements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Solar PV installation (largest single improvement)</li>
                <li>Heat pump circuit installation</li>
                <li>Complete LED lighting upgrade</li>
                <li>Smart heating control installation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Claiming EPC expertise</strong> - Only accredited assessors can produce EPCs</li>
                <li><strong>Guaranteeing specific improvements</strong> - EPC impact varies by property</li>
                <li><strong>Ignoring future requirements</strong> - Today's standard may not meet 2025 rules</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">EPC Basics</p>
                <ul className="space-y-0.5">
                  <li>Rating: A (best) to G (worst)</li>
                  <li>Valid for: 10 years</li>
                  <li>Produced by: Accredited assessors</li>
                  <li>Required: Sale, let, or construction</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Electrical Impact</p>
                <ul className="space-y-0.5">
                  <li>Solar PV: High positive impact</li>
                  <li>LED lighting: Moderate impact</li>
                  <li>Heat pumps: High impact</li>
                  <li>Smart controls: Moderate impact</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section1_4;
