import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle, Monitor, HelpCircle, RefreshCw, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cscs-test-versions",
    question:
      "Which HS&E test version must a general construction labourer pass to obtain a CSCS card?",
    options: [
      "The Managers & Professionals test",
      "The Specialists test",
      "The Operatives test",
      "The Environmental Awareness test",
    ],
    correctIndex: 2,
    explanation:
      "General construction labourers, tradespeople, and most site workers must pass the Operatives HS&E test. This is the most common test version and is required for Green (labourer), Red (trainee/apprentice), Blue (skilled worker), and Gold (advanced craft) CSCS cards. The Managers & Professionals test is for supervisors, managers, and professionally qualified individuals.",
  },
  {
    id: "cscs-question-types",
    question:
      "What are the two types of question that appear in the HS&E test?",
    options: [
      "True/false questions and essay questions",
      "Knowledge questions (standard multiple choice) and behavioural case study questions (scenario-based)",
      "Oral questions and written questions",
      "Practical demonstration questions and theory questions",
    ],
    correctIndex: 1,
    explanation:
      "The HS&E test contains two question types: (1) Knowledge questions — standard multiple choice with one correct answer from four options, testing factual knowledge of regulations and procedures; and (2) Behavioural case study questions — scenario-based questions presenting a workplace situation where you must choose the most appropriate action, testing judgement and decision-making.",
  },
  {
    id: "cscs-pass-mark",
    question:
      "What is the approximate pass mark for the Operatives HS&E test, and what happens if you fail?",
    options: [
      "70% — you can re-sit the next day",
      "80% — you must wait 7 days before re-sitting",
      "90% (approximately 45 out of 50) — you must wait at least 2 clear working days before re-sitting",
      "100% — you cannot re-sit and must reapply from scratch",
    ],
    correctIndex: 2,
    explanation:
      "The pass mark for the Operatives test is approximately 90% (around 45 out of 50). If you fail, you must wait at least 2 clear working days before booking a re-sit. You can re-sit as many times as needed — there is no limit on attempts. Test results are valid for 2 years from the date of passing.",
  },
];

