import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Use in Commercial & Industrial Settings - Fibre Optics Course";
const DESCRIPTION = "Explore how fibre optic cabling is deployed in commercial buildings, data centres, industrial facilities, and specialist environments.";

const quickCheckQuestions = [
  {
    id: "fo-m1s3-qc1",
    question: "What is the typical fibre topology used in commercial building backbones?",
    options: ["Bus topology", "Ring topology", "Star/hierarchical topology", "Mesh topology only"],
    correctIndex: 2,
    explanation: "Commercial buildings typically use star/hierarchical topology with fibre backbone connecting floor distributors to the main equipment room."
  },
  {
    id: "fo-m1s3-qc2",
    question: "Why is fibre particularly suited to industrial environments?",
    options: ["It's cheaper than copper", "Immunity to EMI from machinery", "Easier to install", "Requires less maintenance"],
    correctIndex: 1,
    explanation: "Industrial environments contain motors, drives, and heavy machinery that generate significant EMI. Fibre's immunity to electromagnetic interference makes it ideal."
  },
  {
    id: "fo-m1s3-qc3",
    question: "In a data centre, what is the primary reason for using fibre between racks?",
    options: ["Cable colour options", "High bandwidth and density requirements", "Lower cost", "Easier to label"],
    correctIndex: 1,
    explanation: "Data centres require extremely high bandwidth (40-400Gbps+) between servers and switches. Fibre provides this capacity in compact cable runs."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a 'riser' in commercial building cabling?",
    options: ["A type of connector", "Vertical cable pathway between floors", "A testing device", "A type of fibre"],
    correctAnswer: 1,
    explanation: "A riser is a vertical pathway for cables between floors in a building, typically used for backbone cabling."
  },
  {
    id: 2,
    question: "Which fibre type is most common for building backbone applications under 300m?",
    options: ["Singlemode OS2", "Multimode OM3/OM4", "Plastic optical fibre", "Coaxial fibre"],
    correctAnswer: 1,
    explanation: "Multimode OM3/OM4 fibre is commonly used for building backbones under 300m due to its cost-effectiveness."
  },
  {
    id: 3,
    question: "In industrial SCADA systems, fibre is preferred because:",
    options: ["It's more colourful", "EMI immunity and electrical isolation", "Lower bandwidth", "Easier termination"],
    correctAnswer: 1,
    explanation: "Fibre's EMI immunity and electrical isolation make it ideal for industrial SCADA systems around heavy machinery."
  },
  {
    id: 4,
    question: "What does 'FTTD' stand for in commercial deployments?",
    options: ["Fibre To The Desktop", "Fast Transfer Technology Device", "Fibre Testing Technical Document", "Flexible Twisted Trunk Distribution"],
    correctAnswer: 0,
    explanation: "FTTD stands for Fibre To The Desktop, where fibre is extended directly to workstation locations."
  },
  {
    id: 5,
    question: "Data centre fibre typically uses which connector type for high density?",
    options: ["SC connectors", "ST connectors", "LC or MTP/MPO connectors", "FC connectors"],
    correctAnswer: 2,
    explanation: "LC and MTP/MPO connectors are used in data centres for their high-density capability."
  },
  {
    id: 6,
    question: "Why might a hospital use fibre near MRI machines?",
    options: ["Better aesthetics", "No interference with or from the magnetic field", "Lower cost", "Faster installation"],
    correctAnswer: 1,
    explanation: "Fibre doesn't interfere with MRI magnetic fields and isn't affected by them, unlike copper cables."
  },
  {
    id: 7,
    question: "In a campus network, buildings are typically connected using:",
    options: ["Cat5e copper", "Coaxial cable", "Singlemode fibre", "Wireless only"],
    correctAnswer: 2,
    explanation: "Singlemode fibre is used for campus networks due to its long-distance capability."
  },
  {
    id: 8,
    question: "What is 'dark fibre' in commercial contexts?",
    options: ["Fibre that has failed", "Unused installed fibre capacity", "Fibre with black jacket", "Fibre for night use"],
    correctAnswer: 1,
    explanation: "Dark fibre refers to installed fibre infrastructure that is not currently in use or lit with active equipment."
  },
  {
    id: 9,
    question: "Process control networks in factories often use fibre for:",
    options: ["Cost savings only", "Electrical isolation and noise immunity", "Colour coding", "Weight reduction"],
    correctAnswer: 1,
    explanation: "Process control networks benefit from fibre's electrical isolation and immunity to electrical noise."
  },
  {
    id: 10,
    question: "Which standard governs structured cabling in commercial buildings?",
    options: ["BS 7671", "TIA-568 / ISO 11801", "IEEE 802.3", "ITU-T G.652"],
    correctAnswer: 1,
    explanation: "TIA-568 and ISO 11801 define structured cabling standards for commercial buildings."
  }
];

