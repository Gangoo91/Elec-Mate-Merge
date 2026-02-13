import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Handshake, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lead-sub-expectations",
    question: "When should you communicate your quality standards and site rules to a new subcontractor arriving on your work area?",
    options: [
      "After they have completed their first week of work so you can see their natural standard",
      "Only if they make a mistake or produce substandard work",
      "From the very first day, before they begin any work",
      "At the end of the project during the snagging process"
    ],
    correctIndex: 2,
    explanation: "You should communicate your expectations from the very first day, before any work begins. Never assume subcontractors know your standards — they have been on different sites with different supervisors. Setting clear expectations at the outset prevents misunderstandings, rework, and conflict later."
  },
  {
    id: "lead-sub-clash",
    question: "What is the best approach to avoiding containment route clashes between trades?",
    options: [
      "Wait until the clashes occur on site and then resolve them reactively",
      "Let each trade install wherever they want and fix problems at snagging",
      "Pre-plan using drawings and markups to agree routes, penetrations, and access before starting",
      "Ask the client to redesign the building to avoid any clashes"
    ],
    correctIndex: 2,
    explanation: "The best approach is to pre-plan clash avoidance using drawings and markups. Before work starts, agree containment routes, penetration locations, and access routes with other trade supervisors. This prevents the costly and frustrating process of moving installed work because of avoidable clashes."
  },
  {
    id: "lead-sub-damage",
    question: "If another trade damages your completed work, what is the recommended professional approach?",
    options: [
      "Shout at the other trade's workers to make sure they understand",
      "Ignore it and fix it yourself to avoid confrontation",
      "Approach the matter professionally, document the damage with photographs, and raise it through proper channels",
      "Damage their work in retaliation to make the point"
    ],
    correctIndex: 2,
    explanation: "The professional approach is to document the damage with photographs, approach the other trade's supervisor calmly and factually, and if direct discussion does not resolve it, raise the issue through the site management chain. Professional, documented communication protects you and maintains working relationships."
  }
];

