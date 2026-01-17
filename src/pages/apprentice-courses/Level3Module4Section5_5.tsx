import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

// SEO metadata
const seoTitle = "Preventative Maintenance Strategies - Level 3 Fault Diagnosis";
const seoDescription = "Learn preventative maintenance strategies for electrical installations including planned inspection schedules, predictive maintenance techniques, and condition-based monitoring to prevent future faults.";

// Quick check questions for inline knowledge checks
const quickCheckQuestions = [
  {
    question: "What is the maximum recommended interval for periodic inspection of a domestic installation according to BS 7671 guidance?",
    options: ["5 years", "10 years", "3 years", "1 year"],
    correctAnswer: 1,
    explanation: "BS 7671 Guidance Note 3 recommends a maximum interval of 10 years for periodic inspection of domestic installations, though more frequent inspections may be required based on the installation's condition and use."
  },
  {
    question: "Which maintenance approach uses real-time monitoring to predict when equipment will fail?",
    options: ["Reactive maintenance", "Planned preventative maintenance", "Predictive maintenance", "Run-to-failure maintenance"],
    correctAnswer: 2,
    explanation: "Predictive maintenance uses real-time monitoring of equipment parameters such as temperature, vibration, and electrical characteristics to predict when failure is likely to occur, allowing intervention before breakdown."
  },
  {
    question: "What should be included in a preventative maintenance schedule for electrical installations?",
    options: ["Only visual inspections", "Only testing without records", "Visual inspection, testing, and documentation", "Repairs only when faults occur"],
    correctAnswer: 2,
    explanation: "A comprehensive preventative maintenance schedule should include regular visual inspections, periodic testing to verify safe operation, and thorough documentation of all findings, actions, and recommendations."
  },
  {
    question: "What is thermal imaging primarily used to detect in electrical installations?",
    options: ["Earth faults", "Loose connections and overloaded circuits", "Insulation resistance values", "RCD trip times"],
    correctAnswer: 1,
    explanation: "Thermal imaging detects elevated temperatures caused by loose connections, overloaded circuits, unbalanced loads, and failing components, allowing identification of problems before they cause faults or fires."
  }
];

