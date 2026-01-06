/**
 * Level 3 Module 7 Section 2.5 - Professional Standards Summary and Integration
 * Bringing together all professional standards into a comprehensive framework
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Professional Standards Summary - Level 3 Module 7 Section 2.5";
const DESCRIPTION = "Comprehensive integration of professional standards, bringing together duty of care, codes of practice, documentation, and workplace behaviour for electricians.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What are the three pillars of professional practice for electricians?",
    options: [
      "Speed, cost, and convenience",
      "Technical competence, ethical behaviour, and effective communication",
      "Tools, materials, and transport",
      "Qualifications, experience, and age"
    ],
    correctIndex: 1,
    explanation: "Professional practice rests on technical competence (skills and knowledge), ethical behaviour (honesty, integrity, accountability), and effective communication (with clients, colleagues, and authorities). All three must work together."
  },
  {
    id: "check-2",
    question: "How do BS 7671, the ECS card system, and CPD requirements relate to each other?",
    options: [
      "They are completely separate and unrelated",
      "They form an integrated framework for maintaining competence and professional standing",
      "Only BS 7671 matters for practical work",
      "The ECS card replaces the need for CPD"
    ],
    correctIndex: 1,
    explanation: "These form an integrated framework: BS 7671 sets technical standards, ECS cards verify competence and qualifications, and CPD ensures ongoing development to maintain that competence as standards evolve."
  },
  {
    id: "check-3",
    question: "What connects duty of care, certification, and competent person scheme membership?",
    options: [
      "They all cost money",
      "They are all optional for experienced electricians",
      "They all contribute to demonstrating and delivering safe, compliant work",
      "They are only relevant for commercial work"
    ],
    correctIndex: 2,
    explanation: "Duty of care requires safe work, certification documents compliance, and scheme membership provides independent verification. Together they create accountability and assurance for clients and regulators."
  },
  {
    id: "check-4",
    question: "Why is integration of professional standards more valuable than treating them separately?",
    options: [
      "It's not - they should be handled separately",
      "It reduces paperwork",
      "It creates a coherent approach where standards reinforce each other for better outcomes",
      "It only matters for large companies"
    ],
    correctIndex: 2,
    explanation: "Integration means each standard reinforces others: technical knowledge enables proper documentation, ethical behaviour ensures honest certification, communication skills help explain compliance. Together they create consistently high-quality practice."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A professional electrician's reputation is built on:",
    options: [
      "Having the newest tools and equipment",
      "Consistent quality work, reliability, and ethical behaviour over time",
      "Charging the lowest prices",
      "Having many social media followers"
    ],
    correctAnswer: 1,
    explanation: "Reputation develops through consistent delivery of quality work, reliability in meeting commitments, and demonstrating ethical behaviour. This builds trust with clients, contractors, and colleagues over time."
  },
  {
    id: 2,
    question: "When professional standards conflict (e.g., client wants speed but safety requires more time), you should:",
    options: [
      "Always prioritise what the client wants",
      "Find a compromise that satisfies everyone",
      "Prioritise safety while communicating clearly with the client about why",
      "Walk away from the job immediately"
    ],
    correctAnswer: 2,
    explanation: "Safety standards are non-negotiable and take priority. However, professional practice means explaining to clients why more time is needed, what risks exist, and how you're protecting them. Communication can resolve most apparent conflicts."
  },
  {
    id: 3,
    question: "The purpose of maintaining a professional portfolio is to:",
    options: [
      "Impress clients with photographs",
      "Document qualifications, CPD, examples of work, and professional achievements",
      "Compete with other electricians",
      "Avoid tax inspections"
    ],
    correctAnswer: 1,
    explanation: "A professional portfolio documents your development and achievements: qualifications, CPD records, certificates, project examples, and references. It supports ECS card renewal, scheme membership, and career advancement."
  },
  {
    id: 4,
    question: "How should professional standards influence your approach to pricing work?",
    options: [
      "Charge as much as possible",
      "Always undercut competitors",
      "Factor in the time needed for proper work, testing, and documentation",
      "Ignore them - price is determined by the market alone"
    ],
    correctAnswer: 2,
    explanation: "Professional standards require adequate time for proper installation, testing, and documentation. Pricing must reflect this - undercutting leads to cutting corners on quality and compliance, which is unprofessional."
  },
  {
    id: 5,
    question: "Integration of professional standards means that ethical behaviour affects:",
    options: [
      "Only how you deal with clients",
      "All aspects including technical decisions, documentation, communication, and business practices",
      "Nothing practical - ethics are separate from technical work",
      "Only major decisions, not everyday work"
    ],
    correctAnswer: 1,
    explanation: "Ethics permeate all professional practice: using correct materials (not substituting inferior ones), honest documentation, transparent communication about issues, fair business practices. It's not separate from technical work."
  },
  {
    id: 6,
    question: "What is the relationship between personal development and professional standards?",
    options: [
      "Personal development is separate from professional standards",
      "Continuous development is necessary to maintain competence as standards evolve",
      "Once qualified, no further development is needed",
      "Development is only required for managers"
    ],
    correctAnswer: 1,
    explanation: "Professional standards (like BS 7671) change regularly. Continuous professional development is essential to maintain competence and meet the evolving requirements. It's not optional for true professionals."
  },
  {
    id: 7,
    question: "Professional accountability means:",
    options: [
      "Blaming others when things go wrong",
      "Taking responsibility for your work, decisions, and their outcomes",
      "Only being accountable to your employer",
      "Accountability applies only to senior electricians"
    ],
    correctAnswer: 1,
    explanation: "Accountability means taking responsibility for your work - standing behind it, addressing problems, learning from mistakes, and accepting consequences. It applies to all electricians regardless of seniority."
  },
  {
    id: 8,
    question: "How does membership of professional bodies contribute to professional standards?",
    options: [
      "It's just for status",
      "It provides validation, resources, and commitment to ongoing development",
      "It replaces the need for qualifications",
      "It's only beneficial for self-employed electricians"
    ],
    correctAnswer: 1,
    explanation: "Professional body membership (JIB, IET, etc.) demonstrates commitment to the profession, provides access to resources and development opportunities, and offers external validation of professional standing."
  },
  {
    id: 9,
    question: "A coherent professional approach requires:",
    options: [
      "Following different standards for different jobs",
      "Consistent application of standards regardless of who's watching or job size",
      "Applying standards only when convenient",
      "Standards only for new installations"
    ],
    correctAnswer: 1,
    explanation: "Professionalism means consistent standards applied to all work - small jobs and large, domestic and commercial, supervised and unsupervised. Inconsistent application is not professional."
  },
  {
    id: 10,
    question: "What connects all aspects of professional standards?",
    options: [
      "Paperwork requirements",
      "The goal of safe, quality work delivered ethically and communicated effectively",
      "Legal requirements only",
      "Cost minimisation"
    ],
    correctAnswer: 1,
    explanation: "All professional standards serve the ultimate goal of delivering safe, quality electrical work in an ethical manner with effective communication. Technical, ethical, and communication standards all support this outcome."
  },
  {
    id: 11,
    question: "Professional standards should be viewed as:",
    options: [
      "Obstacles to efficient working",
      "A framework enabling quality work and career success",
      "Rules that only apply to large companies",
      "Guidelines that can be ignored when inconvenient"
    ],
    correctAnswer: 1,
    explanation: "Professional standards are a framework that enables consistent quality, protects you legally, builds reputation, and supports career progression. They're assets to embrace, not obstacles to overcome."
  },
  {
    id: 12,
    question: "The best way to develop integrated professional practice is:",
    options: [
      "Focus on one standard at a time",
      "Let experience teach you over decades",
      "Consciously apply all standards together from the start of your career",
      "Wait until you're self-employed"
    ],
    correctAnswer: 2,
    explanation: "Integration develops through conscious application of all standards together from the start - thinking about technical, ethical, and communication aspects for every job. Early integration creates good habits that serve your entire career."
  }
];

const faqs = [
  {
    question: "How do I maintain all these professional standards while still getting work done efficiently?",
    answer: "Standards become efficient with practice. Initially they may feel like extra steps, but integrated into your routine, they become automatic. Good documentation prevents disputes, proper testing prevents callbacks, clear communication prevents misunderstandings. What seems slow actually saves time overall."
  },
  {
    question: "What if my employer doesn't prioritise professional standards?",
    answer: "You have personal obligations under law (HASAWA, EWR) and professional ethics regardless of employer culture. Document any concerns, push back professionally on unsafe practices, and consider whether the employer is right for your career. Your reputation follows you beyond any employer."
  },
  {
    question: "How do I demonstrate integrated professional practice to employers and clients?",
    answer: "Build a portfolio showing qualifications, CPD records, example certificates, and references. Behave consistently professionally. Ask for feedback and act on it. Quality work and professional conduct speak for themselves over time."
  },
  {
    question: "Are professional standards the same for employed and self-employed electricians?",
    answer: "The technical and ethical standards are identical - BS 7671, duty of care, documentation requirements. Self-employed electricians have additional business responsibilities but the same professional standards for the work itself."
  },
  {
    question: "How do I recover from a professional mistake?",
    answer: "Own the mistake - don't hide it or blame others. Take immediate steps to make the situation safe if necessary. Communicate honestly with affected parties. Put it right at your own expense if appropriate. Learn from it and improve your processes to prevent recurrence."
  },
  {
    question: "What's the best investment for developing professional standards?",
    answer: "Invest in knowledge (books, training, CPD), quality tools and test equipment (calibrated and maintained), and your professional network (scheme membership, professional bodies). Time spent on proper documentation and communication also pays dividends."
  }
];

const Level3Module7Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Standards: Integration and Summary
          </h1>
          <p className="text-white/80">
            Bringing together all aspects of professional practice into a coherent framework
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Three pillars:</strong> Technical, ethical, and communication standards</li>
              <li><strong>Integration:</strong> Standards work together, not in isolation</li>
              <li><strong>Consistency:</strong> Same standards for all work, all situations</li>
              <li><strong>Development:</strong> Continuous improvement throughout career</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">The Professional Framework</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Knowledge:</strong> BS 7671, regulations, and best practice</li>
              <li><strong>Verification:</strong> ECS cards and scheme membership</li>
              <li><strong>Documentation:</strong> Certification and records</li>
              <li><strong>Behaviour:</strong> Ethics, conduct, and communication</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how professional standards integrate into a coherent framework",
              "Recognise the connections between technical, ethical, and communication standards",
              "Apply integrated professional practice in daily work",
              "Build and maintain professional reputation",
              "Develop a professional portfolio and evidence base",
              "Continue professional development throughout your career"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Three Pillars */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Three Pillars of Professional Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional practice for electricians rests on three interconnected pillars: technical competence, ethical behaviour, and effective communication. Each pillar is essential, and they work together to create consistent, high-quality professional practice. Weakness in any pillar undermines the others.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Competence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Knowledge of BS 7671 and regulations</li>
                  <li>Practical installation skills</li>
                  <li>Testing and verification ability</li>
                  <li>Problem-solving capability</li>
                  <li>Continuous learning and development</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ethical Behaviour</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Honesty in all dealings</li>
                  <li>Integrity when unobserved</li>
                  <li>Accountability for outcomes</li>
                  <li>Fairness to clients and colleagues</li>
                  <li>Commitment to safety above profit</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Communication</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clear client explanations</li>
                  <li>Accurate documentation</li>
                  <li>Professional correspondence</li>
                  <li>Collaborative working</li>
                  <li>Constructive feedback</li>
                </ul>
              </div>
            </div>

            <p>
              Consider how these connect: Technical competence enables you to do quality work, but without ethical behaviour you might cut corners. Ethical behaviour means doing right, but without communication skills you can't explain why to clients or colleagues. Communication helps manage relationships, but only technical competence can back up your words with quality outcomes.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Clients rarely have the technical knowledge to assess your competence directly. They judge you by your behaviour and communication. But over time, technical quality (or lack of it) becomes apparent through the outcomes of your work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Standards Framework */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Integrated Standards Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional standards don't exist in isolation - they form an integrated framework where each element supports the others. BS 7671 sets technical requirements, the ECS card system verifies competence, competent person schemes provide oversight, CPD maintains currency, and documentation creates accountability. Together they ensure quality and safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How the standards connect:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671</strong> defines what compliant work looks like - the technical foundation</li>
                <li><strong>ECS card grades</strong> verify you have qualifications and experience to do the work</li>
                <li><strong>Competent Person Schemes</strong> provide external oversight and enable self-certification</li>
                <li><strong>Certification (EIC/EICR)</strong> documents that specific work meets standards</li>
                <li><strong>CPD requirements</strong> ensure you stay current as standards evolve</li>
                <li><strong>Professional bodies</strong> provide support, resources, and industry voice</li>
              </ul>
            </div>

            <p>
              This framework creates multiple layers of assurance: individual competence is verified, work is documented, external oversight exists, and ongoing development is required. Each layer catches issues the others might miss, creating a robust system for maintaining standards.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When you complete a consumer unit change, BS 7671 tells you how to do it correctly, your ECS card confirms you're qualified, your scheme membership means you can self-certify, and the EIC you issue documents compliance. CPD ensures you knew the current requirements. All elements work together.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Building Professional Reputation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building and Maintaining Professional Reputation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional reputation is built through consistent application of standards over time. It cannot be bought or created quickly - it develops through every interaction, every job completed, every problem solved. Your reputation is your most valuable professional asset, and it follows you throughout your career.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reputation Builders</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Consistent quality in all work, large and small</li>
                  <li>Reliability - doing what you say you will</li>
                  <li>Honest communication, even when it's difficult</li>
                  <li>Professional response to problems</li>
                  <li>Continuous improvement and development</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Reputation Destroyers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Inconsistent quality or cutting corners</li>
                  <li>Unreliability and broken commitments</li>
                  <li>Dishonesty or misleading clients</li>
                  <li>Defensive or aggressive response to issues</li>
                  <li>Failure to keep skills current</li>
                </ul>
              </div>
            </div>

            <p>
              Reputation affects every aspect of your career: the jobs you're offered, the rates you can charge, the references you receive, and opportunities for advancement. Contractors remember who's professional and who's not. Clients talk to each other. Word of mouth is powerful in the electrical industry.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> It takes years to build a good reputation and moments to destroy it. One dishonest act, one badly handled complaint, or one safety shortcut can undo years of careful reputation building.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Professional Development Portfolio */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Your Professional Development Portfolio
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A professional portfolio documents your qualifications, development, and achievements throughout your career. It provides evidence for ECS card applications and renewals, supports job applications, demonstrates compliance to clients, and tracks your professional growth. Building it systematically from the start is much easier than reconstructing it later.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to include in your portfolio:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Qualifications:</strong> Certificates for all electrical and related qualifications</li>
                <li><strong>ECS cards:</strong> Current card plus history of grades achieved</li>
                <li><strong>CPD records:</strong> Courses attended, seminars, learning activities with dates</li>
                <li><strong>Scheme membership:</strong> Evidence of competent person scheme registration</li>
                <li><strong>Work examples:</strong> Photographs and descriptions of notable projects</li>
                <li><strong>References:</strong> Written testimonials from employers or clients</li>
                <li><strong>Specialist training:</strong> Renewables, EV charging, fire alarms, etc.</li>
                <li><strong>Safety training:</strong> First aid, confined spaces, working at height</li>
              </ul>
            </div>

            <p>
              Keep both digital and physical copies where appropriate. Digital records are easily backed up and shared. Physical certificates may be needed for verification. Update your portfolio regularly - adding new qualifications and CPD as you complete them, rather than trying to catch up later.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Your portfolio is valuable for career advancement. When applying for senior roles, demonstrating consistent development and a range of experience gives you an advantage over candidates who can only show basic qualifications.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Professional Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Apply all three pillars (technical, ethical, communication) to every job</li>
                <li>Complete documentation at the time of work, not afterwards</li>
                <li>Treat every client interaction as reputation-building</li>
                <li>Reflect on challenges and how to handle them better next time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ongoing Development Habits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review BS 7671 updates and amendments promptly</li>
                <li>Attend at least one formal CPD event annually</li>
                <li>Read industry publications to stay current</li>
                <li>Seek feedback and act on constructive criticism</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Integration Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Compartmentalising:</strong> Treating technical work as separate from ethics and communication</li>
                <li><strong>Selective application:</strong> Applying standards only when observed or for large jobs</li>
                <li><strong>Stagnation:</strong> Assuming qualification means development stops</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Section 2 Summary</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">The Three Pillars</p>
                <ul className="space-y-0.5">
                  <li>1. Technical competence</li>
                  <li>2. Ethical behaviour</li>
                  <li>3. Effective communication</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">The Standards Framework</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 - Technical requirements</li>
                  <li>ECS cards - Competence verification</li>
                  <li>Schemes - External oversight</li>
                  <li>Certification - Work documentation</li>
                  <li>CPD - Ongoing development</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white">
              <p className="font-medium mb-1">Key Section 2 Topics Covered</p>
              <ul className="space-y-0.5">
                <li>2.1 Duty of Care and Professional Ethics</li>
                <li>2.2 Codes of Practice and Industry Standards</li>
                <li>2.3 Documentation and Record-keeping</li>
                <li>2.4 Professional Behaviour on Site</li>
                <li>2.5 Professional Standards Summary and Integration</li>
              </ul>
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
            <Link to="../level3-module7-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Professional Behaviour
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section3">
              Next: Section 3 - Communication
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section2_5;
