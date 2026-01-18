import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Green Finance and Funding Options - Renewable Energy Module 9";
const DESCRIPTION = "Explore government schemes, commercial finance structures, and green loan products available for funding renewable energy installations in the UK.";

const quickCheckQuestions = [
  {
    id: "finance-check-1",
    question: "What is the Boiler Upgrade Scheme?",
    options: [
      "A loan for boiler repairs",
      "A government grant towards heat pump installation costs",
      "A discount on gas boilers",
      "A maintenance contract"
    ],
    correctIndex: 1,
    explanation: "The Boiler Upgrade Scheme provides government grants towards the cost of installing heat pumps and biomass boilers in eligible properties, reducing the upfront cost for customers."
  },
  {
    id: "finance-check-2",
    question: "What distinguishes a green loan from a standard personal loan?",
    options: [
      "Green loans are always interest-free",
      "Green loans may offer preferential rates for environmental improvements",
      "Green loans can only be used for solar panels",
      "There is no difference"
    ],
    correctIndex: 1,
    explanation: "Green loans are specifically designed for environmental improvements and may offer lower interest rates or special terms to encourage investment in renewable energy and efficiency measures."
  },
  {
    id: "finance-check-3",
    question: "What must installers verify for customers to access the Boiler Upgrade Scheme?",
    options: [
      "Customer's credit score",
      "MCS certification and property eligibility requirements",
      "Customer's income level",
      "Previous energy usage"
    ],
    correctIndex: 1,
    explanation: "The Boiler Upgrade Scheme requires installation by MCS certified installers, and properties must meet eligibility criteria including having a valid EPC and not being connected to the gas grid for certain grants."
  },
  {
    id: "finance-check-4",
    question: "What is a key advantage of 0% finance offers for customers?",
    options: [
      "The system is free",
      "No interest charges on repayments over the promotional period",
      "No credit check required",
      "Unlimited repayment period"
    ],
    correctIndex: 1,
    explanation: "0% finance offers allow customers to spread the cost of installation over a set period without paying interest, making renewable energy more accessible while preserving savings for other uses."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical grant value under the Boiler Upgrade Scheme for air source heat pumps?",
    options: [
      "1,000",
      "5,000-7,500 depending on technology",
      "15,000",
      "Full installation cost"
    ],
    correctAnswer: 1,
    explanation: "The Boiler Upgrade Scheme offers grants of 5,000-7,500 depending on the technology (ASHP, GSHP, or biomass), significantly reducing the upfront cost of installation."
  },
  {
    id: 2,
    question: "What is ECO4 (Energy Company Obligation)?",
    options: [
      "A tax on energy companies",
      "A scheme requiring energy suppliers to fund efficiency measures for eligible households",
      "An electricity tariff",
      "A solar panel manufacturer"
    ],
    correctAnswer: 1,
    explanation: "ECO4 requires large energy suppliers to fund energy efficiency improvements for low-income and vulnerable households, potentially including insulation, heating systems, and renewable technologies."
  },
  {
    id: 3,
    question: "What is the Home Upgrade Grant (HUG)?",
    options: [
      "A loan for home improvements",
      "A scheme providing grants for energy efficiency in off-gas-grid homes",
      "A mortgage product",
      "A rental assistance programme"
    ],
    correctAnswer: 1,
    explanation: "The Home Upgrade Grant provides funding for energy efficiency measures in low-income households that are off the gas grid, potentially including heat pumps and solar panels."
  },
  {
    id: 4,
    question: "How do Property Assessed Clean Energy (PACE) schemes work?",
    options: [
      "They are government grants",
      "Financing secured against property, repaid through council tax or rates",
      "Personal loans from banks",
      "Credit card finance"
    ],
    correctAnswer: 1,
    explanation: "PACE financing secures the loan against the property, with repayments collected through local authority bills. This enables long-term financing that can transfer with property ownership."
  },
  {
    id: 5,
    question: "What should installers check before promoting specific finance products?",
    options: [
      "Nothing - all installers can offer finance",
      "FCA authorisation requirements and consumer credit regulations",
      "Customer's previous purchases",
      "Competitor pricing"
    ],
    correctAnswer: 1,
    explanation: "Promoting consumer credit products requires understanding of FCA (Financial Conduct Authority) regulations. Installers typically partner with authorised finance providers rather than offering credit directly."
  },
  {
    id: 6,
    question: "What is a potential disadvantage of Power Purchase Agreements for customers?",
    options: [
      "No electricity savings",
      "Lower total savings compared to ownership as the PPA provider takes a share",
      "System must be removed after 5 years",
      "Higher electricity costs than grid"
    ],
    correctAnswer: 1,
    explanation: "While PPAs avoid upfront costs, the customer shares savings with the PPA provider. Outright ownership typically provides higher total financial returns over the system lifetime."
  },
  {
    id: 7,
    question: "What type of finance might suit a customer who wants to avoid interest charges?",
    options: [
      "Credit card finance",
      "0% finance deals, savings, or grants",
      "Payday loans",
      "Overdraft"
    ],
    correctAnswer: 1,
    explanation: "Customers seeking to avoid interest might use savings for outright purchase, access grants where eligible, or take advantage of 0% finance promotional offers from installers or lenders."
  },
  {
    id: 8,
    question: "What documentation do customers typically need for finance applications?",
    options: [
      "No documentation required",
      "Proof of income, identity, address, and sometimes property ownership",
      "Only email address",
      "Social media profiles"
    ],
    correctAnswer: 1,
    explanation: "Finance applications typically require identity verification, proof of address, income evidence (employment, self-employment, pension), and for secured loans, property documentation."
  },
  {
    id: 9,
    question: "What is the Social Housing Decarbonisation Fund (SHDF)?",
    options: [
      "A private loan scheme",
      "Government funding for energy efficiency in social housing",
      "A charity for homeless people",
      "A solar panel subsidy"
    ],
    correctAnswer: 1,
    explanation: "SHDF provides government funding to social housing providers for energy efficiency improvements, including renewable technologies. This creates opportunities for installers working with housing associations and councils."
  },
  {
    id: 10,
    question: "How should installers present finance options to customers?",
    options: [
      "Push the highest commission option",
      "Present options clearly, including costs, terms, and alternatives, without pressure",
      "Avoid discussing finance",
      "Only mention cash purchase"
    ],
    correctAnswer: 1,
    explanation: "Ethical sales require clear presentation of all options including total costs, interest rates, terms, and alternatives. Customers should make informed decisions without sales pressure."
  }
];

