import { ArrowLeft, Eye, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_2 = () => {
  useSEO(
    "Signs of Damage, Wear, or Incorrect Installation - Level 2 Electrical Installation",
    "Identifying physical damage, deterioration and installation faults in electrical systems"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.2.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Signs of Damage, Wear, or Incorrect Installation
          </h1>
          <p className="text-white">
            Identifying physical damage, deterioration and installation faults in electrical systems
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Physical damage: cracks, chips, scorch marks on accessories</li>
                <li>Wear signs: loose fittings, corrosion, brittle insulation</li>
                <li>Installation faults: wrong polarity, missing protection, overcrowding</li>
                <li>Safety hazards: exposed conductors, overheating, sharp edges</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Scorch marks, cracks, loose fittings, exposed copper, corrosion, overcrowding</li>
                <li><strong>Use:</strong> Good lighting, careful inspection, thermal detection, systematic checking</li>
                <li><strong>Check:</strong> Safety-critical vs cosmetic; document all findings; rectify before testing</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Even a correctly designed system can become unsafe if it suffers from damage, deterioration, or poor installation practices. Visual inspections must identify these issues before testing or energising the system. Early detection reduces the risk of electrical fires, shocks, and system failures.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise physical signs of electrical damage and deterioration.</li>
            <li>Identify common installation faults.</li>
            <li>Understand how wear and incorrect installation affect safety.</li>
            <li>Record and report issues in accordance with BS 7671.</li>
            <li>Distinguish between cosmetic damage and safety-critical defects.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Physical Damage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Physical Damage</h3>
            <p className="text-base text-white mb-4">
              Physical damage to electrical equipment poses immediate safety risks. Visual inspection must identify all forms of physical damage that could compromise electrical safety or system integrity.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Physical Damage Assessment</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Accessory Damage:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Cracked, chipped, or broken faceplates and mounting boxes</li>
                          <li>Missing screws or damaged fixings allowing loose mounting</li>
                          <li>Impact damage from furniture, tools, or building work</li>
                          <li>Stress cracking around cable entry points</li>
                          <li>Broken switches or damaged socket outlets</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Insulation Damage:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Cuts, nicks, or gouges in cable sheathing exposing conductors</li>
                          <li>Crushed or flattened cables causing internal conductor damage</li>
                          <li>Rodent damage to cable insulation</li>
                          <li>Puncture damage from nails, screws, or drill bits</li>
                          <li>Abrasion damage from sharp edges or repeated movement</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Heat Damage Indicators:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Discolouration around terminals and connection points</li>
                          <li>Scorch marks on accessories, faceplates, or surrounding surfaces</li>
                          <li>Melted or distorted plastic components</li>
                          <li>Burnt or carbonised insulation materials</li>
                          <li>Heat-induced embrittlement of cables and components</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2">Critical Safety Alert</p>
                        <p className="text-xs sm:text-sm text-white">
                          Any physical damage that exposes live conductors or shows signs of overheating must be treated as an immediate safety hazard. Isolate the circuit and make safe before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="physical-damage-check"
            question="What does scorching around electrical accessories typically indicate?"
            options={["Normal aging", "Overheating due to loose connections or overloading", "Recent cleaning", "High-quality installation"]}
            correctIndex={1}
            explanation="Scorching is a clear indication of overheating, usually caused by loose connections, overloading, or faulty equipment that requires immediate attention."
          />
          <Separator className="my-6" />

          {/* 2. Wear and Deterioration */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Wear and Deterioration</h3>
            <p className="text-base text-white mb-4">
              Electrical installations deteriorate over time due to environmental factors, usage patterns, and material aging. Recognising deterioration patterns helps predict and prevent failures.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Deterioration and Wear Patterns</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Mechanical Wear:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Loose or worn socket outlets from repeated plug insertion/removal</li>
                          <li>Worn switch mechanisms with poor contact or operation</li>
                          <li>Loose terminal connections due to thermal cycling</li>
                          <li>Vibration-induced loosening of fixings and connections</li>
                          <li>Wear on cable support systems and trunking joints</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Environmental Deterioration:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Corrosion on terminals, enclosures, and metallic fixings</li>
                          <li>UV degradation of outdoor cables and equipment</li>
                          <li>Moisture-induced degradation of insulation materials</li>
                          <li>Chemical attack from cleaning products or industrial processes</li>
                          <li>Salt air corrosion in coastal environments</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Age-Related Degradation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Brittle insulation that cracks or crumbles when handled</li>
                          <li>Faded or illegible markings on cables and equipment</li>
                          <li>Perished rubber and plastic components</li>
                          <li>Oxidation of copper conductors</li>
                          <li>Deterioration of cable support materials</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="wear-deterioration-check"
            question="What is a serious safety concern with age-related cable deterioration?"
            options={["Faded cable colours", "Brittle insulation exposing conductors", "Slight discolouration", "Dust accumulation"]}
            correctIndex={1}
            explanation="Brittle insulation can crack and expose live conductors, creating shock and fire risks that require immediate remedial action."
          />
          <Separator className="my-6" />

          {/* 3. Incorrect Installation Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Incorrect Installation Practices</h3>
            <p className="text-base text-white mb-4">
              Poor installation practices compromise safety and can lead to premature failure. Visual inspection must identify workmanship issues that violate standards or create hazards.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Installation Fault Identification</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Electrical Connection Faults:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Reversed polarity in socket outlets (live and neutral swapped)</li>
                          <li>Incorrect conductor identification and termination</li>
                          <li>Mixed cable types within the same circuit</li>
                          <li>Undersized cables for the connected load</li>
                          <li>Poor conductor preparation with damaged cores</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Protection and Safety Faults:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Missing grommets, bushes, or cable glands allowing sharp edges</li>
                          <li>Inadequate strain relief on flexible cables</li>
                          <li>Missing or incorrect protective devices</li>
                          <li>Inadequate IP rating for the installation environment</li>
                          <li>Poor earthing and bonding arrangements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Installation Quality Issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Overcrowded enclosures preventing proper heat dissipation</li>
                          <li>Poor cable management causing stress and damage</li>
                          <li>Inadequate fixing and support arrangements</li>
                          <li>Non-compliance with manufacturer instructions</li>
                          <li>Failure to follow BS 7671 installation requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="installation-faults-check"
            question="Why is reversed polarity in socket outlets a serious safety issue?"
            options={["It affects equipment efficiency", "It can cause electric shock and equipment damage", "It makes testing difficult", "It violates building regulations"]}
            correctIndex={1}
            explanation="Reversed polarity means the switch disconnects the neutral instead of live, leaving equipment live when switched off, creating shock risks."
          />
          <Separator className="my-6" />

          {/* 4. Safety Hazards from Incorrect Workmanship */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Safety Hazards from Incorrect Workmanship</h3>
            <p className="text-base text-white mb-4">
              Poor workmanship creates specific safety hazards that can lead to fire, electric shock, or injury. Understanding these hazards helps prioritise remedial actions.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Workmanship-Related Safety Hazards</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Fire and Overheating Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Loose terminations causing high resistance and heating</li>
                          <li>Overcrowded consumer units restricting heat dissipation</li>
                          <li>Overloaded circuits with inadequate protection</li>
                          <li>Poor connections leading to arcing and sparking</li>
                          <li>Inadequate ventilation around electrical equipment</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Shock and Electrocution Hazards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Exposed trailing cables creating trip and contact hazards</li>
                          <li>Missing or inadequate earthing arrangements</li>
                          <li>Lack of strain relief allowing conductor pullout</li>
                          <li>Damaged cable entry points exposing live parts</li>
                          <li>Incorrect polarity arrangements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Mechanical and Physical Hazards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Sharp edges from missing grommets or poor cutting</li>
                          <li>Loose mountings creating falling hazards</li>
                          <li>Inadequate cable protection in high-traffic areas</li>
                          <li>Poor access arrangements hindering emergency response</li>
                          <li>Structural damage from inappropriate fixings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-hazards-check"
            question="What is the main safety risk from overcrowded consumer units?"
            options={["Difficulty in labelling", "Overheating and restricted maintenance access", "Reduced unit lifespan", "Aesthetic concerns"]}
            correctIndex={1}
            explanation="Overcrowding restricts airflow causing overheating and makes maintenance dangerous by limiting access and increasing the risk of accidental contact."
          />
          <Separator className="my-6" />

          {/* 5. Differentiating Cosmetic vs. Safety Issues */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Differentiating Cosmetic vs. Safety Issues</h3>
            <p className="text-base text-white mb-4">
              Not all defects are safety-critical. Inspectors must distinguish between cosmetic issues and genuine safety concerns to prioritise remedial actions appropriately.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">Safety vs. Cosmetic Assessment</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Cosmetic Issues (Usually Non-Critical):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Minor scratches on faceplates that don't affect integrity</li>
                          <li>Slight discolouration from age or cleaning products</li>
                          <li>Paint splashes that don't impair function</li>
                          <li>Faded markings that are still legible</li>
                          <li>Minor dents that don't compromise enclosure integrity</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety-Critical Issues (Must Be Recorded/Rectified):</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Any cracks that could expose live parts or compromise IP rating</li>
                          <li>Signs of overheating including scorch marks and discolouration</li>
                          <li>Exposed copper conductors or damaged insulation</li>
                          <li>Loose fittings that could lead to arcing or disconnection</li>
                          <li>Corrosion affecting electrical connections or structural integrity</li>
                          <li>Any damage that affects the equipment's protective function</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Assessment Criteria:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Does the defect affect electrical safety or system integrity?</li>
                          <li>Could the defect lead to progressive deterioration?</li>
                          <li>Does it compromise protection against electric shock or fire?</li>
                          <li>Will it affect the equipment's intended function?</li>
                          <li>Does it violate BS 7671 or other applicable standards?</li>
                        </ul>
                      </div>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 text-elec-yellow mb-2">Professional Judgement</p>
                        <p className="text-xs sm:text-sm text-white">
                          When in doubt, err on the side of safety. Document all observations and seek advice from senior colleagues or regulatory bodies if uncertain about the significance of any defect.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <ul className="space-y-2 text-base text-white">
            <li>• Always inspect under good lighting conditions to clearly see damage and wear patterns.</li>
            <li>• Remove covers carefully to check behind accessories for hidden damage or poor connections.</li>
            <li>• Use non-contact thermometers to identify overheating areas without direct contact.</li>
            <li>• Never energise circuits with visible critical defects - make safe first.</li>
            <li>• Document all findings with photographs and detailed descriptions for proper records.</li>
            <li>• Distinguish between safety-critical and cosmetic issues to prioritise remedial work.</li>
          </ul>
        </Card>

        {/* Knowledge Check Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Knowledge Check</h2>
          <div className="space-y-4 text-base text-white">
            <div className="p-4 border-l-4 border-red-500 ">
              <p className="font-semibold mb-2">Q: What are scorch marks on a socket a sign of?</p>
              <p>A: Overheating, typically caused by loose connections, overloading, or faulty components that require immediate investigation and rectification.</p>
            </div>
            
            <div className="p-4 border-l-4 border-elec-yellow ">
              <p className="font-semibold mb-2">Q: Give one example of wear that can affect safety.</p>
              <p>A: Loose socket outlets or switches, brittle cable insulation, corroded terminals, or worn protective devices that may fail to operate correctly.</p>
            </div>
            
            <div className="p-4 border-l-4 border-elec-yellow ">
              <p className="font-semibold mb-2">Q: Why must incorrect polarity be rectified immediately?</p>
              <p>A: Because it means switches disconnect the neutral instead of live, leaving equipment energised when apparently switched off, creating shock risks.</p>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Case Study</h2>
          <div className="p-4 border-l-4 border-amber-500 ">
            <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Distribution Board Fire Risk</h3>
            <p className="text-base text-white mb-2">
              <strong>Situation:</strong> During an office rewire inspection, inspectors found a distribution board with scorch marks and melted insulation around one terminal.
            </p>
            <p className="text-base text-white mb-2">
              <strong>Investigation:</strong> Detailed examination revealed a loose neutral connection that had been arcing and overheating for some time, gradually carbonising the surrounding materials.
            </p>
            <p className="text-base text-white mb-2">
              <strong>Outcome:</strong> The entire distribution board was replaced and the circuit was rewired. Fire investigation showed the defect could have resulted in a significant electrical fire.
            </p>
            <p className="text-base text-white">
              <strong>Learning Point:</strong> Visual inspection of distribution boards must include careful examination of all terminal connections for signs of overheating, even when access is limited.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white mb-2">Q: Is discolouration always a serious issue?</p>
              <p className="text-base text-white">A: Not always, but any signs of overheating must be investigated immediately. Light discolouration from age or cleaning may be cosmetic, but brown or black marks typically indicate dangerous overheating.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: What if accessories are slightly loose but still functional?</p>
              <p className="text-base text-white">A: Loose fittings must be tightened or replaced immediately. They pose a risk of overheating, arcing, and potential fire, regardless of current functionality.</p>
            </div>
            <Separator />
            
            <div>
              <p className="font-medium text-white mb-2">Q: Should corrosion always be reported?</p>
              <p className="text-base text-white">A: Yes, because corrosion weakens connections, increases resistance, and can lead to failure. It also indicates environmental conditions that may affect other parts of the installation.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide – Key Signs of Damage and Incorrect Installation</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <ul className="space-y-2 text-base text-white">
              <li>✅ Cracks, breaks, or scorch marks on accessories.</li>
              <li>✅ Exposed copper from damaged insulation.</li>
              <li>✅ Loose fittings or worn connections.</li>
              <li>✅ Missing grommets or sharp edges in enclosures.</li>
              <li>✅ Overcrowding in consumer units or trunking.</li>
              <li>✅ Signs of overheating or thermal damage.</li>
              <li>✅ Corrosion on terminals and metalwork.</li>
              <li>✅ Reversed polarity or incorrect wiring.</li>
            </ul>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <ul className="space-y-2 text-base text-white">
            <li>• Inspectors must look for physical damage, wear, and poor installation practices.</li>
            <li>• Overheating signs, cracks, and corrosion are all safety-critical issues.</li>
            <li>• Cosmetic defects can be noted but are not usually immediate safety concerns.</li>
            <li>• Correct identification and reporting prevent hazards and ensure compliance.</li>
            <li>• Professional judgement is essential to prioritise remedial actions appropriately.</li>
          </ul>
        </Card>

        {/* Quiz Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-semibold text-white">Quiz (10 Questions)</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" className="sm:w-auto" asChild>
            <Link to="../2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Visual Checks
            </Link>
          </Button>
          <Button className="sm:w-auto" asChild>
            <Link to="../2-3">
              Next: Common Electrical Defects
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section2_2;