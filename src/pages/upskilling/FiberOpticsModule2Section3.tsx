import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Plug, Cable, Settings, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connector Types (LC, SC, ST, MTP) | Fibre Optics Module 2";
const DESCRIPTION = "Master fibre optic connector identification and selection. Learn LC, SC, ST, and MTP/MPO connectors including applications, ferrule sizes, and installation requirements for UK networks.";

const quickCheckQuestions = [
  {
    id: "fo-m2s3-qc1",
    question: "What ferrule diameter do LC connectors use?",
    options: ["2.5mm", "1.25mm", "3.0mm", "0.9mm"],
    correctIndex: 1,
    explanation: "LC (Lucent Connector) uses a 1.25mm ferrule, half the size of SC connectors, enabling higher port density in data centres and equipment."
  },
  {
    id: "fo-m2s3-qc2",
    question: "Which connector type uses a bayonet locking mechanism?",
    options: ["LC", "SC", "ST", "MTP"],
    correctIndex: 2,
    explanation: "ST (Straight Tip) connectors use a bayonet twist-lock mechanism, requiring a quarter-turn to engage. SC and LC use push-pull latching."
  },
  {
    id: "fo-m2s3-qc3",
    question: "How many fibres can a standard MTP/MPO connector terminate?",
    options: ["2 fibres", "4 fibres", "8, 12, or 24 fibres", "48 fibres"],
    correctIndex: 2,
    explanation: "MTP/MPO connectors terminate 8, 12, or 24 fibres in a single connector using an array of precision ferrules for high-density applications."
  }
];

