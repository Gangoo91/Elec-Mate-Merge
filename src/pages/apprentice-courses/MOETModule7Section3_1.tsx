import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building a Work-Based Portfolio - MOET Module 7 Section 3.1";
const DESCRIPTION = "Structuring and organising a comprehensive work-based evidence portfolio for the EPA professional discussion: what to include, how to organise, quality of evidence and linking to KSBs under ST1426.";

const quickCheckQuestions = [
  {
    id: "portfolio-purpose",
    question: "What is the primary purpose of the work-based portfolio in the EPA?",
    options: [
      "To replace the practical observation",
      "To provide structured evidence of your workplace learning and competence, supporting the professional discussion",
      "To impress the employer with photographs",
      "It is an optional extra for higher grades only"
    ],
    correctIndex: 1,
    explanation: "The portfolio is the evidence base for the professional discussion. It demonstrates that you have developed the required knowledge, skills and behaviours through real workplace experience. The assessor reviews your portfolio before the discussion and uses it to structure their questions."
  },
  {
    id: "evidence-quality",
    question: "What makes a piece of portfolio evidence 'good quality'?",
    options: [
      "It is very long and detailed",
      "It is specific, relevant to the standard's KSBs, clearly described, and demonstrates genuine competence through real workplace activities",
      "It uses impressive technical language",
      "It includes certificates from every training course attended"
    ],
    correctIndex: 1,
    explanation: "Quality evidence is specific (describes a real activity), relevant (links to specific KSBs in the standard), clearly described (the assessor can understand what you did and why), and authentic (genuinely your own work). A single well-described maintenance activity can provide evidence for multiple KSBs."
  },
  {
    id: "organisation-method",
    question: "How should portfolio evidence be organised for maximum effectiveness?",
    options: [
      "In chronological order only",
      "Mapped to the KSBs of the apprenticeship standard, with clear cross-references showing which evidence supports which requirement",
      "Alphabetically by topic",
      "In a random order — the assessor will sort it"
    ],
    correctIndex: 1,
    explanation: "Mapping evidence to KSBs is the most effective organisation method. It allows the assessor to quickly see that all requirements are covered and makes the professional discussion more focused. Use a mapping document or matrix that cross-references each piece of evidence to the specific KSBs it demonstrates."
  },
  {
    id: "reflective-account",
    question: "What is the most important element that elevates a reflective account above a simple activity description?",
    options: [
      "Using longer sentences",
      "Including analysis of why you made specific decisions, what you learned, and how the experience links to your professional development",
      "Adding more photographs",
      "Writing it in formal academic English"
    ],
    correctIndex: 1,
    explanation: "Reflection transforms a description into evidence of learning. Explaining why you chose a particular approach, what you would do differently next time, and how the experience links to the standard's KSBs demonstrates critical thinking and professional growth — exactly what the assessor is looking for in the professional discussion."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The work-based portfolio for the MOET EPA should contain:",
    options: [
      "Only certificates and qualifications",
      "A range of evidence from real workplace activities demonstrating knowledge, skills and behaviours mapped to the apprenticeship standard",
      "Only photographs of completed work",
      "A copy of your CV and job description only"
    ],
    correctAnswer: 1,
    explanation: "The portfolio should contain diverse evidence from genuine workplace activities: work logs, maintenance reports, witness statements, photographs, project summaries, risk assessments, and reflective accounts — all mapped to the specific KSBs in the ST1426 standard."
  },
  {
    id: 2,
    question: "A KSB mapping matrix in your portfolio is used to:",
    options: [
      "List all the tools you can use",
      "Show which evidence demonstrates which knowledge, skills and behaviour requirements of the standard",
      "Record your attendance at work",
      "List the modules you have completed"
    ],
    correctAnswer: 1,
    explanation: "The KSB mapping matrix is a cross-reference document that links each piece of portfolio evidence to the specific requirements of the standard. It shows the assessor (and you) that all areas are covered and makes it easy to locate evidence during the professional discussion."
  },
  {
    id: 3,
    question: "When writing a reflective account for your portfolio, you should include:",
    options: [
      "Only what you did",
      "What the situation was, what you did, why you did it, what you learned, and how it links to the standard",
      "Your personal opinions about your employer",
      "Technical specifications of every component you have used"
    ],
    correctAnswer: 1,
    explanation: "A reflective account follows the STAR format (Situation, Task, Action, Result) plus reflection. Describe the context, your specific actions, the reasoning behind your decisions, the outcome, and what you learned. This demonstrates deeper understanding than simply listing activities."
  },
  {
    id: 4,
    question: "Witness statements in the portfolio provide:",
    options: [
      "Evidence that you attended work",
      "Third-party confirmation of your competence from someone who observed your work, such as a supervisor or qualified colleague",
      "Legal protection for the employer",
      "Proof of your qualifications"
    ],
    correctAnswer: 1,
    explanation: "Witness statements are valuable because they provide independent verification of your competence. A supervisor or qualified colleague confirms they observed you performing specific tasks competently. They should be specific about what was observed, when, and the standard of work demonstrated."
  },
  {
    id: 5,
    question: "Photographs included in the portfolio should:",
    options: [
      "Show only the finished result",
      "Be annotated to explain what they show, be clearly dated, and demonstrate specific competences such as workmanship quality, safe working practices or completed installations",
      "Be artistic and well-composed",
      "Include selfies of you at work"
    ],
    correctAnswer: 1,
    explanation: "Portfolio photographs are evidence, not decoration. They should be annotated (what does this show? what KSB does it demonstrate?), dated, and clearly linked to a specific activity or competence. Before and after photographs of maintenance work are particularly effective evidence."
  },
  {
    id: 6,
    question: "The minimum portfolio evidence requirement is typically:",
    options: [
      "One piece of evidence for every KSB",
      "Defined by the EPAO in the EPA specification — check the specific requirements for your assessment organisation",
      "There is no minimum — any amount is acceptable",
      "Exactly 50 pages"
    ],
    correctAnswer: 1,
    explanation: "Each EPAO specifies the minimum evidence requirements in their EPA specification. Typically this includes a certain number of work logs, witness statements, and other evidence types. Check your specific EPAO's requirements early in your apprenticeship so you have time to gather sufficient evidence."
  },
  {
    id: 7,
    question: "Evidence of safe working practices in the portfolio could include:",
    options: [
      "A statement saying 'I always work safely'",
      "Completed risk assessments, safe isolation records, permit to work documents, toolbox talk records, near-miss reports, and photographs showing PPE use",
      "Only your CSCS card",
      "A list of safety courses attended"
    ],
    correctAnswer: 1,
    explanation: "Evidence of safe working should be specific and documented: completed risk assessments you contributed to, records of safe isolation procedures, permits to work you were involved with, toolbox talk attendance, near-miss or hazard reports, and photographic evidence of safe practices in action."
  },
  {
    id: 8,
    question: "If a piece of evidence demonstrates multiple KSBs, you should:",
    options: [
      "Only use it for one KSB",
      "Cross-reference it to all relevant KSBs in your mapping matrix, maximising the value of each piece of evidence",
      "Create separate copies for each KSB",
      "Choose the least important KSB to avoid duplication"
    ],
    correctAnswer: 1,
    explanation: "One piece of evidence can legitimately demonstrate multiple KSBs. For example, a maintenance report might demonstrate fault diagnosis skills (S), safety knowledge (K), and professional communication (B). Cross-referencing maximises the value of your evidence and reduces the total volume needed."
  },
  {
    id: 9,
    question: "The portfolio should be completed:",
    options: [
      "In the last week before the EPA",
      "Progressively throughout the apprenticeship, with evidence gathered as activities occur",
      "Only after the practical observation",
      "By your training provider on your behalf"
    ],
    correctAnswer: 1,
    explanation: "Building the portfolio progressively is essential. Evidence should be gathered as activities happen — it is much harder to reconstruct evidence months later. Set a regular schedule (e.g., weekly) to update your portfolio with recent activities, and review it with your training provider at regular intervals."
  },
  {
    id: 10,
    question: "During the professional discussion, the assessor will use your portfolio to:",
    options: [
      "Grade your handwriting",
      "Ask probing questions about your evidence, exploring your understanding, reasoning and ability to apply your learning to different situations",
      "Check your spelling",
      "Compare it with other candidates' portfolios"
    ],
    correctAnswer: 1,
    explanation: "The portfolio is a springboard for discussion, not the assessment itself. The assessor will ask you to explain your evidence in detail: what did you do? why? what did you learn? what would you do differently? how does this link to the standard? Your ability to discuss your evidence confidently demonstrates genuine competence."
  },
  {
    id: 11,
    question: "Confidential information in portfolio evidence should be handled by:",
    options: [
      "Including it all without any changes",
      "Redacting or anonymising sensitive information while retaining the evidence value — client names, addresses and commercially sensitive data should be removed",
      "Excluding any evidence that contains confidential data",
      "Asking the client for written permission for every document"
    ],
    correctAnswer: 1,
    explanation: "You must protect confidentiality while still providing effective evidence. Redact client names, addresses, and commercially sensitive information. Anonymise references (e.g., 'Client A' or 'a commercial office building'). The assessor does not need to identify the specific client — they need to see your competence."
  },
  {
    id: 12,
    question: "The difference between a portfolio that supports a pass and one that supports a distinction is:",
    options: [
      "The distinction portfolio is longer",
      "A distinction portfolio demonstrates deeper reflection, broader range of evidence, clearer KSB mapping, and evidence of going beyond minimum requirements with initiative and professional growth",
      "The distinction portfolio uses colour printing",
      "There is no difference — the discussion determines the grade"
    ],
    correctAnswer: 1,
    explanation: "A distinction-supporting portfolio demonstrates not just competence but excellence: deeper reflective accounts showing genuine learning, a broader range of evidence covering diverse activities, clear and comprehensive KSB mapping, and evidence of initiative, problem-solving and professional development beyond the minimum requirements."
  }
];

