/**
 * Level 3 Module 2 Section 1.5 - Local Authority Requirements
 *
 * Local authority planning and environmental requirements for electrical installations
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
const TITLE = "Local Authority Requirements - Level 3 Module 2 Section 1.5";
const DESCRIPTION = "Understanding local authority planning permissions and requirements for electrical installations including solar PV, EV charging, and battery storage.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under what circumstances might solar PV panels require planning permission?",
    options: [
      "All solar PV installations require planning permission",
      "Never - solar is always permitted development",
      "When panels protrude more than 200mm, are on listed buildings, or in conservation areas",
      "Only commercial installations need permission"
    ],
    correctIndex: 2,
    explanation: "Solar PV is usually permitted development, but planning permission may be required if panels protrude significantly from the roof plane, or the property is listed or in a conservation area."
  },
  {
    id: "check-2",
    question: "What is 'permitted development' in relation to electrical installations?",
    options: [
      "Development that the electrician permits",
      "Work that doesn't require planning permission",
      "Work approved by Building Control",
      "Development permitted by the DNO"
    ],
    correctIndex: 1,
    explanation: "Permitted development refers to certain types of work that can be carried out without needing to apply for planning permission, as they're automatically granted under planning legislation."
  },
  {
    id: "check-3",
    question: "Who should you contact before installing solar PV on a listed building?",
    options: [
      "Only the electricity supplier",
      "The local planning authority for listed building consent",
      "The fire service",
      "No one - solar is always allowed"
    ],
    correctIndex: 1,
    explanation: "Listed buildings require listed building consent for any alterations that affect their character. Solar PV installations on listed buildings need approval from the local planning authority."
  },
  {
    id: "check-4",
    question: "What is a DNO and why are they relevant to electrical installations?",
    options: [
      "District Network Operator - they manage local roads",
      "Distribution Network Operator - they manage the electricity grid connection",
      "Domestic Notice Officer - they inspect installations",
      "Development Notice Organisation - they approve planning"
    ],
    correctIndex: 1,
    explanation: "The Distribution Network Operator (DNO) manages the local electricity distribution network. They must be notified of generation equipment connections (like solar PV) and may need to approve increased supply capacity."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Permitted development rights for solar PV installations typically apply to:",
    options: [
      "All properties including listed buildings",
      "Residential properties not in conservation areas or Article 4 areas",
      "Commercial properties only",
      "Properties with planning permission obtained before 2010"
    ],
    correctAnswer: 1,
    explanation: "Permitted development rights for solar PV generally apply to standard residential properties. Listed buildings, conservation areas, and Article 4 direction areas may have restricted permitted development rights."
  },
  {
    id: 2,
    question: "Before installing a ground-mounted solar array, you should check:",
    options: [
      "Nothing - ground-mounted systems don't need permission",
      "Size limits, distance from boundaries, and any local restrictions",
      "Only the panel manufacturer's warranty",
      "Just the structural capacity of the ground"
    ],
    correctAnswer: 1,
    explanation: "Ground-mounted solar arrays have permitted development limits including size restrictions (typically 9m2 area, 4m height) and distance from boundaries. Local restrictions may also apply."
  },
  {
    id: 3,
    question: "An Article 4 direction allows local authorities to:",
    options: [
      "Speed up planning applications",
      "Remove permitted development rights in specific areas",
      "Override Building Regulations",
      "Grant automatic planning permission"
    ],
    correctAnswer: 1,
    explanation: "An Article 4 direction allows local planning authorities to remove permitted development rights in specific areas, meaning work that would normally not need permission may require a planning application."
  },
  {
    id: 4,
    question: "When must the DNO be notified of a solar PV installation?",
    options: [
      "Never - it's not their concern",
      "Only for commercial installations",
      "When connecting generation equipment to the grid",
      "Only if the panels exceed 10kW"
    ],
    correctAnswer: 2,
    explanation: "The DNO must be notified when connecting any generation equipment to the grid, including domestic solar PV. This is typically done through the G98/G99 application process."
  },
  {
    id: 5,
    question: "What is G98 in relation to solar PV installations?",
    options: [
      "A type of solar panel",
      "The process for notifying DNO of small-scale generation up to 16A per phase",
      "A Building Regulation",
      "A type of inverter"
    ],
    correctAnswer: 1,
    explanation: "G98 (formerly G83) is the Engineering Recommendation that covers the connection of small-scale embedded generators (up to 16A per phase). It allows notification rather than application for approval."
  },
  {
    id: 6,
    question: "EV charging points installed on domestic properties are usually:",
    options: [
      "Always require planning permission",
      "Permitted development if within the property boundary",
      "Require Building Regulations approval only",
      "Need approval from the highways authority"
    ],
    correctAnswer: 1,
    explanation: "Domestic EV charging points are usually permitted development if installed within the property boundary. Some restrictions may apply in conservation areas or for listed buildings."
  },
  {
    id: 7,
    question: "Battery storage systems for domestic properties typically:",
    options: [
      "Always need planning permission",
      "Are permitted development if they meet size and location criteria",
      "Are banned in residential areas",
      "Need approval from the fire service"
    ],
    correctAnswer: 1,
    explanation: "Domestic battery storage is usually permitted development if it meets certain criteria regarding size (typically 1m3 max) and location (not forward of the building line)."
  },
  {
    id: 8,
    question: "What should you advise a customer installing solar PV in a conservation area?",
    options: [
      "Solar PV is banned in conservation areas",
      "No special requirements apply",
      "Check with local planning authority as permitted development may be restricted",
      "Only install ground-mounted systems"
    ],
    correctAnswer: 2,
    explanation: "Conservation areas may have restricted permitted development rights. Customers should check with their local planning authority before proceeding, as planning permission may be required."
  },
  {
    id: 9,
    question: "The highways authority may be involved in electrical installations when:",
    options: [
      "Never - they only deal with roads",
      "Installing public EV charging or work affecting the highway",
      "All domestic installations",
      "Only commercial solar installations"
    ],
    correctAnswer: 1,
    explanation: "The highways authority may need to be involved when installing public EV charging points, or when electrical work affects the public highway (e.g., cable routes crossing public land)."
  },
  {
    id: 10,
    question: "What is the purpose of a pre-application enquiry to the planning department?",
    options: [
      "It's required for all installations",
      "To get informal advice before submitting a formal application",
      "To avoid Building Regulations",
      "To notify the DNO"
    ],
    correctAnswer: 1,
    explanation: "A pre-application enquiry allows you to get informal advice from the planning department about whether permission is needed and any likely conditions, before committing to a formal application."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need to check planning requirements for every installation?",
    answer: "Not for standard installations within permitted development limits. However, you should always check if the property is listed, in a conservation area, or subject to Article 4 directions. When in doubt, advise customers to check with their local planning authority."
  },
  {
    question: "What's the difference between planning permission and Building Regulations?",
    answer: "Planning permission controls what can be built and where (appearance, use, impact on neighbours). Building Regulations control how work is done to ensure safety and energy efficiency. An installation may need both, either, or neither depending on the work involved."
  },
  {
    question: "Can customers do the planning application themselves?",
    answer: "Yes, homeowners can submit their own planning applications through the Planning Portal. However, for complex installations or listed buildings, professional advice may be beneficial. You can help by providing technical specifications and drawings."
  },
  {
    question: "What happens if work is done without required planning permission?",
    answer: "The local planning authority can take enforcement action requiring removal or modification of the installation. This can be costly for the customer and may affect property sales. Always advise customers to obtain necessary permissions before work begins."
  },
  {
    question: "How do I find out if a property is listed or in a conservation area?",
    answer: "The local planning authority website usually has maps showing conservation areas. Listed buildings can be searched on Historic England's website. You can also check with the local planning department directly or use the Planning Portal's location checker."
  },
  {
    question: "What is the G99 application process?",
    answer: "G99 applies to larger generation installations (over 16A per phase) or multiple installations at the same location. Unlike G98 notification, G99 requires application to and approval from the DNO before connection, which may involve network studies and connection offers."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section1_5 = () => {
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
            <span>Module 2.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Local Authority Requirements
          </h1>
          <p className="text-white/80">
            Planning permissions and local requirements for electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Permitted development:</strong> Most domestic work ok</li>
              <li><strong>Listed buildings:</strong> Always need consent</li>
              <li><strong>Conservation areas:</strong> May need permission</li>
              <li><strong>DNO notification:</strong> Required for generation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Blue plaques (listed), conservation area signs</li>
              <li><strong>Use:</strong> Check planning portal before quoting</li>
              <li><strong>Apply:</strong> Submit G98 notification for PV</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Permitted development rights for electrical installations",
              "When planning permission is required",
              "Listed building and conservation area requirements",
              "DNO notification and application processes",
              "Working with local planning authorities",
              "Highway authority considerations"
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
            Permitted Development Rights
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many electrical installations fall under 'permitted development' - meaning they can proceed without formal planning permission. However, it's essential to understand the limits and exceptions to avoid costly mistakes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Solar PV permitted development conditions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Roof-mounted:</strong> Must not protrude more than 200mm from roof plane</li>
                <li><strong>Not above highest roof part:</strong> Panels shouldn't exceed the roof ridge</li>
                <li><strong>Ground-mounted:</strong> Max 9m2 area, 4m height, 5m from boundary</li>
                <li><strong>Not forward:</strong> Must not be forward of principal elevation facing highway</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Permitted development rights can be removed by Article 4 directions or conditions on the original planning permission. Always advise customers to verify their specific situation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When Planning Permission is Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain circumstances require formal planning permission for electrical installations, even when similar work elsewhere would be permitted development.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Always Needs Permission</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Listed buildings (need listed building consent)</li>
                  <li>Installations exceeding permitted limits</li>
                  <li>Work in Article 4 direction areas</li>
                  <li>Flats and maisonettes (more restricted)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">May Need Permission</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Conservation areas (check local rules)</li>
                  <li>Areas of Outstanding Natural Beauty</li>
                  <li>National Parks and the Broads</li>
                  <li>World Heritage Sites</li>
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
            Listed Buildings and Conservation Areas
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Listed buildings and conservation areas have special protections that affect electrical installations. Understanding these requirements helps you advise customers correctly and avoid enforcement issues.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A customer wants solar PV on their Grade II listed farmhouse. You should advise them that listed building consent is required, and the local planning authority may require panels to be located on less visible roof slopes or suggest alternative locations like outbuildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Working with heritage properties:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Listed buildings:</strong> Consent needed for any alteration affecting character</li>
                <li><strong>Conservation areas:</strong> May have local restrictions on visible changes</li>
                <li><strong>Pre-application advice:</strong> Recommended before detailed design</li>
                <li><strong>Heritage officers:</strong> Can advise on acceptable solutions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            DNO Requirements and Notifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Distribution Network Operator (DNO) manages the local electricity network and must be notified of certain installations, particularly those involving generation or significant load increases.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">G98</p>
                <p className="text-white/90 text-xs">Notification for small generation up to 16A/phase</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">G99</p>
                <p className="text-white/90 text-xs">Application required for larger systems</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Supply Upgrade</p>
                <p className="text-white/90 text-xs">Application for increased capacity (EV, heat pump)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> G98 notification should be completed within 28 days of commissioning. The DNO has 28 days to respond with any objections. Keep records of notifications for compliance documentation.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Quoting Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check if property is listed (Historic England database)</li>
                <li>Check if in conservation area (local authority maps)</li>
                <li>Ask about any planning conditions on the property</li>
                <li>Verify existing supply capacity with the DNO if needed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Submit G98 notification for solar PV connections</li>
                <li>Keep copies of all notifications and approvals</li>
                <li>Follow any conditions attached to permissions</li>
                <li>Document compliance for customer records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all domestic work is permitted</strong> - Check for restrictions</li>
                <li><strong>Forgetting DNO notification</strong> - Required for all generation connections</li>
                <li><strong>Not advising customers about heritage restrictions</strong> - Can lead to enforcement action</li>
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
                <p className="font-medium text-white mb-1">Key Contacts</p>
                <ul className="space-y-0.5">
                  <li>Planning: Local authority planning dept</li>
                  <li>Listed buildings: Historic England + local authority</li>
                  <li>DNO: Your local network operator</li>
                  <li>Highways: Local authority highways dept</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DNO Applications</p>
                <ul className="space-y-0.5">
                  <li>G98: Notification (small generation)</li>
                  <li>G99: Application (larger systems)</li>
                  <li>Supply upgrade: New connection form</li>
                  <li>Response: Usually 28 days</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section1_5;
