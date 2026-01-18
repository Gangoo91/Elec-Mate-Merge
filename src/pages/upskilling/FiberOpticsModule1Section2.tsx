import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Advantages vs Copper Systems - Fibre Optics Course";
const DESCRIPTION = "Compare fibre optic and copper cabling systems. Understand bandwidth, distance, EMI immunity, and total cost of ownership differences.";

const quickCheckQuestions = [
  {
    id: "fo-m1s2-qc1",
    question: "What is the maximum reliable distance for Cat6A copper Ethernet?",
    options: ["10 metres", "55 metres", "100 metres", "500 metres"],
    correctIndex: 2,
    explanation: "Cat6A Ethernet has a maximum channel length of 100 metres (90m permanent link + 10m patch cords). Fibre can extend much further."
  },
  {
    id: "fo-m1s2-qc2",
    question: "Why is fibre immune to electromagnetic interference?",
    options: ["It uses stronger signals", "Light doesn't conduct electricity", "It has better shielding", "It operates at higher frequencies"],
    correctIndex: 1,
    explanation: "Since fibre transmits light through glass (a dielectric), there's no electrical component that can be affected by electromagnetic fields."
  },
  {
    id: "fo-m1s2-qc3",
    question: "Which cable type has the highest bandwidth potential?",
    options: ["Cat6A copper", "Cat8 copper", "Singlemode fibre", "Coaxial cable"],
    correctIndex: 2,
    explanation: "Singlemode fibre has bandwidth potential in the petabit range. Even multimode fibre exceeds Cat8 copper's maximum 40Gbps at 30m."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main bandwidth limitation of copper cabling?",
    options: ["Cable cost", "Signal attenuation and crosstalk at high frequencies", "Weight of cables", "Colour coding issues"],
    correctAnswer: 1,
    explanation: "Signal attenuation and crosstalk increase dramatically at higher frequencies, limiting copper's bandwidth potential."
  },
  {
    id: 2,
    question: "At 10Gbps, how far can multimode OM4 fibre reliably transmit?",
    options: ["100 metres", "300-400 metres", "10 kilometres", "100 kilometres"],
    correctAnswer: 1,
    explanation: "OM4 multimode fibre supports 10Gbps up to 400 metres, making it ideal for building backbones."
  },
  {
    id: 3,
    question: "Which environment particularly benefits from fibre's EMI immunity?",
    options: ["Home offices", "Industrial facilities with heavy machinery", "Small retail shops", "Residential buildings"],
    correctAnswer: 1,
    explanation: "Industrial environments with motors, drives and heavy machinery generate significant EMI that can disrupt copper networks."
  },
  {
    id: 4,
    question: "What is 'alien crosstalk' in copper cabling?",
    options: ["Signals from space", "Interference between adjacent cables", "Signal reflection", "Ground loop noise"],
    correctAnswer: 1,
    explanation: "Alien crosstalk is interference between signals in adjacent cables, a significant issue for copper at high frequencies."
  },
  {
    id: 5,
    question: "Which cable type is easier to tap for eavesdropping?",
    options: ["Fibre optic", "Copper (emissions can be detected)", "Both equally difficult", "Neither can be tapped"],
    correctAnswer: 1,
    explanation: "Copper cables emit electromagnetic radiation that can be detected. Fibre doesn't radiate and is very difficult to tap."
  },
  {
    id: 6,
    question: "What is the typical weight comparison between equivalent fibre and copper cables?",
    options: ["Fibre is heavier", "Roughly the same", "Fibre is significantly lighter", "Depends on manufacturer only"],
    correctAnswer: 2,
    explanation: "Fibre cables are much lighter than equivalent copper cables, reducing installation effort and infrastructure loading."
  },
  {
    id: 7,
    question: "Why might copper still be preferred for desktop connections?",
    options: ["Higher bandwidth", "Can carry PoE (Power over Ethernet)", "Better security", "Longer distances"],
    correctAnswer: 1,
    explanation: "Copper can deliver power and data simultaneously via PoE, essential for IP phones, WiFi APs, and cameras."
  },
  {
    id: 8,
    question: "What is the primary disadvantage of fibre for termination?",
    options: ["Slower speeds", "Requires specialised tools and training", "Cannot be bent", "Too expensive"],
    correctAnswer: 1,
    explanation: "Fibre requires specialised equipment and training for termination, unlike copper's simple RJ45 connectors."
  },
  {
    id: 9,
    question: "How does fibre compare to copper for total cost of ownership over 10+ years?",
    options: ["Always more expensive", "Often lower due to longevity and upgrade potential", "Exactly the same", "Cannot be compared"],
    correctAnswer: 1,
    explanation: "Fibre's longer lifespan and ability to support speed upgrades with just transceiver changes often makes TCO lower."
  },
  {
    id: 10,
    question: "Which standard defines Category 6A copper cable performance?",
    options: ["IEEE 802.3", "TIA-568", "ISO 9001", "BS 7671"],
    correctAnswer: 1,
    explanation: "TIA-568 (and its ISO equivalent ISO 11801) defines structured cabling standards including Category ratings."
  }
];