// Quiz questions for end of section assessment
const quizQuestions = [
  {
    question: "According to BS 7671 Guidance Note 3, what is the recommended maximum interval for periodic inspection of commercial installations?",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 2,
    explanation: "BS 7671 Guidance Note 3 recommends a maximum interval of 5 years for periodic inspection of commercial installations, though the actual interval should be determined by the installation's condition, use, and environment."
  },
  {
    question: "What type of maintenance involves monitoring equipment condition to schedule repairs before failure?",
    options: ["Reactive maintenance", "Condition-based maintenance", "Run-to-failure maintenance", "Emergency maintenance"],
    correctAnswer: 1,
    explanation: "Condition-based maintenance monitors the actual condition of equipment through various techniques and schedules maintenance activities based on measured parameters, preventing unexpected failures."
  },
  {
    question: "Which of the following is NOT typically included in a planned preventative maintenance programme?",
    options: ["Scheduled visual inspections", "Regular testing of protective devices", "Waiting for equipment to fail before replacing", "Proactive component replacement"],
    correctAnswer: 2,
    explanation: "Waiting for equipment to fail is reactive maintenance, not preventative maintenance. PPM programmes focus on scheduled inspections, testing, and proactive replacement of components before they fail."
  },
  {
    question: "What temperature difference typically indicates a serious problem when using thermal imaging on electrical connections?",
    options: ["5C above ambient", "10C above similar connections", "20C or more above similar connections", "Any temperature difference"],
    correctAnswer: 2,
    explanation: "A temperature difference of 20C or more above similar connections under similar load conditions typically indicates a serious problem requiring immediate attention, such as a loose connection or failing component."
  },
  {
    question: "How often should RCDs in domestic installations be tested by the user?",
    options: ["Monthly", "Quarterly", "Annually", "Every 5 years"],
    correctAnswer: 1,
    explanation: "RCDs should be tested quarterly (every 3 months) by the user using the integral test button to verify the mechanical operation. This is in addition to periodic testing by a competent person."
  },
  {
    question: "What document should record the recommended interval for the next periodic inspection?",
    options: ["Building logbook only", "Electrical Installation Certificate", "Electrical Installation Condition Report", "Minor Works Certificate"],
    correctAnswer: 2,
    explanation: "The Electrical Installation Condition Report (EICR) includes a section for recording the recommended interval to the next inspection, based on the installation's condition, use, and environment."
  },
  {
    question: "Which maintenance strategy is most appropriate for critical systems where failure cannot be tolerated?",
    options: ["Run-to-failure", "Time-based replacement", "Condition-based maintenance with redundancy", "Annual inspection only"],
    correctAnswer: 2,
    explanation: "Critical systems require condition-based maintenance combined with redundancy to ensure continuous operation. This approach monitors equipment health while having backup systems available if primary equipment shows signs of impending failure."
  },
  {
    question: "What should be checked during routine maintenance of consumer units?",
    options: ["Only the main switch operation", "Tightness of connections, signs of overheating, and device operation", "Paint finish only", "Labels only"],
    correctAnswer: 1,
    explanation: "Routine maintenance of consumer units should include checking connection tightness, looking for signs of overheating or arcing, verifying device operation, confirming correct circuit identification, and ensuring the enclosure is in good condition."
  },
  {
    question: "What is the primary benefit of maintaining an electrical installation asset register?",
    options: ["Reduces electricity consumption", "Helps identify equipment age and maintenance history", "Eliminates the need for testing", "Reduces installation costs"],
    correctAnswer: 1,
    explanation: "An asset register tracks equipment details, installation dates, maintenance history, and expected lifespan, helping to plan replacements, schedule maintenance, and identify aging equipment that may need attention."
  },
  {
    question: "According to best practice, when should worn or damaged flexible cables be replaced?",
    options: ["Only when they cause a fault", "As soon as damage is identified", "At the next periodic inspection", "When the equipment is replaced"],
    correctAnswer: 1,
    explanation: "Damaged flexible cables should be replaced as soon as the damage is identified. Continuing to use damaged cables creates risk of electric shock and fire, and deterioration will only worsen over time."
  },
  {
    question: "What role does environmental monitoring play in preventative maintenance?",
    options: ["No role - environment doesn't affect electrical equipment", "Identifies conditions that accelerate equipment degradation", "Only relevant for outdoor installations", "Reduces testing requirements"],
    correctAnswer: 1,
    explanation: "Environmental monitoring identifies conditions such as excessive moisture, dust, temperature extremes, or corrosive atmospheres that accelerate equipment degradation, allowing proactive measures to protect equipment or increase maintenance frequency."
  },
  {
    question: "What should be the outcome of an effective preventative maintenance programme?",
    options: ["Elimination of all electrical testing", "Reduced equipment lifespan", "Fewer unexpected failures and extended equipment life", "Higher repair costs"],
    correctAnswer: 2,
    explanation: "An effective preventative maintenance programme results in fewer unexpected failures, extended equipment lifespan, improved safety, reduced emergency repair costs, and better compliance with regulatory requirements."
  }
];

