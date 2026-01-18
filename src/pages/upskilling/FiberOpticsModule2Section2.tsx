import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "OM and OS Standards Explained - Fibre Optics Course";
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
    explanation: "OM5 (wideband multimode) has the highest modal bandwidth at 28,000 MHz.km at 953nm, designed for wavelength division multiplexing."
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
    id: 1,
    question: "What is the core diameter of all OM-grade multimode fibres?",
    options: ["9/125 um", "50/125 um", "62.5/125 um", "Varies by grade"],
    correctAnswer: 1,
    explanation: "OM2-OM5 all have 50um cores. Only OM1 has 62.5um. The question refers to the modern OM grades which standardised on 50um."
  },
  {
    id: 2,
    question: "OM1 fibre has a core diameter of:",
    options: ["50 um", "62.5 um", "9 um", "100 um"],
    correctAnswer: 1,
    explanation: "OM1 is the only multimode grade with a 62.5um core. All other OM grades use 50um."
  },
  {
    id: 3,
    question: "What is the minimum modal bandwidth of OM3 fibre at 850nm?",
    options: ["200 MHz.km", "500 MHz.km", "2000 MHz.km", "4700 MHz.km"],
    correctAnswer: 2,
    explanation: "OM3 has a minimum effective modal bandwidth of 2000 MHz.km at 850nm."
  },
  {
    id: 4,
    question: "Which cable jacket colour indicates OM3/OM4 aqua multimode fibre?",
    options: ["Orange", "Aqua (turquoise)", "Yellow", "Grey"],
    correctAnswer: 1,
    explanation: "Aqua is the standard jacket colour for OM3 and OM4 laser-optimised multimode fibre."
  },
  {
    id: 5,
    question: "OS2 fibre is specifically designed for:",
    options: ["Short indoor runs", "High-power laser transmission", "Long-haul and outdoor applications", "Audio signal transmission"],
    correctAnswer: 2,
    explanation: "OS2 has lower attenuation and is designed for all applications including long-haul and outdoor use."
  },
  {
    id: 6,
    question: "What does the water peak refer to in singlemode fibre?",
    options: ["Maximum water depth for installation", "Attenuation spike at 1383nm from hydroxyl ions", "Cooling water requirements", "Moisture in the cable jacket"],
    correctAnswer: 1,
    explanation: "The water peak is increased attenuation at ~1383nm caused by hydroxyl (OH) ions absorbed during manufacturing."
  },
  {
    id: 7,
    question: "The maximum attenuation specification for OS1 fibre at 1310nm is:",
    options: ["0.35 dB/km", "0.40 dB/km", "1.0 dB/km", "3.5 dB/km"],
    correctAnswer: 2,
    explanation: "OS1 has maximum attenuation of 1.0 dB/km, while OS2 has the tighter specification of 0.4 dB/km."
  },
  {
    id: 8,
    question: "OM5 fibre is specifically optimised for:",
    options: ["Legacy LED sources", "Single wavelength 850nm transmission", "Shortwave wavelength division multiplexing (SWDM)", "Long-haul telecommunications"],
    correctAnswer: 2,
    explanation: "OM5 is optimised for SWDM, supporting multiple wavelengths from 850-953nm on a single fibre."
  },
  {
    id: 9,
    question: "What data rate can OM4 fibre support over 150 metres?",
    options: ["1 Gbps", "10 Gbps", "40/100 Gbps", "400 Gbps"],
    correctAnswer: 2,
    explanation: "OM4 can support 40G and 100G Ethernet over 150 metres using parallel optics."
  },
  {
    id: 10,
    question: "Which standard defines the OM and OS fibre classifications?",
    options: ["BS 7671", "ISO/IEC 11801", "TIA-568", "IEEE 802.3"],
    correctAnswer: 1,
    explanation: "ISO/IEC 11801 (and the related EN 50173) defines the OM and OS classification system."
  }
];