const faqs = [
  {
    question: "How long does the HS&E test take and how many questions are there?",
    answer:
      "All versions of the HS&E test (Operatives, Specialists, and Managers & Professionals) consist of 50 questions to be completed within 45 minutes. The test is delivered on a touch-screen computer at a Pearson VUE test centre. You can navigate forward and backward through questions, flag questions for review, and check your answers before submitting. Results are displayed immediately on screen when you finish.",
  },
  {
    question: "What is the difference between knowledge questions and behavioural case study questions?",
    answer:
      "Knowledge questions are standard multiple choice — you are given a factual question with four options and must select the one correct answer. These test your understanding of regulations, procedures, and safety practices. Behavioural case study questions present a realistic workplace scenario (sometimes with images) and ask you to choose the most appropriate action. These test your judgement and decision-making ability, not just factual recall. Case study questions may carry more marks than standard knowledge questions.",
  },
  {
    question: "How often does CITB update the HS&E test questions?",
    answer:
      "CITB periodically updates the question bank to reflect changes in legislation, industry practice, and emerging risks. Recent updates have included questions on mental health awareness, updated CDM 2015 content, environmental sustainability, modern slavery awareness, and digital/technology-related hazards. Because the question bank is regularly refreshed, it is essential to use the most current revision materials. Older textbooks and apps may contain questions that have been removed or changed.",
  },
  {
    question: "Can I re-sit the HS&E test if I fail, and how long are results valid?",
    answer:
      "Yes, you can re-sit the test as many times as needed — there is no limit on attempts. However, you must wait at least 2 clear working days before booking another sitting. Each re-sit requires a new booking and payment. Once you pass, your test result is valid for 2 years from the date of passing. You must apply for your CSCS card within this 2-year window. If the result expires before you apply, you will need to re-take and pass the test again.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "How many questions are in the Operatives HS&E test and how long do candidates have to complete it?",
    options: [
      "30 questions in 30 minutes",
      "40 questions in 40 minutes",
      "50 questions in 45 minutes",
      "60 questions in 60 minutes",
    ],
    correctAnswer: 2,
    explanation:
      "The Operatives HS&E test consists of 50 questions to be answered within 45 minutes. This is the same format for the Specialists and Managers & Professionals tests — all versions have 50 questions in 45 minutes, though the content and difficulty vary.",
  },
  {
    id: 2,
    question:
      "Which of the following CSCS card types does NOT require the Operatives HS&E test?",
    options: [
      "Green labourer card",
      "Blue skilled worker card",
      "Black manager card",
      "Gold advanced craft card",
    ],
    correctAnswer: 2,
    explanation:
      "The Black manager card requires the Managers & Professionals HS&E test, not the Operatives test. Green (labourer), Blue (skilled worker), and Gold (advanced craft) cards all require the Operatives test. The Managers & Professionals test covers additional topics such as CDM 2015, health and safety management systems, and legal responsibilities.",
  },
  {
    id: 3,
    question:
      "What type of question presents a workplace scenario and asks you to choose the most appropriate action?",
    options: [
      "A knowledge question",
      "A behavioural case study question",
      "A practical assessment question",
      "A regulatory citation question",
    ],
    correctAnswer: 1,
    explanation:
      "Behavioural case study questions present a realistic workplace scenario — sometimes with an accompanying image — and ask the candidate to choose the most appropriate course of action. These questions test judgement and decision-making rather than simple factual recall. They are a key component of the HS&E test and may carry more marks than standard knowledge questions.",
  },
  {
    id: 4,
    question:
      "Where is the HS&E test taken and on what type of equipment?",
    options: [
      "At a college on a desktop computer with keyboard and mouse",
      "At a Pearson VUE test centre on a touch-screen computer",
      "Online from home on any internet-connected device",
      "At the CITB head office on paper with a pencil",
    ],
    correctAnswer: 1,
    explanation:
      "The HS&E test is taken at a Pearson VUE test centre on a touch-screen computer. Candidates tap their answer from four on-screen options for each question. Test centres are located across the UK. Online or home-based testing is not available for the HS&E test — it must be taken in person at a registered centre.",
  },
  {
    id: 5,
    question:
      "What is the minimum waiting period before a candidate can re-sit the HS&E test after failing?",
    options: [
      "24 hours",
      "2 clear working days",
      "7 calendar days",
      "14 calendar days",
    ],
    correctAnswer: 1,
    explanation:
      "Candidates who fail the HS&E test must wait at least 2 clear working days before they can book and sit the test again. There is no limit on the number of re-sits, but each attempt requires a new booking and payment. The waiting period gives candidates time to revise and address gaps in their knowledge before trying again.",
  },
  {
    id: 6,
    question:
      "Which of the following topics is covered in the Managers & Professionals test but NOT typically in the Operatives test?",
    options: [
      "Manual handling techniques",
      "CDM 2015 regulations and health and safety management systems",
      "Personal protective equipment (PPE)",
      "Fire safety on construction sites",
    ],
    correctAnswer: 1,
    explanation:
      "The Managers & Professionals HS&E test includes additional management-level topics such as CDM 2015 (Construction Design and Management Regulations), health and safety management systems, accident investigation, and legal responsibilities of duty holders. Topics like manual handling, PPE, and fire safety appear in all test versions including the Operatives test.",
  },
  {
    id: 7,
    question:
      "What approximate percentage of candidates fail the HS&E test on their first attempt?",
    options: [
      "5% (1 in 20)",
      "10% (1 in 10)",
      "20% (1 in 5)",
      "40% (2 in 5)",
    ],
    correctAnswer: 2,
    explanation:
      "The pass rate for the HS&E test is around 80%, meaning approximately 20% — or 1 in 5 — candidates fail on their first attempt. Many people underestimate the test, assuming it will be straightforward. Adequate preparation using current revision materials is essential. Common reasons for failure include not reading questions carefully, rushing, and not preparing for behavioural case study questions.",
  },
  {
    id: 8,
    question:
      "For how long is a passed HS&E test result valid, and what happens if it expires before you apply for a CSCS card?",
    options: [
      "1 year — you receive a partial refund on the card application",
      "2 years — you must re-take and pass the test again before applying",
      "5 years — the result automatically transfers to CSCS",
      "Indefinitely — once passed, it never expires",
    ],
    correctAnswer: 1,
    explanation:
      "A passed HS&E test result is valid for 2 years from the date of passing. You must apply for your CSCS card within this window. If the result expires before you submit your card application, you will need to re-take and pass the HS&E test again. CITB does not offer extensions to the validity period.",
  },
];

