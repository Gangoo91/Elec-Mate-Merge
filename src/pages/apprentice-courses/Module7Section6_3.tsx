import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, Users, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Temporary Isolation or Making Safe - Level 2 Module 7 Section 6.3";
const DESCRIPTION = "Safe temporary isolation procedures and emergency measures when faults cannot be immediately repaired";

// Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of temporary isolation?",
    options: [
      "To save time during repairs",
      "To prevent dangerous circuits from being energised until repairs are made",
      "To reduce electricity bills",
      "To test circuit performance"
    ],
    correctAnswer: 1,
    explanation: "Temporary isolation ensures dangerous circuits cannot be energised until proper repairs are completed, preventing accidents and protecting people."
  },
  {
    id: 2,
    question: "Why must faulty circuits never remain live?",
    options: [
      "It wastes electricity",
      "It's against company policy",
      "Because faults can escalate into serious safety hazards, fires, or electrocution risks",
      "It makes testing more difficult"
    ],
    correctAnswer: 2,
    explanation: "Faulty circuits pose escalating safety risks that can lead to fires, electrocution, or other serious accidents if left energised."
  },
  {
    id: 3,
    question: "Give two methods of isolating a circuit.",
    options: [
      "Switching off breakers and removing fuses",
      "Turning off lights and unplugging equipment",
      "Covering sockets and switching off the main switch",
      "Using different test equipment"
    ],
    correctAnswer: 0,
    explanation: "Circuit isolation is achieved through switching off protective devices (breakers), removing fuses, or using lockout kits."
  },
  {
    id: 4,
    question: "What should be attached to a circuit breaker after isolation?",
    options: [
      "A new fuse",
      "Clear warning notices such as 'Do Not Use – Faulty Circuit'",
      "Test equipment",
      "A replacement breaker"
    ],
    correctAnswer: 1,
    explanation: "Clear warning labels must be attached to prevent accidental re-energisation and inform others of the fault status."
  },
  {
    id: 5,
    question: "Why are warning labels important during fault management?",
    options: [
      "They look professional",
      "They're required by law",
      "To ensure no one accidentally restores supply to a faulty circuit",
      "They help with record keeping"
    ],
    correctAnswer: 2,
    explanation: "Warning labels prevent accidental re-energisation of faulty circuits, which could create immediate danger to people and property."
  },
  {
    id: 6,
    question: "Give one example of a temporary safety measure other than isolation.",
    options: [
      "Replacing the entire circuit",
      "Physically removing or covering damaged accessories to prevent use",
      "Installing new equipment",
      "Increasing the fuse rating"
    ],
    correctAnswer: 1,
    explanation: "Physical removal or covering of damaged accessories prevents anyone from attempting to use faulty equipment."
  },
  {
    id: 7,
    question: "Who is responsible for permanent fault rectification?",
    options: [
      "Any apprentice",
      "The building owner",
      "A competent person or supervisor with appropriate qualifications",
      "The person who found the fault"
    ],
    correctAnswer: 2,
    explanation: "Only competent persons with appropriate qualifications and authority can certify permanent fault rectification."
  },
  {
    id: 8,
    question: "True or False: Apprentices can certify isolated circuits as safe for re-energisation.",
    options: [
      "True - after proper training",
      "False - apprentices must hand over responsibility to competent persons",
      "True - if supervised",
      "True - for minor faults only"
    ],
    correctAnswer: 1,
    explanation: "Apprentices cannot certify circuits as safe for re-energisation; this responsibility must be handed over to competent persons."
  },
  {
    id: 9,
    question: "In the housing estate example, what measures made the socket safe until repair?",
    options: [
      "Just switching off the circuit",
      "Circuit isolation, removing the faulty faceplate, and clear labelling",
      "Only removing the socket",
      "Covering the socket with tape"
    ],
    correctAnswer: 1,
    explanation: "Multiple safety measures were used: isolation at the consumer unit, physical removal of the faulty faceplate, and clear warning labelling."
  },
  {
    id: 10,
    question: "What went wrong in the commercial building example when a lighting circuit was left energised?",
    options: [
      "The lights didn't work properly",
      "No isolation or warning was applied, leading to a fire from overheating",
      "The circuit tripped too often",
      "The repair was too expensive"
    ],
    correctAnswer: 1,
    explanation: "The faulty circuit was left energised without isolation or warnings, allowing continued overheating that eventually caused a fire."
  }
];

