import { ArrowLeft, ShieldAlert, CheckCircle, AlertTriangle, Phone, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "reg5-requirement",
    question:
      "Under CSR 1997 Regulation 5, when must emergency arrangements be in place?",
    options: [
      "Within 24 hours of starting work in a confined space",
      "Before anyone enters a confined space",
      "Only when the risk assessment identifies a high-risk space",
      "After the first person has entered and assessed the space",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 5 of the Confined Spaces Regulations 1997 is absolute: suitable and sufficient emergency arrangements MUST be in place BEFORE anyone enters a confined space. There is no exception to this requirement. Entry without a rescue plan is a breach of the law, regardless of how low-risk the space may appear.",
  },
  {
    id: "rescuer-casualties",
    question:
      "What percentage of confined space fatalities are rescuers who entered without proper planning?",
    options: [
      "Around 20%",
      "Around 40%",
      "Around 60%",
      "Around 80%",
    ],
    correctIndex: 2,
    explanation:
      "Approximately 60% of confined space deaths are would-be rescuers. This is one of the most critical statistics in confined space safety. When a colleague collapses in a confined space, the natural instinct is to rush in and help. Without proper planning, training, and equipment, the rescuer is exposed to the same hazard that incapacitated the original casualty. The emergency plan exists to prevent rescuers becoming casualties.",
  },
  {
    id: "fire-service-reliance",
    question:
      "Why should you NOT rely solely on the fire service for confined space rescue?",
    options: [
      "The fire service does not carry confined space equipment",
      "The fire service response may take 15+ minutes, but the casualty may only have minutes",
      "The fire service will refuse to enter a confined space",
      "Confined space rescue is not part of the fire service's responsibilities",
    ],
    correctIndex: 1,
    explanation:
      "While you should always call 999 in an emergency, you must NOT rely on the fire service arriving in time for rescue. Their response time may be 15 minutes or more, but a casualty in a toxic or oxygen-deficient atmosphere may have only minutes before irreversible harm or death. This is why on-site rescue capability by a trained team is essential as the primary rescue method.",
  },
];

