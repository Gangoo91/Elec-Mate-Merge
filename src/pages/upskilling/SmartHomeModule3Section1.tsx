import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Types of Smart Lighting Systems";
const DESCRIPTION = "Smart bulbs, switches, wired systems, and hybrid approaches for different installations";

const quickCheckQuestions = [
  {
    question: "Which smart lighting solution is best for renters who cannot modify wiring?",
    options: ["Smart switches", "Centralised wired control", "Smart bulbs", "DALI systems"],
    correctIndex: 2,
    explanation: "Smart bulbs screw into existing fittings without any wiring modifications, making them ideal for renters who need portable, non-permanent solutions."
  },
  {
    question: "What is a key limitation of smart bulbs compared to smart switches?",
    options: ["Cannot be dimmed", "Stop working if wall switch is turned off", "Higher power consumption", "Limited colour options"],
    correctIndex: 1,
    explanation: "Smart bulbs require constant power to function. If someone turns off the wall switch, the bulb loses power and cannot be controlled wirelessly until power is restored."
  },
  {
    question: "Why are centralised wired systems often preferred for new builds?",
    options: ["Lower cost", "No hub required", "Reliability and single point of control", "Easier installation"],
    correctIndex: 2,
    explanation: "Centralised wired systems (like DALI or KNX) offer superior reliability, professional-grade control, and easier maintenance through a single control point, justifying the higher installation cost in new builds."
  }
];

const quizQuestions = [
  {
    question: "Which component is NOT typically found in a smart bulb?",
    options: ["LED emitter", "Wireless radio", "Driver circuit", "Physical dimmer potentiometer"],
    correctIndex: 3,
    explanation: "Smart bulbs integrate LED emitters, wireless radios, and driver circuits internally. Dimming is controlled digitally via the wireless protocol, not through a physical potentiometer."
  },
  {
    question: "What wiring modification does a smart switch require?",
    options: ["None - plug and play", "Neutral wire at switch location", "Three-phase supply", "Dedicated circuit breaker"],
    correctIndex: 1,
    explanation: "Most smart switches require a neutral wire to power their internal electronics. Many older UK switch installations lack neutral wires, requiring rewiring or neutral-free switch alternatives."
  },
  {
    question: "Which protocol is commonly used in commercial centralised lighting control?",
    options: ["Zigbee", "Z-Wave", "DALI", "Bluetooth"],
    correctIndex: 2,
    explanation: "DALI (Digital Addressable Lighting Interface) is the industry standard for commercial lighting control, offering reliable digital communication and individual fixture addressing."
  },
  {
    question: "What is a hybrid lighting system?",
    options: ["Battery and mains powered", "Indoor and outdoor combined", "Mix of smart bulbs, switches, and wired control", "LED and fluorescent mix"],
    correctIndex: 2,
    explanation: "Hybrid systems combine different smart lighting technologies based on room requirements, such as smart switches for permanent fixtures and smart bulbs for lamps."
  },
  {
    question: "Which factor most influences the choice between retrofit and new-build lighting solutions?",
    options: ["Customer age", "Access to cabling and wiring infrastructure", "Time of year", "Internet speed"],
    correctIndex: 1,
    explanation: "Access to cabling determines whether you can install centralised wired systems (new build/major renovation) or must use wireless retrofit solutions."
  }
];

const faqs = [
  {
    question: "Can I mix smart bulbs and smart switches in the same home?",
    answer: "Yes, this is a common hybrid approach. Use smart switches for permanent fixtures where you want normal wall control, and smart bulbs for lamps or fixtures where you want colour changing. Avoid putting smart bulbs on smart dimmer switches."
  },
  {
    question: "What happens to smart lighting if the internet goes down?",
    answer: "Local control (via physical switches and local hub commands) typically continues working. Cloud-dependent features like voice control and remote access will be unavailable until internet is restored."
  },
  {
    question: "Should I recommend DALI or KNX for residential installations?",
    answer: "For high-end new builds with substantial budgets, KNX offers comprehensive whole-home automation. For simpler lighting-focused control, DALI is more cost-effective. Most residential retrofits use Zigbee or Z-Wave instead."
  }
];

