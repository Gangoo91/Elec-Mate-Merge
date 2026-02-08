import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Assessment Marking Criteria Awareness - MOET Module 7 Section 2.6";
const DESCRIPTION = "Understanding EPA marking criteria, grading descriptors and assessment expectations: what assessors look for, how to achieve pass and distinction grades, and common pitfalls in the MOET practical observation under ST1426.";

const quickCheckQuestions = [
  {
    id: "grading-difference",
    question: "What is the key difference between a 'pass' and a 'distinction' grade in the EPA practical observation?",
    options: [
      "Distinction candidates work faster",
      "Pass demonstrates competence; distinction demonstrates competence with exceptional quality, initiative, depth of understanding and professional confidence",
      "Distinction requires more qualifications",
      "There is no practical difference"
    ],
    correctIndex: 1,
    explanation: "A pass grade confirms you are competent — you can safely perform the required tasks to an acceptable standard. A distinction demonstrates you go beyond competence: exceptional workmanship quality, proactive safety awareness, deeper technical understanding, confident communication, and professional initiative. It is the difference between adequate and excellent."
  },
  {
    id: "assessor-observation",
    question: "During the practical observation, the assessor is primarily watching for:",
    options: [
      "Speed of completion only",
      "Safe working practices, systematic approach, correct use of tools/instruments, workmanship quality, communication, and professional behaviours",
      "Whether you ask for help",
      "Your ability to memorise regulation numbers"
    ],
    correctIndex: 1,
    explanation: "The assessor evaluates multiple dimensions simultaneously: safety consciousness, systematic methodology, technical skill with tools and instruments, quality of finished work, verbal communication of understanding, and professional behaviours (initiative, organisation, attention to detail). No single factor determines the grade — it is the combination."
  },
  {
    id: "common-fail-point",
    question: "Which of the following is a common reason for failing the practical observation?",
    options: [
      "Working too slowly",
      "Omitting safety-critical steps such as safe isolation, failing to prove dead, or not wearing appropriate PPE",
      "Asking the assessor a clarifying question",
      "Not finishing every task"
    ],
    correctIndex: 1,
    explanation: "Safety-critical omissions are the most common fail points. Failing to isolate before working, skipping the prove-test-prove sequence, not wearing appropriate PPE, and bypassing safety interlocks are all grounds for failing the practical observation regardless of how well other aspects are performed."
  },
  {
    id: "ksb-assessment",
    question: "How are KSBs (Knowledge, Skills, Behaviours) assessed across the EPA components?",
    options: [
      "Each KSB is tested only once in a single component",
      "KSBs are assessed holistically across all components — the knowledge test, practical observation and professional discussion each contribute evidence of different KSBs",
      "Only skills are assessed in the practical observation",
      "Behaviours are not formally assessed"
    ],
    correctIndex: 1,
    explanation: "The EPA is designed so that different components assess different KSBs, with some overlap for triangulation. The knowledge test primarily assesses K (knowledge), the practical observation primarily assesses S (skills) and B (behaviours), and the professional discussion assesses all three through reflection on workplace evidence. Together they build a complete picture of competence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The EPA grading structure for the MOET standard includes:",
    options: [
      "Pass only — there are no grades",
      "Fail, pass, and distinction",
      "Bronze, silver, and gold",
      "Grades A to E"
    ],
    correctAnswer: 1,
    explanation: "The MOET EPA uses a three-tier grading structure: fail (not yet competent), pass (competent to the required standard), and distinction (competent with exceptional performance). There is no 'merit' grade in this standard."
  },
  {
    id: 2,
    question: "To achieve a distinction in the practical observation, you should:",
    options: [
      "Complete the task as quickly as possible",
      "Demonstrate exceptional safety awareness, superior workmanship, confident technical communication, initiative, and thorough verification",
      "Ask the assessor for extra tasks",
      "Use the most expensive tools available"
    ],
    correctAnswer: 1,
    explanation: "Distinction requires performance that goes beyond the minimum competence standard. This includes: proactive (not just reactive) safety practices, workmanship that exceeds the minimum acceptable standard, confident and technically accurate communication, evidence of initiative and problem-solving, and thorough verification with attention to detail."
  },
  {
    id: 3,
    question: "The assessor uses grading descriptors to ensure:",
    options: [
      "Every candidate receives the same grade",
      "Consistent, objective and fair assessment against defined criteria, regardless of which assessor or EPAO conducts the assessment",
      "The assessment is easy to pass",
      "Candidates are compared against each other"
    ],
    correctAnswer: 1,
    explanation: "Grading descriptors provide standardised criteria so that assessment is objective and consistent. Every assessor uses the same descriptors, and every EPAO applies the same standard. This means your grade reflects your actual competence, not the particular assessor's personal preferences."
  },
  {
    id: 4,
    question: "If you make a minor error during the practical observation, you should:",
    options: [
      "Hope the assessor did not notice",
      "Recognise the error, correct it, and briefly explain what happened and why you corrected it",
      "Stop the assessment immediately",
      "Pretend it was intentional"
    ],
    correctAnswer: 1,
    explanation: "Self-recognition and correction of errors demonstrates competence and self-awareness. The assessor notes both the error and your response to it. A candidate who spots their own mistake and corrects it properly shows more competence than one who does not notice. This can actually work in your favour for achieving higher grades."
  },
  {
    id: 5,
    question: "The KSBs (Knowledge, Skills, Behaviours) assessed in the EPA are:",
    options: [
      "Only theoretical knowledge",
      "The complete set of knowledge, practical skills, and professional behaviours defined in the ST1426 apprenticeship standard",
      "Only practical skills",
      "Only workplace behaviours"
    ],
    correctAnswer: 1,
    explanation: "KSBs encompass all three dimensions: Knowledge (what you know and understand), Skills (what you can do in practice), and Behaviours (how you conduct yourself professionally). The EPA assesses all three through its different components — practical observation, knowledge test, and professional discussion."
  },
  {
    id: 6,
    question: "During the professional discussion element of the EPA, you should:",
    options: [
      "Give the shortest possible answers",
      "Provide detailed, evidenced answers that link your workplace experience to the apprenticeship standard, demonstrating depth of understanding",
      "Repeat memorised answers word for word",
      "Only discuss theory, not practical experience"
    ],
    correctAnswer: 1,
    explanation: "The professional discussion assesses your ability to reflect on and articulate your learning and experience. Provide specific examples from your workplace, explain what you did, why you did it, what you learned, and how it links to the standard. Detailed, genuine responses score higher than brief or generic answers."
  },
  {
    id: 7,
    question: "Professional behaviours assessed during the EPA include:",
    options: [
      "Only attendance and punctuality",
      "Safety consciousness, initiative, communication, teamwork, time management, attention to detail, and continuous improvement",
      "Only being polite to the assessor",
      "Wearing a uniform"
    ],
    correctAnswer: 1,
    explanation: "Professional behaviours are assessed throughout the EPA. They include: taking responsibility for safety, showing initiative in problem-solving, communicating clearly and professionally, working effectively with others, managing time efficiently, maintaining attention to detail, and demonstrating a commitment to learning and improvement."
  },
  {
    id: 8,
    question: "The purpose of the knowledge test element of the EPA is to:",
    options: [
      "Test your memory of regulation numbers",
      "Assess your underpinning knowledge and understanding of the technical, safety and regulatory topics covered by the apprenticeship standard",
      "Replace the practical observation",
      "Test your reading speed"
    ],
    correctAnswer: 1,
    explanation: "The knowledge test assesses whether you understand the technical and regulatory foundations of your role. It covers areas such as electrical theory, safety legislation, maintenance practices, and engineering principles. Understanding, not rote memorisation, is assessed — questions require application of knowledge, not just recall."
  },
  {
    id: 9,
    question: "To prepare effectively for the EPA marking criteria, you should:",
    options: [
      "Only study the night before",
      "Review the grading descriptors, understand what each grade requires, practise to the distinction standard, and seek feedback from your training provider",
      "Focus only on the areas you are weakest in",
      "Assume the EPA will be straightforward"
    ],
    correctAnswer: 1,
    explanation: "Effective preparation means understanding the criteria you will be judged against. Review the grading descriptors for each EPA component, practise performing tasks to the distinction standard (not just the pass standard), seek regular feedback from your training provider and workplace mentor, and address any gaps identified during mock assessments."
  },
  {
    id: 10,
    question: "An assessor who asks 'What would you do if...?' during the observation is:",
    options: [
      "Trying to distract you",
      "Testing your ability to think through scenarios, apply knowledge to new situations, and demonstrate depth of understanding",
      "Indicating you have made an error",
      "Making conversation to pass the time"
    ],
    correctAnswer: 1,
    explanation: "Scenario questions test higher-order thinking — can you apply your knowledge to new or unfamiliar situations? This is a key distinction between pass and distinction candidates. A confident, reasoned response that considers safety, regulations, and practical implications demonstrates genuine competence."
  },
  {
    id: 11,
    question: "If you are unsure about something during the EPA, the best approach is to:",
    options: [
      "Guess and hope for the best",
      "Acknowledge the uncertainty, explain what you do know, and describe how you would find the correct information in a real workplace situation",
      "Skip that part entirely",
      "Ask the assessor for the answer"
    ],
    correctAnswer: 1,
    explanation: "Honest acknowledgement of limitations, combined with knowing how to find information, is a professional behaviour. Explain what you are certain about, acknowledge what you are unsure of, and describe the resources you would consult (manufacturer's data, BS 7671, supervisor guidance). This demonstrates self-awareness and professional maturity."
  },
  {
    id: 12,
    question: "The overall EPA grade is determined by:",
    options: [
      "Only the practical observation score",
      "A combination of grades across all assessment components as defined in the EPA specification — you must achieve at least a pass in each component",
      "An average of all your coursework marks",
      "The assessor's overall impression on the day"
    ],
    correctAnswer: 1,
    explanation: "The overall grade is calculated from the combination of grades across all EPA components (knowledge test, practical observation, professional discussion) according to the rules in the EPA specification. You must pass each component — failing one means failing overall. The specific combination rules for achieving a distinction are defined by the EPAO and published in the assessment plan."
  }
];