const faqs = [
  {
    question: "How many pieces of evidence do I need in my portfolio?",
    answer: "This depends on your EPAO's requirements, but typically 10-15 significant pieces of evidence are expected, covering all KSBs. Quality matters more than quantity — five well-described, well-mapped pieces of evidence are more effective than twenty superficial ones. Check your EPAO's specification for the exact minimum requirements."
  },
  {
    question: "Can I include evidence from my college or training provider, not just workplace?",
    answer: "The portfolio should primarily contain workplace evidence, as the professional discussion assesses your on-the-job competence. However, evidence from realistic work environments at college (workshop tasks, simulated maintenance activities) can supplement workplace evidence if needed. Discuss with your training provider what balance is appropriate."
  },
  {
    question: "What format should the portfolio be in — paper or digital?",
    answer: "Check your EPAO's requirements. Many now accept or prefer digital portfolios (e.g., OneFile, e-portfolios, or PDF collections) as they are easier to organise, update and share. If paper-based, use a ring binder with clear dividers and an index. Whichever format you use, ensure it is well-organised and easy to navigate."
  },
  {
    question: "My workplace does not give me varied maintenance tasks. How do I gather diverse evidence?",
    answer: "Speak to your employer and training provider about accessing a wider range of activities. You may be able to shadow colleagues on different tasks, participate in planned maintenance shutdowns, or work in different areas of the business. If options are limited, focus on demonstrating depth of understanding on the activities you do complete, and use reflective accounts to explore how your skills would transfer to other contexts."
  },
  {
    question: "Should I include evidence of things that went wrong or only successes?",
    answer: "Including evidence of how you handled problems, learned from mistakes, or dealt with unexpected situations is actually very valuable. It demonstrates resilience, self-awareness, and professional growth — all positive behaviours assessed in the EPA. A reflective account of a challenging situation and what you learned from it can be powerful evidence of competence development."
  }
];