const SmartHomeModule3Section1 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 3`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 1 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 3 - Section 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Retrofit Options</p>
            <p className="text-white text-sm">Smart bulbs and wireless switches for existing homes</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">New Build Options</p>
            <p className="text-white text-sm">Centralised wired control systems like DALI and KNX</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Compare smart bulbs, smart switches, and centralised systems",
              "Identify appropriate lighting solutions for retrofit and new build scenarios",
              "Understand wiring requirements for different smart lighting types",
              "Design hybrid lighting systems combining multiple technologies"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Bulbs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Bulbs
          </h2>
          <p className="text-white mb-4">
            Smart bulbs are self-contained lighting devices with integrated wireless connectivity, driver circuitry, and LED emitters. They screw into standard lamp holders and require no additional wiring or installation modifications.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">How They Work</p>
              <p className="text-white text-sm">The bulb contains a wireless radio (Zigbee, Wi-Fi, or Bluetooth) that receives commands from a hub or smartphone, adjusting brightness and colour via the internal driver.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Installation</p>
              <p className="text-white text-sm">Simply screw into existing E27, E14, B22, or GU10 sockets. No electrician required for basic installation, making them ideal for DIY customers.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Features</p>
              <p className="text-white text-sm">Dimming, colour temperature adjustment (tunable white), full RGB colour (colour-changing models), scheduling, and scene integration.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Limitation</p>
            <p className="text-white text-sm">Smart bulbs require constant power. If the wall switch is turned off, the bulb loses power and cannot respond to wireless commands until power is restored.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Smart Switches */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Switches
          </h2>
          <p className="text-white mb-4">
            Smart switches replace traditional wall switches, adding wireless connectivity and smart control to existing light fittings. They control the power supply to the fixture, allowing use of standard (non-smart) bulbs.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Neutral Wire Requirement</p>
              <p className="text-white text-sm">Most smart switches require a neutral wire at the switch location to power internal electronics. Many older UK installations lack neutral wires at switches.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Neutral-Free Options</p>
              <p className="text-white text-sm">Some manufacturers (Lutron Caseta, some Zigbee modules) offer switches that work without neutral by using a small bleed current through the load.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Dimmer Switches</p>
              <p className="text-white text-sm">Smart dimmer switches must be compatible with the lamp type (LED, incandescent, etc.). Trailing-edge dimmers are typically required for LED compatibility.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Installation Note</p>
            <p className="text-white text-sm">Smart switch installation is electrical work and should be carried out by a qualified electrician, especially where wiring modifications are needed.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Centralised Wired Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Centralised Wired Systems
          </h2>
          <p className="text-white mb-4">
            Centralised systems run dedicated control cabling to each light fixture, managed from a central controller. These professional-grade solutions offer superior reliability and are typically installed during new construction or major renovation.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">DALI (Digital Addressable Lighting Interface)</p>
              <p className="text-white text-sm">Industry standard for commercial lighting. Each fixture has a unique address, enabling individual control, monitoring, and feedback via a two-wire bus.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">KNX</p>
              <p className="text-white text-sm">European building automation standard covering lighting, HVAC, blinds, and security. Offers comprehensive whole-building integration but requires specialist programming.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Lutron HomeWorks</p>
              <p className="text-white text-sm">High-end residential solution using proprietary wiring. Known for reliability and integration with luxury home automation systems.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Cost Consideration</p>
            <p className="text-white text-sm">Centralised systems have higher upfront costs due to cabling requirements and specialist equipment, but offer lower long-term maintenance and superior reliability.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Hybrid Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Hybrid Lighting Systems
          </h2>
          <p className="text-white mb-4">
            Hybrid approaches combine different technologies based on room requirements and customer needs. This pragmatic approach often provides the best balance of functionality, cost, and convenience.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Typical Hybrid Configuration</p>
              <p className="text-white text-sm">Smart switches for ceiling lights (maintaining normal wall control), smart bulbs for table lamps (adding colour/dimming), and wired dimmers in key areas (reliability).</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Integration Considerations</p>
              <p className="text-white text-sm">Ensure all components can be controlled from a single platform. A smart home hub or Matter-compatible ecosystem simplifies hybrid integration.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">User Experience</p>
              <p className="text-white text-sm">Design for intuitive daily use. Wall switches should work normally, with smart features as enhancements rather than replacements.</p>
            </div>
          </div>
        </section>

        {/* Retrofit vs New Build */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Retrofit vs New Build Considerations
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Retrofit Installations</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Limited access to cabling</li>
                <li>Wireless solutions preferred</li>
                <li>Smart bulbs for quick wins</li>
                <li>Neutral wire availability varies</li>
                <li>Minimise disruption to decor</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">New Build Installations</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Full cabling access during construction</li>
                <li>Wired systems practical</li>
                <li>Plan neutral wires at all switches</li>
                <li>Centralised control viable</li>
                <li>Future-proof infrastructure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Victorian Terrace Retrofit</p>
            <p className="text-white text-sm mb-3">
              A customer wants smart lighting throughout their Victorian terrace. The property has no neutral wires at switches and they want to avoid major rewiring.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Recommended Solution:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li>Smart bulbs (Hue or IKEA) for ceiling pendants and wall lights</li>
              <li>Lutron Aurora or Hue dimmer switches mounted over existing switches</li>
              <li>Smart plugs for table lamps that do not need dimming</li>
              <li>Single hub (Hue Bridge) to unify control</li>
            </ul>
            <p className="text-white text-sm mt-3"><span className="text-elec-yellow">Result:</span> Full smart lighting control without rewiring, maintaining period aesthetic.</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5">
                <p className="text-white font-medium mb-2">{faq.question}</p>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-2">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule3Section1;
