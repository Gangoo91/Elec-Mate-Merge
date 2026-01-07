/**
 * Level 3 Module 7 Section 4.4 - Continuing Professional Development
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Continuing Professional Development (CPD) - Level 3 Module 7 Section 4.4";
const DESCRIPTION = "Understand the importance of CPD for UK electricians. Learn about CPD requirements, tracking methods, approved activities, and how continuous learning supports career progression.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is CPD particularly important for electricians?",
    options: [
      "It's only required by employers",
      "Regulations, technology, and best practices constantly evolve, requiring updated knowledge",
      "It's optional for qualified electricians",
      "It only matters for those seeking promotion"
    ],
    correctIndex: 1,
    explanation: "The electrical industry sees regular updates to BS 7671, new technologies (EV charging, solar), and evolving best practices. CPD ensures electricians maintain competence and can work safely with current standards."
  },
  {
    id: "check-2",
    question: "Which of the following counts as valid CPD activity?",
    options: [
      "Only formal classroom training courses",
      "Any learning activity that develops your professional knowledge and skills",
      "Only activities with certificates",
      "Only activities your employer pays for"
    ],
    correctIndex: 1,
    explanation: "CPD includes any learning that develops professional competence: courses, reading technical publications, online learning, mentoring, attending seminars, and even structured on-the-job learning."
  },
  {
    id: "check-3",
    question: "How should you record your CPD activities?",
    options: [
      "No record keeping is necessary",
      "Keep a log detailing activity, date, duration, and learning outcomes",
      "Only record formal qualifications",
      "Memory is sufficient"
    ],
    correctIndex: 1,
    explanation: "Effective CPD recording includes activity details, dates, time spent, what you learned, and how you applied it. This demonstrates commitment to development and is often required for scheme membership and ECS card renewal."
  },
  {
    id: "check-4",
    question: "What is the typical annual CPD requirement for competent person scheme membership?",
    options: [
      "No specific requirement",
      "Around 35 hours per year for most schemes",
      "1 hour per week",
      "Only when regulations change"
    ],
    correctIndex: 1,
    explanation: "Most competent person schemes require around 35 hours of CPD annually (approximately 1 hour per week equivalent). This can include various activities and must be recorded and available for audit."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does CPD stand for?",
    options: [
      "Certificate of Professional Development",
      "Continuing Professional Development",
      "Complete Professional Documentation",
      "Certified Professional Diploma"
    ],
    correctAnswer: 1,
    explanation: "CPD stands for Continuing Professional Development. It encompasses all learning activities that maintain and develop professional competence throughout your career."
  },
  {
    id: 2,
    question: "Which organisation requires CPD for continued membership and ECS card renewal?",
    options: [
      "The government",
      "Local councils",
      "The JIB and competent person schemes",
      "Employers only"
    ],
    correctAnswer: 2,
    explanation: "The JIB requires CPD for ECS card renewal, and competent person schemes (NICEIC, NAPIT, ELECSA, etc.) require annual CPD to maintain membership and certification status."
  },
  {
    id: 3,
    question: "Which of these is NOT typically considered valid CPD?",
    options: [
      "Attending a BS 7671 update course",
      "Reading IET Wiring Matters magazine",
      "Repeating exactly the same work you do every day with no new learning",
      "Online training on new EV charging regulations"
    ],
    correctAnswer: 2,
    explanation: "CPD must involve learning something new or developing skills. Routine work without new challenges or learning doesn't count as CPD. The activity must develop your professional competence."
  },
  {
    id: 4,
    question: "When should you update your knowledge of BS 7671?",
    options: [
      "Only when a new edition is published",
      "Continuously, and specifically when amendments are issued",
      "Never - the original qualification covers everything",
      "Only if your employer requires it"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 knowledge should be maintained continuously. When amendments are issued (like Amendment 2 in 2022), specific update training ensures you understand the changes and can apply them correctly."
  },
  {
    id: 5,
    question: "What is reflective practice in the context of CPD?",
    options: [
      "Looking at your reflection while working",
      "Thinking about what you learned, how you applied it, and what you might do differently",
      "Repeating the same training multiple times",
      "Watching videos about your work"
    ],
    correctAnswer: 1,
    explanation: "Reflective practice involves thinking critically about your experiences and learning: what went well, what could improve, how new knowledge was applied, and what you would do differently next time."
  },
  {
    id: 6,
    question: "How can mentoring others contribute to your CPD?",
    options: [
      "It doesn't count as CPD",
      "Teaching reinforces your own knowledge and develops leadership skills",
      "Only if you get paid for it",
      "Only if you have a formal qualification in training"
    ],
    correctAnswer: 1,
    explanation: "Mentoring and coaching others reinforces your own knowledge as you explain concepts, develops your communication and leadership skills, and exposes you to different perspectives and questions."
  },
  {
    id: 7,
    question: "Which of these is a benefit of maintaining a CPD record?",
    options: [
      "It takes up time you could spend working",
      "It demonstrates your commitment to professional development to employers and clients",
      "Records are only needed for paperwork",
      "There are no real benefits"
    ],
    correctAnswer: 1,
    explanation: "A well-maintained CPD record demonstrates professionalism, supports scheme membership applications, aids ECS card renewal, provides evidence for job applications, and helps identify gaps in your development."
  },
  {
    id: 8,
    question: "What should you do if you identify a knowledge gap during your work?",
    options: [
      "Ignore it if you can complete the job",
      "Plan CPD activities to address the gap",
      "Hope you don't encounter it again",
      "Only address it if your employer tells you to"
    ],
    correctAnswer: 1,
    explanation: "Identifying knowledge gaps is valuable - it shows self-awareness. You should plan learning activities (courses, reading, shadowing) to address gaps, then record this as targeted CPD."
  },
  {
    id: 9,
    question: "How often should you review your CPD plan?",
    options: [
      "Once in your career",
      "Regularly - at least annually, ideally quarterly",
      "Only when changing jobs",
      "Never - just accumulate activities"
    ],
    correctAnswer: 1,
    explanation: "Regular review ensures your CPD remains relevant to your goals, industry changes, and any identified gaps. At least annual review is recommended, with quarterly check-ins being ideal."
  },
  {
    id: 10,
    question: "Which emerging area is important for electricians' CPD?",
    options: [
      "Only traditional wiring methods",
      "Green technologies: EV charging, solar PV, heat pumps, battery storage",
      "There are no new areas to learn",
      "Only what you learned as an apprentice"
    ],
    correctAnswer: 1,
    explanation: "Green technologies are a major growth area. CPD in EV charging, solar PV, heat pumps, and battery storage positions electricians for future work as the UK moves towards net zero."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How many CPD hours do I need per year?",
    answer: "Requirements vary by body. The IET recommends 35 hours annually. Most competent person schemes require around 30-35 hours. Your ECS card renewal also requires evidence of CPD. Keep records even if you exceed minimums."
  },
  {
    question: "Does reading count as CPD?",
    answer: "Yes, if it's relevant professional reading that develops your knowledge. Reading IET publications, technical guides, regulations updates, and industry magazines all count. Record what you read, key points learned, and how long you spent."
  },
  {
    question: "Can I do all my CPD online?",
    answer: "You can do significant CPD online (webinars, e-learning, reading), but a mix of activities is beneficial. Practical training, face-to-face courses, and on-the-job learning provide different experiences that pure online learning cannot replicate."
  },
  {
    question: "My employer doesn't support CPD - what can I do?",
    answer: "While employer support is valuable, CPD is your personal responsibility. Free and low-cost options include: IET webinars, manufacturer training, reading technical publications, industry events, and online resources. Your future employability depends on maintaining current skills."
  },
  {
    question: "What happens if I don't do enough CPD?",
    answer: "Insufficient CPD can affect your ECS card renewal, competent person scheme membership, and professional body standing. More importantly, outdated knowledge increases safety risks and reduces your competitiveness in the job market."
  },
  {
    question: "How do I prove my CPD for scheme audits?",
    answer: "Keep detailed records including: certificates from courses, notes from reading with dates, screenshots from online learning, meeting notes from industry events, and records of any assessments. Many schemes have online portals for recording and evidencing CPD."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuing Professional Development
          </h1>
          <p className="text-white/80">
            Lifelong learning to maintain competence and advance your career
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Why CPD:</strong> Regulations and technology constantly evolve</li>
              <li><strong>How Much:</strong> Typically 35 hours annually for scheme requirements</li>
              <li><strong>What Counts:</strong> Courses, reading, online learning, mentoring, events</li>
              <li><strong>Recording:</strong> Log activities with dates, duration, and outcomes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Knowledge gaps and emerging areas in your work</li>
              <li><strong>Use:</strong> Varied learning activities to address development needs</li>
              <li><strong>Apply:</strong> New knowledge immediately in your work</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why CPD is essential for electrical professionals",
              "Identify valid CPD activities and learning opportunities",
              "Create and maintain effective CPD records",
              "Plan your development to address gaps and career goals",
              "Meet scheme and professional body CPD requirements",
              "Apply reflective practice to maximise learning value"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why CPD Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrical industry is constantly evolving. BS 7671 receives regular amendments, new technologies emerge (EV charging, smart systems), and best practices develop. CPD ensures you remain competent, safe, and competitive throughout your career.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Reasons for CPD:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety:</strong> Outdated knowledge can lead to unsafe installations and practices</li>
                <li><strong>Compliance:</strong> Regulations change - you must stay current with BS 7671 and related standards</li>
                <li><strong>Competitiveness:</strong> Clients and employers value electricians with up-to-date skills</li>
                <li><strong>Career progression:</strong> Additional qualifications and knowledge open new opportunities</li>
                <li><strong>Scheme requirements:</strong> Competent person schemes and professional bodies require CPD</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> CPD is not just about meeting minimum requirements - it's about maintaining and improving your professional competence for the benefit of your clients, your career, and public safety.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of CPD Activities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CPD encompasses any activity that develops your professional knowledge and skills. The best approach combines different types of learning to suit different learning styles and situations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formal Learning</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Accredited training courses</li>
                  <li>Qualification programmes (e.g., C&G 2391)</li>
                  <li>BS 7671 update training</li>
                  <li>Manufacturer product training</li>
                  <li>Health and safety courses</li>
                  <li>Online certificated learning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Informal Learning</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reading IET publications and guidance</li>
                  <li>Technical magazines and online articles</li>
                  <li>Webinars and podcasts</li>
                  <li>Industry events and exhibitions</li>
                  <li>Peer learning and discussion</li>
                  <li>Mentoring others (develops your own understanding)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A balanced CPD portfolio might include: 18th Edition update course (8 hours), monthly IET webinars (12 hours), reading Wiring Matters quarterly (8 hours), product training from manufacturers (4 hours), and mentoring an apprentice (8 hours) = 40 hours total.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recording and Evidencing CPD
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective record-keeping is essential. It demonstrates your commitment to development, satisfies scheme requirements, and helps you identify patterns and gaps in your learning. Good records should be maintained contemporaneously - don't wait until audit time to reconstruct your activities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to Record for Each Activity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Activity description:</strong> What did you do? (course title, publication read, etc.)</li>
                <li><strong>Date(s):</strong> When did the activity take place?</li>
                <li><strong>Duration:</strong> How many hours did you spend?</li>
                <li><strong>Provider:</strong> Who delivered the training or created the content?</li>
                <li><strong>Learning outcomes:</strong> What did you learn? Key points?</li>
                <li><strong>Application:</strong> How have you or will you apply this learning?</li>
                <li><strong>Evidence:</strong> Certificate, notes, photos, attendance confirmation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recording Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Scheme-specific online portals (NICEIC, NAPIT, etc.)</li>
                <li>IET CPD recording tools</li>
                <li>Personal spreadsheet or database</li>
                <li>Physical CPD log book</li>
                <li>Mobile apps for on-the-go recording</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Keep certificates and evidence organised. When audited, you may need to produce records quickly. Digital storage with backup is recommended.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Planning Your CPD
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective CPD isn't random - it's planned to address your development needs, career goals, and industry changes. A structured approach ensures you invest time in learning that genuinely benefits your professional growth.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Assess</p>
                <p className="text-white/90 text-xs">Identify current skills and gaps</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Plan</p>
                <p className="text-white/90 text-xs">Set goals and select activities</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Review</p>
                <p className="text-white/90 text-xs">Evaluate learning and adjust</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Planning Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Assess your current competence against role requirements</li>
                <li>2. Identify gaps between current skills and career goals</li>
                <li>3. Consider upcoming industry changes (new regulations, technologies)</li>
                <li>4. Set SMART learning objectives for the year</li>
                <li>5. Select appropriate activities to meet objectives</li>
                <li>6. Schedule activities throughout the year (don't leave it all to December!)</li>
                <li>7. Review progress quarterly and adjust as needed</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Career goal: specialise in EV charging. CPD plan: C&G 2919 course (formal), manufacturer training from 2 suppliers (product knowledge), reading OLEV grant guidance (regulatory), shadowing experienced installer (practical).
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Free and Low-Cost CPD Options</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IET webinars (often free for members)</li>
                <li>Manufacturer online training and product guides</li>
                <li>Trade association resources and events</li>
                <li>YouTube technical content from reputable sources</li>
                <li>Industry magazine subscriptions (often included with memberships)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maximising Learning Value</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Take notes during courses and presentations</li>
                <li>Discuss learning with colleagues to reinforce understanding</li>
                <li>Apply new knowledge as soon as possible in your work</li>
                <li>Reflect on what worked well and what could improve</li>
                <li>Share useful resources with your team</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Leaving it until year-end</strong> - Rush learning is less effective</li>
                <li><strong>Quantity over quality</strong> - 35 thoughtful hours beats 50 box-ticking hours</li>
                <li><strong>No records</strong> - Undocumented learning cannot be evidenced</li>
                <li><strong>Ignoring gaps</strong> - Address weaknesses, don't just repeat strengths</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - CPD Requirements</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Typical Requirements</p>
                <ul className="space-y-0.5">
                  <li>IET: 35 hours recommended annually</li>
                  <li>NICEIC: 35 hours minimum</li>
                  <li>NAPIT: 35 hours minimum</li>
                  <li>ECS Card: Evidence required for renewal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CPD Activity Examples</p>
                <ul className="space-y-0.5">
                  <li>Training courses and qualifications</li>
                  <li>Technical reading and research</li>
                  <li>Webinars and online learning</li>
                  <li>Industry events and exhibitions</li>
                  <li>Mentoring and coaching others</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4-5">
              Next: Industry Qualifications
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section4_4;
