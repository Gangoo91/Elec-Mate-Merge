import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control Panel Installation - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm control panel positioning, mounting, terminations and mains connection requirements per BS 5839-1 and BS 7671.";

const quickCheckQuestions = [
  {
    id: "panel-1",
    question: "Why must the fire alarm have a dedicated mains supply circuit rather than sharing with other equipment?",
    options: [
      "To save money on cables",
      "A dedicated circuit prevents the fire alarm being inadvertently disconnected when isolating other equipment",
      "It makes installation faster",
      "The panel uses too much power"
    ],
    correctIndex: 1,
    explanation: "A dedicated circuit prevents the fire alarm being inadvertently disconnected when isolating other equipment. It also ensures the circuit is correctly labelled and that maintenance personnel understand its critical function."
  },
  {
    id: "panel-2",
    question: "A Category L1 system in a building without ARC monitoring requires what battery standby period?",
    options: [
      "12 hours standby",
      "24 hours standby plus 30 minutes alarm",
      "72 hours standby",
      "No standby required"
    ],
    correctIndex: 1,
    explanation: "For a Category L system, BS 5839-1 requires 24 hours standby plus 30 minutes alarm period. Without ARC monitoring, 72 hours may be required for P systems, but L systems typically require 24 hours minimum."
  },
  {
    id: "panel-3",
    question: "Why should loop circuits be disconnected before initial panel power-up?",
    options: [
      "To save battery power",
      "Disconnecting loops allows verification of panel power-up without field wiring faults masking panel issues",
      "Loops are not needed initially",
      "To reduce noise"
    ],
    correctIndex: 1,
    explanation: "Disconnecting loops allows you to verify the panel powers up correctly without field wiring faults masking panel issues. It also prevents unexpected activations if any device is incorrectly wired or faulty."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 5839-1, at what height should a fire alarm control panel be mounted?",
    options: [
      "Any convenient height",
      "Between 0.8m and 1.7m to the operating controls",
      "Above 2m for security",
      "Below 0.5m for accessibility"
    ],
    correctAnswer: 1,
    explanation: "BS 5839-1 recommends that operating controls should be between 0.8m and 1.7m above floor level for accessibility and ease of operation."
  },
  {
    id: 2,
    question: "What is the minimum fire resistance period for the location where a fire alarm control panel is installed?",
    options: [
      "No requirement",
      "30 minutes fire resistance",
      "Same as escape routes - typically 30 or 60 minutes",
      "120 minutes"
    ],
    correctAnswer: 2,
    explanation: "The CIE should be located in an area with appropriate fire resistance, typically matching escape route requirements to ensure the panel remains accessible during a fire event."
  },
  {
    id: 3,
    question: "What type of mains supply is required for a fire alarm control panel?",
    options: [
      "Any available socket outlet",
      "Dedicated circuit with double-pole isolation clearly labelled",
      "Shared circuit with emergency lighting",
      "Temporary builder supply"
    ],
    correctAnswer: 1,
    explanation: "A dedicated supply with double-pole isolation is required to prevent inadvertent disconnection and ensure the fire alarm can be safely isolated for maintenance."
  },
  {
    id: 4,
    question: "Where should the mains isolator for a fire alarm panel be located?",
    options: [
      "In the main distribution board only",
      "Adjacent to the panel or within the panel enclosure",
      "In the building entrance",
      "In a locked cupboard"
    ],
    correctAnswer: 1,
    explanation: "The isolator should be adjacent to the panel or within the enclosure for safe working and clear identification of the supply being controlled."
  },
  {
    id: 5,
    question: "What earth arrangement is typically required for fire alarm control panels?",
    options: [
      "No earth required for SELV systems",
      "Protective earth via supply cable and functional earth if specified",
      "Earth rod only",
      "Building structural steel"
    ],
    correctAnswer: 1,
    explanation: "Protective earth is provided via the supply cable. Some panels also require a functional earth for EMC purposes as specified by the manufacturer."
  },
  {
    id: 6,
    question: "What cable entry method should be used for fire alarm control panels?",
    options: [
      "Any convenient knockout",
      "Through glands appropriate to cable type and environmental conditions",
      "Direct through holes without glands",
      "Via flexible conduit only"
    ],
    correctAnswer: 1,
    explanation: "Cables should enter through appropriate glands matched to the cable type to maintain ingress protection and provide strain relief."
  },
  {
    id: 7,
    question: "What documentation must be displayed at or adjacent to a fire alarm control panel?",
    options: [
      "Installer contact details only",
      "Zone plan, operating instructions and building name",
      "Warranty certificate only",
      "No documentation required"
    ],
    correctAnswer: 1,
    explanation: "BS 5839-1 requires a zone plan/chart to be displayed adjacent to the CIE showing detector/call point locations. Operating instructions should also be available."
  },
  {
    id: 8,
    question: "When installing battery backup, what should be verified?",
    options: [
      "Battery colour matches panel",
      "Capacity meets standby and alarm load requirements with margin",
      "Batteries are fully discharged",
      "Any 12V battery will work"
    ],
    correctAnswer: 1,
    explanation: "Battery capacity must be calculated to provide the required standby period (typically 24-72 hours) plus alarm period (typically 30 minutes) with appropriate margin."
  },
  {
    id: 9,
    question: "What is the purpose of a dedicated fire alarm distribution board?",
    options: [
      "To save money on installation",
      "To provide monitored supplies for ancillary equipment",
      "It is never required",
      "For aesthetic purposes only"
    ],
    correctAnswer: 1,
    explanation: "A dedicated distribution board provides monitored, protected supplies for door holders, interfaces and other ancillary fire safety equipment."
  },
  {
    id: 10,
    question: "What testing should be performed immediately after panel installation and power-up?",
    options: [
      "Full cause and effect testing",
      "Basic functionality, mains/battery changeover and fault indication",
      "Sound level measurements only",
      "No testing required until commissioning"
    ],
    correctAnswer: 1,
    explanation: "Initial power-up tests verify basic panel operation, mains-to-battery changeover, fault indication and communication with any connected devices."
  }
];

