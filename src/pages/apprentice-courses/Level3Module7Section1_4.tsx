/**
 * Level 3 Module 7 Section 1.4 - Apprenticeships, NVQs, and AM2 Assessment
 * Overview of training routes including apprenticeships, NVQs and assessment methods
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Apprenticeships, NVQs, and AM2 Assessment - Level 3 Module 7 Section 1.4";
const DESCRIPTION = "Understanding UK electrical apprenticeship routes, NVQ qualifications, and the AM2 end-point assessment for achieving qualified electrician status.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the typical duration of a UK electrical installation apprenticeship?",
    options: [
      "1-2 years",
      "3-4 years",
      "5-6 years",
      "6 months"
    ],
    correctIndex: 1,
    explanation: "A standard electrical installation apprenticeship in the UK takes 3-4 years to complete. This includes on-the-job training with an employer (approximately 80% of time) and college/training centre attendance (approximately 20%)."
  },
  {
    id: "check-2",
    question: "What does the AM2 assessment test?",
    options: [
      "Theoretical knowledge only through written exams",
      "Practical installation, testing, and certification skills in real-world conditions",
      "Management and supervision skills",
      "Sales and customer service abilities"
    ],
    correctIndex: 1,
    explanation: "The AM2 (Achievement Measurement 2) is a practical assessment that tests an apprentice's ability to safely install, test, inspect, and certify electrical work. It is typically the final hurdle before becoming a fully qualified electrician."
  },
  {
    id: "check-3",
    question: "What is the relationship between college qualifications and the NVQ?",
    options: [
      "They are the same thing",
      "College teaches theory; NVQ demonstrates practical workplace competence",
      "NVQ replaces college qualifications",
      "College is optional if you have an NVQ"
    ],
    correctIndex: 1,
    explanation: "College qualifications (like City & Guilds 2365) provide underpinning knowledge and theory. The NVQ (or SVQ in Scotland) separately demonstrates that you can apply this knowledge competently in real workplace situations. Both are typically required."
  },
  {
    id: "check-4",
    question: "What qualification level is the standard electrical installation apprenticeship?",
    options: [
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5"
    ],
    correctIndex: 1,
    explanation: "The Installation Electrician apprenticeship is at Level 3, equivalent to A-level standard. This reflects the complexity of the role and the knowledge required to work safely and independently on electrical installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What percentage of apprenticeship time is typically spent in the workplace?",
    options: [
      "50%",
      "60%",
      "80%",
      "95%"
    ],
    correctAnswer: 2,
    explanation: "Apprentices typically spend around 80% of their time in the workplace gaining practical experience, with approximately 20% at college or a training centre for theory and technical knowledge."
  },
  {
    id: 2,
    question: "What is the main awarding body for electrical installation qualifications in England?",
    options: [
      "Ofsted",
      "City & Guilds",
      "HMRC",
      "HSE"
    ],
    correctAnswer: 1,
    explanation: "City & Guilds is the main awarding body for electrical installation qualifications. EAL (Excellence, Achievement and Learning) is another significant awarding body. In Scotland, SQA (Scottish Qualifications Authority) is prominent."
  },
  {
    id: 3,
    question: "What must an apprentice complete to achieve full NVQ Level 3 status?",
    options: [
      "Written exams only",
      "Portfolio of evidence demonstrating workplace competence across all required units",
      "Time served only - automatic after 4 years",
      "A single practical assessment"
    ],
    correctAnswer: 1,
    explanation: "NVQ completion requires building a portfolio of evidence demonstrating competence across all required units. Evidence includes observed work, witness testimonies, work samples, photographs, and professional discussion records."
  },
  {
    id: 4,
    question: "Where is the AM2 assessment typically conducted?",
    options: [
      "In the apprentice's workplace",
      "At a JIB-approved assessment centre with realistic workshop conditions",
      "Online from home",
      "At the employer's head office"
    ],
    correctAnswer: 1,
    explanation: "The AM2 is conducted at JIB-approved assessment centres. These centres have realistic workshop setups allowing apprentices to demonstrate their practical skills in controlled but realistic conditions."
  },
  {
    id: 5,
    question: "What happens if an apprentice fails the AM2 assessment?",
    options: [
      "They must start the entire apprenticeship again",
      "They can retake after additional preparation, typically with a waiting period",
      "They are permanently barred from the industry",
      "Nothing - they still qualify"
    ],
    correctAnswer: 1,
    explanation: "If an apprentice fails the AM2, they can retake it after further preparation. There is usually a waiting period (often 4-6 weeks minimum) and additional fees apply. Most employers provide support to address weaknesses before resitting."
  },
  {
    id: 6,
    question: "What is an EPA in the context of apprenticeships?",
    options: [
      "Electrical Power Assessment",
      "End-Point Assessment - final assessment at the end of apprenticeship",
      "Employer Performance Agreement",
      "Electronic Portfolio Archive"
    ],
    correctAnswer: 1,
    explanation: "EPA (End-Point Assessment) is the final assessment at the end of an apprenticeship standard. For electrical installation, this includes the AM2 practical assessment. It is conducted by an independent End-Point Assessment Organisation."
  },
  {
    id: 7,
    question: "What is the difference between an apprenticeship 'framework' and an apprenticeship 'standard'?",
    options: [
      "There is no difference",
      "Frameworks are older; standards are newer with employer-designed outcomes and EPA",
      "Standards are shorter than frameworks",
      "Frameworks are for adults only"
    ],
    correctAnswer: 1,
    explanation: "Apprenticeship frameworks were the older system. Standards are the newer format, designed by employer groups (trailblazers), with specific knowledge/skills/behaviours and mandatory End-Point Assessment. Electrical installation now uses standards."
  },
  {
    id: 8,
    question: "What funding support is available for apprenticeship training?",
    options: [
      "None - employers pay everything",
      "Government funding covers training costs; employers pay wages and contribute to training",
      "Apprentices pay all costs themselves",
      "Training is free for everyone with no contributions"
    ],
    correctAnswer: 1,
    explanation: "Government funding significantly supports apprenticeship training costs. Large employers pay via the Apprenticeship Levy; smaller employers receive government co-funding. Employers pay the apprentice's wages and may contribute towards training costs depending on business size."
  },
  {
    id: 9,
    question: "What role does the college assessor play in NVQ achievement?",
    options: [
      "They teach all the theory content",
      "They verify workplace evidence and assess competence against NVQ standards",
      "They arrange work placements",
      "They set the AM2 assessment"
    ],
    correctAnswer: 1,
    explanation: "The NVQ assessor visits the workplace to verify evidence, observe work, conduct professional discussions, and confirm the apprentice meets the competence standards required. They are separate from the college tutors who teach theory."
  },
  {
    id: 10,
    question: "What additional qualification is recommended alongside Level 3 installation for career progression?",
    options: [
      "Level 1 in basic skills",
      "Inspection and testing qualification (2391 or equivalent)",
      "Food hygiene certificate",
      "First aid at work only"
    ],
    correctAnswer: 1,
    explanation: "The inspection and testing qualification (City & Guilds 2391 or equivalent) is highly recommended. It enables proper testing and certification of installations and is usually required for Qualified Supervisor status under competent person schemes."
  }
];

const faqs = [
  {
    question: "Can I become a qualified electrician without doing an apprenticeship?",
    answer: "Yes, though it is more challenging. Alternative routes include: adult training courses (intensive full-time programmes), employer-based NVQ achievement alongside working (if your employer supports this), or the Experienced Worker route (for those with substantial existing experience who can demonstrate competence). The apprenticeship route remains the most comprehensive and recognised pathway."
  },
  {
    question: "What is the minimum age to start an electrical apprenticeship?",
    answer: "You can start an apprenticeship at 16 (school leaving age). There is no maximum age - adult apprenticeships are available. However, funding rules and wage rates vary by age. Apprentices aged 19+ in their first year receive the apprentice rate; from year 2 they receive at least the National Minimum Wage for their age group."
  },
  {
    question: "How is the AM2 assessment structured?",
    answer: "The AM2 typically takes place over 1-2 days and includes: installation tasks (wiring circuits to specification), testing and inspection (carrying out safe isolation, dead testing, live testing), fault diagnosis (finding and rectifying faults), and completion of appropriate documentation and certificates. Tasks must be completed safely and to BS 7671 standards within time limits."
  },
  {
    question: "What happens after I pass the AM2?",
    answer: "After passing the AM2 and completing all apprenticeship requirements, you can: apply for your Gold ECS card as an Approved Electrician, work independently on installations, consider joining a competent person scheme (if going self-employed), and continue developing through further qualifications like 2391 inspection and testing."
  },
  {
    question: "My employer is not supporting my NVQ - what can I do?",
    answer: "Speak with your college/training provider first - they may be able to help arrange appropriate work evidence. If your employer is not providing suitable work opportunities, consider: discussing with your apprenticeship coordinator, contacting your training provider's employer liaison, or in serious cases, seeking advice from the ESFA (Education and Skills Funding Agency) or considering a change of employer."
  },
  {
    question: "What is the difference between City & Guilds and EAL qualifications?",
    answer: "Both City & Guilds and EAL are recognised awarding bodies offering equivalent electrical qualifications. The content and standards are similar - both meet the same occupational standards. Your choice often depends on which awarding body your college/training provider uses. Either is recognised by employers and competent person schemes."
  }
];

const Level3Module7Section1_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section1">
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
            <span>Module 7.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Apprenticeships, NVQs, and AM2 Assessment
          </h1>
          <p className="text-white/80">
            The training routes and assessments that lead to qualified electrician status
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Apprenticeship:</strong> 3-4 years combining work and college</li>
              <li><strong>NVQ:</strong> Demonstrates workplace competence through portfolio</li>
              <li><strong>AM2:</strong> Final practical assessment at approved centre</li>
              <li><strong>Result:</strong> Gold ECS card as Approved Electrician</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Components</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Theory:</strong> City & Guilds 2365 or EAL equivalent</li>
              <li><strong>Practical:</strong> NVQ Level 3 in Electrical Installation</li>
              <li><strong>Assessment:</strong> AM2 End-Point Assessment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The structure of UK electrical apprenticeships",
              "How NVQ portfolios demonstrate competence",
              "What the AM2 assessment involves",
              "The relationship between theory and practical qualifications",
              "Funding and support available for apprentices",
              "Alternative routes to becoming qualified"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Apprenticeship Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Apprenticeship Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrical installation apprenticeship is a Level 3 programme that combines on-the-job training with an employer and off-the-job learning at a college or training centre. This dual approach ensures apprentices develop both practical skills and underpinning theoretical knowledge.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Apprenticeship Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>On-the-job (80%)</strong> - Working with employer on real installations, gaining experience</li>
                <li><strong>Off-the-job (20%)</strong> - College attendance for theory, practical workshops, assessments</li>
                <li><strong>Technical Certificate</strong> - City & Guilds 2365 or EAL equivalent theory qualification</li>
                <li><strong>NVQ</strong> - Demonstrating workplace competence through portfolio evidence</li>
                <li><strong>Functional Skills</strong> - English and maths if not already achieved at GCSE grade 4+</li>
                <li><strong>AM2</strong> - End-Point Assessment practical test</li>
              </ul>
            </div>

            <p>
              Modern apprenticeships use the apprenticeship standard format, designed by employer groups (trailblazers). This ensures the training meets industry needs and produces electricians ready for the workplace. The standard includes specific knowledge, skills, and behaviours that must be demonstrated.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Funding:</strong> Apprenticeship training is funded through the Apprenticeship Levy (for large employers) or government co-funding (for smaller employers). Employers pay the apprentice's wages and provide workplace training opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - NVQ Portfolio */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The NVQ and Portfolio Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The NVQ (National Vocational Qualification) Level 3 in Electrical Installation is separate from college theory qualifications. It demonstrates that you can apply your knowledge competently in real workplace situations. Achievement requires building a portfolio of evidence across all required units.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Evidence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Direct observation by assessor</li>
                  <li>Witness testimonies from supervisors</li>
                  <li>Photographs of completed work</li>
                  <li>Completed documentation (certificates, test results)</li>
                  <li>Professional discussion recordings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Units Covered</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Health and safety practices</li>
                  <li>Installation of wiring systems</li>
                  <li>Installation of equipment and enclosures</li>
                  <li>Inspection and testing</li>
                  <li>Fault diagnosis and rectification</li>
                </ul>
              </div>
            </div>

            <p>
              An NVQ assessor (often from your college/training provider) visits your workplace periodically to verify evidence, observe your work, and conduct professional discussions. They confirm that your evidence meets the required standards and sign off completed units.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Portfolio Tip:</strong> Keep your portfolio organised and up to date. Photograph work before it is covered up, collect witness testimonies promptly, and ensure evidence is clearly linked to the relevant units. A well-organised portfolio makes assessment smoother.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - AM2 Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The AM2 Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The AM2 (Achievement Measurement 2) is the practical end-point assessment for the electrical installation apprenticeship. It is conducted at JIB-approved assessment centres and tests your ability to safely install, test, and certify electrical work in realistic conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">AM2 Assessment Structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installation Tasks</strong> - Wiring circuits to given specifications, following drawings</li>
                <li><strong>Safe Isolation</strong> - Demonstrating correct safe isolation procedures</li>
                <li><strong>Testing & Inspection</strong> - Carrying out dead and live tests, recording results</li>
                <li><strong>Fault Diagnosis</strong> - Finding and rectifying faults on existing circuits</li>
                <li><strong>Documentation</strong> - Completing appropriate certificates and schedules</li>
              </ul>
            </div>

            <p>
              The AM2 is time-limited and closely observed. Assessors check not only the finished result but also your working methods, safety practices, and adherence to BS 7671 requirements throughout. Serious safety breaches can result in immediate failure.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Preparation:</strong> Practice in your workplace and at college. Ensure you can work safely and efficiently without constant guidance. The AM2 tests independence - you should be able to complete tasks with only the specification and your knowledge to guide you.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - After Qualification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            After Qualification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successfully completing the apprenticeship (including passing the AM2) opens the door to full electrician status. You can apply for your Gold ECS card as an Approved Electrician and begin working independently. However, qualification is just the beginning of your professional development.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Gold ECS Card</p>
                <p className="text-white/90 text-xs">Apply for Approved Electrician status, proving your competence</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2391 Qualification</p>
                <p className="text-white/90 text-xs">Inspection and testing - recommended next qualification</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Career Options</p>
                <p className="text-white/90 text-xs">Employment, self-employment, specialisation, or further study</p>
              </div>
            </div>

            <p>
              Many newly qualified electricians spend time as an "improver" - gaining additional experience before being paid at full Approved Electrician rates. This transition period is valuable for building confidence and broadening experience under reduced supervision.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Next Steps:</strong> Consider: gaining the 2391 inspection and testing qualification, specialising in a growth area (renewables, EV charging, smart systems), or progressing towards supervisory roles. Continuous learning keeps you competitive and opens new opportunities.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Making the Most of Your Apprenticeship</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask questions - experienced colleagues are a valuable learning resource</li>
                <li>Volunteer for varied work - broaden your experience across different installation types</li>
                <li>Keep your portfolio current - don't leave evidence gathering until the last minute</li>
                <li>Study outside work hours - the more you understand the theory, the better your practical work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Preparing for the AM2</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Practice working independently - complete tasks without asking for guidance</li>
                <li>Know your safe isolation procedure perfectly - it is tested every time</li>
                <li>Practice testing sequences until they become automatic</li>
                <li>Work to time limits - the AM2 has strict time constraints</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Neglecting portfolio evidence</strong> - Don't wait until the end to gather evidence</li>
                <li><strong>Not practising testing</strong> - Testing is often the weakest area in AM2</li>
                <li><strong>Rushing</strong> - Speed without accuracy leads to mistakes and failure</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Apprenticeship Timeline</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Year 1-2</p>
                <ul className="space-y-0.5">
                  <li>Start collecting NVQ evidence</li>
                  <li>Complete technical certificate units</li>
                  <li>Gain foundation practical experience</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Year 3-4</p>
                <ul className="space-y-0.5">
                  <li>Complete NVQ portfolio</li>
                  <li>Prepare for AM2 assessment</li>
                  <li>Apply for ECS card on completion</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Trade Bodies
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1-5">
              Next: Higher Qualifications
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module7Section1_4;