const MOETModule7Section3_1 = () => {
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
            <span>Module 7.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building a Work-Based Portfolio
          </h1>
          <p className="text-white/80">
            Structuring and organising comprehensive evidence to support your EPA professional discussion
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Evidence base for professional discussion</li>
              <li className="pl-1"><strong>Content:</strong> Work logs, reports, photos, witness statements</li>
              <li className="pl-1"><strong>Organisation:</strong> Mapped to KSBs with cross-references</li>
              <li className="pl-1"><strong>Quality:</strong> Specific, relevant, authentic evidence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Professional discussion:</strong> Portfolio drives the conversation</li>
              <li className="pl-1"><strong>Coverage:</strong> Must address all KSBs in the standard</li>
              <li className="pl-1"><strong>Progressive:</strong> Build throughout your apprenticeship</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps directly to standard requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and role of the portfolio in the EPA process",
              "Select and create high-quality evidence from workplace activities",
              "Organise evidence effectively using KSB mapping matrices",
              "Write reflective accounts that demonstrate depth of understanding",
              "Build the portfolio progressively throughout your apprenticeship",
              "Prepare portfolio evidence that supports confident professional discussion"
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
            Portfolio Purpose and Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The work-based portfolio is not a separate assessment — it is the foundation for the professional discussion
              component of the EPA. It provides the evidence that you have developed the knowledge, skills and behaviours
              required by the ST1426 standard through genuine workplace experience. The assessor reviews your portfolio
              before the discussion and uses it to structure their questions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Portfolio Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>KSB mapping matrix:</strong> A cross-reference document linking evidence to standard requirements</li>
                <li className="pl-1"><strong>Work activity logs:</strong> Detailed records of significant maintenance activities you have completed</li>
                <li className="pl-1"><strong>Reflective accounts:</strong> Written reflections on key learning experiences using the STAR format</li>
                <li className="pl-1"><strong>Witness statements:</strong> Third-party confirmations of your competence from supervisors or colleagues</li>
                <li className="pl-1"><strong>Supporting documents:</strong> Photographs, completed forms, test results, risk assessments, reports</li>
                <li className="pl-1"><strong>Training records:</strong> Evidence of formal and informal learning completed during the apprenticeship</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Start Early — Do Not Leave It to the Last Minute</p>
              <p className="text-sm text-white">
                The most common portfolio problem is leaving evidence gathering too late. Activities completed months ago
                are difficult to document accurately — details are forgotten, photographs were not taken, and witnesses may
                not remember specifics. Start building your portfolio from the first week of your apprenticeship and update
                it regularly.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Think of the portfolio as your professional story. It tells the assessor who you
              are as a technician, what you have learned, and how you have developed. Make it a story worth reading.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Selecting and Creating Quality Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all workplace activities make equally effective portfolio evidence. The best evidence is specific,
              demonstrates genuine competence, and clearly links to the standard's requirements. Learning to identify and
              capture good evidence is a skill in itself.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Evidence and Their Effectiveness</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Demonstrates</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reflective account</td>
                      <td className="border border-white/10 px-3 py-2">Understanding, reasoning, learning</td>
                      <td className="border border-white/10 px-3 py-2">Very high — shows depth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Witness statement</td>
                      <td className="border border-white/10 px-3 py-2">Third-party verification of competence</td>
                      <td className="border border-white/10 px-3 py-2">High — independent confirmation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annotated photographs</td>
                      <td className="border border-white/10 px-3 py-2">Workmanship quality, safe practices</td>
                      <td className="border border-white/10 px-3 py-2">High — visual evidence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work activity log</td>
                      <td className="border border-white/10 px-3 py-2">Range and breadth of experience</td>
                      <td className="border border-white/10 px-3 py-2">Medium — needs detail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certificates only</td>
                      <td className="border border-white/10 px-3 py-2">Attendance at training</td>
                      <td className="border border-white/10 px-3 py-2">Low — does not show application</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Capturing Evidence in Real Time</p>
              <p className="text-sm text-white">
                The best time to capture evidence is during or immediately after the activity. Take photographs before,
                during and after maintenance tasks. Note down test readings, component details, and your reasoning while
                it is fresh. Ask your supervisor for a witness statement within a few days. Evidence captured in real time
                is always more detailed and convincing than retrospective accounts written weeks later.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Quality over quantity. A well-written reflective account of a single maintenance
              task can demonstrate multiple KSBs more effectively than ten brief log entries without detail or reflection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Writing Reflective Accounts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reflective accounts are the most powerful form of portfolio evidence because they demonstrate not just what
              you did, but why you did it and what you learned. They show the assessor that you can think critically about
              your practice — a key professional behaviour.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The STAR+R Framework</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Situation:</strong> What was the context? Where were you working, what equipment, what was the task?</li>
                <li className="pl-1"><strong>Task:</strong> What specifically were you asked to do? What was the problem or objective?</li>
                <li className="pl-1"><strong>Action:</strong> What did you actually do, step by step? What decisions did you make and why?</li>
                <li className="pl-1"><strong>Result:</strong> What was the outcome? Was the task successful? What were the test results?</li>
                <li className="pl-1"><strong>Reflection:</strong> What did you learn? What would you do differently? How does this link to the standard?</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example Reflective Account Structure</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">KSBs Demonstrated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Situation</td>
                      <td className="border border-white/10 px-3 py-2">AHU-3 supply fan tripping on thermal overload intermittently</td>
                      <td className="border border-white/10 px-3 py-2">Context setting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task</td>
                      <td className="border border-white/10 px-3 py-2">Diagnose and repair the fault under supervision</td>
                      <td className="border border-white/10 px-3 py-2">K — fault diagnosis knowledge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Action</td>
                      <td className="border border-white/10 px-3 py-2">Safe isolation, IR testing, current measurements</td>
                      <td className="border border-white/10 px-3 py-2">S — testing skills, B — safety</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Result</td>
                      <td className="border border-white/10 px-3 py-2">Winding fault identified, motor replaced, verified operational</td>
                      <td className="border border-white/10 px-3 py-2">S — repair skills</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reflection</td>
                      <td className="border border-white/10 px-3 py-2">Learned systematic approach saves time vs guessing; would check vibration data first next time</td>
                      <td className="border border-white/10 px-3 py-2">B — continuous improvement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Aim for 3-5 detailed reflective accounts covering different types of maintenance
              activity: fault diagnosis, planned maintenance, component replacement, safety practice, and teamwork.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            KSB Mapping and Gap Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The KSB mapping matrix is the backbone of your portfolio organisation. It provides a clear, at-a-glance view
              of which evidence covers which requirements, and — critically — reveals any gaps that need to be addressed
              before the EPA.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Creating Your KSB Mapping Matrix</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>List all KSBs:</strong> Copy every knowledge, skill and behaviour requirement from the ST1426 standard</li>
                <li className="pl-1"><strong>Assign evidence:</strong> For each KSB, note which portfolio evidence demonstrates it</li>
                <li className="pl-1"><strong>Identify gaps:</strong> Any KSB without evidence needs attention — plan activities to fill the gap</li>
                <li className="pl-1"><strong>Review regularly:</strong> Update the matrix as you add new evidence throughout the apprenticeship</li>
                <li className="pl-1"><strong>Discuss with your mentor:</strong> Review the matrix with your training provider to confirm coverage</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Gap Analysis Timing</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Quarterly:</strong> Quick review of coverage — are you building evidence across all areas?</li>
                <li className="pl-1"><strong>Six months before EPA:</strong> Detailed gap analysis — identify all red and amber areas</li>
                <li className="pl-1"><strong>Three months before EPA:</strong> Focused evidence gathering for remaining gaps</li>
                <li className="pl-1"><strong>One month before EPA:</strong> Final review — ensure every KSB has strong evidence</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A well-built mapping matrix gives you confidence going into the professional
              discussion because you know your evidence covers all requirements and you can talk about each piece in detail.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Preparing Your Portfolio for the Professional Discussion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The portfolio is not assessed in isolation — it serves as the evidence base for the professional discussion.
              How you prepare to discuss your evidence is just as important as the evidence itself. The assessor will ask
              probing questions about your portfolio entries, so you need to know your own evidence inside out.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discussion Preparation Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Review every piece of evidence:</strong> Re-read each entry and refresh your memory of the details</li>
                <li className="pl-1"><strong>Practise expanding on entries:</strong> For each piece, prepare to explain what, why, how, and what you learned</li>
                <li className="pl-1"><strong>Anticipate probing questions:</strong> What would the assessor ask? "Why did you choose that approach?" "What would you do differently?"</li>
                <li className="pl-1"><strong>Link to the standard:</strong> Be ready to explain how each activity demonstrates specific KSBs</li>
                <li className="pl-1"><strong>Know your weak areas:</strong> If any evidence is thin, prepare a strong verbal explanation to compensate</li>
                <li className="pl-1"><strong>Practise with your training provider:</strong> Conduct mock professional discussions before the real assessment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Final Portfolio Quality Check</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All KSBs covered in the mapping matrix with at least one strong piece of evidence</li>
                <li className="pl-1">Evidence reference codes are consistent and match actual documents</li>
                <li className="pl-1">Reflective accounts follow the STAR+R structure with genuine reflection</li>
                <li className="pl-1">Witness statements are signed, dated and from credible observers</li>
                <li className="pl-1">Photographs are annotated with dates, descriptions and KSB references</li>
                <li className="pl-1">Confidential information has been appropriately redacted</li>
                <li className="pl-1">The portfolio is well-organised and easy to navigate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Authenticity Matters</p>
              <p className="text-sm text-white">
                The assessor is trained to identify genuine evidence from fabricated or inflated accounts. Write in your
                own words, be honest about your level of involvement (observed, assisted, or led), and include challenges
                as well as successes. Authentic, straightforward evidence of real learning is far more convincing than
                polished but generic descriptions. The professional discussion will quickly reveal whether you genuinely
                experienced what your portfolio claims.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The portfolio directly supports the professional discussion component of the
              EPA. A well-built, well-mapped portfolio gives you confidence going into the discussion because you know
              your evidence covers all requirements and you can talk about each piece in detail.
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
              <li className="pl-1"><strong>Portfolio purpose:</strong> Evidence base for the professional discussion, not a standalone assessment</li>
              <li className="pl-1"><strong>Key components:</strong> KSB matrix, activity logs, reflective accounts, witness statements, photographs</li>
              <li className="pl-1"><strong>STAR+R format:</strong> Situation, Task, Action, Result, Reflection</li>
              <li className="pl-1"><strong>Start early:</strong> Build progressively from week one of your apprenticeship</li>
              <li className="pl-1"><strong>Quality over quantity:</strong> Five detailed, well-mapped entries beat twenty superficial ones</li>
              <li className="pl-1"><strong>Cross-reference:</strong> One piece of evidence can map to multiple KSBs</li>
              <li className="pl-1"><strong>Gap analysis:</strong> Regular review against KSBs to identify missing evidence</li>
              <li className="pl-1"><strong>Confidentiality:</strong> Redact client names and commercially sensitive information</li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Portfolio Building"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-2">
              Next: Witness Statements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section3_1;