const quizQuestions = [
  {
    question: "LC connectors were developed by which company?",
    options: ["Siemens", "Lucent Technologies", "Corning", "Amphenol"],
    correctAnswer: 1
  },
  {
    question: "What is the ferrule diameter of SC connectors?",
    options: ["1.25mm", "2.5mm", "3.0mm", "1.0mm"],
    correctAnswer: 1
  },
  {
    question: "ST connectors are most commonly found in:",
    options: ["Modern data centres", "Legacy LAN installations", "Submarine cables", "Mobile networks"],
    correctAnswer: 1
  },
  {
    question: "What does MTP stand for in MTP connectors?",
    options: ["Multi-fibre Termination Push-on", "Mechanical Transfer Push-on", "Multi-Terminal Plug", "Module Trunk Port"],
    correctAnswer: 1
  },
  {
    question: "The primary advantage of LC over SC connectors is:",
    options: ["Lower cost", "Higher port density", "Better polish quality", "Faster termination"],
    correctAnswer: 1
  },
  {
    question: "Which connector type is specified in TIA-568 for high-density applications?",
    options: ["ST", "SC", "LC", "FC"],
    correctAnswer: 2
  },
  {
    question: "MTP/MPO connectors are primarily used for:",
    options: ["Desktop connections", "Backbone and trunk cabling", "Test equipment only", "Outdoor installations"],
    correctAnswer: 1
  },
  {
    question: "The 'push-pull' latching mechanism is used by:",
    options: ["ST and FC connectors", "LC and SC connectors", "MTP connectors only", "All fibre connectors"],
    correctAnswer: 1
  },
  {
    question: "What is the typical insertion loss specification for a quality LC connector?",
    options: ["0.1 dB maximum", "0.25 dB maximum", "0.5 dB maximum", "1.0 dB maximum"],
    correctAnswer: 1
  },
  {
    question: "When connecting different connector types, you would use a:",
    options: ["Connector reducer", "Hybrid adaptor", "Mode conditioner", "Attenuator"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I connect LC to SC connectors directly?",
    answer: "Not directly—they have different ferrule sizes (1.25mm vs 2.5mm). You need a hybrid adaptor (LC-SC coupler) or a hybrid patch lead with LC on one end and SC on the other. Hybrid adaptors introduce additional insertion loss (typically 0.2-0.3dB), so minimise their use in the permanent link."
  },
  {
    question: "Why are ST connectors being phased out?",
    answer: "ST's bayonet lock mechanism requires rotational movement that can stress fibres in dense cable management. The single-fibre design and 2.5mm ferrule limit port density. SC and LC push-pull mechanisms are easier to use in tight spaces. Most new standards specify LC or SC for structured cabling."
  },
  {
    question: "What's the difference between MTP and MPO?",
    answer: "MPO (Multi-fibre Push-On) is the generic standard defined by IEC 61754-7. MTP is US Conec's enhanced version with tighter tolerances, removable housing, and improved spring mechanism. MTP connectors are backwards compatible with MPO but offer better performance. Most high-quality installations specify MTP."
  },
  {
    question: "How do I identify male vs female MTP/MPO connectors?",
    answer: "Male MTP connectors have guide pins (two small metal pins on the ferrule face). Female connectors have corresponding holes. In trunk cables, one end is male and one is female. Pin polarity (Type A, B, or C) determines how fibres map between connectors—always verify polarity before connecting."
  },
  {
    question: "Which connector should I specify for a new installation?",
    answer: "For most applications: LC duplex is the standard choice for equipment connections (transceivers, patch panels). For backbone trunks requiring 12+ fibres, MTP/MPO with LC breakout modules enables high-density and future 40G/100G upgrades. SC may still be specified for compatibility with existing infrastructure."
  },
  {
    question: "Do connector types affect link loss budgets?",
    answer: "Yes—different connector types have different typical insertion losses. LC averages 0.15-0.25dB, SC averages 0.2-0.3dB, and MTP averages 0.25-0.5dB per mated pair. Link loss calculations must account for each connector pair in the path. Using lower-loss connectors allows longer transmission distances."
  }
];

const FiberOpticsModule2Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 2</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Plug className="h-4 w-4" />
            Module 2 • Section 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Connector Types (LC, SC, ST, MTP)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Essential fibre optic connector identification and selection
          </p>
        </section>

        {/* Quick Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">In 30 Seconds</h3>
                <p className="text-sm text-white/80">
                  LC = small (1.25mm), high density, modern standard. SC = medium (2.5mm), push-pull. ST = legacy, bayonet lock. MTP = multi-fibre array (8-24 fibres).
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Identify It / Connect It</h3>
                <p className="text-sm text-white/80">
                  Check ferrule size and latch type. LC has small tab latch. SC has rectangular push-pull. ST has round bayonet twist. MTP is wide multi-pin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "LC connector specifications and applications",
              "SC connector characteristics and use cases",
              "ST connector legacy applications",
              "MTP/MPO multi-fibre connectors",
              "Connector identification techniques",
              "Selection criteria for different scenarios"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: LC Connectors */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">LC Connectors - Small Form Factor</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The <strong>LC (Lucent Connector)</strong> has become the dominant connector type for modern fibre optic installations. Developed by Lucent Technologies (now Nokia) in the late 1990s, it features a compact 1.25mm ferrule that enables twice the port density of SC connectors in the same panel space.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">LC Connector Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Ferrule Diameter</p>
                  <p className="font-medium">1.25mm</p>
                </div>
                <div>
                  <p className="text-white/60">Latch Type</p>
                  <p className="font-medium">Push-pull tab</p>
                </div>
                <div>
                  <p className="text-white/60">Typical IL</p>
                  <p className="font-medium">≤0.25 dB</p>
                </div>
                <div>
                  <p className="text-white/60">Return Loss (SM)</p>
                  <p className="font-medium">≥50 dB (APC)</p>
                </div>
                <div>
                  <p className="text-white/60">Mating Cycles</p>
                  <p className="font-medium">500+ typical</p>
                </div>
                <div>
                  <p className="text-white/60">Fibre Types</p>
                  <p className="font-medium">Singlemode & Multimode</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Duplex Configuration
              </h4>
              <p className="text-sm">
                LC connectors are commonly supplied as <strong>LC Duplex</strong>—two LC connectors joined by a clip, maintaining the correct A-B fibre polarity. The duplex housing matches the port spacing on transceivers (SFP, SFP+, QSFP). Individual simplex LC connectors are available for specific applications.
              </p>
            </div>

            <p>
              LC connectors are specified in <strong>TIA-568</strong> as the preferred connector for horizontal cabling to the work area and for high-density applications. The push-pull latching mechanism allows connection and disconnection in tight spaces without rotating the connector, reducing the risk of fibre stress.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• High port density (2x SC)</li>
                  <li>• Low insertion loss</li>
                  <li>• Push-pull ease of use</li>
                  <li>• Industry standard for SFP</li>
                  <li>• Available in all polish grades</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-2">Considerations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Small size requires care</li>
                  <li>• Latch can be fragile</li>
                  <li>• Needs dust caps protection</li>
                  <li>• Not for harsh environments</li>
                  <li>• Higher cost than SC</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: SC Connectors */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">SC Connectors - Subscriber Connector</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The <strong>SC (Subscriber Connector or Standard Connector)</strong> was developed by NTT (Nippon Telegraph and Telephone) and became an early standard for fibre terminations. Its robust 2.5mm ferrule and positive push-pull engagement made it popular for telecommunications and enterprise networks before LC gained dominance.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">SC Connector Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Ferrule Diameter</p>
                  <p className="font-medium">2.5mm</p>
                </div>
                <div>
                  <p className="text-white/60">Latch Type</p>
                  <p className="font-medium">Push-pull snap</p>
                </div>
                <div>
                  <p className="text-white/60">Typical IL</p>
                  <p className="font-medium">≤0.30 dB</p>
                </div>
                <div>
                  <p className="text-white/60">Return Loss (SM)</p>
                  <p className="font-medium">≥50 dB (APC)</p>
                </div>
                <div>
                  <p className="text-white/60">Housing Shape</p>
                  <p className="font-medium">Rectangular</p>
                </div>
                <div>
                  <p className="text-white/60">Fibre Types</p>
                  <p className="font-medium">Singlemode & Multimode</p>
                </div>
              </div>
            </div>

            <p>
              SC connectors remain common in <strong>FTTH (Fibre to the Home)</strong> installations, older enterprise networks, and applications where the larger size aids handling. The rectangular housing provides a positive <strong>anti-rotation</strong> feature that maintains fibre polarity and prevents damage from twisting.
            </p>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                SC Applications Today
              </h4>
              <ul className="text-sm space-y-1">
                <li>• FTTH optical network terminals (ONTs)</li>
                <li>• Passive optical network (PON) splitters</li>
                <li>• Test equipment interfaces</li>
                <li>• Legacy telecommunications equipment</li>
                <li>• Applications requiring robust handling</li>
              </ul>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Density Limitation
              </h4>
              <p className="text-sm">
                SC's larger footprint means patch panels accommodate approximately <strong>half the port count</strong> compared to LC in the same space. For data centre applications requiring high fibre counts, this density penalty makes LC the preferred choice despite SC's lower per-connector cost.
              </p>
            </div>

            <p>
              SC duplex connectors are available but less common than LC duplex. The SC connector's click engagement is audible and tactile, providing positive feedback that the connection is secure—useful for field installations where visual confirmation may be difficult.
            </p>
          </div>
        </section>

        {/* Section 3: ST Connectors */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">ST Connectors - Straight Tip (Legacy)</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The <strong>ST (Straight Tip)</strong> connector, developed by AT&T in the 1980s, was among the first standardised fibre connectors and dominated early LAN installations. Its distinctive <strong>bayonet twist-lock mechanism</strong> requires a quarter-turn to engage, similar to BNC coaxial connectors familiar to network engineers.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">ST Connector Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Ferrule Diameter</p>
                  <p className="font-medium">2.5mm</p>
                </div>
                <div>
                  <p className="text-white/60">Latch Type</p>
                  <p className="font-medium">Bayonet twist-lock</p>
                </div>
                <div>
                  <p className="text-white/60">Typical IL</p>
                  <p className="font-medium">≤0.40 dB</p>
                </div>
                <div>
                  <p className="text-white/60">Housing Shape</p>
                  <p className="font-medium">Round/cylindrical</p>
                </div>
                <div>
                  <p className="text-white/60">Mating Cycles</p>
                  <p className="font-medium">500 typical</p>
                </div>
                <div>
                  <p className="text-white/60">Primary Use</p>
                  <p className="font-medium">Legacy multimode</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Why ST is Being Phased Out
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Bayonet mechanism requires rotational space</li>
                <li>• Twist motion can stress fibres in tight bundles</li>
                <li>• Single-fibre only (no native duplex)</li>
                <li>• Lower port density than SC or LC</li>
                <li>• Not specified in current TIA-568 standards</li>
              </ul>
            </div>

            <p>
              ST connectors remain in service in many <strong>legacy installations</strong> from the 1990s and early 2000s. You'll encounter them in older campus backbones, industrial networks, and buildings that haven't upgraded their fibre infrastructure. The spring-loaded ferrule provides good alignment but the rotational engagement limits dense deployments.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Working with ST Connectors
              </h4>
              <p className="text-sm">
                When maintaining ST installations: push in firmly, then turn clockwise to lock (quarter-turn until the bayonet pins engage). To disconnect, push in slightly, turn anti-clockwise, and pull. Never pull without unlocking—this damages the bayonet pins and ferrule alignment.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 4: MTP/MPO Connectors */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">MTP/MPO - Multi-Fibre Connectors</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>MTP (Mechanical Transfer Push-on)</strong> and <strong>MPO (Multi-fibre Push-On)</strong> connectors terminate multiple fibres—typically 8, 12, or 24—in a single connector. These high-density connectors are essential for data centre backbone infrastructure, enabling rapid deployment and supporting 40G, 100G, and 400G parallel optics.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">MTP/MPO Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Fibre Count</p>
                  <p className="font-medium">8, 12, or 24 fibres</p>
                </div>
                <div>
                  <p className="text-white/60">Fibre Pitch</p>
                  <p className="font-medium">250µm centres</p>
                </div>
                <div>
                  <p className="text-white/60">Typical IL (per fibre)</p>
                  <p className="font-medium">≤0.35 dB</p>
                </div>
                <div>
                  <p className="text-white/60">Guide Pins</p>
                  <p className="font-medium">Male or Female</p>
                </div>
                <div>
                  <p className="text-white/60">Latch Type</p>
                  <p className="font-medium">Push-pull</p>
                </div>
                <div>
                  <p className="text-white/60">Applications</p>
                  <p className="font-medium">40G/100G/400G</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                MTP vs MPO: What's the Difference?
              </h4>
              <p className="text-sm">
                <strong>MPO</strong> is the generic industry standard (IEC 61754-7). <strong>MTP</strong> is US Conec's enhanced, trademarked version with tighter tolerances, removable housing for re-polishing, and an improved spring design. MTP connectors are MPO-compatible but offer 0.1-0.2dB better insertion loss. Most quality installations specify MTP.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">12-Fibre Applications</h4>
                <ul className="text-sm space-y-1">
                  <li>• 40GBASE-SR4 (4×10G lanes)</li>
                  <li>• 100GBASE-SR4 (4×25G lanes)</li>
                  <li>• Backbone trunk cabling</li>
                  <li>• Cassette-based patching</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">24-Fibre Applications</h4>
                <ul className="text-sm space-y-1">
                  <li>• 100GBASE-SR10</li>
                  <li>• 400GBASE-SR8</li>
                  <li>• High-density trunking</li>
                  <li>• Spine-leaf architectures</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Polarity and Gender
              </h4>
              <p className="text-sm">
                MTP connectors have <strong>male</strong> (with guide pins) and <strong>female</strong> (with pin holes) variants. Trunk cables typically have one male and one female end. <strong>Polarity types</strong> (A, B, C) define how fibre positions map between connectors—critical for ensuring transmit connects to receive. Always document polarity in your installation records.
              </p>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Handling Precautions
              </h4>
              <p className="text-sm">
                MTP connectors require careful handling—the multi-fibre ferrule is more sensitive to contamination than single-fibre types. Always use dust caps, clean with appropriate MTP cleaning tools (not standard LC/SC cleaners), and inspect with a fibre scope before mating. A single contaminated fibre can affect the entire array.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: Other Connector Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Other Connector Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              While LC, SC, ST, and MTP cover most installations, several other connector types serve specialised applications. Understanding these helps when working with legacy equipment, test instruments, or specialised networks.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">FC (Ferrule Connector)</h4>
                <p className="text-sm text-white/80 mb-2">
                  Uses 2.5mm ferrule with screw-thread coupling. Provides excellent repeatability and vibration resistance. Common in test equipment, CATV headends, and precision measurement applications. Being replaced by LC in newer installations.
                </p>
                <div className="flex gap-4 text-xs text-white/60">
                  <span>Ferrule: 2.5mm</span>
                  <span>Latch: Screw-on</span>
                  <span>IL: ≤0.30 dB</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">E2000 (LSH)</h4>
                <p className="text-sm text-white/80 mb-2">
                  Features integrated spring-loaded dust cap for automatic protection. Premium connector with excellent optical performance. Used in telecommunications and broadcast applications requiring high reliability. Common in European telecom networks.
                </p>
                <div className="flex gap-4 text-xs text-white/60">
                  <span>Ferrule: 2.5mm</span>
                  <span>Latch: Push-pull</span>
                  <span>IL: ≤0.20 dB</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">MTRJ (Mechanical Transfer Registered Jack)</h4>
                <p className="text-sm text-white/80 mb-2">
                  Duplex connector with two fibres in a single 1.25mm ferrule. RJ-style form factor popular in some desktop applications. Less common today but may be found in older small-office installations.
                </p>
                <div className="flex gap-4 text-xs text-white/60">
                  <span>Ferrule: 2× 1.25mm</span>
                  <span>Latch: Tab clip</span>
                  <span>IL: ≤0.30 dB</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">SMA (Sub-Miniature Assembly)</h4>
                <p className="text-sm text-white/80 mb-2">
                  Stainless steel screw-coupling connector for large-core multimode and specialty fibres. Common with industrial lasers, medical equipment, and military/aerospace applications. Not used in standard telecommunications.
                </p>
                <div className="flex gap-4 text-xs text-white/60">
                  <span>Ferrule: 3.14mm</span>
                  <span>Latch: Screw-on</span>
                  <span>Use: Industrial/specialty</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Connector Selection Guide */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Connector Selection Guide</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the right connector type depends on the application requirements, existing infrastructure, and equipment interfaces. Use this guide to make appropriate selections for common scenarios.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Application-Based Selection</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Data Centre Equipment:</span>
                  <span className="text-white/70">LC duplex (SFP/SFP+ ports)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Data Centre Backbone:</span>
                  <span className="text-white/70">MTP/MPO trunks with LC breakout</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Building Backbone:</span>
                  <span className="text-white/70">LC or SC duplex</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Work Area Outlet:</span>
                  <span className="text-white/70">LC duplex (TIA-568 recommended)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">FTTH/PON:</span>
                  <span className="text-white/70">SC (common) or LC</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Test Equipment:</span>
                  <span className="text-white/70">FC or LC (check instrument ports)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="font-medium text-white min-w-[180px]">Legacy Maintenance:</span>
                  <span className="text-white/70">Match existing (ST, SC common)</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                New Installation Recommendations
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Default choice:</strong> LC duplex for all new installations</li>
                <li>• <strong>High-density backbone:</strong> MTP/MPO with LC cassettes</li>
                <li>• <strong>40G/100G direct:</strong> MTP/MPO to equipment ports</li>
                <li>• <strong>Avoid:</strong> ST for new installs; SC only if required by equipment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Connector Handling</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always keep dust caps on connectors until ready to connect</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Never touch ferrule end faces—oils cause contamination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Clean connectors before every mating—"inspect before you connect"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use connector-specific cleaning tools (LC, SC, MTP have different cleaners)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Inspection Guidelines</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use a fibre microscope (200-400x) to inspect end faces</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Core zone must be scratch-free; cladding allows minor defects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Reference IEC 61300-3-35 for pass/fail criteria</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Forcing mismatched connectors (LC into SC adaptor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Twisting ST connectors without pushing in first</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Connecting male MTP to male MTP (damages guide pins)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using canned air (propellant residue) instead of dry wipes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Cable className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Connector Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Ferrule</th>
                  <th className="text-left py-2 pr-4">Latch</th>
                  <th className="text-left py-2">Use</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">LC</td>
                  <td className="py-2 pr-4">1.25mm</td>
                  <td className="py-2 pr-4">Push-pull tab</td>
                  <td className="py-2">Modern standard</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">SC</td>
                  <td className="py-2 pr-4">2.5mm</td>
                  <td className="py-2 pr-4">Push-pull snap</td>
                  <td className="py-2">FTTH, legacy</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">ST</td>
                  <td className="py-2 pr-4">2.5mm</td>
                  <td className="py-2 pr-4">Bayonet twist</td>
                  <td className="py-2">Legacy only</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">MTP</td>
                  <td className="py-2 pr-4">Multi (8-24)</td>
                  <td className="py-2 pr-4">Push-pull</td>
                  <td className="py-2">High-density</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Connector Types Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-2"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: OM and OS Standards</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-4"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Polish Grades</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section3;