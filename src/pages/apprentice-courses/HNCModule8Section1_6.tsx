import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Commissioning - HNC Module 8 Section 1.6";
const DESCRIPTION = "Master heating system commissioning procedures: flushing, filling, pressurising, balancing, performance testing and handover documentation in accordance with BSRIA and Building Regulations.";

const quickCheckQuestions = [
  {
    id: "flushing-velocity",
    question: "What minimum flushing velocity is recommended by BSRIA for effective debris removal?",
    options: ["0.5 m/s", "1.0 m/s", "1.5 m/s", "2.0 m/s"],
    correctIndex: 1,
    explanation: "BSRIA recommends a minimum flushing velocity of 1.0 m/s to ensure effective removal of debris, flux residues and installation contaminants from heating systems."
  },
  {
    id: "pressure-test-duration",
    question: "For a standard hydraulic pressure test on a sealed heating system, what is the minimum test duration?",
    options: ["10 minutes", "30 minutes", "1 hour", "2 hours"],
    correctIndex: 2,
    explanation: "A hydraulic pressure test should be maintained for a minimum of 1 hour (some standards specify 2 hours) to allow detection of slow leaks and joint failures under sustained pressure."
  },
  {
    id: "balancing-tolerance",
    question: "What is the typical acceptable tolerance when balancing flow rates to design values?",
    options: ["+/- 5%", "+/- 10%", "+/- 15%", "+/- 20%"],
    correctIndex: 1,
    explanation: "Flow rates should be balanced to within +/- 10% of design values. This tolerance ensures adequate heat output while accounting for practical measurement limitations on site."
  },
  {
    id: "handover-requirement",
    question: "Under Building Regulations Part L, which document must be provided at handover for new heating installations?",
    options: ["Manufacturer warranty only", "Building log book with commissioning records", "Visual inspection certificate", "Energy bill estimate"],
    correctIndex: 1,
    explanation: "Building Regulations Part L requires a building log book containing commissioning records, operating instructions and maintenance schedules to be provided at handover for compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BSRIA guidance, what is the primary purpose of system flushing before commissioning?",
    options: [
      "To check for leaks in the pipework",
      "To remove debris, flux residues and installation contaminants",
      "To test the pump performance",
      "To fill the system with inhibitor"
    ],
    correctAnswer: 1,
    explanation: "System flushing removes debris, flux residues, jointing compounds and other installation contaminants that could damage pumps, valves and heat exchangers or cause circulation problems."
  },
  {
    id: 2,
    question: "What is the recommended test pressure for a sealed heating system hydraulic pressure test?",
    options: [
      "System working pressure",
      "1.1 times working pressure",
      "1.5 times working pressure or 3 bar (whichever is greater)",
      "Double the working pressure"
    ],
    correctAnswer: 2,
    explanation: "The test pressure should be 1.5 times the maximum working pressure or 3 bar, whichever is greater. This ensures adequate safety margin while not exceeding component ratings."
  },
  {
    id: 3,
    question: "When filling a heating system, why should the fill point be at the lowest point of the system?",
    options: [
      "To reduce filling time",
      "To allow air to rise and escape through vents as water enters",
      "To minimise water pressure",
      "To protect the pump from dry running"
    ],
    correctAnswer: 1,
    explanation: "Filling from the lowest point allows air to rise naturally and escape through automatic air vents or manual bleed points as water progressively fills the system from bottom to top."
  },
  {
    id: 4,
    question: "What is the purpose of proportional balancing when commissioning a heating system?",
    options: [
      "To set all valves to the same position",
      "To achieve design flow rates through each circuit relative to the index circuit",
      "To maximise system pressure",
      "To test the boiler efficiency"
    ],
    correctAnswer: 1,
    explanation: "Proportional balancing adjusts regulating valves so each circuit receives its design flow rate proportional to the index circuit (longest/highest resistance path), ensuring even heat distribution."
  },
  {
    id: 5,
    question: "During commissioning, what indicates that a system has been adequately flushed?",
    options: [
      "Water temperature reaches 60 degrees C",
      "Pump pressure gauge reads correctly",
      "Discharge water runs clear with no visible debris",
      "All radiators feel warm"
    ],
    correctAnswer: 2,
    explanation: "Flushing is complete when discharge water runs clear with no visible debris, sediment or discolouration. Some specifications also require turbidity testing for critical applications."
  },
  {
    id: 6,
    question: "What water treatment is typically required after flushing and before final filling?",
    options: [
      "Chlorination only",
      "Corrosion inhibitor and biocide treatment",
      "Softened water only",
      "No treatment required"
    ],
    correctAnswer: 1,
    explanation: "Corrosion inhibitor protects system metals from corrosion while biocide prevents bacterial growth. These treatments are essential for long-term system health and should be added at correct concentrations."
  },
  {
    id: 7,
    question: "What document provides the benchmark commissioning procedures for HVAC systems in the UK?",
    options: [
      "BS 7593 only",
      "Manufacturer instructions only",
      "BSRIA commissioning guides (BG series)",
      "Building Regulations Part F"
    ],
    correctAnswer: 2,
    explanation: "BSRIA commissioning guides (particularly BG 29 for water systems) provide comprehensive, industry-standard commissioning procedures. BS 7593 covers water treatment specifically."
  },
  {
    id: 8,
    question: "When balancing radiator circuits, which radiator should be balanced first?",
    options: [
      "The largest radiator",
      "The radiator nearest the boiler",
      "The index radiator (furthest from pump/highest resistance)",
      "Any radiator - order doesn't matter"
    ],
    correctAnswer: 2,
    explanation: "The index radiator (highest resistance circuit) is set first with its lockshield fully open. All other radiators are then throttled back proportionally to achieve their design flow rates."
  },
  {
    id: 9,
    question: "What is the minimum information required on a commissioning certificate for Building Regulations compliance?",
    options: [
      "Installer name and date only",
      "Design flow rates, achieved flow rates, test pressures and commissioning engineer details",
      "Boiler serial number only",
      "Customer signature only"
    ],
    correctAnswer: 1,
    explanation: "Commissioning certificates must record design parameters, achieved values, test results, any deviations, and be signed by a competent commissioning engineer to demonstrate compliance."
  },
  {
    id: 10,
    question: "What is the purpose of the witnessed performance test during commissioning?",
    options: [
      "To train the building owner",
      "To verify system achieves design performance under realistic operating conditions",
      "To check the warranty is valid",
      "To test the BMS graphics"
    ],
    correctAnswer: 1,
    explanation: "Witnessed performance testing verifies the complete system achieves its design intent under realistic conditions, with the client or their representative observing and signing off the results."
  },
  {
    id: 11,
    question: "Under BS 7593, what concentration of corrosion inhibitor is typically required for sealed heating systems?",
    options: [
      "No specific concentration required",
      "Manufacturer's recommended concentration verified by test",
      "Maximum possible concentration",
      "Same as domestic hot water systems"
    ],
    correctAnswer: 1,
    explanation: "BS 7593 requires inhibitor at the manufacturer's recommended concentration, verified by on-site testing (litmus test, conductivity or specific test kit). Records must be kept."
  },
  {
    id: 12,
    question: "What handover documentation must be provided to comply with Building Regulations Part L for a new commercial heating installation?",
    options: [
      "Invoice and warranty card",
      "Building log book with O&M manuals, commissioning records and energy metering data",
      "Boiler manual only",
      "Planning permission documents"
    ],
    correctAnswer: 1,
    explanation: "Part L requires a building log book containing: O&M manuals, as-built drawings, commissioning records, control system operating instructions, maintenance schedules and sub-metering details."
  }
];

