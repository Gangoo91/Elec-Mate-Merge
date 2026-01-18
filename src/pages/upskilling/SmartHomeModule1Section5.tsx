import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Retrofit vs New Build - Smart Home Technology Module 1 Section 5";
const DESCRIPTION = "Learn the differences between retrofit and new build smart home installations. Compare costs, disruption, scalability, and choose the right approach for different projects.";

const quickCheckQuestions = [
  {
    id: "retrofit-advantage",
    question: "What is a key advantage of retrofit smart home installations?",
    options: [
      "Always cheaper than new build",
      "No disruption to existing building",
      "Can add smart features without major construction",
      "Better than new build in all cases"
    ],
    correctIndex: 2,
    explanation: "Retrofit installations allow adding smart home features to existing buildings using wireless technologies without requiring major construction or rewiring."
  },
  {
    id: "new-build-advantage",
    question: "What advantage do new build smart home installations offer?",
    options: [
      "Lower overall cost",
      "Opportunity for optimal wiring infrastructure during construction",
      "Simpler technology choices",
      "No planning required"
    ],
    correctIndex: 1,
    explanation: "New build installations allow for optimal wiring infrastructure, conduit installation, and comprehensive planning during the construction phase."
  },
  {
    id: "wireless-retrofit",
    question: "Why are wireless protocols particularly suited to retrofit installations?",
    options: [
      "They are always more reliable",
      "They eliminate the need for new cable runs",
      "They are cheaper to maintain",
      "They have longer range"
    ],
    correctIndex: 1,
    explanation: "Wireless protocols like Zigbee, Z-Wave, and Wi-Fi allow smart devices to be installed without running new cables, making them ideal for retrofit projects."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main challenge in retrofit smart home installations?",
    options: [
      "Too many options available",
      "Working within existing building constraints",
      "Excessive government regulations",
      "Lack of available products"
    ],
    correctAnswer: 1,
    explanation: "Retrofit installations must work within existing building constraints including wall construction, available wiring routes, and existing electrical infrastructure."
  },
  {
    id: 2,
    question: "Which protocol type is most commonly used in retrofit installations?",
    options: [
      "Wired protocols only",
      "Wireless protocols (Zigbee, Z-Wave, Wi-Fi)",
      "Fibre optic",
      "Serial connections"
    ],
    correctAnswer: 1,
    explanation: "Wireless protocols are most common in retrofit because they do not require new cable runs through existing walls and ceilings."
  },
  {
    id: 3,
    question: "What opportunity does new build construction provide for smart homes?",
    options: [
      "Lower equipment costs",
      "Pre-wiring and conduit installation during construction",
      "Simpler system design",
      "No need for planning"
    ],
    correctAnswer: 1,
    explanation: "New build allows for pre-wiring, conduit installation, and comprehensive infrastructure planning during construction when walls are open."
  },
  {
    id: 4,
    question: "What is a 'future-proofing' consideration in new build smart homes?",
    options: [
      "Using the cheapest equipment",
      "Installing conduit for future cable runs",
      "Avoiding any automation",
      "Using only one manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Installing conduit during construction allows future cable runs without opening walls, future-proofing the installation for technology upgrades."
  },
  {
    id: 5,
    question: "Why might retrofit installations cost more per device than new build?",
    options: [
      "Equipment is more expensive",
      "Labour for working around existing structures",
      "Permits cost more",
      "Insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Retrofit labour costs are typically higher due to working around existing structures, making good existing finishes, and finding cable routes."
  },
  {
    id: 6,
    question: "What should be surveyed before a retrofit installation?",
    options: [
      "Only the garden layout",
      "Existing wiring, wall construction, and network infrastructure",
      "Only the roof condition",
      "Just the paint colours"
    ],
    correctAnswer: 1,
    explanation: "A thorough survey should assess existing wiring, wall construction types, network infrastructure, and potential installation routes."
  },
  {
    id: 7,
    question: "Which approach typically offers better scalability for future expansion?",
    options: [
      "Retrofit installations",
      "New build with proper infrastructure planning",
      "Both are equally scalable",
      "Neither can be expanded"
    ],
    correctAnswer: 1,
    explanation: "New build with proper infrastructure planning (conduit, spare capacity) typically offers better scalability as expansion routes are pre-planned."
  },
  {
    id: 8,
    question: "What is a key consideration when choosing switches for retrofit installations?",
    options: [
      "Only the colour",
      "Neutral wire availability at switch locations",
      "Only the brand name",
      "The wall colour"
    ],
    correctAnswer: 1,
    explanation: "Many smart switches require a neutral wire, which may not be present in older installations. This affects product selection for retrofit projects."
  },
  {
    id: 9,
    question: "How can mesh networking benefit retrofit installations?",
    options: [
      "It reduces equipment costs",
      "Devices relay signals, extending coverage without extra wiring",
      "It eliminates the need for a hub",
      "It only works in new builds"
    ],
    correctAnswer: 1,
    explanation: "Mesh networking allows devices to relay signals to each other, extending coverage throughout a building without running additional cables."
  },
  {
    id: 10,
    question: "What document should be provided after any smart home installation?",
    options: [
      "Only a receipt",
      "Comprehensive documentation including layouts and configurations",
      "Just the warranty card",
      "No documentation needed"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation should include device locations, network configurations, automation rules, and user guides for ongoing maintenance and support."
  }
];

const faqs = [
  {
    question: "Can any home be converted to a smart home?",
    answer: "Yes, virtually any home can incorporate smart technology. Wireless devices make retrofit possible in most buildings. The extent and type of automation may vary based on building constraints, but basic smart features can be added to almost any property."
  },
  {
    question: "Is it worth waiting for a renovation to add smart home features?",
    answer: "If renovation is planned, coordinating smart home installation can reduce costs and disruption. However, wireless retrofit solutions allow adding features anytime. Consider whether the renovation scope allows for wired infrastructure improvements."
  },
  {
    question: "What should I install first in a retrofit project?",
    answer: "Start with the network infrastructure and hub, then add high-impact devices like smart lighting and heating controls. Security sensors and environmental monitoring can follow. Build the system progressively based on priorities and budget."
  },
  {
    question: "Do I need to rewire my house for a smart home?",
    answer: "No, wireless technologies allow smart home features without rewiring. However, some features like smart switches may require neutral wires. A survey can identify what is achievable with existing wiring and what might benefit from selective upgrades."
  },
  {
    question: "How do I plan smart home features for a new build?",
    answer: "Work with the builder early in design. Plan for conduit runs, network points, and power locations. Consider future expansion. Specify smart-ready infrastructure even if devices are added later. Document all hidden infrastructure locations."
  },
  {
    question: "What is the typical cost difference between retrofit and new build?",
    answer: "New build integration during construction can be 20-40% less expensive than equivalent retrofit due to lower labour costs and no making good. However, retrofit wireless solutions are often more affordable than comprehensive wired new build systems."
  }
];

const SmartHomeModule1Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/smart-home-module-1">
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
            <span>Module 1 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Types: Retrofit vs New Build
          </h1>
          <p className="text-white/80">
            Installation approaches and practical considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Retrofit:</strong> Wireless focus, minimal disruption</li>
              <li><strong>New Build:</strong> Pre-wire, conduit, future-proof</li>
              <li><strong>Cost:</strong> New build integration typically cheaper</li>
              <li><strong>Flexibility:</strong> Both can achieve similar results</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Building age, existing wiring, construction type</li>
              <li><strong>Use:</strong> Site surveys, installation planning</li>
              <li><strong>Apply:</strong> Choosing approach based on project type</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand retrofit installation techniques and considerations",
              "Explain new build smart home planning and infrastructure",
              "Compare costs and disruption between approaches",
              "Assess scalability and future expansion options",
              "Conduct site surveys for retrofit installations",
              "Recommend appropriate approach based on project requirements"
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

        {/* Section 1: Retrofit Installations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Retrofit Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Retrofit installations add smart home technology to existing buildings. The key challenge
              is working within existing building constraints while minimising disruption to the
              occupants and the structure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retrofit Techniques:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wireless devices:</strong> Zigbee, Z-Wave, Wi-Fi sensors and actuators</li>
                <li><strong>Battery-powered sensors:</strong> No wiring required for placement</li>
                <li><strong>Smart plugs:</strong> Instant smart control for existing appliances</li>
                <li><strong>Retrofit switches:</strong> Replace existing switches with smart versions</li>
                <li><strong>Surface-mounted equipment:</strong> When concealment is not possible</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimal disruption to occupants</li>
                  <li>Can be done progressively</li>
                  <li>No major construction required</li>
                  <li>Preserves existing building character</li>
                  <li>Flexible timing and budget</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Challenges</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Limited by existing infrastructure</li>
                  <li>Higher per-device labour costs</li>
                  <li>May require neutral wire workarounds</li>
                  <li>Wireless signal obstacles (walls)</li>
                  <li>Battery maintenance requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: New Build Installations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            New Build Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              New build installations integrate smart home infrastructure during construction.
              This approach allows for comprehensive planning, optimal cable routing, and
              future-proofed infrastructure while walls are open.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">New Build Opportunities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Pre-wiring:</strong> Run cables before walls are closed</li>
                <li><strong>Conduit installation:</strong> Allow future cable additions</li>
                <li><strong>Optimal positioning:</strong> Place sensors and devices ideally</li>
                <li><strong>Structured cabling:</strong> Network and AV infrastructure</li>
                <li><strong>Central equipment locations:</strong> Proper hub and network rooms</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lower installation labour costs</li>
                  <li>Optimal infrastructure design</li>
                  <li>Concealed wiring and equipment</li>
                  <li>Future expansion capability</li>
                  <li>Wired reliability options</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Requires early design involvement</li>
                  <li>Coordination with other trades</li>
                  <li>Technology decisions before completion</li>
                  <li>Higher initial investment</li>
                  <li>Documentation critical for handover</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Cost Comparison */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cost and Disruption Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labour Cost Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New build:</strong> 20-40% lower labour as work done during construction</li>
                <li><strong>Retrofit:</strong> Higher labour for working around existing structures</li>
                <li><strong>Making good:</strong> Retrofit may require redecoration after installation</li>
                <li><strong>Access:</strong> Retrofit may require scaffolding or specialist access</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Cost Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wireless premium:</strong> Battery devices often cost more than wired</li>
                <li><strong>Bulk purchasing:</strong> New build allows better volume pricing</li>
                <li><strong>Infrastructure:</strong> New build conduit is relatively inexpensive</li>
                <li><strong>Retrofit workarounds:</strong> May need additional equipment (repeaters)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Disruption Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New build:</strong> No disruption to occupants (not yet living there)</li>
                <li><strong>Retrofit wireless:</strong> Minimal disruption (hours per area)</li>
                <li><strong>Retrofit wired:</strong> Significant disruption (cable running, making good)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Site Survey for Retrofit */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Site Survey for Retrofit
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A thorough site survey is essential before retrofit installation to identify constraints,
              opportunities, and the most appropriate technical approach.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Survey Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Existing wiring:</strong> Check for neutral wires at switch locations</li>
                <li><strong>Consumer unit:</strong> Assess capacity and RCD protection</li>
                <li><strong>Wall construction:</strong> Solid, stud, or cavity affects cable routing</li>
                <li><strong>Network infrastructure:</strong> Router location, Wi-Fi coverage</li>
                <li><strong>Power outlet locations:</strong> For hubs, routers, and powered devices</li>
                <li><strong>Signal testing:</strong> Check wireless coverage throughout</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation to Create:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Floor plans with device locations</li>
                <li>Cable route options identified</li>
                <li>Existing infrastructure notes</li>
                <li>Signal strength mapping</li>
                <li>Client requirements checklist</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Future Proofing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Future Proofing Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">New Build Future Proofing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install conduit to all rooms (even if not used initially)</li>
                <li>Provide spare capacity in consumer unit</li>
                <li>Run Cat6a or better to each room</li>
                <li>Include spare cables in conduit runs</li>
                <li>Plan central equipment location with ventilation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retrofit Future Proofing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose multi-protocol hub for flexibility</li>
                <li>Use open standards (Matter/Thread compatible)</li>
                <li>Document all installations thoroughly</li>
                <li>Leave headroom in network capacity</li>
                <li>Consider future expansion routes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Technology Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Matter standard improving interoperability</li>
                <li>Thread networking reducing protocol fragmentation</li>
                <li>Local processing becoming more common</li>
                <li>AI integration expanding capabilities</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Retrofit</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Conduct thorough site survey before quoting</li>
                <li>Test wireless coverage in all areas</li>
                <li>Check neutral wire availability early</li>
                <li>Plan phased implementation if budget constrained</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning New Build</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Engage early in design process</li>
                <li>Coordinate with builder and other trades</li>
                <li>Document all hidden infrastructure</li>
                <li>Plan for more than current requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping survey</strong> - leads to unexpected issues during installation</li>
                <li><strong>Under-specifying conduit</strong> - limits future expansion</li>
                <li><strong>Poor documentation</strong> - causes problems for future maintenance</li>
                <li><strong>Ignoring user training</strong> - reduces system adoption</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Retrofit Checklist</p>
                <ul className="space-y-0.5">
                  <li>Survey existing infrastructure</li>
                  <li>Test wireless coverage</li>
                  <li>Check neutral wire availability</li>
                  <li>Plan device locations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">New Build Checklist</p>
                <ul className="space-y-0.5">
                  <li>Early design involvement</li>
                  <li>Conduit and pre-wiring plan</li>
                  <li>Network infrastructure design</li>
                  <li>Documentation for handover</li>
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
            <Link to="/electrician/upskilling/smart-home-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/smart-home-module-2">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default SmartHomeModule1Section5;
