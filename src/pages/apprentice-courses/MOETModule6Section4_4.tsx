import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Professional Behaviour and Teamwork - MOET Module 6 Section 4.4";
const DESCRIPTION = "Professional standards, teamwork skills, ethical behaviour, continuous professional development, and workplace conduct for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "professional-responsibility",
    question: "Under ST1426, 'professional responsibility' for a maintenance technician means:",
    options: [
      "Only doing what you are told",
      "Taking ownership of your work quality, safety decisions, continued learning, and the impact of your actions on colleagues, clients, and the public",
      "Avoiding difficult tasks",
      "Working the longest hours possible"
    ],
    correctIndex: 1,
    explanation: "Professional responsibility encompasses: producing work to an acceptable standard, making sound safety judgements, maintaining and developing your skills, being accountable for your actions, and considering the impact of your work on others. It is an active, ongoing commitment — not simply following instructions."
  },
  {
    id: "teamwork-conflict",
    question: "During a team maintenance task, you disagree with a colleague's approach. The most professional response is to:",
    options: [
      "Do it your way without telling them",
      "Raise your concern calmly and constructively, explain your reasoning, listen to their perspective, and if necessary involve the supervisor to reach a decision",
      "Argue until they agree with you",
      "Do nothing and let them make a mistake"
    ],
    correctIndex: 1,
    explanation: "Professional disagreement is healthy and can prevent errors. The key is how you express it: calmly, with evidence, and with respect for the other person's perspective. If you cannot resolve it between yourselves, involve the supervisor. Never let unresolved disagreements create safety risks — and never let ego override sound technical judgement."
  },
  {
    id: "cpd-importance",
    question: "Why is Continuing Professional Development (CPD) important for maintenance technicians?",
    options: [
      "It is not important — once qualified, you know everything",
      "Regulations, technology, and best practices evolve continuously. CPD ensures your knowledge and skills remain current, safe, and compliant",
      "Only to get a pay rise",
      "Only because the employer requires it"
    ],
    correctIndex: 1,
    explanation: "The electrical industry changes constantly: BS 7671 is amended regularly, new technologies emerge (EV charging, battery storage, heat pumps), building regulations evolve, and best practices improve. A technician who stops learning quickly falls behind. CPD is both a professional obligation and a practical necessity for safe, effective work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A maintenance technician's professional behaviour is assessed under ST1426 because:",
    options: [
      "Employers like polite employees",
      "Professional behaviour directly affects safety outcomes, team effectiveness, client relationships, and the reputation of the engineering profession",
      "It fills time in the end-point assessment",
      "It is a legacy requirement with no practical value"
    ],
    correctAnswer: 1,
    explanation: "Professional behaviour is not a soft skill — it is directly linked to safety. A technician who takes shortcuts, fails to communicate, or disregards procedures creates risk. ST1426 assesses behaviours because they are inseparable from competent, safe practice."
  },
  {
    id: 2,
    question: "When working as part of a maintenance team, effective teamwork requires:",
    options: [
      "Doing your own work without considering others",
      "Clear communication, mutual support, shared situational awareness, and collective responsibility for safety and work quality",
      "Letting the most experienced person make all decisions",
      "Avoiding conflict at all costs"
    ],
    correctAnswer: 1,
    explanation: "Effective teams communicate openly, support each other, share information about hazards and progress, and take collective responsibility for outcomes. Every team member — regardless of experience level — has a duty to speak up about safety concerns and contribute to the team's effectiveness."
  },
  {
    id: 3,
    question: "Ethical behaviour in maintenance includes:",
    options: [
      "Cutting corners when the client will not notice",
      "Honest reporting of findings, accurate recording of test results, declaring when work is beyond your competence, and never signing off work you have not verified",
      "Telling the client what they want to hear",
      "Only doing the minimum required by the contract"
    ],
    correctAnswer: 1,
    explanation: "Ethical behaviour means doing the right thing even when nobody is watching. This includes: reporting genuine test results (never fabricating data), declaring competence limitations honestly, never signing certificates for work you have not done or checked, and reporting safety hazards even when they create extra work."
  },
  {
    id: 4,
    question: "A colleague asks you to sign a test certificate for work they completed but you did not witness. You should:",
    options: [
      "Sign it to help them out",
      "Refuse politely but firmly — explain that signing a certificate you cannot verify is fraudulent and could have serious legal and safety consequences",
      "Sign it but add a note saying you did not see the work",
      "Report them to HR without discussing it"
    ],
    correctAnswer: 1,
    explanation: "Signing a certificate confirms that you have personally verified the work meets the required standard. Signing without verification is fraudulent under the Fraud Act 2006 and could make you personally liable if a fault leads to injury or fire. Explain this to your colleague — they may not realise the severity of what they are asking."
  },
  {
    id: 5,
    question: "Maintaining a positive attitude in a maintenance team means:",
    options: [
      "Never expressing concerns or problems",
      "Approaching challenges constructively, supporting colleagues, sharing knowledge willingly, and contributing to a culture where safety concerns can be raised without fear",
      "Always agreeing with the supervisor",
      "Pretending everything is fine when it is not"
    ],
    correctAnswer: 1,
    explanation: "A positive attitude is not about suppressing problems — it is about approaching them constructively. Teams where people feel able to raise concerns, ask for help, and share knowledge are safer and more effective than teams where people hide problems to appear positive."
  },
  {
    id: 6,
    question: "When mentoring a less experienced colleague, you should:",
    options: [
      "Let them figure things out for themselves",
      "Share your knowledge and experience patiently, explain the reasoning behind procedures (not just the steps), supervise safety-critical tasks, and encourage them to ask questions",
      "Do the work for them to save time",
      "Only teach them what is in the textbook"
    ],
    correctAnswer: 1,
    explanation: "Effective mentoring transfers not just knowledge but understanding. Explaining why things are done a certain way (not just how) builds professional judgement. Encouraging questions creates a learning culture. Supervising safety-critical tasks protects both the learner and the public."
  },
  {
    id: 7,
    question: "Under HASAWA 1974 Section 7, every employee has a duty to:",
    options: [
      "Follow instructions without question",
      "Take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions, and cooperate with their employer on safety matters",
      "Only look after their own safety",
      "Only follow safety rules when supervised"
    ],
    correctAnswer: 1,
    explanation: "Section 7 creates a personal legal duty on every employee. You must take care of yourself and others, cooperate with safety measures, not interfere with safety equipment, and report hazards. This duty applies at all times — not just when you are being watched."
  },
  {
    id: 8,
    question: "Time management on maintenance tasks demonstrates professionalism because:",
    options: [
      "Working fast impresses the supervisor",
      "Efficient use of time means more work is completed safely, planned schedules are maintained, and resources (including your colleagues' time) are used responsibly",
      "It proves you are better than your colleagues",
      "Time management is not relevant to maintenance"
    ],
    correctAnswer: 1,
    explanation: "Professional time management means: planning work before starting, having the right tools and parts ready, working efficiently without rushing safety-critical steps, communicating delays early, and respecting that your timekeeping affects your team. It is about effectiveness, not speed."
  },
  {
    id: 9,
    question: "If you make a mistake during a maintenance task, the professional response is to:",
    options: [
      "Cover it up and hope nobody notices",
      "Report it honestly and immediately, assess the safety impact, take corrective action, and learn from the error to prevent recurrence",
      "Blame someone else",
      "Wait to see if it causes a problem"
    ],
    correctAnswer: 1,
    explanation: "Everyone makes mistakes. The measure of professionalism is how you respond. Honest reporting enables: immediate correction before the error causes harm, learning for yourself and the team, improvement of procedures to prevent recurrence, and maintenance of trust. Cover-ups are discovered eventually — and the consequences are always worse."
  },
  {
    id: 10,
    question: "Respect for diversity and inclusion in a maintenance team means:",
    options: [
      "Treating everyone the same regardless of their needs",
      "Valuing different perspectives and experiences, treating all colleagues with dignity, challenging discriminatory behaviour, and supporting an inclusive working environment",
      "Only working with people you agree with",
      "Avoiding any discussion of differences"
    ],
    correctAnswer: 1,
    explanation: "Diverse teams bring different perspectives, experiences, and problem-solving approaches. Inclusion means everyone feels valued, respected, and able to contribute fully. Under the Equality Act 2010, discriminatory behaviour is unlawful. As a professional, you have both a legal and moral obligation to support an inclusive workplace."
  },
  {
    id: 11,
    question: "A professional maintenance technician's toolkit includes:",
    options: [
      "Only physical tools and test equipment",
      "Technical knowledge, communication skills, safety awareness, ethical judgement, teamwork ability, and a commitment to continuous learning — alongside physical tools and equipment",
      "A smartphone for social media during quiet periods",
      "Only the tools specified in BS 7671"
    ],
    correctAnswer: 1,
    explanation: "Modern maintenance requires a broad set of competencies. Technical skill alone is not sufficient — you also need communication skills (to report findings and liaise with others), safety awareness (to protect yourself and others), ethical judgement (to make honest decisions), and the habit of continuous learning (to stay current)."
  },
  {
    id: 12,
    question: "At the completion of your ST1426 apprenticeship, you are expected to demonstrate:",
    options: [
      "Only the ability to pass a written test",
      "Competence across all knowledge, skills, and behaviours defined in the standard — including professional conduct, communication, teamwork, and independent judgement in real workplace situations",
      "Only practical skills",
      "Only the ability to follow instructions"
    ],
    correctAnswer: 1,
    explanation: "ST1426 end-point assessment evaluates the whole professional: technical knowledge (through tests and professional discussion), practical skills (through observation and portfolio), and behaviours (through professional discussion and employer testimony). All three pillars must be demonstrated to achieve the standard."
  }
];

