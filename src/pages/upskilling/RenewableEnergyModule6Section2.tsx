import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Domestic EV Charger Installation - Renewable Energy Module 6 Section 2";
const DESCRIPTION = "Learn the complete process for installing domestic EV chargers including electrical requirements, cable sizing, earthing arrangements, and compliance with BS 7671 and IET guidance.";

const quickCheckQuestions = [
  {
    id: "dom-ev-qc1",
    question: "What is the minimum cable size typically required for a 7.4 kW single-phase EV charger?",
    options: ["4mm²", "6mm²", "10mm²", "16mm²"],
    correctIndex: 1,
    explanation: "A 6mm² cable is typically the minimum for a 32A (7.4 kW) EV charger on a short run, though 10mm² may be required for longer cable routes to manage voltage drop."
  },
  {
    id: "dom-ev-qc2",
    question: "What type of RCD protection is required for EV charging circuits?",
    options: ["Type AC", "Type A", "Type B or Type A with DC protection", "No RCD required"],
    correctIndex: 2,
    explanation: "EV chargers can produce DC fault currents that Type A RCDs may not detect. Type B RCDs or Type A with additional DC fault protection (6mA DC detection) are required."
  },
  {
    id: "dom-ev-qc3",
    question: "When is PME earthing not suitable for EV charger installation?",
    options: ["When the charger is indoors", "When the vehicle may be connected outdoors", "When using a tethered cable", "PME is always suitable"],
    correctIndex: 1,
    explanation: "PME earthing raises safety concerns when vehicles connect outdoors due to increased risk of touch voltage in fault conditions. Additional protective measures are required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document provides specific guidance for EV charging installation in the UK?",
    options: ["BS 7671 only", "IET Code of Practice for EV Charging", "Part P Building Regulations only", "Manufacturer instructions only"],
    correctAnswer: 1,
    explanation: "The IET Code of Practice for Electric Vehicle Charging Equipment Installation provides comprehensive guidance supplementing BS 7671 requirements."
  },
  {
    id: 2,
    question: "What is the typical current rating for a domestic single-phase EV charger?",
    options: ["16A", "20A", "32A", "63A"],
    correctAnswer: 2,
    explanation: "Most domestic EV chargers operate at 32A single-phase, providing approximately 7.4 kW charging power - the maximum practical for UK domestic supplies."
  },
  {
    id: 3,
    question: "Which Building Regulations apply to domestic EV charger installation in England?",
    options: ["Part L only", "Part P only", "Part P and Part S", "No building regulations apply"],
    correctAnswer: 2,
    explanation: "Part P covers electrical safety for domestic installations, while Part S (introduced 2022) mandates EV charging infrastructure in new buildings."
  },
  {
    id: 4,
    question: "What additional protection is required when installing an EV charger outdoors?",
    options: ["MCB only", "Additional mechanical protection and appropriate IP rating", "Type AC RCD", "No additional protection"],
    correctAnswer: 1,
    explanation: "Outdoor installations require appropriate IP rating (minimum IP54), mechanical protection for cables, and consideration of environmental factors."
  },
  {
    id: 5,
    question: "What is the purpose of the DNO notification requirement for EV chargers?",
    options: ["To obtain permission to install", "To ensure grid capacity and manage network loading", "To arrange metering", "Only required for three-phase installations"],
    correctAnswer: 1,
    explanation: "DNO notification helps network operators understand demand patterns and ensure local infrastructure can support increased EV charging loads."
  },
  {
    id: 6,
    question: "What earth electrode resistance is typically required when using an earth rod for EV charging?",
    options: ["Less than 100Ω", "Less than 200Ω", "Less than 500Ω", "Any value is acceptable"],
    correctAnswer: 1,
    explanation: "Where an earth electrode is installed to supplement PME earthing, resistance should typically be below 200Ω to provide effective fault protection."
  },
  {
    id: 7,
    question: "Which regulation requires smart functionality in new domestic EV chargers?",
    options: ["BS 7671", "The Electric Vehicles (Smart Charge Points) Regulations 2021", "Part P Building Regulations", "OZEV grant conditions only"],
    correctAnswer: 1,
    explanation: "The Electric Vehicles (Smart Charge Points) Regulations 2021 mandate that all new private charge points must have smart functionality for demand management."
  },
  {
    id: 8,
    question: "What type of protective device is most suitable for an EV charging radial circuit?",
    options: ["BS 3036 fuse", "Type B MCB", "Type C MCB", "Type D MCB"],
    correctAnswer: 2,
    explanation: "Type C MCBs are typically specified for EV charging circuits to handle inrush currents from power electronics while providing appropriate fault protection."
  },
  {
    id: 9,
    question: "What documentation must be provided after completing an EV charger installation?",
    options: ["Invoice only", "Electrical Installation Certificate and user instructions", "Manufacturer warranty only", "Visual inspection report"],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (or Minor Works Certificate if appropriate), user instructions, and DNO notification confirmation should all be provided."
  },
  {
    id: 10,
    question: "What is the maximum permitted voltage drop for an EV charging circuit?",
    options: ["2%", "3%", "4%", "5%"],
    correctAnswer: 3,
    explanation: "BS 7671 permits a maximum 5% voltage drop from the origin to the load. For a 230V supply, this means no more than 11.5V drop to the EV charger."
  }
];

