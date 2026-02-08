import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Efficiency in Maintenance - MOET Module 1 Section 5.3";
const DESCRIPTION = "Comprehensive guide to energy efficiency in electrical maintenance: ISO 50001, motor alignment, power factor correction, LED upgrades, VSD maintenance, compressed air leak detection, BEMS maintenance, energy auditing and metering practices aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "iso-50001",
    question: "What is the purpose of ISO 50001?",
    options: [
      "To set maximum electricity prices for industrial users",
      "To provide a framework for establishing an energy management system to improve energy performance",
      "To specify the minimum efficiency of electric motors",
      "To regulate the carbon emissions from power stations"
    ],
    correctIndex: 1,
    explanation: "ISO 50001 is an international standard that provides organisations with a systematic framework for establishing an energy management system (EnMS). It follows the Plan-Do-Check-Act cycle to continually improve energy performance, including energy efficiency, energy use and energy consumption. Many maintenance activities directly support the objectives of an ISO 50001 system."
  },
  {
    id: "power-factor",
    question: "What is the primary benefit of maintaining power factor correction (PFC) equipment?",
    options: [
      "It reduces the voltage supplied to equipment",
      "It reduces reactive power demand, lowering electricity costs and freeing up system capacity",
      "It increases the speed of electric motors",
      "It eliminates the need for circuit protection"
    ],
    correctIndex: 1,
    explanation: "Power factor correction capacitors reduce the reactive power (kVAr) drawn from the supply, bringing the power factor closer to unity (1.0). This reduces electricity costs (many suppliers charge reactive power penalties), frees up transformer and cable capacity, reduces network losses, and improves voltage regulation. Maintenance of PFC equipment is a direct contribution to energy efficiency."
  },
  {
    id: "motor-misalignment",
    question: "How does motor misalignment affect energy consumption?",
    options: [
      "It has no effect on energy consumption",
      "It reduces energy consumption by creating less friction",
      "It increases energy consumption due to additional mechanical losses, vibration and bearing wear",
      "It only affects energy consumption if the motor is larger than 11 kW"
    ],
    correctIndex: 2,
    explanation: "Motor misalignment — angular or parallel offset between the motor shaft and the driven equipment shaft — causes increased mechanical losses through vibration, excessive bearing loading, coupling wear and heat generation. Studies show that misalignment can increase motor energy consumption by 2-5%, and in severe cases even more. Proper laser alignment during maintenance restores optimal efficiency."
  },
  {
    id: "compressed-air",
    question: "Why is compressed air leak detection an energy efficiency priority for maintenance technicians?",
    options: [
      "Because compressed air leaks cause noise complaints",
      "Because compressed air is one of the most energy-intensive utilities, and leaks can waste 20-30% of total compressor output",
      "Because compressed air leaks are a safety hazard",
      "Because regulatory inspections require annual leak surveys"
    ],
    correctIndex: 1,
    explanation: "Compressed air is often called the 'fourth utility' and is one of the most expensive forms of energy in industrial settings — only about 10% of the electrical energy input to a compressor is converted to useful work. Industry studies consistently show that 20-30% of compressed air output is lost through leaks. Regular ultrasonic leak surveys and prompt repair are high-value energy efficiency activities."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A maintenance technician discovers that a 55 kW motor is running with poor shaft alignment. The estimated energy waste is 3%. Over 8,000 operating hours per year at £0.25/kWh, what is the approximate annual energy cost of this misalignment?",
    options: [
      "£165",
      "£330",
      "£3,300",
      "£33,000"
    ],
    correctAnswer: 2,
    explanation: "Energy waste = 55 kW x 0.03 (3%) = 1.65 kW wasted. Annual cost = 1.65 kW x 8,000 hours x £0.25/kWh = £3,300. This demonstrates why motor alignment is a significant energy efficiency activity — a relatively quick maintenance task can yield substantial energy savings on large motors."
  },
  {
    id: 2,
    question: "Which of the following maintenance activities has the greatest potential impact on energy efficiency?",
    options: [
      "Replacing a broken light switch",
      "Cleaning and maintaining heat exchanger surfaces on HVAC equipment",
      "Labelling a distribution board",
      "Replacing a damaged socket outlet faceplate"
    ],
    correctAnswer: 1,
    explanation: "Cleaning heat exchanger surfaces (condenser and evaporator coils) on HVAC equipment directly affects system efficiency. Fouled heat exchangers force compressors to work harder, increasing energy consumption by 10-30%. Maintaining clean heat transfer surfaces is one of the highest-impact energy efficiency activities a maintenance technician can perform."
  },
  {
    id: 3,
    question: "What does a variable speed drive (VSD) do to improve energy efficiency?",
    options: [
      "It increases the voltage to the motor to make it run faster",
      "It varies the frequency and voltage supplied to the motor to match speed with demand, reducing energy waste at partial loads",
      "It converts AC to DC to reduce losses",
      "It bypasses the motor starter to save energy during start-up"
    ],
    correctAnswer: 1,
    explanation: "A VSD (also called a variable frequency drive or inverter) adjusts the frequency and voltage of the power supplied to an AC motor, allowing its speed to be varied to match the actual demand. For centrifugal loads (fans and pumps), the power consumption varies with the cube of the speed — so reducing speed by 20% reduces power consumption by approximately 49%. VSDs are one of the most effective energy efficiency technologies."
  },
  {
    id: 4,
    question: "When maintaining LED lighting installations, what should be checked to ensure continued energy efficiency?",
    options: [
      "Only the LED driver for visible damage",
      "Driver efficiency, luminaire cleanliness, control system operation (sensors/timers/daylight linking), and emergency lighting battery condition",
      "The colour temperature of the LEDs only",
      "Whether the LEDs have been approved by the Energy Saving Trust"
    ],
    correctAnswer: 1,
    explanation: "Maintaining LED energy efficiency requires checking multiple factors: driver condition and efficiency (failing drivers draw more power), luminaire cleanliness (dust reduces light output, potentially requiring higher settings), control system operation (faulty sensors or timers can leave lights on unnecessarily), and emergency lighting function. A holistic approach ensures the energy savings from the LED upgrade are sustained."
  },
  {
    id: 5,
    question: "Insulation degradation on electrical cables and equipment leads to energy losses because:",
    options: [
      "The cable becomes physically shorter",
      "Leakage currents flow through the degraded insulation, wasting energy as heat and potentially causing tripping",
      "The cable resistance decreases, allowing too much current to flow",
      "Insulation degradation only affects safety, not energy efficiency"
    ],
    correctAnswer: 1,
    explanation: "As insulation degrades (due to ageing, heat, moisture or contamination), its resistance decreases, allowing leakage currents to flow from conductors through the insulation to earth. These leakage currents waste energy as heat, can cause nuisance tripping of RCDs, and indicate a deteriorating installation. Insulation resistance testing during maintenance identifies degradation before it becomes a significant energy or safety issue."
  },
  {
    id: 6,
    question: "A Building Energy Management System (BEMS) contributes to energy efficiency by:",
    options: [
      "Generating renewable energy within the building",
      "Monitoring and controlling building services (heating, cooling, lighting, ventilation) to optimise energy use based on occupancy, time and conditions",
      "Replacing the need for maintenance technicians",
      "Measuring only electricity consumption"
    ],
    correctAnswer: 1,
    explanation: "A BEMS uses sensors, controllers and actuators to monitor and control building services — adjusting heating, cooling, lighting and ventilation based on actual conditions (occupancy, time of day, external temperature, daylight levels). A well-commissioned and maintained BEMS can reduce building energy consumption by 10-20%. Maintenance of BEMS components (sensors, actuators, controllers, communications) is essential for sustained performance."
  },
  {
    id: 7,
    question: "What is sub-metering and why is it important for energy management?",
    options: [
      "Using smaller electricity meters to save space",
      "Installing additional meters on individual circuits, floors or equipment to identify where energy is being used and highlight waste",
      "Reading the main meter more frequently",
      "Estimating energy use from equipment nameplates"
    ],
    correctAnswer: 1,
    explanation: "Sub-metering involves installing additional energy meters downstream of the main fiscal meter to measure consumption by individual circuits, floors, zones, departments or major items of equipment. This granular data allows energy managers to identify where energy is being wasted, set targets for specific areas, detect abnormal consumption patterns, and verify the impact of efficiency improvements. Maintenance technicians often install and maintain sub-meters."
  },
  {
    id: 8,
    question: "During an energy audit of an electrical installation, a maintenance technician should look for:",
    options: [
      "Only items that pose an immediate safety hazard",
      "Oversized equipment, poor power factor, lighting left on in unoccupied areas, worn drive belts, air leaks, and equipment running outside its optimal parameters",
      "Expired warranties on equipment",
      "Opportunities to increase the installed electrical load"
    ],
    correctAnswer: 1,
    explanation: "An energy audit during maintenance identifies opportunities to reduce energy waste. This includes oversized motors and transformers (part-loaded equipment is less efficient), poor power factor, unnecessary lighting and HVAC operation, worn drive belts causing slip losses, compressed air leaks, poor insulation, and equipment operating outside its design parameters. These observations feed into the continuous improvement cycle."
  },
  {
    id: 9,
    question: "Proper belt tension on a motor-driven system is important for energy efficiency because:",
    options: [
      "Loose belts look unprofessional during audits",
      "Incorrect belt tension — whether too loose (causing slip and heat) or too tight (causing excessive bearing load) — increases energy losses",
      "It makes the motor quieter",
      "It extends the warranty on the motor"
    ],
    correctAnswer: 1,
    explanation: "Belt tension directly affects energy efficiency. Loose belts slip, converting energy into heat and noise rather than useful work — slip losses can be 3-5% of transmitted power. Overtight belts cause excessive bearing loads on both motor and driven equipment, increasing friction losses and accelerating wear. Correct tension, checked with a tension gauge, ensures optimal power transmission and minimum energy waste."
  },
  {
    id: 10,
    question: "What is the energy efficiency benefit of maintaining proper bearing lubrication on electric motors?",
    options: [
      "Lubrication reduces the electrical resistance of the motor windings",
      "Proper lubrication reduces friction losses in the bearings, lowering energy consumption and extending bearing life",
      "Over-lubrication improves cooling of the motor",
      "Lubrication has no effect on energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Bearing friction is a direct energy loss — it converts electrical energy into heat rather than useful mechanical work. Under-lubrication increases friction, raises operating temperature, and wastes energy. Over-lubrication can also increase losses as the bearing has to push through excess grease, and can cause overheating. Correct lubrication (right type, right quantity, right interval) minimises friction losses and extends bearing life."
  },
  {
    id: 11,
    question: "Power quality monitoring during maintenance can identify energy efficiency issues such as:",
    options: [
      "The colour of the cable insulation",
      "Voltage imbalance, harmonic distortion, power factor, and voltage regulation issues that cause additional losses in motors, transformers and cables",
      "The brand of equipment installed",
      "Whether the correct fuse ratings are installed"
    ],
    correctAnswer: 1,
    explanation: "Power quality problems directly affect energy efficiency. Voltage imbalance on three-phase motors causes increased losses and overheating. Harmonic distortion from non-linear loads (VFDs, LED drivers, IT equipment) causes additional heating in cables, transformers and motors. Poor power factor increases reactive current and network losses. Voltage regulation issues can force equipment to operate outside optimal parameters. Power quality monitoring identifies these hidden energy wastes."
  },
  {
    id: 12,
    question: "Under the ST1426 standard, why is energy efficiency knowledge important for maintenance technicians?",
    options: [
      "Only because it is tested in the EPA exam",
      "Because maintenance technicians are uniquely positioned to identify and implement energy efficiency improvements during routine work, contributing to organisational sustainability and cost reduction",
      "Because it allows technicians to charge higher rates",
      "It is not mentioned in the ST1426 standard"
    ],
    correctAnswer: 1,
    explanation: "ST1426 recognises that maintenance technicians have unique opportunities to improve energy efficiency. Through regular contact with equipment and systems, technicians can identify waste, optimise performance, recommend improvements, and implement efficiency measures as part of routine maintenance. This contributes to the organisation's sustainability objectives, reduces operating costs, and demonstrates the professional value of skilled maintenance."
  }
];

