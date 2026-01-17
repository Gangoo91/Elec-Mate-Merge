import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m5s2-check1",
    question: "What is the maximum permanent link length for Link testing according to TIA-568?",
    options: ["80 metres", "90 metres", "100 metres", "110 metres"],
    correctIndex: 1,
    explanation: "TIA-568 specifies a maximum permanent link length of 90 metres for Link testing. This excludes patch cords and equipment cords that make up the additional 10 metres in Channel testing."
  },
  {
    id: "datacabling-m5s2-check2",
    question: "Which testing method is most commonly used for certifying new cable installations?",
    options: ["Channel testing", "Link testing", "Both equally", "Neither"],
    correctIndex: 1,
    explanation: "Link testing is most commonly used for field certification because it tests only the installed permanent cabling infrastructure, excluding variables introduced by patch cords."
  },
  {
    id: "datacabling-m5s2-check3",
    question: "What is the total maximum channel length including patch cords?",
    options: ["90 metres", "95 metres", "100 metres", "105 metres"],
    correctIndex: 2,
    explanation: "The total channel length is 100 metres maximum, consisting of 90 metres permanent link plus up to 10 metres total for patch cords (5m at each end)."
  }
];

const faqs = [
  {
    question: "When should I use Link testing vs Channel testing?",
    answer: "Use Link testing for installation acceptance, warranty validation, and contractor sign-off - it tests just the permanent infrastructure you installed. Use Channel testing when troubleshooting end-user issues or validating application performance, as it tests the complete path including patch cords."
  },
  {
    question: "Why do Channel test results often look worse than Link test results?",
    answer: "Channel testing includes additional connectors from patch cords, which introduce more insertion loss, return loss, and potential crosstalk. The standards account for this with relaxed limits for Channel testing compared to Link testing."
  },
  {
    question: "Can I fail Link testing but pass Channel testing?",
    answer: "This is rare but theoretically possible if your permanent link is marginal and high-quality patch cords happen to compensate. However, this scenario usually indicates an underlying problem that should be investigated."
  },
  {
    question: "How do I set up my tester for each test type?",
    answer: "Most cable certifiers have preset configurations for Link and Channel testing. For Link testing, use permanent link adapters. For Channel testing, use channel adapters or direct RJ45 connections. Always verify your test setup matches the certification requirement."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A contractor has installed horizontal cabling and wants warranty certification. Which test configuration should be used?",
  options: [
    "Channel testing with patch cords installed",
    "Link testing of the permanent link only",
    "Either method provides equivalent certification",
    "Visual inspection is sufficient for warranty"
  ],
  correctAnswer: 1,
  explanation: "Link testing is the standard for installation acceptance and warranty certification because it tests only the permanent installed infrastructure. This isolates the contractor's work from variables like patch cord quality that they don't control."
  }
];

