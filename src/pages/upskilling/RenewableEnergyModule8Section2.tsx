import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Regulations (Part L, Part P, Structural) - Renewable Energy Module 8";
const DESCRIPTION = "Understand building regulations compliance for renewable energy installations including Part L energy efficiency, Part P electrical safety, and structural requirements for solar panels and heat pumps.";

const quickCheckQuestions = [
  {
    id: "building-regs-check-1",
    question: "What does Part L of the Building Regulations primarily address?",
    options: [
      "Electrical safety",
      "Structural integrity",
      "Conservation of fuel and power (energy efficiency)",
      "Fire safety"
    ],
    correctIndex: 2,
    explanation: "Part L of the Building Regulations addresses conservation of fuel and power, setting requirements for energy efficiency in buildings. Renewable energy installations can help buildings meet these requirements."
  },
  {
    id: "building-regs-check-2",
    question: "Which Part of the Building Regulations covers electrical installation safety?",
    options: [
      "Part A",
      "Part L",
      "Part P",
      "Part M"
    ],
    correctIndex: 2,
    explanation: "Part P of the Building Regulations covers electrical safety in dwellings, requiring that electrical installations are designed and installed to protect persons from fire and injury, including solar PV and battery systems."
  },
  {
    id: "building-regs-check-3",
    question: "When might structural calculations be required for a solar PV installation?",
    options: [
      "Never - solar panels are too light",
      "Only for ground mount systems",
      "When the roof cannot support the additional load or requires reinforcement",
      "Only for commercial buildings"
    ],
    correctIndex: 2,
    explanation: "Structural calculations may be required when there are concerns about roof loading capacity, especially for older roofs, those with existing damage, or when installing heavy equipment like battery systems."
  },
  {
    id: "building-regs-check-4",
    question: "What notification route allows competent persons to self-certify electrical work?",
    options: [
      "Building control application",
      "Planning permission",
      "Competent person scheme membership",
      "DNO notification"
    ],
    correctIndex: 2,
    explanation: "Membership of a competent person scheme (such as NICEIC or NAPIT) allows installers to self-certify that electrical work meets Building Regulations without requiring building control inspection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under Part P, which installations require notification to building control?",
    options: [
      "All electrical work regardless of location",
      "Only notifiable work that is not carried out by a competent person scheme member",
      "Minor additions to circuits only",
      "Work in bathrooms only"
    ],
    correctAnswer: 1,
    explanation: "Notifiable electrical work must be reported to building control unless carried out by a competent person scheme member who can self-certify. Solar PV and battery storage installations are notifiable work."
  },
  {
    id: 2,
    question: "What does Part L require in terms of renewable energy for new buildings?",
    options: [
      "No requirements for renewables",
      "Mandatory solar PV on all new buildings",
      "Minimum energy efficiency standards which often necessitate renewable energy to achieve",
      "Only heat pumps are required"
    ],
    correctAnswer: 2,
    explanation: "Part L sets minimum energy efficiency standards for new buildings. While not mandating specific technologies, achieving these standards often requires incorporating renewable energy systems."
  },
  {
    id: 3,
    question: "Which structural consideration is most important for roof-mounted solar PV?",
    options: [
      "The colour of the roof tiles",
      "The wind and snow loading capacity of the roof structure",
      "The number of windows in the roof",
      "The age of the building only"
    ],
    correctAnswer: 1,
    explanation: "Wind and snow loading are critical structural considerations. The roof must support the additional weight of panels plus any imposed loads from wind uplift and snow accumulation."
  },
  {
    id: 4,
    question: "Under what circumstances might planning permission be required for solar PV?",
    options: [
      "Never - PV is always permitted development",
      "Listed buildings, conservation areas, or when panels project significantly from roof plane",
      "Only for systems over 50kW",
      "Only for ground mount systems"
    ],
    correctAnswer: 1,
    explanation: "While most domestic PV is permitted development, planning permission may be required for listed buildings, conservation areas, World Heritage Sites, or when installations do not meet permitted development criteria."
  },
  {
    id: 5,
    question: "What Part L compliance documentation might be required for a heat pump installation?",
    options: [
      "No documentation required",
      "SAP calculations showing the building meets energy performance requirements",
      "Only the installation certificate",
      "Planning permission only"
    ],
    correctAnswer: 1,
    explanation: "Heat pump installations in new builds or during significant renovations may require SAP (Standard Assessment Procedure) calculations demonstrating the building meets Part L energy performance requirements."
  },
  {
    id: 6,
    question: "What structural requirement applies to ground source heat pump ground loops?",
    options: [
      "No structural requirements",
      "Avoiding underground services and ensuring adequate land area",
      "Only planning permission",
      "Building control approval only"
    ],
    correctAnswer: 1,
    explanation: "Ground loop installations require careful survey to avoid existing underground services (gas, water, electricity, drainage) and ensure adequate land area for the heat demand of the property."
  },
  {
    id: 7,
    question: "How does Part B (Fire Safety) relate to battery storage installations?",
    options: [
      "No relevance to battery storage",
      "Requires fire-rated enclosures for all batteries",
      "Influences installation locations and may require additional fire safety measures",
      "Only applies to commercial installations"
    ],
    correctAnswer: 2,
    explanation: "Part B considerations influence where batteries can be installed, proximity to escape routes, and may require additional fire detection, suppression, or compartmentation measures."
  },
  {
    id: 8,
    question: "What minimum cable sizing consideration relates to Part L?",
    options: [
      "Part L does not address cables",
      "Minimising cable losses to maximise system efficiency",
      "Maximum cable length only",
      "Cable colour only"
    ],
    correctAnswer: 1,
    explanation: "Part L's focus on energy efficiency extends to ensuring that system losses are minimised. Appropriate cable sizing reduces resistive losses, maximising the energy delivered from renewable systems."
  },
  {
    id: 9,
    question: "Which document provides guidance on compliance with Part P for solar PV?",
    options: [
      "Part P has no guidance documents",
      "Approved Document P and BS 7671",
      "SAP calculations only",
      "DNO requirements only"
    ],
    correctAnswer: 1,
    explanation: "Approved Document P provides official guidance on meeting Part P requirements, while BS 7671 (the Wiring Regulations) provides the technical standard that installations must meet."
  },
  {
    id: 10,
    question: "What building regulations consideration applies to external heat pump units?",
    options: [
      "No regulations apply to external units",
      "Noise levels, proximity to boundaries, and visual impact",
      "Only structural loading",
      "Electrical safety only"
    ],
    correctAnswer: 1,
    explanation: "External heat pump units must comply with planning regulations regarding noise levels, proximity to boundaries, and visual impact. Permitted development rights include conditions that must be met."
  }
];

