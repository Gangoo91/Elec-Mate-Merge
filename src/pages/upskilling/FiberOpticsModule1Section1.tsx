import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What does 'optical' refer to in optical fibre?",
    options: ["Electricity-based", "Light-based", "Sound-based", "Heat-based"],
    correctAnswer: 1,
    explanation: "Optical refers to light-based transmission. Fibre optic cables use light pulses to transmit data."
  },
  {
    id: 2,
    question: "Which layer of an optical fibre has a lower refractive index than the core?",
    options: ["Buffer", "Jacket", "Cladding", "Strength members"],
    correctAnswer: 2,
    explanation: "The cladding has a lower refractive index than the core, which enables total internal reflection."
  },
  {
    id: 3,
    question: "What is the primary advantage of fibre optics over copper for long distances?",
    options: ["Lower cost", "Much lower signal loss (attenuation)", "Easier to install", "Heavier weight"],
    correctAnswer: 1,
    explanation: "Fibre optics has much lower signal loss over distance compared to copper, making it ideal for long-haul communications."
  },
  {
    id: 4,
    question: "The speed of light in a vacuum is approximately:",
    options: ["186,000 miles per hour", "300,000 kilometres per second", "1,000 metres per second", "Speed cannot be measured"],
    correctAnswer: 1,
    explanation: "Light travels at approximately 300,000 km/s in a vacuum. In fibre, it's about 2/3 of this speed."
  },
  {
    id: 5,
    question: "What type of light is typically used in fibre optic communications?",
    options: ["Visible white light", "Infrared light", "Ultraviolet light", "X-ray light"],
    correctAnswer: 1,
    explanation: "Infrared light at wavelengths like 850nm, 1310nm, and 1550nm is used because it experiences lower attenuation in glass."
  },
  {
    id: 6,
    question: "The protective outer layer of a fibre optic cable is called the:",
    options: ["Core", "Cladding", "Buffer", "Jacket"],
    correctAnswer: 3,
    explanation: "The jacket is the outermost protective layer that shields the fibre from environmental damage."
  },
  {
    id: 7,
    question: "What is attenuation in fibre optics?",
    options: ["Signal amplification", "Loss of signal strength over distance", "Increase in bandwidth", "Change in light colour"],
    correctAnswer: 1,
    explanation: "Attenuation is the loss of signal strength as light travels through the fibre, measured in dB/km."
  },
  {
    id: 8,
    question: "Who is credited with demonstrating light guidance through a water stream in 1842?",
    options: ["Alexander Graham Bell", "Jean-Daniel Colladon", "Thomas Edison", "Nikola Tesla"],
    correctAnswer: 1,
    explanation: "Swiss physicist Jean-Daniel Colladon demonstrated that light could be guided along a curved stream of water."
  },
  {
    id: 9,
    question: "Fibre optic cables are immune to which type of interference?",
    options: ["Physical damage", "Electromagnetic interference (EMI)", "Temperature changes", "Water damage"],
    correctAnswer: 1,
    explanation: "Since fibre uses light rather than electricity, it is completely immune to electromagnetic interference."
  },
  {
    id: 10,
    question: "What is the typical diameter of the cladding in standard telecommunications fibre?",
    options: ["9 micrometres", "62.5 micrometres", "125 micrometres", "250 micrometres"],
    correctAnswer: 2,
    explanation: "Standard telecommunications fibre has a cladding diameter of 125 micrometres regardless of core size."
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
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What is Fibre Optic Cabling?
          </h1>
          <p className="text-white/80">
            Understanding the fundamental principles of optical fibre technology
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Medium:</strong> Light pulses through glass/plastic</li>
              <li><strong>Speed:</strong> ~200,000 km/s in fibre</li>
              <li><strong>Structure:</strong> Core + cladding + buffer + jacket</li>
              <li><strong>Principle:</strong> Total internal reflection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Yellow/orange cables, LC/SC connectors</li>
              <li><strong>Use:</strong> High-speed data, long distances, EMI zones</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what fibre optic cabling is and how it works",
              "Describe the basic structure of an optical fibre",
              "Understand total internal reflection principles",
              "Identify the key advantages of fibre over copper",
              "Recognise common fibre optic applications",
              "Understand basic optical terminology"
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
            Introduction to Fibre Optics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic cabling represents one of the most significant advances in telecommunications technology.
              Unlike traditional copper cables that transmit data using electrical signals, fibre optic cables
              use pulses of light to carry information at incredible speeds over vast distances.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">What is an Optical Fibre?</p>
              <p className="text-sm text-white">
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

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Brief History of Fibre Optics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1842:</strong> Colladon demonstrates light guidance through water</li>
                <li><strong>1880:</strong> Alexander Graham Bell invents the Photophone</li>
                <li><strong>1966:</strong> Kao and Hockham propose low-loss optical fibre</li>
                <li><strong>1970:</strong> Corning produces first practical optical fibre</li>
                <li><strong>1988:</strong> First transatlantic fibre optic cable (TAT-8)</li>
                <li><strong>Today:</strong> Global fibre networks carry 99% of international data</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Structure of an Optical Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An optical fibre has a carefully engineered layered structure, with each layer serving
              a specific purpose in protecting the delicate core and enabling light transmission.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Four Main Layers:</p>
              <ul className="text-sm text-white space-y-3 ml-4">
                <li>
                  <strong className="text-elec-yellow">1. Core:</strong> The innermost part where light travels. Made from ultra-pure glass (silica) or
                  plastic. Diameter typically 9um (singlemode) or 50-62.5um (multimode).
                </li>
                <li>
                  <strong className="text-elec-yellow">2. Cladding:</strong> Surrounds the core. Also glass but with lower refractive index. Standard diameter
                  is 125um. Creates the boundary for total internal reflection.
                </li>
                <li>
                  <strong className="text-elec-yellow">3. Buffer (Coating):</strong> Protective plastic coating applied directly to cladding. Usually 250um diameter.
                  Protects against moisture and mechanical stress.
                </li>
                <li>
                  <strong className="text-elec-yellow">4. Jacket (Outer Sheath):</strong> Outermost protective layer. Provides mechanical protection, crush resistance,
                  and environmental protection.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Fibre Notation</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>9/125:</strong> 9um core, 125um cladding (singlemode)</li>
                <li><strong>50/125:</strong> 50um core, 125um cladding (multimode OM3/OM4)</li>
                <li><strong>62.5/125:</strong> 62.5um core, 125um cladding (multimode OM1)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How Light Travels Through Fibre
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light travels through optical fibre by a phenomenon called <strong>total internal reflection</strong>.
              This occurs because the core has a higher refractive index than the surrounding cladding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Total Internal Reflection Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Light enters the fibre core from a transmitter (LED or laser)</li>
                <li>2. Light hits the core/cladding boundary at an angle</li>
                <li>3. If angle exceeds critical angle, light reflects back into core</li>
                <li>4. Light bounces along the fibre to reach the receiver</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Refractive Index</p>
                <p className="text-sm text-white">
                  A measure of how much light slows down in a material. The core has a slightly
                  higher index (~1.48) than cladding (~1.46).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Critical Angle</p>
                <p className="text-sm text-white">
                  The minimum angle of incidence for total internal reflection to occur.
                  Light at shallower angles will escape through the cladding.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Bend Loss Warning</p>
              <p className="text-sm text-white">
                If fibre is bent too sharply, light can exceed the critical angle and escape.
                This is why all fibre has minimum bend radius specifications. Macrobends are
                visible bends; microbends are microscopic deformations from crushing or tension.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Key Advantages of Fibre Optics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic cabling offers numerous advantages over traditional copper cabling,
              making it the preferred choice for high-performance networks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main Advantages:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Higher Bandwidth:</strong> Supports data rates of 100Gbps+ on a single fibre. Copper maxes out around 10Gbps for short distances.</li>
                <li><strong>Longer Distances:</strong> Singlemode fibre can transmit signals up to 100km+ without amplification. Copper Ethernet is limited to 100 metres.</li>
                <li><strong>EMI Immunity:</strong> Glass doesn't conduct electricity, so fibre is immune to electromagnetic interference and crosstalk.</li>
                <li><strong>Security:</strong> Fibre doesn't radiate signals and is very difficult to tap without detection.</li>
                <li><strong>Lighter Weight:</strong> Fibre cables are much lighter than equivalent copper cables.</li>
                <li><strong>Future-Proof:</strong> Installed fibre can often support faster speeds with equipment upgrades alone.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Applications</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Telecommunications:</strong> Internet backbone, submarine cables, FTTP, mobile backhaul</li>
                <li><strong>Enterprise:</strong> Data centre interconnects, building backbones, campus networks</li>
                <li><strong>Industrial:</strong> SCADA systems, process control, high-EMI environments</li>
                <li><strong>Specialist:</strong> Medical imaging, broadcast/AV, military/defence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fibre requires specialised tools and training for termination</li>
                <li>Glass fibre is fragile - careful handling is essential</li>
                <li>Cannot be repaired like copper - damaged sections must be re-spliced</li>
                <li>Higher initial cost but lower total cost of ownership long-term</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Exceeding bend radius</strong> - causes signal loss and potential fibre damage</li>
                <li><strong>Contaminated connectors</strong> - always clean before connecting</li>
                <li><strong>Wrong fibre type</strong> - singlemode and multimode are not interchangeable</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Fibre Basics</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Fibre Structure</p>
                <ul className="space-y-0.5">
                  <li>Core: Light transmission path</li>
                  <li>Cladding: Reflects light into core</li>
                  <li>Buffer: Mechanical protection</li>
                  <li>Jacket: Outer protection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Key Numbers</p>
                <ul className="space-y-0.5">
                  <li>Singlemode core: 9um</li>
                  <li>Multimode core: 50 or 62.5um</li>
                  <li>Standard cladding: 125um</li>
                  <li>Speed in fibre: ~200,000 km/s</li>
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
            <Link to="/electrician/upskilling/fiber-optics-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next: Advantages vs Copper
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule1Section1;
