import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    explanation: "Singlemode fibre has a very small core of 8-10um (typically 9um) which allows only one mode of light to propagate, eliminating modal dispersion."
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
    id: 1,
    question: "Singlemode fibre is designated with the prefix:",
    options: ["OM", "OS", "SM", "MM"],
    correctAnswer: 1,
    explanation: "Singlemode fibre uses the OS (Optical Singlemode) designation, such as OS1 and OS2."
  },
  {
    id: 2,
    question: "Which has lower attenuation per kilometre?",
    options: ["Multimode OM3", "Multimode OM4", "Singlemode OS2", "They are all equal"],
    correctAnswer: 2,
    explanation: "Singlemode OS2 has the lowest attenuation at around 0.4 dB/km, compared to multimode which is typically 2-3 dB/km."
  },
  {
    id: 3,
    question: "What type of light source is typically used with singlemode fibre?",
    options: ["LED", "Laser (typically 1310nm or 1550nm)", "Incandescent", "Halogen"],
    correctAnswer: 1,
    explanation: "Singlemode fibre requires laser sources at 1310nm or 1550nm wavelengths due to the small core size."
  },
  {
    id: 4,
    question: "OM4 multimode fibre has a core diameter of:",
    options: ["9 micrometres", "50 micrometres", "62.5 micrometres", "125 micrometres"],
    correctAnswer: 1,
    explanation: "OM4 (and OM3) multimode fibre has a 50um core. The 125um is the cladding diameter, common to all standard fibre."
  },
  {
    id: 5,
    question: "For a 300m 10Gbps link in a building, which fibre would typically be used?",
    options: ["Singlemode only", "OM3 or OM4 multimode", "OM1 multimode", "Copper is better"],
    correctAnswer: 1,
    explanation: "OM3/OM4 can handle 10Gbps at 300-400m and is more cost-effective than singlemode for building backbones."
  },
  {
    id: 6,
    question: "The term 'mode' in optical fibre refers to:",
    options: ["The colour of the jacket", "A path that light can travel through the fibre", "The connector type", "The installation method"],
    correctAnswer: 1,
    explanation: "A mode is a path that light can take through the fibre. Singlemode has one path, multimode has many."
  },
  {
    id: 7,
    question: "Which statement about multimode fibre is TRUE?",
    options: ["It has a smaller core than singlemode", "It can use less expensive LED light sources", "It has longer distance capability", "It has lower modal dispersion"],
    correctAnswer: 1,
    explanation: "Multimode fibre can use LED or VCSEL sources which are less expensive than the lasers required for singlemode."
  },
  {
    id: 8,
    question: "OS2 singlemode fibre is specified for use at which wavelengths?",
    options: ["850nm only", "1310nm and 1550nm", "Visible light only", "Any wavelength"],
    correctAnswer: 1,
    explanation: "OS2 singlemode fibre is optimised for 1310nm and 1550nm wavelengths used in long-distance communications."
  },
  {
    id: 9,
    question: "What is the cladding diameter for both singlemode and standard multimode fibre?",
    options: ["50 micrometres", "62.5 micrometres", "125 micrometres", "250 micrometres"],
    correctAnswer: 2,
    explanation: "Standard telecommunications fibre has a cladding diameter of 125um regardless of whether it's singlemode or multimode."
  },
  {
    id: 10,
    question: "Laser-optimised multimode fibre (OM3/OM4) was developed to:",
    options: ["Reduce cost", "Support higher data rates over longer distances", "Make installation easier", "Improve appearance"],
    correctAnswer: 1,
    explanation: "OM3/OM4 are laser-optimised to support higher data rates (10-100Gbps) over longer distances than older OM1/OM2 grades."
  }
];