const faqs = [
  {
    question: "What does 'professional behaviour' actually mean in practice?",
    answer: "It means: arriving on time and prepared, wearing appropriate PPE, communicating clearly and respectfully, reporting findings honestly, following procedures, admitting when you do not know something, taking responsibility for your work, keeping your skills current, and treating everyone — colleagues, clients, and the public — with respect. It is not one big thing; it is many small things done consistently."
  },
  {
    question: "How do I develop good teamwork skills?",
    answer: "Practice active listening, communicate your intentions clearly (especially during safety-critical tasks), offer to help colleagues when you can, share relevant information proactively, accept constructive feedback without defensiveness, and acknowledge others' contributions. Teamwork is a skill that improves with practice and conscious effort."
  },
  {
    question: "What CPD should I undertake after completing my apprenticeship?",
    answer: "Focus on: staying current with BS 7671 amendments (Amendment 2 is current as of 2022), developing specialist knowledge in your area of work (e.g., EV charging, renewable energy, building management systems), pursuing additional qualifications (such as the City & Guilds 2391 Inspection and Testing), attending manufacturer training on equipment you maintain, and reading industry publications such as IET Wiring Matters."
  },
  {
    question: "How should I handle a situation where company procedures conflict with what I believe is safe?",
    answer: "Raise your concern through the proper channels: speak to your supervisor, use the organisation's safety reporting system, or contact the safety representative. Do not simply ignore the procedure — but equally, do not carry out work you believe is unsafe. Document your concern. If internal channels do not resolve the issue, you can contact the HSE or your professional body for guidance."
  },
  {
    question: "Is it unprofessional to ask for help?",
    answer: "Absolutely not. Recognising the limits of your competence and seeking assistance is one of the most professional things you can do. It is far more dangerous to attempt work you are not competent to carry out. Asking for help shows good judgement, self-awareness, and a commitment to safety. Nobody knows everything — and the best technicians are those who know when to ask."
  }
];

