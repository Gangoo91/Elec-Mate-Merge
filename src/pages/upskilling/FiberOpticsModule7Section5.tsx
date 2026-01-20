import { ArrowLeft, TrendingUp, Zap, CheckCircle, AlertTriangle, BookOpen, Target, Layers, ArrowUpRight, Settings, Clock, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Upgrade Planning and Network Expansion - Fibre Optics Technology";
const DESCRIPTION = "Learn strategies for planning fibre network upgrades, capacity assessment, technology migration paths, and expansion planning for growing bandwidth demands.";

const quickCheckQuestions = [
  {
    question: "What is the primary advantage of upgrading transceivers rather than replacing fibre infrastructure?",
    options: [
      { text: "Transceivers are always more reliable", isCorrect: false },
      { text: "Lower cost and less disruption—existing fibre can often support higher speeds", isCorrect: true },
      { text: "Transceivers provide better signal quality", isCorrect: false },
      { text: "Standards require transceiver upgrades first", isCorrect: false }
    ],
    explanation: "Fibre infrastructure typically has capacity headroom. Upgrading to faster transceivers (10G to 25G, for example) on existing fibre is far less expensive and disruptive than replacing cabling, provided the fibre type and loss budget support the new speed."
  },
  {
    question: "Why is OM4 or OM5 multimode fibre preferred over OM3 for future-proofed installations?",
    options: [
      { text: "OM4/OM5 cables are more flexible", isCorrect: false },
      { text: "OM4/OM5 has higher bandwidth enabling longer distances at higher data rates", isCorrect: true },
      { text: "OM4/OM5 is less expensive", isCorrect: false },
      { text: "OM4/OM5 uses different connectors", isCorrect: false }
    ],
    explanation: "OM4 has higher modal bandwidth (4700 MHz·km vs 2000 MHz·km for OM3 at 850nm), supporting higher speeds over longer distances. OM5 adds wideband capability for SWDM, enabling 40G/100G over duplex fibres."
  },
  {
    question: "When expanding a fibre network, what should be verified about existing infrastructure first?",
    options: [
      { text: "Only the number of spare fibres", isCorrect: false },
      { text: "Spare fibre count, fibre type, current loss, and pathway capacity", isCorrect: true },
      { text: "Only the age of the cables", isCorrect: false },
      { text: "Only whether the documentation exists", isCorrect: false }
    ],
    explanation: "A proper capacity assessment examines: available spare fibres, fibre type (SM/MM grade), current loss measurements to verify condition, and pathway capacity for additional cables if needed."
  }
];

const quizQuestions = [
  {
    question: "What is SWDM (Shortwave Wavelength Division Multiplexing) and why is it significant for upgrades?",
    options: [
      { text: "A method for testing fibre at multiple wavelengths", isCorrect: false },
      { text: "A technology enabling 40G/100G over duplex OM5 multimode fibre", isCorrect: true },
      { text: "A new singlemode fibre specification", isCorrect: false },
      { text: "A splice technique for multimode fibre", isCorrect: false }
    ],
    explanation: "SWDM uses multiple wavelengths (850-953nm) over a single fibre pair, enabling 40G or 100G over duplex OM5 fibre instead of requiring 8 or more fibres with parallel optics. This effectively quadruples fibre capacity."
  },
  {
    question: "When should singlemode fibre be considered for an upgrade instead of multimode?",
    options: [
      { text: "Only for distances over 10km", isCorrect: false },
      { text: "When future speed requirements exceed multimode distance limits or for maximum flexibility", isCorrect: true },
      { text: "Only in outdoor installations", isCorrect: false },
      { text: "When using MPO connectors", isCorrect: false }
    ],
    explanation: "Singlemode should be considered when: multimode distance limits are insufficient for required speeds, maximum bandwidth flexibility is needed, or when lifecycle cost analysis favours singlemode despite higher transceiver costs."
  },
  {
    question: "What is the benefit of installing spare dark fibre during initial installation?",
    options: [
      { text: "Dark fibre is cheaper than lit fibre", isCorrect: false },
      { text: "Provides capacity for future growth without re-cabling", isCorrect: true },
      { text: "Dark fibre has lower attenuation", isCorrect: false },
      { text: "Standards require minimum spare fibre counts", isCorrect: false }
    ],
    explanation: "Spare (dark) fibres installed during initial construction add minimal cost but provide valuable expansion capacity. Re-pulling new cables later is far more expensive than installing extra fibres initially."
  },
  {
    question: "What factor most often limits the ability to upgrade from 10G to 40G on existing multimode fibre?",
    options: [
      { text: "Connector type", isCorrect: false },
      { text: "Cable age", isCorrect: false },
      { text: "Modal bandwidth limitations affecting reach at higher speeds", isCorrect: true },
      { text: "Power supply capacity", isCorrect: false }
    ],
    explanation: "Modal bandwidth determines how far multimode can support high data rates. OM3 supports 10G to 300m but only 100m for 40G parallel optics. If existing links exceed these limits, upgrade options are constrained."
  },
  {
    question: "What is a phased migration strategy for network upgrades?",
    options: [
      { text: "Upgrading all equipment simultaneously", isCorrect: false },
      { text: "Upgrading in stages, prioritising critical links while maintaining service", isCorrect: true },
      { text: "Only upgrading during holiday periods", isCorrect: false },
      { text: "Replacing the entire network at once", isCorrect: false }
    ],
    explanation: "Phased migration upgrades critical links first while maintaining overall service, spreads cost over time, allows learning from early phases, and minimises risk of widespread outages from unforeseen problems."
  },
  {
    question: "What should be assessed before adding new splice points to an existing fibre route?",
    options: [
      { text: "Only the availability of splice technicians", isCorrect: false },
      { text: "Current loss budget margin and impact of additional splice loss", isCorrect: true },
      { text: "Only the physical space for enclosures", isCorrect: false },
      { text: "Nothing—splices have negligible impact", isCorrect: false }
    ],
    explanation: "Each splice adds loss (typically 0.1 dB for fusion). Before adding splices, verify the existing link has sufficient loss budget margin to accommodate the additional loss while still meeting application requirements."
  },
  {
    question: "Why might wavelength division multiplexing (WDM) be preferred over adding more fibre pairs?",
    options: [
      { text: "WDM equipment is always cheaper", isCorrect: false },
      { text: "WDM allows capacity increase on existing fibres without pulling new cables", isCorrect: true },
      { text: "WDM provides better signal quality", isCorrect: false },
      { text: "WDM is required by modern standards", isCorrect: false }
    ],
    explanation: "WDM multiplies capacity on existing fibres by transmitting multiple wavelengths simultaneously. When pathway capacity is limited or re-cabling is expensive/disruptive, WDM can be more cost-effective than new fibre installation."
  },
  {
    question: "What documentation is essential before planning a network upgrade?",
    options: [
      { text: "Only the original purchase orders", isCorrect: false },
      { text: "As-built drawings, test results, fibre assignments, and capacity inventory", isCorrect: true },
      { text: "Just the manufacturer warranties", isCorrect: false },
      { text: "Only the network topology diagram", isCorrect: false }
    ],
    explanation: "Effective upgrade planning requires: as-built drawings (current infrastructure), original test results (baseline), current fibre assignments (what's in use), and capacity inventory (spare fibres, pathway space)."
  },
  {
    question: "When evaluating a fibre plant for higher-speed operation, what test is most important?",
    options: [
      { text: "Continuity test only", isCorrect: false },
      { text: "Full OTDR characterisation to verify loss and identify potential issues", isCorrect: true },
      { text: "Visual inspection only", isCorrect: false },
      { text: "Cable jacket inspection", isCorrect: false }
    ],
    explanation: "OTDR testing reveals the current condition of each fibre—total loss, individual event losses, potential problem areas. This data determines if existing fibres can support higher-speed applications within their tighter loss budgets."
  },
  {
    question: "What is the advantage of BiDi (bidirectional) transceivers for network upgrades?",
    options: [
      { text: "They are compatible with all fibre types", isCorrect: false },
      { text: "They enable full duplex on a single fibre strand, doubling effective capacity", isCorrect: true },
      { text: "They eliminate the need for connectors", isCorrect: false },
      { text: "They provide longer reach than standard transceivers", isCorrect: false }
    ],
    explanation: "BiDi transceivers use WDM to transmit and receive on different wavelengths over a single fibre strand. This allows duplex communication on one fibre instead of two, effectively doubling available fibre capacity."
  }
];

const faqs = [
  {
    question: "How do I know when it's time to upgrade rather than troubleshoot?",
    answer: "Consider upgrading when: applications consistently need more bandwidth than available, equipment is end-of-life or unsupported, multiple links are at or near capacity, or technology changes make upgrades cost-effective. If problems are intermittent or isolated, troubleshooting is usually appropriate first."
  },
  {
    question: "Can I mix different fibre types (OM3/OM4) in the same link?",
    answer: "Yes, but the link will perform to the limitations of the lowest-grade fibre. An OM3/OM4 mixed link functions as OM3. Also ensure proper splicing procedures are used—mismatched core diameters between old OM1/OM2 and newer OM3/OM4 cause significant loss."
  },
  {
    question: "Is it worth upgrading from multimode to singlemode?",
    answer: "Replacing multimode with singlemode is expensive (new cables, new transceivers, new test equipment). It's justified when: multimode can't meet distance/speed requirements, long-term bandwidth needs significantly exceed multimode capability, or overall lifecycle cost analysis supports it."
  },
  {
    question: "How far in advance should upgrade planning begin?",
    answer: "Start planning 12-24 months ahead for significant upgrades. This allows time for: capacity assessment, budget approval, design development, procurement, scheduling installation windows, and coordination with affected users. Rushed upgrades often result in poor outcomes."
  },
  {
    question: "What's the most cost-effective way to increase backbone capacity?",
    answer: "In order of typical cost-effectiveness: 1) Upgrade transceivers if fibre supports it, 2) Use WDM on existing fibres, 3) Light up spare dark fibres, 4) Add new cables to existing pathways, 5) Install new pathways and cables. Always start with option 1 and move down only if needed."
  },
  {
    question: "How do I handle upgrade projects that span multiple buildings or sites?",
    answer: "Break the project into phases, typically by building or functional area. Establish clear dependencies and milestones. Ensure each phase can stand alone if subsequent phases are delayed. Document lessons learned from early phases to improve later ones."
  }
];

const FiberOpticsModule7Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-7" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 7</span>
          </Link>
          <span className="text-white/50 text-sm">Section 5 of 5</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 7 · SECTION 5
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Upgrade Planning and Network Expansion
          </h1>
          <p className="text-white/70 text-lg">
            Plan strategically for growing bandwidth demands and technology evolution
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Capacity Planning</h3>
              <p className="text-white/60 text-xs">Assess and plan for growth</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <ArrowUpRight className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Migration Paths</h3>
              <p className="text-white/60 text-xs">Speed and technology upgrades</p>
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
                "Assess existing infrastructure capacity for upgrade potential",
                "Plan bandwidth upgrades using existing fibre where possible",
                "Understand technology migration paths (speed and wavelength)",
                "Design network expansions that integrate with existing infrastructure",
                "Apply phased migration strategies that minimise disruption"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Capacity Assessment */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Capacity Assessment
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Before planning any upgrade, thoroughly assess the current infrastructure. Understanding what you have determines what options are available and cost-effective.
              </p>
            </div>

            {/* Assessment Checklist */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-elec-yellow" />
                Capacity Assessment Checklist
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Fibre Inventory</span>
                    <p className="text-white/60 text-sm">How many fibres exist? How many are in use? How many spare?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Fibre Type and Grade</span>
                    <p className="text-white/60 text-sm">Multimode (OM1/2/3/4/5) or singlemode (OS1/OS2)? What are the limitations?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Current Performance</span>
                    <p className="text-white/60 text-sm">OTDR test results, loss measurements, any marginal links?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Link Lengths</span>
                    <p className="text-white/60 text-sm">Actual distances—do they fall within limits for higher speeds?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">5</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Pathway Capacity</span>
                    <p className="text-white/60 text-sm">Space in trays, conduits, and ducts for additional cables if needed?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">6</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Documentation Status</span>
                    <p className="text-white/60 text-sm">Are as-built drawings accurate? Is there a current labelling schedule?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Question */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                The Key Question
              </h4>
              <p className="text-white/70 text-sm">
                <strong className="text-white">Can existing infrastructure support the required upgrade, or is new infrastructure needed?</strong> Often, existing fibre has significant untapped capacity—upgrading electronics is far cheaper than re-cabling.
              </p>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 02: Speed Upgrade Paths */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Speed Upgrade Paths
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Network speed requirements continue to grow. Understanding upgrade paths helps plan cost-effective migrations while maximising existing infrastructure investment.
              </p>
            </div>

            {/* Multimode Upgrade Path */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Multimode Speed Upgrade Path</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="w-16 text-center">
                    <span className="text-green-400 font-bold">1G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
                  <div className="w-16 text-center">
                    <span className="text-blue-400 font-bold">10G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="w-16 text-center">
                    <span className="text-purple-400 font-bold">25G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-elec-yellow"></div>
                  <div className="w-16 text-center">
                    <span className="text-elec-yellow font-bold">40/100G</span>
                  </div>
                </div>
                <div className="text-white/60 text-sm">
                  <p><strong className="text-white">1G → 10G:</strong> Usually straightforward—most MM links support 10G with just transceiver upgrade</p>
                  <p className="mt-1"><strong className="text-white">10G → 25G:</strong> Similar distance limits to 10G on OM3/OM4—often feasible</p>
                  <p className="mt-1"><strong className="text-white">25G → 40/100G:</strong> Requires parallel optics (8+ fibres) or SWDM on OM5</p>
                </div>
              </div>
            </div>

            {/* Singlemode Upgrade Path */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Singlemode Speed Upgrade Path</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="w-16 text-center">
                    <span className="text-green-400 font-bold">1G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
                  <div className="w-16 text-center">
                    <span className="text-blue-400 font-bold">10G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="w-16 text-center">
                    <span className="text-purple-400 font-bold">25/40G</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-elec-yellow"></div>
                  <div className="w-16 text-center">
                    <span className="text-elec-yellow font-bold">100G+</span>
                  </div>
                </div>
                <div className="text-white/60 text-sm">
                  <p><strong className="text-white">All speeds on duplex fibre:</strong> Singlemode supports all speeds on 2 fibres using different transceiver technologies</p>
                  <p className="mt-1"><strong className="text-white">Distance typically not limiting:</strong> Loss budget usually the constraint, not bandwidth</p>
                  <p className="mt-1"><strong className="text-white">WDM options:</strong> CWDM/DWDM can multiply capacity without adding fibres</p>
                </div>
              </div>
            </div>

            {/* Distance Limitations Table */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Distance Constraints by Speed (Multimode @ 850nm)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Speed</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM3</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM4</th>
                      <th className="text-center py-2 px-3 text-white/60 font-medium">OM5</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">10 Gbps</td>
                      <td className="py-2 px-3 text-center">300m</td>
                      <td className="py-2 px-3 text-center">400m</td>
                      <td className="py-2 px-3 text-center">400m</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">25 Gbps</td>
                      <td className="py-2 px-3 text-center">70m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">40 Gbps (SR4)</td>
                      <td className="py-2 px-3 text-center">100m</td>
                      <td className="py-2 px-3 text-center">150m</td>
                      <td className="py-2 px-3 text-center">150m</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">100 Gbps (SR4)</td>
                      <td className="py-2 px-3 text-center">70m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                      <td className="py-2 px-3 text-center">100m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 03: Capacity Expansion Options */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Capacity Expansion Options
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                When more fibre capacity is needed, several options exist—ranging from maximising existing infrastructure to installing completely new cables.
              </p>
            </div>

            {/* Expansion Options */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-elec-yellow" />
                Capacity Expansion Hierarchy (Lowest to Highest Cost)
              </h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="text-green-400 font-medium">1. Upgrade Transceivers</h5>
                  <p className="text-white/60 text-sm">Replace electronics to run higher speeds on existing fibres. Lowest cost, minimal disruption.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="text-blue-400 font-medium">2. Implement WDM</h5>
                  <p className="text-white/60 text-sm">Add wavelength multiplexing to existing fibres. BiDi transceivers or CWDM/DWDM systems.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="text-purple-400 font-medium">3. Light Up Dark Fibres</h5>
                  <p className="text-white/60 text-sm">Use spare fibres installed during original construction. Requires only new transceivers and patching.</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h5 className="text-amber-400 font-medium">4. Add Cables to Existing Pathways</h5>
                  <p className="text-white/60 text-sm">Pull new cables through existing trays, conduits, and ducts where capacity permits.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h5 className="text-red-400 font-medium">5. Install New Pathways and Cables</h5>
                  <p className="text-white/60 text-sm">New infrastructure when existing pathways are full. Highest cost, most disruptive.</p>
                </div>
              </div>
            </div>

            {/* WDM Technologies */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">WDM Technology Options</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="text-elec-yellow font-medium mb-2">BiDi (Bidirectional)</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Full duplex on single fibre</li>
                    <li>• 2 wavelengths (e.g., 1310/1550nm)</li>
                    <li>• Doubles effective fibre count</li>
                    <li>• Simple, cost-effective</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="text-elec-yellow font-medium mb-2">CWDM/DWDM</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Multiple channels per fibre</li>
                    <li>• CWDM: 8-18 channels typical</li>
                    <li>• DWDM: 40+ channels possible</li>
                    <li>• Higher cost, maximum capacity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 04: Migration Strategies */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Migration Strategies
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Successful network upgrades require careful planning to minimise service disruption. A phased approach reduces risk and allows learning from early stages.
              </p>
            </div>

            {/* Migration Phases */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-elec-yellow" />
                Phased Migration Approach
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold text-sm">P1</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phase 1: Assessment and Planning</h5>
                    <p className="text-white/60 text-sm">Document current state, test existing infrastructure, identify requirements, develop detailed plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-sm">P2</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phase 2: Pilot Deployment</h5>
                    <p className="text-white/60 text-sm">Upgrade a non-critical link first, validate procedures, train staff, identify issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-sm">P3</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phase 3: Priority Links</h5>
                    <p className="text-white/60 text-sm">Upgrade critical backbone links during maintenance windows, verify performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 font-bold text-sm">P4</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phase 4: General Rollout</h5>
                    <p className="text-white/60 text-sm">Complete remaining links, typically building by building or zone by zone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">P5</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phase 5: Documentation and Closeout</h5>
                    <p className="text-white/60 text-sm">Update all documentation, final testing and certification, handover and training</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Mitigation */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Risk Mitigation During Migration
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• <strong className="text-white">Maintain rollback capability</strong>—keep old equipment available until new system is proven</li>
                <li>• <strong className="text-white">Schedule during low-usage periods</strong>—nights, weekends, maintenance windows</li>
                <li>• <strong className="text-white">Test before going live</strong>—full OTDR and power meter testing of upgraded links</li>
                <li>• <strong className="text-white">Have contingency plans</strong>—what if the upgrade doesn't work as expected?</li>
              </ul>
            </div>
          </section>

          {/* Section 05: Future-Proofing */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Future-Proofing Principles
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Network requirements continue to grow. Designing with future flexibility in mind reduces the cost and disruption of future upgrades.
              </p>
            </div>

            {/* Future-Proofing Guidelines */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Future-Proofing Guidelines</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Install more fibres than currently needed</span>
                    <p className="text-white/60 text-sm">Marginal cost increase now vs major expense later. 2-3× current requirement is common.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Choose high-grade fibre types</span>
                    <p className="text-white/60 text-sm">OS2 for singlemode, OM4/OM5 for multimode. Higher grades support more upgrade options.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Provide pathway capacity for additional cables</span>
                    <p className="text-white/60 text-sm">Install larger conduits and trays than needed. Include spare ducts for future cables.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Minimise connections</span>
                    <p className="text-white/60 text-sm">Fewer connectors means lower loss, enabling higher speeds over longer distances.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Document thoroughly</span>
                    <p className="text-white/60 text-sm">Accurate records enable efficient future planning. Include spare fibre locations.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Singlemode vs Multimode Consideration */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                The Singlemode Question
              </h4>
              <p className="text-white/70 text-sm">
                For new installations, seriously consider singlemode even for short distances. While transceivers cost more, singlemode has no distance or bandwidth limitations for any foreseeable application. As transceiver costs decrease, the total cost of ownership often favours singlemode.
              </p>
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
                <TrendingUp className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Upgrade Decision Tree
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1.</span>
                  <span className="text-white/80">Can existing fibre support required speed at current distance?</span>
                  <span className="text-green-400">→ Upgrade transceivers</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">2.</span>
                  <span className="text-white/80">Need more capacity on existing fibres?</span>
                  <span className="text-green-400">→ Implement WDM</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">3.</span>
                  <span className="text-white/80">Spare dark fibres available?</span>
                  <span className="text-green-400">→ Light them up</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">4.</span>
                  <span className="text-white/80">Pathway space available?</span>
                  <span className="text-green-400">→ Pull new cables</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">5.</span>
                  <span className="text-white/80">No other options?</span>
                  <span className="text-amber-400">→ New infrastructure required</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 5 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-4"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Fibre Record-Keeping
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-mock-exam"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Take Mock Exam
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule7Section5;
