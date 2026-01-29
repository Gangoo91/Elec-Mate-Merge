import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Services Load Profiles - HNC Module 4 Section 1.6";
const DESCRIPTION = "Master building services load profile analysis: HVAC patterns, lighting profiles, small power diversity, 24-hour demand profiles, and seasonal variation in commercial buildings.";

const quickCheckQuestions = [
  {
    id: "hvac-peak",
    question: "When does HVAC load typically peak in a UK office building?",
    options: ["Early morning", "Mid-afternoon in summer", "Evening", "Night-time"],
    correctIndex: 1,
    explanation: "Office HVAC peaks in mid-afternoon during summer when cooling demand is highest due to solar gain, internal gains, and ambient temperature. Winter heating peak is typically early morning."
  },
  {
    id: "lighting-profile",
    question: "Office lighting load profile is primarily driven by:",
    options: ["Weather conditions", "Occupancy and daylight availability", "Energy prices", "Building age"],
    correctIndex: 1,
    explanation: "Lighting follows occupancy patterns with daylight-linked dimming reducing loads near windows during daytime. Peak lighting demand occurs on dark winter afternoons with full occupancy."
  },
  {
    id: "small-power-diversity",
    question: "Small power load in offices typically peaks:",
    options: ["At switch-on in the morning", "During lunch break", "In the early afternoon", "After 5pm"],
    correctIndex: 2,
    explanation: "Small power (IT equipment, monitors) builds during morning as staff arrive and peaks early afternoon with maximum occupancy. It reduces gradually in late afternoon as people leave."
  },
  {
    id: "seasonal-variation",
    question: "Which building type shows the greatest seasonal variation in electrical demand?",
    options: ["Data centre", "Hospital", "Air-conditioned office", "Warehouse"],
    correctIndex: 2,
    explanation: "Air-conditioned offices show significant seasonal variation: high summer cooling demand, lower winter demand (if gas-heated). Data centres and hospitals have more constant loads year-round."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a load profile?",
    options: [
      "A list of all connected equipment",
      "A graph showing how electrical demand varies over time",
      "The cable sizing schedule",
      "The switchgear rating table"
    ],
    correctAnswer: 1,
    explanation: "A load profile is a graphical representation showing how electrical demand varies over time - hourly, daily, weekly, or seasonally. It's essential for understanding peak demand periods."
  },
  {
    id: 2,
    question: "In a typical office, HVAC represents what proportion of total electrical load?",
    options: ["10-20%", "30-50%", "60-70%", "80-90%"],
    correctAnswer: 1,
    explanation: "HVAC typically represents 30-50% of total office electrical load, making it the largest single load category. This can vary significantly with climate and building design."
  },
  {
    id: 3,
    question: "Pre-conditioning HVAC starts before occupancy to:",
    options: [
      "Reduce energy consumption",
      "Achieve comfortable conditions at start of occupancy",
      "Test the equipment daily",
      "Reduce peak demand"
    ],
    correctAnswer: 1,
    explanation: "Pre-conditioning (starting HVAC 1-2 hours before occupancy) ensures comfortable temperatures when staff arrive. This shifts some load earlier but ensures conditions are met."
  },
  {
    id: 4,
    question: "Daylight-linked lighting control reduces electrical demand by:",
    options: [
      "Switching off lights when it's sunny",
      "Dimming artificial lights proportionally to daylight contribution",
      "Only operating lights at night",
      "Using motion sensors only"
    ],
    correctAnswer: 1,
    explanation: "Daylight linking dims artificial lights progressively as natural daylight increases, maintaining constant illuminance while reducing electrical consumption - typically saving 20-40%."
  },
  {
    id: 5,
    question: "A 24-hour building (hospital) compared to a daytime office has:",
    options: [
      "Higher peak demand but lower average",
      "Lower peak demand but higher average",
      "Similar peak and average",
      "Higher peak and higher average"
    ],
    correctAnswer: 1,
    explanation: "24-hour buildings have more consistent demand throughout the day, resulting in lower peaks but higher average consumption. The load factor (average/peak) is higher."
  },
  {
    id: 6,
    question: "Which factor most affects seasonal electrical demand variation in UK buildings?",
    options: [
      "Lighting hours",
      "Cooling vs heating mode",
      "Occupancy patterns",
      "Equipment efficiency"
    ],
    correctAnswer: 1,
    explanation: "The shift between cooling mode (summer) and heating mode (winter) causes the greatest seasonal variation. Cooling is electrically intensive; heating is often gas-fired with only fans/pumps electrical."
  },
  {
    id: 7,
    question: "Small power load factor in offices is typically:",
    options: ["10-20%", "30-50%", "70-80%", "90-100%"],
    correctAnswer: 1,
    explanation: "Small power has low load factor (30-50%) because equipment isn't continuously at full load - PCs idle, monitors sleep, not all desks occupied. This justifies high diversity factors."
  },
  {
    id: 8,
    question: "Retail lighting demand peaks when?",
    options: [
      "Early morning",
      "Mid-afternoon",
      "During trading hours consistently",
      "Late evening"
    ],
    correctAnswer: 2,
    explanation: "Retail lighting is typically at constant full output during all trading hours to maintain consistent appearance and encourage sales. It steps down only outside trading hours."
  },
  {
    id: 9,
    question: "Weekend electrical demand in an office building is typically:",
    options: [
      "Zero",
      "10-30% of weekday peak",
      "50-70% of weekday peak",
      "Same as weekday"
    ],
    correctAnswer: 1,
    explanation: "Weekend demand is typically 10-30% of weekday peak, covering base loads: servers, security, emergency lighting, minimal HVAC. Some areas may operate for Saturday working."
  },
  {
    id: 10,
    question: "Understanding load profiles helps with:",
    options: [
      "Only cable sizing",
      "Maximum demand assessment, tariff selection, and load management",
      "Determining cable colours",
      "Selecting light fittings"
    ],
    correctAnswer: 1,
    explanation: "Load profiles inform multiple decisions: accurate maximum demand assessment, optimal tariff selection (time-of-use rates), demand-side management, PV/battery sizing, and generator capacity."
  }
];

