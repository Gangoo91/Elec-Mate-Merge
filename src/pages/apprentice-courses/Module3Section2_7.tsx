import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Target,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  CheckSquare,
  Scissors,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "spare-capacity",
    question: "What is the recommended spare capacity to allow for future cables?",
    options: [
      "15-20%",
      "25-30%",
      "50%",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 and good practice recommend allowing 25-30% spare capacity in containment for future cable installations and modifications.",
  },
  {
    id: "cable-separation",
    question: "Name one way to separate power and data cables within the same trunking.",
    options: [
      "Use cable ties",
      "Use barriers or separate compartments",
      "Use different colours",
    ],
    correctIndex: 1,
    explanation:
      "Physical barriers or separate compartments prevent electromagnetic interference between power and data cables.",
  },
  {
    id: "entry-protection",
    question: "What should be fitted at containment entry points to protect cable insulation?",
    options: [
      "Insulation tape",
      "Grommets or bushes",
      "Paint",
    ],
    correctIndex: 1,
    explanation:
      "Grommets or bushes prevent sharp edges from damaging cable insulation at entry and exit points.",
  },
  {
    id: "overfilling-problems",
    question: "Why should installers avoid overfilling containment?",
    options: [
      "It increases voltage drop",
      "It causes overheating and makes cable pulling difficult",
      "It affects cable colour coding",
    ],
    correctIndex: 1,
    explanation:
      "Overfilled containment restricts airflow causing overheating, and makes future cable installation extremely difficult.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is good containment practice important?",
    options: [
      "It makes installation faster",
      "It improves safety, compliance, and appearance",
      "It reduces the need for cable testing",
      "It avoids the need for fixings",
    ],
    correctAnswer: 1,
    explanation:
      "Good containment practice ensures safety, regulatory compliance, professional appearance, and facilitates maintenance and future modifications.",
  },
  {
    id: 2,
    question: "What is the recommended spare capacity to allow for future cables?",
    options: [
      "5–10%",
      "15–20%",
      "25–30%",
      "50%",
    ],
    correctAnswer: 2,
    explanation:
      "Industry best practice and BS 7671 guidance recommend allowing 25-30% spare capacity for future cable installations and system expansion.",
  },
  {
    id: 3,
    question: "True or False: It is always acceptable to seal containment permanently.",
    options: [
      "True",
      "False",
    ],
    correctAnswer: 1,
    explanation:
      "False. Containment should remain accessible for inspection, testing, and maintenance unless specific safety requirements demand permanent sealing.",
  },
  {
    id: 4,
    question: "Name one way to separate power and data cables within the same trunking.",
    options: [
      "Use cable ties",
      "Use barriers or separate compartments",
      "Paint cables different colours",
      "Use longer cables",
    ],
    correctAnswer: 1,
    explanation:
      "Physical barriers or separate compartments provide the electromagnetic separation required between power and data cables.",
  },
  {
    id: 5,
    question: "What should be fitted at containment entry points to protect cable insulation?",
    options: [
      "Insulation tape",
      "Grommets or bushes",
      "Paint",
      "Adhesive pads",
    ],
    correctAnswer: 1,
    explanation:
      "Grommets or bushes prevent sharp metal edges from cutting or abrading cable insulation during installation and service.",
  },
  {
    id: 6,
    question: "Why should installers avoid overfilling containment?",
    options: [
      "It increases voltage drop",
      "It causes overheating and makes cable pulling difficult",
      "It makes the installation heavier",
      "It affects cable colour coding",
    ],
    correctAnswer: 1,
    explanation:
      "Overfilled containment restricts heat dissipation leading to overheating, and makes future cable installation very difficult or impossible.",
  },
  {
    id: 7,
    question: "Give one reason why straight, level runs are preferred.",
    options: [
      "They use less material",
      "They improve appearance and make maintenance easier",
      "They are faster to install",
      "They require fewer fixings",
    ],
    correctAnswer: 1,
    explanation:
      "Straight, level runs provide a professional appearance and make future maintenance, inspection, and cable pulling much easier.",
  },
  {
    id: 8,
    question: "Which regulation governs best practice for containment in the UK?",
    options: [
      "BS 5839",
      "BS 7671 (IET Wiring Regulations)",
      "BS 6701",
      "BS EN 50085",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) provides the regulatory framework for electrical installation practices including containment systems.",
  },
];

