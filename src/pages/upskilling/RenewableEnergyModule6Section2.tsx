import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Domestic EV Charger Installation - Renewable Energy Module 6";
const DESCRIPTION =
  "Learn the complete process for installing domestic EV chargers including electrical requirements, cable sizing, earthing arrangements, and compliance with BS 7671 and IET guidance.";

const quickCheckQuestions = [
  {
    id: "dom-ev-qc1",
    question: "What is the minimum cable size typically required for a 7.4 kW single-phase EV charger?",
    options: ["4mm²", "6mm²", "10mm²", "16mm²"],
    correctIndex: 1,
    explanation:
      "A 6mm² cable is typically the minimum for a 32A (7.4 kW) EV charger on a short run, though 10mm² may be required for longer cable routes to manage voltage drop.",
  },
  {
    id: "dom-ev-qc2",
    question: "What type of RCD protection is required for EV charging circuits?",
    options: ["Type AC", "Type A", "Type B or Type A with DC protection", "No RCD required"],
    correctIndex: 2,
    explanation:
      "EV chargers can produce DC fault currents that Type A RCDs may not detect. Type B RCDs or Type A with additional DC fault protection (6mA DC detection) are required.",
  },
  {
    id: "dom-ev-qc3",
    question: "What is the maximum permitted voltage drop for an EV charging circuit?",
    options: ["2%", "3%", "4%", "5%"],
    correctIndex: 3,
    explanation:
      "BS 7671 permits a maximum 5% voltage drop from the origin to the load. For a 230V supply, this means no more than 11.5V drop to the EV charger.",
  },
  {
    id: "dom-ev-qc4",
    question: "When is PME earthing not suitable for EV charger installation?",
    options: [
      "When the charger is outdoors",
      "When the vehicle may be connected outdoors",
      "When using a tethered cable",
      "PME is always suitable",
    ],
    correctIndex: 1,
    explanation:
      "PME earthing raises safety concerns when vehicles are connected outdoors due to increased risk of touch voltage in fault conditions. Additional protective measures are required.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What document provides specific guidance for EV charging installation in the UK?",
    options: [
      "BS 7671 only",
      "IET Code of Practice for EV Charging",
      "Part P Building Regulations only",
      "Manufacturer instructions only",
    ],
    correctAnswer: 1,
    explanation:
      "The IET Code of Practice for Electric Vehicle Charging Equipment Installation provides comprehensive guidance supplementing BS 7671 requirements.",
  },
  {
    id: 2,
    question: "What is the typical current rating for a domestic single-phase EV charger?",
    options: ["16A", "20A", "32A", "63A"],
    correctAnswer: 2,
    explanation:
      "Most domestic EV chargers operate at 32A single-phase, providing approximately 7.4 kW charging power - the maximum practical for UK domestic supplies.",
  },
  {
    id: 3,
    question: "Which Building Regulations apply to domestic EV charger installation in England?",
    options: ["Part L only", "Part P only", "Part P and Part S", "No building regulations apply"],
    correctAnswer: 2,
    explanation:
      "Part P covers electrical safety for domestic installations, while Part S (introduced 2022) mandates EV charging infrastructure in new buildings.",
  },
  {
    id: 4,
    question: "What additional protection is required when installing an EV charger outdoors?",
    options: [
      "MCB only",
      "Additional mechanical protection and appropriate IP rating",
      "Type AC RCD",
      "No additional protection",
    ],
    correctAnswer: 1,
    explanation:
      "Outdoor installations require appropriate IP rating (minimum IP54), mechanical protection for cables, and consideration of environmental factors.",
  },
  {
    id: 5,
    question: "What is the purpose of the DNO notification requirement for EV chargers?",
    options: [
      "To obtain permission to install",
      "To ensure grid capacity and manage network loading",
      "To arrange metering",
      "Only required for three-phase installations",
    ],
    correctAnswer: 1,
    explanation:
      "DNO notification helps network operators understand demand patterns and ensure local infrastructure can support increased EV charging loads.",
  },
  {
    id: 6,
    question: "What earth electrode resistance is typically required when using an earth rod for EV charging?",
    options: ["Less than 100Ω", "Less than 200Ω", "Less than 500Ω", "Any value is acceptable"],
    correctAnswer: 1,
    explanation:
      "Where an earth electrode is installed to supplement PME earthing, resistance should typically be below 200Ω to provide effective fault protection.",
  },
  {
    id: 7,
    question: "Which regulation requires smart functionality in new domestic EV chargers?",
    options: [
      "BS 7671",
      "The Electric Vehicles (Smart Charge Points) Regulations 2021",
      "Part P Building Regulations",
      "OZEV grant conditions only",
    ],
    correctAnswer: 1,
    explanation:
      "The Electric Vehicles (Smart Charge Points) Regulations 2021 mandate that all new private charge points must have smart functionality for demand management.",
  },
  {
    id: 8,
    question: "What type of protective device is most suitable for an EV charging radial circuit?",
    options: ["BS 3036 fuse", "Type B MCB", "Type C MCB", "Type D MCB"],
    correctAnswer: 2,
    explanation:
      "Type C MCBs are typically specified for EV charging circuits to handle inrush currents from power electronics while providing appropriate fault protection.",
  },
  {
    id: 9,
    question: "What documentation must be provided after completing an EV charger installation?",
    options: [
      "Invoice only",
      "Electrical Installation Certificate and user instructions",
      "Manufacturer warranty only",
      "Visual inspection report",
    ],
    correctAnswer: 1,
    explanation:
      "An Electrical Installation Certificate (or Minor Works Certificate if appropriate), user instructions, and DNO notification confirmation should all be provided.",
  },
  {
    id: 10,
    question: "What is the recommended minimum distance between an EV charger and a gas meter?",
    options: ["150mm", "300mm", "500mm", "1000mm"],
    correctAnswer: 1,
    explanation:
      "A minimum separation of 300mm is typically recommended between electrical equipment and gas installations, though manufacturer guidance should be followed.",
  },
];

