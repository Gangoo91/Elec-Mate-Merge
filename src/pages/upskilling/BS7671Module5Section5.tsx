import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ip-second-digit",
    question: "What does the second digit in an IP rating refer to?",
    options: [
      "Protection against solid objects",
      "Protection against liquids",
      "Temperature resistance",
      "Mechanical strength"
    ],
    correctIndex: 1,
    explanation: "The second digit in an IP rating specifically refers to protection against liquids, ranging from IPX0 (no protection) to IPX8 (continuous immersion)."
  },
  {
    id: "bathroom-ip",
    question: "What's the minimum IP rating for most bathroom fixtures?",
    options: [
      "IP20",
      "IP33",
      "IP44",
      "IP65"
    ],
    correctIndex: 2,
    explanation: "IP44 is the minimum rating for most bathroom fixtures, providing protection against solid objects >1mm and splashing water from any direction."
  },
  {
    id: "lszh-purpose",
    question: "What is LSZH cable designed to do during a fire?",
    options: [
      "Prevent fire spread completely",
      "Maintain circuit integrity for longer",
      "Emit low smoke and zero halogen gases",
      "Provide better electrical insulation"
    ],
    correctIndex: 2,
    explanation: "LSZH (Low Smoke Zero Halogen) cables are designed to emit minimal smoke and no halogen gases during a fire, reducing toxic fume hazards for occupants."
  }
];

const faqs = [
  {
    question: "What IP rating do I need for outdoor lighting?",
    answer: "Generally IP65 minimum for outdoor lighting - protected against dust ingress and water jets from any direction. More exposed locations may need IP66 or higher."
  },
  {
    question: "Can IP ratings be combined with fire resistance?",
    answer: "Yes, equipment can have both IP ratings for environmental protection and fire resistance ratings for circuit integrity. They address different hazards and both may be required."
  },
  {
    question: "What's the difference between LSZH and fire-resistant cable?",
    answer: "LSZH reduces smoke and toxic gases during fire but doesn't maintain circuit function. Fire-resistant cables maintain circuit integrity for a specified time. Some cables combine both properties."
  },
  {
    question: "How long must fire alarm cables operate during a fire?",
    answer: "Typically 30 minutes minimum for small premises, 60 minutes for most buildings, and up to 120 minutes for high-rise or complex buildings. BS5839 provides specific guidance."
  }
];

const quizQuestion = {
  question: "What could happen if an IP20 enclosure is installed outdoors?",
  options: [
    "Improved ventilation",
    "Better heat dissipation",
    "Water ingress causing damage and safety hazards",
    "Enhanced accessibility"
  ],
  correctAnswer: 2,
  explanation: "IP20 enclosures offer minimal protection and would allow water ingress outdoors, leading to equipment damage, corrosion, electrical faults, and potential safety hazards."
};

