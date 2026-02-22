import {
  ArrowLeft,
  Hammer,
  CheckCircle,
  HelpCircle,
  Camera,
  AlertTriangle,
  Shield,
  Handshake,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-4-1-check1',
    question:
      'A plumber has routed hot water pipes directly through a cable route you marked out two weeks ago. What is the most professional first step?',
    options: [
      'Rip the pipes out and reinstall your cables',
      'Go straight to the site manager and demand the plumber is removed from site',
      'Speak directly to the plumber, show your marked route, and discuss a solution together',
      'Ignore it and route your cables around the pipes without telling anyone',
    ],
    correctIndex: 2,
    explanation:
      'Direct conversation is always the correct first step in any inter-trade dispute. Approaching the plumber calmly, showing evidence of your marked route, and seeking a collaborative solution demonstrates professionalism and usually resolves the issue far faster than escalation. Most trade disputes arise from poor communication, not malice, and a face-to-face conversation often reveals that the other person was simply unaware of the conflict. Escalation to the site manager should only happen if direct conversation fails to produce a resolution.',
  },
  {
    id: 'cr-4-1-check2',
    question:
      'Under CDM 2015, who has the legal duty to coordinate work between different trades on a multi-contractor site?',
    options: [
      'Each individual subcontractor',
      'The client who is paying for the work',
      'The principal contractor',
      'The architect or designer',
    ],
    correctIndex: 2,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the principal contractor has the legal duty to plan, manage and coordinate work carried out by all contractors on a multi-contractor site. This includes ensuring that work is sequenced to minimise conflict between trades, that access arrangements are managed fairly, and that health and safety is maintained across all activities. While individual contractors have their own duties under CDM 2015, the coordination role belongs squarely to the principal contractor.',
  },
  {
    id: 'cr-4-1-check3',
    question: 'Why is photographic evidence important when another trade damages your work?',
    options: [
      'To embarrass the other trade on social media',
      'To create a factual record that supports your account if the dispute escalates',
      'To prove you are a better tradesperson than them',
      'It is not important — verbal accounts are always sufficient',
    ],
    correctIndex: 1,
    explanation:
      "Photographic evidence creates an objective, timestamped record that cannot be disputed or altered by memory. If a damage dispute escalates to the site manager, contracts manager, or even adjudication, photographs provide clear proof of what happened, when it happened, and the extent of the damage. Without photographic evidence, disputes become one person's word against another's, and the outcome often depends on who is more persuasive rather than who is correct. Modern smartphones make it effortless to capture evidence — there is no excuse for not doing so.",
  },
];

