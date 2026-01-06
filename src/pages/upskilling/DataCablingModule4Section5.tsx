import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m4s5-check1",
    question: "What is the standard height of one rack unit (1U)?",
    options: ["40mm", "44.45mm", "48mm", "50mm"],
    correctIndex: 1,
    explanation: "A standard rack unit (U) is 44.45mm (1.75 inches) in height, as defined by EIA-310 standard."
  },
  {
    id: "datacabling-m4s5-check2",
    question: "What is the recommended minimum aisle width in front of equipment racks?",
    options: ["600mm", "800mm", "1000mm", "1200mm"],
    correctIndex: 2,
    explanation: "Minimum 1000mm (1m) aisle width is recommended for safe access, maintenance, and equipment removal. Hot/cold aisle arrangements may require more."
  },
  {
    id: "datacabling-m4s5-check3",
    question: "How many patch cords can a 1U horizontal cable management panel typically manage?",
    options: ["12", "18", "24", "48"],
    correctIndex: 2,
    explanation: "A 1U cable management panel typically manages 24 patch cords effectively, providing adequate bend radius and organisation. Use 2U panels for 48 cords."
  }
];

const faqs = [
  {
    question: "What's the difference between open frame racks and enclosed cabinets?",
    answer: "Open frames provide maximum ventilation and access at lower cost but offer limited security and dust protection. Enclosed cabinets provide controlled airflow, enhanced security, and professional appearance but cost more and require proper cooling management."
  },
  {
    question: "How should I organise equipment vertically in a rack?",
    answer: "Top: passive equipment (patch panels). Upper-middle: network equipment (switches). Lower-middle: heavy equipment (servers, UPS). Bottom: infrastructure (power distribution, cable management). This optimises weight distribution and cooling."
  },
  {
    question: "What environmental conditions should a comms room maintain?",
    answer: "Temperature: 18-24°C optimal. Humidity: 45-55% RH. Temperature change: max 5°C/hour. Airflow: 0.2-0.5 m/s. Use multiple sensors at rack level and set both warning and critical alert thresholds."
  },
  {
    question: "Why use blanking panels in racks?",
    answer: "Blanking panels prevent hot exhaust air from recirculating to equipment intakes (hot aisle/cold aisle bypass). They maintain cooling efficiency, reduce energy costs, and prevent hot spots that can cause equipment failures."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A data centre requires high-density patching with 144 fibre connections per 1U space, supporting future 400G speeds. What panel technology would you specify?",
  options: [
    "Standard SC duplex patch panels",
    "MPO/MTP cassette-based panels with angled connections",
    "Individual LC connectors mounted directly",
    "ST fibre panels for maximum density"
  ],
  correctAnswer: 1,
  explanation: "MPO/MTP cassette-based panels provide maximum density (144 fibres per 1U), support polarity management, allow easy module replacement, and support 400G speeds. Angled connections maintain proper bend radius."
  }
];

