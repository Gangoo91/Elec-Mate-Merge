import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m3s4-check1",
    question: "What is the minimum burial depth for cables under a driveway?",
    options: ["300mm", "450mm", "600mm", "750mm"],
    correctIndex: 2,
    explanation: "Cables under driveways and roads must be buried at minimum 600mm depth to provide adequate protection from vehicle loads. Under lawns, 450mm is acceptable."
  },
  {
    id: "evcharging-m3s4-check2",
    question: "What is the maximum fill factor for cables in conduit?",
    options: ["20%", "40%", "60%", "80%"],
    correctIndex: 1,
    explanation: "Maximum 40% fill factor ensures cables can be pulled through without damage and allows for heat dissipation. Higher fill factors make installation difficult and cause thermal issues."
  },
  {
    id: "evcharging-m3s4-check3",
    question: "What is the minimum bend radius for SWA cable?",
    options: ["3 × cable diameter", "6 × cable diameter", "8 × cable diameter", "12 × cable diameter"],
    correctIndex: 1,
    explanation: "SWA cable requires a minimum 6 × diameter bend radius during installation (8 × when fixed) to prevent damage to the steel wire armour and internal conductors."
  }
];

const faqs = [
  {
    question: "When should I use SWA cable vs. cable in conduit?",
    answer: "Use SWA for direct burial or where mechanical protection is needed without additional containment. Use conduit for surface runs requiring protection, where future cable changes may be needed, or when fire-rated containment is required."
  },
  {
    question: "What IP rating is required for outdoor EV charging installations?",
    answer: "Minimum IP65 is recommended for external installations, providing protection against water jets. IP44 is the absolute minimum for rain protection. Underground or flooded areas may need IP68."
  },
  {
    question: "How do I ensure EMC compliance with cable routing?",
    answer: "Maintain minimum 300mm separation from data cables unless using shielded cables. Cross power and data cables at 90° only. Use SWA with armour earthed at both ends. Avoid parallel runs with communications cables over 10m."
  },
  {
    question: "What support spacing is required for SWA cable?",
    answer: "SWA cable requires support every 600mm vertically and 750mm horizontally. Additional support is needed within 150mm of terminations. Hot environments may require closer spacing."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "You're installing a 7kW charger 25m from the consumer unit via an external wall and underground to a garage. What routing method should you use?",
  options: [
    "PVC singles in conduit throughout",
    "SWA cable clipped to wall, ducted underground, gland entry to garage",
    "Extension lead from house socket",
    "XLPE cable buried directly in soil"
  ],
  correctAnswer: 1,
  explanation: "SWA provides mechanical protection for external runs and underground burial. Proper gland entries maintain IP ratings. Ducting underground allows future cable changes. This approach meets BS 7671 for protection, burial depth, and weatherproofing."
  }
];