// FAQ data
const faqs = [
  {
    question: "What is the difference between preventative and reactive maintenance?",
    answer: "Preventative maintenance involves scheduled inspections, testing, and component replacement before failure occurs, aiming to prevent faults. Reactive maintenance responds to faults after they happen. While reactive maintenance may seem cheaper initially, preventative maintenance typically reduces overall costs by preventing emergency callouts, minimising downtime, and extending equipment life. A balanced approach combines both strategies, with preventative maintenance for critical systems and reactive maintenance for non-critical items where failure has minimal impact."
  },
  {
    question: "How do I determine the appropriate inspection interval for an installation?",
    answer: "BS 7671 Guidance Note 3 provides recommended maximum intervals based on installation type: domestic (10 years), commercial (5 years), industrial (3 years), and special locations as specified. However, the actual interval should consider the installation's condition as found during the last inspection, environmental factors, intensity of use, and any modifications or additions. The inspector should recommend the next inspection interval on the EICR based on these factors. Critical or heavily used installations may require more frequent inspection."
  },
  {
    question: "What equipment is commonly used for predictive maintenance of electrical installations?",
    answer: "Common predictive maintenance equipment includes thermal imaging cameras for detecting hot spots and loose connections, insulation resistance testers for monitoring insulation degradation trends, power quality analysers for identifying harmonics and voltage issues, ultrasonic detectors for finding arcing and tracking, vibration analysers for rotating equipment, and data loggers for monitoring load patterns and temperatures over time. The choice of equipment depends on the installation type, criticality, and budget available."
  },
  {
    question: "How should I document preventative maintenance activities?",
    answer: "Documentation should include the date, time, and person performing maintenance, equipment or circuits maintained, specific checks and tests performed with results, any defects found and actions taken, parts replaced or repairs made, recommendations for future work, and the date of next scheduled maintenance. Records should be kept in a maintenance logbook or electronic system, cross-referenced with EICRs and other certification. Good documentation demonstrates due diligence and helps identify trends in equipment condition."
  },
  {
    question: "What are the signs that an installation needs more frequent maintenance?",
    answer: "Signs include frequent circuit breaker tripping or fuse failures, visible signs of overheating such as discolouration or melting, flickering lights or voltage fluctuations, unusual odours like burning or ozone, audible crackling or buzzing from equipment, corrosion or moisture ingress, aged equipment beyond expected lifespan, high ambient temperatures or harsh environments, and previous EICR findings of C2 or C3 observations. These indicators suggest increased maintenance frequency or immediate investigation is warranted."
  },
  {
    question: "What training do I need to perform preventative maintenance on electrical installations?",
    answer: "For work on electrical installations, you should be competent as defined in BS 7671, typically through qualifications such as City and Guilds 2391 for inspection and testing. For using specialist equipment like thermal imaging cameras, specific training in equipment operation and result interpretation is recommended. Knowledge of the Electricity at Work Regulations 1989 and employer's safe systems of work is essential. Some specialist maintenance such as high-voltage equipment or complex industrial systems may require additional qualifications and authorisation."
  }
];

