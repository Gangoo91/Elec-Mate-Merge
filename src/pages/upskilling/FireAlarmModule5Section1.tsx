import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pre-Installation Planning - Fire Alarm Course";
const DESCRIPTION = "Learn about site surveys, coordination with other trades, health & safety requirements and logistics planning for fire alarm installations per BS 5839-1.";

const quickCheckQuestions = [
  {
    id: "pre-install-1",
    question: "Why is coordination with ceiling contractors particularly important for fire alarm installation?",
    options: [
      "To ensure matching paint colours",
      "Detector bases must be installed at first fix before ceiling tiles are fitted",
      "To share storage space on site",
      "To coordinate lunch breaks"
    ],
    correctIndex: 1,
    explanation: "Detector bases must be installed at first fix before ceiling tiles are fitted. If timing is missed, significant rework is required to access ceiling voids. Access panels must also be positioned to allow future maintenance access."
  },
  {
    id: "pre-install-2",
    question: "You need to install fire alarm equipment in an operational hospital. What additional planning considerations apply?",
    options: [
      "None - treat it like any other building",
      "Hospital work requires infection control protocols, restricted access, and coordination with ward managers",
      "Only work at night",
      "Install temporary systems first"
    ],
    correctIndex: 1,
    explanation: "Hospital work requires infection control protocols, restricted access to clinical areas, coordination with ward managers, out-of-hours working in sensitive areas, special permit systems and longer notification periods."
  },
  {
    id: "pre-install-3",
    question: "Why should fire alarm cable deliveries be phased rather than delivered all at once?",
    options: [
      "To spread payments over time",
      "Phased deliveries reduce storage space requirements and minimise damage from repeated handling",
      "To keep delivery drivers busy",
      "To avoid traffic congestion"
    ],
    correctIndex: 1,
    explanation: "Phased deliveries reduce storage space requirements, minimise damage from repeated handling, reduce theft risk, improve cash flow and ensure materials arrive when actually needed rather than sitting unused."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a pre-installation site survey?",
    options: [
      "To estimate material costs only",
      "To verify design assumptions and identify site-specific challenges",
      "To meet insurance requirements",
      "To train the installation team"
    ],
    correctAnswer: 1,
    explanation: "Site surveys verify that design assumptions are correct and identify any site-specific challenges that may affect installation methods or timescales."
  },
  {
    id: 2,
    question: "Which document should be reviewed before commencing any fire alarm installation?",
    options: [
      "Building insurance certificate",
      "Fire alarm system design and cause & effect matrix",
      "Tenant contact details",
      "Previous utility bills"
    ],
    correctAnswer: 1,
    explanation: "The fire alarm design documentation and cause & effect matrix must be reviewed to understand system requirements, device locations and integration requirements."
  },
  {
    id: 3,
    question: "What minimum notice should typically be given to building occupants before disruptive installation work?",
    options: [
      "24 hours",
      "48-72 hours depending on building type",
      "1 week",
      "No notice required"
    ],
    correctAnswer: 1,
    explanation: "Typically 48-72 hours notice is appropriate, though this varies by building type and occupancy. Care homes and hospitals may require longer notice periods."
  },
  {
    id: 4,
    question: "Who is responsible for ensuring adequate first aid provision on a fire alarm installation project?",
    options: [
      "The building owner",
      "The principal contractor or installing company",
      "Local emergency services",
      "Individual installers"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor or installing company must ensure adequate first aid provision, trained first aiders and appropriate equipment are available on site."
  },
  {
    id: 5,
    question: "What should be established before drilling into walls or ceilings on site?",
    options: [
      "Paint colour",
      "Presence of asbestos, services and structural elements",
      "Building age only",
      "Room temperature"
    ],
    correctAnswer: 1,
    explanation: "Before drilling, installers must establish the presence of asbestos, hidden services (electrical, gas, water) and structural elements to avoid hazards and damage."
  },
  {
    id: 6,
    question: "What is a method statement in the context of fire alarm installation?",
    options: [
      "A list of materials required",
      "A document describing how work will be carried out safely",
      "A financial quotation",
      "A warranty certificate"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes the sequence of work and how it will be carried out safely, identifying hazards and control measures for each task."
  },
  {
    id: 7,
    question: "When should cable delivery be scheduled on a multi-storey installation?",
    options: [
      "All at the start of the project",
      "Phased to match installation progress and available storage",
      "Only when containment is complete throughout",
      "After all devices are installed"
    ],
    correctAnswer: 1,
    explanation: "Cable deliveries should be phased to match installation progress, considering available secure storage and the practicalities of distributing materials to work areas."
  },
  {
    id: 8,
    question: "What coordination is required with mechanical services contractors?",
    options: [
      "None - fire alarm is independent",
      "Duct detector positions, damper interfaces and plant room access",
      "Only electrical supply requirements",
      "Paint colours only"
    ],
    correctAnswer: 1,
    explanation: "Coordination with mechanical contractors is essential for duct detector positions, fire damper interfaces, plant room detector locations and AHU shutdown requirements."
  },
  {
    id: 9,
    question: "What personal protective equipment is typically required for fire alarm installation?",
    options: [
      "Safety boots only",
      "Safety boots, eye protection, gloves and hard hat where required",
      "High-visibility clothing only",
      "No PPE required for fire alarm work"
    ],
    correctAnswer: 1,
    explanation: "Typical PPE includes safety boots, eye protection (especially when drilling), gloves for cable handling, and hard hats on construction sites or where overhead hazards exist."
  },
  {
    id: 10,
    question: "What should be documented during the pre-installation survey regarding existing systems?",
    options: [
      "Manufacturer names only",
      "Condition, compatibility, spare capacity and interface requirements",
      "Installation date only",
      "Colour of existing equipment"
    ],
    correctAnswer: 1,
    explanation: "Surveys must document existing system condition, compatibility with new equipment, spare capacity for expansion, and interface requirements for integration."
  }
];

const faqs = [
  {
    question: "How long should a pre-installation survey take?",
    answer: "Survey duration depends on building size and complexity. A small office might take 2-3 hours; a hospital could take several days. Allow adequate time rather than rushing."
  },
  {
    question: "Who should attend the site survey?",
    answer: "Ideally the project manager, lead installer and designer. Having the designer present helps resolve queries immediately and confirms or adjusts the design on site."
  },
  {
    question: "What if site conditions differ significantly from drawings?",
    answer: "Document discrepancies with photographs and measurements. Issue a formal site query (RFI) to the designer and client before proceeding. Changes may require design revision."
  },
  {
    question: "How do I handle existing fire systems during installation?",
    answer: "Existing systems must remain operational unless formally isolated under permit. Coordinate isolations with building management and ensure fire watches are in place during system downtime."
  },
  {
    question: "What PPE is required for fire alarm installation?",
    answer: "Minimum requirements typically include safety boots, eye protection and gloves. Hard hats required on construction sites. Hi-vis may be required on some sites. Always check site rules."
  },
  {
    question: "How far in advance should permits be requested?",
    answer: "Allow 24-48 hours minimum for standard permits. Some sites require 5 working days for certain permits. Healthcare and secure sites often have longer lead times."
  }
];

const FireAlarmModule5Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-5">
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
            <span>Module 5 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Installation Planning
          </h1>
          <p className="text-white/80">
            Site surveys, coordination and health & safety for fire alarm installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Site surveys:</strong> Verify design assumptions and identify cable routes, fixings and access constraints</li>
              <li><strong>Coordination:</strong> Essential with mechanical, electrical and building management systems contractors</li>
              <li><strong>Health & safety:</strong> Risk assessments, method statements, permits and PPE requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Document review:</strong> Fire alarm design, cause & effect matrix, specifications</li>
              <li><strong>Permits:</strong> Hot work, isolation, roof access, confined space as required</li>
              <li><strong>Logistics:</strong> Phased deliveries, secure storage, material distribution</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct effective pre-installation site surveys",
              "Identify coordination requirements with other trades",
              "Prepare risk assessments and method statements",
              "Plan material logistics and phased deliveries",
              "Establish permit-to-work requirements",
              "Document site conditions and constraints"
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
            Site Survey Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A thorough pre-installation survey is essential for project success. The survey verifies design assumptions, identifies site-specific challenges and informs accurate programming and resource planning.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Survey Activities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify proposed device locations against actual site conditions</li>
                <li>Identify cable routes and containment requirements</li>
                <li>Check ceiling types, heights and access methods</li>
                <li>Document existing services and potential obstructions</li>
                <li>Photograph key areas for reference during installation</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">Always obtain drawings and specifications before the survey to compare design intent with site reality.</p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design Document Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Before any installation work begins, the design documentation must be thoroughly reviewed and understood by all team members involved in the installation.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Documents to Review:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire alarm layout drawings with device positions</li>
                <li>Cause and effect matrix showing system responses</li>
                <li>System specification and equipment schedules</li>
                <li>Cable schedules with types and quantities</li>
                <li>Interface requirements with other systems</li>
              </ul>
            </div>

            <p>Pay particular attention to the cause and effect matrix - this defines how the system responds to different alarm conditions and is critical for correct zone allocation and output programming.</p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Trade Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Fire alarm installation requires careful coordination with multiple trades. Poor coordination leads to delays, rework and compromised system performance.</p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Services</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Duct detector locations</li>
                  <li>Fire damper interfaces</li>
                  <li>AHU shutdown control</li>
                  <li>Plant room access</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Services</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Mains supply position</li>
                  <li>Containment sharing</li>
                  <li>Emergency lighting links</li>
                  <li>Door holder supplies</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Management</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>BMS interface protocols</li>
                  <li>Fault monitoring outputs</li>
                  <li>Plant control integration</li>
                  <li>Shared containment routes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling Contractors</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>First fix timing</li>
                  <li>Backbox installation</li>
                  <li>Access panel positions</li>
                  <li>Detector base locations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Health & Safety Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Fire alarm installation involves various hazards that must be controlled through proper risk assessment and method statements (RAMS).</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Hazards to Address:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Working at height - ladders, scaffolds, MEWPs</li>
                <li>Asbestos - survey required before intrusive work</li>
                <li>Hidden services - electrical, gas, water in walls/ceilings</li>
                <li>Manual handling - cable drums, panels, equipment</li>
                <li>Electrical shock - working near live equipment</li>
                <li>Dust and debris - drilling, cutting operations</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white"><strong>Warning:</strong> Never drill into walls or ceilings without first checking for asbestos and buried services using appropriate detection equipment.</p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Permit Systems & Access
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Many sites require formal permit-to-work systems for fire alarm installation, particularly in occupied buildings, healthcare premises and industrial facilities.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Permit Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hot work permits</strong> - required for soldering or heat-producing activities</li>
                <li><strong>Fire system isolation permits</strong> - when disabling existing systems</li>
                <li><strong>Roof access permits</strong> - for work on or accessing roof areas</li>
                <li><strong>Confined space permits</strong> - for work in risers, voids, tanks</li>
                <li><strong>Electrical isolation certificates</strong> - for work on mains supplies</li>
              </ul>
            </div>

            <p>Establish permit requirements during the planning phase and factor permit processing time into the programme - some permits require 24-48 hours notice.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Material Logistics & Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Effective material logistics prevents delays, reduces waste and ensures installation quality. Poor logistics planning is a common cause of project delays.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Logistics Planning Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify secure storage locations for equipment and cable</li>
                <li>Plan delivery access routes and unloading areas</li>
                <li>Schedule phased deliveries to match installation progress</li>
                <li>Arrange internal distribution to work areas</li>
                <li>Establish material tracking and sign-out procedures</li>
                <li>Plan waste disposal and recycling arrangements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">On multi-floor buildings, consider how materials will be distributed vertically - goods lifts, crane access or manual handling up stairs all affect programme and costs.</p>
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
                <li>Photograph everything during surveys - it saves return visits and resolves disputes</li>
                <li>Build relationships with site managers and facilities teams early - they control access</li>
                <li>Always have a contingency plan for site access issues - weather, security, other trades</li>
                <li>Carry spare cable detection equipment - buried services are the biggest hazard</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Starting installation without reviewing the cause and effect matrix properly</strong> — leads to incorrect zone allocation</li>
                <li><strong>Underestimating ceiling void access requirements</strong> — leads to expensive rework</li>
                <li><strong>Failing to coordinate first fix timing with ceiling contractors</strong> — missed opportunities</li>
                <li><strong>Not checking asbestos register before any intrusive work</strong> — serious health and legal risk</li>
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
            <Link to="/electrician/upskilling/fire-alarm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FireAlarmModule5Section1;