const EVChargingModule3Section4 = () => {
  useSEO({
    title: "Cable Routing and Containment | EV Charging Module 3.4",
    description: "Learn professional cable routing and containment methods for EV charging installations including BS 7671 requirements and installation techniques."
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Routing and Containment
          </h1>
          <p className="text-white/80">
            Professional installation methods for EV charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Underground:</strong> 600mm under driveways, 450mm lawns</li>
              <li><strong>Conduit fill:</strong> Maximum 40% capacity</li>
              <li><strong>SWA bend:</strong> Minimum 6 × cable diameter</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Warning tape 150mm above buried cables</li>
              <li><strong>Use:</strong> Sand bed + tile protection for underground</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select cable routing methods for installations",
              "Specify containment systems for fire and IP ratings",
              "Apply bend radius and support spacing",
              "Implement mechanical protection systems",
              "Ensure BS 7671 wiring system compliance",
              "Design for maintenance and future expansion"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 - Routing Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cable Routing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surface Mounting</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• SWA clipped at 300-400mm centres</li>
                  <li>• Minimum 50mm from other services</li>
                  <li>• Consider thermal expansion</li>
                  <li>• Impact protection below 2m</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Underground Burial</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• 450mm lawn, 600mm driveway</li>
                  <li>• Sand bed and warning tape</li>
                  <li>• Markers at direction changes</li>
                  <li>• Duct for future changes</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conduit Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Heavy gauge for protection</li>
                  <li>• Maximum 40% fill factor</li>
                  <li>• Inspection boxes every 15m</li>
                  <li>• Proper sealing for IP rating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Tray Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Support: 1.5m steel, 1.2m aluminium</li>
                  <li>• Segregate power from data</li>
                  <li>• Covers in public areas</li>
                  <li>• Galvanised for corrosion</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - Containment Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Containment System Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire-Rated Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• 30/60/120 minute ratings</li>
                  <li>• Compartmentation for escape routes</li>
                  <li>• Fire-stopping at penetrations</li>
                  <li>• Material: steel vs plastic</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segregation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• ELV/LV separation</li>
                  <li>• Minimum 100mm or metal barrier</li>
                  <li>• Data cable segregation</li>
                  <li>• EMC considerations</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-elec-yellow">Environment</th>
                    <th className="text-left p-2 text-elec-yellow">Min IP Rating</th>
                    <th className="text-left p-2 text-elec-yellow">Application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="p-2">Internal dry</td>
                    <td className="p-2">IP2X</td>
                    <td className="p-2">Office/commercial</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Internal wet</td>
                    <td className="p-2">IP54</td>
                    <td className="p-2">Washdown areas</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">External</td>
                    <td className="p-2">IP65</td>
                    <td className="p-2">Outdoor installations</td>
                  </tr>
                  <tr>
                    <td className="p-2">Underground</td>
                    <td className="p-2">IP68</td>
                    <td className="p-2">Buried/flooded</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - Installation Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bend Radius Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>PVC Singles:</strong> 3× install, 4× fixed</li>
                  <li><strong>SWA Cable:</strong> 6× install, 8× fixed</li>
                  <li><strong>Flexible:</strong> 4× install, 6× fixed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Support Spacing</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>PVC:</strong> 300mm V, 400mm H</li>
                  <li><strong>SWA:</strong> 600mm V, 750mm H</li>
                  <li>Additional 150mm from terminations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Pulling Techniques</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• Maximum pulling tension: 50N per mm² conductor</li>
                <li>• Use pulling eyes for larger cables</li>
                <li>• Lubrication for long conduit runs</li>
                <li>• Temperature considerations during installation</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">AG1</p>
                <p className="text-white text-xs">No vehicle access</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">AG2</p>
                <p className="text-white text-xs">Light vehicle</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">AG3</p>
                <p className="text-white text-xs">Heavy vehicle</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Practical Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Installation Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Domestic Garage</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 25m run from CU to charge point</li>
                  <li>• Internal: PVC conduit in wall void</li>
                  <li>• External: SWA clipped to masonry</li>
                  <li>• Ground level: 50mm impact protection</li>
                  <li className="text-elec-yellow">Gland entry: IP65 sealed</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Commercial Car Park</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 10 charging bays + expansion</li>
                  <li>• Underground ducted system</li>
                  <li>• 150mm HDPE with draw pits</li>
                  <li>• 25% spare duct capacity</li>
                  <li className="text-elec-yellow">Draw pits every 50m</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded bg-transparent border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Support Calculation Example</p>
              <p className="text-sm text-white">
                6mm² SWA cable, 25m horizontal run: 750mm spacing = 34 clips required.
                Add support within 150mm of each termination = 2 additional clips.
                Total: 36 cable clips for proper installation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 - BS 7671 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            BS 7671 Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chapter 52 Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• 521.5: External influences assessment</li>
                  <li>• 522.6: Installation methods</li>
                  <li>• 522.8: Proximity to services</li>
                  <li>• 526: Electrical connections</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Appendix 5 Conditions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>AD:</strong> Water presence (AD1-AD8)</li>
                  <li><strong>AF:</strong> Corrosion (AF1-AF4)</li>
                  <li><strong>AG:</strong> Mechanical stress (AG1-AG3)</li>
                  <li><strong>AH:</strong> Vibration (AH1-AH3)</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Routes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess external influences (AD, AF, AG, AH conditions)</li>
                <li>Plan support spacing from the outset</li>
                <li>Allow spare capacity for future expansion (25%)</li>
                <li>Document cable routes on as-built drawings</li>
                <li>Consider maintenance access for joints and terminations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insufficient bend radius:</strong> — Damages cable insulation and armour</li>
                <li><strong>Missing warning tape:</strong> — Underground cables damaged during excavation</li>
                <li><strong>Wrong IP rating:</strong> — Water ingress causes failures</li>
                <li><strong>Poor segregation:</strong> — EMC interference with data cables</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Burial Depths</p>
              <ul className="space-y-0.5">
                <li>Lawn: 450mm minimum</li>
                <li>Driveway: 600mm minimum</li>
                <li>Warning tape: 150mm above</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Bend Radius (Installation)</p>
              <ul className="space-y-0.5">
                <li>PVC: 3 × diameter</li>
                <li>SWA: 6 × diameter</li>
                <li>Flexible: 4 × diameter</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule3Section4;