const faqs = [
  {
    question: "Can a fire alarm panel be installed in a cupboard?",
    answer: "Only if the cupboard provides adequate ventilation, is fire-protected, remains accessible 24/7, and the panel display remains visible. Generally not recommended."
  },
  {
    question: "What if the building has no suitable ground floor location?",
    answer: "Repeater panels or remote display units can be installed at ground floor entrance with the main CIE in a more practical location. Document the reasoning."
  },
  {
    question: "How often should batteries be replaced?",
    answer: "Typically every 3-5 years depending on manufacturer guidance, environmental conditions and battery type. Date-label batteries and include in maintenance schedule."
  },
  {
    question: "Can I share containment with other services?",
    answer: "Fire alarm cables should ideally have dedicated containment. If sharing, segregation requirements of BS 7671 must be met and fire-rating maintained."
  },
  {
    question: "What if the panel location changes during construction?",
    answer: "Raise a formal change request, update drawings, verify the new location meets BS 5839-1 requirements, and obtain client/consultant approval before relocating."
  },
  {
    question: "Do I need a functional earth as well as protective earth?",
    answer: "Some panels require a functional earth for EMC purposes. Check manufacturer documentation - this may be separate from the protective earth connection."
  }
];

const FireAlarmModule5Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-course/module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control Panel Installation
          </h1>
          <p className="text-white/80">
            Panel positioning, mounting, terminations and mains connection requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Location:</strong> Accessible, fire-protected and visible to building occupants and fire service</li>
              <li><strong>Mains supply:</strong> Dedicated circuit, double-pole isolation and clear labelling per BS 7671</li>
              <li><strong>Batteries:</strong> Correctly sized for standby and alarm periods with documented calculations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Height:</strong> Controls between 0.8m and 1.7m above floor</li>
              <li><strong>Protection:</strong> Appropriate fire resistance for location</li>
              <li><strong>Documentation:</strong> Zone plan displayed adjacent to panel</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate locations for fire alarm control panels",
              "Install panels at correct height with secure fixings",
              "Connect mains supply with proper isolation and protection",
              "Size and install battery backup systems correctly",
              "Terminate field wiring using correct techniques",
              "Complete initial power-up testing and verification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Panel Location Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The fire alarm control and indicating equipment (CIE) location is critical for system effectiveness. BS 5839-1 provides clear guidance on positioning requirements.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Location Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ground floor entrance or fire service access point preferred</li>
                <li>Protected from fire with appropriate compartmentation</li>
                <li>Continuously staffed location or monitored via remote signalling</li>
                <li>Accessible 24/7 without requiring keys from elsewhere</li>
                <li>Away from sources of interference, moisture or extreme temperatures</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">Consider fire service access - panels near the main entrance allow rapid assessment of alarm location and system status.</p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mounting Height & Fixings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Panels must be mounted at a height that allows comfortable operation while remaining secure and protected.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Height Requirements per BS 5839-1:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Operating controls between 0.8m and 1.7m above floor level</li>
                <li>Display visible without bending or stretching</li>
                <li>Consider wheelchair accessibility where required</li>
                <li>Allow adequate space for door opening and maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fixing Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fixings appropriate to wall construction (masonry, stud, etc.)</li>
                <li>Minimum 4 fixing points for larger enclosures</li>
                <li>Consider weight including batteries when fully loaded</li>
                <li>Anti-tamper fixings in unsupervised areas if required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mains Supply Connection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The mains supply must comply with both BS 5839-1 and BS 7671. A dedicated circuit ensures the fire alarm cannot be inadvertently disconnected.</p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supply Requirements</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Dedicated circuit from distribution board</li>
                  <li>Double-pole isolation</li>
                  <li>Clearly labelled "FIRE ALARM - DO NOT SWITCH OFF"</li>
                  <li>Protected by appropriate overcurrent device</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Specification</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Fire-resistant if passing through fire zones</li>
                  <li>Minimum 1.5mm² for typical installations</li>
                  <li>Volt drop within limits at full load</li>
                  <li>Protected from mechanical damage</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white"><strong>Important:</strong> The mains isolator must be clearly labelled and accessible. Consider lock-off provisions to prevent accidental disconnection during building works.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Battery Installation & Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Standby batteries provide essential backup power when mains fails. Correct sizing ensures the system remains operational throughout any power outage.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Battery Sizing per BS 5839-1:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category L systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li><strong>Category P systems:</strong> 72 hours standby + 30 minutes alarm (if no monitoring)</li>
                <li><strong>With ARC monitoring:</strong> 24 hours standby typically acceptable</li>
                <li><strong>Add 25% margin</strong> for battery ageing and temperature effects</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Best Practice:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install batteries in panel or adjacent secure enclosure</li>
                <li>Use fused connections as per manufacturer requirements</li>
                <li>Label with installation date for replacement tracking</li>
                <li>Verify charger output matches battery specification</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Field Wiring Terminations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Correct termination of field wiring ensures reliable system operation. Poor terminations are a leading cause of system faults.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Termination Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use correct ferrules or bootlace crimps for stranded cable</li>
                <li>Tighten to manufacturer's specified torque</li>
                <li>Maintain correct polarity throughout</li>
                <li>Screen/drain wires terminated per EMC guidance</li>
                <li>Adequate service loop for future maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Entry:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use appropriate glands for cable type</li>
                <li>Maintain enclosure IP rating</li>
                <li>Provide strain relief on all cables</li>
                <li>Blank unused entries</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Initial Power-Up & Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Before connecting field devices, perform basic panel verification to ensure the CIE is functioning correctly.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Power Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify mains voltage at isolator</li>
                <li>Check all internal connections secure</li>
                <li>Confirm battery polarity before connecting</li>
                <li>Disconnect loop circuits for initial power-up</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Initial Power-Up Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Panel powers up without errors</li>
                <li>Display and indicators functioning</li>
                <li>Mains/battery changeover operates</li>
                <li>Battery charging correctly</li>
                <li>Open circuit faults indicated on loops</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">Document all initial test results. Any faults should be investigated and resolved before connecting field wiring.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install panel backbox first, then complete all cabling before fitting the panel chassis</li>
                <li>Label all cables at the panel end before termination - saves time and prevents errors</li>
                <li>Take photographs of terminations before closing up for maintenance reference</li>
                <li>Keep spare fuses and a configuration backup in the panel enclosure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing panel too high</strong> — makes operation difficult and non-compliant</li>
                <li><strong>Using undersized batteries without proper calculation documentation</strong> — risk of system failure</li>
                <li><strong>Not labelling the mains isolator clearly</strong> — leads to accidental disconnection</li>
                <li><strong>Failing to verify charger output matches battery voltage and chemistry</strong> — battery damage</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
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

export default FireAlarmModule5Section2;