const faqs = [
  {
    question: "Do I need to notify my DNO before installing an EV charger?",
    answer:
      "Yes, DNO notification is required for EV charger installations in the UK. This helps network operators manage local grid capacity. The process is typically simple - most DNOs have online notification forms. For standard 7 kW installations, this is usually just a notification rather than requiring approval.",
  },
  {
    question: "Can I install an EV charger on a TT earthing system?",
    answer:
      "Yes, TT earthing systems are suitable for EV charging. However, you must ensure adequate RCD protection (typically 30mA) and verify the earth electrode provides sufficient fault loop impedance for the protective device to operate within required disconnection times.",
  },
  {
    question: "What cable should I use for an outdoor EV charger installation?",
    answer:
      "SWA (Steel Wire Armoured) cable is typically used for outdoor and underground runs, providing mechanical protection. For surface mounting in conduit, standard cables with appropriate ratings can be used. The cable must be UV resistant if exposed, and buried cables require minimum 500mm cover depth.",
  },
  {
    question: "Is an earth rod required for every EV charger installation?",
    answer:
      "Not always. An earth rod or mat may be required for PME supplies where the vehicle connects outdoors, providing an alternative earth path. The IET Code of Practice provides guidance on when additional earthing measures are needed based on installation location and supply type.",
  },
  {
    question: "What happens if my consumer unit is full?",
    answer:
      "Options include upgrading to a larger consumer unit, installing a separate consumer unit or isolator for the EV circuit, or in some cases using an RCBO in a spare way. The solution depends on the existing installation condition and available space. A full assessment is required.",
  },
  {
    question: "Can an EV charger be installed in a garage?",
    answer:
      "Yes, garage installations are common and often simpler than outdoor locations. Consider ventilation requirements (some vehicles specify this), cable routing, accessibility for the vehicle, and mounting height. Indoor locations avoid some of the additional considerations for outdoor installations.",
  },
];

