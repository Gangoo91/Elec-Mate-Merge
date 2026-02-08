import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning Procedures - MOET Module 4.5.6";
const DESCRIPTION = "Comprehensive guide to electrical commissioning procedures for maintenance technicians: pre-commissioning checks, energisation sequences, performance verification, soak testing, and handover processes in accordance with BS 7671 and industry best practice.";

const quickCheckQuestions = [
  {
    id: "comm-definition",
    question: "What is the primary objective of electrical commissioning?",
    options: [
      "To install the equipment as quickly as possible",
      "To systematically verify that all electrical systems and equipment operate safely, correctly, and to their design specification before being placed into normal service",
      "To produce paperwork for the client",
      "To test whether the equipment can withstand overload conditions"
    ],
    correctIndex: 1,
    explanation: "Commissioning is a systematic process of verifying that all electrical systems and equipment operate safely, correctly, and to their design specification before being handed over for normal operational use. It bridges the gap between installation/repair and operational service, ensuring that every component functions as intended individually and as part of the integrated system."
  },
  {
    id: "comm-precheck",
    question: "Why must pre-commissioning checks be completed before any equipment is energised?",
    options: [
      "Because it is required for the warranty claim",
      "Because energising equipment without verifying correct installation, connections, and settings could result in immediate damage to equipment, injury to personnel, or fire — pre-commissioning checks identify and correct deficiencies while the system is safe (de-energised)",
      "Because pre-commissioning checks are faster than post-commissioning checks",
      "Because the client always requests them"
    ],
    correctIndex: 1,
    explanation: "Pre-commissioning checks are the safety net before energisation. They verify that all connections are correct and tight, that protective devices are correctly rated and set, that equipment is suitable for the application, and that no foreign objects or installation debris are present. Energising without these checks risks immediate equipment damage (e.g., from incorrect connections), electrical faults (e.g., from loose connections), or injury (e.g., from a phase-to-earth fault on first energisation)."
  },
  {
    id: "comm-sequence",
    question: "What is the correct general sequence for energising an electrical installation?",
    options: [
      "Energise all circuits simultaneously to save time",
      "Energise from the source outwards — supply first, then main switchboard, then distribution boards, then individual circuits — verifying correct operation at each stage before proceeding",
      "Energise the most distant circuit first and work backwards",
      "Energise only the circuits that the client wants to use immediately"
    ],
    correctIndex: 1,
    explanation: "The correct energisation sequence works from the source outwards: energise the incoming supply, verify correct voltage and phase rotation at the main switchboard, then energise each distribution board in turn, verifying at each stage before proceeding. Finally, energise individual circuits one at a time. This staged approach allows faults to be detected and isolated at each level without affecting the rest of the installation, and provides a controlled, systematic approach to bringing the system online."
  },
  {
    id: "comm-soak",
    question: "What is the purpose of a soak test (extended run test) during commissioning?",
    options: [
      "To test the equipment's waterproof rating",
      "To operate the equipment under normal load conditions for an extended period to identify any intermittent faults, overheating, abnormal vibration, or performance drift that would not be detected during brief functional testing",
      "To test the equipment at maximum overload",
      "To use up the warranty period"
    ],
    correctIndex: 1,
    explanation: "A soak test runs the equipment under normal operating conditions for an extended period (typically 24-72 hours depending on the application) to identify problems that only manifest over time: intermittent faults (loose connections that only cause problems when components expand from heating), overheating (thermal build-up in enclosures with inadequate ventilation), abnormal vibration or noise, and performance drift. These issues are often invisible during brief functional tests."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Commissioning of electrical systems should be carried out by:",
    options: [
      "Any available member of the installation team",
      "Competent persons with knowledge of the system design, equipment operation, and testing procedures, who have been briefed on the specific requirements of the installation",
      "The client's facilities management team only",
      "The equipment manufacturer exclusively"
    ],
    correctAnswer: 1,
    explanation: "Commissioning requires competent persons who understand both the theoretical principles and the practical operation of the systems being commissioned. They must have knowledge of the design intent, the equipment specifications, the testing procedures, and the acceptance criteria. For complex systems, commissioning may require specialists — motor drive commissioning engineers, BMS specialists, or protection relay engineers — working alongside the general installation team."
  },
  {
    id: 2,
    question: "A pre-commissioning checklist for a motor control centre (MCC) should include:",
    options: [
      "Only checking that the MCC is correctly labelled",
      "Verification of correct cable terminations, torque checks on all connections, correct protective device ratings and settings, correct phase rotation, clean interior free of debris, secure panel fixings, and functional interlocks",
      "Only measuring the insulation resistance of the busbars",
      "Only visual inspection of the exterior"
    ],
    correctAnswer: 1,
    explanation: "A thorough MCC pre-commissioning checklist covers all aspects: correct cable terminations (including phase sequence and correct allocation to outgoing ways), torque verification on all busbar joints and cable terminations, correct protective device ratings and settings per the design, correct phase rotation verification, removal of all installation debris and foreign objects, secure panel fixings and covers, functional interlock checks, and verification of labelling and circuit directories."
  },
  {
    id: 3,
    question: "Phase rotation (phase sequence) must be verified before energising three-phase equipment because:",
    options: [
      "It affects the colour of the indicator lights",
      "Incorrect phase rotation will cause three-phase motors to run in the wrong direction, potentially damaging driven equipment, and may affect the operation of phase-sequence-sensitive protection relays",
      "It only matters for very large motors above 100 kW",
      "Phase rotation is automatically correct if the cables are the correct colour"
    ],
    correctAnswer: 1,
    explanation: "Incorrect phase rotation causes three-phase motors to rotate in the wrong direction. For pumps, fans, compressors, and conveyors, this can cause equipment damage, process failure, or safety hazards (e.g., a pump running backwards can cause water hammer or flooding). Phase-sensitive protection relays may also malfunction. Phase rotation must be verified at each distribution point using a phase rotation meter before any three-phase equipment is started."
  },
  {
    id: 4,
    question: "During commissioning, a motor draws significantly higher current than its nameplate rating. The commissioning engineer should:",
    options: [
      "Increase the overload setting to prevent tripping and continue",
      "Stop the motor immediately, investigate the cause (which could be mechanical overload, incorrect supply voltage, winding fault, or incorrect motor specification), and do not restart until the cause is identified and rectified",
      "Let the motor run for 30 minutes to see if the current reduces",
      "Replace the ammeter in case it is faulty"
    ],
    correctAnswer: 1,
    explanation: "An overcurrent condition on first start indicates a problem that must be investigated immediately. Possible causes include mechanical overload (seized bearings, jammed driven equipment), incorrect supply voltage (too high or too low), winding fault (short-circuited turns), incorrect motor specification (motor too small for the application), or incorrect connection (e.g., star when delta is required). Running a motor in overcurrent condition will cause overheating and insulation damage."
  },
  {
    id: 5,
    question: "The commissioning of a UPS (uninterruptible power supply) system should include:",
    options: [
      "Only checking that the battery is charged",
      "Verification of correct operation in all modes: normal (mains-powered), battery (mains-failure), bypass (maintenance), and transfer between modes, including verification of transfer times and output voltage/frequency under load",
      "Only testing the bypass switch",
      "Only measuring the input voltage"
    ],
    correctAnswer: 1,
    explanation: "UPS commissioning must verify operation in all operating modes: normal operation (load powered from mains via the UPS), battery operation (load maintained during mains failure, including verification of changeover time and battery duration), bypass operation (load powered directly from mains for UPS maintenance), and automatic retransfer when mains is restored. Output voltage, frequency, and waveform quality must be verified under load in each mode."
  },
  {
    id: 6,
    question: "A commissioning programme for a new building electrical installation should be developed:",
    options: [
      "On the day of commissioning",
      "During the design and planning stage, with the commissioning requirements, sequence, responsibilities, and acceptance criteria defined before installation begins",
      "After the installation is complete",
      "Only if the client specifically requests it"
    ],
    correctAnswer: 1,
    explanation: "The commissioning programme should be developed during the design and planning stage, not as an afterthought. Early planning ensures that commissioning requirements influence the installation (e.g., provision of test points, access for commissioning equipment), that responsibilities are clearly assigned, that the commissioning sequence is compatible with the construction programme, and that acceptance criteria are agreed in advance with the client."
  },
  {
    id: 7,
    question: "After replacing a variable speed drive (VSD) during maintenance, the commissioning process should include:",
    options: [
      "Only checking that the motor starts",
      "Verification of all drive parameters against the commissioning record, including motor nameplate data, acceleration/deceleration ramps, speed limits, protection settings, control interface configuration, and a test run at various speeds to confirm correct operation",
      "Only measuring the supply voltage",
      "Only running the motor at full speed"
    ],
    correctAnswer: 1,
    explanation: "A replacement VSD must be configured with the correct parameters for the specific motor and application. This includes motor data (voltage, current, frequency, speed, power factor), acceleration and deceleration ramp times, minimum and maximum speed limits, protection settings (overcurrent, overvoltage, earth fault), control interface configuration (analogue input scaling, digital input/output assignments), and PID controller settings if used. A test run at various speeds confirms correct operation and smooth speed control."
  },
  {
    id: 8,
    question: "Thermal imaging during commissioning is used to:",
    options: [
      "Take photographs of the installation for marketing purposes",
      "Identify hot spots indicating high-resistance connections, overloaded conductors, unbalanced loads, or failing components under normal operating conditions",
      "Measure the room temperature",
      "Check the colour coding of cables"
    ],
    correctAnswer: 1,
    explanation: "Thermal imaging (infrared thermography) during commissioning identifies abnormal heat generation that indicates problems: high-resistance connections (loose terminations, corroded contacts), overloaded conductors (undersized cables, excessive current), unbalanced loads on three-phase systems, and failing components (overheating capacitors, deteriorating insulation). Conducting a thermal survey during commissioning provides a baseline for comparison during future maintenance surveys."
  },
  {
    id: 9,
    question: "A witness test during commissioning involves:",
    options: [
      "Having a witness present to sign the attendance register",
      "The client or their representative observing the commissioning tests and verifying the results, providing independent confirmation that the system meets the specified requirements",
      "Testing the fire alarm system with witnesses evacuating the building",
      "Having a legal witness present for insurance purposes"
    ],
    correctAnswer: 1,
    explanation: "A witness test is a formal commissioning activity where the client or their representative observes the tests being carried out and verifies the results. This provides independent confirmation that the system meets the specified requirements and gives the client confidence in the commissioning process. Witness tests are typically scheduled for critical systems and agreed in advance as part of the commissioning programme."
  },
  {
    id: 10,
    question: "The commissioning record (documentation pack) should include:",
    options: [
      "Only the test certificates",
      "Pre-commissioning checklists, test results and certificates, equipment settings and configurations, thermal survey results, snag lists, soak test records, and a clear statement of the system's operational status at handover",
      "Only photographs of the installation",
      "Only the equipment manufacturer's manuals"
    ],
    correctAnswer: 1,
    explanation: "The commissioning record is a comprehensive documentation pack that provides the complete history of the commissioning process: pre-commissioning checklists (confirming readiness for energisation), test results and certificates (formal BS 7671 documentation), equipment settings and configurations (drive parameters, relay settings, BMS configurations), thermal survey results, soak test records, snag lists (outstanding items and their resolution), and a clear handover statement. This record is invaluable for future maintenance."
  },
  {
    id: 11,
    question: "A 'snag list' in the context of commissioning refers to:",
    options: [
      "A list of complaints from the client",
      "A documented list of minor deficiencies, incomplete items, or non-conformances identified during commissioning that must be rectified before final handover or within an agreed period after handover",
      "A list of spare parts required",
      "A list of workers who made mistakes"
    ],
    correctAnswer: 1,
    explanation: "A snag list is a formal document that records all items identified during commissioning that do not meet the required standard or are incomplete. Each item is described, assigned a priority, given a responsibility, and tracked to resolution. Minor snags may be agreed for resolution within a defined period after handover (with the client's agreement), while safety-critical snags must be resolved before the system is placed into service."
  },
  {
    id: 12,
    question: "After commissioning is complete and the system is handed over, the maintenance technician's responsibility is to:",
    options: [
      "Forget about the system until it breaks down",
      "Ensure the commissioning records are filed as baseline data for future maintenance, establish the preventive maintenance schedule based on manufacturer's recommendations and commissioning findings, and monitor early-life performance for any issues",
      "Remove all test equipment and leave the site",
      "Wait for the warranty period to expire"
    ],
    correctAnswer: 1,
    explanation: "After handover, the commissioning records become the baseline against which all future maintenance measurements are compared. The maintenance technician should ensure these records are properly filed and accessible, establish a preventive maintenance schedule based on the equipment manufacturers' recommendations and any commissioning findings, and monitor the system during its early operational life for infant mortality failures, settling issues, or performance drift that may require early intervention."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and initial verification?",
    answer: "Initial verification (as defined in BS 7671 Part 6) is the specific process of inspecting and testing an electrical installation to confirm it complies with BS 7671 before it is put into service. Commissioning is a broader process that includes initial verification but also encompasses pre-commissioning checks, performance testing, functional testing, load testing, soak testing, parameter optimisation, and formal handover. Initial verification confirms regulatory compliance; commissioning confirms operational readiness."
  },
  {
    question: "Is commissioning required after maintenance work?",
    answer: "The scope of commissioning after maintenance depends on the extent of the work. Like-for-like replacement of a component (e.g., a contactor) requires re-commissioning of that component and verification that the system still functions correctly. A major overhaul or modification may require full recommissioning of the affected system. The principle is that any work that could affect the safe or correct operation of the system must be followed by sufficient commissioning to verify that the system is fit for service."
  },
  {
    question: "Who is responsible for commissioning on a construction project?",
    answer: "Responsibility depends on the contract arrangements. Typically, the electrical contractor commissions their own installation, with the principal contractor coordinating the overall commissioning programme. For complex projects, a dedicated commissioning manager may be appointed. The client or their representative witnesses critical tests. Under CDM 2015, the principal contractor must ensure adequate commissioning before handover. All parties' responsibilities should be clearly defined in the project documents."
  },
  {
    question: "What safety precautions are needed during commissioning?",
    answer: "Commissioning involves working on and near energised equipment, which requires specific safety precautions: use of GS 38 compliant test leads, appropriate PPE (including arc flash protection for high-energy systems), risk assessments for each commissioning activity, competent persons only, clear communication between team members (especially during energisation sequences), isolation and lockout procedures for de-energised work phases, and ready access to first aid and emergency provisions."
  },
  {
    question: "How detailed should commissioning records be?",
    answer: "Commissioning records should be detailed enough that a competent person who was not present during commissioning can understand exactly what was tested, how it was tested, what the results were, and whether the results met the acceptance criteria. This typically means recording: the specific test performed, the test conditions, the measured values (not just pass/fail), the acceptance criteria, and the conclusion. Photographs and videos can supplement written records, particularly for complex systems."
  }
];

