import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "EV Charging Points - Level 3 Module 6 Section 4.4";
const DESCRIPTION = "Comprehensive guide to electric vehicle charging point installation under BS 7671 Section 722 and OZEV guidance, covering charging modes, cable sizing, and PME considerations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What BS 7671 section specifically covers EV charging installations?",
    options: [
      "Section 701 - Bathrooms",
      "Section 722 - Electric Vehicle Charging Installations",
      "Section 705 - Agricultural",
      "Section 711 - Exhibitions"
    ],
    correctIndex: 1,
    explanation: "Section 722 was introduced specifically for EV charging installations. It covers requirements for connecting EVs to the electrical supply, including protection, isolation, earthing, and cable sizing specific to charging applications."
  },
  {
    id: "check-2",
    question: "What is the primary concern with PME earthing systems for EV charging?",
    options: [
      "They provide too much fault current",
      "Under PME fault conditions, dangerous voltages can appear on the vehicle chassis via the protective conductor",
      "They are not compatible with smart chargers",
      "PME systems cannot provide 32A supplies"
    ],
    correctIndex: 1,
    explanation: "In PME (TN-C-S) systems, a fault in the supply neutral can cause the installation earth to rise significantly above true earth. For an EV connected by a metal cable to both the house earth and actual earth (via its tyres), this creates a potential shock hazard."
  },
  {
    id: "check-3",
    question: "What is the minimum dedicated cable size typically required for a 7kW (32A) single-phase EV charger?",
    options: [
      "2.5mm squared twin and earth",
      "4mm squared twin and earth",
      "6mm squared twin and earth (subject to installation method and route length)",
      "10mm squared twin and earth minimum"
    ],
    correctIndex: 2,
    explanation: "A 7kW charger draws approximately 32A continuously. 6mm squared cable is typically required, though this must be verified against installation conditions including route length, grouping, thermal insulation contact, and ambient temperature. Longer runs may require 10mm squared."
  },
  {
    id: "check-4",
    question: "What type of RCD protection is specifically required for EV charging circuits under BS 7671?",
    options: [
      "Standard Type AC RCD at 30mA",
      "Type A or better RCD at 30mA (or DC fault detection in the charger)",
      "Type B RCD only",
      "RCD protection is optional for EV charging"
    ],
    correctIndex: 1,
    explanation: "Regulation 722.531.2 requires either a Type A RCD with the EVSE having integral DC fault detection (most Mode 3 chargers include this), or a Type B RCD. Type AC RCDs are not sufficient as they may not detect DC fault components from EV charging electronics."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the four charging modes defined for EV charging?",
    options: [
      "Fast, Faster, Fastest, Ultra",
      "Mode 1 (domestic socket), Mode 2 (ICCB), Mode 3 (dedicated AC), Mode 4 (DC rapid)",
      "Home, Public, Rapid, Super",
      "Type 1, Type 2, Type 3, Type 4"
    ],
    correctAnswer: 1,
    explanation: "Mode 1 uses standard sockets (not recommended), Mode 2 uses a special cable with in-cable control box, Mode 3 uses dedicated charging stations with built-in protection, and Mode 4 is DC rapid charging with the charger converting AC to DC."
  },
  {
    id: 2,
    question: "A homeowner has a TN-C-S (PME) supply. What additional measure may be required for EV charging?",
    options: [
      "No additional measures required",
      "Installation of earth electrode and protective conductor sizing to meet PME disconnection requirements",
      "Only Mode 2 charging is permitted",
      "The DNO must upgrade the supply first"
    ],
    correctAnswer: 1,
    explanation: "For PME supplies, BS 7671 requires either a separate earth electrode meeting specific resistance values, or an increased protective conductor CSA to limit touch voltage under PME fault conditions. Many charger installations include a small earth rod for this purpose."
  },
  {
    id: 3,
    question: "What is the OZEV grant scheme requirement for charger installation?",
    options: [
      "Chargers must be installed by any qualified person",
      "Chargers must be smart, installed by approved installers, and meet specific technical requirements",
      "Only Mode 4 chargers qualify",
      "The grant only covers public charging points"
    ],
    correctAnswer: 1,
    explanation: "The OZEV (formerly OLEV) grant requires chargers to be 'smart' (capable of responding to signals to shift charging times), installed by OZEV-approved installers, and meet technical specifications. The installer must be registered with OZEV to process grant claims."
  },
  {
    id: 4,
    question: "Why might a 7kW charger be more suitable than an 11kW or 22kW charger for many domestic installations?",
    options: [
      "7kW chargers are better quality",
      "Most domestic supplies are single-phase with limited capacity; 7kW typically maximises single-phase charging",
      "Higher power chargers are not legal domestically",
      "7kW provides faster charging"
    ],
    correctAnswer: 1,
    explanation: "Most UK domestic supplies are single-phase with 60A or 80A main fuses. A 7kW charger (32A) is typically the maximum that can be accommodated alongside normal household loads. 11kW and 22kW chargers require three-phase supplies, which are uncommon in UK homes."
  },
  {
    id: 5,
    question: "What isolation requirement applies specifically to EV charging circuits?",
    options: [
      "No specific isolation requirement",
      "A readily accessible means of isolation that disconnects all live conductors",
      "Only the charger's internal switch is required",
      "A time-delay switch"
    ],
    correctAnswer: 1,
    explanation: "Regulation 722.537.2.1.2 requires an isolating device to be provided to disconnect the charging equipment from the supply. This must be readily accessible and disconnect all live conductors, typically located near the charger or in the consumer unit."
  },
  {
    id: 6,
    question: "What does a 'Mode 3' EV charging station provide that a Mode 2 arrangement does not?",
    options: [
      "Higher voltage output",
      "Built-in control, protection, and communication with the vehicle permanently installed",
      "DC charging capability",
      "Wireless charging"
    ],
    correctAnswer: 1,
    explanation: "Mode 3 stations have control, protection and communication functions built into the permanently installed unit. Mode 2 relies on an in-cable control box (ICCB) which provides similar functions but in a portable format - Mode 3 is considered safer and more convenient for regular use."
  },
  {
    id: 7,
    question: "What consideration applies to voltage drop calculations for EV charging circuits?",
    options: [
      "Standard 3% applies",
      "5% limit applies but calculated at full rated current due to continuous nature of EV charging loads",
      "Voltage drop is not important for EV charging",
      "10% is acceptable for EV circuits"
    ],
    correctAnswer: 1,
    explanation: "EV charging is typically a continuous load (defined as 3 hours or more). Voltage drop calculations must use the full rated current, not a reduced value. The 5% limit applies for power circuits, and the cable route length from consumer unit to charger must be considered."
  },
  {
    id: 8,
    question: "A car park is installing multiple EV chargers. What load management consideration applies?",
    options: [
      "Each charger needs its own supply",
      "Dynamic load management may allow more chargers to share available capacity",
      "Maximum of 3 chargers per supply",
      "Only rapid chargers are suitable for car parks"
    ],
    correctAnswer: 1,
    explanation: "Dynamic load management (sometimes called 'smart charging' or 'load balancing') allows multiple chargers to share available capacity, reducing charging power when many vehicles charge simultaneously. This enables more charging points without requiring supply upgrades."
  },
  {
    id: 9,
    question: "What connector type is standard for Mode 3 AC charging in Europe and the UK?",
    options: [
      "Three-pin domestic plug",
      "Type 2 (Mennekes) connector",
      "CHAdeMO connector",
      "CCS connector"
    ],
    correctAnswer: 1,
    explanation: "Type 2 (IEC 62196-2, also known as Mennekes) is the European standard for AC charging. It supports single-phase up to 7kW and three-phase up to 22kW. CHAdeMO and CCS are DC rapid charging connectors used for Mode 4 charging."
  },
  {
    id: 10,
    question: "What earthing arrangement consideration applies when an EV charger is installed in an outbuilding supplied by SWA from the house?",
    options: [
      "No special considerations apply",
      "The SWA armour cannot be the sole CPC for EV charging; additional earth conductor or measures required",
      "EV chargers cannot be installed in outbuildings",
      "The charger must be Mode 2 only"
    ],
    correctAnswer: 1,
    explanation: "When extending a PME earthed supply to an outbuilding for EV charging, additional earthing measures are required. The SWA armour alone may not meet the protective conductor requirements. Often an earth electrode at the outbuilding and/or additional copper CPC within the SWA is specified."
  },
  {
    id: 11,
    question: "What is the typical charging time for a 60kWh EV battery using a 7kW home charger?",
    options: [
      "About 1 hour",
      "About 8-9 hours for full charge",
      "About 30 minutes",
      "About 3 hours"
    ],
    correctAnswer: 1,
    explanation: "Charging time is approximately battery capacity divided by charging power. For 60kWh at 7kW: 60/7 = approximately 8.5 hours. In practice, charging slows near 100% SOC, so full charges may take slightly longer. Most users charge overnight, making this acceptable for daily use."
  },
  {
    id: 12,
    question: "What documentation must be provided after installing an EV charging point?",
    options: [
      "Only a receipt is required",
      "Electrical Installation Certificate, manufacturer documentation, and user instructions",
      "Only the OZEV grant paperwork",
      "A verbal handover is sufficient"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (or Minor Works for additions to existing circuits) is required. Additionally, the installer should provide manufacturer's instructions, warranty information, user guidance on operation, and if applicable, OZEV grant documentation."
  }
];