const RenewableEnergyModule6Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 6 • Section 2</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              EV Charging Infrastructure
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Domestic EV Charger Installation
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Complete guidance for installing home EV charging points to BS 7671 and IET Code of Practice requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Electrical Requirements</h3>
              <p className="text-sm text-white">
                32A circuits, Type B or A+DC RCD protection, appropriate cable sizing, and voltage drop calculations are essential for compliant installations.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Earthing Considerations</h3>
              <p className="text-sm text-white">
                PME supplies require special consideration for outdoor connections. Earth electrodes or protective equipotential bonding may be necessary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Calculate cable sizes and voltage drop for EV circuits",
                "Select appropriate protective devices and RCD types",
                "Understand earthing arrangements for different supply types",
                "Apply IET Code of Practice requirements",
                "Complete DNO notification and documentation",
                "Identify and resolve common installation challenges",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Site Survey and Assessment</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                A thorough site survey is essential before any EV charger installation. This identifies the optimal charger location, assesses the existing electrical installation, and highlights any potential issues.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Electrical Supply Assessment</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Verify supply type (TN-C-S/PME, TN-S, or TT)</li>
                  <li>Check main fuse rating (typically 60A, 80A, or 100A)</li>
                  <li>Assess consumer unit capacity and spare ways</li>
                  <li>Measure existing maximum demand</li>
                  <li>Calculate available capacity for EV charging</li>
                  <li>Test Zs at proposed circuit end location</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Location Assessment</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Determine optimal charger mounting position</li>
                  <li>Measure cable route length to consumer unit</li>
                  <li>Identify cable routing options (surface, buried, through walls)</li>
                  <li>Check proximity to gas/water services</li>
                  <li>Consider vehicle parking position and cable reach</li>
                  <li>Assess environmental exposure (indoor/outdoor)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Existing Installation Condition</h4>
                <p className="mb-2">
                  The existing installation must be safe and suitable. Check consumer unit condition, main earth connection, bonding arrangements, and any obvious defects. If significant issues exist, these should be addressed before or as part of the EV installation.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Circuit Design and Cable Sizing</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Correct circuit design ensures safe operation and complies with BS 7671 requirements. Key considerations include cable current carrying capacity, voltage drop, and fault protection.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Cable Selection Criteria</h4>
                <p className="mb-2">
                  For a typical 32A EV charger, cable selection must consider:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Current carrying capacity (Iz):</strong> Must exceed design current with appropriate correction factors applied</li>
                  <li><strong>Voltage drop:</strong> Maximum 5% (11.5V on 230V supply)</li>
                  <li><strong>Earth fault loop impedance:</strong> Suitable for protective device operation</li>
                  <li><strong>Installation method:</strong> Clipped direct, in conduit, buried, etc.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Typical Cable Sizes</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Run Length</th>
                        <th className="py-2 text-left text-white">Cable Size</th>
                        <th className="py-2 text-left text-white">Voltage Drop</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Up to 18m</td>
                        <td className="py-2">6mm² (clipped)</td>
                        <td className="py-2">Within 5%</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">18-30m</td>
                        <td className="py-2">10mm²</td>
                        <td className="py-2">Within 5%</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">30m+</td>
                        <td className="py-2">16mm² or larger</td>
                        <td className="py-2">Calculate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-sm">
                  Note: These are guidelines only. Always calculate based on actual installation conditions and correction factors.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Voltage Drop Calculation</h4>
                <p className="mb-2">
                  Voltage drop (mV) = (mV/A/m) × Design current × Length
                </p>
                <p className="text-sm">
                  For example, 6mm² cable at 32A over 15m: 7.3 × 32 × 0.015 = 3.5V (1.5%) - acceptable.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Earthing Arrangements</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Earthing for EV charging requires careful consideration, particularly for PME (TN-C-S) supplies where vehicles connect outdoors. The IET Code of Practice provides specific guidance based on supply type and installation location.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">PME Earthing Concerns</h4>
                <p className="mb-2">
                  PME supplies present a risk when vehicles connect outdoors. If the PEN conductor becomes open-circuit, dangerous voltages can appear on exposed metalwork. The IET Code of Practice identifies this risk and provides several protective options:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Option 1:</strong> Install an earth electrode achieving Ra × Ia ≤ 50V</li>
                  <li><strong>Option 2:</strong> Protective equipotential bonding of the installation location</li>
                  <li><strong>Option 3:</strong> Use equipment with protective separation (e.g., double insulated)</li>
                  <li><strong>Option 4:</strong> Install a device that disconnects PME earth if voltage rises</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Earth Electrode Installation</h4>
                <p className="mb-2">
                  Where an earth rod is required, it should be installed to achieve adequate resistance:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Minimum 1.2m earth rod driven into ground</li>
                  <li>Target resistance below 200Ω (lower is better)</li>
                  <li>Test electrode resistance before connection</li>
                  <li>Protect the connection point in an accessible enclosure</li>
                  <li>Label electrode location for future testing</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">TT Supply Installations</h4>
                <p className="mb-2">
                  TT supplies use an independent earth electrode. Key requirements include:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>30mA RCD protection mandatory</li>
                  <li>Earth fault loop impedance must permit RCD operation</li>
                  <li>Ra × Ia ≤ 50V must be achieved</li>
                  <li>Existing earth electrode may be suitable if resistance is adequate</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Protection and Consumer Unit Considerations</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Selecting appropriate protective devices is critical for safety and compliance. EV charging circuits have specific requirements due to the nature of the load and potential for DC fault currents.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Overcurrent Protection</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>MCB type:</strong> Type C recommended for EV circuits (handles inrush)</li>
                  <li><strong>Rating:</strong> 32A for 7.4 kW single-phase chargers</li>
                  <li><strong>Breaking capacity:</strong> Must exceed prospective fault current</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">RCD Protection Requirements</h4>
                <p className="mb-2">
                  EV chargers can produce smooth DC fault currents that standard Type A RCDs may not detect. Options include:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Type B RCD:</strong> Detects AC, pulsating DC, and smooth DC faults</li>
                  <li><strong>Type A with DC detection:</strong> Type A RCD plus 6mA DC fault detection device</li>
                  <li><strong>Charger with built-in DC protection:</strong> Some EVSE includes integrated DC fault detection allowing Type A RCD</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Consumer Unit Options</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Spare way available:</strong> Install RCBO or MCB under existing RCD</li>
                  <li><strong>No spare ways:</strong> Install additional consumer unit or upgrade</li>
                  <li><strong>Dedicated enclosure:</strong> Separate isolator/protection near charger (check cable protection)</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Installation, Testing, and Commissioning</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Proper installation techniques and thorough testing ensure safe, reliable operation. Follow manufacturer instructions alongside BS 7671 requirements.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Physical Installation</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Mount charger at appropriate height (typically 1000-1200mm to sockets)</li>
                  <li>Ensure secure fixing to suitable substrate</li>
                  <li>Maintain clearances from gas meters and other services</li>
                  <li>Route cables with appropriate protection (SWA, conduit, or trunking)</li>
                  <li>Seal cable entries to maintain IP rating</li>
                  <li>Install appropriate gland and termination</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Testing Requirements</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Continuity of protective conductors:</strong> Ring final and radial circuits</li>
                  <li><strong>Insulation resistance:</strong> Minimum 1MΩ at 500V DC</li>
                  <li><strong>Earth fault loop impedance:</strong> Verify Zs meets protective device requirements</li>
                  <li><strong>RCD operation:</strong> Test at rated current and 5× rated</li>
                  <li><strong>Polarity:</strong> Verify correct connections</li>
                  <li><strong>Functional testing:</strong> Verify charger operation with vehicle</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Documentation and Handover</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Complete Electrical Installation Certificate or Minor Works Certificate</li>
                  <li>Submit DNO notification (G98/G99 if applicable)</li>
                  <li>Provide manufacturer operating instructions</li>
                  <li>Demonstrate charger operation to customer</li>
                  <li>Explain maintenance requirements</li>
                  <li>Register product warranty</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Common Installation Challenges</h4>
                  <p className="mt-1 text-sm">
                    Limited consumer unit capacity, long cable runs, and PME earthing with outdoor locations are frequent challenges. Plan solutions during the survey to avoid delays during installation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Load Management Considerations</h4>
                  <p className="mt-1 text-sm">
                    For properties with limited supply capacity, consider dynamic load management that reduces charging power when other loads are high. Many smart chargers support CT clamp integration for automatic load balancing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">OZEV Grant Requirements</h4>
                  <p className="mt-1 text-sm">
                    For grant-funded installations, ensure compliance with scheme requirements including installer registration, approved equipment, and smart functionality. Keep evidence of compliance for audit purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Domestic EV Installation Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-6/section-1">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-6/section-3">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section2;