const faqs = [
  {
    question: "Can I mix singlemode and multimode fibre in a link?",
    answer: "No. Singlemode and multimode are not compatible. The different core sizes and light sources mean connecting them directly causes massive signal loss. Use appropriate media converters if you must bridge between types."
  },
  {
    question: "Is singlemode always better than multimode?",
    answer: "Not necessarily. For short distances (&lt;300-500m), multimode is often more cost-effective because it uses cheaper LED/VCSEL sources. Singlemode excels at longer distances and higher bandwidths but requires more expensive laser transceivers."
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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-2">
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
            <span>Module 2 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Singlemode vs Multimode Fibre
          </h1>
          <p className="text-white/80">
            Understanding the fundamental differences between fibre types and when to use each
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Singlemode:</strong> 9um core, one light path, long distance</li>
              <li><strong>Multimode:</strong> 50/62.5um core, multiple paths, short distance</li>
              <li><strong>Key:</strong> Never mix them in a link</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Yellow jacket:</strong> Singlemode</li>
              <li><strong>Orange/Aqua jacket:</strong> Multimode</li>
              <li><strong>&gt;500m?</strong> Use singlemode</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between singlemode and multimode fibre",
              "Understand modal dispersion and its effects",
              "Identify fibre grades (OM1-OM5, OS1/OS2)",
              "Select appropriate fibre type for applications",
              "Recognise fibre by physical characteristics",
              "Understand bandwidth-distance relationships"
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
            Understanding Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The term "mode" refers to a path that light can take through an optical fibre. The number
              of modes depends on the core diameter relative to the wavelength of light being used.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">What is a Mode?</p>
              <p className="text-sm text-white">
                Think of modes as different paths or "lanes" that light can travel. In a larger core,
                light can bounce at many different angles, creating multiple paths. In a tiny core,
                only one path is possible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Singlemode</p>
                <p className="text-sm text-white">
                  Core so small (9um) that only one mode propagates. Light travels in essentially
                  a straight line down the centre. No modal dispersion.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Multimode</p>
                <p className="text-sm text-white">
                  Larger core (50 or 62.5um) allows hundreds of modes. Light bounces at many angles.
                  Different paths = different arrival times = modal dispersion.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Modal Dispersion Explained</p>
              <p className="text-sm text-white">
                In multimode fibre, light rays travelling straight down the centre arrive before rays
                bouncing off the sides (longer path). This time difference "spreads" the signal pulse,
                limiting how fast data can be sent and how far it can travel. Singlemode eliminates
                this problem entirely.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Singlemode Fibre (OS1/OS2)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Singlemode fibre is designed for long-distance, high-bandwidth applications. Its small
              core requires precise laser light sources but delivers exceptional performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Singlemode Specifications:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 text-center">
                  <div className="text-elec-yellow font-bold">9um</div>
                  <div className="text-white/70 text-xs">Core</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 text-center">
                  <div className="text-elec-yellow font-bold">125um</div>
                  <div className="text-white/70 text-xs">Cladding</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 text-center">
                  <div className="text-elec-yellow font-bold">1310/1550nm</div>
                  <div className="text-white/70 text-xs">Wavelengths</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 text-center">
                  <div className="text-elec-yellow font-bold">10-80km+</div>
                  <div className="text-white/70 text-xs">Range</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OS1 vs OS2</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>OS1:</strong> Indoor, tight-buffered. Attenuation &lt;1.0 dB/km</li>
                  <li><strong>OS2:</strong> Indoor/outdoor, loose-tube. Attenuation &lt;0.4 dB/km</li>
                </ul>
                <p className="text-xs text-white/70 mt-2">OS2 is now the standard for most applications.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Singlemode Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Very long distances (tens of km)</li>
                  <li>Highest bandwidth potential</li>
                  <li>No modal dispersion</li>
                  <li>Supports WDM (multiple wavelengths)</li>
                  <li>Future-proof for speed upgrades</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Singlemode Considerations</p>
              <ul className="text-sm text-white space-y-1">
                <li>Requires laser light sources (more expensive)</li>
                <li>Tighter alignment tolerances for connectors</li>
                <li>More challenging to terminate in the field</li>
                <li>Typically higher transceiver costs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Multimode Fibre (OM1-OM5)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multimode fibre is optimised for shorter distances where cost-effective, high-speed
              connections are needed. Different grades offer varying performance levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Multimode Grades Comparison:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow">Grade</th>
                      <th className="text-center py-2 text-elec-yellow">Core</th>
                      <th className="text-center py-2 text-elec-yellow">Jacket</th>
                      <th className="text-center py-2 text-elec-yellow">10GbE</th>
                      <th className="text-center py-2 text-elec-yellow">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium">OM1</td>
                      <td className="text-center">62.5um</td>
                      <td className="text-center">Orange</td>
                      <td className="text-center">33m</td>
                      <td className="text-center text-red-400">Legacy</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium">OM2</td>
                      <td className="text-center">50um</td>
                      <td className="text-center">Orange</td>
                      <td className="text-center">82m</td>
                      <td className="text-center text-red-400">Legacy</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium">OM3</td>
                      <td className="text-center">50um</td>
                      <td className="text-center">Aqua</td>
                      <td className="text-center">300m</td>
                      <td className="text-center text-elec-yellow">Current</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-medium">OM4</td>
                      <td className="text-center">50um</td>
                      <td className="text-center">Aqua</td>
                      <td className="text-center">400m</td>
                      <td className="text-center text-elec-yellow">Current</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">OM5</td>
                      <td className="text-center">50um</td>
                      <td className="text-center">Lime</td>
                      <td className="text-center">400m</td>
                      <td className="text-center text-elec-yellow">Latest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OM3/OM4: Laser Optimised</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Optimised for 850nm VCSEL lasers</li>
                  <li>OM3: 2000 MHz.km bandwidth</li>
                  <li>OM4: 4700 MHz.km bandwidth</li>
                  <li>Aqua jacket for identification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OM5: Wideband Multimode</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Supports SWDM (850-953nm)</li>
                  <li>4 wavelengths on one fibre</li>
                  <li>Enables 100G/400G with fewer fibres</li>
                  <li>Lime green jacket</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Choosing the Right Fibre Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting between singlemode and multimode depends on your specific requirements.
              Consider distance, speed, existing infrastructure, and total cost of ownership.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Selection Decision Tree</p>
              <ul className="text-sm text-white space-y-2">
                <li><strong>Distance &gt;500m?</strong> Singlemode (OS2) is the clear choice</li>
                <li><strong>Distance &lt;300m, 10G or less?</strong> Multimode (OM3/OM4) is cost-effective</li>
                <li><strong>Data centre with 40G/100G?</strong> OM4 for short runs, singlemode for longer</li>
                <li><strong>Maximum future-proofing?</strong> Singlemode handles any foreseeable speed</li>
                <li><strong>Budget is primary concern?</strong> Multimode transceivers cost less for short links</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Use Multimode (OM3/OM4)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Building backbone (&lt;300m)</li>
                  <li>Data centre within a hall</li>
                  <li>Server-to-switch connections</li>
                  <li>When replacing OM1/OM2</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Use Singlemode (OS2)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Campus/external links</li>
                  <li>Any distance &gt;500m</li>
                  <li>Carrier/metro connections</li>
                  <li>Long-term infrastructure</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Critical: Never Mix Fibre Types</p>
              <p className="text-sm text-white">
                Singlemode and multimode fibres are <strong>not compatible</strong>. Connecting them
                causes severe signal loss (often complete failure). Always verify fibre type at both
                ends before connecting. Check jacket colour and cable markings.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Identification</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Jacket Colours (Common)</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li><strong>Yellow</strong> = Singlemode</li>
                    <li><strong>Orange</strong> = Multimode (OM1/OM2)</li>
                    <li><strong>Aqua</strong> = Multimode (OM3/OM4)</li>
                    <li><strong>Lime</strong> = Multimode (OM5)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Cable Markings</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>"SM" or "OS2" = Singlemode</li>
                    <li>"MM" or "OM3/OM4" = Multimode</li>
                    <li>"9/125" = Singlemode</li>
                    <li>"50/125" or "62.5/125" = Multimode</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing singlemode and multimode</strong> in a link</li>
                <li><strong>Using wrong transceivers</strong> for the fibre type</li>
                <li><strong>Installing OM1/OM2</strong> in new projects (use OM3/OM4 minimum)</li>
                <li><strong>Not verifying</strong> fibre type matches transceiver type</li>
                <li><strong>Assuming all orange cable</strong> is the same (OM1 vs OM2)</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Fibre Types</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Singlemode (OS2)</p>
                <ul className="space-y-0.5">
                  <li>Core: 9um / Cladding: 125um</li>
                  <li>Wavelength: 1310nm, 1550nm</li>
                  <li>Distance: 10km+ typical</li>
                  <li>Jacket: Yellow</li>
                  <li>Source: Laser</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Multimode (OM3/OM4)</p>
                <ul className="space-y-0.5">
                  <li>Core: 50um / Cladding: 125um</li>
                  <li>Wavelength: 850nm</li>
                  <li>Distance: 300-400m at 10G</li>
                  <li>Jacket: Aqua</li>
                  <li>Source: VCSEL/LED</li>
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
            <Link to="/electrician/upskilling/fiber-optics-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next: OM and OS Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section1;
