import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m7s1-check1",
    question: "What is the minimum IP rating required for electrical equipment in bathroom Zone 1?",
    options: [
      "IP20",
      "IPX2",
      "IPX4",
      "IP65"
    ],
    correctIndex: 2,
    explanation: "Equipment in Zone 1 (above the bath/shower) must have a minimum rating of IPX4 to protect against water splashes from any direction. This is essential for safety where water spray is likely during normal use."
  },
  {
    id: "bs7671-m7s1-check2",
    question: "How far does Zone 2 extend horizontally from the edge of a bath or shower basin?",
    options: [
      "0.3 metres",
      "0.6 metres",
      "1.0 metre",
      "2.0 metres"
    ],
    correctIndex: 1,
    explanation: "Zone 2 extends 0.6 metres horizontally from the outer edge of Zone 1 (the bath or shower basin). Equipment in this zone must be IPX4 rated or higher and protected by 30mA RCD."
  },
  {
    id: "bs7671-m7s1-check3",
    question: "What additional protection is required for all circuits in bathrooms under BS 7671?",
    options: [
      "Metal conduit installation",
      "Double earthing connections",
      "30mA RCD protection",
      "Armoured cabling"
    ],
    correctIndex: 2,
    explanation: "BS 7671 requires 30mA RCD protection for all circuits supplying equipment in bathrooms. This provides additional protection against electric shock in locations where wet conditions increase the risk of electrocution."
  }
];

const faqs = [
  {
    question: "Can I install a standard socket outlet in a bathroom?",
    answer: "Standard 13A socket outlets must be at least 3 metres from the edge of Zone 1 (the bath or shower). Within 3m, only shaver supply units complying with BS EN 61558-2-5 may be installed, and these must be outside Zones 0, 1, and 2."
  },
  {
    question: "Is supplementary bonding still required in bathrooms?",
    answer: "Supplementary bonding may be omitted if all circuits supplying the bathroom are protected by 30mA RCDs AND the main protective bonding meets requirements. Otherwise, all extraneous and exposed conductive parts must be bonded together."
  },
  {
    question: "What equipment can be installed in Zone 0?",
    answer: "Zone 0 is inside the bath or shower basin. Only equipment specifically designed for this zone may be used - typically IPX7 rated (immersion protection) and supplied at SELV not exceeding 12V AC or 30V DC."
  }
];

const quizQuestion = {
  question: "An electrician is installing a towel rail heater 0.5m from the edge of a shower. Which zone is this, and what IP rating is required?",
  options: [
    "Zone 1, minimum IPX4",
    "Zone 2, minimum IPX4",
    "Zone 2, minimum IPX2",
    "Outside zones, no specific IP rating"
  ],
  correctAnswer: 1,
  explanation: "At 0.5m from the shower edge, this is within Zone 2 (which extends 0.6m from Zone 1). Zone 2 requires a minimum IP rating of IPX4. The towel rail must also be protected by 30mA RCD and must not have accessible live parts."
};