const faqs = [
  {
    question: 'What should I do if the same trade keeps damaging my work repeatedly?',
    answer:
      'If damage from the same trade is recurring, you need to escalate beyond a one-to-one conversation. Document every instance with photographs, dates, times and descriptions. After your second direct conversation with the individual, put your concerns in writing to the site manager or principal contractor, referencing the specific incidents and the pattern of repeated damage. Request a formal coordination meeting to agree access sequences and responsibilities. Under CDM 2015, the principal contractor has a duty to coordinate work between trades — repeated damage to your installations suggests they are not fulfilling this duty effectively. Keep copies of all correspondence.',
  },
  {
    question: 'Can I charge another trade for repairing damage they caused to my installation?',
    answer:
      'In principle, yes — if another trade damages your completed work, they are liable for the cost of repair. However, in practice, recovering costs from another subcontractor on the same site can be difficult. Your most effective route is usually through the main contractor or principal contractor: report the damage formally in writing with photographic evidence, request that the MC arranges (and pays for) the repair, and let the MC recover the cost from the trade responsible. If you repair the damage yourself, keep detailed records of time, materials and costs. Your subcontract agreement with the MC may contain specific provisions for damage by other trades — check your contract terms before proceeding.',
  },
  {
    question: 'How do I handle a situation where two trades need the same space at the same time?',
    answer:
      'Access clashes are one of the most common sources of site conflict, and they are almost always the result of poor programming or inadequate coordination by the principal contractor. The professional approach is threefold. First, raise the clash early — as soon as you see from the programme that two trades will need the same area simultaneously, flag it to the site manager before it becomes a problem. Second, propose a solution rather than just presenting the problem — suggest staggered access times, split the area into zones, or agree which trade takes priority based on the critical path. Third, if the clash cannot be resolved at site level, put your concerns in writing to the contracts manager and request a formal programme review. Never attempt to resolve an access clash through intimidation or territorial behaviour.',
  },
  {
    question:
      'Is it worth raising small issues, or should I just absorb minor damage to keep the peace?',
    answer:
      'You should always raise issues, even small ones — but the way you raise them matters enormously. Ignoring minor damage sets a precedent that your work can be treated carelessly without consequence. However, charging into a confrontation over a scuffed cable clip is equally counterproductive. The professional middle ground is to mention it calmly and directly to the person responsible: "Just to let you know, a couple of clips got knocked off when the plasterboard went in. No big deal this time, but if you could keep an eye out for the cables in that area going forward, I would appreciate it." This addresses the issue without creating conflict, and it establishes that you notice and care about the quality of your installation. If small issues become a pattern, escalate as described above.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the single most common cause of disputes between different trades on a construction site?',
    options: [
      'Personal grudges between individual tradespeople',
      "Deliberate sabotage of other trades' work",
      'Poor communication and inadequate coordination of work sequences',
      'Different trades using incompatible materials',
    ],
    correctAnswer: 2,
    explanation:
      "The vast majority of inter-trade disputes arise from poor communication and inadequate coordination, not personal malice. When trades are not properly sequenced, when access arrangements are unclear, or when one trade does not know what another has installed, conflicts are inevitable. This is why CDM 2015 places such emphasis on the principal contractor's coordination duties — most site conflicts are systemic rather than personal.",
  },
  {
    id: 2,
    question:
      'A plasterer has accidentally covered several of your back boxes with plaster. What is the correct professional response?',
    options: [
      'Dig out the back boxes yourself and send the plasterer the bill',
      'Report the damage to the site manager and let them handle it',
      'Speak to the plasterer first, show them the affected areas, and ask them to carefully clear the plaster from the boxes',
      'Leave it and fit the face plates on top of the plaster',
    ],
    correctAnswer: 2,
    explanation:
      'Direct conversation with the plasterer is the correct first step. They may not have realised the back boxes were there, or they may have assumed they would be relocated. A professional, face-to-face conversation gives them the opportunity to rectify the issue immediately — most plasterers will be happy to carefully remove the plaster from the boxes. Escalating to the site manager without first speaking to the plasterer skips a crucial step and can damage working relationships. Leaving the boxes covered is not an option as it compromises the quality and safety of the installation.',
  },
  {
    id: 3,
    question:
      "Under CDM 2015, what is the principal contractor's duty regarding trade coordination?",
    options: [
      'They have no specific duty — each trade is responsible for their own coordination',
      'They must plan, manage and coordinate health and safety and work sequences across all contractors',
      'They only need to coordinate trades if a dispute has already occurred',
      'They must ensure all trades have the same working hours',
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 13 of CDM 2015, the principal contractor must plan, manage and monitor the construction phase, including coordinating the work of all contractors to ensure health and safety. This explicitly includes sequencing work to prevent conflicts, managing access arrangements, and ensuring that one trade's activities do not create risks for another. The principal contractor's coordination duty is proactive — they should prevent conflicts before they arise, not merely react to them.",
  },
  {
    id: 4,
    question:
      'You discover that a carpenter has drilled through one of your cables while fitting a stud wall. What should you do first?',
    options: [
      'Isolate the affected circuit immediately to prevent any risk of electric shock',
      'Find the carpenter and confront them about the damage',
      'Continue working and deal with it at the end of the day',
      'Report it to the site manager by email',
    ],
    correctAnswer: 0,
    explanation:
      'Safety always comes first. A damaged cable represents an immediate risk of electric shock, short circuit or fire. Your first action must be to isolate the affected circuit at the distribution board to make it safe. Only after the circuit is isolated should you assess the extent of the damage, photograph it for your records, and then speak to the carpenter and the site manager. Continuing to work with a known damaged cable, or delaying the isolation to have a conversation, puts lives at risk.',
  },
  {
    id: 5,
    question:
      'Which of the following is the best approach when documenting damage caused by another trade?',
    options: [
      'Take a single photograph and mention it to a colleague',
      'Take multiple photographs showing the damage, the surrounding area, and any identification marks, noting the date, time and circumstances',
      'Write a description from memory at the end of the week',
      'Ask the person who caused the damage to sign a confession',
    ],
    correctAnswer: 1,
    explanation:
      'Thorough documentation includes multiple photographs showing the damage from different angles, the surrounding area for context, and any identification marks (circuit numbers, floor/room identifiers). Accompany the photographs with written notes recording the exact date, time, location, what was damaged, and what you observed. Do this immediately — memory fades and details become confused over time. This level of documentation will support your position if the dispute escalates to the contracts manager or beyond.',
  },
  {
    id: 6,
    question:
      'A heating engineer insists on running their pipes through the cable tray you have already installed. They claim they were on site first. What principle should guide your response?',
    options: [
      'Whoever was on site first has absolute priority over all routes',
      'The trade with the more expensive materials takes priority',
      'The issue should be resolved based on the agreed programme, drawings and coordination plan, not on who arrived first',
      'You should remove your cable tray to avoid conflict',
    ],
    correctAnswer: 2,
    explanation:
      'The "who was here first" argument has no standing in professional construction. Routing priorities are determined by the agreed programme, the coordination drawings, and the principal contractor\'s site coordination plan — not by who physically installed their work first. If there is a genuine routing conflict, both trades should refer it to the site manager for resolution based on the project documentation. Removing your completed work to accommodate another trade\'s unplanned routing would be unprofessional and potentially costly.',
  },
  {
    id: 7,
    question:
      'Why is it important to handle inter-trade disputes professionally, even when the other party is clearly in the wrong?',
    options: [
      'Because you might get fired if you argue',
      'Because your professional reputation follows you, and construction is a small industry',
      'Because the other trade might be physically larger than you',
      'Because it does not matter who is right or wrong on site',
    ],
    correctAnswer: 1,
    explanation:
      'The construction industry is remarkably small in terms of professional reputation. Site managers, contracts managers and project managers talk to each other, and your reputation as someone who handles disputes professionally — or unprofessionally — will follow you from job to job. An electrician known for being calm, factual and solution-oriented will always be preferred over one known for confrontation, even if the confrontational one is technically more skilled. Professional dispute handling is a career investment.',
  },
  {
    id: 8,
    question:
      'What is the recommended escalation sequence for an inter-trade dispute that cannot be resolved through direct conversation?',
    options: [
      'Social media post → union representative → solicitor',
      'Direct conversation → site manager → written correspondence to contracts manager → formal dispute process',
      'Email to managing director → legal action → refusal to return to site',
      'Ignore the problem → complain to colleagues → leave the job',
    ],
    correctAnswer: 1,
    explanation:
      'The correct escalation sequence starts with direct conversation between the two parties, which resolves the majority of disputes. If this fails, the next step is to raise the issue with the site manager, who has the authority to coordinate between trades on site. If the site manager cannot resolve it, the dispute should be escalated in writing to the contracts manager, providing full documentation including photographs and a factual account. Only if all these steps fail should formal dispute processes such as adjudication or contractual claims be considered. Each step is more formal, more time-consuming and more relationship-damaging than the last — which is why starting with a direct conversation is so important.',
  },
];

export default function CRModule4Section1() {
  useSEO({
    title: 'Disputes with Other Trades | Conflict Resolution Module 4.1',
    description:
      'Inter-trade conflicts, damaged work, access disputes, CDM 2015 coordination duties, and professional resolution strategies for electricians on construction sites.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4">
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
            <Hammer className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Disputes with Other Trades
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to handle inter-trade conflicts professionally, protect your work, and use CDM 2015
            coordination duties to your advantage
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Root cause:</strong> Most disputes come from poor coordination, not malice
              </li>
              <li>
                <strong>First step:</strong> Always speak directly to the person involved before
                escalating
              </li>
              <li>
                <strong>Document everything:</strong> Photographs, dates, times and written records
              </li>
              <li>
                <strong>CDM 2015:</strong> The principal contractor has a legal duty to coordinate
                between trades
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Damaged cables can cause electric shock, short circuits and
                fire
              </li>
              <li>
                <strong>Cost:</strong> Rework caused by other trades costs time and money you may
                not recover
              </li>
              <li>
                <strong>Reputation:</strong> How you handle disputes defines your professional
                standing
              </li>
              <li>
                <strong>Career:</strong> Conflict management is essential for supervisory and
                management roles
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the most common causes of inter-trade disputes on construction sites and explain why they occur',
              'Apply the direct-conversation-first approach to resolve disputes before they escalate',
              'Document damage and disputes using photographs, written records and professional correspondence',
              "Explain the principal contractor's coordination duties under CDM 2015 Regulation 13",
              'Distinguish between disputes that can be resolved at site level and those that require formal escalation',
              'Demonstrate professional conduct during inter-trade conflicts to protect your reputation and career prospects',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Multi-Trade Reality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Multi-Trade Reality
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A modern construction site is a complex, dynamic environment where multiple trades
                work in close proximity, often simultaneously, and frequently under intense time
                pressure. Electricians, plumbers, heating engineers, plasterers, carpenters,
                decorators, roofers, bricklayers and dozens of other specialists must all share the
                same physical space, the same access routes, and the same programme deadlines. In
                this environment, conflict is not a possibility &mdash; it is a certainty. The
                question is not whether you will experience inter-trade disputes, but how you will
                handle them when they arise.
              </p>

              <p>
                Understanding the common types of inter-trade conflict is the first step towards
                managing them effectively. When you can recognise the pattern of a dispute, you can
                respond with the appropriate strategy rather than reacting emotionally in the
                moment. Most inter-trade conflicts fall into one of five categories, and each has
                its own dynamics and resolution approaches.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Five Common Types of Inter-Trade Conflict
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">1. Damaged Work</p>
                    <p className="text-xs text-white">
                      Another trade damages your completed installation &mdash; cables cut, back
                      boxes plastered over, containment bent or removed, accessories scratched. This
                      is the most common and most frustrating type of inter-trade dispute because it
                      directly costs you time and money to rectify.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">2. Access Disputes</p>
                    <p className="text-xs text-white">
                      Two or more trades need to work in the same area at the same time. Neither can
                      complete their work without the space, and neither wants to stand down and
                      lose programme time. Access disputes are particularly common in small rooms
                      such as bathrooms, plant rooms and risers.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">3. Programme Clashes</p>
                    <p className="text-xs text-white">
                      The programme requires one trade to finish before another can start, but the
                      first trade is running late. Your second fix cannot begin until the plasterer
                      has finished, but the plasterer is three days behind. Meanwhile, the main
                      contractor is holding you to your original completion date.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">4. Noise and Mess</p>
                    <p className="text-xs text-white">
                      A trade working nearby creates excessive noise, dust or debris that prevents
                      you from working safely or effectively. Core drilling next to your testing
                      area, chasing creating dust clouds over your open distribution boards, or
                      general site mess blocking your access routes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">5. Territorial Behaviour</p>
                    <p className="text-xs text-white">
                      A trade or individual claims ownership of a particular area or resource
                      &mdash; "this is my section of the site," "those are my skips," "that welfare
                      facility is for my lads only." Territorial behaviour is unprofessional and
                      usually stems from insecurity or poor management, but it can create genuine
                      access problems if not addressed.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The crucial thing to understand about all five types is that they are almost always
                systemic rather than personal. The plumber who routes through your cable run is not
                doing it to spite you &mdash; they are doing it because nobody coordinated the
                routing, because they did not know your cables were there, or because the programme
                put them under pressure to find the quickest route. Recognising that most
                inter-trade conflicts arise from poor systems, not bad people, is the foundation of
                professional conflict resolution on site.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The "Who Was Here First" Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The &ldquo;Who Was Here First&rdquo; Problem
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common arguments on a construction site is the "who was here first"
                dispute. An electrician installs first fix cabling, marks out cable routes, and
                leaves the area. A plumber arrives a week later and routes hot water pipes directly
                through the marked cable zone. When the electrician returns for second fix, they
                find their cables displaced, damaged or inaccessible. The plumber claims they had no
                choice because the cable routes were not clearly marked. The electrician insists
                they were. Both trades lose time and money, and the project suffers.
              </p>

              <p>
                This problem is endemic in construction because of the way work is sequenced. First
                fix electrical work typically happens early in the programme, often before
                mechanical, plumbing and other services installations. Your cables, containment and
                back boxes are installed and left exposed while other trades work around them. Every
                trade that follows you has the potential to damage, obstruct or interfere with your
                installation. The specific scenarios you will encounter repeatedly include plumbers
                routing pipes through your cable routes, plasterers covering your back boxes with
                plaster, carpenters drilling through cables while fitting stud walls or doorframes,
                flooring contractors driving screws through cables in the floor zone, and decorators
                painting over your accessories.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Protecting Your Work During First Fix
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Mark cable routes clearly.</strong> Use high-visibility tape, marker
                      spray or cable route labels. The more visible your routes are, the harder it
                      is for another trade to claim they did not see them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Photograph your installation before leaving.</strong> Take dated
                      photographs of your completed first fix, including cable routes, back box
                      positions and containment runs. This creates an indisputable record of the
                      state of your work before other trades accessed the area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Communicate with following trades.</strong> Before leaving an area,
                      speak to the site manager or foreman about which trades will be working there
                      next. Flag any areas where your installation is vulnerable to damage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Use mechanical protection where appropriate.</strong> In high-risk
                      areas (floor zones, stud walls), use steel capping plates, conduit or other
                      mechanical protection to prevent accidental cable damage. BS 7671 requires
                      this in certain situations regardless of other trade activity.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The fundamental truth about the "who was here first" argument is that it has no
                legitimate standing in professional construction. Work priorities are determined by
                the agreed programme, the coordination drawings, and the principal
                contractor&rsquo;s site rules &mdash; not by who physically installed their work
                first. If there is a genuine routing conflict between two services, it should be
                resolved through the design coordination process, not through a territorial argument
                on site. When you find yourself in a "who was here first" dispute, redirect the
                conversation from blame to solution: "Let&rsquo;s look at the drawings and work out
                the best route for both of us."
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: ACAS Principles for Trade Disputes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            ACAS Principles for Trade Disputes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Advisory, Conciliation and Arbitration Service (ACAS) provides guidance on
                workplace dispute resolution that applies directly to construction site conflicts.
                While ACAS is most commonly associated with employment disputes, their core
                principles of early intervention, fact-based discussion and solution-focused
                dialogue are equally effective for inter-trade disputes. Applying these principles
                consistently will resolve the vast majority of site conflicts before they escalate.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Handshake className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Three ACAS Principles Applied to Trade Disputes
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Address Early</p>
                      <p className="text-xs text-white mt-1">
                        Do not let issues fester. A minor cable clip knocked off today becomes a
                        pattern of disrespect if left unaddressed for weeks. The longer you wait to
                        raise an issue, the harder it becomes to resolve calmly because resentment
                        builds on your side and the other person has moved on mentally. Raise issues
                        within hours, not days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Focus on Facts, Not Personalities
                      </p>
                      <p className="text-xs text-white mt-1">
                        "Three of my back boxes in flat 14 have been plastered over" is a factual
                        statement that invites a solution. "You&rsquo;re always sloppy and careless"
                        is a personal attack that invites a fight. Describe what happened, where it
                        happened, and what the impact is &mdash; without characterising the other
                        person&rsquo;s intentions, competence or attitude. Even if you believe the
                        damage was caused by carelessness, framing it as a fact rather than a
                        character judgement keeps the conversation productive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Seek Solutions, Not Blame</p>
                      <p className="text-xs text-white mt-1">
                        The goal of raising an issue is to fix the problem and prevent it happening
                        again &mdash; not to punish the other person. "How can we make sure this
                        doesn&rsquo;t happen in the next set of flats?" is far more productive than
                        "You need to pay for the damage you caused." Solution-focused conversations
                        build relationships; blame-focused conversations destroy them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The direct conversation should always be your first step. Walk over to the person
                involved, explain what you have found, show them the evidence, and ask how you can
                resolve it together. In the vast majority of cases, this will be enough. The other
                tradesperson did not know about the conflict, or did not realise the impact of their
                work, and will be willing to rectify it or adjust their approach going forward.
              </p>

              <p>
                Only when direct conversation fails should you escalate to the site manager or
                principal contractor&rsquo;s representative. And if you do escalate, do so
                factually: "I spoke to the plastering team about the covered back boxes on Tuesday,
                but the same thing happened again in the next set of flats. I think we need a
                coordination meeting to agree the sequence." This demonstrates that you tried to
                resolve it yourself first, which site managers respect and expect.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Documentation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Documentation &mdash; Your Best Protection
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In any dispute that goes beyond a quick on-site conversation, documentation is your
                most powerful tool. Without evidence, a dispute becomes one person&rsquo;s word
                against another&rsquo;s. With evidence &mdash; photographs, written records, dated
                correspondence &mdash; your position is supported by objective facts that are
                difficult to dispute. The habit of documenting damage, disputes and agreements
                should become second nature for every electrician working on a construction site.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Documentation Checklist for Trade Disputes
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Photographs</p>
                    <p className="text-xs text-white">
                      Take multiple photographs from different angles showing the damage, the
                      surrounding area for context, and any identifying features (room numbers,
                      floor levels, circuit identifiers). Ensure your phone&rsquo;s timestamp
                      feature is enabled. Take wide shots to show context and close-ups to show
                      detail. If possible, include a reference object (tape measure, hand) for
                      scale.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Written Records</p>
                    <p className="text-xs text-white">
                      Note the date, time, exact location (building, floor, room, wall), description
                      of damage, which trade you believe caused it, and the names of any witnesses.
                      Write this down immediately &mdash; even a quick note in your phone&rsquo;s
                      notes app is better than relying on memory. If you have a site diary, record
                      it there as well.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Correspondence</p>
                    <p className="text-xs text-white">
                      If you raise the issue with the site manager, follow up with a brief email
                      confirming what was discussed and what was agreed. "Following our conversation
                      this morning, I am confirming that [description of issue] and that we agreed
                      [resolution]." This creates a written record of the agreement that both
                      parties can refer back to.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Documentation is particularly important because of the Construction (Design and
                Management) Regulations 2015. Under CDM 2015, the principal contractor has a legal
                duty to plan, manage and coordinate the work of all contractors on site. This
                includes ensuring that work sequences are properly coordinated, that access
                arrangements prevent conflicts, and that health and safety is maintained across all
                trade activities. If a recurring inter-trade dispute reveals that the principal
                contractor is failing in their coordination duties, your documented evidence may be
                essential in demonstrating this failure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">CDM 2015 Regulation 13:</strong> The principal
                  contractor must plan, manage and monitor the construction phase, including
                  coordinating the activities of all persons carrying out construction work. This
                  includes organising cooperation between contractors, ensuring suitable site
                  inductions, and making arrangements for the work to be carried out without risks
                  to health and safety. When inter-trade disputes arise from poor coordination, the
                  principal contractor bears responsibility for resolving them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: The Professionalism Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            The Professionalism Standard
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your reputation on a construction site is not built on technical skill alone &mdash;
                it is built on how you conduct yourself when things go wrong. Every site manager,
                contracts manager and project manager has worked with hundreds of tradespeople over
                their career. They remember the ones who handled conflicts calmly and professionally
                far more vividly than they remember who had the neatest cable runs. In an industry
                where word-of-mouth referrals and repeat business drive the majority of work,
                professional conduct during disputes is a direct investment in your future income.
              </p>

              <p>
                Consider two electricians who discover that a plumber has damaged their cable
                installation. Electrician A storms across the site, confronts the plumber in front
                of other workers, raises their voice, and threatens to report them to the main
                contractor. The plumber becomes defensive, the argument escalates, and the site
                manager has to intervene. The issue gets resolved eventually, but both parties have
                damaged their professional standing.
              </p>

              <p>
                Electrician B walks over to the plumber, shows them the damage, and says: "I think
                there&rsquo;s been a routing conflict here. Your pipes have gone through my cable
                zone. Can we have a look at the drawings together and work out the best way to sort
                this for both of us?" The plumber, not feeling attacked, is far more likely to
                cooperate. The issue gets resolved quickly, and both parties maintain their
                professional relationship. The site manager never needs to get involved. Six months
                later, when a new project starts, the site manager recommends Electrician B without
                hesitation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Handshake className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Constructive Approach to Inter-Trade Disputes
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Describe the problem, not the person.</strong> "There&rsquo;s been
                      some damage to the cables in room 14" rather than "You&rsquo;ve damaged my
                      cables."
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Use "we" language.</strong> "How can we sort this out?" rather than
                      "You need to fix this."
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Have the conversation privately.</strong> Never confront someone about
                      damage in front of their colleagues or other trades. Pull them aside for a
                      quiet word.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Offer to help find a solution.</strong> "I can move this cable if it
                      helps your routing" shows willingness to collaborate, not just complain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Thank them when they cooperate.</strong> Positive reinforcement works.
                      If a plasterer takes care around your back boxes after you raised the issue,
                      tell them you noticed and appreciate it.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                None of this means being a pushover. Professional does not mean passive. If your
                work has been damaged, you have every right to raise it, document it, and ensure it
                is rectified. The difference is in how you raise it. Firm, factual and
                solution-focused will always achieve a better outcome than aggressive, emotional and
                blame-focused. Protect your work, protect your rights &mdash; but also protect your
                reputation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Inter-trade disputes are an inevitable part of working on a construction site. The
                five most common types &mdash; damaged work, access disputes, programme clashes,
                noise and mess, and territorial behaviour &mdash; are almost always caused by poor
                coordination and communication rather than deliberate malice. Your most powerful
                tools for managing these disputes are direct conversation, factual documentation,
                and professional conduct.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Direct conversation first:</strong> Always speak to the person
                      involved before escalating to management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Facts, not feelings:</strong> Describe what happened, not what you
                      think about the person who caused it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Document everything:</strong> Photographs, written records and
                      follow-up emails create an objective record
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CDM 2015:</strong> The principal contractor has a legal duty to
                      coordinate between trades &mdash; hold them to it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Reputation matters:</strong> How you handle disputes defines your
                      professional standing in a small industry
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Main Contractor &amp; Commercial Conflicts
                </p>
                <p className="text-sm text-white">
                  Inter-trade disputes are one thing &mdash; but what happens when the conflict is
                  with the main contractor who controls your payment, your programme and your access
                  to site? Section 2 tackles the power imbalance between subcontractors and main
                  contractors, covering payment disputes, contra charges, programme disruption and
                  the professional escalation process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
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
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4-section-2">
              Main Contractor &amp; Commercial Conflicts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
