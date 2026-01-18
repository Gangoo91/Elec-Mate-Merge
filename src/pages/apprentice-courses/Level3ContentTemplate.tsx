/**
 * LEVEL 3 CONTENT PAGE TEMPLATE
 *
 * This file serves as the definitive design reference for all Level 3 course content.
 * Copy this structure exactly when creating new subsection pages.
 *
 * Design matches: Module2Section1_1.tsx (Level 2 Module 2)
 *
 * Mobile Optimisations:
 * - Touch targets: min-h-[44px] minimum
 * - Touch manipulation: touch-manipulation class
 * - Active states: active:scale-[0.98]
 * - Single column mobile, 2-col on sm+
 * - Readable font sizes (text-sm minimum)
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
const TITLE = "[Section Title] - Level 3 Module [X] Section [Y.Z]";
const DESCRIPTION = "[Clear, informative description for search engines - max 160 chars]";

// ============================================
// INLINE CHECK QUESTIONS (3-4 per page)
// Placed after each major content section
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "[Question text - concise, tests understanding]",
    options: [
      "[Option A]",
      "[Option B - correct answer]",
      "[Option C]",
      "[Option D]"
    ],
    correctIndex: 1,
    explanation: "[Brief explanation that teaches, not just confirms]"
  },
  {
    id: "check-2",
    question: "[Question 2]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctIndex: 0,
    explanation: "[Explanation]"
  },
  {
    id: "check-3",
    question: "[Question 3]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctIndex: 2,
    explanation: "[Explanation]"
  },
  {
    id: "check-4",
    question: "[Question 4]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctIndex: 1,
    explanation: "[Explanation]"
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// Comprehensive assessment at end of page
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "[Quiz question 1]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctAnswer: 0,
    explanation: "[Detailed explanation]"
  },
  {
    id: 2,
    question: "[Quiz question 2]",
    options: ["[A]", "[B]", "[C]", "[D]"],
    correctAnswer: 1,
    explanation: "[Detailed explanation]"
  },
  // ... questions 3-10
];

// ============================================
// FAQ DATA (4-6 questions)
// ============================================
const faqs = [
  {
    question: "[Common question 1]",
    answer: "[Clear, practical answer that addresses the question fully]"
  },
  {
    question: "[Common question 2]",
    answer: "[Answer]"
  },
  // ... more FAQs
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3ContentTemplate = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER - Minimal back navigation
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
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
            HEADER - Centered title with badge
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module X.Y.Z</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            [Page Title]
          </h1>
          <p className="text-white/80">
            [Subtitle - one line describing the content]
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            In 30 Seconds + Spot it / Use it
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key Point 1:</strong> [Brief explanation]</li>
              <li><strong>Key Point 2:</strong> [Brief explanation]</li>
              <li><strong>Key Point 3:</strong> [Brief explanation]</li>
              <li><strong>Key Point 4:</strong> [Brief explanation]</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> [What to look for on site]</li>
              <li><strong>Use:</strong> [How to apply this knowledge]</li>
              <li><strong>Apply:</strong> [Practical application]</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            What You'll Learn section
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Learning outcome 1",
              "Learning outcome 2",
              "Learning outcome 3",
              "Learning outcome 4",
              "Learning outcome 5",
              "Learning outcome 6"
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
            [Section 1 Title]
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              [Main content paragraph - explain the concept clearly]
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">[Subsection heading]:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>[Bullet point 1]</li>
                <li>[Bullet point 2]</li>
                <li>[Bullet point 3]</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> [Key takeaway or safety note]
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
            [Section 2 Title]
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>[Content for section 2]</p>

            {/* 2-column layout for comparisons */}
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">[Column 1 Title]</p>
                <ul className="text-sm text-white space-y-1">
                  <li>[Item 1]</li>
                  <li>[Item 2]</li>
                  <li>[Item 3]</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">[Column 2 Title]</p>
                <ul className="text-sm text-white space-y-1">
                  <li>[Item 1]</li>
                  <li>[Item 2]</li>
                  <li>[Item 3]</li>
                </ul>
              </div>
            </div>
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
            [Section 3 Title]
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>[Content for section 3]</p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> [Real-world trade example]
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
            [Section 4 Title]
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>[Content for section 4]</p>

            {/* 3-column layout for key concepts */}
            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">[Concept 1]</p>
                <p className="text-white/90 text-xs">[Brief description]</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">[Concept 2]</p>
                <p className="text-white/90 text-xs">[Brief description]</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">[Concept 3]</p>
                <p className="text-white/90 text-xs">[Brief description]</p>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>[Installation tip 1]</li>
                <li>[Installation tip 2]</li>
                <li>[Installation tip 3]</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>[Fault finding tip 1]</li>
                <li>[Fault finding tip 2]</li>
                <li>[Fault finding tip 3]</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>[Mistake 1]</strong> — [Why it's wrong and consequence]</li>
                <li><strong>[Mistake 2]</strong> — [Why it's wrong and consequence]</li>
                <li><strong>[Mistake 3]</strong> — [Why it's wrong and consequence]</li>
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
            QUICK REFERENCE / POCKET GUIDE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">[Category 1]</p>
                <ul className="space-y-0.5">
                  <li>[Fact 1]</li>
                  <li>[Fact 2]</li>
                  <li>[Fact 3]</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">[Category 2]</p>
                <ul className="space-y-0.5">
                  <li>[Fact 1]</li>
                  <li>[Fact 2]</li>
                  <li>[Fact 3]</li>
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
            Back + Next buttons
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3ContentTemplate;