const faqs = [
  {
    question: "How can I identify energy efficiency opportunities during routine maintenance?",
    answer: "Develop the habit of looking for energy waste as part of every maintenance visit. Check for: motors running when not needed, lights on in unoccupied areas, heating and cooling running simultaneously, compressed air leaks (listen for hissing), hot surfaces indicating poor insulation, vibration indicating misalignment, worn drive belts, dirty filters restricting airflow, and power factor correction capacitors that have failed. Record your observations and report them — even if they are outside your immediate scope of work."
  },
  {
    question: "What is the payback period for replacing a motor with a higher efficiency model?",
    answer: "It depends on the motor size, running hours, load factor and electricity cost. For continuously running motors (e.g., HVAC fans, pumps), the payback for upgrading from IE2 to IE3 or IE4 efficiency class can be as little as 1-3 years. Use the Motor Systems Tool from the Carbon Trust to calculate specific payback periods. The best time to upgrade is when a motor fails — specify a higher efficiency replacement rather than rewinding the old motor."
  },
  {
    question: "Does maintaining LED lighting really make a difference to energy efficiency?",
    answer: "Yes. While LEDs are inherently more efficient than fluorescent or discharge lighting, their energy savings depend on proper maintenance of the complete system. Dirty luminaires can lose 20-30% of their light output, potentially leading to complaints and requests to increase lighting levels. Failed occupancy sensors or timers can mean lights run 24/7 instead of as-needed. A failed daylight sensor can prevent dimming in bright conditions. Maintaining the control system is often more important than maintaining the LEDs themselves."
  },
  {
    question: "What role does power quality play in energy efficiency?",
    answer: "Poor power quality is a hidden energy thief. Voltage imbalance of just 2% can increase motor losses by 25%. Total harmonic distortion above 5% causes additional heating in transformers, cables and motors. Poor power factor means you are paying for reactive current that does no useful work. During maintenance, use a power quality analyser to check voltage balance, harmonics and power factor — these measurements can reveal significant efficiency improvement opportunities."
  },
  {
    question: "How does energy efficiency maintenance relate to carbon reduction targets?",
    answer: "Every kilowatt-hour of electricity saved through maintenance reduces the associated carbon emissions. In 2024, the UK grid carbon intensity is approximately 0.21 kgCO2e/kWh (and falling as renewables increase). Organisations with carbon reduction targets and net zero commitments depend on maintenance teams to sustain and improve the efficiency of their energy-using systems. Your maintenance work directly contributes to these targets — make sure your energy efficiency observations are captured and reported."
  }
];