const faqs = [
  {
    question: "What do I do when a subcontractor refuses to follow site rules?",
    answer: "First, have a direct, professional conversation with their supervisor or foreman. Explain the specific rule they are not following and why it matters. If this does not resolve the issue, put your concerns in writing (email) and copy in the site manager. If the behaviour involves safety breaches, you have the right and duty to stop their work immediately. Do not get into arguments on the work floor — take it offline and resolve it through the proper management chain. Document everything. Persistent refusal to follow site rules is a matter for the principal contractor's site management team."
  },
  {
    question: "How do I handle a situation where another trade is blocking my access to a work area?",
    answer: "Start with a direct conversation with the other trade's supervisor. Often, a simple discussion about timing can resolve the issue — perhaps you can work mornings in one area and they work afternoons, or you can sequence your work differently. If direct discussion does not work, raise it at the weekly coordination meeting. The site manager or principal contractor's team can arbitrate. Never start a 'turf war' by trying to force access — this creates conflict and usually makes both trades less productive. Be solutions-focused: suggest alternatives rather than just highlighting the problem."
  },
  {
    question: "Should I report damage caused by other trades to my completed work?",
    answer: "Yes, always. Take photographs of the damage with a timestamp. Report it to the other trade's supervisor and to the site manager. Send an email confirming what happened, when, and what impact it has on your programme and costs. This is not about blame — it is about accountability and ensuring the damage is repaired to the correct standard. If damage is recurring, it may indicate a programme sequencing problem that needs to be addressed at management level. Unreported damage can lead to quality failures, failed inspections, and disputes about who is responsible for remedial work."
  },
  {
    question: "How can I build better relationships with other trade supervisors when we disagree on priorities?",
    answer: "The key is separating the professional disagreement from the personal relationship. You can disagree on sequencing, priorities, or programme issues while still being respectful and collaborative. Attend coordination meetings and social events. Help other trades when you can — reciprocity is powerful. Share information freely. Be honest about your constraints and ask about theirs. Find compromise positions where possible and escalate through proper channels when you cannot. Remember, the construction world is small — you will likely work with these people again on future projects. A reputation for being fair, competent, and professional is one of the most valuable things you can have."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "On a multi-trade construction site, the most common source of conflict between trades is:",
    options: [
      "Disagreements about pay rates between different employers",
      "Sequencing and access disputes — who works where and when",
      "Personal grudges between individual workers",
      "Disputes about which trade has the most important role"
    ],
    correctAnswer: 1,
    explanation: "Sequencing and access disputes are the most common source of conflict between trades on construction sites. These arise when multiple trades need to work in the same area, when one trade's work depends on another completing theirs first, or when containment routes clash. Effective coordination and communication prevent most of these conflicts."
  },
  {
    id: 2,
    question: "When a new subcontractor arrives on your work area, you should:",
    options: [
      "Leave them to get on with it — they are professionals and know what to do",
      "Set clear expectations about quality standards, timelines, access, safety, and site rules from day one",
      "Wait to see their work quality before deciding whether to get involved",
      "Only interact with them if there is a problem"
    ],
    correctAnswer: 1,
    explanation: "From the first day, set clear expectations about quality standards, timelines, access arrangements, welfare, PPE requirements, and safety standards. Never assume subcontractors know your standards — they have worked on different sites with different supervisors. Put expectations in writing where possible."
  },
  {
    id: 3,
    question: "The best way to avoid containment route clashes between electrical and mechanical services is:",
    options: [
      "Install your containment first so that other trades have to work around you",
      "Pre-plan using drawings and markups, agreeing routes and penetrations before work starts",
      "Wait for the architect to resolve all routing decisions",
      "Install containment wherever is most convenient and relocate if there is a clash"
    ],
    correctAnswer: 1,
    explanation: "Pre-planning using drawings and markups is the most effective way to avoid containment clashes. Before starting, meet with other trade supervisors to agree containment routes, penetration locations, and access routes. This prevents the costly and frustrating process of moving installed work because of avoidable clashes."
  },
  {
    id: 4,
    question: "If another trade damages your completed electrical work, the correct response is to:",
    options: [
      "Ignore it and repair the damage yourself without telling anyone",
      "Refuse to carry out any further work until the damage is repaired",
      "Document the damage with photographs, approach the matter professionally, and raise it through proper channels",
      "Retaliate by removing their work from the affected area"
    ],
    correctAnswer: 2,
    explanation: "The professional approach is to document the damage with photographs, approach the other trade's supervisor calmly and factually, and raise the issue through the site management chain if direct discussion does not resolve it. This protects you contractually and maintains working relationships."
  },
  {
    id: 5,
    question: "Attending coordination meetings with other trades is important because:",
    options: [
      "It gives you time away from productive work on site",
      "It allows you to complain about other trades to the site manager",
      "It enables trades to agree sequencing, resolve clashes, and coordinate programmes proactively",
      "It is only necessary when there is already a conflict to resolve"
    ],
    correctAnswer: 2,
    explanation: "Coordination meetings are essential for proactive programme management. They allow trades to agree sequencing, resolve potential clashes before they become on-site problems, coordinate access, and share information about programme changes. Regular attendance prevents far more problems than it creates."
  },
  {
    id: 6,
    question: "Building professional relationships with other trade supervisors is valuable because:",
    options: [
      "It allows you to get preferential treatment over other trades",
      "The construction industry is small, you will work with these people again, and good relationships make sites run more smoothly",
      "It means you never have to raise formal complaints about poor work",
      "It guarantees that other trades will never damage your work"
    ],
    correctAnswer: 1,
    explanation: "The construction industry is smaller than most people realise. You will encounter the same trade supervisors, foremen, and managers on future projects. A reputation for being fair, competent, and professional opens doors. Good relationships also make day-to-day coordination smoother and help resolve problems quickly and amicably."
  },
  {
    id: 7,
    question: "When addressing quality issues with another trade's work that affects your installation, you should:",
    options: [
      "Bypass their supervisor and go directly to their operatives",
      "Document the issue, approach their supervisor professionally, and escalate through the site management chain if needed",
      "Post about the issue on social media to shame the company",
      "Modify your own installation to work around the problem without telling anyone"
    ],
    correctAnswer: 1,
    explanation: "The professional approach is to document the issue (with photographs), speak to the other trade's supervisor directly, and if the issue is not resolved, escalate through the site management chain. Always keep the conversation factual and professional. Document all communications in case the issue becomes a formal dispute."
  },
  {
    id: 8,
    question: "Which of the following trades does an electrical supervisor typically need to coordinate with?",
    options: [
      "Only the mechanical (HVAC) trade, as they are the closest to electrical work",
      "Only trades that are part of the same employer",
      "Multiple trades including mechanical, plumbing, data/comms, fire alarm, drylining, plastering, painting, and flooring",
      "Only the principal contractor's directly employed workforce"
    ],
    correctAnswer: 2,
    explanation: "An electrical supervisor must coordinate with many trades: mechanical (HVAC), plumbing, data/communications, fire alarm, drylining, plastering, painting, flooring, and others. Each trade has its own programme, culture, and priorities. Effective coordination across all of them is essential for smooth project delivery."
  }
];

