/**
 * Level 3 Module 6 Section 1.4 - Designing for Safety, Reliability, and Usability
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Designing for Safety, Reliability, and Usability - Level 3 Module 6 Section 1.4";
const DESCRIPTION = "Learn to incorporate safety principles, reliability requirements, and user-focused design into electrical installations following BS 7671 and best practice guidelines.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the fundamental safety principle that underpins electrical installation design?",
    options: [
      "Minimising installation cost",
      "Protection against electric shock through basic and fault protection measures",
      "Using the largest cables available",
      "Installing as many RCDs as possible"
    ],
    correctIndex: 1,
    explanation: "Protection against electric shock is the fundamental safety principle. BS 7671 requires both basic protection (preventing contact with live parts) and fault protection (limiting touch voltages and ensuring rapid disconnection during faults). All design decisions must support these protective measures."
  },
  {
    id: "check-2",
    question: "What does 'N-1 redundancy' mean in electrical system design?",
    options: [
      "Having N circuits minus one spare",
      "System continues operating if any single component fails",
      "Neutral conductor minus one size",
      "Using N-rated components only"
    ],
    correctIndex: 1,
    explanation: "N-1 redundancy means the system can continue operating normally if any single component (N) fails - there's always one backup (-1). This is common in critical installations where loss of power is unacceptable, achieved through duplicate supplies, transformers, or distribution paths."
  },
  {
    id: "check-3",
    question: "Which design principle improves both safety and usability of an installation?",
    options: [
      "Using the cheapest components available",
      "Clear labelling and logical circuit arrangements",
      "Minimising the number of circuits",
      "Using the smallest possible distribution boards"
    ],
    correctIndex: 1,
    explanation: "Clear labelling and logical circuit arrangements improve safety by enabling correct identification during maintenance and emergencies, and improve usability by allowing users to quickly locate and operate controls. This is a requirement of BS 7671 and good design practice."
  },
  {
    id: "check-4",
    question: "When designing for maintainability, what provision should be included?",
    options: [
      "Hide distribution boards behind furniture",
      "Use proprietary fittings that only the installer can obtain",
      "Adequate access space, isolation facilities, and clear documentation",
      "Minimise the number of isolation points"
    ],
    correctIndex: 2,
    explanation: "Maintainability requires adequate access for personnel and equipment, clearly identified isolation facilities for safe working, and documentation showing circuit arrangements. BS 7671 Regulation 132.12 requires consideration of maintenance needs. Poor access leads to unsafe shortcuts."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BS 7671 defines protection against electric shock through which two measures?",
    options: [
      "Overcurrent and overvoltage protection",
      "Basic protection and fault protection",
      "RCD protection and MCB protection",
      "Insulation and earthing only"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 defines basic protection (preventing contact with live parts during normal operation) and fault protection (limiting touch voltage and duration during fault conditions). Together these provide the required level of shock protection through complementary measures."
  },
  {
    id: 2,
    question: "A hospital operating theatre requires continuous power supply. What design approach addresses this?",
    options: [
      "Use thicker cables",
      "Install a larger main fuse",
      "Provide dual supply feeds, automatic changeover, and UPS systems",
      "Use IP68 rated equipment"
    ],
    correctAnswer: 2,
    explanation: "Critical areas require redundancy and backup power. Dual supply feeds with automatic changeover provide resilience against supply failures. UPS systems bridge the gap during changeover and provide ride-through for transients. HTM 06-01 specifies detailed requirements for healthcare."
  },
  {
    id: 3,
    question: "What is the purpose of discrimination in protective device selection?",
    options: [
      "To ensure all devices trip simultaneously",
      "To ensure only the device nearest the fault operates, maintaining supply to healthy circuits",
      "To make installation testing easier",
      "To reduce the cost of protective devices"
    ],
    correctAnswer: 1,
    explanation: "Discrimination (selectivity) ensures that only the protective device closest to a fault operates, isolating the faulty circuit while maintaining supply to all healthy circuits. This improves reliability by preventing nuisance outages and aids fault location. It requires coordinating device ratings and characteristics."
  },
  {
    id: 4,
    question: "According to BS 7671, what is the maximum disconnection time for a 230V final circuit in a TN system?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "1 second",
      "0.1 seconds"
    ],
    correctAnswer: 1,
    explanation: "For final circuits not exceeding 63A in TN systems at 230V, BS 7671 Table 41.1 requires maximum 0.4 second disconnection time. This limits the duration of electric shock during fault conditions to a tolerable level. Longer times are only permitted for distribution circuits with specific conditions."
  },
  {
    id: 5,
    question: "What design feature improves the reliability of socket circuits in a large office?",
    options: [
      "Using one large ring circuit for the entire floor",
      "Dividing into multiple smaller circuits to limit the impact of any single circuit failure",
      "Using only 13A radial circuits",
      "Connecting all sockets to a single 100A MCB"
    ],
    correctAnswer: 1,
    explanation: "Multiple smaller circuits improve reliability through limiting the impact of faults. If one circuit fails, other areas remain operational. This also reduces voltage drop on long runs, limits fault current, and eases maintenance by allowing partial isolation. BS 7671 Appendix 15 recommends multiple circuits."
  },
  {
    id: 6,
    question: "What usability consideration affects distribution board design?",
    options: [
      "Using the smallest possible enclosure",
      "Mounting at height requiring ladders for access",
      "Logical circuit grouping, clear labelling, and mounting at accessible height",
      "Hiding behind locked panels without clear identification"
    ],
    correctAnswer: 2,
    explanation: "Distribution boards should be mounted at accessible height (typically 1350-1450mm to main switch), with circuits logically grouped (e.g., by floor or function), clearly labelled in durable format, and with circuit charts maintained. This aids both everyday use and emergency situations."
  },
  {
    id: 7,
    question: "A design includes circuits for life safety systems (emergency lighting, fire alarms). What special consideration applies?",
    options: [
      "They should share circuits with general lighting to save costs",
      "Separate circuits with enhanced fire resistance and protection against isolation",
      "They only need standard circuit protection",
      "They should all be on the same RCD"
    ],
    correctAnswer: 1,
    explanation: "Life safety circuits require separate circuits (not sharing with other loads), often with fire-resistant cables (e.g., BS 8519), protection against inadvertent isolation, and in some cases maintenance of supply during fire conditions. BS 5266 and BS 5839 specify detailed requirements."
  },
  {
    id: 8,
    question: "What is the purpose of providing 'isolation' facilities in a design?",
    options: [
      "To make the building more soundproof",
      "To enable circuits or equipment to be made dead for safe maintenance",
      "To keep different phases apart",
      "To separate domestic and commercial areas"
    ],
    correctAnswer: 1,
    explanation: "Isolation facilities enable circuits or equipment to be made dead and secured in that state for safe maintenance work. BS 7671 Part 5 requires appropriate devices for isolation, with means for securing off and proving dead. Inadequate isolation provision leads to dangerous live working."
  },
  {
    id: 9,
    question: "How does designing for accessibility affect electrical installation design?",
    options: [
      "It has no effect on electrical design",
      "Socket and switch heights, accessible controls, and visual/audible indicators must be considered",
      "Only the location of the meter is affected",
      "Only lift installations are affected"
    ],
    correctAnswer: 1,
    explanation: "Accessibility requirements (Building Regulations Part M, BS 8300) affect socket heights (400-1000mm), switch heights (750-1200mm), accessible light switches, contrasting colours for controls, and provision of visual and audible indicators. These requirements apply to all buildings except private dwellings."
  },
  {
    id: 10,
    question: "What design approach provides resilience against single points of failure in a data centre?",
    options: [
      "Using one very large UPS",
      "Dual power distribution paths (A+B feeds) to each rack",
      "Only using 32A circuits",
      "Running all cables in a single containment route"
    ],
    correctAnswer: 1,
    explanation: "Data centres use A+B power distribution with independent paths from source to load. Each server/equipment has dual power supplies connected to different feeds. If either A or B fails, the equipment continues operating on the remaining feed. This is combined with redundant UPS and generators."
  },
  {
    id: 11,
    question: "Why should a designer consider the maintenance regime when specifying equipment?",
    options: [
      "Maintenance is someone else's problem",
      "To ensure equipment can be safely accessed, tested, and replaced during its service life",
      "Only to include maintenance costs in the project",
      "Maintenance requirements don't affect design"
    ],
    correctAnswer: 1,
    explanation: "CDM Regulations require designers to consider safe maintenance. Equipment should be accessible (safe working space, no hazards), capable of isolation, with replacement parts available. High-level equipment may need permanent access platforms. Specifying obsolete or proprietary equipment creates future problems."
  },
  {
    id: 12,
    question: "What is the purpose of providing fault indication and monitoring in a design?",
    options: [
      "Only to comply with regulations",
      "To enable rapid fault identification, reduce downtime, and support predictive maintenance",
      "To make the installation more expensive",
      "Only for three-phase installations"
    ],
    correctAnswer: 1,
    explanation: "Fault indication (alarm contacts on protective devices, insulation monitoring, power quality meters) enables rapid fault identification, reducing the time to restore supply. Trend monitoring supports predictive maintenance by identifying degradation before failure. These features are standard in commercial and critical installations."
  }
];

const faqs = [
  {
    question: "How do I balance safety requirements against cost constraints?",
    answer: "Safety requirements of BS 7671 are mandatory and cannot be compromised for cost. However, above minimum requirements, cost-benefit analysis can inform decisions. Discuss reliability and redundancy options with the client, explaining the implications of each approach. Document discussions and agreed scope clearly."
  },
  {
    question: "What level of redundancy is appropriate for a typical commercial installation?",
    answer: "Standard commercial installations typically don't require full N-1 redundancy. However, dividing loads across multiple circuits, providing spare distribution board capacity, and separating critical circuits (IT, security) onto dedicated supplies is common practice. True redundancy is reserved for critical facilities like data centres and hospitals."
  },
  {
    question: "How do I ensure maintainability when space is limited?",
    answer: "In space-constrained situations, prioritise access to equipment requiring regular attention (distribution boards, isolators). Consider surface-mounted distribution boards for easier access than flush-mounted. Ensure minimum working spaces per BS 7671 are maintained. Document any compromises and their implications."
  },
  {
    question: "Should I design for future expansion?",
    answer: "Yes - within reasonable limits agreed with the client. Typically include 20-30% spare capacity in distribution boards, spare ways for circuits, and containment sized for additional cables. The cost of oversizing during initial installation is much less than retrofitting capacity later."
  },
  {
    question: "What makes a circuit arrangement 'logical'?",
    answer: "Logical arrangement groups related circuits together (all lighting on one side, power on another; circuits by floor or area). Circuit numbering follows a clear sequence. Labels match circuit charts. Users can reasonably predict which device controls which circuit without needing the charts for everyday operation."
  },
  {
    question: "How does discrimination affect design?",
    answer: "Achieving discrimination may require larger upstream protective devices (higher rated MCBs), time-delayed RCDs at origin with 30mA downstream, or MCCBs with adjustable settings. The protective device schedules should show that discrimination has been considered and identify any cases where it cannot be achieved."
  }
];

const Level3Module6Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety:</strong> Basic + fault protection throughout</li>
              <li><strong>Reliability:</strong> Redundancy, discrimination, quality</li>
              <li><strong>Usability:</strong> Logical layout, clear labelling, access</li>
              <li><strong>Maintainability:</strong> Isolation, space, documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Design Principles</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> Mandatory safety requirements</li>
              <li><strong>Discrimination:</strong> Fault isolation to affected circuit</li>
              <li><strong>Accessibility:</strong> Building Regs Part M compliance</li>
              <li><strong>CDM:</strong> Design for safe maintenance</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Safety in Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safety in Electrical Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety is not an add-on to electrical design - it is the foundation upon which all other considerations rest. BS 7671 establishes the fundamental requirements for protection against electric shock, thermal effects, overcurrent, fault currents, and overvoltage. Every design decision must be evaluated against its impact on these protective measures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Protection Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Basic protection:</strong> Insulation of live parts, barriers and enclosures (IP2X or IPXXB minimum)</li>
                <li><strong>Fault protection:</strong> Automatic disconnection of supply within required times (0.4s for final circuits)</li>
                <li><strong>Additional protection:</strong> RCDs not exceeding 30mA for socket-outlets and other specified circuits</li>
                <li><strong>Protection against thermal effects:</strong> Preventing ignition, burns, and fire</li>
                <li><strong>Protection against overcurrent:</strong> Correctly rated fuses and MCBs</li>
              </ul>
            </div>

            <p>
              The designer must ensure that these protections work together as a complete system. Individual components may be correctly specified, but if they don't coordinate properly - for example, if a cable isn't protected by its associated MCB - the installation is unsafe. This is why design calculations proving coordination are essential.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Principle:</strong> Every circuit must be verified to meet BS 7671 requirements for shock protection (Zs values), thermal protection (adiabatic equation), and overcurrent protection (I²t characteristics). Never assume compliance - calculate and prove it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Reliability Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Designing for Reliability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reliability in electrical design means the installation performs its intended function consistently over its service life, with minimal unplanned outages. While no installation is immune to failure, good design minimises the probability of failure and limits the impact when failures do occur.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reliability Strategies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Quality component selection</li>
                  <li>Appropriate derating for conditions</li>
                  <li>Redundancy for critical loads</li>
                  <li>Discrimination between protective devices</li>
                  <li>Proper installation methods</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Redundancy Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li>N: No redundancy - single path</li>
                  <li>N+1: One spare component</li>
                  <li>2N: Fully duplicated system</li>
                  <li>2N+1: Duplicated plus spare</li>
                  <li>Level depends on criticality</li>
                </ul>
              </div>
            </div>

            <p>
              Discrimination ensures that faults are isolated at the nearest protective device, maintaining supply to healthy circuits. This requires careful coordination of protective device characteristics - time-current curves must not overlap in the fault current region. Manufacturers' data and software tools assist with discrimination studies.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A server room design uses 2N redundancy with A and B power feeds from independent UPS systems. Each server has dual power supplies. If UPS A fails, all equipment continues operating on UPS B. The cost is higher, but the business cannot tolerate any downtime.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Usability and Accessibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Usability and Accessibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-designed installation is intuitive to use. Users should be able to operate switches and controls without confusion, locate circuit protection when needed, and understand the basic arrangement of the system. Building Regulations Part M and BS 8300 add specific requirements for accessibility by people with disabilities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Accessibility Requirements (Part M / BS 8300):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Socket outlets:</strong> 400mm to 1000mm above floor level</li>
                <li><strong>Light switches:</strong> 750mm to 1200mm above floor level</li>
                <li><strong>Controls:</strong> Operable with closed fist, contrasting colours</li>
                <li><strong>Visual indicators:</strong> Large, contrasting, and appropriately positioned</li>
                <li><strong>Audible devices:</strong> Consider hearing loop interfaces</li>
              </ul>
            </div>

            <p>
              Beyond minimum regulatory requirements, good design considers the end users. Distribution boards should be at comfortable height with clear sightlines to circuit labels. Switches should be positioned at entry points where users naturally reach for them. Labelling should be durable and use plain language that non-electricians understand.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Usability Tip:</strong> Circuit labels should describe what the circuit controls, not just its number. "Kitchen Sockets" is more useful than "Circuit 7" when someone is trying to reset a tripped breaker without access to the circuit chart.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Maintainability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Designing for Maintainability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CDM Regulations place duties on designers to consider how their designs will be safely maintained during use. Electrical installations require periodic inspection and testing, component replacement, and occasionally fault finding. The design should facilitate these activities safely and efficiently.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Access</p>
                <p className="text-white/90 text-xs">Working space around equipment per BS 7671</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Isolation</p>
                <p className="text-white/90 text-xs">Means to isolate and secure circuits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Identification</p>
                <p className="text-white/90 text-xs">Clear labelling of all equipment</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Documentation</p>
                <p className="text-white/90 text-xs">As-built drawings and test records</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Spare Parts</p>
                <p className="text-white/90 text-xs">Standard components, not obsolete</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Safe Working</p>
                <p className="text-white/90 text-xs">No hazards during maintenance</p>
              </div>
            </div>

            <p>
              Consider the maintenance operative's perspective: Can they reach the distribution board without a ladder? Is there enough space to open the enclosure and work safely? Can circuits be isolated individually without affecting critical services? These questions should be answered positively by the design.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>CDM Consideration:</strong> If high-level equipment requires maintenance, the design should include permanent access (platforms, fixed ladders) rather than relying on temporary access equipment. Design out the hazard of working at height where possible.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Design Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All circuits have verified Zs values within BS 7671 limits</li>
                <li>RCD protection provided where required (sockets, bathrooms, outdoors)</li>
                <li>Cable sizes verified against adiabatic equation for fault protection</li>
                <li>PSCC does not exceed protective device breaking capacity</li>
                <li>IP ratings appropriate for locations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Reliability Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Critical loads identified and provided with appropriate supply resilience</li>
                <li>Discrimination study completed where multiple levels of protection exist</li>
                <li>Spare capacity provided in distribution boards (typically 20-30%)</li>
                <li>Quality components specified from reputable manufacturers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate access</strong> - Distribution boards behind doors or furniture</li>
                <li><strong>Poor labelling</strong> - Labels that fade, fall off, or use cryptic codes</li>
                <li><strong>No spare capacity</strong> - Full boards that cannot accommodate any additions</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Disconnection Times (TN)</p>
                <ul className="space-y-0.5">
                  <li>Final circuits 32A or less: 0.4s</li>
                  <li>Final circuits over 32A to 63A: 0.4s</li>
                  <li>Distribution circuits: 5s</li>
                  <li>With 30mA RCD: 40ms typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Accessibility Heights</p>
                <ul className="space-y-0.5">
                  <li>Sockets: 400-1000mm AFL</li>
                  <li>Switches: 750-1200mm AFL</li>
                  <li>Consumer unit: 1350-1450mm to main switch</li>
                  <li>Emergency controls: Clearly marked</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Client Requirements
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-5">
              Next: Energy Efficiency
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section1_4;
