import { ArrowLeft, ArrowRight, CheckSquare, AlertTriangle, Shield, Building, Target, Settings, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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
      "5-10%",
      "15-20%",
      "25-30%",
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

const Module3Section2_7 = () => {
  useSEO(
    "Good Practice for Installing Containment | Level 2 Electrical",
    "Best practices for containment installation. Planning, alignment, separation, accessibility and future-proofing for professional installations."
  );

  const faqs = [
    {
      q: "Is it acceptable to run containment diagonally to save time?",
      a: "Only if it's unavoidable - straight, level runs are preferred for aesthetics, professional appearance and ease of maintenance access.",
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
              Back to Section 3.2
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 3</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.2.7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Good Practice for Installing Containment
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Professional installation techniques ensuring safety, compliance, accessibility and future-proofing for electrical containment systems.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Quality installation: Reflects safety, compliance and professional competence.</li>
                  <li>Planning first: Assess routes, avoid conflicts, plan for future expansion.</li>
                  <li>Professional finish: Straight runs, consistent spacing, proper alignment.</li>
                  <li>Future-proofing: 25-30% spare capacity, accessible design, maintainable systems.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Neat, level containment with consistent spacing and proper protection.</li>
                  <li><strong>Use:</strong> Plan routes, separate cable types, allow spare capacity, ensure access.</li>
                  <li><strong>Check:</strong> Alignment, spacing, protection, separation, future accessibility.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/90">
              <li>Explain why good containment practice is important for safety, compliance and professional standards.</li>
              <li>Apply correct spacing, alignment, and routing techniques for professional installation quality.</li>
              <li>Identify methods for separating and protecting different cable types within containment systems.</li>
              <li>Recognise the importance of future-proofing in containment design and capacity planning.</li>
              <li>Implement accessibility and maintenance considerations in containment layout and design.</li>
            </ul>
          </section>

          {/* Planning and Design */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Planning and Design Principles
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-3">Pre-Installation Planning</p>
                  <div className="space-y-3 text-sm text-white/90">
                    <div>
                      <p className="font-medium text-elec-yellow mb-1">Site Assessment</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Survey building structure and existing services</li>
                        <li>Identify potential conflicts with other trades</li>
                        <li>Assess environmental conditions and constraints</li>
                        <li>Coordinate with architectural and MEP drawings</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-elec-yellow mb-1">Route Planning</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Establish logical cable routes minimising length</li>
                        <li>Avoid areas prone to damage or access difficulties</li>
                        <li>Plan for thermal considerations and heat sources</li>
                        <li>Consider future building modifications and expansion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-white/5 border border-green-400/30">
                  <p className="font-semibold text-white mb-3">Capacity and Future-Proofing</p>
                  <div className="space-y-3 text-sm text-white/90">
                    <div>
                      <p className="font-medium text-green-300 mb-1">Spare Capacity Planning</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Allow 25-30% spare capacity for future cables</li>
                        <li>Consider growth in data and communication requirements</li>
                        <li>Plan for technology upgrades and system changes</li>
                        <li>Document capacity allocation for future reference</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-300 mb-1">Expansion Considerations</p>
                      <ul className="list-disc pl-5 space-y-1">
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

          <div className="mb-10">
            <InlineCheck {...quickCheckQuestions[0]} />
          </div>

          {/* What This Means On Site */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              What This Means On Site
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Professional installation standards</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li>Quality reflects competency - poor containment indicates poor electrical work</li>
                  <li>Client confidence increases with neat, well-organised installations</li>
                  <li>Inspection passes more easily when work appears professional and considered</li>
                  <li>Future maintenance costs reduced through good access and documentation</li>
                  <li>Warranty claims minimised through quality installation practices</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-white/5 border border-cyan-400/30">
                <p className="font-medium text-cyan-300 mb-2">Coordination with other trades</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li>Plumbing: Avoid conflicts and maintain clearances from water services</li>
                  <li>HVAC: Consider thermal effects and maintain access to ductwork</li>
                  <li>IT/Data: Plan segregation and coordinate cable routing requirements</li>
                  <li>Fire systems: Ensure containment doesn't compromise fire safety systems</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickCheckQuestions[1]} />
          </div>

          {/* Installation Techniques */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Installation Techniques and Quality Standards
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Alignment and spacing standards</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li><strong>Straight runs:</strong> Use string lines and levels for accurate alignment</li>
                  <li><strong>Consistent spacing:</strong> Follow manufacturer and BS 7671 recommendations</li>
                  <li><strong>Smooth bends:</strong> Maintain minimum bend radius to prevent cable damage</li>
                  <li><strong>Level installation:</strong> +/-2mm tolerance over 3m for professional appearance</li>
                  <li><strong>Parallel runs:</strong> Maintain consistent separation between multiple systems</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
                <p className="font-semibold text-violet-200 mb-2">Cable separation and protection</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-violet-200">
                  <li><strong>Power/data separation:</strong> Use barriers or separate compartments</li>
                  <li><strong>Minimum distances:</strong> 50mm separation or screened cables where required</li>
                  <li><strong>Entry/exit protection:</strong> Grommets and bushes at all sharp edges</li>
                  <li><strong>Support spacing:</strong> Prevent cable stress and maintain insulation integrity</li>
                  <li><strong>Environmental protection:</strong> Select appropriate materials for conditions</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-semibold text-indigo-200 mb-2">Accessibility and maintenance</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-indigo-200">
                  <li>Install containment to allow easy cable access for inspection and testing</li>
                  <li>Provide adequate working space around junction boxes and terminations</li>
                  <li>Position access covers for convenient maintenance without disruption</li>
                  <li>Avoid routing through inaccessible areas unless absolutely necessary</li>
                  <li>Document cable routes and containment specifications for future reference</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickCheckQuestions[2]} />
          </div>

          {/* Common Mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Planning and design failures</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li><strong>Inadequate capacity planning:</strong> Sizing containment too small for future needs</li>
                  <li><strong>Poor route selection:</strong> Creating unnecessarily long or difficult cable runs</li>
                  <li><strong>Ignoring other trades:</strong> Creating conflicts requiring expensive rectification</li>
                  <li><strong>No expansion provision:</strong> Making future modifications difficult or impossible</li>
                  <li><strong>Inadequate documentation:</strong> Leaving no record of installation details</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-white/5 border border-amber-400/30">
                <p className="font-medium text-amber-300 mb-2">Installation quality issues</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li><strong>Poor alignment:</strong> Crooked or sagging containment creating unprofessional appearance</li>
                  <li><strong>Incorrect spacing:</strong> Inadequate support leading to stress and potential failure</li>
                  <li><strong>Missing protection:</strong> Sharp edges damaging cables during installation or service</li>
                  <li><strong>Overfilling containment:</strong> Restricting heat dissipation and making additions impossible</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickCheckQuestions[3]} />
          </div>

          {/* BS 7671 Context */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              BS 7671 and Standards Context
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Regulatory requirements</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li><strong>Section 521:</strong> Selection and erection of wiring systems</li>
                  <li><strong>521.10:</strong> Cable support and spacing requirements</li>
                  <li><strong>528:</strong> Proximity of wiring systems to other services</li>
                  <li><strong>527:</strong> Current-carrying capacity and cable grouping factors</li>
                  <li><strong>543:</strong> Protective conductor requirements and earthing</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-white/5 border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Professional standards and best practice</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li>Quality workmanship reflects professional competency and attention to detail</li>
                  <li>Compliance demonstrates understanding of safety and regulatory requirements</li>
                  <li>Future-proofing shows consideration for client needs and system evolution</li>
                  <li>Documentation enables effective maintenance and modification planning</li>
                  <li>Coordination with other trades demonstrates professional collaboration</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Inspection and testing considerations</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                  <li>Visual inspection easier when installation is neat and well-organised</li>
                  <li>Testing access provided through removable covers and accessible routing</li>
                  <li>Cable identification simplified through logical grouping and labelling</li>
                  <li>Fault finding facilitated by clear documentation and accessible layout</li>
                  <li>Periodic inspection requirements met through maintainable design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-world Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-world Scenario
            </h2>
            <div className="rounded-lg p-4 bg-white/5 border border-slate-400/30">
              <h3 className="font-medium text-white mb-2">Office fit-out capacity planning failure</h3>
              <p className="text-sm text-white/80 mb-3">
                In a large office fit-out, the initial installation used trunking that was filled to maximum
                capacity on day one. Six months later, adding new data cabling required an expensive and
                disruptive full replacement of the trunking system.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Original installation problems</p>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>Trunking sized exactly for initial cable count</li>
                    <li>No consideration for future expansion requirements</li>
                    <li>Cables at 100% fill capacity restricting heat dissipation</li>
                    <li>Modification required complete system replacement</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Improved approach on next project</p>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>30% spare capacity allowed for future installations</li>
                    <li>Modular design enabling easy system extension</li>
                    <li>Quick, inexpensive additions without disruption</li>
                    <li>Client confidence increased through forward planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-1">Q: {faq.q}</p>
                  <p className="text-sm text-white/80">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <div className="space-y-3 text-sm text-white/90">
                <p>
                  <strong>Good containment practice</strong> ensures safety, compliance, and professional quality in electrical installations.
                </p>
                <ul className="list-disc pl-5 space-y-1">
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
            </div>
          </section>

          {/* Apprentice Do's and Don'ts */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Apprentice Do's and Don'ts
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg p-4 bg-white/5 border border-green-400/30">
                <h3 className="font-medium text-green-300 mb-3">DO</h3>
                <ul className="space-y-2 text-white/90">
                  <li>- Plan cable routes and assess site constraints before starting</li>
                  <li>- Allow 25-30% spare capacity for future cable additions</li>
                  <li>- Maintain straight, level runs with consistent spacing</li>
                  <li>- Separate power and data cables using barriers or compartments</li>
                  <li>- Install grommets and bushes at all entry/exit points</li>
                  <li>- Coordinate with other trades to avoid conflicts</li>
                  <li>- Document installation details for future reference</li>
                  <li>- Design for accessibility and future maintenance</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-red-400/30">
                <h3 className="font-medium text-red-300 mb-3">DON'T</h3>
                <ul className="space-y-2 text-white/90">
                  <li>- Size containment exactly for initial cable requirements</li>
                  <li>- Install crooked or poorly aligned containment runs</li>
                  <li>- Overfill containment beyond recommended capacity</li>
                  <li>- Mix power and data cables without proper separation</li>
                  <li>- Leave sharp edges unprotected where cables pass through</li>
                  <li>- Block access to terminations and junction boxes</li>
                  <li>- Ignore coordination with other building services</li>
                  <li>- Rush installation without proper planning and measurement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pocket Card */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Pocket Card: Good Practice Installation Quick Reference
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Planning Essentials</h4>
                <ul className="space-y-1 text-white/80">
                  <li>- Survey site and existing services</li>
                  <li>- Plan logical cable routes</li>
                  <li>- Allow 25-30% spare capacity</li>
                  <li>- Coordinate with other trades</li>
                  <li>- Consider future expansion needs</li>
                  <li>- Document installation details</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 bg-white/5 border border-green-400/30">
                <h4 className="font-medium text-green-300 mb-2">Installation Quality</h4>
                <ul className="space-y-1 text-white/80">
                  <li>- Straight, level alignment (+/-2mm/3m)</li>
                  <li>- Consistent support spacing</li>
                  <li>- Separate power/data cables</li>
                  <li>- Protect at entry/exit points</li>
                  <li>- Ensure accessibility for maintenance</li>
                  <li>- Professional appearance throughout</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-yellow-200 text-xs">
                <strong>Quality checklist:</strong> Plan first, straight runs, 25-30% spare capacity,
                separate power/data, protect edges, ensure access. Quality reflects competency!
              </p>
            </div>
          </section>

          {/* Key References */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Key References
            </h2>
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded bg-white/5 gap-1">
                <span className="font-medium">BS 7671:2018+A2:2022</span>
                <span className="text-white/70">IET Wiring Regulations (Section 521, 527, 528)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded bg-white/5 gap-1">
                <span className="font-medium">BS EN 61537:2006</span>
                <span className="text-white/70">Cable management systems</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded bg-white/5 gap-1">
                <span className="font-medium">BS EN 50085:2005</span>
                <span className="text-white/70">Cable trunking and ducting systems</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded bg-white/5 gap-1">
                <span className="font-medium">IET Code of Practice</span>
                <span className="text-white/70">Electrical installation work best practices</span>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test Your Knowledge</h2>
            <Quiz title="Good Practice for Installing Containment" questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Fixings, Clips and Cable Ties
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 3.2
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module3Section2_7;