const Module3Section2_7: React.FC = () => {
  console.log("Module3Section2_7 component loaded");
  
  useSEO(
    "Good Practice for Installing Containment – Module 3 (3.2.7)",
    "Best practices for containment installation. Planning, alignment, separation, accessibility and future-proofing for professional installations."
  );

  const faqs = [
    {
      q: "Is it acceptable to run containment diagonally to save time?",
      a: "Only if it's unavoidable — straight, level runs are preferred for aesthetics, professional appearance and ease of maintenance access.",
    },
    {
      q: "How can I protect cables from sharp metal edges?",
      a: "Use protective grommets, bushes, or smooth edging strips at all entry and exit points to prevent cable insulation damage.",
    },
    {
      q: "Should containment always be accessible?",
      a: "Yes, unless specific safety requirements demand sealing (e.g., fire-rated enclosures). Accessibility is essential for maintenance and testing.",
    },
    {
      q: "How do I plan for future cable additions?",
      a: "Allow 25-30% spare capacity, use oversized containment, and plan logical routes that can accommodate expansion without major disruption.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.2.7
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Good Practice for Installing Containment
          </h1>
          <p className="text-white">
            Professional installation techniques ensuring safety, compliance, accessibility and future-proofing for electrical containment systems.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Quality installation: Reflects safety, compliance and professional competence.</li>
                <li>Planning first: Assess routes, avoid conflicts, plan for future expansion.</li>
                <li>Professional finish: Straight runs, consistent spacing, proper alignment.</li>
                <li>Future-proofing: 25-30% spare capacity, accessible design, maintainable systems.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Neat, level containment with consistent spacing and proper protection.
                </li>
                <li>
                  <strong>Use:</strong> Plan routes, separate cable types, allow spare capacity, ensure access.
                </li>
                <li>
                  <strong>Check:</strong> Alignment, spacing, protection, separation, future accessibility.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Explain why good containment practice is important for safety, compliance and professional standards.</li>
            <li>Apply correct spacing, alignment, and routing techniques for professional installation quality.</li>
            <li>Identify methods for separating and protecting different cable types within containment systems.</li>
            <li>Recognise the importance of future-proofing in containment design and capacity planning.</li>
            <li>Implement accessibility and maintenance considerations in containment layout and design.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Planning and Design */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Planning and Design Principles
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Pre-Installation Planning</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Site Assessment</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Survey building structure and existing services</li>
                        <li>Identify potential conflicts with other trades</li>
                        <li>Assess environmental conditions and constraints</li>
                        <li>Coordinate with architectural and MEP drawings</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Route Planning</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Establish logical cable routes minimising length</li>
                        <li>Avoid areas prone to damage or access difficulties</li>
                        <li>Plan for thermal considerations and heat sources</li>
                        <li>Consider future building modifications and expansion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Capacity and Future-Proofing</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-200 mb-1">Spare Capacity Planning</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Allow 25-30% spare capacity for future cables</li>
                        <li>Consider growth in data and communication requirements</li>
                        <li>Plan for technology upgrades and system changes</li>
                        <li>Document capacity allocation for future reference</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Expansion Considerations</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Design modular systems allowing easy extension</li>
                        <li>Position junction points for future branch circuits</li>
                        <li>Avoid permanent sealing except where required</li>
                        <li>Maintain clear documentation of installation layout</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* What this means on site */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> What this means on site
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-orange-200 mb-2">Professional installation standards</p>
                <ul className="list-disc pl-4 space-y-1 text-orange-200">
                  <li>Quality reflects competency - poor containment indicates poor electrical work</li>
                  <li>Client confidence increases with neat, well-organised installations</li>
                  <li>Inspection passes more easily when work appears professional and considered</li>
                  <li>Future maintenance costs reduced through good access and documentation</li>
                  <li>Warranty claims minimised through quality installation practices</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium text-cyan-200 mb-2">Coordination with other trades</p>
                <ul className="list-disc pl-4 space-y-1 text-cyan-200">
                  <li>Plumbing: Avoid conflicts and maintain clearances from water services</li>
                  <li>HVAC: Consider thermal effects and maintain access to ductwork</li>
                  <li>IT/Data: Plan segregation and coordinate cable routing requirements</li>
                  <li>Fire systems: Ensure containment doesn't compromise fire safety systems</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Installation Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Installation Techniques and Quality Standards
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <p className="font-medium text-elec-yellow mb-2">Alignment and spacing standards</p>
                <ul className="list-disc pl-4 space-y-1 text-elec-yellow">
                  <li><strong>Straight runs:</strong> Use string lines and levels for accurate alignment</li>
                  <li><strong>Consistent spacing:</strong> Follow manufacturer and BS 7671 recommendations</li>
                  <li><strong>Smooth bends:</strong> Maintain minimum bend radius to prevent cable damage</li>
                  <li><strong>Level installation:</strong> ±2mm tolerance over 3m for professional appearance</li>
                  <li><strong>Parallel runs:</strong> Maintain consistent separation between multiple systems</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
                <p className="font-medium text-violet-200 mb-2">Cable separation and protection</p>
                <ul className="list-disc pl-4 space-y-1 text-violet-200">
                  <li><strong>Power/data separation:</strong> Use barriers or separate compartments</li>
                  <li><strong>Minimum distances:</strong> 50mm separation or screened cables where required</li>
                  <li><strong>Entry/exit protection:</strong> Grommets and bushes at all sharp edges</li>
                  <li><strong>Support spacing:</strong> Prevent cable stress and maintain insulation integrity</li>
                  <li><strong>Environmental protection:</strong> Select appropriate materials for conditions</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-indigo-200 mb-2">Accessibility and maintenance</p>
                <ul className="list-disc pl-4 space-y-1 text-indigo-200">
                  <li>Install containment to allow easy cable access for inspection and testing</li>
                  <li>Provide adequate working space around junction boxes and terminations</li>
                  <li>Position access covers for convenient maintenance without disruption</li>
                  <li>Avoid routing through inaccessible areas unless absolutely necessary</li>
                  <li>Document cable routes and containment specifications for future reference</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Common Mistakes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes to Avoid
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-red-200 mb-2">Planning and design failures</p>
                <ul className="list-disc pl-4 space-y-1 text-red-200">
                  <li><strong>Inadequate capacity planning:</strong> Sizing containment too small for future needs</li>
                  <li><strong>Poor route selection:</strong> Creating unnecessarily long or difficult cable runs</li>
                  <li><strong>Ignoring other trades:</strong> Creating conflicts requiring expensive rectification</li>
                  <li><strong>No expansion provision:</strong> Making future modifications difficult or impossible</li>
                  <li><strong>Inadequate documentation:</strong> Leaving no record of installation details</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium text-amber-200 mb-2">Installation quality issues</p>
                <ul className="list-disc pl-4 space-y-1 text-amber-200">
                  <li><strong>Poor alignment:</strong> Crooked or sagging containment creating unprofessional appearance</li>
                  <li><strong>Incorrect spacing:</strong> Inadequate support leading to stress and potential failure</li>
                  <li><strong>Missing protection:</strong> Sharp edges damaging cables during installation or service</li>
                  <li><strong>Overfilling containment:</strong> Restricting heat dissipation and making additions impossible</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />
          <Separator className="my-6" />

          {/* BS 7671 Context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> BS 7671 and Standards Context
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-blue-200 mb-2">Regulatory requirements</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li><strong>Section 521:</strong> Selection and erection of wiring systems</li>
                  <li><strong>521.10:</strong> Cable support and spacing requirements</li>
                  <li><strong>528:</strong> Proximity of wiring systems to other services</li>
                  <li><strong>527:</strong> Current-carrying capacity and cable grouping factors</li>
                  <li><strong>543:</strong> Protective conductor requirements and earthing</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-200 mb-2">Professional standards and best practice</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Quality workmanship reflects professional competency and attention to detail</li>
                  <li>Compliance demonstrates understanding of safety and regulatory requirements</li>
                  <li>Future-proofing shows consideration for client needs and system evolution</li>
                  <li>Documentation enables effective maintenance and modification planning</li>
                  <li>Coordination with other trades demonstrates professional collaboration</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-purple-200 mb-2">Inspection and testing considerations</p>
                <ul className="list-disc pl-4 space-y-1 text-purple-200">
                  <li>Visual inspection easier when installation is neat and well-organised</li>
                  <li>Testing access provided through removable covers and accessible routing</li>
                  <li>Cable identification simplified through logical grouping and labelling</li>
                  <li>Fault finding facilitated by clear documentation and accessible layout</li>
                  <li>Periodic inspection requirements met through maintainable design</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <h3 className="font-medium text-slate-200 mb-2">Office fit-out capacity planning failure</h3>
            <p className="text-slate-200 text-sm mb-3">
              In a large office fit-out, the initial installation used trunking that was filled to maximum 
              capacity on day one. Six months later, adding new data cabling required an expensive and 
              disruptive full replacement of the trunking system.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-slate-200 mb-2">Original installation problems</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>Trunking sized exactly for initial cable count</li>
                  <li>No consideration for future expansion requirements</li>
                  <li>Cables at 100% fill capacity restricting heat dissipation</li>
                  <li>Modification required complete system replacement</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-200 mb-2">Improved approach on next project</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>30% spare capacity allowed for future installations</li>
                  <li>Modular design enabling easy system extension</li>
                  <li>Quick, inexpensive additions without disruption</li>
                  <li>Client confidence increased through forward planning</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow/50 pl-4">
                <p className="font-medium text-white mb-1">Q: {faq.q}</p>
                <p className="text-white text-sm">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-3 text-xs sm:text-sm text-white">
            <p>
              <strong>Good containment practice</strong> ensures safety, compliance, and professional quality in electrical installations.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Planning</strong> prevents conflicts, ensures adequate capacity and enables future modifications</li>
              <li><strong>Quality installation</strong> reflects professional competency and facilitates inspection and maintenance</li>
              <li><strong>Cable separation</strong> prevents interference and ensures system reliability and performance</li>
              <li><strong>Future-proofing</strong> with 25-30% spare capacity avoids expensive system replacements</li>
              <li><strong>Accessibility</strong> design enables effective testing, maintenance and fault finding</li>
            </ul>
            <p>
              Professional containment installation stands the test of time, providing safe, compliant and 
              maintainable electrical systems that meet both current needs and future requirements.
            </p>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-200 mb-3">✓ DO</h3>
              <ul className="space-y-2 text-green-200">
                <li>• Plan cable routes and assess site constraints before starting</li>
                <li>• Allow 25-30% spare capacity for future cable additions</li>
                <li>• Maintain straight, level runs with consistent spacing</li>
                <li>• Separate power and data cables using barriers or compartments</li>
                <li>• Install grommets and bushes at all entry/exit points</li>
                <li>• Coordinate with other trades to avoid conflicts</li>
                <li>• Document installation details for future reference</li>
                <li>• Design for accessibility and future maintenance</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-red-200 mb-3">✗ DON'T</h3>
              <ul className="space-y-2 text-red-200">
                <li>• Size containment exactly for initial cable requirements</li>
                <li>• Install crooked or poorly aligned containment runs</li>
                <li>• Overfill containment beyond recommended capacity</li>
                <li>• Mix power and data cables without proper separation</li>
                <li>• Leave sharp edges unprotected where cables pass through</li>
                <li>• Block access to terminations and junction boxes</li>
                <li>• Ignore coordination with other building services</li>
                <li>• Rush installation without proper planning and measurement</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Card: Good Practice Installation Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg p-3 border border-border/30">
              <h4 className="font-medium text-blue-200 mb-2">Planning Essentials</h4>
              <ul className="space-y-1 text-blue-200">
                <li>• Survey site and existing services</li>
                <li>• Plan logical cable routes</li>
                <li>• Allow 25-30% spare capacity</li>
                <li>• Coordinate with other trades</li>
                <li>• Consider future expansion needs</li>
                <li>• Document installation details</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-green-400/30">
              <h4 className="font-medium text-green-200 mb-2">Installation Quality</h4>
              <ul className="space-y-1 text-green-200">
                <li>• Straight, level alignment (±2mm/3m)</li>
                <li>• Consistent support spacing</li>
                <li>• Separate power/data cables</li>
                <li>• Protect at entry/exit points</li>
                <li>• Ensure accessibility for maintenance</li>
                <li>• Professional appearance throughout</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <p className="text-yellow-200 text-xs">
              <strong>Quality checklist:</strong> Plan first, straight runs, 25-30% spare capacity, 
              separate power/data, protect edges, ensure access. Quality reflects competency!
            </p>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key References</h2>
          <div className="space-y-2 text-xs sm:text-sm text-white">
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS 7671:2018+A2:2022</span>
              <span className="text-white">IET Wiring Regulations (Section 521, 527, 528)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 61537:2006</span>
              <span className="text-white">Cable management systems</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 50085:2005</span>
              <span className="text-white">Cable trunking and ducting systems</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>IET Code of Practice</span>
              <span className="text-white">Electrical installation work best practices</span>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="p-6 bg-transparent border-white/20">
          <Quiz title="Test Your Knowledge: Good Practice for Installing Containment" questions={quizQuestions} />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_7;