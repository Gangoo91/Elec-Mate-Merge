import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m1s4-check1",
    question: "What is the maximum RCD rating permitted for EV charging under BS 7671 Section 722?",
    options: ["100mA", "300mA", "30mA", "10mA"],
    correctIndex: 2,
    explanation: "BS 7671 Section 722 requires RCD protection with a maximum rating of 30mA for EV charging installations to provide adequate protection against electric shock."
  },
  {
    id: "evcharging-m1s4-check2",
    question: "Which RCD type is preferred for EV charging installations?",
    options: ["Type AC", "Type A", "Type B", "Type F"],
    correctIndex: 2,
    explanation: "Type B RCDs are preferred for EV charging as they can detect all fault current types including smooth DC, which may occur with certain EV charger configurations. Type A is the minimum requirement."
  },
  {
    id: "evcharging-m1s4-check3",
    question: "For which installations does G98 apply?",
    options: ["All commercial installations", "Connections >16A per phase", "Connections ≤16A per phase", "Only DC rapid chargers"],
    correctIndex: 2,
    explanation: "G98 applies to smaller connections of 16A or less per phase, covering most domestic single-phase installations and small commercial charging points up to approximately 11kW (3-phase)."
  }
];

const faqs = [
  {
    question: "When do I need to use G99 instead of G98?",
    answer: "G99 applies when the connection exceeds 16A per phase. This includes larger commercial installations and rapid chargers. G99 requires a formal application process, network impact assessment, and connection agreement with the DNO."
  },
  {
    question: "Can I use a Type A RCD instead of Type B?",
    answer: "Type A RCD is the minimum requirement under BS 7671 Section 722. However, Type B is preferred as it provides protection against smooth DC fault currents. Some EV chargers have built-in DC fault detection, allowing Type A upstream, but always check manufacturer requirements."
  },
  {
    question: "What additional measures are needed for PME supplies?",
    answer: "PME (TN-C-S) supplies require risk assessment and may need additional protective measures such as insulation monitoring devices, enhanced equipotential bonding, alternative earthing arrangements, or PEN conductor integrity monitoring."
  },
  {
    question: "How does the IET Code of Practice differ from BS 7671?",
    answer: "BS 7671 sets mandatory requirements for electrical safety. The IET Code of Practice provides supplementary guidance specific to EV charging, including practical design recommendations, commissioning procedures, and best practice that goes beyond the minimum regulatory requirements."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "You're installing a 22kW three-phase EV charger at a commercial premises with a PME supply. What earthing consideration is most critical?",
  options: [
    "Use standard TN-C-S earthing without modification",
    "Risk assess the PME arrangement and consider additional protective measures",
    "Install without earthing as the charger is plastic",
    "Connect to water pipes only"
  ],
  correctAnswer: 1,
  explanation: "BS 7671 Section 722.411.4.1 requires risk assessment for PME supplies. Additional measures may include insulation monitoring, enhanced bonding, or alternative earthing. Standard PME earthing may not be appropriate without assessment."
  }
];

