import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Life Safety Power - HNC Module 7 Section 2.3";
const DESCRIPTION = "Master life safety power systems for building services: essential supplies, safety services per BS 7671 Chapter 56, fire-rated cables to BS 7846/BS 8519, switchover systems, automatic transfer switches, and testing requirements.";

const quickCheckQuestions = [
  {
    id: "safety-services-definition",
    question: "What are safety services as defined in BS 7671?",
    options: ["Any electrical service in a building", "Services essential for safety of persons in emergency conditions", "Services that protect electrical equipment", "Services installed in fire compartments"],
    correctIndex: 1,
    explanation: "Safety services are electrical services essential for the safety of persons in the event of emergency conditions such as fire, requiring maintained power supply for evacuation, firefighting, and rescue operations."
  },
  {
    id: "fire-rating-standard",
    question: "Which standard specifies fire-resistant cable requirements for UK installations?",
    options: ["BS 7671 only", "BS 7846 for fire performance classification", "BS 5839 for fire detection", "IEC 60364 for wiring systems"],
    correctIndex: 1,
    explanation: "BS 7846 specifies fire performance categories for cables, classifying them according to their ability to maintain circuit integrity under fire conditions (e.g., PH30, PH60, PH120)."
  },
  {
    id: "changeover-time",
    question: "What is the maximum changeover time for automatic transfer to safety supply for emergency lighting?",
    options: ["0.5 seconds", "5 seconds", "15 seconds", "60 seconds"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 560.6.12 requires safety services to be available within specified times - typically 5 seconds maximum for emergency lighting to ensure safe evacuation conditions."
  },
  {
    id: "cable-rating-duration",
    question: "A cable rated PH60 will maintain circuit integrity for how long?",
    options: ["30 minutes under fire conditions", "60 minutes under fire conditions", "90 minutes under fire conditions", "120 minutes under fire conditions"],
    correctIndex: 1,
    explanation: "The PH classification indicates the duration in minutes: PH60 means the cable will maintain circuit integrity for 60 minutes when exposed to fire conditions as tested to BS 8491."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Chapter 56, which of the following is classified as a safety service?",
    options: [
      "General lighting circuits",
      "Emergency escape lighting",
      "Socket outlet circuits",
      "Heating systems"
    ],
    correctAnswer: 1,
    explanation: "Emergency escape lighting is a safety service as it is essential for the safety of persons during evacuation. Other safety services include fire detection/alarm systems, smoke control, firefighting lifts, and emergency voice communication."
  },
  {
    id: 2,
    question: "What does the 'Enhanced' classification mean for fire-resistant cables to BS 8519?",
    options: ["Higher current carrying capacity", "Improved electromagnetic compatibility", "Circuit integrity maintained with water spray application", "Reduced smoke emission"],
    correctAnswer: 2,
    explanation: "Enhanced fire-resistant cables to BS 8519 maintain circuit integrity when subjected to fire AND simultaneous water spray (simulating firefighting operations). Standard fire-resistant cables are tested under fire conditions only."
  },
  {
    id: 3,
    question: "For a hospital critical care area, what minimum fire rating would typically be required for safety service cables?",
    options: ["PH30 (30 minutes)", "PH60 (60 minutes)", "PH90 (90 minutes)", "PH120 (120 minutes)"],
    correctAnswer: 3,
    explanation: "Critical healthcare facilities typically require PH120 rated cables to maintain life safety systems for 2 hours, allowing extended evacuation times for vulnerable patients and continued operation of critical medical equipment."
  },
  {
    id: 4,
    question: "An Automatic Transfer Switch (ATS) must comply with which standard?",
    options: ["BS 7671 only", "BS EN 60947-6-1 for transfer switching equipment", "BS 7846 for cable systems", "BS 5839 for fire systems"],
    correctAnswer: 1,
    explanation: "Automatic Transfer Switches must comply with BS EN 60947-6-1 which specifies requirements for transfer switching equipment including operating times, withstand capability, and coordination requirements."
  },
  {
    id: 5,
    question: "Which source classification provides power with zero break during changeover?",
    options: ["Non-automatic supply", "Automatic supply with short break", "Automatic supply with medium break", "Uninterruptible supply (no-break)"],
    correctAnswer: 3,
    explanation: "An uninterruptible supply (no-break) uses UPS or rotating machinery to provide continuous power with zero interruption. This is required for critical loads that cannot tolerate any supply interruption."
  },
  {
    id: 6,
    question: "What is the purpose of the 'two-hour rule' in BS 7671 for safety services?",
    options: ["Maximum testing duration", "Minimum battery capacity for UPS", "Evacuation time allowance for larger buildings", "Generator start-up time"],
    correctAnswer: 2,
    explanation: "The two-hour rule recognises that larger, more complex buildings require extended evacuation times. Safety services must be capable of operating for the duration needed for full evacuation and firefighting operations."
  },
  {
    id: 7,
    question: "Which cable installation method provides the highest fire resistance?",
    options: ["Clipped direct to combustible surface", "Within steel conduit with mineral insulated cable", "In plastic trunking", "In suspended ceiling void"],
    correctAnswer: 1,
    explanation: "Mineral insulated cables within steel conduit provide the highest fire resistance. MICC is inherently fire-resistant, and steel conduit adds mechanical protection and additional fire performance."
  },
  {
    id: 8,
    question: "How often must automatic transfer switches be functionally tested according to best practice?",
    options: ["Daily", "Weekly", "Monthly", "Annually"],
    correctAnswer: 2,
    explanation: "Monthly functional testing of ATS units is recommended to verify correct operation. This includes simulating mains failure, verifying transfer to generator, and retransfer on mains restoration."
  },
  {
    id: 9,
    question: "What is the maximum voltage drop permitted for safety service circuits under normal conditions?",
    options: ["2%", "3%", "4%", "5%"],
    correctAnswer: 1,
    explanation: "BS 7671 recommends maximum 3% voltage drop for lighting circuits. For safety services, maintaining adequate voltage is critical to ensure equipment operates correctly during emergencies."
  },
  {
    id: 10,
    question: "Which safety system typically requires the fastest changeover time?",
    options: ["Emergency lighting", "Sprinkler pump", "Smoke extract fan", "Fire alarm panel"],
    correctAnswer: 3,
    explanation: "Fire alarm panels typically require the fastest changeover (&lt;0.5s) as they must maintain continuous monitoring capability. Loss of power, even momentarily, could miss a detection event."
  },
  {
    id: 11,
    question: "For fire-resistant cable installations, what is the maximum support spacing for horizontal runs?",
    options: ["150mm", "300mm", "450mm", "600mm"],
    correctAnswer: 1,
    explanation: "Fire-resistant cables should be supported at maximum 300mm centres horizontally (450mm vertically) to prevent cable sagging and potential circuit failure under fire conditions when insulation softens."
  },
  {
    id: 12,
    question: "What documentation must be maintained for safety service installations?",
    options: ["Installation certificate only", "Test certificates and maintenance records throughout operational life", "Manufacturer datasheets only", "Initial commissioning report only"],
    correctAnswer: 1,
    explanation: "Comprehensive documentation including installation certificates, commissioning records, test results, and ongoing maintenance records must be maintained throughout the operational life as evidence of continued compliance."
  }
];

const faqs = [
  {
    question: "What is the difference between 'standard' and 'enhanced' fire-resistant cables?",
    answer: "Standard fire-resistant cables (to BS 8434-2) maintain circuit integrity under fire conditions only. Enhanced fire-resistant cables (to BS 8519) maintain circuit integrity under fire conditions PLUS simultaneous water spray application, simulating firefighting operations. Enhanced cables are required where cables may be exposed to sprinkler discharge or fire brigade hose streams during operation."
  },
  {
    question: "When is a generator required versus UPS for safety services?",
    answer: "UPS provides immediate power (no-break or very short break) and is essential for loads that cannot tolerate any interruption (IT systems, fire alarm panels). Generators provide longer duration backup but require 5-15 seconds to start and transfer. Most safety systems use both: UPS for immediate bridging during generator start-up, then generator for extended operation. The choice depends on maximum acceptable break time and required duration."
  },
  {
    question: "How do I determine the required fire rating for safety service cables?",
    answer: "Fire rating is determined by: (1) Building type and occupancy - hospitals/care homes typically need PH120, offices may need PH60; (2) Evacuation time requirements - multi-storey buildings need longer ratings; (3) Location - cables in fire-protected shafts may need lower ratings; (4) Risk assessment - fire engineering analysis may specify requirements; (5) Regulatory requirements - Building Regulations Approved Document B and specific sector guidance."
  },
  {
    question: "What testing is required for automatic transfer switches?",
    answer: "ATS testing includes: (1) Monthly functional tests - simulate mains failure, verify transfer, check transfer time; (2) Quarterly load tests - verify operation under load; (3) Annual comprehensive tests - check all settings, timing, coordination with generator; (4) Record all tests in maintenance log. Test procedures should simulate both mains failure and mains restoration to verify bi-directional transfer operation."
  },
  {
    question: "Can fire-resistant cables share containment with standard cables?",
    answer: "Generally, fire-resistant cables for safety services should be segregated from standard cables to maintain circuit integrity. BS 5839-1 requires fire alarm cables to be separated from other cables. If shared containment is unavoidable, fire-rated containment systems (fire-rated trunking/conduit) may be used, but the preferred approach is physical segregation to eliminate risk of damage from faults in other circuits."
  },
  {
    question: "What are the requirements for safety service distribution boards?",
    answer: "Safety service distribution boards should: (1) Be dedicated to safety services only - not shared with general loads; (2) Be located in fire-protected areas where possible; (3) Have appropriate fire rating for enclosure; (4) Be clearly labelled as safety services; (5) Have discrimination coordinated to maintain supply during downstream faults; (6) Be fed by appropriately rated fire-resistant cables from source."
  }
];

const HNCModule7Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
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
            <span>Module 7.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Life Safety Power
          </h1>
          <p className="text-white/80">
            Essential supplies, safety services, fire-rated cables, switchover systems, and testing requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Safety services:</strong> Essential for life safety in emergencies</li>
              <li className="pl-1"><strong>Fire ratings:</strong> PH30/60/90/120 minute classifications</li>
              <li className="pl-1"><strong>Changeover:</strong> ATS provides automatic source transfer</li>
              <li className="pl-1"><strong>Testing:</strong> Monthly functional, annual comprehensive</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671 Ch. 56:</strong> Safety services requirements</li>
              <li className="pl-1"><strong>BS 7846:</strong> Fire performance classification</li>
              <li className="pl-1"><strong>BS 8519:</strong> Enhanced fire-resistant cables</li>
              <li className="pl-1"><strong>BS EN 60947-6-1:</strong> Transfer switch equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define safety services and their classification per BS 7671 Chapter 56",
              "Specify fire-rated cables using BS 7846 and BS 8519 classifications",
              "Design changeover systems with appropriate transfer times",
              "Select and specify automatic transfer switches",
              "Implement testing and maintenance regimes for safety supplies",
              "Apply fire rating requirements to cable installation methods"
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

        {/* Section 1: Safety Services Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safety Services and Essential Supplies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety services are electrical installations essential for the safety of persons in
              emergency conditions. BS 7671 Chapter 56 provides comprehensive requirements for these
              critical systems, which must remain operational during fire, evacuation, and rescue operations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety service classifications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Emergency escape lighting:</strong> Illuminates escape routes during evacuation</li>
                <li className="pl-1"><strong>Fire detection and alarm:</strong> Early warning and alert systems</li>
                <li className="pl-1"><strong>Smoke control systems:</strong> Maintains tenable conditions in escape routes</li>
                <li className="pl-1"><strong>Firefighting lifts:</strong> Enables firefighter access to all floors</li>
                <li className="pl-1"><strong>Emergency voice communication:</strong> Public address for evacuation instructions</li>
                <li className="pl-1"><strong>Fire suppression systems:</strong> Sprinkler pumps and gas suppression</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Source Classifications (BS 7671 Regulation 560.6)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Changeover Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No-break (UPS)</td>
                      <td className="border border-white/10 px-3 py-2">0 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm panels, critical IT</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Very short break</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 0.15 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting (maintained)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short break</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 0.5 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Smoke control systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium break</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 15 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Firefighting lifts, sprinkler pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long break</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 15 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Non-critical backup loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The changeover time must be selected based on the most critical load - all loads on that source must tolerate the transfer duration.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fire-Rated Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire-Rated Cables and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire-rated cables maintain circuit integrity under fire conditions, ensuring safety
              systems continue operating during emergencies. BS 7846 provides the classification
              framework, while BS 8519 specifies enhanced performance requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7846 Categories</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>PH30:</strong> 30 minutes fire resistance</li>
                  <li className="pl-1"><strong>PH60:</strong> 60 minutes fire resistance</li>
                  <li className="pl-1"><strong>PH90:</strong> 90 minutes fire resistance</li>
                  <li className="pl-1"><strong>PH120:</strong> 120 minutes fire resistance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 8519 Enhanced</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fire resistance PLUS water spray</li>
                  <li className="pl-1">Simulates firefighting conditions</li>
                  <li className="pl-1">Required where exposed to sprinklers</li>
                  <li className="pl-1">Higher performance requirement</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Type Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fire Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MICC (Mineral Insulated)</td>
                      <td className="border border-white/10 px-3 py-2">Inherently fire-resistant</td>
                      <td className="border border-white/10 px-3 py-2">Highest performance, harsh environments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FP200 Gold</td>
                      <td className="border border-white/10 px-3 py-2">PH120 to BS 8491</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm, emergency lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SWA with fire barrier</td>
                      <td className="border border-white/10 px-3 py-2">Variable with system</td>
                      <td className="border border-white/10 px-3 py-2">Power to safety equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LSOH fire-resistant</td>
                      <td className="border border-white/10 px-3 py-2">PH30/60/90/120</td>
                      <td className="border border-white/10 px-3 py-2">General safety services</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Support spacing:</strong> 300mm max horizontal, 450mm max vertical</li>
                <li className="pl-1"><strong>Fire-rated clips:</strong> Must match cable fire rating</li>
                <li className="pl-1"><strong>Segregation:</strong> Separate from non-safety cables</li>
                <li className="pl-1"><strong>Fire stopping:</strong> Maintain compartment integrity at penetrations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Fire rating must exceed the required operational time for evacuation plus firefighting access - typically 60-120 minutes for most commercial buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Changeover Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Changeover Systems and Automatic Transfer
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic Transfer Switches (ATS) provide seamless changeover between normal and
              standby power sources. Proper design ensures safety services receive power within
              acceptable transfer times while preventing backfeed hazards.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">ATS Operating Sequence</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">1.</span> <span className="text-white">Monitor mains supply voltage and frequency</span></p>
                <p><span className="text-white/60">2.</span> <span className="text-white">Detect mains failure (voltage drops below threshold)</span></p>
                <p><span className="text-white/60">3.</span> <span className="text-white">Send start signal to standby generator</span></p>
                <p><span className="text-white/60">4.</span> <span className="text-white">Generator reaches rated speed and voltage</span></p>
                <p><span className="text-white/60">5.</span> <span className="text-white">ATS transfers load to generator</span></p>
                <p><span className="text-white/60">6.</span> <span className="text-white">Monitor mains for restoration</span></p>
                <p><span className="text-white/60">7.</span> <span className="text-white">Retransfer to mains after stabilisation delay</span></p>
                <p><span className="text-white/60">8.</span> <span className="text-white">Generator runs on cooldown, then stops</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATS Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">ATS Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transfer Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open transition</td>
                      <td className="border border-white/10 px-3 py-2">50-100ms break</td>
                      <td className="border border-white/10 px-3 py-2">Standard safety services</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed transition</td>
                      <td className="border border-white/10 px-3 py-2">Make-before-break</td>
                      <td className="border border-white/10 px-3 py-2">Critical loads, paralleling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft load transfer</td>
                      <td className="border border-white/10 px-3 py-2">Ramped transition</td>
                      <td className="border border-white/10 px-3 py-2">Motor loads, gradual transfer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Static (solid-state)</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 4ms</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, critical IT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage sensing:</strong> Typically 85-90% of nominal for under-voltage detection</li>
                <li className="pl-1"><strong>Frequency sensing:</strong> Usually ± 3-5% of nominal frequency</li>
                <li className="pl-1"><strong>Time delays:</strong> Prevent nuisance transfers on transients</li>
                <li className="pl-1"><strong>Interlocking:</strong> Mechanical and electrical prevention of paralleling</li>
                <li className="pl-1"><strong>Bypass facilities:</strong> Manual override for maintenance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety requirement:</strong> Open transition is preferred for most applications as it prevents any possibility of generator-mains paralleling, which requires complex protection coordination.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Testing and Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing Requirements and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety service installations require rigorous testing regimes to ensure reliability
              when needed. BS 7671 and equipment-specific standards define commissioning tests,
              while ongoing maintenance ensures continued operational readiness.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable continuity verification</li>
                  <li className="pl-1">Insulation resistance tests</li>
                  <li className="pl-1">ATS functional operation</li>
                  <li className="pl-1">Transfer time measurement</li>
                  <li className="pl-1">Generator load test</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simulated mains failure</li>
                  <li className="pl-1">ATS transfer verification</li>
                  <li className="pl-1">Generator start test</li>
                  <li className="pl-1">Retransfer operation</li>
                  <li className="pl-1">Alarm/indication check</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Full load test (4 hours)</li>
                  <li className="pl-1">Protection coordination</li>
                  <li className="pl-1">Cable IR re-test</li>
                  <li className="pl-1">Battery capacity test</li>
                  <li className="pl-1">Timing sequence check</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Documentation Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificate</td>
                      <td className="border border-white/10 px-3 py-2">Initial test results, system configuration</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly test log</td>
                      <td className="border border-white/10 px-3 py-2">Test date, results, operator signature</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual inspection report</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive assessment, remedials</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance records</td>
                      <td className="border border-white/10 px-3 py-2">Repairs, replacements, modifications</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Load Bank Testing</p>
              <div className="text-sm space-y-2">
                <p><strong>Purpose:</strong> Verify generator can sustain rated load for required duration</p>
                <p><strong>Frequency:</strong> Annual minimum, quarterly for critical facilities</p>
                <p><strong>Load:</strong> Minimum 30% of rated capacity, preferably 75-100%</p>
                <p><strong>Duration:</strong> 4 hours minimum for annual test</p>
                <p><strong>Records:</strong> Fuel consumption, temperature, oil pressure, voltage/frequency stability</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Compliance note:</strong> Fire safety legislation requires safety systems to be maintained in proper working order. Test records provide evidence of compliance and may be requested by enforcing authorities.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Fire Rating Selection for Hospital</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify cable fire rating for a new hospital wing with 4 floors above ground.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Analysis:</p>
                <p className="mt-2">Building type: Healthcare (vulnerable occupants)</p>
                <p>Evacuation complexity: High (patients, equipment)</p>
                <p>Vertical escape routes: 4 floors requiring protected stairs</p>
                <p className="mt-2">Regulatory requirements:</p>
                <p className="ml-4">- BS 5839-1 recommends PH120 for fire alarm cables in hospitals</p>
                <p className="ml-4">- HTM 06-01 guidance for healthcare facilities</p>
                <p className="ml-4">- Extended evacuation time &gt; 60 minutes likely</p>
                <p className="mt-2">Cable specification:</p>
                <p className="ml-4">Fire alarm: PH120 (BS 8434-2) minimum</p>
                <p className="ml-4">Emergency lighting: PH120 (BS 8434-2)</p>
                <p className="ml-4">Smoke control: PH120 enhanced (BS 8519)</p>
                <p className="ml-4">Support: Fire-rated clips at 300mm centres</p>
                <p className="mt-2 text-green-400">Result: PH120 enhanced cables throughout safety services</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: ATS Sizing and Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select ATS for 500kVA generator serving safety loads in office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Load analysis:</p>
                <p className="mt-2">Safety loads connected:</p>
                <p className="ml-4">- Emergency lighting: 15kW</p>
                <p className="ml-4">- Fire alarm system: 5kW</p>
                <p className="ml-4">- Smoke extract fans: 45kW</p>
                <p className="ml-4">- Firefighting lift: 30kW</p>
                <p className="ml-4">- Sprinkler pump: 55kW</p>
                <p className="ml-4">Total safety load: 150kW</p>
                <p className="mt-2">ATS sizing:</p>
                <p className="ml-4">Rated current = 500kVA / (√3 × 400V) = 722A</p>
                <p className="ml-4">Select 800A ATS to BS EN 60947-6-1</p>
                <p className="mt-2">ATS specification:</p>
                <p className="ml-4">- Type: Open transition (no paralleling)</p>
                <p className="ml-4">- Transfer time: &lt; 100ms</p>
                <p className="ml-4">- Mechanical and electrical interlock</p>
                <p className="ml-4">- Manual bypass for maintenance</p>
                <p className="mt-2 text-green-400">Result: 800A 4-pole ATS, open transition, Type 2 coordination</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Monthly Test Procedure Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop monthly functional test procedure for office building safety power system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Test procedure:</p>
                <p className="mt-2">Pre-test checks:</p>
                <p className="ml-4">1. Notify building management and occupants</p>
                <p className="ml-4">2. Verify generator fuel level &gt; 50%</p>
                <p className="ml-4">3. Check generator oil and coolant levels</p>
                <p className="ml-4">4. Record mains voltage and frequency</p>
                <p className="mt-2">Functional test sequence:</p>
                <p className="ml-4">1. Simulate mains failure at ATS (test button)</p>
                <p className="ml-4">2. Start stopwatch - verify generator starts</p>
                <p className="ml-4">3. Record time to rated voltage: _____ seconds</p>
                <p className="ml-4">4. Verify ATS transfers to generator</p>
                <p className="ml-4">5. Record transfer time: _____ seconds</p>
                <p className="ml-4">6. Check all safety loads energised</p>
                <p className="ml-4">7. Run on generator for 15 minutes minimum</p>
                <p className="ml-4">8. Restore mains simulation</p>
                <p className="ml-4">9. Record retransfer time: _____ seconds</p>
                <p className="ml-4">10. Verify generator cooldown cycle</p>
                <p className="mt-2 text-green-400">Record all times, sign and date test log</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist for Safety Power Systems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all safety services requiring maintained supply</li>
                <li className="pl-1">Determine required changeover time for each load type</li>
                <li className="pl-1">Calculate total safety load for generator/UPS sizing</li>
                <li className="pl-1">Specify cable fire ratings based on building risk assessment</li>
                <li className="pl-1">Select ATS type appropriate for load characteristics</li>
                <li className="pl-1">Design segregated distribution for safety services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Emergency lighting changeover: <strong>5 seconds maximum</strong></li>
                <li className="pl-1">Fire alarm changeover: <strong>&lt; 0.5 seconds</strong></li>
                <li className="pl-1">Cable support spacing: <strong>300mm horizontal, 450mm vertical</strong></li>
                <li className="pl-1">Generator test frequency: <strong>Monthly functional, annual load</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Under-rated fire cables</strong> - Always select rating for worst-case evacuation time</li>
                <li className="pl-1"><strong>Inadequate support spacing</strong> - Cables sag and fail under fire conditions</li>
                <li className="pl-1"><strong>Mixed loads on ATS</strong> - All loads must tolerate the transfer time</li>
                <li className="pl-1"><strong>Neglected testing</strong> - Systems fail when needed if not regularly tested</li>
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
                <p className="font-medium text-white mb-1">Fire Rating Classifications</p>
                <ul className="space-y-0.5">
                  <li>PH30 - 30 minutes fire resistance</li>
                  <li>PH60 - 60 minutes fire resistance</li>
                  <li>PH90 - 90 minutes fire resistance</li>
                  <li>PH120 - 120 minutes fire resistance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Changeover Time Limits</p>
                <ul className="space-y-0.5">
                  <li>Fire alarm panels: &lt; 0.5 seconds</li>
                  <li>Emergency lighting: &lt; 5 seconds</li>
                  <li>Smoke control: &lt; 15 seconds</li>
                  <li>Firefighting lifts: &lt; 15 seconds</li>
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
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-4">
              Next: Section 2.4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_3;
