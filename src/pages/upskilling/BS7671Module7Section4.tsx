import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m7s4-check1",
    question: "What is the purpose of an IT system in medical locations?",
    options: [
      "To reduce electricity costs",
      "To maintain supply continuity during first fault",
      "To increase power capacity",
      "To simplify installation"
    ],
    correctIndex: 1,
    explanation: "IT systems allow continued operation during the first earth fault, which is critical in medical locations where loss of power could endanger patients during procedures."
  },
  {
    id: "bs7671-m7s4-check2",
    question: "What is the maximum earth fault loop impedance in Group 2 medical locations (TN system)?",
    options: ["0.2Ω", "0.4Ω", "1.67Ω", "5Ω"],
    correctIndex: 0,
    explanation: "Group 2 medical locations (operating theatres etc.) require 0.2 second disconnection time, meaning earth fault loop impedance must be very low (typically 0.2Ω for Type B MCB)."
  },
  {
    id: "bs7671-m7s4-check3",
    question: "What additional protection is required for socket outlets in industrial locations with enhanced fire risk?",
    options: [
      "Higher IP rating only",
      "Arc Fault Detection Devices (AFDD)",
      "Time-delayed RCDs",
      "Surge protection only"
    ],
    correctIndex: 1,
    explanation: "AFDDs are increasingly recommended for locations with enhanced fire risk as they detect arc faults that can cause fires but wouldn't trip conventional RCDs or MCBs."
  }
];

const faqs = [
  {
    question: "What defines a Group 1 vs Group 2 medical location?",
    answer: "Group 1 locations are where patients have contact with medical electrical equipment but failure won't endanger life (e.g., examination rooms). Group 2 locations involve procedures where discontinuity could endanger life (e.g., operating theatres, ICU)."
  },
  {
    question: "Why is supplementary equipotential bonding essential in medical locations?",
    answer: "Patients may have reduced body impedance (wet skin, internal connections). Bonding limits touch voltages between simultaneously accessible parts to safe levels, typically requiring resistance below 0.2Ω."
  },
  {
    question: "What special earthing requirements apply to data centres?",
    answer: "Data centres require clean earth systems separate from lightning protection, mesh bonding networks for EMC, and consideration of harmonics from IT equipment. Multiple parallel earth paths may be needed."
  },
  {
    question: "Are industrial socket outlets different from domestic ones?",
    answer: "Yes, industrial sockets (BS EN 60309) have different pin configurations for different voltages/currents, IP ratings for harsh environments, and colour coding for voltage identification."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "In a Group 2 medical location, what type of electrical system is required for critical circuits?",
  options: [
    "TN-S with standard RCD protection",
    "TN-C-S with enhanced bonding",
    "IT system with insulation monitoring",
    "TT system with earth electrode"
  ],
  correctAnswer: 2,
  explanation: "Group 2 medical locations require IT systems for critical circuits. This provides supply continuity during first fault, with insulation monitoring devices (IMD) to alert staff without disconnecting power."
  }
];

