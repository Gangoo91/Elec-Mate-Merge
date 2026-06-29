import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'Why is it important to report faults immediately?',
    options: [
      'To avoid having to complete any written paperwork',
      'To prevent unsafe conditions and ensure they are addressed before work continues',
      'To delay the project until the fault is convenient to fix',
      'To pass responsibility for the fault to someone else',
    ],
    correctAnswer: 1,
    explanation:
      'Immediate reporting prevents unsafe conditions from escalating and ensures hazards are addressed before work continues, protecting everyone on site.',
  },
  {
    id: 2,
    question: 'Name two common electrical faults that must be reported.',
    options: [
      'Late delivery and bad weather',
      'Dirty tools and a missed lunch break',
      'Damaged cables and reversed polarity',
      'Expensive materials and tight deadlines',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged cables and reversed polarity are genuine electrical faults that create shock and fire risks, so both must be reported; the other options are not electrical faults.',
  },
  {
    id: 3,
    question: 'What three key details should always be included when reporting?',
    options: [
      'The cost, the supplier, and the delivery date',
      'The weather, the time, and the lunch arrangements',
      'The brand of tools, the cable colour, and the room size',
      'Who found it, what the fault/risk is, and where it is located',
    ],
    correctAnswer: 3,
    explanation:
      'The who, what and where method ensures a report is complete: who discovered the issue, what the fault or risk is, and exactly where it is located.',
  },
  {
    id: 4,
    question: 'Give two examples of communication methods for reporting risks.',
    options: [
      'Verbal reports and written reports',
      'Personal social media posts',
      'Anonymous notes left on a noticeboard',
      'Word of mouth among apprentices only',
    ],
    correctAnswer: 0,
    explanation:
      'Verbal reports suit urgent issues and written reports provide a permanent record; both are recognised, traceable methods for reporting risks.',
  },
  {
    id: 5,
    question: "Why is tagging equipment with 'Do Not Use' important?",
    options: [
      'It speeds up the repair of the equipment',
      'It prevents unsafe equipment from being accidentally used',
      'It records who last used the equipment',
      'It reduces the cost of replacement parts',
    ],
    correctAnswer: 1,
    explanation:
      'A clear "Do Not Use" tag warns others that the equipment is unsafe, preventing it from being picked up and used before it is repaired or replaced.',
  },
  {
    id: 6,
    question: 'What is the risk of not updating progress reports?',
    options: [
      'Equipment becomes safer to use over time',
      'Materials are delivered earlier than needed',
      'It leads to confusion, duplication of work, or project delays',
      'The fault automatically corrects itself',
    ],
    correctAnswer: 2,
    explanation:
      'Out-of-date progress information causes confusion, duplicated work and delays, because supervisors and other trades cannot plan around an accurate picture.',
  },
  {
    id: 7,
    question: 'What type of report is best for urgent hazards?',
    options: [
      'A letter posted to the head office',
      'An entry in the weekly progress board',
      'An email sent at the end of the shift',
      'A verbal report to the supervisor/foreman',
    ],
    correctAnswer: 3,
    explanation:
      'Urgent hazards need an immediate verbal report to the supervisor or foreman so action can be taken straight away; slower written methods risk delay.',
  },
  {
    id: 8,
    question: "Why should vague phrases like 'nearly done' be avoided in progress updates?",
    options: [
      "They don't give clear, measurable information about what has been completed",
      "They take longer to say than a precise figure",
      "They are not allowed under health and safety law",
      "They make the report sound too formal",
    ],
    correctAnswer: 0,
    explanation:
      'Vague phrases like "nearly done" cannot be measured or planned around; specific updates such as "2 of 3 circuits tested" give clear, usable information.',
  },
  {
    id: 9,
    question: 'What can poor communication lead to between team members?',
    options: [
      'Faster completion of every task',
      'Reduced trust, confusion, and mistakes',
      'Lower material costs across the project',
      'Automatic correction of installation faults',
    ],
    correctAnswer: 1,
    explanation:
      'Poor communication erodes trust, creates confusion and leads to mistakes, all of which harm both safety and the working relationship within the team.',
  },
  {
    id: 10,
    question: 'What is better: over-reporting or under-reporting issues?',
    options: [
      "Under-reporting, as it keeps paperwork to a minimum",
      "Neither, as reporting should be avoided where possible",
      "Over-reporting, as it is safer to raise issues than ignore them",
      "It makes no difference which approach is taken",
    ],
    correctAnswer: 2,
    explanation:
      'Over-reporting is safer than under-reporting: raising an issue that turns out to be minor is far better than ignoring one that turns out to be dangerous.',
  },
];

