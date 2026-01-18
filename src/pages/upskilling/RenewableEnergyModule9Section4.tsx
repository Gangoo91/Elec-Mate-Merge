import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Tools for Estimating Yield and Return - Renewable Energy Module 9";
const DESCRIPTION = "Learn to use professional software tools including PV*Sol, SAP calculations, and online estimators to accurately predict solar PV and heat pump system performance and financial returns.";

const quickCheckQuestions = [
  {
    id: "tools-check-1",
    question: "What is the primary purpose of yield estimation software?",
    options: [
      "Marketing brochure creation",
      "Predicting system energy output based on location, orientation, and equipment specifications",
      "Generating invoices",
      "Ordering equipment"
    ],
    correctIndex: 1,
    explanation: "Yield estimation software predicts how much energy a system will generate based on factors including solar irradiance data, system configuration, equipment efficiency, and site-specific conditions."
  },
  {
    id: "tools-check-2",
    question: "What does SAP stand for in the context of building energy assessment?",
    options: [
      "Solar Array Performance",
      "Standard Assessment Procedure",
      "System Analysis Program",
      "Solar Application Process"
    ],
    correctIndex: 1,
    explanation: "SAP (Standard Assessment Procedure) is the UK government's methodology for assessing the energy performance of dwellings, used for EPC calculations and Building Regulations compliance."
  },
  {
    id: "tools-check-3",
    question: "What key data input significantly affects yield estimates?",
    options: [
      "Customer's name",
      "Panel colour",
      "Accurate shading analysis",
      "Installer's qualifications"
    ],
    correctIndex: 2,
    explanation: "Shading significantly affects actual yield. Accurate shading analysis - whether through 3D modelling, solar pathfinder tools, or site assessment - is essential for reliable yield predictions."
  },
  {
    id: "tools-check-4",
    question: "Why is using MCS-approved yield estimation methodology important?",
    options: [
      "It is the only legal option",
      "It ensures consistent, credible estimates that meet scheme requirements",
      "It produces higher yield estimates",
      "It is faster than other methods"
    ],
    correctIndex: 1,
    explanation: "MCS-approved methodologies ensure yield estimates meet scheme standards and can be defended if customers question actual performance. They provide a credible, consistent basis for financial projections."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What data does PV*Sol use for solar irradiance?",
    options: [
      "Generic UK average only",
      "Location-specific meteorological databases including global and diffuse irradiance",
      "Customer's estimate",
      "Fixed values for all locations"
    ],
    correctAnswer: 1,
    explanation: "PV*Sol uses detailed meteorological databases with location-specific data including global horizontal irradiance, diffuse irradiance, and temperature data, enabling accurate local predictions."
  },
  {
    id: 2,
    question: "What is the MCS yield estimation method based on?",
    options: [
      "Manufacturer claims only",
      "Simplified calculation using kWh/kWp factors for UK regions",
      "Customer expectations",
      "Previous year's actual data"
    ],
    correctAnswer: 1,
    explanation: "MCS provides simplified yield estimation using regional kWh/kWp factors that account for typical UK conditions. This enables consistent estimation without complex software for smaller systems."
  },
  {
    id: 3,
    question: "What does PVGIS provide for yield estimation?",
    options: [
      "Equipment pricing",
      "Free online solar irradiance database and yield calculator",
      "Installation training",
      "Customer financing"
    ],
    correctAnswer: 1,
    explanation: "PVGIS (Photovoltaic Geographical Information System) is a free EU-funded tool providing solar irradiance data and yield calculations for locations across Europe, widely used for initial assessments."
  },
  {
    id: 4,
    question: "How do professional tools account for temperature effects on panels?",
    options: [
      "Temperature effects are ignored",
      "Using temperature coefficients and local temperature data to adjust output predictions",
      "Assuming constant 25°C",
      "Only considering winter temperatures"
    ],
    correctAnswer: 1,
    explanation: "Professional tools use panel temperature coefficients and local temperature data to model how performance varies with temperature. Panels produce less at higher temperatures, affecting summer output."
  },
  {
    id: 5,
    question: "What is a solar pathfinder or sun path diagram used for?",
    options: [
      "Finding the site on a map",
      "Analysing shading patterns throughout the year",
      "Calculating cable lengths",
      "Choosing panel colours"
    ],
    correctAnswer: 1,
    explanation: "Solar pathfinders and sun path diagrams help analyse shading patterns across different times of day and seasons, identifying how objects like trees or buildings affect the site throughout the year."
  },
  {
    id: 6,
    question: "What loss factors should yield estimates include?",
    options: [
      "No losses need consideration",
      "Inverter efficiency, cable losses, soiling, mismatch, and temperature effects",
      "Only inverter losses",
      "Only weather-related losses"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive yield estimates account for all system losses including inverter efficiency, DC and AC cable losses, soiling/dirt, module mismatch, temperature derating, and shading losses."
  },
  {
    id: 7,
    question: "What tool is used for heat pump system performance estimation?",
    options: [
      "PV*Sol",
      "MCS Heat Pump Calculator and SAP calculations",
      "PVGIS",
      "Google Maps"
    ],
    correctAnswer: 1,
    explanation: "Heat pump performance is estimated using tools like the MCS Heat Pump Calculator, which assesses heat demand, system sizing, and expected efficiency (SPF/SCOP) based on building characteristics."
  },
  {
    id: 8,
    question: "What does Specific Yield (kWh/kWp) indicate?",
    options: [
      "System cost per kW",
      "Annual energy generation per kW of installed capacity",
      "Panel efficiency percentage",
      "Export tariff rate"
    ],
    correctAnswer: 1,
    explanation: "Specific Yield (kWh/kWp) indicates the annual energy generation per kilowatt of installed capacity. UK values typically range from 800-1000 kWh/kWp depending on location and conditions."
  },
  {
    id: 9,
    question: "How should estimated yields be communicated to customers?",
    options: [
      "As guaranteed outputs",
      "As predictions based on stated assumptions with appropriate caveats",
      "Without any numbers",
      "As minimum values"
    ],
    correctAnswer: 1,
    explanation: "Yield estimates should be presented as predictions based on clearly stated assumptions (irradiance data, equipment specs, shading assessment) with caveats about real-world variability."
  },
  {
    id: 10,
    question: "What advantage do detailed 3D modelling tools provide?",
    options: [
      "Faster calculations only",
      "Visual representation plus accurate shading and yield analysis",
      "Lower software costs",
      "Automatic equipment ordering"
    ],
    correctAnswer: 1,
    explanation: "3D modelling tools provide visual representations that help customers understand proposed systems, while simultaneously enabling accurate shading analysis and yield predictions."
  }
];

const faqs = [
  {
    question: "Which yield estimation tool should I use for MCS installations?",
    answer: "For MCS compliance, you can use MCS-approved methods including the MCS irradiance dataset and standard calculation, PVGIS data with appropriate loss factors, or recognised professional software like PV*Sol. The key is using credible data sources and documenting your methodology. For complex sites with significant shading, professional software provides more accurate results."
  },
  {
    question: "How accurate are yield estimates typically?",
    answer: "Well-prepared yield estimates using professional tools and accurate site data are typically within 5-10% of actual performance in good years. Year-to-year weather variation can cause actual yields to vary by 10-15% from long-term averages. Significant shading, equipment issues, or incorrect assumptions can cause larger deviations."
  },
  {
    question: "What if actual yield is lower than estimated?",
    answer: "First verify the system is functioning correctly - check monitoring data, inspect for faults or shading changes. Compare actual weather to predictions. If the system is functioning correctly and weather was normal but yield is significantly below estimate, review the estimation methodology. Transparent documentation of assumptions helps resolve disputes."
  },
  {
    question: "Are free online tools sufficient for commercial proposals?",
    answer: "Free tools like PVGIS can provide useful initial assessments, but commercial proposals typically benefit from professional software that offers more detailed analysis, better shading modelling, and presentation-quality reports. The investment in professional tools is worthwhile for regular commercial work."
  },
  {
    question: "How do I estimate battery storage value?",
    answer: "Battery value depends on consumption patterns, tariff structures, and usage modes. Tools like PV*Sol can model battery systems. Key inputs include daily consumption profile, PV generation profile, import/export tariff rates, and battery efficiency. The value comes from shifting low-value export to high-value self-consumption or time-of-use tariff arbitrage."
  },
  {
    question: "What training is available for yield estimation software?",
    answer: "Software vendors offer training courses and tutorials. MCS provides guidance on their approved methodology. Trade associations run workshops on system design and yield estimation. Online resources including YouTube tutorials cover popular tools. Invest time in learning your chosen tools thoroughly - accurate estimates build customer trust and protect your reputation."
  }
];

const RenewableEnergyModule9Section4 = () => {
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
          <span className="text-white font-medium truncate">Yield Estimation Tools</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 9 - Section 4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Tools for Estimating Yield and Return
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Software and methodologies for accurate performance predictions
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">PV*Sol:</span> Professional design and yield software
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">PVGIS:</span> Free EU irradiance data and calculator
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">SAP:</span> UK building energy assessment method
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">MCS Method:</span> Approved yield estimation standard
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Professional yield estimation software",
            "Free online calculation tools",
            "MCS-approved methodology",
            "Key inputs and loss factors",
            "Communicating estimates to customers"
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
            <h2 className="text-xl font-semibold text-white">Professional Design Software</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Professional yield estimation software provides comprehensive tools for system design, performance prediction, and financial modelling. These tools are essential for commercial projects and valuable for domestic work.
            </p>
            <p>
              <span className="text-white font-medium">PV*Sol:</span> One of the most widely used professional tools, PV*Sol offers detailed 3D modelling, comprehensive shading analysis, battery storage simulation, and financial analysis. It uses location-specific irradiance databases and models all system losses.
            </p>
            <p>
              <span className="text-white font-medium">Key Features:</span> Professional software typically includes 3D site modelling using imported site plans or satellite imagery, automatic shading calculation based on surrounding objects, equipment databases with accurate performance data, and presentation-quality report generation.
            </p>
            <p>
              <span className="text-white font-medium">Investment Justification:</span> Professional software costs several hundred pounds annually but enables more accurate proposals, reduces estimation errors, and produces documentation that supports professional credibility. For regular installation work, the investment is typically worthwhile.
            </p>
            <p>
              <span className="text-white font-medium">Alternative Professional Tools:</span> Other options include HelioScope, SolarEdge Designer, Aurora Solar, and OpenSolar. Each has different strengths - some focus on speed, others on accuracy, and some integrate with specific equipment suppliers.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Free Online Tools</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Free online tools provide accessible yield estimation for initial assessments and simpler installations. While less comprehensive than professional software, they offer valuable functionality at no cost.
            </p>
            <p>
              <span className="text-white font-medium">PVGIS:</span> The Photovoltaic Geographical Information System is an EU-funded tool providing free solar irradiance data and yield calculations for European locations. It offers different calculation modes, from simple estimates to detailed performance modelling.
            </p>
            <p>
              <span className="text-white font-medium">PVGIS Capabilities:</span> PVGIS provides monthly and annual yield estimates, allows input of system size, orientation, and tilt, offers different technology options, and can account for horizon shading. It uses satellite-derived irradiance data with good accuracy.
            </p>
            <p>
              <span className="text-white font-medium">Manufacturer Tools:</span> Many inverter and panel manufacturers offer free design tools. SolarEdge Designer, Fronius Solar.configurator, and similar tools help design systems using their equipment and provide yield estimates.
            </p>
            <p>
              <span className="text-white font-medium">Limitations:</span> Free tools typically offer less detailed shading analysis, simpler financial modelling, and less professional reporting. They are suitable for initial assessments but may need supplementing for complex sites or formal proposals.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">MCS Yield Estimation Method</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              MCS provides standardised yield estimation methodology that ensures consistent, credible estimates across the industry. Understanding this methodology is essential for MCS certified installers.
            </p>
            <p>
              <span className="text-white font-medium">MCS Approach:</span> The MCS method uses UK-specific irradiance data mapped to regions, with correction factors for orientation, tilt, and shading. It provides a consistent basis that customers can understand and that can be verified against actual performance.
            </p>
            <p>
              <span className="text-white font-medium">Shading Factors:</span> MCS guidance includes methods for assessing and quantifying shading effects using shading factor tables or solar pathfinder analysis. Shading deductions are applied to account for reduced performance throughout the year.
            </p>
            <p>
              <span className="text-white font-medium">Standard Losses:</span> The methodology includes standard loss assumptions for inverter efficiency (typically 97-98%), cable losses (typically 1-2%), soiling (typically 2-5%), and other derating factors, ensuring estimates are realistic.
            </p>
            <p>
              <span className="text-white font-medium">Documentation Requirements:</span> MCS requires yield estimates to be documented and provided to customers as part of the performance estimate. This documentation should state the methodology used and key assumptions.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">SAP and Heat Pump Calculations</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Heat pump installations require different estimation approaches focusing on building heat demand and system efficiency rather than solar irradiance.
            </p>
            <p>
              <span className="text-white font-medium">SAP Methodology:</span> The Standard Assessment Procedure (SAP) is the UK government methodology for assessing dwelling energy performance. It calculates heat demand based on building characteristics and models heat pump performance including seasonal efficiency.
            </p>
            <p>
              <span className="text-white font-medium">Heat Loss Calculations:</span> Accurate heat pump sizing requires room-by-room heat loss calculations considering building fabric, insulation levels, window areas, and ventilation. MCS specifies requirements for these calculations.
            </p>
            <p>
              <span className="text-white font-medium">MCS Heat Pump Calculator:</span> MCS provides tools and guidance for heat pump performance estimation, including seasonal performance factor (SPF) estimation based on heat source temperature, flow temperature requirements, and system design.
            </p>
            <p>
              <span className="text-white font-medium">Running Cost Estimates:</span> Heat pump running costs depend on the SPF achieved and electricity prices. A heat pump with SPF of 3.0 provides 3kWh heat for each 1kWh electricity consumed. Compare this with gas boiler efficiency (typically 85-95%) and relative fuel costs.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Best Practice for Yield Estimation</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Accurate yield estimation requires careful attention to inputs, appropriate tool selection, and honest communication of results and limitations.
            </p>
            <p>
              <span className="text-white font-medium">Site Assessment:</span> Accurate estimates start with thorough site assessment. Record orientation and tilt accurately. Identify all shading sources including future growth of trees. Note any factors that might affect performance such as pollution or coastal salt spray.
            </p>
            <p>
              <span className="text-white font-medium">Equipment Specifications:</span> Use accurate equipment data from manufacturer datasheets. Input correct panel wattage, temperature coefficients, and efficiency values. Specify the actual inverter model with its efficiency curve.
            </p>
            <p>
              <span className="text-white font-medium">Realistic Assumptions:</span> Avoid over-optimistic assumptions. Use reasonable soiling factors for the location. Consider realistic degradation rates. Do not underestimate shading impacts. Conservative estimates that customers exceed build trust.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Record and communicate assumptions clearly. Document the software used, data sources, loss factors applied, and any special considerations. This transparency protects you if performance questions arise.
            </p>
            <p>
              <span className="text-white font-medium">Verification:</span> Where possible, compare estimates with similar installed systems or industry benchmarks. If your estimates consistently exceed actual performance across multiple systems, review your methodology.
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
              <span className="text-white font-medium">Invest in skills:</span> Time spent learning your estimation tools thoroughly pays dividends in accuracy and efficiency. Attend training, practise on known systems, and stay updated as software evolves.
            </p>
            <p>
              <span className="text-white font-medium">Build a library:</span> Keep records of estimates versus actual performance for completed installations. This real-world feedback helps calibrate your methodology and demonstrates track record to customers.
            </p>
            <p>
              <span className="text-white font-medium">Explain uncertainty:</span> Help customers understand that estimates are predictions, not guarantees. Weather varies year to year, affecting actual yields. Well-prepared estimates should be met or exceeded in normal years.
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
          title="Yield Estimation Tools Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-5">
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

export default RenewableEnergyModule9Section4;