const faqs = [
  {
    question: "Is fibre to the desktop (FTTD) becoming common?",
    answer: "FTTD is growing, especially in new builds and high-security environments. However, most commercial installations still use fibre backbone with copper to desktops due to PoE requirements and cost. Hybrid approaches are increasingly popular."
  },
  {
    question: "How is fibre protected in industrial environments?",
    answer: "Industrial fibre uses armoured cables (steel or aluminium), protective conduit, and ruggedised connectors. Cables may have additional crush resistance, chemical resistance, or temperature ratings for specific environments."
  },
  {
    question: "What bandwidth do typical commercial buildings need?",
    answer: "Modern commercial buildings should plan for 10Gbps backbone minimum, with 40-100Gbps for larger installations. Individual floor connections typically need 1-10Gbps. Requirements are increasing rapidly with cloud services and video."
  },
  {
    question: "Can existing copper infrastructure be upgraded to fibre?",
    answer: "Yes, often using existing containment routes. Media converters can bridge fibre backbone to copper endpoints. Many organisations upgrade backbone to fibre first, then gradually extend fibre closer to users over time."
  },
  {
    question: "What's the difference between enterprise and carrier fibre?",
    answer: "Enterprise fibre connects within buildings and campuses (often multimode, shorter distances). Carrier/telco fibre connects between sites and cities (singlemode, longer distances, higher specifications). Different standards and practices apply."
  },
  {
    question: "How do data centres achieve such high fibre density?",
    answer: "Data centres use high-density solutions: MTP/MPO connectors (12-24 fibres per connector), pre-terminated trunk cables, high-density patch panels, and careful pathway management. Fibre's small size enables much higher density than copper."
  }
];