const faqs = [
  {
    question: "Do I need to notify my DNO before installing an EV charger?",
    answer: "Yes, DNO notification is required for EV charger installations in the UK. This helps network operators manage local grid capacity. The process is typically simple - most DNOs have online notification forms. For standard 7 kW installations, this is usually just a notification rather than requiring approval."
  },
  {
    question: "Can I install an EV charger on a TT earthing system?",
    answer: "Yes, TT earthing systems are suitable for EV charging. However, you must ensure adequate RCD protection (typically 30mA) and verify the earth electrode provides sufficient fault loop impedance for the protective device to operate within required disconnection times."
  },
  {
    question: "What cable should I use for an outdoor EV charger installation?",
    answer: "SWA (Steel Wire Armoured) cable is typically used for outdoor and underground runs, providing mechanical protection. For surface mounting in conduit, standard cables with appropriate ratings can be used. The cable must be UV resistant if exposed, and buried cables require minimum 500mm cover depth."
  },
  {
    question: "Is an earth rod required for every EV charger installation?",
    answer: "Not always. An earth rod or mat may be required for PME supplies where the vehicle connects outdoors, providing an alternative earth path. The IET Code of Practice provides guidance on when additional earthing measures are needed based on installation location and supply type."
  },
  {
    question: "What happens if my consumer unit is full?",
    answer: "Options include upgrading to a larger consumer unit, installing a separate consumer unit or isolator for the EV circuit, or in some cases using an RCBO in a spare way. The solution depends on the existing installation condition and available space. A full assessment is required."
  },
  {
    question: "Can an EV charger be installed in a garage?",
    answer: "Yes, garage installations are common and often simpler than outdoor locations. Consider ventilation requirements (some vehicles specify this), cable routing, accessibility for the vehicle, and mounting height. Indoor locations avoid some of the additional considerations for outdoor installations."
  }
];