const quickCheckQuestions = [
  {
    id: 'faults1',
    question: 'What should you do if you discover a damaged cable on site?',
    options: [
      'Fix it yourself if possible',
      'Continue working around it',
      'Wait until the end of the shift to mention it',
      'Report it immediately to your supervisor',
    ],
    correctIndex: 3,
    explanation:
      'Damaged cables present immediate safety risks and must be reported immediately to prevent accidents and ensure they are addressed before work continues.',
  },
  {
    id: 'faults2',
    question: 'Which method is best for reporting urgent safety hazards?',
    options: [
      'Send an email at the end of the day',
      'Write a note and leave it on the desk',
      'Verbal report immediately to supervisor/foreman',
      'Wait for the weekly safety meeting',
    ],
    correctIndex: 2,
    explanation:
      'Urgent safety hazards require immediate verbal reporting to the supervisor or foreman so they can take immediate action to prevent accidents.',
  },
  {
    id: 'faults3',
    question: 'What key information should be included when reporting a fault?',
    options: [
      'The cost of repairing the fault',
      'Who found it, what the fault/risk is, and where it is located',
      'The name of every worker on site that day',
      'The brand of tools used during the work',
    ],
    correctIndex: 1,
    explanation:
      "The 'who, what, where' method ensures complete information: who discovered it, what the specific fault or risk is, and exactly where it's located.",
  },
  {
    id: 'faults4',
    question: 'Why should progress updates be specific rather than vague?',
    options: [
      'To provide clear, measurable information about completion status',
      'Product stage (raw materials, transport, manufacturing)',
      'Air temperature, radiant temperature, humidity, velocity, metabolic rate, clothing',
      'The concentration of airborne asbestos fibres in a given volume of air',
    ],
    correctIndex: 0,
    explanation:
      "Specific progress updates like '2 out of 3 lighting circuits tested' give clear, measurable information that helps with planning and prevents misunderstandings.",
  },
];