const BS7671Module7Section4 = () => {
  useSEO({
    title: "Medical, Commercial & Industrial Locations | BS7671 Module 7.4",
    description: "Learn BS 7671 Part 710 requirements for medical locations and special requirements for commercial and industrial electrical installations."
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
            <Link to="../bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Medical, Commercial, and Industrial Locations
          </h1>
          <p className="text-white/80">
            Critical installation requirements for specialised environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 710:</strong> Medical location requirements</li>
              <li><strong>IT systems:</strong> Required for Group 2 areas</li>
              <li><strong>Industrial:</strong> BS EN 60309 sockets</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hospitals, factories, data centres, workshops</li>
              <li><strong>Use:</strong> IT systems in critical areas, industrial sockets, enhanced bonding</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Medical location classifications (Group 0, 1, 2)",
              "IT system requirements and insulation monitoring",
              "Supplementary equipotential bonding in medical areas",
              "Industrial socket systems (BS EN 60309)",
              "Data centre earthing and EMC considerations",
              "Arc fault detection requirements"
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
            Medical Location Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Medical locations are classified based on the type of patient contact with
              electrical equipment and the criticality of power supply continuity.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Group 0</p>
                <p className="text-white/90 text-xs">No medical equipment</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Group 1</p>
                <p className="text-white/90 text-xs">External contact only</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Group 2</p>
                <p className="text-white/90 text-xs">Life-critical areas</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Group 1 Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Examination rooms</li>
                  <li>Treatment rooms</li>
                  <li>Physiotherapy areas</li>
                  <li>Dialysis rooms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Group 2 Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Operating theatres</li>
                  <li>Intensive care units</li>
                  <li>Cardiac catheter labs</li>
                  <li>Recovery rooms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IT Systems in Medical Locations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Group 2 medical locations require IT (Isolated Terra) systems for final circuits
              supplying medical electrical equipment. This provides essential supply continuity
              during fault conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How IT Systems Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Supply isolated from earth via medical isolation transformer</li>
                <li>First earth fault causes alarm but no disconnection</li>
                <li>Insulation Monitoring Device (IMD) continuously monitors</li>
                <li>Second fault would cause disconnection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IMD Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual alarm:</strong> When insulation drops below 50kΩ</li>
                <li><strong>Audio alarm:</strong> Audible warning at control point</li>
                <li><strong>Test facility:</strong> Regular testing required</li>
                <li><strong>No auto-reset:</strong> Manual acknowledgement needed</li>
              </ul>
            </div>

            <p>
              The isolation transformer must be located close to the medical location it serves,
              typically in a dedicated medical IT room or cupboard adjacent to the theatre suite.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Industrial Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial installations present unique challenges including high power loads,
              harsh environments, three-phase equipment, and increased fire risks.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Socket Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Blue:</strong> 230V single phase</li>
                  <li><strong>Red:</strong> 400V three phase</li>
                  <li><strong>16A/32A/63A/125A:</strong> Current ratings</li>
                  <li><strong>IP44/IP67:</strong> Protection ratings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Motor starting currents</li>
                  <li>Power factor correction</li>
                  <li>Harmonic mitigation</li>
                  <li>Emergency stop systems</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Risk Mitigation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Arc Fault Detection Devices (AFDDs) where appropriate</li>
                <li>Cable selection for fire performance</li>
                <li>Circuit segregation from fire alarm systems</li>
                <li>Emergency lighting separate from main distribution</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Centre and Commercial Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Data centres and modern commercial buildings have specific electrical requirements
              related to power quality, availability, and electromagnetic compatibility.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Centre Earthing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clean earth for IT equipment</li>
                  <li>Mesh bonding network (MBN)</li>
                  <li>Separate lightning protection earth</li>
                  <li>Low impedance paths throughout</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality</p>
                <ul className="text-sm text-white space-y-1">
                  <li>UPS systems (online/offline)</li>
                  <li>Harmonic filtering</li>
                  <li>Surge protection devices</li>
                  <li>Power factor correction</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Redundancy Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tier 1:</strong> Basic capacity, no redundancy</li>
                <li><strong>Tier 2:</strong> Redundant capacity components</li>
                <li><strong>Tier 3:</strong> Concurrent maintainability</li>
                <li><strong>Tier 4:</strong> Fault tolerant (2N+1)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Medical Location Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Classify all areas (Group 0, 1, or 2)</li>
                <li>Install IT systems for Group 2 critical circuits</li>
                <li>Implement supplementary equipotential bonding</li>
                <li>Provide IMD monitoring with alarm panels</li>
                <li>Ensure 0.2 second disconnection where required</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong classification:</strong> — Under-classifying medical areas</li>
                <li><strong>Bonding gaps:</strong> — Missing metalwork from bonding network</li>
                <li><strong>IMD placement:</strong> — Alarms not visible/audible to staff</li>
                <li><strong>Mixed systems:</strong> — IT circuits on TN distribution</li>
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
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5">
                <li>BS 7671 Part 710 (Medical)</li>
                <li>HTM 06-01 (NHS guidance)</li>
                <li>BS EN 60309 (Industrial plugs)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Values</p>
              <ul className="space-y-0.5">
                <li>IMD alarm: 50kΩ threshold</li>
                <li>Bond resistance: &lt;0.2Ω</li>
                <li>Group 2 disconnection: 0.2s</li>
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
            <Link to="../bs7671-module-7-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../bs7671-module-7-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module7Section4;