const faqs = [
  {
    question: "How do I obtain load profile data for design?",
    answer: "For existing buildings, request half-hourly metering data from the energy supplier or use sub-metering. For new buildings, use CIBSE benchmarks, TM54 operational energy prediction methodology, or data from similar buildings. Building simulation software can generate predicted profiles."
  },
  {
    question: "How does building fabric affect load profiles?",
    answer: "Well-insulated buildings with high thermal mass have 'flatter' HVAC profiles - slower heat-up/cool-down means less pronounced peaks. Poor fabric leads to spiky profiles responding quickly to external conditions. Good fabric allows load shifting (pre-cooling/heating) more effectively."
  },
  {
    question: "What is coincident demand and why does it matter?",
    answer: "Coincident demand is loads that operate simultaneously and together determine peak demand. Understanding coincidence helps avoid over-designing - if HVAC peaks at 3pm and cooking peaks at 12pm, they don't fully add. Non-coincident loads reduce overall diversity factor."
  },
  {
    question: "How do controls affect load profiles?",
    answer: "Building management systems (BMS) significantly shape load profiles through: optimal start/stop (shifting HVAC timing), load shedding (limiting peaks), night setback (reducing out-of-hours loads), and demand response (responding to grid signals). Good controls flatten peaks and shift loads."
  },
  {
    question: "How does home working affect office load profiles?",
    answer: "Hybrid working reduces average occupancy, lowering overall demand but potentially maintaining similar peaks on high-attendance days. Small power reduces proportionally with occupancy; HVAC may not reduce linearly due to minimum ventilation requirements and zone-based systems."
  },
  {
    question: "Why do data centres have flat load profiles?",
    answer: "Data centres have continuous IT load (24/7 operation) with cooling closely tracking IT load. There's minimal diurnal variation - servers run constantly. This results in high load factor (0.85-0.95) and consistent maximum demand, making capacity planning straightforward but with less diversity benefit."
  }
];