// Inline Check Questions
const quickCheckQuestions = [
  {
    id: "why-must-not-energised",
    question: "Why must a faulty circuit never be left energised while awaiting repair?",
    options: [
      "It's not cost-effective",
      "Because faults can escalate into serious safety hazards including fires and electrocution",
      "It makes testing more difficult",
      "It's against company policy"
    ],
    correctIndex: 1,
    explanation: "Faulty circuits pose escalating safety risks that can lead to serious accidents if left energised."
  },
  {
    id: "warning-labels",
    question: "What should always be attached after isolating a circuit to prevent accidental use?",
    options: [
      "New test equipment",
      "Clear warning notices such as 'Do Not Use – Faulty Circuit'",
      "Replacement parts",
      "Additional protective devices"
    ],
    correctIndex: 1,
    explanation: "Warning labels are essential to prevent accidental re-energisation of faulty circuits."
  },
  {
    id: "temporary-measures",
    question: "Give one example of a temporary measure, apart from isolation, that can make a faulty accessory safe.",
    options: [
      "Replacing the entire installation",
      "Physically removing or covering the damaged accessory to prevent use",
      "Increasing the circuit protection",
      "Installing additional earthing"
    ],
    correctIndex: 1,
    explanation: "Physical removal or covering prevents anyone from attempting to use damaged accessories."
  },
  {
    id: "apprentice-limits",
    question: "Why is it important for apprentices to hand over responsibility after making safe?",
    options: [
      "To avoid doing too much work",
      "Because apprentices cannot certify permanent repairs or authorise re-energisation",
      "It's company procedure",
      "To share the workload"
    ],
    correctIndex: 1,
    explanation: "Apprentices must work within their competence limits and cannot certify permanent rectification."
  }
];

// FAQs
const faqs = [
  {
    question: "Why is temporary isolation important?",
    answer: "To prevent dangerous circuits from being energised until repairs are made."
  },
  {
    question: "What methods can be used to isolate circuits?",
    answer: "Switching off breakers, removing fuses, or using lockout kits."
  },
  {
    question: "Why must labels and warnings be used?",
    answer: "To ensure no one accidentally restores supply to a faulty circuit."
  },
  {
    question: "What should apprentices do after isolating a fault?",
    answer: "Report it immediately and hand over responsibility to a competent person."
  }
];

