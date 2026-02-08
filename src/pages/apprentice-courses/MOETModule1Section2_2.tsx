import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Use of Tools and Test Equipment - MOET Module 1.2.2";
const DESCRIPTION = "Complete guide to safe use of electrical tools and test equipment: GS38 requirements, proving units, insulated tools, multimeters, insulation testers, calibration, PAT testing and pre-use inspection for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "gs38-probes",
    question: "Under GS38, what is the maximum exposed metal tip length permitted on a test probe for use on low voltage systems?",
    options: [
      "2 mm",
      "4 mm",
      "10 mm",
      "20 mm"
    ],
    correctIndex: 1,
    explanation: "GS38 specifies that test probes must have a maximum of 4 mm exposed metal tip (or 2 mm for some applications), with the remainder insulated to prevent accidental contact with adjacent live parts. The short tip length reduces the risk of bridging between terminals or creating a short circuit during testing."
  },
  {
    id: "proving-unit-purpose",
    question: "What is the purpose of a proving unit in electrical testing?",
    options: [
      "To calibrate the test instrument annually",
      "To provide a known voltage source to verify the voltage indicator is working correctly before and after testing",
      "To measure earth fault loop impedance",
      "To check the battery level of the multimeter"
    ],
    correctIndex: 1,
    explanation: "A proving unit provides a known voltage source (typically 50 V or 230 V) to verify that the voltage indicator is functioning correctly. GS38 requires that you prove your voltage indicator on a known live source BEFORE testing for dead and AGAIN AFTER testing. This three-stage process (prove-test-prove) confirms the instrument was working at the time of the test."
  },
  {
    id: "insulated-tools",
    question: "What standard must VDE-rated insulated hand tools comply with for electrical work up to 1000 V AC?",
    options: [
      "BS EN 60900",
      "BS 7671",
      "BS EN 61010",
      "BS EN 60529"
    ],
    correctIndex: 0,
    explanation: "VDE-rated insulated hand tools must comply with BS EN 60900 (IEC 60900), which specifies requirements for hand-operated insulated tools for work on or near live parts at voltages up to 1000 V AC or 1500 V DC. Tools meeting this standard are individually tested to 10,000 V AC and rated for continuous use at 1000 V AC."
  },
  {
    id: "pat-testing",
    question: "What does a PAT test typically include for a Class I portable power tool?",
    options: [
      "Visual inspection only",
      "Visual inspection, earth continuity, insulation resistance and functional test",
      "Voltage measurement and current draw test only",
      "A calibration check at an approved laboratory"
    ],
    correctIndex: 1,
    explanation: "A PAT test for a Class I power tool includes a visual inspection (checking the plug, flex, casing and strain relief), an earth continuity test (verifying the CPC is intact), an insulation resistance test (checking insulation integrity), and a functional test (operating the tool to confirm safe operation). The specific tests vary by equipment class and type."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The GS38 'prove-test-prove' procedure for safe isolation requires:",
    options: [
      "Prove the circuit is dead, test with a multimeter, prove with a second instrument",
      "Prove the voltage indicator on a known live source, test the circuit for dead, prove the voltage indicator again on the known live source",
      "Prove the fuse is removed, test the MCB is off, prove the isolator is locked",
      "Prove the RCD trips, test the circuit, prove the RCD resets"
    ],
    correctAnswer: 1,
    explanation: "The GS38 three-stage procedure is: (1) Prove the voltage indicator works on a known live source or proving unit, (2) Test the circuit to confirm it is dead, (3) Prove the voltage indicator again on the known live source. This confirms the instrument was functioning correctly throughout the test — not that it failed between step 1 and the test."
  },
  {
    id: 2,
    question: "GS38 requires that test leads should incorporate:",
    options: [
      "Bare metal clips for maximum contact area",
      "Fused test leads with a fuse rating not exceeding 500 mA, and finger guards",
      "Standard banana plugs and crocodile clips",
      "Spring-loaded retractable leads"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires test leads to incorporate fuses (not exceeding 500 mA for voltage indication) to protect against fault currents, finger guards on the probes to prevent accidental contact with live parts, a maximum 4 mm exposed tip, and leads of adequate current rating with good insulation. Standard unfused test leads do not comply with GS38."
  },
  {
    id: 3,
    question: "A two-pole voltage indicator (such as a Fluke T150) is preferred over a single-pole indicator (neon screwdriver) because:",
    options: [
      "It is cheaper to purchase",
      "It provides a definitive indication by testing between two points — line-to-neutral, line-to-earth and neutral-to-earth",
      "It can measure current as well as voltage",
      "It does not require batteries"
    ],
    correctAnswer: 1,
    explanation: "A two-pole voltage indicator tests the potential difference between two points, providing a definitive indication of the presence or absence of voltage. A single-pole indicator (neon screwdriver) relies on the user's body capacitance to complete the circuit, can give false readings, and is not recommended by GS38 as the sole means of testing for dead."
  },
  {
    id: 4,
    question: "Insulation resistance testers (meggers) typically test at voltages of:",
    options: [
      "12 V DC and 50 V DC",
      "230 V AC and 400 V AC",
      "250 V DC, 500 V DC or 1000 V DC depending on the circuit being tested",
      "50 V AC only"
    ],
    correctAnswer: 2,
    explanation: "Insulation resistance testers apply a DC test voltage: 250 V DC for SELV/PELV circuits, 500 V DC for circuits up to 500 V (including standard 230 V and 400 V installations), and 1000 V DC for circuits between 500 V and 1000 V. The test voltage must match the circuit voltage rating per BS 7671 Table 6.1."
  },
  {
    id: 5,
    question: "A clamp meter measures current by:",
    options: [
      "Breaking the circuit and inserting the meter in series",
      "Measuring the magnetic field around a conductor using a current transformer jaw",
      "Measuring the voltage drop across a known resistance",
      "Using a direct electrical connection to the conductor"
    ],
    correctAnswer: 1,
    explanation: "A clamp meter uses a split-core current transformer jaw that clamps around a single conductor. The alternating current in the conductor induces a proportional current in the transformer, which the meter measures. This allows non-contact current measurement without breaking the circuit — essential for live measurements on energised systems."
  },
  {
    id: 6,
    question: "An earth fault loop impedance tester measures:",
    options: [
      "The resistance of the earth electrode only",
      "The total impedance of the earth fault current loop from the point of test back to the source",
      "The voltage at the earth terminal",
      "The resistance of the main protective bonding conductors"
    ],
    correctAnswer: 1,
    explanation: "An earth fault loop impedance tester measures the total impedance of the complete fault current path (Zs): the source impedance, the line conductor impedance, the protective conductor impedance, and the earth return path. This measurement confirms that sufficient fault current will flow to operate the protective device within the required disconnection time specified in BS 7671."
  },
  {
    id: 7,
    question: "Before using a power tool on site, a pre-use inspection should check:",
    options: [
      "Only that the tool switches on",
      "The plug, flex condition, casing integrity, guards in place, PAT label in date, and correct voltage/supply",
      "The serial number matches the asset register",
      "The manufacturer's warranty is still valid"
    ],
    correctAnswer: 1,
    explanation: "A pre-use inspection is a visual and functional check carried out by the user before each use. It should cover the plug (no damage, correct fuse, cord grip secure), flex (no cuts, fraying or repairs), casing (no cracks or damage), guards and safety devices (in place and functioning), PAT test label (in date), and confirmation the tool is suitable for the supply voltage and environment."
  },
  {
    id: 8,
    question: "VDE 1000 V rated insulated tools are individually tested at what voltage during manufacture?",
    options: [
      "1,000 V AC",
      "2,500 V AC",
      "5,000 V AC",
      "10,000 V AC"
    ],
    correctAnswer: 3,
    explanation: "VDE-rated insulated tools complying with BS EN 60900 are individually tested at 10,000 V AC during manufacture (10 times the rated working voltage). This provides a substantial safety margin. The tools are then marked with the '1000 V' rating and the distinctive red/yellow insulation colour coding that identifies them as electrically rated."
  },
  {
    id: 9,
    question: "Calibration of electrical test instruments should be carried out:",
    options: [
      "Only when the instrument gives obviously incorrect readings",
      "At intervals specified by the manufacturer or company policy, typically annually, by a UKAS-accredited laboratory",
      "Every five years as specified by BS 7671",
      "Only before major commissioning projects"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must be calibrated at regular intervals — typically annually — by a laboratory traceable to national standards (ideally UKAS-accredited). Calibration certificates should be retained as evidence. An out-of-calibration instrument may give inaccurate readings, potentially leading to unsafe conclusions about circuit safety or non-compliance with BS 7671 requirements."
  },
  {
    id: 10,
    question: "When using a multimeter to check for voltage on a circuit believed to be dead, the meter should be set to:",
    options: [
      "The lowest AC voltage range for maximum sensitivity",
      "The highest AC voltage range first, then reduced — or use auto-ranging mode",
      "The DC voltage range",
      "The resistance range to check continuity"
    ],
    correctAnswer: 1,
    explanation: "When checking for voltage, always start on the highest voltage range (or use auto-ranging mode) to prevent damage to the meter from an unexpectedly high voltage. If the meter is set to a low range and encounters 400 V, the meter could be damaged or destroyed. Auto-ranging meters eliminate this risk but always confirm the meter is set to voltage mode, not current or resistance."
  },
  {
    id: 11,
    question: "A 110 V centre-tapped supply (CTE) used on construction sites provides a maximum shock voltage of:",
    options: [
      "110 V",
      "55 V",
      "230 V",
      "25 V"
    ],
    correctAnswer: 1,
    explanation: "A 110 V centre-tapped earth (CTE) transformer provides a maximum voltage to earth of 55 V (half of 110 V), because the centre tap of the secondary winding is earthed. This means that a single fault to earth will only expose the user to 55 V — significantly reducing the shock risk compared to a 230 V supply. This is why 110 V CTE is the standard for portable tools on UK construction sites."
  },
  {
    id: 12,
    question: "Test instruments used for electrical installation work must comply with:",
    options: [
      "BS 7671 only",
      "BS EN 61010 (safety) and relevant measurement standards such as BS EN 61557",
      "Any EU consumer product standard",
      "The manufacturer's specification only"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must comply with BS EN 61010 (safety requirements for electrical measurement equipment) and the relevant functional standard — typically BS EN 61557 series for installation testing instruments (covering insulation resistance, loop impedance, RCD testing, etc.). GS38 also specifies additional safety requirements for voltage indicators and test leads used on LV systems."
  }
];

const faqs = [
  {
    question: "Can I use a neon screwdriver to prove a circuit is dead?",
    answer: "No. GS38 does not recommend single-pole voltage indicators (neon screwdrivers) as the sole means of testing for dead. They rely on body capacitance, can give false readings (both false positive and false negative), and do not test between two defined points. Always use a two-pole voltage indicator (such as a Fluke T150 or equivalent) that has been proved on a known live source before and after testing."
  },
  {
    question: "How often should I have my test instruments calibrated?",
    answer: "Most manufacturers and industry guidance recommend annual calibration by a UKAS-accredited laboratory. However, your company policy may specify different intervals depending on usage frequency and the criticality of the measurements. Instruments that are dropped, damaged or give suspect readings should be recalibrated immediately regardless of the normal schedule."
  },
  {
    question: "What is the difference between a Class I and Class II power tool?",
    answer: "A Class I tool has a metal casing and relies on earthing (via the CPC in the supply flex) as the primary means of shock protection — if a fault develops, the CPC provides a path for fault current to operate the protective device. A Class II (double-insulated) tool has two layers of insulation and does not require an earth connection — it is identified by the 'double square' symbol. Class II tools are generally preferred for portable use because they do not depend on the integrity of the earth connection."
  },
  {
    question: "Do I need to carry a proving unit at all times?",
    answer: "Yes, whenever you are carrying out safe isolation procedures. GS38 requires that you prove your voltage indicator on a known live source before and after testing. A proving unit provides this known source in a safe, controlled manner. Some electricians use a known live socket or supply as the proving source, but a dedicated proving unit is the safest and most reliable method, particularly in unfamiliar installations."
  },
  {
    question: "What should I do if I find a damaged tool on site?",
    answer: "Remove the tool from service immediately by disconnecting it and attaching a clear label stating 'DO NOT USE — DEFECTIVE'. Report the defect to your supervisor or the person responsible for tool management. Do not attempt to repair electrical tools unless you are competent to do so. The tool should not be returned to service until it has been properly repaired by a competent person and retested (including PAT testing for electrical tools)."
  }
];

const MOETModule1Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 1.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Use of Tools and Test Equipment
          </h1>
          <p className="text-white/80">
            Selection, inspection, use and maintenance of electrical tools and instruments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>GS38:</strong> Prove-test-prove procedure; fused leads, 4 mm tips</li>
              <li className="pl-1"><strong>Tools:</strong> VDE 1000 V rated, BS EN 60900 compliant</li>
              <li className="pl-1"><strong>Calibration:</strong> Annual by UKAS-accredited laboratory</li>
              <li className="pl-1"><strong>Inspection:</strong> Pre-use visual check every time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Test Instruments</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Voltage indicator:</strong> Two-pole, GS38 compliant</li>
              <li className="pl-1"><strong>Multimeter:</strong> BS EN 61010, CAT III/IV rated</li>
              <li className="pl-1"><strong>Insulation tester:</strong> 250/500/1000 V DC test voltages</li>
              <li className="pl-1"><strong>Loop tester:</strong> Earth fault loop impedance (Zs)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply GS38 requirements for test probes, leads and voltage indicators",
              "Explain the prove-test-prove procedure using a proving unit",
              "Select the correct test instrument for common electrical measurements",
              "Carry out pre-use inspection of power tools and hand tools",
              "Describe calibration requirements and record-keeping for test equipment",
              "Identify common faults and safety hazards with electrical tools"
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

        {/* Section 01: GS38 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            GS38 — Test Probes, Leads and Voltage Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HSE Guidance Note GS38 (Fourth Edition) provides essential safety guidance on the selection
              and use of electrical test equipment for work on low voltage systems. It is not a legal
              requirement in itself, but following GS38 is considered best practice and is the standard
              expected by the HSE, professional bodies and BS 7671. Failure to follow GS38 has been cited
              as a contributing factor in numerous fatal electrical incidents.
            </p>
            <p>
              The guidance applies to all test equipment used for determining whether electrical systems are
              safe to work on — most critically, voltage indicators used for the 'proving dead' stage of
              safe isolation. The core principle is the three-stage 'prove-test-prove' procedure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Prove-Test-Prove Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — Prove:</strong> Test the voltage indicator on a known live source (proving unit or known live supply) to confirm it is working correctly and indicating voltage</li>
                <li className="pl-1"><strong>Step 2 — Test:</strong> Use the proven voltage indicator to test the isolated circuit between all conductors: L-N, L-E, N-E (single phase) or L1-L2, L2-L3, L3-L1, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E (three phase)</li>
                <li className="pl-1"><strong>Step 3 — Re-prove:</strong> Test the voltage indicator again on the same known live source to confirm it is still working correctly after the dead test</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why Re-Proving Is Critical</p>
              <p className="text-sm text-white">
                The re-proving step confirms that the voltage indicator did not fail between the initial
                proving and the dead test. If the instrument failed during testing, it could show 'no voltage'
                on a live circuit — giving a false sense of safety. A failed instrument that is not re-proved
                has been the direct cause of fatal electrocutions where electricians began work on what they
                believed to be a dead circuit.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Requirements for Test Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GS38 Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test probes</td>
                      <td className="border border-white/10 px-3 py-2">Maximum 4 mm exposed metal tip; finger guards; insulated shaft</td>
                      <td className="border border-white/10 px-3 py-2">Prevents accidental bridging between terminals and finger contact with live parts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test leads</td>
                      <td className="border border-white/10 px-3 py-2">Fused (not exceeding 500 mA); adequate insulation; coloured for identification</td>
                      <td className="border border-white/10 px-3 py-2">Fuses protect against fault current if probe slips; insulation prevents tracking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage indicator</td>
                      <td className="border border-white/10 px-3 py-2">Two-pole preferred; clear indication; suitable voltage range; robust construction</td>
                      <td className="border border-white/10 px-3 py-2">Definitive voltage reading between two points; not dependent on body capacitance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Proving unit</td>
                      <td className="border border-white/10 px-3 py-2">Provides a known voltage to verify voltage indicator function</td>
                      <td className="border border-white/10 px-3 py-2">Enables prove-test-prove without needing access to a known live supply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Voltage Indicator</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Two-pole indicator (recommended):</strong> Tests between two points (e.g., Fluke T150, Martindale VI-13700). Provides definitive voltage readings. GS38 preferred type</li>
                <li className="pl-1"><strong>Single-pole indicator (neon screwdriver):</strong> Relies on body capacitance. Can give false readings. NOT recommended as sole means of testing dead by GS38</li>
                <li className="pl-1"><strong>Non-contact voltage detector (proximity pen):</strong> Detects the electric field around a conductor without contact. Useful as a preliminary check but NOT reliable for confirming dead — must not be used as the sole means of testing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always carry your own GS38-compliant test leads and proving unit.
              Never rely on borrowed or unfamiliar equipment. Inspect your test leads before every use —
              check for damaged insulation, bent tips, and signs of arcing or overheating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Test Instruments */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Electrical Test Instrument
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance technicians use a range of test instruments to verify safety, diagnose
              faults and confirm compliance with BS 7671. Each instrument has specific capabilities,
              limitations and safety considerations. Selecting the wrong instrument or using it incorrectly
              can lead to inaccurate readings, equipment damage or personal injury.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Electrical Test Instruments</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multimeter</td>
                      <td className="border border-white/10 px-3 py-2">Voltage, current, resistance, continuity</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61010</td>
                      <td className="border border-white/10 px-3 py-2">CAT III/IV rating for distribution work; fused inputs; auto-ranging preferred</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                      <td className="border border-white/10 px-3 py-2">Non-contact current measurement</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61010</td>
                      <td className="border border-white/10 px-3 py-2">Must clamp around a single conductor only; jaw must close fully</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance tester</td>
                      <td className="border border-white/10 px-3 py-2">Measures insulation resistance (MΩ)</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61557-2</td>
                      <td className="border border-white/10 px-3 py-2">Circuit MUST be dead and disconnected; high test voltage (250-1000 V DC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop impedance tester</td>
                      <td className="border border-white/10 px-3 py-2">Measures Zs (earth fault loop)</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61557-3</td>
                      <td className="border border-white/10 px-3 py-2">Tests on energised circuit; trip hazard on RCD-protected circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD tester</td>
                      <td className="border border-white/10 px-3 py-2">Verifies RCD trip time and current</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61557-6</td>
                      <td className="border border-white/10 px-3 py-2">Tests on energised circuit; will cause RCD to trip — warn occupants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity tester</td>
                      <td className="border border-white/10 px-3 py-2">Low-resistance measurement (R1+R2, R2)</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61557-4</td>
                      <td className="border border-white/10 px-3 py-2">Circuit MUST be dead; null leads before testing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Category (CAT) Ratings</p>
              <p className="text-sm text-white mb-3">
                BS EN 61010 defines measurement categories based on the location in the electrical installation
                and the level of transient overvoltage expected. Using a meter with an insufficient CAT rating
                can result in the meter exploding under fault conditions.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CAT I:</strong> Protected electronic circuits — low-energy secondary circuits</li>
                <li className="pl-1"><strong>CAT II:</strong> Single-phase socket outlets and portable equipment — appliance level</li>
                <li className="pl-1"><strong>CAT III:</strong> Distribution level — sub-distribution boards, busbar trunking, fixed wiring</li>
                <li className="pl-1"><strong>CAT IV:</strong> Origin of installation — main intake, service heads, meters</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Faults with Test Instruments</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flat batteries:</strong> Can cause inaccurate readings, particularly on digital meters which may display incorrect values rather than a clear 'low battery' warning</li>
                <li className="pl-1"><strong>Damaged test leads:</strong> Broken conductors inside apparently intact insulation — the lead appears fine but has high resistance or an open circuit</li>
                <li className="pl-1"><strong>Wrong function selected:</strong> Measuring voltage with the meter on current (ampere) range can blow the internal fuse or damage the meter</li>
                <li className="pl-1"><strong>Out of calibration:</strong> Readings drift over time — an uncalibrated meter may pass a circuit that should fail, or fail one that complies</li>
                <li className="pl-1"><strong>Incorrect CAT rating:</strong> A CAT II meter used at a distribution board (CAT III environment) may not withstand transient overvoltages</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A multifunction installation tester (MFT) combines many of these instruments
              into one device — continuity, insulation resistance, loop impedance and RCD testing. However, a
              separate two-pole voltage indicator is still required for safe isolation proving, as the MFT is
              not designed for this purpose.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Insulated Hand Tools */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulated Hand Tools and Power Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulated hand tools are a critical line of defence against electric shock when working on or
              near live or recently de-energised electrical equipment. VDE-rated tools provide a controlled,
              tested insulation barrier between the user and the electrical system. Power tools used on
              electrical installations must be suitable for the working environment and regularly inspected.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VDE 1000 V Insulated Tools (BS EN 60900)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard:</strong> BS EN 60900 (IEC 60900) — hand-operated insulated tools for live working up to 1000 V AC / 1500 V DC</li>
                <li className="pl-1"><strong>Testing:</strong> Each tool individually tested at 10,000 V AC during manufacture</li>
                <li className="pl-1"><strong>Identification:</strong> Distinctive red/yellow two-tone insulation, '1000 V' marking, and the VDE triangle mark</li>
                <li className="pl-1"><strong>Types available:</strong> Screwdrivers, pliers (combination, side-cutting, long-nose), cable cutters, spanners, socket sets, torque wrenches, wire strippers, cable knives</li>
                <li className="pl-1"><strong>Inspection:</strong> Check for cracks, chips, cuts or wear in the insulation before each use. Retire any tool with visible insulation damage</li>
                <li className="pl-1"><strong>Storage:</strong> Store in a clean, dry tool roll or case. Do not throw into a toolbox where they can be damaged by other tools</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Tool Classification</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Class I:</strong> Metal casing, earthed via CPC. Requires intact earth for safety</li>
                  <li className="pl-1"><strong>Class II:</strong> Double-insulated (double square symbol). No earth required</li>
                  <li className="pl-1"><strong>Class III:</strong> Operates on SELV (safety extra-low voltage). Supplied from a safety isolating transformer</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">110 V Construction Site Tools</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Supply:</strong> 110 V centre-tapped earth (CTE) transformer</li>
                  <li className="pl-1"><strong>Max shock voltage:</strong> 55 V to earth (half of 110 V)</li>
                  <li className="pl-1"><strong>Identification:</strong> Yellow casing and yellow 16 A plug (BS EN 60309)</li>
                  <li className="pl-1"><strong>Requirement:</strong> BS 7375 specifies 110 V CTE for all portable tools on UK construction sites</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PAT Testing — Portable Appliance Testing</p>
              <p className="text-sm text-white mb-3">
                PAT testing is a process of routine inspection and testing of electrical equipment to ensure
                it is safe for continued use. While there is no specific legal requirement for PAT testing,
                the EAWR 1989 (Reg 4(2)) requires that equipment is maintained to prevent danger, and
                PAT testing is the established means of demonstrating compliance.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Plug, flex, casing, strain relief, ventilation — carried out at every formal inspection</li>
                <li className="pl-1"><strong>Earth continuity (Class I):</strong> Test between the earth pin of the plug and any accessible metal part — pass: ≤0.1 Ω for power tools</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> Test between live/neutral connected together and earth — pass: ≥1 MΩ</li>
                <li className="pl-1"><strong>Functional test:</strong> Operate the tool and check for correct function, unusual noise, vibration or heat</li>
                <li className="pl-1"><strong>Frequency:</strong> Depends on equipment type and environment — IET Code of Practice recommends risk-based intervals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tool Storage and Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Storage:</strong> Keep tools clean and dry. Store insulated tools in purpose-made rolls or cases to protect insulation</li>
                <li className="pl-1"><strong>Cleaning:</strong> Wipe insulated tools with a damp cloth only — never use solvents which can degrade the insulation</li>
                <li className="pl-1"><strong>Sharpening:</strong> Cable strippers and knives should be kept sharp — blunt tools require more force and increase the risk of slipping</li>
                <li className="pl-1"><strong>Replacement:</strong> Replace any tool with damaged insulation, worn jaws, cracked handles or any other defect that could compromise safety</li>
                <li className="pl-1"><strong>Personal responsibility:</strong> Your tools are your personal safety equipment. Maintain them to the same standard as PPE</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to select and use
              the correct tools and equipment for the task, carry out pre-use inspections, and maintain tools
              in a safe and serviceable condition. This is assessed through practical observation and
              professional discussion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Calibration and Record-Keeping */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calibration, Pre-Use Inspection and Record-Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The accuracy and reliability of electrical test instruments directly affect safety decisions
              and compliance with BS 7671. An instrument that reads incorrectly could lead to a circuit
              being declared safe when it is not, or could produce test results that do not reflect the
              true condition of the installation. Calibration, regular inspection and proper record-keeping
              are therefore essential professional practices.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency:</strong> Typically annually, or as specified by the manufacturer and company policy</li>
                <li className="pl-1"><strong>Standard:</strong> Calibration should be traceable to national standards via a UKAS-accredited laboratory</li>
                <li className="pl-1"><strong>Certificate:</strong> A calibration certificate should be issued detailing the tests performed, results and uncertainties</li>
                <li className="pl-1"><strong>Label:</strong> Instruments should be labelled with the calibration date and next due date</li>
                <li className="pl-1"><strong>Out of tolerance:</strong> If calibration reveals the instrument was out of tolerance, all results obtained since the last valid calibration must be reviewed</li>
                <li className="pl-1"><strong>Interim checks:</strong> Between formal calibrations, regular checks against known references help identify drift</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Use Inspection Checklist — Test Instruments</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Calibration label in date</li>
                <li className="pl-1">Casing undamaged — no cracks, missing parts or ingress of moisture</li>
                <li className="pl-1">Battery level adequate (check indicator or test known reference)</li>
                <li className="pl-1">Test leads undamaged — insulation intact, no exposed conductors, probes not bent</li>
                <li className="pl-1">Fuses in test leads intact (carry spares)</li>
                <li className="pl-1">Probe tips within specification (4 mm max exposed)</li>
                <li className="pl-1">Finger guards present and secure on probes</li>
                <li className="pl-1">Function selection correct for the measurement to be taken</li>
                <li className="pl-1">Zero/null the instrument where applicable (continuity testing)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Record-Keeping and Traceability</p>
              <p className="text-sm text-white">
                BS 7671 requires that test results are recorded on the appropriate certification documents
                (Electrical Installation Certificate, Minor Works Certificate, or Electrical Installation
                Condition Report). The serial number of the test instrument used should be recorded on the
                certificate, providing traceability between the result and the calibrated instrument. If the
                instrument is subsequently found to be out of calibration, all affected certificates can be
                identified and the results verified.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Common Pre-Use Inspection Failures</h3>
              <p className="text-sm text-white mb-3">
                The following defects are frequently found during audits and have contributed to incidents:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Non-compliant test leads:</strong> Using standard (non-GS38) leads with long exposed tips and no finger guards</li>
                <li className="pl-1"><strong>Missing or blown fuses in leads:</strong> Some users replace blown fuses with wire or foil — creating a direct short-circuit hazard</li>
                <li className="pl-1"><strong>Expired calibration:</strong> Instruments used months or years beyond their calibration due date</li>
                <li className="pl-1"><strong>No proving unit carried:</strong> Relying on 'finding a known live socket' rather than carrying a dedicated proving unit</li>
                <li className="pl-1"><strong>Damaged insulation on leads:</strong> Taped-up or heat-shrunk repairs to test leads — leads should be replaced, not repaired</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Your test instruments and leads are safety-critical equipment. Treat
              them with the same respect as PPE — inspect before every use, maintain them properly, keep
              calibration current, and replace them when they are damaged or worn. A professional electrician
              is only as reliable as their instruments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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
                <p className="font-medium text-white mb-1">GS38 Essentials</p>
                <ul className="space-y-0.5">
                  <li>Two-pole voltage indicator preferred</li>
                  <li>Prove-test-prove procedure</li>
                  <li>4 mm max exposed tip on probes</li>
                  <li>Fused leads (≤500 mA)</li>
                  <li>Finger guards on probes</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>GS38 — Electrical test equipment guidance</li>
                  <li>BS EN 60900 — Insulated hand tools</li>
                  <li>BS EN 61010 — Test instrument safety</li>
                  <li>BS EN 61557 — Installation testing instruments</li>
                  <li>ST1426 — Maintenance technician KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dangers of Electricity
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-3">
              Next: PPE
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section2_2;