const faqs = [
  {
    question: "What is the difference between flushing and power flushing?",
    answer: "Standard flushing uses mains pressure or a dedicated flushing pump to circulate water through the system at high velocity (minimum 1.0 m/s) to remove loose debris. Power flushing uses a specialised pump that creates higher flow rates and can reverse flow direction, combined with chemicals and agitation, to remove more stubborn deposits including magnetite sludge. Power flushing is typically used for remedial cleaning of existing systems rather than new installations."
  },
  {
    question: "Why is water treatment so important in heating systems?",
    answer: "Untreated water causes corrosion of ferrous metals (producing black magnetite sludge), scale formation from hard water minerals, and bacterial growth including legionella risk in certain conditions. These problems reduce system efficiency, cause blockages, damage components and can lead to premature failure. BS 7593 and manufacturer warranties require appropriate water treatment for sealed systems."
  },
  {
    question: "How do I determine the design flow rate for balancing?",
    answer: "Design flow rates are calculated from the heat output and design temperature differential. Flow rate (l/s) = Heat output (kW) / (4.19 x temperature differential). For a typical radiator system with 20 degrees C differential (80/60 degrees C flow/return), this simplifies to approximately 0.012 l/s per kW. These values should be specified in the design documentation."
  },
  {
    question: "What happens if a system fails the pressure test?",
    answer: "If pressure drops during the test, there is a leak. Isolate sections systematically to locate the leak, repair it, and retest. Common leak locations include compression fittings, soldered joints (especially where flux was insufficient), valve glands, air vents and radiator connections. The test must be passed before proceeding to filling and commissioning."
  },
  {
    question: "Who can sign off commissioning for Building Regulations compliance?",
    answer: "Commissioning must be carried out and certified by a competent person with appropriate training and experience. For domestic work, this is typically the installing contractor self-certifying under a Competent Person Scheme. For commercial work, an independent commissioning engineer or specialist commissioning contractor may be required, particularly for complex systems."
  },
  {
    question: "What records should be retained after commissioning?",
    answer: "Retain: commissioning certificates with all measured values, pressure test certificates, water treatment records and test results, as-built drawings, equipment schedules with serial numbers, warranty documents, O&M manuals, control system settings and BMS programming records, and any deviation reports. These form part of the building log book and are essential for future maintenance and compliance verification."
  }
];