const faqs = [
  {
    question: "Do I need to submit a building control application for every solar PV installation?",
    answer: "Not if you are a member of a competent person scheme for Part P electrical work. Scheme members can self-certify that the electrical installation complies with Building Regulations, issuing a certificate to the customer and notifying the local authority. If you are not a scheme member, a building control application and inspection would be required."
  },
  {
    question: "How do I know if a roof can structurally support solar panels?",
    answer: "Most modern roofs can support typical solar PV installations without reinforcement. However, structural assessment may be needed for older properties, roofs with existing damage or deterioration, flat roofs, or when installing unusually heavy systems. When in doubt, consult a structural engineer. MCS guidance includes roof loading assessment requirements."
  },
  {
    question: "What is the relationship between planning permission and building regulations?",
    answer: "These are separate regulatory systems. Planning permission controls what can be built and its visual impact. Building regulations ensure construction meets safety, accessibility, and energy standards. A project might need both, one, or neither depending on circumstances. Permitted development rights can allow work without planning permission, but building regulations still apply."
  },
  {
    question: "Are there specific Part L requirements for retrofit renewable energy installations?",
    answer: "For standalone retrofit installations (adding PV to an existing building without other works), Part L sets performance standards the system should meet but does not require upgrading the existing building. However, if the renewable installation is part of a larger renovation triggering Part L compliance, the whole project must meet current standards."
  },
  {
    question: "How do Building Regulations affect battery storage installations?",
    answer: "Battery storage installations fall under Part P (electrical safety), and location choices are influenced by Part B (fire safety). Batteries should not be installed in escape routes, and fire detection may be required. The specific requirements depend on battery chemistry, capacity, and installation location. MCS MIS 3012 provides additional guidance."
  },
  {
    question: "What documentation do I need to provide for building regulations compliance?",
    answer: "For self-certification under a competent person scheme, you provide the customer with a Building Regulations Compliance Certificate and notify the local authority electronically. Documentation should include design calculations, test results, and installation records. If going through building control, they specify required submissions and conduct inspections."
  }
];