const FiberOpticsModule1Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commercial & Industrial Applications
          </h1>
          <p className="text-white/80">
            How fibre optic technology is deployed across different sectors and environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Commercial:</strong> Building backbone, floor distributors</li>
              <li><strong>Data Centre:</strong> High-density interconnects</li>
              <li><strong>Industrial:</strong> EMI immunity, SCADA</li>
              <li><strong>Specialist:</strong> Healthcare, broadcast, defence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Riser cables, patch panels, MTP/MPO</li>
              <li><strong>Use:</strong> Backbone links, long runs, EMI zones</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe fibre deployment in commercial buildings",
              "Understand data centre fibre requirements",
              "Identify industrial fibre applications",
              "Recognise specialist environment needs",
              "Apply appropriate fibre solutions to sectors",
              "Understand structured cabling standards"
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
            Commercial Building Deployments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern commercial buildings rely on fibre optic cabling as the backbone of their network
              infrastructure. The structured cabling model defines how fibre integrates with copper
              distribution to desktops.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Structured Cabling Hierarchy:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Main Equipment Room (MER):</strong> Central point housing core switches, servers, and external connections. Fibre links to carrier services and connects to all floor distributors.</li>
                <li><strong className="text-elec-yellow">Building Backbone:</strong> Vertical fibre runs (risers) connecting MER to floor distributors. Typically multimode OM3/OM4 for buildings under 300m height.</li>
                <li><strong className="text-elec-yellow">Floor Distributor (FD):</strong> Telecommunications room on each floor. Houses floor switches connecting via fibre to backbone and distributing via copper to work areas.</li>
                <li><strong className="text-elec-yellow">Horizontal Distribution:</strong> Connections from FD to work area outlets. Traditionally copper Cat6A. Increasingly fibre for high-bandwidth zones.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Typical Office Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>10Gbps backbone per floor minimum</li>
                  <li>1Gbps to desktop (copper)</li>
                  <li>WiFi backhaul (fibre to APs emerging)</li>
                  <li>CCTV and building management</li>
                  <li>VoIP telephony infrastructure</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Fibre Backbone Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Future-proof for speed upgrades</li>
                  <li>Electrical isolation between floors</li>
                  <li>Smaller riser space requirements</li>
                  <li>Longer distances without repeaters</li>
                  <li>Supports convergence (voice/data/video)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Data Centre Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Data centres represent the most demanding fibre environment, requiring extreme bandwidth,
              density, and reliability. Cloud computing has dramatically increased data centre fibre requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Data Centre Fibre Applications:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Server-to-Switch (Leaf):</strong> 25-100Gbps connections from servers to Top-of-Rack switches. High density, short runs.</li>
                <li><strong className="text-elec-yellow">Switch-to-Switch (Spine):</strong> 100-400Gbps backbone between aggregation switches. Often uses parallel fibre (MTP/MPO).</li>
                <li><strong className="text-elec-yellow">Data Centre Interconnect (DCI):</strong> Links between data centre buildings. Singlemode, often DWDM for maximum capacity.</li>
                <li><strong className="text-elec-yellow">Storage Area Networks (SAN):</strong> Fibre Channel storage connections. Dedicated fibre infrastructure for storage traffic.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">High-Density Solutions</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">MTP/MPO Connectivity</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>12 or 24 fibres per connector</li>
                    <li>Pre-terminated trunk cables</li>
                    <li>Supports 40/100/400G parallel optics</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Patch Panel Density</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Up to 144 LC ports per 1U</li>
                    <li>Angled panels reduce bend stress</li>
                    <li>Colour coding by function</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Industrial Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial environments present unique challenges: heavy EMI, harsh conditions, and critical
              reliability requirements. Fibre's characteristics make it ideal for these demanding applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industrial Fibre Applications:</p>
              <div className="grid sm:grid-cols-2 gap-4 ml-4 text-sm">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Process Control</p>
                  <ul className="space-y-0.5">
                    <li>SCADA backbone networks</li>
                    <li>PLC interconnections</li>
                    <li>Distributed control systems</li>
                    <li>Remote I/O networks</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Manufacturing</p>
                  <ul className="space-y-0.5">
                    <li>CNC machine connectivity</li>
                    <li>Robot cell networks</li>
                    <li>Quality vision systems</li>
                    <li>Production monitoring</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Utilities</p>
                  <ul className="space-y-0.5">
                    <li>Substation automation</li>
                    <li>Smart grid communications</li>
                    <li>Pipeline monitoring</li>
                    <li>Water treatment SCADA</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Transport</p>
                  <ul className="space-y-0.5">
                    <li>Rail signalling systems</li>
                    <li>Port and terminal networks</li>
                    <li>Airport systems</li>
                    <li>Traffic management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Why Fibre in Industry</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Immune to EMI from motors/drives</li>
                  <li>Electrical isolation (no ground loops)</li>
                  <li>Safe in hazardous areas (no sparks)</li>
                  <li>Lightning/surge protection</li>
                  <li>Long distances without repeaters</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Industrial Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Extended temp ratings (-40C to +85C)</li>
                  <li>Armoured/ruggedised cables</li>
                  <li>IP-rated connectors (IP67/IP68)</li>
                  <li>Chemical/oil resistant jackets</li>
                  <li>Vibration-proof connections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Specialist Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain environments have unique requirements that make fibre the only practical choice.
              These include healthcare, broadcast, military, and other specialist sectors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sector-Specific Applications:</p>
              <ul className="text-sm text-white space-y-3 ml-4">
                <li><strong className="text-elec-yellow">Healthcare:</strong> MRI suites require fibre (copper causes interference with magnetic fields). Medical imaging transfers large files rapidly. Patient monitoring benefits from EMI immunity.</li>
                <li><strong className="text-elec-yellow">Broadcast & Media:</strong> Uncompressed 4K/8K video requires massive bandwidth (12-48Gbps). Studios use fibre for camera links, audio distribution, and production networks.</li>
                <li><strong className="text-elec-yellow">Education & Research:</strong> Universities connect buildings across large campuses. Research networks require high bandwidth for data transfer. Scientific instruments generate massive data volumes.</li>
                <li><strong className="text-elec-yellow">Defence & Security:</strong> Fibre is extremely difficult to tap without detection. No electromagnetic emissions to intercept. Secure facilities mandate fibre for classified networks.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Security Advantages</p>
              <ul className="text-sm text-white space-y-1">
                <li>No electromagnetic radiation to intercept</li>
                <li>Physical tapping causes measurable signal loss</li>
                <li>Can be monitored for intrusion attempts</li>
                <li>Approved for classified government networks</li>
                <li>No crosstalk between adjacent fibres</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Campus and Multi-Site Networks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Campus networks connect multiple buildings within a site. These outdoor or underground
              runs typically exceed copper's distance limits, making fibre essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Infrastructure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Underground duct systems</li>
                  <li>Direct burial cables</li>
                  <li>Aerial installations</li>
                  <li>Building entry points</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Cable Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Armoured for direct burial</li>
                  <li>Rodent protection where needed</li>
                  <li>UV-resistant for aerial</li>
                  <li>Appropriate fibre count</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Fibre Count Planning</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Small building:</strong> 12-24 fibres minimum</li>
                <li><strong>Medium building:</strong> 24-48 fibres</li>
                <li><strong>Large/critical building:</strong> 48-96+ fibres</li>
                <li><strong>Data centre links:</strong> 144-288+ fibres (trunk cables)</li>
              </ul>
              <p className="text-sm mt-2 text-white/70">Rule of thumb: Install 2-4x current requirements for future growth.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sector Selection Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Office backbone:</strong> OM3/OM4 multimode - Cost-effective bandwidth</li>
                <li><strong>Data centre:</strong> OM4/OM5 or OS2 - Maximum bandwidth density</li>
                <li><strong>Industrial:</strong> OS2 singlemode - EMI immunity, distance</li>
                <li><strong>Campus:</strong> OS2 singlemode - Long distances</li>
                <li><strong>Broadcast:</strong> OS2 singlemode - Extreme bandwidth</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Planning Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Under-provisioning fibre count</strong> - difficult to add later</li>
                <li><strong>Not considering future bandwidth</strong> - needs increase rapidly</li>
                <li><strong>Using multimode where singlemode would future-proof</strong></li>
                <li><strong>Inadequate pathway sizing</strong> - cables need room</li>
                <li><strong>Not planning testing/maintenance access</strong></li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Application Overview</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Commercial</p>
                <ul className="space-y-0.5">
                  <li>Building backbone</li>
                  <li>Floor distributor links</li>
                  <li>Campus interconnects</li>
                  <li>Standards: TIA-568/ISO 11801</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Industrial/Specialist</p>
                <ul className="space-y-0.5">
                  <li>Process control (SCADA)</li>
                  <li>EMI-sensitive environments</li>
                  <li>Healthcare (MRI suites)</li>
                  <li>Secure/classified networks</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Advantages vs Copper
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next: Health & Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule1Section3;
