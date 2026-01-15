import { ArrowLeft, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_2 = () => {
  useSEO(
    "Signs of Damage, Wear, or Incorrect Installation - Level 2 Electrical Installation",
    "Identifying physical damage, deterioration and installation faults in electrical systems"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does scorching on sockets usually indicate?",
      options: [
        "Age-related wear",
        "Overheating due to loose or faulty connections",
        "Normal use patterns",
        "Cosmetic damage only"
      ],
      correctAnswer: 1,
      explanation: "Scorching on sockets is a clear sign of overheating, typically caused by loose connections or faulty terminations that create resistance and heat."
    },
    {
      id: 2,
      question: "Name one example of deterioration caused by age.",
      options: [
        "Scratched faceplates",
        "Brittle insulation",
        "Dust accumulation",
        "Faded colours"
      ],
      correctAnswer: 1,
      explanation: "Brittle insulation is a serious age-related deterioration that can expose live conductors and create safety hazards."
    },
    {
      id: 3,
      question: "True or False: Cosmetic scratches on accessories always need rectification.",
      options: [
        "True - all damage must be fixed",
        "False - only safety-critical defects require action",
        "True - for aesthetic reasons",
        "False - scratches improve grip"
      ],
      correctAnswer: 1,
      explanation: "Minor cosmetic damage that doesn't affect safety or function typically doesn't require immediate rectification, though it should still be noted."
    },
    {
      id: 4,
      question: "Which of the following is a critical fault?",
      options: [
        "Slight discolouration of faceplate",
        "Exposed copper conductor",
        "Minor scratches",
        "Dust on equipment"
      ],
      correctAnswer: 1,
      explanation: "Exposed copper conductors present an immediate shock and fire risk and must be addressed immediately."
    },
    {
      id: 5,
      question: "What does corrosion on terminals suggest?",
      options: [
        "Normal aging process",
        "Environmental effects reducing safety of connections",
        "High-quality materials",
        "Recent installation"
      ],
      correctAnswer: 1,
      explanation: "Corrosion on terminals indicates environmental effects that can weaken connections and lead to increased resistance and potential failure."
    },
    {
      id: 6,
      question: "Give one example of incorrect installation practice.",
      options: [
        "Proper cable sizing",
        "Reversed polarity or missing grommets",
        "Adequate ventilation",
        "Correct labelling"
      ],
      correctAnswer: 1,
      explanation: "Reversed polarity and missing grommets are common installation errors that can create safety hazards and must be corrected."
    },
    {
      id: 7,
      question: "Why is overcrowding in consumer units dangerous?",
      options: [
        "Makes the unit look untidy",
        "Causes overheating and difficulty in maintenance",
        "Reduces the unit's value",
        "Makes testing faster"
      ],
      correctAnswer: 1,
      explanation: "Overcrowding restricts airflow causing overheating and makes maintenance dangerous and difficult to perform safely."
    },
    {
      id: 8,
      question: "What should be done if a socket outlet is loose?",
      options: [
        "Leave it as long as it works",
        "Tighten or replace it to prevent arcing/overheating",
        "Paint over it",
        "Use it more carefully"
      ],
      correctAnswer: 1,
      explanation: "Loose socket outlets can cause arcing and overheating, so they must be properly secured or replaced to maintain safety."
    },
    {
      id: 9,
      question: "Which regulation provides guidance on installation safety?",
      options: [
        "BS 5839",
        "BS 7671",
        "Building Regulations Part M",
        "BS 6004"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (The IET Wiring Regulations) is the primary standard for electrical installation safety in the UK."
    },
    {
      id: 10,
      question: "Why must visual inspections precede testing?",
      options: [
        "To save time",
        "To identify unsafe conditions that could make testing hazardous",
        "Because it's traditional",
        "To comply with insurance"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection identifies obvious hazards and unsafe conditions that could make electrical testing dangerous or cause further damage."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Signs of Damage, Wear, or Incorrect Installation
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Identifying physical damage, deterioration and installation faults in electrical systems
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-elec-yellow" />
              <h2 className="font-semibold text-white">Spot it in 30 Seconds</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-elec-yellow mb-2">Key Points</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Physical damage: cracks, chips, scorch marks</li>
                  <li>Wear signs: loose fittings, corrosion, brittle insulation</li>
                  <li>Installation faults: wrong polarity, missing protection</li>
                  <li>Safety hazards: exposed conductors, overheating</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Scorch marks, cracks, loose fittings, corrosion</li>
                  <li><strong>Use:</strong> Good lighting, careful inspection, thermal detection</li>
                  <li><strong>Check:</strong> Safety-critical vs cosmetic defects</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Even a correctly designed system can become unsafe if it suffers from damage, deterioration, or poor installation practices. Visual inspections must identify these issues before testing or energising the system.
              </p>
              <p>
                Early detection reduces the risk of electrical fires, shocks, and system failures.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p>By the end of this subsection, learners will be able to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recognise physical signs of electrical damage and deterioration</li>
                <li>Identify common installation faults</li>
                <li>Understand how wear and incorrect installation affect safety</li>
                <li>Record and report issues in accordance with BS 7671</li>
                <li>Distinguish between cosmetic damage and safety-critical defects</li>
              </ul>
            </div>
          </section>

          {/* Section 1: Physical Damage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Physical Damage
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Physical damage to electrical equipment poses immediate safety risks. Visual inspection must identify all forms of physical damage that could compromise electrical safety.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-3">Physical Damage Assessment:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white mb-1"><strong>Accessory Damage:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cracked, chipped, or broken faceplates and mounting boxes</li>
                      <li>Missing screws or damaged fixings allowing loose mounting</li>
                      <li>Impact damage from furniture, tools, or building work</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Insulation Damage:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cuts, nicks, or gouges in cable sheathing exposing conductors</li>
                      <li>Crushed or flattened cables causing internal damage</li>
                      <li>Rodent damage to cable insulation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Heat Damage Indicators:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Discolouration around terminals and connection points</li>
                      <li>Scorch marks on accessories or surrounding surfaces</li>
                      <li>Melted or distorted plastic components</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Critical Safety Alert</p>
                <p className="text-sm">
                  Any physical damage that exposes live conductors or shows signs of overheating must be treated as an immediate safety hazard. Isolate the circuit and make safe before proceeding.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="physical-damage-check"
                question="What does scorching around electrical accessories typically indicate?"
                options={["Normal aging", "Overheating due to loose connections or overloading", "Recent cleaning", "High-quality installation"]}
                correctIndex={1}
                explanation="Scorching is a clear indication of overheating, usually caused by loose connections, overloading, or faulty equipment that requires immediate attention."
              />
            </div>
          </section>

          {/* Section 2: Wear and Deterioration */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Wear and Deterioration
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical installations deteriorate over time due to environmental factors, usage patterns, and material aging. Recognising deterioration patterns helps predict and prevent failures.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Deterioration and Wear Patterns:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white mb-1"><strong>Mechanical Wear:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Loose or worn socket outlets from repeated plug insertion</li>
                      <li>Worn switch mechanisms with poor contact</li>
                      <li>Loose terminal connections due to thermal cycling</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Environmental Deterioration:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Corrosion on terminals, enclosures, and metallic fixings</li>
                      <li>UV degradation of outdoor cables and equipment</li>
                      <li>Moisture-induced degradation of insulation materials</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Age-Related Degradation:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Brittle insulation that cracks or crumbles when handled</li>
                      <li>Faded or illegible markings on cables and equipment</li>
                      <li>Perished rubber and plastic components</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="wear-deterioration-check"
                question="What is a serious safety concern with age-related cable deterioration?"
                options={["Faded cable colours", "Brittle insulation exposing conductors", "Slight discolouration", "Dust accumulation"]}
                correctIndex={1}
                explanation="Brittle insulation can crack and expose live conductors, creating shock and fire risks that require immediate remedial action."
              />
            </div>
          </section>

          {/* Section 3: Incorrect Installation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Incorrect Installation Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Poor installation practices compromise safety and can lead to premature failure. Visual inspection must identify workmanship issues that violate standards or create hazards.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-3">Installation Fault Identification:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white mb-1"><strong>Electrical Connection Faults:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reversed polarity in socket outlets (live and neutral swapped)</li>
                      <li>Incorrect conductor identification and termination</li>
                      <li>Mixed cable types within the same circuit</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Protection and Safety Faults:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Missing grommets, bushes, or cable glands</li>
                      <li>Inadequate strain relief on flexible cables</li>
                      <li>Missing or incorrect protective devices</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Installation Quality Issues:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Overcrowded enclosures preventing heat dissipation</li>
                      <li>Poor cable management causing stress and damage</li>
                      <li>Non-compliance with manufacturer instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="installation-faults-check"
                question="Why is reversed polarity in socket outlets a serious safety issue?"
                options={["It affects equipment efficiency", "It can cause electric shock and equipment damage", "It makes testing difficult", "It violates building regulations"]}
                correctIndex={1}
                explanation="Reversed polarity means the switch disconnects the neutral instead of live, leaving equipment live when switched off, creating shock risks."
              />
            </div>
          </section>

          {/* Section 4: Safety Hazards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Safety Hazards from Incorrect Workmanship
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Poor workmanship creates specific safety hazards that can lead to fire, electric shock, or injury. Understanding these hazards helps prioritise remedial actions.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-amber-500/50">
                <p className="font-medium text-white mb-3">Workmanship-Related Safety Hazards:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white mb-1"><strong>Fire and Overheating Risks:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Loose terminations causing high resistance and heating</li>
                      <li>Overcrowded consumer units restricting heat dissipation</li>
                      <li>Poor connections leading to arcing and sparking</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Shock and Electrocution Hazards:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Exposed trailing cables creating trip and contact hazards</li>
                      <li>Missing or inadequate earthing arrangements</li>
                      <li>Damaged cable entry points exposing live parts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="safety-hazards-check"
                question="What is the main safety risk from overcrowded consumer units?"
                options={["Difficulty in labelling", "Overheating and restricted maintenance access", "Reduced unit lifespan", "Aesthetic concerns"]}
                correctIndex={1}
                explanation="Overcrowding restricts airflow causing overheating and makes maintenance dangerous by limiting access and increasing the risk of accidental contact."
              />
            </div>
          </section>

          {/* Section 5: Cosmetic vs Safety */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Differentiating Cosmetic vs. Safety Issues
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Not all defects are safety-critical. Inspectors must distinguish between cosmetic issues and genuine safety concerns to prioritise remedial actions appropriately.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-gray-500/50">
                  <p className="font-medium text-white mb-2">Cosmetic Issues (Usually Non-Critical):</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Minor scratches on faceplates</li>
                    <li>Slight discolouration from age</li>
                    <li>Paint splashes that don't impair function</li>
                    <li>Faded markings that are still legible</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                  <p className="font-medium text-white mb-2">Safety-Critical Issues (Must Rectify):</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Cracks exposing live parts</li>
                    <li>Scorch marks indicating overheating</li>
                    <li>Exposed copper conductors</li>
                    <li>Loose fittings causing arcing</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-2">Professional Judgement</p>
                <p className="text-sm">
                  When in doubt, err on the side of safety. Document all observations and seek advice from senior colleagues if uncertain about the significance of any defect.
                </p>
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Case Study
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-medium text-amber-400 mb-2">Distribution Board Fire Risk</p>
              <div className="text-white/80 space-y-3 text-sm">
                <p>
                  <strong>Situation:</strong> During an office rewire inspection, inspectors found a distribution board with scorch marks and melted insulation around one terminal.
                </p>
                <p>
                  <strong>Investigation:</strong> Detailed examination revealed a loose neutral connection that had been arcing and overheating, gradually carbonising the surrounding materials.
                </p>
                <p>
                  <strong>Outcome:</strong> The entire distribution board was replaced and the circuit was rewired. Fire investigation showed the defect could have resulted in a significant electrical fire.
                </p>
                <p>
                  <strong>Learning Point:</strong> Visual inspection of distribution boards must include careful examination of all terminal connections for signs of overheating.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide – Key Signs of Damage</h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li>✅ Cracks, breaks, or scorch marks on accessories</li>
                <li>✅ Exposed copper from damaged insulation</li>
                <li>✅ Loose fittings or worn connections</li>
                <li>✅ Missing grommets or sharp edges in enclosures</li>
                <li>✅ Overcrowding in consumer units or trunking</li>
                <li>✅ Signs of overheating or thermal damage</li>
                <li>✅ Corrosion on terminals and metalwork</li>
                <li>✅ Reversed polarity or incorrect wiring</li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Inspectors must look for physical damage, wear, and poor installation practices</li>
                <li>Overheating signs, cracks, and corrosion are all safety-critical issues</li>
                <li>Cosmetic defects can be noted but are not usually immediate safety concerns</li>
                <li>Correct identification and reporting prevent hazards and ensure compliance</li>
                <li>Professional judgement is essential to prioritise remedial actions appropriately</li>
              </ul>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Quiz (10 Questions)</h2>
            </div>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Visual Checks
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                Next: Cable Routes & Zones
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_2;
