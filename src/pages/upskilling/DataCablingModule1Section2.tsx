import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m1s2-check1",
    question: "In a star topology, what happens if the central hub fails?",
    options: [
      "Only one device is affected",
      "The entire network fails",
      "Traffic reroutes automatically",
      "Performance reduces slightly"
    ],
    correctIndex: 1,
    explanation: "In star topology, all devices connect through a central hub or switch. If this central device fails, all connected devices lose network connectivity."
  },
  {
    id: "datacabling-m1s2-check2",
    question: "Which topology provides the highest redundancy?",
    options: ["Star", "Bus", "Ring", "Full mesh"],
    correctIndex: 3,
    explanation: "Full mesh topology provides the highest redundancy because every device is connected to every other device, offering multiple paths for data transmission."
  },
  {
    id: "datacabling-m1s2-check3",
    question: "What is the main advantage of star topology over bus topology?",
    options: [
      "Lower cost",
      "Better fault isolation",
      "Less cabling required",
      "Simpler design"
    ],
    correctIndex: 1,
    explanation: "Star topology provides better fault isolation - if one cable fails, only that device is affected. In bus topology, a single cable break can disable the entire network."
  }
];

const faqs = [
  {
    question: "What's the difference between physical and logical topology?",
    answer: "Physical topology refers to the actual physical layout of cables and devices, whilst logical topology describes how data flows through the network. A network might be physically wired in a star but logically operate as a ring."
  },
  {
    question: "Can I mix different topologies in the same network?",
    answer: "Yes, this is called a hybrid topology. Most modern networks combine different topologies to optimise performance, cost, and reliability - for example, star topology within buildings and mesh between buildings."
  },
  {
    question: "Why is star topology preferred over bus topology?",
    answer: "Star topology offers better fault isolation, easier troubleshooting, dedicated bandwidth per connection, and simpler maintenance. Bus topology is cheaper but has performance and reliability limitations."
  },
  {
    question: "When would I choose mesh topology despite its high cost?",
    answer: "Mesh topology is chosen for mission-critical applications where downtime is unacceptable, such as financial trading networks, emergency services, or data centre interconnections."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client requires maximum network reliability with no single point of failure. Which topology should you recommend?",
  options: [
    "Star topology",
    "Bus topology",
    "Ring topology",
    "Full mesh topology"
  ],
  correctAnswer: 3,
  explanation: "Full mesh topology provides maximum redundancy with no single point of failure. Every device connects to every other device, so if any link fails, traffic can be rerouted through alternative paths."
  }
];

const DataCablingModule1Section2 = () => {
  useSEO({
    title: "Network Topologies | Data Cabling Module 1.2",
    description: "Learn about network topologies including star, bus, ring, and mesh configurations for structured cabling systems."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Topologies: Star, Bus, Ring, Mesh
          </h1>
          <p className="text-white/80">
            Network topology types and configurations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Star:</strong> Central hub/switch connects all devices</li>
              <li><strong>Mesh:</strong> Every device connected to every other</li>
              <li><strong>Hybrid:</strong> Most common in real networks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Central switch rooms, patch panel layouts</li>
              <li><strong>Use:</strong> Choose based on reliability vs cost needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the four main topology types",
              "Understand advantages and disadvantages",
              "Select appropriate topology for requirements",
              "Recognise hybrid topology approaches",
              "Calculate redundancy requirements",
              "Design resilient network layouts"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Star Topology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Star topology is the most common design in modern networks. All devices connect
              to a central hub or switch, which manages all network traffic.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Easy to install and manage</li>
                  <li>Fault isolation - one cable failure affects only one device</li>
                  <li>Easy to add new devices</li>
                  <li>Dedicated bandwidth per connection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Central hub is single point of failure</li>
                  <li>More cabling required than bus</li>
                  <li>Hub/switch cost adds to infrastructure</li>
                  <li>Cable length limited to hub distance</li>
                </ul>
              </div>
            </div>

            <p>
              Star topology is ideal for office environments where ease of management and
              fault isolation are priorities. Modern Ethernet networks are built on star topology.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bus and Ring Topologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bus and ring topologies were common in earlier networks but are now less
              frequently used due to reliability concerns.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bus Topology</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All devices share single cable backbone</li>
                  <li>Low cost - minimal cabling</li>
                  <li>Cable break affects entire network</li>
                  <li>Limited scalability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Topology</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Devices form continuous loop</li>
                  <li>Predictable performance</li>
                  <li>Single break can disable network</li>
                  <li>Used in some industrial protocols</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Bus</p>
                <p className="text-white/90 text-xs">Shared backbone</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Ring</p>
                <p className="text-white/90 text-xs">Closed loop</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Dual Ring</p>
                <p className="text-white/90 text-xs">Redundant ring</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mesh and Hybrid Topologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mesh topology provides maximum redundancy by connecting every device to every
              other device. Hybrid topologies combine different approaches.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mesh Topology Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Full mesh:</strong> Every device connected to every other device</li>
                <li><strong>Partial mesh:</strong> Critical devices have multiple connections</li>
                <li><strong>Wireless mesh:</strong> Common in Wi-Fi networks</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mesh Connection Formula:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Full mesh links = n(n-1)/2 where n = number of devices</li>
                <li>10 devices = 45 connections required</li>
                <li>Cost increases exponentially with device count</li>
              </ul>
            </div>

            <p>
              Most real networks use hybrid topologies - star topology within buildings with
              mesh connections between buildings for redundancy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Topology Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess reliability requirements and acceptable downtime</li>
                <li>Calculate cabling and equipment costs</li>
                <li>Consider future expansion needs</li>
                <li>Evaluate management complexity</li>
                <li>Match topology to application criticality</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-engineering:</strong> — Full mesh where star suffices</li>
                <li><strong>Under-engineering:</strong> — No redundancy for critical links</li>
                <li><strong>Single point of failure:</strong> — Not identifying critical nodes</li>
                <li><strong>Ignoring growth:</strong> — No capacity for expansion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Topology Characteristics</p>
              <ul className="space-y-0.5">
                <li>Star: Easy management, central failure point</li>
                <li>Mesh: High redundancy, high cost</li>
                <li>Bus/Ring: Legacy, limited use</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Selection Guide</p>
              <ul className="space-y-0.5">
                <li>Office: Star topology</li>
                <li>Critical links: Mesh/redundant</li>
                <li>Campus: Hybrid approach</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule1Section2;