const RenewableEnergyModule8Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-8">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Building Regulations</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 8 - Section 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Building Regulations Compliance
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Part L, Part P, and structural requirements for renewable energy installations
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Part L:</span> Conservation of fuel and power - energy efficiency standards
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Part P:</span> Electrical safety in dwellings - installation standards
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Part A:</span> Structural integrity - roof loading and foundations
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Part B:</span> Fire safety - battery storage and escape routes
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Part L energy efficiency requirements and calculations",
            "Part P electrical safety compliance and self-certification",
            "Structural considerations for roof-mounted systems",
            "Fire safety requirements for battery storage",
            "Documentation and certification requirements"
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Part L - Energy Efficiency</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Part L of the Building Regulations addresses conservation of fuel and power, setting minimum energy efficiency standards for buildings. These requirements have become increasingly stringent, reflecting the UK's commitment to reducing carbon emissions.
            </p>
            <p>
              <span className="text-white font-medium">New Buildings:</span> Part L 2021 introduces the Future Homes Standard pathway, requiring significant reductions in carbon emissions compared to previous standards. This effectively mandates low-carbon heating and often requires on-site renewable energy generation to achieve compliance.
            </p>
            <p>
              <span className="text-white font-medium">SAP Calculations:</span> The Standard Assessment Procedure (SAP) is the government's methodology for assessing the energy performance of dwellings. SAP calculations demonstrate compliance with Part L requirements and influence EPCs (Energy Performance Certificates).
            </p>
            <p>
              <span className="text-white font-medium">Existing Buildings:</span> When work is done to existing buildings (extensions, conversions, or significant renovations), Part L may be triggered. This could require energy efficiency improvements beyond the immediate scope of work, potentially including renewable energy systems.
            </p>
            <p>
              For standalone renewable energy installations to existing buildings, Part L does not mandate additional fabric improvements, but the renewable system must be designed and installed to perform efficiently and contribute positively to the building's energy performance.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Part P - Electrical Safety</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Part P of the Building Regulations applies to electrical installations in dwellings, requiring that work is designed and installed to protect persons from fire and injury. Solar PV, battery storage, and EV charger installations all fall within Part P's scope.
            </p>
            <p>
              <span className="text-white font-medium">Notifiable Work:</span> The installation of new circuits, work in special locations (bathrooms, outdoors), and consumer unit replacements are notifiable work. Renewable energy installations are notifiable as they involve new circuits and often consumer unit modifications.
            </p>
            <p>
              <span className="text-white font-medium">Compliance Routes:</span> There are two main routes to demonstrate Part P compliance. The building control route requires application, inspection, and approval from local authority building control. The competent person scheme route allows qualified installers to self-certify their work.
            </p>
            <p>
              <span className="text-white font-medium">Competent Person Schemes:</span> Membership of an approved scheme (NICEIC, NAPIT, ELECSA, etc.) allows installers to self-certify that work meets Building Regulations. The installer issues a Building Regulations Compliance Certificate to the customer and notifies the local authority electronically.
            </p>
            <p>
              <span className="text-white font-medium">Technical Standards:</span> Part P requires compliance with BS 7671 (the IET Wiring Regulations). This comprehensive standard specifies requirements for design, installation, inspection, testing, and certification of electrical installations.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Structural Considerations</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Part A of the Building Regulations addresses structural integrity. While most residential roofs can accommodate solar panel installations without structural modifications, assessment is essential to ensure safety and compliance.
            </p>
            <p>
              <span className="text-white font-medium">Roof Loading:</span> Solar panels add both dead load (permanent weight) and imposed loads (wind and snow). A typical domestic array adds approximately 10-15 kg/m2 dead load, plus mounting hardware. Wind can create both downward pressure and uplift forces that must be resisted by the fixing system and roof structure.
            </p>
            <p>
              <span className="text-white font-medium">Assessment Requirements:</span> MCS guidance requires installers to assess roof suitability. For standard installations on roofs in good condition and built to modern standards, visual inspection and standard calculations typically suffice. For older roofs, those showing signs of deterioration, or unusual constructions, professional structural assessment may be required.
            </p>
            <p>
              <span className="text-white font-medium">Fixing Methods:</span> The method of fixing panels to the roof must be appropriate for the roof type and structure. Penetrating fixings must maintain weatherproofing, and the fixing system must distribute loads appropriately to avoid localised stress.
            </p>
            <p>
              <span className="text-white font-medium">Ground Mount Systems:</span> Ground-mounted arrays require foundation design appropriate to soil conditions and wind loading. Concrete foundations, ground screws, or ballasted systems may be used depending on site conditions and planning requirements.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Fire Safety - Part B</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Part B of the Building Regulations addresses fire safety. Battery storage installations particularly require careful consideration of fire safety requirements due to the potential fire risks associated with lithium-ion batteries.
            </p>
            <p>
              <span className="text-white font-medium">Location Restrictions:</span> Batteries should not be installed in protected escape routes, including hallways that form part of the means of escape in case of fire. This influences where domestic battery systems can be located, typically restricting them to garages, utility rooms, or external locations.
            </p>
            <p>
              <span className="text-white font-medium">Fire Detection:</span> Depending on the installation location and local authority interpretation, additional fire detection may be required in areas where batteries are installed. Interconnected smoke detection systems may need extending to cover battery locations.
            </p>
            <p>
              <span className="text-white font-medium">Fire Spread:</span> Installation design should consider fire spread between battery units and to adjacent materials or structures. Adequate separation distances, non-combustible mounting surfaces, and careful cable routing reduce fire spread risk.
            </p>
            <p>
              <span className="text-white font-medium">Fire Service Access:</span> Clear labelling and shutdown procedures assist fire services in the event of an incident. DC isolation switches should be clearly marked and accessible, and information about battery location should be displayed near the meter position.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Documentation and Certification</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Comprehensive documentation demonstrates compliance with Building Regulations and provides essential records for customers, future maintenance, and property transactions.
            </p>
            <p>
              <span className="text-white font-medium">Electrical Certificates:</span> BS 7671 requires Electrical Installation Certificates (EIC) for new installations and Minor Electrical Installation Works Certificates (MEIWC) for additions to existing circuits. These certificates document testing results and confirm compliance with the wiring regulations.
            </p>
            <p>
              <span className="text-white font-medium">Building Regulations Certificate:</span> When self-certifying under a competent person scheme, you issue a Building Regulations Compliance Certificate to the customer. This confirms that notifiable electrical work complies with Part P requirements.
            </p>
            <p>
              <span className="text-white font-medium">MCS Documentation:</span> MCS installations require additional documentation including the MCS Installation Certificate, commissioning records, performance estimates, and handover packs with user guides and warranty information.
            </p>
            <p>
              <span className="text-white font-medium">Structural Records:</span> Where structural assessment was required, retain records of calculations, professional reports, and any remedial work specifications. These may be required for building control sign-off or future reference.
            </p>
            <p>
              <span className="text-white font-medium">Planning Records:</span> If planning permission was required or a Certificate of Lawful Development obtained, retain copies with installation records. These documents may be required for property sales or future modifications.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Early assessment:</span> Assess regulatory requirements at the survey stage. Identify any planning constraints, structural concerns, or building regulations implications before providing quotes or commencing work.
            </p>
            <p>
              <span className="text-white font-medium">Competent person membership:</span> Maintaining competent person scheme membership for Part P work is essential for efficient installation business. The ability to self-certify avoids delays and costs associated with building control applications.
            </p>
            <p>
              <span className="text-white font-medium">Professional networks:</span> Develop relationships with structural engineers and building control officers. When complex projects arise, having established professional contacts enables efficient problem-solving.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Building Regulations Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-3">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section2;