const DataCablingModule4Section5 = () => {
  useSEO({
    title: "Rack and Patch Panel Organisation | Data Cabling Module 4.5",
    description: "Master equipment rack standards, patch panel organisation, and professional cable management for data cabling installations."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rack and Patch Panel Organisation
          </h1>
          <p className="text-white/80">
            Equipment room organisation and professional cable management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Rack unit:</strong> 1U = 44.45mm (EIA-310)</li>
              <li><strong>Layout:</strong> Passive top, heavy bottom</li>
              <li><strong>Aisles:</strong> 1000mm minimum front access</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Blanking panels = cooling efficiency</li>
              <li><strong>Use:</strong> Hot/cold aisle containment for density</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply EIA-310 rack standards and specifications",
              "Plan equipment layout for optimal cooling",
              "Select and install patch panel types",
              "Implement professional cable management",
              "Design for environmental and safety requirements",
              "Support high-density modern data centre needs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            EIA-310 Rack Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIA-310 standard defines physical dimensions and mounting requirements for
              19-inch equipment racks used in telecommunications and data centres.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Dimensions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Width:</strong> 482.6mm (19 inches) external</li>
                  <li><strong>Mounting:</strong> 450mm between rails</li>
                  <li><strong>Unit height:</strong> 44.45mm (1U)</li>
                  <li><strong>Common heights:</strong> 42U, 45U, 47U</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Static load:</strong> Typical 680kg per rack</li>
                  <li><strong>Distribution:</strong> Even weight essential</li>
                  <li><strong>Floor loading:</strong> Consider structure</li>
                  <li><strong>Safety factor:</strong> 2:1 minimum</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Open Frame</p>
                <p className="text-white/90 text-xs">Max ventilation, easy access</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Enclosed</p>
                <p className="text-white/90 text-xs">Security, controlled airflow</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Wall Mount</p>
                <p className="text-white/90 text-xs">Small installations</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Vertical Equipment Layout
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Strategic placement of equipment within racks optimises cooling, access, and
              cable management whilst maintaining proper weight distribution.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Top (U42-U37):</span>
                  <span className="text-elec-yellow text-sm">Passive Equipment</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Patch panels, cross-connects, cable management</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Upper Middle (U36-U25):</span>
                  <span className="text-elec-yellow text-sm">Network Equipment</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Switches, routers, lightweight active equipment</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Lower Middle (U24-U13):</span>
                  <span className="text-elec-yellow text-sm">Heavy Equipment</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Servers, storage systems, UPS units</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Bottom (U12-U1):</span>
                  <span className="text-elec-yellow text-sm">Infrastructure</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Cable management, power distribution, KVM</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Patch Panel Types and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Patch panels provide organised termination points for structured cabling and
              enable flexible cross-connection capabilities.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Copper Panels</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>24 or 48 port configurations</li>
                  <li>Cat5e, Cat6, Cat6a compatible</li>
                  <li>110 or Krone termination</li>
                  <li>Angled and straight options</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Fibre Panels</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>LC, SC, ST connector options</li>
                  <li>12, 24, 48 port densities</li>
                  <li>Splice tray integration</li>
                  <li>Dust shutter protection</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Modular Panels</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Mix copper and fibre</li>
                  <li>Keystone jack compatible</li>
                  <li>Field-customisable</li>
                  <li>Future upgrade capability</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cable Management Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional cable management ensures proper bend radius, prevents cable stress,
              and maintains organised appearance for efficient troubleshooting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Horizontal Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1U panels:</strong> 24 patch cord capacity</li>
                  <li><strong>2U panels:</strong> 48 patch cord capacity</li>
                  <li><strong>D-rings:</strong> Flexible routing options</li>
                  <li><strong>Brush panels:</strong> Clean cable entry/exit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vertical Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Full-height managers:</strong> Side-mounted</li>
                  <li><strong>Finger ducts:</strong> Multiple entry points</li>
                  <li><strong>Cable rings:</strong> Secure attachment</li>
                  <li><strong>Velcro straps:</strong> Adjustable bundling</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Routing Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain 4× cable diameter bend radius minimum</li>
                <li>Separate power and data cables (different managers)</li>
                <li>Cross at 90° if power/data must cross</li>
                <li>Provide service loops for equipment removal</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Environmental and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper environmental control ensures equipment reliability and extends component
              lifespan whilst maintaining optimal performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Conditions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature:</strong> 18-24°C optimal</li>
                  <li><strong>Humidity:</strong> 45-55% RH</li>
                  <li><strong>Temp change:</strong> Max 5°C per hour</li>
                  <li><strong>Airflow:</strong> 0.2-0.5 m/s velocity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Fire:</strong> FM200/VESDA detection</li>
                  <li><strong>Security:</strong> Locked doors, access control</li>
                  <li><strong>Electrical:</strong> RCD protection, bonding</li>
                  <li><strong>Emergency:</strong> EPO, emergency lighting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consistent cable routing throughout</li>
                <li>Proper bend radius at all points</li>
                <li>Clear and comprehensive labelling</li>
                <li>Complete documentation and as-builts</li>
                <li>Use blanking panels in all unused spaces</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor cable management:</strong> — causes cooling problems and difficult maintenance</li>
                <li><strong>Missing blanking panels:</strong> — allows hot air recirculation</li>
                <li><strong>Inadequate documentation:</strong> — makes troubleshooting impossible</li>
                <li><strong>Heavy equipment at top:</strong> — creates stability and cooling issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Rack Standards</p>
              <ul className="space-y-0.5">
                <li>1U = 44.45mm height</li>
                <li>19" = 482.6mm width</li>
                <li>450mm mounting rail spacing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Environment</p>
              <ul className="space-y-0.5">
                <li>18-24°C temperature</li>
                <li>45-55% humidity</li>
                <li>1000mm aisle minimum</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule4Section5;