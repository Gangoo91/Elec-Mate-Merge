/**
 * Level 3 Module 2 Section 5.3
 * Impact of Renewables on Earthing & Protection Systems
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Impact of Renewables on Earthing & Protection - Level 3 Module 2 Section 5.3";
const DESCRIPTION = "Understanding how renewable energy systems affect earthing arrangements, protective device selection, and fault current pathways in electrical installations.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why do solar PV systems require specific consideration for earth fault protection on the DC side?",
    options: [
      "DC circuits don't need earth fault protection",
      "DC earth faults may not trigger standard AC RCDs and can sustain arcing",
      "Earth faults only occur on the AC side",
      "Solar panels are fully insulated so faults cannot occur"
    ],
    correctIndex: 1,
    explanation: "DC earth faults behave differently from AC faults. They can sustain arcing without the natural zero-crossing that helps extinguish AC arcs, and standard AC RCDs cannot detect pure DC leakage. Specific DC protection measures are required."
  },
  {
    id: "check-2",
    question: "What is the purpose of an equipotential bonding conductor connected to a solar PV array frame?",
    options: [
      "To increase the array's power output",
      "To provide a path for lightning current only",
      "To maintain all metalwork at the same potential, preventing dangerous touch voltages",
      "To connect the array to the neutral conductor"
    ],
    correctIndex: 2,
    explanation: "Equipotential bonding ensures all exposed metalwork - frames, mounting rails, and associated equipment - remains at the same potential. This prevents dangerous touch voltages if a fault develops, protecting anyone who contacts the equipment."
  },
  {
    id: "check-3",
    question: "How does a TN-C-S earthing system affect the connection of a PV system?",
    options: [
      "PV systems cannot be connected to TN-C-S supplies",
      "No special consideration is needed",
      "The PEN conductor connection point and potential rise during faults must be considered",
      "Only single-phase inverters can be used"
    ],
    correctIndex: 2,
    explanation: "TN-C-S systems share neutral and earth conductors. During network faults, the installation's exposed metalwork can rise to a dangerous potential. PV array metalwork must be bonded appropriately, and the implications of this rise considered."
  },
  {
    id: "check-4",
    question: "Why might a Type B RCD be required for certain inverter installations?",
    options: [
      "Type B is cheaper than other types",
      "Some inverters can produce smooth DC fault currents that Type A RCDs cannot detect",
      "Type B has faster tripping times",
      "Regulations always require Type B for solar"
    ],
    correctIndex: 1,
    explanation: "Transformerless inverters can allow DC fault currents to flow to earth. Type A RCDs detect AC and pulsating DC but not smooth DC. Type B RCDs can detect all forms of DC leakage, providing comprehensive protection."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary concern with earth fault loop impedance when adding generation to an installation?",
    options: [
      "The impedance always increases",
      "Multiple sources can affect fault current magnitude and protection operation",
      "Earth fault loop impedance becomes irrelevant",
      "Only the grid supply impedance matters"
    ],
    correctAnswer: 1,
    explanation: "With local generation, fault current can come from both grid and inverter. While inverters typically limit fault contribution, this affects the total fault current available and can influence whether protective devices operate within required times."
  },
  {
    id: 2,
    question: "What protection is typically provided within a solar PV inverter for DC earth faults?",
    options: [
      "No DC protection is provided",
      "RCD protection on the DC side",
      "Insulation monitoring and residual current monitoring devices",
      "DC MCBs only"
    ],
    correctAnswer: 2,
    explanation: "Modern inverters typically include insulation monitoring devices (IMD) that continuously check DC-side insulation resistance, and residual current monitoring devices (RCMU) that detect DC earth leakage and shut down the inverter if thresholds are exceeded."
  },
  {
    id: 3,
    question: "How does the TT earthing system compare to TN systems for PV installation earthing?",
    options: [
      "TT is always preferred",
      "TT requires an RCD for earth fault protection as loop impedance is typically higher",
      "TT cannot be used with PV",
      "TT and TN are identical in requirements"
    ],
    correctAnswer: 1,
    explanation: "TT systems rely on a local earth electrode with typically higher loop impedance than TN systems. This means RCD protection is essential for earth fault protection, as the fault current may be insufficient to trip MCBs quickly enough."
  },
  {
    id: 4,
    question: "What is the function of surge protection devices (SPDs) in a PV installation?",
    options: [
      "To increase inverter efficiency",
      "To divert transient overvoltages to earth, protecting equipment from lightning and switching surges",
      "To provide earth fault protection",
      "To balance phases in three-phase systems"
    ],
    correctAnswer: 1,
    explanation: "SPDs provide a low-impedance path for transient overvoltages, diverting energy from lightning strikes or switching events to earth. They protect sensitive inverter electronics and prevent damage to panels and wiring from voltage spikes."
  },
  {
    id: 5,
    question: "Why is string-level DC arc fault detection becoming more common in PV systems?",
    options: [
      "It's a legal requirement for all systems",
      "DC arcs can sustain without self-extinguishing and cause fires if not detected",
      "It increases energy production",
      "It replaces the need for DC isolators"
    ],
    correctAnswer: 1,
    explanation: "Unlike AC arcs that extinguish at zero-crossing, DC arcs can sustain indefinitely. Arc fault circuit interrupters (AFCIs) detect the characteristic signatures of arcing and shut down the affected string before a fire can develop."
  },
  {
    id: 6,
    question: "What consideration applies to the main protective bonding when adding battery storage?",
    options: [
      "No additional bonding is required",
      "Battery enclosures must be bonded if they contain exposed metalwork that could become live",
      "Batteries must never be bonded",
      "Only lead-acid batteries need bonding"
    ],
    correctAnswer: 1,
    explanation: "Battery storage enclosures, especially metal ones, must be included in the protective bonding system if they could become live due to a fault. This ensures touch voltage protection and proper fault current paths for protective device operation."
  },
  {
    id: 7,
    question: "How might a heat pump affect the earthing system of a property?",
    options: [
      "Heat pumps don't affect earthing",
      "The refrigerant pipes may require bonding if metallic; the unit requires proper earth connection",
      "Heat pumps provide their own earth",
      "Heat pumps only work on TN systems"
    ],
    correctAnswer: 1,
    explanation: "Metallic refrigerant pipework may need bonding to maintain equipotential conditions. The heat pump unit itself requires proper protective earthing. The installation must maintain safe touch voltages and ensure fault current paths for protection."
  },
  {
    id: 8,
    question: "What is functional earthing in the context of inverter installations?",
    options: [
      "The same as protective earthing",
      "An earth connection required for equipment operation, separate from protective earthing",
      "Earthing that only works sometimes",
      "Earth connection for aesthetic purposes"
    ],
    correctAnswer: 1,
    explanation: "Some inverters require functional earthing for correct operation, EMC filtering, or signal reference. This is separate from protective earthing (safety) and may have specific conductor requirements. Both may need to be provided."
  },
  {
    id: 9,
    question: "Why must the disconnection time requirements of BS 7671 be verified after adding generation?",
    options: [
      "They don't need verification",
      "Generation can affect fault current magnitude and therefore disconnection times",
      "Disconnection times always improve with generation",
      "Only the DNO needs to verify this"
    ],
    correctAnswer: 1,
    explanation: "Protective devices must disconnect within specified times for safety. Local generation changes the fault current landscape - while it typically adds to fault current, inverter current limiting can affect this. Testing verifies protection still operates correctly."
  },
  {
    id: 10,
    question: "What earthing consideration applies specifically to outdoor PV array mounting systems?",
    options: [
      "Outdoor arrays don't need earthing",
      "All metal framing and rails should be bonded together and connected to the installation earth",
      "Only the panels need earthing, not the frames",
      "Earthing is only needed in wet conditions"
    ],
    correctAnswer: 1,
    explanation: "All metalwork in an outdoor PV array - frames, mounting rails, cable trays - must be bonded to maintain equipotential conditions. This protects against indirect contact in case of insulation failure and provides protection against lightning."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Does a PV system need its own earth electrode?",
    answer: "Not typically for standard domestic installations. The PV system connects to the existing installation earthing. However, functional earth requirements of certain inverters and surge protection may influence design. Lightning protection systems for larger arrays may include dedicated earth electrodes."
  },
  {
    question: "How do I test the DC side earth fault protection?",
    answer: "Inverter-integrated protection is typically tested through the inverter's self-test function. Insulation resistance testing on the DC side (with the inverter isolated) verifies string insulation. Some inverters display insulation values. Commissioning should include verification that DC protection responds correctly to simulated faults where test facilities exist."
  },
  {
    question: "Why might my RCD trip when the PV system is generating?",
    answer: "Inverters can produce small amounts of AC leakage current that, combined with other loads, exceeds RCD threshold. Capacitive coupling in long DC cable runs can also contribute. If nuisance tripping occurs, investigate the source, check all connections, and verify the correct RCD type is installed."
  },
  {
    question: "Do battery systems change the earthing arrangement?",
    answer: "Battery systems introduce additional metalwork that may need bonding. The battery-inverter system creates additional fault current paths that must be considered. Some battery systems have specific earthing requirements from manufacturers. Always follow the manufacturer's installation instructions."
  },
  {
    question: "What if the property has a TT earthing system?",
    answer: "TT systems rely on RCD protection for earth faults due to higher loop impedance. The PV system integrates into this arrangement normally. Pay attention to RCD selection (Type A minimum, Type B where appropriate) and ensure the earth electrode resistance is adequate for all connected loads including the PV system."
  },
  {
    question: "Should I install surge protection on every PV installation?",
    answer: "While not mandatory for all installations, surge protection is strongly recommended, especially for roof-mounted arrays which are vulnerable to lightning-induced surges. BS 7671 requires risk assessment for SPD installation. Most quality installations include SPDs on both DC and AC sides."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>DC faults:</strong> Behave differently to AC - special protection needed</li>
              <li><strong>Bonding:</strong> All array metalwork must be equipotentially bonded</li>
              <li><strong>RCD type:</strong> Consider Type B for smooth DC fault detection</li>
              <li><strong>SPDs:</strong> Protect against lightning and switching surges</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Bonding connections at array frames and mounting rails</li>
              <li><strong>Use:</strong> Verify earthing system type before planning installation</li>
              <li><strong>Apply:</strong> Include SPDs in designs for roof-mounted arrays</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Side Earthing and Fault Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The DC side of a PV system presents unique earthing and protection challenges that don't exist with conventional AC installations. Understanding these differences is essential for safe design and installation. DC fault currents behave fundamentally differently from AC - there's no natural zero-crossing point where arcs tend to extinguish, so a DC arc can sustain indefinitely if not interrupted.
            </p>

            <p>
              Modern inverters typically incorporate insulation monitoring devices (IMD) that continuously measure the insulation resistance between the DC conductors and earth. If insulation degrades - due to moisture ingress, cable damage, or equipment failure - the IMD detects the change and can shut down the system before a dangerous fault develops. This is the primary DC earth fault protection for most domestic systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DC Protection Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insulation monitoring:</strong> Continuous measurement of DC insulation resistance</li>
                <li><strong>RCMU:</strong> Residual current monitoring for DC earth leakage detection</li>
                <li><strong>AFCI:</strong> Arc fault circuit interrupter detecting and responding to DC arcs</li>
                <li><strong>String fusing:</strong> Overcurrent protection for paralleled strings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Standard AC RCDs cannot protect the DC side of a PV system. DC protection must be provided by the inverter's integrated protection or by dedicated DC protection devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Equipotential Bonding for Renewable Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipotential bonding is fundamental to electrical safety - keeping all accessible metalwork at the same potential prevents dangerous touch voltages. Renewable systems introduce new metalwork that must be incorporated into the bonding system: array frames, mounting rails, cable trays, inverter enclosures, and battery housings.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components Requiring Bonding</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PV module frames</li>
                  <li>Mounting rails and brackets</li>
                  <li>Metal cable containment</li>
                  <li>Inverter enclosures</li>
                  <li>Battery cabinet housings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bonding Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use appropriate conductor sizes</li>
                  <li>Ensure all joints are mechanically sound</li>
                  <li>Protect conductors from damage</li>
                  <li>Consider corrosion in mixed metals</li>
                  <li>Verify continuity during commissioning</li>
                </ul>
              </div>
            </div>

            <p>
              Anodised aluminium frames common on PV modules require specific bonding methods. The anodised layer is an insulator, so bonding washers with serrated teeth that cut through the coating are typically used. Simply connecting to the frame surface won't achieve electrical continuity without penetrating the anodised layer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earthing System Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The existing earthing system arrangement affects how renewable technologies integrate with the installation. Each type - TN-C-S, TN-S, and TT - has specific characteristics that influence design decisions and protection requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earthing System Impacts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TN-C-S:</strong> PEN conductor means earth and neutral share a path back to transformer. During network faults, installation earthed metalwork can rise to dangerous potential. Bonding of PV array metalwork connects it to this system.</li>
                <li><strong>TN-S:</strong> Separate neutral and earth back to transformer. Generally lower risk of earth potential rise but still requires proper bonding and protection coordination.</li>
                <li><strong>TT:</strong> Local earth electrode with higher loop impedance. RCD protection essential. Earth electrode must be adequate for the complete installation including added generation.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A rural property with TT earthing has earth electrode resistance of 50 ohms. Adding a PV system doesn't change this, but the RCD protecting the inverter circuit must be selected appropriately. A 30mA RCD would trip at 50 ohms x 30mA = 1.5V - effectively providing protection despite the high earth resistance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Surge Protection and AC Side Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Roof-mounted PV arrays are particularly vulnerable to lightning-induced surges. Even if lightning doesn't strike the array directly, nearby strikes can induce damaging voltage transients in the wiring. Surge protection devices (SPDs) provide a path for these transients to earth, protecting sensitive inverter electronics and preventing insulation breakdown.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 1 SPD</p>
                <p className="text-white/90 text-xs">Direct lightning current handling, where lightning protection exists</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 2 SPD</p>
                <p className="text-white/90 text-xs">Surge protection for switching and indirect lightning</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 3 SPD</p>
                <p className="text-white/90 text-xs">Fine protection at point of use, often built into equipment</p>
              </div>
            </div>

            <p>
              On the AC side, the type of RCD significantly affects protection capability. Type AC RCDs detect only sinusoidal AC fault currents. Type A detects AC and pulsating DC. Type B detects all waveforms including smooth DC. Since some inverter topologies can allow DC fault currents to reach the AC side, Type B RCDs provide the most comprehensive protection.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> BS 7671 requires risk assessment to determine SPD requirements. For most PV installations, the risk assessment favours SPD installation due to the array's exposure to lightning-induced transients.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify the property's earthing system before design</li>
                <li>Plan bonding routes for all new metalwork</li>
                <li>Use appropriate bonding methods for anodised aluminium</li>
                <li>Include SPDs in designs for roof-mounted arrays</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify bonding continuity throughout the array structure</li>
                <li>Test DC insulation resistance of each string</li>
                <li>Confirm RCD operation on inverter circuit</li>
                <li>Measure earth fault loop impedance at final circuit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Relying on mechanical fixings for bonding</strong> - Use dedicated bonding connections</li>
                <li><strong>Not penetrating anodised coatings</strong> - Bonding ineffective without good contact</li>
                <li><strong>Using Type AC RCDs</strong> - Cannot detect DC fault components</li>
                <li><strong>Omitting SPDs</strong> - Array vulnerable to surge damage</li>
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
                <p className="font-medium text-white mb-1">RCD Types</p>
                <ul className="space-y-0.5">
                  <li>Type AC: Sinusoidal AC only</li>
                  <li>Type A: AC + pulsating DC</li>
                  <li>Type B: All including smooth DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">SPD Categories</p>
                <ul className="space-y-0.5">
                  <li>Type 1: Direct lightning current</li>
                  <li>Type 2: Switching/indirect surges</li>
                  <li>Type 3: Point-of-use protection</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Grid Export
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5-4">
              Next: Load Balancing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section5_3;