const faqs = [
  {
    question: "Where can I find the official grading descriptors for the MOET EPA?",
    answer: "The grading descriptors are published in the EPA specification document for ST1426, available from the Institute for Apprenticeships and Technical Education (IfATE) website and from your EPAO. Your training provider should give you a copy and explain each criterion. Review them carefully — they are your roadmap to understanding exactly what the assessor is looking for."
  },
  {
    question: "How many EPA components are there and do I need to pass all of them?",
    answer: "The MOET EPA typically has three components: a knowledge test, a practical observation, and a professional discussion with portfolio. You must achieve at least a pass in each component. Your overall grade is determined by a combination of the grades across all components as defined in the EPA specification. You cannot fail one component and still achieve an overall pass."
  },
  {
    question: "Can I retake a failed EPA component?",
    answer: "Yes, if you fail one or more components, you can retake them. There is typically a waiting period before retake (your EPAO will confirm the timeframe). You should use the feedback from the failed attempt to identify areas for improvement and work with your training provider to address them before retaking."
  },
  {
    question: "How should I prepare for the professional discussion?",
    answer: "Prepare by reviewing your portfolio evidence and being ready to discuss each piece in detail: what the situation was, what you did, why you did it, what the outcome was, and what you learned. Practise speaking about your experience confidently and linking it to the standard's KSBs. Your training provider should conduct mock professional discussions to help you prepare."
  },
  {
    question: "Does the assessor have a checklist they work through?",
    answer: "Assessors use structured assessment plans with specific criteria and evidence requirements. They observe and record evidence against each criterion during the assessment. They are trained to be objective and consistent. The assessment is structured, not random — so knowing the criteria helps you demonstrate the right evidence at the right time."
  }
];

