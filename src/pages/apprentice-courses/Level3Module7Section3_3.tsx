/**
 * Level 3 Module 7 Section 3.3 - Working with Other Trades
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working with Other Trades - Level 3 Module 7 Section 3.3";
const DESCRIPTION = "Collaborative working practices, coordination with other trades on construction sites, and effective multi-trade teamwork.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is coordination between trades important on construction sites?",
    options: [
      "It isn't - each trade works independently",
      "It prevents conflicts, delays, and rework while ensuring quality",
      "Only to satisfy project managers",
      "It's only needed on large projects"
    ],
    correctIndex: 1,
    explanation: "Coordination prevents trades from interfering with each other's work, reduces delays from waiting for access, minimises expensive rework, and ensures the finished installation works properly as a whole."
  },
  {
    id: "check-2",
    question: "If you need to route cables through an area where the plumber is working, you should:",
    options: [
      "Just work around them without speaking",
      "Wait until they leave, then start your work",
      "Communicate and coordinate to agree timing and access",
      "Complain to the site manager about them being in the way"
    ],
    correctIndex: 2,
    explanation: "Direct communication and coordination with other trades is the professional approach. Agree who works when, avoid conflicts, and help each other where practical. It makes everyone's job easier."
  },
  {
    id: "check-3",
    question: "What is a construction programme and why should electricians understand it?",
    options: [
      "A software application for design",
      "The planned sequence and timing of work on a project",
      "A training course for site workers",
      "A document only project managers need to see"
    ],
    correctIndex: 1,
    explanation: "The construction programme shows when different work stages are planned, what needs to happen before your work can start (first fix before plastering, for example), and when you need to complete to avoid delaying others."
  },
  {
    id: "check-4",
    question: "When another trade damages your work, the professional response is:",
    options: [
      "Immediately confront them angrily",
      "Document the damage, report through appropriate channels, and agree repairs",
      "Damage their work in retaliation",
      "Ignore it and carry on"
    ],
    correctIndex: 1,
    explanation: "Document what happened (photos, written record), report through proper channels (site manager or supervisor), and work with the other trade to arrange repair. Confrontation and retaliation are unprofessional and make things worse."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "First fix electrical work typically needs to be completed before:",
    options: [
      "Any other trade starts work",
      "Plastering and boarding closes up the walls",
      "The foundation is laid",
      "The windows are installed"
    ],
    correctAnswer: 1,
    explanation: "First fix electrical (cables in walls, floor, and ceiling voids) must be complete before plasterboard goes up and plastering begins. Coordinating with drylining and plastering trades is essential."
  },
  {
    id: 2,
    question: "A site coordination meeting typically involves:",
    options: [
      "Only the main contractor's staff",
      "Representatives from all trades to coordinate upcoming work",
      "Just the electricians",
      "Only trades who have problems"
    ],
    correctAnswer: 1,
    explanation: "Coordination meetings bring together all trades to discuss upcoming work, identify conflicts, agree sequences, and resolve issues before they become problems. Attendance and participation are important."
  },
  {
    id: 3,
    question: "What should you do if mechanical services (pipework) are routed where electrical containment was planned?",
    options: [
      "Remove the pipework",
      "Reroute without telling anyone",
      "Raise the conflict with site management and work together to resolve",
      "Leave the area incomplete"
    ],
    correctAnswer: 2,
    explanation: "Clashes between services need resolution through proper channels. Raise with site management, discuss with the mechanical contractor, and agree an amended route that works for both services."
  },
  {
    id: 4,
    question: "Which of these demonstrates good inter-trade relations?",
    options: [
      "Only communicating through the site manager",
      "Helping another trade move materials when they're struggling",
      "Ignoring other trades unless they're in your way",
      "Leaving mess for other trades to clean up"
    ],
    correctAnswer: 1,
    explanation: "Good relations come from mutual respect and cooperation. Small acts of helpfulness build positive working relationships. Trades who work well together complete projects more smoothly."
  },
  {
    id: 5,
    question: "Shared areas like risers and plant rooms require:",
    options: [
      "No coordination - first come, first served",
      "Careful coordination to ensure all services fit and remain accessible",
      "One trade to take complete control",
      "The client to allocate space"
    ],
    correctAnswer: 1,
    explanation: "Shared spaces need careful planning. All services must fit, each must be accessible for maintenance, and installation sequences need coordination. Builders' work drawings usually show agreed positions."
  },
  {
    id: 6,
    question: "If you notice a safety issue with another trade's work, you should:",
    options: [
      "Ignore it - it's not your problem",
      "Report it through appropriate channels as everyone's safety matters",
      "Post about it on social media",
      "Fix it yourself without telling anyone"
    ],
    correctAnswer: 1,
    explanation: "Safety concerns should be reported regardless of who caused them. Everyone on site has a duty of care. Report through site management or safety officer - don't ignore hazards."
  },
  {
    id: 7,
    question: "Protection of work from damage by following trades includes:",
    options: [
      "Never allowing anyone near your work",
      "Covering, labelling, and communicating about protection needs",
      "Leaving everything uncovered as protection isn't your job",
      "Only protecting equipment if specifically requested"
    ],
    correctAnswer: 1,
    explanation: "Protect your work appropriately - cover equipment, label what shouldn't be touched, and communicate protection requirements. Other trades should reciprocate. It's everyone's responsibility to respect each other's work."
  },
  {
    id: 8,
    question: "When working in occupied premises with multiple trades, coordination includes:",
    options: [
      "Whoever arrives first gets priority for the day",
      "Scheduling to minimise disruption and avoiding conflicts in limited space",
      "Ignoring the occupants completely",
      "Only working when no other trades are present"
    ],
    correctAnswer: 1,
    explanation: "Occupied premises need careful coordination to minimise total disruption. Schedule to avoid multiple trades in the same space, coordinate noisy work, and ensure occupants aren't overwhelmed."
  },
  {
    id: 9,
    question: "Handover between shifts or teams working on the same installation should include:",
    options: [
      "No information - each team starts fresh",
      "Briefing on work completed, issues found, and what's needed next",
      "Only a tool inventory",
      "Just safety paperwork"
    ],
    correctAnswer: 1,
    explanation: "Effective handovers ensure continuity. Brief incoming teams on progress, problems encountered, what's ready for next steps, and any safety considerations. Good handovers prevent rework and maintain quality."
  },
  {
    id: 10,
    question: "What role does the electrical contractor play in commissioning meetings?",
    options: [
      "No role - commissioning is the main contractor's job",
      "Providing input on electrical systems, coordinating tests, and supporting integration",
      "Only attending if specifically invited",
      "Just providing certificates"
    ],
    correctAnswer: 1,
    explanation: "Electricians contribute significantly to commissioning. Electrical systems interact with mechanical, BMS, fire, and security systems. Coordinated commissioning ensures all systems work together properly."
  },
  {
    id: 11,
    question: "Tolerance and flexibility with other trades means:",
    options: [
      "Accepting substandard work without complaint",
      "Being reasonable about minor adjustments while maintaining standards",
      "Ignoring your own requirements",
      "Always giving way to other trades"
    ],
    correctAnswer: 1,
    explanation: "Flexibility means working together to find solutions when conflicts arise, making reasonable adjustments, and maintaining good relationships - while still ensuring your installation meets requirements."
  },
  {
    id: 12,
    question: "Common areas of conflict between electrical and mechanical services include:",
    options: [
      "There are no conflicts between these trades",
      "Routing in ceiling voids, riser space, and plant room positioning",
      "Only cable sizing",
      "Only on industrial projects"
    ],
    correctAnswer: 1,
    explanation: "Electrical and mechanical services often compete for the same space - ceiling voids, risers, and plant rooms. Early coordination using builders' work drawings helps prevent conflicts."
  }
];

const faqs = [
  {
    question: "What if another trade won't cooperate or communicate?",
    answer: "Escalate to site management. Document your attempts to coordinate. If direct communication isn't working, the site manager can facilitate. Don't get drawn into personal conflicts - keep it professional and let management resolve persistent issues."
  },
  {
    question: "Who has priority when trades' work conflicts?",
    answer: "Usually determined by the construction programme and practical necessity. Some sequences are fixed (first fix before plastering, for example). For other conflicts, site management decides based on overall project needs, not which trade arrived first."
  },
  {
    question: "How do I coordinate effectively on large multi-storey projects?",
    answer: "Use coordination meetings, study the programme, understand the building's sequence (often floor by floor), communicate through proper channels, and build relationships with counterparts in other trades. Large projects need more formal coordination."
  },
  {
    question: "Should electricians attend all site meetings?",
    answer: "Attend those relevant to your work - coordination meetings, progress meetings where electrical work is discussed, commissioning meetings. Your supervisor or foreman might attend others. Being engaged with site processes helps you understand the bigger picture."
  },
  {
    question: "What's the best approach when starting on a new site with unfamiliar trades?",
    answer: "Introduce yourself, be friendly and professional, show willingness to coordinate, respect shared spaces, and demonstrate reliability. First impressions matter. Being known as someone good to work with opens doors on future projects."
  },
  {
    question: "How do I handle criticism of my work from other trades?",
    answer: "Listen objectively - they might have a valid point. If they do, address it professionally. If not, explain your approach calmly. Avoid becoming defensive. If there's a genuine dispute about standards, involve your supervisor or site management."
  }
];

const Level3Module7Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Coordinate:</strong> Communicate timing and access needs</li>
              <li><strong>Respect:</strong> Other trades' work and requirements</li>
              <li><strong>Sequence:</strong> Understand construction programme</li>
              <li><strong>Resolve:</strong> Address conflicts professionally</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Project Benefits</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Efficiency:</strong> Less waiting and rework</li>
              <li><strong>Quality:</strong> Coordinated installation</li>
              <li><strong>Safety:</strong> Fewer access conflicts</li>
              <li><strong>Reputation:</strong> Known as easy to work with</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Why Coordination Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Coordination Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern construction involves many specialist trades working in the same spaces, often simultaneously. Electrical work interacts with mechanical services, fire protection, security, and building fabric. Effective coordination between trades is essential for projects to run smoothly and for the finished building to work properly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of good coordination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reduces waiting time for access to work areas</li>
                <li>Prevents services routing conflicts and expensive redesigns</li>
                <li>Minimises damage to completed work by following trades</li>
                <li>Ensures systems integrate properly at commissioning</li>
                <li>Creates positive working environment for everyone</li>
              </ul>
            </div>

            <p>
              Poor coordination leads to delays, rework, damaged work, and frustrated workers. When trades compete rather than cooperate, everyone loses. The cost of rework and delays far exceeds the time invested in proper coordination.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Your reputation among other trades matters. Contractors and site managers remember who's easy to work with. Being known as cooperative and professional leads to better working relationships and more opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Practical Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Practical Coordination Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective coordination happens through communication, planning, and mutual respect. It's not about one trade dominating others, but about everyone working together to achieve the common goal of completing the project successfully.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Do</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Communicate directly with other trades</li>
                  <li>Attend and contribute to coordination meetings</li>
                  <li>Share information about your requirements</li>
                  <li>Be flexible where reasonable</li>
                  <li>Help others when you can</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Don't</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Assume your work takes priority over others</li>
                  <li>Start work without checking who else is in the area</li>
                  <li>Leave mess for other trades to deal with</li>
                  <li>Damage or move others' work without agreement</li>
                  <li>Avoid communication until there's a problem</li>
                </ul>
              </div>
            </div>

            <p>
              Simple courtesies make a difference. Let other trades know when you'll be working in shared spaces. Ask before moving their materials. Help when you can. These small actions build the relationships that make coordination work.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You need to run cables through a room where the plasterer is working tomorrow. Instead of just turning up, speak to them today: "I need about 2 hours in there to finish my first fix - would first thing work before you start plastering?"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Understanding Programmes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Construction Programmes and Sequencing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The construction programme sets out when different work stages are planned. Understanding the programme helps you see where electrical work fits in the overall sequence, what must happen before you can work, and who's waiting for you to finish.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical construction sequence affecting electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Structure complete:</strong> Before containment and first fix can begin</li>
                <li><strong>First fix electrical:</strong> Before drylining and plastering</li>
                <li><strong>Second fix electrical:</strong> After decoration, before handover</li>
                <li><strong>Commissioning:</strong> With other services, before occupation</li>
              </ul>
            </div>

            <p>
              If your work is delayed, it affects following trades. If preceding work is delayed, you can't start as planned. Understanding dependencies helps you plan your work and communicate about timing issues before they become critical.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The programme isn't just paperwork - it's the plan everyone's working to. If you're running late or ahead, communicate early. Surprises cause more problems than the delay itself.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Resolving Conflicts */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Resolving Conflicts and Clashes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conflicts between trades are inevitable on construction sites. Services compete for the same space, work access overlaps, and sometimes things get damaged. How conflicts are handled determines whether they're minor inconveniences or major problems.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Identify</p>
                <p className="text-white/90 text-xs">Recognise the conflict early before it escalates</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Communicate</p>
                <p className="text-white/90 text-xs">Discuss with the other party calmly and professionally</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Resolve</p>
                <p className="text-white/90 text-xs">Find a solution, escalate if needed, document outcome</p>
              </div>
            </div>

            <p>
              Most conflicts can be resolved through direct discussion. If that doesn't work, involve site management. Document what happened and what was agreed. Never resort to retaliation, aggression, or just forcing your way - it damages relationships and your reputation.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Being known as someone who resolves conflicts calmly and fairly is valuable. Site managers notice who causes problems and who solves them. This affects future opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Good Relationships</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Introduce yourself when starting on a new site</li>
                <li>Learn names and use them</li>
                <li>Be helpful when you can</li>
                <li>Keep shared areas clean and tidy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Meetings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Come prepared with updates on your work</li>
                <li>Raise coordination issues early</li>
                <li>Listen to others' needs and constraints</li>
                <li>Agree and confirm actions before leaving</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Relationship Killers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Arrogance:</strong> Acting like your trade is more important</li>
                <li><strong>Mess:</strong> Leaving debris for others to clear</li>
                <li><strong>Blame:</strong> Pointing fingers instead of solving problems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Common Coordination Points</p>
                <ul className="space-y-0.5">
                  <li>First fix before boarding</li>
                  <li>Second fix after decoration</li>
                  <li>Riser and plant room access</li>
                  <li>Ceiling void services</li>
                  <li>Commissioning integration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Conflict Resolution Steps</p>
                <ul className="space-y-0.5">
                  <li>Stay calm and professional</li>
                  <li>Discuss directly first</li>
                  <li>Seek compromise where possible</li>
                  <li>Escalate if needed</li>
                  <li>Document the outcome</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Technical Reporting
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3-4">
              Next: Conflict Resolution
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section3_3;
