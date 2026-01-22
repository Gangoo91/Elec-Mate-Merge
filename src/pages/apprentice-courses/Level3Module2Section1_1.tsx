/**
 * Level 3 Module 2 Section 1.1 - Building Regulations Part L
 *
 * Legal requirements for energy conservation and fuel efficiency in building design
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
const TITLE = "Building Regulations Part L - Level 3 Module 2 Section 1.1";
const DESCRIPTION = "Understanding Building Regulations Part L requirements for conservation of fuel and power in electrical installations. Energy efficiency compliance for electricians.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of Building Regulations Part L?",
    options: [
      "Fire safety in buildings",
      "Conservation of fuel and power",
      "Structural integrity requirements",
      "Ventilation standards"
    ],
    correctIndex: 1,
    explanation: "Part L specifically addresses the conservation of fuel and power, setting requirements for energy efficiency in new and existing buildings."
  },
  {
    id: "check-2",
    question: "When must Part L compliance be demonstrated for electrical work?",
    options: [
      "Only for new builds",
      "Only for domestic properties",
      "When notifiable work affects building energy performance",
      "Only when installing heating systems"
    ],
    correctIndex: 2,
    explanation: "Part L compliance must be demonstrated whenever notifiable electrical work affects the building's energy performance, including lighting upgrades and control systems."
  },
  {
    id: "check-3",
    question: "What document proves Part L compliance has been achieved?",
    options: [
      "Electrical Installation Certificate",
      "Building Control Completion Certificate",
      "Minor Works Certificate",
      "Periodic Inspection Report"
    ],
    correctIndex: 1,
    explanation: "Building Control issues a Completion Certificate once they are satisfied that the work complies with all relevant Building Regulations, including Part L."
  },
  {
    id: "check-4",
    question: "Which lighting efficiency metric is commonly required under Part L?",
    options: [
      "Watts per fitting",
      "Lumens per circuit watt (lm/W)",
      "Lux per square metre",
      "Candela per lamp"
    ],
    correctIndex: 1,
    explanation: "Part L specifies minimum efficacy requirements measured in lumens per circuit watt (lm/W), ensuring lighting systems deliver adequate light output relative to power consumption."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Building Regulations Part L is primarily concerned with:",
    options: [
      "Fire resistance of electrical enclosures",
      "Conservation of fuel and power in buildings",
      "Access requirements for electrical equipment",
      "Sound insulation between dwellings"
    ],
    correctAnswer: 1,
    explanation: "Part L of the Building Regulations specifically addresses the conservation of fuel and power, setting standards for energy efficiency in buildings."
  },
  {
    id: 2,
    question: "Part L is divided into different volumes. Part L1A applies to:",
    options: [
      "Existing dwellings",
      "New dwellings",
      "New buildings other than dwellings",
      "Existing non-domestic buildings"
    ],
    correctAnswer: 1,
    explanation: "Part L1A covers new dwellings, Part L1B covers existing dwellings, Part L2A covers new non-domestic buildings, and Part L2B covers existing non-domestic buildings."
  },
  {
    id: 3,
    question: "For new dwellings, what minimum lighting efficacy does Part L typically require?",
    options: [
      "25 lumens per circuit watt",
      "45 lumens per circuit watt",
      "75 lumens per circuit watt or more",
      "100 lumens per circuit watt"
    ],
    correctAnswer: 2,
    explanation: "Part L requires fixed lighting in new dwellings to achieve a minimum efficacy of 75 lumens per circuit watt, promoting energy-efficient LED lighting."
  },
  {
    id: 4,
    question: "Which organisation typically enforces Building Regulations Part L?",
    options: [
      "The Health and Safety Executive",
      "Local Authority Building Control or Approved Inspectors",
      "The IET",
      "The Environment Agency"
    ],
    correctAnswer: 1,
    explanation: "Building Control bodies (either Local Authority Building Control or private Approved Inspectors) enforce Building Regulations including Part L."
  },
  {
    id: 5,
    question: "Under Part L, which of these is considered 'controlled fitting'?",
    options: [
      "Any socket outlet",
      "Fixed lighting outlets in habitable rooms",
      "Standard light switches",
      "Distribution boards"
    ],
    correctAnswer: 1,
    explanation: "Controlled fittings are fixed lighting outlets that must meet minimum efficacy standards. They ensure occupants cannot simply replace efficient lamps with inefficient ones."
  },
  {
    id: 6,
    question: "What is a 'notifiable' electrical installation under Part L?",
    options: [
      "Any electrical work in a domestic property",
      "Work that requires Building Regulations approval",
      "Emergency lighting installations only",
      "Work carried out by non-registered electricians"
    ],
    correctAnswer: 1,
    explanation: "Notifiable work is electrical installation work that must be notified to Building Control, either through a registered competent person scheme or directly to Building Control."
  },
  {
    id: 7,
    question: "Part L requires consideration of 'CO2 emission rate' which is measured by:",
    options: [
      "Dwelling Emission Rate (DER) or Building Emission Rate (BER)",
      "Air permeability tests only",
      "Heating system efficiency alone",
      "U-values of the building fabric"
    ],
    correctAnswer: 0,
    explanation: "The DER (for dwellings) and BER (for other buildings) calculate predicted CO2 emissions and must not exceed target rates set by Part L."
  },
  {
    id: 8,
    question: "What is SAP in relation to Part L compliance for dwellings?",
    options: [
      "Safety Assessment Procedure",
      "Standard Assessment Procedure for energy rating",
      "System Approval Protocol",
      "Statutory Approval Process"
    ],
    correctAnswer: 1,
    explanation: "SAP (Standard Assessment Procedure) is the Government's methodology for calculating the energy performance of dwellings, used to demonstrate Part L compliance."
  },
  {
    id: 9,
    question: "When upgrading lighting in an existing commercial building, Part L requires:",
    options: [
      "No compliance as it's existing building",
      "Full building energy assessment",
      "The new lighting to meet minimum efficacy standards",
      "Installation of renewable energy sources"
    ],
    correctAnswer: 2,
    explanation: "When replacing or upgrading lighting in existing buildings, the new installation must meet the minimum efficacy standards required by Part L2B."
  },
  {
    id: 10,
    question: "Part L 2021 introduced a significant change regarding:",
    options: [
      "Removal of all efficiency requirements",
      "The 'Future Homes Standard' preparation with increased efficiency targets",
      "Elimination of Building Control involvement",
      "Reduced lighting efficacy requirements"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 introduced more stringent energy efficiency requirements as a stepping stone towards the Future Homes Standard, requiring approximately 31% reduction in CO2 emissions compared to previous standards."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need to notify Building Control for all electrical work?",
    answer: "Not all electrical work is notifiable. Minor works such as replacing accessories, adding sockets to existing circuits (not in special locations), and like-for-like replacements generally do not require notification. However, new circuits, work in bathrooms or outdoors, and consumer unit changes typically do require notification."
  },
  {
    question: "How can I demonstrate Part L compliance as an electrician?",
    answer: "You can demonstrate compliance by: being registered with a competent person scheme (which allows self-certification), using products that meet the required efficacy standards, maintaining documentation of lamp and luminaire specifications, and ensuring any design calculations meet target emission rates."
  },
  {
    question: "What happens if electrical work doesn't meet Part L requirements?",
    answer: "Non-compliant work may not receive a completion certificate from Building Control. This can cause problems when selling the property, obtaining insurance, or during mortgage applications. Building Control can require remedial work to be carried out, and in serious cases, enforcement action may be taken."
  },
  {
    question: "Does Part L apply to emergency lighting installations?",
    answer: "Yes, emergency lighting must also meet efficacy requirements where reasonably practicable. However, the primary concern for emergency lighting remains life safety compliance with BS 5266. Where LED emergency lighting can achieve both safety and efficiency requirements, this should be specified."
  },
  {
    question: "How does Part L affect EV charging point installations?",
    answer: "EV charging installations are generally notifiable and must consider Part L implications. Smart charging capabilities may be required to support load management and integration with the building's energy systems. Documentation should demonstrate the installation supports efficient energy use."
  },
  {
    question: "What documentation do I need to keep for Part L compliance?",
    answer: "Keep records of: product specifications showing efficacy ratings, any design calculations or SAP/SBEM assessments, Building Control notifications and certificates, and details of any controlled fittings installed. This documentation may be required for completion certificates or future inspections."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section1_1 = () => {
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
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part L:</strong> Building Regs for energy conservation</li>
              <li><strong>Lighting efficacy:</strong> Min 75 lm/W for new dwellings</li>
              <li><strong>Compliance:</strong> Via Building Control or competent schemes</li>
              <li><strong>2021 update:</strong> 31% CO2 reduction target vs previous</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Specification sheets showing lm/W ratings</li>
              <li><strong>Use:</strong> Select fittings meeting 75 lm/W minimum</li>
              <li><strong>Apply:</strong> Document compliance for certification</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Building Regulations Part L?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L sets out requirements for the conservation of fuel and power in buildings. For electricians, this means understanding how electrical installations, particularly lighting and controls, contribute to a building's overall energy performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part L is divided into four volumes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part L1A:</strong> New dwellings</li>
                <li><strong>Part L1B:</strong> Existing dwellings (when work is carried out)</li>
                <li><strong>Part L2A:</strong> New buildings other than dwellings</li>
                <li><strong>Part L2B:</strong> Existing buildings other than dwellings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Part L applies whenever you undertake notifiable electrical work that affects a building's energy performance - not just for new builds.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Efficacy Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most relevant Part L requirements for electricians is lighting efficacy. The regulations set minimum standards for how efficiently lighting systems convert electrical power into useful light output.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum 75 lm/W for fixed lighting in new dwellings</li>
                  <li>Controlled fittings to prevent lamp swapping</li>
                  <li>Lighting controls for energy management</li>
                  <li>Display lighting limited where possible</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LED fittings typically meet requirements</li>
                  <li>Integrated LED fittings are 'controlled'</li>
                  <li>Document lm/W ratings in specifications</li>
                  <li>Consider presence detection and dimming</li>
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
            Compliance and Building Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demonstrating Part L compliance requires working with Building Control bodies. Electricians registered with competent person schemes can self-certify certain work, streamlining the process.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When installing a new lighting circuit in a domestic extension, a registered electrician can self-certify that the lighting meets Part L requirements, avoiding the need for a separate Building Control inspection for the electrical aspects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Compliance routes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Competent person scheme:</strong> Self-certification with notification to Building Control</li>
                <li><strong>Building Notice:</strong> Direct application to Building Control before work starts</li>
                <li><strong>Full Plans:</strong> Detailed plans submitted for approval (larger projects)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            SAP and SBEM Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy performance of buildings is assessed using standardised calculation methods. While electricians rarely perform these calculations themselves, understanding them helps you specify appropriate equipment and work effectively with energy assessors.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">SAP</p>
                <p className="text-white/90 text-xs">Standard Assessment Procedure for dwellings</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">SBEM</p>
                <p className="text-white/90 text-xs">Simplified Building Energy Model for non-domestic</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DER/BER</p>
                <p className="text-white/90 text-xs">Dwelling/Building Emission Rates (kg CO2/m2)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The 2021 Part L update requires approximately 31% reduction in CO2 emissions compared to previous standards, making efficient electrical systems even more critical.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check luminaire datasheets for lm/W ratings</li>
                <li>Specify integrated LED fittings as controlled fittings where possible</li>
                <li>Consider lighting controls: presence detection, daylight dimming, time scheduling</li>
                <li>Document all specifications for compliance records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Request manufacturer compliance data</li>
                <li>Verify that circuit efficacy includes control gear losses</li>
                <li>Consider lifetime costs and maintenance intervals</li>
                <li>Ensure products have appropriate certifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using lamp efficacy instead of circuit efficacy</strong> - Must include driver/ballast losses</li>
                <li><strong>Failing to notify Building Control</strong> - Even competent scheme members must notify</li>
                <li><strong>Not retaining compliance documentation</strong> - Required for completion certificates</li>
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
                <p className="font-medium text-white mb-1">Part L Volumes</p>
                <ul className="space-y-0.5">
                  <li>L1A: New dwellings</li>
                  <li>L1B: Existing dwellings</li>
                  <li>L2A: New non-domestic</li>
                  <li>L2B: Existing non-domestic</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Lighting: Min 75 lm/W (dwellings)</li>
                  <li>2021 target: 31% CO2 reduction</li>
                  <li>Future Homes: From 2025</li>
                  <li>Net Zero: By 2050</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section1_1;
