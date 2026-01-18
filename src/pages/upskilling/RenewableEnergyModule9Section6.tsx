import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Tax Implications and Legal Considerations - Renewable Energy Module 9";
const DESCRIPTION = "Understand VAT treatment, tax allowances, planning requirements, and consumer protection regulations affecting renewable energy installations in the UK.";

const quickCheckQuestions = [
  {
    id: "tax-legal-check-1",
    question: "What is the current VAT rate for domestic solar PV installation in the UK?",
    options: [
      "20% standard rate",
      "0% zero rate",
      "5% reduced rate",
      "Varies by region"
    ],
    correctIndex: 1,
    explanation: "The UK government has applied 0% VAT to domestic solar PV and battery storage installations, making renewable energy more affordable for homeowners. This zero rate is currently in place until 2027."
  },
  {
    id: "tax-legal-check-2",
    question: "What planning permission status applies to most domestic solar PV installations?",
    options: [
      "Always requires full planning permission",
      "Permitted development (no planning permission required if conditions met)",
      "Never needs any approval",
      "Only approved in certain regions"
    ],
    correctIndex: 1,
    explanation: "Most domestic solar PV installations are permitted development, meaning they do not require planning permission provided they meet certain conditions regarding placement, size, and property type."
  },
  {
    id: "tax-legal-check-3",
    question: "What consumer protection applies to domestic renewable energy sales?",
    options: [
      "No specific protections",
      "Consumer Contracts Regulations including 14-day cooling-off period",
      "Only verbal agreements matter",
      "Protection only for systems over 10kW"
    ],
    correctIndex: 1,
    explanation: "Domestic sales are covered by Consumer Contracts Regulations, providing a 14-day cooling-off period for contracts signed away from business premises, plus other consumer protections regarding information and cancellation rights."
  },
  {
    id: "tax-legal-check-4",
    question: "What tax benefit can businesses claim on renewable energy equipment?",
    options: [
      "No tax benefits available",
      "Capital allowances allowing deduction of equipment cost from taxable profits",
      "Full refund of installation costs",
      "Exemption from all business taxes"
    ],
    correctIndex: 1,
    explanation: "Businesses can claim capital allowances on renewable energy equipment, deducting the cost from taxable profits. This effectively reduces the net cost of installation by the business's marginal tax rate."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When does domestic solar PV require planning permission?",
    options: [
      "Always",
      "Never",
      "Listed buildings, conservation areas, or when conditions for permitted development are not met",
      "Only for systems over 4kW"
    ],
    correctAnswer: 2,
    explanation: "Planning permission may be required for listed buildings, conservation areas, World Heritage Sites, or when permitted development conditions (panel height, position, projection) are not met."
  },
  {
    id: 2,
    question: "What document provides guidance on permitted development rights for solar?",
    options: [
      "Building Regulations Part P",
      "Town and Country Planning (General Permitted Development) Order",
      "MCS Standards",
      "BS 7671"
    ],
    correctAnswer: 1,
    explanation: "The Town and Country Planning (General Permitted Development) Order specifies permitted development rights, including conditions for solar panel installation without planning permission."
  },
  {
    id: 3,
    question: "What VAT treatment applies to commercial solar installations?",
    options: [
      "0% VAT",
      "5% reduced rate",
      "Standard rate (20%) but usually recoverable for VAT-registered businesses",
      "Exempt from VAT"
    ],
    correctAnswer: 2,
    explanation: "Commercial solar installations are charged at the standard VAT rate (20%), but VAT-registered businesses can typically recover this input VAT through their VAT returns."
  },
  {
    id: 4,
    question: "What is the Annual Investment Allowance (AIA) relevant to renewable energy?",
    options: [
      "A grant for installation",
      "Tax relief allowing 100% deduction of qualifying equipment costs in the year of purchase",
      "A limit on installation spending",
      "An insurance requirement"
    ],
    correctAnswer: 1,
    explanation: "The Annual Investment Allowance allows businesses to deduct 100% of qualifying plant and equipment costs from profits in the year of purchase, up to the annual limit, reducing tax liability immediately."
  },
  {
    id: 5,
    question: "What consumer law requires clear pre-contract information for domestic sales?",
    options: [
      "Data Protection Act",
      "Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013",
      "Companies Act",
      "Environmental Protection Act"
    ],
    correctAnswer: 1,
    explanation: "The Consumer Contracts Regulations require traders to provide clear information before contracts are made, including identity, product details, price, delivery, and cancellation rights."
  },
  {
    id: 6,
    question: "When do earnings from solar PV export become taxable for homeowners?",
    options: [
      "All export income is taxable",
      "Never taxable for domestic",
      "When combined with other income it exceeds personal tax thresholds or property allowances",
      "Only if system is over 10kW"
    ],
    correctAnswer: 2,
    explanation: "Income from solar PV may be taxable when it exceeds relevant thresholds. The trading allowance provides 1,000 tax-free, and larger amounts may require declaration. Professional advice is recommended."
  },
  {
    id: 7,
    question: "What legal document should clearly define installation terms and conditions?",
    options: [
      "Verbal agreement only",
      "Written contract including scope, price, payment terms, warranties, and cancellation rights",
      "Email confirmation",
      "No documentation required"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive written contract protects both installer and customer. It should detail scope, specifications, price, payment schedule, warranties, and comply with consumer protection requirements."
  },
  {
    id: 8,
    question: "What happens if a domestic contract is signed at the customer's home?",
    options: [
      "No special rules apply",
      "Customer has 14-day right to cancel (cooling-off period)",
      "Contract is automatically void",
      "Only cash payment is accepted"
    ],
    correctAnswer: 1,
    explanation: "Contracts signed away from business premises give domestic customers a 14-day cooling-off period during which they can cancel without penalty. Installers must inform customers of this right."
  },
  {
    id: 9,
    question: "What insurance should renewable energy installers maintain?",
    options: [
      "No insurance required",
      "Public liability, professional indemnity, and employers' liability as applicable",
      "Only vehicle insurance",
      "Insurance is optional"
    ],
    correctAnswer: 1,
    explanation: "Installers should maintain public liability insurance (protecting against injury or damage), professional indemnity (covering design errors), and employers' liability if employing staff."
  },
  {
    id: 10,
    question: "What data protection consideration applies to customer information?",
    options: [
      "No rules apply to installers",
      "UK GDPR requires appropriate handling, storage, and protection of personal data",
      "Data can be freely shared",
      "Only paper records are protected"
    ],
    correctAnswer: 1,
    explanation: "UK GDPR requires businesses to handle personal data appropriately. Installers must collect data lawfully, store it securely, use it only for stated purposes, and respect customer rights regarding their data."
  }
];

const faqs = [
  {
    question: "Do customers need to declare solar income to HMRC?",
    answer: "Income from selling electricity (SEG payments) may be taxable. The trading allowance provides 1,000 tax-free income per year. If total solar income exceeds this, it may need declaring. Capital gains rules may also apply when selling a property with solar. Customers should consult a tax professional for personal advice."
  },
  {
    question: "What happens if I install without required planning permission?",
    answer: "Installing without required planning permission is a breach of planning control. The local authority can require removal of the installation or retrospective application. Retrospective permission may be granted, but if refused, removal may be enforced. Always verify planning status before installation."
  },
  {
    question: "How long must customer records be retained?",
    answer: "MCS requires installation records to be retained for the warranty period plus additional time for potential disputes. Tax records should be kept for at least 6 years. GDPR allows retention only as long as necessary for the purpose. Develop a clear retention policy covering different record types."
  },
  {
    question: "What are my obligations under the Consumer Rights Act?",
    answer: "The Consumer Rights Act requires goods to be of satisfactory quality, fit for purpose, and as described. Services must be performed with reasonable care and skill. If these standards are not met, customers have rights to repair, replacement, or refund depending on circumstances and timing."
  },
  {
    question: "Can I install solar on a listed building?",
    answer: "Listed building consent is required for any works affecting the character of a listed building. Solar panels may be approved if sensitively designed and positioned. Consult the local planning authority and consider engaging a heritage consultant. Approval is not automatic and may have conditions."
  },
  {
    question: "What employment law considerations apply to installation teams?",
    answer: "Employment law covers employee rights including contracts, pay, working hours, health and safety, and discrimination protection. Even subcontractors may have employment rights depending on the relationship. Ensure compliance with employment law, working time regulations, and health and safety requirements."
  }
];

const RenewableEnergyModule9Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Tax & Legal Considerations</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Tax Implications and Legal Considerations
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          VAT, planning, consumer protection, and regulatory compliance
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">0% VAT:</span> Currently applies to domestic solar/battery
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Permitted Development:</span> No planning for most domestic
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Consumer Rights:</span> 14-day cooling-off period
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Capital Allowances:</span> Tax relief for businesses
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "VAT treatment for different installation types",
            "Planning permission requirements",
            "Consumer protection obligations",
            "Business tax considerations",
            "Contract and insurance requirements"
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
            <h2 className="text-xl font-semibold text-white">VAT Treatment</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              VAT treatment for renewable energy installations varies depending on the customer type, property, and technology. Understanding current rules ensures correct pricing and compliance.
            </p>
            <p>
              <span className="text-white font-medium">Domestic Solar and Battery:</span> The UK currently applies 0% VAT to the supply and installation of solar panels and battery storage in residential properties. This zero rate applies to labour and materials, making systems more affordable. The 0% rate is currently scheduled until 2027.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pumps and Other Technologies:</span> Heat pumps, insulation, and certain other energy-saving materials also qualify for reduced or zero VAT rates in domestic properties. Always check current HMRC guidance as rates can change.
            </p>
            <p>
              <span className="text-white font-medium">Commercial Installations:</span> Commercial solar installations are charged at the standard VAT rate (20%). VAT-registered businesses can reclaim this input VAT through their normal VAT returns, so the effective cost impact is neutral for most businesses.
            </p>
            <p>
              <span className="text-white font-medium">Mixed Use Properties:</span> Properties with both domestic and commercial use may have complex VAT treatment. Seek professional advice for mixed-use situations to ensure correct treatment.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Planning Permission</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Planning rules determine what can be installed without explicit permission. Understanding these rules prevents costly mistakes and customer disappointment.
            </p>
            <p>
              <span className="text-white font-medium">Permitted Development:</span> Most domestic solar PV installations are permitted development, meaning no planning application is needed provided certain conditions are met. Panels must not protrude more than 200mm from the roof slope, and in conservation areas must not be on principal or street-facing elevations.
            </p>
            <p>
              <span className="text-white font-medium">Listed Buildings:</span> Listed building consent is required for any works affecting a listed building's character. Solar installations on listed buildings require careful consideration and formal consent. Applications should demonstrate how proposals preserve the building's special interest.
            </p>
            <p>
              <span className="text-white font-medium">Conservation Areas:</span> Additional restrictions apply in conservation areas, including requirements about panel visibility from public areas. Check with the local planning authority before installation.
            </p>
            <p>
              <span className="text-white font-medium">Ground Mount Systems:</span> Ground-mounted solar arrays have different permitted development criteria regarding height, area, and proximity to boundaries. Larger arrays typically require planning permission.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pumps:</span> Air source heat pump permitted development rights include noise limits and setback requirements from boundaries. Ground source heat pumps installing boreholes or trenches may have different considerations.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Consumer Protection</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Consumer protection law provides domestic customers with significant rights. Compliance is both a legal requirement and good business practice.
            </p>
            <p>
              <span className="text-white font-medium">Consumer Contracts Regulations:</span> For contracts made away from business premises (including at customer's home), customers have a 14-day cooling-off period during which they can cancel without reason or penalty. You must inform customers of this right before they commit.
            </p>
            <p>
              <span className="text-white font-medium">Pre-Contract Information:</span> Before the contract is made, you must provide clear information including your identity and contact details, main characteristics of the goods/services, total price, payment and delivery arrangements, and cancellation rights.
            </p>
            <p>
              <span className="text-white font-medium">Consumer Rights Act:</span> Goods must be of satisfactory quality, fit for purpose, and as described. Services must be performed with reasonable care and skill. If standards are not met, customers have remedies including repair, replacement, price reduction, or in some cases refund.
            </p>
            <p>
              <span className="text-white font-medium">MCS Consumer Code:</span> MCS certified installers must comply with the MCS Consumer Code, which adds requirements beyond general consumer law. This includes clear quotation standards, complaints procedures, and dispute resolution mechanisms.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Business Tax Considerations</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Business customers can access tax benefits that improve the financial case for renewable energy investment. Understanding these enables more compelling commercial proposals.
            </p>
            <p>
              <span className="text-white font-medium">Capital Allowances:</span> Businesses can deduct the cost of qualifying plant and equipment from taxable profits. The Annual Investment Allowance (AIA) allows 100% deduction in the year of purchase for most businesses, up to the annual limit.
            </p>
            <p>
              <span className="text-white font-medium">Effective Cost Reduction:</span> For a company paying 25% corporation tax, capital allowances on a 50,000 solar installation effectively reduce the net cost to 37,500 (saving 12,500 in tax). This significantly improves payback calculations.
            </p>
            <p>
              <span className="text-white font-medium">Enhanced Capital Allowances:</span> Certain energy-efficient equipment may qualify for enhanced capital allowances. While the specific list changes, this can provide additional benefits for qualifying technologies.
            </p>
            <p>
              <span className="text-white font-medium">Research and Development:</span> Businesses developing innovative renewable energy applications may qualify for R&D tax relief. This is specialist territory requiring professional advice.
            </p>
            <p>
              <span className="text-white font-medium">Professional Advice:</span> Always recommend business customers consult their accountant or tax advisor about specific implications. Tax treatment varies by business type and circumstances.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Contracts and Insurance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Proper contracts and insurance protect both you and your customers, providing clarity and recourse if problems arise.
            </p>
            <p>
              <span className="text-white font-medium">Written Contracts:</span> Always use clear written contracts specifying the scope of work, equipment specifications, price and payment terms, completion timescales, warranties provided, and cancellation rights. Well-drafted contracts prevent disputes.
            </p>
            <p>
              <span className="text-white font-medium">Public Liability Insurance:</span> Covers claims for injury to third parties or damage to their property. Essential for installation work where accidents could affect customers, neighbours, or the public.
            </p>
            <p>
              <span className="text-white font-medium">Professional Indemnity Insurance:</span> Covers claims arising from professional advice or design errors. Important given the design elements in renewable energy installations and the reliance customers place on your recommendations.
            </p>
            <p>
              <span className="text-white font-medium">Employers' Liability Insurance:</span> Legally required if you employ anyone. Covers claims from employees injured at work.
            </p>
            <p>
              <span className="text-white font-medium">Warranty Insurance:</span> Consider insurance-backed guarantees that protect customers if your business ceases trading. MCS requires certain warranty provisions, and insurance backing adds customer confidence.
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
              <span className="text-white font-medium">Check before you quote:</span> Verify planning status, VAT treatment, and any special considerations before providing quotations. Incorrect assumptions create problems later.
            </p>
            <p>
              <span className="text-white font-medium">Document thoroughly:</span> Keep records of all contracts, communications, and installation documentation. Good records protect you if disputes arise and demonstrate compliance.
            </p>
            <p>
              <span className="text-white font-medium">Seek professional advice:</span> For complex tax, legal, or planning questions, recommend customers consult appropriate professionals. You can provide general guidance but specific advice should come from qualified specialists.
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
          title="Tax and Legal Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-5">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/renewable-energy-course">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section6;