const HNCModule8Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
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
            <Settings className="h-4 w-4" />
            <span>Module 8.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Commissioning
          </h1>
          <p className="text-white/80">
            Professional commissioning procedures for heating systems in compliance with BSRIA and Building Regulations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Flushing:</strong> Remove debris at &gt;1.0 m/s velocity</li>
              <li className="pl-1"><strong>Pressure test:</strong> 1.5x working pressure for 1+ hour</li>
              <li className="pl-1"><strong>Balancing:</strong> Achieve design flows within +/- 10%</li>
              <li className="pl-1"><strong>Documentation:</strong> Building log book for Part L compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BSRIA BG 29:</strong> Pre-commissioning cleaning</li>
              <li className="pl-1"><strong>BSRIA BG 2:</strong> Commissioning water systems</li>
              <li className="pl-1"><strong>BS 7593:</strong> Water treatment for heating</li>
              <li className="pl-1"><strong>Building Regs Part L:</strong> Compliance requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BSRIA flushing procedures to remove installation debris",
              "Conduct hydraulic pressure tests to identify leaks",
              "Implement correct water treatment in accordance with BS 7593",
              "Balance heating systems to achieve design flow rates",
              "Perform witnessed performance testing",
              "Prepare compliant handover documentation for Building Regulations"
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

        {/* Section 01: System Flushing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            System Flushing and Pre-Commissioning Cleaning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              System flushing is a critical pre-commissioning procedure that removes debris, flux residues,
              jointing compounds and other installation contaminants from pipework before the system is
              put into service. BSRIA BG 29 provides comprehensive guidance for pre-commissioning cleaning.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Flushing is Essential</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Debris removal:</strong> Swarf, solder, flux residue and pipe scale can block valves, pumps and heat exchangers</li>
                <li className="pl-1"><strong>Pump protection:</strong> Abrasive particles damage pump impellers and seals</li>
                <li className="pl-1"><strong>Heat transfer:</strong> Deposits reduce heat exchanger efficiency</li>
                <li className="pl-1"><strong>Corrosion prevention:</strong> Flux residues are corrosive and must be removed</li>
                <li className="pl-1"><strong>Warranty compliance:</strong> Many manufacturers require evidence of proper flushing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Flushing Procedure</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Flushing Requirements</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Minimum velocity: <strong>1.0 m/s</strong> (preferably 1.5 m/s)</li>
                    <li className="pl-1">Flow must reach all parts of the system</li>
                    <li className="pl-1">Continue until discharge runs clear</li>
                    <li className="pl-1">Isolate sensitive equipment (heat meters, etc.)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Flushing Methods</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Mains pressure:</strong> For smaller systems if velocity achieved</li>
                    <li className="pl-1"><strong>Dedicated flushing pump:</strong> Higher velocities possible</li>
                    <li className="pl-1"><strong>Sequential isolation:</strong> Ensures all branches flushed</li>
                    <li className="pl-1"><strong>Reverse flow:</strong> Helps dislodge stubborn debris</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flushing Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Install temporary strainers at pump suctions and before sensitive equipment</li>
                <li className="pl-1"><strong>Step 2:</strong> Connect flushing supply to lowest fill point</li>
                <li className="pl-1"><strong>Step 3:</strong> Open all valves (lockshields, zone valves, TRVs fully open)</li>
                <li className="pl-1"><strong>Step 4:</strong> Flush mains and risers first, then individual branches</li>
                <li className="pl-1"><strong>Step 5:</strong> Continue until discharge water is clear (visually inspect and/or turbidity test)</li>
                <li className="pl-1"><strong>Step 6:</strong> Remove temporary strainers and inspect permanent strainers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chemical Cleaning</p>
              <p className="text-sm text-white/90 mb-3">
                For heavily contaminated systems or where water-only flushing is insufficient, chemical cleaning may be required:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cleaning agent:</strong> Proprietary system cleaner circulated at elevated temperature</li>
                <li className="pl-1"><strong>Contact time:</strong> Follow manufacturer's instructions (typically 1-2 hours)</li>
                <li className="pl-1"><strong>Neutralisation:</strong> Drain, flush thoroughly, test pH before refilling</li>
                <li className="pl-1"><strong>Disposal:</strong> Discharge in accordance with environmental regulations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation:</strong> Record flushing dates, methods used, duration and visual inspection results.
              Photograph the discharge water at start and end of flushing for evidence of cleanliness achieved.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Filling, Pressurising and Water Treatment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Filling, Pressurising and Water Treatment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After successful flushing, the system must be correctly filled, vented, pressure tested and treated
              with appropriate chemicals. This stage establishes the baseline system integrity and water quality
              essential for long-term reliable operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Filling Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fill point:</strong> Connect to lowest point to allow air to rise and escape</li>
                <li className="pl-1"><strong>Fill rate:</strong> Slow enough to allow air venting (avoid air entrainment)</li>
                <li className="pl-1"><strong>Air venting:</strong> Open all manual air vents, check AAVs are functioning</li>
                <li className="pl-1"><strong>Fill pressure:</strong> Target cold fill pressure (typically 1-1.5 bar for domestic, as designed for commercial)</li>
                <li className="pl-1"><strong>Circulation:</strong> Run pump to circulate and release dissolved air</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Hydraulic Pressure Testing</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Test Requirements</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Test pressure: <strong>1.5x working pressure</strong> or 3 bar minimum</li>
                    <li className="pl-1">Duration: Minimum <strong>1 hour</strong> (some specs require 2 hours)</li>
                    <li className="pl-1">Acceptable drop: None (allow for temperature effects)</li>
                    <li className="pl-1">Gauge accuracy: Calibrated test gauge required</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Test Procedure</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Isolate expansion vessel and PRV</li>
                    <li className="pl-1">Fill system completely (no air)</li>
                    <li className="pl-1">Pressurise using hydraulic test pump</li>
                    <li className="pl-1">Record pressure at start and end</li>
                    <li className="pl-1">Inspect all joints and connections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Water Treatment Requirements (BS 7593)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Corrosion inhibitor:</strong> Essential for all sealed systems to protect ferrous metals</li>
                <li className="pl-1"><strong>Concentration:</strong> Manufacturer's recommended level, verified by on-site test</li>
                <li className="pl-1"><strong>Biocide:</strong> May be required to prevent bacterial growth</li>
                <li className="pl-1"><strong>Scale inhibitor:</strong> In hard water areas to prevent limescale buildup</li>
                <li className="pl-1"><strong>Antifreeze:</strong> Where freeze protection required (e.g., solar thermal, exposed locations)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Water Quality Testing</p>
              <p className="text-sm text-white/90 mb-3">
                Water quality should be tested and recorded at commissioning and during routine maintenance:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptable Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inhibitor concentration</td>
                      <td className="border border-white/10 px-3 py-2">Proprietary test kit</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer's specification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">pH</td>
                      <td className="border border-white/10 px-3 py-2">pH strips or meter</td>
                      <td className="border border-white/10 px-3 py-2">7.5 - 9.0 (typically)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total dissolved solids</td>
                      <td className="border border-white/10 px-3 py-2">TDS meter</td>
                      <td className="border border-white/10 px-3 py-2">&lt;500 ppm (varies)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Appearance</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Clear, no sediment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record keeping:</strong> Document all water treatment products used, concentrations achieved and test results.
              Affix a permanent label to the system stating treatment type and date for future maintenance reference.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: System Balancing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Balancing to Design Flow Rates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              System balancing ensures that each circuit and terminal unit receives its design flow rate,
              enabling the heating system to deliver the intended heat output to each space. BSRIA BG 2
              provides the industry-standard procedures for commissioning water systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Balancing Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat distribution:</strong> Without balancing, circuits nearest the pump receive excessive flow while remote circuits are starved</li>
                <li className="pl-1"><strong>Comfort:</strong> Imbalanced systems cause hot and cold spots, leading to occupant complaints</li>
                <li className="pl-1"><strong>Efficiency:</strong> Overflowing circuits waste pump energy; underflowing circuits require higher temperatures</li>
                <li className="pl-1"><strong>Control:</strong> Balanced systems respond predictably to control signals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balancing Methods</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Proportional Balancing</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Set index circuit valve fully open</li>
                    <li className="pl-1">Measure flow rate (or calculate from delta-T)</li>
                    <li className="pl-1">Adjust other valves proportionally</li>
                    <li className="pl-1">Work from index towards pump</li>
                    <li className="pl-1">Recheck after all adjustments</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">PICV (Pressure Independent) Systems</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">PICVs automatically limit flow to set point</li>
                    <li className="pl-1">Set dial to design flow rate</li>
                    <li className="pl-1">No proportional adjustment required</li>
                    <li className="pl-1">Verify flow with measurement device</li>
                    <li className="pl-1">Check differential pressure across PICV</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Measurement Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fixed orifice valves:</strong> Measure differential pressure across orifice, use valve chart to determine flow</li>
                <li className="pl-1"><strong>Ultrasonic flow meter:</strong> Clamp-on device measures flow non-invasively</li>
                <li className="pl-1"><strong>Temperature differential:</strong> Calculate flow from Q = m x Cp x delta-T (requires accurate thermometers)</li>
                <li className="pl-1"><strong>Commissioning sets:</strong> Dedicated valves with integrated measurement ports</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balancing Procedure (Proportional Method)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Identify index circuit (longest run, highest resistance path)</li>
                <li className="pl-1"><strong>Step 2:</strong> Set index circuit regulating valve fully open</li>
                <li className="pl-1"><strong>Step 3:</strong> Set pump to design duty (speed or head)</li>
                <li className="pl-1"><strong>Step 4:</strong> Measure flow rate on index circuit</li>
                <li className="pl-1"><strong>Step 5:</strong> Adjust total system flow to achieve index design flow</li>
                <li className="pl-1"><strong>Step 6:</strong> Working from index towards pump, adjust each valve to achieve proportional flow</li>
                <li className="pl-1"><strong>Step 7:</strong> Recheck all readings after complete balance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Flow Rate Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Flow rate (l/s) = Heat output (kW) / (Cp x delta-T)</p>
                <p className="mt-2">Where: Cp = 4.19 kJ/kg.K for water</p>
                <p>delta-T = Design temperature differential (typically 10-20 degrees C)</p>
                <p className="mt-2 text-white/60">Example: 10 kW radiator, 20 degrees C differential</p>
                <p>Flow = 10 / (4.19 x 20) = 0.119 l/s = <strong>7.2 l/min</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Acceptable Tolerances</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flow rate:</strong> +/- 10% of design value</li>
                <li className="pl-1"><strong>Temperature differential:</strong> Within design range under load</li>
                <li className="pl-1"><strong>Pump pressure:</strong> Able to achieve design flow at design head</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record all values:</strong> Document design flow rate, measured flow rate, valve position (turns open)
              and differential pressure for each circuit. These records are essential for future troubleshooting and re-commissioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Performance Testing and Handover Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Performance Testing and Handover Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Performance testing verifies that the complete heating system achieves its design intent under
              realistic operating conditions. Comprehensive handover documentation ensures compliance with
              Building Regulations and provides the building operator with the information needed for
              effective ongoing management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Witnessed Performance Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> Demonstrate system meets design performance with client/engineer witness</li>
                <li className="pl-1"><strong>Conditions:</strong> Test under realistic load conditions (heating season or artificial load)</li>
                <li className="pl-1"><strong>Parameters:</strong> Temperatures, flow rates, pressures, control response, noise levels</li>
                <li className="pl-1"><strong>Witness:</strong> Client, consulting engineer or clerk of works to sign off results</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Performance Test Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Heat Generation</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Boiler/heat pump firing and modulating correctly</li>
                    <li className="pl-1">Flow and return temperatures as designed</li>
                    <li className="pl-1">Flue gas analysis (combustion appliances)</li>
                    <li className="pl-1">Safety controls functioning (high limit, frost, etc.)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Distribution and Controls</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Pump operating at design duty</li>
                    <li className="pl-1">Zone valves responding to thermostats</li>
                    <li className="pl-1">TRVs modulating correctly</li>
                    <li className="pl-1">BMS/controls operating as programmed</li>
                    <li className="pl-1">Optimiser and compensator functioning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Part L Requirements</p>
              <p className="text-sm text-white/90 mb-3">
                Part L of the Building Regulations requires heating systems to be commissioned and documented:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning:</strong> Systems must be commissioned by a competent person</li>
                <li className="pl-1"><strong>Notice:</strong> Building Control must be notified of commissioning completion</li>
                <li className="pl-1"><strong>Certificate:</strong> Commissioning certificate required (domestic: Benchmark, commercial: BSRIA format)</li>
                <li className="pl-1"><strong>Building log book:</strong> Required for commercial buildings with O&M information</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Records Required</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure test certificate</td>
                      <td className="border border-white/10 px-3 py-2">Test pressure, duration, result, gauge calibration</td>
                      <td className="border border-white/10 px-3 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flushing record</td>
                      <td className="border border-white/10 px-3 py-2">Method, duration, cleanliness achieved</td>
                      <td className="border border-white/10 px-3 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water treatment record</td>
                      <td className="border border-white/10 px-3 py-2">Products used, concentrations, test results</td>
                      <td className="border border-white/10 px-3 py-2">Essential (BS 7593)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balancing report</td>
                      <td className="border border-white/10 px-3 py-2">Design vs achieved flow rates, valve positions</td>
                      <td className="border border-white/10 px-3 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Performance test results</td>
                      <td className="border border-white/10 px-3 py-2">Witnessed test data, signatures</td>
                      <td className="border border-white/10 px-3 py-2">Commercial projects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control settings</td>
                      <td className="border border-white/10 px-3 py-2">Set points, schedules, parameters</td>
                      <td className="border border-white/10 px-3 py-2">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Contents</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>As-built drawings:</strong> Showing actual installed equipment and routing</li>
                <li className="pl-1"><strong>Equipment schedules:</strong> Makes, models, serial numbers, ratings</li>
                <li className="pl-1"><strong>O&M manuals:</strong> For all significant plant items</li>
                <li className="pl-1"><strong>Commissioning records:</strong> All test results and certificates</li>
                <li className="pl-1"><strong>Control system documentation:</strong> Descriptions, schematics, programming</li>
                <li className="pl-1"><strong>Maintenance schedules:</strong> Recommended maintenance frequencies and procedures</li>
                <li className="pl-1"><strong>Energy metering:</strong> Meter schedules and reading instructions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Client Training Requirements</p>
              <p className="text-sm text-white/90 mb-3">
                Handover should include training for building operators:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System operation:</strong> Normal start-up, shutdown and seasonal changeover</li>
                <li className="pl-1"><strong>Controls:</strong> Setting time schedules, temperatures, operating modes</li>
                <li className="pl-1"><strong>Routine maintenance:</strong> Filter cleaning, pressure checks, visual inspections</li>
                <li className="pl-1"><strong>Fault finding:</strong> Common problems and initial troubleshooting steps</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Isolation, safety controls, who to contact</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance evidence:</strong> Retain copies of all commissioning documentation for a minimum of
              6 years (longer for commercial buildings). These records may be required for compliance audits,
              warranty claims or future system modifications.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Calculating Design Flow Rate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A radiator has a heat output of 2.5 kW. The system is designed
                for 80 degrees C flow and 60 degrees C return temperatures. Calculate the design flow rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Design delta-T = 80 - 60 = 20 degrees C</p>
                <p className="mt-2">Flow rate = Heat output / (Cp x delta-T)</p>
                <p>Flow rate = 2.5 kW / (4.19 kJ/kg.K x 20 K)</p>
                <p>Flow rate = 2.5 / 83.8 = 0.0298 kg/s</p>
                <p className="mt-2">Converting to practical units (assuming water density 1 kg/L):</p>
                <p>Flow rate = 0.0298 L/s x 60 = <strong>1.79 L/min</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Pressure Test Requirements</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A sealed heating system has a maximum working pressure of 2.5 bar
                and is protected by a 3 bar pressure relief valve. What test pressure should be used and why?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Standard requirement: 1.5 x working pressure OR 3 bar minimum</p>
                <p className="mt-2">Calculation: 1.5 x 2.5 bar = 3.75 bar</p>
                <p className="mt-2">However, the PRV is set at 3 bar, so testing at 3.75 bar would:</p>
                <p>- Either lift the PRV, or</p>
                <p>- Require removing/isolating the PRV during test</p>
                <p className="mt-2">Practical approach:</p>
                <p>1. Isolate or remove the PRV</p>
                <p>2. Test at <strong>3.75 bar for 1 hour minimum</strong></p>
                <p>3. Reinstall/reconnect PRV before system operation</p>
                <p>4. Record that PRV was isolated during test</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Proportional Balancing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A system has three radiator circuits with design flow rates of
                2.0, 1.5 and 1.0 L/min respectively. The index circuit (2.0 L/min) valve is fully open.
                When measured, it achieves 2.2 L/min. The second circuit reads 1.8 L/min with its valve
                fully open. Calculate the required adjustment.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Index circuit: Design 2.0 L/min, Measured 2.2 L/min</p>
                <p>Ratio = 2.2 / 2.0 = 1.10 (10% over design - acceptable)</p>
                <p className="mt-2">Circuit 2: Design 1.5 L/min, Measured 1.8 L/min</p>
                <p>Proportional target = 1.5 x 1.10 = 1.65 L/min</p>
                <p>Current reading = 1.8 L/min</p>
                <p className="mt-2">Action: Throttle Circuit 2 valve until flow reads <strong>1.65 L/min</strong></p>
                <p className="mt-2 text-white/60">Note: After adjusting, recheck index circuit as system</p>
                <p className="text-white/60">resistance will have changed slightly.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Flushing Velocity Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22mm copper pipe circuit requires flushing. The available
                flushing pump delivers 15 L/min. Is this adequate for BSRIA-compliant flushing?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>22mm copper pipe internal diameter approx 20mm = 0.02m</p>
                <p>Cross-sectional area = pi x r squared</p>
                <p>Area = 3.14159 x (0.01)squared = 0.000314 m squared</p>
                <p className="mt-2">Flow rate = 15 L/min = 0.25 L/s = 0.00025 m cubed/s</p>
                <p className="mt-2">Velocity = Flow rate / Area</p>
                <p>Velocity = 0.00025 / 0.000314 = <strong>0.80 m/s</strong></p>
                <p className="mt-2 text-amber-400">This is below the 1.0 m/s BSRIA minimum.</p>
                <p className="text-white/60">Either use a higher capacity pump or flush smaller</p>
                <p className="text-white/60">sections individually to achieve adequate velocity.</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Sequence</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Pre-commissioning:</strong> Install strainers, clean pipework, flush system thoroughly</li>
                <li className="pl-1"><strong>2. Pressure test:</strong> Hydraulic test at 1.5x working pressure for minimum 1 hour</li>
                <li className="pl-1"><strong>3. Fill and treat:</strong> Fill from lowest point, vent air, add water treatment</li>
                <li className="pl-1"><strong>4. Static commissioning:</strong> Check all components installed correctly, valves operational</li>
                <li className="pl-1"><strong>5. Dynamic commissioning:</strong> Run system, set controls, balance flow rates</li>
                <li className="pl-1"><strong>6. Performance testing:</strong> Verify design performance under load</li>
                <li className="pl-1"><strong>7. Documentation:</strong> Complete all records, prepare handover pack</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Equipment</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flow measurement:</strong> Ultrasonic meter, differential pressure gauge, commissioning valve charts</li>
                <li className="pl-1"><strong>Temperature:</strong> Digital thermometers, infrared thermometer, surface probes</li>
                <li className="pl-1"><strong>Pressure:</strong> Calibrated test gauge, hydraulic test pump</li>
                <li className="pl-1"><strong>Water quality:</strong> Inhibitor test kit, pH strips, TDS meter</li>
                <li className="pl-1"><strong>Electrical:</strong> Multimeter for control circuit verification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Commissioning Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate flushing:</strong> Leads to pump damage, blocked heat exchangers, valve failures</li>
                <li className="pl-1"><strong>No water treatment:</strong> Causes corrosion, sludge buildup, system failure</li>
                <li className="pl-1"><strong>Skipping pressure test:</strong> Leaks may only appear under operating pressure/temperature</li>
                <li className="pl-1"><strong>Poor balancing:</strong> Results in comfort complaints, inefficient operation</li>
                <li className="pl-1"><strong>Incomplete records:</strong> Creates compliance issues, maintenance problems</li>
                <li className="pl-1"><strong>No client training:</strong> System operated incorrectly, premature failures</li>
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
                <p className="font-medium text-white mb-1">Key Parameters</p>
                <ul className="space-y-0.5">
                  <li>Flushing velocity: &gt;1.0 m/s minimum</li>
                  <li>Test pressure: 1.5x working or 3 bar min</li>
                  <li>Test duration: 1 hour minimum</li>
                  <li>Balancing tolerance: +/- 10% of design</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BSRIA BG 29: Pre-commissioning cleaning</li>
                  <li>BSRIA BG 2: Commissioning water systems</li>
                  <li>BS 7593: Water treatment requirements</li>
                  <li>Building Regs Part L: Compliance</li>
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
            <Link to="../h-n-c-module8-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Heating Controls
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
              Complete Section 1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_6;