const faqs = [
  {
    question: "When should I choose fibre over copper?",
    answer: "Choose fibre for: distances over 100m, 10Gbps+ speeds, EMI-heavy environments, security-sensitive links, future-proofing requirements, or where weight/space is limited. Copper suits shorter runs and where PoE is needed."
  },
  {
    question: "Is fibre always faster than copper?",
    answer: "Fibre has higher bandwidth potential, but at shorter distances (&lt;100m), Cat6A/Cat8 copper can match fibre speeds (10-40Gbps). The difference becomes significant at longer distances and higher speeds."
  },
  {
    question: "Can I replace copper with fibre in an existing building?",
    answer: "Yes, but you'll need media converters or fibre NICs at endpoints, plus potentially new patch panels and infrastructure. Often done for backbone upgrades while keeping copper to desktops."
  },
  {
    question: "What about Power over Ethernet with fibre?",
    answer: "Standard fibre cannot carry electrical power. Solutions include hybrid cables (fibre + copper pairs), separate power runs, or PoE media converters at endpoints."
  },
  {
    question: "Is copper cabling becoming obsolete?",
    answer: "Not for desktop connectivity. Cat6A supports current needs well, and PoE remains copper-dependent. However, backbone and high-speed links are increasingly fibre-only."
  },
  {
    question: "How does installation cost compare?",
    answer: "Fibre materials cost more than copper, but installation can be faster (lighter cables, smaller containment). Total installed cost depends heavily on project specifics. Long-term fibre often wins on TCO."
  }
];

