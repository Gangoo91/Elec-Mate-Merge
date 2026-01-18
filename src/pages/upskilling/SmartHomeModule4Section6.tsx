import { ArrowLeft, ArrowRight, Building2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BMS Light Integration for Larger Sites";
const DESCRIPTION = "Understand Building Management Systems and how HVAC integrates with lighting control in commercial and industrial applications for comprehensive building automation.";

const quickCheckQuestions = [
  {
    question: "What does BMS stand for?",
    options: ["Basic Monitoring Software", "Building Management System", "Boiler Management Service", "Building Maintenance Schedule"],
    correctAnswer: 1,
    explanation: "BMS stands for Building Management System - a centralised system that monitors and controls a building's mechanical, electrical, and electromechanical services including HVAC, lighting, and security."
  },
  {
    question: "Which protocol is commonly used for lighting control in commercial BMS installations?",
    options: ["Zigbee", "Bluetooth", "DALI (Digital Addressable Lighting Interface)", "Wi-Fi Direct"],
    correctAnswer: 2,
    explanation: "DALI is the industry standard for commercial lighting control, offering addressable control of individual fixtures, scene management, and integration with BMS via gateways."
  },
  {
    question: "What is the main benefit of linking HVAC and lighting through a BMS?",
    options: ["Reduced installation cost", "Coordinated response to occupancy for maximum efficiency", "Simpler maintenance", "Faster installation"],
    correctAnswer: 1,
    explanation: "Linking HVAC and lighting allows coordinated responses to occupancy - when a space becomes unoccupied, both systems can enter setback mode simultaneously, maximising energy savings."
  }
];

const quizQuestions = [
  {
    question: "What communication protocol is widely used for BMS integration in commercial buildings?",
    options: ["HTTP", "BACnet", "SMTP", "FTP"],
    correctAnswer: 1,
    explanation: "BACnet (Building Automation and Control Networks) is the ISO standard protocol for building automation, enabling communication between different manufacturers' systems."
  },
  {
    question: "In a BMS-controlled building, what typically happens when a meeting room booking ends?",
    options: ["Nothing changes", "Lights and HVAC enter setback or switch off", "Temperature increases", "Security alarm activates"],
    correctAnswer: 1,
    explanation: "Integration with room booking systems allows the BMS to automatically reduce lighting and HVAC output when meetings end, preventing conditioning of unoccupied spaces."
  },
  {
    question: "What is a typical ROI timeframe for BMS installation in commercial buildings?",
    options: ["1-2 months", "2-5 years", "10-15 years", "Never achieves ROI"],
    correctAnswer: 1,
    explanation: "Commercial BMS installations typically achieve return on investment within 2-5 years through energy savings, though this varies with building size, energy costs, and previous efficiency measures."
  },
  {
    question: "What does daylight harvesting mean in BMS lighting control?",
    options: ["Installing solar panels", "Automatically dimming artificial lights based on natural light levels", "Scheduling lights by sunrise/sunset", "Using daylight colour temperature lamps"],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses light sensors to automatically dim or switch off artificial lighting when sufficient natural light is available, reducing energy consumption while maintaining required illumination levels."
  },
  {
    question: "Which BMS integration provides the most significant energy savings in office buildings?",
    options: ["Security system integration", "Occupancy-based HVAC and lighting control", "Fire alarm integration", "Lift control integration"],
    correctAnswer: 1,
    explanation: "Occupancy-based control of HVAC and lighting typically provides the largest energy savings in offices, where spaces are often unoccupied for significant periods despite being conditioned and lit."
  }
];

const faqs = [
  {
    question: "Is BMS only suitable for large commercial buildings?",
    answer: "While BMS has traditionally been used in large commercial buildings, smaller-scale BMS solutions and smart building platforms are now available for medium-sized premises. The economics favour larger buildings where savings are greater, but technology costs are decreasing."
  },
  {
    question: "Can existing buildings be retrofitted with BMS?",
    answer: "Yes, though it may be more complex and costly than new-build installation. Wireless sensors and controllers reduce cabling requirements. Phased implementation can spread costs. The key is ensuring existing systems can be interfaced with the BMS."
  },
  {
    question: "What skills are needed to work on BMS installations?",
    answer: "BMS work requires understanding of HVAC systems, electrical controls, networking/IT, and building automation protocols. Many manufacturers offer training and certification. It is a specialised field that combines traditional electrical/mechanical knowledge with IT skills."
  }
];

const SmartHomeModule4Section6 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 4`,
    description: DESCRIPTION,
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
            <Link to="/electrician/upskilling/smart-home-module-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 6 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Building2 className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Commercial building automation systems</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Understanding BMS architecture and protocols</p>
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
              "Understand the architecture and components of BMS",
              "Explain common BMS communication protocols",
              "Describe HVAC and lighting integration strategies",
              "Identify opportunities for energy savings through BMS",
              "Appreciate the scope and complexity of commercial automation"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What is a BMS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What is a Building Management System?
          </h2>
          <p className="text-white mb-4">
            A Building Management System (BMS) is a computer-based control system that
            monitors and manages a building's mechanical, electrical, and electromechanical
            services. Also known as Building Automation System (BAS).
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Typical BMS Functions</h4>
              <ul className="text-white text-sm space-y-1">
                <li>HVAC control (heating, cooling, ventilation)</li>
                <li>Lighting control and scheduling</li>
                <li>Energy monitoring and management</li>
                <li>Fire and life safety system monitoring</li>
                <li>Access control and security integration</li>
                <li>Lift and escalator monitoring</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">BMS Architecture</h4>
              <p className="text-white text-sm">
                Modern BMS typically uses a three-tier architecture: field devices (sensors,
                actuators), controllers (processing control logic), and supervisory level
                (user interface, data logging, analytics). Communication occurs over
                dedicated networks or shared IT infrastructure.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Communication Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Communication Protocols
          </h2>
          <p className="text-white mb-4">
            BMS relies on standardised communication protocols to enable different
            systems and manufacturers' equipment to work together.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">BACnet</h4>
              <p className="text-white text-sm">
                Building Automation and Control Networks - the ISO standard protocol for
                building automation. Supports multiple transport layers (Ethernet, MS/TP,
                IP). Widely supported by major BMS manufacturers.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Modbus</h4>
              <p className="text-white text-sm">
                Simple, robust protocol originally for industrial control. Common in HVAC
                equipment. Available in serial (RTU) and TCP/IP versions. Widely supported
                but limited functionality compared to BACnet.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">DALI</h4>
              <p className="text-white text-sm">
                Digital Addressable Lighting Interface - specific to lighting control.
                Allows individual fixture addressing, dimming, and scene control. Integrates
                with BMS via gateways that convert DALI to BACnet or Modbus.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">KNX</h4>
              <p className="text-white text-sm">
                European standard for building automation, popular for commercial and
                high-end residential. Supports lighting, HVAC, blinds, and security.
                Can interface with BMS systems via gateways.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* HVAC and Lighting Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            HVAC and Lighting Integration
          </h2>
          <p className="text-white mb-4">
            Integrating HVAC and lighting through a BMS enables coordinated control
            that maximises energy efficiency and occupant comfort.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Occupancy-Based Control</h4>
              <p className="text-white text-sm">
                Presence detectors trigger both lighting and HVAC. When a zone becomes
                occupied, lights turn on and HVAC enters comfort mode. When unoccupied,
                both systems enter setback mode simultaneously.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Daylight Harvesting</h4>
              <p className="text-white text-sm">
                Light sensors measure natural light levels. Artificial lighting dims or
                switches off when sufficient daylight is available. Can also inform HVAC
                about solar gain, allowing proactive cooling control.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Schedule Synchronisation</h4>
              <p className="text-white text-sm">
                Shared schedules ensure HVAC pre-conditions spaces before occupancy while
                lights remain off until actually needed. Integration with calendar systems
                allows automatic adjustment for meetings and events.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Energy Savings and ROI */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Energy Savings and ROI
          </h2>
          <p className="text-white mb-4">
            BMS implementation can deliver significant energy savings in commercial
            buildings, though investment costs are substantial.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Typical Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Optimised HVAC scheduling</td>
                  <td className="py-3 px-4 text-white">10-20% of HVAC energy</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Occupancy-based control</td>
                  <td className="py-3 px-4 text-white">15-30% of lighting/HVAC</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Daylight harvesting</td>
                  <td className="py-3 px-4 text-white">20-40% of lighting energy</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Fault detection and diagnostics</td>
                  <td className="py-3 px-4 text-white">5-15% through early intervention</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">ROI Considerations</h4>
            <p className="text-white text-sm">
              Typical payback periods range from 2-5 years for new installations. Retrofit
              projects may take longer due to higher implementation costs. Non-energy
              benefits include improved comfort, extended equipment life through optimised
              operation, and reduced maintenance through predictive analytics.
            </p>
          </div>
        </section>

        {/* Implementation Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Implementation Considerations
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Planning and Design</h4>
              <p className="text-white text-sm">
                Successful BMS requires careful specification. Define control strategies
                before equipment selection. Ensure interoperability between systems.
                Plan for future expansion and technology changes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Commissioning</h4>
              <p className="text-white text-sm">
                Thorough commissioning is essential. Test all control sequences. Verify
                sensor calibration. Document setpoints and schedules. Train building
                operators. Allow seasonal commissioning to optimise for different conditions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Ongoing Maintenance</h4>
              <p className="text-white text-sm">
                BMS requires ongoing attention. Regular sensor calibration. Software
                updates. Trend analysis to identify drift. Periodic review of control
                strategies as building use changes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 6 Knowledge Check"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Module Completion */}
        <section className="mb-10 p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 text-center">
          <CheckCircle className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Module 4 Complete</h3>
          <p className="text-white mb-4">
            You have completed all sections of Module 4: Climate Control and Environmental
            Monitoring. You now understand smart heating, environmental sensors, control
            strategies, and building management systems.
          </p>
          <p className="text-white text-sm">
            Continue to Module 5 to learn about smart security and access control.
          </p>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-5">
              Module 5
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section6;