const MOETModule6Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" /><span>Module 6.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Behaviour and Teamwork
          </h1>
          <p className="text-white/80">
            Professional standards, ethical conduct, teamwork skills, and continuous development
          </p>
        </header>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Professionalism:</strong> Ownership of work quality, safety, and conduct</li>
              <li className="pl-1"><strong>Teamwork:</strong> Communication, mutual support, shared responsibility</li>
              <li className="pl-1"><strong>Ethics:</strong> Honest reporting, accurate records, declaring limitations</li>
              <li className="pl-1"><strong>CPD:</strong> Continuous learning to maintain competence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safety culture:</strong> Speaking up, reporting near misses</li>
              <li className="pl-1"><strong>Accountability:</strong> Standing behind your work and decisions</li>
              <li className="pl-1"><strong>Mentoring:</strong> Supporting less experienced colleagues</li>
              <li className="pl-1"><strong>ST1426:</strong> Behaviours pillar of end-point assessment</li>
            </ul>
          </div>
        </div>

        {/* Learning outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Demonstrate professional behaviour consistent with the ST1426 behaviours standard",
              "Work effectively as part of a maintenance team with clear communication and mutual support",
              "Apply ethical principles to decision-making, record-keeping, and certification",
              "Identify and commit to Continuing Professional Development throughout your career",
              "Handle workplace challenges including conflict, mistakes, and competing priorities professionally",
              "Understand your legal duties under HASAWA 1974 and the Equality Act 2010"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Professional Behaviour Means
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional behaviour in electrical maintenance is not an abstract concept — it is a set of concrete, observable actions that directly affect safety, quality, and the reputation of the profession. Under ST1426, professional behaviours are assessed alongside knowledge and skills as a core pillar of competence.
            </p>
            <p>
              Being professional means taking ownership. Ownership of your work quality — if you install it, test it, or sign it off, you stand behind it. Ownership of safety — not just your own, but that of everyone affected by your work. Ownership of your development — keeping your skills current throughout your career. And ownership of your conduct — treating colleagues, clients, and the public with respect and integrity.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The ST1426 Behaviours</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety orientation:</strong> Prioritising safety in every decision and action</li>
                <li className="pl-1"><strong>Strong work ethic:</strong> Reliable, punctual, thorough, and committed to quality</li>
                <li className="pl-1"><strong>Professional judgement:</strong> Making sound decisions based on knowledge and experience</li>
                <li className="pl-1"><strong>Personal responsibility:</strong> Accountability for your actions and their consequences</li>
                <li className="pl-1"><strong>Effective communication:</strong> Clear, honest, and appropriate to the audience</li>
                <li className="pl-1"><strong>Teamwork:</strong> Working cooperatively and supporting colleagues</li>
                <li className="pl-1"><strong>Commitment to CPD:</strong> Actively maintaining and developing competence</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Behaviours Are Not Optional</p>
              <p className="text-sm text-white">In the ST1426 end-point assessment, behaviours are assessed through professional discussion and employer testimony. A technically competent technician who behaves unprofessionally — cutting corners, failing to communicate, or disrespecting colleagues — will not pass the assessment. The standard recognises that behaviour and competence are inseparable.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Working as Part of a Team
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance work is rarely a solo activity. Even when you are working independently on a task, you are part of a wider team: your shift colleagues, the planning team, the supervisor, contractors, and the facilities management team. Effective teamwork means understanding how your work connects to everyone else&apos;s.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristics of Effective Maintenance Teams</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Clear communication:</strong> Team members share information proactively — especially about hazards, progress, and changes</li>
                <li className="pl-1"><strong>Mutual support:</strong> Team members help each other, share the workload fairly, and cover for absences</li>
                <li className="pl-1"><strong>Shared situational awareness:</strong> Everyone knows what is happening across the team — who is working where, what permits are active, what is isolated</li>
                <li className="pl-1"><strong>Collective safety responsibility:</strong> Safety is everyone&apos;s concern, not just the supervisor&apos;s. Anyone can and should raise a safety concern</li>
                <li className="pl-1"><strong>Constructive challenge:</strong> Team members feel safe to question decisions, suggest improvements, and report errors without fear of blame</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Role in the Team</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-elec-yellow/80 font-medium">Responsibility</th>
                      <th className="py-2 text-elec-yellow/80 font-medium">What This Looks Like</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Communicate your plan</td>
                      <td className="py-2">Tell colleagues what you are working on, where, and when you expect to finish</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Share safety information</td>
                      <td className="py-2">Warn colleagues about hazards you have identified, even outside your immediate work area</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Offer help</td>
                      <td className="py-2">If you see a colleague struggling or if you have capacity, offer assistance</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Accept feedback</td>
                      <td className="py-2">Listen to constructive criticism without defensiveness — it is an opportunity to improve</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Support new team members</td>
                      <td className="py-2">Share knowledge, explain procedures, and help them integrate into the team</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ethics and Integrity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ethical behaviour in electrical maintenance is not abstract philosophy — it has direct, practical consequences. A fabricated test result could lead to a fatal electric shock. A signed-off certificate for work you did not verify could result in a fire. A failure to report a safety hazard could cause an incident. Ethics in this profession is about honesty, accuracy, and the courage to do the right thing.
            </p>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Consequences of Dishonesty</p>
              <p className="text-sm text-white">Fabricating test results, signing certificates for work not done, or failing to report defects are not just professional misconduct — they are criminal offences. Under the Fraud Act 2006, making a false representation (such as a fabricated test certificate) is punishable by up to 10 years imprisonment. Under HASAWA 1974, failing to report a known hazard that leads to injury can result in prosecution of the individual, not just the employer.</p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ethical Principles for Maintenance Technicians</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Honesty in reporting:</strong> Record what you actually found and measured — never what you think should be there</li>
                <li className="pl-1"><strong>Accuracy in records:</strong> Test results, work completed, materials used — all must be truthful and verifiable</li>
                <li className="pl-1"><strong>Competence boundaries:</strong> Declare honestly when work is beyond your competence or qualification</li>
                <li className="pl-1"><strong>Certification integrity:</strong> Never sign a certificate for work you have not personally completed or verified</li>
                <li className="pl-1"><strong>Conflict of interest:</strong> If you find a reason to recommend additional work, ensure the recommendation is genuine and necessary</li>
                <li className="pl-1"><strong>Confidentiality:</strong> Respect client confidentiality — do not share site information, access codes, or system details inappropriately</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Continuing Professional Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Completing your apprenticeship is the beginning of your professional journey, not the end. The electrical industry evolves continuously — regulations change, technologies advance, and best practices improve. A commitment to lifelong learning is what separates a technician who remains competent from one who gradually becomes obsolete and, ultimately, unsafe.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CPD Pathways After ST1426</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 7671 updates:</strong> Stay current with amendments — Amendment 2 (2022) is current; further amendments are expected</li>
                <li className="pl-1"><strong>Inspection and testing:</strong> City &amp; Guilds 2391-52 qualification for inspection, testing, and certification</li>
                <li className="pl-1"><strong>Specialist skills:</strong> EV charging installation (C&amp;G 2919), solar PV, battery storage, heat pump systems</li>
                <li className="pl-1"><strong>Management qualifications:</strong> ILM Level 3 in Management for those moving into supervisory roles</li>
                <li className="pl-1"><strong>Manufacturer training:</strong> Specific training on equipment you maintain (BMS, VSD, PLC systems)</li>
                <li className="pl-1"><strong>Professional registration:</strong> EngTech registration with the IET demonstrates professional standing</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Informal CPD</h3>
              <p className="text-sm text-white mb-2">Formal courses are not the only way to develop. Valuable informal CPD includes:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reading industry publications (IET Wiring Matters, Electrical Review)</li>
                <li className="pl-1">Attending manufacturer product demonstrations and webinars</li>
                <li className="pl-1">Participating in toolbox talks — both attending and delivering</li>
                <li className="pl-1">Learning from colleagues with different specialisms</li>
                <li className="pl-1">Reviewing incident reports and lessons learned from other organisations</li>
                <li className="pl-1">Keeping a CPD log to track your development activities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Workplace Conduct and Legal Duties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your workplace conduct is governed by both professional standards and law. Understanding your legal duties helps you make sound decisions and protects you if your actions are ever questioned.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Legal Duties</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HASAWA 1974, Section 7:</strong> Take reasonable care for your own health and safety and that of others affected by your work. Cooperate with your employer on safety matters</li>
                <li className="pl-1"><strong>HASAWA 1974, Section 8:</strong> Do not intentionally or recklessly interfere with or misuse anything provided for safety</li>
                <li className="pl-1"><strong>EAWR 1989, Regulation 3:</strong> Only carry out electrical work if you are competent to do so, or are under appropriate supervision</li>
                <li className="pl-1"><strong>Equality Act 2010:</strong> Do not discriminate against colleagues or clients on the basis of protected characteristics (age, disability, gender, race, religion, sexual orientation, etc.)</li>
                <li className="pl-1"><strong>Fraud Act 2006:</strong> Do not make false representations — including fabricated test results or certificates</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Your Professional Legacy</p>
              <p className="text-sm text-white">Every piece of work you complete, every record you create, and every interaction you have builds your professional reputation. The electrical installations you maintain will serve buildings and protect people for decades. The records you create may be referenced for years to come. The apprentices you eventually mentor will carry your professional standards into the future. Take pride in doing excellent work — it matters more than you may realise.</p>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />Previous: Liaising with Non-Technical Staff
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6">
              Back to Module 6 Overview<ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section4_4;
