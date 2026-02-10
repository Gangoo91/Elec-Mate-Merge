import { ArrowLeft, Handshake, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "reg-8-duty",
    question:
      "A designer completes their element of the design but does not share information about a residual risk with the principal designer or other designers. They argue it is not their job to coordinate. Is this correct?",
    options: [
      "Yes — each designer is only responsible for their own design element",
      "No — Regulation 8 requires every person with a CDM duty to cooperate with other duty holders, which includes sharing risk information",
      "Yes — only the principal designer has a coordination duty",
      "No — but only if the client specifically requests cooperation",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 8 of CDM 2015 places a duty on every person with a CDM duty to cooperate with other duty holders. This is not optional and does not depend on the client requesting it. A designer who identifies a residual risk that could affect other trades or design elements must share that information so that the risk can be managed collectively. Failure to cooperate is a breach of the Regulations.",
  },
  {
    id: "pc-coordination",
    question:
      "Two subcontractors are working in the same area. Contractor A is installing overhead services while Contractor B is working at ground level directly below. The principal contractor has not established any coordination arrangements. Who is at fault?",
    options: [
      "Contractor A — they should have checked below before starting",
      "Contractor B — they should not have worked below another trade",
      "The principal contractor — it is their duty to coordinate contractors and manage shared spaces and conflicting activities",
      "Nobody — it is normal for trades to work near each other on construction sites",
    ],
    correctIndex: 2,
    explanation:
      "The principal contractor has an explicit duty under CDM 2015 to coordinate the activities of contractors on site, particularly where their work creates interface risks. Working directly above another trade is a classic example of conflicting activities that require a permit-to-work system, time separation, or physical separation. The principal contractor should have identified this conflict through look-ahead planning and coordination meetings.",
  },
  {
    id: "conflict-resolution",
    question:
      "A designer and a contractor disagree about whether a particular construction method is safe. The designer insists on their approach, but the contractor says it is not buildable on site. Neither will compromise. What is the correct escalation route?",
    options: [
      "The contractor should simply do what the designer says because designers outrank contractors",
      "The contractor should ignore the designer and use their own method without telling anyone",
      "The matter should be escalated to the principal designer and/or the client, with input from a competent person if needed, and the HSE can be consulted if the dispute cannot be resolved",
      "The work should stop permanently until both parties agree",
    ],
    correctIndex: 2,
    explanation:
      "CDM 2015 does not create a hierarchy where designers outrank contractors. Both have duties to ensure health and safety. Where there is a genuine disagreement about safe methods of work, the matter should be escalated to the principal designer (for design issues) or the client. A competent person should provide an independent assessment. If the dispute cannot be resolved internally, the HSE can be consulted for guidance. Work in the disputed area should not proceed until the matter is resolved safely.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between 'coordination' and 'cooperation' under CDM 2015?",
    answer:
      "Coordination is the active management of how different parties' work fits together. It involves planning, organising, scheduling, and managing interfaces between design elements or site activities. Cooperation is the broader duty on every person with a CDM duty to work with other duty holders, share information, and not obstruct each other's efforts. Coordination is primarily the responsibility of the principal designer (design phase) and principal contractor (construction phase), while cooperation is a duty on everyone. In practice, effective coordination requires cooperation from all parties, and the two concepts are closely linked.",
  },
  {
    question:
      "How does the principal designer coordinate design work when the designers are from different organisations?",
    answer:
      "The principal designer must establish a design coordination process that works across organisational boundaries. This typically involves setting up a design interface register that identifies where different designers' work overlaps or connects, holding regular design coordination meetings with representatives from each design team, establishing a common approach to risk assessment so that risks are identified and managed consistently, creating a shared information platform (often BIM-based) where design changes and risk information are visible to all parties, and ensuring that no design element is finalised until its interfaces with adjacent work have been reviewed and agreed. The principal designer does not need to check every design detail but must ensure the process is in place and functioning.",
  },
  {
    question:
      "What happens if a contractor refuses to cooperate with other duty holders on site?",
    answer:
      "Failure to cooperate is a breach of Regulation 8 of CDM 2015. In practice, the principal contractor should first attempt to resolve the issue through discussion and the normal coordination process. If a contractor continues to refuse to cooperate, the principal contractor can restrict their access to site, require them to change their working methods, or ultimately remove them from the project. The client should be informed, as the client has an overarching duty to ensure suitable arrangements are in place. In serious cases, the HSE can take enforcement action against the non-cooperating party. Persistent failure to cooperate that creates a risk to health and safety could result in a Prohibition Notice or prosecution.",
  },
  {
    question:
      "Is BIM (Building Information Modelling) required for CDM coordination?",
    answer:
      "BIM is not legally required by CDM 2015. The Regulations are technology-neutral and do not specify how coordination and information sharing should be achieved. However, BIM is increasingly recognised as a highly effective tool for design coordination because it provides a visual, three-dimensional model where clashes and interface issues can be identified before construction begins. On publicly funded projects, BIM Level 2 (now known as the UK BIM Framework) has been mandated since 2016. Even where not mandated, BIM significantly improves coordination outcomes by making design interfaces visible, enabling automated clash detection, providing a single source of truth for design information, and supporting better communication between design teams.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, which duty holder has the primary responsibility for coordinating the design team during the pre-construction phase?",
    options: [
      "The client",
      "The principal contractor",
      "The principal designer",
      "The lead designer from the largest consultancy",
    ],
    correctAnswer: 2,
    explanation:
      "The principal designer is responsible for planning, managing, monitoring, and coordinating health and safety in the pre-construction phase, including coordinating the design team. While the client appoints the principal designer and has overarching duties, and the principal contractor coordinates the construction phase, it is the principal designer who coordinates design work to ensure that risks are identified and managed across all design elements.",
  },
  {
    id: 2,
    question:
      "Regulation 8 of CDM 2015 requires cooperation between duty holders. Which of the following best describes who this duty applies to?",
    options: [
      "Only the client and the principal designer",
      "Only the principal designer and the principal contractor",
      "Every person on whom a duty is placed by the CDM Regulations",
      "Only contractors and workers on the construction site",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 8 states that every person on whom a duty is placed by the CDM Regulations must cooperate with any other person working on or in relation to the project. This includes the client, principal designer, principal contractor, designers, contractors, and workers. The duty is universal and applies at all phases of the project.",
  },
  {
    id: 3,
    question:
      "A design coordination meeting identifies a clash between the structural steel design and the mechanical services routing. What is the most appropriate action?",
    options: [
      "The structural engineer changes their design because steel is more adaptable",
      "The mechanical engineer re-routes the services because services are less important than structure",
      "The principal designer records the interface issue, assigns responsibility for resolution, sets a deadline, and tracks the action to completion",
      "Both designers are told to sort it out between themselves",
    ],
    correctAnswer: 2,
    explanation:
      "The principal designer's role is to manage design interfaces systematically. When a clash is identified, it should be recorded in the design interface register, responsibility for proposing a solution should be assigned (considering the health and safety implications of each option), a deadline for resolution should be set, and the action should be tracked to completion. Simply telling designers to sort it out, or assuming one discipline always takes priority, does not constitute proper coordination.",
  },
  {
    id: 4,
    question:
      "The principal contractor holds a weekly coordination meeting on site. Which of the following should NOT normally be on the agenda?",
    options: [
      "Look-ahead programme for the next two weeks showing planned activities and potential conflicts",
      "Review of contractor payment invoices and profit margins",
      "Permit-to-work requirements for high-risk activities in the coming week",
      "Shared risk assessments and method statements for activities that affect multiple trades",
    ],
    correctAnswer: 1,
    explanation:
      "Site coordination meetings focus on health and safety coordination, not commercial matters. The agenda should cover the look-ahead programme (identifying potential conflicts and interface issues), permit-to-work requirements, shared risk assessments and method statements, incident reviews, welfare issues, and any changes to the construction phase plan. Payment and commercial matters are handled in separate meetings.",
  },
  {
    id: 5,
    question:
      "A contractor on site discovers that the work of another contractor has created an unexpected hazard. Under CDM 2015, what is the discovering contractor's first obligation?",
    options: [
      "Report the hazard to the HSE immediately",
      "Stop all work on the entire site",
      "Cooperate by informing the principal contractor and the other contractor so that the hazard can be assessed and managed",
      "Continue their own work and let the other contractor deal with it",
    ],
    correctAnswer: 2,
    explanation:
      "The duty of cooperation under Regulation 8 means that every contractor must share information about hazards that could affect other parties. The discovering contractor should report the hazard to the principal contractor (who coordinates site activities) and inform the other contractor. The principal contractor will then assess the situation and determine what action is needed. Simply ignoring it or waiting for someone else to notice it breaches the cooperation duty.",
  },
  {
    id: 6,
    question:
      "What is the purpose of a design interface register?",
    options: [
      "To record the names and contact details of all designers on the project",
      "To identify where different designers' work overlaps or connects, track interface issues, and record how they are resolved",
      "To list the software packages used by each design team",
      "To calculate the design fees payable to each consultant",
    ],
    correctAnswer: 1,
    explanation:
      "A design interface register is a coordination tool managed by the principal designer. It identifies every point where one designer's work meets or overlaps with another's, records the risks or coordination issues at each interface, assigns responsibility for resolving each issue, and tracks progress to resolution. It is a practical tool for ensuring that nothing falls through the gaps between different designers' responsibilities.",
  },
  {
    id: 7,
    question:
      "Which of the following is the best example of effective information sharing on a CDM project?",
    options: [
      "Each contractor keeps their risk assessments in their own office and produces them only if asked",
      "The principal contractor maintains a shared notice board, holds regular briefings, and uses a digital platform where risk assessments, method statements, and emergency procedures are accessible to all contractors",
      "The client sends a single email at the start of the project with all relevant health and safety information",
      "Designers share their drawings but not their risk assessments because risk assessments are confidential",
    ],
    correctAnswer: 1,
    explanation:
      "Effective information sharing requires active, ongoing communication through multiple channels. The principal contractor should maintain a shared notice board displaying current safety information, hold regular briefings and coordination meetings, and provide a digital platform where key documents (risk assessments, method statements, emergency procedures, incident reports) are accessible to all who need them. Risk assessments are not confidential — they must be shared with anyone whose work could be affected by the risks identified.",
  },
  {
    id: 8,
    question:
      "The HSE investigates an incident on a construction site and finds that two contractors' activities conflicted with each other, contributing to the accident. No coordination arrangements were in place. Who is most likely to face enforcement action?",
    options: [
      "Only the two contractors whose activities conflicted",
      "Only the workers who were injured",
      "The principal contractor, because they have the duty to coordinate contractor activities on site, and potentially the contractors themselves for failing to cooperate",
      "The client, because the client is always responsible for everything on a CDM project",
    ],
    correctAnswer: 2,
    explanation:
      "The principal contractor has a specific duty to plan, manage, monitor, and coordinate the construction phase, including coordinating contractor activities. If they failed to identify conflicting activities and establish coordination arrangements, they will face enforcement action. However, the individual contractors also have a duty to cooperate under Regulation 8 — if they knew about the conflict and did not raise it, they could also face action. The HSE takes a proportionate approach and will consider the specific failures of each party.",
  },
];

export default function CdmRegulationsModule4Section4() {
  useSEO({
    title:
      "Coordination & Cooperation | CDM Regulations Module 4.4",
    description:
      "PD and PC coordination roles, Regulation 8 cooperation duties, design coordination meetings, site coordination, information sharing, and resolving conflicts under CDM 2015.",
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
            <Link to="../cdm-regulations-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <Handshake className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Coordination &amp; Cooperation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How duty holders coordinate their work and cooperate to manage
            health and safety risks across design and construction phases
            under CDM&nbsp;2015
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Regulation 8:</strong> Everyone with a CDM duty must
                cooperate
              </li>
              <li>
                <strong>PD coordinates:</strong> Design team and design
                interfaces
              </li>
              <li>
                <strong>PC coordinates:</strong> Contractors, shared spaces,
                conflicting activities
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Information sharing:</strong> Risk assessments, method
                statements, emergency procedures
              </li>
              <li>
                <strong>Conflict resolution:</strong> Escalation through PD,
                client, then HSE
              </li>
              <li>
                <strong>Failure to cooperate:</strong> Breach of Regulation 8
                &mdash; enforcement action possible
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
              "Explain why coordination matters and the consequences of poor coordination on construction projects",
              "Describe the principal designer's coordination role during the design phase",
              "Describe the principal contractor's coordination role during the construction phase",
              "State the cooperation duty under Regulation 8 and who it applies to",
              "Outline the purpose and content of design coordination meetings",
              "Explain how site coordination is achieved through briefings, permits, and look-ahead programmes",
              "Identify what information must be shared and the channels used for sharing it",
              "Describe how conflicts between duty holders are resolved, including escalation procedures",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Coordination Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            Why Coordination Matters
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction projects involve{" "}
                <strong>multiple designers and multiple contractors</strong>{" "}
                working on different elements of the same structure, often at the
                same time and in the same physical space. Every point where one
                party&rsquo;s work meets another&rsquo;s creates an{" "}
                <strong>interface risk</strong> &mdash; a risk that arises not from
                either party&rsquo;s work in isolation, but from the interaction
                between them.
              </p>

              <p>
                Interface risks are among the most dangerous on construction
                sites because{" "}
                <strong>
                  neither party may be fully aware of the other&rsquo;s activities
                </strong>
                . A steelwork contractor lifting materials overhead while an
                electrical contractor works below, a demolition team removing a
                wall that provides temporary support to an adjacent structure, or
                two designers specifying incompatible fire-stopping details at a
                service penetration &mdash; all of these are interface failures
                that proper coordination would prevent.
              </p>

              <p>
                Historically, many of the most serious construction accidents
                have involved{" "}
                <strong>failures of coordination</strong>. Investigations
                repeatedly identify the same root causes: parties not knowing what
                other parties were doing, information not being shared, conflicting
                activities not being identified, and nobody taking responsibility
                for managing the interfaces. CDM 2015 addresses this directly
                through <strong>Regulation&nbsp;8</strong>, which places general
                duties of cooperation on all duty holders, and through the
                specific coordination duties assigned to the principal designer
                and principal contractor.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Interface Risks on Construction Projects
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Overhead and below-ground conflicts</strong>{" "}
                      &mdash; One trade working at height while another works
                      directly below, or excavations adjacent to foundations
                      being installed by another contractor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Temporary works dependencies</strong>{" "}
                      &mdash; Removal of temporary support or propping before
                      the permanent structure is ready to take the load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Service clashes</strong>{" "}
                      &mdash; Mechanical, electrical, and plumbing services
                      designed by different engineers occupying the same
                      ceiling void or riser space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire-stopping gaps</strong>{" "}
                      &mdash; Multiple trades penetrating a fire
                      compartment wall or floor with no single party responsible
                      for the final fire-stopping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shared access routes</strong>{" "}
                      &mdash; Pedestrian routes, crane zones, and delivery
                      areas used by multiple contractors simultaneously
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Key Principle:</strong>{" "}
                  Coordination is not bureaucracy &mdash; it is the mechanism
                  that prevents the gaps between different parties&rsquo; work
                  from becoming the places where people get hurt. Every
                  interface that is not actively managed is a potential accident
                  waiting to happen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: PD's Coordination Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            Principal Designer&rsquo;s Coordination Role
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>principal designer (PD)</strong> is responsible for
                planning, managing, monitoring, and coordinating health and
                safety in the pre-construction phase. In practical terms, this
                means the PD must ensure that{" "}
                <strong>
                  the work of all designers is coordinated so that risks are
                  identified and managed at the design stage
                </strong>
                , before they become hazards on site.
              </p>

              <p>
                On a project with multiple design disciplines &mdash;
                architecture, structural engineering, mechanical services,
                electrical services, fire engineering, civil engineering &mdash;
                each designer produces their own design for their own element.
                Without coordination, these designs may be technically sound in
                isolation but create serious problems where they interact. The
                PD&rsquo;s role is to ensure these{" "}
                <strong>design interfaces</strong> are identified and resolved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  PD Coordination Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Coordinating the design team</strong>{" "}
                      &mdash; Establishing a coordination process, holding
                      regular design coordination meetings, and ensuring all
                      designers participate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Managing design interfaces</strong>{" "}
                      &mdash; Maintaining a design interface register that
                      identifies every point where one designer&rsquo;s work
                      meets another&rsquo;s, and tracking resolution of each
                      interface issue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ensuring a consistent approach to risk management</strong>{" "}
                      &mdash; All designers must use a common approach to
                      identifying and recording design-stage risks, so that
                      the information is consistent and comparable across
                      disciplines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Design review process</strong>{" "}
                      &mdash; Reviewing designs at key stages to check that
                      health and safety risks have been considered, that the
                      hierarchy of risk control has been applied, and that
                      residual risks are recorded and communicated
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The PD does not need to check every design calculation or
                drawing. Their role is to ensure that the{" "}
                <strong>process</strong> of design coordination is in place
                and functioning. They must be satisfied that designers are
                talking to each other, sharing information about risks, and
                resolving interface issues rather than working in silos.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Example:</strong>{" "}
                  The structural engineer designs a steel frame with large
                  open-plan floor plates. The mechanical engineer designs a
                  heavy rooftop plant room. The PD must ensure these two
                  designers coordinate: Has the structural engineer allowed for
                  the plant room loading? Has the mechanical engineer confirmed
                  the weight and vibration characteristics? Is there a safe
                  access route to the plant room for installation and future
                  maintenance? These interface issues only become visible when
                  both designs are considered together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: PC's Coordination Role */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">03</span>
            Principal Contractor&rsquo;s Coordination Role
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>principal contractor (PC)</strong> is responsible
                for planning, managing, monitoring, and coordinating health
                and safety during the construction phase. Where the PD
                coordinates the design team, the PC coordinates the{" "}
                <strong>contractors on site</strong> &mdash; the people
                physically doing the construction work.
              </p>

              <p>
                The construction phase is inherently more dynamic than the
                design phase. Activities change daily, different trades move
                through the same spaces, and unexpected conditions arise. The
                PC must maintain continuous oversight of{" "}
                <strong>
                  who is doing what, where, and when
                </strong>{" "}
                to prevent conflicting activities from creating hazards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  PC Coordination Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Coordinating contractors</strong>{" "}
                      &mdash; Ensuring every contractor on site knows what
                      other contractors are doing, where they are working,
                      and how activities interact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Managing contractor interfaces</strong>{" "}
                      &mdash; Identifying where different contractors&rsquo;
                      work overlaps in time or space and establishing
                      arrangements to manage the interface safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shared spaces</strong>{" "}
                      &mdash; Managing areas used by multiple contractors such
                      as access routes, laydown areas, crane zones, welfare
                      facilities, and temporary works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Conflicting activities</strong>{" "}
                      &mdash; Identifying activities that cannot safely take
                      place simultaneously (such as hot works below timber
                      installation, or lifting operations near live traffic)
                      and implementing time or space separation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Permit-to-work systems</strong>{" "}
                      &mdash; Establishing permit systems for high-risk
                      activities (hot works, confined space entry, live
                      electrical work, excavations near services) that
                      require formal coordination between trades
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The PC achieves this coordination through a combination of{" "}
                <strong>planning tools</strong> (look-ahead programmes,
                construction phase plans, logistics plans),{" "}
                <strong>meetings</strong> (daily briefings, weekly
                coordination meetings), and{" "}
                <strong>control systems</strong> (permits, method statement
                reviews, site rules). The goal is to ensure that no contractor
                starts work without understanding how their activities affect
                and are affected by others on site.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Example:</strong>{" "}
                  A mechanical contractor needs to carry out hot works (welding
                  pipework) on the second floor. An insulation contractor is
                  installing combustible thermal insulation on the floor above.
                  The PC must identify this conflict through the look-ahead
                  programme, ensure a hot works permit is issued, verify that
                  the insulation contractor is informed and has protected their
                  materials, and confirm that a fire watch is in place. Without
                  the PC&rsquo;s coordination, neither contractor may be aware
                  of the other&rsquo;s activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Cooperation Between Duty Holders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Cooperation Between Duty Holders
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation&nbsp;8 of CDM 2015</strong> places a general
                duty on{" "}
                <strong>
                  every person on whom a duty is placed by the Regulations
                </strong>{" "}
                to cooperate with any other person working on or in relation
                to the project, to the extent necessary to enable any person
                with a duty under the Regulations to fulfil that duty.
              </p>

              <p>
                This is a universal duty. It applies to the client, the
                principal designer, the principal contractor, every designer,
                every contractor, and every worker. It is not limited to
                people within the same organisation &mdash; it extends across
                organisational boundaries. A subcontractor must cooperate with
                the principal contractor. A designer in one consultancy must
                cooperate with a designer in another. The client must cooperate
                with the principal designer and principal contractor.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What Cooperation Looks Like in Practice
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sharing information</strong>{" "}
                      &mdash; Providing risk assessments, method statements,
                      design information, and other relevant data to anyone
                      who needs it, without being asked
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Joint problem-solving</strong>{" "}
                      &mdash; Working with other duty holders to find
                      solutions to shared health and safety challenges,
                      rather than each party trying to solve problems in
                      isolation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Attending meetings</strong>{" "}
                      &mdash; Participating in coordination meetings,
                      design reviews, and site briefings when invited
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reporting hazards</strong>{" "}
                      &mdash; Informing other duty holders about hazards or
                      risks discovered during your own work that could affect
                      their activities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not obstructing</strong>{" "}
                      &mdash; Not preventing other duty holders from carrying
                      out their CDM duties, for example by withholding
                      information, refusing access, or creating delays
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-white">
                    Consequences of Failure to Cooperate
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Breach of Regulation 8 &mdash; enforceable by the HSE
                      through Improvement Notices, Prohibition Notices, or
                      prosecution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Interface risks go unmanaged, increasing the likelihood
                      of accidents
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      In the event of an incident, failure to cooperate is
                      treated as an aggravating factor in sentencing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Design Coordination Meetings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">05</span>
            Design Coordination Meetings
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Design coordination meetings are the principal designer&rsquo;s
                primary tool for managing the design process across multiple
                disciplines. They bring designers together to{" "}
                <strong>
                  identify interface issues, share risk information, and agree
                  coordinated approaches
                </strong>{" "}
                to design challenges that affect health and safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Design Coordination Meeting Framework
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Purpose</strong>{" "}
                      &mdash; To identify and resolve design interfaces,
                      review health and safety risks across disciplines,
                      ensure consistent application of the hierarchy of risk
                      control, and track outstanding actions from previous
                      meetings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Frequency</strong>{" "}
                      &mdash; Typically fortnightly or monthly depending on
                      the project stage and complexity. More frequent during
                      critical design stages, less frequent during quieter
                      periods. The PD should adjust the frequency based on
                      need.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Attendees</strong>{" "}
                      &mdash; The principal designer (chair), representatives
                      from each design discipline, the CDM coordinator (if
                      appointed separately), the client&rsquo;s representative,
                      and the principal contractor (particularly at later
                      design stages when buildability is being reviewed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Typical agenda</strong>{" "}
                      &mdash; Actions from previous meeting, design programme
                      update, new design interfaces identified, review of
                      design risk assessments, BIM coordination review
                      (if applicable), information required from/by each
                      discipline, health and safety file content update
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Recording decisions</strong>{" "}
                      &mdash; All decisions must be formally recorded in
                      minutes, with named owners and deadlines. Verbal
                      agreements that are not recorded have no evidential
                      value.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Action tracking</strong>{" "}
                      &mdash; The PD must maintain an action tracker that
                      records each issue, the assigned owner, the agreed
                      deadline, and the current status. Outstanding actions
                      must be reviewed at each meeting.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Design Interface Register
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The design interface register is a key coordination
                  document that records every point where different
                  designers&rsquo; work connects or overlaps. For each
                  interface, the register records:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>The two (or more) disciplines involved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>A description of the interface issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>The health and safety risk (if any)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>The person responsible for resolving it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>The deadline for resolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>The current status (open, in progress, resolved)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Site Coordination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">06</span>
            Site Coordination
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Site coordination is the principal contractor&rsquo;s
                equivalent of the design coordination process. It ensures that{" "}
                <strong>
                  all contractor activities on site are planned, sequenced, and
                  managed
                </strong>{" "}
                so that conflicts are avoided and shared risks are addressed.
                Site coordination is more frequent and more dynamic than
                design coordination because site conditions change
                continuously.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Site Coordination Tools
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Daily briefings</strong>{" "}
                      &mdash; Short briefings (typically 10&ndash;15 minutes)
                      at the start of each day, attended by supervisors from
                      each active contractor. The PC or site manager outlines
                      the day&rsquo;s planned activities, identifies potential
                      conflicts, and confirms permit requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Weekly coordination meetings
                      </strong>{" "}
                      &mdash; More detailed meetings attended by contractor
                      managers, reviewing the previous week&rsquo;s activities,
                      the coming week&rsquo;s plan, and the two-week
                      look-ahead. Health and safety performance, incidents,
                      near-misses, and emerging risks are discussed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Method statement reviews
                      </strong>{" "}
                      &mdash; Before any contractor begins a new activity, the
                      PC reviews their method statement to check for interface
                      risks with other ongoing activities. High-risk method
                      statements are reviewed jointly with affected
                      contractors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Shared risk assessments
                      </strong>{" "}
                      &mdash; Where activities create shared risks (for
                      example, crane operations affecting multiple zones),
                      the PC ensures a shared risk assessment is produced
                      involving all affected contractors, not just the
                      contractor carrying out the activity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">Permit systems</strong>{" "}
                      &mdash; Formal permits for high-risk activities (hot
                      works, confined spaces, live electrical work, lifting
                      operations, excavations near buried services) ensure
                      that the activity is authorised, conditions are met,
                      and affected parties are notified.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">
                        Look-ahead programmes
                      </strong>{" "}
                      &mdash; Typically a two-week rolling programme showing
                      which contractors will be working where, what activities
                      are planned, and where potential conflicts exist. This
                      allows the PC to plan coordination measures in advance
                      rather than reacting to conflicts as they arise.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Coordination Meeting Cycle Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Coordination Meeting Cycle
                </p>
                <div className="flex flex-col items-center gap-2 text-sm">
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-center font-medium text-xs w-full max-w-[180px]">
                        Daily Briefing
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-center font-medium text-xs w-full max-w-[180px]">
                        Monitor &amp; Supervise
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-center font-medium text-xs w-full max-w-[180px]">
                        Weekly Review Meeting
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-center font-medium text-xs w-full max-w-[180px]">
                        Update Look-Ahead
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-center font-medium text-xs w-full max-w-[180px]">
                        Issue Revised Permits
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/70 text-center font-medium text-xs w-full max-w-[180px]">
                        Repeat Cycle &uarr;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Key Point:</strong>{" "}
                  Site coordination is not a one-off event. It is a{" "}
                  <strong>continuous cycle</strong> of planning, briefing,
                  monitoring, reviewing, and adjusting. The look-ahead
                  programme is updated weekly, permits are issued and closed
                  daily, and the PC must be prepared to intervene at any time
                  if an unplanned conflict arises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Information Sharing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">07</span>
            Information Sharing
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective coordination depends on{" "}
                <strong>effective information sharing</strong>. Duty holders
                cannot cooperate if they do not know what information exists,
                where to find it, or what is relevant to their work. CDM 2015
                does not prescribe a specific method of information sharing,
                but the duty of cooperation under Regulation&nbsp;8 requires
                that relevant information is made available to those who need
                it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What Information Must Be Shared
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk assessments</strong>{" "}
                      &mdash; Every contractor&rsquo;s risk assessments must
                      be available to other contractors whose work could be
                      affected by the risks identified. Risk assessments are
                      not confidential documents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Method statements</strong>{" "}
                      &mdash; Particularly for high-risk activities or
                      activities that affect shared spaces. The PC should
                      review method statements for interface risks before
                      work begins.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency procedures</strong>{" "}
                      &mdash; All contractors must know the site emergency
                      procedures, assembly points, first aid arrangements,
                      and fire procedures. Specialist emergency arrangements
                      (confined space rescue, chemical spill response) must
                      be shared with all who could be affected.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Incident reports</strong>{" "}
                      &mdash; Accidents, near-misses, and dangerous
                      occurrences must be reported and shared so that all
                      contractors can learn from them and adjust their working
                      methods if necessary.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Design changes</strong>{" "}
                      &mdash; Any change to the design that affects health
                      and safety on site must be communicated promptly to the
                      principal contractor and all affected contractors.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How Information Is Shared
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Coordination meetings</strong>{" "}
                      &mdash; The primary forum for face-to-face information
                      exchange. Minutes provide a formal record.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site notice boards</strong>{" "}
                      &mdash; Physical boards at welfare facilities and site
                      entrances displaying current safety alerts, emergency
                      procedures, site rules, and key contact information.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BIM (Building Information Modelling)</strong>{" "}
                      &mdash; A shared digital model where design information,
                      clashes, and coordination issues are visible to all
                      design team members. Increasingly used for construction
                      sequencing and logistics planning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digital platforms</strong>{" "}
                      &mdash; Project management platforms (such as Aconex,
                      Viewpoint, Procore, or SharePoint) that provide a
                      single location for documents, drawings, and
                      communications accessible to all authorised parties.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Toolbox talks and briefings</strong>{" "}
                      &mdash; Short, focused safety communications delivered
                      to workers on specific topics, particularly when new
                      activities start or when incidents have occurred.
                    </span>
                  </li>
                </ul>
              </div>

              {/* CDM Information Flow Map */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  CDM Information Flow Map
                </p>
                <div className="text-xs text-white/80 space-y-3">
                  {/* Client at top */}
                  <div className="flex justify-center">
                    <div className="px-4 py-2.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 font-semibold text-center min-w-[140px]">
                      Client
                    </div>
                  </div>
                  {/* Arrows down to PD and PC */}
                  <div className="flex justify-center gap-16 sm:gap-24">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                      <span className="text-blue-400/60 text-[10px]">&darr; &uarr;</span>
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                      <span className="text-blue-400/60 text-[10px]">&darr; &uarr;</span>
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                  </div>
                  {/* PD and PC row */}
                  <div className="flex justify-center gap-4 sm:gap-8">
                    <div className="px-3 py-2.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 font-semibold text-center min-w-[130px]">
                      Principal Designer
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-400/60 text-[10px]">&larr; &rarr;</span>
                    </div>
                    <div className="px-3 py-2.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 font-semibold text-center min-w-[130px]">
                      Principal Contractor
                    </div>
                  </div>
                  {/* Arrows down to Designers and Contractors */}
                  <div className="flex justify-center gap-16 sm:gap-24">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                      <span className="text-blue-400/60 text-[10px]">&darr; &uarr;</span>
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                      <span className="text-blue-400/60 text-[10px]">&darr; &uarr;</span>
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                  </div>
                  {/* Designers and Contractors row */}
                  <div className="flex justify-center gap-4 sm:gap-8">
                    <div className="px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/80 font-medium text-center min-w-[130px]">
                      Designers
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-400/60 text-[10px]">&larr; &rarr;</span>
                    </div>
                    <div className="px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/80 font-medium text-center min-w-[130px]">
                      Contractors
                    </div>
                  </div>
                  {/* Arrows down to Workers */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                      <span className="text-blue-400/60 text-[10px]">&darr; &uarr;</span>
                      <div className="w-0.5 h-4 bg-blue-500/30" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/70 font-medium text-center min-w-[140px]">
                      Workers
                    </div>
                  </div>
                  <p className="text-center text-white/50 text-[10px] mt-2">
                    All arrows are bidirectional &mdash; information flows up
                    as well as down. Every duty holder communicates with those
                    above and below them in the project structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Resolving Conflicts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">08</span>
            Resolving Conflicts
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite the best coordination arrangements, disagreements
                between duty holders will occur. Designers may disagree about
                the best approach to eliminating a hazard. A contractor may
                believe that a designer&rsquo;s specified method is not
                practically buildable. Two contractors may dispute whose
                responsibility it is to manage a shared risk. These{" "}
                <strong>conflicts must be resolved</strong> &mdash; they cannot
                be left unaddressed, because unresolved conflicts create
                unmanaged risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Conflict
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disagreements between designers
                      </strong>{" "}
                      &mdash; Different views on how to address a design risk,
                      conflicting design solutions at an interface, or
                      disagreement about whether a residual risk is acceptable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Designer vs. contractor
                      </strong>{" "}
                      &mdash; A contractor believes the designed method of
                      construction is unsafe or impractical. The designer
                      believes their approach is correct. This is particularly
                      common around temporary works, access arrangements, and
                      sequencing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Contractor vs. contractor
                      </strong>{" "}
                      &mdash; Two contractors dispute whose responsibility it
                      is to manage an interface risk, or one contractor&rsquo;s
                      activities affect another&rsquo;s work and neither is
                      willing to adjust their programme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hierarchy of control disputes
                      </strong>{" "}
                      &mdash; One party wants to use a lower-order control
                      (such as PPE) where another party believes a higher-order
                      control (such as elimination or engineering control) is
                      reasonably practicable
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Escalation Procedure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Direct discussion</strong>{" "}
                      &mdash; The parties involved attempt to resolve the
                      issue directly, ideally at a coordination meeting
                      where the discussion can be recorded
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Escalation to PD or PC
                      </strong>{" "}
                      &mdash; If the parties cannot agree, the matter is
                      escalated to the principal designer (for design issues)
                      or the principal contractor (for site issues). They make
                      a decision based on the information available.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Competent person assessment
                      </strong>{" "}
                      &mdash; If the issue is technically complex, an
                      independent competent person (such as a specialist
                      health and safety consultant, a temporary works
                      coordinator, or a structural engineer) may be engaged
                      to provide an expert opinion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Escalation to client
                      </strong>{" "}
                      &mdash; The client has the ultimate authority on the
                      project. If the PD or PC cannot resolve the issue, it
                      is escalated to the client, who must make a decision
                      (taking account of competent health and safety advice)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">HSE involvement</strong>{" "}
                      &mdash; In exceptional cases, where a dispute cannot be
                      resolved internally and there is a genuine risk to
                      health and safety, the HSE can be consulted. The HSE
                      will not mediate commercial disputes, but they will
                      provide guidance on legal requirements and can take
                      enforcement action if a duty holder is failing to
                      comply with the Regulations.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Throughout the escalation process, the{" "}
                <strong>key principle</strong> is that{" "}
                <strong>
                  work in the disputed area should not proceed if there is a
                  genuine risk to health and safety
                </strong>
                . The dispute must be resolved before work continues. Allowing
                work to proceed while a safety disagreement is unresolved is
                itself a failure to manage risk.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">
                    Recording Decisions:
                  </strong>{" "}
                  Every decision made during conflict resolution must be
                  formally recorded, including the issue, the options
                  considered, the decision reached, the reasons for the
                  decision, and who made it. This creates a defensible audit
                  trail in the event of an incident. Verbal agreements that
                  are not documented have no evidential value.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
