import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Checking for Compliance with Design and Regulations - Level 3 Module 5 Section 2.2";
const DESCRIPTION = "Verifying installation compliance with design specifications and BS 7671 regulations during inspection.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is it important to have access to design documentation during inspection?",
    options: [
      "To verify the client paid for the work",
      "To confirm the installation matches the intended design",
      "To calculate the contractor's profit",
      "Only for insurance purposes"
    ],
    correctIndex: 1,
    explanation: "Design documentation shows what was intended - cable sizes, protective device ratings, circuit arrangements. Without it, you cannot verify whether the installation matches the design or was changed without assessment."
  },
  {
    id: "check-2",
    question: "What should be checked regarding protective device selection?",
    options: [
      "Only the brand name",
      "That the type and rating matches the circuit requirements and design",
      "That all devices are the same colour",
      "Only the physical size"
    ],
    correctIndex: 1,
    explanation: "Protective device verification includes checking the type (MCB, RCBO, fuse), rating (amperage), breaking capacity (kA), and characteristics (Type B, C, D) match the circuit design and BS 7671 requirements."
  },
  {
    id: "check-3",
    question: "During inspection, you find a cable installed differently to the design. What should you do?",
    options: [
      "Ignore it if it works",
      "Assess whether the change is acceptable and document the finding",
      "Automatically fail the installation",
      "Change the design documentation to match"
    ],
    correctIndex: 1,
    explanation: "Departures from design require assessment. The change may be acceptable if it still meets BS 7671 requirements, but it must be documented. If the change creates a non-compliance or danger, it must be rectified."
  },
  {
    id: "check-4",
    question: "What is discrimination in relation to protective devices?",
    options: [
      "Selecting devices based on appearance",
      "Ensuring only the device nearest the fault operates during a fault",
      "Using different brands of devices",
      "Installing devices at different heights"
    ],
    correctIndex: 1,
    explanation: "Discrimination (selectivity) means that during a fault, only the protective device nearest the fault should operate, leaving other circuits unaffected. This is important for safety-critical circuits like fire alarms and emergency lighting."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Regulation 611.1 requires verification that equipment:",
    options: [
      "Is the cheapest available",
      "Complies with BS EN standards and is correctly selected and erected",
      "Is painted to match the decor",
      "Has the longest warranty"
    ],
    correctAnswer: 1,
    explanation: "Regulation 611.1 requires verification that equipment complies with applicable British or Harmonised Standards and has been correctly selected and erected in accordance with BS 7671."
  },
  {
    id: 2,
    question: "What must be verified regarding cable current-carrying capacity?",
    options: [
      "That it matches the cable colour",
      "That it is adequate for the design current with all relevant factors applied",
      "That all cables are the same size",
      "Only the length of the cable"
    ],
    correctAnswer: 1,
    explanation: "Cable current-carrying capacity must be adequate for the design current (Ib) with correction factors applied for grouping, thermal insulation, ambient temperature, and installation method. This is part of compliance verification."
  },
  {
    id: 3,
    question: "When checking compliance, what determines if a circuit protective device is correct?",
    options: [
      "Personal preference",
      "It must meet the Ib ≤ In ≤ Iz relationship and provide required protection",
      "It must be from an approved supplier",
      "The device colour"
    ],
    correctAnswer: 1,
    explanation: "The fundamental protective device relationship is: design current (Ib) must not exceed device rating (In), which must not exceed cable current-carrying capacity (Iz). Additionally, the device must provide protection within required disconnection times."
  },
  {
    id: 4,
    question: "What does the inspector need to verify regarding RCD protection?",
    options: [
      "Only that an RCD is present",
      "Correct sensitivity, type, and coverage as required by BS 7671",
      "The RCD manufacturer",
      "Only the physical location"
    ],
    correctAnswer: 1,
    explanation: "RCD verification includes correct sensitivity (typically 30mA for additional protection), correct type (Type A, AC, B, F as appropriate), and correct coverage (all socket circuits up to 32A, etc. per BS 7671 requirements)."
  },
  {
    id: 5,
    question: "During inspection, what documentation should be available for reference?",
    options: [
      "Only the client's contact details",
      "Design documents, calculations, BS 7671, and manufacturer instructions",
      "Previous quotes from other contractors",
      "Only the electrical certificate"
    ],
    correctAnswer: 1,
    explanation: "Proper inspection requires access to design documentation, any calculations performed, BS 7671 (or working knowledge thereof), and manufacturer installation instructions for specific equipment."
  },
  {
    id: 6,
    question: "How should compliance with maximum disconnection times be verified?",
    options: [
      "By visual inspection only",
      "By confirming Zs values and protective device characteristics meet requirements",
      "By asking the installer",
      "Disconnection times cannot be verified"
    ],
    correctAnswer: 1,
    explanation: "Maximum disconnection time compliance is verified by confirming the measured or calculated Zs values are below the maximum values in BS 7671 tables for the protective device, ensuring the required fault current will flow."
  },
  {
    id: 7,
    question: "What must be checked regarding earthing arrangements to verify compliance?",
    options: [
      "Earth wire colour only",
      "Correct earthing system type, adequate conductor sizes, and proper connections",
      "That earthing is optional",
      "Only the earth electrode"
    ],
    correctAnswer: 1,
    explanation: "Earthing compliance verification includes: correct earthing system identification (TN-C-S, TN-S, TT), adequate earthing conductor size, proper connection to the MET, and adequate main bonding conductors where required."
  },
  {
    id: 8,
    question: "When verifying compliance for socket outlet circuits, what BS 7671 requirements apply?",
    options: [
      "No specific requirements for sockets",
      "30mA RCD protection for sockets up to 32A, and additional protection requirements",
      "Only voltage requirements",
      "Only the socket colour"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires 30mA RCD protection for socket outlet circuits up to 32A (Regulation 411.3.3). Additional requirements apply for socket height in accessible locations, shutters for child protection, and IP rating for location."
  },
  {
    id: 9,
    question: "What should be verified regarding cable installation methods?",
    options: [
      "Only that cables are hidden",
      "That the method matches the design and any derating factors are correctly applied",
      "Cable colour matching",
      "That all cables follow the same route"
    ],
    correctAnswer: 1,
    explanation: "Cable installation method affects current-carrying capacity. Verification must confirm the actual installation method matches the design assumptions and any grouping, thermal insulation, or other derating factors are correctly applied."
  },
  {
    id: 10,
    question: "How should departures from BS 7671 be handled during compliance checking?",
    options: [
      "All departures are automatically unacceptable",
      "Departures must be justified, documented, and achieve equivalent safety",
      "Departures are always acceptable if the client agrees",
      "Departures cannot be made"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 120.3 permits departures provided they result in a degree of safety not less than that obtained by compliance. Such departures must be documented with justification and may require designer's approval."
  }
];

const faqs = [
  {
    question: "What if no design documentation is available for the inspection?",
    answer: "For initial verification of new work, design documentation should exist. If not available, this is itself a non-compliance. For periodic inspection of existing installations, you assess against current BS 7671 where relevant and the standards applicable when installed."
  },
  {
    question: "How do I verify compliance when I didn't design the installation?",
    answer: "Review available documentation, check calculations if provided, and verify the installed work matches the design. Your inspection confirms the installation matches the design; the designer takes responsibility for the design being correct."
  },
  {
    question: "What if the installation complies with regulations but not the design?",
    answer: "Document the departure. If the installed arrangement is compliant with BS 7671 and safe, it may be acceptable but should be recorded. The designer should be informed if the design was changed during installation."
  },
  {
    question: "How do I check compliance for older installations built to earlier standards?",
    answer: "Existing installations need not comply with current standards unless the non-compliance creates a danger. During periodic inspection, you note where installations do not meet current standards but only classify as defects items that are actually dangerous."
  },
  {
    question: "What are the key compliance points for special locations?",
    answer: "Special locations (Part 7 of BS 7671) have additional requirements. For example, bathrooms have zone restrictions and IP rating requirements. Swimming pools require SELV. Always check Part 7 for any special locations in the installation."
  }
];

const Level3Module5Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Checking for Compliance with Design and Regulations
          </h1>
          <p className="text-white/80">
            Verifying installation compliance with design specifications and BS 7671
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Design match:</strong> Installation matches design documents</li>
              <li><strong>BS 7671:</strong> Complies with current regulations</li>
              <li><strong>Calculations:</strong> Verify protective device and cable sizing</li>
              <li><strong>Document:</strong> Record any departures or concerns</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Departures from design or regulations</li>
              <li><strong>Use:</strong> BS 7671 tables and requirements</li>
              <li><strong>Apply:</strong> Protective device coordination rules</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How to verify installation matches design",
              "Key BS 7671 compliance checkpoints",
              "Protective device coordination verification",
              "Cable sizing compliance checking",
              "RCD requirements and verification",
              "Handling departures from standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Verifying Design Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The installation must match the design. If design documents exist, the inspector must verify that what has been installed corresponds to what was designed. Changes made during installation without proper assessment can create hazards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key design compliance checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable sizes:</strong> Match design specifications and calculations</li>
                <li><strong>Protective devices:</strong> Type, rating, and characteristics as designed</li>
                <li><strong>Circuit arrangements:</strong> Number and configuration of circuits</li>
                <li><strong>Routing:</strong> Cables follow designed routes or safe zones</li>
                <li><strong>Equipment locations:</strong> Items installed where designed</li>
                <li><strong>Special requirements:</strong> Any design-specific features implemented</li>
              </ul>
            </div>

            <p>
              Where no formal design documentation exists (common in smaller installations), the installer is assumed to have designed the installation. In this case, compliance checking focuses on verifying the installation meets BS 7671 requirements directly.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you find the installation differs from the design, assess whether the change is acceptable. If it is not, it must be corrected before certification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protective Device Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective devices are critical safety components. During compliance checking, verify that each device is correctly selected for its circuit and meets all BS 7671 requirements for protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB/RCBO Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rating (In) ≥ design current (Ib)</li>
                  <li>Rating (In) ≤ cable capacity (Iz)</li>
                  <li>Type (B, C, D) appropriate for load</li>
                  <li>Breaking capacity ≥ prospective fault current</li>
                  <li>Correct for Zs and disconnection time</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD/RCCB Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sensitivity correct (30mA for additional protection)</li>
                  <li>Type appropriate (A, AC, B, F)</li>
                  <li>Rating adequate for downstream load</li>
                  <li>Coverage as required by BS 7671</li>
                  <li>Time delayed where required for discrimination</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 32A ring circuit with 2.5mm² cable requires: MCB rating between design current and 32A, Type B for general loads, minimum 6kA breaking capacity typically, and 30mA RCD protection per Regulation 411.3.3.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Sizing Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing must account for all relevant factors. During compliance checking, verify that installed cables are adequate for the load, installation conditions, and fault protection requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable sizing verification includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current rating:</strong> Adequate for design current with correction factors</li>
                <li><strong>Voltage drop:</strong> Within permitted limits (typically 3% lighting, 5% other)</li>
                <li><strong>Fault current:</strong> Can withstand let-through energy during faults</li>
                <li><strong>Installation method:</strong> Matches assumptions in sizing calculation</li>
                <li><strong>Grouping:</strong> Correction applied if cables grouped</li>
                <li><strong>Thermal insulation:</strong> Derating applied if applicable</li>
              </ul>
            </div>

            <p>
              For existing installations without calculations, assess whether cable sizes appear reasonable for the loads connected. Significantly undersized cables will show signs of overheating or require further investigation through calculation.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A cable that has been correctly sized may become undersized if additional loads are added or installation conditions change (e.g., adding thermal insulation).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Special Location Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part 7 of BS 7671 contains additional requirements for special installations and locations. These requirements are in addition to, or modify, the general requirements. Compliance checking must identify special locations and verify the additional requirements are met.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Bathrooms (701)</p>
                <p className="text-white/90 text-xs">Zone restrictions, IP ratings, RCD protection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Swimming Pools (702)</p>
                <p className="text-white/90 text-xs">SELV required in zones, specific IP ratings</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Solar PV (712)</p>
                <p className="text-white/90 text-xs">DC isolation, labelling, fire safety</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When checking special locations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify all special locations in the installation</li>
                <li>Reference the relevant Part 7 section</li>
                <li>Check each additional requirement is satisfied</li>
                <li>Verify modifications to general requirements are implemented</li>
                <li>Document compliance with special location requirements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> In a bathroom, verify: no socket outlets in zones 0, 1, or 2; equipment in zone 1 minimum IPX4; supplementary bonding provided where required; RCD protection for all circuits; SELV or Class II equipment only in zones 0 and 1.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Compliance Checking</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain all available design documentation before starting</li>
                <li>Work through BS 7671 requirements systematically</li>
                <li>Check each circuit against design and regulations</li>
                <li>Verify protective device coordination throughout</li>
                <li>Document any departures with reasons</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Regulations to Reference</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Chapter 41 - Protection against electric shock requirements</li>
                <li>Chapter 43 - Protection against overcurrent</li>
                <li>Section 433 - Protection against overload</li>
                <li>Section 434 - Protection against fault current</li>
                <li>Section 411 - Automatic disconnection of supply</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Issues</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing RCD protection</strong> - Socket circuits up to 32A require 30mA RCD</li>
                <li><strong>Incorrect cable sizing</strong> - Especially after adding thermal insulation</li>
                <li><strong>Wrong MCB type</strong> - Type C used where Type B required</li>
                <li><strong>Special locations ignored</strong> - Bathroom or outdoor requirements not met</li>
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
                <p className="font-medium text-white mb-1">Protective Device Formula</p>
                <ul className="space-y-0.5">
                  <li>Ib ≤ In ≤ Iz</li>
                  <li>Ib = Design current</li>
                  <li>In = Device rating</li>
                  <li>Iz = Cable capacity</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common RCD Requirements</p>
                <ul className="space-y-0.5">
                  <li>Sockets up to 32A = 30mA RCD</li>
                  <li>Cables in walls &lt;50mm = 30mA RCD</li>
                  <li>Outdoor equipment = 30mA RCD</li>
                  <li>Additional protection = 30mA Type A/AC</li>
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
            <Link to="../level3-module5-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Visual Inspection
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section2-3">
              Next: Non-compliances and Defects
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section2_2;