const MOETModule7Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
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
            <span>Module 7.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Assessment Marking Criteria Awareness
          </h1>
          <p className="text-white/80">
            Understanding what assessors look for and how to achieve your best grade in the EPA
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Grades:</strong> Fail, pass, distinction — no merit</li>
              <li className="pl-1"><strong>Pass:</strong> Competent to the required standard</li>
              <li className="pl-1"><strong>Distinction:</strong> Exceptional quality, initiative, depth</li>
              <li className="pl-1"><strong>Criteria:</strong> Published grading descriptors for each component</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Components:</strong> Knowledge test, practical, professional discussion</li>
              <li className="pl-1"><strong>KSBs:</strong> Knowledge, skills and behaviours assessed</li>
              <li className="pl-1"><strong>Objective:</strong> Standardised criteria across all EPAOs</li>
              <li className="pl-1"><strong>ST1426:</strong> Full standard mapped to assessment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the EPA grading structure and what each grade requires",
              "Identify the key marking criteria for the practical observation component",
              "Recognise the difference between pass and distinction-level performance",
              "Understand how professional behaviours contribute to your overall grade",
              "Identify common fail points and how to avoid them during assessment",
              "Prepare effectively using the official grading descriptors and criteria"
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
            The EPA Grading Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The MOET End-Point Assessment uses a straightforward grading structure: fail, pass, and distinction.
              Understanding what each grade requires helps you target your preparation and performance. The key is that
              the EPA is not a competition against other candidates — it is an assessment of your competence against
              defined standards.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grade Definitions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Grade</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Means</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Indicators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">Fail</td>
                      <td className="border border-white/10 px-3 py-2">Not yet competent to the required standard</td>
                      <td className="border border-white/10 px-3 py-2">Safety-critical errors, insufficient knowledge, unable to complete key tasks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">Pass</td>
                      <td className="border border-white/10 px-3 py-2">Competent to the required standard</td>
                      <td className="border border-white/10 px-3 py-2">Safe working, correct procedures, acceptable workmanship, adequate knowledge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-elec-yellow">Distinction</td>
                      <td className="border border-white/10 px-3 py-2">Exceeds the required standard with exceptional performance</td>
                      <td className="border border-white/10 px-3 py-2">Proactive safety, superior workmanship, deep understanding, confident communication, initiative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Automatic Fail Criteria</p>
              <p className="text-sm text-white">
                Certain errors result in an automatic fail regardless of performance in other areas. These include:
                working on live conductors without safe isolation, failing to use or correctly apply the prove-test-prove
                sequence, bypassing safety interlocks or devices, and creating an unsafe situation that could endanger
                yourself or others. These are non-negotiable safety requirements.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Aim for distinction in your preparation, even if you would be happy with a
              pass. Preparing to the highest standard gives you the best margin for success under assessment pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Practical Observation Marking Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The practical observation is where your hands-on competence is directly assessed. The assessor uses structured
              criteria to evaluate multiple aspects of your performance simultaneously. Understanding these criteria allows
              you to demonstrate the right evidence at the right time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What the Assessor Evaluates</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety:</strong> Safe isolation, PPE use, risk awareness, safe working throughout — this is the foundation</li>
                <li className="pl-1"><strong>Methodology:</strong> Systematic approach, logical sequence, correct procedures followed</li>
                <li className="pl-1"><strong>Technical skill:</strong> Correct use of tools, instruments, and techniques; accuracy of work</li>
                <li className="pl-1"><strong>Workmanship:</strong> Quality of connections, cable management, component installation, finish</li>
                <li className="pl-1"><strong>Communication:</strong> Explaining actions, reasoning, and technical understanding verbally</li>
                <li className="pl-1"><strong>Verification:</strong> Testing completed work, confirming correct operation, documenting results</li>
                <li className="pl-1"><strong>Professionalism:</strong> Organisation, time management, housekeeping, attention to detail</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Pass vs Distinction — Practical Examples</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pass Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Distinction Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safe isolation</td>
                      <td className="border border-white/10 px-3 py-2">Completes correctly with prompting</td>
                      <td className="border border-white/10 px-3 py-2">Completes confidently, explains each step unprompted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault diagnosis</td>
                      <td className="border border-white/10 px-3 py-2">Uses systematic method, finds fault</td>
                      <td className="border border-white/10 px-3 py-2">Uses efficient method, explains reasoning clearly, identifies root cause</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Workmanship</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable quality, functional</td>
                      <td className="border border-white/10 px-3 py-2">Exceptional quality, neat, professional finish, uses torque settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communication</td>
                      <td className="border border-white/10 px-3 py-2">Answers questions when asked</td>
                      <td className="border border-white/10 px-3 py-2">Proactively explains, references standards, shows deep understanding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Distinction is not about perfection — it is about consistent excellence across
              all criteria. You do not need to be perfect in every area, but you need to demonstrate exceptional performance
              in the majority of them.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Pitfalls and How to Avoid Them
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common fail points and pitfalls helps you avoid them. These are not obscure traps — they are
              predictable errors that assessment experience shows candidates repeatedly make. Being aware of them is your
              best defence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Top 10 Candidate Pitfalls</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Skipping safe isolation steps</strong> — rushing or assuming the circuit is dead without proving it</li>
                <li className="pl-1"><strong>Not explaining actions</strong> — working silently so the assessor cannot assess understanding</li>
                <li className="pl-1"><strong>Poor cable preparation</strong> — nicked conductors, wrong strip length, missing ferrules</li>
                <li className="pl-1"><strong>Ignoring manufacturer's data</strong> — not checking component specifications before installation</li>
                <li className="pl-1"><strong>Skipping functional verification</strong> — assuming the repair is correct without testing</li>
                <li className="pl-1"><strong>Random fault diagnosis</strong> — replacing components without systematic diagnosis</li>
                <li className="pl-1"><strong>Poor time management</strong> — spending too long on early tasks and rushing later ones</li>
                <li className="pl-1"><strong>Not updating labelling</strong> — leaving outdated or missing circuit identification</li>
                <li className="pl-1"><strong>Messy work area</strong> — poor housekeeping throughout the assessment</li>
                <li className="pl-1"><strong>Nervousness preventing communication</strong> — freezing up instead of explaining actions</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Managing Assessment Nerves</p>
              <p className="text-sm text-white">
                Nervousness is natural and expected. The best antidote is thorough preparation — the more you have
                practised, the more your responses become automatic under pressure. Focus on one step at a time rather
                than thinking about the entire assessment. If you feel overwhelmed, take a breath and return to the
                procedure you know. The assessor understands that candidates are nervous and will not penalise natural
                anxiety — only the impact on your performance.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Most failures are preventable. Thorough preparation, practised procedures,
              and awareness of common pitfalls will see you through the assessment with confidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Preparing to Meet the Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective EPA preparation is targeted — you need to know what you are preparing for and practise
              specifically against the marking criteria. Generic revision is less effective than focused preparation
              against the published grading descriptors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preparation Strategy</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Obtain the grading descriptors:</strong> Get the official EPA specification from your training provider or IfATE</li>
                <li className="pl-1"><strong>Self-assess honestly:</strong> Rate yourself against each criterion — where are your strengths and gaps?</li>
                <li className="pl-1"><strong>Practise to distinction standard:</strong> Do not practise to just pass — practise to the highest level</li>
                <li className="pl-1"><strong>Mock assessments:</strong> Complete at least two full mock assessments under timed conditions</li>
                <li className="pl-1"><strong>Seek feedback:</strong> Ask your training provider and workplace mentor for honest feedback</li>
                <li className="pl-1"><strong>Address gaps:</strong> Focus additional practice time on your weakest areas</li>
                <li className="pl-1"><strong>Practise communication:</strong> Explain your actions out loud until it feels natural</li>
                <li className="pl-1"><strong>Prepare your portfolio:</strong> Ensure all evidence is complete, organised and clearly linked to KSBs</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Mock Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete at least two full mock practical assessments under timed conditions</li>
                <li className="pl-1">Have your training provider observe and provide feedback against the grading descriptors</li>
                <li className="pl-1">Practise the professional discussion with prepared portfolio evidence</li>
                <li className="pl-1">Complete timed mock knowledge tests to build exam technique</li>
                <li className="pl-1">Record and review your communication — are you explaining actions clearly?</li>
                <li className="pl-1">Identify and address weaknesses revealed during mock assessments</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Mock assessments are the closest you can get to the real thing. Treat them
              seriously — dress as you would for the EPA, use the same tools, and work under the same time pressure.
              The more realistic your practice, the more confident you will be on the day.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            On the Day — Maximising Your Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your performance on assessment day is the culmination of months of preparation. Understanding how to
              manage the day itself — from practical logistics to psychological readiness — can make the difference
              between achieving a pass and a distinction. The assessor is looking for a competent, confident
              professional, and how you conduct yourself matters as much as your technical ability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Day Preparation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tools and equipment:</strong> Check everything the night before — all tools present, test instruments calibrated, batteries charged</li>
                <li className="pl-1"><strong>Documentation:</strong> Bring your portfolio, any required ID, and writing materials</li>
                <li className="pl-1"><strong>PPE:</strong> Clean, appropriate PPE ready — safety boots, overalls, eye protection, gloves</li>
                <li className="pl-1"><strong>Arrive early:</strong> Give yourself time to settle, familiarise yourself with the environment, and compose yourself</li>
                <li className="pl-1"><strong>Listen carefully:</strong> Pay close attention to the assessor's briefing — ask clarifying questions if anything is unclear</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During the Assessment</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Talk through your actions:</strong> Narrate what you are doing and why — this lets the assessor hear your understanding</li>
                <li className="pl-1"><strong>Follow your procedures:</strong> Stick to the safe working practices you have rehearsed</li>
                <li className="pl-1"><strong>Manage your time:</strong> Keep an awareness of time without clock-watching — pace yourself steadily</li>
                <li className="pl-1"><strong>Stay calm if things go wrong:</strong> Recognise errors, correct them, and explain your correction</li>
                <li className="pl-1"><strong>Maintain professionalism:</strong> Tidy as you go, organise your workspace, treat it as a real job</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The Power of Communication</p>
              <p className="text-sm text-white">
                The single most common difference between pass and distinction candidates is communication. Distinction
                candidates naturally explain what they are doing and why, reference relevant standards, and demonstrate
                understanding through their commentary. If you are naturally quiet, practise speaking through your
                actions during mock assessments until it becomes second nature. The assessor cannot mark what they
                cannot observe or hear.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding the marking criteria is itself a professional behaviour —
              it shows that you take your development seriously and prepare methodically for important milestones.
              This same approach will serve you throughout your career whenever you face assessments, audits, or
              professional reviews.
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
              <li className="pl-1"><strong>Grades:</strong> Fail, pass, distinction — no merit grade exists for MOET</li>
              <li className="pl-1"><strong>Components:</strong> Knowledge test + practical observation + professional discussion</li>
              <li className="pl-1"><strong>Must pass all:</strong> Failing any single component means failing overall</li>
              <li className="pl-1"><strong>Automatic fail:</strong> Unsafe isolation, bypassing safety devices, working live without authorisation</li>
              <li className="pl-1"><strong>Distinction indicators:</strong> Proactive safety, confident communication, exceptional workmanship, initiative</li>
              <li className="pl-1"><strong>Grading descriptors:</strong> Available from IfATE and your EPAO — review them thoroughly</li>
              <li className="pl-1"><strong>Mock assessments:</strong> Complete at least two under realistic timed conditions</li>
              <li className="pl-1"><strong>Communication:</strong> Talk through your actions — the assessor cannot mark what they cannot hear</li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Marking Criteria"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Industry Standards
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_6;
