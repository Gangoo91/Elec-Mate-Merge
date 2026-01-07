import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Layers, Cable, Gauge, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "OM and OS Standards Explained | Fibre Optics Module 2";
const DESCRIPTION = "Master OM1-OM5 multimode and OS1/OS2 singlemode fibre classifications. Understand bandwidth capabilities, transmission distances, and specification selection for UK installations.";

const quickCheckQuestions = [
  {
    id: "fo-m2s2-qc1",
    question: "What does OM stand for in fibre optic classification?",
    options: ["Optical Multimode", "Optical Module", "Output Maximum", "Optic Measurement"],
    correctIndex: 0,
    explanation: "OM stands for Optical Multimode, referring to multimode fibre classifications from OM1 to OM5."
  },
  {
    id: "fo-m2s2-qc2",
    question: "Which OM grade has the highest modal bandwidth?",
    options: ["OM1", "OM2", "OM3", "OM5"],
    correctIndex: 3,
    explanation: "OM5 (wideband multimode) has the highest modal bandwidth at 28,000 MHz·km at 953nm, designed for wavelength division multiplexing."
  },
  {
    id: "fo-m2s2-qc3",
    question: "What is the primary difference between OS1 and OS2 singlemode fibre?",
    options: ["Core diameter", "Water peak attenuation", "Connector type", "Jacket colour"],
    correctIndex: 1,
    explanation: "OS2 is low water peak fibre with reduced attenuation at 1383nm, enabling full spectrum transmission including CWDM wavelengths."
  }
];

