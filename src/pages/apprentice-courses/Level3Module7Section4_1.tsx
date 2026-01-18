/**
 * Level 3 Module 7 Section 4.1 - Importance of Lifelong Learning in the Trade
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Importance of Lifelong Learning - Level 3 Module 7 Section 4.1";
const DESCRIPTION = "Understanding the value of continuous professional development and lifelong learning in the electrical industry.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is continuous learning particularly important in the electrical industry?",
    options: [
      "It's not important once you're qualified",
      "Regulations, technology, and best practice constantly evolve",
      "Only to impress employers",
      "It's only required for senior positions"
    ],
    correctIndex: 1,
    explanation: "The electrical industry constantly evolves with new editions of BS 7671, emerging technologies (EVs, renewables, smart systems), and updated best practices. Continuous learning is essential to maintain competence and remain effective."
  },
  {
    id: "check-2",
    question: "How often is BS 7671 typically updated?",
    options: [
      "Every 10 years",
      "Only when accidents occur",
      "Approximately every 3-4 years with amendments between",
      "It never changes"
    ],
    correctIndex: 2,
    explanation: "BS 7671 is updated approximately every 3-4 years with amendments published between editions. Each update requires electricians to learn new requirements to maintain competence and compliance."
  },
  {
    id: "check-3",
    question: "CPD stands for:",
    options: [
      "Certified Professional Documentation",
      "Continuous Professional Development",
      "Company Personnel Database",
      "Contractual Payment Details"
    ],
    correctIndex: 1,
    explanation: "CPD stands for Continuous (or Continuing) Professional Development. It encompasses all learning activities that maintain and develop professional skills and knowledge throughout your career."
  },
  {
    id: "check-4",
    question: "What is a key benefit of CPD for career progression?",
    options: [
      "It's only useful for self-employed electricians",
      "It demonstrates commitment to the profession and keeps skills current for advancement",
      "It replaces the need for initial qualifications",
      "It's purely optional with no career impact"
    ],
    correctIndex: 1,
    explanation: "CPD demonstrates commitment to your profession and keeps skills current. This supports career advancement to supervisory, management, and specialist roles. It also maintains ECS card status and scheme membership."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The electrical industry has seen significant technological changes in recent years including:",
    options: [
      "No significant changes",
      "EV charging, solar PV, battery storage, and smart building systems",
      "Only minor updates to traditional systems",
      "Changes only affecting industrial installations"
    ],
    correctAnswer: 1,
    explanation: "Major technological developments include EV charging infrastructure, solar PV and battery storage, smart home and building management systems, LED lighting, and enhanced fire and security integration. Electricians must develop skills in these areas."
  },
  {
    id: 2,
    question: "JIB ECS card renewal typically requires evidence of:",
    options: [
      "Just payment of the renewal fee",
      "Continuous professional development activities",
      "Only original qualification certificates",
      "Nothing beyond the renewal form"
    ],
    correctAnswer: 1,
    explanation: "ECS card renewal increasingly requires evidence of CPD activities to demonstrate ongoing competence. The JIB scheme encourages structured professional development throughout your career."
  },
  {
    id: 3,
    question: "Learning from experienced colleagues is known as:",
    options: [
      "Formal education",
      "Informal learning and mentoring",
      "Self-assessment",
      "Certification"
    ],
    correctAnswer: 1,
    explanation: "Learning from colleagues is informal learning or mentoring. It's a valuable form of CPD that happens daily on the job. Observing how experienced electricians solve problems and work safely is effective learning."
  },
  {
    id: 4,
    question: "Which organisation publishes guidance notes that help electricians understand BS 7671?",
    options: [
      "HSE",
      "City & Guilds",
      "The Institution of Engineering and Technology (IET)",
      "HMRC"
    ],
    correctAnswer: 2,
    explanation: "The IET publishes Guidance Notes and other publications that explain and expand on BS 7671 requirements. These are essential resources for ongoing learning and reference."
  },
  {
    id: 5,
    question: "A reflective approach to learning involves:",
    options: [
      "Only reading textbooks",
      "Thinking about experiences to learn lessons and improve future practice",
      "Avoiding any analysis of your work",
      "Only focusing on successful outcomes"
    ],
    correctAnswer: 1,
    explanation: "Reflective learning means thinking about your experiences - what went well, what could improve - and applying those lessons to future work. It turns everyday experience into learning opportunities."
  },
  {
    id: 6,
    question: "Skills required by electricians that are likely to grow in demand include:",
    options: [
      "Only traditional installation skills",
      "Data cabling, fibre optics, EV infrastructure, and smart building systems",
      "Skills that are already obsolete",
      "Only health and safety knowledge"
    ],
    correctAnswer: 1,
    explanation: "Growth areas include data and fibre infrastructure, EV charging, renewable energy systems, battery storage, smart building controls, and integrated security systems. Developing these skills opens career opportunities."
  },
  {
    id: 7,
    question: "What is the 18th Edition of BS 7671?",
    options: [
      "The first ever wiring regulations",
      "The current edition of the IET Wiring Regulations (as of this content)",
      "A historical document no longer in use",
      "A proposed future standard"
    ],
    correctAnswer: 1,
    explanation: "The 18th Edition is the current version of BS 7671 (IET Wiring Regulations). Understanding which edition is current and training on updates is essential for compliance."
  },
  {
    id: 8,
    question: "Manufacturer training can be valuable because:",
    options: [
      "It's only marketing material",
      "It provides specific knowledge about products and their correct installation",
      "It replaces the need for formal qualifications",
      "It's only for sales staff"
    ],
    correctAnswer: 1,
    explanation: "Manufacturer training provides detailed knowledge about specific products, installation requirements, and troubleshooting. It often comes with certificates that demonstrate competence with that equipment."
  },
  {
    id: 9,
    question: "Professional bodies like the IET offer members:",
    options: [
      "Only a membership card",
      "Technical resources, CPD opportunities, networking, and professional recognition",
      "Guaranteed employment",
      "Exemption from regulations"
    ],
    correctAnswer: 1,
    explanation: "Professional bodies provide access to publications, CPD events, networking opportunities, technical guidance, and professional recognition. Membership demonstrates commitment to the profession."
  },
  {
    id: 10,
    question: "How should learning needs be identified?",
    options: [
      "Wait for your employer to tell you",
      "Assess gaps between current skills and job requirements, plus future career goals",
      "Only when you fail at something",
      "Learning needs don't need to be identified"
    ],
    correctAnswer: 1,
    explanation: "Proactively identify learning needs by comparing current skills against job requirements and future career goals. Consider industry trends, new technologies, and areas where you feel less confident."
  },
  {
    id: 11,
    question: "Reading industry publications contributes to CPD by:",
    options: [
      "It doesn't count as CPD",
      "Keeping you informed about industry developments, new products, and best practice",
      "Only being useful for passing exams",
      "Being a waste of time"
    ],
    correctAnswer: 1,
    explanation: "Industry publications provide ongoing awareness of changes, new products, regulatory updates, and practical guidance. Regular reading keeps you informed and contributes to informal CPD."
  },
  {
    id: 12,
    question: "The most effective approach to lifelong learning is:",
    options: [
      "Only attending courses when required",
      "A planned, continuous approach combining formal and informal learning",
      "Relying entirely on on-the-job experience",
      "Learning only when problems arise"
    ],
    correctAnswer: 1,
    explanation: "Effective CPD combines planned formal learning (courses, certifications) with informal learning (experience, reading, mentoring). A continuous approach ensures skills remain current."
  }
];

const faqs = [
  {
    question: "How much CPD should I do each year?",
    answer: "While minimum requirements vary by scheme and employer, aim for meaningful regular development. The JIB recommends ongoing learning. Quality matters more than quantity - focused learning in relevant areas is more valuable than ticking boxes. Keep records of all CPD activities."
  },
  {
    question: "What counts as CPD?",
    answer: "CPD includes formal courses and qualifications, manufacturer training, webinars and seminars, reading industry publications, learning from colleagues, structured on-the-job learning, and professional body events. The key is that the activity develops your professional skills and knowledge."
  },
  {
    question: "Is CPD expensive?",
    answer: "Some CPD is free (reading, online resources, manufacturer literature). Other activities cost money (formal courses, conferences). Many employers support CPD. Consider it an investment in your career - the returns in terms of opportunities and earning potential often exceed the cost."
  },
  {
    question: "How do I find time for CPD?",
    answer: "Build learning into your routine. Read industry magazines during breaks. Listen to podcasts while driving. Take advantage of employer-provided training. Use some personal time for significant development. A little regular learning is more effective than occasional intensive bursts."
  },
  {
    question: "What if my employer doesn't support CPD?",
    answer: "Take responsibility for your own development. Use free resources, self-fund important training, and document everything. If your employer doesn't invest in development, consider whether they're right for your career long-term. Your skills are yours regardless of employer."
  },
  {
    question: "How do I choose what to learn?",
    answer: "Consider: gaps in current skills, requirements of roles you aspire to, emerging technologies in your area of work, regulatory changes, and areas where you feel less confident. Balance immediate needs with longer-term career development."
  }
];

const Level3Module7Section4_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section4">
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
            <span>Module 7.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Importance of Lifelong Learning
          </h1>
          <p className="text-white/80">
            Why continuous professional development is essential for your electrical career
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Evolving industry:</strong> Regulations and technology constantly change</li>
              <li><strong>Competence:</strong> Skills must be maintained, not just gained</li>
              <li><strong>Career:</strong> Development opens progression opportunities</li>
              <li><strong>Requirement:</strong> CPD is expected by schemes and employers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Industry Changes</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> Updated every 3-4 years</li>
              <li><strong>Technology:</strong> EVs, renewables, smart systems</li>
              <li><strong>Best practice:</strong> Constantly improving</li>
              <li><strong>Skills demand:</strong> New specialisms emerging</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why lifelong learning is essential in the electrical industry",
              "Recognise how regulations and technology constantly evolve",
              "Know what CPD is and why it matters for your career",
              "Identify different types of learning opportunities",
              "Understand the link between CPD and professional standing",
              "Plan your own ongoing professional development"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Learning Never Stops */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Learning Never Stops
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Completing your electrical qualifications is an achievement, but it's the start of your professional journey, not the end. The electrical industry evolves constantly - regulations update, technologies emerge, and best practices improve. What you learn during training provides a foundation, but maintaining competence requires continuous learning throughout your career.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why the electrical industry requires constant learning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulatory updates:</strong> BS 7671 updates every 3-4 years with amendments between</li>
                <li><strong>New technologies:</strong> EV charging, solar PV, battery storage, smart systems</li>
                <li><strong>Safety improvements:</strong> Better understanding of risks leads to new requirements</li>
                <li><strong>Product development:</strong> New equipment with specific installation requirements</li>
                <li><strong>Industry harmonisation:</strong> Alignment with European and international standards</li>
              </ul>
            </div>

            <p>
              Consider how much has changed even in recent years: AFDDs became recommended, EV charging infrastructure exploded, solar and battery storage became mainstream. Electricians who didn't develop skills in these areas missed significant market opportunities.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The skills that get you qualified aren't the skills that will sustain your entire career. What's cutting edge today will be standard tomorrow, and something new will be emerging.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: What is CPD? */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Continuous Professional Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuous Professional Development (CPD) is the ongoing process of developing and maintaining professional skills and knowledge throughout your career. It's not just about attending courses - it includes all activities that develop your competence as an electrical professional.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formal CPD</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Qualifications and certifications</li>
                  <li>Training courses and workshops</li>
                  <li>Webinars and online courses</li>
                  <li>Conferences and seminars</li>
                  <li>Manufacturer training</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Informal CPD</p>
                <ul className="text-sm text-white space-y-1">
                  <li>On-the-job learning</li>
                  <li>Learning from colleagues</li>
                  <li>Reading industry publications</li>
                  <li>Online research and resources</li>
                  <li>Mentoring and being mentored</li>
                </ul>
              </div>
            </div>

            <p>
              Effective CPD combines formal and informal learning. Daily work provides constant learning opportunities if you approach it reflectively - thinking about what worked, what didn't, and how to improve. This practical experience, combined with structured learning about new developments, keeps you competent.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> After struggling with a complex fault, reflecting on what made it difficult and researching better diagnostic approaches turns a frustrating experience into valuable learning. That's informal CPD.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: CPD and Career Development */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CPD and Career Progression
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CPD isn't just about maintaining competence - it's a key driver of career progression. Demonstrating commitment to development, acquiring new skills, and staying current with industry changes positions you for advancement. Employers value staff who invest in their own development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Career benefits of CPD:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>ECS card progression:</strong> CPD supports advancement through card grades</li>
                <li><strong>Supervisory roles:</strong> Management positions require broader knowledge</li>
                <li><strong>Specialisation:</strong> Training in specific areas opens specialist roles</li>
                <li><strong>Self-employment:</strong> Wider skills mean broader service offering</li>
                <li><strong>Earning potential:</strong> Additional skills command higher rates</li>
              </ul>
            </div>

            <p>
              Competition for the best positions is strong. Candidates who can demonstrate ongoing development, specialist skills, and commitment to the profession stand out. Your CPD record provides evidence that supports applications and interviews.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Career tip:</strong> Align your CPD with career goals. If you want to move into project management, develop management skills. If you want to specialise in renewables, build expertise in that area. Strategic CPD accelerates career progression.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Planning Your Development */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Planning Your Own Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective professional development doesn't happen by accident. Taking a planned approach - identifying needs, setting goals, choosing activities, and recording progress - makes your learning more effective and demonstrates commitment to employers and professional bodies.
            </p>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Assess</p>
                <p className="text-white/90 text-xs">Identify current skills and gaps</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Plan</p>
                <p className="text-white/90 text-xs">Set goals and choose activities</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Do</p>
                <p className="text-white/90 text-xs">Undertake learning activities</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Reflect</p>
                <p className="text-white/90 text-xs">Apply learning and evaluate</p>
              </div>
            </div>

            <p>
              Start by honestly assessing your current skills against what your job requires and what your career goals demand. Identify gaps - areas where you're less confident or where you need new skills. Then plan activities to address those gaps, balancing formal training with on-the-job development.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> Keep a CPD diary or log. Record what you learned, when, and how you've applied it. This evidence supports ECS card renewal, scheme membership, and job applications. It also helps you see your own progress.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building CPD into Your Routine</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Subscribe to industry publications and actually read them</li>
                <li>Follow relevant organisations on social media for updates</li>
                <li>Use commuting time for podcasts or audiobooks</li>
                <li>Schedule time for learning - treat it as a commitment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maximising Learning from Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask questions when you see new equipment or methods</li>
                <li>Volunteer for unfamiliar types of work to expand experience</li>
                <li>Reflect on challenging jobs - what did you learn?</li>
                <li>Observe how experienced colleagues handle difficult situations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">CPD Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Complacency:</strong> Assuming qualification means competence forever</li>
                <li><strong>Random learning:</strong> Without goals, CPD is less effective</li>
                <li><strong>No records:</strong> Unrecorded CPD can't be evidenced</li>
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
                <p className="font-medium text-white mb-1">CPD Activity Types</p>
                <ul className="space-y-0.5">
                  <li>Formal courses and qualifications</li>
                  <li>Manufacturer and product training</li>
                  <li>Webinars and online learning</li>
                  <li>Industry publications and reading</li>
                  <li>On-the-job learning and mentoring</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CPD Planning Steps</p>
                <ul className="space-y-0.5">
                  <li>Assess current skills and gaps</li>
                  <li>Set development goals</li>
                  <li>Choose appropriate activities</li>
                  <li>Undertake the learning</li>
                  <li>Record and reflect on outcomes</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section4-2">
              Next: Courses and Seminars
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section4_1;