export default function Module7Section6_3() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.6.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Temporary Isolation or Making Safe
          </h1>
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Safe temporary isolation procedures and emergency measures when faults cannot be immediately repaired
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Isolate the faulty circuit at the distribution board immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Apply clear warning labels: "Do Not Use – Faulty Circuit"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Remove or cover damaged accessories to prevent use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Report immediately and hand over to competent person</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Circuits left live with faults, missing warning labels, no physical barriers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Lockout kits, clear warning notices, physical removal of damaged parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Circuit is dead, labels are visible, responsibility transferred, area secured</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Not every fault can be repaired immediately. In many cases, the priority is to ensure the installation is safe until permanent work can be completed. This may involve temporarily isolating a circuit, applying warning labels, or taking emergency measures to protect people from danger. Apprentices must learn that making safe is a professional duty — if a fault cannot be fixed straight away, it must never be left in service.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-4 sm:mb-6">By the end of this subsection, you should be able to:</p>
          
          <div className="bg-card border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <div className="grid gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Explain why temporary isolation or making safe is essential</span>
                  <span className="text-xs sm:text-sm text-white">Understand the critical safety importance of making installations safe</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Describe the steps involved in temporary isolation</span>
                  <span className="text-xs sm:text-sm text-white">Master isolation procedures, labelling, and lockout techniques</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Identify when these measures are appropriate</span>
                  <span className="text-xs sm:text-sm text-white">Recognise situations requiring immediate safety action</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Understand the limits of apprentice responsibility</span>
                  <span className="text-xs sm:text-sm text-white">Know when to escalate and transfer responsibility</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Content / Learning</h2>
          
          {/* Section 1 */}
          <div className="border-l-4 border-l-elec-yellow pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">1. The Principle of Making Safe</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                The priority when a dangerous fault is found is to prevent it from endangering people or property. If a circuit shows signs of overheating, arcing, or damaged insulation, it should not remain live. Temporary isolation means disconnecting the circuit at the distribution board, locking it off if possible, and clearly labelling it so no one restores it accidentally. This ensures the circuit cannot be energised until repairs are carried out.
              </p>
              
              <div className="text-white leading-relaxed space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Signs of Immediate Danger:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Overheating components (hot to touch, discolouration)</li>
                    <li>Arcing or sparking at connections</li>
                    <li>Burning smell or scorched materials</li>
                    <li>Circuit tripping under normal load</li>
                    <li>Damaged insulation or cable sheathing</li>
                    <li>Compromised enclosures or damaged accessories</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Immediate Actions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Isolate at the distribution board immediately</li>
                    <li>Prove dead if safe isolation procedures require</li>
                    <li>Apply clear, durable warning labels</li>
                    <li>Communicate the hazard to relevant persons</li>
                    <li>Control access to prevent inadvertent contact</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Core Principles:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Prevent energisation:</strong> Ensure faulty circuits cannot be switched back on</li>
                    <li><strong>Prevent contact:</strong> Remove or cover exposed live parts</li>
                    <li><strong>Prevent escalation:</strong> Stop faults from developing into serious incidents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inline Check 1 - Outside colored panel */}
          <div className="mt-4 mb-6 border border-white/10 rounded-lg p-4">
            <InlineCheck {...quickCheckQuestions[0]} />
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-l-green-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">2. Methods of Isolation and Labelling</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Isolation may involve switching off a protective device, removing a fuse, or locking off a breaker using a lockout kit. Whichever method is used, it must be obvious that the circuit is out of service. Clear warning notices such as "Do Not Use – Faulty Circuit" should be attached to the board or accessory. Where only part of an installation is faulty, electricians should isolate just the affected section, ensuring the rest of the installation remains usable and safe.
              </p>
              
              <div className="text-white leading-relaxed space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Isolation Methods:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>MCB/RCBO OFF + lockout:</strong> Switch off and apply lockout device with personal tag</li>
                    <li><strong>Fuse removal:</strong> Withdraw fuses completely, store safely, label holder</li>
                    <li><strong>Main switch isolation:</strong> For total isolation when required (partial vs complete)</li>
                    <li><strong>Industrial isolators:</strong> Padlock in OFF position using LOTO kit</li>
                    <li><strong>Plug removal:</strong> Appropriate for portable equipment where applicable</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Labelling Standards:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Wording:</strong> Clear, specific - "DO NOT USE - FAULTY CIRCUIT"</li>
                    <li><strong>Placement:</strong> Visible at distribution board AND point of use</li>
                    <li><strong>Durability:</strong> Weather-resistant, tear-proof materials</li>
                    <li><strong>Information:</strong> Contact details, date/time, reason for isolation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Partial Isolation Considerations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Clearly define boundaries of what remains live</li>
                    <li>Prove dead beyond the point of isolation</li>
                    <li>Document what circuits remain energised</li>
                    <li>Ensure adequate labels at all relevant points</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inline Check 2 - Outside colored panel */}
          <div className="mt-4 mb-6 border border-white/10 rounded-lg p-4">
            <InlineCheck {...quickCheckQuestions[1]} />
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-l-amber-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">3. Emergency Measures Beyond Isolation</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Sometimes, faults require additional temporary precautions. For example, if a damaged socket is overheating, the accessory should be physically removed or covered to prevent anyone using it. In industrial settings, barriers or restricted access may be needed if exposed live parts are present. These steps do not replace proper repairs but reduce immediate risk until a competent person can carry out permanent rectification.
              </p>
              
              <div className="text-white leading-relaxed space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Examples by Environment:</h4>
                  
                  <div className="mb-3">
                    <h5 className="font-medium text-white text-sm mb-1">Domestic:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs ml-2">
                      <li>Remove damaged socket faceplates completely</li>
                      <li>Blank off outlets with proper blanking plates</li>
                      <li>Use temporary barriers around damaged accessories</li>
                      <li>Secure loose cables in temporary containment</li>
                    </ul>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="font-medium text-white text-sm mb-1">Commercial/Industrial:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs ml-2">
                      <li>Cordon off affected areas with barrier tape</li>
                      <li>Erect physical barriers around exposed equipment</li>
                      <li>Apply temporary IP-rated covers to damaged enclosures</li>
                      <li>Position warning signage at all access points</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white text-sm mb-1">Wet/Dusty Environments:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs ml-2">
                      <li>Use appropriate IP-rated temporary covers</li>
                      <li>Ensure no exposed conductive parts remain</li>
                      <li>Consider environmental protection requirements</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-3 rounded border border-green-500/20">
                    <h5 className="font-medium text-green-400 text-sm mb-2">DO:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Remove or physically cover damaged items</li>
                      <li>Restrict access to affected areas</li>
                      <li>Escalate quickly to competent persons</li>
                      <li>Document all measures taken</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-red-500/20">
                    <h5 className="font-medium text-elec-yellow text-sm mb-2">DON'T:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Up-rate protective devices as a quick fix</li>
                      <li>Bypass safety devices or interlocks</li>
                      <li>Use tape over live parts without isolation</li>
                      <li>Leave exposed live conductors accessible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inline Check 3 - Outside colored panel */}
          <div className="mt-4 mb-6 border border-white/10 rounded-lg p-4">
            <InlineCheck {...quickCheckQuestions[2]} />
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-l-purple-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">4. Limits of Apprentice Responsibility</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Apprentices at Level 2 must understand their limits. You may be required to isolate a circuit under supervision and attach warning labels, but you cannot certify that a fault has been fully rectified. Making safe means preventing danger, not attempting unsupervised repairs beyond your competence. Once a fault is isolated or controlled, it must be reported and handed over to a supervisor or duty holder for permanent resolution.
              </p>
              
              <div className="text-white leading-relaxed space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-3 rounded border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">You CAN:</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Isolate circuits under supervision</li>
                      <li>Apply tags and warning labels correctly</li>
                      <li>Secure and cordon off unsafe areas</li>
                      <li>Record findings and report accurately</li>
                      <li>Assist with testing under supervision</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-red-500/20">
                    <h4 className="font-medium text-elec-yellow mb-2">You MUST NOT:</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Certify circuits as safe for re-energisation</li>
                      <li>Alter protective device ratings</li>
                      <li>Carry out unsupervised permanent repairs</li>
                      <li>Defeat interlocks or safety systems</li>
                      <li>Authorise work on live systems</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Handover Protocol:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Who to notify:</strong> Supervisor, duty holder, or designated competent person</li>
                    <li><strong>What to record:</strong> Nature of fault, measures taken, circuits isolated, labels applied</li>
                    <li><strong>What to leave in place:</strong> All isolation devices, warning labels, barriers</li>
                    <li><strong>When to follow up:</strong> Confirm receipt of handover, obtain acknowledgment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inline Check 4 - Outside colored panel */}
          <div className="mt-4 border border-white/10 rounded-lg p-4">
            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Practical Guidance</h2>
          <div className="grid gap-4 sm:gap-6">
            
            {/* Step-by-step Isolation Checklist */}
            <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">6-Step Isolation Checklist</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <p><strong>1. Identify:</strong> Accurately identify the circuit (labels, testing)</p>
                  <p><strong>2. Isolate:</strong> Switch off at correct protective device</p>
                  <p><strong>3. Lockout:</strong> Apply lockout device with personal tag</p>
                </div>
                <div className="space-y-2">
                  <p><strong>4. Prove Dead:</strong> Test your tester, test circuit, re-test your tester</p>
                  <p><strong>5. Control:</strong> Apply barriers, covers, restrict access</p>
                  <p><strong>6. Report:</strong> Document and handover to competent person</p>
                </div>
              </div>
            </div>

            {/* Documentation & Handover */}
            <div className="bg-card border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Documentation & Handover</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-white">
                <li>Record who you informed, exact time and date</li>
                <li>Note what was isolated and what remains live</li>
                <li>Document all labels applied and their locations</li>
                <li>Take photos if company policy allows</li>
                <li>Obtain written acknowledgment from supervisor</li>
              </ul>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-card border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Common Pitfalls to Avoid</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-white">
                <li><strong>Misidentified circuits:</strong> Always verify before isolation</li>
                <li><strong>Hidden backfeeds:</strong> Check for alternative supply paths</li>
                <li><strong>Shared neutrals:</strong> Consider multi-way switching</li>
                <li><strong>Re-energisation by others:</strong> Secure communication channels</li>
                <li><strong>Temporary covers not secured:</strong> Ensure weatherproof fixing</li>
              </ul>
            </div>

            {/* Communication Best Practice */}
            <div className="bg-card border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Communication & Signage</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white">
                <div>
                  <p className="font-medium text-white mb-1">Label Positioning:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Visible at distribution board</li>
                    <li>Clear at point of use</li>
                    <li>Posted at main entry points</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Essential Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Clear, specific wording</li>
                    <li>Contact details included</li>
                    <li>Weather-resistant materials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Re-energisation Checklist */}
            <div className="bg-card border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Re-energisation Pre-checks (For Supervisors)</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-white">
                <li>Repair completed and verified by competent person</li>
                <li>Inspection and testing results satisfactory</li>
                <li>All warning labels retrieved</li>
                <li>Barriers and temporary measures removed</li>
                <li>Documentation updated and closed out</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Real-World Applications</h2>
          <div className="grid gap-4 sm:gap-6">
            
            {/* Success Example 1 */}
            <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow" />
                Housing Estate Success
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                On a housing estate, a loose connection in a kitchen socket was identified during testing. The socket showed signs of overheating, but the repair team could not attend immediately. The electrician isolated the circuit at the consumer unit, removed the faulty socket faceplate, and placed a clear label stating "Do Not Use." When the repair team returned the next day, they carried out the repair safely without risk to occupants.
              </p>
              <div className="bg-elec-yellow/5 p-3 rounded">
                <p className="font-medium text-elec-yellow text-xs mb-1">What went well:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-white">
                  <li>Immediate isolation prevented escalation</li>
                  <li>Physical removal prevented accidental use</li>
                  <li>Clear labelling informed all users</li>
                  <li>Proper handover to repair team</li>
                </ul>
              </div>
            </div>

            {/* Failure Example 1 */}
            <div className="bg-card border border-red-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
                Commercial Building Failure
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                In a commercial building, a faulty lighting circuit was left energised despite repeated tripping. No isolation or warning was applied, and a fire later broke out due to overheating at a junction box. The incident report concluded that temporary isolation would have prevented the damage and associated costs.
              </p>
              <div className="bg-card p-3 rounded">
                <p className="font-medium text-elec-yellow text-xs mb-1">What went wrong:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-white">
                  <li>Circuit left live despite obvious fault</li>
                  <li>No warning labels or barriers applied</li>
                  <li>Fault allowed to escalate unchecked</li>
                  <li>Fire damage and business interruption costs</li>
                </ul>
              </div>
            </div>

            {/* Success Example 2 */}
            <div className="bg-card border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow" />
                Bathroom Extractor Fault Resolution
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                During a domestic inspection, moisture ingress was discovered in a bathroom extractor fan switch. The apprentice immediately isolated the lighting spur, removed the switch faceplate, and applied a blank plate with warning label. The area was cordoned off until a qualified electrician could install a new IP-rated switch the following day.
              </p>
              <div className="bg-elec-yellow/5 p-3 rounded">
                <p className="font-medium text-elec-yellow text-xs mb-1">Lessons learned:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-white">
                  <li>Quick action prevented electric shock risk</li>
                  <li>Proper IP rating essential in wet locations</li>
                  <li>Temporary blanking prevented accidental contact</li>
                  <li>Clear handover ensured continuity of safety</li>
                </ul>
              </div>
            </div>

            {/* Failure Example 2 */}
            <div className="bg-card border border-red-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
                Industrial Control Panel Interlock Bypass
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                In an industrial facility, a control panel door interlock was bypassed with tape to "temporarily" allow access while the door was removed for cleaning. The panel remained live and accessible for several hours until an employee received an electric shock. Emergency services were called and the site was shut down for investigation.
              </p>
              <div className="bg-card p-3 rounded">
                <p className="font-medium text-elec-yellow text-xs mb-1">Lessons learned:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-white">
                  <li>Never bypass safety interlocks or devices</li>
                  <li>Proper isolation and lockout required for maintenance</li>
                  <li>Safety systems must never be defeated</li>
                  <li>Emergency shutdown and investigation costs significant</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="grid gap-3 sm:gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-white/10 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">{faq.question}</h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="space-y-4">
            <div className="grid gap-2 text-sm text-white">
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Never leave faulty circuits energised - isolation is the first priority</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Follow proper isolation procedure: isolate, lock, label, prove dead where required</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Control the area through barriers, removal of damaged parts, and clear signage</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Use temporary measures to prevent contact or use of faulty equipment</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Know your limits - handover responsibility and document all actions taken</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Partial isolation is acceptable when correctly bounded and fully documented</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Never alter protective device ratings or bypass safety features as quick fixes</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Only competent supervisors can authorise re-energisation after proving repairs are complete</span>
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2 text-sm">If you only remember 3 things:</h3>
              <div className="space-y-1 text-sm text-white">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <strong>Make it safe</strong> - Isolate and secure immediately
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <strong>Label and communicate</strong> - Prevent accidental re-energisation
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  <strong>Handover to competent person</strong> - Know your limits
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Reporting Faults
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../6-4">
              Next: Section 6.4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}