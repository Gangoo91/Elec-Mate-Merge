import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

// SEO metadata
const seoTitle = "Maintaining Professional Standards and Accountability - Level 3 Fault Diagnosis";
const seoDescription = "Learn about professional conduct, accountability, and maintaining high standards in electrical fault diagnosis work, including ethics, CPD requirements, and industry responsibilities.";

// Quick check questions for inline knowledge checks
const quickCheckQuestions = [
  {
    question: "What does accountability mean in the context of electrical work?",
    options: ["Only being responsible when things go wrong", "Taking responsibility for your work, decisions, and their consequences", "Blaming others when problems occur", "Following instructions without question"],
    correctAnswer: 1,
    explanation: "Accountability means taking full responsibility for your work, the decisions you make, and their consequences - both positive and negative. It involves standing behind your work and addressing any issues that arise."
  },
  {
    question: "Under the Electricity at Work Regulations 1989, who has duties regarding electrical safety?",
    options: ["Only employers", "Only employees", "Both employers and employees, plus the self-employed", "Only building owners"],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations 1989 place duties on employers, employees, and the self-employed. Everyone involved in work activities has responsibilities for electrical safety to the extent of their control and capability."
  },
  {
    question: "What is the purpose of Continuing Professional Development (CPD)?",
    options: ["To increase earning potential only", "To maintain and enhance competence throughout your career", "It's only required for registered professionals", "To gain qualifications for new career paths"],
    correctAnswer: 1,
    explanation: "CPD ensures you maintain and enhance your competence throughout your career. As regulations, technology, and best practices evolve, CPD keeps your knowledge current and demonstrates commitment to professional standards."
  },
  {
    question: "When should you refuse to carry out work?",
    options: ["Never - always do what customers ask", "When you don't feel like it", "When the work would be unsafe, non-compliant, or beyond your competence", "Only when the customer can't pay"],
    correctAnswer: 2,
    explanation: "Professional practice requires refusing work that would be unsafe, non-compliant with regulations, or beyond your competence. Your primary duty is to safety and legal compliance, not customer demands."
  }
];