const DataCablingModule5Section2 = () => {
  useSEO({
    title: "Link Testing vs Channel Testing | Data Cabling Module 5.2",
    description: "Understanding the differences between permanent link and channel testing methodologies for structured cabling certification."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Link Testing vs Channel Testing
          </h1>
          <p className="text-white/80">
            Different testing methodologies and their applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Link testing:</strong> 90m permanent cabling only</li>
              <li><strong>Channel testing:</strong> 100m total including patch cords</li>
              <li><strong>Use Link:</strong> Installation certification and warranty</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Test adapter type determines test method</li>
              <li><strong>Use:</strong> Link for sign-off, Channel for troubleshooting</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish Link from Channel testing",
              "Understand length limits for each method",
              "Select appropriate test method for purpose",
              "Interpret test results correctly",
              "Configure test equipment properly",
              "Meet certification requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Difference
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Link testing and Channel testing evaluate different portions of the cabling infrastructure.
              Understanding when to use each method is essential for proper certification and troubleshooting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Link Testing (Permanent Link)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Scope:</strong> Permanent installed cabling only</li>
                  <li><strong>Excludes:</strong> Patch cords and equipment cords</li>
                  <li><strong>Max length:</strong> 90 metres</li>
                  <li><strong>Use case:</strong> Installation acceptance, warranty</li>
                  <li><strong>Repeatability:</strong> High - fixed components only</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Channel Testing (End-to-End)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Scope:</strong> Complete transmission path</li>
                  <li><strong>Includes:</strong> All cables, connectors, patch cords</li>
                  <li><strong>Max length:</strong> 100 metres total</li>
                  <li><strong>Use case:</strong> Application performance validation</li>
                  <li><strong>Variability:</strong> Depends on patch cord quality</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Outlet</p>
                <p className="text-white/90 text-xs">Work area connection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Horizontal</p>
                <p className="text-white/90 text-xs">90m max cable</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Patch Panel</p>
                <p className="text-white/90 text-xs">TR termination</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Components and Configuration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each test method includes specific components and has defined limits to ensure
              consistent, comparable results across installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Link Testing Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Horizontal cable runs (up to 90m)</li>
                <li>Telecommunications outlets</li>
                <li>Patch panel terminations</li>
                <li>Consolidation points (if present)</li>
                <li>Cross-connect hardware</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Channel Testing Adds:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment cord at workstation (max 5m)</li>
                <li>Patch cord at telecommunications room (max 5m)</li>
                <li>All connector interfaces in signal path</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Channel Configuration Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Total length:</strong> 100 metres maximum</li>
                  <li><strong>Patch cords:</strong> 10m total (5m each end)</li>
                  <li><strong>Connectors:</strong> 4 pairs maximum</li>
                  <li><strong>Consolidation points:</strong> 1 maximum</li>
                  <li><strong>Cross-connects:</strong> 1 maximum</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Impact</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>More connectors:</strong> Higher insertion loss</li>
                  <li><strong>Patch cord quality:</strong> Affects Channel results</li>
                  <li><strong>Additional mating:</strong> Return loss impact</li>
                  <li><strong>Test repeatability:</strong> Lower for Channel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Limits Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standards specify different performance limits for Link and Channel testing
              to account for the additional components in Channel configurations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cat 6 @ 250MHz Comparison:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Link Testing Limits</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Insertion Loss: 21.3 dB max</li>
                    <li>Return Loss: 12.0 dB min</li>
                    <li>NEXT: 33.1 dB min</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Channel Testing Limits</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Insertion Loss: 23.6 dB max</li>
                    <li>Return Loss: 10.0 dB min</li>
                    <li>NEXT: 30.1 dB min</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key differences explained:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insertion Loss:</strong> ~2.3dB allowance for patch cord losses</li>
                <li><strong>Return Loss:</strong> 2dB reduction accounts for additional connectors</li>
                <li><strong>NEXT:</strong> 3dB reduction for patch cord crosstalk contribution</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Method</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Link testing:</strong> New installations, contractor certification, warranty claims</li>
                <li><strong>Channel testing:</strong> Troubleshooting, application validation, performance monitoring</li>
                <li><strong>Both methods:</strong> Comprehensive qualification of new data centre links</li>
                <li><strong>Document clearly:</strong> Always record which test method was used</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong adapters:</strong> — Using Channel adapters for Link testing</li>
                <li><strong>Mixed results:</strong> — Comparing Link and Channel results directly</li>
                <li><strong>Poor patch cords:</strong> — Using substandard cords affects Channel tests</li>
                <li><strong>Skipping calibration:</strong> — Test adapters need regular calibration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Link Testing</p>
              <ul className="space-y-0.5">
                <li>90m permanent link max</li>
                <li>Excludes patch cords</li>
                <li>Higher repeatability</li>
                <li>Warranty certification</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Channel Testing</p>
              <ul className="space-y-0.5">
                <li>100m total channel max</li>
                <li>Includes all patch cords</li>
                <li>Real-world performance</li>
                <li>Troubleshooting use</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-5-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule5Section2;