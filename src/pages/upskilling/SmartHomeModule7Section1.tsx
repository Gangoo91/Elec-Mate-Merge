import { ArrowLeft, ArrowRight, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Device Wiring, Power Supplies, and Containment";
const DESCRIPTION = "Professional installation practices for safe, reliable, and compliant smart home electrical systems covering wiring methods, power supply requirements, and proper containment techniques.";

const quickCheckQuestions = [
  {
    question: "What is the minimum cable rating typically required for smart device circuits?",
    options: ["0.5mm²", "1.0mm²", "1.5mm²", "2.5mm²"],
    correctIndex: 2,
    explanation: "Most smart device circuits require a minimum of 1.5mm² cable to handle the load safely and comply with BS 7671 requirements."
  },
  {
    question: "Why do many smart switches require a neutral wire at the switch position?",
    options: ["For earth bonding", "To power the internal electronics", "To increase switching speed", "For dimming capability"],
    correctIndex: 1,
    explanation: "Smart switches contain microprocessors and wireless modules that require continuous power from the neutral conductor to operate their internal electronics."
  },
  {
    question: "What type of containment is recommended for smart home data cables running alongside mains wiring?",
    options: ["Same trunking compartment", "Separate compartments or segregated trunking", "No containment needed", "Metal conduit only"],
    correctIndex: 1,
    explanation: "Data cables must be segregated from mains wiring using separate compartments or trunking to prevent electromagnetic interference and comply with regulations."
  }
];

const quizQuestions = [
  {
    question: "When installing a smart dimmer switch, what must you verify about the existing wiring?",
    options: [
      "Only that live and switched live are present",
      "That neutral is available at the switch position",
      "That the circuit uses armoured cable",
      "That the cable is surface mounted"
    ],
    correctIndex: 1,
    explanation: "Smart dimmers require a neutral connection to power their internal electronics. Many older installations only have live and switched live at the switch position, requiring rewiring."
  },
  {
    question: "What is the purpose of using a 12V DC power supply for smart devices instead of direct mains connection?",
    options: [
      "To save electricity",
      "Extra-low voltage for safety and device compatibility",
      "To increase transmission distance",
      "Required by the device warranty only"
    ],
    correctIndex: 1,
    explanation: "12V DC provides extra-low voltage operation for safety and is the standard operating voltage for many smart sensors, LED controllers, and other devices."
  },
  {
    question: "According to BS 7671, what separation is required between mains cables and Category 5e/6 data cables?",
    options: [
      "No separation required",
      "50mm minimum or physical barrier",
      "300mm minimum",
      "They can share the same containment"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires either 50mm minimum separation or a physical barrier between mains and data cables to prevent electromagnetic interference."
  },
  {
    question: "What consideration is essential when selecting containment for smart home installations in bathrooms?",
    options: [
      "Aesthetic colour matching",
      "IP rating appropriate for the zone",
      "Largest available size",
      "Metal construction only"
    ],
    correctIndex: 1,
    explanation: "Bathroom zones have specific IP rating requirements. Containment and equipment must have appropriate IP ratings for their location to ensure safety."
  },
  {
    question: "When planning cable routes for a smart home installation, what factor most affects future expandability?",
    options: [
      "Using the cheapest cable available",
      "Installing spare capacity and accessible junction points",
      "Minimising the number of cables",
      "Using wireless devices only"
    ],
    correctIndex: 1,
    explanation: "Installing spare capacity (larger trunking, spare cables, accessible junction boxes) allows for easy system expansion without major disruption."
  }
];

const faqs = [
  {
    question: "Do all smart switches require a neutral wire?",
    answer: "Not all, but most do. Some manufacturers produce 'no-neutral' smart switches that work with a small current through the load, but these have limitations including minimum load requirements and potential compatibility issues with LED lighting. Where possible, installing a neutral at switch positions is the preferred professional approach."
  },
  {
    question: "Can I use existing surface-mounted mini trunking for smart home cables?",
    answer: "Existing trunking can often be used if it has sufficient capacity and appropriate compartmentalisation. However, you must ensure mains and data cables are properly segregated, and the trunking is suitable for the environment (IP rating, fire resistance where required)."
  },
  {
    question: "What power supply type is best for smart LED lighting installations?",
    answer: "Constant voltage LED drivers (typically 12V or 24V DC) are most common for smart LED strip installations. Choose drivers with sufficient wattage headroom (typically 20% above calculated load), appropriate IP rating for the location, and compatibility with your chosen smart controller."
  }
];

const SmartHomeModule7Section1 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 7`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 1 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Wrench className="h-10 w-10 text-elec-yellow" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {TITLE}
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            {DESCRIPTION}
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Installation Standard</h3>
            <p className="text-white text-sm">BS 7671 18th Edition compliance for all electrical work</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Key Focus</h3>
            <p className="text-white text-sm">Proper wiring practices for reliable smart device operation</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Understand wiring requirements for smart devices including neutral provision",
              "Select appropriate power supplies for different smart home applications",
              "Apply correct cable containment and segregation practices",
              "Ensure installations comply with BS 7671 and manufacturer requirements"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Smart Device Wiring Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Device Wiring Requirements
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart devices have specific wiring requirements that differ from traditional electrical
              installations. Understanding these requirements is essential for reliable operation and
              compliance with regulations.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Neutral Wire Requirement</h4>
              <p className="text-white">
                Most smart switches and dimmers require a neutral conductor at the switch position.
                This powers the internal microprocessor and wireless communication module. Older
                installations often lack neutral at switch positions, requiring cable upgrades.
              </p>
            </div>
            <h4 className="font-semibold text-white">Cable Specifications for Smart Circuits</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Lighting circuits: minimum 1.5mm² with neutral provision</li>
              <li>Socket circuits with smart plugs: standard 2.5mm² ring or radial</li>
              <li>Dedicated smart device circuits: sized for specific load requirements</li>
              <li>Low voltage data cables: Category 5e/6 for wired network connections</li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Power Supply Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Supply Selection and Installation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Many smart home devices operate on extra-low voltage (ELV), typically 5V, 12V, or 24V DC.
              Selecting and installing appropriate power supplies is critical for system reliability.
            </p>
            <h4 className="font-semibold text-white">Power Supply Types</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Plug-In Adapters</h5>
                <p className="text-white text-sm">
                  Suitable for individual devices. Choose quality units with appropriate safety
                  certifications (CE, UKCA). Consider aesthetics and socket availability.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">DIN Rail Mounted Supplies</h5>
                <p className="text-white text-sm">
                  Professional option for centralised installations. Mount in consumer unit or
                  dedicated enclosure. Provides clean, stable power for multiple devices.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">LED Drivers</h5>
                <p className="text-white text-sm">
                  Constant voltage (CV) or constant current (CC) depending on LED type.
                  Size with 20% headroom. Consider IP rating for location requirements.
                </p>
              </div>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Installation Considerations</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Ensure adequate ventilation for heat dissipation</li>
                <li>Protect from moisture according to location requirements</li>
                <li>Maintain accessibility for maintenance and replacement</li>
                <li>Label clearly with output voltage and connected devices</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Containment and Segregation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Containment and Cable Segregation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart home installations typically involve both mains voltage wiring and low-voltage
              data cables. Proper containment and segregation prevents interference and ensures
              compliance with BS 7671.
            </p>
            <h4 className="font-semibold text-white">Segregation Requirements</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Maintain minimum 50mm separation between mains and data cables, or use physical barrier</li>
              <li>Use compartmentalised trunking where cables must run together</li>
              <li>Cross mains and data cables at 90 degrees where crossing is unavoidable</li>
              <li>Ensure ELV circuits are separated from SELV circuits appropriately</li>
            </ul>
            <h4 className="font-semibold text-white">Containment Options</h4>
            <div className="grid gap-3">
              <div className="flex gap-3">
                <span className="font-medium text-elec-yellow min-w-[140px]">Mini Trunking:</span>
                <span className="text-white">Surface-mounted, good for retrofit. Choose compartmentalised types.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-elec-yellow min-w-[140px]">Dado Trunking:</span>
                <span className="text-white">Multiple compartments for power, data, and AV. Professional finish.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-elec-yellow min-w-[140px]">Conduit:</span>
                <span className="text-white">Concealed installations. Separate runs for mains and data.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-elec-yellow min-w-[140px]">Floor Boxes:</span>
                <span className="text-white">Central room positions. Combined power and data outlets.</span>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* BS 7671 Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            BS 7671 Compliance Considerations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              All electrical work for smart home installations must comply with BS 7671. Key
              considerations specific to smart device installations include:
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Circuit Protection</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>RCD protection for all circuits (30mA for socket outlets)</li>
                <li>Appropriate MCB rating for cable and load</li>
                <li>Consider RCBO protection for critical smart home circuits</li>
                <li>SPD protection recommended for sensitive electronics</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Special Location Requirements</h4>
            <p>
              When installing smart devices in bathrooms, kitchens, or outdoor areas, ensure compliance
              with the relevant special location requirements in Part 7 of BS 7671. This includes IP
              ratings, zone restrictions, and supplementary bonding requirements.
            </p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h5 className="font-medium text-elec-yellow mb-2">Documentation Requirements</h5>
              <p className="text-white text-sm">
                Issue appropriate electrical installation certificates (EIC) or minor works
                certificates as required. Include smart device specifications in the schedule
                of items tested.
              </p>
            </div>
          </div>
        </section>

        {/* Future Proofing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Future Proofing Installations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart home technology evolves rapidly. Professional installations should accommodate
              future expansion and technology changes.
            </p>
            <h4 className="font-semibold text-white">Planning for Expansion</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Install larger containment than immediately required (50% spare capacity typical)</li>
              <li>Provide spare ways in consumer units for additional circuits</li>
              <li>Include draw wires in conduit runs for future cable installation</li>
              <li>Position junction boxes and access points at strategic locations</li>
              <li>Install Cat 6a or higher data cabling for future bandwidth requirements</li>
            </ul>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Documentation for Future Reference</h4>
              <p className="text-white">
                Create detailed as-built drawings showing cable routes, containment locations, and
                device positions. This documentation is invaluable for future maintenance,
                troubleshooting, and system expansion.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              Next: Commissioning and Device Pairing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section1;
