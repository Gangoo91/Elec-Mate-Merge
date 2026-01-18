import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Feed-in Tariff, SEG, and Net Metering - Renewable Energy Module 9";
const DESCRIPTION = "Understand UK energy payment schemes including the legacy Feed-in Tariff, Smart Export Guarantee, and net metering principles for solar PV and renewable energy systems.";

const quickCheckQuestions = [
  {
    id: "fit-seg-check-1",
    question: "What is the status of the Feed-in Tariff scheme for new applicants?",
    options: [
      "Still available for all new installations",
      "Closed to new applicants since 31 March 2019",
      "Available only for commercial installations",
      "Only available in Scotland"
    ],
    correctIndex: 1,
    explanation: "The Feed-in Tariff scheme closed to new applicants on 31 March 2019. Existing FIT recipients continue to receive payments for their contracted period, but new installations cannot join."
  },
  {
    id: "fit-seg-check-2",
    question: "What is the primary requirement for accessing the Smart Export Guarantee?",
    options: [
      "System must be over 10kW",
      "Installation by an MCS certified installer",
      "Direct DNO application",
      "Commercial premises only"
    ],
    correctIndex: 1,
    explanation: "To access SEG payments, the installation must be carried out by an MCS certified installer and the system must be MCS registered. This ensures quality standards are maintained."
  },
  {
    id: "fit-seg-check-3",
    question: "How does the Smart Export Guarantee differ from the Feed-in Tariff?",
    options: [
      "SEG pays more than FIT",
      "SEG is mandatory for all suppliers",
      "SEG only pays for exported energy, not generation",
      "SEG requires larger systems"
    ],
    correctIndex: 2,
    explanation: "Unlike FIT which paid for both generation and export, SEG only pays for electricity exported to the grid. There is no generation tariff, so self-consumption becomes more valuable."
  },
  {
    id: "fit-seg-check-4",
    question: "Who sets the SEG export tariff rate?",
    options: [
      "The government sets a fixed rate",
      "Individual energy suppliers set their own rates",
      "Ofgem sets a minimum rate",
      "The DNO determines the rate"
    ],
    correctIndex: 1,
    explanation: "Energy suppliers with over 150,000 customers must offer a SEG tariff, but they set their own rates. Rates vary significantly between suppliers, so customers should compare offers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which suppliers are obligated to offer SEG tariffs?",
    options: [
      "All energy suppliers regardless of size",
      "Suppliers with over 150,000 customers",
      "Only renewable energy suppliers",
      "Suppliers chosen by Ofgem"
    ],
    correctAnswer: 1,
    explanation: "The SEG obligation applies to licensed electricity suppliers with more than 150,000 domestic customers. Smaller suppliers may choose to offer SEG voluntarily but are not required to."
  },
  {
    id: 2,
    question: "What was the generation tariff under the Feed-in Tariff scheme?",
    options: [
      "Payment for electricity used on-site",
      "Payment for all electricity generated, regardless of use",
      "Payment only for exported electricity",
      "A fixed monthly fee"
    ],
    correctAnswer: 1,
    explanation: "The FIT generation tariff paid for every unit of electricity generated, whether it was used on-site or exported. This guaranteed income regardless of consumption patterns."
  },
  {
    id: 3,
    question: "What smart meter requirement applies to SEG participation?",
    options: [
      "No meter requirements",
      "Any meter is acceptable",
      "A smart meter or export meter capable of recording half-hourly data",
      "Only SMETS2 meters"
    ],
    correctAnswer: 2,
    explanation: "SEG requires a meter capable of recording half-hourly export data. This is typically a smart meter with export functionality or a dedicated export meter."
  },
  {
    id: 4,
    question: "What is 'net metering' in the context of UK solar PV?",
    options: [
      "The UK's official export payment scheme",
      "A concept where import and export are netted off, not currently used in UK",
      "The method for calculating FIT payments",
      "Smart meter installation process"
    ],
    correctAnswer: 1,
    explanation: "Net metering (where export offsets import) is not currently used in the UK. The UK uses separate metering of import and export, with payments for export under SEG."
  },
  {
    id: 5,
    question: "How long do existing FIT contracts continue to pay?",
    options: [
      "They have already ended",
      "For 20-25 years from installation date",
      "Until 2030 for all recipients",
      "5 years maximum"
    ],
    correctAnswer: 1,
    explanation: "Existing FIT contracts continue for their full term, typically 20-25 years from the installation date. Recipients continue receiving generation and export payments until their contract ends."
  },
  {
    id: 6,
    question: "Can customers on SEG choose any supplier for their export payments?",
    options: [
      "No, they must use their electricity supplier",
      "Yes, they can choose any SEG licensee regardless of who supplies their electricity",
      "Only if they have a smart meter",
      "Only for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "SEG participants can choose any SEG licensee for export payments - they do not need to use the same supplier who provides their import electricity. This enables shopping for better rates."
  },
  {
    id: 7,
    question: "What documentation proves eligibility for SEG?",
    options: [
      "DNO approval letter only",
      "MCS certificate and installation notification",
      "Building regulations certificate only",
      "Installer's business registration"
    ],
    correctAnswer: 1,
    explanation: "SEG eligibility requires an MCS certificate for the installation. The MCS database records installations, and suppliers verify eligibility through this certification."
  },
  {
    id: 8,
    question: "What is the maximum capacity for domestic solar PV under SEG?",
    options: [
      "4kW",
      "5MW for all technologies",
      "No specific limit for solar PV under SEG",
      "10kW"
    ],
    correctAnswer: 1,
    explanation: "SEG applies to installations up to 5MW for all eligible technologies. For solar PV, there is no specific lower capacity limit - even small domestic systems can participate."
  },
  {
    id: 9,
    question: "How do SEG tariff rates typically compare to retail electricity prices?",
    options: [
      "SEG rates are higher than retail prices",
      "SEG rates are typically lower than retail electricity prices",
      "They are always equal",
      "SEG rates are government controlled"
    ],
    correctAnswer: 1,
    explanation: "SEG export rates are typically significantly lower than retail electricity prices, making self-consumption more valuable. This economic reality drives interest in battery storage."
  },
  {
    id: 10,
    question: "What happens to FIT export payments when a property is sold?",
    options: [
      "Payments automatically stop",
      "The FIT registration can transfer to the new owner",
      "The seller continues to receive payments",
      "Payments are split between buyer and seller"
    ],
    correctAnswer: 1,
    explanation: "When a property with FIT is sold, the FIT registration can be transferred to the new owner, who then receives the remaining payments for the contract duration."
  }
];

const faqs = [
  {
    question: "Can I switch from FIT to SEG or vice versa?",
    answer: "If you are on FIT, you cannot switch to SEG - you continue on your existing FIT contract until it ends. When your FIT contract expires, you can then register for SEG. New installations can only access SEG as FIT is closed to new applicants. There is no benefit to leaving FIT early as FIT rates are generally higher than SEG rates."
  },
  {
    question: "What happens to my FIT payments if I add battery storage?",
    answer: "Adding battery storage to a FIT installation does not affect your generation tariff payments. However, if you store generated electricity and use it later rather than exporting, this may reduce your export payments. Some battery systems can be configured to prioritise self-consumption while still allowing some export for FIT purposes."
  },
  {
    question: "How do I find the best SEG rate?",
    answer: "SEG rates vary significantly between suppliers and change frequently. Comparison websites and MCS resources list current SEG offers. Consider both the rate offered and payment terms. Some suppliers offer fixed rates while others vary with wholesale prices. The highest rate is not always the best choice if the supplier has poor customer service or complex terms."
  },
  {
    question: "Do I need to inform my electricity supplier if I install solar PV?",
    answer: "Yes, you should inform your electricity supplier about your solar PV installation. If you want to receive SEG payments, you will need to register with a SEG licensee (which may or may not be your current supplier). Even if you do not export, your supplier should know about generation equipment connected to the grid."
  },
  {
    question: "What is deemed export and does it still apply?",
    answer: "Deemed export was used under FIT when no export meter was installed - export was assumed to be 50% of generation. Under SEG, actual export metering is required (smart meter or export meter), so deemed export does not apply to SEG. Existing FIT installations with deemed export continue under those arrangements."
  },
  {
    question: "Can battery storage systems participate in SEG?",
    answer: "Battery storage systems can participate in SEG if they are MCS certified and export renewable energy to the grid. However, the electricity exported must originate from the renewable source, not from grid imports. Some suppliers have specific requirements regarding battery storage and may require evidence that exported energy is genuinely renewable."
  }
];

const RenewableEnergyModule9Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-9">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Feed-in Tariff, SEG & Net Metering</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 1</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Feed-in Tariff, SEG & Net Metering
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Understanding UK energy payment schemes and export mechanisms
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">FIT Closed:</span> No new applications since March 2019
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">SEG Active:</span> Current scheme for new installations
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">MCS Required:</span> Certification essential for SEG access
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Variable Rates:</span> Suppliers set their own SEG tariffs
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "History and structure of the Feed-in Tariff",
            "How the Smart Export Guarantee works",
            "Differences between FIT and SEG",
            "Net metering concepts and UK approach",
            "Helping customers maximise export income"
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
            <h2 className="text-xl font-semibold text-white">The Feed-in Tariff Legacy</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The Feed-in Tariff (FIT) scheme launched in April 2010 and was instrumental in driving UK solar PV adoption. It provided guaranteed payments for renewable electricity generation, making solar financially attractive for homeowners and businesses.
            </p>
            <p>
              <span className="text-white font-medium">Generation Tariff:</span> FIT paid for every kilowatt-hour generated, regardless of whether that electricity was used on-site or exported. This guaranteed income stream made financial planning straightforward and reduced investment risk.
            </p>
            <p>
              <span className="text-white font-medium">Export Tariff:</span> An additional payment was made for electricity deemed or metered as exported to the grid. For most domestic installations without export meters, export was deemed at 50% of generation.
            </p>
            <p>
              <span className="text-white font-medium">Closure:</span> FIT closed to new applicants on 31 March 2019. However, existing FIT recipients continue to receive payments for their full contract period (typically 20-25 years from installation), with rates index-linked to inflation.
            </p>
            <p>
              Understanding FIT remains relevant because many existing installations are still on FIT, and installers may encounter FIT systems when undertaking maintenance, modifications, or property surveys.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Smart Export Guarantee (SEG)</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The Smart Export Guarantee replaced FIT as the government-backed mechanism for paying small-scale generators for exported electricity. It launched on 1 January 2020 and operates quite differently from its predecessor.
            </p>
            <p>
              <span className="text-white font-medium">Export Only:</span> Unlike FIT, SEG only pays for electricity exported to the grid. There is no generation tariff, meaning the value of self-consumed electricity (avoiding import costs) becomes the primary financial benefit.
            </p>
            <p>
              <span className="text-white font-medium">Supplier-Set Rates:</span> Energy suppliers set their own SEG tariff rates, which vary considerably. Rates are typically lower than FIT export rates were and are subject to change. Customers can shop around for the best rates.
            </p>
            <p>
              <span className="text-white font-medium">Eligibility Requirements:</span> To access SEG, installations must be MCS certified, have capacity up to 5MW, and have metering capable of recording half-hourly export data (typically a smart meter with export capability).
            </p>
            <p>
              <span className="text-white font-medium">Obligated Suppliers:</span> Large electricity suppliers (over 150,000 domestic customers) must offer SEG tariffs. Smaller suppliers may offer SEG voluntarily. Customers can choose any SEG licensee, not necessarily their import supplier.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Comparing FIT and SEG</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The transition from FIT to SEG represents a fundamental shift in how renewable generation is incentivised. Understanding these differences helps installers explain the current economic landscape to customers.
            </p>
            <p>
              <span className="text-white font-medium">Payment Structure:</span> FIT paid for all generation plus export. SEG pays only for export. This makes self-consumption far more valuable under SEG, as using your own electricity avoids import costs at retail rates.
            </p>
            <p>
              <span className="text-white font-medium">Rate Setting:</span> FIT rates were government-set and guaranteed for the contract term. SEG rates are market-driven, set by suppliers, and can change. This introduces more variability but also competition.
            </p>
            <p>
              <span className="text-white font-medium">Financial Impact:</span> A typical domestic PV system under FIT might have earned 500-800 per year from generation and export tariffs. Under SEG, the same system might earn 100-200 from export, with the main benefit being self-consumption savings.
            </p>
            <p>
              <span className="text-white font-medium">Investment Case:</span> FIT guaranteed returns made financial planning simple. Under SEG, the investment case depends more on electricity prices, consumption patterns, and self-consumption rates. Battery storage becomes more attractive to maximise self-consumption.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Net Metering Concepts</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Net metering is a billing mechanism where electricity exported to the grid directly offsets electricity imported, effectively crediting exports at retail rates. While common in some countries, the UK does not currently use true net metering.
            </p>
            <p>
              <span className="text-white font-medium">How Net Metering Works:</span> In a net metering system, a bidirectional meter tracks both import and export. At the billing period, export credits offset import charges. If you export more than you import, you may carry the credit forward or receive payment.
            </p>
            <p>
              <span className="text-white font-medium">UK Approach:</span> The UK uses separate metering and payment for import and export. You pay retail rates for imports and receive SEG rates for exports. Since SEG rates are typically much lower than retail rates, there is a significant difference in value.
            </p>
            <p>
              <span className="text-white font-medium">Implications:</span> Without net metering, the economic incentive strongly favours self-consumption. This drives interest in battery storage to shift solar generation to times of consumption, and in load management to match consumption with generation.
            </p>
            <p>
              <span className="text-white font-medium">Future Possibilities:</span> While there have been discussions about net metering or improved export arrangements, no significant policy changes are currently confirmed. Installers should base customer advice on current arrangements while noting the policy landscape may evolve.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Maximising Customer Value</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Understanding payment schemes enables installers to help customers maximise the value from their renewable energy systems through appropriate system design and operational guidance.
            </p>
            <p>
              <span className="text-white font-medium">Self-Consumption Priority:</span> With SEG export rates significantly below import costs, maximising self-consumption delivers the greatest value. System sizing should consider consumption patterns, and customers should be advised on shifting loads to match generation.
            </p>
            <p>
              <span className="text-white font-medium">Battery Storage:</span> Batteries enable storage of excess generation for later use, increasing effective self-consumption. The economics depend on the difference between import costs and SEG rates, battery costs, and consumption patterns.
            </p>
            <p>
              <span className="text-white font-medium">SEG Rate Shopping:</span> Advise customers to compare SEG rates and review periodically, as rates change. Some suppliers offer time-of-use export rates or special tariffs for battery storage that may provide better value depending on export patterns.
            </p>
            <p>
              <span className="text-white font-medium">Smart Meter Benefits:</span> Smart meters with export capability not only enable SEG participation but provide detailed data on generation, export, and consumption patterns. This information helps customers optimise their energy use.
            </p>
            <p>
              <span className="text-white font-medium">System Monitoring:</span> Encourage customers to use monitoring systems to understand their generation and consumption. This awareness often leads to behavioural changes that increase self-consumption and reduce costs.
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
              <span className="text-white font-medium">Customer education:</span> Many customers still expect FIT-style returns. Be clear that the investment case is now primarily based on self-consumption savings rather than export income.
            </p>
            <p>
              <span className="text-white font-medium">Documentation matters:</span> Ensure all MCS documentation is correctly completed. This is the customers' proof of eligibility for SEG and must be accurate.
            </p>
            <p>
              <span className="text-white font-medium">Consider the whole system:</span> When designing systems, factor in consumption patterns, potential for batteries, EV charging, and heat pumps. A holistic approach maximises value under current incentive structures.
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
          title="Feed-in Tariff and SEG Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="/electrician/upskilling/renewable-energy-module-9">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Link to="../section-2">
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

export default RenewableEnergyModule9Section1;
