import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Logging On-the-Job Activities - MOET Module 7 Section 3.3";
const DESCRIPTION = "Recording workplace maintenance activities systematically for portfolio evidence: what to log, how to write effective entries, linking activities to KSBs and building a comprehensive record under ST1426.";

const quickCheckQuestions = [
  {
    id: "log-purpose",
    question: "What is the primary purpose of logging on-the-job activities for the EPA?",
    options: [
      "To prove you attended work every day",
      "To create a detailed, dated record of workplace activities that demonstrates the range and depth of your practical experience against the ST1426 standard",
      "To keep your supervisor informed of your whereabouts",
      "It is only required for apprentices who are behind schedule"
    ],
    correctIndex: 1,
    explanation: "Activity logs create a chronological record of your practical experience. They show the assessor the breadth and depth of maintenance activities you have undertaken, providing evidence of your developing competence across the full range of KSBs required by the standard."
  },
  {
    id: "log-detail",
    question: "What level of detail should a work activity log entry contain?",
    options: [
      "Just the date and a one-word description",
      "The date, location, equipment involved, the task performed, methods used, outcomes achieved, safety measures taken, and which KSBs the activity demonstrates",
      "Only what your supervisor tells you to write",
      "A copy of the job sheet with no additional commentary"
    ],
    correctIndex: 1,
    explanation: "Effective log entries capture enough detail for the assessor to understand what you did, how you did it, and what you learned. Including the context (where, what equipment), your actions (methods, decisions), outcomes (results, test readings), safety measures, and KSB links transforms a simple diary entry into valuable portfolio evidence."
  },
  {
    id: "log-frequency",
    question: "How often should you update your activity log?",
    options: [
      "Once a month is sufficient",
      "At least weekly, ideally after each significant activity while details are fresh",
      "Only when your training provider asks to see it",
      "Once at the end of the apprenticeship"
    ],
    correctIndex: 1,
    explanation: "Regular logging — ideally after each significant activity or at least weekly — ensures details are captured accurately while they are fresh. Leaving it weeks or months means you forget important specifics: test readings, component values, the reasoning behind your decisions. These details are what make log entries valuable as evidence."
  },
  {
    id: "log-digital",
    question: "What advantage do digital logging tools offer over paper-only activity logs?",
    options: [
      "Digital logs are always accepted by EPAOs whereas paper logs are not",
      "They enable automatic timestamps, photo attachments, GPS location data and structured templates that make logging faster, more consistent and easier to cross-reference to KSBs",
      "Digital logs require less detail than paper logs",
      "There is no advantage — paper is always better"
    ],
    correctIndex: 1,
    explanation: "Digital tools (e-portfolio platforms, note-taking apps, dedicated logging apps) streamline the recording process with auto-timestamps, the ability to attach photographs taken on site, GPS location data, and structured templates that prompt you for each required element. This makes logging quicker and more consistent. Always check your EPAO accepts digital evidence — most now do."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An effective activity log entry for the EPA portfolio should include:",
    options: [
      "Only the date and job number",
      "Date, location, equipment, task description, methods used, outcomes, safety measures and KSB links",
      "Just a photograph of the completed work",
      "A copy of the timesheet"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive log entry captures the full picture: when and where, what equipment was involved, what you did, how you did it, the outcome, safety considerations, and which KSBs it demonstrates. This level of detail turns a simple record into strong portfolio evidence."
  },
  {
    id: 2,
    question: "The benefit of logging activities regularly rather than retrospectively is:",
    options: [
      "It takes less time overall",
      "Details are accurate and specific because they are recorded while fresh, including test readings, component details and decision-making reasoning that would be forgotten later",
      "Your supervisor prefers it",
      "There is no real difference"
    ],
    correctAnswer: 1,
    explanation: "Memory deteriorates rapidly. Within days you will forget specific test readings, the exact fault symptoms, which components you replaced, and the reasoning behind your approach. Recording these details promptly produces much more valuable evidence than vague retrospective accounts."
  },
  {
    id: 3,
    question: "When logging a fault diagnosis activity, you should record:",
    options: [
      "Only the final fault found",
      "The initial symptoms, your systematic diagnostic approach, each test performed and its result, the root cause identified, the repair carried out, and the verification that the fault was resolved",
      "Just that a fault was found and fixed",
      "Only the parts that were replaced"
    ],
    correctAnswer: 1,
    explanation: "Fault diagnosis is a key skill in the ST1426 standard. Recording the complete diagnostic journey — from initial symptoms through systematic testing to root cause identification and verification — demonstrates your methodical approach and technical reasoning, which are exactly what the assessor wants to see."
  },
  {
    id: 4,
    question: "Activity logs differ from reflective accounts in that:",
    options: [
      "They are the same thing",
      "Logs are factual records of what happened, while reflective accounts add analysis of why decisions were made, what was learned, and how the experience links to professional development",
      "Logs are more important than reflective accounts",
      "Reflective accounts replace the need for logs"
    ],
    correctAnswer: 1,
    explanation: "Activity logs and reflective accounts serve different but complementary purposes. Logs capture the facts (what, when, where, how), while reflective accounts add deeper analysis (why, what was learned, what would you do differently). Together they provide both breadth of experience and depth of understanding."
  },
  {
    id: 5,
    question: "When logging safety measures taken during an activity, you should include:",
    options: [
      "Just 'worked safely'",
      "Specific measures: risk assessment completed, safe isolation procedure followed (with lock-off details), PPE worn, permits obtained, and any hazards identified and controlled",
      "Only measures that were unusual or additional",
      "Safety measures do not need to be logged"
    ],
    correctAnswer: 1,
    explanation: "Specific safety details demonstrate that safe working is embedded in your practice, not an afterthought. Recording that you completed a risk assessment, followed safe isolation (noting the lock-off point and proving dead procedure), wore appropriate PPE, and obtained permits shows the assessor that safety is integral to your working methods."
  },
  {
    id: 6,
    question: "Linking log entries to specific KSBs is important because:",
    options: [
      "It makes the log look more professional",
      "It demonstrates awareness of the standard's requirements and makes it easy for the assessor to verify that your experience covers all required areas",
      "The training provider requires it",
      "It is optional and does not affect the assessment"
    ],
    correctAnswer: 1,
    explanation: "KSB linking serves two purposes: it helps you track your own coverage of the standard (identifying gaps early), and it helps the assessor quickly verify that your experience addresses all requirements. A log with clear KSB references is much more useful as evidence than one without."
  },
  {
    id: 7,
    question: "If you complete a routine task that you have done many times before, should you log it?",
    options: [
      "No, only new or unusual tasks need logging",
      "Yes, if it demonstrates a KSB not yet covered, or you can describe improvements in your approach, efficiency or quality compared to earlier attempts",
      "Only if your supervisor asks you to",
      "No, routine tasks have no evidence value"
    ],
    correctAnswer: 1,
    explanation: "Routine tasks can still provide valuable evidence, particularly if they demonstrate KSBs you have not yet covered, or if you can show how your approach has developed over time. Comparing an early attempt with a recent one demonstrates professional growth and increasing competence."
  },
  {
    id: 8,
    question: "Test readings and measurement values recorded in your log:",
    options: [
      "Are unnecessary detail",
      "Provide specific, verifiable evidence of your competence and demonstrate that you understand acceptable parameters and can interpret results correctly",
      "Should be rounded to the nearest whole number",
      "Only matter for electrical testing activities"
    ],
    correctAnswer: 1,
    explanation: "Recording specific readings (insulation resistance values, earth fault loop impedance, RCD trip times, motor current draws) demonstrates that you understand what you are measuring, what the acceptable range is, and how to interpret the results. This is powerful evidence of technical knowledge and practical skill."
  },
  {
    id: 9,
    question: "A gap analysis of your activity log should be carried out:",
    options: [
      "Only at the end of the apprenticeship",
      "Regularly throughout the apprenticeship to identify KSBs that lack sufficient evidence, allowing time to seek out appropriate activities",
      "Only by the training provider",
      "Gap analysis is not relevant to activity logs"
    ],
    correctAnswer: 1,
    explanation: "Regular gap analysis — reviewing which KSBs have strong evidence and which need more — is essential for portfolio planning. If you identify a gap with six months remaining, you have time to seek appropriate activities. Discovering gaps in the final weeks leaves no time to address them."
  },
  {
    id: 10,
    question: "Digital logging tools and apps can help with activity recording by:",
    options: [
      "Replacing the need for any written evidence",
      "Enabling photographs, timestamps, GPS location data and structured templates that make logging faster and more consistent",
      "Making the log look more impressive",
      "They are not accepted by EPAOs"
    ],
    correctAnswer: 1,
    explanation: "Digital tools (e-portfolio platforms, logging apps) can streamline the process: auto-timestamps, photo attachments, GPS location data, and structured templates ensure consistency and make logging quicker. Check your EPAO accepts digital evidence — most now do. The key is still the quality of the content, regardless of format."
  },
  {
    id: 11,
    question: "When describing the outcome of a maintenance activity in your log, you should:",
    options: [
      "Simply write 'job completed'",
      "Describe the specific result: equipment returned to service, test results confirming correct operation, any follow-up actions required, and customer or supervisor feedback received",
      "Only note if something went wrong",
      "Outcomes are not important to record"
    ],
    correctAnswer: 1,
    explanation: "Specific outcomes demonstrate that you complete work to a professional standard: equipment tested and confirmed operational, specific readings within acceptable parameters, customer informed, documentation completed. This evidence of thorough completion is a key professional behaviour assessed in the EPA."
  },
  {
    id: 12,
    question: "When logging a collaborative activity where you worked as part of a team, you should:",
    options: [
      "Only describe what the team leader did",
      "Describe your specific role and contributions within the team, the communication and coordination involved, and how the team activity demonstrates professional behaviours such as teamwork, communication and responsibility",
      "Write the same log entry as every other team member",
      "Team activities do not count as individual evidence"
    ],
    correctAnswer: 1,
    explanation: "Collaborative activities are valuable evidence for professional behaviours (teamwork, communication, responsibility) which are often harder to evidence than technical knowledge and skills. Describing your specific contribution, how you communicated with team members, and what you learned from the collaboration demonstrates important KSBs that solo activities may not cover."
  }
];

const faqs = [
  {
    question: "What is the difference between an activity log and a timesheet?",
    answer: "A timesheet records hours worked for payroll purposes. An activity log records what you actually did during those hours — the specific tasks, methods, equipment, outcomes and learning. Your activity log is a professional development record, not an attendance record. It should contain enough technical detail to serve as evidence of your growing competence."
  },
  {
    question: "Should I log activities where I only observed or assisted, rather than leading?",
    answer: "Yes, particularly early in your apprenticeship. Observing and assisting are valid learning activities. Log what you observed, what you learned, and which KSBs it relates to. As your apprenticeship progresses, your log should show a transition from observing to assisting to leading — this progression demonstrates your development."
  },
  {
    question: "How long should each log entry be?",
    answer: "There is no fixed length, but aim for enough detail that someone who was not present could understand what you did and why. A paragraph (100-200 words) for routine tasks, or half a page for complex activities, is typically sufficient. The key is specific, relevant detail rather than padding."
  },
  {
    question: "Can I use my employer's job management system as my activity log?",
    answer: "You can use employer records as supporting evidence, but your activity log should contain your own reflection and KSB mapping that a job management system would not include. You might reference job numbers from the employer's system but add your own description of what you did, why, and what you learned."
  },
  {
    question: "What if I forget to log an activity and several weeks have passed?",
    answer: "Log it anyway, but note that it is a retrospective entry. Use any available prompts to aid your memory: job sheets, photographs, emails, calendar entries. Include as much detail as you can recall. However, this highlights why regular logging is important — a retrospective entry will inevitably lack the specific detail that makes evidence compelling."
  }
];

const MOETModule7Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Logging On-the-Job Activities
          </h1>
          <p className="text-white/80">
            Building a detailed, dated record of workplace experience to evidence your developing competence
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Chronological record of practical experience</li>
              <li className="pl-1"><strong>Content:</strong> Date, task, methods, outcomes, safety, KSBs</li>
              <li className="pl-1"><strong>Frequency:</strong> After each significant activity or weekly</li>
              <li className="pl-1"><strong>Value:</strong> Demonstrates breadth and depth of competence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Portfolio evidence:</strong> Logs form the backbone of your portfolio</li>
              <li className="pl-1"><strong>Discussion prompts:</strong> Assessor may ask about logged activities</li>
              <li className="pl-1"><strong>Gap identification:</strong> Reveals KSBs needing more evidence</li>
              <li className="pl-1"><strong>ST1426:</strong> Demonstrates full range of required experience</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Write detailed, effective activity log entries that serve as strong portfolio evidence",
              "Capture technical details including test readings, methods and component information",
              "Link each activity to specific KSBs in the ST1426 standard",
              "Maintain a consistent logging routine throughout your apprenticeship",
              "Use activity logs to identify gaps in your evidence coverage",
              "Distinguish between activity logs and reflective accounts for maximum portfolio value"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Activity Logging Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your activity log is the backbone of your portfolio. While reflective accounts provide depth and
              witness statements provide independent verification, it is the activity log that demonstrates the
              breadth of your experience. It shows the assessor that you have been exposed to the full range of
              maintenance activities required by the ST1426 standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What the Assessor Looks for in Activity Logs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Range:</strong> Evidence of different types of maintenance activity (fault diagnosis,
                  planned maintenance, installation, commissioning, testing)
                </li>
                <li className="pl-1">
                  <strong>Progression:</strong> Development from simple tasks to more complex work over the
                  apprenticeship period
                </li>
                <li className="pl-1">
                  <strong>Technical detail:</strong> Specific methods, readings, components and outcomes that
                  demonstrate real understanding
                </li>
                <li className="pl-1">
                  <strong>Safety integration:</strong> Evidence that safe working practices are embedded in your
                  everyday work
                </li>
                <li className="pl-1">
                  <strong>KSB coverage:</strong> Activities that collectively address all the knowledge, skills
                  and behaviours in the standard
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Retrospective Logging Trap</p>
              <p className="text-sm text-white">
                Trying to write your entire activity log in the final weeks before the EPA is one of the most
                common mistakes apprentices make. Retrospective entries are vague, lack specific detail, and
                are often obviously written after the fact. The assessor can tell the difference between a log
                written in real time and one constructed from memory months later.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Think of your activity log as a professional engineering diary. It
              records your journey from learner to competent technician, with the specific evidence to prove it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Writing Effective Log Entries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An effective log entry captures enough detail for the assessor to understand what you did, how you
              did it, and why it matters. It should read like a technical account of a professional activity, not
              a brief diary note.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of an Effective Log Entry</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Include</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Date and location</td>
                      <td className="border border-white/10 px-3 py-2">When and where</td>
                      <td className="border border-white/10 px-3 py-2">15 Jan 2026, Building 3 plant room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment</td>
                      <td className="border border-white/10 px-3 py-2">What you worked on</td>
                      <td className="border border-white/10 px-3 py-2">AHU-3 supply fan motor (7.5 kW, 3-phase)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task description</td>
                      <td className="border border-white/10 px-3 py-2">What you did and why</td>
                      <td className="border border-white/10 px-3 py-2">Diagnosed intermittent tripping on thermal overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Methods and tools</td>
                      <td className="border border-white/10 px-3 py-2">How you did it</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance test, current clamp readings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety measures</td>
                      <td className="border border-white/10 px-3 py-2">How you worked safely</td>
                      <td className="border border-white/10 px-3 py-2">Safe isolation at MCC, lock-off, proved dead</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outcome</td>
                      <td className="border border-white/10 px-3 py-2">What the result was</td>
                      <td className="border border-white/10 px-3 py-2">Low IR reading (0.3 M&Omega;) confirmed winding fault</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KSB reference</td>
                      <td className="border border-white/10 px-3 py-2">Which standard areas</td>
                      <td className="border border-white/10 px-3 py-2">K12 fault diagnosis, S7 testing, B3 safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Be Specific, Not Generic</p>
              <p className="text-sm text-white">
                Compare: "Worked on a motor" versus "Diagnosed intermittent thermal overload tripping on AHU-3
                supply fan motor (7.5 kW, Star-Delta starter). Insulation resistance test between phases and
                phase-to-earth revealed low reading on U-phase to earth (0.3 M&Omega; against minimum 1 M&Omega;),
                indicating winding insulation breakdown. Motor replaced and IR confirmed satisfactory (&gt;200 M&Omega;
                on all phases)." The second entry is genuine evidence of competence.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Include specific values, readings and measurements wherever possible.
              Numbers demonstrate technical understanding far more effectively than general descriptions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Establishing a Logging Routine
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consistent logging requires building it into your work routine. The most successful apprentices
              treat logging as part of completing a task — the job is not finished until it is recorded. Setting
              a regular time and format makes the process habitual rather than burdensome.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Your Logging Habit</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Set a fixed time:</strong> Dedicate 15-20 minutes at the end of each day or week
                  to update your log
                </li>
                <li className="pl-1">
                  <strong>Use a template:</strong> A consistent format with prompts ensures you capture all
                  required elements
                </li>
                <li className="pl-1">
                  <strong>Take photographs during the task:</strong> Before, during and after photos provide
                  visual evidence and aid memory when writing
                </li>
                <li className="pl-1">
                  <strong>Record readings immediately:</strong> Write down test values, component ratings and
                  measurements on the spot
                </li>
                <li className="pl-1">
                  <strong>Keep a pocket notebook:</strong> Quick notes during the day can be expanded into full
                  log entries later
                </li>
                <li className="pl-1">
                  <strong>Use digital tools:</strong> E-portfolio apps, phone notes or voice memos can capture
                  details quickly on site
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weekly Logging Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Have I logged all significant activities from this week?</li>
                <li className="pl-1">Does each entry include specific technical details and test readings?</li>
                <li className="pl-1">Have I described the safety measures taken for each activity?</li>
                <li className="pl-1">Are KSB references included for every entry?</li>
                <li className="pl-1">Have I attached any relevant photographs or documents?</li>
                <li className="pl-1">Is there anything I observed or assisted with that I should also record?</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The goal is little and often. Fifteen minutes of logging each day produces
              far better evidence than two hours of retrospective writing each month.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using Logs for Gap Analysis and Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your activity log is not just evidence — it is a planning tool. By reviewing your log against the
              ST1426 KSBs regularly, you can identify which areas have strong evidence and which need more
              attention. This allows you to proactively seek out activities that fill gaps in your experience.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conducting a Log-Based Gap Analysis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Review KSB coverage:</strong> Check which KSBs your logged activities cover and which
                  are missing
                </li>
                <li className="pl-1">
                  <strong>Assess evidence quality:</strong> Do your existing entries provide sufficient detail
                  for each KSB?
                </li>
                <li className="pl-1">
                  <strong>Identify patterns:</strong> Are you logging the same type of activity repeatedly while
                  missing other areas?
                </li>
                <li className="pl-1">
                  <strong>Plan targeted activities:</strong> Discuss gaps with your employer and training provider
                  to arrange relevant experience
                </li>
                <li className="pl-1">
                  <strong>Set milestones:</strong> Create a timeline for filling gaps, with regular review points
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Evidence Gaps for MOET Apprentices</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Control systems:</strong> PLC and BMS interaction — seek opportunities to work with
                  these systems
                </li>
                <li className="pl-1">
                  <strong>Commissioning:</strong> New installation commissioning — ask to assist on commissioning
                  activities
                </li>
                <li className="pl-1">
                  <strong>Communication:</strong> Client interaction and reporting — log instances where you
                  communicated with stakeholders
                </li>
                <li className="pl-1">
                  <strong>Continuous improvement:</strong> Suggesting and implementing improvements — document
                  any suggestions you make
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The activity log directly supports the professional discussion by
              providing a chronological record of your practical development. The assessor will use it to select
              specific activities to discuss in detail, so every entry should be something you can confidently
              expand on.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Leveraging Logs in the Professional Discussion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During the professional discussion, the assessor will select activities from your log to explore in
              depth. Your log entries serve as the agenda for this conversation — the more detailed and well-structured
              they are, the better prepared you will be to expand on them confidently when questioned.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How the Assessor Uses Your Activity Log</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Selecting discussion topics:</strong> The assessor scans your log for activities that
                  cover multiple KSBs, enabling efficient evidence gathering during the discussion
                </li>
                <li className="pl-1">
                  <strong>Probing technical knowledge:</strong> They may ask you to explain the theory behind your
                  actions — why you chose a particular test method, what the readings mean, what alternatives existed
                </li>
                <li className="pl-1">
                  <strong>Assessing progression:</strong> Comparing early and later log entries to see how your
                  competence and independence have developed over the apprenticeship
                </li>
                <li className="pl-1">
                  <strong>Verifying authenticity:</strong> Detailed, specific entries that you can expand upon
                  fluently demonstrate genuine experience, while vague entries suggest limited involvement
                </li>
                <li className="pl-1">
                  <strong>Exploring behaviours:</strong> Asking how you communicated with colleagues, dealt with
                  unexpected situations, or demonstrated initiative during logged activities
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example Discussion Questions from Log Entries</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  "You logged a motor replacement on 15 January. Talk me through your safe isolation procedure
                  from start to finish."
                </li>
                <li className="pl-1">
                  "Your entry mentions an insulation resistance reading of 0.3 M&Omega;. What is the minimum
                  acceptable value and how did you know the motor needed replacing?"
                </li>
                <li className="pl-1">
                  "I see you assisted with commissioning an AHU in March. What tests were carried out and what
                  was your specific role?"
                </li>
                <li className="pl-1">
                  "This entry describes a situation where you found an additional fault during routine maintenance.
                  How did you communicate this to the client and what action was taken?"
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Preparing for Discussion</p>
              <p className="text-sm text-white">
                Before the professional discussion, re-read every log entry and make sure you can explain each one
                in more detail than written. For key activities, prepare to discuss: the context and why the work
                was needed, your approach and reasoning, the specific technical details, the outcome and any lessons
                learned, and how you would handle it differently with the benefit of experience.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Your activity log is not just a static record — it is the script for your
              professional discussion. Every entry is a potential discussion topic, so write each one as though you
              will be asked about it in detail.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">
                <strong>Purpose:</strong> Chronological record demonstrating breadth and depth of practical experience
              </li>
              <li className="pl-1">
                <strong>Frequency:</strong> After each significant activity, or at least weekly
              </li>
              <li className="pl-1">
                <strong>Content:</strong> Date, location, equipment, task, methods, safety, outcome, KSB references
              </li>
              <li className="pl-1">
                <strong>Detail level:</strong> Specific enough for someone not present to understand what you did and why
              </li>
              <li className="pl-1">
                <strong>Test readings:</strong> Always record specific values — they demonstrate technical understanding
              </li>
              <li className="pl-1">
                <strong>Safety:</strong> Describe specific measures taken, not just "worked safely"
              </li>
              <li className="pl-1">
                <strong>Gap analysis:</strong> Review log against KSBs regularly to identify missing evidence areas
              </li>
              <li className="pl-1">
                <strong>Discussion prep:</strong> Re-read all entries before the EPA — you may be asked about any of them
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Activity Logging"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Witness Statements
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-4">
              Next: Mapping Evidence
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section3_3;
