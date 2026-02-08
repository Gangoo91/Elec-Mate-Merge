import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Collecting Witness Statements - MOET Module 7 Section 3.2";
const DESCRIPTION = "Obtaining and formatting witness statements from supervisors and colleagues for the EPA portfolio: who to ask, what to include, formatting requirements and maximising evidence value under ST1426.";

const quickCheckQuestions = [
  {
    id: "witness-who",
    question: "Who is the most appropriate person to provide a witness statement for your portfolio?",
    options: [
      "A friend who works in a different industry",
      "A supervisor, qualified colleague or mentor who directly observed you performing the work activity being evidenced",
      "Any colleague, regardless of whether they observed the work",
      "The training provider only"
    ],
    correctIndex: 1,
    explanation: "The witness must have directly observed the activity. Supervisors, qualified colleagues, and workplace mentors who watched you perform the task are the most credible witnesses. Their statement must describe what they specifically observed, not a general opinion of your character."
  },
  {
    id: "witness-content",
    question: "A good witness statement should include:",
    options: [
      "Only the witness's name and signature",
      "The date and activity observed, a description of what the apprentice did, the standard of work observed, and specific KSBs demonstrated",
      "A general character reference",
      "A list of the apprentice's qualifications"
    ],
    correctIndex: 1,
    explanation: "An effective witness statement is specific: it identifies the date, the activity, what the apprentice did (in observable terms), the standard achieved, and which KSBs were demonstrated. Generic statements like 'X is a good worker' have little evidence value for the EPA."
  },
  {
    id: "witness-timing",
    question: "When should you request witness statements during your apprenticeship?",
    options: [
      "Only at the very end, just before the EPA",
      "As close to the activity as possible, while the details are fresh in both your mind and the witness's mind",
      "Only when your training provider reminds you",
      "Witness statements are not needed"
    ],
    correctIndex: 1,
    explanation: "Request witness statements promptly after significant activities. The witness's recollection will be most accurate and detailed when the activity is recent. Waiting months or until the end of the apprenticeship results in vague, less useful statements."
  },
  {
    id: "witness-template",
    question: "Why is it helpful to provide a template or prompts when requesting a witness statement?",
    options: [
      "It allows you to write the statement yourself and just get a signature",
      "Most witnesses are unfamiliar with apprenticeship evidence requirements, so prompts help them produce specific, structured statements that cover the information the assessor needs",
      "Templates are mandatory and the statement is invalid without one",
      "It reduces the witness's workload to zero"
    ],
    correctIndex: 1,
    explanation: "Supervisors and colleagues often do not know what a good witness statement looks like for an EPA. Providing a template with prompts (date, activity, what was observed, standard of work, KSBs) guides them to produce specific, useful evidence rather than a vague character reference. The statement must still be in their own words."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A witness statement for the EPA portfolio must be:",
    options: [
      "Anonymous",
      "Signed, dated, and from a named individual who directly observed the activity described",
      "From a family member",
      "Submitted by the training provider only"
    ],
    correctAnswer: 1,
    explanation: "Witness statements must be attributable — signed by a named individual with their role/position identified, dated, and describing activities they personally observed. The assessor may verify statements, so they must be genuine and accurate."
  },
  {
    id: 2,
    question: "The ideal number of witness statements in a portfolio is:",
    options: [
      "One is enough for everything",
      "Enough to cover the range of KSBs in the standard, typically 3-6 from different observers covering different activities",
      "At least 20",
      "Witness statements are optional"
    ],
    correctAnswer: 1,
    explanation: "Having 3-6 witness statements from different observers covering different types of activity provides good breadth of evidence. Multiple witnesses add credibility, and different activities demonstrate range. Quality and relevance matter more than a specific number."
  },
  {
    id: 3,
    question: "When asking a supervisor for a witness statement, you should:",
    options: [
      "Just ask them to sign a blank form",
      "Explain what the statement is for, remind them of the specific activity, and provide a template or guidance on what to include",
      "Write the statement yourself and ask them to sign it",
      "Only ask during their lunch break"
    ],
    correctAnswer: 1,
    explanation: "Help your witness by explaining the purpose, reminding them of the specific activity (date, location, task), and providing a template showing what information is needed. This makes it easier for them and results in a more useful statement. Never write the statement yourself — it must be in their own words."
  },
  {
    id: 4,
    question: "A witness statement that says 'John is always a reliable and hardworking apprentice' is:",
    options: [
      "Excellent evidence for the EPA",
      "Too vague — it does not describe a specific activity, observable competence, or link to KSBs",
      "The only type of statement needed",
      "Better than a specific statement"
    ],
    correctAnswer: 1,
    explanation: "General character references have minimal evidence value. The assessor needs specific, observable evidence: 'On [date], I observed John safely isolate a motor starter circuit, systematically diagnose a faulty contactor, and replace it to a professional standard.' This describes a real activity and demonstrates identifiable KSBs."
  },
  {
    id: 5,
    question: "Witness statements from different people are valuable because:",
    options: [
      "It shows you are popular",
      "They provide multiple perspectives on your competence, cover different activities, and add credibility through independent verification",
      "More statements automatically mean a higher grade",
      "The assessor requires statements from at least 10 people"
    ],
    correctAnswer: 1,
    explanation: "Different witnesses bring different perspectives: a supervisor may comment on your safety practices, a qualified colleague on your technical skills, and a client on your communication. Multiple independent confirmations of competence are more convincing than multiple statements from one person."
  },
  {
    id: 6,
    question: "If a witness is reluctant to provide a statement, you should:",
    options: [
      "Write it yourself and forge their signature",
      "Explain the importance of the statement for your EPA, offer to provide a template, and suggest discussing the specific activity to help them recall details",
      "Give up and find someone else",
      "Complain to your training provider"
    ],
    correctAnswer: 1,
    explanation: "Reluctance is often due to uncertainty about what to write. Making it easy — explaining the purpose, providing a template, and discussing the specific activity — usually resolves the issue. If they remain unwilling, seek an alternative witness who did observe the same or similar activity."
  },
  {
    id: 7,
    question: "Witness statements should be stored in your portfolio:",
    options: [
      "Loose in the back of the folder",
      "Organised with each statement linked to the relevant evidence and KSBs in your mapping matrix",
      "In a separate file that the assessor does not see",
      "Only in digital format"
    ],
    correctAnswer: 1,
    explanation: "Witness statements should be integrated into your portfolio structure, cross-referenced to the relevant evidence and KSBs. This makes it easy for the assessor to find corroborating evidence when reviewing your portfolio and preparing discussion questions."
  },
  {
    id: 8,
    question: "The witness's position or role should be recorded on the statement because:",
    options: [
      "It is a legal requirement",
      "It establishes their credibility and demonstrates they were in a position to observe and evaluate the work described",
      "It makes the form look more official",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Recording the witness's role (e.g., 'Maintenance Supervisor', 'Senior Electrician', 'Engineering Manager') establishes their credibility as someone competent to judge the quality of the work observed. A statement from a qualified professional carries more weight than one from an unrelated colleague."
  },
  {
    id: 9,
    question: "A witness statement can cover:",
    options: [
      "Only one single activity",
      "One or more related activities, as long as each is specifically described and the witness observed all of them",
      "Your entire apprenticeship in one statement",
      "Activities the witness did not observe but heard about"
    ],
    correctAnswer: 1,
    explanation: "A witness statement can cover multiple activities if the witness observed all of them and each is specifically described. For example, a supervisor might describe observing you on three different maintenance tasks over a period, noting your development. Each activity should be clearly dated and described."
  },
  {
    id: 10,
    question: "After collecting a witness statement, you should:",
    options: [
      "File it and forget about it",
      "Review it to confirm it covers the intended KSBs, add it to your mapping matrix, and prepare to discuss the evidenced activity in your professional discussion",
      "Rewrite it in your own words",
      "Share it with other apprentices to use"
    ],
    correctAnswer: 1,
    explanation: "Review each statement to confirm it covers the intended evidence areas. If it is too vague, ask the witness if they can add more specific detail. Add it to your KSB mapping matrix and prepare to discuss the activity in detail during your professional discussion — the assessor will likely ask about it."
  },
  {
    id: 11,
    question: "A witness statement is most effective when it describes:",
    options: [
      "Your personality and character traits",
      "Specific observable actions you took, the technical quality of your work, safety behaviours demonstrated, and the level of competence the witness assessed",
      "How long you have worked at the company",
      "Your training course results"
    ],
    correctAnswer: 1,
    explanation: "Observable actions are the foundation of effective witness evidence: 'I observed the apprentice carry out safe isolation using the prove-test-prove sequence, diagnose the fault using insulation resistance testing, and replace the motor contactor with neat terminations and correct torque.' This is specific, verifiable evidence of competence."
  },
  {
    id: 12,
    question: "When planning your witness statement collection across the apprenticeship, you should:",
    options: [
      "Collect all statements in the final month",
      "Identify key activities in advance, brief potential witnesses beforehand, and collect statements progressively after each significant activity throughout the apprenticeship",
      "Only ask one person for all statements",
      "Wait until your training provider tells you to start"
    ],
    correctAnswer: 1,
    explanation: "A planned approach ensures comprehensive coverage: identify which upcoming activities should be witnessed, brief the witness in advance so they know what to observe, request the statement promptly afterwards, and build a collection from different witnesses over time. This produces a stronger evidence base than a last-minute collection effort."
  }
];

const faqs = [
  {
    question: "Can my training provider write a witness statement?",
    answer: "Yes, if they directly observed you performing a work activity (e.g., during a workplace visit or practical assessment). However, the portfolio should primarily contain witness statements from workplace observers — supervisors, qualified colleagues, and mentors who see your day-to-day performance."
  },
  {
    question: "What if my supervisor refuses to write a witness statement?",
    answer: "If your direct supervisor is unavailable or unwilling, identify other qualified persons who observed the activity: a senior electrician you worked with, a project manager, a client representative, or another supervisor. Explain the situation to your training provider — they can advise on alternatives and may be able to speak to your employer about the importance of supporting your EPA."
  },
  {
    question: "Is there a standard template for witness statements?",
    answer: "Your EPAO or training provider will usually provide a template. If not, a good witness statement includes: the witness's name and position, the date of the activity, a description of what the apprentice did, the standard of work observed, which KSBs were demonstrated, and the witness's signature and date of signing."
  },
  {
    question: "Can I use witness statements from previous employment?",
    answer: "If the activities were during your apprenticeship and are relevant to the standard, yes. The key criteria are: the witness observed the specific activity, the activity is relevant to the ST1426 KSBs, and the statement is specific and detailed enough to serve as evidence."
  },
  {
    question: "How long should a witness statement be?",
    answer: "There is no fixed length, but effective statements are typically half a page to one page. They should be long enough to describe the activity specifically and comment on the standard of work, but not so long that they become unfocused. Specific detail is more important than length."
  }
];

const MOETModule7Section3_2 = () => {
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
            <span>Module 7.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Collecting Witness Statements
          </h1>
          <p className="text-white/80">
            Obtaining specific, credible third-party evidence to strengthen your EPA portfolio
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Who:</strong> Supervisors, qualified colleagues who observed you</li>
              <li className="pl-1"><strong>What:</strong> Specific activities, observable competence, KSBs</li>
              <li className="pl-1"><strong>When:</strong> As soon as possible after the activity</li>
              <li className="pl-1"><strong>Format:</strong> Named, signed, dated, role identified</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Credibility:</strong> Independent verification of competence</li>
              <li className="pl-1"><strong>Range:</strong> Multiple witnesses covering different activities</li>
              <li className="pl-1"><strong>Specificity:</strong> Observable actions, not general opinions</li>
              <li className="pl-1"><strong>ST1426:</strong> Supports professional discussion evidence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify appropriate witnesses for different types of workplace evidence",
              "Request and guide witnesses to produce specific, KSB-linked statements",
              "Time your requests to capture detailed, accurate recollections",
              "Integrate witness statements into your portfolio mapping structure",
              "Ensure statements meet EPAO formatting and authentication requirements",
              "Use witness evidence to strengthen your professional discussion preparation"
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
            Who Should Provide Witness Statements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The credibility of a witness statement depends on who provides it. The ideal witness is someone who directly
              observed your work, has the technical competence to judge the quality of what they observed, and is recognised
              as a credible source within the industry.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitable Witnesses by Priority</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct supervisor:</strong> Best source — observes your work regularly and can comment on development over time</li>
                <li className="pl-1"><strong>Qualified electrician/technician:</strong> Can assess technical competence and workmanship quality</li>
                <li className="pl-1"><strong>Engineering manager:</strong> Can comment on professional behaviours, communication and teamwork</li>
                <li className="pl-1"><strong>Workplace mentor:</strong> Can describe your learning journey and development</li>
                <li className="pl-1"><strong>Client/customer representative:</strong> Can comment on communication, professionalism and service quality</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Who Should NOT Provide Statements</p>
              <p className="text-sm text-white">
                Avoid witness statements from people who did not directly observe the activity (hearsay is not evidence),
                family members or personal friends (lack of objectivity), unqualified colleagues who cannot judge technical
                competence, or anyone who would not be considered a credible professional witness. The assessor evaluates
                the credibility of each witness as part of reviewing your portfolio.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Aim for at least 3 different witnesses across your portfolio. This demonstrates
              that multiple people have observed and can vouch for your competence, which is more convincing than a single
              person's opinion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What Makes an Effective Witness Statement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The difference between a useful witness statement and a useless one is specificity. The assessor needs to see
              evidence of observable competence, not a character reference. Guiding your witnesses on what to include makes
              all the difference.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Elements of a Strong Witness Statement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Date and location:</strong> When and where the activity took place</li>
                <li className="pl-1"><strong>Activity description:</strong> What the task was and what equipment was involved</li>
                <li className="pl-1"><strong>Observable actions:</strong> Specific things the witness saw you do (e.g., "carried out safe isolation correctly")</li>
                <li className="pl-1"><strong>Quality assessment:</strong> The standard of work observed (e.g., "neat terminations, correct torque applied")</li>
                <li className="pl-1"><strong>Professional behaviours:</strong> Communication, safety awareness, initiative demonstrated</li>
                <li className="pl-1"><strong>KSB reference:</strong> Which areas of the standard the activity demonstrates (optional but helpful)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Weak vs Strong Witness Statements</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Weak Statement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Strong Statement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Content</td>
                      <td className="border border-white/10 px-3 py-2">"Good worker, always on time"</td>
                      <td className="border border-white/10 px-3 py-2">"On 15 Jan, I observed safe isolation of MCC-3..."</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specificity</td>
                      <td className="border border-white/10 px-3 py-2">General praise, no dates or details</td>
                      <td className="border border-white/10 px-3 py-2">Named activity, dated, specific actions described</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evidence value</td>
                      <td className="border border-white/10 px-3 py-2">Minimal — character reference only</td>
                      <td className="border border-white/10 px-3 py-2">High — verifiable competence evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KSB coverage</td>
                      <td className="border border-white/10 px-3 py-2">None identifiable</td>
                      <td className="border border-white/10 px-3 py-2">Multiple KSBs clearly demonstrated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A witness statement that describes one specific activity in detail is worth more
              than three vague statements about your general capabilities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Timing and Planning Your Requests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Timing is critical for effective witness statements. The best time to request one is within a few days of the
              activity, while details are fresh. Planning ahead — identifying which activities need witness evidence and who
              will provide it — avoids a last-minute rush.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Your Witness Evidence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Identify target activities:</strong> Plan which workplace activities you want witnessed and evidenced</li>
                <li className="pl-1"><strong>Brief the witness in advance:</strong> Let them know you would like a statement after the task</li>
                <li className="pl-1"><strong>Request promptly:</strong> Ask within a few days of the activity while it is fresh</li>
                <li className="pl-1"><strong>Provide the template:</strong> Give them a pre-formatted document with prompts</li>
                <li className="pl-1"><strong>Follow up politely:</strong> If the statement has not been returned, follow up within a week</li>
                <li className="pl-1"><strong>Review and file:</strong> Check the statement covers the intended KSBs and file it in your portfolio</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Helping Your Witness Write Effectively</p>
              <p className="text-sm text-white">
                Most supervisors and colleagues are not familiar with apprenticeship evidence requirements. Help them by:
                reminding them of the specific activity (date, location, what you were doing), providing a template with
                prompts, and explaining that specific observations are more useful than general comments. Make the process
                as easy as possible for them — busy professionals are more likely to provide a statement if it takes ten
                minutes rather than an hour.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Build witness statement collection into your regular apprenticeship routine. After
              any significant maintenance activity, ask yourself: "Should I get a witness statement for this?"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Integrating Statements into Your Portfolio
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Witness statements are most effective when they are integrated into your portfolio structure, cross-referenced
              to relevant evidence and KSBs. An isolated statement filed at the back of the folder loses much of its impact.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Assign a reference code (e.g., WS-01, WS-02) matching your portfolio system</li>
                <li className="pl-1">Cross-reference the statement to your KSB mapping matrix</li>
                <li className="pl-1">Link it to related evidence (work log entry, photographs, reflective account)</li>
                <li className="pl-1">Ensure the activity described in the statement matches your own documentation</li>
                <li className="pl-1">Prepare to discuss the witnessed activity in your professional discussion</li>
                <li className="pl-1">Store the original (signed) securely and keep a copy in your working portfolio</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Witness statements corroborate your own evidence. When the assessor sees that
              your activity log, your reflective account, and an independent witness statement all describe the same
              activity consistently, the evidence is highly convincing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Using Witness Evidence in the Professional Discussion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During the professional discussion, the assessor may reference witness statements and ask you to expand on
              the activities described. Being prepared to discuss witnessed activities in detail demonstrates that the
              evidence is genuine and that you have deep understanding of your own practice.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preparing to Discuss Witnessed Activities</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Re-read each statement:</strong> Refresh your memory of what the witness described</li>
                <li className="pl-1"><strong>Prepare to add detail:</strong> The assessor may ask for more information than the statement contains</li>
                <li className="pl-1"><strong>Explain your reasoning:</strong> Be ready to discuss why you approached the task as you did</li>
                <li className="pl-1"><strong>Connect to learning:</strong> Describe what you learned from the experience</li>
                <li className="pl-1"><strong>Link to standards:</strong> Explain how the activity demonstrates specific KSBs</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example Discussion Questions from Witness Evidence</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">"Your supervisor mentions you carried out safe isolation. Can you talk me through the exact procedure you followed?"</li>
                <li className="pl-1">"The witness describes your fault diagnosis approach. What made you choose that method over alternatives?"</li>
                <li className="pl-1">"This statement mentions good communication with the production team. How did you explain the fault and repair to them?"</li>
                <li className="pl-1">"What would you do differently if you encountered the same fault again?"</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Witness statements provide independent verification of your workplace competence.
              During the professional discussion, the assessor may ask you to expand on activities described in witness
              statements — be prepared to discuss them in detail and with confidence.
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
              <li className="pl-1"><strong>Who:</strong> Supervisors, qualified colleagues, mentors who directly observed the activity</li>
              <li className="pl-1"><strong>When:</strong> Within days of the activity — do not wait months</li>
              <li className="pl-1"><strong>What to include:</strong> Date, activity, observable actions, quality assessment, KSBs demonstrated</li>
              <li className="pl-1"><strong>Format:</strong> Named witness, role stated, signed, dated</li>
              <li className="pl-1"><strong>Number:</strong> Aim for 3-6 from different observers covering different activities</li>
              <li className="pl-1"><strong>Integration:</strong> Cross-reference to KSB matrix and related portfolio evidence</li>
              <li className="pl-1"><strong>Preparation:</strong> Be ready to discuss every witnessed activity in detail</li>
              <li className="pl-1"><strong>Template:</strong> Provide prompts to help witnesses write specific, useful statements</li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Witness Statements"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Building a Portfolio
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-3">
              Next: Logging Activities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section3_2;
