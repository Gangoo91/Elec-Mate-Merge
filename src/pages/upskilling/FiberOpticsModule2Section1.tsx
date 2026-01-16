import { ArrowLeft, Layers, CheckCircle, Zap, Target, Radio, BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Singlemode vs Multimode Fibre - Fibre Optics Course";
const DESCRIPTION = "Understand the key differences between singlemode and multimode optical fibres, their applications, and how to choose the right type for your installation.";

const quickCheckQuestions = [
  {
    id: "fo-m2s1-qc1",
    question: "What is the typical core diameter of singlemode fibre?",
    options: ["50 micrometres", "62.5 micrometres", "8-10 micrometres", "125 micrometres"],
    correctIndex: 2,
    explanation: "Singlemode fibre has a very small core of 8-10μm (typically 9μm) which allows only one mode of light to propagate, eliminating modal dispersion."
  },
  {
    id: "fo-m2s1-qc2",
    question: "Which fibre type is typically used for distances over 500 metres?",
    options: ["OM1 multimode", "OM2 multimode", "Singlemode", "Any type works equally"],
    correctIndex: 2,
    explanation: "Singlemode fibre is preferred for distances over 500m due to its lower attenuation and absence of modal dispersion. Multimode has distance limitations."
  },
  {
    id: "fo-m2s1-qc3",
    question: "What causes modal dispersion in multimode fibre?",
    options: ["Temperature changes", "Different light paths arriving at different times", "Connector dirt", "Cable bending"],
    correctIndex: 1,
    explanation: "In multimode fibre, light travels via multiple paths (modes) of different lengths. These arrive at different times, spreading the signal - this is modal dispersion."
  }
];

const quizQuestions = [
  {
    question: "Singlemode fibre is designated with the prefix:",
    options: ["OM", "OS", "SM", "MM"],
    correctAnswer: 1
  },
  {
    question: "Which has lower attenuation per kilometre?",
    options: ["Multimode OM3", "Multimode OM4", "Singlemode OS2", "They are all equal"],
    correctAnswer: 2
  },
  {
    question: "What type of light source is typically used with singlemode fibre?",
    options: ["LED", "Laser (typically 1310nm or 1550nm)", "Incandescent", "Halogen"],
    correctAnswer: 1
  },
  {
    question: "OM4 multimode fibre has a core diameter of:",
    options: ["9 micrometres", "50 micrometres", "62.5 micrometres", "125 micrometres"],
    correctAnswer: 1
  },
  {
    question: "For a 300m 10Gbps link in a building, which fibre would typically be used?",
    options: ["Singlemode only", "OM3 or OM4 multimode", "OM1 multimode", "Copper is better"],
    correctAnswer: 1
  },
  {
    question: "The term 'mode' in optical fibre refers to:",
    options: ["The colour of the jacket", "A path that light can travel through the fibre", "The connector type", "The installation method"],
    correctAnswer: 1
  },
  {
    question: "Which statement about multimode fibre is TRUE?",
    options: ["It has a smaller core than singlemode", "It can use less expensive LED light sources", "It has longer distance capability", "It has lower modal dispersion"],
    correctAnswer: 1
  },
  {
    question: "OS2 singlemode fibre is specified for use at which wavelengths?",
    options: ["850nm only", "1310nm and 1550nm", "Visible light only", "Any wavelength"],
    correctAnswer: 1
  },
  {
    question: "What is the cladding diameter for both singlemode and standard multimode fibre?",
    options: ["50 micrometres", "62.5 micrometres", "125 micrometres", "250 micrometres"],
    correctAnswer: 2
  },
  {
    question: "Laser-optimised multimode fibre (OM3/OM4) was developed to:",
    options: ["Reduce cost", "Support higher data rates over longer distances", "Make installation easier", "Improve appearance"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I mix singlemode and multimode fibre in a link?",
    answer: "No. Singlemode and multimode are not compatible. The different core sizes and light sources mean connecting them directly causes massive signal loss. Use appropriate media converters if you must bridge between types."
  },
  {
    question: "Is singlemode always better than multimode?",
    answer: "Not necessarily. For short distances (<300-500m), multimode is often more cost-effective because it uses cheaper LED/VCSEL sources. Singlemode excels at longer distances and higher bandwidths but requires more expensive laser transceivers."
  },
  {
    question: "Can I use singlemode transceivers with multimode fibre?",
    answer: "No. The laser beam from a singlemode transceiver would cause significant problems in multimode fibre. Always match transceiver type to fibre type. Mode-conditioning patch cords exist for specific legacy situations but are not a general solution."
  },
  {
    question: "Why does multimode fibre come in different grades (OM1-OM5)?",
    answer: "Each grade represents improved performance. OM1/OM2 are legacy grades. OM3/OM4 are laser-optimised for high-speed transmission. OM5 adds support for wavelength division multiplexing. Higher grades support faster speeds at longer distances."
  },
  {
    question: "What distance can I achieve with multimode vs singlemode?",
    answer: "At 10Gbps: OM3 reaches ~300m, OM4 reaches ~400m, while singlemode can reach 10km+. At higher speeds, multimode distances decrease significantly. Singlemode can span 40-80km with appropriate equipment."
  },
  {
    question: "How can I tell singlemode from multimode fibre?",
    answer: "Check the jacket colour (yellow typically = singlemode, orange/aqua = multimode) and markings. The cable should be labelled with fibre type (OS2, OM3, etc.). When in doubt, test with OTDR or verify documentation."
  }
];

const FiberOpticsModule2Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to="/electrical-upskilling/fiber-optics-module-2"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 2</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-3xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <Layers className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 2 • Section 1</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Singlemode vs Multimode Fibre</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding the fundamental differences between fibre types and when to use each.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Singlemode (9μm core) carries one light path - long distance, high bandwidth, more expensive.
              Multimode (50/62.5μm core) carries multiple paths - shorter distance, cheaper sources.
              Choose based on distance, speed, and budget requirements.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Quick Comparison
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Singlemode: 9/125μm, laser, km range</li>
              <li>• Multimode: 50/125 or 62.5/125μm, LED/VCSEL</li>
              <li>• Singlemode = yellow jacket typically</li>
              <li>• Multimode = orange or aqua jacket</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Distinguish between singlemode and multimode fibre",
              "Understand modal dispersion and its effects",
              "Identify fibre grades (OM1-OM5, OS1/OS2)",
              "Select appropriate fibre type for applications",
              "Recognise fibre by physical characteristics",
              "Understand bandwidth-distance relationships"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: The Basics */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">Understanding Modes</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The term "mode" refers to a path that light can take through an optical fibre. The number
              of modes depends on the core diameter relative to the wavelength of light being used.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">What is a Mode?</h4>
              <p className="text-sm mb-3">
                Think of modes as different paths or "lanes" that light can travel. In a larger core,
                light can bounce at many different angles, creating multiple paths. In a tiny core,
                only one path is possible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-medium text-elec-yellow">Singlemode</h5>
                  <p className="text-sm mt-1">
                    Core so small (9μm) that only one mode propagates. Light travels in essentially
                    a straight line down the centre. No modal dispersion.
                  </p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <h5 className="font-medium text-orange-400">Multimode</h5>
                  <p className="text-sm mt-1">
                    Larger core (50 or 62.5μm) allows hundreds of modes. Light bounces at many angles.
                    Different paths = different arrival times = modal dispersion.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Modal Dispersion Explained</h4>
              <p className="text-sm">
                In multimode fibre, light rays travelling straight down the centre arrive before rays
                bouncing off the sides (longer path). This time difference "spreads" the signal pulse,
                limiting how fast data can be sent and how far it can travel. Singlemode eliminates
                this problem entirely.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Singlemode Fibre */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Singlemode Fibre (OS1/OS2)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Singlemode fibre is designed for long-distance, high-bandwidth applications. Its small
              core requires precise laser light sources but delivers exceptional performance.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Singlemode Specifications</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-center">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-elec-yellow font-bold text-lg">9μm</div>
                  <div className="text-gray-400">Core Diameter</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-elec-yellow font-bold text-lg">125μm</div>
                  <div className="text-gray-400">Cladding</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-elec-yellow font-bold text-lg">1310/1550nm</div>
                  <div className="text-gray-400">Wavelengths</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-elec-yellow font-bold text-lg">10-80km+</div>
                  <div className="text-gray-400">Typical Range</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">OS1 vs OS2</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>OS1:</strong> Tight-buffered, indoor use. Attenuation ≤1.0 dB/km at 1310nm, ≤1.0 dB/km at 1550nm.</li>
                  <li><strong>OS2:</strong> Loose-tube, indoor/outdoor. Attenuation ≤0.4 dB/km at 1310nm, ≤0.4 dB/km at 1550nm. Better performance.</li>
                </ul>
                <p className="text-xs text-gray-400 mt-2">OS2 is now the standard for most singlemode applications.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Singlemode Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Very long distances (tens of km)</li>
                  <li>✓ Highest bandwidth potential</li>
                  <li>✓ No modal dispersion</li>
                  <li>✓ Supports WDM (multiple wavelengths)</li>
                  <li>✓ Future-proof for speed upgrades</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Singlemode Considerations</h4>
              <ul className="text-sm space-y-1">
                <li>• Requires laser light sources (more expensive)</li>
                <li>• Tighter alignment tolerances for connectors</li>
                <li>• More challenging to terminate in the field</li>
                <li>• Typically higher transceiver costs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Multimode Fibre */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Multimode Fibre (OM1-OM5)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Multimode fibre is optimised for shorter distances where cost-effective, high-speed
              connections are needed. Different grades offer varying performance levels.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <h4 className="font-semibold text-white mb-3">Multimode Grades Comparison</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-elec-yellow">Grade</th>
                    <th className="text-center py-2 text-elec-yellow">Core</th>
                    <th className="text-center py-2 text-elec-yellow">Jacket Colour</th>
                    <th className="text-center py-2 text-elec-yellow">10GbE Distance</th>
                    <th className="text-center py-2 text-elec-yellow">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2 font-medium">OM1</td>
                    <td className="text-center">62.5μm</td>
                    <td className="text-center">Orange</td>
                    <td className="text-center">33m</td>
                    <td className="text-center text-red-400">Legacy</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2 font-medium">OM2</td>
                    <td className="text-center">50μm</td>
                    <td className="text-center">Orange</td>
                    <td className="text-center">82m</td>
                    <td className="text-center text-orange-400">Legacy</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2 font-medium">OM3</td>
                    <td className="text-center">50μm</td>
                    <td className="text-center">Aqua</td>
                    <td className="text-center">300m</td>
                    <td className="text-center text-green-400">Current</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2 font-medium">OM4</td>
                    <td className="text-center">50μm</td>
                    <td className="text-center">Aqua</td>
                    <td className="text-center">400m</td>
                    <td className="text-center text-green-400">Current</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">OM5</td>
                    <td className="text-center">50μm</td>
                    <td className="text-center">Lime Green</td>
                    <td className="text-center">400m</td>
                    <td className="text-center text-blue-400">Latest</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">OM3/OM4: Laser Optimised</h4>
                <p className="text-sm mb-2">
                  These grades are optimised for 850nm VCSEL (Vertical Cavity Surface Emitting Laser)
                  sources, enabling much higher bandwidths than older LED-based systems.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• OM3: 2000 MHz·km bandwidth</li>
                  <li>• OM4: 4700 MHz·km bandwidth</li>
                  <li>• Aqua colour for easy identification</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">OM5: Wideband Multimode</h4>
                <p className="text-sm mb-2">
                  OM5 adds support for Short Wavelength Division Multiplexing (SWDM),
                  using multiple wavelengths (850-953nm) to increase capacity.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Supports 4 wavelengths on one fibre</li>
                  <li>• Enables 100G/400G with fewer fibres</li>
                  <li>• Lime green jacket for identification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Choosing the Right Fibre */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Choosing the Right Fibre Type</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Selecting between singlemode and multimode depends on your specific requirements.
              Consider distance, speed, existing infrastructure, and total cost of ownership.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Selection Decision Tree</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-elec-yellow">Distance &gt;500m?</span>
                    <span className="text-gray-400"> → Singlemode (OS2) is the clear choice</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-elec-yellow">Distance &lt;300m, 10G or less?</span>
                    <span className="text-gray-400"> → Multimode (OM3/OM4) is cost-effective</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-elec-yellow">Data centre with 40G/100G?</span>
                    <span className="text-gray-400"> → OM4 for short runs, singlemode for longer</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-elec-yellow">Maximum future-proofing?</span>
                    <span className="text-gray-400"> → Singlemode handles any foreseeable speed</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-elec-yellow">Budget is primary concern?</span>
                    <span className="text-gray-400"> → Multimode transceivers cost less for short links</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Common Application Guidelines</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-white mb-1">Use Multimode (OM3/OM4):</h5>
                  <ul className="space-y-1">
                    <li>• Building backbone (&lt;300m)</li>
                    <li>• Data centre within a hall</li>
                    <li>• Server-to-switch connections</li>
                    <li>• When replacing OM1/OM2</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Use Singlemode (OS2):</h5>
                  <ul className="space-y-1">
                    <li>• Campus/external links</li>
                    <li>• Any distance &gt;500m</li>
                    <li>• Carrier/metro connections</li>
                    <li>• Long-term infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Critical: Never Mix Fibre Types
              </h4>
              <p className="text-sm">
                Singlemode and multimode fibres are <strong>not compatible</strong>. Connecting them
                causes severe signal loss (often complete failure). Always verify fibre type at both
                ends before connecting. Check jacket colour and cable markings.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Visual Identification</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Jacket Colours (Common)</h5>
                  <ul className="space-y-1">
                    <li><span className="inline-block w-3 h-3 rounded bg-yellow-400 mr-2"></span>Yellow = Singlemode</li>
                    <li><span className="inline-block w-3 h-3 rounded bg-orange-500 mr-2"></span>Orange = Multimode (OM1/OM2)</li>
                    <li><span className="inline-block w-3 h-3 rounded bg-cyan-400 mr-2"></span>Aqua = Multimode (OM3/OM4)</li>
                    <li><span className="inline-block w-3 h-3 rounded bg-lime-400 mr-2"></span>Lime = Multimode (OM5)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Cable Markings</h5>
                  <p className="mb-2">Always check printed markings on cable jacket:</p>
                  <ul className="space-y-1">
                    <li>• "SM" or "OS2" = Singlemode</li>
                    <li>• "MM" or "OM3/OM4" = Multimode</li>
                    <li>• "9/125" = Singlemode</li>
                    <li>• "50/125" or "62.5/125" = Multimode</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Common Mistakes to Avoid</h4>
              <ul className="text-sm space-y-1">
                <li>• Mixing singlemode and multimode in a link</li>
                <li>• Using singlemode transceivers with multimode fibre (or vice versa)</li>
                <li>• Installing OM1/OM2 in new projects (use OM3/OM4 minimum)</li>
                <li>• Not verifying fibre type matches transceiver type</li>
                <li>• Assuming all orange cable is the same (OM1 vs OM2)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Fibre Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Singlemode (OS2)</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Core: 9μm / Cladding: 125μm</li>
                  <li>• Wavelength: 1310nm, 1550nm</li>
                  <li>• Distance: 10km+ typical</li>
                  <li>• Jacket: Yellow</li>
                  <li>• Source: Laser</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Multimode (OM3/OM4)</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Core: 50μm / Cladding: 125μm</li>
                  <li>• Wavelength: 850nm</li>
                  <li>• Distance: 300-400m at 10G</li>
                  <li>• Jacket: Aqua</li>
                  <li>• Source: VCSEL/LED</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 1 Quiz: Singlemode vs Multimode Fibre"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/fiber-optics-module-2">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation active:scale-[0.98] min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Module Overview
            </Button>
          </Link>
          <Link to="/electrical-upskilling/fiber-optics-module-2-section-2">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] min-h-[44px]">
              Next: OM and OS Standards
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section1;
