/**
 * Level 3 Module 2 Section 1.2 - UK Net Zero Targets
 *
 * Government net zero commitments and their implications for electrical installations
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
const TITLE = "UK Net Zero Targets - Level 3 Module 2 Section 1.2";
const DESCRIPTION = "Understanding UK Net Zero 2050 targets and their impact on electrical installations. Climate Change Act implications for electricians.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "By what year has the UK committed to achieving Net Zero carbon emissions?",
    options: [
      "2030",
      "2040",
      "2050",
      "2060"
    ],
    correctIndex: 2,
    explanation: "The UK government has legally committed to achieving Net Zero greenhouse gas emissions by 2050 under the Climate Change Act 2008 (amended 2019)."
  },
  {
    id: "check-2",
    question: "What does the 'Future Homes Standard' (from 2025) aim to achieve?",
    options: [
      "All homes to have solar panels",
      "New homes to produce 75-80% less CO2 than current standards",
      "All gas boilers to be removed",
      "Smart meters in every home"
    ],
    correctIndex: 1,
    explanation: "The Future Homes Standard requires new homes built from 2025 to produce 75-80% less carbon dioxide emissions than current standards, essentially requiring low-carbon heating and high energy efficiency."
  },
  {
    id: "check-3",
    question: "Which heating technology is being promoted as an alternative to gas boilers in the transition to Net Zero?",
    options: [
      "Oil-fired boilers",
      "Electric storage heaters only",
      "Heat pumps (air source and ground source)",
      "Coal-fired central heating"
    ],
    correctIndex: 2,
    explanation: "Heat pumps are a key technology in decarbonising heating. The government aims to install 600,000 heat pumps per year by 2028, requiring significant electrical installation work."
  },
  {
    id: "check-4",
    question: "What percentage of UK electricity came from renewable sources in recent years?",
    options: [
      "Less than 10%",
      "Around 25%",
      "Over 40%",
      "Around 75%"
    ],
    correctIndex: 2,
    explanation: "The UK has made significant progress in decarbonising electricity generation, with renewable sources now providing over 40% of electricity, reducing the carbon intensity of electrical systems."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The UK's Net Zero target was made legally binding through:",
    options: [
      "The Electricity Act 1989",
      "The Climate Change Act 2008 (amended 2019)",
      "Building Regulations Part L",
      "The Energy Act 2016"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Act 2008 was amended in 2019 to include the legally binding target of achieving Net Zero greenhouse gas emissions by 2050."
  },
  {
    id: 2,
    question: "The government's target for annual heat pump installations by 2028 is:",
    options: [
      "100,000 per year",
      "300,000 per year",
      "600,000 per year",
      "1,000,000 per year"
    ],
    correctAnswer: 2,
    explanation: "The government has set a target of 600,000 heat pump installations per year by 2028, creating significant demand for qualified electricians."
  },
  {
    id: 3,
    question: "From 2035, the government plans to:",
    options: [
      "Ban all new gas boiler installations in existing homes",
      "Ban the sale of new petrol and diesel cars",
      "Require all homes to have solar panels",
      "Make all electricity from renewable sources"
    ],
    correctAnswer: 1,
    explanation: "The government plans to end the sale of new petrol and diesel cars by 2035 (brought forward from 2040), accelerating the need for EV charging infrastructure."
  },
  {
    id: 4,
    question: "What is the Boiler Upgrade Scheme?",
    options: [
      "A requirement to upgrade all boilers by 2030",
      "A grant scheme to help homeowners install heat pumps",
      "A training programme for gas engineers",
      "A boiler efficiency rating system"
    ],
    correctAnswer: 1,
    explanation: "The Boiler Upgrade Scheme provides grants of up to several thousand pounds to help homeowners replace gas boilers with heat pumps, supporting the transition to low-carbon heating."
  },
  {
    id: 5,
    question: "How does electrification of heating support Net Zero goals?",
    options: [
      "Electric heating is always 100% efficient",
      "The electricity grid is decarbonising, making electric heating increasingly low-carbon",
      "Gas will still be used but captured at source",
      "It doesn't - gas is cleaner than electricity"
    ],
    correctAnswer: 1,
    explanation: "As the electricity grid becomes increasingly powered by renewables, electric heating (especially heat pumps) produces significantly less carbon than gas boilers."
  },
  {
    id: 6,
    question: "The Future Homes Standard will affect electricians by:",
    options: [
      "Reducing the amount of electrical work in new builds",
      "Requiring more complex electrical installations including low-carbon technologies",
      "Eliminating the need for consumer units",
      "Standardising all installations to a single design"
    ],
    correctAnswer: 1,
    explanation: "The Future Homes Standard will require electricians to install more complex systems including heat pump circuits, EV charging, solar PV integration, and smart controls."
  },
  {
    id: 7,
    question: "What is 'grid decarbonisation'?",
    options: [
      "Removing carbon dioxide from power station emissions",
      "Transitioning from fossil fuel power generation to renewable sources",
      "Reducing the number of power stations",
      "Making the grid more efficient"
    ],
    correctAnswer: 1,
    explanation: "Grid decarbonisation refers to the transition from coal and gas power generation to renewable sources like wind and solar, reducing the carbon intensity of electricity."
  },
  {
    id: 8,
    question: "Why is demand-side response becoming important in electrical installations?",
    options: [
      "To reduce the overall demand for electricity",
      "To help balance grid supply and demand as renewable generation varies",
      "To increase electricity prices",
      "To eliminate peak demand entirely"
    ],
    correctAnswer: 1,
    explanation: "Demand-side response helps balance the grid by shifting flexible loads to times of high renewable generation. Smart controls in electrical installations enable this."
  },
  {
    id: 9,
    question: "The 'carbon intensity' of electricity is measured in:",
    options: [
      "Kilowatts per hour",
      "Grams of CO2 per kilowatt-hour (gCO2/kWh)",
      "Percentage of renewables",
      "Cost per unit"
    ],
    correctAnswer: 1,
    explanation: "Carbon intensity measures how much CO2 is emitted per unit of electricity generated, expressed as grams of CO2 per kilowatt-hour. This varies throughout the day based on generation mix."
  },
  {
    id: 10,
    question: "How will Net Zero targets affect the electrical contracting industry?",
    options: [
      "Less work as buildings become more efficient",
      "Significant growth in work related to electrification and renewable technologies",
      "No significant change",
      "Only solar panel installers will benefit"
    ],
    correctAnswer: 1,
    explanation: "Net Zero targets will drive massive growth in electrical work including heat pump installations, EV charging infrastructure, solar PV systems, battery storage, and smart controls."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How does Net Zero affect my day-to-day work as an electrician?",
    answer: "Net Zero is driving significant changes in electrical installations. You'll increasingly work on heat pump circuits, EV charging points, solar PV systems, and smart energy management. Understanding these technologies and their integration is becoming essential for modern electricians."
  },
  {
    question: "Will gas boilers be banned?",
    answer: "New gas boiler installations in new build homes will effectively end with the Future Homes Standard from 2025. For existing homes, the government is encouraging the transition through grants rather than outright bans initially. However, hydrogen-ready boilers and heat pumps are the future direction."
  },
  {
    question: "What training do I need for Net Zero technologies?",
    answer: "Consider training in heat pump installation (MCS certification), solar PV systems, EV charging point installation (IMI or equivalent), and battery storage systems. These skills will be in high demand as the UK works towards Net Zero."
  },
  {
    question: "How will smart grids affect electrical installations?",
    answer: "Smart grids require homes and buildings to communicate with the electricity network. This means installing smart meters, time-of-use tariff compatible equipment, and controls that can respond to grid signals. Export limitation devices for solar PV and vehicle-to-grid chargers are examples."
  },
  {
    question: "Is there financial support for customers installing low-carbon technologies?",
    answer: "Yes, various schemes exist including the Boiler Upgrade Scheme for heat pumps, Smart Export Guarantee for solar PV, and potential VAT reductions on energy-saving materials. These incentives drive customer demand for these installations."
  },
  {
    question: "What is the role of battery storage in Net Zero?",
    answer: "Battery storage allows homes and businesses to store excess solar generation and cheap off-peak electricity for later use. This reduces grid strain, maximises renewable energy use, and can provide backup power. Battery installations are growing rapidly alongside solar PV."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

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
            <span>Module 2.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            UK Net Zero Targets
          </h1>
          <p className="text-white/80">
            Government commitments and their impact on electrical work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Net Zero 2050:</strong> Legally binding UK target</li>
              <li><strong>Future Homes 2025:</strong> 75-80% less CO2 in new homes</li>
              <li><strong>Heat pumps:</strong> 600,000/year target by 2028</li>
              <li><strong>Grid:</strong> Over 40% renewable electricity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Heat pump installations replacing boilers</li>
              <li><strong>Use:</strong> Upskill in low-carbon technologies</li>
              <li><strong>Apply:</strong> Advise customers on green options</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "UK Net Zero 2050 legal commitment and timeline",
              "Future Homes Standard requirements from 2025",
              "Impact of heat pump rollout on electrical work",
              "EV charging infrastructure growth projections",
              "Grid decarbonisation and its implications",
              "Career opportunities in green technologies"
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
            The UK's Net Zero Commitment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In 2019, the UK became the first major economy to pass legislation requiring Net Zero greenhouse gas emissions by 2050. This legally binding target under the Climate Change Act means every sector of the economy must decarbonise - and the built environment is responsible for approximately 40% of UK emissions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key milestones on the pathway to Net Zero:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>2025:</strong> Future Homes Standard - new homes 75-80% lower carbon</li>
                <li><strong>2028:</strong> 600,000 heat pumps installed per year</li>
                <li><strong>2030:</strong> 68% reduction in emissions vs 1990 levels</li>
                <li><strong>2035:</strong> End of new petrol/diesel car sales</li>
                <li><strong>2050:</strong> Net Zero achieved</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> These targets create massive opportunities for electricians trained in low-carbon technologies. The industry will need thousands more qualified installers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Electrification of Heat
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heating buildings accounts for around 30% of UK carbon emissions. The strategy to decarbonise heating centres on replacing gas boilers with electric heat pumps, which are 3-4 times more efficient than direct electric heating.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Pump Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Air Source Heat Pumps (ASHP) - most common</li>
                  <li>Ground Source Heat Pumps (GSHP)</li>
                  <li>Water Source Heat Pumps</li>
                  <li>Hybrid systems with boiler backup</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typically 16A or 32A dedicated circuit</li>
                  <li>May require supply upgrade</li>
                  <li>Integration with controls and smart systems</li>
                  <li>MCS certification for installations</li>
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
            Transport Electrification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The government's ban on new petrol and diesel car sales by 2035 is accelerating EV adoption. This requires massive expansion of charging infrastructure in homes, workplaces, and public locations.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A housing developer building 100 new homes must now provide every home with an EV charging point. This alone creates 100 dedicated EV circuits, typically 32A, plus any communal charging facilities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EV charging infrastructure growth:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic:</strong> Every new home with dedicated parking requires EV charging</li>
                <li><strong>Workplace:</strong> Employers installing charging for staff and visitors</li>
                <li><strong>Public:</strong> Rapid charging networks expanding nationally</li>
                <li><strong>Retrofit:</strong> Existing buildings adding charging facilities</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid Decarbonisation and Smart Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electricity grid is decarbonising rapidly, with renewable sources now providing over 40% of UK electricity. This makes electrical heating and transport increasingly low-carbon, but also requires smarter systems to manage variable renewable generation.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Solar</p>
                <p className="text-white/90 text-xs">Export management and battery integration</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Smart Controls</p>
                <p className="text-white/90 text-xs">Time-of-use tariffs and demand response</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">V2G</p>
                <p className="text-white/90 text-xs">Vehicle-to-grid bidirectional charging</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Understanding how installations interact with the wider grid is increasingly important. Smart meters, export limitation, and demand-side response are becoming standard requirements.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Skills to Develop</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Heat pump installation and commissioning (MCS accreditation)</li>
                <li>EV charging point installation (OZEV/OLEV approved)</li>
                <li>Solar PV and battery storage systems</li>
                <li>Smart home and building management systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Business Opportunities</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Heat pump installations - significant growth sector</li>
                <li>EV charging - domestic and commercial markets</li>
                <li>Solar and battery - particularly with rising energy costs</li>
                <li>Whole-house retrofit - combining multiple technologies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring the transition</strong> - These technologies are the future, not a niche market</li>
                <li><strong>Assuming gas will continue indefinitely</strong> - Policy direction is clear towards electrification</li>
                <li><strong>Not considering supply capacity</strong> - Heat pumps and EVs may require DNO upgrades</li>
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
                <p className="font-medium text-white mb-1">Key Dates</p>
                <ul className="space-y-0.5">
                  <li>2025: Future Homes Standard</li>
                  <li>2028: 600k heat pumps/year</li>
                  <li>2035: End petrol/diesel car sales</li>
                  <li>2050: Net Zero target</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Growing Markets</p>
                <ul className="space-y-0.5">
                  <li>Heat pump installations</li>
                  <li>EV charging infrastructure</li>
                  <li>Solar PV and battery storage</li>
                  <li>Smart energy management</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section1_2;