const Level3Module4Section5_5 = () => {
  useSEO(seoTitle, seoDescription);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Level 3 Module 4 - Section 5.5
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Preventative Maintenance Strategies
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Implementing maintenance strategies to prevent future faults
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl border border-yellow-400/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What You Will Learn</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Understand the principles and benefits of preventative maintenance programmes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Apply recommended periodic inspection intervals from BS 7671 guidance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Implement condition-based and predictive maintenance techniques</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Create effective maintenance schedules and documentation systems</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Use thermal imaging and other diagnostic tools for proactive fault prevention</span>
            </li>
          </ul>
        </section>

        {/* Section 01: Maintenance Strategies Overview */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Maintenance Strategies Overview</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Electrical installations require ongoing maintenance to ensure continued safe operation and compliance with the Electricity at Work Regulations 1989. Different maintenance strategies offer varying approaches to managing equipment condition and preventing failures.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Types of Maintenance Strategy</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Reactive Maintenance (Run-to-Failure)</h4>
              <p className="text-white/70 text-sm mb-2">
                Equipment is used until it fails, then repaired or replaced. While this minimises routine costs, it results in unexpected downtime, emergency callout costs, and potential safety hazards.
              </p>
              <p className="text-white/70 text-sm">
                <strong>Appropriate for:</strong> Non-critical equipment where failure has minimal impact and replacement is straightforward. Examples include standard light fittings in non-essential areas.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Planned Preventative Maintenance (PPM)</h4>
              <p className="text-white/70 text-sm mb-2">
                Scheduled maintenance activities performed at fixed intervals regardless of equipment condition. Based on manufacturer recommendations, regulatory requirements, and historical failure data.
              </p>
              <p className="text-white/70 text-sm">
                <strong>Appropriate for:</strong> Most electrical installations where regular inspection and maintenance is required. Includes periodic inspection as required by BS 7671.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Condition-Based Maintenance (CBM)</h4>
              <p className="text-white/70 text-sm mb-2">
                Maintenance performed based on the actual measured condition of equipment. Uses monitoring techniques to identify deterioration and schedule maintenance before failure.
              </p>
              <p className="text-white/70 text-sm">
                <strong>Appropriate for:</strong> Critical equipment where monitoring is cost-effective. Includes thermal imaging of connections, insulation resistance trending, and load monitoring.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Predictive Maintenance</h4>
              <p className="text-white/70 text-sm mb-2">
                Advanced form of CBM using data analysis and algorithms to predict when equipment will fail. Requires continuous monitoring and sophisticated analysis tools.
              </p>
              <p className="text-white/70 text-sm">
                <strong>Appropriate for:</strong> High-value or critical systems where the cost of monitoring is justified by the consequences of failure. Often used in industrial and commercial settings.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Benefits of Preventative Maintenance</h3>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Improved Safety:</strong> Regular inspection identifies hazards before they cause injury or fire</li>
              <li><strong>Reduced Downtime:</strong> Planned maintenance minimises unexpected failures and emergency repairs</li>
              <li><strong>Extended Equipment Life:</strong> Proper maintenance prolongs the serviceable life of installations</li>
              <li><strong>Cost Savings:</strong> Preventing failures is typically cheaper than emergency repairs</li>
              <li><strong>Regulatory Compliance:</strong> Demonstrates due diligence under Electricity at Work Regulations</li>
              <li><strong>Energy Efficiency:</strong> Well-maintained equipment operates more efficiently</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctAnswer={quickCheckQuestions[0].correctAnswer}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Periodic Inspection Intervals */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Periodic Inspection Intervals</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              BS 7671 Guidance Note 3 provides recommended maximum intervals for periodic inspection based on installation type and use. These intervals form the foundation of any electrical maintenance programme.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recommended Maximum Intervals</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Installation Type</th>
                    <th className="border border-white/20 p-2 text-left">Maximum Interval</th>
                    <th className="border border-white/20 p-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2">Domestic premises</td>
                    <td className="border border-white/20 p-2">10 years</td>
                    <td className="border border-white/20 p-2">Or on change of occupancy</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Commercial premises</td>
                    <td className="border border-white/20 p-2">5 years</td>
                    <td className="border border-white/20 p-2">Offices, shops, hotels</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Industrial installations</td>
                    <td className="border border-white/20 p-2">3 years</td>
                    <td className="border border-white/20 p-2">Factories, workshops</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Theatres and cinemas</td>
                    <td className="border border-white/20 p-2">1 year</td>
                    <td className="border border-white/20 p-2">Places of public entertainment</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Agricultural and horticultural</td>
                    <td className="border border-white/20 p-2">3 years</td>
                    <td className="border border-white/20 p-2">Harsh environmental conditions</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Caravan parks</td>
                    <td className="border border-white/20 p-2">1 year</td>
                    <td className="border border-white/20 p-2">Fixed installation</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Swimming pools</td>
                    <td className="border border-white/20 p-2">1 year</td>
                    <td className="border border-white/20 p-2">Special location requirements</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Petrol filling stations</td>
                    <td className="border border-white/20 p-2">1 year</td>
                    <td className="border border-white/20 p-2">Hazardous area considerations</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Factors Affecting Inspection Frequency</h3>
            <p className="text-white/80 text-sm mb-3">
              The recommended intervals are maximum periods - actual intervals should be determined by considering:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Previous inspection findings:</strong> Installations with C2 or C3 observations may need more frequent inspection</li>
              <li><strong>Environmental conditions:</strong> Moisture, dust, chemicals, or temperature extremes accelerate deterioration</li>
              <li><strong>Intensity of use:</strong> Heavily used installations may require more frequent attention</li>
              <li><strong>Equipment age:</strong> Older installations may need closer monitoring</li>
              <li><strong>Modifications or additions:</strong> Changes since last inspection may warrant earlier re-inspection</li>
              <li><strong>Insurance requirements:</strong> Insurers may stipulate specific inspection intervals</li>
              <li><strong>Regulatory requirements:</strong> Some premises have statutory inspection requirements</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recording Next Inspection Date</h3>
            <p className="text-white/80 text-sm mb-3">
              The EICR includes a section for the inspector to recommend the interval to the next inspection. This should be based on the installation's specific circumstances rather than automatically applying the maximum interval. The recommendation should be clearly communicated to the duty holder responsible for the installation.
            </p>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctAnswer={quickCheckQuestions[1].correctAnswer}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Predictive Maintenance Techniques */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Predictive Maintenance Techniques</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Predictive maintenance uses various monitoring and analysis techniques to identify equipment deterioration before failure occurs. These techniques supplement regular periodic inspection with targeted condition assessment.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Thermal Imaging</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-white/70 text-sm mb-3">
                Thermal imaging cameras detect infrared radiation and display temperature differences visually. This non-contact technique is highly effective for identifying electrical problems without interrupting supply.
              </p>
              <h4 className="text-white font-semibold mb-2">Applications in Electrical Maintenance:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Detecting loose connections generating heat through resistance</li>
                <li>Identifying overloaded circuits and conductors</li>
                <li>Finding unbalanced three-phase loads</li>
                <li>Locating failing components such as contactors and relays</li>
                <li>Monitoring transformer and motor temperatures</li>
              </ul>
              <h4 className="text-white font-semibold mt-4 mb-2">Interpreting Thermal Images:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Less than 10C above similar connections: Monitor</li>
                <li>10-20C above similar connections: Schedule repair</li>
                <li>20-40C above similar connections: High priority repair</li>
                <li>Over 40C above similar connections: Immediate action required</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Insulation Resistance Trending</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-white/70 text-sm mb-3">
                Regular insulation resistance measurements over time can identify gradual deterioration before values fall below acceptable limits. Trending reveals degradation patterns that single measurements cannot show.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Record measurements consistently (same test voltage, temperature, humidity)</li>
                <li>Plot values over time to identify trends</li>
                <li>Compare similar circuits to identify anomalies</li>
                <li>Investigate sudden or accelerating decreases</li>
                <li>Account for environmental factors affecting readings</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Power Quality Monitoring</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-white/70 text-sm mb-3">
                Power quality analysers monitor electrical parameters over extended periods to identify issues that may not be apparent during snapshot testing.
              </p>
              <h4 className="text-white font-semibold mb-2">Parameters Monitored:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li><strong>Voltage variations:</strong> Sags, swells, transients, and interruptions</li>
                <li><strong>Harmonics:</strong> Distortion from non-linear loads affecting equipment life</li>
                <li><strong>Load profiles:</strong> Peak demands and load patterns</li>
                <li><strong>Power factor:</strong> Reactive power affecting efficiency</li>
                <li><strong>Phase balance:</strong> Uneven distribution across phases</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Ultrasonic Detection</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-white/70 text-sm mb-3">
                Ultrasonic detectors identify high-frequency sounds produced by electrical discharge, arcing, and tracking that are inaudible to humans.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Detects corona discharge on high-voltage equipment</li>
                <li>Identifies arcing in switchgear and connections</li>
                <li>Locates tracking across contaminated insulators</li>
                <li>Finds mechanical looseness in electrical equipment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctAnswer={quickCheckQuestions[2].correctAnswer}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Creating Maintenance Schedules */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Creating Maintenance Schedules</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Effective maintenance schedules ensure all equipment receives appropriate attention at suitable intervals. A well-designed schedule balances thorough coverage with practical resource constraints.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Developing an Asset Register</h3>
            <p className="text-white/80 text-sm mb-3">
              The foundation of any maintenance programme is a comprehensive asset register documenting all electrical equipment requiring maintenance:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Asset Register Contents:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Unique asset identifier and location</li>
                <li>Equipment description, manufacturer, and model</li>
                <li>Installation date and expected lifespan</li>
                <li>Rating and technical specifications</li>
                <li>Maintenance category and required frequency</li>
                <li>Links to manuals, certificates, and drawings</li>
                <li>Maintenance history and known issues</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Typical Maintenance Activities</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Frequency</th>
                    <th className="border border-white/20 p-2 text-left">Activity</th>
                    <th className="border border-white/20 p-2 text-left">Applies To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2">Quarterly</td>
                    <td className="border border-white/20 p-2">RCD test button operation by user</td>
                    <td className="border border-white/20 p-2">All RCDs</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Quarterly</td>
                    <td className="border border-white/20 p-2">Emergency lighting function test</td>
                    <td className="border border-white/20 p-2">Emergency luminaires</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Annually</td>
                    <td className="border border-white/20 p-2">Emergency lighting duration test</td>
                    <td className="border border-white/20 p-2">Emergency luminaires</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Annually</td>
                    <td className="border border-white/20 p-2">Visual inspection of accessible equipment</td>
                    <td className="border border-white/20 p-2">All visible equipment</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Annually</td>
                    <td className="border border-white/20 p-2">Thermal survey of distribution boards</td>
                    <td className="border border-white/20 p-2">Main and sub-distribution</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">As per EICR</td>
                    <td className="border border-white/20 p-2">Full periodic inspection and testing</td>
                    <td className="border border-white/20 p-2">Entire installation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Scheduling Considerations</h3>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Access requirements:</strong> Schedule when areas are accessible and occupancy permits</li>
              <li><strong>Shutdown coordination:</strong> Plan testing requiring isolation with operations</li>
              <li><strong>Seasonal factors:</strong> Consider heating/cooling loads and occupancy patterns</li>
              <li><strong>Resource availability:</strong> Ensure competent personnel and equipment are available</li>
              <li><strong>Regulatory deadlines:</strong> Meet statutory inspection requirements</li>
              <li><strong>Grouping opportunities:</strong> Combine related activities efficiently</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Maintenance Management Systems</h3>
            <p className="text-white/80 text-sm mb-3">
              Computerised maintenance management systems (CMMS) help schedule, track, and document maintenance activities:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Automatic scheduling and task generation</li>
              <li>Work order management and tracking</li>
              <li>Asset history and trend analysis</li>
              <li>Resource planning and allocation</li>
              <li>Compliance reporting and documentation</li>
              <li>Mobile access for field personnel</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 4 */}
        <InlineCheck
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctAnswer={quickCheckQuestions[3].correctAnswer}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Section 05: Documentation and Continuous Improvement */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Documentation and Continuous Improvement</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Effective documentation is essential for demonstrating compliance, tracking equipment condition, and continuously improving the maintenance programme. Records provide the evidence trail for due diligence.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Essential Documentation</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Certification and Compliance Records:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Electrical Installation Certificates (EICs)</li>
                <li>Minor Works Certificates</li>
                <li>Electrical Installation Condition Reports (EICRs)</li>
                <li>Equipment test certificates</li>
                <li>Calibration certificates for test instruments</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Maintenance Records:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Maintenance logbook or database entries</li>
                <li>Work orders and completion records</li>
                <li>Test results and measurements</li>
                <li>Thermal survey reports with images</li>
                <li>Defect notifications and remedial actions</li>
                <li>Parts and materials used</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Reference Documentation:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>As-installed drawings and schematics</li>
                <li>Equipment manuals and specifications</li>
                <li>Maintenance procedures and checklists</li>
                <li>Risk assessments and method statements</li>
                <li>Permit to work records</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Continuous Improvement Process</h3>
            <p className="text-white/80 text-sm mb-3">
              Maintenance programmes should evolve based on experience and changing circumstances:
            </p>

            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Improvement Cycle:</h4>
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Review:</strong> Analyse maintenance records, failure data, and inspection findings</li>
                <li><strong>Identify:</strong> Find patterns indicating equipment issues or programme gaps</li>
                <li><strong>Adjust:</strong> Modify maintenance intervals, activities, or techniques as needed</li>
                <li><strong>Implement:</strong> Update schedules, procedures, and documentation</li>
                <li><strong>Monitor:</strong> Track effectiveness of changes through ongoing records</li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Key Performance Indicators</h3>
            <p className="text-white/80 text-sm mb-3">
              Track metrics to measure maintenance programme effectiveness:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Schedule compliance:</strong> Percentage of planned maintenance completed on time</li>
              <li><strong>Emergency callouts:</strong> Number and cost of unplanned interventions</li>
              <li><strong>Equipment availability:</strong> Uptime of critical systems</li>
              <li><strong>Defect trends:</strong> Patterns in observations from inspections</li>
              <li><strong>Regulatory compliance:</strong> Status of required certifications</li>
              <li><strong>Cost efficiency:</strong> Maintenance cost per asset or per unit</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Building Maintenance Culture</h3>
            <p className="text-white/80 text-sm mb-3">
              Successful preventative maintenance requires organisational commitment:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Management support and adequate resourcing</li>
              <li>Clear responsibilities and accountability</li>
              <li>Training and competency development</li>
              <li>User awareness and reporting culture</li>
              <li>Integration with health and safety systems</li>
              <li>Regular programme review and improvement</li>
            </ul>
          </div>
        </section>

        {/* Practical Guidance Section */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Starting a Maintenance Programme</h3>
              <p className="text-white/70 text-sm">
                Begin with a thorough survey to establish baseline condition. Create an asset register, prioritise critical equipment, and develop realistic schedules. Start with essential activities and expand as resources permit. Document everything from the outset.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Justifying Maintenance Investment</h3>
              <p className="text-white/70 text-sm">
                Calculate total cost of ownership including emergency repairs, downtime, and safety incidents. Compare costs of preventative versus reactive approaches. Highlight regulatory compliance requirements and liability reduction. Present business case with clear metrics and benefits.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Common Pitfalls to Avoid</h3>
              <p className="text-white/70 text-sm">
                Do not rely solely on periodic inspection without interim monitoring. Avoid neglecting documentation or treating it as administrative burden. Do not ignore user reports of electrical issues. Ensure maintenance is performed by competent persons using calibrated equipment.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Box */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Recommended Intervals (GN3)</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Domestic: 10 years maximum</li>
                <li>Commercial: 5 years maximum</li>
                <li>Industrial: 3 years maximum</li>
                <li>Special locations: 1 year typically</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Thermal Imaging Action Levels</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>&lt;10C above: Monitor</li>
                <li>10-20C above: Schedule repair</li>
                <li>20-40C above: High priority</li>
                <li>&gt;40C above: Immediate action</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">User Checks</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>RCD test button: Quarterly</li>
                <li>Emergency lighting: Monthly visual</li>
                <li>Report defects immediately</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Documentation Required</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Asset register</li>
                <li>Maintenance schedule</li>
                <li>Work records</li>
                <li>All certificates (EIC, EICR, MWC)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8 sm:mb-12">
          <Quiz
            title="Section 5.5 Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Re-testing and Certification
            </Link>
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section6">
              Next: Section 6 - Professional Practice
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module4Section5_5;