const faqs = [
  {
    question: "Can customers combine grants with other finance?",
    answer: "Yes, in most cases grants can be combined with other finance. For example, a customer might receive a Boiler Upgrade Scheme grant and use a green loan for the remaining balance. However, some schemes have specific rules - always check current eligibility criteria and whether combining funding sources affects eligibility."
  },
  {
    question: "What happens if a customer defaults on renewable energy finance?",
    answer: "The consequences depend on the finance type. Unsecured loans affect credit rating and may result in debt collection. Secured loans (like PACE) could affect property ownership. PPAs typically result in the provider reclaiming equipment. Always ensure customers understand repayment obligations before proceeding."
  },
  {
    question: "How do I help customers access government schemes?",
    answer: "Stay updated on current schemes and eligibility criteria through MCS, government websites, and industry news. Check eligibility early in the sales process. Complete required installer registrations (many schemes require MCS certification). Assist with application paperwork and provide accurate quotes that meet scheme requirements."
  },
  {
    question: "Are there grants specifically for businesses?",
    answer: "Various schemes support business renewable investment including capital allowances (tax relief), Low Carbon Workspaces grants (regional), local authority green business grants, and sector-specific support programmes. The availability varies by region and time. Check current offerings through local growth hubs and business support organisations."
  },
  {
    question: "What is the difference between secured and unsecured green loans?",
    answer: "Unsecured loans do not require property as collateral - approval depends on creditworthiness and income. Secured loans use property as security, potentially offering lower rates and higher amounts but putting the property at risk if payments default. Secured options suit larger installations where customers have equity."
  },
  {
    question: "How do I stay updated on changing grant schemes?",
    answer: "Subscribe to MCS newsletters and updates, follow relevant government departments (DESNZ), join trade associations that track policy changes, and check scheme websites regularly. Schemes change frequently - keeping current knowledge is essential for serving customers well and maintaining credibility."
  }
];

