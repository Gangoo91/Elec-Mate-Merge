import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Inspection Routines - MOET Module 4.1.4";
const DESCRIPTION = "Visual inspection checklists, thermographic surveys, insulation resistance trending, connection tightness, cable condition, switchgear inspection, motor inspection, emergency lighting and fire alarm testing for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "visual-inspection",
    question: "What is the primary purpose of a visual inspection during PPM?",
    options: [
      "To take photographs for the maintenance records",
      "To identify visible signs of deterioration, damage, overheating or unsafe conditions without the need for testing equipment",
      "To check that equipment labels are correctly positioned",
      "To count the number of circuits in a distribution board"
    ],
    correctIndex: 1,
    explanation: "Visual inspection is the first and most important step in any maintenance routine. It identifies obvious signs of deterioration — discolouration from overheating, cracked insulation, water damage, corrosion, vermin damage, missing covers — that may indicate developing faults or safety hazards. Many serious issues can be detected by a trained eye before they require instruments to confirm."
  },
  {
    id: "thermographic-survey",
    question: "A thermographic survey of a distribution board reveals a hot spot of 85°C on one connection while surrounding connections are at 40°C. This indicates:",
    options: [
      "Normal operation — connections always run at different temperatures",
      "A high-resistance connection that requires immediate investigation and likely re-torquing or replacement",
      "The thermal camera is faulty",
      "The circuit is not carrying enough current"
    ],
    correctIndex: 1,
    explanation: "A temperature differential of 45°C above similar connections under similar load is a serious finding. It indicates a high-resistance joint, likely caused by a loose connection, corroded contact surface or insufficient contact area. This requires urgent attention as it represents a fire risk and will worsen over time."
  },
  {
    id: "ir-trending",
    question: "When trending insulation resistance readings over time, a steadily decreasing value indicates:",
    options: [
      "The insulation is improving",
      "The test instrument needs calibrating",
      "Progressive deterioration of the insulation, which may eventually lead to breakdown if not addressed",
      "The cable is carrying more current"
    ],
    correctIndex: 2,
    explanation: "A steadily declining insulation resistance trend indicates progressive deterioration from factors such as moisture ingress, contamination, thermal ageing or mechanical damage. While a single reading may be acceptable, the trend reveals that the insulation is degrading and will eventually reach a point where it can no longer safely withstand the operating voltage."
  },
  {
    id: "emergency-lighting-test",
    question: "Under BS 5266-1, what is the required duration for the annual full-duration discharge test of emergency lighting?",
    options: [
      "30 minutes for escape route luminaires",
      "1 hour for all luminaires regardless of type",
      "The full rated duration of the system (typically 3 hours for most non-maintained systems)",
      "15 minutes"
    ],
    correctIndex: 2,
    explanation: "BS 5266-1 requires an annual full-rated-duration test where the emergency lighting is operated for its full rated duration (typically 3 hours for non-maintained systems, 1 hour for some high-risk areas). This verifies that batteries can sustain the required illumination for the full design period. The monthly test is a short functional test only."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "During a visual inspection of a distribution board, you notice a brown discolouration on the casing above one MCB. This most likely indicates:",
    options: [
      "Normal ageing of the plastic",
      "Overheating at the MCB connection or within the MCB itself",
      "Paint overspray from decorating work",
      "Water staining from a roof leak"
    ],
    correctAnswer: 1,
    explanation: "Brown discolouration on plastic casing above an MCB is a classic sign of localised overheating. The heat source is typically a loose connection, an overloaded circuit, or a faulty MCB with high internal resistance. This requires investigation — check the connection torque, measure the load current, and consider thermographic imaging to quantify the temperature."
  },
  {
    id: 2,
    question: "The recommended test voltage for insulation resistance testing of a 400 V three-phase motor is:",
    options: [
      "250 V DC",
      "500 V DC",
      "1,000 V DC",
      "5,000 V DC"
    ],
    correctAnswer: 1,
    explanation: "For equipment rated up to 500 V (which includes standard 400 V motors), the standard test voltage for insulation resistance testing is 500 V DC. The minimum acceptable insulation resistance value is 1 MΩ, though new or refurbished motors should achieve significantly higher values. Higher test voltages (1,000 V or 5,000 V) are used for HV equipment."
  },
  {
    id: 3,
    question: "The minimum acceptable insulation resistance for a 400 V installation circuit tested at 500 V DC is:",
    options: [
      "0.5 MΩ",
      "1 MΩ",
      "2 MΩ",
      "10 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 61 specifies a minimum insulation resistance of 1 MΩ for circuits with nominal voltages above 50 V up to 500 V, tested at 500 V DC. However, in practice, values below 2 MΩ should be investigated, and a reading of exactly 1 MΩ on a large installation may indicate a specific fault on one circuit that is being masked by parallel paths."
  },
  {
    id: 4,
    question: "When carrying out a thermographic survey of electrical switchgear, you should:",
    options: [
      "Open all panel doors and remove all covers for maximum visibility",
      "Scan through infrared-transparent viewing windows where fitted, or scan with covers removed under a safe system of work with appropriate PPE",
      "Only scan the outside of closed panels",
      "Spray the equipment with water first to improve thermal contrast"
    ],
    correctAnswer: 1,
    explanation: "Thermographic surveys ideally use IR-transparent viewing windows fitted to panels, allowing scanning without opening covers. Where windows are not fitted, covers may need to be removed, requiring a safe system of work (risk assessment, appropriate PPE including arc flash protection) as the equipment must be energised and under load for the survey to be meaningful."
  },
  {
    id: 5,
    question: "A motor inspection checklist should include:",
    options: [
      "Only checking the nameplate data",
      "Visual condition, bearing noise/vibration, winding temperature, insulation resistance, ventilation, coupling condition and foundation bolts",
      "Only checking the motor is running",
      "Only measuring the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive motor inspection covers multiple aspects: visual condition (cleanliness, damage, corrosion), bearing assessment (noise, vibration, temperature), winding condition (temperature, insulation resistance), ventilation (fan, air paths, filters), mechanical (coupling, alignment, foundation), and electrical (current balance, supply voltage, earth continuity)."
  },
  {
    id: 6,
    question: "Under BS 5839-1, the weekly fire alarm test should:",
    options: [
      "Test every detector and call point in the building",
      "Activate the system from a different manual call point each week, using a different zone on a rota basis, and confirm the alarm sounds",
      "Only check that the control panel has power",
      "Be carried out by the fire brigade"
    ],
    correctAnswer: 1,
    explanation: "BS 5839-1 requires a weekly test by activating the alarm from a different manual call point each week, rotating through all call points over a period. The test verifies that the alarm sounds correctly, the control panel registers the activation, and any monitoring connections (e.g., to an alarm receiving centre) function. A different call point is used each week to ensure all are tested regularly."
  },
  {
    id: 7,
    question: "Cable condition assessment during inspection should check for:",
    options: [
      "Only the colour of the cable sheath",
      "Mechanical damage, heat damage, moisture ingress, UV degradation, correct support/fixings, adequate bending radii and identification",
      "Only whether the cable is the correct size",
      "Only the cable length"
    ],
    correctAnswer: 1,
    explanation: "Cable inspection covers multiple degradation mechanisms: mechanical damage (crushing, abrasion, impact), heat damage (discolouration, brittleness near heat sources), moisture ingress (particularly at terminations), UV degradation (outdoor cables), correct support (sagging, missing clips), adequate bending radii (no sharp bends), and correct identification (labels, circuit marking)."
  },
  {
    id: 8,
    question: "The monthly emergency lighting function test requires:",
    options: [
      "Running the system for its full rated duration",
      "A brief simulated mains failure to confirm each luminaire illuminates, followed by verification that the charging indicator shows normal operation after mains restoration",
      "Only checking that the charging LED is lit on each unit",
      "Replacing all batteries"
    ],
    correctAnswer: 1,
    explanation: "The monthly test under BS 5266-1 involves a brief mains failure (either by operating the test switch or by switching off the relevant circuit) to confirm each emergency luminaire operates. Each luminaire is checked for illumination, then mains is restored and the charging indicator is verified. This test should last long enough to confirm operation but not so long as to significantly discharge the batteries."
  },
  {
    id: 9,
    question: "When inspecting switchgear, signs of partial discharge include:",
    options: [
      "Clean, shiny busbars",
      "White powder deposits (from ozone attack on insulation), a sharp acrid smell, audible crackling or buzzing, and UV fluorescence",
      "Oil on the floor beneath the switchgear",
      "Normal operating temperature readings"
    ],
    correctAnswer: 1,
    explanation: "Partial discharge (PD) occurs when the electric field stress exceeds the breakdown strength of a localised area of insulation. Signs include white powder deposits (nitric acid formed by ozone attacking insulation), a characteristic acrid smell (ozone), audible crackling or buzzing (particularly in quiet environments), and UV fluorescence visible with a PD camera. PD is progressive and will eventually lead to complete insulation failure."
  },
  {
    id: 10,
    question: "RCD testing during PPM should include:",
    options: [
      "Only pressing the integral test button",
      "Both the integral test button check and an instrument test measuring actual trip time and trip current",
      "Only an instrument test — the test button is unreliable",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Complete RCD testing requires both methods: the integral test button verifies the mechanical trip mechanism is free and the device trips, while the instrument test measures the actual trip time (which must be within the limits specified in BS 7671) and can also verify the trip current. The integral test alone does not confirm that the device will trip at the correct current or within the required time."
  },
  {
    id: 11,
    question: "What severity classification system is commonly used for thermographic survey findings?",
    options: [
      "Red, amber, green traffic light system",
      "A temperature differential classification: <10°C = monitor, 10-35°C = plan repair, 35-75°C = repair urgently, >75°C = immediate action",
      "Pass or fail only",
      "Percentage of rated temperature"
    ],
    correctAnswer: 1,
    explanation: "The most widely used classification system for thermographic findings is based on the temperature differential (ΔT) between the anomaly and a reference point (similar connection under similar load). Typical thresholds: ΔT <10°C = monitor and trend; ΔT 10-35°C = plan repair within next maintenance window; ΔT 35-75°C = repair urgently; ΔT >75°C = take immediate action (may require emergency shutdown)."
  },
  {
    id: 12,
    question: "Under the Regulatory Reform (Fire Safety) Order 2005, fire alarm testing is:",
    options: [
      "Optional for all premises",
      "A statutory requirement for the responsible person to ensure fire detection and alarm systems are maintained in working order",
      "Only required in residential buildings",
      "Only required once every five years"
    ],
    correctAnswer: 1,
    explanation: "The RRO 2005 places a legal duty on the 'responsible person' (typically the employer or building occupier) to ensure that fire detection, alarm and emergency lighting systems are maintained in working order. This includes weekly alarm testing, monthly emergency lighting tests, quarterly inspections and annual servicing — all documented as evidence of compliance."
  }
];

const faqs = [
  {
    question: "How often should thermographic surveys be carried out?",
    answer: "For critical electrical infrastructure (main switchboards, transformers, HV switchgear), annual thermographic surveys are recommended as a minimum. Some organisations carry out 6-monthly surveys on the most critical assets. The survey must be carried out while equipment is energised and under normal load conditions — typically during normal working hours. Where infrared viewing windows are fitted, more frequent spot checks can be performed quickly and safely."
  },
  {
    question: "What is the difference between the monthly and annual emergency lighting tests?",
    answer: "The monthly test is a brief functional test — simulate mains failure, check each luminaire illuminates, restore mains and verify charging. It lasts just long enough to confirm operation. The annual test is a full-rated-duration discharge test — the system runs for its entire rated duration (typically 3 hours) to verify the batteries can sustain the required illumination level for the full design period. After the annual test, allow a full 24-hour recharge before the system is relied upon."
  },
  {
    question: "Should insulation resistance testing be done on every PPM visit?",
    answer: "Not necessarily. For most LV installations, insulation resistance testing is typically carried out annually or during the periodic inspection (EICR). However, for critical motors, transformers and HV cables, more frequent testing (quarterly or 6-monthly) is recommended to build a meaningful trend. The key is consistency — test at the same temperature, same conditions, and record values for trending. A sudden drop is more significant than an absolute value."
  },
  {
    question: "Can I carry out a thermographic survey without removing panel covers?",
    answer: "Yes, if infrared-transparent viewing windows are fitted. These UL-listed windows are installed in panel doors at strategic locations, allowing thermal scanning without opening covers and without the need for arc flash PPE. For panels without windows, covers must be removed, which requires a safe system of work, risk assessment, and appropriate PPE (arc flash rated for the prospective fault level). Some organisations retrofit IR windows during planned shutdowns."
  },
  {
    question: "What records should I keep from inspection routines?",
    answer: "All inspection findings should be recorded in the CMMS, including: date and time, equipment identifier, condition found (with photographs where appropriate), measurements taken (with values), comparison to previous readings, actions taken, and recommendations for follow-up. Thermographic images should be saved with the work order, along with the ambient conditions (temperature, load percentage) that were present during the survey. This data builds the maintenance history and enables trend analysis."
  }
];

const MOETModule4Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Inspection Routines
          </h1>
          <p className="text-white/80">
            Visual inspection, thermographic surveys, insulation testing and statutory system checks
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Visual:</strong> Trained eye detects overheating, damage, moisture, vermin</li>
              <li className="pl-1"><strong>Thermal:</strong> IR cameras reveal hot spots in connections and busbars</li>
              <li className="pl-1"><strong>Insulation:</strong> Megger testing with trending reveals degradation</li>
              <li className="pl-1"><strong>Statutory:</strong> Emergency lighting and fire alarm test schedules</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Switchgear:</strong> Visual, thermal, IR testing, contact resistance</li>
              <li className="pl-1"><strong>Motors:</strong> Bearings, windings, ventilation, alignment</li>
              <li className="pl-1"><strong>Cables:</strong> Damage, support, terminations, identification</li>
              <li className="pl-1"><strong>BS 5266/5839:</strong> Emergency lighting and fire alarm standards</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Carry out systematic visual inspections of electrical installations",
              "Interpret thermographic survey findings using severity classifications",
              "Perform insulation resistance testing and build meaningful trend data",
              "Inspect switchgear, motors and cables using structured checklists",
              "Execute emergency lighting and fire alarm test schedules correctly",
              "Record and report inspection findings for CMMS and compliance records"
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
            Visual Inspection Checklists
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is the foundation of every electrical maintenance routine. A trained
              technician can identify a remarkable number of potential faults and safety hazards simply
              by looking, listening and smelling — without any test instruments. The key is a systematic
              approach using a structured checklist.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Visual Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Door and enclosure condition — damage, corrosion, missing screws, IP rating intact</li>
                <li className="pl-1">Discolouration — brown/black marks indicating overheating</li>
                <li className="pl-1">Burning smell — acrid odour indicates arcing or overheating</li>
                <li className="pl-1">Water damage — staining, drips, condensation</li>
                <li className="pl-1">Vermin evidence — droppings, nesting material, gnawed cables</li>
                <li className="pl-1">Cable entries — glands tight, bushing intact, no gaps in IP rating</li>
                <li className="pl-1">Labelling — circuit schedule complete, accurate and legible</li>
                <li className="pl-1">Clearance — adequate working space maintained per BS 7671</li>
                <li className="pl-1">Ventilation — air paths clear, fans operational, filters clean</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Visual Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">External condition — corrosion, paint damage, impact marks</li>
                <li className="pl-1">Cooling — fan guard clear, ventilation slots unobstructed</li>
                <li className="pl-1">Mounting — foundation bolts tight, no visible movement</li>
                <li className="pl-1">Coupling — guard in place, coupling condition visible through inspection holes</li>
                <li className="pl-1">Terminal box — cover secure, glands tight, connections not discoloured</li>
                <li className="pl-1">Bearing area — no grease leakage, no unusual noise or vibration</li>
                <li className="pl-1">Nameplate — legible, data recorded in asset register</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Record what you find, not just what you check. A checklist entry of
              "distribution board inspected — satisfactory" has far less value than "DB-03 inspected — minor
              dust accumulation on busbars, all connections appear tight, no discolouration, IP rating intact.
              Recommend cleaning at next shutdown."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thermographic Surveys
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Infrared thermography is one of the most powerful condition monitoring techniques available
              to electrical maintenance technicians. It reveals temperature anomalies that are invisible
              to the naked eye, identifying failing connections, overloaded circuits and component
              degradation before they cause failure or fire.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermographic Survey Severity Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature Rise (ΔT)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Severity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;10°C</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Low</td>
                      <td className="border border-white/10 px-3 py-2">Monitor — re-check at next scheduled survey</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10–35°C</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Plan repair — schedule within next maintenance window</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35–75°C</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">High</td>
                      <td className="border border-white/10 px-3 py-2">Urgent repair — schedule as soon as possible, monitor closely</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;75°C</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Critical</td>
                      <td className="border border-white/10 px-3 py-2">Immediate action — may require emergency shutdown</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Considerations</p>
              <p className="text-sm text-white">
                Thermographic surveys must be carried out while equipment is energised and under load — an
                unloaded connection will not generate heat even if it is loose. Surveys should be conducted
                at the same time of day and similar load conditions each time to allow meaningful comparison.
                The emissivity setting on the camera must be correct for the material being measured (bare
                copper = ~0.07, oxidised copper = ~0.65, painted surface = ~0.95).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulation Resistance Testing and Trending
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance (IR) testing measures the resistance of electrical insulation to DC
              current. A healthy insulation system has very high resistance (hundreds or thousands of
              megaohms). As insulation degrades from heat, moisture, contamination or mechanical damage,
              the resistance decreases. Tracking these readings over time reveals degradation trends.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Voltages and Minimum Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IR Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV / PELV</td>
                      <td className="border border-white/10 px-3 py-2">250 V</td>
                      <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 500 V (inc. 230/400 V)</td>
                      <td className="border border-white/10 px-3 py-2">500 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500 V</td>
                      <td className="border border-white/10 px-3 py-2">1,000 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trending Best Practice</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Test at the same temperature (or apply correction factors)</li>
                  <li className="pl-1">Test at the same time of year to minimise humidity variation</li>
                  <li className="pl-1">Record all readings in CMMS with date, temperature and conditions</li>
                  <li className="pl-1">Plot readings graphically over time</li>
                  <li className="pl-1">A 50% drop from the previous reading warrants investigation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Precautions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Isolate and prove dead before connecting the megger</li>
                  <li className="pl-1">Disconnect sensitive electronic equipment (VSD, PLC, etc.)</li>
                  <li className="pl-1">Discharge capacitance after testing — cables and motors store charge</li>
                  <li className="pl-1">Warning signs displayed: "Insulation testing in progress"</li>
                  <li className="pl-1">Never test on damp or wet equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Emergency Lighting and Fire Alarm Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting and fire alarm systems are life-safety systems. Their testing is a statutory
              requirement under the Regulatory Reform (Fire Safety) Order 2005, and the testing regime is
              defined by BS 5266-1 (emergency lighting) and BS 5839-1 (fire detection and alarm systems).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Test Schedule (BS 5266-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Functional test — simulate mains failure, check each luminaire operates</td>
                      <td className="border border-white/10 px-3 py-2">Brief (sufficient to confirm operation)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-monthly</td>
                      <td className="border border-white/10 px-3 py-2">Extended test in some schedules; check changeover devices</td>
                      <td className="border border-white/10 px-3 py-2">As specified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Full-rated-duration discharge test</td>
                      <td className="border border-white/10 px-3 py-2">Full rated duration (typically 3 hours)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Test Schedule (BS 5839-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weekly</td>
                      <td className="border border-white/10 px-3 py-2">Activate from a different call point each week; confirm alarm sounds throughout</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection of all components; check 25% of detectors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Full service — all detectors functionally tested, batteries checked, cause and effect verified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> All test results must be recorded in a log book kept on the premises
              (or in the CMMS). The fire authority can inspect these records at any time. Failure to maintain
              adequate records is a breach of the RRO 2005 and can result in enforcement action.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Thermographic Severity</p>
                <ul className="space-y-0.5">
                  <li>ΔT &lt;10°C — Monitor</li>
                  <li>ΔT 10-35°C — Plan repair</li>
                  <li>ΔT 35-75°C — Urgent repair</li>
                  <li>ΔT &gt;75°C — Immediate action</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Statutory Test Frequencies</p>
                <ul className="space-y-0.5">
                  <li>Fire alarm — weekly (call point rotation)</li>
                  <li>Emergency lighting — monthly (function) + annual (full duration)</li>
                  <li>RCD — quarterly (instrument) + 6-monthly (integral test)</li>
                  <li>EICR — as per IET GN3 recommended intervals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lubrication and Adjustments
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-5">
              Next: Legal and Regulatory Compliance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section1_4;
