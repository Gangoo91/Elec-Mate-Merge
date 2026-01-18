/**
 * Level 3 Module 7 Section 1.1 - Roles Within the Electrical Industry
 * Understanding different roles: installer, tester, designer, inspector and their responsibilities
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Roles Within the Electrical Industry - Level 3 Module 7 Section 1.1";
const DESCRIPTION = "Understanding different roles within the UK electrical industry including installer, tester, designer, and inspector responsibilities and career pathways.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary responsibility of an Approved Electrician under the JIB grading system?",
    options: [
      "Only carrying out basic wiring tasks",
      "Working under direct supervision at all times",
      "Working independently on a range of installations with minimal supervision",
      "Only testing and certification work"
    ],
    correctIndex: 2,
    explanation: "An Approved Electrician is a qualified tradesperson who can work independently on a wide range of electrical installations with minimal supervision, having completed their apprenticeship and relevant qualifications."
  },
  {
    id: "check-2",
    question: "Which qualification is typically required for someone to become a qualified electrical tester?",
    options: [
      "Level 2 Certificate only",
      "City & Guilds 2391 or equivalent inspection and testing qualification",
      "AM2 assessment alone",
      "No formal qualification is required"
    ],
    correctIndex: 1,
    explanation: "The City & Guilds 2391 (or equivalent such as EAL Inspection and Testing) is the industry-standard qualification for electrical testers, covering safe isolation, testing procedures, and certification requirements."
  },
  {
    id: "check-3",
    question: "What is the main role of a Contracts Manager in an electrical contracting company?",
    options: [
      "Carrying out hands-on installation work",
      "Only handling customer complaints",
      "Overseeing multiple projects, managing budgets, clients, and teams",
      "Testing completed installations"
    ],
    correctIndex: 2,
    explanation: "A Contracts Manager oversees multiple projects simultaneously, managing budgets, client relationships, project timelines, and coordinating teams of electricians and other trades."
  },
  {
    id: "check-4",
    question: "What body accredits electrical designers who work on complex installations?",
    options: [
      "Only the HSE",
      "The JIB issues ECS cards, and bodies like IET offer Wiring Matters membership",
      "There is no accreditation for electrical designers",
      "Only NICEIC"
    ],
    correctIndex: 1,
    explanation: "Electrical designers can hold ECS cards issued by the JIB for site work, and professional bodies like the Institution of Engineering and Technology (IET) provide membership and recognition for design professionals."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which ECS card colour indicates an Electrician has completed their apprenticeship and holds full qualifications?",
    options: [
      "Red (Trainee)",
      "Blue (Apprentice)",
      "Gold (Approved Electrician)",
      "Black (Manager)"
    ],
    correctAnswer: 2,
    explanation: "The Gold ECS card is issued to Approved Electricians who have completed their apprenticeship, achieved their qualifications, and demonstrated competence in the trade."
  },
  {
    id: 2,
    question: "What is the typical progression route from Apprentice to becoming a Supervisor?",
    options: [
      "Apprentice → Trainee → Labourer → Supervisor",
      "Apprentice → Improver → Approved Electrician → Supervisor/Foreman",
      "Apprentice → Manager → Director → Supervisor",
      "Apprentice → Tester → Designer → Supervisor"
    ],
    correctAnswer: 1,
    explanation: "The standard progression is: Apprentice (during training) → Improver (immediately post-qualification) → Approved Electrician (fully qualified) → Supervisor/Foreman (team leadership). This typically takes 6-10 years of experience."
  },
  {
    id: 3,
    question: "What additional qualification does a Qualified Supervisor (QS) typically need beyond standard installation qualifications?",
    options: [
      "Only first aid training",
      "A university degree in electrical engineering",
      "Inspection and testing qualification (2391 or equivalent) and experience",
      "No additional qualifications are required"
    ],
    correctAnswer: 2,
    explanation: "A Qualified Supervisor needs an inspection and testing qualification (such as 2391) along with significant experience, as they are responsible for signing off completed work and ensuring compliance with BS 7671."
  },
  {
    id: 4,
    question: "Which role is primarily responsible for ensuring electrical installations comply with BS 7671 during initial verification?",
    options: [
      "The Labourer",
      "The Electrical Inspector/Tester",
      "The Client",
      "The Building Control Officer"
    ],
    correctAnswer: 1,
    explanation: "The Electrical Inspector/Tester is responsible for carrying out initial verification testing and ensuring the installation complies with BS 7671 before being put into service. They complete the relevant certification."
  },
  {
    id: 5,
    question: "What is the primary difference between an Electrical Designer and an Electrical Installer?",
    options: [
      "Designers only work on domestic properties",
      "Installers earn more than designers",
      "Designers focus on planning and specifying systems; installers physically construct them",
      "There is no difference - they do the same job"
    ],
    correctAnswer: 2,
    explanation: "Electrical Designers focus on planning, calculating, and specifying electrical systems on paper or CAD before construction. Installers then physically construct and wire these systems according to the design specifications."
  },
  {
    id: 6,
    question: "What type of work would a Commissioning Engineer typically be involved in?",
    options: [
      "Only domestic rewires",
      "Testing, configuring, and bringing complex systems into operation",
      "Only changing light fittings",
      "Selling electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Commissioning Engineers are specialists who test, configure, and bring complex electrical systems (such as fire alarms, emergency lighting, BMS, and industrial controls) into full operation, ensuring they meet specifications."
  },
  {
    id: 7,
    question: "Which role would typically be responsible for producing cable calculations and circuit design documents?",
    options: [
      "The Apprentice Electrician",
      "The Site Labourer",
      "The Electrical Design Engineer",
      "The Stores Manager"
    ],
    correctAnswer: 2,
    explanation: "The Electrical Design Engineer is responsible for producing technical documents including cable calculations, circuit designs, schematic drawings, and specifications that installers will follow during construction."
  },
  {
    id: 8,
    question: "What is the JIB?",
    options: [
      "A type of electrical testing equipment",
      "Joint Industry Board - the body responsible for grading and pay scales in the UK electrical industry",
      "A government regulatory department",
      "A cable manufacturer"
    ],
    correctAnswer: 1,
    explanation: "The Joint Industry Board (JIB) is the industry body that sets pay grades, issues ECS cards, and defines occupational standards for electricians in the UK. It works with SJIB in Scotland."
  },
  {
    id: 9,
    question: "What additional responsibilities does an Installation Electrician have compared to a Maintenance Electrician?",
    options: [
      "Maintenance Electricians have more responsibilities",
      "Installation Electricians focus on new work; Maintenance Electricians focus on existing systems",
      "They have identical responsibilities",
      "Installation Electricians only work on testing"
    ],
    correctAnswer: 1,
    explanation: "Installation Electricians specialise in new installations and major alterations, while Maintenance Electricians focus on keeping existing systems operational through repairs, testing, and upgrades."
  },
  {
    id: 10,
    question: "What role does a Contracts Manager play in relation to Health and Safety on site?",
    options: [
      "No responsibility for health and safety",
      "Only responsible for their own personal safety",
      "Overall responsibility for H&S compliance on their projects, including CDM duties",
      "Only writes risk assessments, nothing else"
    ],
    correctAnswer: 2,
    explanation: "Contracts Managers have significant Health and Safety responsibilities including ensuring CDM compliance, overseeing risk assessments, method statements, and ensuring all personnel work safely on their projects."
  }
];

const faqs = [
  {
    question: "How long does it take to progress from Apprentice to Approved Electrician?",
    answer: "A standard electrical apprenticeship in the UK takes 3-4 years. After completing the apprenticeship and passing the AM2 assessment, you become an Approved Electrician. Some may spend time as an Improver (typically 6-12 months) gaining additional experience immediately post-qualification before their employer recognises them at the full Approved Electrician rate."
  },
  {
    question: "Can I become a Supervisor without the 2391 inspection and testing qualification?",
    answer: "While not always legally required, most reputable employers and competent person schemes require Supervisors and Qualified Supervisors to hold the 2391 or equivalent. This qualification ensures you can properly verify work and sign off certification, which is a key supervisory responsibility."
  },
  {
    question: "What is the difference between an ECS card and a CSCS card?",
    answer: "The ECS (Electrotechnical Certification Scheme) card is specifically for electrical workers and is managed by the JIB. The CSCS (Construction Skills Certification Scheme) card covers all construction trades. Electricians typically carry an ECS card which is recognised across construction sites. Both cards prove competence and allow site access."
  },
  {
    question: "Do I need different qualifications to work in commercial versus domestic installations?",
    answer: "The core qualifications (Level 3 in Electrical Installation, AM2) apply to all sectors. However, commercial and industrial work often requires additional knowledge of three-phase systems, fire alarm regulations, and specific industry standards. Many electricians specialise in one sector and build expertise through experience and additional training."
  },
  {
    question: "What is the role of a Building Services Engineer compared to an Electrician?",
    answer: "A Building Services Engineer (often degree-qualified) designs and oversees all building services including electrical, mechanical, plumbing, and HVAC systems at a strategic level. An Electrician focuses specifically on electrical installation and maintenance. Building Services Engineers typically work in design offices, while electricians work hands-on installing systems."
  },
  {
    question: "Can I move between different roles in the electrical industry?",
    answer: "Yes, the electrical industry offers excellent flexibility. An Installation Electrician might move into testing, maintenance, design, project management, or even start their own business. Additional qualifications and experience open up different career paths. Many successful professionals have held multiple roles throughout their careers."
  }
];

const Level3Module7Section1_1 = () => {
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
            <span>Module 7.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Roles Within the Electrical Industry
          </h1>
          <p className="text-white/80">
            Understanding the diverse career roles and responsibilities in the UK electrical sector
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Installer:</strong> Carries out new electrical installations and alterations</li>
              <li><strong>Tester:</strong> Verifies safety through inspection and testing</li>
              <li><strong>Designer:</strong> Plans and specifies electrical systems</li>
              <li><strong>Supervisor:</strong> Oversees teams and signs off work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Career Reality Check</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>JIB Grading:</strong> Defines pay scales and competence levels</li>
              <li><strong>ECS Cards:</strong> Prove your qualifications on site</li>
              <li><strong>Progression:</strong> Many routes from hands-on to management</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The main job roles within the UK electrical industry",
              "Responsibilities of installers, testers, and designers",
              "JIB grading system and ECS card categories",
              "Progression routes from apprentice to management",
              "The difference between installation and maintenance roles",
              "Skills and qualifications needed for each career path"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Installation Roles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Installation Roles and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Installation electricians form the backbone of the UK electrical industry. They are responsible for installing, altering, and maintaining electrical systems in domestic, commercial, and industrial settings. The role requires a combination of technical knowledge, practical skills, and an understanding of current regulations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Installation Roles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Apprentice Electrician</strong> - Learning the trade under supervision, working towards Level 3 qualification</li>
                <li><strong>Improver</strong> - Recently qualified, gaining post-apprenticeship experience</li>
                <li><strong>Approved Electrician</strong> - Fully qualified tradesperson working independently</li>
                <li><strong>Electrician (Technician Grade)</strong> - Senior installer with additional skills or specialisms</li>
                <li><strong>Installation Supervisor</strong> - Team leader responsible for quality and progress</li>
              </ul>
            </div>

            <p>
              Installation work varies significantly depending on the sector. Domestic electricians focus on house rewires, consumer unit upgrades, and additions. Commercial electricians work on offices, retail premises, and public buildings. Industrial electricians deal with factories, machinery, and heavy equipment - often involving three-phase systems and complex control circuits.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry Fact:</strong> The JIB sets nationally agreed pay rates for each grade. An Approved Electrician earns significantly more than an Apprentice, reflecting the increased responsibility and competence required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Testing and Inspection Roles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Testing and Inspection Roles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing and inspection is a critical specialism within the electrical industry. These professionals ensure that installations are safe, compliant with BS 7671, and fit for purpose. The work requires meticulous attention to detail, strong analytical skills, and comprehensive knowledge of testing procedures and regulatory requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Initial Verification Roles</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Testing new installations before energisation</li>
                  <li>Completing Electrical Installation Certificates</li>
                  <li>Verifying design compliance with BS 7671</li>
                  <li>Dead testing and live testing procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Periodic Inspection Roles</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Assessing existing installation condition</li>
                  <li>Producing Electrical Installation Condition Reports</li>
                  <li>Identifying defects and recommending remedial work</li>
                  <li>Determining next inspection intervals</li>
                </ul>
              </div>
            </div>

            <p>
              To work as a qualified tester, you need a recognised inspection and testing qualification such as City & Guilds 2391 or 2394/2395. Many testers also hold the Level 3 installation qualification, giving them a full understanding of how systems are built before testing them.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career Tip:</strong> Inspection and testing skills are highly valued and can lead to roles in building control, insurance assessment, and consultancy. The 2391 qualification is often the gateway to supervisory positions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Design and Engineering Roles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design and Engineering Roles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical design professionals work at the planning stage of projects, creating the specifications and drawings that installers will follow. This work requires strong technical knowledge, mathematical ability, and proficiency with design software. Designers rarely work on tools themselves but their decisions directly affect every cable and component installed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Role Hierarchy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Junior Designer/CAD Technician</strong> - Produces drawings and basic calculations under supervision</li>
                <li><strong>Electrical Designer</strong> - Creates full system designs including cable sizing and protection coordination</li>
                <li><strong>Senior Designer</strong> - Leads design projects and mentors junior staff</li>
                <li><strong>Principal Engineer</strong> - Strategic design decisions, client liaison, technical authority</li>
                <li><strong>Building Services Engineer</strong> - Holistic view across all M&E services (often degree-level)</li>
              </ul>
            </div>

            <p>
              Design work involves cable calculations using BS 7671 appendices, fault level analysis, discrimination studies, and coordination with other building services. Modern designers use software packages for calculations but must understand the underlying principles to verify outputs and make professional judgements.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> On a new office development, the electrical designer would specify the incoming supply requirements, distribution board layouts, cable routes, lighting design, small power arrangements, and fire alarm system. Installers then build exactly what the designer has specified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Management and Supervisory Roles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Management and Supervisory Roles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Management roles in the electrical industry require a blend of technical competence and people skills. Supervisors and managers are responsible for the quality of work, health and safety compliance, team performance, and project delivery. Many senior managers started as apprentices and worked their way up through practical experience.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Foreman</p>
                <p className="text-white/90 text-xs">First-line supervisor on site, manages daily work allocation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Project Manager</p>
                <p className="text-white/90 text-xs">Oversees complete projects from start to handover</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Contracts Manager</p>
                <p className="text-white/90 text-xs">Manages multiple projects, budgets, and client relationships</p>
              </div>
            </div>

            <p>
              A Qualified Supervisor (QS) has specific responsibilities under competent person schemes like NICEIC or NAPIT. They must verify that work completed by others meets BS 7671 requirements before signing off certification. This role requires the 2391 inspection and testing qualification alongside significant practical experience.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Career Path:</strong> Management roles often require additional training in areas such as project management, health and safety (SMSTS/SSSTS), and commercial awareness. Many companies offer internal progression programmes for promising electricians.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choosing Your Career Path</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider whether you prefer hands-on work, office-based design, or people management</li>
                <li>Talk to professionals in different roles to understand day-to-day realities</li>
                <li>Look at job adverts to see what qualifications and experience employers want</li>
                <li>Plan your training and qualifications to align with your career goals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Your Career</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Get your ECS card as soon as you're eligible - it proves your competence</li>
                <li>Keep a portfolio of work and CPD to demonstrate your progression</li>
                <li>Consider specialising in growth areas like renewable energy or smart systems</li>
                <li>Network with professionals at trade events and through professional bodies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Career Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing to specialise</strong> - Build broad experience before narrowing your focus</li>
                <li><strong>Ignoring soft skills</strong> - Communication and teamwork matter as much as technical ability</li>
                <li><strong>Not keeping qualifications current</strong> - Let certifications lapse and you limit your options</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - ECS Card Categories</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Training Grades</p>
                <ul className="space-y-0.5">
                  <li>Red Card - Electrical Trainee (non-apprentice)</li>
                  <li>Blue Card - Apprentice Electrician</li>
                  <li>Green Card - Improver Electrician</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Qualified Grades</p>
                <ul className="space-y-0.5">
                  <li>Gold Card - Approved Electrician</li>
                  <li>Gold Card - Electrician (Technician)</li>
                  <li>Black Card - Manager/Supervisor grades</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1-2">
              Next: Self-employment vs Employment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module7Section1_1;