// Quiz questions for end of section assessment
const quizQuestions = [
  {
    question: "What is the primary purpose of competent person schemes in electrical installation work?",
    options: ["To increase costs for contractors", "To provide self-certification of compliance with Building Regulations", "To eliminate the need for testing", "To replace local authority inspection"],
    correctAnswer: 1,
    explanation: "Competent person schemes allow registered members to self-certify that their work complies with Building Regulations, avoiding the need for separate building control notification while maintaining standards through scheme oversight."
  },
  {
    question: "What should you do if you discover that a colleague has carried out substandard work?",
    options: ["Ignore it - it's not your responsibility", "Report it to the appropriate authority if safety is at risk", "Criticise them publicly", "Fix it without telling anyone"],
    correctAnswer: 1,
    explanation: "Professional responsibility may require reporting serious safety concerns to appropriate authorities. While the approach should be measured, public safety must take precedence. Consider discussing with the individual first if appropriate."
  },
  {
    question: "How does BS 7671 define a competent person?",
    options: ["Anyone with electrical qualifications", "Someone with relevant knowledge, skills, and experience for the work", "Only those registered with schemes", "Anyone who has completed an apprenticeship"],
    correctAnswer: 1,
    explanation: "BS 7671 defines competence as having adequate training, skills, knowledge, and experience to carry out the specific work safely. Competence is task-specific - you may be competent for some work but not others."
  },
  {
    question: "What is your responsibility regarding knowledge of current regulations?",
    options: ["Only know regulations from when you qualified", "Stay current with all applicable regulations and standards", "Wait until inspected to learn new rules", "Only employers need to know regulations"],
    correctAnswer: 1,
    explanation: "Professional electricians must stay current with applicable regulations, amendments, and standards. This is part of competence and essential for carrying out work that meets current requirements."
  },
  {
    question: "What ethical principle should guide decisions about work that isn't strictly non-compliant but is of poor quality?",
    options: ["If it's legal, it's acceptable", "Professional integrity requires recommending improvement", "Only address if the customer notices", "Leave it for the next electrician"],
    correctAnswer: 1,
    explanation: "Professional integrity goes beyond minimum legal requirements. Even work that technically complies but is of poor quality should be addressed, with recommendations for improvement to meet professional standards."
  },
  {
    question: "How should you handle confidential information about customers' installations?",
    options: ["Share freely with other tradespeople", "Keep information confidential unless disclosure is legally required", "Post details on social media for advice", "Discuss with competitors to compare experiences"],
    correctAnswer: 1,
    explanation: "Customer information should be kept confidential. Only share information when legally required (such as notifying authorities of dangerous situations) or with the customer's explicit consent."
  },
  {
    question: "What is the significance of maintaining accurate records of your work?",
    options: ["Only required by large companies", "Protects you professionally and helps future maintenance", "Takes time away from productive work", "Only needed for inspection and testing"],
    correctAnswer: 1,
    explanation: "Accurate records protect you in case of disputes or claims, demonstrate compliance with requirements, and provide valuable information for future maintenance and fault diagnosis. Records are a professional responsibility."
  },
  {
    question: "When is it appropriate to work on systems beyond your competence?",
    options: ["When the customer insists", "When the pay is good enough", "Never - work should match your competence level", "When you can learn on the job"],
    correctAnswer: 2,
    explanation: "You should never work on systems beyond your competence level. This could result in unsafe work, harm to people, and legal liability. Refer such work to appropriately qualified specialists."
  },
  {
    question: "What responsibility do you have for work done by others under your supervision?",
    options: ["None - they are responsible for their own work", "Full responsibility for the quality and safety of their work", "Only if you specifically tell them what to do", "Shared equally regardless of experience levels"],
    correctAnswer: 1,
    explanation: "When supervising others, you take responsibility for ensuring their work meets required standards. This includes appropriate oversight, checking their work, and ensuring they work within their competence level."
  },
  {
    question: "How should professional electricians approach competition with other contractors?",
    options: ["Criticise competitors' work to win customers", "Compete on value, quality, and service, not by undermining others", "Undercut all prices regardless of viability", "Form agreements to fix prices"],
    correctAnswer: 1,
    explanation: "Professional competition should be based on the value, quality, and service you provide. Criticising competitors or engaging in anti-competitive practices damages the industry's reputation and may be illegal."
  },
  {
    question: "What is your responsibility if a customer asks you to sign off work you haven't done?",
    options: ["Do it if they pay extra", "Refuse - certification must reflect reality", "Only refuse for large jobs", "Agree if they seem honest"],
    correctAnswer: 1,
    explanation: "Never certify work you haven't done or properly inspected. False certification is fraudulent, potentially dangerous, and could result in criminal prosecution, loss of scheme membership, and civil liability."
  },
  {
    question: "How does professional behaviour contribute to industry reputation?",
    options: ["Individual behaviour doesn't affect the industry", "Every professional's conduct affects how the industry is perceived", "Only large company behaviour matters", "Reputation is determined by regulations"],
    correctAnswer: 1,
    explanation: "Every electrician's behaviour affects industry reputation. Professional conduct builds public trust, while poor practice damages perception of all electricians. You represent the profession in every customer interaction."
  }
];

// FAQ data
const faqs = [
  {
    question: "How do I maintain competence as regulations and technology change?",
    answer: "Stay current through multiple channels: attend update training when regulations change (like the 18th Edition amendments), subscribe to industry publications and technical bulletins, participate in CPD activities through your scheme or trade association, attend manufacturer training for new products and technologies, engage with industry forums and peer discussions, and regularly review the latest guidance documents. Many competent person schemes require documented CPD activities."
  },
  {
    question: "What should I do if I make a mistake in my work?",
    answer: "Address mistakes promptly and honestly. Inform the customer about the issue and what needs to be done to correct it. Carry out remedial work at your own cost if the error was yours. Document what happened and what corrective action was taken. Analyse why the mistake occurred and what can be done to prevent recurrence. Report to your insurer if the mistake could result in a claim. Taking responsibility builds trust and protects your reputation."
  },
  {
    question: "Can I be held liable for work done many years ago?",
    answer: "Limitation periods for claims vary depending on the type of claim. For contract claims, typically 6 years from breach (12 years for deeds). For personal injury from negligence, 3 years from when injury was known. For building defects causing personal injury, the Defective Premises Act allows claims for 15 years. Maintain records indefinitely if possible, and ensure adequate insurance remains in place even after leaving the industry."
  },
  {
    question: "What are my responsibilities regarding previous electricians' substandard work?",
    answer: "When discovering substandard work by others, assess the safety implications. If there's immediate danger, advise isolation and report if necessary. Document what you find with photos and descriptions. Explain the situation to the customer clearly but professionally, without excessively criticising the previous electrician. Provide options for remediation. If the previous work is notifiable and wasn't notified, building control may need to be informed. Your primary concern is the safety of the installation."
  },
  {
    question: "How do I handle requests to do work that conflicts with my professional judgement?",
    answer: "Explain your concerns clearly, referencing regulations and safety requirements where applicable. Provide written documentation of your professional advice and their response. If they insist on non-compliant work, refuse and confirm your refusal in writing. For work that's compliant but not best practice, explain the implications and document their informed decision if they proceed. Never compromise safety or compliance regardless of customer pressure."
  },
  {
    question: "What professional development is required for competent person scheme membership?",
    answer: "Requirements vary between schemes but typically include minimum hours of CPD annually (often 20-35 hours), documentation of CPD activities undertaken, specific training requirements for regulatory updates, periodic competency assessment or testing, and maintaining current qualifications and certifications. Check your specific scheme's requirements and maintain records to demonstrate compliance during audits."
  }
];