const MOETModule1Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Efficiency in Maintenance
          </h1>
          <p className="text-white/80">
            Maintaining equipment for optimal performance, reducing energy waste and supporting sustainability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Maintenance = efficiency:</strong> Well-maintained equipment uses less energy</li>
              <li className="pl-1"><strong>ISO 50001:</strong> Framework for energy management systems</li>
              <li className="pl-1"><strong>Key areas:</strong> Motors, drives, lighting, PFC, BEMS, compressed air</li>
              <li className="pl-1"><strong>Monitoring:</strong> Sub-metering and power quality analysis reveal waste</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Motor alignment:</strong> Misalignment wastes 2-5% energy</li>
              <li className="pl-1"><strong>VSD maintenance:</strong> Fan/pump speed control saves 30-50%</li>
              <li className="pl-1"><strong>PFC:</strong> Reduces reactive power penalties and losses</li>
              <li className="pl-1"><strong>ST1426:</strong> Energy awareness is a core KSB for maintenance technicians</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the role of maintenance in energy management and ISO 50001",
              "Identify how motor alignment, belt tension and lubrication affect energy efficiency",
              "Describe the energy efficiency benefits of VSD maintenance and power factor correction",
              "Explain the importance of LED lighting system maintenance for sustained savings",
              "Understand compressed air leak detection and BEMS maintenance as efficiency activities",
              "Apply energy auditing and sub-metering knowledge during routine maintenance visits"
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

        {/* Section 01: Energy Management and the Role of Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Management and the Role of Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy is one of the largest operating costs for most commercial and industrial buildings.
              In the UK, buildings account for approximately 40% of total energy consumption, and a
              significant proportion of that energy is wasted through poorly maintained equipment,
              inefficient systems, and avoidable losses. As a maintenance technician, you are uniquely
              positioned to influence energy efficiency — you see equipment in its operational state,
              you understand how systems perform, and you have the skills to make improvements.
            </p>
            <p>
              Energy management is not separate from maintenance — it is an integral part of it.
              Every maintenance task has an energy dimension: a motor you align properly runs more
              efficiently, a filter you clean allows better airflow, a thermostat you calibrate
              prevents overheating. The discipline of energy management simply brings focus and
              measurement to these activities.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 50001 Energy Management System</p>
              <p className="text-sm text-white mb-2">
                ISO 50001 provides the international framework for establishing, implementing, maintaining
                and improving an energy management system (EnMS). It follows the familiar Plan-Do-Check-Act
                cycle:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Plan:</strong> Establish energy policy, objectives, targets and action plans based on an energy review</li>
                <li className="pl-1"><strong>Do:</strong> Implement the action plans — this is where maintenance plays a central role</li>
                <li className="pl-1"><strong>Check:</strong> Monitor, measure and analyse energy performance against targets</li>
                <li className="pl-1"><strong>Act:</strong> Take corrective action and continually improve energy performance</li>
              </ul>
              <p className="text-sm text-white mt-2">
                Maintenance activities feature in every stage: identifying energy baseline performance,
                implementing improvements, monitoring results, and sustaining performance. Many organisations
                with ISO 50001 certification depend heavily on their maintenance teams to deliver energy
                efficiency improvements.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency Regulations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Building Regulations Part L:</strong> Sets minimum energy efficiency standards for buildings — applies to both new build and refurbishment work</li>
                <li className="pl-1"><strong>Energy Savings Opportunity Scheme (ESOS):</strong> Requires large undertakings to carry out mandatory energy audits every 4 years</li>
                <li className="pl-1"><strong>Streamlined Energy and Carbon Reporting (SECR):</strong> Requires qualifying companies to report energy use and carbon emissions</li>
                <li className="pl-1"><strong>Minimum Energy Efficiency Standards (MEES):</strong> Sets minimum EPC ratings for commercial and residential properties</li>
                <li className="pl-1"><strong>EU Ecodesign (retained in UK law):</strong> Sets minimum efficiency standards for electric motors, fans, pumps, lighting and other products</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The Business Case for Energy Efficiency</p>
              <p className="text-sm text-white">
                With electricity costs at approximately £0.25-0.35/kWh for commercial users (and significantly
                higher for some), energy waste translates directly to financial waste. A 10% reduction in
                energy consumption can have the same bottom-line impact as a significant increase in revenue.
                Maintenance-led energy efficiency is often the lowest-cost route to savings because it uses
                existing skills and access, requires minimal capital investment, and delivers immediate results.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> You do not need to be an energy manager to contribute to energy
              efficiency. Every maintenance technician who develops the habit of looking for energy waste
              and acting on it is making a valuable contribution.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Maintaining Equipment for Optimal Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maintaining Equipment for Optimal Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The efficiency of electrical equipment degrades over time unless it is properly maintained.
              Motors lose efficiency from misalignment and bearing wear. Transformers lose efficiency
              from insulation degradation and connection resistance. Lighting systems lose output from
              dirt and component ageing. Your maintenance work directly determines how efficiently
              these systems operate.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Alignment</h3>
                <p className="text-sm text-white mb-2">
                  Shaft misalignment between a motor and its driven equipment is one of the most common
                  causes of energy waste in industrial systems. Misalignment increases bearing friction,
                  generates vibration, accelerates coupling wear, and forces the motor to work harder to
                  overcome these additional mechanical losses.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Angular misalignment:</strong> Shafts are at an angle — causes axial vibration and coupling fatigue</li>
                  <li className="pl-1"><strong>Parallel (offset) misalignment:</strong> Shafts are parallel but not coaxial — causes radial vibration</li>
                  <li className="pl-1"><strong>Energy impact:</strong> 2-5% increase in energy consumption; severe misalignment can be much higher</li>
                  <li className="pl-1"><strong>Best practice:</strong> Laser alignment during installation and after any motor work; check alignment as part of planned maintenance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Belt Tension and Drive Systems</h3>
                <p className="text-sm text-white mb-2">
                  V-belt and flat belt drives are widely used to connect motors to fans, pumps and compressors.
                  Belt condition and tension directly affect power transmission efficiency.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Loose belts:</strong> Slip on pulleys, converting energy to heat and noise — 3-5% power loss typical</li>
                  <li className="pl-1"><strong>Tight belts:</strong> Overload bearings on both motor and driven equipment, increasing friction losses</li>
                  <li className="pl-1"><strong>Worn belts:</strong> Ride deeper in pulleys, changing the drive ratio and reducing efficiency</li>
                  <li className="pl-1"><strong>Best practice:</strong> Check tension with a gauge (not by feel), replace worn belts in matched sets, consider synchronous belt upgrades for fixed-speed applications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Bearing Lubrication</h3>
                <p className="text-sm text-white mb-2">
                  Correct lubrication is essential for minimising bearing friction and the associated energy
                  losses. Both under-lubrication and over-lubrication waste energy.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Under-lubrication:</strong> Metal-to-metal contact increases friction, heat and energy consumption</li>
                  <li className="pl-1"><strong>Over-lubrication:</strong> Excess grease increases churning resistance and can cause overheating</li>
                  <li className="pl-1"><strong>Wrong lubricant:</strong> Incompatible greases can break down, losing their lubricating properties</li>
                  <li className="pl-1"><strong>Best practice:</strong> Follow manufacturer specifications for grease type, quantity and interval; use calculated relubrication programmes rather than time-based guesswork</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Degradation and Energy Loss</h3>
                <p className="text-sm text-white mb-2">
                  As electrical insulation ages, its resistance decreases, allowing leakage currents to flow.
                  These leakage currents represent wasted energy and can also cause nuisance tripping of RCDs,
                  leading to production losses.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Cables:</strong> Aged insulation, moisture ingress and physical damage all reduce insulation resistance</li>
                  <li className="pl-1"><strong>Motors:</strong> Winding insulation degradation increases stator leakage currents and iron losses</li>
                  <li className="pl-1"><strong>Transformers:</strong> Oil degradation and moisture in solid insulation increase dielectric losses</li>
                  <li className="pl-1"><strong>Best practice:</strong> Regular insulation resistance testing identifies deterioration trends before they become critical</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When you complete any maintenance task on a motor or drive system,
              take a moment to measure the running current with a clamp meter. Compare it with the motor
              nameplate full load current — if the motor is drawing significantly more current than expected
              for its load, there may be an efficiency problem worth investigating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Power Systems Efficiency — PFC, VSDs and Power Quality */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Systems Efficiency — PFC, VSDs and Power Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond individual items of equipment, the efficiency of the power distribution system
              itself has a significant impact on overall energy consumption. Power factor, harmonic
              distortion, and voltage quality all affect system losses. Maintenance of power factor
              correction equipment, variable speed drives, and power quality monitoring systems is
              a specialist area where maintenance technicians can make a substantial contribution.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Correction (PFC) Maintenance</h3>
              <p className="text-sm text-white mb-2">
                Power factor is the ratio of real power (kW) to apparent power (kVA). A power factor below
                1.0 means the system is drawing reactive current (kVAr) that does no useful work but still
                causes losses in cables, transformers and generators. PFC capacitors supply reactive power
                locally, reducing the reactive current drawn from the supply.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Financial impact:</strong> Many electricity suppliers charge reactive power penalties when the power factor falls below 0.95</li>
                <li className="pl-1"><strong>Capacitor maintenance:</strong> Check for swelling, leaking, overheating; measure capacitance and compare with rated value; check fuses and contactors</li>
                <li className="pl-1"><strong>Controller maintenance:</strong> Verify the automatic controller is switching stages correctly to match demand; check step sequence and power factor target setting</li>
                <li className="pl-1"><strong>Harmonic filters:</strong> If detuned reactors are fitted, check inductor condition and tuning frequency — harmonic resonance can damage capacitors and other equipment</li>
                <li className="pl-1"><strong>Common faults:</strong> Failed capacitors (reducing correction), stuck contactors (permanent connection causing leading power factor), failed controller (manual or no correction)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Speed Drive (VSD) Maintenance</h3>
              <p className="text-sm text-white mb-2">
                VSDs (also known as variable frequency drives or inverters) are one of the most effective
                energy efficiency technologies. For centrifugal loads such as fans and pumps, the affinity
                laws show that power consumption varies with the cube of speed — a 20% speed reduction
                gives approximately 49% power reduction. Maintaining VSDs in optimal condition is critical
                for sustaining these savings.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cooling:</strong> Clean fan filters and heat sinks regularly — overheating reduces efficiency and component life</li>
                <li className="pl-1"><strong>DC bus capacitors:</strong> These degrade over time (electrolyte drying); a degraded capacitor increases ripple current and reduces efficiency</li>
                <li className="pl-1"><strong>Parameter check:</strong> Verify that motor parameters, acceleration/deceleration ramps and speed limits are correctly configured</li>
                <li className="pl-1"><strong>Bypass mode:</strong> If a VSD has been put into bypass (running the motor at full speed directly), the energy savings are completely lost — investigate and resolve</li>
                <li className="pl-1"><strong>Harmonics:</strong> VSDs generate harmonic currents; ensure any input filters or line reactors are in good condition</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Monitoring</h3>
              <p className="text-sm text-white mb-2">
                Poor power quality is a hidden source of energy waste. During maintenance, power quality
                measurements can reveal issues that are not visible during routine inspection:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage imbalance:</strong> Even 2% imbalance on a three-phase motor increases losses by approximately 25%; caused by unequal single-phase loading or loose connections</li>
                <li className="pl-1"><strong>Harmonic distortion:</strong> Non-linear loads (VFDs, UPS, LED drivers, IT equipment) generate harmonics that cause additional heating in cables, transformers and motors</li>
                <li className="pl-1"><strong>Neutral current:</strong> Triplen harmonics (3rd, 9th, 15th) add in the neutral, potentially overloading neutral conductors and causing losses</li>
                <li className="pl-1"><strong>Voltage regulation:</strong> Voltage above or below nominal affects motor efficiency and lamp life</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Voltage Optimisation</p>
              <p className="text-sm text-white">
                Many UK sites receive supply voltages at the upper end of the permitted range (around 240-245 V
                against a nominal 230 V). Voltage optimisation equipment reduces the supply voltage closer to
                the nominal value, reducing energy consumption on resistive loads (heating, lighting) and
                improving motor efficiency. If your site has voltage optimisation equipment, maintaining it
                in good condition and verifying its performance is an important efficiency activity.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When a VSD is put into bypass mode during fault-finding and left
              there, the energy savings are completely lost. A 30 kW pump running at 80% speed via a VSD
              uses approximately 15 kW. The same pump at full speed uses 30 kW. Leaving it in bypass costs
              an additional 15 kW x 8,760 hours x £0.30 = £39,420 per year. Always return VSDs to
              automatic control after fault resolution.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Lighting, BEMS and Compressed Air */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lighting, BEMS and Compressed Air Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three areas where maintenance has a particularly high impact on energy efficiency are
              lighting systems, building energy management systems (BEMS), and compressed air networks.
              Each of these is a major energy consumer, and each is highly sensitive to maintenance quality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LED Lighting Maintenance</h3>
              <p className="text-sm text-white mb-2">
                The widespread adoption of LED lighting has significantly reduced lighting energy consumption,
                but the savings are only sustained if the complete lighting system — luminaires, drivers,
                controls and sensors — is properly maintained.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Luminaire cleaning:</strong> Dust and dirt on lenses and reflectors reduce light output by 10-30%, leading to complaints and potentially to increased lighting levels that waste energy</li>
                <li className="pl-1"><strong>Driver health:</strong> LED drivers degrade over time; a failing driver may draw more power for the same light output, reducing system efficacy</li>
                <li className="pl-1"><strong>Control systems:</strong> Occupancy sensors, daylight sensors, time clocks and dimming controls are the primary source of lighting energy savings — a failed sensor can mean lights running 24/7</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Emergency luminaires with degraded batteries draw continuous charging current without providing adequate emergency performance — replace batteries on schedule</li>
                <li className="pl-1"><strong>Commissioning:</strong> After any lighting maintenance, verify that control parameters (sensitivity, time delays, dimming levels) are correctly set</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Energy Management Systems (BEMS)</h3>
              <p className="text-sm text-white mb-2">
                A BEMS (also called a BMS — Building Management System) centrally monitors and controls
                heating, cooling, ventilation and lighting. A well-maintained BEMS can reduce building energy
                consumption by 10-20%, but a neglected BEMS can actually increase consumption if it
                malfunctions or is overridden.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensor calibration:</strong> Temperature, humidity, CO2 and light level sensors drift over time; uncalibrated sensors cause systems to heat, cool or ventilate incorrectly</li>
                <li className="pl-1"><strong>Actuator maintenance:</strong> Stuck or sluggish actuators on valves and dampers prevent proper control, causing simultaneous heating and cooling (a major energy waste)</li>
                <li className="pl-1"><strong>Time schedules:</strong> Verify that operating schedules match actual building occupancy — systems running outside occupied hours waste significant energy</li>
                <li className="pl-1"><strong>Overrides:</strong> Check for manual overrides that have been left in place — a common finding that defeats automatic energy-saving controls</li>
                <li className="pl-1"><strong>Trend logging:</strong> Review BEMS trend data to identify abnormal patterns — equipment cycling excessively, systems fighting each other, setpoints drifting</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compressed Air Leak Detection</h3>
              <p className="text-sm text-white mb-2">
                Compressed air is essential in many industrial and commercial environments, but it is
                extremely energy-intensive — typically, only 8-10% of the electrical energy input to a
                compressor is converted to useful pneumatic energy. The rest is lost as heat. Leaks
                make this already poor efficiency even worse.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scale of the problem:</strong> Industry studies consistently show 20-30% of compressed air output lost to leaks in poorly maintained systems</li>
                <li className="pl-1"><strong>Detection:</strong> Ultrasonic leak detectors can identify leaks that are inaudible in a noisy environment; systematic surveys should be conducted quarterly</li>
                <li className="pl-1"><strong>Common leak points:</strong> Pipe joints, quick-connect couplings, hose connections, solenoid valves, FRL units (filter-regulator-lubricator), condensate drains</li>
                <li className="pl-1"><strong>Tagging:</strong> Identified leaks should be tagged with location and estimated size, prioritised, and scheduled for repair</li>
                <li className="pl-1"><strong>Pressure reduction:</strong> Reducing system pressure by 1 bar can save approximately 7% of compressor energy — verify that pressure is not set higher than equipment requires</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical example:</strong> A compressed air leak with a 3 mm diameter hole at 7 bar
              pressure wastes approximately 1.5 kW of compressor power continuously. Over a year (8,760 hours)
              at £0.30/kWh, that single leak costs £3,942. A systematic leak survey and repair programme
              can save thousands of pounds annually.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Energy Auditing and Metering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Energy Auditing During Maintenance and Sub-Metering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every maintenance visit is an opportunity for informal energy auditing. You are already
              on site, you have access to equipment, and you have the technical knowledge to identify
              energy waste. Developing the habit of observing energy performance alongside your primary
              maintenance task adds significant value to your work and your organisation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Observations During Maintenance</h3>
              <p className="text-sm text-white mb-2">
                While carrying out routine maintenance tasks, look for the following energy efficiency
                indicators:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment running unnecessarily:</strong> Motors, pumps, fans or compressors running when not required — check time controls and operating schedules</li>
                <li className="pl-1"><strong>Oversized equipment:</strong> Motors significantly larger than necessary for their load operate at poor efficiency; transformers lightly loaded have proportionally higher losses</li>
                <li className="pl-1"><strong>Poor power factor:</strong> If a PFC panel is visible, check the power factor display — a reading below 0.95 indicates wasted reactive power</li>
                <li className="pl-1"><strong>Excessive heat:</strong> Hot surfaces on motors, transformers, cables or connections indicate energy being wasted as heat — investigate the cause</li>
                <li className="pl-1"><strong>Vibration and noise:</strong> Abnormal vibration or noise from rotating equipment indicates mechanical problems that waste energy</li>
                <li className="pl-1"><strong>Lighting waste:</strong> Lights on in unoccupied areas, broken sensors, overridden time controls, daylight dimming not working</li>
                <li className="pl-1"><strong>HVAC issues:</strong> Heating and cooling running simultaneously, filters blocked, dampers stuck, controls overridden</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering</h3>
              <p className="text-sm text-white mb-2">
                Sub-metering is the practice of installing additional energy meters downstream of the main
                fiscal meter to measure consumption by individual circuits, departments, floors or major
                items of equipment. As a maintenance technician, you may be asked to install, commission
                and maintain sub-meters.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CT-connected meters:</strong> Most common for retrofit — current transformers clip around existing cables without breaking the circuit</li>
                <li className="pl-1"><strong>Pulse output meters:</strong> Generate a pulse per kWh for connection to BMS or data logging systems</li>
                <li className="pl-1"><strong>Smart meters and IoT:</strong> Modern sub-meters with wireless connectivity provide real-time data to cloud platforms for analysis</li>
                <li className="pl-1"><strong>Maintenance considerations:</strong> Verify CT ratios are correct, check meter calibration, ensure data connectivity is reliable, and protect meters from environmental damage</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording and Reporting</h3>
                <p className="text-sm text-white">
                  Record your energy efficiency observations in your maintenance reports. Many organisations
                  have a specific section for energy/environmental observations. Even a brief note — "PFC
                  panel showing power factor of 0.82; 3 of 6 stages appear to have failed capacitors" —
                  can trigger an investigation that saves thousands of pounds. Your observations are valuable
                  data for energy managers and facilities teams.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Benchmarking</h3>
                <p className="text-sm text-white">
                  Energy benchmarking compares a building's energy consumption against similar buildings
                  or against its own historical performance. CIBSE TM46 provides energy benchmarks for
                  different building types. When you notice that energy consumption seems high for the type
                  of building or process, it may indicate significant efficiency improvement opportunities.
                  Share your insights with the facilities or energy management team.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to contribute to
              continuous improvement in your organisation. Identifying and reporting energy efficiency
              opportunities during maintenance is a direct demonstration of this competency. It shows
              that you think beyond the immediate repair task and consider the wider performance of the
              systems you maintain.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">High-Impact Maintenance Activities</p>
                <ul className="space-y-0.5">
                  <li>1. Motor alignment — saves 2-5% energy</li>
                  <li>2. VSD maintenance — sustains 30-50% savings on fans/pumps</li>
                  <li>3. PFC maintenance — avoids reactive power penalties</li>
                  <li>4. Compressed air leak repair — saves 20-30% of compressor energy</li>
                  <li>5. BEMS calibration — saves 10-20% of building energy</li>
                  <li>6. Lighting controls — prevents 24/7 operation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>ISO 50001 — Energy management systems</li>
                  <li>Building Regulations Part L — Energy efficiency</li>
                  <li>CIBSE TM46 — Energy benchmarks</li>
                  <li>EU Ecodesign — Motor efficiency classes (IE2/IE3/IE4)</li>
                  <li>EH40 — Affinity laws for fans and pumps</li>
                  <li>ST1426 — Continuous improvement KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: COSHH Awareness
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-4">
              Next: Environmental Legislation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section5_3;