const quizQuestions = [
  {
    question: "What is the core diameter of all OM-grade multimode fibres?",
    options: ["9/125 µm", "50/125 µm", "62.5/125 µm", "Varies by grade"],
    correctAnswer: 1
  },
  {
    question: "OM1 fibre has a core diameter of:",
    options: ["50 µm", "62.5 µm", "9 µm", "100 µm"],
    correctAnswer: 1
  },
  {
    question: "What is the minimum modal bandwidth of OM3 fibre at 850nm?",
    options: ["200 MHz·km", "500 MHz·km", "2000 MHz·km", "4700 MHz·km"],
    correctAnswer: 2
  },
  {
    question: "Which cable jacket colour indicates OM3/OM4 aqua multimode fibre?",
    options: ["Orange", "Aqua (turquoise)", "Yellow", "Grey"],
    correctAnswer: 1
  },
  {
    question: "OS2 fibre is specifically designed for:",
    options: ["Short indoor runs", "High-power laser transmission", "Long-haul and outdoor applications", "Audio signal transmission"],
    correctAnswer: 2
  },
  {
    question: "What does the water peak refer to in singlemode fibre?",
    options: ["Maximum water depth for installation", "Attenuation spike at 1383nm from hydroxyl ions", "Cooling water requirements", "Moisture in the cable jacket"],
    correctAnswer: 1
  },
  {
    question: "The maximum attenuation specification for OS1 fibre at 1310nm is:",
    options: ["0.35 dB/km", "0.40 dB/km", "1.0 dB/km", "3.5 dB/km"],
    correctAnswer: 2
  },
  {
    question: "OM5 fibre is specifically optimised for:",
    options: ["Legacy LED sources", "Single wavelength 850nm transmission", "Shortwave wavelength division multiplexing (SWDM)", "Long-haul telecommunications"],
    correctAnswer: 2
  },
  {
    question: "What data rate can OM4 fibre support over 150 metres?",
    options: ["1 Gbps", "10 Gbps", "40/100 Gbps", "400 Gbps"],
    correctAnswer: 2
  },
  {
    question: "Which standard defines the OM and OS fibre classifications?",
    options: ["BS 7671", "ISO/IEC 11801", "TIA-568", "IEEE 802.3"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I mix different OM grades in the same link?",
    answer: "While physically possible, mixing OM grades is strongly discouraged. The lowest grade determines the link performance. For example, connecting OM4 to OM2 will limit the entire link to OM2 bandwidth specifications. Always use consistent grades throughout a link for predictable performance and easier troubleshooting."
  },
  {
    question: "Why is OM1 being phased out of new installations?",
    answer: "OM1 (62.5µm core) cannot reliably support 10 Gigabit Ethernet over meaningful distances. Its larger core causes excessive modal dispersion with modern VCSEL laser sources. New standards focus on OM3-OM5 grades which support 10G, 40G, and 100G applications. OM1 remains only for legacy system maintenance."
  },
  {
    question: "How do I identify fibre grade from cable markings?",
    answer: "Look for the OM or OS designation printed on the cable jacket or referenced in documentation. Jacket colour provides guidance: orange typically indicates OM1/OM2, aqua indicates OM3/OM4/OM5, and yellow indicates singlemode (OS1/OS2). However, always verify with cable markings as colour alone isn't definitive."
  },
  {
    question: "Is OS2 always better than OS1?",
    answer: "For new installations, yes. OS2 has lower attenuation, supports all wavelengths including CWDM, and is designed for both indoor and outdoor use. OS1 is primarily for tight-buffered indoor cables at shorter distances. The cost difference is negligible, so OS2 is the standard choice for modern singlemode installations."
  },
  {
    question: "What's the practical difference between OM4 and OM5?",
    answer: "OM4 and OM5 perform identically at single 850nm wavelength. OM5's advantage is its extended wavelength support (850-953nm) for SWDM applications, enabling 100G and 400G transmission over 4 wavelengths on a single fibre pair. If not using SWDM, OM4 is equally suitable and often more cost-effective."
  },
  {
    question: "How far can I run 10 Gigabit Ethernet on each OM grade?",
    answer: "Maximum distances for 10GBASE-SR: OM1 = 33m, OM2 = 82m, OM3 = 300m, OM4 = 400m, OM5 = 400m. These are based on IEEE 802.3 standards using 850nm VCSEL sources. Actual distances may be shorter in high-loss installations or longer with high-quality components and careful design."
  }
];

const FiberOpticsModule2Section2 = () => {
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
            <Layers className="h-4 w-4" />
            Module 2 • Section 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            OM and OS Standards Explained
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Understanding fibre optic classifications for specification and installation
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
                  OM grades (1-5) classify multimode fibre by bandwidth. OS grades (1-2) classify singlemode by attenuation. Higher numbers = better performance. OM3+ needed for modern networks.
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
                <h3 className="font-semibold text-white mb-1">Specify It / Select It</h3>
                <p className="text-sm text-white/80">
                  Check cable jacket colours: Orange (OM1/2), Aqua (OM3-5), Yellow (OS1/2). Verify OM/OS grade printed on jacket. Match grade to distance and bandwidth needs.
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
              "OM1-OM5 multimode fibre specifications",
              "OS1/OS2 singlemode classifications",
              "Bandwidth and attenuation parameters",
              "Jacket colour coding standards",
              "Grade selection for applications",
              "Distance limitations by grade"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Understanding Fibre Classifications */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Understanding Fibre Classifications</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The OM (Optical Multimode) and OS (Optical Singlemode) classification system standardises fibre optic cable specifications for consistent procurement and installation. Defined in <strong>ISO/IEC 11801</strong> and <strong>EN 50173</strong>, these standards ensure interoperability between equipment from different manufacturers and provide a framework for network design.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Classification Purpose
              </h4>
              <p className="text-sm">
                OM grades define the <strong>modal bandwidth</strong> of multimode fibre—how much data can travel through the cable at specific wavelengths. OS grades define the <strong>attenuation</strong> of singlemode fibre—how much signal is lost over distance. Both enable engineers to calculate maximum transmission distances for given data rates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Multimode (OM) Grades</h4>
                <ul className="text-sm space-y-1">
                  <li>• OM1 - Legacy 62.5µm core</li>
                  <li>• OM2 - Standard 50µm LED-optimised</li>
                  <li>• OM3 - Laser-optimised 50µm</li>
                  <li>• OM4 - Enhanced laser-optimised</li>
                  <li>• OM5 - Wideband multimode (WBMMF)</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Singlemode (OS) Grades</h4>
                <ul className="text-sm space-y-1">
                  <li>• OS1 - Tight-buffered indoor</li>
                  <li>• OS2 - Low water peak (LWP)</li>
                  <li>• Both have 9µm core</li>
                  <li>• OS2 preferred for new installations</li>
                </ul>
              </div>
            </div>

            <p>
              The classification also influences <strong>jacket colour coding</strong> used in the UK and Europe: orange typically indicates OM1/OM2, aqua indicates OM3/OM4/OM5, and yellow indicates singlemode fibre. This visual identification aids cable management in complex installations.
            </p>
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

        {/* Section 2: OM1 and OM2 Specifications */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">OM1 and OM2 Specifications</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OM1 and OM2 represent the legacy multimode fibre grades, originally designed for LED light sources operating at 850nm and 1300nm. While still encountered in existing installations, these grades are <strong>no longer recommended for new deployments</strong> due to limited bandwidth for modern high-speed applications.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">OM1 Specifications (62.5/125µm)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Core Diameter</p>
                  <p className="font-medium">62.5 µm</p>
                </div>
                <div>
                  <p className="text-white/60">Cladding Diameter</p>
                  <p className="font-medium">125 µm</p>
                </div>
                <div>
                  <p className="text-white/60">Bandwidth @ 850nm</p>
                  <p className="font-medium">200 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">Bandwidth @ 1300nm</p>
                  <p className="font-medium">500 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">Jacket Colour</p>
                  <p className="font-medium">Orange</p>
                </div>
                <div>
                  <p className="text-white/60">10GBASE-SR Distance</p>
                  <p className="font-medium">33 metres max</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">OM2 Specifications (50/125µm)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Core Diameter</p>
                  <p className="font-medium">50 µm</p>
                </div>
                <div>
                  <p className="text-white/60">Cladding Diameter</p>
                  <p className="font-medium">125 µm</p>
                </div>
                <div>
                  <p className="text-white/60">Bandwidth @ 850nm</p>
                  <p className="font-medium">500 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">Bandwidth @ 1300nm</p>
                  <p className="font-medium">500 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">Jacket Colour</p>
                  <p className="font-medium">Orange</p>
                </div>
                <div>
                  <p className="text-white/60">10GBASE-SR Distance</p>
                  <p className="font-medium">82 metres max</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Important Distinction
              </h4>
              <p className="text-sm">
                OM1 has a <strong>62.5µm core</strong> while OM2-OM5 all have <strong>50µm cores</strong>. This is critical because connecting 62.5µm to 50µm fibre causes significant insertion loss (approximately 3dB) due to core size mismatch. Always verify core size when working with legacy installations.
              </p>
            </div>

            <p>
              OM2 fibre offered improved bandwidth over OM1 and became common in enterprise LANs during the 1990s and 2000s. However, neither grade can reliably support 10 Gigabit Ethernet over the distances typically required in modern data centres (100m+), leading to their replacement by OM3 and OM4.
            </p>
          </div>
        </section>

        {/* Section 3: OM3 and OM4 - Laser-Optimised Fibre */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">OM3 and OM4 - Laser-Optimised Fibre</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OM3 and OM4 represent the mainstream choice for current multimode installations. These fibres are specifically <strong>laser-optimised</strong> (designated as 'laser-optimised multimode fibre' or LOMMF) to work with 850nm VCSEL (Vertical Cavity Surface Emitting Laser) sources used in modern high-speed transceivers.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                <h4 className="font-semibold text-cyan-400 mb-3">OM3 Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Core Diameter</span>
                    <span className="font-medium">50 µm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">EMB @ 850nm</span>
                    <span className="font-medium">2000 MHz·km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">10GBASE-SR</span>
                    <span className="font-medium">300 metres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">40G/100G</span>
                    <span className="font-medium">100 metres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Jacket Colour</span>
                    <span className="font-medium">Aqua</span>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                <h4 className="font-semibold text-cyan-400 mb-3">OM4 Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Core Diameter</span>
                    <span className="font-medium">50 µm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">EMB @ 850nm</span>
                    <span className="font-medium">4700 MHz·km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">10GBASE-SR</span>
                    <span className="font-medium">400 metres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">40G/100G</span>
                    <span className="font-medium">150 metres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Jacket Colour</span>
                    <span className="font-medium">Aqua</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Effective Modal Bandwidth (EMB)
              </h4>
              <p className="text-sm">
                OM3 and OM4 specifications use <strong>Effective Modal Bandwidth (EMB)</strong> rather than the older overfilled launch (OFL) bandwidth measurement. EMB more accurately represents performance with laser sources by measuring bandwidth under conditions that simulate actual VCSEL launch characteristics.
              </p>
            </div>

            <p>
              The primary difference between OM3 and OM4 is <strong>manufacturing tolerance</strong>. OM4 has tighter refractive index profile control, reducing differential mode delay (DMD) and increasing bandwidth. While both use the same aqua jacket colour, OM4 may be marked with "OM4" on the jacket or with violet-coloured connectors in some implementations.
            </p>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Selection Guidance
              </h4>
              <p className="text-sm">
                For most new multimode installations, <strong>OM4 is recommended</strong> over OM3. The cost premium is typically 15-25% but provides 33% greater 10GbE distance and 50% greater 40/100GbE distance. This future-proofs the installation for bandwidth upgrades without recabling.
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

        {/* Section 4: OM5 - Wideband Multimode */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">OM5 - Wideband Multimode Fibre</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OM5, also known as <strong>Wideband Multimode Fibre (WBMMF)</strong>, was introduced in 2016 to support shortwave wavelength division multiplexing (SWDM). Unlike previous grades optimised solely for 850nm, OM5 maintains bandwidth performance across an extended wavelength range from 850nm to 953nm.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">OM5 Key Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Core Diameter</p>
                  <p className="font-medium">50 µm</p>
                </div>
                <div>
                  <p className="text-white/60">EMB @ 850nm</p>
                  <p className="font-medium">4700 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">EMB @ 953nm</p>
                  <p className="font-medium">2470 MHz·km</p>
                </div>
                <div>
                  <p className="text-white/60">Wavelength Range</p>
                  <p className="font-medium">850-953nm</p>
                </div>
                <div>
                  <p className="text-white/60">Jacket Colour</p>
                  <p className="font-medium">Lime Green</p>
                </div>
                <div>
                  <p className="text-white/60">SWDM4 Capability</p>
                  <p className="font-medium">100G/400G</p>
                </div>
              </div>
            </div>

            <div className="bg-lime-500/10 rounded-lg p-4 border border-lime-500/30">
              <h4 className="font-semibold text-lime-400 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                SWDM Technology
              </h4>
              <p className="text-sm">
                Shortwave Wavelength Division Multiplexing uses four wavelengths (850nm, 880nm, 910nm, 940nm) on a single fibre pair to achieve 100Gbps (4×25G) or 400Gbps (4×100G) transmission. This enables high bandwidth over existing duplex cabling infrastructure, reducing the fibre count required for high-speed connections.
              </p>
            </div>

            <p>
              The distinctive <strong>lime green jacket</strong> (specified in TIA-568.3-D) distinguishes OM5 from other multimode grades. This visual identification is important because OM5's value is only realised when using SWDM transceivers—with standard 850nm-only transceivers, OM5 performs identically to OM4.
            </p>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Cost-Benefit Consideration
              </h4>
              <p className="text-sm">
                OM5 fibre carries a 50-100% cost premium over OM4. Unless SWDM deployment is planned, OM4 provides equivalent single-wavelength performance at lower cost. OM5 adoption remains limited primarily to data centres with specific roadmaps for 100G+ SWDM transmission over multimode.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: OS1 and OS2 Singlemode */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">OS1 and OS2 Singlemode Specifications</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The OS (Optical Singlemode) grades classify singlemode fibre based on <strong>attenuation performance</strong> and <strong>intended application</strong>. Unlike multimode grades which focus on bandwidth, singlemode fibre has effectively unlimited bandwidth—the limiting factor is signal attenuation over distance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-400 mb-3">OS1 Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Core Diameter</span>
                    <span className="font-medium">9 µm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Max Atten. @ 1310nm</span>
                    <span className="font-medium">1.0 dB/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Max Atten. @ 1550nm</span>
                    <span className="font-medium">1.0 dB/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Construction</span>
                    <span className="font-medium">Tight-buffered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Typical Application</span>
                    <span className="font-medium">Indoor premises</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-400 mb-3">OS2 Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Core Diameter</span>
                    <span className="font-medium">9 µm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Max Atten. @ 1310nm</span>
                    <span className="font-medium">0.4 dB/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Max Atten. @ 1550nm</span>
                    <span className="font-medium">0.4 dB/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Water Peak</span>
                    <span className="font-medium">Low (LWP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Typical Application</span>
                    <span className="font-medium">All applications</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Understanding the Water Peak
              </h4>
              <p className="text-sm">
                The <strong>water peak</strong> refers to increased attenuation at approximately 1383nm caused by hydroxyl (OH) ions absorbed during fibre manufacturing. This affects CWDM systems using wavelengths in the 1360-1460nm range. OS2's <strong>low water peak (LWP)</strong> specification ensures consistent low attenuation across all wavelengths from 1310nm to 1625nm.
              </p>
            </div>

            <p>
              While OS1 was originally intended for tight-buffered indoor cables and OS2 for loose-tube outdoor cables, modern practice has evolved. <strong>OS2 is now the default specification</strong> for virtually all new singlemode installations because:
            </p>

            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Lower attenuation enables longer transmission distances</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>LWP supports CWDM and DWDM wavelength expansion</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Cost difference is negligible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Future-proofs for increasing wavelength use</span>
              </li>
            </ul>
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

        {/* Section 6: Grade Selection and Identification */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Grade Selection and Identification</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the correct fibre grade requires matching the specification to the application's <strong>bandwidth requirements</strong>, <strong>transmission distances</strong>, and <strong>budget constraints</strong>. The following decision framework helps identify the optimal grade for common scenarios.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Jacket Colour Identification Guide</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-orange-500"></div>
                  <span className="font-medium">Orange</span>
                  <span className="text-white/60">OM1 / OM2 Multimode</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-cyan-400"></div>
                  <span className="font-medium">Aqua</span>
                  <span className="text-white/60">OM3 / OM4 Multimode</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-lime-400"></div>
                  <span className="font-medium">Lime Green</span>
                  <span className="text-white/60">OM5 Wideband Multimode</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-yellow-400"></div>
                  <span className="font-medium">Yellow</span>
                  <span className="text-white/60">OS1 / OS2 Singlemode</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3">Application Selection Matrix</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">1G to 100m:</span>
                  <span className="text-white/70">OM3, OM4, or OS2</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">10G to 300m:</span>
                  <span className="text-white/70">OM3 minimum, OM4 recommended</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">40G/100G to 150m:</span>
                  <span className="text-white/70">OM4 minimum</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">100G SWDM:</span>
                  <span className="text-white/70">OM5 required</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">Any distance 500m+:</span>
                  <span className="text-white/70">OS2 singlemode</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white min-w-[140px]">Outdoor/campus:</span>
                  <span className="text-white/70">OS2 singlemode</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Verification Best Practice
              </h4>
              <p className="text-sm">
                Never rely solely on jacket colour for grade identification. Always verify by reading the <strong>cable marking</strong> printed on the outer jacket. Markings will include manufacturer, cable type, fibre count, and the OM or OS grade designation. Keep records of installed cable grades for future maintenance and upgrades.
              </p>
            </div>

            <p>
              For <strong>new installations</strong>, the general recommendation is OM4 for multimode (up to 150m data centre/building backbone) and OS2 for singlemode (campus backbone, building-to-building, long runs). This balances cost, performance, and future-proofing. Avoid OM1/OM2 and OS1 unless matching existing infrastructure.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Gauge className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Specification Best Practices</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always specify fibre grade explicitly in project documentation (e.g., "OM4 50/125µm")</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Include bandwidth requirements and expected data rates in specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Document maximum link lengths for each cable route</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Request manufacturer test certificates showing grade compliance</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Installation Considerations</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verify delivered cable grade matches specification before installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Label all cables and patch panels with grade information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Never mix fibre grades within a single link</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Test installed links against grade-appropriate parameters</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Assuming all orange fibre is the same grade (OM1 vs OM2 core size difference)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Connecting 62.5µm fibre to 50µm fibre (causes ~3dB loss)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using OM1/OM2 for new 10GbE installations (insufficient distance)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Specifying OM5 without SWDM deployment plans (unnecessary cost)</span>
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
            Quick Reference: OM/OS Specifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Multimode Grades</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>OM1:</strong> 62.5µm, 200 MHz·km, 33m @10G</p>
                <p><strong>OM2:</strong> 50µm, 500 MHz·km, 82m @10G</p>
                <p><strong>OM3:</strong> 50µm, 2000 MHz·km, 300m @10G</p>
                <p><strong>OM4:</strong> 50µm, 4700 MHz·km, 400m @10G</p>
                <p><strong>OM5:</strong> 50µm, 4700 MHz·km + SWDM</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Singlemode Grades</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>OS1:</strong> 9µm, 1.0 dB/km, indoor</p>
                <p><strong>OS2:</strong> 9µm, 0.4 dB/km, all use</p>
                <p><strong>Jacket:</strong> Yellow (both grades)</p>
                <p><strong>Standard:</strong> OS2 for all new installs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="OM and OS Standards Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-1"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Singlemode vs Multimode</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-3"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Connector Types</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section2;