const Level3Module4Section6_4 = () => {
  useSEO(seoTitle, seoDescription);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Level 3 Module 4 - Section 6.4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Maintaining Professional Standards and Accountability
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Professional conduct, accountability and maintaining high standards in fault work
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl border border-yellow-400/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What You Will Learn</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Understand the legal and ethical framework governing electrical work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Apply principles of accountability to your professional practice</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Maintain competence through continuing professional development</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Handle ethical dilemmas and professional conflicts appropriately</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Contribute positively to the electrical industry's reputation</span>
            </li>
          </ul>
        </section>

        {/* Section 01: Legal Framework and Duties */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Legal Framework and Duties</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Electrical work is governed by a comprehensive legal framework that establishes duties, standards, and accountability. Understanding this framework is essential for maintaining professional standards.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Key Legislation</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Electricity at Work Regulations 1989</h4>
              <p className="text-white/70 text-sm mb-2">
                These regulations impose duties on employers, employees, and the self-employed to prevent danger from electrical systems used in work activities:
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Regulation 3: Duties to prevent danger from electrical equipment</li>
                <li>Regulation 4: Systems to be constructed and maintained safely</li>
                <li>Regulation 14: Working on dead equipment where reasonably practicable</li>
                <li>Regulation 16: Persons to be competent for the work undertaken</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Health and Safety at Work Act 1974</h4>
              <p className="text-white/70 text-sm mb-2">
                The overarching health and safety legislation establishing:
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Employers' duty to ensure health, safety, and welfare of employees</li>
                <li>Employees' duty to take reasonable care and cooperate with safety measures</li>
                <li>General duties to persons not in employment (public protection)</li>
                <li>Criminal penalties for breaches of safety duties</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Building Regulations</h4>
              <p className="text-white/70 text-sm mb-2">
                Part P of the Building Regulations (England) requires:
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Electrical work in dwellings to meet safety requirements</li>
                <li>Notifiable work to be certified by competent persons or building control</li>
                <li>Design, installation, inspection, and testing to BS 7671</li>
                <li>Appropriate certification and notification procedures</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Personal Liability</h3>
            <p className="text-white/80 text-sm mb-3">
              Individual electricians can be held personally liable for:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Criminal prosecution:</strong> For breaches of safety legislation</li>
              <li><strong>Civil claims:</strong> For negligence causing injury or damage</li>
              <li><strong>Professional sanctions:</strong> Loss of scheme membership or registration</li>
              <li><strong>Contractual liability:</strong> Breach of contractual obligations</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctAnswer={quickCheckQuestions[0].correctAnswer}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Competence and CPD */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Competence and CPD</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Competence is fundamental to professional practice. It must be demonstrated initially and maintained throughout your career through continuing professional development and staying current with industry changes.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">What is Competence?</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <p className="text-white/80 text-sm mb-3">
                Competence comprises:
              </p>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Knowledge:</strong> Understanding of principles, regulations, and procedures</li>
                <li><strong>Skills:</strong> Practical ability to perform work correctly</li>
                <li><strong>Experience:</strong> Familiarity from having done similar work</li>
                <li><strong>Attitude:</strong> Professional approach to safety and quality</li>
                <li><strong>Task-specific:</strong> Competence relates to specific work, not general ability</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Continuing Professional Development</h3>
            <p className="text-white/80 text-sm mb-3">
              CPD is essential for maintaining competence as the industry evolves:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">CPD Activity</th>
                    <th className="border border-white/20 p-2 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2">Formal Training</td>
                    <td className="border border-white/20 p-2">Amendment courses, manufacturer training, new qualification modules</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Technical Reading</td>
                    <td className="border border-white/20 p-2">Guidance Notes, technical bulletins, industry publications</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Conferences and Events</td>
                    <td className="border border-white/20 p-2">Trade shows, seminars, industry conferences</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Online Learning</td>
                    <td className="border border-white/20 p-2">Webinars, e-learning modules, online resources</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Peer Learning</td>
                    <td className="border border-white/20 p-2">Technical discussions, mentoring, industry forums</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Self-directed Study</td>
                    <td className="border border-white/20 p-2">Researching new technologies, reviewing case studies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recognising Competence Boundaries</h3>
            <p className="text-white/80 text-sm mb-3">
              Professional practice requires honest assessment of your capabilities:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Know the limits of your competence and don't exceed them</li>
              <li>Refer work outside your competence to appropriate specialists</li>
              <li>Seek guidance when encountering unfamiliar situations</li>
              <li>Be honest with customers about what you can and cannot do</li>
              <li>Develop competence through proper training, not trial and error on customers' installations</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctAnswer={quickCheckQuestions[1].correctAnswer}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Professional Ethics */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Professional Ethics</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Professional ethics go beyond legal compliance to encompass the moral principles that guide professional conduct. Ethical practice builds trust, protects the public, and maintains the industry's reputation.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Core Ethical Principles</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Honesty and Integrity</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Be truthful in all professional dealings</li>
                <li>Accurately represent your qualifications and capabilities</li>
                <li>Provide honest assessments and recommendations</li>
                <li>Avoid deception in pricing, timescales, or quality</li>
                <li>Acknowledge and correct mistakes promptly</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Public Safety</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Prioritise safety above commercial considerations</li>
                <li>Never compromise safety for speed or profit</li>
                <li>Report dangerous situations appropriately</li>
                <li>Ensure work protects users and third parties</li>
                <li>Take responsibility for the safety implications of your work</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Professional Conduct</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Maintain appropriate professional boundaries</li>
                <li>Treat customers, colleagues, and competitors with respect</li>
                <li>Avoid conflicts of interest or disclose them appropriately</li>
                <li>Maintain confidentiality of customer information</li>
                <li>Compete fairly without disparaging others</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Ethical Dilemmas</h3>
            <p className="text-white/80 text-sm mb-3">
              Real-world situations often present competing considerations:
            </p>
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Common Ethical Challenges:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Customer pressure vs safety:</strong> Customer wants work done that would be unsafe</li>
                <li><strong>Commercial pressure vs quality:</strong> Employer pressure to cut corners to save money</li>
                <li><strong>Loyalty vs public interest:</strong> Colleague doing substandard work</li>
                <li><strong>Confidentiality vs safety:</strong> Information about dangerous installations</li>
                <li><strong>Profit vs honesty:</strong> Opportunity to recommend unnecessary work</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Resolving Ethical Dilemmas</h3>
            <p className="text-white/80 text-sm mb-3">
              When facing difficult decisions:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Safety and legal compliance always take priority</li>
              <li>Consider what a reasonable, well-informed peer would do</li>
              <li>Document your reasoning and the decision made</li>
              <li>Seek guidance from professional bodies or mentors</li>
              <li>Consider long-term consequences, not just immediate outcomes</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctAnswer={quickCheckQuestions[2].correctAnswer}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Accountability in Practice */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Accountability in Practice</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Accountability means taking responsibility for your work and its consequences. In practice, this involves proper documentation, standing behind your work, and addressing problems when they arise.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Documentation and Records</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-white/70 text-sm mb-3">
                Proper records demonstrate accountability and protect your interests:
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Complete certificates accurately and honestly</li>
                <li>Maintain records of all work undertaken</li>
                <li>Document customer decisions and instructions</li>
                <li>Keep copies of quotations, invoices, and correspondence</li>
                <li>Record test results and retain calibration certificates</li>
                <li>Store records securely for appropriate periods</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Handling Complaints and Callbacks</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Professional Approach to Issues:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Respond promptly:</strong> Acknowledge complaints quickly and investigate</li>
                <li><strong>Listen first:</strong> Understand the customer's concern before responding</li>
                <li><strong>Investigate thoroughly:</strong> Determine what happened and why</li>
                <li><strong>Take responsibility:</strong> If the fault is yours, acknowledge and correct it</li>
                <li><strong>Be fair:</strong> If not your fault, explain clearly and offer to help</li>
                <li><strong>Learn and improve:</strong> Use feedback to prevent recurrence</li>
                <li><strong>Document everything:</strong> Keep records of complaints and resolution</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Insurance and Protection</h3>
            <p className="text-white/80 text-sm mb-3">
              Professional accountability requires appropriate protection:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Public liability insurance:</strong> Covers claims from third parties</li>
              <li><strong>Professional indemnity:</strong> Covers claims for professional negligence</li>
              <li><strong>Employer's liability:</strong> Required if you employ others</li>
              <li><strong>Adequate cover levels:</strong> Ensure limits are appropriate for your work</li>
              <li><strong>Continuous cover:</strong> Maintain cover even when retiring or changing work</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Accountability to Others</h3>
            <p className="text-white/80 text-sm mb-3">
              You are accountable to multiple stakeholders:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li><strong>Customers:</strong> For quality, safety, and value of your work</li>
              <li><strong>Employers:</strong> For competent work and following procedures</li>
              <li><strong>Regulatory bodies:</strong> For compliance with laws and regulations</li>
              <li><strong>Scheme operators:</strong> For meeting scheme requirements</li>
              <li><strong>The public:</strong> For safety of installations you work on</li>
              <li><strong>The profession:</strong> For maintaining industry standards</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 4 */}
        <InlineCheck
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctAnswer={quickCheckQuestions[3].correctAnswer}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Section 05: Industry Contribution and Leadership */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Industry Contribution and Leadership</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Professional electricians have a responsibility to contribute positively to the industry beyond individual work. Supporting apprentices, sharing knowledge, and maintaining standards benefits everyone.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Supporting New Entrants</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Mentor apprentices and trainees</li>
                <li>Share knowledge and experience generously</li>
                <li>Provide constructive feedback that helps people improve</li>
                <li>Create opportunities for others to develop</li>
                <li>Lead by example in professional conduct</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Industry Engagement</h3>
            <p className="text-white/80 text-sm mb-3">
              Ways to contribute to the wider industry:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Join and participate in trade associations</li>
                <li>Contribute to industry forums and discussions</li>
                <li>Provide feedback on proposed regulatory changes</li>
                <li>Share best practice examples and case studies</li>
                <li>Support industry initiatives and campaigns</li>
                <li>Represent the profession positively to the public</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Maintaining Industry Reputation</h3>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Every Interaction Matters:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li>Your behaviour shapes public perception of electricians</li>
                <li>Professionalism in every job builds collective trust</li>
                <li>Poor practice by individuals damages everyone's reputation</li>
                <li>Quality work justifies appropriate pricing across the industry</li>
                <li>Positive customer experiences create industry advocates</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Future of the Profession</h3>
            <p className="text-white/80 text-sm mb-3">
              Contributing to a sustainable future:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Support initiatives to attract new people to the industry</li>
              <li>Embrace new technologies and sustainable practices</li>
              <li>Advocate for proper regulation and standards</li>
              <li>Challenge poor practice and support improvement</li>
              <li>Pass on knowledge to ensure continuity of skills</li>
              <li>Contribute to industry evolution while maintaining safety</li>
            </ul>
          </div>
        </section>

        {/* Practical Guidance Section */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Building Your Professional Reputation</h3>
              <p className="text-white/70 text-sm">
                Reputation is built through consistent professional behaviour over time. Every job is an opportunity to demonstrate your standards. Word-of-mouth recommendations from satisfied customers are more valuable than any advertising.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">When Things Go Wrong</h3>
              <p className="text-white/70 text-sm">
                How you handle problems defines your professionalism more than how you handle easy situations. Prompt acknowledgement, honest communication, and swift corrective action usually resolve issues and can strengthen customer relationships.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Staying Current</h3>
              <p className="text-white/70 text-sm">
                Allocate regular time for professional development. Schedule update training when regulations change, subscribe to relevant publications, and engage with industry resources. Your competence is an ongoing responsibility, not a one-time achievement.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Box */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Key Legislation</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Electricity at Work Regulations 1989</li>
                <li>Health and Safety at Work Act 1974</li>
                <li>Building Regulations Part P</li>
                <li>BS 7671 (non-statutory)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Competence Components</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Knowledge</li>
                <li>Skills</li>
                <li>Experience</li>
                <li>Professional attitude</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Ethical Principles</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Honesty and integrity</li>
                <li>Public safety priority</li>
                <li>Professional conduct</li>
                <li>Continuous improvement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Accountability To</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Customers</li>
                <li>Employers</li>
                <li>Regulatory bodies</li>
                <li>The profession</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8 sm:mb-12">
          <Quiz
            title="Section 6.4 Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white" asChild>
            <Link to="../level3-module4-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Costing and Explaining Remedial Work
            </Link>
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
            <Link to="../level3-module5">
              Next: Module 5 - Advanced Topics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module4Section6_4;
