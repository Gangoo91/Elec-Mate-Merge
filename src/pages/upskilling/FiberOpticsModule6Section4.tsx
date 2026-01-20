import { ArrowLeft, Building2, Server, Factory, Zap, CheckCircle, AlertTriangle, BookOpen, Target, Shield, Network, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Design Scenarios - Fibre Optics Technology";
const DESCRIPTION = "Learn fibre optic design principles for campus backbones, data centres, and industrial environments including cable selection, pathway design, and future-proofing strategies.";

const quickCheckQuestions = [
  {
    question: "What is the primary advantage of using singlemode fibre for campus backbone links over 300 metres?",
    options: [
      { text: "Lower cable cost", isCorrect: false },
      { text: "Easier termination", isCorrect: false },
      { text: "Higher bandwidth capacity and longer distance support", isCorrect: true },
      { text: "Better bend radius", isCorrect: false }
    ],
    explanation: "Singlemode fibre supports virtually unlimited bandwidth over campus distances and doesn't suffer from the distance limitations that affect multimode at high data rates. This makes it ideal for future-proofing campus backbones."
  },
  {
    question: "In a data centre, what is the main benefit of using MPO/MTP connectivity?",
    options: [
      { text: "Lower connector cost", isCorrect: false },
      { text: "High-density parallel connections that support rapid deployment", isCorrect: true },
      { text: "Better signal quality than LC connectors", isCorrect: false },
      { text: "Easier cleaning and maintenance", isCorrect: false }
    ],
    explanation: "MPO/MTP connectors enable high-density parallel optics (40G, 100G, 400G) with 12 or 24 fibres in a single connector. This supports rapid deployment and efficient space utilisation in data centres."
  },
  {
    question: "Which cable type is most suitable for an industrial environment with chemical exposure?",
    options: [
      { text: "Standard LSZH indoor cable", isCorrect: false },
      { text: "Armoured cable with HDPE jacket", isCorrect: true },
      { text: "Tight-buffered indoor/outdoor cable", isCorrect: false },
      { text: "Ribbon fibre cable", isCorrect: false }
    ],
    explanation: "Armoured cables with HDPE (High-Density Polyethylene) jackets provide excellent chemical resistance along with mechanical protection from the steel armour. LSZH jackets, while safe for fires, have lower chemical resistance."
  }
];

const quizQuestions = [
  {
    question: "What is the recommended minimum fibre count for a new campus backbone installation?",
    options: [
      { text: "4 fibres", isCorrect: false },
      { text: "12 fibres", isCorrect: false },
      { text: "24 fibres minimum, with consideration for future growth", isCorrect: true },
      { text: "48 fibres is always required", isCorrect: false }
    ],
    explanation: "While requirements vary, 24 fibres is typically the minimum recommended for campus backbones, allowing for current services plus future expansion. The marginal cost of additional fibres in a cable is low compared to pulling new cable later."
  },
  {
    question: "In the TIA-942 data centre standard, what topology is recommended for structured cabling?",
    options: [
      { text: "Ring topology", isCorrect: false },
      { text: "Bus topology", isCorrect: false },
      { text: "Star topology with hierarchical distribution", isCorrect: true },
      { text: "Mesh topology", isCorrect: false }
    ],
    explanation: "TIA-942 recommends a hierarchical star topology with Main Distribution Area (MDA), Horizontal Distribution Areas (HDA), and Equipment Distribution Areas (EDA). This provides flexibility and manageability."
  },
  {
    question: "What distance limitation typically determines whether to use multimode or singlemode for a data centre link?",
    options: [
      { text: "50 metres", isCorrect: false },
      { text: "100 metres", isCorrect: false },
      { text: "300-500 metres", isCorrect: true },
      { text: "1000 metres", isCorrect: false }
    ],
    explanation: "Within a single hall or building (typically under 300m), OM4 multimode can support high-speed links cost-effectively. Beyond this distance, or for future-proofing, singlemode becomes the better choice."
  },
  {
    question: "What cable construction is recommended for outdoor campus backbone routes?",
    options: [
      { text: "Tight-buffered indoor cable", isCorrect: false },
      { text: "Loose-tube gel-filled or dry-block cable", isCorrect: true },
      { text: "LSZH indoor/outdoor rated cable", isCorrect: false },
      { text: "Ribbon cable without protection", isCorrect: false }
    ],
    explanation: "Loose-tube cables with gel-fill or dry-block water blocking provide excellent protection against moisture ingress and temperature extremes found in outdoor environments."
  },
  {
    question: "In an industrial environment with electromagnetic interference, what is fibre's main advantage over copper?",
    options: [
      { text: "Lower cost", isCorrect: false },
      { text: "Complete immunity to EMI and RFI", isCorrect: true },
      { text: "Easier installation", isCorrect: false },
      { text: "Better power delivery", isCorrect: false }
    ],
    explanation: "Fibre optic cables are completely immune to electromagnetic interference (EMI) and radio frequency interference (RFI) as they transmit light, not electrical signals. This is critical in industrial environments with motors, welders, and other EMI sources."
  },
  {
    question: "What special consideration applies to fibre installations in hazardous (explosive atmosphere) environments?",
    options: [
      { text: "Use only plastic optical fibre", isCorrect: false },
      { text: "Limit optical power levels to prevent ignition", isCorrect: true },
      { text: "Install only armoured cable", isCorrect: false },
      { text: "Fibre cannot be used in hazardous areas", isCorrect: false }
    ],
    explanation: "While fibre is intrinsically safe for EMI, high-power lasers (especially for long-reach singlemode) can potentially create ignition risks. Standards like IEC 60079 specify maximum power levels for optical equipment in hazardous zones."
  },
  {
    question: "For a leaf-spine data centre architecture, where is fibre cabling typically deployed?",
    options: [
      { text: "Only between spine switches", isCorrect: false },
      { text: "Between leaf and spine switches, with copper to servers", isCorrect: true },
      { text: "Only for external connections", isCorrect: false },
      { text: "Fibre is not used in leaf-spine architecture", isCorrect: false }
    ],
    explanation: "In modern data centres, fibre connects leaf switches to spine switches (east-west traffic), while copper (or short-reach fibre) typically connects servers to leaf switches (north-south traffic)."
  },
  {
    question: "What is the advantage of using pre-terminated trunk cables in data centres?",
    options: [
      { text: "They never need testing", isCorrect: false },
      { text: "Factory quality connectors and rapid deployment", isCorrect: true },
      { text: "They cost less than field termination", isCorrect: false },
      { text: "They can be easily re-terminated on site", isCorrect: false }
    ],
    explanation: "Pre-terminated (factory terminated) trunk cables provide consistent high-quality terminations, reduce installation time significantly, and eliminate field termination quality concerns. Testing is still required but results are typically excellent."
  },
  {
    question: "What type of pathway protection is recommended for fibre cables routed through a car park or vehicle access area?",
    options: [
      { text: "Standard PVC conduit", isCorrect: false },
      { text: "Direct burial without protection", isCorrect: false },
      { text: "Steel armoured duct or concrete-encased conduit", isCorrect: true },
      { text: "Innerduct only", isCorrect: false }
    ],
    explanation: "Vehicle areas require robust mechanical protection. Steel armoured duct or concrete-encased conduit protects against crushing loads and accidental damage from construction or maintenance activities."
  },
  {
    question: "What is the recommended approach for fibre count planning when exact future requirements are unknown?",
    options: [
      { text: "Install exactly what is needed now", isCorrect: false },
      { text: "Install 50% more than current needs", isCorrect: false },
      { text: "Install the maximum cable size the pathway can accommodate", isCorrect: false },
      { text: "Install 2-3 times current needs or a minimum of 24 fibres", isCorrect: true }
    ],
    explanation: "The incremental cost of additional fibres is small compared to the cost of pulling new cable later. A factor of 2-3 times current needs, with a practical minimum of 24 fibres for backbones, provides good future flexibility."
  }
];

const faqs = [
  {
    question: "Should I use singlemode or multimode for my campus backbone?",
    answer: "For new installations, singlemode is increasingly recommended for campus backbones, even at shorter distances. While multimode transceivers cost less, singlemode provides unlimited bandwidth headroom and is now cost-effective with modern SFP+ modules. For distances over 300m or where 40Gbps+ speeds are anticipated, singlemode is the clear choice."
  },
  {
    question: "How do I determine the right fibre count for a new installation?",
    answer: "Start with current requirements, then multiply by 2-3 for growth. Consider spare pairs for redundancy and future services. For backbones, 24-48 fibres is typical. The incremental cost of additional fibres is minimal compared to future re-cabling, so err on the side of more fibres."
  },
  {
    question: "What's the difference between TIA-942 and EN 50600 for data centres?",
    answer: "TIA-942 is the North American standard from TIA, while EN 50600 is the European standard. Both cover similar ground but have different tier classifications and specific requirements. EN 50600 integrates more closely with European electrical standards. Most modern data centre designs reference one or both."
  },
  {
    question: "Can I use indoor/outdoor rated cable throughout my campus?",
    answer: "Indoor/outdoor (I/O) rated cables can simplify installations by using one cable type throughout. However, they may not offer the same level of protection as dedicated outdoor cables for long direct-buried runs. They work well for short outdoor sections or where cable enters buildings."
  },
  {
    question: "What additional considerations apply to fibre in manufacturing facilities?",
    answer: "Consider vibration, temperature extremes, chemical exposure, cleaning regimes (high-pressure wash-down), EMI from machinery, and physical protection in traffic areas. Use appropriate cable jackets (HDPE, armoured), robust connectors (industrial IP-rated where needed), and ensure adequate pathway protection."
  },
  {
    question: "How do I future-proof a fibre installation?",
    answer: "Install more fibres than currently needed (2-3× minimum), use high-quality OS2 singlemode for backbones, ensure pathway capacity for additional cables, install spare ducts/conduits, and document everything thoroughly. Consider higher-grade multimode (OM4/OM5) where multimode is required."
  }
];

const FiberOpticsModule6Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-6" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 6</span>
          </Link>
          <span className="text-white/50 text-sm">Section 4 of 4</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 6 · SECTION 4
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Design Scenarios
          </h1>
          <p className="text-white/70 text-lg">
            Apply fibre design principles to real-world campus, data centre, and industrial environments
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Building2 className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Campus</h3>
              <p className="text-white/60 text-xs">Multi-building backbone design</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Server className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Data Centre</h3>
              <p className="text-white/60 text-xs">High-density structured cabling</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Factory className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Industrial</h3>
              <p className="text-white/60 text-xs">Harsh environment solutions</p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <ul className="space-y-3">
              {[
                "Design fibre optic backbone infrastructure for campus environments",
                "Apply data centre cabling standards and high-density solutions",
                "Specify appropriate cable and connector types for industrial applications",
                "Plan for future capacity and technology upgrades",
                "Implement pathway and protection strategies for different environments"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Campus Design */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Campus Backbone Design
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                A campus network connects multiple buildings to a central core, typically from a main equipment room (MER) or data centre. The fibre backbone must handle high bandwidth, provide redundancy, and accommodate future growth.
              </p>
            </div>

            {/* Campus Topology Diagram */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Typical Campus Topology</h4>
              <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm text-white/80 text-center">
                <p className="mb-3 text-elec-yellow">Main Equipment Room (MER)</p>
                <p className="mb-1">│</p>
                <p className="mb-1">├─── Building A (IDF)</p>
                <p className="mb-1">├─── Building B (IDF)</p>
                <p className="mb-1">├─── Building C (IDF)</p>
                <p className="mb-1">└─── Building D (IDF)</p>
                <p className="mt-3 text-white/60 text-xs">Star topology with dedicated fibres to each building</p>
              </div>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Campus Design Considerations</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fibre Type Selection</h5>
                    <p className="text-white/60 text-sm">Singlemode (OS2) recommended for backbone runs over 300m. Multimode (OM4) acceptable for shorter distances if 10G is sufficient.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fibre Count Planning</h5>
                    <p className="text-white/60 text-sm">Minimum 24 fibres per building, more for larger buildings. Include spare fibres (50-100% extra) for growth and redundancy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Pathway Planning</h5>
                    <p className="text-white/60 text-sm">Underground ducts between buildings with adequate spare capacity. Minimum 100mm diameter ducts recommended.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Redundancy</h5>
                    <p className="text-white/60 text-sm">Consider diverse routing for critical buildings. Ring or dual-star topology for high availability requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cable Selection Guide */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Campus Cable Selection Guide</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Route Type</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Recommended Cable</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Underground duct</td>
                      <td className="py-2 px-3">Loose-tube, gel-filled or dry</td>
                      <td className="py-2 px-3 text-white/60">Water blocking essential</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Direct burial</td>
                      <td className="py-2 px-3">Armoured loose-tube</td>
                      <td className="py-2 px-3 text-white/60">Rodent and crush protection</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Aerial</td>
                      <td className="py-2 px-3">ADSS or Figure-8</td>
                      <td className="py-2 px-3 text-white/60">Self-supporting or messenger wire</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Building entry</td>
                      <td className="py-2 px-3">Transition to LSZH indoor</td>
                      <td className="py-2 px-3 text-white/60">Splice at building entry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 02: Data Centre Design */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Data Centre Fibre Infrastructure
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Data centres require high-density, high-performance fibre infrastructure to support modern cloud, virtualisation, and high-performance computing workloads. The TIA-942 and EN 50600 standards provide guidance for structured cabling in these environments.
              </p>
            </div>

            {/* Data Centre Architecture */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-elec-yellow" />
                TIA-942 Hierarchical Model
              </h4>
              <div className="space-y-3">
                <div className="bg-elec-yellow/10 p-3 rounded-lg border border-elec-yellow/30">
                  <h5 className="text-elec-yellow font-medium">Entrance Room (ER)</h5>
                  <p className="text-white/60 text-sm">Service provider demarcation, external connections</p>
                </div>
                <div className="text-center text-white/40">↓</div>
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium">Main Distribution Area (MDA)</h5>
                  <p className="text-white/60 text-sm">Core switches, primary cross-connects, backbone cabling hub</p>
                </div>
                <div className="text-center text-white/40">↓</div>
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                  <h5 className="text-green-400 font-medium">Horizontal Distribution Area (HDA)</h5>
                  <p className="text-white/60 text-sm">Aggregation layer, zone distribution points</p>
                </div>
                <div className="text-center text-white/40">↓</div>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium">Equipment Distribution Area (EDA)</h5>
                  <p className="text-white/60 text-sm">Server cabinets, storage arrays, end equipment</p>
                </div>
              </div>
            </div>

            {/* Modern Data Centre Architectures */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-elec-yellow" />
                Leaf-Spine Architecture
              </h4>
              <p className="text-white/70 text-sm mb-3">
                Modern cloud data centres often use leaf-spine (also called Clos) architecture instead of traditional three-tier designs. This provides:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Consistent low latency between any two servers</li>
                <li>• Easy horizontal scaling by adding spine or leaf switches</li>
                <li>• High bandwidth for east-west traffic (server to server)</li>
                <li>• Simplified network management</li>
              </ul>
            </div>

            {/* High-Density Connectivity */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">High-Density Connectivity Solutions</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Technology</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Fibre Count</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Applications</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 font-medium text-elec-yellow">MPO-12</td>
                      <td className="py-2 px-3">12 fibres</td>
                      <td className="py-2 px-3 text-white/60">40G-SR4, 100G-SR10</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 font-medium text-elec-yellow">MPO-24</td>
                      <td className="py-2 px-3">24 fibres</td>
                      <td className="py-2 px-3 text-white/60">100G-SR4, 200G-SR4</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 font-medium text-elec-yellow">MPO-32</td>
                      <td className="py-2 px-3">32 fibres</td>
                      <td className="py-2 px-3 text-white/60">400G-SR16</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-elec-yellow">LC Duplex</td>
                      <td className="py-2 px-3">2 fibres</td>
                      <td className="py-2 px-3 text-white/60">10G, 25G, 100G-LR4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pre-terminated Solutions */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Pre-Terminated Trunk Cable Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Factory-quality terminations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Rapid deployment (hours vs days)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Reduced on-site labour
                  </li>
                </ul>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Consistent low insertion loss
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Clean room assembly conditions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    100% tested before shipping
                  </li>
                </ul>
              </div>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 03: Industrial Design */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Industrial and Harsh Environments
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Industrial environments present unique challenges including extreme temperatures, vibration, chemical exposure, EMI from machinery, and physical hazards. Fibre's immunity to electrical interference makes it ideal for these applications, but cable and connector selection is critical.
              </p>
            </div>

            {/* Environmental Challenges */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Industrial Environment Challenges
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-medium">Temperature Extremes</h5>
                    <p className="text-white/60 text-sm">-40°C to +70°C in some applications</p>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/30">
                    <h5 className="text-amber-400 font-medium">Chemical Exposure</h5>
                    <p className="text-white/60 text-sm">Oils, solvents, acids, cleaning agents</p>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                    <h5 className="text-blue-400 font-medium">Moisture/Water</h5>
                    <p className="text-white/60 text-sm">High humidity, wash-down areas, outdoor</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                    <h5 className="text-purple-400 font-medium">Vibration</h5>
                    <p className="text-white/60 text-sm">Machinery, vehicles, process equipment</p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                    <h5 className="text-green-400 font-medium">EMI/RFI</h5>
                    <p className="text-white/60 text-sm">Motors, welders, VFDs, RF equipment</p>
                  </div>
                  <div className="bg-pink-500/10 p-3 rounded-lg border border-pink-500/30">
                    <h5 className="text-pink-400 font-medium">Physical Hazards</h5>
                    <p className="text-white/60 text-sm">Impact, crushing, rodents, UV exposure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cable Solutions */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Industrial Cable Solutions</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Challenge</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Cable Solution</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Features</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Mechanical damage</td>
                      <td className="py-2 px-3">Steel wire armoured (SWA)</td>
                      <td className="py-2 px-3 text-white/60">Crush/impact resistant</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Chemical exposure</td>
                      <td className="py-2 px-3">HDPE outer jacket</td>
                      <td className="py-2 px-3 text-white/60">Chemical resistant</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Extreme temperature</td>
                      <td className="py-2 px-3">Silicone or PTFE jacket</td>
                      <td className="py-2 px-3 text-white/60">-60°C to +200°C range</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Rodents</td>
                      <td className="py-2 px-3">Steel tape armour</td>
                      <td className="py-2 px-3 text-white/60">Gnaw resistant</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Continuous flexing</td>
                      <td className="py-2 px-3">Flexible tactical cable</td>
                      <td className="py-2 px-3 text-white/60">Drag chain rated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Industrial Connectors */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-elec-yellow" />
                Industrial Connector Solutions
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-xs">IP67</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">IP-Rated Connector Housings</h5>
                    <p className="text-white/60 text-sm">Sealed housings protect standard LC or SC connectors from dust and water ingress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-xs">ODC</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Outdoor Connectors (ODC)</h5>
                    <p className="text-white/60 text-sm">Ruggedised multi-fibre connectors designed for field deployment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-xs">MIL</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Military-Spec Connectors</h5>
                    <p className="text-white/60 text-sm">Extreme durability for harshest environments (MIL-DTL-38999 style)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Hazardous Area Considerations
              </h4>
              <p className="text-white/70 text-sm">
                In explosive atmospheres (ATEX/IECEx zones), fibre optic equipment must be certified for the zone classification. While fibre itself doesn't generate sparks, high-power optical sources can potentially cause ignition. Use certified equipment and follow IEC 60079 requirements.
              </p>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 04: Future-Proofing Strategies */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Future-Proofing Strategies
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                A well-designed fibre infrastructure should serve the organisation for 15-25 years. Future-proofing requires balancing current needs against anticipated growth and technology evolution.
              </p>
            </div>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Key Future-Proofing Principles</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Install More Fibres Than Needed</span>
                    <p className="text-white/60 text-sm">The incremental cost of additional fibres is minimal compared to pulling new cable later. Install 2-3× current needs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Choose High-Grade Fibre</span>
                    <p className="text-white/60 text-sm">OS2 singlemode for backbones, OM4 or OM5 where multimode is required. Higher grades cost marginally more but last longer.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Provide Pathway Capacity</span>
                    <p className="text-white/60 text-sm">Install larger ducts and trays than currently needed. Include spare ducts for future cables.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Design for Higher Speeds</span>
                    <p className="text-white/60 text-sm">Minimise connections and ensure low insertion loss. Today's 10G backbone may need to support 100G in future.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Document Thoroughly</span>
                    <p className="text-white/60 text-sm">Accurate records are essential for future modifications. Test results, as-built drawings, and labelling must be maintained.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* OM5 Wideband Multimode */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                OM5 Wideband Multimode Fibre
              </h4>
              <p className="text-white/70 text-sm">
                OM5 fibre is optimised for shortwave wavelength division multiplexing (SWDM), supporting multiple wavelengths (850-953nm) over a single fibre pair. This enables 40G and 100G over duplex connections instead of parallel optics, making it a good choice for data centre future-proofing where multimode is preferred.
              </p>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Design Checklist
            </h2>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Pre-Design Questions</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What are the current bandwidth requirements per link?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What bandwidth growth is anticipated over 10-15 years?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What are the maximum cable run distances?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What environmental conditions will cables encounter?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What redundancy/availability requirements apply?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What standards must the installation meet?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  What is the existing pathway infrastructure?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">□</span>
                  Are there any special requirements (hazardous areas, clean rooms, etc.)?
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#252525] rounded-lg p-5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Design Recommendations
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Campus</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• OS2 singlemode backbone</li>
                    <li>• 24-48+ fibres per building</li>
                    <li>• Loose-tube outdoor cable</li>
                    <li>• Diverse routing for redundancy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Data Centre</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• OM4/OM5 for short reach</li>
                    <li>• MPO for high density</li>
                    <li>• Pre-terminated trunks</li>
                    <li>• TIA-942 or EN 50600</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Industrial</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Armoured cables</li>
                    <li>• IP67+ connectors</li>
                    <li>• Chemical-resistant jackets</li>
                    <li>• Ruggedised enclosures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 4 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-6-section-3"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Loss Budgets
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-7"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Module 7 - Fault Finding
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule6Section4;