const faqs = [
  {
    question: "Can I install an EV charger myself?",
    answer: "EV charger installation is notifiable work under Part P of the Building Regulations. It must be carried out by a competent person registered with a Part P scheme, or building control notification is required. Additionally, to claim the OZEV grant, installation must be by an OZEV-approved installer. The electrical knowledge required for PME considerations, cable sizing, and protection coordination makes professional installation essential."
  },
  {
    question: "How do I know if my supply can support an EV charger?",
    answer: "Check your main fuse size (typically 60A or 80A for domestic) and assess existing maximum demand. A 7kW charger draws 32A - add this to your typical peak demand (evening, when cooking, heating, etc.). If total exceeds 80% of main fuse rating, a supply upgrade may be needed. Consider diversity - you may not cook while charging. Smart chargers can reduce power during peak demand periods."
  },
  {
    question: "What's the difference between tethered and untethered chargers?",
    answer: "Tethered chargers have a cable permanently attached - convenient as it's always ready, but you're committed to that cable length and connector type. Untethered chargers have a socket where you connect your own cable - more flexible for different vehicles and cable lengths, but you must store and connect the cable each time. Both are equally capable electrically."
  },
  {
    question: "Do I need to notify my DNO about an EV charger installation?",
    answer: "Yes, DNO notification is required under the Engineering Recommendation G98/G99 process if the charger is over 16A per phase. Most 7kW chargers (32A) require notification. Smart chargers may also need registration for grid flexibility services. Your installer should handle this notification as part of the installation process."
  },
  {
    question: "What maintenance does an EV charger require?",
    answer: "EV chargers require minimal routine maintenance. Periodic visual inspection for damage, checking cable condition, testing the RCD protection, and ensuring the unit is clean and dry are the main tasks. Annual inspection and testing as part of the overall electrical installation is recommended. Keep the charging cable clean and stored properly when not in use."
  },
  {
    question: "Can I charge an EV from a standard 13A socket?",
    answer: "Technically possible with a Mode 2 ICCB cable, but not recommended for regular use. The maximum power is about 2.3kW (10A recommended limit for sustained loads), meaning very long charging times. The socket and wiring may not be rated for sustained load, creating overheating risks. Mode 3 dedicated chargers are safer, faster, and designed for the continuous loads EV charging demands."
  }
];