const faqs = [
  {
    question: "Can I mix different OM grades in the same link?",
    answer: "While physically possible, mixing OM grades is strongly discouraged. The lowest grade determines the link performance. For example, connecting OM4 to OM2 will limit the entire link to OM2 bandwidth specifications. Always use consistent grades throughout a link for predictable performance."
  },
  {
    question: "Why is OM1 being phased out of new installations?",
    answer: "OM1 (62.5um core) cannot reliably support 10 Gigabit Ethernet over meaningful distances. Its larger core causes excessive modal dispersion with modern VCSEL laser sources. New standards focus on OM3-OM5 grades which support 10G, 40G, and 100G applications."
  },
  {
    question: "How do I identify fibre grade from cable markings?",
    answer: "Look for the OM or OS designation printed on the cable jacket. Jacket colour provides guidance: orange typically indicates OM1/OM2, aqua indicates OM3/OM4/OM5, and yellow indicates singlemode. However, always verify with cable markings as colour alone is not definitive."
  },
  {
    question: "Is OS2 always better than OS1?",
    answer: "For new installations, yes. OS2 has lower attenuation, supports all wavelengths including CWDM, and is designed for both indoor and outdoor use. The cost difference is negligible, so OS2 is the standard choice for modern singlemode installations."
  },
  {
    question: "What is the practical difference between OM4 and OM5?",
    answer: "OM4 and OM5 perform identically at single 850nm wavelength. OM5's advantage is its extended wavelength support (850-953nm) for SWDM applications, enabling 100G and 400G transmission over 4 wavelengths on a single fibre pair. If not using SWDM, OM4 is equally suitable."
  },
  {
    question: "How far can I run 10 Gigabit Ethernet on each OM grade?",
    answer: "Maximum distances for 10GBASE-SR: OM1 = 33m, OM2 = 82m, OM3 = 300m, OM4 = 400m, OM5 = 400m. These are based on IEEE 802.3 standards using 850nm VCSEL sources. Actual distances may vary based on link quality."
  }
];

