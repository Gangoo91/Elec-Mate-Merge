import { ArrowLeft, ArrowRight, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "Why are written instructions important in electrical work?",
    options: [
      "They're required by law in all cases",
      "They provide a permanent record, reduce reliance on memory, and ensure consistency",
      "They're faster than verbal communication",
      "They're only needed for complex work"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Give three common forms of written communication on site.",
    options: [
      "Emails, texts, phone calls",
      "Labels, handover notes, and record books/logs",
      "Drawings, specifications, invoices",
      "Reports, certificates, warranties"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What are the three key qualities of effective written communication?",
    options: [
      "Speed, brevity, formality",
      "Clarity, accuracy, legibility",
      "Complexity, detail, length",
      "Creativity, style, colour"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should always be included on a written note?",
    options: [
      "Only the message content",
      "Date, time, and name of the person writing it",
      "Company letterhead",
      "Supervisor approval"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Why are handover sheets necessary?",
    options: [
      "They're required by insurance",
      "They ensure continuity of work, prevent missed tasks, and highlight safety issues",
      "They reduce paperwork",
      "They're only needed for large projects"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What four items should a handover include?",
    options: [
      "Name, date, time, location",
      "Work completed, outstanding work, issues/hazards, required materials/tools",
      "Start time, break time, end time, overtime",
      "Client details, costs, timescales, drawings"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What standard covers labelling requirements?",
    options: [
      "BS 5839",
      "BS 7671 and site-specific requirements",
      "BS 6701",
      "Health and Safety Executive guidelines only"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Why is handwritten labelling often discouraged?",
    options: [
      "It takes too long",
      "It may be unclear, inconsistent, and less durable",
      "It's not legal",
      "It costs too much"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What's a professional way to mark a circuit that should not be used?",
    options: [
      "Remove all the cables",
      "Use a label or note such as 'DO NOT ENERGISE – STILL UNDER TEST'",
      "Just tell people verbally",
      "Paint it a different colour"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the risk of not leaving a written handover?",
    options: [
      "Nothing serious will happen",
      "Miscommunication, duplication of work, or dangerous mistakes",
      "Only minor delays",
      "Paperwork will be incomplete"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "written1",
    question: "What is one main benefit of written instructions over verbal ones?",
    options: [
      "They're faster to create",
      "They provide a permanent record and reduce reliance on memory",
      "They're always more detailed",
      "They don't require any skills"
    ],
    correctIndex: 1,
    explanation: "Written instructions provide a permanent record that can be referred back to, reducing reliance on memory and ensuring consistency across teams and shifts."
  },
  {
    id: "written2",
    question: "What should be included in a proper handover sheet?",
    options: [
      "Only the work completed",
      "Work completed, outstanding work, issues/hazards, and required materials",
      "Just safety issues",
      "Only your name and date"
    ],
    correctIndex: 1,
    explanation: "A comprehensive handover should include work completed, outstanding work, any issues or hazards, and materials or tools required for continuation."
  },
  {
    id: "written3",
    question: "Which standard covers electrical labelling requirements?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS 7909",
      "BS 6701"
    ],
    correctIndex: 1,
    explanation: "BS 7671 (the IET Wiring Regulations) covers labelling requirements along with site-specific requirements."
  },
  {
    id: "written4",
    question: "What are the three key qualities of effective written communication?",
    options: [
      "Speed, brevity, formality",
      "Clarity, accuracy, legibility",
      "Complexity, detail, length",
      "Creativity, style, colour"
    ],
    correctIndex: 1,
    explanation: "Effective written communication must be clear, accurate, and legible to be useful and professional."
  }
];

const Module5Section6_2 = () => {
  useSEO(
    "Written Instructions and Handovers: Basic Notes and Labels | Electrical Training",
    "Learn about written communication in electrical work, including basic notes, labels, and handover procedures for maintaining safety and continuity."
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 6
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Written Instructions and Handovers
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Basic Notes, Labels, and Professional Communication
            </p>
          </header>

          {/* Quick Reference */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Written communication creates permanent records</li>
                  <li>• Labels must be durable, legible, and follow BS 7671</li>
                  <li>• Handover notes ensure work continuity</li>
                  <li>• Always include date, time, and your name</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• <strong>Spot:</strong> Unlabelled circuits or unclear handover notes</li>
                  <li>• <strong>Use:</strong> Clear labelling and structured handover sheets</li>
                  <li>• <strong>Check:</strong> All notes include date, time, and name</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed">
              <li>• Understand the role of written instructions and handovers in electrical work</li>
              <li>• Write clear, accurate, and professional notes and labels</li>
              <li>• Identify situations where written communication is essential</li>
              <li>• Apply best practices for creating effective written documentation</li>
            </ul>
          </section>

          {/* Section 1 - Importance of Written Instructions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Importance of Written Instructions
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Written communication is vital in electrical work for recording, passing on, and confirming information. Unlike verbal instructions, written notes create permanent records:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Key Benefits</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Provides a permanent record of information that can be referred back to</li>
                  <li>• Reduces reliance on memory, which may be unreliable under pressure</li>
                  <li>• Ensures consistent communication across shifts and teams</li>
                  <li>• Can be used as evidence if disputes or accidents occur</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 - Common Written Communication */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Written Communication in Electrical Work
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Several types of written communication are essential on electrical sites:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Labels</p>
                  <p className="text-sm text-white/70">Marking distribution boards, circuits, isolators, and accessories. Must clearly identify circuits, phases, and isolators. Follow BS 7671 and site-specific requirements.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Basic Notes</p>
                  <p className="text-sm text-white/70">Quick reminders left for colleagues. Example: "Do not energise – still under test". Always include date, time, and your name.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Handover Sheets</p>
                  <p className="text-sm text-white/70">Summarising progress for the next shift. Include work completed, outstanding tasks, safety issues, and materials required.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Record Books/Logs</p>
                  <p className="text-sm text-white/70">Used on larger sites for tracking works. Maintain project history, record decisions and changes, track material usage.</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 3 - Qualities of Effective Written Communication */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Qualities of Effective Written Communication
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Professional written communication requires specific qualities to be effective and useful:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-semibold text-elec-yellow mb-2">Clarity</p>
                  <p className="text-sm text-white/70">Use simple, unambiguous wording. Avoid technical jargon unless universally understood. Structure information logically. Break complex information into clear steps.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                  <p className="font-semibold text-green-400 mb-2">Accuracy</p>
                  <p className="text-sm text-white/70">Double-check all details. Verify circuit numbers, ratings, and specifications. Check names, dates, and locations. Correct any errors immediately when discovered.</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                  <p className="font-semibold text-blue-400 mb-2">Legibility</p>
                  <p className="text-sm text-white/70">Ensure it can be read by anyone. Use printed labels where possible for durability. If handwriting is necessary, use block capitals. Choose appropriate pen/marker for conditions.</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                  <p className="font-semibold text-purple-400 mb-2">Professionalism</p>
                  <p className="text-sm text-white/70">Maintain appropriate tone. Avoid slang or casual language in formal notes. Use accepted abbreviations (e.g., "DB" for Distribution Board). Follow company and site standards.</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 4 - Handovers */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Handovers: Ensuring Continuity
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper handovers prevent duplication of work, missed tasks, and safety oversights:
              </p>

              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <p className="font-semibold text-amber-400 mb-2">Why Handovers Matter</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Prevents duplication of work and wasted effort</li>
                  <li>• Ensures all safety issues are communicated</li>
                  <li>• Maintains project momentum between shifts</li>
                  <li>• Provides accountability for work progress</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Essential Handover Content</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• <strong className="text-white">Work completed:</strong> What has been finished and tested</li>
                  <li>• <strong className="text-white">Outstanding work:</strong> Tasks that still need completion</li>
                  <li>• <strong className="text-white">Issues or hazards:</strong> Safety concerns or problems encountered</li>
                  <li>• <strong className="text-white">Materials or tools required:</strong> Resources needed for continuation</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 5 - Labelling Standards */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Labelling Standards (Basic Awareness)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper labelling is essential for safety and compliance with electrical standards:
              </p>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Requirements for Electrical Labels</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Must be durable enough to withstand the electrical environment</li>
                  <li>• Must remain legible throughout the installation's life</li>
                  <li>• Follow BS 7671 and site-specific requirements</li>
                  <li>• Should clearly identify circuits, phases, and isolators</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Types of Labels Commonly Used</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Circuit identification labels on distribution boards</li>
                  <li>• Warning labels for hazardous areas or equipment</li>
                  <li>• Isolation point identification labels</li>
                  <li>• Cable route and termination labels</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />

          {/* Real World Example */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="font-semibold text-amber-400 mb-2">The Cost of Poor Communication</p>
              <p className="text-white/80 text-sm mb-3">
                On a commercial site, an apprentice leaves no handover note at the end of their shift. The next morning, another team mistakenly energises a circuit still under testing, causing equipment damage.
              </p>
              <div className="p-3 bg-red-500/10 rounded border border-red-500/20 mb-3">
                <p className="text-sm text-red-300 font-medium mb-1">Consequences:</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• £2,000 worth of testing equipment damaged</li>
                  <li>• Project delayed by 2 days waiting for replacement</li>
                  <li>• Insurance claim affecting company premiums</li>
                  <li>• Client confidence affected</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                <p className="text-sm text-green-300 font-medium mb-1">The Solution:</p>
                <p className="text-sm text-white/70">
                  A simple note stating "Circuit 3 DB2 still under test - DO NOT ENERGISE - Contact J. Smith 07XXX XXXXXX" would have prevented this costly mistake.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow" />
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Always leave written notes/handovers when finishing work</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Include date, time, and your name on all written communications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Keep writing clear, accurate, and professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Labels must be durable, legible, and follow BS 7671 standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>A 30-second note can prevent hours of rework or hazards</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm mb-3">In this subsection, you've learned:</p>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Why written instructions and handovers are essential for electrical work</li>
                <li>• The qualities of effective written communication: clarity, accuracy, legibility, and professionalism</li>
                <li>• How to write clear notes, labels, and handovers that prevent mistakes</li>
                <li>• The importance of following labelling standards and best practices</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz title="Written Instructions and Handovers Knowledge Check" questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Verbal Communication
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-3">
                Next: Communicating Faults, Risks, and Progress
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section6_2;
