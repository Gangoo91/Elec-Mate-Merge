/**
 * Level 3 Module 4 Section 4.2 - Continuity and Insulation Resistance Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity and Insulation Resistance Testing - Level 3 Module 4 Section 4.2";
const DESCRIPTION = "Master the techniques for continuity testing of protective conductors and ring circuits, plus insulation resistance testing procedures per BS 7671:2018.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the minimum test current required for continuity testing of protective conductors per BS 7671?",
    options: [
      "100mA",
      "200mA",
      "500mA",
      "1A"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires a minimum test current of 200mA for continuity testing of protective conductors. This current is sufficient to break down any oxide films on conductor surfaces that might give false high readings, ensuring accurate measurement of the actual conductor resistance."
  },
  {
    id: "check-2",
    question: "What is the minimum acceptable insulation resistance for a 230V circuit according to BS 7671?",
    options: [
      "0.5 megohm",
      "1.0 megohm",
      "2.0 megohms",
      "5.0 megohms"
    ],
    correctIndex: 1,
    explanation: "For circuits operating at nominal voltages up to 500V AC, BS 7671 Table 64.3 specifies a minimum insulation resistance of 1.0 megohm (1 MO). The test voltage used should be 500V DC. Values below this indicate degraded insulation requiring investigation."
  },
  {
    id: "check-3",
    question: "When testing a ring final circuit using the Figure 8 method, what should the reading at each socket be?",
    options: [
      "Zero ohms",
      "Approximately the same value at each socket",
      "Increasing value as you move around the ring",
      "Half the end-to-end reading"
    ],
    correctIndex: 1,
    explanation: "In a correctly wired ring, the Figure 8 cross-connection method should give approximately the same resistance reading at each socket. This value should be approximately half the end-to-end resistance of a single conductor. Significant variations indicate wiring errors or breaks."
  },
  {
    id: "check-4",
    question: "Before carrying out an insulation resistance test, what must be done to protect sensitive equipment?",
    options: [
      "Nothing - the test is safe for all equipment",
      "Disconnect or bypass electronic equipment, dimmer switches, and surge protection devices",
      "Only test at reduced voltage",
      "Test with the circuit energised"
    ],
    correctIndex: 1,
    explanation: "The 500V DC test voltage used for insulation resistance testing can damage sensitive electronic equipment including dimmer switches, PIR sensors, RCDs, surge protection devices (SPDs), and consumer electronic equipment. These must be disconnected or bypassed before testing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "You are testing the continuity of a protective conductor and obtain a reading of 0.35 ohms over a 25-metre run of 2.5mm squared cable. Using the resistance values from BS 7671, is this acceptable?",
    options: [
      "Yes - the reading is within expected parameters",
      "No - the reading is too high, indicating a fault",
      "Yes - any reading confirms continuity",
      "No - protective conductors should read zero"
    ],
    correctAnswer: 0,
    explanation: "2.5mm squared copper conductor has a resistance of approximately 7.41 milliohms per metre at 20 degrees Celsius. For 25m: 25 x 7.41 = 185 milliohms (0.185 ohms). Allowing for temperature correction and lead resistance, 0.35 ohms for a 25m run is within acceptable limits, confirming good continuity."
  },
  {
    id: 2,
    question: "During a ring final circuit test, the end-to-end resistance of Line (L1-L2) measures 0.52 ohms, Neutral (N1-N2) measures 0.53 ohms, but CPC (E1-E2) measures 0.87 ohms. What does this indicate?",
    options: [
      "Normal results for a ring circuit",
      "The CPC is a smaller cross-sectional area than the line and neutral conductors",
      "There is a break in the CPC",
      "The ring is connected as a radial"
    ],
    correctAnswer: 1,
    explanation: "Higher CPC resistance indicates smaller CSA. If L and N are 2.5mm squared and CPC is 1.5mm squared, the CPC resistance would be higher (R = rho x L/A). This is common with twin and earth cables where the CPC is reduced. The important check is that all three conductors form complete rings."
  },
  {
    id: 3,
    question: "An insulation resistance test on a lighting circuit shows 0.8 megohms between line and earth. What action should be taken?",
    options: [
      "Accept the result as adequate for a lighting circuit",
      "Record as a fail - investigate and rectify the cause of low insulation resistance",
      "Repeat the test with equipment connected",
      "Apply a correction factor for cable length"
    ],
    correctAnswer: 1,
    explanation: "0.8 megohms is below the 1.0 megohm minimum required by BS 7671 Table 64.3. This indicates degraded insulation, possible moisture ingress, or contamination. The cause must be investigated and rectified. Never accept a reading below the minimum requirement."
  },
  {
    id: 4,
    question: "What is the purpose of nulling test leads before continuity testing?",
    options: [
      "To calibrate the instrument for the ambient temperature",
      "To zero out the resistance of the test leads so only the conductor under test is measured",
      "To verify the battery condition",
      "To reset the instrument memory"
    ],
    correctAnswer: 1,
    explanation: "Nulling (zeroing) the test leads removes their resistance from measurements. Test leads typically have 0.1-0.5 ohms resistance. Without nulling, this would be added to every reading, giving falsely high results that could mask actual conductor resistance issues."
  },
  {
    id: 5,
    question: "During insulation resistance testing, you measure between Line and Neutral with all loads disconnected. Why is this test performed?",
    options: [
      "To check the neutral conductor continuity",
      "To verify there are no short circuits or insulation breakdown between live conductors",
      "To measure the cable capacitance",
      "To verify correct polarity"
    ],
    correctAnswer: 1,
    explanation: "Testing L-N verifies insulation integrity between live conductors. A low reading would indicate a potential short circuit or insulation breakdown. Combined with L-E and N-E tests, this provides comprehensive verification of insulation condition throughout the circuit."
  },
  {
    id: 6,
    question: "When testing a long cable run, the insulation resistance reading initially shows 50 megohms but gradually decreases to 2 megohms over 60 seconds. What is happening?",
    options: [
      "The instrument battery is failing",
      "Moisture is being absorbed by the insulation",
      "The cable capacitance is charging, which is normal behaviour",
      "There is an intermittent fault"
    ],
    correctAnswer: 2,
    explanation: "Long cables have significant capacitance. Initial high readings occur as the capacitance charges. As charging completes, the true insulation resistance is revealed. Wait for the reading to stabilise (typically 60 seconds for long runs) before recording the final value."
  },
  {
    id: 7,
    question: "What test voltage should be used for insulation resistance testing of a SELV circuit operating at 24V?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "50V DC"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 Table 64.3 specifies test voltages based on circuit nominal voltage. For SELV and PELV circuits (up to 50V), the test voltage is 250V DC with a minimum acceptable insulation resistance of 0.5 megohms. Using higher test voltages could damage low-voltage equipment."
  },
  {
    id: 8,
    question: "During ring circuit testing, socket 5 of 8 shows a significantly higher resistance than the other sockets. What fault does this suggest?",
    options: [
      "The socket is on a spur",
      "There is a break in the ring near socket 5",
      "The socket terminals are corroded",
      "The socket is on a different circuit"
    ],
    correctAnswer: 1,
    explanation: "In a healthy ring with cross-connected conductors, all sockets should show similar resistance. A break in the ring near socket 5 would force current to travel the longer path around the ring to reach that socket, significantly increasing the measured resistance compared to other points."
  },
  {
    id: 9,
    question: "Why must the main bonding conductors be tested for continuity?",
    options: [
      "To verify correct cable colour coding",
      "To confirm they provide a low-resistance path that limits touch voltages in fault conditions",
      "To check they are correctly fused",
      "To measure the earth electrode resistance"
    ],
    correctAnswer: 1,
    explanation: "Main bonding conductors connect extraneous-conductive-parts (gas, water, oil pipes) to the MET. They must provide a low-resistance path so that in a fault condition, touch voltages are limited and fault current can flow. High resistance would compromise safety."
  },
  {
    id: 10,
    question: "What is the typical acceptable resistance range for main bonding conductors?",
    options: [
      "Less than 0.5 ohms from origin to point of connection",
      "Less than 1.0 ohm",
      "Any value that confirms continuity",
      "Must be exactly zero"
    ],
    correctAnswer: 0,
    explanation: "Main bonding conductor resistance should typically be less than 0.5 ohms from the MET to the point of connection on the service. This ensures adequate fault current can flow and touch voltages remain within safe limits. The exact value depends on conductor length and CSA."
  },
  {
    id: 11,
    question: "An insulation resistance test on a socket circuit with all equipment disconnected shows infinity. What should you do?",
    options: [
      "Record the maximum value the instrument can display",
      "Investigate why no current is flowing - there may be an open circuit",
      "Accept this as a pass - infinity means perfect insulation",
      "Recalibrate the instrument"
    ],
    correctAnswer: 2,
    explanation: "An infinity reading indicates the insulation resistance exceeds the instrument's measuring range - typically greater than 200 megohms or 999 megohms depending on the instrument. This is the best possible result, indicating excellent insulation condition. Record as &gt;200 megohms (or instrument maximum)."
  },
  {
    id: 12,
    question: "During continuity testing of supplementary bonding in a bathroom, what connections must be verified?",
    options: [
      "Only the connection between taps and the consumer unit",
      "All exposed and extraneous-conductive-parts must be bonded together",
      "Only metal pipes within zone 1",
      "Only the connection to the RCD"
    ],
    correctAnswer: 1,
    explanation: "Supplementary bonding (where required) must connect all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within the location. This includes metal pipes (hot, cold, waste, heating), metal baths, radiators, and any electrical equipment Class I metalwork."
  }
];

const faqs = [
  {
    question: "Why do we test continuity before insulation resistance?",
    answer: "The BS 7671 test sequence places continuity testing before insulation resistance testing. Continuity tests use low voltage and confirm circuit integrity. If continuity fails, further testing is pointless until the circuit is repaired. Insulation resistance testing with 500V DC could be dangerous or damaging on circuits with unknown conditions."
  },
  {
    question: "What should I do if insulation resistance is borderline (e.g., 1.0-1.2 megohms)?",
    answer: "While technically a pass at 1.0 megohms, borderline readings suggest deteriorating insulation. Investigate the cause - age, moisture, heat damage, or contamination. Consider the installation environment and usage. Document the reading and recommend closer monitoring or investigation. A new installation should typically show much higher values (>100 megohms)."
  },
  {
    question: "Can I test insulation resistance with SPDs installed?",
    answer: "No - SPDs (surge protection devices) contain varistors that conduct at voltages above their clamping voltage. The 500V DC test voltage will either damage the SPD or give false low readings. Always disconnect or bypass SPDs before insulation resistance testing, and remember to reconnect afterwards."
  },
  {
    question: "How do I test a ring circuit that has spurs?",
    answer: "Spurs don't affect the ring circuit test methodology - you're testing the ring conductors themselves. However, spurs should be tested separately for continuity to their origin socket. When testing at spurred sockets, expect higher readings proportional to spur length. Document spur locations for the circuit chart."
  },
  {
    question: "What causes high resistance readings on protective conductors?",
    answer: "Common causes include: loose terminal connections, corroded terminations (especially in damp environments), undersized conductors, long cable runs, and poor crimping or jointing. Also check for aluminium conductors connected to copper terminals without proper anti-oxidant treatment."
  },
  {
    question: "Should I test insulation resistance phase-to-phase on single-phase installations?",
    answer: "Yes - testing L-N is important even in single-phase installations. It verifies no short circuits exist between live conductors. Some installers only test to earth, missing potential L-N faults. The complete test covers L-E, N-E, and L-N, with all tests meeting the minimum 1.0 megohm requirement."
  }
];

const Level3Module4Section4_2 = () => {
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
            <Link to="/study-centre/apprentice/level3-module4-section4">
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
            <span>Module 4.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuity and Insulation Resistance Testing
          </h1>
          <p className="text-white/80">
            Essential dead tests for verifying circuit integrity and insulation condition
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Continuity:</strong> 200mA minimum test current</li>
              <li><strong>Insulation:</strong> 500V DC test, min 1.0 megohm result</li>
              <li><strong>Ring test:</strong> Figure 8 cross-connection method</li>
              <li><strong>Sequence:</strong> Continuity first, then insulation resistance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High R1+R2 = poor connections</li>
              <li><strong>Spot:</strong> Low IR = damaged insulation</li>
              <li><strong>Use:</strong> Null leads before testing</li>
              <li><strong>Use:</strong> Disconnect electronics before IR test</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Perform continuity testing of protective conductors to BS 7671 requirements",
              "Execute the three-step ring final circuit test procedure correctly",
              "Conduct insulation resistance tests at correct voltages with proper precautions",
              "Interpret test results and identify common fault conditions",
              "Apply appropriate correction factors and acceptance criteria",
              "Document test results accurately for certification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Continuity of Protective Conductors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Continuity of Protective Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity testing verifies that protective conductors provide a low-resistance path for fault current. This includes circuit protective conductors (CPCs), main bonding conductors, and supplementary bonding conductors. The test uses a low-resistance ohmmeter delivering at least 200mA - this current breaks down oxide films that could otherwise give misleadingly high readings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protective conductor continuity test procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Isolate the circuit and confirm safe isolation</li>
                <li>2. Null (zero) the test leads by connecting them together</li>
                <li>3. Connect one lead to the consumer unit main earth terminal</li>
                <li>4. Connect the other lead to the CPC at the furthest point of each circuit</li>
                <li>5. Record the resistance reading for each circuit</li>
                <li>6. Compare against expected values based on conductor length and CSA</li>
              </ul>
            </div>

            <p>
              The measured value forms part of the R1+R2 calculation used in earth fault loop impedance verification. Expected resistance depends on conductor cross-sectional area and length. Using BS 7671 Appendix B values: 1.0mm squared copper = 18.1 milliohms per metre; 1.5mm squared = 12.1 milliohms per metre; 2.5mm squared = 7.41 milliohms per metre; 4.0mm squared = 4.61 milliohms per metre at 20 degrees Celsius.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Main bonding conductors should show less than 0.5 ohms from the MET to the point of connection on services. High readings indicate loose connections, corrosion, or undersized conductors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Ring Final Circuit Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ring Final Circuit Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring circuits require a specific three-step test procedure to verify the ring is complete and correctly connected. The Figure 8 (or cross-connection) method is the industry standard, providing comprehensive verification of ring integrity and simultaneous checking of R1+R2 values at each point.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1: End-to-End</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Disconnect ring at consumer unit</li>
                  <li>Measure L1-L2, N1-N2, E1-E2</li>
                  <li>Values should be similar for L and N</li>
                  <li>CPC may be higher (smaller CSA)</li>
                  <li>Records total ring conductor resistance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2: Cross-Connect</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Link L1 to L2 at consumer unit</li>
                  <li>Measure L1-L2 at each socket</li>
                  <li>Reading = half end-to-end value</li>
                  <li>Should be same at every socket</li>
                  <li>Variations indicate faults</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3: Figure 8</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cross-connect L1-N2 and N1-L2</li>
                  <li>Cross-connect E1-E2</li>
                  <li>Measure L-N and L-E at each socket</li>
                  <li>L-E reading = R1+R2 value</li>
                  <li>Record for Zs calculation</li>
                </ul>
              </div>
            </div>

            <p>
              The Figure 8 connection creates two parallel paths to any point on the ring. At the electrical midpoint, the two paths are equal, giving a reading of half the end-to-end resistance. The L-E reading at each socket gives the R1+R2 value directly, which is essential for calculating earth fault loop impedance.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> End-to-end readings: L=0.52 ohms, N=0.53 ohms, E=0.87 ohms. After Figure 8 cross-connection, each socket should read approximately 0.26 ohms (L-N) and 0.70 ohms (L-E/R1+R2). A socket showing 0.45 ohms L-E might indicate it is on a spur rather than in the ring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Insulation Resistance Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies that cable insulation maintains adequate separation between conductors and earth. The test applies a DC voltage (typically 500V for 230V circuits) and measures the resulting leakage current, displaying the result as resistance in megohms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Table 64.3 requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SELV/PELV (up to 50V):</strong> 250V DC test, minimum 0.5 megohms</li>
                <li><strong>Up to 500V (including 230V):</strong> 500V DC test, minimum 1.0 megohm</li>
                <li><strong>Above 500V up to 1000V:</strong> 1000V DC test, minimum 1.0 megohm</li>
              </ul>
            </div>

            <p>
              Before testing, ensure all loads are disconnected, electronic equipment is removed or bypassed, lamps are removed, and all switches are closed (on position). The test checks L-E, N-E, and L-N combinations. All three must meet the minimum requirement.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> New installations should typically achieve values well above the minimum - 100 megohms or higher is common. A reading of exactly 1.0 megohm, while technically a pass, warrants investigation. Deterioration from previous test results is also significant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Protection of Sensitive Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protecting Sensitive Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 500V DC test voltage used in insulation resistance testing can damage or destroy sensitive electronic equipment. Before testing, you must identify and protect all equipment that could be affected. This is not optional - failure to disconnect sensitive equipment can result in expensive damage claims and equipment replacement.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Disconnect</p>
                <p className="text-white/90 text-xs">Dimmer switches, PIR sensors, RCDs, electronic thermostats, SPDs</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Remove/Unplug</p>
                <p className="text-white/90 text-xs">Computers, TVs, audio equipment, smart home devices, LED drivers</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Bypass</p>
                <p className="text-white/90 text-xs">Neon indicators, pilot lamps, equipment that cannot be disconnected</p>
              </div>
            </div>

            <p>
              After testing, remember to reconnect everything that was disconnected. Create a checklist for each installation to ensure nothing is forgotten. Leaving SPDs disconnected, for example, would leave the installation unprotected against surge damage.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a modern domestic installation, you find: consumer unit with integral RCD/SPD combination (bypass SPD, RCD will tolerate test), dimmer switch in lounge (disconnect or remove), underfloor heating thermostat (disconnect), outdoor PIR light (disconnect sensor), smart doorbell (remove), and multiple USB sockets (check manufacturer guidance).
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Continuity Testing Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always null test leads before starting - and re-null if leads are changed</li>
                <li>Use leads with sharp probes to penetrate any oxide layer on terminals</li>
                <li>If readings are higher than expected, clean terminations and retest</li>
                <li>Record cable length and CSA to allow verification of expected resistance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow readings to stabilise on long cable runs - capacitance affects initial reading</li>
                <li>Test when cables are at normal operating temperature if possible</li>
                <li>Damp conditions can significantly reduce readings - note environmental factors</li>
                <li>If readings are borderline, test conductors individually to isolate the problem</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not nulling leads</strong> - Lead resistance adds to every reading</li>
                <li><strong>Testing with SPDs connected</strong> - Destroys SPDs, gives false low readings</li>
                <li><strong>Recording unstabilised readings</strong> - Wait for reading to settle, especially on long runs</li>
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
                <p className="font-medium text-white mb-1">Continuity Values (per metre)</p>
                <ul className="space-y-0.5">
                  <li>1.0mm squared = 18.1 milliohms</li>
                  <li>1.5mm squared = 12.1 milliohms</li>
                  <li>2.5mm squared = 7.41 milliohms</li>
                  <li>4.0mm squared = 4.61 milliohms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Insulation Resistance</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV: 250V, 0.5 megohm min</li>
                  <li>Up to 500V: 500V, 1.0 megohm min</li>
                  <li>500V-1000V: 1000V, 1.0 megohm min</li>
                  <li>New install: typically over 100 megohms</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Visual Inspection Techniques
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section4-3">
              Next: Polarity Checks
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section4_2;