export default function CscsCardModule1Section3() {
  useSEO({
    title: "The HS&E Test Format | CSCS Card Module 1.3",
    description:
      "HS&E test structure, question types, behavioural case studies, touch-screen format, 50 questions in 45 minutes, pass marks, scoring, topic coverage, and common pitfalls.",
  });

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
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The HS&amp;E Test Format
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Everything you need to know about the CITB Health, Safety and Environment test &mdash; test
            versions, question types, delivery format, pass marks, topic coverage, and how to avoid
            common pitfalls
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>50 questions</strong> in <strong>45 minutes</strong> on a touch-screen
              </li>
              <li>
                <strong>~90% pass mark</strong> (approx. 45/50 for Operatives)
              </li>
              <li>
                <strong>2 question types:</strong> knowledge + behavioural case studies
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Taken at:</strong> Pearson VUE test centres across the UK
              </li>
              <li>
                <strong>Results:</strong> Displayed immediately on screen
              </li>
              <li>
                <strong>Validity:</strong> 2 years from the date of passing
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the purpose of the HS&E test and who must take it",
              "Identify the different test versions and which cards they apply to",
              "Explain the two question types and how they are scored",
              "Describe the test delivery format at Pearson VUE centres",
              "State the pass marks, re-sit rules, and result validity periods",
              "List the main topic areas covered in the Operatives and Managers tests",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Overview of the HS&E Test */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Overview of the HS&amp;E Test
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The CITB <strong>Health, Safety and Environment (HS&amp;E) test</strong> is the exam all
                workers must pass to obtain a CSCS card. It is delivered at{" "}
                <strong>Pearson VUE test centres</strong> across the UK. The test assesses your
                knowledge of health, safety, and environmental topics relevant to construction.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Key Definition &mdash; HS&amp;E Test
                </p>
                <p className="text-sm text-white">
                  The HS&amp;E test is a computer-based examination administered by CITB and delivered
                  through the Pearson VUE network. It is the mandatory entry requirement for all CSCS
                  card applications. Without a valid HS&amp;E test pass, you cannot apply for a CSCS
                  card &mdash; and without a CSCS card, you cannot access the vast majority of UK
                  construction sites.
                </p>
              </div>

              <p>
                There are <strong>different test versions</strong> depending on your role in the
                construction industry. Each version is tailored to the responsibilities and hazards
                associated with that role. The three main versions are: Operatives, Specialists, and
                Managers &amp; Professionals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">Why Does the HS&amp;E Test Exist?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      To ensure every person entering a construction site has a{" "}
                      <strong>baseline understanding</strong> of health, safety, and environmental risks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      To reduce <strong>accidents, injuries, and fatalities</strong> in the construction
                      industry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      To verify that workers understand their <strong>legal duties</strong> and can
                      identify common hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      To provide <strong>evidence to clients and principal contractors</strong> that
                      workers are competent in health and safety
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Test Versions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Test Versions
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are three main versions of the HS&amp;E test. The version you need depends on the
                CSCS card you are applying for, which in turn depends on your role and qualifications.
                Each version draws questions from a large bank, so{" "}
                <strong>every sitting is different</strong> &mdash; you will not get the same questions
                as another candidate.
              </p>

              {/* Test Versions Comparison Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-green-300">
                    HS&amp;E Test Versions at a Glance
                  </p>
                </div>

                {/* Operatives */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                        OPERATIVES
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-2">
                        For general construction workers, labourers, and tradespeople. This is the most
                        common test version and is required for{" "}
                        <strong>Green, Red, Blue, and Gold</strong> CSCS cards.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-green-400 font-medium">Questions</p>
                          <p className="text-sm text-white font-bold">50</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-green-400 font-medium">Time Limit</p>
                          <p className="text-sm text-white font-bold">45 mins</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-green-400 font-medium">Pass Mark</p>
                          <p className="text-sm text-white font-bold">~45/50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialists */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                        SPECIALISTS
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-2">
                        For workers in specialist roles such as demolition, highway works, and plant
                        operation. Contains{" "}
                        <strong>additional specialist content</strong> relevant to the role.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-blue-400 font-medium">Questions</p>
                          <p className="text-sm text-white font-bold">50</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-blue-400 font-medium">Time Limit</p>
                          <p className="text-sm text-white font-bold">45 mins</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-blue-400 font-medium">Pass Mark</p>
                          <p className="text-sm text-white font-bold">~45/50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Managers & Professionals */}
                <div className="p-4">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 text-xs font-bold">
                        MANAGERS
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-2">
                        For managers, supervisors, and professionally qualified individuals. Includes{" "}
                        <strong>management responsibilities, CDM 2015, and legal duties</strong> in
                        addition to general safety topics. Required for{" "}
                        <strong>Black</strong> and <strong>White</strong> CSCS cards.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-purple-400 font-medium">Questions</p>
                          <p className="text-sm text-white font-bold">50</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-purple-400 font-medium">Time Limit</p>
                          <p className="text-sm text-white font-bold">45 mins</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-purple-400 font-medium">Pass Mark</p>
                          <p className="text-sm text-white font-bold">~46/50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Important Note</p>
                <p className="text-sm text-white/80">
                  Each test draws from a large <strong>question bank</strong> maintained by CITB. This
                  means no two sittings are identical. You cannot predict which specific questions will
                  appear &mdash; you must have a thorough understanding of all the topics covered. Simply
                  memorising answers from a practice app is not a reliable strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Question Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Question Types
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HS&amp;E test contains <strong>two types of question</strong>. Understanding the
                difference between them is crucial for effective preparation, because each type requires
                a different approach.
              </p>

              {/* Question Types Comparison Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-green-300">
                    Question Types Comparison
                  </p>
                </div>
                <div className="grid md:grid-cols-2">
                  {/* Knowledge Questions */}
                  <div className="p-4 border-b md:border-b-0 md:border-r border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                        TYPE 1
                      </span>
                      <p className="text-sm font-medium text-white">Knowledge Questions</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Standard multiple choice with <strong>one correct answer</strong> from four options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Cover <strong>factual knowledge</strong> about regulations, procedures, and safety practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Test <strong>recall and understanding</strong> of specific rules and requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Example: &ldquo;What colour is the prohibition sign used on construction sites?&rdquo;</span>
                      </li>
                    </ul>
                  </div>

                  {/* Behavioural Case Studies */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                        TYPE 2
                      </span>
                      <p className="text-sm font-medium text-white">Behavioural Case Studies</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span>Scenario-based questions presenting a <strong>workplace situation</strong> (sometimes with images)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span>You must choose the <strong>most appropriate action</strong> from four options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span>Test <strong>judgement and decision-making</strong>, not just knowledge recall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span>Example: &ldquo;You notice a colleague not wearing a harness at height. What should you do?&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Mistake</p>
                </div>
                <p className="text-sm text-white/80">
                  Many candidates prepare only for knowledge questions and neglect behavioural case
                  studies. Case study questions can be more challenging because multiple options may seem
                  reasonable &mdash; you must identify the <strong>most appropriate</strong> action, not
                  just a correct-sounding one. Pay close attention to words like &ldquo;MOST
                  appropriate&rdquo;, &ldquo;FIRST thing you should do&rdquo;, and &ldquo;BEST course of
                  action&rdquo;.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Tips for Behavioural Case Studies</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Read the entire scenario carefully</strong> &mdash; do not skim. Details in
                      the scenario often determine the correct answer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Consider safety first</strong> &mdash; the correct answer almost always
                      prioritises preventing harm over continuing work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Look for the &ldquo;stop and report&rdquo; option</strong> &mdash; if a
                      serious hazard is described, the correct action usually involves stopping work and
                      reporting it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Eliminate obviously wrong answers</strong> &mdash; options like &ldquo;carry
                      on working&rdquo; or &ldquo;ignore it&rdquo; are almost always incorrect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Think about what a competent, responsible worker would do</strong> &mdash;
                      not what might happen in reality on a busy site
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Test Delivery & Format */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Test Delivery &amp; Format
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HS&amp;E test is taken on a <strong>touch-screen computer</strong> at a Pearson VUE
                test centre. The test cannot be taken online or remotely &mdash; you must attend a
                registered centre in person. Pearson VUE centres are located in towns and cities across
                the UK, and you book your test slot in advance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">How the Test Works</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      step: "Question Display",
                      detail:
                        "Each question appears on screen with four options. You tap your chosen answer to select it. You can change your answer before moving on.",
                    },
                    {
                      step: "Navigation",
                      detail:
                        "You can move forward and backward through questions at any time. There is no penalty for going back and changing an answer.",
                    },
                    {
                      step: "Flagging",
                      detail:
                        "You can flag any question you are unsure about. Flagged questions are highlighted so you can return to them before submitting.",
                    },
                    {
                      step: "Timer",
                      detail:
                        "A countdown timer on screen shows your remaining time. It starts at 45 minutes and counts down to zero.",
                    },
                    {
                      step: "Review Screen",
                      detail:
                        "Before submitting, a review screen shows all questions. You can see which are answered, which are flagged, and which are unanswered.",
                    },
                    {
                      step: "Results",
                      detail:
                        "Results are displayed immediately on screen when you submit. You will know whether you have passed or failed straight away.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">{item.step}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Test Day Essentials</p>
                <p className="text-sm text-white/80 mb-3">
                  You must bring <strong>valid photo identification</strong> to the test centre. Accepted
                  forms of ID include a valid passport, UK driving licence (photocard), or biometric
                  residence permit. Without valid ID, you will not be allowed to sit the test and will
                  lose your fee.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Arrive at least <strong>15 minutes early</strong> to complete registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Personal belongings (phone, bag, watch) must be stored in a <strong>locker</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>No notes, books, or electronic devices are allowed in the test room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>A <strong>practice tutorial</strong> is provided before the test begins so you can familiarise yourself with the touch-screen interface</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">Accessibility &amp; Support</p>
                </div>
                <p className="text-sm text-white/80">
                  If you have a learning difficulty, disability, or English is not your first language, you
                  may be eligible for <strong>additional support</strong>. This can include extra time,
                  a voiceover (the questions are read aloud through headphones), or a translated version
                  of the test in certain languages. Contact CITB before booking to discuss your needs
                  and arrange appropriate support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Pass Marks & Scoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Pass Marks &amp; Scoring
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The pass mark varies slightly between test versions but is typically around{" "}
                <strong>90%</strong>. For the Operatives test, this means scoring approximately{" "}
                <strong>45 out of 50</strong>. This is a high threshold &mdash; you can only afford to
                get around 5 questions wrong.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Scoring Details</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      item: "Weighted Questions",
                      detail:
                        "Some questions carry more marks than others. Behavioural case study questions may be weighted more heavily than standard knowledge questions.",
                    },
                    {
                      item: "Pass or Fail",
                      detail:
                        "You either pass or fail — there is no graded score, no distinction, and no percentage breakdown by topic area. The result is simply pass or fail.",
                    },
                    {
                      item: "Re-sit Waiting Period",
                      detail:
                        "If you fail, you must wait at least 2 clear working days before re-sitting. Each re-sit requires a new booking and payment.",
                    },
                    {
                      item: "Unlimited Re-sits",
                      detail:
                        "There is no limit on the number of times you can re-sit the test. You can keep trying until you pass, though each attempt costs money.",
                    },
                    {
                      item: "Result Validity",
                      detail:
                        "Test results are valid for 2 years from the date of passing. You must apply for your CSCS card within this 2-year window.",
                    },
                    {
                      item: "No Partial Credit",
                      detail:
                        "There is no partial credit — each question is marked as correct or incorrect. Unanswered questions are marked as incorrect.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">{item.item}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Do Not Leave Questions Blank</p>
                </div>
                <p className="text-sm text-white/80">
                  Unanswered questions are marked as incorrect, so there is{" "}
                  <strong>no penalty for guessing</strong>. If you are running out of time, it is
                  always better to select an answer (even if you are unsure) than to leave a question
                  blank. With four options, a guess gives you a 25% chance &mdash; leaving it blank
                  gives you 0%.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Time Management Strategy</p>
                <p className="text-sm text-white/80">
                  With 50 questions in 45 minutes, you have less than <strong>1 minute per
                  question</strong> on average. Do not spend too long on any single question. If you are
                  unsure, <strong>flag it and move on</strong>. Answer all the questions you are
                  confident about first, then return to the flagged ones with your remaining time.
                  This strategy ensures you do not miss easy marks at the end because you ran out of
                  time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Topic Coverage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Topic Coverage
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HS&amp;E test covers a broad range of health, safety, and environmental topics. The
                exact mix of questions varies between sittings, but all the following topic areas may
                appear. You need a solid understanding of <strong>all</strong> these areas &mdash; not
                just the ones you encounter most in your daily work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Operatives Test &mdash; Core Topic Areas
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      General Safety
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Risk assessment and method statements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Personal protective equipment (PPE)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Manual handling operations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Working at height regulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Safety signs and signals</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Specialist Topics
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Asbestos awareness and management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>COSHH (Control of Substances Hazardous to Health)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Noise and vibration exposure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Hand-arm vibration syndrome (HAVS)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Dust and respiratory hazards</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Site-Specific Topics
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Excavations and trenching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Confined space entry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Fire prevention and emergency procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Electrical safety on site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Demolition and structural stability</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Environmental Topics
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Waste management and disposal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Water pollution prevention</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Energy efficiency and sustainability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Noise and nuisance to neighbours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Protection of wildlife and habitats</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Additional Topics for Managers &amp; Professionals
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The Managers &amp; Professionals test includes all the Operatives topics plus
                  additional management-level content:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "CDM 2015 — Construction (Design and Management) Regulations",
                    "Health and safety management systems (Plan, Do, Check, Act)",
                    "Accident investigation and root cause analysis",
                    "Legal responsibilities of duty holders (client, designer, principal contractor)",
                    "Risk assessment methodologies and hierarchy of controls",
                    "Consultation with the workforce and safety representatives",
                    "Monitoring and auditing health and safety performance",
                    "Welfare provisions and site facilities requirements",
                  ].map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Behavioural &amp; Case Study Scenarios</p>
                <p className="text-sm text-white/80">
                  In addition to the topic-specific knowledge questions, all test versions include{" "}
                  <strong>behavioural case study scenarios</strong>. These present realistic construction
                  situations and ask what you would do. Scenarios may involve discovering an unsafe
                  condition, witnessing a colleague taking a shortcut, encountering an unknown substance,
                  or deciding whether to proceed with a task when conditions change. These questions can
                  relate to <strong>any</strong> of the topic areas above.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Common Pitfalls & Misconceptions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Common Pitfalls &amp; Misconceptions
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many candidates underestimate the HS&amp;E test. The pass rate is around{" "}
                <strong>80%</strong>, meaning <strong>1 in 5 candidates fail</strong> on their first
                attempt. Understanding the common pitfalls can help you avoid becoming one of them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Top Reasons Candidates Fail
                </p>
                <div className="space-y-3">
                  {[
                    {
                      pitfall: "Not reading questions carefully",
                      detail:
                        "Many questions include words like 'MOST appropriate', 'FIRST thing to do', or 'LEAST likely'. Missing these qualifiers leads to selecting a plausible but incorrect answer.",
                    },
                    {
                      pitfall: "Rushing through without flagging",
                      detail:
                        "Candidates who race through the test without flagging uncertain questions often make avoidable mistakes. Use the flag feature — you have 45 minutes, which is enough time if managed well.",
                    },
                    {
                      pitfall: "Confusing similar regulations",
                      detail:
                        "Mixing up regulations (e.g., confusing COSHH with RIDDOR, or the Work at Height Regulations with the Lifting Operations Regulations) is a common source of errors. Learn the key distinctions.",
                    },
                    {
                      pitfall: "Not understanding legal duties vs best practice",
                      detail:
                        "Some answers describe best practice, while others describe legal requirements. The test may ask specifically what the law requires — a best-practice answer may not be the correct one.",
                    },
                    {
                      pitfall: "Overlooking environmental questions",
                      detail:
                        "Candidates often focus heavily on safety topics and neglect environmental questions about waste management, water pollution, and energy. These topics carry marks too.",
                    },
                    {
                      pitfall: "Not preparing for behavioural case studies",
                      detail:
                        "Knowledge-only revision is not enough. You must practise interpreting scenarios and choosing the most appropriate action. Case study questions can carry more marks.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-400 mb-1">{item.pitfall}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Misconceptions</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                    <span>
                      <strong>&ldquo;I&apos;ve worked on sites for years &mdash; I don&apos;t need to
                      revise&rdquo;</strong> &mdash; Experience helps, but the test covers regulations
                      and procedures that many experienced workers have never formally studied
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                    <span>
                      <strong>&ldquo;It&apos;s just common sense&rdquo;</strong> &mdash; Many questions
                      test specific knowledge of regulations, not general common sense. You need to know
                      specific rules, numbers, and procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                    <span>
                      <strong>&ldquo;A practice app is all I need&rdquo;</strong> &mdash; Practice apps
                      are helpful, but the real test draws from a much larger question bank. Apps give you
                      familiarity with the format, not coverage of all possible questions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                    <span>
                      <strong>&ldquo;If I fail, I can just re-sit tomorrow&rdquo;</strong> &mdash; You
                      must wait at least 2 clear working days, and you will need to pay again. Each
                      failed attempt costs time and money
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">The Right Mindset</p>
                <p className="text-sm text-white/80">
                  Treat the HS&amp;E test as a genuine examination, not a formality. Allocate proper
                  study time (most successful candidates revise for at least{" "}
                  <strong>2&ndash;3 weeks</strong> before their test date), use current revision
                  materials, and practise both knowledge questions and behavioural scenarios. The 90%
                  pass mark means you have very little margin for error &mdash; thorough preparation is
                  the best investment you can make.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Changes & Updates to the HS&E Test */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Changes &amp; Updates to the HS&amp;E Test
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CITB periodically updates the HS&amp;E test question bank to reflect changes in
                legislation, industry practice, and newly recognised risks. The test is a living
                document &mdash; it evolves as the construction industry evolves.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">Recent &amp; Ongoing Updates</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      area: "Mental Health Awareness",
                      detail:
                        "Greater emphasis on recognising signs of poor mental health in colleagues, stress, and wellbeing on construction sites. The construction industry has one of the highest suicide rates of any sector.",
                    },
                    {
                      area: "CDM 2015 Updates",
                      detail:
                        "Updated questions reflecting the Construction (Design and Management) Regulations 2015, including the roles of clients, principal designers, and principal contractors.",
                    },
                    {
                      area: "Environmental Sustainability",
                      detail:
                        "New questions on reducing carbon emissions, sustainable construction practices, responsible sourcing of materials, and minimising environmental impact on site.",
                    },
                    {
                      area: "Modern Slavery Awareness",
                      detail:
                        "Questions about recognising the signs of modern slavery and labour exploitation on construction sites, and knowing how to report concerns.",
                    },
                    {
                      area: "Digital & Technology Hazards",
                      detail:
                        "Emerging topics including the safe use of drones on construction sites, risks associated with autonomous plant, and cybersecurity considerations for smart buildings.",
                    },
                    {
                      area: "Building Safety Act 2022",
                      detail:
                        "New legal requirements introduced by the Building Safety Act, including the roles of accountable persons and the obligations around higher-risk buildings.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">{item.area}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Use Current Revision Materials Only
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Because the question bank is regularly updated, <strong>older revision
                  materials may contain outdated information</strong>. A textbook or app from even two
                  years ago may include questions that have been removed or answers that are no longer
                  correct due to legislative changes. Always check that your revision materials are based
                  on the <strong>most current version</strong> of the HS&amp;E test. The CITB website
                  and the official CITB revision materials are the most reliable sources.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">
                  How to Stay Up to Date
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>CITB website</strong> &mdash; Check the official CITB HS&amp;E test pages
                      for announcements about changes to the test format or content
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Official revision materials</strong> &mdash; Use the CITB&apos;s own
                      revision resources, which are updated whenever the question bank changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Check publication dates</strong> &mdash; When using any third-party revision
                      book or app, check when it was last updated. Avoid anything more than 12 months old
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>HSE website</strong> &mdash; Changes to health and safety legislation are
                      published on the HSE website. Major legislative changes are typically reflected in the
                      HS&amp;E test within 6&ndash;12 months
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Takeaway
                </p>
                <p className="text-sm text-white/80">
                  The HS&amp;E test is not a static exam &mdash; it reflects the current state of health
                  and safety law and best practice in the UK construction industry. Treating it as a
                  one-time hurdle that never changes is a mistake. If you are renewing your CSCS card
                  after several years, you should <strong>revise afresh</strong> using the latest
                  materials rather than relying on what you learned for your previous test.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HS&E Test Structure Diagram */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 rounded-xl p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              HS&amp;E Test Structure
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4 text-center border border-green-500/20">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 mb-2">
                  <span className="text-green-400 text-sm font-bold">OP</span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">Operatives</p>
                <p className="text-xs text-white/60 mb-2">Labourers &amp; Tradespeople</p>
                <div className="space-y-1">
                  <p className="text-xs text-green-400">50 questions &middot; 45 mins</p>
                  <p className="text-xs text-white/50">Pass: ~45/50 (90%)</p>
                  <p className="text-xs text-white/50">Green, Red, Blue, Gold cards</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center border border-blue-500/20">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 mb-2">
                  <span className="text-blue-400 text-sm font-bold">SP</span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">Specialists</p>
                <p className="text-xs text-white/60 mb-2">Demolition, Plant, Highway</p>
                <div className="space-y-1">
                  <p className="text-xs text-blue-400">50 questions &middot; 45 mins</p>
                  <p className="text-xs text-white/50">Pass: ~45/50 (90%)</p>
                  <p className="text-xs text-white/50">Specialist role cards</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center border border-purple-500/20">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 mb-2">
                  <span className="text-purple-400 text-sm font-bold">MP</span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">Managers</p>
                <p className="text-xs text-white/60 mb-2">Supervisors &amp; Professionals</p>
                <div className="space-y-1">
                  <p className="text-xs text-purple-400">50 questions &middot; 45 mins</p>
                  <p className="text-xs text-white/50">Pass: ~46/50 (92%)</p>
                  <p className="text-xs text-white/50">Black, White cards</p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-green-400 font-medium mb-1">Delivery</p>
                <p className="text-xs text-white/70">
                  Touch-screen computer at Pearson VUE centres. Questions drawn from a rotating
                  bank &mdash; every sitting is different.
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-green-400 font-medium mb-1">Validity</p>
                <p className="text-xs text-white/70">
                  Results valid for 2 years. Re-sit after 2 clear working days if failed. Unlimited
                  re-sits allowed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Question Types Comparison Diagram */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 rounded-xl p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Question Types Comparison
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <span className="text-green-400 text-xs font-bold">K</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Knowledge Questions</p>
                </div>
                <ul className="text-xs text-white/70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Standard multiple choice format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>One correct answer from four options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Tests factual recall and understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Covers regulations, procedures, definitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Preparation: study revision guides, learn key facts</span>
                  </li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-bold">B</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Behavioural Case Studies</p>
                </div>
                <ul className="text-xs text-white/70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Scenario-based with workplace situations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>May include images or diagrams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Tests judgement and decision-making</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Often asks for the &ldquo;MOST appropriate&rdquo; action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Preparation: practise scenarios, think critically</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-black/20 rounded-lg p-3 border border-white/5 text-center">
              <p className="text-xs text-white/60">
                Behavioural case study questions may carry <strong className="text-green-400">more marks</strong> than
                standard knowledge questions &mdash; do not underestimate them during revision.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-1-section-4">
              Next: Booking, Preparation &amp; Study Tips
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
