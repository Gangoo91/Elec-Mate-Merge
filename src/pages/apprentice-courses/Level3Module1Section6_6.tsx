/**
 * Level 3 Module 1 Section 6.6 - Continuing Professional Development in Health and Safety
 *
 * Design matches: Level3ContentTemplate.tsx
 * Mobile-first responsive design with touch optimisations
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
const TITLE = "CPD in Health and Safety - Level 3 Module 1 Section 6.6";
const DESCRIPTION = "Understand continuing professional development requirements for health and safety in electrical installation. Learn how ongoing learning maintains competence and keeps knowledge current.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is CPD important for health and safety competence?",
    options: [
      "It's only needed to satisfy employers",
      "Regulations, best practices, and hazards change over time",
      "CPD is only for managers",
      "It's optional and has no real benefit"
    ],
    correctIndex: 1,
    explanation: "Regulations, best practices, technology, and understanding of hazards all change over time. CPD ensures your knowledge stays current and you remain competent to work safely. What you learned five years ago may not reflect current requirements."
  },
  {
    id: "check-2",
    question: "What counts as valid CPD for health and safety?",
    options: [
      "Only university degrees",
      "Formal courses, on-the-job learning, reading, attending safety briefings",
      "Only manufacturer training",
      "Only online certificates"
    ],
    correctIndex: 1,
    explanation: "Valid CPD includes many activities: formal courses, manufacturer training, on-the-job learning with supervision, reading industry publications, attending toolbox talks and safety briefings, and even reflecting on incidents. It's about continuous learning, not just collecting certificates."
  },
  {
    id: "check-3",
    question: "How often should electricians update their health and safety knowledge?",
    options: [
      "Only when regulations change",
      "Once at the start of their career",
      "Continuously throughout their career",
      "Only when their employer requires it"
    ],
    correctIndex: 2,
    explanation: "Health and safety CPD should be continuous throughout your career. This doesn't mean constant formal training, but ongoing engagement with safety matters - staying current with changes, learning from incidents, and refreshing knowledge regularly."
  },
  {
    id: "check-4",
    question: "What role does reflection play in safety CPD?",
    options: [
      "Reflection isn't part of CPD",
      "Analysing what went well and what could improve develops professional judgement",
      "Reflection only matters after accidents",
      "Only written records count as CPD"
    ],
    correctIndex: 1,
    explanation: "Reflection is a crucial part of CPD. Analysing what went well, what could improve, and what you learned from each situation develops professional judgement. This informal learning is often as valuable as formal training."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Continuing Professional Development (CPD) in health and safety means:",
    options: [
      "Taking one course when you start your career",
      "Ongoing learning to maintain and develop competence throughout your career",
      "Only studying when required by your employer",
      "Collecting certificates without understanding the content"
    ],
    correctAnswer: 1,
    explanation: "CPD is ongoing learning throughout your career, not a one-time event. It's about maintaining and developing competence as regulations change, new hazards emerge, and best practices evolve. It should be purposeful, not just certificate collecting."
  },
  {
    id: 2,
    question: "BS 7671 (the Wiring Regulations) is typically updated:",
    options: [
      "Every year",
      "Every 3-4 years, with amendments in between",
      "Only when major accidents occur",
      "Never - the regulations are permanent"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is typically updated every 3-4 years with amendments issued between editions. The current 18th Edition (2018) has had Amendment 2. Keeping current with these changes is essential CPD for electricians."
  },
  {
    id: 3,
    question: "Which organisation's competent person schemes typically require evidence of CPD?",
    options: [
      "None - CPD is entirely voluntary",
      "Registration bodies like NICEIC, NAPIT, and ELECSA",
      "Only the HSE",
      "Only insurance companies"
    ],
    correctAnswer: 1,
    explanation: "Competent person scheme providers like NICEIC, NAPIT, and ELECSA require registered electricians to demonstrate ongoing CPD. This ensures that those working under these schemes maintain their knowledge and competence."
  },
  {
    id: 4,
    question: "Learning from near-misses and incidents on site is:",
    options: [
      "Not valid CPD - only formal courses count",
      "Valuable informal CPD that develops practical safety knowledge",
      "Only relevant for accident investigators",
      "Not worth documenting"
    ],
    correctAnswer: 1,
    explanation: "Learning from near-misses and incidents is valuable CPD. Reflecting on what happened, why, and how to prevent recurrence develops practical safety knowledge that formal courses can't always provide. Document these learnings in your CPD record."
  },
  {
    id: 5,
    question: "A good approach to planning CPD involves:",
    options: [
      "Randomly selecting courses",
      "Identifying knowledge gaps and selecting development activities to address them",
      "Only doing what your employer requires",
      "Avoiding challenging topics"
    ],
    correctAnswer: 1,
    explanation: "Effective CPD planning involves identifying your knowledge gaps - areas where you're less confident or where requirements have changed - and selecting activities that address them. It should be purposeful, not random."
  },
  {
    id: 6,
    question: "Manufacturer training on new equipment is:",
    options: [
      "Not valid for CPD purposes",
      "Valid CPD that combines product knowledge with safety information",
      "Only relevant for salespeople",
      "Less valuable than book learning"
    ],
    correctAnswer: 1,
    explanation: "Manufacturer training is valuable CPD. It combines product knowledge with safety information - proper installation, testing, maintenance, and hazards specific to that equipment. Record this training in your CPD log."
  },
  {
    id: 7,
    question: "Why should CPD records be maintained?",
    options: [
      "Records aren't necessary",
      "To demonstrate ongoing competence to employers, registration bodies, and in legal situations",
      "Only for tax purposes",
      "Just to satisfy company policy"
    ],
    correctAnswer: 1,
    explanation: "CPD records demonstrate ongoing competence. They're valuable for: registration scheme renewals, job applications, responding to competence questions after incidents, and personal tracking of development. Keep records of all learning activities."
  },
  {
    id: 8,
    question: "Reading industry publications and HSE guidance counts as CPD because:",
    options: [
      "It doesn't - only courses count",
      "It keeps you informed of changes, best practices, and lessons from incidents",
      "Only if you pass a test afterwards",
      "Only if your employer requires it"
    ],
    correctAnswer: 1,
    explanation: "Reading industry publications (like IET Wiring Matters, Electrical Times) and HSE guidance is valid CPD. It keeps you informed of regulatory changes, emerging best practices, and lessons from incidents elsewhere. Document what you read and learned."
  },
  {
    id: 9,
    question: "Toolbox talks and safety briefings contribute to CPD by:",
    options: [
      "They don't count as CPD",
      "Providing regular, focused updates on specific safety topics",
      "Only if they're over an hour long",
      "Only if there's a certificate"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks and safety briefings are valuable CPD. They provide regular, focused updates on specific topics - often addressing current site conditions or recent incidents. The short, practical format reinforces learning effectively."
  },
  {
    id: 10,
    question: "The relationship between competence and CPD is:",
    options: [
      "Unrelated - competence is fixed",
      "CPD maintains and develops competence; without it, competence degrades over time",
      "CPD replaces the need for initial training",
      "Competence only requires formal qualifications"
    ],
    correctAnswer: 1,
    explanation: "Competence isn't fixed - it must be maintained and developed. Without CPD, knowledge becomes outdated, skills get rusty, and competence degrades. CPD is how you stay competent throughout your career."
  },
  {
    id: 11,
    question: "How should CPD be documented?",
    options: [
      "No documentation is needed",
      "Record the activity, date, duration, key learning points, and how it applies to your work",
      "Only keep formal certificates",
      "Documentation is optional"
    ],
    correctAnswer: 1,
    explanation: "Good CPD documentation includes: what you did, when, how long it took, what you learned, and how you'll apply it. This applies to informal learning too, not just formal courses. A brief reflection on each activity adds value."
  },
  {
    id: 12,
    question: "After completing an update course on BS 7671 amendments, you should:",
    options: [
      "File the certificate and forget about it",
      "Review how the changes affect your work and update your practices accordingly",
      "Wait until told to apply the new requirements",
      "Only apply changes to new installations"
    ],
    correctAnswer: 1,
    explanation: "After CPD, reflection and application are essential. Review how changes affect your work, update your practices, share relevant information with colleagues, and note in your records how you'll implement what you learned."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How much CPD should I do each year?",
    answer: "There's no universal requirement, but competent person schemes typically expect evidence of ongoing development - often 20-40 hours annually. Quality matters more than quantity. Focus on addressing your knowledge gaps and staying current with changes that affect your work. A blend of formal courses, reading, and on-the-job learning works well."
  },
  {
    question: "Does my employer have to pay for CPD?",
    answer: "Many employers fund CPD, recognising it benefits the business. However, professional development is also your personal responsibility. Some activities cost nothing - reading HSE guidance, attending toolbox talks, reflecting on experiences. Others may require investment. Discuss development needs with your employer, but don't wait for them to organise everything."
  },
  {
    question: "I'm an apprentice - does CPD apply to me?",
    answer: "Yes! CPD starts from day one of your career. Your apprenticeship is intensive CPD, but it doesn't stop when you qualify. Start building good habits now: keep a development record, reflect on what you're learning, stay curious about why things are done certain ways. These habits will serve you throughout your career."
  },
  {
    question: "What if I can't afford formal training courses?",
    answer: "Formal courses aren't the only valid CPD. Free or low-cost options include: HSE guidance and updates (free), trade magazine articles, manufacturer literature, attending industry events, watching technical webinars, on-the-job learning with experienced colleagues, and learning from incident reports. Document all learning activities."
  },
  {
    question: "How do I know what CPD I need?",
    answer: "Self-assess your competence: where are you less confident? What's changed since you last trained? What new equipment or methods are you encountering? Talk to experienced colleagues about emerging issues. Review recent incidents in the industry. Your registration body may also identify common development needs."
  },
  {
    question: "Does CPD only cover technical topics?",
    answer: "No. While technical updates (regulations, equipment) are important, CPD also includes: communication skills, supervision and mentoring, risk assessment techniques, understanding human factors in safety, first aid refreshers, and management of health and safety. A well-rounded professional develops across multiple areas."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuing Professional Development in Health and Safety
          </h1>
          <p className="text-white/80">
            Maintaining competence through ongoing learning throughout your career
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>CPD:</strong> Ongoing learning, not a one-time event</li>
              <li><strong>Why:</strong> Regulations, hazards, and best practice change</li>
              <li><strong>What counts:</strong> Courses, reading, experience, reflection</li>
              <li><strong>Document:</strong> Keep records for registration and proof</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Knowledge gaps, regulatory changes, new equipment</li>
              <li><strong>Use:</strong> Plan targeted development, record all learning</li>
              <li><strong>Apply:</strong> Reflect on how learning improves your practice</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why CPD is essential for competence",
              "Identify valid CPD activities for health and safety",
              "Plan effective professional development",
              "Document CPD appropriately",
              "Apply learning to improve practice",
              "Meet registration scheme requirements"
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

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why CPD Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuing Professional Development isn't optional bureaucracy - it's how you stay competent throughout your career. The electrical industry doesn't stand still: regulations are updated, new hazards are identified, equipment evolves, and understanding of what causes accidents improves. What you learned five years ago may not reflect current best practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key reasons CPD is essential:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulatory changes:</strong> BS 7671 is updated regularly with new requirements</li>
                <li><strong>Technology evolution:</strong> New equipment requires new knowledge</li>
                <li><strong>Improved understanding:</strong> Research reveals better safety practices</li>
                <li><strong>Skills maintenance:</strong> Unused skills degrade over time</li>
                <li><strong>Registration requirements:</strong> Competent person schemes require evidence of CPD</li>
              </ul>
            </div>

            <p>
              Consider this: if you qualified in 2018 and haven't kept up with changes, you might not know about Amendment 2 to BS 7671, updated arc flash guidance, or changes to cable sizing requirements. That's not competence - it's outdated knowledge.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Competence is a journey, not a destination. Your initial qualification was the start, not the end, of your professional development.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What Counts as CPD?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CPD isn't just about collecting certificates from formal courses. Effective professional development includes any activity that maintains or improves your competence - from structured training to learning from everyday experiences.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formal CPD activities:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Update courses (e.g., BS 7671 amendments)</li>
                  <li>Manufacturer training</li>
                  <li>Industry conferences and seminars</li>
                  <li>Professional body courses</li>
                  <li>Online learning programmes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Informal CPD activities:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reading trade publications and HSE guidance</li>
                  <li>Attending toolbox talks</li>
                  <li>Learning from colleagues and mentors</li>
                  <li>Reflecting on incidents and near-misses</li>
                  <li>Researching solutions to problems</li>
                </ul>
              </div>
            </div>

            <p>
              Both formal and informal learning count. The key is that the activity genuinely develops your knowledge or skills, and you reflect on how to apply what you've learned. A certificate without understanding is worthless; genuine learning without a certificate is still valuable CPD.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Planning Your Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective CPD isn't random - it addresses your specific development needs. Start by honestly assessing where your knowledge or skills are weaker, what's changed since you last trained, and what challenges you're likely to face.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Steps for planning effective CPD:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Self-assess:</strong> Where are you less confident? What do you avoid because you're unsure?</li>
                <li><strong>2. Identify changes:</strong> What regulations or practices have changed since you last trained?</li>
                <li><strong>3. Consider future needs:</strong> What skills will you need as your career develops?</li>
                <li><strong>4. Set priorities:</strong> What's most important to address first?</li>
                <li><strong>5. Select activities:</strong> Choose development activities that address your priorities</li>
                <li><strong>6. Schedule time:</strong> CPD won't happen without dedicated time</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You realise you're less confident about the latest requirements for EV charger installations. You plan: read the relevant BS 7671 section, attend a manufacturer's webinar on EV charging equipment, shadow an experienced colleague on an installation, then reflect on what you learned and how to apply it.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> CPD should challenge you. If it's all easy, you're probably not developing - you're just confirming what you already know.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording and Reflecting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good CPD documentation serves multiple purposes: it demonstrates competence to registration bodies, provides evidence if your qualifications are ever questioned, and helps you track your development over time. But the most valuable part isn't the record itself - it's the reflection.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record</p>
                <p className="text-white/90 text-xs">What you did, when, how long</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reflect</p>
                <p className="text-white/90 text-xs">What you learned, key points</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Apply</p>
                <p className="text-white/90 text-xs">How you'll use this learning</p>
              </div>
            </div>

            <p>
              For each CPD activity, note: what you did, date and duration, key learning points, and - crucially - how you'll apply what you learned. This reflection cements the learning and makes it genuinely useful. Without reflection, CPD becomes tick-box exercise.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to include in CPD records:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Activity description and provider</li>
                <li>Date and duration</li>
                <li>Key learning points (not just the topic)</li>
                <li>How it relates to your work</li>
                <li>Actions you'll take as a result</li>
                <li>Any certificates or evidence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building CPD into Your Routine</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Set aside regular time for reading industry updates</li>
                <li>Attend toolbox talks and safety briefings actively - take notes</li>
                <li>After significant jobs, reflect on what you learned</li>
                <li>Discuss technical challenges with experienced colleagues</li>
                <li>Follow industry publications and HSE alerts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Meeting Registration Scheme Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check your scheme's specific CPD requirements</li>
                <li>Ensure a mix of formal and informal activities</li>
                <li>Include technical updates and safety-specific learning</li>
                <li>Keep contemporaneous records, not year-end reconstructions</li>
                <li>Be prepared to discuss CPD at assessments</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">CPD Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Certificate collecting</strong> - Courses without understanding don't develop competence</li>
                <li><strong>Ignoring informal learning</strong> - Day-to-day experiences are valuable CPD</li>
                <li><strong>Staying in your comfort zone</strong> - CPD should challenge and stretch you</li>
                <li><strong>Last-minute cramming</strong> - Sustainable development happens throughout the year</li>
                <li><strong>Thinking you know enough</strong> - Overconfidence is dangerous in a changing industry</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">CPD Activities</p>
                <ul className="space-y-0.5">
                  <li>Formal courses and qualifications</li>
                  <li>Manufacturer and supplier training</li>
                  <li>Reading publications and guidance</li>
                  <li>Toolbox talks and briefings</li>
                  <li>Reflective practice and learning from experience</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation</p>
                <ul className="space-y-0.5">
                  <li>Activity details and duration</li>
                  <li>Key learning points</li>
                  <li>Application to your work</li>
                  <li>Certificates and evidence</li>
                  <li>Keep records current throughout year</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              6.5 Safety Representatives
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6">
              Back to Module 1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_6;