export default function LeadershipModule5Section2() {
  useSEO({
    title: "Managing Subcontractors and Other Trades | Leadership Module 5.2",
    description: "How to coordinate with subcontractors and other trades on multi-trade construction sites — setting expectations, sequencing, quality, and building professional relationships.",
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
            <Link to="../leadership-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Users className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Subcontractors and Other Trades
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Multi-trade coordination, setting expectations, managing quality across teams, and building the professional relationships that make complex sites work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reality:</strong> Multiple trades share spaces with interdependent programmes</li>
              <li><strong>Key skill:</strong> Coordination and sequencing across trades</li>
              <li><strong>Approach:</strong> Professional, factual, documented communication</li>
              <li><strong>Goal:</strong> Build a reputation as fair, competent, and easy to work with</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Trades to Coordinate</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Mechanical:</strong> HVAC &mdash; containment routes, plant rooms</li>
              <li><strong>Drylining:</strong> Back boxes, containment access, fire barriers</li>
              <li><strong>Plumbing:</strong> Penetrations, risers, plant room sequencing</li>
              <li><strong>Fire alarm:</strong> Zoning, detector positions, cause-and-effect</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain the challenges of multi-trade coordination on construction sites",
              "Set clear expectations for subcontractors from day one",
              "Pre-plan containment routes and sequencing to avoid clashes",
              "Address quality issues with other trades professionally and constructively",
              "Build professional relationships that survive disagreements",
              "Document issues and escalate through appropriate channels when necessary"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Reality of Multi-Trade Coordination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Reality of Multi-Trade Coordination
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On any construction project of reasonable size, multiple trades work simultaneously in
                shared spaces with interdependent programmes. Each trade has its own culture, norms,
                commercial pressures, and priorities. As an electrical supervisor, you do not work in
                isolation &mdash; you are one part of a complex, interconnected system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Trades You Will Coordinate With</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Services Trades</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Mechanical (HVAC) &mdash; ductwork routes, plant rooms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Plumbing &mdash; pipework, risers, penetrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Data/comms &mdash; shared containment, comms rooms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Fire alarm &mdash; detector positions, cause-and-effect</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Finishing Trades</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Drylining &mdash; back boxes, access panels, fire barriers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Plastering &mdash; must finish before second fix</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Painting &mdash; sequence after fittings installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Flooring &mdash; protection after floor socket installation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Sequencing Is Everything</p>
                <p className="text-base text-white leading-relaxed">
                  The order in which trades carry out their work is critical. First fix electrical must
                  happen before drylining closes up walls. Containment must be installed before cables
                  are pulled. Plastering must be complete before second fix fittings. Get the sequence
                  wrong and you create rework, delays, and conflict.
                </p>
              </div>

              <p>
                Each trade has its own commercial pressures and programme. The mechanical contractor wants
                to get their ductwork in early because it takes up the most space. The plumber wants to
                pressure-test before the walls are closed up. The dryliner wants to board and plaster in
                one continuous run without stopping for every back box you forgot to install. Understanding
                these competing pressures &mdash; and finding workable compromises &mdash; is a core
                skill of effective multi-trade coordination.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Typical Electrical Sequencing on a Construction Project</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Phase 1 &mdash; Containment:</strong> Cable tray, basket, trunking, and conduit installed after structure is complete but before other services fill the ceiling void</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Phase 2 &mdash; First fix:</strong> Back boxes, floor boxes, conduit drops, and cable pulling. Must be complete before drylining and plastering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Phase 3 &mdash; Second fix:</strong> Accessories, luminaires, distribution board terminations. Requires plastering and decoration to be substantially complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Phase 4 &mdash; Testing and commissioning:</strong> Full test and inspection, commissioning of systems, handover documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Setting Clear Expectations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Setting Clear Expectations
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                From the very first day a subcontractor or new trade arrives on your work area, be
                absolutely clear about what you expect. Do not assume they know your standards &mdash;
                they have been on different sites with different supervisors, and every site is different.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Day-One Expectations Briefing</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Quality standards</strong> &mdash; what is acceptable and what is not. Show examples of the standard you expect. Be specific about fixings, alignments, labelling, and finish quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Areas of work</strong> &mdash; exactly which zones, floors, or rooms they are working in. Clear boundaries prevent overlap and conflict.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Timelines</strong> &mdash; when you need their work completed by, including interim milestones. Link to the overall programme so they understand the context.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Access arrangements</strong> &mdash; working hours, restricted areas, key holding, scaffold access, permit requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Welfare and site rules</strong> &mdash; welfare facilities, smoking areas, parking, waste disposal, housekeeping standards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">PPE and safety standards</strong> &mdash; mandatory PPE, site-specific hazards, emergency procedures, reporting requirements.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Put It in Writing</p>
                </div>
                <p className="text-sm text-white/80">
                  Where possible, put your expectations in writing. A simple email confirming what was
                  discussed, what standards are expected, and what the key dates are creates a reference
                  point for both sides. If a dispute arises later, you have evidence that expectations
                  were communicated clearly from the start.
                </p>
              </div>

              <p>
                Setting expectations is not a one-off event. As work progresses, conditions change, and
                new challenges emerge, you will need to <strong>reinforce and update</strong> your
                expectations. Regular check-ins with subcontractor foremen &mdash; even a five-minute
                conversation at the start of each day &mdash; keep standards consistent and catch problems
                early. The investment in communication always pays for itself in reduced rework and
                fewer disputes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Expectations That Get Missed</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Housekeeping standards</strong> &mdash; cleaning up at the end of each shift, removing waste, keeping corridors and escape routes clear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Protection of completed work</strong> &mdash; covering finished surfaces, protecting installed fittings, not stacking materials on completed work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Fire barrier reinstatement</strong> &mdash; ensuring all penetrations through fire-rated walls and floors are properly fire-stopped after services installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Labelling and identification</strong> &mdash; marking cables, circuits, and distribution boards clearly during installation, not leaving it until second fix</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Coordination and Sequencing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Coordination and Sequencing
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most common source of conflict between trades is sequencing: &ldquo;I can&rsquo;t
                do my second fix until the plasterer&rsquo;s finished, but they won&rsquo;t plaster
                until the plumber moves his pipes.&rdquo; These circular dependencies are a daily reality
                on construction sites and require proactive coordination to resolve.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Coordination Strategies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Proactive Measures</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Attend weekly coordination meetings without fail</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Build relationships with other trade supervisors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Communicate programme changes early</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Pre-plan clash avoidance using drawings</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Clash Avoidance</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Use drawings and markups to agree containment routes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Agree penetration locations before drilling begins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Agree access routes and shared scaffold times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Walk the ceiling void together before starting work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Be flexible where possible but firm on quality. If another trade asks you to adjust your
                containment route by 100mm to accommodate their ductwork, and it does not compromise your
                installation, accommodate them. Flexibility builds goodwill and is reciprocated. But if
                a compromise would affect cable capacity, segregation distances, or BS 7671 compliance,
                explain why and stand firm.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Coordination Meeting Best Practice</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Attend every meeting</strong> &mdash; decisions get made whether you are there or not. If you are absent, decisions will be made without your input and may not suit your programme.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Come prepared</strong> &mdash; bring your look-ahead programme, a list of areas you need access to, and any issues that need resolving. Being prepared shows professionalism and gets better results.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Raise issues early</strong> &mdash; do not wait for problems to become crises. If you can see a sequencing clash developing two weeks ahead, raise it now while there is time to resolve it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Follow up actions</strong> &mdash; if commitments are made at the meeting, check they are being delivered. A coordination meeting is only useful if actions are followed through.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Sequencing Trap</p>
                </div>
                <p className="text-sm text-white/80">
                  The biggest sequencing trap is assuming &ldquo;they&rsquo;ll be finished by then.&rdquo;
                  Never assume &mdash; confirm. Check daily that predecessor trades are on track. If you
                  can see they are falling behind, raise it immediately rather than waiting until their
                  delay blocks your work. Early warning gives everyone more options.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Quality and Standards Across Teams */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Quality and Standards Across Teams
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your work is only as good as the trades around you. If the dryliner damages your
                containment, if the plasterer fills your back boxes with plaster, or if the flooring
                contractor drives a heavy trolley over your floor boxes, the quality of your installation
                is compromised &mdash; even though you did everything right.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Quality Issues Between Trades</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Back boxes filled with plaster</strong> &mdash; plasterers covering socket and switch positions. This requires time-consuming cleaning or replacement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Containment damaged by other trades</strong> &mdash; cable tray bent, trunking lids removed, basket tray crushed by heavy items being placed on it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Cables cut or disturbed</strong> &mdash; other trades cutting through cables when drilling or chasing. This is both a quality and safety issue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Fire barrier integrity compromised</strong> &mdash; trades breaching fire barriers without proper reinstatement. This is a serious life-safety issue.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Document Everything</p>
                </div>
                <p className="text-sm text-white/80">
                  When you identify damage or quality issues caused by another trade, take photographs
                  immediately with a timestamp. Note the location, date, time, and the trade responsible.
                  Approach the other trade&rsquo;s supervisor calmly and factually. Do not get into
                  slanging matches on the work floor &mdash; it is unprofessional and counterproductive.
                  If direct discussion does not resolve it, raise the issue through the site management
                  chain with your photographic evidence.
                </p>
              </div>

              <p>
                Prevention is always better than cure. Consider proactive measures to protect your
                completed work: use temporary covers over back boxes and floor boxes, clearly label
                areas where electrical work is complete with &ldquo;DO NOT DISTURB&rdquo; signs, and
                discuss protection requirements at coordination meetings. When other trades understand
                the impact of damaging electrical work &mdash; including the safety implications of
                cutting through cables &mdash; they are more likely to take care.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Professional Escalation Ladder</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 1:</strong> Direct conversation with the other trade&rsquo;s supervisor or foreman. Most issues resolve here when handled professionally.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 2:</strong> Follow-up email confirming the discussion and agreed actions. Creates a paper trail if the issue recurs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 3:</strong> Raise at the weekly coordination meeting with the site manager present. Formal forum with minutes and recorded actions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 4:</strong> Formal written complaint through the principal contractor&rsquo;s management chain. Include photographic evidence, dates, and previous attempts to resolve.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Building Professional Relationships */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Building Professional Relationships
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when you disagree with other trade supervisors &mdash; and you will &mdash; maintain
                professionalism. The construction world is smaller than you think. You will work with
                these people again on future projects, sometimes in different roles or for different
                employers. Your reputation travels with you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Handshake className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Building Your Professional Reputation</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Be professional always</strong> &mdash; even under pressure, even when provoked, even when you are right and they are wrong. Losing your temper loses you respect.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Help other trades when you can</strong> &mdash; reciprocity is one of the most powerful forces in human relationships. If you help them today, they are far more likely to help you tomorrow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Share information freely</strong> &mdash; do not hoard programme information, design changes, or site intelligence. Share it and build trust.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Attend coordination meetings and social events</strong> &mdash; being present and engaged builds relationships. Do not be the supervisor who is always absent or disengaged.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Build a reputation for fairness and competence</strong> &mdash; be someone that other trades respect. This makes every aspect of coordination easier.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Remember:</strong> The best supervisors are known not
                  just for technical competence, but for being easy to work with. When the site manager
                  is putting together a team for the next project, they pick supervisors who coordinate
                  well, communicate effectively, and do not create unnecessary conflict. Your interpersonal
                  skills are as important as your technical skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Managing subcontractors and coordinating with other trades is one of the most challenging
                and important aspects of the supervisor&rsquo;s role. The key points from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Multi-trade reality:</strong> Multiple trades share spaces with interdependent programmes. Sequencing is everything &mdash; get it wrong and you create rework, delays, and conflict.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Set expectations early:</strong> From day one, be clear about quality, timelines, access, safety, and site rules. Put it in writing. Never assume they know your standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Pre-plan to avoid clashes:</strong> Use drawings and markups to agree containment routes, penetrations, and access before starting work. Attend coordination meetings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Address quality issues professionally:</strong> Document damage with photographs. Approach calmly and factually. Escalate through proper channels if direct discussion fails.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Build professional relationships:</strong> Be fair, competent, and easy to work with. Help others. Share information. The construction world is small &mdash; your reputation follows you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Be flexible but firm:</strong> Accommodate other trades where possible, but never compromise on quality, safety, or regulatory compliance.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 3, we will examine your role
                  as a health and safety leader &mdash; your legal duties under CDM 2015 and HASAWA 1974,
                  leading by example, building safety culture, conducting meaningful inductions, and having
                  the courage to stop unsafe work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5-section-3">
              Next: Health and Safety Leadership
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