const RenewableEnergyModule6Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Domestic EV Charger Installation
          </h1>
          <p className="text-white/80">
            Circuit Design, Earthing &amp; Compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cable:</strong> 6mm² minimum for 32A, check voltage drop</li>
              <li><strong>Protection:</strong> Type B RCD or Type A + DC detection</li>
              <li><strong>Earthing:</strong> PME outdoors requires additional measures</li>
              <li><strong>Compliance:</strong> BS 7671, IET CoP, DNO notification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Supply type, capacity limits, cable route options</li>
              <li><strong>Use:</strong> Site survey checklist, voltage drop calculations</li>
              <li><strong>Apply:</strong> Design compliant circuits for each installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate cable sizes and voltage drop for EV circuits",
              "Select appropriate protective devices and RCD types",
              "Understand earthing arrangements for different supply types",
              "Apply IET Code of Practice requirements",
              "Complete DNO notification and documentation",
              "Identify and resolve common installation challenges"
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

        {/* Section 1: Site Survey and Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Site Survey and Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A thorough site survey is essential before any EV charger installation. This identifies the optimal charger location, assesses the existing electrical installation, and highlights any potential issues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Supply Assessment</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify supply type (TN-C-S/PME, TN-S, or TT)</li>
                <li>Check main fuse rating (typically 60A, 80A, or 100A)</li>
                <li>Assess consumer unit capacity and spare ways</li>
                <li>Measure existing maximum demand</li>
                <li>Test Zs at proposed circuit end location</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Location Assessment</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Determine optimal charger mounting position</li>
                <li>Measure cable route length to consumer unit</li>
                <li>Identify cable routing options (surface, buried, through walls)</li>
                <li>Check proximity to gas/water services</li>
                <li>Assess environmental exposure (indoor/outdoor)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Circuit Design and Cable Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Circuit Design and Cable Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct circuit design ensures safe operation and complies with BS 7671 requirements. Key considerations include cable current carrying capacity, voltage drop, and fault protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection Criteria</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current carrying capacity (Iz):</strong> Must exceed design current with correction factors</li>
                <li><strong>Voltage drop:</strong> Maximum 5% (11.5V on 230V supply)</li>
                <li><strong>Earth fault loop impedance:</strong> Suitable for protective device operation</li>
                <li><strong>Installation method:</strong> Clipped direct, in conduit, buried, etc.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Cable Sizes for 32A EV Charger:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Up to 18m: 6mm² (clipped direct)</li>
                <li>18-30m: 10mm²</li>
                <li>30m+: 16mm² or larger - always calculate</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium">
                Voltage Drop Formula: mV/A/m × Design current × Length = Voltage drop (mV)
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Earthing Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earthing Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earthing for EV charging requires careful consideration, particularly for PME (TN-C-S) supplies where vehicles connect outdoors. The IET Code of Practice provides specific guidance based on supply type and installation location.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Earthing Concerns</p>
              <p className="text-sm text-white mb-2">
                PME supplies present a risk when vehicles connect outdoors. If the PEN conductor becomes open-circuit, dangerous voltages can appear on exposed metalwork. Options include:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Option 1:</strong> Install earth electrode achieving Ra × Ia ≤ 50V</li>
                <li><strong>Option 2:</strong> Protective equipotential bonding of installation location</li>
                <li><strong>Option 3:</strong> Use equipment with protective separation</li>
                <li><strong>Option 4:</strong> Install device that disconnects PME earth if voltage rises</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Electrode Installation</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Minimum 1.2m earth rod driven into ground</li>
                <li>Target resistance below 200Ω (lower is better)</li>
                <li>Test electrode resistance before connection</li>
                <li>Protect connection point in accessible enclosure</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Protection and Consumer Unit */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protection and Consumer Unit Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting appropriate protective devices is critical for safety and compliance. EV charging circuits have specific requirements due to the nature of the load and potential for DC fault currents.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overcurrent Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>MCB type: Type C recommended</li>
                  <li>Rating: 32A for 7.4 kW chargers</li>
                  <li>Breaking capacity: Must exceed PFC</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Protection Options</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type B RCD: Detects AC, pulsating and smooth DC</li>
                  <li>Type A + 6mA DC detection device</li>
                  <li>Charger with built-in DC protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Installation, Testing and Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Installation, Testing and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper installation techniques and thorough testing ensure safe, reliable operation. Follow manufacturer instructions alongside BS 7671 requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Continuity of protective conductors</li>
                <li>Insulation resistance: Minimum 1MΩ at 500V DC</li>
                <li>Earth fault loop impedance (Zs)</li>
                <li>RCD operation at rated and 5× rated current</li>
                <li>Polarity verification</li>
                <li>Functional testing with vehicle</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation and Handover</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete Electrical Installation Certificate</li>
                <li>Submit DNO notification (G98/G99 if applicable)</li>
                <li>Provide manufacturer operating instructions</li>
                <li>Demonstrate charger operation to customer</li>
                <li>Register product warranty</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Surveying</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always photograph the consumer unit and main fuse</li>
                <li>Record Ze and PFC readings</li>
                <li>Note any existing defects requiring attention</li>
                <li>Measure and record proposed cable route</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mount charger at appropriate height (1000-1200mm)</li>
                <li>Maintain clearances from gas meters (300mm minimum)</li>
                <li>Seal cable entries to maintain IP rating</li>
                <li>Use appropriate glands for SWA termination</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersized cables</strong> - always calculate voltage drop</li>
                <li><strong>Wrong RCD type</strong> - ensure DC fault protection</li>
                <li><strong>Ignoring PME issues</strong> - check outdoor connection risks</li>
                <li><strong>Missing DNO notification</strong> - always notify</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default RenewableEnergyModule6Section2;