const faqs = [
  {
    question:
      "Does every confined space entry need a full written emergency plan?",
    answer:
      "Yes. Regulation 5 of the Confined Spaces Regulations 1997 requires suitable and sufficient arrangements for the rescue of persons in the event of an emergency. For every confined space entry, there must be a written emergency plan that is specific to that space and the work being carried out. A generic plan is not sufficient -- it must address the foreseeable emergencies for that particular space, the specific rescue methods and equipment required, and the personnel available. The plan must be accessible at the entry point and briefed to all personnel before entry begins.",
  },
  {
    question:
      "How often should confined space rescue teams practise their skills?",
    answer:
      "Rescue teams should practise at least annually as a minimum, but ideally quarterly. Practice sessions should be realistic, using the actual equipment that would be deployed in a real emergency and, where possible, conducted in or near the actual confined spaces the team may be called to. Each practice should be timed, documented, and followed by a debrief to identify lessons learned and areas for improvement. Team members must also maintain their individual competencies through regular training in first aid, use of breathing apparatus, casualty handling, and communication procedures.",
  },
  {
    question:
      "What should happen if the emergency plan identifies that on-site rescue is not feasible?",
    answer:
      "If the emergency plan identifies that on-site rescue is not feasible for a particular space -- for example, because the space is too deep, too narrow, or the rescue would require specialist equipment not available on site -- then the work must not proceed until adequate rescue arrangements are in place. This may mean hiring specialist rescue equipment, engaging a professional confined space rescue team to be on standby, or redesigning the work to avoid entry altogether. The key principle is that you must never enter a confined space without a viable rescue plan. If rescue is not achievable, entry is not permissible.",
  },
  {
    question:
      "Who is responsible for ensuring the emergency plan is in place?",
    answer:
      "The employer has the primary legal duty to ensure that suitable and sufficient emergency arrangements are in place before any of their employees enter a confined space. In practice, this responsibility is often delegated to a competent supervisor or confined space entry coordinator who prepares and manages the emergency plan. However, every person involved in the entry -- including the entrant, the top person (attendant), and the rescue team -- has a personal responsibility to check that the emergency plan exists, that they have been briefed on it, and that they understand their role. If any person is not satisfied that adequate emergency arrangements are in place, they should refuse to proceed with the entry.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Confined Spaces Regulations 1997, Regulation 5 requires that emergency arrangements must be:",
    options: [
      "Suitable and sufficient, in place before entry",
      "Adequate and reasonable, agreed within 24 hours of entry",
      "Available if requested by the entrant",
      "Prepared by the emergency services before entry",
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 5 requires that suitable and sufficient arrangements for rescue must be in place BEFORE anyone enters a confined space. This is an absolute requirement with no exceptions. The arrangements must cover all foreseeable emergencies specific to that space and that work activity.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT typically a foreseeable emergency that should be included in a confined space emergency plan?",
    options: [
      "Sudden atmospheric change (toxic gas release or oxygen depletion)",
      "A colleague arriving late for their shift",
      "Flooding or ingress of liquids into the space",
      "Equipment failure or structural collapse within the space",
    ],
    correctAnswer: 1,
    explanation:
      "A colleague arriving late is a staffing issue, not a foreseeable confined space emergency. The emergency plan must address hazards such as atmospheric change, injury or illness of the entrant, flooding, fire, equipment failure, and structural collapse -- all of which could directly endanger the life of the person inside the space.",
  },
  {
    id: 3,
    question:
      "Why is it critical that rescuers do NOT simply rush into a confined space when a colleague collapses?",
    options: [
      "It is against company policy to rush anywhere on site",
      "The rescuer will be exposed to the same hazard that incapacitated the casualty and may also become a casualty",
      "The collapsed person is probably fine and does not need immediate help",
      "Rushing into the space will damage the rescue equipment",
    ],
    correctAnswer: 1,
    explanation:
      "Around 60% of confined space deaths are rescuers who entered without proper planning or equipment. If a person collapses in a confined space due to a toxic atmosphere or oxygen deficiency, anyone entering that same space without breathing apparatus will be exposed to the identical hazard. Unplanned rescue attempts result in multiple fatalities. The emergency plan ensures rescuers are protected before they enter.",
  },
  {
    id: 4,
    question:
      "What is the PRIMARY rescue method that should be relied upon for a confined space emergency?",
    options: [
      "Calling 999 and waiting for the fire service to arrive",
      "Asking any available workers to help pull the casualty out",
      "On-site rescue by a trained, equipped rescue team already present",
      "Lowering food and water to the casualty until professional help arrives",
    ],
    correctAnswer: 2,
    explanation:
      "The primary rescue method must be on-site rescue by a trained and equipped team. While 999 should always be called, the fire service response may take 15 minutes or more. In a toxic or oxygen-deficient atmosphere, the casualty may only have minutes. An on-site rescue team that is trained, practised, and familiar with the specific space and equipment provides the fastest and most effective rescue capability.",
  },
  {
    id: 5,
    question:
      "Which of the following is a requirement for members of a confined space rescue team?",
    options: [
      "They must hold a university degree in emergency management",
      "They must be trained in confined space rescue, physically fit, and practise regularly",
      "They must be employed by the fire service or ambulance service",
      "They must have at least 10 years of construction experience",
    ],
    correctAnswer: 1,
    explanation:
      "Rescue team members must be trained specifically in confined space rescue techniques, physically fit enough to carry out rescue operations (which are physically demanding), and they must practise regularly -- at least annually, ideally quarterly. They must also be familiar with the specific spaces and equipment they may need to use. There is no requirement for a degree or for them to be emergency service employees.",
  },
  {
    id: 6,
    question:
      "In the rescue alarm cascade, what is the correct order of communication?",
    options: [
      "Emergency services first, then site supervisor, then top person",
      "Top person (attendant) raises the alarm, site supervisor is contacted, then emergency services are called",
      "The entrant calls 999 directly from inside the space",
      "A passing member of the public raises the alarm",
    ],
    correctAnswer: 1,
    explanation:
      "The rescue alarm cascade starts with the top person (attendant) who is stationed at the entry point and is responsible for monitoring the entrant. If an emergency is detected, the top person raises the alarm, contacts the site supervisor or rescue team, and emergency services (999) are called. The cascade ensures a rapid, coordinated response with no confusion about who is responsible for each action.",
  },
  {
    id: 7,
    question:
      "Why must the emergency plan include details of the nearest hospital with relevant capabilities?",
    options: [
      "It is a nice-to-have detail but not actually required",
      "The nearest hospital may not have the specialist capabilities needed to treat confined space casualties (e.g. hyperbaric chamber, toxicology unit)",
      "All hospitals in the UK are identical in their capabilities",
      "The ambulance service does not know where hospitals are located",
    ],
    correctAnswer: 1,
    explanation:
      "Not all hospitals have the specialist capabilities needed for confined space casualties. For example, a casualty suffering from carbon monoxide poisoning may need a hyperbaric chamber, or a casualty exposed to hydrogen sulphide may need a specialist toxicology unit. Identifying the nearest appropriate hospital in advance saves critical time during an emergency and ensures the casualty receives the right treatment as quickly as possible.",
  },
  {
    id: 8,
    question:
      "Where should the written emergency plan be displayed?",
    options: [
      "In the site office filing cabinet",
      "On the company intranet only",
      "At the entry point of the confined space, accessible to all personnel",
      "Only in the rescue team leader's personal notebook",
    ],
    correctAnswer: 2,
    explanation:
      "The written emergency plan must be accessible and on display at the entry point of the confined space. Every person involved in the entry -- the entrant, the top person, the rescue team, and the supervisor -- must be able to see it and must have been briefed on its contents before entry begins. Keeping the plan locked in an office or only available online defeats its purpose.",
  },
];

export default function ConfinedSpacesModule5Section1() {
  useSEO({
    title:
      "Emergency Planning | Confined Spaces Module 5.1",
    description:
      "CSR 1997 Regulation 5 emergency arrangements, rescue planning, rescue team requirements, alarm cascades, rehearsals, first aid provision, and written emergency plan requirements for confined space entry.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Planning
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            CSR 1997 Regulation 5 emergency arrangements, rescue team
            requirements, alarm cascades, rehearsal planning, first aid
            provision, casualty handling, and the written emergency plan
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reg 5:</strong> Emergency arrangements MUST be in
                place BEFORE entry
              </li>
              <li>
                <strong>60% of deaths:</strong> Are would-be rescuers &mdash;
                never rush in
              </li>
              <li>
                <strong>On-site rescue:</strong> Trained team is the primary
                rescue method
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>No plan = no entry:</strong> Absolute legal requirement
              </li>
              <li>
                <strong>Rehearsals:</strong> At least annually, ideally
                quarterly
              </li>
              <li>
                <strong>Written plan:</strong> Displayed at entry point,
                briefed to all
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the legal requirement for emergency arrangements under CSR 1997 Regulation 5",
              "Identify the foreseeable emergencies that must be addressed in a confined space emergency plan",
              "Describe the requirements for a competent on-site rescue team",
              "Understand why rescuers must not become casualties and how planning prevents this",
              "Outline the rescue alarm cascade and communication procedures",
              "Explain the importance of rescue plan rehearsals and how they should be conducted",
              "Describe the first aid and casualty handling requirements for confined space work",
              "Know the contents and purpose of the written emergency plan",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Legal Requirement — CSR 1997 Regulation 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            The Legal Requirement &mdash; CSR 1997 Regulation 5
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 5 of the{" "}
                <strong>Confined Spaces Regulations 1997</strong> states that no
                person shall enter or carry out work in a confined space unless
                there are{" "}
                <strong>
                  suitable and sufficient arrangements for the rescue of persons
                </strong>{" "}
                in the event of an emergency. This is not a recommendation
                &mdash; it is an{" "}
                <strong>absolute legal duty</strong>.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Absolute Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    No entry without a rescue plan.
                  </strong>{" "}
                  There is no exception to this requirement. It does not matter
                  how quick the job is, how simple the space appears, or how
                  experienced the entrant is. If emergency arrangements are not
                  in place, entry must not take place. Any entry without a
                  rescue plan is a breach of the Confined Spaces Regulations
                  1997.
                </p>
              </div>

              <p>
                The emergency arrangements must be{" "}
                <strong>specific to the confined space</strong> and the work
                being carried out. A generic plan that covers &ldquo;all
                confined spaces&rdquo; is not sufficient. Each space presents
                different hazards, different access and egress challenges, and
                different rescue requirements. The plan must address all of
                these specifically.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Key Principle:</strong>{" "}
                  The purpose of Regulation 5 is to ensure that if something
                  goes wrong during a confined space entry, there is a{" "}
                  <strong>planned, practised, and resourced method</strong> of
                  getting the casualty out alive. The emergency plan is not
                  paperwork for its own sake &mdash; it is the difference
                  between life and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Critical Statistic — Rescuers as Casualties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            The Critical Statistic &mdash; Rescuers as Casualties
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important statistics in confined space safety
                is this:{" "}
                <strong>
                  approximately 60% of confined space deaths are rescuers
                </strong>
                . These are people who saw a colleague in distress and rushed
                in to help &mdash; without proper equipment, without breathing
                apparatus, without a plan.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-2xl font-black">60%</span>
                  </div>
                  <div>
                    <p className="text-red-400 text-lg font-bold">
                      of confined space deaths are rescuers
                    </p>
                    <p className="text-white/60 text-sm">
                      HSE data &mdash; the single most important reason for
                      emergency planning
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  When a colleague collapses in a confined space, the natural
                  human instinct is to rush in and help. But if that person
                  collapsed because of a{" "}
                  <strong className="text-white">
                    toxic atmosphere or oxygen deficiency
                  </strong>
                  , the rescuer will be exposed to the{" "}
                  <strong className="text-white">identical hazard</strong>. Without
                  breathing apparatus, they will succumb within seconds or
                  minutes. The result: multiple fatalities from a single
                  incident.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How Emergency Planning Prevents This
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Trained rescuers
                      </strong>{" "}
                      know to assess the situation before entering &mdash; they
                      do not rush in blind
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breathing apparatus
                      </strong>{" "}
                      is specified and available, so rescuers are protected
                      from the same atmospheric hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Retrieval systems
                      </strong>{" "}
                      (tripods, winches, harnesses) allow rescue from outside
                      the space, without the rescuer needing to enter at all
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Regular practice
                      </strong>{" "}
                      means the team can execute the rescue quickly and
                      efficiently, without panic or confusion
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Remember:</strong>{" "}
                  The emergency plan does not just protect the entrant &mdash;
                  it protects the <strong>rescuers</strong>. Without it, a
                  single-casualty incident can become a{" "}
                  <strong>multiple-fatality disaster</strong>. Every confined
                  space death is a tragedy; a death that was entirely
                  preventable through proper planning is unforgivable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Emergency Plan Contents */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Emergency Plan Contents
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The emergency plan must be comprehensive and specific. It must
                cover every foreseeable emergency, the rescue method for each
                scenario, and all the resources needed to execute the rescue.
                Below is a breakdown of the{" "}
                <strong>essential contents</strong>.
              </p>

              {/* Diagram: Emergency Plan Components */}
              <div className="bg-white/5 border-2 border-cyan-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-bold text-cyan-400">
                    Emergency Plan Components
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Component 1 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">1</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Foreseeable Emergencies
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      All hazards that could cause an emergency in this
                      specific space
                    </p>
                  </div>

                  {/* Component 2 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">2</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Rescue Methods
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Specific rescue method for each foreseeable scenario
                    </p>
                  </div>

                  {/* Component 3 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">3</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Rescue Equipment
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      All equipment required, checked, and available at the
                      entry point
                    </p>
                  </div>

                  {/* Component 4 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">4</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Rescue Team
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Number, competence, and physical fitness of the rescue
                      team
                    </p>
                  </div>

                  {/* Component 5 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">5</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Communication Plan
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      How to contact emergency services and the alarm cascade
                    </p>
                  </div>

                  {/* Component 6 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cyan-400">6</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Hospital &amp; Services
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Nearest hospital with relevant capabilities identified
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Foreseeable Emergencies to Address
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Atmospheric change
                      </strong>{" "}
                      &mdash; sudden release of toxic gas, oxygen depletion,
                      or build-up of flammable vapours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Injury or illness
                      </strong>{" "}
                      &mdash; the entrant suffers a medical event (heart
                      attack, seizure, heat exhaustion) or physical injury
                      (fall, crush, burn)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Flooding</strong>{" "}
                      &mdash; ingress of water, sewage, or other liquids into
                      the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire</strong> &mdash;
                      ignition of flammable atmospheres or materials within the
                      space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Equipment failure
                      </strong>{" "}
                      &mdash; ventilation breakdown, lighting failure,
                      communication loss, or breathing apparatus malfunction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Structural collapse
                      </strong>{" "}
                      &mdash; collapse of walls, floors, roofs, or supporting
                      structures within the space
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For <strong>each foreseeable emergency</strong>, the plan must
                specify: the rescue method to be used, the equipment required,
                the number of rescuers needed, and the estimated time to
                complete the rescue. This level of detail is what makes the
                plan &ldquo;suitable and sufficient&rdquo; as required by
                Regulation 5.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Rescue Team Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Rescue Team Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue team is the{" "}
                <strong>most critical element</strong> of the emergency plan.
                Without competent, trained, and practised rescuers, even the
                best-written plan is worthless. The following requirements
                apply to all confined space rescue team members.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Training Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Confined space rescue training
                      </strong>{" "}
                      &mdash; specific to the types of spaces and hazards they
                      will encounter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Use of breathing apparatus
                      </strong>{" "}
                      &mdash; self-contained (SCBA) or airline, as appropriate
                      to the rescue plan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Casualty handling
                      </strong>{" "}
                      &mdash; moving an unconscious or injured person through
                      restricted openings and vertical shafts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">First aid</strong>{" "}
                      &mdash; at a minimum, first aid at work certificate;
                      ideally advanced first aid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Use of rescue equipment
                      </strong>{" "}
                      &mdash; tripods, winches, retrieval systems, stretchers,
                      and harnesses
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Physical Fitness
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Confined space rescue is{" "}
                  <strong className="text-white">
                    physically demanding
                  </strong>
                  . Rescuers must be fit enough to:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Wear and operate breathing apparatus under stress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Lift, carry, or drag an unconscious casualty through
                      confined openings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Operate rescue equipment (winches, tripods) under time
                      pressure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Work in high-stress conditions without panic
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Practice Frequency
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Minimum: Annually
                      </p>
                      <p className="text-xs text-white/60">
                        At the very least, the full rescue team must practise
                        together once per year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Ideal: Quarterly
                      </p>
                      <p className="text-xs text-white/60">
                        Best practice is quarterly rehearsals to maintain
                        skills and confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Familiarity
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Rescuers must be{" "}
                      <strong className="text-white">
                        familiar with the specific space
                      </strong>{" "}
                      &mdash; its dimensions, access points, internal
                      features, and hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Rescuers must be{" "}
                      <strong className="text-white">
                        familiar with the rescue equipment
                      </strong>{" "}
                      &mdash; they must have used it in practice before being
                      called upon to use it in a real emergency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A rescue team that has{" "}
                      <strong className="text-white">never seen</strong> the
                      space or{" "}
                      <strong className="text-white">never used</strong> the
                      equipment cannot be considered competent
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Emergency Services and On-Site Rescue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Emergency Services and On-Site Rescue
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Call <strong>999</strong> in any confined space emergency
                &mdash; this is always the right thing to do. However, you
                must{" "}
                <strong>
                  NOT rely on the fire service arriving in time for rescue
                </strong>
                . The fire service may take 15 minutes or more to arrive, and
                the casualty may have only minutes.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Time is Critical
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  In a{" "}
                  <strong className="text-white">
                    toxic atmosphere
                  </strong>{" "}
                  (hydrogen sulphide, carbon monoxide) or an{" "}
                  <strong className="text-white">
                    oxygen-deficient environment
                  </strong>
                  , unconsciousness can occur within seconds and death within
                  minutes. A fire service response of 15+ minutes means the
                  casualty has been without breathable air for 15+ minutes.
                  Brain damage begins after approximately 4 minutes without
                  oxygen. This is why{" "}
                  <strong className="text-white">
                    on-site rescue capability is essential
                  </strong>
                  .
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  On-Site Rescue &mdash; The Primary Method
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">trained rescue team</strong>{" "}
                      on site is the primary rescue resource
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      They are{" "}
                      <strong className="text-white">already present</strong>,
                      already equipped, and already familiar with the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      They can begin rescue{" "}
                      <strong className="text-white">within minutes</strong>{" "}
                      of the alarm being raised
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The emergency services provide{" "}
                      <strong className="text-white">backup and medical support</strong>{" "}
                      &mdash; they are not the primary rescue
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Best Practice:</strong>{" "}
                  Contact your local fire service{" "}
                  <strong>before</strong> the work begins to discuss the confined
                  space entry and the emergency plan. Some fire services offer
                  pre-planning visits where they can familiarise themselves
                  with the site, the space, and the access routes. This
                  significantly improves their response if they are eventually
                  called.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Alarm and Communication Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Alarm and Communication Systems
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The emergency plan must specify{" "}
                <strong>how the alarm is raised</strong>, who is contacted, in
                what order, and how emergency vehicles will reach the site.
                Confusion during an emergency costs time &mdash; and time is
                the one thing you do not have.
              </p>

              {/* Diagram: Rescue Alarm Cascade */}
              <div className="bg-white/5 border-2 border-cyan-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-bold text-cyan-400">
                    Rescue Alarm Cascade
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Step 1 */}
                  <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Top Person (Attendant) Raises Alarm
                        </p>
                        <p className="text-xs text-white/60">
                          Detects the emergency, activates rescue procedure,
                          does NOT enter the space
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-orange-500/15 border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Site Supervisor / Rescue Team Leader
                        </p>
                        <p className="text-xs text-white/60">
                          Coordinates on-site rescue, mobilises the rescue
                          team and equipment
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-yellow-500/15 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Emergency Services &mdash; 999
                        </p>
                        <p className="text-xs text-white/60">
                          Called immediately &mdash; request ambulance and
                          fire service, provide exact location and nature of
                          emergency
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Meeting Point for Emergency Vehicles
                        </p>
                        <p className="text-xs text-white/60">
                          Designated person meets emergency services at the
                          site entrance and guides them to the confined space
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Communication Methods
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Visual and verbal contact
                      </strong>{" "}
                      &mdash; the top person must be able to see or hear the
                      entrant at all times (direct line of sight, tug lines,
                      voice)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Radio communication</strong>{" "}
                      &mdash; intrinsically safe radios where the space is too
                      large or complex for direct communication
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tug-line signals
                      </strong>{" "}
                      &mdash; pre-agreed signals using a safety line (e.g. one
                      tug = OK, two tugs = take up slack, three tugs = haul
                      out, four tugs = emergency)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personal gas monitors with alarm
                      </strong>{" "}
                      &mdash; audible and visual alarms that alert both the
                      entrant and the top person to atmospheric changes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Communication Failure
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If communication with the entrant is{" "}
                  <strong className="text-white">lost at any time</strong>,
                  this must be treated as an emergency. The entrant must be
                  recalled immediately. Loss of communication may indicate
                  that the entrant has been incapacitated. Never assume that
                  silence means everything is fine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Rescue Plan Rehearsals and First Aid */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Rescue Plan Rehearsals and First Aid
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An emergency plan that has never been practised is an
                emergency plan that will{" "}
                <strong>fail when it matters most</strong>. Rehearsals are
                essential to identify weaknesses, build confidence, and
                ensure the rescue can be completed within the time window
                available.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Rehearsal Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Realistic:</strong> Use
                      actual rescue equipment, in or near the actual space,
                      with a simulated casualty (weighted mannequin or
                      volunteer)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Different scenarios:
                      </strong>{" "}
                      Practise multiple emergency types &mdash; atmospheric
                      rescue, injury rescue, flooding evacuation, fire
                      evacuation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Timed:</strong> Record
                      the time from alarm to casualty extraction &mdash; is
                      it achievable within the survival window?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Documented:</strong>{" "}
                      Record the date, participants, scenario, time taken,
                      and any issues encountered
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lessons learned:
                      </strong>{" "}
                      Debrief after every rehearsal &mdash; what went well,
                      what went wrong, what needs to change in the plan
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">
                    Critical Question:
                  </strong>{" "}
                  If the rehearsal shows that rescue cannot be completed
                  within the survival window (e.g. it takes 20 minutes to
                  extract a casualty from a toxic atmosphere, but brain damage
                  begins after 4 minutes without oxygen), then the{" "}
                  <strong>
                    emergency plan must be revised
                  </strong>{" "}
                  or the <strong>entry must not proceed</strong>. Rehearsals
                  are the test of whether the plan is truly &ldquo;suitable
                  and sufficient&rdquo;.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  First Aid Provision
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">trained first aider</strong>{" "}
                      must be available on site during all confined space
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Appropriate first aid equipment
                      </strong>{" "}
                      must be available at the entry point &mdash; not locked
                      in a distant site office
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      An{" "}
                      <strong className="text-white">
                        automated external defibrillator (AED)
                      </strong>{" "}
                      should be available if possible &mdash; cardiac arrest
                      is a foreseeable consequence of toxic gas exposure and
                      oxygen deprivation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supplemental oxygen
                      </strong>{" "}
                      may be needed for casualties who have been exposed to
                      toxic atmospheres or oxygen-deficient environments
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Casualty Handling Plan
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Extraction route:
                      </strong>{" "}
                      How will the casualty be removed from the space? Through
                      the entry point? Through an alternative opening? By
                      vertical lift?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stretcher access:
                      </strong>{" "}
                      Is the entry point wide enough for a stretcher? If not,
                      what alternative (sked stretcher, drag sheet, vertical
                      rescue stretcher) will be used?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ambulance access:
                      </strong>{" "}
                      Can an ambulance get close to the confined space? What
                      is the route from the space to the nearest ambulance
                      access point? Is the route clear?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Nearest hospital:
                      </strong>{" "}
                      Which hospital has the relevant capabilities? A
                      toxicology unit, hyperbaric chamber, or burns unit may
                      be needed depending on the hazards
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: The Written Emergency Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            The Written Emergency Plan
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All of the elements above must be brought together in a{" "}
                <strong>written emergency plan</strong> that is specific to the
                confined space and the work being carried out. The plan must be
                a practical, usable document &mdash; not a generic filing
                exercise.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Written Plan Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Accessible:</strong> The
                      plan must be readily available to everyone involved in
                      the entry &mdash; not locked away or only available on
                      a computer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        On display at the entry point:
                      </strong>{" "}
                      A copy of the emergency plan must be physically present
                      at the confined space entry point for the duration of
                      the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Briefed to all personnel:
                      </strong>{" "}
                      Every person involved &mdash; the entrant, the top
                      person, the rescue team, and the supervisor &mdash;
                      must be briefed on the emergency plan before entry
                      begins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Space-specific:
                      </strong>{" "}
                      The plan must address the hazards, rescue methods, and
                      equipment for this particular space &mdash; not a
                      generic template
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reviewed and updated:
                      </strong>{" "}
                      The plan must be reviewed if conditions change (new
                      hazards, different personnel, changed access) and
                      updated after each rehearsal
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What the Written Plan Should Contain
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Description of the confined space
                      </strong>{" "}
                      &mdash; location, dimensions, access/egress points,
                      known hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Foreseeable emergencies
                      </strong>{" "}
                      &mdash; the specific hazards that could cause an
                      emergency in this space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Rescue method for each scenario
                      </strong>{" "}
                      &mdash; step-by-step procedure for each type of
                      emergency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Rescue equipment list
                      </strong>{" "}
                      &mdash; all equipment, checked and available at the
                      entry point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Rescue team details
                      </strong>{" "}
                      &mdash; names, roles, competencies, contact numbers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Alarm cascade
                      </strong>{" "}
                      &mdash; who calls whom, in what order, with contact
                      numbers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Emergency services contact
                      </strong>{" "}
                      &mdash; 999, plus the exact site address, postcode,
                      grid reference, and access instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Nearest hospital
                      </strong>{" "}
                      &mdash; name, address, distance, travel time, and
                      relevant specialist capabilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Extraction route and ambulance access
                      </strong>{" "}
                      &mdash; how the casualty gets from the space to the
                      ambulance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        First aid provisions
                      </strong>{" "}
                      &mdash; first aider details, equipment location, AED
                      availability
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Plan = No Entry
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If the written emergency plan is not in place, is not
                  specific to the space, or has not been briefed to all
                  personnel,{" "}
                  <strong className="text-white">
                    entry must not take place
                  </strong>
                  . Any person has the right &mdash; and the duty &mdash; to
                  refuse to enter a confined space if they are not satisfied
                  that adequate emergency arrangements are in place. This is
                  not being difficult; this is being professional.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">
                    Final Thought:
                  </strong>{" "}
                  The written emergency plan is not just a legal requirement
                  &mdash; it is a{" "}
                  <strong>
                    life-saving document
                  </strong>
                  . It represents the difference between a coordinated,
                  effective rescue and a panicked, chaotic response that
                  results in additional casualties. Every minute spent
                  preparing the plan could save a life when it matters.
                  Prepare it thoroughly, practise it regularly, and make sure
                  every person on site knows it exists and knows what it says.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5-section-2">
              Next: Rescue Equipment &amp; Techniques
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
