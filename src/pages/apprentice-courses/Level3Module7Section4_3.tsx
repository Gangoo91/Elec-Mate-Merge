/**
 * Level 3 Module 7 Section 4.3 - Career Pathways
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
const TITLE = "Career Pathways for Electricians - Level 3 Module 7 Section 4.3";
const DESCRIPTION = "Explore career pathways in the UK electrical industry. From apprentice to electrical engineer, learn about JIB grading, specialisations, management roles, and progression routes.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the JIB grading for a fully qualified electrician who has completed their apprenticeship and AM2?",
    options: [
      "Electrical Labourer",
      "Approved Electrician",
      "Installation Electrician",
      "Technician"
    ],
    correctIndex: 2,
    explanation: "Installation Electrician is the JIB grade for a fully qualified electrician who has completed their apprenticeship and passed the AM2 assessment. This is the industry-recognised benchmark for a qualified tradesperson."
  },
  {
    id: "check-2",
    question: "Which role typically requires both technical expertise and people management skills?",
    options: [
      "Domestic Electrician",
      "Site Supervisor or Contracts Manager",
      "Testing and Inspection Specialist",
      "Fire Alarm Engineer"
    ],
    correctIndex: 1,
    explanation: "Site Supervisors and Contracts Managers need strong technical knowledge to oversee work quality, combined with people management skills to lead teams, manage client relationships, and coordinate projects."
  },
  {
    id: "check-3",
    question: "What additional qualification is typically required to progress to Approved Electrician status?",
    options: [
      "AM2 assessment only",
      "C&G 2391 or equivalent inspection and testing qualification",
      "University degree",
      "First aid certificate"
    ],
    correctIndex: 1,
    explanation: "To progress from Installation Electrician to Approved Electrician, you typically need an inspection and testing qualification such as C&G 2391 (or equivalent), demonstrating competence in verification of electrical installations."
  },
  {
    id: "check-4",
    question: "Which pathway leads to professional engineering registration (IEng or CEng)?",
    options: [
      "Completing more domestic installations",
      "Working longer hours",
      "Higher education plus professional development and IET membership",
      "Only university graduates can achieve this"
    ],
    correctIndex: 2,
    explanation: "Professional registration as IEng or CEng requires appropriate qualifications (HNC/HND for IEng, degree for CEng), relevant experience, professional development, and membership of a licensed body like the IET."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the entry-level JIB grading for someone starting an electrical apprenticeship?",
    options: [
      "Installation Electrician",
      "Electrical Improver",
      "Apprentice Electrician",
      "Trainee"
    ],
    correctAnswer: 2,
    explanation: "Apprentice Electrician is the JIB grading for someone undertaking a formal electrical apprenticeship. This recognises their trainee status while working towards full qualification."
  },
  {
    id: 2,
    question: "Which specialisation focuses specifically on emergency and safety lighting systems?",
    options: [
      "Domestic Installation",
      "Industrial Controls",
      "Emergency Lighting and Fire Alarm Systems",
      "Highway Electrical"
    ],
    correctAnswer: 2,
    explanation: "Emergency Lighting and Fire Alarm Systems is a specialisation area dealing with life-safety systems. It requires knowledge of specific standards (BS 5266 for emergency lighting, BS 5839 for fire alarms)."
  },
  {
    id: 3,
    question: "What does the Approved Electrician JIB grade indicate?",
    options: [
      "An apprentice nearing completion",
      "A qualified electrician who can supervise others and verify installations",
      "A specialist in one area only",
      "Someone working towards their first qualification"
    ],
    correctAnswer: 1,
    explanation: "Approved Electrician indicates a fully qualified electrician with additional competence in inspection, testing, and verification. They can supervise installation work and sign off electrical installations."
  },
  {
    id: 4,
    question: "Which role typically involves designing electrical systems and calculations for larger projects?",
    options: [
      "Installation Electrician",
      "Maintenance Electrician",
      "Electrical Design Engineer",
      "Domestic Installer"
    ],
    correctAnswer: 2,
    explanation: "Electrical Design Engineers create designs and perform calculations for electrical systems, typically for commercial, industrial, or large residential projects. This requires higher qualifications and design software competence."
  },
  {
    id: 5,
    question: "What is the typical progression route from apprentice to running your own business?",
    options: [
      "Apprentice > Business Owner (immediately after qualifying)",
      "Apprentice > Installation Electrician > Approved Electrician > Self-employed/Business Owner",
      "Apprentice > Site Manager > Business Owner",
      "There is no standard progression route"
    ],
    correctAnswer: 1,
    explanation: "The typical route involves completing apprenticeship to become an Installation Electrician, gaining experience and further qualifications to become an Approved Electrician, then potentially going self-employed or starting a business."
  },
  {
    id: 6,
    question: "Which organisation manages the industry grading structure for electricians in the UK?",
    options: [
      "The Health and Safety Executive",
      "The Joint Industry Board (JIB)",
      "Local authorities",
      "The government"
    ],
    correctAnswer: 1,
    explanation: "The Joint Industry Board (JIB) manages the grading structure, pay scales, and conditions for electricians in the UK. They also administer the ECS card scheme that evidences qualifications and grades."
  },
  {
    id: 7,
    question: "What career path might an electrician take to become involved in teaching and training?",
    options: [
      "It's not possible to move into training",
      "Gain experience, obtain teaching qualifications, and work for colleges or training providers",
      "Stop working as an electrician immediately",
      "Training is only for people without industry experience"
    ],
    correctAnswer: 1,
    explanation: "Experienced electricians can move into training roles by obtaining teaching qualifications (PTLLS/DTLLS or equivalent) while leveraging their industry experience. Many colleges value practical experience alongside teaching skills."
  },
  {
    id: 8,
    question: "Which specialisation is becoming increasingly important due to the UK's net-zero targets?",
    options: [
      "Traditional domestic rewires only",
      "EV charging, solar PV, and battery storage",
      "Public address systems",
      "Landline telephone installation"
    ],
    correctAnswer: 1,
    explanation: "Green technologies including EV charging points, solar PV systems, and battery storage are rapidly growing sectors due to the UK's net-zero commitments. Electricians with these skills are in high demand."
  },
  {
    id: 9,
    question: "What is the purpose of the ECS (Electrotechnical Certification Scheme) card?",
    options: [
      "To allow electricians to work abroad",
      "To provide evidence of qualifications, competence, and health and safety training",
      "To replace all other qualifications",
      "It's only needed for commercial work"
    ],
    correctAnswer: 1,
    explanation: "The ECS card provides evidence of your qualifications, competence level, and health and safety training. It's increasingly required for site access and demonstrates your professional standing to clients and employers."
  },
  {
    id: 10,
    question: "Which pathway leads to becoming an Electrical Engineer (degree level)?",
    options: [
      "It's only accessible straight from school",
      "Complete apprenticeship, gain experience, potentially study part-time for HNC/HND then degree",
      "There is no route for practising electricians",
      "You must stop work to study full-time"
    ],
    correctAnswer: 1,
    explanation: "Many electricians progress to engineering roles through part-time study while working. The route typically involves HNC/HND followed by a degree (often top-up), combined with relevant work experience."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How long does it take to become an Approved Electrician from Installation Electrician?",
    answer: "This varies depending on your employer and opportunities, but typically 2-5 years. You'll need to gain experience in a variety of installation types, complete an inspection and testing qualification (such as C&G 2391), and demonstrate competence in supervising and verifying work."
  },
  {
    question: "Can I specialise in multiple areas, or should I focus on one?",
    answer: "Both approaches are valid. Some electricians build deep expertise in one area (becoming highly sought-after specialists), while others maintain broader skills across multiple areas. Consider local market demand and your interests when deciding."
  },
  {
    question: "Is a university degree necessary for career progression?",
    answer: "Not necessarily. Many successful electrical professionals progress through vocational routes. However, for roles like design engineering or corporate management, higher qualifications become more valuable. Part-time study while working is a popular option."
  },
  {
    question: "What's the earning potential difference between Installation Electrician and management roles?",
    answer: "Earnings vary significantly by region and employer. Generally, Approved Electricians earn more than Installation Electricians, and management roles (Contracts Manager, Director) can command significantly higher salaries. Self-employment and business ownership have the highest earning potential but also higher risk."
  },
  {
    question: "How do I know which career path is right for me?",
    answer: "Consider your interests (technical depth vs. breadth, working with people vs. systems), your lifestyle preferences (regular hours vs. flexibility, employed vs. self-employed), and your long-term goals. Talking to people in various roles and trying different types of work during your career helps clarify preferences."
  },
  {
    question: "Can I change specialisation later in my career?",
    answer: "Yes, though it may require additional training. Core electrical skills transfer between specialisations. Moving into a new area typically involves studying relevant regulations and standards, gaining supervised experience, and potentially obtaining specific qualifications."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
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

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>JIB Grades:</strong> Apprentice to Technician progression structure</li>
              <li><strong>Specialisations:</strong> Domestic, commercial, industrial, green tech</li>
              <li><strong>Management:</strong> Supervisor, Contracts Manager, Director routes</li>
              <li><strong>Engineering:</strong> Design, consultancy, professional registration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Opportunities to develop new skills in your current role</li>
              <li><strong>Use:</strong> Varied project experience to discover your interests</li>
              <li><strong>Apply:</strong> Set career goals and plan the steps to achieve them</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        

        

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            JIB Grading Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Joint Industry Board (JIB) establishes the grading structure for electricians in the UK. These grades define expected competence levels, influence pay rates, and provide a clear progression framework. Understanding this structure helps you plan your career development.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main JIB Grades (Progression Order):</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Electrical Labourer:</strong> Entry-level support role, no formal electrical qualifications required</li>
                <li><strong>Apprentice Electrician:</strong> Undertaking formal apprenticeship programme</li>
                <li><strong>Electrical Improver:</strong> Qualified but gaining experience, or progressing from labourer</li>
                <li><strong>Installation Electrician:</strong> Fully qualified, completed apprenticeship and AM2</li>
                <li><strong>Approved Electrician:</strong> Can supervise and verify installations, holds I&T qualification</li>
                <li><strong>Technician:</strong> Advanced technical competence, typically in specific systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Your ECS card displays your JIB grade and provides evidence of your qualifications. Keep it current by renewing before expiry and updating when you achieve new qualifications.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Specialisation Areas
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrical industry offers numerous specialisation paths. While most electricians start with general installation work, specialising can lead to higher earnings, more interesting work, and reduced competition. Choose specialisations based on market demand and personal interest.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Traditional Specialisations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Domestic Installation and Rewiring</li>
                  <li>Commercial Installation</li>
                  <li>Industrial and Manufacturing</li>
                  <li>Testing and Inspection</li>
                  <li>Maintenance and Facilities</li>
                  <li>Fire Alarm and Emergency Lighting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Growing Specialisations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>EV Charging Installation</li>
                  <li>Solar PV and Battery Storage</li>
                  <li>Heat Pump Systems</li>
                  <li>Smart Home and Building Automation</li>
                  <li>Data Centre Infrastructure</li>
                  <li>High Voltage and Renewable Energy</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician specialising in EV charging and solar PV can command premium rates and has a growing customer base as the UK moves towards net zero. Additional qualifications like C&G 2919 (EV) and MCS certification (solar) enhance credibility.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Management and Leadership Roles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all career progression involves staying hands-on with tools. Many electricians move into management roles, combining their technical knowledge with leadership skills. These roles typically offer higher earnings and different challenges.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Management Career Path:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Working Foreman:</strong> Lead a small team while still doing installation work</li>
                <li><strong>Site Supervisor:</strong> Oversee multiple teams and coordinate with other trades</li>
                <li><strong>Contracts Manager:</strong> Manage projects from tender to completion, client relationships</li>
                <li><strong>Operations Director:</strong> Strategic business decisions, company-wide responsibility</li>
                <li><strong>Managing Director/Owner:</strong> Full business leadership and accountability</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Skills Required for Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>People management and team leadership</li>
                <li>Project planning and coordination</li>
                <li>Budget management and cost control</li>
                <li>Client communication and relationship management</li>
                <li>Health and safety management</li>
                <li>Commercial awareness and business acumen</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Management roles require developing new skills beyond technical competence. Consider courses in project management, leadership, or business management to prepare for these roles.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Engineering and Professional Registration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For those seeking the highest levels of professional recognition, engineering registration through the Engineering Council provides internationally recognised status. This typically requires higher education qualifications combined with professional experience.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">EngTech</p>
                <p className="text-white/90 text-xs">Engineering Technician - practical competence</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">IEng</p>
                <p className="text-white/90 text-xs">Incorporated Engineer - HNC/HND level</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">CEng</p>
                <p className="text-white/90 text-xs">Chartered Engineer - degree level</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Routes to Professional Registration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete relevant qualifications (Level 3 for EngTech, HNC/HND for IEng, degree for CEng)</li>
                <li>Gain appropriate work experience demonstrating competence</li>
                <li>Join a licensed professional body (IET for electrical)</li>
                <li>Demonstrate professional development and commitment</li>
                <li>Apply through your professional body with evidence portfolio</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A qualified electrician could study part-time for an HNC/HND in Electrical Engineering, gain design experience, join the IET, and eventually achieve IEng status - all while continuing to work in the industry.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Your Career Development</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Set clear short-term (1-2 years) and long-term (5-10 years) goals</li>
                <li>Identify the qualifications and experience needed for your goals</li>
                <li>Seek varied work experience to discover your interests</li>
                <li>Build relationships with people in roles you aspire to</li>
                <li>Regularly review and adjust your plans as circumstances change</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Gaining Relevant Experience</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Volunteer for varied projects to broaden your skills</li>
                <li>Ask to shadow supervisors or managers to understand their roles</li>
                <li>Take opportunities to lead small teams or mentor apprentices</li>
                <li>Document your achievements and build a portfolio of work</li>
                <li>Seek feedback regularly and act on it</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No clear goals</strong> - Drifting without direction limits progression</li>
                <li><strong>Comfort zone staying</strong> - Avoiding challenges prevents growth</li>
                <li><strong>Ignoring soft skills</strong> - Technical skills alone won't lead to senior roles</li>
                <li><strong>Rushing progression</strong> - Building solid foundations takes time</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Career Pathways</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">JIB Grades</p>
                <ul className="space-y-0.5">
                  <li>Electrical Labourer (entry)</li>
                  <li>Apprentice Electrician</li>
                  <li>Electrical Improver</li>
                  <li>Installation Electrician</li>
                  <li>Approved Electrician</li>
                  <li>Technician</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Professional Registration</p>
                <ul className="space-y-0.5">
                  <li>EngTech - Engineering Technician</li>
                  <li>IEng - Incorporated Engineer</li>
                  <li>CEng - Chartered Engineer</li>
                  <li>Register through IET or similar body</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section4-4">
              Next: Continuing Professional Development
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section4_3;