const BS7671Module7Section1 = () => {
  useSEO({
    title: "Special Locations - Bathrooms and Wet Areas | BS7671 Module 7.1",
    description: "Learn about BS 7671 zone classification for bathrooms, swimming pools, and other wet locations including IP ratings and safety requirements."
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
            <Link to="/study-centre/upskilling/bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Special Locations - Bathrooms and Wet Areas
          </h1>
          <p className="text-white/80">
            BS 7671 Section 701 requirements for zone classification and equipment selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zone 0:</strong> Inside bath/shower - IPX7, SELV only</li>
              <li><strong>Zone 1:</strong> Above bath/shower - IPX4 minimum</li>
              <li><strong>Zone 2:</strong> 0.6m from Zone 1 - IPX4 minimum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Water presence, splash risks, immersion hazards</li>
              <li><strong>Use:</strong> Measure zones carefully, check IP ratings on equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand zone classification in bathrooms (0, 1, 2)",
              "Identify correct IP ratings for each zone",
              "Apply RCD protection requirements",
              "Determine when supplementary bonding is required"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Zone Classification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Zone Classification System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 701 defines specific zones in bathrooms based on the risk of water contact.
              Each zone has requirements for equipment IP ratings, protection measures, and permitted
              equipment types.
            </p>

            <div className="space-y-3 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400/80 mb-2">Zone 0 - Highest Risk</p>
                <p className="text-sm text-white">
                  Interior of bath or shower basin. Only equipment rated IPX7 (protection against immersion)
                  supplied at SELV not exceeding 12V AC or 30V DC. The safety source must be outside Zones 0-2.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm font-medium text-orange-400/80 mb-2">Zone 1 - High Risk</p>
                <p className="text-sm text-white">
                  Area above the bath/shower extending to 2.25m above finished floor level. Equipment must
                  be IPX4 rated minimum. Only fixed electrical equipment suitable for this zone may be installed.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone 2 - Moderate Risk</p>
                <p className="text-sm text-white">
                  Extends 0.6m horizontally from Zone 1 and up to 2.25m height. Equipment must be IPX4 rated.
                  Includes area around washbasins. More equipment types permitted but must be protected by RCD.
                </p>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: IP Rating Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IP Rating Requirements by Zone
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings indicate the level of protection against solid objects (first
              digit) and water (second digit). In bathrooms, the second digit (water protection) is critical.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Second Digit Meanings</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IPX4:</strong> Protected against splashing from any direction</li>
                  <li><strong>IPX5:</strong> Protected against water jets</li>
                  <li><strong>IPX7:</strong> Protected against temporary immersion</li>
                  <li><strong>IPX8:</strong> Protected against continuous immersion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Requirements Summary</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Zone 0:</strong> IPX7 minimum (usually IPX8)</li>
                  <li><strong>Zone 1:</strong> IPX4 minimum (IPX5 if water jets used)</li>
                  <li><strong>Zone 2:</strong> IPX4 minimum</li>
                  <li><strong>Outside Zones:</strong> IPX4 where splashing likely</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: Protection Measures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Additional Protection Measures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond IP ratings, BS 7671 requires additional protection measures for bathroom installations
              to ensure safety in these high-risk locations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All circuits must have 30mA RCD protection</li>
                  <li>This applies regardless of zone location</li>
                  <li>Maximum disconnection time 40ms at 5×IΔn</li>
                  <li>Type AC minimum, Type A preferred</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supplementary Bonding</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Required unless RCD protection on all circuits</li>
                  <li>Bonds all exposed and extraneous parts</li>
                  <li>Uses 4mm² copper minimum</li>
                  <li>Must be accessible for inspection</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400/80 mb-2">When Supplementary Bonding Can Be Omitted</p>
              <ul className="text-sm text-white space-y-1">
                <li>All circuits protected by 30mA RCD AND</li>
                <li>Main protective bonding meets all requirements AND</li>
                <li>All extraneous conductive parts are effectively bonded at the origin</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Permitted Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Permitted Equipment by Zone
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone 1 Permitted</p>
                <ul className="text-sm text-white space-y-1">
                  <li>SELV equipment (source outside zone)</li>
                  <li>Fixed luminaires (IPX4)</li>
                  <li>Showers and shower pumps</li>
                  <li>Whirlpool bath units</li>
                  <li>Towel rails (if suitable)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone 2 Permitted</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All Zone 1 equipment</li>
                  <li>Shaver supply units (BS EN 61558)</li>
                  <li>Fixed luminaires (IPX4)</li>
                  <li>Ventilation fans (IPX4)</li>
                  <li>Class II heated mirrors</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400/80 mb-2">Prohibited in All Zones</p>
              <ul className="text-sm text-white space-y-1">
                <li>Standard 13A socket outlets (must be 3m from Zone 1)</li>
                <li>Switchgear and accessories (except as permitted)</li>
                <li>Portable equipment other than SELV</li>
                <li>Junction boxes (must be outside zones)</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Practical Guidance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always measure zones from finished floor level and bath/shower rim</li>
                <li>Consider the position of shower heads - water jets affect IP requirements</li>
                <li>Document zone measurements on installation drawings</li>
                <li>Use IP-rated enclosures for all connections within zones</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone miscalculation:</strong> Not accounting for shower rails or adjustable heads</li>
                <li><strong>IP confusion:</strong> Using IPX4 where IPX7 is required (Zone 0)</li>
                <li><strong>Bonding omission:</strong> Assuming RCDs eliminate bonding requirements</li>
                <li><strong>Socket placement:</strong> Installing sockets within 3m of Zone 1</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Bathroom Zones</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-red-400/80 mb-1">Zone 0</p>
              <ul className="space-y-0.5">
                <li>Inside bath/shower</li>
                <li>IPX7 minimum</li>
                <li>SELV only (≤12V AC)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-orange-400/80 mb-1">Zone 1</p>
              <ul className="space-y-0.5">
                <li>Above bath/shower to 2.25m</li>
                <li>IPX4 minimum</li>
                <li>30mA RCD required</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Zone 2</p>
              <ul className="space-y-0.5">
                <li>0.6m from Zone 1</li>
                <li>IPX4 minimum</li>
                <li>Shaver outlets permitted</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
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
            <Link to="/study-centre/upskilling/bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-7-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module7Section1;
