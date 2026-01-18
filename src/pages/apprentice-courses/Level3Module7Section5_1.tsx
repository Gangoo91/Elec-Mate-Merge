/**
 * Level 3 Module 7 Section 5.1 - Writing CVs and Preparing for Interviews
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Writing CVs and Preparing for Interviews - Level 3 Module 7 Section 5.1";
const DESCRIPTION = "Creating effective CVs and developing interview skills for electrical industry roles, including practical tips for presenting qualifications and experience.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What should be the primary focus of an electrician's CV?",
    options: [
      "Personal hobbies and interests",
      "Relevant qualifications, experience, and skills with evidence of competence",
      "A very creative and colourful design",
      "As much information as possible on one page"
    ],
    correctIndex: 1,
    explanation: "Electrical CVs should focus on qualifications (including card grades), relevant experience, and skills that demonstrate competence. Employers want to quickly see if you're qualified and what you've done."
  },
  {
    id: "check-2",
    question: "When describing previous roles on your CV, you should:",
    options: [
      "Simply list job titles and dates",
      "Include specific achievements, project types, and skills demonstrated",
      "Copy and paste the original job description",
      "Only mention your most recent role"
    ],
    correctIndex: 1,
    explanation: "Go beyond job titles to describe what you actually did - types of projects, skills used, achievements, and responsibilities. This helps employers understand your actual capabilities."
  },
  {
    id: "check-3",
    question: "Before an interview, you should research:",
    options: [
      "Nothing - just answer their questions",
      "The company, role requirements, and likely questions to prepare answers",
      "Only the interviewer's personal background",
      "Competing companies' salaries"
    ],
    correctIndex: 1,
    explanation: "Research the company (what they do, recent projects, values), understand the role requirements, and prepare answers to likely questions. This shows interest and helps you give relevant answers."
  },
  {
    id: "check-4",
    question: "What should you bring to an interview for an electrical position?",
    options: [
      "Nothing - they should have everything they need",
      "Copies of CV, certificates/qualifications, ECS card, and examples of work if relevant",
      "Only a pen",
      "Your social media profiles"
    ],
    correctIndex: 1,
    explanation: "Bring CV copies, qualification certificates, your ECS card, and if relevant, examples or photos of work. Having documentation ready demonstrates organisation and allows verification of claims."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The ideal length for an electrician's CV is typically:",
    options: [
      "One paragraph only",
      "Two pages maximum, with key information early",
      "As many pages as needed to include everything",
      "Less than half a page"
    ],
    correctAnswer: 1,
    explanation: "Two pages is the standard maximum. Put the most important information (qualifications, key experience) on the first page as employers may only skim-read. Quality over quantity."
  },
  {
    id: 2,
    question: "Your ECS card grade should be included on your CV because:",
    options: [
      "It's legally required",
      "It provides independent verification of your qualifications and experience level",
      "It makes the CV look more colourful",
      "Employers don't care about qualifications"
    ],
    correctAnswer: 1,
    explanation: "ECS card grades (Trainee, Labourer, Installation Electrician, Approved Electrician) are industry-standard verification of your level. Employers immediately understand your status from this."
  },
  {
    id: 3,
    question: "A 'skills-based' CV format is useful when:",
    options: [
      "Never - chronological is always best",
      "You want to highlight transferable skills or have gaps in employment",
      "You have very little experience",
      "Only for management positions"
    ],
    correctAnswer: 1,
    explanation: "Skills-based or functional CVs group your abilities by skill type rather than job chronology. Useful for career changers, those with employment gaps, or to highlight specific competencies."
  },
  {
    id: 4,
    question: "When asked 'Tell me about yourself' in an interview, you should:",
    options: [
      "Start with your childhood and work forward",
      "Give a brief, relevant summary of your experience and career goals",
      "Ask what specifically they want to know",
      "Read your CV aloud"
    ],
    correctAnswer: 1,
    explanation: "Prepare a 1-2 minute summary covering your relevant experience, key skills, and career goals. Focus on what's relevant to the role. This is your 'elevator pitch' - make it count."
  },
  {
    id: 5,
    question: "STAR technique for answering competency questions stands for:",
    options: [
      "Skills, Training, Achievement, Results",
      "Situation, Task, Action, Result",
      "Start, Try, Adjust, Repeat",
      "Standard, Technical, Applied, Reviewed"
    ],
    correctAnswer: 1,
    explanation: "STAR (Situation, Task, Action, Result) structures answers to competency questions: describe the Situation, your Task, the Action you took, and the Result. It gives complete, relevant answers."
  },
  {
    id: 6,
    question: "Questions to ask at the end of an interview should:",
    options: [
      "Only be about salary and benefits",
      "Show genuine interest in the role, company, and development opportunities",
      "Never be asked - just accept what they tell you",
      "Challenge the interviewer's statements"
    ],
    correctAnswer: 1,
    explanation: "Prepare thoughtful questions about the role, team, projects, development opportunities, and company direction. This demonstrates genuine interest and helps you assess if the role is right for you."
  },
  {
    id: 7,
    question: "Gaps in employment history on a CV should be:",
    options: [
      "Hidden by adjusting dates",
      "Explained honestly, highlighting any productive activities during the gap",
      "Never mentioned",
      "Filled with fake employment"
    ],
    correctAnswer: 1,
    explanation: "Be honest about gaps but explain them positively. If you did training, volunteering, or other productive activities during gaps, mention them. Dishonesty is quickly discovered and ends opportunities."
  },
  {
    id: 8,
    question: "Reference checking in the electrical industry typically involves:",
    options: [
      "Nothing - references aren't checked",
      "Contacting previous employers to verify employment, conduct, and capabilities",
      "Only checking criminal records",
      "Just reviewing social media"
    ],
    correctAnswer: 1,
    explanation: "References are commonly checked, especially for experienced roles. Previous employers may be asked about dates, role, conduct, and whether they'd re-employ you. Good references matter."
  },
  {
    id: 9,
    question: "What should you NOT do in an interview?",
    options: [
      "Ask questions about the role",
      "Criticise previous employers or colleagues",
      "Give specific examples of your work",
      "Show enthusiasm for the opportunity"
    ],
    correctAnswer: 1,
    explanation: "Never criticise previous employers, even if deserved. It raises questions about your attitude and discretion. Focus on positives about what you learned and why you're looking to progress."
  },
  {
    id: 10,
    question: "Following up after an interview is:",
    options: [
      "Unprofessional and pushy",
      "A good practice - a brief thank you and confirmation of interest",
      "Only necessary if you don't hear back",
      "Required within one hour"
    ],
    correctAnswer: 1,
    explanation: "A brief follow-up email thanking them for their time and confirming your interest is professional. It keeps you in mind and demonstrates good communication skills."
  },
  {
    id: 11,
    question: "Tailoring your CV for each application means:",
    options: [
      "Completely rewriting it each time",
      "Adjusting emphasis to highlight experience most relevant to each specific role",
      "Changing your qualifications",
      "Only changing the company name"
    ],
    correctAnswer: 1,
    explanation: "Keep core content consistent but adjust emphasis. If a role emphasizes testing, highlight your testing experience more prominently. Different roles value different aspects of your background."
  },
  {
    id: 12,
    question: "Practical or trade tests as part of the interview process:",
    options: [
      "Should be refused as unfair",
      "Are common for electrical positions to demonstrate competence",
      "Only apply to apprentices",
      "Are always paid at your normal rate"
    ],
    correctAnswer: 1,
    explanation: "Many employers use practical tests to verify competence - wiring exercises, testing scenarios, or fault-finding tasks. Treat these seriously as they're often decisive in hiring decisions."
  }
];

const faqs = [
  {
    question: "How do I handle being asked about salary expectations?",
    answer: "Research market rates for similar roles in your area. If asked early, you can say you'd like to understand the role fully first. When you need to answer, give a range based on research, or ask what their budget is. Don't undersell yourself but be realistic for your experience level."
  },
  {
    question: "What if I don't have much experience to put on my CV?",
    answer: "Focus on qualifications, training, and transferable skills. Include college/apprenticeship projects, any work experience, and relevant personal projects. Emphasise your enthusiasm to learn and develop. Everyone starts somewhere."
  },
  {
    question: "Should I include a photo on my CV?",
    answer: "In the UK, photos are not typically expected and some employers prefer them excluded to avoid unconscious bias. Use that space for more relevant information. Exceptions might be if specifically requested."
  },
  {
    question: "How honest should I be about weaknesses?",
    answer: "If asked about weaknesses, be genuine but strategic. Choose a real area for development (not a core requirement of the role) and explain what you're doing to improve. Avoid clichés like 'I work too hard' - they're unconvincing."
  },
  {
    question: "What if I'm nervous in interviews?",
    answer: "Preparation reduces nerves - practice answers aloud, research the company, and visualise success. Arrive early to calm down. Remember that some nerves show you care. If you need a moment to think, it's fine to pause before answering."
  },
  {
    question: "Can I negotiate salary and conditions?",
    answer: "Yes, professionally. After an offer, it's acceptable to discuss terms. Have justification for requests (market rates, your value). Be prepared to compromise. Don't negotiate until you have an offer, and be gracious whatever the outcome."
  }
];

const Level3Module7Section5_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section5">
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
            <span>Module 7.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Writing CVs and Preparing for Interviews
          </h1>
          <p className="text-white/80">
            Presenting yourself effectively for electrical industry positions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>CV focus:</strong> Qualifications, experience, skills with evidence</li>
              <li><strong>Preparation:</strong> Research company and role thoroughly</li>
              <li><strong>STAR method:</strong> Structure answers for competency questions</li>
              <li><strong>Documentation:</strong> Bring certificates and ECS card</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">CV Must-Haves</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Qualifications:</strong> Including ECS card grade</li>
              <li><strong>Experience:</strong> Types of work and projects</li>
              <li><strong>Skills:</strong> Technical and transferable</li>
              <li><strong>Achievements:</strong> Specific examples</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure and write an effective electrician's CV",
              "Present qualifications and experience effectively",
              "Prepare for common interview questions",
              "Use STAR technique for competency questions",
              "Handle practical assessments professionally",
              "Follow up appropriately after interviews"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: CV Structure and Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CV Structure and Content
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your CV is often the first impression an employer has of you. A well-structured CV that highlights relevant qualifications and experience helps you stand out from other candidates. For electrical positions, employers want to quickly see your qualifications, ECS card grade, and relevant experience.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential CV sections for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Personal details:</strong> Name, contact details, location (no full address needed)</li>
                <li><strong>Personal statement:</strong> Brief summary of your experience and career goals</li>
                <li><strong>Qualifications:</strong> Electrical qualifications, ECS card grade, other certifications</li>
                <li><strong>Experience:</strong> Employment history with specific details of work undertaken</li>
                <li><strong>Skills:</strong> Technical skills, equipment competencies, additional abilities</li>
                <li><strong>CPD:</strong> Recent training and development activities</li>
                <li><strong>References:</strong> Or state "available on request"</li>
              </ul>
            </div>

            <p>
              Keep your CV to two pages maximum. Put the most important information - qualifications and key experience - on the first page. Use clear formatting with consistent fonts and sensible headings. Avoid excessive design - content matters more than appearance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Employers may spend only 30 seconds on initial CV screening. Make key information easy to find. If they can't quickly see you're qualified, you won't get an interview.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Describing Experience */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Describing Your Experience Effectively
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Simply listing job titles doesn't tell employers what you can do. Describe what you actually did in each role - types of installations, project environments, responsibilities, and achievements. This helps employers understand your actual capabilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weak Description</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrician</li>
                  <li>ABC Electrical Ltd</li>
                  <li>2020 - Present</li>
                  <li>Electrical installation work</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strong Description</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation Electrician</li>
                  <li>ABC Electrical Ltd</li>
                  <li>2020 - Present</li>
                  <li>Commercial fit-out projects in office and retail environments. Containment, power, lighting, and small power installations. Fire alarm and emergency lighting maintenance. Responsible for inspection and testing, producing EICs and EICRs.</li>
                </ul>
              </div>
            </div>

            <p>
              Include specific types of work (domestic, commercial, industrial), project examples, technologies you've worked with, and any supervisory responsibilities. Quantify where possible - "Led a team of 3 on a retail fit-out" is more meaningful than "Team leader".
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> "Completed domestic rewires and consumer unit upgrades, including Part P certification. Experience with solar PV installations and EV charger installations. Competent with Fluke testing equipment."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Interview Preparation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Interview Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thorough preparation is the key to successful interviews. Researching the company, understanding the role, and preparing answers to likely questions gives you confidence and helps you give relevant, impressive answers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Research before the interview:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>The company:</strong> What they do, recent projects, company values, size</li>
                <li><strong>The role:</strong> Requirements, responsibilities, where it fits in the company</li>
                <li><strong>Industry context:</strong> Current market conditions, company position</li>
                <li><strong>Interviewers:</strong> If known, their background on LinkedIn</li>
              </ul>
            </div>

            <p>
              Prepare answers to common questions: "Tell me about yourself," "Why do you want this role?", "What are your strengths and weaknesses?", "Tell me about a challenging project." Use the STAR technique for competency questions - describe the Situation, your Task, the Action you took, and the Result achieved.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Practice answers aloud. What sounds good in your head may come out differently. Practice with a friend or record yourself. Prepare questions to ask them - interviews are two-way assessments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: On the Day */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interview Day and Follow-Up
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              First impressions matter. Arriving prepared, appropriately dressed, and on time sets the right tone. Bring documentation to support your application, and be ready for practical assessments if mentioned.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Before</p>
                <p className="text-white/90 text-xs">Plan route, arrive 10 min early, have documents ready</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">During</p>
                <p className="text-white/90 text-xs">Listen carefully, answer clearly, ask questions</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">After</p>
                <p className="text-white/90 text-xs">Send thank you, confirm interest, follow up if needed</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to bring:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Multiple copies of your CV</li>
                <li>Original qualification certificates</li>
                <li>Your ECS card</li>
                <li>Driving licence if driving required</li>
                <li>Portfolio or photos of work (if relevant)</li>
                <li>Notepad and pen for taking notes</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>After the interview:</strong> Send a brief thank you email within 24 hours. Reiterate your interest and mention any key points from the discussion. If you don't hear back by the indicated time, a polite follow-up is appropriate.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CV Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Proofread carefully - spelling errors create poor impression</li>
                <li>Tailor for each application, highlighting relevant experience</li>
                <li>Use action verbs: "delivered", "installed", "led", "achieved"</li>
                <li>Keep format clean and professional</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Interview Behaviour</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain eye contact and positive body language</li>
                <li>Listen to questions fully before answering</li>
                <li>Give specific examples rather than general statements</li>
                <li>Be honest - don't claim experience you don't have</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vague descriptions:</strong> "Various electrical work" doesn't help</li>
                <li><strong>Criticising employers:</strong> Never speak negatively about previous employers</li>
                <li><strong>Not asking questions:</strong> Shows lack of interest in the role</li>
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
                <p className="font-medium text-white mb-1">CV Checklist</p>
                <ul className="space-y-0.5">
                  <li>Contact details correct</li>
                  <li>Qualifications including ECS grade</li>
                  <li>Experience with specifics</li>
                  <li>Proofread for errors</li>
                  <li>Two pages maximum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Interview Checklist</p>
                <ul className="space-y-0.5">
                  <li>Research company and role</li>
                  <li>Prepare answers to common questions</li>
                  <li>Bring documents</li>
                  <li>Plan route and arrive early</li>
                  <li>Prepare questions to ask</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5-2">
              Next: Employment Law
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section5_1;