const FiberOpticsModule1Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Advantages vs Copper Systems
          </h1>
          <p className="text-white/80">
            Understanding when fibre outperforms copper and making informed cabling decisions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Bandwidth:</strong> Fibre &gt;&gt; Copper (Tbps vs Gbps)</li>
              <li><strong>Distance:</strong> Fibre km vs Copper 100m</li>
              <li><strong>EMI:</strong> Fibre immune, Copper susceptible</li>
              <li><strong>PoE:</strong> Copper only (standard)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fibre:</strong> Backbone, long runs, high speed, EMI zones</li>
              <li><strong>Copper:</strong> Desktop, PoE devices, &lt;100m runs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare bandwidth capabilities of fibre and copper",
              "Understand distance limitations of each technology",
              "Explain EMI immunity advantages of fibre",
              "Identify when copper is still the preferred choice",
              "Evaluate total cost of ownership considerations",
              "Make informed decisions for specific applications"
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
            Bandwidth Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bandwidth represents the data-carrying capacity of a transmission medium. Fibre optic cables
              dramatically outperform copper in terms of maximum bandwidth and the speeds achievable at various distances.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Speed and Distance Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cat5e:</strong> 1 Gbps max, 100m, no 10G support</li>
                <li><strong>Cat6:</strong> 10 Gbps, 55m at 10G</li>
                <li><strong>Cat6A:</strong> 10 Gbps, 100m full distance</li>
                <li><strong>Cat8:</strong> 40 Gbps, 30m only</li>
                <li><strong>OM3/OM4:</strong> 100 Gbps, 300-400m at 10G</li>
                <li><strong>OS2 Singlemode:</strong> 100+ Gbps, 10km+ at 10G</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Why Fibre Has More Bandwidth</p>
              <ul className="text-sm text-white space-y-1">
                <li>Light frequencies are in terahertz range (much higher than electrical signals)</li>
                <li>No crosstalk between fibres (light doesn't radiate from glass)</li>
                <li>Lower attenuation allows higher frequencies over longer distances</li>
                <li>Wavelength division multiplexing (WDM) allows multiple channels per fibre</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Distance Capabilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The distance over which a cable can reliably carry signals is determined by attenuation
              (signal loss) and dispersion (signal spreading). Fibre dramatically outperforms copper.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm font-medium text-red-400 mb-2">Copper Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>100m maximum for Ethernet (TIA-568)</li>
                  <li>Signal degrades rapidly with frequency</li>
                  <li>Crosstalk increases at higher speeds</li>
                  <li>Active equipment needed every 100m</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Fibre Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Multimode: 300-550m typical (10Gbps)</li>
                  <li>Singlemode: 10-80km without amplification</li>
                  <li>Transoceanic cables span thousands of km</li>
                  <li>Low attenuation (0.2-0.5 dB/km SM)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Distance Scenarios:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Office Floor (50-100m):</strong> Copper Cat6A suitable</li>
                <li><strong>Building Riser (100-500m):</strong> Multimode fibre preferred</li>
                <li><strong>Campus (500m-2km):</strong> Singlemode or high-grade multimode</li>
                <li><strong>Metro/WAN (2-80km):</strong> Singlemode only</li>
                <li><strong>Long-haul (80km+):</strong> Singlemode with amplifiers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electromagnetic Interference (EMI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic interference is a significant concern in many environments. Copper cables
              are susceptible to interference, while fibre is completely immune.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EMI Sources Affecting Copper:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Industrial:</strong> Electric motors, drives, welding, high-voltage switchgear</li>
                <li><strong>Building:</strong> Fluorescent lighting, lifts, HVAC, power distribution</li>
                <li><strong>External:</strong> Radio transmitters, mobile masts, lightning, power lines</li>
                <li><strong>Medical:</strong> MRI machines, X-ray equipment, diagnostic devices</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Why Fibre is Immune</p>
              <ul className="text-sm text-white space-y-1">
                <li>No electrical current = nothing for EM fields to affect</li>
                <li>No ground loops possible (common copper problem)</li>
                <li>No crosstalk between fibres (light doesn't radiate)</li>
                <li>Safe in hazardous areas (no spark risk)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When Copper is Still the Right Choice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Despite fibre's advantages, copper cabling remains the practical choice for many applications.
              Understanding when copper is appropriate helps make cost-effective decisions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Copper Advantages:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Power over Ethernet (PoE):</strong> Delivers power and data simultaneously. Essential for IP phones, WiFi APs, CCTV, IoT devices. PoE++ delivers up to 90W.</li>
                <li><strong className="text-elec-yellow">Simpler Termination:</strong> RJ45 connectors are easy to terminate with basic tools. Most IT staff can terminate copper.</li>
                <li><strong className="text-elec-yellow">Lower Equipment Cost:</strong> Copper network interfaces cost less than fibre. No media converters needed.</li>
                <li><strong className="text-elec-yellow">Repair Simplicity:</strong> Damaged copper can be re-terminated in minutes. Fibre requires splicing equipment.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Choose Copper When</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Distance under 100m</li>
                  <li>PoE required</li>
                  <li>1-10Gbps speeds sufficient</li>
                  <li>Low EMI environment</li>
                  <li>Desktop/workstation connections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Choose Fibre When</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Distance over 100m</li>
                  <li>10Gbps+ speeds needed</li>
                  <li>EMI concerns present</li>
                  <li>Security is critical</li>
                  <li>Backbone/riser applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Total Cost of Ownership
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While fibre has higher upfront costs, total cost of ownership (TCO) over 10-15 years often
              favours fibre, especially for backbone infrastructure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Long-Term Considerations</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Upgrade Path:</strong> Fibre installed today can support 100Gbps+ with transceiver upgrades alone</li>
                <li><strong>Lifespan:</strong> Fibre infrastructure typically lasts 25+ years vs 10-15 for copper</li>
                <li><strong>Maintenance:</strong> Fibre has fewer failure points and lower maintenance costs</li>
                <li><strong>Space:</strong> Fibre requires less containment, potentially lower installation costs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Framework</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify distance requirements - Under 100m? Copper may suffice</li>
                <li>2. Assess speed needs - Current and projected. Plan for 10 years ahead</li>
                <li>3. Check environment - EMI sources? Industrial setting? Consider fibre</li>
                <li>4. PoE requirements - If needed at endpoints, plan for copper drops or hybrid</li>
                <li>5. Calculate TCO - Include potential upgrades in cost comparison</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Initial cost focus</strong> - choosing based on upfront cost without considering TCO</li>
                <li><strong>Under-specifying copper</strong> - installing Cat5e/Cat6 when Cat6A is only slightly more expensive</li>
                <li><strong>Copper backbone</strong> - using copper for backbone when fibre would future-proof</li>
                <li><strong>Ignoring EMI</strong> - not considering EMI in industrial environments</li>
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
                <p className="text-sm text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Fibre vs Copper</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Fibre Wins</p>
                <ul className="space-y-0.5">
                  <li>Bandwidth (Tbps potential)</li>
                  <li>Distance (km range)</li>
                  <li>EMI immunity</li>
                  <li>Security</li>
                  <li>Long-term upgrade path</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Copper Wins</p>
                <ul className="space-y-0.5">
                  <li>PoE capability</li>
                  <li>Simpler termination</li>
                  <li>Lower initial cost</li>
                  <li>Universal device compatibility</li>
                  <li>Easier field repair</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What is Fibre Optic?
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next: Commercial & Industrial Use
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule1Section2;
