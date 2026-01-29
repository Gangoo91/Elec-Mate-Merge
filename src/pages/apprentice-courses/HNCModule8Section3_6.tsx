import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning and Testing - HNC Module 8 Section 3.6";
const DESCRIPTION = "Master air conditioning commissioning procedures: refrigerant charging, leak testing, performance verification, superheat and subcooling checks, F-Gas certification requirements, CIBSE Code M compliance, and O&M manual handover for HVAC systems.";

const quickCheckQuestions = [
  {
    id: "refrigerant-charging-method",
    question: "What is the primary method for charging refrigerant into a VRF system?",
    options: ["Liquid charging through the suction line", "Vapour charging through the discharge line", "Liquid charging through the liquid line service valve", "Vapour charging through the accumulator"],
    correctIndex: 2,
    explanation: "VRF systems are charged with liquid refrigerant through the liquid line service valve. The system charge is calculated based on pipe run lengths and factory pre-charge, with additional refrigerant added per metre of liquid pipe according to manufacturer specifications."
  },
  {
    id: "leak-test-pressure",
    question: "According to BS EN 378, what is the minimum leak test pressure for the high-pressure side of an R410A system?",
    options: ["20 bar", "31 bar (1.1 x design pressure)", "40 bar (operating pressure)", "45 bar"],
    correctIndex: 1,
    explanation: "BS EN 378 requires leak testing at 1.1 times the maximum allowable pressure. For R410A systems with a typical high-side design pressure of 28 bar, this equates to approximately 31 bar. The test must be conducted with oxygen-free nitrogen (OFN)."
  },
  {
    id: "superheat-measurement",
    question: "Where should temperature be measured to calculate superheat in a DX system?",
    options: ["At the condenser outlet", "At the compressor discharge", "At the evaporator outlet (suction line)", "At the expansion valve inlet"],
    correctIndex: 2,
    explanation: "Superheat is measured at the evaporator outlet (suction line) near the sensing bulb location. It is calculated as the difference between the actual suction temperature and the saturation temperature corresponding to suction pressure. Normal superheat is typically 5-8K."
  },
  {
    id: "fgas-certification",
    question: "Under F-Gas Regulations, what certification is required to handle refrigerants with GWP &gt; 2500?",
    options: ["No certification required", "Category I certification only", "Category I, II, III or IV depending on activity", "Manufacturer training only"],
    correctIndex: 2,
    explanation: "F-Gas Regulations require personnel to hold appropriate Category certification (I-IV) based on the type of work undertaken. Category I covers all activities, Category II covers recovery, Category III covers systems &lt;3kg, and Category IV covers leak checking only."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before charging refrigerant, the system must first be:",
    options: [
      "Filled with water to check for leaks",
      "Evacuated to remove moisture and non-condensables",
      "Pressurised with refrigerant to 5 bar",
      "Heated to operating temperature"
    ],
    correctAnswer: 1,
    explanation: "Systems must be evacuated using a vacuum pump to remove moisture and non-condensable gases before charging. The vacuum should reach at least 500 microns (0.67 mbar) and hold for a minimum period specified by the manufacturer."
  },
  {
    id: 2,
    question: "What is the purpose of the standing vacuum test?",
    options: [
      "To check refrigerant purity",
      "To verify the system holds vacuum without pressure rise, indicating no leaks or moisture",
      "To measure compressor capacity",
      "To test electrical insulation"
    ],
    correctAnswer: 1,
    explanation: "A standing vacuum test verifies system integrity. After evacuation, the vacuum should be held for 30-60 minutes minimum. Pressure rise indicates either a leak or residual moisture evaporating. No rise confirms the system is leak-free and dry."
  },
  {
    id: 3,
    question: "According to CIBSE Code M, commissioning records must include:",
    options: [
      "Only the refrigerant type used",
      "Design parameters, measured values, and any deviations with explanations",
      "Only the final temperature achieved",
      "Just the commissioning engineer's signature"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Code M requires comprehensive commissioning records including design criteria, measured performance parameters, comparison with design, any deviations with explanations, instrument calibration details, and witness sign-off where required."
  },
  {
    id: 4,
    question: "Subcooling in a refrigeration system is measured at:",
    options: [
      "The evaporator inlet",
      "The compressor suction",
      "The condenser outlet (liquid line)",
      "The expansion device outlet"
    ],
    correctAnswer: 2,
    explanation: "Subcooling is measured at the condenser outlet (liquid line) as the difference between the saturation temperature at condensing pressure and the actual liquid temperature. Normal subcooling is typically 5-10K and indicates adequate liquid refrigerant at the expansion device."
  },
  {
    id: 5,
    question: "What does an abnormally high superheat reading indicate?",
    options: [
      "System is overcharged with refrigerant",
      "Insufficient refrigerant charge or restricted flow to evaporator",
      "Condenser is oversized",
      "Compressor is too powerful"
    ],
    correctAnswer: 1,
    explanation: "High superheat indicates the refrigerant is evaporating too early in the evaporator, suggesting undercharge, restricted refrigerant flow (blocked filter drier), or insufficient load. The suction gas becomes excessively superheated before reaching the compressor."
  },
  {
    id: 6,
    question: "During commissioning, the air-on and air-off temperatures across a cooling coil should be measured to verify:",
    options: [
      "Refrigerant type",
      "Sensible cooling capacity and temperature drop across the coil",
      "Compressor electrical consumption",
      "Ductwork pressure drop"
    ],
    correctAnswer: 1,
    explanation: "Air-on and air-off temperature measurements verify the sensible cooling capacity. The temperature drop multiplied by airflow rate and specific heat capacity gives the sensible cooling duty, which should match the design specification."
  },
  {
    id: 7,
    question: "F-Gas Regulations require leak checks on systems containing more than:",
    options: [
      "Any amount of F-gas",
      "5 tonnes CO2 equivalent",
      "3 kg of refrigerant",
      "10 tonnes CO2 equivalent"
    ],
    correctAnswer: 1,
    explanation: "F-Gas Regulations (EU 517/2014 and UK amendments) require mandatory leak checks on systems containing 5 tonnes CO2 equivalent or more. Check frequency depends on charge size: 5-50 tCO2e annually, 50-500 tCO2e every 6 months, and above 500 tCO2e every 3 months."
  },
  {
    id: 8,
    question: "What information must be included on a system data plate under F-Gas requirements?",
    options: [
      "Manufacturer name only",
      "Refrigerant type, charge quantity, and GWP",
      "Serial number only",
      "Installation date only"
    ],
    correctAnswer: 1,
    explanation: "F-Gas Regulations require systems to display a label showing: refrigerant designation (e.g., R410A), charge quantity in kg, GWP value, and CO2 equivalent in tonnes. This enables proper leak check scheduling and end-of-life recovery planning."
  },
  {
    id: 9,
    question: "The commissioning witness test typically involves:",
    options: [
      "Only the installing contractor",
      "The client or their representative observing key tests and signing off results",
      "The equipment manufacturer only",
      "The building control officer"
    ],
    correctAnswer: 1,
    explanation: "Witness testing involves the client, consultant, or their appointed representative observing critical commissioning tests being performed and signing off the recorded results. This provides independent verification that the system meets specification."
  },
  {
    id: 10,
    question: "O&M manuals for air conditioning systems should include:",
    options: [
      "Only manufacturer literature",
      "Operating procedures, maintenance schedules, as-built drawings, test certificates, and spare parts information",
      "Only the installation certificate",
      "Just the system schematic"
    ],
    correctAnswer: 1,
    explanation: "O&M manuals must be comprehensive, including: system descriptions, operating procedures, maintenance schedules (PPM), manufacturer data sheets, as-built drawings, commissioning records, test certificates, spare parts lists, and emergency procedures."
  },
  {
    id: 11,
    question: "When using an electronic leak detector, the sensitivity should be set to detect leaks of:",
    options: [
      "100 g/year",
      "5 g/year for F-gas systems",
      "50 g/year",
      "1 kg/year"
    ],
    correctAnswer: 1,
    explanation: "F-Gas Regulations require leak detectors capable of detecting leaks of 5 grams per year for stationary equipment. This high sensitivity is necessary to identify minor leaks before they become significant, minimising environmental impact and refrigerant loss."
  },
  {
    id: 12,
    question: "Performance verification of a chiller should include measurement of:",
    options: [
      "Only the leaving chilled water temperature",
      "Flow rates, temperatures (entering/leaving), electrical input, and calculated COP",
      "Just the compressor current",
      "Only the condensing temperature"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive chiller verification requires measuring: chilled water flow rate and temperatures (entering/leaving), condenser water or air temperatures, electrical power input, and calculating the coefficient of performance (COP) to compare against rated values."
  },
  {
    id: 13,
    question: "BSRIA commissioning procedures specify that test instruments should be:",
    options: [
      "New and unused",
      "Calibrated within the previous 12 months with certificates available",
      "Manufacturer calibrated only",
      "Self-calibrating digital instruments only"
    ],
    correctAnswer: 1,
    explanation: "BSRIA requires test instruments to have valid calibration certificates, typically within the previous 12 months, traceable to national standards. Calibration certificates must be available for inspection and referenced in commissioning documentation."
  },
  {
    id: 14,
    question: "The handover meeting for an air conditioning system should cover:",
    options: [
      "Only the warranty period",
      "System operation, maintenance requirements, emergency procedures, and documentation location",
      "Just the energy consumption",
      "Only the control system password"
    ],
    correctAnswer: 1,
    explanation: "Handover meetings should comprehensively cover: system operation demonstration, routine maintenance requirements, emergency shutdown procedures, location of isolation valves and controls, O&M documentation location, training records, and key contact details for support."
  }
];

const faqs = [
  {
    question: "What is the correct sequence for commissioning a new split system installation?",
    answer: "The correct sequence is: 1) Complete installation and pressure test with OFN at 1.1x design pressure, 2) Perform electronic leak detection on all joints, 3) Evacuate to below 500 microns and hold for 30+ minutes, 4) Release factory charge (outdoor unit) and add additional refrigerant per pipe run length, 5) Power up and check electrical parameters, 6) Run cooling mode and measure superheat/subcooling, 7) Verify airflow rates and temperatures, 8) Test all control functions, 9) Complete documentation and handover."
  },
  {
    question: "How do I calculate the additional refrigerant charge for a VRF installation?",
    answer: "Additional charge is calculated from the manufacturer's charging tables based on liquid line pipe diameter and length. For example, R410A typically requires 20-30g per metre for 9.52mm liquid pipe. The formula is: Additional charge = Length (m) x Charge factor (g/m). Some manufacturers also specify deductions for factory pre-charge in the outdoor unit. Always refer to the specific manufacturer's installation manual for exact values."
  },
  {
    question: "What are the F-Gas record keeping requirements for commissioning?",
    answer: "F-Gas Regulations require maintaining records for 5 years including: quantity and type of refrigerant installed, dates of installation and leak checks, identification of technicians (certificate numbers), leak check results and any leaks found, quantities recovered and added, and decommissioning records. Records must be available for inspection by enforcement authorities and should be kept both by the equipment operator and the service company."
  },
  {
    question: "How should I handle a system that fails to achieve design performance during commissioning?",
    answer: "First, systematically verify: airflow rates match design (check fan speeds, ductwork restrictions), refrigerant charge is correct (superheat/subcooling), no restrictions in refrigerant circuit (filter driers, TXV), electrical supply is correct (voltage, phase balance), and controls are properly configured. Document all findings. If issues persist, consult with the designer and manufacturer. Do not sign off commissioning until performance is acceptable or deviations are formally agreed and documented."
  },
  {
    question: "What training and certification is required for commissioning engineers?",
    answer: "Engineers must hold: F-Gas certification appropriate to the work (typically Category I for full servicing activities), competence in the specific system type (manufacturer training recommended), and understanding of commissioning procedures (BSRIA/CIBSE). For witness testing, HVAC commissioning manager certification (such as CIBSE Commissioning Manager registration) may be required on larger projects. CPD should be maintained to keep current with regulation changes."
  },
  {
    question: "What documentation should be handed over to the client?",
    answer: "The handover package should include: O&M manuals (operating and maintenance volumes), as-built drawings and schematics, commissioning records with all test results, Electrical Installation Certificate, F-Gas installation record and equipment labels, manufacturer warranties and registration, spare parts lists with supplier contacts, training attendance records, emergency contact information, and maintenance contract recommendations. Digital copies should also be provided where specified."
  }
];

const HNCModule8Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
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
            <Zap className="h-4 w-4" />
            <span>Module 8.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commissioning and Testing
          </h1>
          <p className="text-white/80">
            Refrigerant charging, leak testing, performance verification, F-Gas compliance, and handover requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pressure test:</strong> OFN at 1.1x design pressure per BS EN 378</li>
              <li className="pl-1"><strong>Evacuation:</strong> Below 500 microns, hold for 30+ minutes</li>
              <li className="pl-1"><strong>Superheat/subcooling:</strong> 5-8K and 5-10K respectively</li>
              <li className="pl-1"><strong>F-Gas records:</strong> Retain for minimum 5 years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Code M:</strong> Commissioning procedures and documentation</li>
              <li className="pl-1"><strong>BS EN 378:</strong> Refrigeration system safety requirements</li>
              <li className="pl-1"><strong>F-Gas Regulations:</strong> Certification and leak check requirements</li>
              <li className="pl-1"><strong>BSRIA:</strong> Standard commissioning procedures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Execute refrigerant charging procedures safely and accurately",
              "Perform pressure testing and leak detection per BS EN 378",
              "Measure and interpret superheat and subcooling values",
              "Verify system performance against design specifications",
              "Understand F-Gas certification and record keeping requirements",
              "Compile comprehensive commissioning documentation for handover"
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

        {/* Section 1: Refrigerant Charging Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Refrigerant Charging Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct refrigerant charging is critical to system performance, efficiency, and longevity.
              The charging process must follow a methodical sequence to ensure safety and achieve
              optimal system operation from the outset.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Charging Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pressure test:</strong> System tested with OFN at 1.1x maximum allowable pressure</li>
                <li className="pl-1"><strong>Leak detection:</strong> Electronic detector check on all joints and connections</li>
                <li className="pl-1"><strong>Evacuation:</strong> Triple evacuation recommended, final vacuum below 500 microns</li>
                <li className="pl-1"><strong>Standing vacuum:</strong> Hold for minimum 30 minutes with no pressure rise</li>
                <li className="pl-1"><strong>Charge calculation:</strong> Factory pre-charge plus additional charge per pipe length</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigerant Charging Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Procedure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Liquid charging</td>
                      <td className="border border-white/10 px-3 py-2">Standard for R410A, R32, blends</td>
                      <td className="border border-white/10 px-3 py-2">Charge through liquid line valve, system off initially</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vapour charging</td>
                      <td className="border border-white/10 px-3 py-2">Single-component refrigerants only</td>
                      <td className="border border-white/10 px-3 py-2">Charge through suction side, compressor running</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weigh-in method</td>
                      <td className="border border-white/10 px-3 py-2">All systems - most accurate</td>
                      <td className="border border-white/10 px-3 py-2">Pre-calculated charge weighed using electronic scales</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Superheat method</td>
                      <td className="border border-white/10 px-3 py-2">Fixed orifice systems, top-up</td>
                      <td className="border border-white/10 px-3 py-2">Charge until target superheat achieved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Subcooling method</td>
                      <td className="border border-white/10 px-3 py-2">TXV systems, verification</td>
                      <td className="border border-white/10 px-3 py-2">Charge until target subcooling achieved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Never charge liquid refrigerant directly into the suction (low-pressure) side</li>
                <li className="pl-1">Always invert cylinder when liquid charging through manifold</li>
                <li className="pl-1">Wear appropriate PPE: safety glasses, gloves, and ensure ventilation</li>
                <li className="pl-1">Only F-Gas certified personnel may handle fluorinated refrigerants</li>
                <li className="pl-1">Never mix different refrigerant types - complete system recovery required first</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">VRF Additional Charge Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">System:</span> <span className="text-white">R410A VRF with 85m liquid line (9.52mm dia)</span></p>
                <p><span className="text-white/60">Factory charge:</span> <span className="text-white">8.5 kg (outdoor unit)</span></p>
                <p><span className="text-white/60">Additional charge factor:</span> <span className="text-white">25 g/m for 9.52mm liquid line</span></p>
                <p><span className="text-white/60">Calculation:</span> <span className="text-white">85m x 25g/m = 2,125g = 2.125 kg</span></p>
                <p className="mt-2 text-green-400">Total system charge: 8.5 + 2.125 = 10.625 kg</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always record the exact refrigerant quantity charged on the system label and in the commissioning documentation. This is a legal requirement under F-Gas Regulations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: System Testing and Leak Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Testing and Leak Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive testing ensures system integrity and compliance with safety standards.
              BS EN 378 specifies requirements for pressure testing, leak detection, and evacuation
              that must be followed before introducing refrigerant.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Testing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use OFN only (never air)</li>
                  <li className="pl-1">High side: 1.1x design pressure</li>
                  <li className="pl-1">Low side: 1.1x design pressure</li>
                  <li className="pl-1">Hold for 30 minutes minimum</li>
                  <li className="pl-1">Check for pressure drop</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leak Detection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Electronic detector (5 g/yr sensitivity)</li>
                  <li className="pl-1">Check all brazed/flared joints</li>
                  <li className="pl-1">Valve stems and cores</li>
                  <li className="pl-1">Service connections</li>
                  <li className="pl-1">Factory connections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evacuation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use vacuum pump rated for system</li>
                  <li className="pl-1">Target: below 500 microns</li>
                  <li className="pl-1">Use micron gauge at system</li>
                  <li className="pl-1">Triple evacuation if wet</li>
                  <li className="pl-1">Standing test: 30-60 mins</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 378 Test Pressures for Common Refrigerants</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Refrigerant</th>
                      <th className="border border-white/10 px-3 py-2 text-left">High Side Design (bar)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Pressure (1.1x)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Low Side Test (bar)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R410A</td>
                      <td className="border border-white/10 px-3 py-2">28-30</td>
                      <td className="border border-white/10 px-3 py-2">31-33</td>
                      <td className="border border-white/10 px-3 py-2">~25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R32</td>
                      <td className="border border-white/10 px-3 py-2">28-30</td>
                      <td className="border border-white/10 px-3 py-2">31-33</td>
                      <td className="border border-white/10 px-3 py-2">~25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R134a</td>
                      <td className="border border-white/10 px-3 py-2">15-18</td>
                      <td className="border border-white/10 px-3 py-2">17-20</td>
                      <td className="border border-white/10 px-3 py-2">~12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R407C</td>
                      <td className="border border-white/10 px-3 py-2">24-26</td>
                      <td className="border border-white/10 px-3 py-2">26-29</td>
                      <td className="border border-white/10 px-3 py-2">~20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evacuation Procedure Sequence</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Connect vacuum pump and micron gauge to service ports</li>
                <li className="pl-1">Open all service valves and ensure refrigerant circuit is complete</li>
                <li className="pl-1">Start vacuum pump and evacuate to below 1000 microns</li>
                <li className="pl-1">Break vacuum with OFN to 0.5 bar (moisture sweep)</li>
                <li className="pl-1">Repeat evacuation to below 500 microns</li>
                <li className="pl-1">For wet systems, perform third evacuation cycle</li>
                <li className="pl-1">Isolate pump and monitor vacuum for 30-60 minutes</li>
                <li className="pl-1">Vacuum should hold - any rise indicates leak or moisture</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>F-Gas requirement:</strong> Electronic leak detectors must be capable of detecting leaks of 5 grams per year minimum for compliance with current regulations.
            </p>
          </div>
        </section>

        {/* Section 3: Performance Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Performance verification confirms that the installed system meets design specifications.
              Key parameters including superheat, subcooling, airflow rates, and temperatures must
              be measured and compared against design criteria per CIBSE Code M requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Superheat and Subcooling Measurement</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Normal Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Superheat</td>
                      <td className="border border-white/10 px-3 py-2">Evaporator outlet (suction line)</td>
                      <td className="border border-white/10 px-3 py-2">Actual temp - Saturation temp (at suction pressure)</td>
                      <td className="border border-white/10 px-3 py-2">5-8 K (TXV systems)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Subcooling</td>
                      <td className="border border-white/10 px-3 py-2">Condenser outlet (liquid line)</td>
                      <td className="border border-white/10 px-3 py-2">Saturation temp (at discharge pressure) - Actual temp</td>
                      <td className="border border-white/10 px-3 py-2">5-10 K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discharge superheat</td>
                      <td className="border border-white/10 px-3 py-2">Compressor discharge line</td>
                      <td className="border border-white/10 px-3 py-2">Discharge temp - Saturation temp (at discharge pressure)</td>
                      <td className="border border-white/10 px-3 py-2">20-40 K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Superheat Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">System:</span> <span className="text-white">R410A DX split system</span></p>
                <p><span className="text-white/60">Suction pressure:</span> <span className="text-white">8.5 bar (gauge) = 9.5 bar (abs)</span></p>
                <p><span className="text-white/60">Saturation temp at 9.5 bar abs:</span> <span className="text-white">6°C (from P-T chart)</span></p>
                <p><span className="text-white/60">Measured suction temp:</span> <span className="text-white">12°C</span></p>
                <p className="mt-2 text-green-400">Superheat = 12°C - 6°C = 6K (within normal range)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Superheat/Subcooling Readings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Superheat</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Subcooling</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Indication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Undercharge</td>
                      <td className="border border-white/10 px-3 py-2">High (&gt;10K)</td>
                      <td className="border border-white/10 px-3 py-2">Low (&lt;3K)</td>
                      <td className="border border-white/10 px-3 py-2">Add refrigerant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overcharge</td>
                      <td className="border border-white/10 px-3 py-2">Low (&lt;3K)</td>
                      <td className="border border-white/10 px-3 py-2">High (&gt;15K)</td>
                      <td className="border border-white/10 px-3 py-2">Remove refrigerant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Restriction</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Normal/High</td>
                      <td className="border border-white/10 px-3 py-2">Check filter drier/TXV</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low airflow</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Normal</td>
                      <td className="border border-white/10 px-3 py-2">Check fan/filters/ductwork</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Code M Performance Verification Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Airflow measurement:</strong> Verify supply and return airflow rates against design</li>
                <li className="pl-1"><strong>Temperature differential:</strong> Air-on/air-off across cooling coil (typically 8-12K)</li>
                <li className="pl-1"><strong>Refrigerant temperatures:</strong> Suction, liquid, discharge as per design</li>
                <li className="pl-1"><strong>Electrical parameters:</strong> Voltage, current, power factor within rated values</li>
                <li className="pl-1"><strong>Condensing pressure:</strong> Within manufacturer limits for ambient conditions</li>
                <li className="pl-1"><strong>Control operation:</strong> Setpoint response, staging, defrost cycles</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling Capacity Verification</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Air Side Method</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Q = m x Cp x ΔT</li>
                    <li>Where: m = mass flow rate (kg/s)</li>
                    <li>Cp = specific heat (1.0 kJ/kgK for air)</li>
                    <li>ΔT = temperature drop (K)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Water Side Method (Chillers)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Q = m x Cp x ΔT</li>
                    <li>Where: m = flow rate (l/s)</li>
                    <li>Cp = 4.18 kJ/kgK for water</li>
                    <li>ΔT = chilled water differential (K)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation requirement:</strong> Record all measured values alongside design parameters. Document any deviations with explanations and corrective actions taken.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Commissioning Documentation and Handover */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Commissioning Documentation and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation is essential for system handover, ongoing maintenance, and
              regulatory compliance. F-Gas Regulations impose specific record-keeping requirements,
              whilst CIBSE Code M and BSRIA provide standards for commissioning documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F-Gas Record Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Record Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Information</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation record</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant type, quantity, date, technician details</td>
                      <td className="border border-white/10 px-3 py-2">5 years minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment label</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant type, charge (kg), GWP, CO2e (tonnes)</td>
                      <td className="border border-white/10 px-3 py-2">Permanent on equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leak check records</td>
                      <td className="border border-white/10 px-3 py-2">Date, method, results, leaks found/repaired</td>
                      <td className="border border-white/10 px-3 py-2">5 years minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Service records</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant added/recovered, technician F-Gas cert no.</td>
                      <td className="border border-white/10 px-3 py-2">5 years minimum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F-Gas Certification Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Permitted Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category I</td>
                      <td className="border border-white/10 px-3 py-2">All activities - leak checking, recovery, installation, maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category II</td>
                      <td className="border border-white/10 px-3 py-2">Recovery, installation, and maintenance (no leak checking)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category III</td>
                      <td className="border border-white/10 px-3 py-2">Recovery for systems &lt;3kg hermetically sealed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category IV</td>
                      <td className="border border-white/10 px-3 py-2">Leak checking only (no breach of refrigerant circuit)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&M Manual Contents for HVAC Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System description:</strong> Overview, schematics, component locations</li>
                <li className="pl-1"><strong>Operating procedures:</strong> Start-up, normal operation, shutdown, seasonal changeover</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Refrigerant leak response, electrical isolation</li>
                <li className="pl-1"><strong>Maintenance schedules:</strong> PPM tasks, frequencies, competence requirements</li>
                <li className="pl-1"><strong>Equipment data sheets:</strong> All manufacturer literature and specifications</li>
                <li className="pl-1"><strong>Commissioning records:</strong> All test results and certificates</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Updated schematic, layout, wiring diagrams</li>
                <li className="pl-1"><strong>Spare parts:</strong> Recommended spares list with part numbers and suppliers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Commissioning Record Sheet Contents</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">System Identification</p>
                  <ul className="text-white/70 space-y-1">
                    <li>Equipment tag/reference</li>
                    <li>Manufacturer and model</li>
                    <li>Serial number</li>
                    <li>Location</li>
                    <li>Refrigerant type and charge</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Measured Parameters</p>
                  <ul className="text-white/70 space-y-1">
                    <li>Suction/discharge pressures</li>
                    <li>Superheat/subcooling</li>
                    <li>Airflow rates</li>
                    <li>Supply/return temperatures</li>
                    <li>Electrical readings (V, A, kW)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Meeting Agenda</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Documentation review:</strong> O&M manuals, as-builts, certificates location</li>
                <li className="pl-1"><strong>System demonstration:</strong> Control panel operation, setpoint adjustment</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Isolation points, leak response, shutdown</li>
                <li className="pl-1"><strong>Maintenance requirements:</strong> Filter changes, leak checks, service intervals</li>
                <li className="pl-1"><strong>Warranties:</strong> Equipment warranties, registration requirements</li>
                <li className="pl-1"><strong>Training sign-off:</strong> Attendee list, competence confirmation</li>
                <li className="pl-1"><strong>Contacts:</strong> Installer, manufacturer, emergency callout</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Leak Check Frequencies (F-Gas)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CO2 Equivalent Charge</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Check Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">With Leak Detection System</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;5 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">No mandatory check</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5-50 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Every 2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-500 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Every 6 months</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;500 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Every 3 months</td>
                      <td className="border border-white/10 px-3 py-2">Every 6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>CO2e calculation:</strong> Multiply refrigerant charge (kg) by the GWP value. For example, 10kg of R410A (GWP 2088) = 10 x 2088 / 1000 = 20.88 tonnes CO2e.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Commissioning a Split System</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Commission a new 7kW R32 split system with 15m pipe run.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Pressure test</p>
                <p className="ml-4">Charge system with OFN to 33 bar (1.1 x 30 bar design)</p>
                <p className="ml-4">Hold for 30 minutes - no pressure drop confirmed</p>
                <p className="mt-2 text-white/60">Step 2: Leak test</p>
                <p className="ml-4">Electronic detector at 5g/yr sensitivity</p>
                <p className="ml-4">Check all flare connections, service valves - no leaks found</p>
                <p className="mt-2 text-white/60">Step 3: Evacuation</p>
                <p className="ml-4">Triple evacuation to 450 microns</p>
                <p className="ml-4">Standing test 45 mins - vacuum held stable</p>
                <p className="mt-2 text-white/60">Step 4: Charging</p>
                <p className="ml-4">Factory charge: 1.2 kg</p>
                <p className="ml-4">Additional: 15m x 20g/m = 300g = 0.3 kg</p>
                <p className="ml-4">Total charge: 1.5 kg R32</p>
                <p className="mt-2 text-white/60">Step 5: Performance verification</p>
                <p className="ml-4">Superheat: 7K (target 5-8K) - correct</p>
                <p className="ml-4">Subcooling: 8K (target 5-10K) - correct</p>
                <p className="ml-4">Supply air temp: 14°C (design 12-15°C) - acceptable</p>
                <p className="mt-2 text-green-400">Result: System commissioned successfully</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Diagnosing Performance Issue</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> R410A system not achieving design cooling capacity.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Measured parameters:</p>
                <p className="ml-4">Suction pressure: 7.0 bar (low)</p>
                <p className="ml-4">Discharge pressure: 24 bar (normal)</p>
                <p className="ml-4">Suction temp: 18°C</p>
                <p className="ml-4">Saturation temp at 7.0 bar: 2°C</p>
                <p className="ml-4">Superheat: 18 - 2 = 16K (high!)</p>
                <p className="mt-2 text-white/60">Liquid line temp: 38°C</p>
                <p className="ml-4">Saturation temp at 24 bar: 45°C</p>
                <p className="ml-4">Subcooling: 45 - 38 = 7K (normal)</p>
                <p className="mt-2 text-white/60">Analysis:</p>
                <p className="ml-4">High superheat with normal subcooling suggests:</p>
                <p className="ml-4">- Restriction in liquid line (filter drier/TXV)</p>
                <p className="ml-4">- Or insufficient refrigerant reaching evaporator</p>
                <p className="mt-2 text-white/60">Action:</p>
                <p className="ml-4">Checked filter drier temp drop: 8K across filter</p>
                <p className="ml-4">Replaced blocked filter drier</p>
                <p className="mt-2 text-green-400">Result: Superheat returned to 6K, capacity restored</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: F-Gas Documentation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Complete F-Gas records for a VRF installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Equipment details:</p>
                <p className="ml-4">System: VRF heat pump system</p>
                <p className="ml-4">Refrigerant: R410A (GWP: 2088)</p>
                <p className="ml-4">Factory charge: 12.5 kg</p>
                <p className="ml-4">Additional charge: 3.2 kg</p>
                <p className="ml-4">Total charge: 15.7 kg</p>
                <p className="mt-2 text-white/60">CO2 equivalent calculation:</p>
                <p className="ml-4">15.7 kg x 2088 = 32,782 kg CO2e</p>
                <p className="ml-4">= 32.78 tonnes CO2e</p>
                <p className="mt-2 text-white/60">Leak check requirement:</p>
                <p className="ml-4">5-50 tCO2e band = Annual leak check required</p>
                <p className="mt-2 text-white/60">Equipment label must show:</p>
                <p className="ml-4">Refrigerant: R410A</p>
                <p className="ml-4">Charge: 15.7 kg</p>
                <p className="ml-4">GWP: 2088</p>
                <p className="ml-4">CO2e: 32.78 tonnes</p>
                <p className="mt-2 text-green-400">Records retained for minimum 5 years</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Checklist Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Pressure test with OFN at 1.1x design pressure - no leaks</li>
                <li className="pl-1">Electronic leak detection on all joints and connections</li>
                <li className="pl-1">Evacuate to &lt;500 microns, hold for 30+ minutes</li>
                <li className="pl-1">Charge refrigerant by weight per manufacturer specification</li>
                <li className="pl-1">Verify superheat (5-8K) and subcooling (5-10K)</li>
                <li className="pl-1">Measure airflow rates and temperature differentials</li>
                <li className="pl-1">Check electrical parameters against nameplate</li>
                <li className="pl-1">Test all control functions and safety devices</li>
                <li className="pl-1">Complete F-Gas records and equipment labels</li>
                <li className="pl-1">Compile O&M documentation and handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Test pressure: <strong>1.1 x maximum allowable pressure</strong></li>
                <li className="pl-1">Evacuation target: <strong>&lt;500 microns (0.67 mbar)</strong></li>
                <li className="pl-1">Normal superheat: <strong>5-8 K</strong> (TXV systems)</li>
                <li className="pl-1">Normal subcooling: <strong>5-10 K</strong></li>
                <li className="pl-1">Leak detector sensitivity: <strong>5 g/year minimum</strong></li>
                <li className="pl-1">F-Gas record retention: <strong>5 years minimum</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient evacuation:</strong> Moisture causes acid formation and compressor failure</li>
                <li className="pl-1"><strong>Liquid slugging:</strong> Never charge liquid refrigerant into suction side</li>
                <li className="pl-1"><strong>Wrong charge calculation:</strong> Always follow manufacturer pipe length factors</li>
                <li className="pl-1"><strong>Missing F-Gas records:</strong> Legal requirement - penalties for non-compliance</li>
                <li className="pl-1"><strong>Incomplete handover:</strong> O&M manuals and training essential for warranty</li>
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
                <p className="font-medium text-white mb-1">Commissioning Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Pressure test (OFN 1.1x design)</li>
                  <li>2. Leak detection (electronic)</li>
                  <li>3. Evacuation (&lt;500 microns)</li>
                  <li>4. Charging (weigh-in method)</li>
                  <li>5. Performance verification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Normal Operating Values</p>
                <ul className="space-y-0.5">
                  <li>Superheat: 5-8 K (TXV systems)</li>
                  <li>Subcooling: 5-10 K</li>
                  <li>Discharge superheat: 20-40 K</li>
                  <li>Air temp drop: 8-12 K (cooling)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">F-Gas Requirements</p>
                <ul className="space-y-0.5">
                  <li>Category I-IV certification</li>
                  <li>Equipment labels mandatory</li>
                  <li>5 year record retention</li>
                  <li>Leak checks per CO2e charge</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 378 - Refrigeration safety</li>
                  <li>CIBSE Code M - Commissioning</li>
                  <li>BSRIA AG 3/89 - Procedures</li>
                  <li>F-Gas Regulations 2014/517</li>
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

        {/* Navigation - Back button only (last subsection) */}
        <nav className="flex justify-start pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_6;