const BS7671Module5Section5 = () => {
  useSEO({
    title: "Environmental Protection - IP Ratings & Fire Resistance | BS7671 Module 5.5",
    description: "Learn about IP ratings, fire resistance requirements, and environmental protection for electrical equipment per BS7671."
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
            <Link to="/study-centre/upskilling/bs7671-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Protection
          </h1>
          <p className="text-white/80">
            IP ratings, fire resistance, and protecting electrical equipment
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IP ratings:</strong> Two digits - solids protection, liquids protection</li>
              <li><strong>Fire resistance:</strong> Maintains circuit integrity during fire</li>
              <li><strong>LSZH:</strong> Reduces toxic smoke during fire</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Common IP Ratings</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IP20:</strong> Basic indoor - fingers protected</li>
              <li><strong>IP44:</strong> Bathrooms - splash protected</li>
              <li><strong>IP65:</strong> Outdoor - dust tight, water jets</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How IP ratings define protection against solids and liquids",
              "Required protection levels for different environments",
              "When fire-resistant equipment is needed",
              "BS7671 guidance for environmental durability"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: IP Rating System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            IP Rating System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ingress Protection (IP) ratings define protection against solid objects and liquids using two digits. The first digit indicates solid object protection, the second indicates liquid protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Digit - Solid Objects</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IP0X:</strong> No protection</li>
                  <li><strong>IP1X:</strong> &gt;50mm objects (back of hand)</li>
                  <li><strong>IP2X:</strong> &gt;12.5mm objects (fingers)</li>
                  <li><strong>IP3X:</strong> &gt;2.5mm objects (tools, wires)</li>
                  <li><strong>IP4X:</strong> &gt;1mm objects (small wires)</li>
                  <li><strong>IP5X:</strong> Dust protected (limited ingress)</li>
                  <li><strong>IP6X:</strong> Dust tight (no ingress)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Second Digit - Liquids</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IPX0:</strong> No protection</li>
                  <li><strong>IPX1:</strong> Dripping water (vertical)</li>
                  <li><strong>IPX2:</strong> Dripping water (15° tilt)</li>
                  <li><strong>IPX3:</strong> Spraying water (60° from vertical)</li>
                  <li><strong>IPX4:</strong> Splashing water (all directions)</li>
                  <li><strong>IPX5:</strong> Water jets (6.3mm nozzle)</li>
                  <li><strong>IPX6:</strong> Powerful water jets (12.5mm)</li>
                  <li><strong>IPX7:</strong> Temporary immersion (1m depth)</li>
                  <li><strong>IPX8:</strong> Continuous immersion</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2: Application Environments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Application Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different environments require specific IP ratings based on the presence of dust, moisture, chemicals, and other environmental factors.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-2">Bathrooms</p>
                <p className="text-sm text-white/90 mb-3">Zone-based requirements</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Zone 0: IPX7 (immersion)</li>
                  <li>• Zone 1: IPX4 minimum</li>
                  <li>• Zone 2: IPX4 minimum</li>
                  <li>• Outside zones: IP44 minimum</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-orange-400 mb-2">External Installations</p>
                <p className="text-sm text-white/90 mb-3">Weather exposure</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• General outdoor: IP65 minimum</li>
                  <li>• Exposed locations: IP66</li>
                  <li>• Ground level: IP67 consideration</li>
                  <li>• Coastal areas: Higher rating needed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-red-400 mb-2">Industrial Environments</p>
                <p className="text-sm text-white/90 mb-3">High-risk areas</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Food processing: IP66/IP67</li>
                  <li>• Chemical plants: IP66 + corrosion</li>
                  <li>• Car washes: IP66 minimum</li>
                  <li>• Dusty environments: IP6X</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3: Fire Resistance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Resistance & Reaction to Fire
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire resistance and reaction to fire properties are critical for maintaining safety during fire incidents, ensuring escape routes remain viable and emergency systems continue operating.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LSZH (Low Smoke Zero Halogen)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Low smoke:</strong> Minimal smoke emission</li>
                  <li><strong>Zero halogen:</strong> No toxic halogen gases</li>
                  <li><strong>Applications:</strong> Escape routes, public buildings</li>
                  <li><strong>Benefit:</strong> Better visibility, safer evacuation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire-Resistant Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Purpose:</strong> Maintain circuit integrity in fire</li>
                  <li><strong>Duration:</strong> 30, 60, 120 minutes rated</li>
                  <li><strong>Applications:</strong> Fire alarms, emergency lighting</li>
                  <li><strong>Types:</strong> FP, FRHF, mineral insulated (MI)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Critical Circuits Requiring Fire Resistance:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Fire Alarms</p>
                  <p className="text-white/90 text-xs">Detection and warning</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Emergency Lighting</p>
                  <p className="text-white/90 text-xs">Escape route illumination</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Smoke Extract</p>
                  <p className="text-white/90 text-xs">Ventilation systems</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Voice Systems</p>
                  <p className="text-white/90 text-xs">Emergency communication</p>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4: Thermal and Mechanical Endurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Thermal and Mechanical Endurance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment must be chosen for both operational and fault conditions. Factors include UV exposure, vibration, heat, chemicals, and mechanical stress.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature cycling:</strong> Expansion/contraction stress</li>
                  <li><strong>UV radiation:</strong> Plastic degradation</li>
                  <li><strong>Moisture:</strong> Condensation, seal deterioration</li>
                  <li><strong>Chemicals:</strong> Material compatibility</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Stresses</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Vibration:</strong> Machinery, traffic, building movement</li>
                  <li><strong>Impact:</strong> Accidental damage, maintenance</li>
                  <li><strong>Vandalism:</strong> Public area protection</li>
                  <li><strong>Installation:</strong> Handling during fitting</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Selection Considerations</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li><strong>Materials:</strong> UV-stable polymers, corrosion-resistant metals</li>
                <li><strong>Design:</strong> Adequate ventilation, flexible connections, drainage</li>
                <li><strong>Maintenance:</strong> Accessible inspection points, replaceable seals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Application</h2>
          <div className="p-5 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-elec-yellow mb-3">Underground Car Park Lighting Control</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              A lighting control panel is installed in an underground car park. Due to humidity, frequent vehicle wash-downs, and poor ventilation, the equipment must meet IP66 and corrosion resistance requirements.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/80">
              <div>
                <p className="font-medium text-white mb-1">Environment Analysis</p>
                <p>High humidity (&gt;80%), regular pressure washing, salt exposure from road treatments, poor air circulation, and temperature variations.</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Solution</p>
                <p>IP66-rated stainless steel enclosure with LSZH internal wiring, corrosion-resistant cable entries, elevated mounting, and internal heater.</p>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Common IP Ratings</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Indoor</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• IP20: Standard equipment</li>
                <li>• IP44: Kitchens, utility areas</li>
                <li>• IP54: Dusty environments</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Bathrooms</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Zone 0: IPX7</li>
                <li>• Zone 1-2: IPX4</li>
                <li>• Outside zones: IP44</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Outdoor</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• General: IP65</li>
                <li>• Exposed: IP66</li>
                <li>• Ground level: IP67</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-5-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-5-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module5Section5;
