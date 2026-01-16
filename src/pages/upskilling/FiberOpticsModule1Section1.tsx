import { ArrowLeft, Cable, CheckCircle, Lightbulb, Zap, Info, BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What is Fibre Optic Cabling - Fibre Optics Course";
const DESCRIPTION = "Learn the fundamentals of fibre optic technology, how light transmission works, and the basic principles behind modern optical communications.";

const quickCheckQuestions = [
  {
    id: "fo-m1s1-qc1",
    question: "What is the primary medium used to transmit signals in fibre optic cables?",
    options: ["Electrical current", "Light pulses", "Radio waves", "Sound waves"],
    correctIndex: 1,
    explanation: "Fibre optic cables transmit data as pulses of light through glass or plastic fibres, enabling high-speed communications."
  },
  {
    id: "fo-m1s1-qc2",
    question: "What is the core of an optical fibre made from?",
    options: ["Copper", "Aluminium", "Ultra-pure glass or plastic", "Steel"],
    correctIndex: 2,
    explanation: "The core is made from ultra-pure glass (silica) or plastic. Light travels through this central part of the fibre."
  },
  {
    id: "fo-m1s1-qc3",
    question: "What phenomenon keeps light trapped inside the fibre core?",
    options: ["Magnetic reflection", "Total internal reflection", "Electrical resistance", "Thermal conduction"],
    correctIndex: 1,
    explanation: "Total internal reflection occurs when light hits the boundary between core and cladding at a steep angle, bouncing back into the core rather than escaping."
  }
];

const quizQuestions = [
  {
    question: "What does 'optical' refer to in optical fibre?",
    options: ["Electricity-based", "Light-based", "Sound-based", "Heat-based"],
    correctAnswer: 1
  },
  {
    question: "Which layer of an optical fibre has a lower refractive index than the core?",
    options: ["Buffer", "Jacket", "Cladding", "Strength members"],
    correctAnswer: 2
  },
  {
    question: "What is the primary advantage of fibre optics over copper for long distances?",
    options: ["Lower cost", "Much lower signal loss (attenuation)", "Easier to install", "Heavier weight"],
    correctAnswer: 1
  },
  {
    question: "The speed of light in a vacuum is approximately:",
    options: ["186,000 miles per hour", "300,000 kilometres per second", "1,000 metres per second", "Speed cannot be measured"],
    correctAnswer: 1
  },
  {
    question: "What type of light is typically used in fibre optic communications?",
    options: ["Visible white light", "Infrared light", "Ultraviolet light", "X-ray light"],
    correctAnswer: 1
  },
  {
    question: "The protective outer layer of a fibre optic cable is called the:",
    options: ["Core", "Cladding", "Buffer", "Jacket"],
    correctAnswer: 3
  },
  {
    question: "What is attenuation in fibre optics?",
    options: ["Signal amplification", "Loss of signal strength over distance", "Increase in bandwidth", "Change in light colour"],
    correctAnswer: 1
  },
  {
    question: "Who is credited with demonstrating light guidance through a water stream in 1842?",
    options: ["Alexander Graham Bell", "Jean-Daniel Colladon", "Thomas Edison", "Nikola Tesla"],
    correctAnswer: 1
  },
  {
    question: "Fibre optic cables are immune to which type of interference?",
    options: ["Physical damage", "Electromagnetic interference (EMI)", "Temperature changes", "Water damage"],
    correctAnswer: 1
  },
  {
    question: "What is the typical diameter of the cladding in standard telecommunications fibre?",
    options: ["9 micrometres", "62.5 micrometres", "125 micrometres", "250 micrometres"],
    correctAnswer: 2
  }
];

const faqs = [
  {
    question: "How fast does light travel through fibre optic cable?",
    answer: "Light travels at approximately 200,000 km/s through glass fibre (about 2/3 the speed of light in a vacuum). This enables data transmission with extremely low latency over long distances."
  },
  {
    question: "Can fibre optic cables carry electricity?",
    answer: "No, fibre optic cables transmit data using light, not electrical signals. This makes them immune to electrical interference but means they cannot power devices directly (though hybrid cables exist with copper conductors)."
  },
  {
    question: "How thin is an optical fibre?",
    answer: "A typical optical fibre core is between 9 and 62.5 micrometres in diameter - thinner than a human hair. With cladding, it's 125 micrometres, and with buffer coating, around 250 micrometres."
  },
  {
    question: "Why is fibre optic cabling becoming more common?",
    answer: "Growing bandwidth demands from streaming, cloud computing, and IoT require faster connections. Fibre offers vastly higher bandwidth than copper, lower latency, and better reliability over distance."
  },
  {
    question: "Is fibre optic installation more difficult than copper?",
    answer: "Fibre requires specialised tools and techniques (fusion splicing, careful handling), but modern connectors and training have made installation more accessible. The benefits often outweigh the learning curve."
  },
  {
    question: "What wavelengths are used in fibre optic communications?",
    answer: "Common wavelengths include 850nm (multimode), 1310nm (singlemode), and 1550nm (long-haul singlemode). These infrared wavelengths experience lower attenuation in glass than visible light."
  }
];

const FiberOpticsModule1Section1 = () => {
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
            to="/electrical-upskilling/fiber-optics-module-1"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 1</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-3xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <Cable className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 1 • Section 1</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">What is Fibre Optic Cabling?</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding the fundamental principles of optical fibre technology and how light is used to transmit data.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Fibre optic cables transmit data as pulses of light through ultra-thin glass or plastic fibres.
              Light bounces along the fibre core through total internal reflection, enabling high-speed,
              long-distance data transmission with minimal signal loss.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Key Points
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Uses light instead of electricity</li>
              <li>• Core + cladding + buffer + jacket structure</li>
              <li>• Total internal reflection keeps light in core</li>
              <li>• Immune to electromagnetic interference</li>
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
              "Explain what fibre optic cabling is and how it works",
              "Describe the basic structure of an optical fibre",
              "Understand total internal reflection principles",
              "Identify the key advantages of fibre over copper",
              "Recognise common fibre optic applications",
              "Understand basic optical terminology"
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

        {/* Section 01: Introduction */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">Introduction to Fibre Optics</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Fibre optic cabling represents one of the most significant advances in telecommunications technology.
              Unlike traditional copper cables that transmit data using electrical signals, fibre optic cables
              use pulses of light to carry information at incredible speeds over vast distances.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5" />
                What is an Optical Fibre?
              </h4>
              <p className="text-sm">
                An optical fibre is a thin, flexible strand of ultra-pure glass or plastic, typically about
                125 micrometres in diameter (roughly the thickness of a human hair). Data is transmitted
                by modulating light signals that travel through the fibre core.
              </p>
            </div>

            <p>
              The technology emerged from early experiments with light guidance. In 1842, Swiss physicist
              Jean-Daniel Colladon demonstrated that light could be guided along a stream of water.
              This principle of light following a curved path was later developed into practical fibre
              optic communications in the 1970s.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Brief History of Fibre Optics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1842</span>
                  <span>Colladon demonstrates light guidance through water</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1880</span>
                  <span>Alexander Graham Bell invents the Photophone</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1966</span>
                  <span>Kao and Hockham propose low-loss optical fibre</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1970</span>
                  <span>Corning produces first practical optical fibre</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">1988</span>
                  <span>First transatlantic fibre optic cable (TAT-8)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-elec-yellow font-bold">Today</span>
                  <span>Global fibre networks carry 99% of international data</span>
                </div>
              </div>
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

        {/* Section 02: Fibre Structure */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Structure of an Optical Fibre</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              An optical fibre has a carefully engineered layered structure, with each layer serving
              a specific purpose in protecting the delicate core and enabling light transmission.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">The Four Main Layers</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-medium text-elec-yellow">1. Core</h5>
                  <p className="text-sm mt-1">
                    The innermost part where light travels. Made from ultra-pure glass (silica) or
                    plastic. Diameter typically 9μm (singlemode) or 50-62.5μm (multimode).
                    Has a higher refractive index than the cladding.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-medium text-blue-400">2. Cladding</h5>
                  <p className="text-sm mt-1">
                    Surrounds the core. Also glass but with lower refractive index. Standard diameter
                    is 125μm. Creates the boundary for total internal reflection, keeping light
                    trapped in the core.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-medium text-green-400">3. Buffer (Coating)</h5>
                  <p className="text-sm mt-1">
                    Protective plastic coating applied directly to cladding. Usually 250μm diameter.
                    Protects against moisture and mechanical stress. May be tight or loose tube
                    depending on cable type.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-400">4. Jacket (Outer Sheath)</h5>
                  <p className="text-sm mt-1">
                    Outermost protective layer. Provides mechanical protection, crush resistance,
                    and environmental protection. May contain strength members (aramid yarn/steel).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Fibre Notation</h4>
              <p className="text-sm">
                Fibres are often described by their core/cladding diameters. For example:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• <strong>9/125</strong> - 9μm core, 125μm cladding (singlemode)</li>
                <li>• <strong>50/125</strong> - 50μm core, 125μm cladding (multimode OM3/OM4)</li>
                <li>• <strong>62.5/125</strong> - 62.5μm core, 125μm cladding (multimode OM1)</li>
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

        {/* Section 03: How Light Travels */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">How Light Travels Through Fibre</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Light travels through optical fibre by a phenomenon called <strong>total internal reflection</strong>.
              This occurs because the core has a higher refractive index than the surrounding cladding.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Total Internal Reflection</h4>
              <p className="text-sm mb-3">
                When light travels from a denser medium (higher refractive index) to a less dense medium
                (lower refractive index) at a steep enough angle, it reflects back rather than passing through.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">1</span>
                  </div>
                  <span>Light enters the fibre core from a transmitter (LED or laser)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">2</span>
                  </div>
                  <span>Light hits the core/cladding boundary at an angle</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">3</span>
                  </div>
                  <span>If angle exceeds critical angle, light reflects back into core</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">4</span>
                  </div>
                  <span>Light bounces along the fibre to reach the receiver</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Refractive Index</h4>
                <p className="text-sm">
                  A measure of how much light slows down in a material. Glass has a refractive
                  index of about 1.5 - light travels 1.5× slower than in a vacuum. The core
                  has a slightly higher index (≈1.48) than cladding (≈1.46).
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Critical Angle</h4>
                <p className="text-sm">
                  The minimum angle of incidence for total internal reflection to occur.
                  Light hitting at shallower angles will escape through the cladding.
                  Fibre design ensures practical launch angles exceed this threshold.
                </p>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Bend Loss
              </h4>
              <p className="text-sm">
                If fibre is bent too sharply, light can exceed the critical angle and escape.
                This is why all fibre has minimum bend radius specifications. Macrobends are
                visible bends; microbends are microscopic deformations from crushing or tension.
              </p>
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

        {/* Section 04: Key Advantages */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Key Advantages of Fibre Optics</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Fibre optic cabling offers numerous advantages over traditional copper cabling,
              making it the preferred choice for high-performance networks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Higher Bandwidth</h4>
                <p className="text-sm">
                  Fibre can carry signals at frequencies in the terahertz range, supporting
                  data rates of 100Gbps+ on a single fibre. Copper maxes out around 10Gbps
                  for short distances.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Longer Distances</h4>
                <p className="text-sm">
                  Singlemode fibre can transmit signals up to 100km+ without amplification.
                  Copper Ethernet is limited to 100 metres. This makes fibre ideal for
                  backbones and long-haul links.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">EMI Immunity</h4>
                <p className="text-sm">
                  Glass doesn't conduct electricity, so fibre is immune to electromagnetic
                  interference, radio frequency interference, and crosstalk. Ideal near
                  electrical equipment or in industrial environments.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Security</h4>
                <p className="text-sm">
                  Fibre doesn't radiate signals and is very difficult to tap without
                  detection. Any physical breach causes measurable signal loss.
                  Preferred for sensitive communications.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Lighter Weight</h4>
                <p className="text-sm">
                  Fibre cables are much lighter than equivalent copper cables.
                  A 24-fibre cable weighs less than a 24-pair Cat6 cable, reducing
                  infrastructure loading and installation effort.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Future-Proof</h4>
                <p className="text-sm">
                  Installed fibre can often support faster speeds with equipment
                  upgrades alone. The physical medium has capacity far beyond
                  current utilisation.
                </p>
              </div>
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
              <h4 className="font-semibold text-white mb-3">Common Applications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Telecommunications</h5>
                  <ul className="space-y-1">
                    <li>• Internet backbone networks</li>
                    <li>• Submarine cables</li>
                    <li>• FTTP (Fibre to the Premises)</li>
                    <li>• Mobile backhaul (5G)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Enterprise</h5>
                  <ul className="space-y-1">
                    <li>• Data centre interconnects</li>
                    <li>• Building backbone cabling</li>
                    <li>• Campus networks</li>
                    <li>• SAN (Storage Area Networks)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Industrial</h5>
                  <ul className="space-y-1">
                    <li>• SCADA systems</li>
                    <li>• Process control networks</li>
                    <li>• High-EMI environments</li>
                    <li>• Hazardous areas (no sparks)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Specialist</h5>
                  <ul className="space-y-1">
                    <li>• Medical imaging</li>
                    <li>• Broadcast/AV</li>
                    <li>• Military/defence</li>
                    <li>• Scientific instruments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Key Considerations</h4>
              <ul className="text-sm space-y-1">
                <li>• Fibre requires specialised tools and training for termination</li>
                <li>• Glass fibre is fragile - careful handling is essential</li>
                <li>• Cannot be repaired like copper - damaged sections must be re-spliced</li>
                <li>• Higher initial cost but lower total cost of ownership long-term</li>
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
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Fibre Basics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Fibre Structure</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Core: Light transmission path</li>
                  <li>• Cladding: Reflects light into core</li>
                  <li>• Buffer: Mechanical protection</li>
                  <li>• Jacket: Outer protection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Key Numbers</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Singlemode core: 9μm</li>
                  <li>• Multimode core: 50 or 62.5μm</li>
                  <li>• Standard cladding: 125μm</li>
                  <li>• Speed of light in fibre: ≈200,000 km/s</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 1 Quiz: What is Fibre Optic Cabling?"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/fiber-optics-module-1">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation active:scale-[0.98] min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Module Overview
            </Button>
          </Link>
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-2">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] min-h-[44px]">
              Next: Advantages vs Copper
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule1Section1;