const Level3Module6Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Section 722:</strong> Specific BS 7671 requirements for EV charging</li>
              <li><strong>PME Concern:</strong> Special earthing measures often required</li>
              <li><strong>Type A+ RCD:</strong> With DC detection, or Type B RCD required</li>
              <li><strong>7kW Typical:</strong> Maximum single-phase domestic charging</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Undersized cables overheating during prolonged charging</li>
              <li><strong>Use:</strong> Earth electrode for PME installations</li>
              <li><strong>Apply:</strong> Smart charging to manage peak demand</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding EV Charging Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicle charging is categorised into four modes, each with different power levels, safety features, and applications. Understanding these modes is essential for selecting the right solution for each installation.
            </p>

            <div className="grid gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-elec-yellow/80">Mode 1 - Standard Socket</p>
                  <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Not Recommended</span>
                </div>
                <p className="text-sm text-white/90 mb-2">
                  Direct connection to standard domestic socket outlet without any additional control or protection.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Maximum ~2.3kW at 10A (for sustained load)</li>
                  <li>No communication with vehicle</li>
                  <li>Relies entirely on circuit protection</li>
                  <li>Not suitable for regular use - fire risk from sustained high loads</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-elec-yellow/80">Mode 2 - In-Cable Control Box (ICCB)</p>
                  <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">Portable/Temporary</span>
                </div>
                <p className="text-sm text-white/90 mb-2">
                  Uses a special cable with integrated control, protection, and communication functions.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Typically 2.3kW from 13A socket, up to 7kW from commando socket</li>
                  <li>ICCB contains RCD, control pilot, and temperature monitoring</li>
                  <li>Portable - useful for travel or where no fixed charger available</li>
                  <li>Slower than dedicated installations; socket outlet loading concerns remain</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-green-400">Mode 3 - Dedicated AC Charging Station</p>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Recommended</span>
                </div>
                <p className="text-sm text-white/90 mb-2">
                  Purpose-built charging station with integrated control, protection, and communication.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Typically 7kW single-phase or 11/22kW three-phase</li>
                  <li>Built-in RCD protection, control pilot, and DC fault detection</li>
                  <li>Smart functionality for load management and scheduling</li>
                  <li>Standard for home and workplace installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-elec-yellow/80">Mode 4 - DC Rapid Charging</p>
                  <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">Commercial/Public</span>
                </div>
                <p className="text-sm text-white/90 mb-2">
                  DC charging where the charger unit converts AC to DC externally to the vehicle.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>50kW to 350kW+ - typically 20-30 minute charging</li>
                  <li>Uses CCS or CHAdeMO connectors</li>
                  <li>Requires substantial supply infrastructure</li>
                  <li>Primarily for public charging networks and fleet depots</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PME Earthing Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The majority of UK domestic supplies use the TN-C-S (PME - Protective Multiple Earthing) system. While this provides excellent fault protection under normal conditions, it creates a specific concern for EV charging that BS 7671 Section 722 addresses.
            </p>
            <p>
              The issue arises because an EV is simultaneously connected to the installation's protective conductor (via the charging cable) and to true earth (via its tyres on the ground). Under a PME fault condition (broken supply neutral), the installation's earth can rise to a dangerous voltage relative to true earth.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The PME Risk Scenario:</p>
              <ul className="text-sm text-white/90 space-y-2 ml-4">
                <li>1. The supply neutral conductor breaks (rare but possible)</li>
                <li>2. Load current returns via the combined earth/neutral system</li>
                <li>3. Installation earth rises towards line voltage (potentially 115V+)</li>
                <li>4. The EV chassis becomes live relative to the ground it stands on</li>
                <li>5. A person touching the vehicle while standing on the ground receives a shock</li>
              </ul>
            </div>

            <p>
              Section 722 provides two approaches to address this risk. Either the protective conductor must be sized to limit the touch voltage to safe levels, or an earth electrode must be installed to provide an alternative return path.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">PME Mitigation Options:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li><strong>Option 1:</strong> Install earth electrode with resistance not exceeding specified value</li>
                <li><strong>Option 2:</strong> Size protective conductor to Table 54.1 enhanced requirements</li>
                <li><strong>Option 3:</strong> Use charger with PME fault detection and shutdown</li>
                <li><strong>Combination:</strong> Many installations use earth rod plus enhanced CPC</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For most domestic installations, a simple earth rod of around 1.2m driven near the charger location provides adequate protection. The rod must be tested to confirm acceptable resistance (typically below 200 ohms for this purpose).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Sizing and Circuit Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging represents a significant sustained load that requires careful cable sizing. Unlike most domestic loads that are intermittent, EV charging typically runs continuously for several hours - this affects cable sizing calculations significantly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Cable Sizing Considerations:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-white/80">Charger Rating</th>
                      <th className="text-left py-2 pr-4 text-white/80">Current (A)</th>
                      <th className="text-left py-2 pr-4 text-white/80">Typical Cable</th>
                      <th className="text-left py-2 text-white/80">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">3.6kW</td>
                      <td className="py-2 pr-4">16A</td>
                      <td className="py-2 pr-4">4mm<sup>2</sup></td>
                      <td className="py-2">Granny charger replacement</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">7kW</td>
                      <td className="py-2 pr-4">32A</td>
                      <td className="py-2 pr-4">6mm<sup>2</sup> or 10mm<sup>2</sup></td>
                      <td className="py-2">Verify for route length</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">11kW (3-ph)</td>
                      <td className="py-2 pr-4">16A/phase</td>
                      <td className="py-2 pr-4">4mm<sup>2</sup> 4-core</td>
                      <td className="py-2">Requires 3-phase supply</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">22kW (3-ph)</td>
                      <td className="py-2 pr-4">32A/phase</td>
                      <td className="py-2 pr-4">6mm<sup>2</sup> 4-core</td>
                      <td className="py-2">Rarely domestic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Voltage drop must be calculated at full load current for the complete cable run. For a 7kW charger at 32A over 25 metres of 6mm<sup>2</sup> cable, the voltage drop is approximately 4.7V (about 2%). This is within the 5% limit but leaves less margin for supply voltage variations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Checklist:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Confirm main fuse capacity can accommodate charger plus existing loads</li>
                <li>Calculate cable size including all derating factors</li>
                <li>Verify voltage drop at rated current for full route length</li>
                <li>Select appropriate MCB type (typically Type C for electronic chargers)</li>
                <li>Specify RCD type - Type A with DC detection or Type B</li>
                <li>Plan cable route avoiding thermal insulation where possible</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protection and Smart Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging circuits require specific protection arrangements that differ from standard power circuits. The electronics in EV chargers and vehicles can produce DC fault components that standard Type AC RCDs cannot detect.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">RCD Requirements (Regulation 722.531.2):</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Option A: Type A + DC Detection</p>
                  <p className="text-white/90">Standard Type A RCD at 30mA combined with DC fault detection built into the EVSE. Most Mode 3 chargers include this detection as standard.</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Option B: Type B RCD</p>
                  <p className="text-white/90">Type B RCD detects both AC and DC fault components. More expensive but provides complete protection without relying on charger electronics.</p>
                </div>
              </div>
            </div>

            <p>
              Smart charging capability is increasingly important - and mandatory for OZEV grant eligibility. Smart chargers can communicate with the grid, respond to time-of-use tariffs, and participate in vehicle-to-grid (V2G) schemes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Smart Charger Features:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li><strong>Scheduled charging:</strong> Set charging times to use cheaper overnight electricity</li>
                <li><strong>Dynamic load management:</strong> Automatically reduce charging when household demand peaks</li>
                <li><strong>Solar integration:</strong> Charge preferentially when solar generation is available</li>
                <li><strong>App control:</strong> Monitor and control charging remotely</li>
                <li><strong>Grid services:</strong> Participate in demand response schemes</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A homeowner has a 7kW EV charger and uses an electric cooker and shower during evening peak hours. The smart charger detects the increased household load and automatically reduces charging current from 32A to 16A, preventing the main fuse from overloading. When the cooker switches off, charging resumes at full power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Survey Essentials</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check main fuse rating and assess available capacity</li>
                <li>Identify supply type (TN-S, TN-C-S, TT) for earthing requirements</li>
                <li>Survey cable route from consumer unit to charging location</li>
                <li>Check for thermal insulation in route that might affect cable sizing</li>
                <li>Assess mounting position - typically 750-1200mm height for accessibility</li>
                <li>Confirm WiFi signal strength at charger location for smart functions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install dedicated circuit from consumer unit - no spur or shared circuits</li>
                <li>Use appropriate cable clips rated for outdoor use if external routing</li>
                <li>Install earth rod if required for PME protection</li>
                <li>Label the circuit clearly at the consumer unit</li>
                <li>Test RCD operation and record results on certification</li>
                <li>Commission charger and demonstrate operation to customer</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized cables</strong> - Not accounting for continuous load or route length</li>
                <li><strong>Wrong RCD type</strong> - Using Type AC instead of Type A with DC detection</li>
                <li><strong>Ignoring PME</strong> - Not installing earth electrode where required</li>
                <li><strong>Supply overload</strong> - Not checking total demand against main fuse capacity</li>
                <li><strong>Poor cable routing</strong> - Cables through insulation without derating</li>
                <li><strong>Missing isolation</strong> - No readily accessible isolator for charger</li>
              </ul>
            </div>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Type A RCD + DC detection, or Type B RCD</li>
                  <li>Earth electrode for PME supplies</li>
                  <li>Dedicated circuit, no shared loads</li>
                  <li>Smart charger for OZEV grant</li>
                  <li>DNO notification for over 16A</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Section 722 - EV Charging</li>
                  <li>Regulation 722.531.2 - RCD requirements</li>
                  <li>Regulation 722.411.4 - PME protection</li>
                  <li>Regulation 722.537 - Isolation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4-4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Agricultural & Industrial
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section4-4-5">
              Next: Temporary Installations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_4;
