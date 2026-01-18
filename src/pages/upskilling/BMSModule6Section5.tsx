import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Integration with Fire Panels and Emergency Shutdowns - BMS Module 6 Section 5";
const DESCRIPTION = "Learn about safety system integration for life-critical emergency response in Building Management Systems.";

const quickCheckQuestions = [
  {
    id: "bms6-5-qc1",
    question: "Why must AHUs and fans be shut down during a fire alarm event?",
    options: [
      "To save energy during emergencies",
      "To prevent the ventilation system from circulating smoke throughout the building",
      "To reduce noise levels for evacuation announcements",
      "To protect the equipment from damage"
    ],
    correctIndex: 1,
    explanation: "AHUs and fans must be shut down to prevent the ventilation system from circulating smoke throughout the building, which could make evacuation routes impassable and spread fire/smoke to unaffected areas."
  },
  {
    id: "bms6-5-qc2",
    question: "What type of signal is typically used by a fire panel to trigger BMS responses?",
    options: [
      "Analogue voltage signals (0-10V)",
      "Digital contact signals (dry contacts)",
      "Wireless radio frequency signals",
      "Infrared signals"
    ],
    correctIndex: 1,
    explanation: "Digital contact signals (dry contacts) are typically used. These are simple volt-free contacts that open or close to indicate alarm activation, providing a reliable and fail-safe interface."
  },
  {
    id: "bms6-5-qc3",
    question: "Give one example of a non-fire event that would require a BMS emergency shutdown.",
    options: [
      "Routine maintenance schedule",
      "Energy-saving mode activation",
      "Gas leak detection requiring shutdown of boilers and ignition sources",
      "Staff holiday period"
    ],
    correctIndex: 2,
    explanation: "Gas leak detection would require immediate BMS shutdown of boilers, gas supply valves, and ignition sources to prevent explosion risk. Other examples include electrical faults, high pressure trips, or major water leaks."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why must BMS integrate with fire panels?",
    options: [
      "To improve energy efficiency during normal operation",
      "To perform critical shutdowns and actions that protect life safety",
      "To reduce the cost of separate fire alarm systems",
      "To simplify building maintenance schedules"
    ],
    correctAnswer: 1,
    explanation: "BMS must integrate with fire panels to perform critical shutdowns including AHU shutdown, smoke extract activation, and access door release that protect occupants during emergencies."
  },
  {
    id: 2,
    question: "What happens to access control doors during a fire alarm?",
    options: [
      "They lock to prevent unauthorised access",
      "They remain unchanged",
      "They unlock to enable rapid evacuation",
      "They close slowly to contain the fire"
    ],
    correctAnswer: 2,
    explanation: "Fire alarm signals unlock all exit doors and turnstiles to enable rapid evacuation without access cards, ensuring occupants can escape quickly."
  },
  {
    id: 3,
    question: "What is the purpose of fail-safe wiring design?",
    options: [
      "To reduce installation costs",
      "To ensure broken circuits still generate a fire signal rather than failing silently",
      "To simplify troubleshooting",
      "To allow remote testing"
    ],
    correctAnswer: 1,
    explanation: "Fail-safe (normally-closed) wiring ensures that if a wire breaks or connection fails, the system assumes an alarm condition rather than failing silently, maintaining safety integrity."
  },
  {
    id: 4,
    question: "Which standard specifies requirements for smoke and heat control systems?",
    options: [
      "BS 7671",
      "BS EN 12101",
      "BS 5839",
      "Building Regulations Part L"
    ],
    correctAnswer: 1,
    explanation: "BS EN 12101 covers smoke and heat control systems, specifying requirements for powered smoke control systems and natural smoke exhaust ventilators essential for BMS integration."
  },
  {
    id: 5,
    question: "What type of cables should be used for critical fire system connections?",
    options: [
      "Standard PVC cables",
      "Fire-rated cables (PH30, PH60, or PH120)",
      "Armoured data cables",
      "Flexible mains cables"
    ],
    correctAnswer: 1,
    explanation: "Fire-rated cables (PH30, PH60, or PH120 rated) must be used for critical fire system connections to maintain circuit integrity during emergency situations."
  },
  {
    id: 6,
    question: "What is the minimum recommended separation between fire cables and power cables?",
    options: [
      "100mm",
      "200mm",
      "300mm",
      "500mm"
    ],
    correctAnswer: 2,
    explanation: "A minimum 300mm separation from power cables using separate containment systems is required to prevent interference and maintain signal integrity."
  },
  {
    id: 7,
    question: "Who should be involved in joint sign-off of fire-BMS integration?",
    options: [
      "Only the BMS contractor",
      "Only the building owner",
      "Fire safety authorities, building control, and end users",
      "Only the electrical contractor"
    ],
    correctAnswer: 2,
    explanation: "Joint testing should always be carried out with fire safety authorities, building control, and end users, with all tests documented with witnessed signatures."
  },
  {
    id: 8,
    question: "What should happen if the BMS fails during a fire alarm?",
    options: [
      "All building systems should shut down completely",
      "Critical safety functions should have independent backup systems",
      "Manual intervention is always required",
      "The fire alarm should also be disabled"
    ],
    correctAnswer: 1,
    explanation: "Critical safety functions like door release should have independent backup systems. Fire dampers should fail to their safe position, and plant shutdowns should be hardwired where possible."
  },
  {
    id: 9,
    question: "How often should fire-BMS integration be tested?",
    options: [
      "Only during initial commissioning",
      "Every five years",
      "Annually and after any modifications to either system",
      "Only when problems occur"
    ],
    correctAnswer: 2,
    explanation: "Fire-BMS integration should be tested during initial commissioning, annually as part of fire system maintenance, after any modifications to either system, and following any building alterations."
  },
  {
    id: 10,
    question: "What should fire panel relay contacts be rated for?",
    options: [
      "The minimum expected load",
      "The full load current plus appropriate safety margins",
      "Standard domestic loads only",
      "The same rating as lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "Relay contacts must be properly rated to handle the full load current of controlled equipment plus appropriate safety margins to prevent failure during emergency conditions."
  }
];

const faqs = [
  {
    question: "What happens if fire cabling is damaged during normal operation?",
    answer: "If properly wired using fail-safe (normally-closed) contacts, damaged fire cabling will trigger an alarm condition, alerting operators to the fault and maintaining safety integrity. The system fails to a safe state rather than failing silently."
  },
  {
    question: "Can BMS override fire panel commands during an emergency?",
    answer: "No, fire panel commands must have ultimate priority. BMS systems should be designed so fire signals cannot be overridden by normal building control logic. Emergency override takes precedence over all other functions."
  },
  {
    question: "How often should fire-BMS integration be tested?",
    answer: "Fire-BMS integration should be tested during initial commissioning, annually as part of fire system maintenance, after any modifications to either system, and following any building alterations that affect fire safety systems."
  },
  {
    question: "What documentation is required for fire-BMS connections?",
    answer: "Complete wiring diagrams, input/output schedules, testing certificates, operation manuals, and as-built drawings must be provided to building owners and fire authorities. This documentation is legally required in most jurisdictions."
  },
  {
    question: "Who can work on fire-BMS integration systems?",
    answer: "Only qualified electricians with appropriate fire system training should work on these connections. Many jurisdictions require specific certifications for fire system work, and some connections must be witnessed by fire authorities."
  },
  {
    question: "What happens if the BMS fails during a fire alarm?",
    answer: "Critical safety functions like door release should have independent backup systems. Fire dampers should fail to their safe position (typically closed for fire dampers, open for smoke dampers), and plant shutdowns should be hardwired where possible."
  }
];

const BMSModule6Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integration with Fire Panels and Emergency Shutdowns
          </h1>
          <p className="text-white/80">
            Safety system integration for life-critical emergency response
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>What:</strong> BMS integration with fire alarm and emergency systems</li>
              <li><strong>Why:</strong> Safety takes precedence - automated protective responses</li>
              <li><strong>Critical:</strong> Miswired interlocks can be life-threatening</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Fire-rated cables, emergency labelling, fail-safe contacts</li>
              <li><strong>Use:</strong> NC wiring, proper segregation, joint commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why BMS and fire panels must be integrated",
              "Describe the key shutdown actions triggered during a fire alarm",
              "Recognise the electrician's responsibilities in wiring interlocks",
              "Apply best practices for installation and labelling",
              "Understand testing and commissioning requirements",
              "Know the relevant UK regulatory standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Integration Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Integration Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In an emergency, safety always takes precedence over efficiency or comfort. That is why a Building Management System (BMS) must integrate seamlessly with fire panels and emergency shutdown systems. When a fire alarm is triggered, the BMS must instantly override normal operation, shutting down equipment that could spread smoke and unlocking exit routes.
            </p>
            <p>
              For electricians, this integration is safety-critical. If alarm inputs, relays, or interlocks are miswired, doors may stay locked during a fire, or ventilation systems may continue circulating smoke - both potentially life-threatening failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire panels need the BMS to act on their signals:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Ventilation Control:</strong> AHUs and fans must shut down to prevent smoke spread through the building's ventilation system</li>
                <li><strong className="text-elec-yellow">Smoke Control:</strong> Smoke extract fans and dampers must activate to clear escape routes and maintain safe egress paths</li>
                <li><strong className="text-elec-yellow">Access Control:</strong> Fire alarm signals unlock all exit doors and turnstiles to enable rapid evacuation without access cards</li>
                <li><strong className="text-elec-yellow">Plant Shutdown:</strong> Boilers, chillers, and gas supplies may be isolated to reduce fire hazards and prevent fuel sources</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fire-BMS Interface Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Typical Fire-BMS Interfaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the different types of connections between fire panels and BMS is essential for correct installation and troubleshooting.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Interface Types:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Digital Inputs:</strong> Fire panel provides a contact signal to BMS (alarm activated). These are typically volt-free contacts that close or open on alarm activation</li>
                <li><strong className="text-elec-yellow">Relays/Interlocks:</strong> BMS relays cut power to AHUs, dampers, or plant equipment. These must be rated for the loads they control and fire-rated where required</li>
                <li><strong className="text-elec-yellow">Override Logic:</strong> BMS software forces emergency mode, ignoring normal schedules or setpoints. This ensures safety takes priority over comfort or efficiency</li>
                <li><strong className="text-elec-yellow">Feedback to Fire Panel:</strong> BMS may report back status (e.g., fan stopped, damper open) to confirm actions have been completed successfully</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Emergency Shutdowns Beyond Fire */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Emergency Shutdowns Beyond Fire
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BMS emergency shutdowns are not limited to fire alarms. Other critical situations require immediate response to protect both people and equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Other Emergency Triggers:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Gas Leaks:</strong> Gas detection systems trigger BMS shutdown of boilers, ignition sources, and gas supply valves. Ventilation may be activated to disperse gas safely</li>
                <li><strong className="text-elec-yellow">Electrical Faults:</strong> Overcurrent or earth fault relays trip plant to prevent damage or fire risk. Arc fault detection can trigger immediate isolation</li>
                <li><strong className="text-elec-yellow">Critical Plant Safety:</strong> High pressure/temperature trips isolate boilers, chillers, or pumps, protecting equipment and preventing catastrophic failures</li>
                <li><strong className="text-elec-yellow">Water System Failures:</strong> Major water leaks can trigger pump shutdowns and isolation valve closure to prevent flooding and electrical hazards</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Point</p>
              <p className="text-sm text-white">These shutdowns protect both people and equipment, often preventing minor incidents from becoming major emergencies.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Installation Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Installation Guidance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installing Fire-BMS Interlocks:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Use Fail-Safe Design:</strong> Normally-closed (NC) wiring ensures broken circuits still generate a fire signal. If a wire breaks or connection fails, the system assumes an alarm condition rather than failing silently</li>
                <li><strong className="text-elec-yellow">Segregate Cabling:</strong> Run fire alarm wiring separately from standard BMS cabling. Use fire-rated cables in dedicated conduits or cable trays to maintain integrity during emergencies</li>
                <li><strong className="text-elec-yellow">Use Approved Interfaces:</strong> Only use fire-rated relays and interfaces tested for life-safety applications. Check compliance with BS EN 12101 and other relevant safety standards</li>
                <li><strong className="text-elec-yellow">Clear Labelling:</strong> Identify fire-related cabling and relays distinctly from standard controls. Use red labels or cable markers stating "FIRE SYSTEM - DO NOT DISCONNECT"</li>
                <li><strong className="text-elec-yellow">Document Everything:</strong> Provide detailed drawings showing every fire-to-BMS link for clients and fire officers. Include cable schedules, relay contact details, and testing procedures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Retail Complex Fire Integration Failure</p>
              <p className="text-sm text-white mb-3">
                <strong>The Problem:</strong> During commissioning at a large retail complex, fire tests revealed a critical safety failure. When the fire alarm was activated in multiple zones, several Air Handling Units (AHUs) continued running at full speed, potentially circulating smoke throughout the building.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>Investigation:</strong> Electricians systematically traced the fire panel connections and discovered that the fire panel's relay outputs had been wired into the wrong BMS input terminals. The signals were reaching the BMS, but being interpreted as normal operational commands rather than emergency shutdowns.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>The Solution:</strong> After careful rewiring to the correct emergency input terminals and updating the BMS software logic, comprehensive re-testing confirmed all AHUs correctly shut down within seconds of fire alarm activation. Door release systems also operated correctly.
              </p>
              <p className="text-sm text-white">
                <strong>Key Lessons:</strong> Miswired interlocks can directly compromise life safety. Complete system testing is essential before handover. Clear labelling and documentation prevent installation errors. Emergency systems must be tested under realistic conditions. Joint commissioning with fire authorities catches critical issues.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Emergency Shutdowns</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Simulate alarm conditions using test buttons or simulation modes</li>
                <li>Test all alarm zones and types (smoke, heat, manual call points)</li>
                <li>Verify BMS response - confirm AHUs shut down, dampers operate correctly</li>
                <li>Test feedback systems to ensure fire panel receives confirmation signals</li>
                <li>Carry out joint sign-off with fire safety authorities and building control</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">UK Regulatory Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS EN 12101:</strong> Smoke and heat control systems</li>
                <li><strong>Building Regulations Approved Document B:</strong> Fire safety design</li>
                <li><strong>BS 5839:</strong> Fire detection and alarm systems</li>
                <li><strong>BS 7671:</strong> 18th Edition Wiring Regulations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire panel outputs typically 24V DC - check BMS input compatibility</li>
                <li>Use fire-rated cables (PH30, PH60, or PH120 rated)</li>
                <li>Maintain minimum 300mm separation from power cables</li>
                <li>Relay contacts must handle full load current plus safety margins</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wiring to standard terminals</strong> - connect to emergency terminals only</li>
                <li><strong>Undersized relay contacts</strong> - can fail under load conditions</li>
                <li><strong>Non-fire-rated cables</strong> - degrade during emergency situations</li>
                <li><strong>Missing documentation</strong> - legally required in most jurisdictions</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Event Triggers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6-section-6">
              Next: Remote Monitoring
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section5;