const HNCModule4Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Services Load Profiles
          </h1>
          <p className="text-white/80">
            Analysing how electrical demand varies by time, season, and building type in commercial installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Load profile:</strong> Demand variation over time</li>
              <li className="pl-1"><strong>HVAC:</strong> Typically 30-50% of office load</li>
              <li className="pl-1"><strong>Peak timing:</strong> Usually mid-afternoon (cooling)</li>
              <li className="pl-1"><strong>Load factor:</strong> Average ÷ peak demand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Office peak:</strong> 10am-4pm weekdays</li>
              <li className="pl-1"><strong>Retail peak:</strong> Consistent during trading</li>
              <li className="pl-1"><strong>Hospital:</strong> 24-hour, flatter profile</li>
              <li className="pl-1"><strong>Seasonal:</strong> Summer cooling dominant</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Analyse HVAC load patterns and their drivers",
              "Understand lighting profiles with daylight and occupancy controls",
              "Apply small power diversity based on usage patterns",
              "Construct 24-hour load profiles for different building types",
              "Account for seasonal variation in demand",
              "Use load profiles for demand management and tariff optimisation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: HVAC Load Patterns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HVAC Load Patterns
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HVAC systems typically represent the largest single electrical load in commercial buildings,
              and their load profile is highly variable depending on time, weather, and building occupancy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Office HVAC Daily Profile (Summer)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Peak</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">00:00-05:00</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Night setback, minimal circulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">05:00-07:00</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                      <td className="border border-white/10 px-3 py-2">Pre-conditioning, building cool-down</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">07:00-09:00</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">Building occupied, fresh air loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">09:00-12:00</td>
                      <td className="border border-white/10 px-3 py-2">80-95%</td>
                      <td className="border border-white/10 px-3 py-2">Rising solar gain, internal gains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12:00-16:00</td>
                      <td className="border border-white/10 px-3 py-2">95-100%</td>
                      <td className="border border-white/10 px-3 py-2">Peak cooling load (afternoon)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16:00-19:00</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">Declining occupancy, cooling off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19:00-00:00</td>
                      <td className="border border-white/10 px-3 py-2">15-30%</td>
                      <td className="border border-white/10 px-3 py-2">Night setback begins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Load Drivers</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">External Factors</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Ambient temperature (heating/cooling)</li>
                    <li>Solar gain through glazing</li>
                    <li>Humidity (latent cooling)</li>
                    <li>Wind (infiltration)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Internal Factors</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Occupancy (people heat gain)</li>
                    <li>Equipment (IT, lighting heat)</li>
                    <li>Fresh air requirement</li>
                    <li>Process loads (kitchens, labs)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC System Types and Profiles</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Profile Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant volume</td>
                      <td className="border border-white/10 px-3 py-2">Flat profile when running</td>
                      <td className="border border-white/10 px-3 py-2">~1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAV (variable air volume)</td>
                      <td className="border border-white/10 px-3 py-2">Varies with zone demand</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan coil units</td>
                      <td className="border border-white/10 px-3 py-2">Zone-by-zone variation</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF/VRV</td>
                      <td className="border border-white/10 px-3 py-2">Inverter modulation</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller plant</td>
                      <td className="border border-white/10 px-3 py-2">Staged loading</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Modern variable-speed HVAC systems have lower diversity than constant-speed systems, providing better part-load efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Lighting Profiles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Load Profiles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting profiles are driven by occupancy patterns and increasingly by daylight-linked
              controls that modulate artificial light based on natural daylight contribution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Office Lighting Profile (Winter Day)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Installed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">00:00-06:00</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                      <td className="border border-white/10 px-3 py-2">Security/emergency only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">06:00-08:00</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">Cleaners, early arrivals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">08:00-09:00</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">Staff arriving, daylight low</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">09:00-12:00</td>
                      <td className="border border-white/10 px-3 py-2">70-85%</td>
                      <td className="border border-white/10 px-3 py-2">Full occupancy, some daylight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12:00-14:00</td>
                      <td className="border border-white/10 px-3 py-2">60-75%</td>
                      <td className="border border-white/10 px-3 py-2">Lunch break, maximum daylight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14:00-17:00</td>
                      <td className="border border-white/10 px-3 py-2">85-95%</td>
                      <td className="border border-white/10 px-3 py-2">Fading daylight, full occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17:00-19:00</td>
                      <td className="border border-white/10 px-3 py-2">40-70%</td>
                      <td className="border border-white/10 px-3 py-2">Staff leaving, some working late</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19:00-00:00</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Late workers, cleaners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Control Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Occupancy sensing:</strong> PIR/ultrasonic sensors switch off in unoccupied areas (15-30% saving)</li>
                <li className="pl-1"><strong>Daylight linking:</strong> Photocells dim lights near windows proportionally to daylight (20-40% saving)</li>
                <li className="pl-1"><strong>Time scheduling:</strong> BMS controls switch off outside occupied hours (10-20% saving)</li>
                <li className="pl-1"><strong>Task/ambient:</strong> Lower general light, higher task light (10-20% saving)</li>
                <li className="pl-1"><strong>Scene setting:</strong> Pre-programmed levels for different activities</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Profiles by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Profile Shape</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Peak Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office</td>
                      <td className="border border-white/10 px-3 py-2">Daytime peak, evening decline</td>
                      <td className="border border-white/10 px-3 py-2">Winter afternoons</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">Constant during trading</td>
                      <td className="border border-white/10 px-3 py-2">All trading hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">School</td>
                      <td className="border border-white/10 px-3 py-2">Term-time weekdays only</td>
                      <td className="border border-white/10 px-3 py-2">08:00-16:00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">24-hour, dimmed at night</td>
                      <td className="border border-white/10 px-3 py-2">07:00-22:00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">Shift-based, high bay</td>
                      <td className="border border-white/10 px-3 py-2">Operating shifts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Peak lighting load rarely coincides with peak HVAC - lighting peaks on dark winter days, HVAC peaks on hot summer days.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Small Power Diversity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Small Power and IT Load Profiles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Small power (socket outlets serving IT equipment, personal devices, and miscellaneous loads)
              has a distinctive profile driven by occupancy and working patterns.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Office Small Power Profile</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Connected</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">00:00-07:00</td>
                      <td className="border border-white/10 px-3 py-2">5-15%</td>
                      <td className="border border-white/10 px-3 py-2">Standby loads, servers, always-on</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">07:00-09:00</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">Early arrivals booting up</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">09:00-12:00</td>
                      <td className="border border-white/10 px-3 py-2">35-50%</td>
                      <td className="border border-white/10 px-3 py-2">Building to peak occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12:00-14:00</td>
                      <td className="border border-white/10 px-3 py-2">30-45%</td>
                      <td className="border border-white/10 px-3 py-2">Lunch break, monitors sleep</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14:00-17:00</td>
                      <td className="border border-white/10 px-3 py-2">40-55%</td>
                      <td className="border border-white/10 px-3 py-2">Peak afternoon activity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17:00-19:00</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">Staff leaving, shutdown</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19:00-00:00</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Late workers, standby</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Small Power Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Desk Equipment (per workstation)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>PC/laptop: 50-150W</li>
                    <li>Monitor(s): 30-80W each</li>
                    <li>Docking station: 20-40W</li>
                    <li>Phone chargers: 5-20W</li>
                    <li>Desk fan/heater: 0-2000W</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Shared Equipment</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Printers/MFDs: 200-1500W</li>
                    <li>Vending machines: 300-800W</li>
                    <li>Water coolers: 100-200W</li>
                    <li>Kettles: 2000-3000W</li>
                    <li>Microwaves: 800-1500W</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Small Power Benchmarks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Office Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connected (W/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversified (W/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">25-35</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High density/call centre</td>
                      <td className="border border-white/10 px-3 py-2">40-60</td>
                      <td className="border border-white/10 px-3 py-2">20-30</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dealing room</td>
                      <td className="border border-white/10 px-3 py-2">80-120</td>
                      <td className="border border-white/10 px-3 py-2">50-80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hybrid working</td>
                      <td className="border border-white/10 px-3 py-2">25-35</td>
                      <td className="border border-white/10 px-3 py-2">8-12</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Trend:</strong> Equipment efficiency improves, but device count increases. Net effect is relatively stable demand per workstation, but lower demand per m² as desk density increases.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: 24-Hour and Seasonal Profiles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            24-Hour and Seasonal Variations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding both daily and seasonal patterns is essential for accurate maximum demand
              assessment, tariff selection, and demand-side management strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Composite Office Profile (% of Annual Peak)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Summer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Winter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Night (00:00-06:00)</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Base loads only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Morning (06:00-09:00)</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">Pre-heat/cool, arrival</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Midday (09:00-14:00)</td>
                      <td className="border border-white/10 px-3 py-2">80-95%</td>
                      <td className="border border-white/10 px-3 py-2">70-85%</td>
                      <td className="border border-white/10 px-3 py-2">Building up to peak</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Afternoon (14:00-18:00)</td>
                      <td className="border border-white/10 px-3 py-2">90-100%</td>
                      <td className="border border-white/10 px-3 py-2">75-90%</td>
                      <td className="border border-white/10 px-3 py-2">Peak period (summer)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evening (18:00-00:00)</td>
                      <td className="border border-white/10 px-3 py-2">25-45%</td>
                      <td className="border border-white/10 px-3 py-2">20-35%</td>
                      <td className="border border-white/10 px-3 py-2">Declining, late workers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weekend</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Base loads, security</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seasonal Variation by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Summer/Winter Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air-conditioned office</td>
                      <td className="border border-white/10 px-3 py-2">1.3-1.6</td>
                      <td className="border border-white/10 px-3 py-2">Cooling vs gas heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">All-electric office</td>
                      <td className="border border-white/10 px-3 py-2">0.8-1.2</td>
                      <td className="border border-white/10 px-3 py-2">Cooling and heating electric</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (non-food)</td>
                      <td className="border border-white/10 px-3 py-2">1.1-1.3</td>
                      <td className="border border-white/10 px-3 py-2">Cooling, lighting similar</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supermarket</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.1</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.2</td>
                      <td className="border border-white/10 px-3 py-2">24-hour, mixed loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">0.95-1.05</td>
                      <td className="border border-white/10 px-3 py-2">IT constant, cooling varies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Factor Comparison</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2"><strong>Load Factor = Average Demand ÷ Peak Demand</strong></p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Office: 0.35-0.50 (large daily variation)</li>
                  <li className="pl-1">Retail: 0.50-0.65 (consistent during trading)</li>
                  <li className="pl-1">Hospital: 0.65-0.80 (24-hour operation)</li>
                  <li className="pl-1">Data centre: 0.85-0.95 (very consistent)</li>
                  <li className="pl-1">Industrial (continuous): 0.70-0.85</li>
                </ul>
                <p className="text-xs text-white/60 mt-2">Higher load factor = flatter profile = less diversity benefit but more predictable demand</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tariff implication:</strong> Buildings with low load factor benefit from time-of-use tariffs; high load factor buildings may prefer simple kWh rates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Daily Profile</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office has HVAC 200kW, lighting 60kW, small power 80kW installed. Estimate 3pm summer demand.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>3pm summer estimates:</p>
                <p>HVAC: 200kW × 95% (near peak) = 190kW</p>
                <p>Lighting: 60kW × 70% (daylight available) = 42kW</p>
                <p>Small power: 80kW × 45% (peak occupancy) = 36kW</p>
                <p className="mt-2">Total = 190 + 42 + 36 = <strong>268kW</strong></p>
                <p className="text-white/60 mt-2">Compare to connected load: 340kW (79% diversity)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Load Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office uses 50,000 kWh/month. Peak demand is 280kW. Calculate load factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Hours in month: ~720 hours</p>
                <p>Average demand = 50,000 kWh ÷ 720h = 69.4kW</p>
                <p className="mt-2">Load factor = Average ÷ Peak</p>
                <p>Load factor = 69.4 ÷ 280 = <strong>0.25 (25%)</strong></p>
                <p className="mt-2 text-white/60">Low load factor indicates significant daily variation</p>
                <p className="text-green-400">Opportunity for demand management and TOU tariffs</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Seasonal Variation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office has 350kW summer peak (cooling) and 280kW winter peak (gas heating). What supply capacity?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Annual peak = higher of summer/winter = 350kW</p>
                <p>Summer/winter ratio = 350/280 = 1.25</p>
                <p className="mt-2">Supply sizing:</p>
                <p>Peak demand: 350kW</p>
                <p>At 0.9 pf: 350 ÷ 0.9 = 389 kVA</p>
                <p>With 20% growth: 389 × 1.2 = 467 kVA</p>
                <p className="mt-2">Request: <strong>500 kVA supply</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Load Profile Analysis Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify major load categories (HVAC, lighting, small power)</li>
                <li className="pl-1">Determine operational patterns for each category</li>
                <li className="pl-1">Estimate coincident peak (when do loads peak together?)</li>
                <li className="pl-1">Consider seasonal variation (summer cooling vs winter heating)</li>
                <li className="pl-1">Calculate load factor from energy data if available</li>
                <li className="pl-1">Use profiles to inform demand management strategies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">HVAC: <strong>30-50%</strong> of office load</li>
                <li className="pl-1">Small power diversity: <strong>30-50%</strong></li>
                <li className="pl-1">Office load factor: <strong>0.35-0.50</strong></li>
                <li className="pl-1">Summer/winter ratio (AC office): <strong>1.3-1.6</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring time patterns</strong> — Peak time matters for demand charges</li>
                <li className="pl-1"><strong>Summing non-coincident peaks</strong> — Lighting and cooling peak differently</li>
                <li className="pl-1"><strong>Using annual average for sizing</strong> — Peak demand determines capacity</li>
                <li className="pl-1"><strong>Assuming constant profiles</strong> — Usage patterns change over time</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Office Load Breakdown</p>
                <ul className="space-y-0.5">
                  <li>HVAC: 30-50% of total</li>
                  <li>Lighting: 15-25% of total</li>
                  <li>Small power: 20-35% of total</li>
                  <li>Other: 5-15% of total</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Peak Times</p>
                <ul className="space-y-0.5">
                  <li>HVAC: 14:00-16:00 (summer)</li>
                  <li>Lighting: 15:00-17:00 (winter)</li>
                  <li>Small power: 14:00-16:00</li>
                  <li>Overall: 14:00-16:00 (summer)</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Future Load Allowances
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_6;
