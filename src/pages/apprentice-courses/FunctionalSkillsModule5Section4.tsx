import { ArrowLeft, ArrowRight, FolderOpen, FileText, Camera, PenLine, CheckCircle, Search, Award, Layers, UserCheck, ClipboardCheck } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule5Section4 = () => {
  useSEO(
    "Section 4: Portfolio Building & Evidence - Assessment Preparation",
    "Learn what assessors expect, types of evidence, photographic evidence, written evidence, witness testimonies, reflective accounts, organising your portfolio, and the portfolio checklist for UK electrical apprentices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of a portfolio in an apprenticeship?",
      options: [
        "To impress your employer with how much work you have done",
        "To provide documented evidence that you meet the assessment criteria and are competent",
        "To store all your paperwork in one place for convenience",
        "To replace the need for written exams"
      ],
      correctAnswer: 1,
      explanation: "A portfolio is a structured collection of evidence that demonstrates your skills, knowledge, and competence against specific assessment criteria. It provides documented proof that you can perform the required tasks to the required standard in real work situations."
    },
    {
      id: 2,
      question: "What is the STAR structure used for in reflective accounts?",
      options: [
        "Rating the quality of evidence from 1 to 5 stars",
        "Organising your account into Situation, Task, Action, Result",
        "A filing system for photographs",
        "An assessment grading scale used by external verifiers"
      ],
      correctAnswer: 1,
      explanation: "STAR stands for Situation, Task, Action, Result. It provides a clear structure for writing reflective accounts that demonstrate your competence by explaining the context, your role, what you did, and what the outcome was."
    },
    {
      id: 3,
      question: "What does 'cross-referencing evidence' mean in portfolio building?",
      options: [
        "Marking evidence with a red cross if it is not good enough",
        "Mapping each piece of evidence to the specific assessment criteria it covers",
        "Putting all evidence in alphabetical order",
        "Asking a colleague to check your portfolio for spelling errors"
      ],
      correctAnswer: 1,
      explanation: "Cross-referencing means linking each piece of evidence to the specific assessment criteria or learning outcomes it demonstrates. This shows the assessor exactly which requirements each piece of evidence satisfies, and helps you identify any gaps."
    },
    {
      id: 4,
      question: "Which principle is most important when selecting evidence for your portfolio?",
      options: [
        "Include as much evidence as possible to be thorough",
        "Only include the most recent evidence regardless of quality",
        "Choose quality evidence that clearly demonstrates competence, avoiding unnecessary duplication",
        "Only include certificates and formal qualifications"
      ],
      correctAnswer: 2,
      explanation: "Quality over quantity is the key principle. Assessors prefer a well-organised portfolio with strong, relevant evidence rather than a bulky folder full of duplicated or weak items. Each piece should clearly demonstrate a specific competency."
    },
    {
      id: 5,
      question: "What makes a witness statement valid for your portfolio?",
      options: [
        "A text message from a friend saying you did a good job",
        "A signed statement from a qualified supervisor describing specific tasks you performed, with their name, job title, and the date",
        "A verbal comment from your employer at a meeting",
        "A social media post about your work from a customer"
      ],
      correctAnswer: 1,
      explanation: "A valid witness statement must be signed by a qualified person (such as your supervisor or a competent colleague), include their name and job title, the date, and describe specific tasks you performed that demonstrate competence. It must be someone qualified to judge your work."
    },
    {
      id: 6,
      question: "When taking photographs as portfolio evidence, which of the following is most important?",
      options: [
        "Using a professional camera rather than a phone",
        "Including as many photos as possible of every task",
        "Ensuring photos are clear, well-lit, captioned with your role, and taken with permission",
        "Only photographing finished work, never work in progress"
      ],
      correctAnswer: 2,
      explanation: "Quality and context are essential. Photos must be clear and well-lit, include captions explaining what the photo shows and your role, and you must always have permission to photograph on site. Before, during, and after photos can all be valuable evidence."
    },
    {
      id: 7,
      question: "What is the most common reason portfolios are returned for additional work?",
      options: [
        "The portfolio is too neat and professional",
        "There are gaps in coverage — some assessment criteria are not evidenced",
        "The evidence is too varied in type",
        "The apprentice included too many reflective accounts"
      ],
      correctAnswer: 1,
      explanation: "The most common reason for portfolios being returned is gaps in coverage — where one or more assessment criteria have no evidence linked to them. Using a cross-referencing matrix and reviewing it regularly helps you identify and fill gaps before final submission."
    },
    {
      id: 8,
      question: "During an assessor visit, what should you be prepared to do?",
      options: [
        "Recite all the assessment criteria from memory",
        "Explain any piece of evidence in your portfolio, locate it quickly, and discuss your learning",
        "Present a formal PowerPoint presentation about your apprenticeship",
        "Show the assessor your social media posts about work"
      ],
      correctAnswer: 1,
      explanation: "Assessors may ask questions about any piece of evidence to confirm it is genuine and that you understand what you did. You should be able to quickly locate evidence using your index, explain it confidently, and discuss what you learned. They want to confirm your competence, not catch you out."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module5"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 5 • Section 4
            </p>
            <h1 className="text-base font-bold text-white">
              Portfolio Building & Evidence
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <FolderOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Portfolio Building & Evidence
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Build a comprehensive, well-organised portfolio of evidence that clearly demonstrates your functional skills competence to assessors and supports your apprenticeship completion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* 01 - What Assessors Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">What Assessors Expect</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Your portfolio is reviewed by an assessor whose job is to confirm that you are competent in your role. Understanding what they are looking for helps you build a portfolio that meets their expectations first time, avoiding delays and additional work.
            </p>
            <p>
              Assessors are experienced professionals who have reviewed hundreds of portfolios. They are not looking for perfection — they want to see genuine, authentic evidence that you can apply functional skills in real workplace situations. They want clarity, organisation, and evidence that covers every criterion.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">The Five Assessment Principles</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Valid</p>
                  <p className="text-xs text-white/70">Evidence must be relevant to the criteria being assessed. A photo of a completed installation is valid evidence of practical competence; a photo of your toolbox is not.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Authentic</p>
                  <p className="text-xs text-white/70">Evidence must be your own work. If questioned, you must be able to explain it in detail. Copied or fabricated evidence is a serious disciplinary matter.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Current</p>
                  <p className="text-xs text-white/70">Evidence should reflect your current level of competence. Work from several years ago may not demonstrate your present ability.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Sufficient</p>
                  <p className="text-xs text-white/70">There must be enough evidence to cover every assessment criterion. One piece of evidence may cover multiple criteria, but there must be no gaps.</p>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">What Assessors Look For</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Clear structure:</strong> A logical layout with a contents page, index, and dividers makes it easy to find evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Cross-referencing:</strong> A matrix linking each piece of evidence to the criteria it covers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Variety:</strong> A mix of evidence types — reflective accounts, work products, photographs, witness statements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Real-world context:</strong> Evidence drawn from genuine work activities, not artificial exercises</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Reflection:</strong> Accounts that show you understand what you did and why, not just that you followed instructions</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Assessors are on your side. Their job is to confirm your competence, not to catch you out. If your evidence is genuine and well-organised, the assessment process should be straightforward. Think of your assessor as someone who wants to help you succeed — because they do.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 02 - Types of Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Types of Evidence</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              There are many types of evidence you can include in your portfolio. Using a variety of evidence types creates a stronger, more convincing portfolio. Different types suit different criteria, so understanding what is available helps you match the right evidence to each requirement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-400 font-semibold text-xs">Certificates & Qualifications</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Functional Skills certificates (Level 1 or Level 2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Training course completion certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>CSCS/ECS card copies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>First aid, health and safety certificates</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-400 font-semibold text-xs">Work Products</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Completed job sheets and timesheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Risk assessments you have written</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Professional emails or reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Calculations (cable sizing, material quantities)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-400 font-semibold text-xs">Photographic Evidence</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Photos of completed work (with permission)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Before, during and after images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Captioned with your role and the date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Clear, well-lit and in focus</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PenLine className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-400 font-semibold text-xs">Reflective Accounts</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Written descriptions of tasks you performed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Shows understanding, not just ability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Use the STAR structure for consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>One of the most valuable evidence types</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-400 font-semibold text-xs">Witness Testimonies</h4>
                </div>
                <p className="text-xs text-white/70 mb-2">
                  Written statements from supervisors, colleagues, or clients confirming your competence in specific tasks. These are particularly valuable when direct observation by the assessor is not possible.
                </p>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Must include the witness's name, job title, date, and signature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Should describe specific tasks you performed in detail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>The witness must be someone qualified to judge your competence</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                A strong portfolio uses a variety of evidence types. Relying solely on one type (e.g., only reflective accounts or only photographs) creates a weaker portfolio. Aim for a balanced mix that includes at least three different evidence types to demonstrate your competence from multiple angles.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 02 */}
        <InlineCheck
          question="Name four different types of evidence you can include in your portfolio."
          answer="You can include: (1) Certificates and qualifications, (2) Work products (job sheets, risk assessments, emails, calculations), (3) Photographic evidence of completed work, (4) Reflective accounts using the STAR structure, (5) Witness testimonies from supervisors. Using a variety of types creates a stronger, more convincing portfolio."
        />

        {/* 03 - Photographic Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Photographic Evidence</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Photographs are powerful evidence because they provide visual proof of your work. However, a photograph without context is almost worthless — it needs to be captioned, dated, and linked to the skills it demonstrates. Here is how to take photographs that assessors will value.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Taking Good Evidence Photos</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Always ask permission:</strong> Before photographing on any site, ask the site manager or your supervisor. Some sites prohibit photography for security or client confidentiality reasons.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Before, during and after:</strong> Take photos at key stages of the work. A "before" photo shows the starting condition, "during" shows your work in progress, and "after" shows the completed result.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Good lighting:</strong> Ensure the subject is well-lit. Use the flash on your phone if needed. A dark, blurry photo is useless as evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Context and close-up:</strong> Take both a wide shot showing the overall installation and close-ups showing detail. The wide shot provides context; the close-up proves quality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">No people without consent:</strong> Avoid photographing colleagues or members of the public without their explicit consent.</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Captioning Your Photos</h4>
            <p>
              Every photograph in your portfolio must have a caption. Without a caption, the assessor has no way of knowing what the photo shows or what your involvement was.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-2">Example Photo Caption</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 space-y-1">
                <p><strong className="text-white">Date:</strong> 14 January 2026</p>
                <p><strong className="text-white">Location:</strong> Kitchen, 42 Oak Lane, Leeds</p>
                <p><strong className="text-white">Description:</strong> Completed consumer unit installation showing 10-way board with RCBO protection on all circuits</p>
                <p><strong className="text-white">My Role:</strong> I installed and wired the consumer unit under supervision of my qualified electrician. I terminated all circuit cables, labelled each circuit, and fitted the enclosure cover.</p>
                <p><strong className="text-white">Criteria covered:</strong> Unit 3, Criteria 3.2, 3.4</p>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Organising Photos</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Number each photo with a reference (e.g., Photo01, Photo02)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Print photos clearly if using a physical portfolio — colour is strongly preferred</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>For digital portfolios, create a folder structure by job or by criterion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Back up your photos immediately — losing them means losing evidence you cannot recreate</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Get into the habit of photographing your work as you go. Do not wait until the end of your apprenticeship to realise you have no photographic evidence from the first two years. Set a reminder to take photos at least twice a week — it takes 30 seconds and provides invaluable portfolio evidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 04 - Written Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Written Evidence</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Written evidence demonstrates both your practical competence and your communication skills — two things assessors are specifically looking for. Any written document you produce as part of your work can be valuable portfolio evidence, provided it is relevant to the assessment criteria.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">Types of Written Evidence</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Workplace Documents</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Job sheets and work orders</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Risk assessments and method statements</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Material order forms and delivery notes</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Test certificates and inspection reports</span></li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Communications</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Professional emails to customers or suppliers</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Reports to your supervisor</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Meeting notes you have written</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Safety briefing documents</span></li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Calculations</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Cable sizing calculations</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Material quantity estimates</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Cost calculations and quotes</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Measurement records</span></li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Digital Documents</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Spreadsheets you have created</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Presentations for toolbox talks</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Formatted letters or notices</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Screenshots of digital work</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Making Written Evidence Effective</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Annotate it:</strong> Add a brief note explaining what the document is, when you created it, and which criteria it covers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Remove sensitive information:</strong> Redact customer names, addresses, or financial details that are not relevant to the evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Show your contribution:</strong> If the document was a team effort, clearly indicate which parts were your work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Keep copies:</strong> Always keep a copy of any document you submit. Originals can be lost or damaged.</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Written evidence is particularly valuable for demonstrating functional skills because it directly shows your maths (calculations), English (emails, reports), and ICT (spreadsheets, formatted documents) abilities in a real workplace context. Every email you write professionally, every calculation you perform, and every document you create is potential portfolio evidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 04 */}
        <InlineCheck
          question="Why should you annotate written evidence before adding it to your portfolio?"
          answer="Annotations explain what the document is, when you created it, which parts were your work (if it was a team effort), and which assessment criteria it covers. Without annotations, the assessor may not understand the context or relevance of the document, which reduces its value as evidence."
        />

        {/* 05 - Witness Testimonies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Witness Testimonies</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Witness testimonies are written statements from people who have observed you working. They are valuable because they provide third-party confirmation of your competence — someone else vouching for your skills carries significant weight with assessors.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">Who Can Provide a Witness Testimony?</h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Your supervisor or line manager:</strong> The most common and most valued witness — they observe your work daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Qualified electricians you work with:</strong> Colleagues who can confirm your practical competence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Site managers:</strong> Can confirm your professionalism, communication, and adherence to site rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">College tutors:</strong> Can confirm your academic performance and classroom contributions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Clients (occasionally):</strong> Customer feedback letters can support evidence of professional communication</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">What Makes a Strong Witness Testimony</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-2">Example Template</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 space-y-2">
                <p><strong className="text-white">Witness Name:</strong> John Smith</p>
                <p><strong className="text-white">Job Title:</strong> Senior Electrician, ABC Electrical Ltd</p>
                <p><strong className="text-white">Date:</strong> 22 January 2026</p>
                <p><strong className="text-white">Statement:</strong> I can confirm that [apprentice name] competently assisted with the full rewire of a three-bedroom semi-detached property at [address]. They independently measured and calculated cable lengths for all circuits, producing an accurate material list. They correctly terminated cables at the consumer unit, ensuring all connections were tight and labelled correctly. Throughout the job, they communicated clearly with the customer about timescales and disruption. Their work was completed to the required standard with no remedial work needed.</p>
                <p><strong className="text-white">Criteria covered:</strong> Units 2 and 3, Criteria 2.1, 2.3, 3.2, 3.4</p>
                <p><strong className="text-white">Signature:</strong> [Signed]</p>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Tips for Getting Good Witness Testimonies</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ask promptly:</strong> Request the testimony while the work is fresh in the witness's mind — not months later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Make it easy:</strong> Provide a template or bullet points of what you would like them to comment on</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Be specific:</strong> Ask them to describe specific tasks, not just general praise. "They did a great job" is weak; "They accurately calculated cable lengths for six circuits" is strong.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Cross-reference:</strong> Include the criteria numbers the testimony covers to help your assessor</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Do not be afraid to ask for witness testimonies — most supervisors and colleagues are happy to help. It takes them only 5-10 minutes to write, and it provides you with powerful evidence that cannot be obtained any other way. The key is to ask while the work is still recent.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 06 - Reflective Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Reflective Accounts</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Reflective accounts are written descriptions of work activities that demonstrate your competence. They are one of the most important evidence types because they show your understanding and decision-making, not just your practical ability. A good reflective account proves you know what you did and why.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <PenLine className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">The STAR Structure</h4>
              </div>
              <p className="text-xs text-white/70 mb-3">
                Use STAR to structure every reflective account consistently:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">S -- Situation</p>
                  <p className="text-xs text-white/70">Describe where you were, what the job was, and the context. Include the type of property, location, and what work was required.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">T -- Task</p>
                  <p className="text-xs text-white/70">What specifically were you asked to do? What was your role? What skills did the task require?</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">A -- Action</p>
                  <p className="text-xs text-white/70">What did you actually do? Include details of tools, techniques, calculations, and decisions you made. This is the most important section.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">R -- Result</p>
                  <p className="text-xs text-white/70">What was the outcome? Was it successful? What did you learn? What would you do differently next time?</p>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Example Reflective Account</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 space-y-2">
                <p>
                  <strong className="text-green-400">Situation:</strong> I was working on a domestic rewire at a terraced house in Leeds. The job required calculating the total cable lengths needed for all circuits before ordering materials from the wholesaler.
                </p>
                <p>
                  <strong className="text-green-400">Task:</strong> I was asked to measure all cable runs and produce a material list with quantities and costs. I needed to measure each room, calculate cable runs including drops and rises, and add a 10% wastage allowance as per company policy.
                </p>
                <p>
                  <strong className="text-green-400">Action:</strong> I measured each room using a tape measure, recorded the dimensions in my notebook, and calculated the cable runs for each circuit. I used a spreadsheet on my phone to total the lengths and applied a 10% wastage factor. I then looked up cable prices from our supplier's catalogue and produced a material list totalling £342.50. I emailed this to my supervisor for approval before placing the order.
                </p>
                <p>
                  <strong className="text-green-400">Result:</strong> The material list was accurate and the order was placed the same day. We had enough cable for the full rewire with minimal waste — only 3 metres of twin and earth was left over. My supervisor confirmed the calculations were correct and said the material list was well-presented. I learned that measuring carefully at the start saves both time and money later, and that adding a wastage allowance is essential for avoiding delays.
                </p>
                <p className="text-white/50 italic">
                  Criteria covered: Functional Skills Maths L2 (2.3 — using measurements, 2.5 — multi-step calculations), English L2 (3.1 — professional written communication)
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                One detailed, well-structured reflective account is worth more than five brief ones. Aim for 300-500 words per account. Include specific details — what tools you used, what calculations you performed, what decisions you made. Generic statements like "I completed the work satisfactorily" do not demonstrate competence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 06 */}
        <InlineCheck
          question="In the STAR structure for reflective accounts, what does the 'A' stand for and why is it the most important section?"
          answer="The 'A' stands for Action — describing what you actually did, including the specific skills, tools, techniques, calculations, and decisions you used. It is the most important section because it directly demonstrates your competence. It shows the assessor not just that you were present, but that you actively performed the work and understood what you were doing."
        />

        {/* 07 - Organising Your Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Organising Your Portfolio</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A well-organised portfolio makes a strong impression on assessors and makes it easy for them to find the evidence they need. Poor organisation can lead to evidence being overlooked, criteria appearing to be uncovered, and unnecessary delays in your assessment.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Portfolio Structure</h4>
              </div>
              <p className="text-xs text-white/70 mb-3">
                A well-structured portfolio typically includes these sections in order:
              </p>
              <div className="space-y-2 text-xs text-white/70">
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">1.</span>
                  <span><strong className="text-white">Front cover:</strong> Your name, apprenticeship programme, training provider, and start date</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">2.</span>
                  <span><strong className="text-white">Contents page:</strong> List of all evidence with page numbers, updated as you add material</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">3.</span>
                  <span><strong className="text-white">Cross-referencing matrix:</strong> Table showing which evidence covers each assessment criterion</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">4.</span>
                  <span><strong className="text-white">Personal statement:</strong> Brief introduction about yourself, your role, and your apprenticeship goals</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">5.</span>
                  <span><strong className="text-white">Evidence sections:</strong> Organised by unit/module or by evidence type, with dividers</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
                  <span className="text-green-400 font-bold min-w-[24px]">6.</span>
                  <span><strong className="text-white">Certificates:</strong> Copies of all relevant certificates and qualifications</span>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Cross-Referencing Matrix</h4>
            <p>
              The cross-referencing matrix is the most important organisational tool in your portfolio. It is a simple table that maps each piece of evidence to the criteria it covers.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">How to Build a Matrix</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>List all assessment criteria in the left column</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>For each criterion, record which evidence item(s) cover it (e.g., "RA1" for Reflective Account 1, "WS3" for Witness Statement 3, "Photo07")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>One piece of evidence can cover multiple criteria — this reduces the total amount needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Any row with no evidence listed is a gap that needs filling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Update the matrix every time you add new evidence</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold text-xs mb-2">Digital Portfolios</h4>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Easy to reorganise and update</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Can include photos and videos directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Searchable — assessors can find evidence quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Use OneFile or your provider's e-portfolio system if available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Back up regularly to avoid losing everything</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold text-xs mb-2">Physical Portfolios</h4>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Use a sturdy ring binder with plastic wallets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Print photos clearly in colour if possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Use coloured divider tabs for each section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Keep originals safe — use copies in the portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>Type documents where possible for readability</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Update your portfolio regularly — ideally weekly. Set a recurring reminder to add new evidence, update your cross-referencing matrix, and check for gaps. It is much easier to maintain a portfolio throughout your apprenticeship than to build one from scratch in the final weeks before assessment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 08 - Portfolio Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Portfolio Checklist</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Before submitting your portfolio for assessment, use this comprehensive checklist to ensure everything is in order. Addressing these points before submission significantly reduces the chance of your portfolio being returned for additional work.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Pre-Submission Checklist</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All assessment criteria are covered with at least one piece of evidence</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Cross-referencing matrix is complete and up to date</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Contents page is accurate with correct page numbers</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All evidence is clearly labelled and dated</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Witness statements are signed, dated, with name and job title</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Reflective accounts use the STAR structure consistently</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Photographs are clear, captioned, and credited to your work</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>You can explain every piece of evidence if questioned by the assessor</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Sensitive information has been redacted where necessary</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>A variety of evidence types has been used (not just one type)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>No unnecessary duplication — quality over quantity throughout</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Portfolio is presentable, clean, and professionally organised</span>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Preparing for the Assessor Visit</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Know your evidence:</strong> Review your portfolio before the visit so everything is fresh in your mind</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Navigate quickly:</strong> Practise finding specific evidence using your index and cross-referencing matrix</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Be honest:</strong> If you cannot remember the details of something, say so — do not make things up</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Use technical language:</strong> Where appropriate, use the correct terminology — it demonstrates competence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Be professional:</strong> Treat the assessment as a professional meeting — be punctual, polite, and prepared</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Answering Assessor Questions</h4>
            <p>
              Assessors ask questions to confirm that the evidence is genuine and that you understand what you did. Common question types include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Can you tell me about this piece of evidence?" — Describe what the work was, what you did, and the outcome</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Why did you choose this approach?" — Explain your reasoning and any alternatives you considered</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"What would you do differently next time?" — Shows you can reflect and improve</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Can you show me the evidence for criterion X?" — Use your matrix to locate it quickly</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Your portfolio is a living document that grows with you throughout your apprenticeship. Start building it from day one, update it weekly, and review it regularly against the assessment criteria. By the time your final assessment arrives, you will have a comprehensive, well-organised portfolio that demonstrates your competence — and the assessment will feel like a formality rather than a hurdle.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Portfolio Building & Evidence Knowledge Check" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module5/section3"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Study Techniques
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module6"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Continue to Mock Exam
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule5Section4;