const RenewableEnergyModule9Section5 = () => {
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
          <span className="text-white font-medium truncate">Green Finance & Funding</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Green Finance and Funding Options
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Government schemes, loans, and funding for renewable energy investment
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">BUS:</span> Government grants for heat pump installation
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Green Loans:</span> Preferential rates for environmental projects
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">ECO4:</span> Supplier-funded efficiency for eligible households
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">0% Finance:</span> Interest-free payment options
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Current government grant schemes",
            "Green loan products and providers",
            "Energy Company Obligation funding",
            "Commercial finance options",
            "Ethical finance presentation"
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
            <h2 className="text-xl font-semibold text-white">Government Grant Schemes</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Government grants reduce the upfront cost of renewable energy installations, making them more accessible to a wider range of customers. Understanding current schemes is essential for helping customers maximise available support.
            </p>
            <p>
              <span className="text-white font-medium">Boiler Upgrade Scheme (BUS):</span> This scheme provides grants towards heat pump and biomass boiler installations. Grants of 5,000-7,500 are available depending on the technology, significantly reducing customer costs. Properties must have a valid EPC and installations must be by MCS certified installers.
            </p>
            <p>
              <span className="text-white font-medium">Home Upgrade Grant (HUG):</span> Targeting low-income households in off-gas-grid properties, HUG provides substantial funding for energy efficiency measures including insulation and renewable heating. Eligibility is based on income and property criteria.
            </p>
            <p>
              <span className="text-white font-medium">Local Authority Schemes:</span> Many local authorities offer additional grants or support for renewable energy. These vary significantly by location and often have specific eligibility criteria. Check with local councils for current offerings.
            </p>
            <p>
              <span className="text-white font-medium">Social Housing Funding:</span> The Social Housing Decarbonisation Fund supports energy efficiency in social housing. If you work with housing associations or councils, this funding stream creates significant opportunities for larger installation programmes.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Green Loans and Finance Products</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Green loans are financial products specifically designed to fund environmental improvements. They may offer preferential terms compared to standard personal loans, encouraging investment in renewable energy.
            </p>
            <p>
              <span className="text-white font-medium">Bank Green Loans:</span> Many high street and specialist banks offer green loan products with competitive interest rates for home energy improvements. These unsecured loans typically require good credit history and stable income.
            </p>
            <p>
              <span className="text-white font-medium">Credit Union Green Loans:</span> Credit unions often offer ethical lending with competitive rates for members. Some have specific green loan products supporting community renewable energy adoption.
            </p>
            <p>
              <span className="text-white font-medium">0% Finance Offers:</span> Some installers offer 0% finance arrangements through partnerships with finance providers. These allow customers to spread costs without interest charges, though promotional periods are typically limited (12-60 months).
            </p>
            <p>
              <span className="text-white font-medium">Comparison Considerations:</span> When comparing finance options, consider the total cost of credit (including all fees and interest), repayment terms, early repayment penalties, and credit requirements. The lowest headline rate is not always the best overall deal.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Energy Company Obligation (ECO)</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The Energy Company Obligation requires large energy suppliers to fund energy efficiency improvements in eligible households. This creates opportunities for fully funded installations for qualifying customers.
            </p>
            <p>
              <span className="text-white font-medium">ECO4:</span> The current phase of ECO focuses on improving the worst-performing homes to EPC Band C or above. Eligible measures include insulation, heating system upgrades, and in some cases renewable technologies including heat pumps and solar thermal.
            </p>
            <p>
              <span className="text-white font-medium">Eligibility Criteria:</span> ECO funding is typically available to households receiving certain benefits (Universal Credit, Pension Credit, Child Tax Credit, etc.) or meeting low-income criteria. Some local authority schemes broaden eligibility through LA Flex arrangements.
            </p>
            <p>
              <span className="text-white font-medium">Working with ECO:</span> Installers can work with ECO managing agents or directly with energy suppliers to deliver funded installations. This requires understanding scheme requirements, maintaining appropriate accreditations, and meeting quality standards.
            </p>
            <p>
              <span className="text-white font-medium">Great British Insulation Scheme:</span> Running alongside ECO, this scheme focuses specifically on insulation measures for a wider range of households, improving home efficiency as a foundation for renewable heating.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Commercial and Innovative Finance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Commercial customers have access to additional financing mechanisms that can enable renewable energy investment without significant upfront capital outlay.
            </p>
            <p>
              <span className="text-white font-medium">Asset Finance:</span> Equipment leasing and hire purchase arrangements allow businesses to spread costs while gaining immediate benefit from reduced energy costs. The equipment may serve as security, enabling larger installations.
            </p>
            <p>
              <span className="text-white font-medium">Power Purchase Agreements:</span> As discussed in earlier sections, PPAs allow third-party ownership where the customer purchases generated electricity at agreed rates. This avoids capital expenditure while providing energy cost savings.
            </p>
            <p>
              <span className="text-white font-medium">Green Bonds and Community Energy:</span> Community energy schemes use investment from local residents to fund renewable installations. This model can work for larger community buildings or shared generation schemes.
            </p>
            <p>
              <span className="text-white font-medium">Property-Linked Finance (PACE):</span> Though not yet widespread in the UK, Property Assessed Clean Energy financing secures loans against the property, with repayments through property-related bills. This enables longer repayment terms and may transfer with property ownership.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Ethical Finance Guidance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Presenting finance options ethically is essential for customer protection, regulatory compliance, and maintaining professional reputation.
            </p>
            <p>
              <span className="text-white font-medium">Regulatory Awareness:</span> Consumer credit is regulated by the Financial Conduct Authority (FCA). Installers cannot offer credit directly without appropriate authorisation. Most work through authorised finance partners who handle credit agreements.
            </p>
            <p>
              <span className="text-white font-medium">Clear Communication:</span> Always present the total cost of credit including all interest and fees, not just monthly payments. Explain terms clearly including repayment period, interest rates, and consequences of default.
            </p>
            <p>
              <span className="text-white font-medium">Affordability Assessment:</span> Help customers consider whether they can afford repayments. Avoid encouraging customers to take on debt they may struggle to repay. If in doubt about affordability, suggest they seek independent financial advice.
            </p>
            <p>
              <span className="text-white font-medium">Alternative Options:</span> Always present alternatives including saving up, grants where available, and different finance products. Customers should make informed choices, not feel pressured into particular arrangements.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Keep records of finance discussions and ensure customers receive all required documentation. This protects both parties if questions arise later.
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
              <span className="text-white font-medium">Stay current:</span> Government schemes change frequently. Bookmark key scheme websites and check regularly. Incorrect information about grant availability damages credibility and customer trust.
            </p>
            <p>
              <span className="text-white font-medium">Check eligibility early:</span> Assess grant and scheme eligibility at the initial enquiry stage. This avoids wasted time quoting systems that customers cannot fund and enables accurate financial projections from the start.
            </p>
            <p>
              <span className="text-white font-medium">Partner wisely:</span> If offering finance through partners, choose reputable, FCA-authorised providers. Your reputation is linked to your partners' conduct.
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
          title="Green Finance Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-6">
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

export default RenewableEnergyModule9Section5;
