import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earthing and Protective Devices in Distribution - HNC Module 3 Section 4.6";
const DESCRIPTION = "Master earthing systems (TN-S, TN-C-S, TT), protective multiple earthing, earth fault loop impedance, protective device coordination, RCDs, MCCBs, and discrimination in three-phase distribution networks.";

const quickCheckQuestions = [
  {
    id: "earthing-system",
    question: "In a TN-C-S (PME) system, what is the combined conductor called?",
    options: ["Protective conductor (PE)", "Neutral conductor (N)", "PEN conductor", "Earth electrode"],
    correctIndex: 2,
    explanation: "In TN-C-S systems, the neutral and protective functions are combined in a single PEN (Protective Earth and Neutral) conductor in the supply network, which separates into PE and N at the origin of the installation."
  },
  {
    id: "zs-calculation",
    question: "What must Zs be for a 32A Type B MCB to disconnect within 0.4s (given Zs max = 1.37 ohms)?",
    options: ["Less than 0.4 ohms", "Less than 1.37 ohms", "Exactly 1.37 ohms", "Greater than 1.37 ohms"],
    correctIndex: 1,
    explanation: "For automatic disconnection, the measured Zs must be less than or equal to the maximum permitted value from BS 7671 tables. For a 32A Type B MCB, the maximum Zs is 1.37 ohms at 0.4s disconnection time."
  },
  {
    id: "rcd-three-phase",
    question: "What type of RCD is required for three-phase circuits supplying variable speed drives?",
    options: ["Type AC", "Type A", "Type B", "Type F"],
    correctIndex: 2,
    explanation: "Type B RCDs are required for circuits supplying equipment that may produce smooth DC residual currents, such as variable speed drives (VSDs) and inverters. Type AC and A cannot detect DC fault currents."
  },
  {
    id: "discrimination",
    question: "What is the minimum discrimination ratio typically required between upstream and downstream MCBs?",
    options: ["1.5:1", "2:1", "3:1", "5:1"],
    correctIndex: 1,
    explanation: "A minimum ratio of 2:1 between the upstream device rating and the downstream device rating is typically required for current discrimination. However, manufacturers' selectivity tables should always be consulted for confirmed discrimination."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which earthing system uses a separate earth conductor from the supply transformer to the installation?",
    options: [
      "TT system",
      "TN-S system",
      "TN-C-S system",
      "IT system"
    ],
    correctAnswer: 1,
    explanation: "TN-S (Terra-Neutral-Separate) uses a separate protective earth conductor (typically the cable sheath or a fifth core) all the way from the supply transformer to the installation's main earthing terminal."
  },
  {
    id: 2,
    question: "What is the typical maximum external earth fault loop impedance (Ze) for a TN-C-S supply?",
    options: ["0.2 ohms", "0.35 ohms", "0.8 ohms", "21 ohms"],
    correctAnswer: 1,
    explanation: "TN-C-S (PME) supplies typically have Ze values around 0.35 ohms. TN-S supplies are typically 0.8 ohms, while TT systems can be 21 ohms or higher."
  },
  {
    id: 3,
    question: "What is the purpose of the main earthing terminal (MET)?",
    options: [
      "To connect the supply neutral only",
      "To provide a common connection point for all protective conductors",
      "To measure insulation resistance",
      "To connect lighting circuits only"
    ],
    correctAnswer: 1,
    explanation: "The MET provides a common connection point for the earthing conductor, circuit protective conductors (CPCs), main protective bonding conductors, and any functional earthing conductors, ensuring equipotential bonding throughout the installation."
  },
  {
    id: 4,
    question: "For a circuit protected by a 63A Type B MCB, if Ze = 0.35 ohms and (R1+R2) = 0.25 ohms, is automatic disconnection achieved?",
    options: [
      "Yes - Zs = 0.6 ohms which is less than maximum 0.73 ohms",
      "No - Zs is too high",
      "Cannot be determined without RCD",
      "Only if additional bonding is installed"
    ],
    correctAnswer: 0,
    explanation: "Zs = Ze + (R1+R2) = 0.35 + 0.25 = 0.6 ohms. The maximum Zs for a 63A Type B MCB at 0.4s is 0.73 ohms (from BS 7671 Table 41.3). Since 0.6 < 0.73 ohms, automatic disconnection is achieved."
  },
  {
    id: 5,
    question: "What is the main advantage of MCCBs over MCBs in distribution systems?",
    options: [
      "MCCBs are cheaper",
      "MCCBs have adjustable trip settings and higher fault ratings",
      "MCCBs are smaller in size",
      "MCCBs do not require maintenance"
    ],
    correctAnswer: 1,
    explanation: "MCCBs offer adjustable thermal and magnetic trip settings, higher current ratings (up to 3200A), and higher fault current ratings (up to 150kA). This makes them suitable for main distribution boards where discrimination and flexibility are required."
  },
  {
    id: 6,
    question: "What is PME open PEN conductor risk and why is it significant?",
    options: [
      "Risk of overcurrent in the neutral",
      "Risk of the earth becoming live if the PEN conductor breaks",
      "Risk of voltage drop in long circuits",
      "Risk of harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "If the PEN conductor breaks in a PME system, the installation earth can rise to a dangerous potential relative to true earth. This is why PME has restrictions for certain installations (swimming pools, petrol stations) and requires adequate main bonding."
  },
  {
    id: 7,
    question: "What determines the minimum size of the main protective bonding conductor?",
    options: [
      "The size of the lighting circuit conductors",
      "The size of the main supply neutral conductor",
      "Half the size of the earthing conductor with a minimum of 6mm squared",
      "The same size as the largest circuit conductor"
    ],
    correctAnswer: 2,
    explanation: "Per BS 7671 Table 54.8, main protective bonding conductors must be at least half the cross-sectional area of the earthing conductor, with minimum sizes of 6mm squared (Cu) for supplies up to 35mm squared."
  },
  {
    id: 8,
    question: "Why might time-delayed RCDs (Type S) be used at the origin of a three-phase installation?",
    options: [
      "They are cheaper than standard RCDs",
      "They provide discrimination with downstream instantaneous RCDs",
      "They have higher current ratings",
      "They are required by BS 7671 for all installations"
    ],
    correctAnswer: 1,
    explanation: "Type S (selective/time-delayed) RCDs have a built-in time delay (typically 40-500ms) allowing downstream instantaneous RCDs to trip first for faults in their circuits, maintaining supply to unaffected circuits."
  },
  {
    id: 9,
    question: "What is the fault current at a point where Zs = 0.5 ohms on a 230V supply?",
    options: [
      "115A",
      "230A",
      "460A",
      "575A"
    ],
    correctAnswer: 2,
    explanation: "Fault current If = Uo/Zs = 230/0.5 = 460A. This calculation is essential for verifying that protective devices will operate within required disconnection times."
  },
  {
    id: 10,
    question: "What type of earthing system requires an earth electrode at the installation?",
    options: [
      "TN-S",
      "TN-C-S",
      "TT",
      "All earthing systems"
    ],
    correctAnswer: 2,
    explanation: "TT systems use an earth electrode at the installation as the means of earthing, independent of any supply earth. This is common in rural areas where the DNO does not provide an earth terminal. RCD protection is essential due to higher Zs values."
  }
];

const faqs = [
  {
    question: "What is the difference between earthing and bonding?",
    answer: "Earthing connects the installation to the general mass of earth via the earthing conductor and MET, providing a path for fault currents. Bonding connects extraneous-conductive-parts (gas pipes, water pipes, structural steelwork) to the MET, ensuring they cannot rise to a dangerous potential relative to the electrical installation - this is called equipotential bonding."
  },
  {
    question: "Why are TT systems less common in urban areas?",
    answer: "DNOs in urban areas typically provide TN-S or TN-C-S supplies because the existing cable network infrastructure includes earth conductors. TT systems require local earth electrodes and have higher Zs values, making RCD protection essential. They are more common in rural areas where PME risks (open PEN) are higher due to longer overhead line runs."
  },
  {
    question: "How do I achieve discrimination between RCDs?",
    answer: "Use a Type S (time-delayed) RCD upstream and instantaneous RCDs downstream. The upstream RCD must have at least twice the rated residual current (e.g., 100mA upstream, 30mA downstream) and sufficient time delay (40ms minimum). Manufacturers' selectivity charts should be consulted for guaranteed discrimination."
  },
  {
    question: "When should I use an MCCB instead of an MCB?",
    answer: "Use MCCBs when: current ratings exceed 125A; higher fault levels require ratings above 10kA; adjustable trip settings are needed for discrimination; the application requires withdrawable units for maintenance; or when specified by the electrical design for main distribution boards and sub-main protection."
  },
  {
    question: "What is the 80% rule for measured Zs values?",
    answer: "BS 7671 Guidance Note 3 recommends that measured Zs values should not exceed 80% of the maximum tabulated values to account for conductor temperature rise during fault conditions. Cables heat up during faults, increasing resistance, so testing at ambient temperature gives lower readings than actual fault conditions."
  },
  {
    question: "Why is main bonding so important in PME installations?",
    answer: "In PME (TN-C-S) systems, if the PEN conductor becomes open circuit, the installation earth can rise to supply voltage via connected loads. Main bonding ensures all extraneous-conductive-parts are at the same potential, reducing touch voltage risk. This is why PME installations require robust main bonding and may have restrictions for certain applications."
  }
];

const HNCModule3Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <Shield className="h-4 w-4" />
            <span>Module 3.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing and Protective Devices in Distribution
          </h1>
          <p className="text-white/80">
            Safety systems, protection coordination and automatic disconnection in three-phase distribution networks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>TN-S:</strong> Separate earth from transformer - most reliable</li>
              <li className="pl-1"><strong>TN-C-S (PME):</strong> Combined PEN conductor - most common</li>
              <li className="pl-1"><strong>TT:</strong> Local earth electrode - requires RCD protection</li>
              <li className="pl-1"><strong>Zs = Ze + (R1+R2):</strong> Earth fault loop impedance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MCCBs:</strong> Main switchgear, adjustable protection</li>
              <li className="pl-1"><strong>Discrimination:</strong> Upstream trips only for downstream faults</li>
              <li className="pl-1"><strong>Type B RCDs:</strong> Required for VSD/inverter circuits</li>
              <li className="pl-1"><strong>MET:</strong> Central connection for all protective conductors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain TN-S, TN-C-S and TT earthing system characteristics",
              "Calculate earth fault loop impedance (Zs) and verify disconnection times",
              "Understand PME risks and bonding requirements",
              "Select appropriate protective devices (MCB, MCCB, RCD) for three-phase circuits",
              "Apply discrimination principles for coordinated protection",
              "Design main earthing terminals and protective conductor systems"
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

        {/* Section 1: Earthing Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Earthing Systems - TN-S, TN-C-S and TT
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earthing system defines how an electrical installation is connected to earth and determines
              the fault current path characteristics. Understanding these systems is fundamental to protection
              coordination and safety in three-phase distribution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earthing System Notation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>First letter:</strong> Supply earthing - T (direct earth connection), I (isolated/impedance)</li>
                <li className="pl-1"><strong>Second letter:</strong> Installation earthing - T (local earth), N (connected to supply earth)</li>
                <li className="pl-1"><strong>Third letter:</strong> Neutral/earth arrangement - S (separate), C (combined)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Earthing Systems Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Ze</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">Separate earth conductor from transformer</td>
                      <td className="border border-white/10 px-3 py-2">0.8 ohms</td>
                      <td className="border border-white/10 px-3 py-2">Older urban supplies, cable sheath earth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TN-C-S</td>
                      <td className="border border-white/10 px-3 py-2">Combined PEN in supply, separate at origin</td>
                      <td className="border border-white/10 px-3 py-2">0.35 ohms</td>
                      <td className="border border-white/10 px-3 py-2">Most common UK supply (PME)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TT</td>
                      <td className="border border-white/10 px-3 py-2">Local earth electrode, no supply earth</td>
                      <td className="border border-white/10 px-3 py-2">21+ ohms</td>
                      <td className="border border-white/10 px-3 py-2">Rural areas, caravan parks, petrol stations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN-S System</p>
              <p className="text-sm text-white/90 mb-3">
                The most reliable earthing arrangement with a dedicated protective earth conductor (typically the
                cable sheath or armour) running from the supply transformer to the installation.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Low impedance fault path - high fault currents for rapid disconnection</li>
                <li className="pl-1">No open PEN risk - earth and neutral are always separate</li>
                <li className="pl-1">Common in areas with lead-sheathed or SWA supply cables</li>
                <li className="pl-1">Typical Ze: 0.8 ohms maximum</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN-C-S System (PME)</p>
              <p className="text-sm text-white/90 mb-3">
                Protective Multiple Earthing is the most common UK system. The supply uses a combined PEN
                conductor which separates into PE and N at the consumer's main earthing terminal.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Very low Ze (typically 0.35 ohms) - excellent fault clearance</li>
                <li className="pl-1">Multiple earth electrodes along the supply network</li>
                <li className="pl-1"><strong>Open PEN risk:</strong> If PEN breaks, installation earth rises to supply voltage</li>
                <li className="pl-1">Requires robust main bonding to mitigate open PEN hazard</li>
                <li className="pl-1">Restrictions apply: Not permitted for petrol stations, swimming pools (special measures)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT System</p>
              <p className="text-sm text-white/90 mb-3">
                The installation uses a local earth electrode with no connection to the supply earth. Common
                where PME is not available or not permitted.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">High Ze (21+ ohms) - depends on soil resistivity and electrode type</li>
                <li className="pl-1"><strong>RCD protection essential:</strong> MCBs alone cannot provide disconnection within required times</li>
                <li className="pl-1">30mA RCDs required for socket outlets and portable equipment</li>
                <li className="pl-1">Earth electrode resistance (Ra) must be verified: Ra x I delta n less than or equal to 50V</li>
                <li className="pl-1">Used in rural areas, temporary installations, and where PME restrictions apply</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The earthing system determines the fault current magnitude and hence
              the protective device characteristics required for automatic disconnection within safe time limits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: PME and Bonding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protective Multiple Earthing (PME)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PME provides an excellent low-impedance earth but carries the risk of the installation earth
              becoming live if the PEN conductor fails. Understanding this risk and the protective measures
              is essential for safe installation design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Open PEN Conductor Hazard</p>
              <p className="text-sm text-white/90">
                If the PEN conductor breaks between the transformer and the installation, any current flowing
                to the neutral will raise the installation earth potential. With typical domestic loads, this
                can result in a touch voltage of up to 230V on all earthed metalwork within the installation.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Protective Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main protective bonding:</strong> All extraneous-conductive-parts bonded to MET</li>
                <li className="pl-1"><strong>Equipotential zone:</strong> All metalwork at same potential reduces touch voltage</li>
                <li className="pl-1"><strong>Minimum bonding sizes:</strong> 10mm squared Cu minimum for gas, water, oil services</li>
                <li className="pl-1"><strong>Structural steelwork:</strong> Must be bonded where accessible</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Protective Bonding Conductor Sizes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Supply Neutral (mm squared)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Bonding (Cu)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 35</td>
                      <td className="border border-white/10 px-3 py-2">10mm squared</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, small commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 35 to 50</td>
                      <td className="border border-white/10 px-3 py-2">16mm squared</td>
                      <td className="border border-white/10 px-3 py-2">Commercial premises</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 50 to 95</td>
                      <td className="border border-white/10 px-3 py-2">25mm squared</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, large commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 95 to 150</td>
                      <td className="border border-white/10 px-3 py-2">35mm squared</td>
                      <td className="border border-white/10 px-3 py-2">Large installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Restrictions (BS 7671)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Swimming pools:</strong> PME earth not permitted within zones</li>
                <li className="pl-1"><strong>Petrol filling stations:</strong> TT system required for forecourt</li>
                <li className="pl-1"><strong>Caravans/boats:</strong> PME earth to unit not permitted</li>
                <li className="pl-1"><strong>Construction sites:</strong> Special arrangements required</li>
                <li className="pl-1"><strong>Agricultural:</strong> Additional requirements for livestock protection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> In PME installations, ensure comprehensive main bonding
              to create an equipotential zone that protects against the open PEN hazard.
            </p>
          </div>
        </section>

        {/* Section 3: Earth Fault Loop Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earth Fault Loop Impedance (Zs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault loop impedance determines the magnitude of fault current and hence the
              disconnection time of protective devices. Calculating and verifying Zs is fundamental
              to ensuring safety in any installation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Earth Fault Loop</p>
              <p className="font-mono text-center text-lg mb-2">Zs = Ze + (R1 + R2)</p>
              <p className="text-xs text-white/70 text-center">Where Ze = external impedance, R1 = line conductor, R2 = CPC</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zs Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Ze:</strong> External earth fault loop impedance (DNO responsibility)</li>
                  <li className="pl-1"><strong>R1:</strong> Line conductor resistance (origin to fault)</li>
                  <li className="pl-1"><strong>R2:</strong> CPC resistance (fault point back to MET)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Current Calculation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>If = Uo / Zs</strong></li>
                  <li className="pl-1">Uo = nominal voltage to earth (230V)</li>
                  <li className="pl-1">Lower Zs = higher fault current = faster disconnection</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Zs Values (Type B MCB, 0.4s Disconnection)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">MCB Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Zs (ohms)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">80% Design Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6A</td>
                      <td className="border border-white/10 px-3 py-2">7.67</td>
                      <td className="border border-white/10 px-3 py-2">6.14</td>
                      <td className="border border-white/10 px-3 py-2">Lighting circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16A</td>
                      <td className="border border-white/10 px-3 py-2">2.87</td>
                      <td className="border border-white/10 px-3 py-2">2.30</td>
                      <td className="border border-white/10 px-3 py-2">Radial power circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">32A</td>
                      <td className="border border-white/10 px-3 py-2">1.37</td>
                      <td className="border border-white/10 px-3 py-2">1.10</td>
                      <td className="border border-white/10 px-3 py-2">Ring finals, showers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">63A</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                      <td className="border border-white/10 px-3 py-2">0.58</td>
                      <td className="border border-white/10 px-3 py-2">Sub-mains, large loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100A</td>
                      <td className="border border-white/10 px-3 py-2">0.46</td>
                      <td className="border border-white/10 px-3 py-2">0.37</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 80% Rule</p>
              <p className="text-sm text-white/90">
                BS 7671 Guidance Note 3 recommends limiting design Zs to 80% of tabulated maximum values.
                This accounts for increased conductor resistance at operating temperature (cables heat up
                during fault conditions) and measurement tolerances.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Verification:</strong> Measured Zs multiplied by 1.2 (temperature correction) must not exceed
              the tabulated maximum for the protective device rating and type.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Protective Device Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protective Device Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In three-phase distribution systems, multiple levels of protection must be coordinated
              to ensure faults are cleared by the nearest upstream device, maintaining supply to
              unaffected circuits. This is known as discrimination or selectivity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Hierarchy</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="mb-2"><strong>Level 1:</strong> Main incomer (MCCB/ACB) - highest rating, longest delay</p>
                <p className="mb-2"><strong>Level 2:</strong> Sub-main protection - intermediate rating and timing</p>
                <p className="mb-2"><strong>Level 3:</strong> Distribution board main switch/MCCB</p>
                <p><strong>Level 4:</strong> Final circuit MCBs/RCBOs - lowest rating, instantaneous</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Current</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device rated higher than downstream</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 2:1 ratio (check selectivity tables)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Time</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device has longer time delay</td>
                      <td className="border border-white/10 px-3 py-2">MCCBs with adjustable trip times</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Energy (I squared t)</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device has higher let-through energy</td>
                      <td className="border border-white/10 px-3 py-2">Current-limiting devices (fuses, MCBs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zone selective</td>
                      <td className="border border-white/10 px-3 py-2">Communication between devices to identify fault zone</td>
                      <td className="border border-white/10 px-3 py-2">Advanced electronic trip units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Back-up Protection</p>
              <p className="text-sm text-white/90 mb-3">
                Where full discrimination cannot be achieved (common with high fault levels), back-up protection
                ensures the upstream device provides protection if the downstream device fails or has insufficient
                breaking capacity. The let-through energy (I squared t) of the upstream device must not exceed the
                withstand capability of downstream equipment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design approach:</strong> Always consult manufacturer selectivity tables. Theoretical
              calculations provide guidance, but confirmed discrimination requires manufacturer verification.
            </p>
          </div>
        </section>

        {/* Section 5: RCDs in Three-Phase Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            RCDs in Three-Phase Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual Current Devices provide additional protection against electric shock and fire.
              In three-phase systems, RCD selection must account for load types, particularly equipment
              generating non-sinusoidal fault currents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Types for Three-Phase Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detects</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type AC</td>
                      <td className="border border-white/10 px-3 py-2">Sinusoidal AC residual current</td>
                      <td className="border border-white/10 px-3 py-2">Resistive loads only (limited use)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type A</td>
                      <td className="border border-white/10 px-3 py-2">AC and pulsating DC</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase rectified loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type F</td>
                      <td className="border border-white/10 px-3 py-2">AC, pulsating DC, composite waveforms</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase VSDs, inverters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type B</td>
                      <td className="border border-white/10 px-3 py-2">AC, pulsating DC, smooth DC</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase VSDs, EV chargers, PV inverters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type S</td>
                      <td className="border border-white/10 px-3 py-2">Time-delayed (40-500ms)</td>
                      <td className="border border-white/10 px-3 py-2">Upstream discrimination with Type A/B</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical: VSD and Inverter Circuits</p>
              <p className="text-sm text-white/90">
                Three-phase variable speed drives (VSDs) and inverters can produce smooth DC fault currents
                that Type AC and Type A RCDs cannot detect. <strong>Type B RCDs are mandatory</strong> for
                circuits supplying three-phase VSDs, battery storage inverters, and DC EV charging equipment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Ratings for Three-Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>30mA:</strong> Additional protection for socket outlets</li>
                  <li className="pl-1"><strong>100mA:</strong> Fire protection, distribution boards</li>
                  <li className="pl-1"><strong>300mA:</strong> Fire protection for distribution circuits</li>
                  <li className="pl-1"><strong>500mA:</strong> Large motor circuits (where permitted)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Discrimination</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Upstream: Type S, 100mA, time-delayed</li>
                  <li className="pl-1">Downstream: Type A/B, 30mA, instantaneous</li>
                  <li className="pl-1">Minimum 2:1 rating ratio</li>
                  <li className="pl-1">Check manufacturer selectivity data</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In TT systems, RCD protection is essential due to high Ze values.
              For TN systems, RCDs provide additional protection beyond automatic disconnection by overcurrent devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: MCCB vs MCB Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            MCCB vs MCB Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting between Moulded Case Circuit Breakers (MCCBs) and Miniature Circuit Breakers (MCBs)
              depends on current rating, fault level, adjustability requirements, and position in the
              distribution hierarchy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB vs MCCB Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MCB</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MCCB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current rating</td>
                      <td className="border border-white/10 px-3 py-2">Up to 125A</td>
                      <td className="border border-white/10 px-3 py-2">Up to 3200A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Up to 25kA (typically 6-10kA)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 150kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trip adjustment</td>
                      <td className="border border-white/10 px-3 py-2">Fixed (Type B, C, D)</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable thermal and magnetic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Physical size</td>
                      <td className="border border-white/10 px-3 py-2">DIN rail modules</td>
                      <td className="border border-white/10 px-3 py-2">Larger, dedicated mounting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical application</td>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">Main/sub-main distribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Trip Unit Settings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ir (thermal):</strong> Adjustable long-time pickup (typically 0.4-1.0 x In)</li>
                <li className="pl-1"><strong>tr (thermal time):</strong> Adjustable long-time delay</li>
                <li className="pl-1"><strong>Im (magnetic):</strong> Adjustable instantaneous pickup (typically 2-10 x Ir)</li>
                <li className="pl-1"><strong>Electronic units:</strong> May include short-time delay and earth fault settings</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use MCCBs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Main incomer protection</li>
                  <li className="pl-1">Sub-main distribution</li>
                  <li className="pl-1">Currents exceeding 125A</li>
                  <li className="pl-1">High fault levels (&gt;10kA)</li>
                  <li className="pl-1">Where discrimination requires adjustable settings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use MCBs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Final circuit protection</li>
                  <li className="pl-1">Currents up to 125A</li>
                  <li className="pl-1">Where fault levels permit (check Icn)</li>
                  <li className="pl-1">Standard Type B/C/D characteristics adequate</li>
                  <li className="pl-1">Space-constrained distribution boards</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Fault level check:</strong> Always verify the prospective fault current (Ipf) at the
              point of installation. The protective device breaking capacity (Icn/Icu) must exceed Ipf.
            </p>
          </div>
        </section>

        {/* Section 7: Discrimination and Selectivity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Discrimination and Selectivity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper discrimination ensures that only the protective device nearest the fault operates,
              maintaining supply to healthy circuits. This is essential for continuity of service in
              commercial and industrial installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Verification</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Time-current curves:</strong> Plot device characteristics to verify no overlap</li>
                <li className="pl-1"><strong>Selectivity tables:</strong> Manufacturer data for confirmed discrimination</li>
                <li className="pl-1"><strong>Let-through energy:</strong> Upstream I squared t must exceed downstream clearing time</li>
                <li className="pl-1"><strong>Software tools:</strong> Manufacturer selection software for complex systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Discrimination Hierarchy</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-1">Main incomer: 400A MCCB (adjustable trip)</p>
                <p className="mb-1">Sub-main: 160A MCCB (adjustable trip)</p>
                <p className="mb-1">Distribution board: 100A MCCB or switch-disconnector</p>
                <p className="mb-1">Final circuits: 32A Type B MCB</p>
                <p className="mt-3 text-white/60">Ratio check: 400:160:100:32 = 2.5:1.6:3.1 (discrimination likely)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Discrimination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High fault currents</td>
                      <td className="border border-white/10 px-3 py-2">Both devices may trip simultaneously</td>
                      <td className="border border-white/10 px-3 py-2">Use MCCBs with adjustable magnetic trip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Similar device types</td>
                      <td className="border border-white/10 px-3 py-2">Similar characteristics reduce selectivity</td>
                      <td className="border border-white/10 px-3 py-2">Increase rating ratio or use different types</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable impedance</td>
                      <td className="border border-white/10 px-3 py-2">Reduces fault current at remote points</td>
                      <td className="border border-white/10 px-3 py-2">May improve discrimination for remote faults</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starting</td>
                      <td className="border border-white/10 px-3 py-2">High inrush may cause nuisance tripping</td>
                      <td className="border border-white/10 px-3 py-2">Type C/D MCBs, time-delayed MCCBs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Total selectivity:</strong> Discrimination maintained up to the maximum fault current
              that can occur. <strong>Partial selectivity:</strong> Discrimination only up to a stated fault level.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 8: Building Services Infrastructure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: MET and Protective Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The main earthing terminal and protective conductor system forms the foundation of electrical
              safety in any building. Proper design and installation ensures fault currents can flow safely
              and all exposed-conductive-parts remain at earth potential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Earthing Terminal (MET) Connections</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earthing conductor:</strong> From DNO earth terminal or earth electrode</li>
                <li className="pl-1"><strong>Main protective bonding:</strong> Gas, water, oil, structural steel</li>
                <li className="pl-1"><strong>Circuit protective conductors:</strong> From all distribution boards</li>
                <li className="pl-1"><strong>Functional earth:</strong> For IT equipment, lightning protection (if required)</li>
                <li className="pl-1"><strong>Supplementary bonding:</strong> Where required by specific locations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Conductor Sizing (Table 54.7)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line Conductor (mm squared)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Earthing Conductor (Cu)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 16</td>
                      <td className="border border-white/10 px-3 py-2">16mm squared</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 16 to 35</td>
                      <td className="border border-white/10 px-3 py-2">16mm squared</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over 35</td>
                      <td className="border border-white/10 px-3 py-2">Half the line conductor size</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Note: Buried earthing conductors require additional protection or larger sizes</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Protective Conductors (CPCs)</p>
              <p className="text-sm text-white/90 mb-3">
                CPCs provide the fault return path for each circuit. They may be separate conductors,
                cable armouring, metallic conduit/trunking (if verified), or a combination.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line up to 16mm squared:</strong> CPC = line size (minimum 1.5mm squared)</li>
                <li className="pl-1"><strong>Line 16-35mm squared:</strong> CPC = 16mm squared</li>
                <li className="pl-1"><strong>Line over 35mm squared:</strong> CPC = half line size</li>
                <li className="pl-1"><strong>Adiabatic check:</strong> S = square root of (I squared t) / k for short fault durations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Distribution Board Earthing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earth bar:</strong> Sized for all outgoing CPCs plus spare capacity</li>
                <li className="pl-1"><strong>Incoming earth:</strong> From upstream MET or distribution board</li>
                <li className="pl-1"><strong>Continuity:</strong> All metalwork bonded to earth bar</li>
                <li className="pl-1"><strong>Labelling:</strong> Safety electrical connection - do not remove</li>
                <li className="pl-1"><strong>Accessibility:</strong> Earth connections must be accessible for inspection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Inspection requirement:</strong> Main earthing and bonding connections must be accessible
              for periodic inspection and testing throughout the life of the installation.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Zs Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 32A Type B MCB protects a radial circuit. Ze = 0.35 ohms, circuit
                length 30m using 4mm squared/1.5mm squared cable. Verify automatic disconnection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From tables: 4mm squared (R1) = 4.61 m ohm per m, 1.5mm squared (R2) = 12.1 m ohm per m</p>
                <p className="mt-2">(R1+R2) = 30 x (4.61 + 12.1) / 1000 = 30 x 16.71 / 1000 = 0.50 ohms</p>
                <p className="mt-2">Zs = Ze + (R1+R2) = 0.35 + 0.50 = <strong>0.85 ohms</strong></p>
                <p className="mt-2">Maximum Zs for 32A Type B at 0.4s = 1.37 ohms</p>
                <p className="mt-2">80% design value = 1.37 x 0.8 = 1.10 ohms</p>
                <p className="mt-2 text-green-400">0.85 ohms &lt; 1.10 ohms - Disconnection achieved</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: TT System RCD Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A TT installation has earth electrode resistance Ra = 150 ohms.
                Determine the maximum RCD rating for 50V touch voltage limit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Touch voltage limit: Ut = 50V (AC)</p>
                <p className="mt-2">Using: Ra x I delta n less than or equal to 50V</p>
                <p>I delta n less than or equal to 50 / Ra = 50 / 150 = <strong>0.33A = 333mA</strong></p>
                <p className="mt-2">Select next lower standard rating: <strong>300mA RCD</strong></p>
                <p className="mt-2 text-white/60">Note: 30mA RCD provides additional protection and wider safety margin</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Main Bonding Conductor Size</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A commercial building has a 100A three-phase supply with 25mm squared
                supply conductors. Determine the minimum main protective bonding conductor size.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Supply neutral: 25mm squared copper</p>
                <p className="mt-2">From BS 7671 Table 54.8:</p>
                <p>For neutral up to 35mm squared, minimum bonding = <strong>10mm squared Cu</strong></p>
                <p className="mt-2">However, earthing conductor (from Table 54.7):</p>
                <p>For 25mm squared line, earthing conductor = 16mm squared</p>
                <p className="mt-2">Bonding must be at least half earthing = 16/2 = 8mm squared</p>
                <p className="mt-2 text-green-400">Use 10mm squared (higher of the two requirements)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Fault Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the prospective fault current at a distribution board
                where Zs = 0.25 ohms on a 400V three-phase supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For single-phase to earth fault (phase to CPC):</p>
                <p>If = Uo / Zs = 230 / 0.25 = <strong>920A</strong></p>
                <p className="mt-2">For phase-to-phase fault (higher current):</p>
                <p>If = (400 x 0.866) / Zs = 346 / 0.25 = <strong>1384A</strong></p>
                <p className="mt-2">For three-phase symmetrical fault:</p>
                <p>If = Uo / Zs = 230 / 0.25 = <strong>920A per phase</strong></p>
                <p className="mt-2 text-white/60">Device breaking capacity must exceed highest prospective fault current</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Zs = Ze + (R1 + R2)</strong> - Earth fault loop impedance</li>
                <li className="pl-1"><strong>If = Uo / Zs</strong> - Fault current calculation</li>
                <li className="pl-1"><strong>Ra x I delta n less than or equal to 50V</strong> - TT system RCD selection</li>
                <li className="pl-1"><strong>S = square root of (I squared t / k)</strong> - Adiabatic equation for conductor sizing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">TN-S typical Ze: <strong>0.8 ohms</strong></li>
                <li className="pl-1">TN-C-S typical Ze: <strong>0.35 ohms</strong></li>
                <li className="pl-1">TT Ze: <strong>21+ ohms</strong> (varies with electrode)</li>
                <li className="pl-1">Touch voltage limit: <strong>50V AC</strong></li>
                <li className="pl-1">Disconnection time (distribution): <strong>0.4s</strong></li>
                <li className="pl-1">Disconnection time (fixed equipment): <strong>5s</strong> (where permitted)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting 80% rule</strong> - Design Zs must not exceed 80% of tabulated maximum</li>
                <li className="pl-1"><strong>Wrong RCD type</strong> - Type B required for three-phase VSDs, not Type A</li>
                <li className="pl-1"><strong>Insufficient bonding</strong> - All extraneous-conductive-parts must be bonded</li>
                <li className="pl-1"><strong>Ignoring selectivity</strong> - Check manufacturer discrimination tables</li>
                <li className="pl-1"><strong>Breaking capacity</strong> - Device Icn/Icu must exceed prospective fault current</li>
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
                <p className="font-medium text-white mb-1">Earthing Systems</p>
                <ul className="space-y-0.5">
                  <li>TN-S - Separate earth, Ze approx 0.8 ohms</li>
                  <li>TN-C-S - PME, Ze approx 0.35 ohms</li>
                  <li>TT - Local electrode, RCD essential</li>
                  <li>Zs = Ze + (R1+R2)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Protection Devices</p>
                <ul className="space-y-0.5">
                  <li>MCB: Up to 125A, fixed characteristics</li>
                  <li>MCCB: Up to 3200A, adjustable trip</li>
                  <li>Type B RCD: Three-phase VSDs</li>
                  <li>Type S RCD: Time-delayed discrimination</li>
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
            <Link to="../h-n-c-module3-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Sizing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-7">
              Next: Harmonics and Power Quality
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_6;
