/**
 * Level 3 Module 5 Section 3.1 - Continuity of Protective Conductors and Ring Circuits
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity of Protective Conductors and Ring Circuits - Level 3 Module 5 Section 3.1";
const DESCRIPTION = "Master continuity testing procedures for protective conductors, main bonding, ring final circuits using the figure-of-eight method according to BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the maximum acceptable resistance for a protective conductor continuity test?",
    options: [
      "There is no maximum - any reading indicates continuity",
      "The value must be consistent with the conductor size and length (R1+R2)",
      "Always less than 1 ohm",
      "Always less than 0.5 ohms"
    ],
    correctIndex: 1,
    explanation: "There is no single maximum value - the measured R1+R2 must be consistent with the conductor material (copper/aluminium), cross-sectional area, and route length. The reading is used to calculate Zs when added to Ze. Unexpected high values indicate a problem."
  },
  {
    id: "check-2",
    question: "In the ring circuit test, what does the 'figure-of-eight' or 'cross-connection' method verify?",
    options: [
      "Only that the ring is complete",
      "The ring is complete AND correctly connected at all points",
      "The insulation resistance of the ring",
      "The prospective fault current"
    ],
    correctIndex: 1,
    explanation: "The figure-of-eight method cross-connects L1 to L2 and E1 to E2, then measures at each socket. If the ring is complete and correctly wired, all readings should be approximately equal (within 0.05 ohms). Variations indicate interconnections, spurs, or wiring errors."
  },
  {
    id: "check-3",
    question: "Before performing continuity tests, why must the installation be isolated?",
    options: [
      "To prevent damage to the test instrument",
      "To prevent electric shock and ensure accurate readings",
      "To reset any tripped devices",
      "It's optional if using an insulated instrument"
    ],
    correctIndex: 1,
    explanation: "Continuity testing uses a low DC voltage (typically 4-24V) from the instrument. If the supply is connected, you risk electric shock and the AC supply will affect readings. Always prove dead before testing and use a proving unit on your voltage indicator."
  },
  {
    id: "check-4",
    question: "What is the purpose of 'nulling' the test leads before continuity testing?",
    options: [
      "To check the battery level",
      "To compensate for lead resistance so it doesn't affect readings",
      "To calibrate the instrument",
      "To verify the leads are not damaged"
    ],
    correctIndex: 1,
    explanation: "Test leads have their own resistance (typically 0.1-0.3 ohms). Nulling subtracts this from subsequent readings. Without nulling, your measurements would include lead resistance, giving incorrectly high R1+R2 values that could affect Zs calculations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what voltage should be used for continuity testing?",
    options: [
      "230V AC",
      "500V DC",
      "Between 4V and 24V DC",
      "50V DC"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 specifies that continuity testing should use a DC voltage between 4V and 24V, with a test current of at least 200mA. This low voltage ensures safety while providing sufficient current for reliable resistance measurement."
  },
  {
    id: 2,
    question: "When testing a ring final circuit using the figure-of-eight method, you get readings of 0.52, 0.51, 0.53, 0.78, and 0.52 ohms at five sockets. What does this indicate?",
    options: [
      "All readings are acceptable",
      "The ring is broken at one point",
      "The fourth socket may be on a spur or have a wiring issue",
      "The test leads need nulling"
    ],
    correctAnswer: 2,
    explanation: "In a correctly wired complete ring, all readings should be approximately equal (within 0.05 ohms typically). The reading of 0.78 ohms at the fourth socket is significantly higher, indicating a possible spur, broken connection, or interconnection at that point."
  },
  {
    id: 3,
    question: "What is the first step in testing continuity of main protective bonding conductors?",
    options: [
      "Connect one lead to the MET and measure to each bonded service",
      "Test between the consumer unit earth bar and each socket outlet",
      "Measure resistance of the earthing conductor",
      "Check the earth electrode resistance"
    ],
    correctAnswer: 0,
    explanation: "Main bonding conductor continuity is tested by connecting one lead to the main earthing terminal (MET) and measuring to each extraneous-conductive-part (gas, water, oil pipes etc.). This confirms the bonding provides a low-resistance path."
  },
  {
    id: 4,
    question: "The continuity reading for a protective conductor on a 2.5mm2 circuit running 25 metres is 0.95 ohms. Is this acceptable?",
    options: [
      "No - it's too high for any circuit",
      "Yes - it's consistent with the conductor size and length",
      "Cannot determine without knowing the cable type",
      "Only acceptable if below 0.5 ohms"
    ],
    correctAnswer: 1,
    explanation: "2.5mm2 copper has resistance of approximately 7.41 m-ohms/m. For 25m: 25 x 0.00741 = 0.185 ohms one way, so 0.37 ohms for the complete loop (R1+R2). However, this assumes the line and CPC are the same size. If CPC is 1.5mm2 (common in twin and earth), the reading would be higher. 0.95 ohms may be acceptable depending on exact configuration."
  },
  {
    id: 5,
    question: "During ring circuit testing, the initial end-to-end reading for the line conductors (L1-L2) is 0.64 ohms. What should the reading at each socket be after cross-connection?",
    options: [
      "0.64 ohms",
      "0.32 ohms",
      "Approximately 0.16 ohms (quarter of end-to-end)",
      "1.28 ohms"
    ],
    correctAnswer: 2,
    explanation: "After cross-connection, the reading at each socket should be approximately one quarter of the end-to-end reading for a symmetrical ring. This is because you're measuring through two parallel paths. 0.64 / 4 = 0.16 ohms. Actual readings may vary slightly based on socket position in the ring."
  },
  {
    id: 6,
    question: "What test current is required for continuity testing according to BS 7671?",
    options: [
      "At least 20mA",
      "At least 200mA",
      "At least 2A",
      "The current doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum test current of 200mA for continuity testing. This ensures that the test current is sufficient to break through any surface oxidation on connections and give a true resistance reading."
  },
  {
    id: 7,
    question: "You are testing a radial circuit and get an R1+R2 reading of 0.45 ohms. The Ze at the installation is 0.35 ohms. What is the calculated Zs?",
    options: [
      "0.10 ohms",
      "0.35 ohms",
      "0.80 ohms",
      "0.45 ohms"
    ],
    correctAnswer: 2,
    explanation: "Zs (earth fault loop impedance) = Ze + (R1+R2). So: 0.35 + 0.45 = 0.80 ohms. This calculated value can be compared with the maximum permitted Zs for the protective device to verify the circuit will disconnect in the required time."
  },
  {
    id: 8,
    question: "When testing supplementary bonding in a bathroom, what is the maximum acceptable resistance between simultaneously accessible exposed and extraneous-conductive-parts?",
    options: [
      "There is no specific maximum",
      "Less than 0.05 ohms",
      "The value that limits touch voltage to 50V based on the protective device",
      "Less than 1 ohm"
    ],
    correctAnswer: 2,
    explanation: "Regulation 415.2 requires that supplementary bonding limits the touch voltage. For circuits protected by 30mA RCD (most bathrooms), the bonding resistance should be low enough that 30mA x R is less than 50V, giving a maximum of approximately 1667 ohms - but lower values are better practice."
  },
  {
    id: 9,
    question: "What would cause a continuity test to show 'OL' (overload/open loop) on the instrument?",
    options: [
      "The resistance is too low",
      "The circuit is complete with low resistance",
      "There is a break in the conductor - open circuit",
      "The test leads are nulled incorrectly"
    ],
    correctAnswer: 2,
    explanation: "'OL' or infinity reading indicates an open circuit - no continuous path exists between the test points. This could be a broken conductor, disconnected terminal, or blown fuse in the circuit being tested."
  },
  {
    id: 10,
    question: "For the long lead method of continuity testing, what is connected together at the distribution board?",
    options: [
      "Line and neutral of each circuit",
      "Line and CPC of each circuit being tested",
      "All CPCs together",
      "Earth bar and neutral bar"
    ],
    correctAnswer: 1,
    explanation: "In the long lead method, the line conductor and CPC of the circuit being tested are connected together at the distribution board. A long test lead connects from the earth bar to the remote point. Testing at each outlet then gives the R1+R2 value directly."
  },
  {
    id: 11,
    question: "Why might you get different R1+R2 readings at different points on the same radial circuit?",
    options: [
      "This should never happen - there's a fault",
      "Normal - the reading increases with distance from the DB",
      "The instrument needs calibration",
      "Temperature variations in the cable"
    ],
    correctAnswer: 1,
    explanation: "On a radial circuit, R1+R2 increases with distance from the distribution board because you're measuring more conductor length. The reading at the first socket will be lower than at the last socket. The furthest point gives the value used for Zs calculation."
  },
  {
    id: 12,
    question: "What is the purpose of testing continuity of the earthing conductor separately from circuit CPCs?",
    options: [
      "It's not necessary - circuit CPC tests cover this",
      "To verify the main earth path from MET to means of earthing",
      "Only required for TT systems",
      "To measure the earth electrode resistance"
    ],
    correctAnswer: 1,
    explanation: "The earthing conductor connects the MET to the means of earthing (earth terminal, electrode, etc.). This critical conductor must be tested separately to confirm the main earth path is intact. Circuit CPC tests only verify continuity back to the MET, not beyond it."
  }
];

const faqs = [
  {
    question: "What is the difference between R1+R2 and Zs?",
    answer: "R1+R2 is the DC resistance of the line conductor (R1) plus the protective conductor (R2) measured with a low-resistance ohmmeter. Zs is the total earth fault loop impedance measured live at AC, which includes Ze (external earth fault loop impedance) plus R1+R2. The relationship is: Zs = Ze + (R1+R2)."
  },
  {
    question: "Why do we multiply R1+R2 by 1.2 when calculating Zs?",
    answer: "Conductor resistance increases with temperature. The factor 1.2 accounts for the conductor operating at its maximum normal temperature (70C for thermoplastic insulation) compared to the ambient temperature at which R1+R2 was measured. This gives a more conservative (higher) Zs value for comparison with maximum permitted values."
  },
  {
    question: "Can I use the long lead method for ring circuit testing?",
    answer: "No - the long lead method doesn't verify ring continuity or detect interconnections. Ring circuits require the figure-of-eight (cross-connection) method which connects L1-L2 and E1-E2 at the board, then tests at each socket. This verifies the ring is complete and correctly wired throughout."
  },
  {
    question: "What if my continuity reading is zero?",
    answer: "A true zero reading is unlikely - even short conductors have some resistance. Check that leads are properly nulled, connections are good, and the instrument is functioning. If testing a protective device, ensure it's closed/on. A very low reading (0.01-0.02 ohms after nulling) is normal for short runs."
  },
  {
    question: "How do I test bonding to plastic pipes?",
    answer: "You cannot bond to plastic pipes - they are not extraneous-conductive-parts. If metal pipework has been replaced with plastic, bonding may no longer be required to that service. Check if any metal sections remain that could introduce a potential. Document the situation on your EICR."
  },
  {
    question: "Should R1+R2 readings match calculated values exactly?",
    answer: "Not exactly - readings within 10-20% of calculated values are typically acceptable. Variations occur due to temperature, connection quality, and cable manufacturing tolerances. Significantly higher readings suggest loose connections, damaged conductors, or incorrect cable sizing. Lower readings might indicate a shorter route than expected."
  }
];

const Level3Module5Section3_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
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
            <span>Module 5.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuity of Protective Conductors and Ring Circuits
          </h1>
          <p className="text-white/80">
            Testing procedures for protective conductors, bonding, and ring final circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test voltage:</strong> 4-24V DC, 200mA minimum</li>
              <li><strong>Null leads:</strong> Always before testing</li>
              <li><strong>R1+R2:</strong> Line + CPC resistance for Zs calc</li>
              <li><strong>Ring test:</strong> Figure-of-eight method</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Acceptance Criteria</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>No maximum:</strong> Must suit conductor size/length</li>
              <li><strong>Ring readings:</strong> Should be within 0.05 ohms</li>
              <li><strong>Main bonding:</strong> Low resistance to MET</li>
              <li><strong>Temperature factor:</strong> x1.2 for Zs calculation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Perform continuity testing on protective conductors",
              "Test ring final circuits using the figure-of-eight method",
              "Verify main and supplementary bonding continuity",
              "Calculate expected R1+R2 values from conductor data",
              "Identify common faults from continuity test results",
              "Record and interpret continuity test readings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Fundamentals of Continuity Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamentals of Continuity Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity testing verifies that protective conductors provide an unbroken, low-resistance path for fault current. This is essential for automatic disconnection of supply (ADS) - the most common protective measure against electric shock. Without adequate continuity, a fault may not cause the protective device to operate, leaving dangerous voltages on exposed metalwork.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Conductors requiring continuity testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuit protective conductors (CPCs) - in every circuit</li>
                <li>Main earthing conductor - from MET to means of earthing</li>
                <li>Main protective bonding conductors - to gas, water, oil, etc.</li>
                <li>Supplementary bonding conductors - in special locations</li>
                <li>Functional earthing conductors - where applicable</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Test Voltage</p>
                <p className="text-white/90 text-xs">4V to 24V DC (BS 7671 requirement)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Test Current</p>
                <p className="text-white/90 text-xs">Minimum 200mA to break through oxidation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Preparation</p>
                <p className="text-white/90 text-xs">Isolate supply, null leads, prove dead</p>
              </div>
            </div>

            <p>
              Modern multifunction testers include a dedicated continuity function. Always null (zero) the test leads before testing - their resistance (typically 0.1-0.3 ohms) would otherwise be added to every reading. Most instruments have an auto-null feature or a manual null button.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Continuity testing is performed with the supply disconnected. This is a 'dead' test. Never attempt continuity testing on a live circuit - it could damage your instrument and create a safety hazard.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Testing Protective Conductor Continuity (R1+R2) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Testing Protective Conductor Continuity (R1+R2)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The R1+R2 test measures the combined resistance of the line conductor (R1) and the circuit protective conductor (R2) for a circuit. This value is added to Ze (external earth fault loop impedance) to calculate Zs, which must be low enough for the protective device to disconnect in the required time.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Long Lead Method</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Isolate supply and prove dead</li>
                  <li>2. Link line and CPC together at DB</li>
                  <li>3. Connect long lead to earth bar</li>
                  <li>4. Test at each outlet (L terminal)</li>
                  <li>5. Reading = R1+R2 directly</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wandering Lead Method</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Isolate supply and prove dead</li>
                  <li>2. One lead to earth bar at DB</li>
                  <li>3. Other lead to remote test point</li>
                  <li>4. Measures CPC continuity only (R2)</li>
                  <li>5. Separate test needed for R1</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical R1+R2 values (copper conductors at 20C):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>2.5mm2/1.5mm2 (10m):</strong> Approximately 0.19 ohms</li>
                <li><strong>2.5mm2/1.5mm2 (20m):</strong> Approximately 0.38 ohms</li>
                <li><strong>4mm2/2.5mm2 (20m):</strong> Approximately 0.24 ohms</li>
                <li><strong>6mm2/2.5mm2 (25m):</strong> Approximately 0.26 ohms</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example calculation:</strong> For 20m of 2.5mm2 line and 1.5mm2 CPC: R1 = 0.00741 x 20 = 0.148 ohms, R2 = 0.0123 x 20 = 0.246 ohms. Total R1+R2 = 0.394 ohms. Measured values within 20% of this are acceptable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Ring Final Circuit Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ring Final Circuit Testing (Figure-of-Eight Method)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits require a specific test method to verify that the ring is complete and correctly connected at every point. The figure-of-eight (cross-connection) method achieves this by creating a test configuration that should produce equal readings at every socket outlet if the ring is correctly wired.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ring circuit test procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Isolate supply and prove dead</li>
                <li><strong>Step 2:</strong> Identify the two ends of the ring at the DB (L1, L2, N1, N2, E1, E2)</li>
                <li><strong>Step 3:</strong> Measure L1 to L2 (end-to-end line conductors) - record value</li>
                <li><strong>Step 4:</strong> Measure E1 to E2 (end-to-end CPCs) - record value</li>
                <li><strong>Step 5:</strong> Cross-connect: L1 to L2, and E1 to E2 at the DB</li>
                <li><strong>Step 6:</strong> Test L to E at each socket outlet - all readings should be approximately equal</li>
                <li><strong>Step 7:</strong> The reading at each socket = approximately (r1 + r2) / 4</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Correct Ring - What to Expect</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All socket readings within 0.05 ohms</li>
                  <li>Reading approximately 25% of end-to-end</li>
                  <li>Consistent readings throughout</li>
                  <li>Reading = R1+R2 for Zs calculation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Faulty Ring - Warning Signs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>One socket reading much higher = possible spur</li>
                  <li>All readings too high = broken ring</li>
                  <li>Progressive increase then decrease = interconnection</li>
                  <li>OL reading = open circuit at that point</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> The figure-of-eight method is the ONLY reliable way to verify ring circuit integrity. The long lead method used for radials cannot detect if a ring is broken or has interconnections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Bonding Conductor Continuity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Bonding Conductor Continuity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main protective bonding connects extraneous-conductive-parts (metalwork that can introduce earth potential) to the main earthing terminal. Supplementary bonding provides additional connections in specific locations like bathrooms. Both require continuity testing to verify the low-resistance connection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main bonding conductor test:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Connect one test lead to the main earthing terminal (MET)</li>
                <li>Touch other lead to each bonded service in turn</li>
                <li>Test to: gas meter inlet, water service entry, oil pipes, structural steel</li>
                <li>Reading should be low (typically less than 0.1 ohms for short runs)</li>
                <li>Record each reading - identifies the bonding point clearly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supplementary bonding test (bathrooms):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test between simultaneously accessible exposed and extraneous parts</li>
                <li>Examples: radiator to towel rail, basin pipes to light fitting</li>
                <li>Maximum resistance depends on protective device</li>
                <li>For 30mA RCD: R less than 50V / 0.03A = 1667 ohms (but lower is better)</li>
                <li>May not be required if all circuits have 30mA RCD protection (Reg 701.415.2)</li>
              </ul>
            </div>

            <p>
              When testing bonding, ensure you're making good contact with clean metal. Paint, corrosion, or plastic coatings can give false high readings. Use crocodile clips or probes that can penetrate surface coatings to reach the metal beneath.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> If incoming services are plastic (common with modern water supplies), main bonding may not be required to that service. Check if any metal remains - partial plastic replacement may still require bonding to remaining metal sections.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before You Start Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate supply at the origin - not just at the circuit breaker</li>
                <li>Prove dead with a voltage indicator (test-check-test)</li>
                <li>Apply lock-off or other secure isolation</li>
                <li>Null test leads - check null is maintained periodically</li>
                <li>Check instrument calibration is current</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Expected R1+R2</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use (mV/A/m) / 1000 to convert to ohms per metre</li>
                <li>1.5mm2 copper = 12.3 m-ohms/m, 2.5mm2 = 7.41, 4mm2 = 4.61</li>
                <li>Multiply by route length in metres</li>
                <li>Add R1 and R2 for total</li>
                <li>Allow 10-20% tolerance on measurements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not nulling leads:</strong> Adds 0.1-0.3 ohms to every reading</li>
                <li><strong>Testing while live:</strong> Dangerous and gives false readings</li>
                <li><strong>Poor probe contact:</strong> High or fluctuating readings</li>
                <li><strong>Wrong test on rings:</strong> Long lead method doesn't verify ring integrity</li>
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
                <p className="font-medium text-white mb-1">Test Requirements (BS 7671)</p>
                <ul className="space-y-0.5">
                  <li>Regulation 612.2 - Continuity of conductors</li>
                  <li>Test voltage: 4V to 24V DC</li>
                  <li>Test current: minimum 200mA</li>
                  <li>Table 6.2 - Test sequence</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Conductor Resistance (20C)</p>
                <ul className="space-y-0.5">
                  <li>1.0mm2 copper: 18.1 m-ohms/m</li>
                  <li>1.5mm2 copper: 12.3 m-ohms/m</li>
                  <li>2.5mm2 copper: 7.41 m-ohms/m</li>
                  <li>4.0mm2 copper: 4.61 m-ohms/m</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section3-3-2">
              Next: Insulation Resistance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section3_1;