const Module5Section6_3 = () => {
  useSEO(
    'Communicating Faults, Risks, and Task Progress | Electrical Training',
    'Learn how to effectively communicate faults, risks, and task progress in electrical work to prevent accidents and ensure project success.'
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
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
        <div className="max-w-4xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white">•</span>
              <span className="text-white">Section 6.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Communicating Faults, Risks, and Task Progress
            </h1>
            <p className="text-white text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential reporting skills for electrical work safety and efficiency
            </p>
          </header>

          {/* Quick Reference */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white text-sm space-y-1">
                  <li>• Report hazards and faults immediately</li>
                  <li>• Use clear details: Who, What, Where</li>
                  <li>• Give specific progress updates, not vague comments</li>
                  <li>• Tag unsafe equipment with "Do Not Use" labels</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white text-sm space-y-1">
                  <li>
                    • <strong>Spot:</strong> Damaged equipment or unsafe conditions
                  </li>
                  <li>
                    • <strong>Use:</strong> Immediate verbal reports for urgent issues
                  </li>
                  <li>
                    • <strong>Check:</strong> All reports include who, what, where details
                  </li>
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
            <ul className="text-white space-y-2 leading-relaxed">
              <li>• Identify when and how to report faults and risks</li>
              <li>• Use clear, professional methods to communicate task progress</li>
              <li>• Recognise the consequences of poor reporting</li>
              <li>• Apply effective systems of communication in real site conditions</li>
            </ul>
          </section>

          {/* Section 1 - Importance of Fault and Risk Communication */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Importance of Fault and Risk Communication
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On-site electrical work often involves identifying faults, highlighting risks, and
                reporting progress. Clear communication in these areas is critical for safety and
                project success:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Safety Implications</p>
                <ul className="text-sm space-y-1 text-white">
                  <li>• Prevents unsafe conditions from escalating into serious accidents</li>
                  <li>• Ensures hazards are addressed before work continues</li>
                  <li>• Protects all team members from potential dangers</li>
                  <li>• Maintains a safe working environment for everyone</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Project Management Benefits</p>
                <ul className="text-sm space-y-1 text-white">
                  <li>• Allows supervisors to make informed decisions about work priorities</li>
                  <li>• Prevents delays caused by unreported issues</li>
                  <li>• Ensures resources are allocated effectively</li>
                  <li>• Maintains project timeline and quality standards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 - Typical Faults and Risks */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Typical Faults and Risks to Communicate
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Recognising what needs to be reported is the first step in effective communication:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Equipment and Installation Faults</p>
                  <p className="text-sm text-white">
                    Damaged cables, connectors, or electrical accessories. Faulty tools or testing
                    equipment. Incorrect installations (e.g., reversed polarity, wrong ratings).
                    Missing or inadequate earthing connections.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Safety Hazards</p>
                  <p className="text-sm text-white">
                    Exposed live conductors or damaged insulation. Water ingress or moisture in
                    electrical equipment. Inadequate isolation or lockout procedures. Missing or
                    insufficient PPE for the task.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Environmental and Access Issues</p>
                  <p className="text-sm text-white">
                    Unsafe working platforms or access routes. Inadequate lighting in work areas.
                    Presence of other hazards (asbestos, chemical spillages). Changes in site
                    conditions affecting safety.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 3 - Methods of Communicating Faults and Risks */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Methods of Communicating Faults and Risks
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different situations require different communication methods. Choose the most
                appropriate for the urgency and nature of the issue:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                  <p className="font-semibold text-red-400 mb-2">
                    Verbal Reports – For urgent issues
                  </p>
                  <p className="text-sm text-white">
                    Direct face-to-face communication with supervisor or foreman. Use for safety
                    hazards that need immediate action. Follow up with written confirmation if
                    required.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-semibold text-elec-yellow mb-2">
                    Written Reports – For logging hazards
                  </p>
                  <p className="text-sm text-white">
                    Use site logbooks, incident report forms, or digital systems. Include date,
                    time, location, and detailed description. Provide permanent record for future
                    reference.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                  <p className="font-semibold text-purple-400 mb-2">
                    Tagging Equipment/Areas – Visual warnings
                  </p>
                  <p className="text-sm text-white">
                    "Do Not Use" tags on faulty tools or unsafe circuits. Barrier tape for hazardous
                    areas. Clear, durable labels that won't be easily removed.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                  <p className="font-semibold text-blue-400 mb-2">
                    Digital Platforms – Modern reporting
                  </p>
                  <p className="text-sm text-white">
                    Site apps or digital reporting systems. QR code-based incident reporting. Photo
                    and GPS location capture capabilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 4 - Communicating Task Progress */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Communicating Task Progress
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Clear progress communication keeps projects on track and prevents misunderstandings:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Effective Progress Updates</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Break work into clear stages</p>
                    <p className="text-white">
                      Started, in progress, completed, awaiting test. Use specific milestones.
                      Include percentage completion where appropriate.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Record details accurately</p>
                    <p className="text-white">
                      Use handover sheets, site logs, or progress boards. Include specific
                      quantities and measurements. Note any deviations from original plans.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Use specific language</p>
                    <p className="text-white">
                      Say "2 out of 3 lighting circuits tested" instead of "nearly done". Use "will
                      be complete by 3 PM" instead of "soon". Be precise about quantities, times,
                      and completion status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 5 - Consequences of Poor Communication */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Consequences of Poor Communication
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the potential consequences emphasises why effective communication is
                essential:
              </p>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Potential Consequences</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Safety consequences</p>
                    <p className="text-white">
                      Unreported faults leading to accidents. Escalation of minor issues into major
                      hazards. Use of unsafe equipment. Inadequate isolation leading to electrical
                      incidents.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Project impact</p>
                    <p className="text-white">
                      Repeated work due to misunderstood progress. Project delays and cost overruns.
                      Inefficient resource allocation. Quality issues from incomplete information.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Professional relationships</p>
                    <p className="text-white">
                      Reduced trust between team members. Breakdown in working relationships. Loss
                      of confidence from supervisors and clients.
                    </p>
                  </div>
                </div>
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
              <p className="font-semibold text-amber-400 mb-2">The Hidden Fault</p>
              <p className="text-white text-sm mb-3">
                On a commercial project, an apprentice notices a cracked socket faceplate but
                assumes it will be replaced later. No report is made, and another worker installs it
                thinking it's acceptable. Weeks later, the socket sparks during use, damaging
                equipment and causing a safety incident.
              </p>
              <div className="p-3 bg-red-500/10 rounded border border-red-500/20 mb-3">
                <p className="text-sm text-red-300 font-medium mb-1">Consequences:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• £5,000 worth of computer equipment damaged</li>
                  <li>• HSE investigation due to electrical incident</li>
                  <li>• Company reputation damaged with the client</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                <p className="text-sm text-green-300 font-medium mb-1">Prevention:</p>
                <p className="text-sm text-white">
                  A simple fault report stating "Cracked socket faceplate found in Room 203 -
                  potential safety hazard - requires replacement before installation" would have
                  prevented this expensive and dangerous incident.
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
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Report hazards and faults immediately to prevent escalation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>
                    Use clear details: Who found it, What the fault is, Where it's located
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Mark unsafe equipment with "Do Not Use" tags immediately</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Give specific progress updates, not vague comments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Always keep written and verbal records consistent</span>
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
              <p className="text-white text-sm mb-3">In this subsection, you've learned:</p>
              <ul className="text-white text-sm space-y-1">
                <li>
                  • Why fault, risk, and progress communication is essential for safety and
                  efficiency
                </li>
                <li>• Common electrical issues that must be reported immediately</li>
                <li>
                  • Different methods of communication: verbal, written, tagging, and digital
                  systems
                </li>
                <li>• How clear, specific updates keep projects on time and prevent confusion</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Faults, Risks, and Progress Communication Knowledge Check"
              questions={quizQuestions}
            />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Written Instructions
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-4">
                Next: Resolving Misunderstandings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section6_3;