const FiberOpticsModule2Section2 = () => {
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
            <Link to="..">
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
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            OM and OS Standards Explained
          </h1>
          <p className="text-white/80">
            Understanding fibre optic classifications for specification and installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>OM:</strong> Optical Multimode (OM1-OM5)</li>
              <li><strong>OS:</strong> Optical Singlemode (OS1-OS2)</li>
              <li><strong>Higher number:</strong> Better performance</li>
              <li><strong>Modern:</strong> OM3+ and OS2 for new installs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Orange:</strong> OM1/OM2 (legacy)</li>
              <li><strong>Aqua:</strong> OM3/OM4 (current)</li>
              <li><strong>Lime:</strong> OM5 (wideband)</li>
              <li><strong>Yellow:</strong> OS1/OS2 (singlemode)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "OM1-OM5 multimode fibre specifications",
              "OS1/OS2 singlemode classifications",
              "Bandwidth and attenuation parameters",
              "Jacket colour coding standards",
              "Grade selection for applications",
              "Distance limitations by grade"
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
            Understanding Fibre Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The OM (Optical Multimode) and OS (Optical Singlemode) classification system standardises
              fibre optic cable specifications for consistent procurement and installation. Defined in
              ISO/IEC 11801 and EN 50173, these standards ensure interoperability between equipment
              from different manufacturers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Classification Purpose</p>
              <p className="text-sm text-white">
                OM grades define the <strong>modal bandwidth</strong> of multimode fibre - how much data
                can travel through the cable. OS grades define the <strong>attenuation</strong> of
                singlemode fibre - how much signal is lost over distance. Both enable engineers to
                calculate maximum transmission distances.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Multimode (OM) Grades</p>
                <ul className="text-sm text-white space-y-1">
                  <li>OM1 - Legacy 62.5um core</li>
                  <li>OM2 - Standard 50um LED-optimised</li>
                  <li>OM3 - Laser-optimised 50um</li>
                  <li>OM4 - Enhanced laser-optimised</li>
                  <li>OM5 - Wideband multimode (WBMMF)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Singlemode (OS) Grades</p>
                <ul className="text-sm text-white space-y-1">
                  <li>OS1 - Tight-buffered indoor</li>
                  <li>OS2 - Low water peak (LWP)</li>
                  <li>Both have 9um core</li>
                  <li>OS2 preferred for new installs</li>
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
            OM1 and OM2 Specifications (Legacy)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OM1 and OM2 represent the legacy multimode fibre grades, originally designed for LED light
              sources. While still encountered in existing installations, these grades are no longer
              recommended for new deployments due to limited bandwidth for modern applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">OM1 Specifications (62.5/125um):</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">Core</div>
                  <div className="text-elec-yellow font-bold">62.5um</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">BW @850nm</div>
                  <div className="text-elec-yellow font-bold">200 MHz.km</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">10G Distance</div>
                  <div className="text-elec-yellow font-bold">33m max</div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">OM2 Specifications (50/125um):</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">Core</div>
                  <div className="text-elec-yellow font-bold">50um</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">BW @850nm</div>
                  <div className="text-elec-yellow font-bold">500 MHz.km</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">10G Distance</div>
                  <div className="text-elec-yellow font-bold">82m max</div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Important: Core Size Difference</p>
              <p className="text-sm text-white">
                OM1 has a 62.5um core while OM2-OM5 all have 50um cores. Connecting 62.5um to 50um fibre
                causes significant insertion loss (~3dB) due to core size mismatch. Always verify core
                size when working with legacy installations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            OM3 and OM4 - Laser-Optimised Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OM3 and OM4 represent the mainstream choice for current multimode installations. These
              fibres are specifically laser-optimised (LOMMF) to work with 850nm VCSEL sources used
              in modern high-speed transceivers.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OM3 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Core:</strong> 50um</li>
                  <li><strong>EMB @850nm:</strong> 2000 MHz.km</li>
                  <li><strong>10GBASE-SR:</strong> 300m</li>
                  <li><strong>40G/100G:</strong> 100m</li>
                  <li><strong>Jacket:</strong> Aqua</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OM4 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Core:</strong> 50um</li>
                  <li><strong>EMB @850nm:</strong> 4700 MHz.km</li>
                  <li><strong>10GBASE-SR:</strong> 400m</li>
                  <li><strong>40G/100G:</strong> 150m</li>
                  <li><strong>Jacket:</strong> Aqua</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Effective Modal Bandwidth (EMB)</p>
              <p className="text-sm text-white">
                OM3 and OM4 use Effective Modal Bandwidth (EMB) rather than older overfilled launch (OFL)
                measurements. EMB more accurately represents performance with laser sources by measuring
                bandwidth under conditions that simulate actual VCSEL launch characteristics.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Selection Guidance</p>
              <p className="text-sm text-white">
                For most new multimode installations, OM4 is recommended over OM3. The cost premium is
                typically 15-25% but provides 33% greater 10GbE distance and 50% greater 40/100GbE distance.
                This future-proofs the installation for bandwidth upgrades.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            OM5 - Wideband Multimode Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OM5, also known as Wideband Multimode Fibre (WBMMF), was introduced in 2016 to support
              shortwave wavelength division multiplexing (SWDM). Unlike previous grades, OM5 maintains
              bandwidth performance across an extended wavelength range from 850nm to 953nm.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">OM5 Key Specifications:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">Core</div>
                  <div className="text-elec-yellow font-bold">50um</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">EMB @850nm</div>
                  <div className="text-elec-yellow font-bold">4700 MHz.km</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">EMB @953nm</div>
                  <div className="text-elec-yellow font-bold">2470 MHz.km</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">Wavelength</div>
                  <div className="text-elec-yellow font-bold">850-953nm</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">Jacket</div>
                  <div className="text-elec-yellow font-bold">Lime Green</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="text-white/70">SWDM</div>
                  <div className="text-elec-yellow font-bold">100G/400G</div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">SWDM Technology</p>
              <p className="text-sm text-white">
                Shortwave Wavelength Division Multiplexing uses four wavelengths (850nm, 880nm, 910nm, 940nm)
                on a single fibre pair to achieve 100Gbps (4x25G) or 400Gbps (4x100G) transmission. This
                enables high bandwidth over existing duplex cabling infrastructure.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Cost-Benefit Consideration</p>
              <p className="text-sm text-white">
                OM5 fibre carries a 50-100% cost premium over OM4. Unless SWDM deployment is planned,
                OM4 provides equivalent single-wavelength performance at lower cost. OM5 adoption remains
                limited primarily to data centres with specific roadmaps for 100G+ SWDM transmission.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            OS1 and OS2 Singlemode Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The OS (Optical Singlemode) grades classify singlemode fibre based on attenuation performance
              and intended application. Unlike multimode grades which focus on bandwidth, singlemode fibre
              has effectively unlimited bandwidth - the limiting factor is signal attenuation over distance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OS1 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Core:</strong> 9um</li>
                  <li><strong>Max atten. @1310nm:</strong> 1.0 dB/km</li>
                  <li><strong>Max atten. @1550nm:</strong> 1.0 dB/km</li>
                  <li><strong>Construction:</strong> Tight-buffered</li>
                  <li><strong>Application:</strong> Indoor premises</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">OS2 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Core:</strong> 9um</li>
                  <li><strong>Max atten. @1310nm:</strong> 0.4 dB/km</li>
                  <li><strong>Max atten. @1550nm:</strong> 0.4 dB/km</li>
                  <li><strong>Water Peak:</strong> Low (LWP)</li>
                  <li><strong>Application:</strong> All applications</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Understanding the Water Peak</p>
              <p className="text-sm text-white">
                The water peak refers to increased attenuation at approximately 1383nm caused by hydroxyl
                (OH) ions absorbed during fibre manufacturing. This affects CWDM systems using wavelengths
                in the 1360-1460nm range. OS2's low water peak (LWP) specification ensures consistent low
                attenuation across all wavelengths from 1310nm to 1625nm.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why OS2 is Now Standard:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Lower attenuation enables longer transmission distances</li>
                <li>LWP supports CWDM and DWDM wavelength expansion</li>
                <li>Cost difference is negligible</li>
                <li>Future-proofs for increasing wavelength use</li>
                <li>Suitable for both indoor and outdoor applications</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Grade Selection and Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct fibre grade requires matching the specification to the application's
              bandwidth requirements, transmission distances, and budget constraints.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Jacket Colour Identification</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Orange:</strong> OM1 / OM2 Multimode</li>
                <li><strong>Aqua:</strong> OM3 / OM4 Multimode</li>
                <li><strong>Lime Green:</strong> OM5 Wideband Multimode</li>
                <li><strong>Yellow:</strong> OS1 / OS2 Singlemode</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Application Selection Matrix</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>1G to 100m:</strong> OM3, OM4, or OS2</li>
                <li><strong>10G to 300m:</strong> OM3 minimum, OM4 recommended</li>
                <li><strong>40G/100G to 150m:</strong> OM4 minimum</li>
                <li><strong>100G SWDM:</strong> OM5 required</li>
                <li><strong>Any distance &gt;500m:</strong> OS2 singlemode</li>
                <li><strong>Outdoor/campus:</strong> OS2 singlemode</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Verification Best Practice</p>
              <p className="text-sm text-white">
                Never rely solely on jacket colour for grade identification. Always verify by reading the
                cable marking printed on the outer jacket. Markings will include manufacturer, cable type,
                fibre count, and the OM or OS grade designation.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always specify fibre grade explicitly (e.g., "OM4 50/125um")</li>
                <li>Include bandwidth requirements and expected data rates</li>
                <li>Document maximum link lengths for each cable route</li>
                <li>Request manufacturer test certificates showing grade compliance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify delivered cable grade matches specification before installation</li>
                <li>Label all cables and patch panels with grade information</li>
                <li>Never mix fibre grades within a single link</li>
                <li>Test installed links against grade-appropriate parameters</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all orange fibre is the same</strong> (OM1 vs OM2 core size differs)</li>
                <li><strong>Connecting 62.5um to 50um fibre</strong> (causes ~3dB loss)</li>
                <li><strong>Using OM1/OM2 for new 10GbE installations</strong> (insufficient distance)</li>
                <li><strong>Specifying OM5 without SWDM deployment plans</strong> (unnecessary cost)</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: OM/OS Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Multimode Grades</p>
                <ul className="space-y-0.5">
                  <li>OM1: 62.5um, 200 MHz.km, 33m @10G</li>
                  <li>OM2: 50um, 500 MHz.km, 82m @10G</li>
                  <li>OM3: 50um, 2000 MHz.km, 300m @10G</li>
                  <li>OM4: 50um, 4700 MHz.km, 400m @10G</li>
                  <li>OM5: 50um, 4700 MHz.km + SWDM</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Singlemode Grades</p>
                <ul className="space-y-0.5">
                  <li>OS1: 9um, 1.0 dB/km, indoor</li>
                  <li>OS2: 9um, 0.4 dB/km, all use</li>
                  <li>Jacket: Yellow (both grades)</li>
                  <li>Standard: OS2 for all new installs</li>
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
              Previous: Singlemode vs Multimode
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next: Connector Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section2;