const EVChargingModule1Section4 = () => {
  useSEO({
    title: "Key Standards BS 7671, IET CoP, G98/G99 | EV Charging Module 1.4",
    description: "Master the essential standards for EV charging installations including BS 7671 Section 722, IET Code of Practice, and grid connection requirements."
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
            <Link to="/electrician/upskilling/ev-charging-module-1">
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
            <span>Module 1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Standards: BS 7671, IET CoP, G98/G99
          </h1>
          <p className="text-white/80">
            Essential standards and codes of practice for EV charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671 722:</strong> EV-specific wiring requirements</li>
              <li><strong>IET CoP:</strong> Detailed practical guidance</li>
              <li><strong>G98/G99:</strong> Grid connection procedures</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 30mA RCD, Type B preferred, PME assessment</li>
              <li><strong>Use:</strong> G98 for ≤16A, G99 for larger installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 7671 Section 722 requirements",
              "Implement IET Code of Practice recommendations",
              "Navigate G98/G99 grid connection procedures",
              "Understand interrelationships between standards",
              "Select appropriate protection arrangements",
              "Address PME supply considerations"
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
            BS 7671 Section 722
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Section 722 of BS 7671:2018+A2:2022 contains specific requirements for electric
              vehicle charging installations, covering AC and DC charging points for all applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AC and DC charging point installations</li>
                  <li>Fixed and portable charging equipment</li>
                  <li>Domestic, commercial and public</li>
                  <li>Up to 1000V AC / 1500V DC</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exclusions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Vehicle electrical systems</li>
                  <li>Battery replacement facilities</li>
                  <li>Trolley bus and railway systems</li>
                  <li>Industrial trucks and vehicles</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Protection Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>RCD protection:</strong> 30mA maximum, Type A minimum, Type B preferred</li>
                <li><strong>Voltage drop:</strong> Maximum 5% from origin to charging point</li>
                <li><strong>Isolation:</strong> Local switch within 2m of charging point</li>
                <li><strong>Surge protection:</strong> SPD Type 2 recommended</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD and Earthing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct RCD selection and earthing arrangements are critical for EV charging safety.
              The type of fault protection depends on the charger design and supply type.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type A:</strong> Minimum requirement, AC + pulsating DC</li>
                  <li><strong>Type B:</strong> Preferred, detects all fault types</li>
                  <li><strong>Type F:</strong> Enhanced frequency response</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>TN-S:</strong> Preferred for EV installations</li>
                  <li><strong>TN-C-S (PME):</strong> Requires risk assessment</li>
                  <li><strong>TT:</strong> Local earth electrode required</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm text-white">
                <strong className="text-elec-yellow">PME Supplies (722.411.4.1):</strong> Risk
                assessment must consider location, equipment type, extraneous conductive parts,
                and PEN conductor integrity. Additional measures may include insulation monitoring,
                enhanced bonding, or alternative earthing.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IET Code of Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice for Electric Vehicle Charging Equipment Installation
              provides comprehensive guidance beyond BS 7671 minimum requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Guidance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maximum demand calculations</li>
                  <li>Diversity factors for multiple chargers</li>
                  <li>Supply capacity verification</li>
                  <li>Load management recommendations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Guidance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Physical mounting and accessibility</li>
                  <li>Cable management and protection</li>
                  <li>Weather protection and IP ratings</li>
                  <li>Commissioning procedures</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Smart Charging Topics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Static load management:</strong> Fixed power allocation per point</li>
                <li><strong>Dynamic load management:</strong> Real-time adjustment based on demand</li>
                <li><strong>OCPP:</strong> Open Charge Point Protocol for interoperability</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid Connection: G98 and G99
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              G98 and G99 govern how EV charging installations connect to the distribution
              network, ensuring grid stability and safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">G98: ≤16A per phase</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Domestic single-phase installations</li>
                  <li>Small commercial (up to ~11kW 3-phase)</li>
                  <li>Simplified connection procedures</li>
                  <li>Type testing requirements</li>
                  <li>Notify-and-connect process</li>
                </ul>
              </div>
              <div className="p-4 rounded border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">G99: &gt;16A per phase</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Larger commercial installations</li>
                  <li>Rapid charging stations</li>
                  <li>Formal application required</li>
                  <li>Network impact assessment</li>
                  <li>Connection agreement needed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Technical Requirements (both):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Power quality limits (harmonics, flicker)</li>
                <li>Protection settings and coordination</li>
                <li>Loss of mains detection</li>
                <li>EMC compliance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Standards Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Standards Interaction</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/20">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/20 p-3 text-left text-elec-yellow">Aspect</th>
                  <th className="border border-white/20 p-3 text-left text-white">BS 7671</th>
                  <th className="border border-white/20 p-3 text-left text-white">IET CoP</th>
                  <th className="border border-white/20 p-3 text-left text-white">G98/G99</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr>
                  <td className="border border-white/20 p-3 text-elec-yellow/80">Protection</td>
                  <td className="border border-white/20 p-3">RCD requirements</td>
                  <td className="border border-white/20 p-3">Device selection</td>
                  <td className="border border-white/20 p-3">Grid interface</td>
                </tr>
                <tr className="bg-white/5">
                  <td className="border border-white/20 p-3 text-elec-yellow/80">Earthing</td>
                  <td className="border border-white/20 p-3">PME restrictions</td>
                  <td className="border border-white/20 p-3">Risk assessment</td>
                  <td className="border border-white/20 p-3">DNO requirements</td>
                </tr>
                <tr>
                  <td className="border border-white/20 p-3 text-elec-yellow/80">Load</td>
                  <td className="border border-white/20 p-3">Safety requirements</td>
                  <td className="border border-white/20 p-3">Implementation</td>
                  <td className="border border-white/20 p-3">Connection limits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Application Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check latest amendment status for BS 7671</li>
                <li>Use IET CoP for guidance beyond minimum requirements</li>
                <li>Submit G98/G99 notifications early in project planning</li>
                <li>Document PME risk assessments thoroughly</li>
                <li>Verify charger specifications for RCD compatibility</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong RCD type:</strong> — Check charger requirements for DC detection</li>
                <li><strong>Ignoring PME risks:</strong> — Always assess external installations</li>
                <li><strong>Late DNO notification:</strong> — Submit G98/G99 before installation</li>
                <li><strong>Voltage drop exceeded:</strong> — Calculate for full cable run</li>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">BS 7671 Section 722</p>
              <ul className="space-y-0.5">
                <li>30mA RCD maximum</li>
                <li>Type B RCD preferred</li>
                <li>5% voltage drop limit</li>
                <li>Local isolation within 2m</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Grid Connection</p>
              <ul className="space-y-0.5">
                <li>G98: ≤16A per phase</li>
                <li>G99: &gt;16A per phase</li>
                <li>DNO notification required</li>
                <li>Power quality compliance</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-1-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule1Section4;