const MOETModule4Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
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
            <span>Module 4.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commissioning Procedures
          </h1>
          <p className="text-white/80">
            Systematic commissioning of electrical installations from pre-checks through energisation to handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Verify systems operate safely and to specification before service</li>
              <li className="pl-1"><strong>Sequence:</strong> Pre-checks, energisation (source outwards), functional tests, soak test</li>
              <li className="pl-1"><strong>Documentation:</strong> Checklists, test records, snag lists, handover pack</li>
              <li className="pl-1"><strong>Baseline:</strong> Commissioning records become the reference for future maintenance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>After repairs:</strong> Re-commission affected systems proportional to the work scope</li>
              <li className="pl-1"><strong>Safety:</strong> Energisation involves live working risks — plan and control carefully</li>
              <li className="pl-1"><strong>Records:</strong> Commissioning data provides the baseline for condition monitoring</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to commissioning, handover, and quality assurance competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the purpose and stages of the electrical commissioning process",
              "Develop and execute pre-commissioning checklists for different equipment types",
              "Plan and execute a safe energisation sequence from source to final circuits",
              "Conduct performance verification including load testing and soak testing",
              "Document commissioning results and compile the handover documentation pack",
              "Apply commissioning principles to maintenance scenarios (re-commissioning after repairs)"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Commissioning Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning is the systematic process of bringing an electrical installation or piece of equipment from a state of installation or repair to full operational readiness. It encompasses all the activities necessary to verify that the system operates safely, correctly, and to its design specification before it is handed over for normal use. Unlike a simple "switch it on and see if it works" approach, commissioning follows a structured, documented procedure that identifies and resolves issues at each stage.
            </p>
            <p>
              The commissioning process has several distinct phases: planning (defining what will be tested, in what order, by whom, and against what criteria), pre-commissioning checks (verifying readiness for energisation while the system is still de-energised and safe), energisation (applying power in a controlled, staged sequence), functional testing (verifying that each device and system performs its intended function), performance testing (verifying that the system meets its performance specification under load), and handover (formal transfer of the system to the client or operator with complete documentation).
            </p>
            <p>
              For maintenance technicians, commissioning is not limited to new installations. Every time a significant repair or modification is made, the affected system must be re-commissioned to the extent appropriate for the work carried out. Replacing a motor requires re-commissioning of the motor circuit. Modifying a control panel requires re-commissioning of the control system. Even replacing a protective device requires verification that the replacement is correctly rated and functions properly. The principle is the same: verify before you return to service.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Phases</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Planning</td>
                      <td className="border border-white/10 px-3 py-2">Define scope, sequence, responsibilities, acceptance criteria, safety requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Pre-commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection, torque checks, IR testing, continuity testing, earth loop impedance calculation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Energisation</td>
                      <td className="border border-white/10 px-3 py-2">Staged power-up from source outwards, voltage checks at each stage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Functional testing</td>
                      <td className="border border-white/10 px-3 py-2">Protective device operation, control sequences, interlocks, safety systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Performance/soak</td>
                      <td className="border border-white/10 px-3 py-2">Load testing, thermal survey, extended run, performance verification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Handover</td>
                      <td className="border border-white/10 px-3 py-2">Documentation, training, snag resolution, formal acceptance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Cost of Inadequate Commissioning</p>
              <p className="text-sm text-white">
                Inadequate commissioning is one of the leading causes of early-life equipment failure. Issues that should have been detected during commissioning — incorrect connections, wrong protective device settings, misaligned drives, incorrect control parameters — instead manifest as operational failures, sometimes with dangerous consequences. The time and cost of proper commissioning is always less than the time, cost, and risk of dealing with commissioning failures after the system is in service.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Commissioning Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pre-commissioning checks are carried out while the system is de-energised and safe to work on. Their purpose is to verify that the installation is ready for energisation — that all connections are correct and secure, that protective devices are correctly rated and set, that the installation is clean and free from debris, and that all mechanical and electrical checks specified in the commissioning programme have been satisfactorily completed. Only when all pre-commissioning checks have been completed and documented should the energisation phase begin.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection</h3>
                <p className="text-sm text-white">
                  A thorough visual inspection checks for: correct cable terminations and conductor identification (colours and marking), absence of visible damage to cables, equipment, and enclosures, correct routing of cables with appropriate support and separation, correct IP ratings for the environment, presence and condition of all covers, barriers, and enclosures, removal of all installation debris (cable ties, wire offcuts, packaging materials), correct labelling of all equipment, circuits, and warning notices, and accessibility of all isolation and switching devices.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Checks</h3>
                <p className="text-sm text-white mb-2">
                  Mechanical checks include:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Torque verification on all bolted connections (busbars, cable lugs, earth bars) using a calibrated torque wrench to manufacturer's specification</li>
                  <li className="pl-1">Verification that all switchgear operating mechanisms move freely and smoothly</li>
                  <li className="pl-1">Checking that all racking mechanisms, draw-out mechanisms, and shutters operate correctly</li>
                  <li className="pl-1">Verification that all interlocks engage and disengage correctly</li>
                  <li className="pl-1">Checking motor shaft rotation freedom (where possible) before energisation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Tests (De-Energised)</h3>
                <p className="text-sm text-white">
                  Complete all BS 7671 initial verification tests before energisation: continuity of protective conductors (R1+R2), insulation resistance between all conductors, polarity verification, and calculation of expected earth fault loop impedance from Ze and R1+R2. For three-phase systems, verify correct phase identification at all termination points. For systems with protection relays, verify relay settings against the protection study before energisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energisation Sequence and Live Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energisation is the most critical phase of commissioning from a safety perspective. It is the point at which the installation transitions from a de-energised state (where it is safe to touch any conductor) to an energised state (where contact with live parts can cause injury or death). The energisation sequence must be carefully planned, controlled, and documented, with clear communication between all team members.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Staged Energisation Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1 — Supply energisation:</strong> Close the main incoming switch or circuit breaker. Verify correct supply voltage (phase-to-phase and phase-to-neutral) and correct phase rotation at the main switchboard. Do not proceed if voltages are incorrect or unexpected.</li>
                <li className="pl-1"><strong>Stage 2 — Main distribution:</strong> Close each main distribution feeder in turn. At each distribution board, verify correct voltage before proceeding. Check for any abnormal indications (smoke, unusual noise, burning smell).</li>
                <li className="pl-1"><strong>Stage 3 — Sub-distribution:</strong> Energise sub-distribution boards one at a time. Verify voltages and correct operation of indicator lamps and metering at each level.</li>
                <li className="pl-1"><strong>Stage 4 — Final circuits:</strong> Close each final circuit individually. Verify correct operation at the load end. For motor circuits, bump-test motors briefly (momentary start) to confirm correct rotation before full starting.</li>
                <li className="pl-1"><strong>Stage 5 — Live tests:</strong> Conduct earth fault loop impedance (Zs) measurements, RCD testing, and functional testing of protective devices now that the installation is energised.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Rotation Verification</h3>
              <p className="text-sm text-white">
                For three-phase installations, phase rotation must be verified at the incoming supply and at every distribution point downstream. Use a phase rotation meter (phase sequence indicator) to confirm that the rotation matches the design (typically L1-L2-L3, clockwise). Incorrect phase rotation at any point must be corrected before energising any three-phase equipment downstream. Common causes of incorrect rotation include crossed phases at a terminal, incorrect cable allocation during installation, or a change in supply phase sequence by the DNO.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Safety During Energisation</p>
              <p className="text-sm text-white">
                During energisation, all persons must be aware that the system is transitioning from de-energised to live. Use a formal energisation permit or procedure, ensure all team members are briefed, keep all covers and barriers closed (test through designated test points where possible), use GS 38 compliant test equipment, and be prepared to de-energise immediately if any abnormality is detected. Have fire extinguishers readily available in case of an electrical fire during first energisation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Performance Testing and Soak Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once the installation is energised and the functional tests have confirmed correct operation, the next phase is performance testing — verifying that the system meets its design performance specification under realistic load conditions. This includes load testing (applying the design load and verifying that voltages, currents, and temperatures are within specification), soak testing (running the system under load for an extended period to identify intermittent or time-dependent faults), and thermal verification (using infrared thermography to check for hot spots).
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Load Testing</h3>
                <p className="text-sm text-white">
                  Load testing verifies that the system can deliver its design performance under the expected operating conditions. For a distribution system, this means checking voltage levels at the furthest points under load, verifying that voltage drops are within the limits specified by BS 7671 (typically 5% for lighting, 5% for other uses, from the origin to the load), and confirming that no cables, connections, or equipment are overheating. For motor circuits, load testing verifies starting current, running current, speed, and vibration under load.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Soak Testing</h3>
                <p className="text-sm text-white">
                  A soak test operates the system under normal load conditions for an extended period — typically 24 to 72 hours, though the duration depends on the system type and the client's requirements. During the soak period, the system is monitored for: temperature stability (all components should reach a steady-state temperature within design limits), intermittent faults (nuisance tripping, flickering, dropouts), abnormal noise or vibration (developing bearing failures, loose fixings), and performance consistency (output remaining within specification throughout).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Survey</h3>
                <p className="text-sm text-white">
                  An infrared thermal survey conducted during the soak test (or as soon as the system has reached thermal equilibrium under load) provides a visual map of temperature distribution across all connections, conductors, and equipment. Hot spots identified at this stage — typically caused by high-resistance connections, undersized conductors, or unbalanced loads — can be rectified before they develop into failures. The thermal images also serve as a baseline for future comparative surveys during preventive maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handover and Ongoing Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover phase formally transfers the commissioned system from the commissioning team (or the maintenance team, in the case of re-commissioning after a repair) to the client or operator. This is a critical transition point — from this moment, the receiving party takes responsibility for the safe operation and maintenance of the system. The quality of the handover directly affects the quality of ongoing maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Pack</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning records:</strong> All checklists, test results, and verification records from the commissioning process</li>
                <li className="pl-1"><strong>BS 7671 certificates:</strong> EIC with Schedules of Inspection and Test Results</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Updated to reflect the actual installation, including any variations from the design</li>
                <li className="pl-1"><strong>Equipment settings:</strong> Recorded parameters for all configurable equipment (drives, relays, BMS controllers)</li>
                <li className="pl-1"><strong>O&M manuals:</strong> Manufacturer's operation and maintenance documentation for all installed equipment</li>
                <li className="pl-1"><strong>Warranty documentation:</strong> Product warranties, extended warranty details, and warranty conditions</li>
                <li className="pl-1"><strong>Snag list:</strong> Status of all items identified during commissioning, with evidence of resolution</li>
                <li className="pl-1"><strong>Recommended maintenance schedule:</strong> Based on manufacturer's recommendations and commissioning findings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Records as Maintenance Baseline</h3>
              <p className="text-sm text-white">
                The commissioning records serve a vital function in ongoing maintenance: they establish the baseline against which all future measurements are compared. The insulation resistance, earth fault loop impedance, RCD trip times, motor currents, and temperature profiles recorded during commissioning represent the "as new" condition of the installation. Any deterioration detected during subsequent maintenance inspections is measured against this baseline, enabling accurate assessment of the rate of deterioration and informed decisions about intervention timing.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in commissioning procedures, handover processes, and the establishment of maintenance baselines. Demonstrating that you understand how commissioning links to ongoing maintenance — that the records created today enable the condition-based maintenance of tomorrow — is a key differentiator in the end-point assessment.
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
                <p className="font-medium text-white mb-1">Commissioning Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Plan — scope, sequence, criteria, safety</li>
                  <li>2. Pre-commission — visual, mechanical, electrical (dead)</li>
                  <li>3. Energise — staged, source outwards, verify at each stage</li>
                  <li>4. Functional test — protective devices, controls, safety</li>
                  <li>5. Performance/soak — load test, thermal survey, extended run</li>
                  <li>6. Handover — documentation, training, formal acceptance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Commissioning Documentation</p>
                <ul className="space-y-0.5">
                  <li>Pre-commissioning checklists (signed off)</li>
                  <li>BS 7671 certificates (EIC + schedules)</li>
                  <li>Equipment settings and configurations</li>
                  <li>Thermal survey images and report</li>
                  <li>Soak test records and observations</li>
                  <li>Snag list with resolution evidence</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Test Documentation and Certification
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_6;