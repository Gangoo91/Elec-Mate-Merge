/**
 * Level 3 Module 7 Section 3.2 - Technical Reporting and Documentation
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Technical Reporting and Documentation - Level 3 Module 7 Section 3.2";
const DESCRIPTION = "Creating clear technical reports, maintaining professional documentation, and presenting electrical information accurately and comprehensively.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A technical report should primarily be:",
    options: [
      "Written in the most complex language to show expertise",
      "Clear, accurate, factual, and appropriate for the intended audience",
      "As short as possible regardless of content",
      "Full of personal opinions about the work"
    ],
    correctIndex: 1,
    explanation: "Technical reports must be clear, accurate, and factual. They should provide the information the reader needs in a format they can understand. The level of technical detail should match the audience."
  },
  {
    id: "check-2",
    question: "When documenting a fault found during inspection, you should record:",
    options: [
      "Only your opinion about the cause",
      "Specific location, nature of fault, test results, and classification",
      "Just that 'a fault was found'",
      "Nothing until you've fixed it"
    ],
    correctIndex: 1,
    explanation: "Fault documentation should be specific: exact location, what the fault is, relevant test results, and severity classification. Vague descriptions don't help future work or protect you if questioned."
  },
  {
    id: "check-3",
    question: "Site diaries and daily logs are important because:",
    options: [
      "They are legally required by all employers",
      "They provide evidence of work done, conditions, and decisions made",
      "They replace the need for certification",
      "They are only needed for large commercial projects"
    ],
    correctIndex: 1,
    explanation: "Site diaries document what happened, when, and why. This evidence is valuable for disputes, claims, and understanding the history of an installation. They should be contemporaneous - written at the time, not reconstructed later."
  },
  {
    id: "check-4",
    question: "Photographs as part of technical documentation should:",
    options: [
      "Only be taken if specifically requested",
      "Be clear, dated, labelled, and show relevant details",
      "Be taken from as far away as possible",
      "Replace written descriptions entirely"
    ],
    correctIndex: 1,
    explanation: "Good photographic documentation is clear, properly labelled, dated, and shows the relevant details. Photos complement written records but don't replace them - describe what the photo shows."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A well-structured technical report typically includes:",
    options: [
      "Only the final conclusions",
      "Title, summary, findings, recommendations, and any appendices",
      "Personal anecdotes about similar jobs",
      "Marketing material for your company"
    ],
    correctAnswer: 1,
    explanation: "A structured report helps readers find information quickly. Include: title/reference, executive summary, detailed findings, recommendations/conclusions, and supporting documents as appendices."
  },
  {
    id: 2,
    question: "When writing about observations during an EICR, what language should be used?",
    options: [
      "Emotional language about how dangerous things are",
      "Objective, factual language describing what was observed",
      "Accusatory language about previous electricians",
      "Vague generalisations to cover all possibilities"
    ],
    correctAnswer: 1,
    explanation: "EICR observations should be factual and objective. Describe what you observed, reference the relevant regulation, and use the standard classification codes. Avoid emotive language or blame."
  },
  {
    id: 3,
    question: "What is the purpose of a method statement?",
    options: [
      "To replace the risk assessment",
      "To describe step-by-step how work will be carried out safely",
      "To provide a quote for the work",
      "To record work after completion"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes how specific work will be carried out safely, including the sequence of operations, safety measures, and responsibilities. It's prepared before work starts and guides safe execution."
  },
  {
    id: 4,
    question: "Documentation of test results should include:",
    options: [
      "Just whether tests passed or failed",
      "Actual values, instrument used, date, and comparison to requirements",
      "Only values that meet requirements",
      "Estimated values to save time"
    ],
    correctAnswer: 1,
    explanation: "Test documentation should include actual measured values (not just pass/fail), the instrument used (with calibration status), date of tests, and comparison against required values. This provides complete evidence."
  },
  {
    id: 5,
    question: "Variation orders should document:",
    options: [
      "Only the additional cost",
      "Requested change, cost implications, programme impact, and client approval",
      "Just a brief description",
      "Nothing until the final invoice"
    ],
    correctAnswer: 1,
    explanation: "Variation orders document what changed, why, what it costs, how it affects the programme, and evidence of client approval. Without proper documentation, recovering additional costs is difficult."
  },
  {
    id: 6,
    question: "A permit to work system requires documentation of:",
    options: [
      "Just who is on site",
      "Scope of work, isolation details, authorisation, and sign-off procedures",
      "Only the time spent on the job",
      "Equipment used"
    ],
    correctAnswer: 1,
    explanation: "Permits to work document the specific work authorised, equipment isolated, safety measures in place, who authorised the work, and the process for sign-off when work is complete. This controls high-risk activities."
  },
  {
    id: 7,
    question: "When should site documentation be completed?",
    options: [
      "At the end of the week from memory",
      "At the time of the work or as soon as possible afterwards",
      "Only when requested by the client",
      "Before the work is done, to save time"
    ],
    correctAnswer: 1,
    explanation: "Documentation should be completed contemporaneously - at the time or immediately after. Records made later from memory are less accurate and less credible if used as evidence."
  },
  {
    id: 8,
    question: "A snag list documents:",
    options: [
      "Major safety defects only",
      "Items requiring attention, completion, or rectification before handover",
      "Materials ordered for the job",
      "Staff attendance records"
    ],
    correctAnswer: 1,
    explanation: "A snag list (defects list) records items that need to be completed, corrected, or improved before final handover. It's a quality control tool ensuring nothing is missed and all parties agree on outstanding work."
  },
  {
    id: 9,
    question: "Technical specifications in documentation should:",
    options: [
      "Use manufacturer marketing language",
      "Be accurate, reference standards, and include model/serial numbers where relevant",
      "Be as vague as possible to allow flexibility",
      "Only include information the client requests"
    ],
    correctAnswer: 1,
    explanation: "Technical specifications should be accurate and detailed: equipment types, model numbers, ratings, standards compliance, and any relevant serial numbers. This enables future maintenance and troubleshooting."
  },
  {
    id: 10,
    question: "As-built drawings differ from design drawings because they:",
    options: [
      "Are the same thing with a different name",
      "Show what was actually installed, including any changes from the original design",
      "Only show the power distribution",
      "Are only required for new buildings"
    ],
    correctAnswer: 1,
    explanation: "As-built (record) drawings show the installation as actually completed, including all variations from the original design. They're essential for future maintenance and modifications."
  },
  {
    id: 11,
    question: "What should a handover pack for a new installation include?",
    options: [
      "Only the invoice",
      "Certificates, test results, operating instructions, warranties, and as-built drawings",
      "Just a brief summary letter",
      "Only the items the client specifically requests"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive handover pack includes all documentation the client needs to operate and maintain the installation: certificates, test results, operating/maintenance instructions, warranties, and as-built drawings."
  },
  {
    id: 12,
    question: "Record keeping for electrical work should be:",
    options: [
      "Destroyed after the job is paid",
      "Maintained securely for the appropriate retention period",
      "Optional depending on job size",
      "Only electronic, never paper"
    ],
    correctAnswer: 1,
    explanation: "Records should be securely maintained for the appropriate period - typically at least 6 years, longer for some documents. Both electronic and paper records are acceptable, but they must be accessible and legible."
  }
];

const faqs = [
  {
    question: "How technical should my reports be for non-technical clients?",
    answer: "Include a non-technical summary explaining findings in plain language, then provide full technical detail in appendices or separate sections. This serves both the client who needs to understand the implications and any technical readers who need the detail."
  },
  {
    question: "What if I make an error in documentation after it's been issued?",
    answer: "Issue a formal amendment or correction. Don't simply alter the original - create a documented correction referencing the original document. Explain what was wrong and what the correct information is. Keep records of both."
  },
  {
    question: "Is it acceptable to use abbreviations in technical reports?",
    answer: "Standard industry abbreviations (RCD, MCB, etc.) are generally acceptable if the audience understands them. For mixed audiences, define abbreviations on first use or include a glossary. Never use abbreviations that might be ambiguous."
  },
  {
    question: "How detailed should progress reports be?",
    answer: "Include enough detail to track work completed, work remaining, any issues or delays, and what's planned next. The level of detail depends on project size and client requirements, but err on the side of more rather than less."
  },
  {
    question: "Can I use templates for technical documentation?",
    answer: "Templates are excellent for ensuring consistency and completeness. Use industry-standard templates where they exist (BS 7671 forms, for example). Customise to your needs but don't remove important sections."
  },
  {
    question: "What's the best format for storing documentation - paper or electronic?",
    answer: "Both are acceptable if properly managed. Electronic has advantages for searchability and backup, but must be securely stored and backed up. Paper must be stored safely and protected from damage. Many use both, with paper originals and electronic copies."
  }
];

const Level3Module7Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3">
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
            <span>Module 7.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Technical Reporting and Documentation
          </h1>
          <p className="text-white/80">
            Creating accurate, comprehensive professional documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Accuracy:</strong> Record facts, not assumptions or opinions</li>
              <li><strong>Completeness:</strong> Include all relevant information</li>
              <li><strong>Timeliness:</strong> Document at the time, not from memory</li>
              <li><strong>Clarity:</strong> Appropriate for the intended audience</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Professional Value</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Evidence:</strong> Protects you in disputes</li>
              <li><strong>Compliance:</strong> Demonstrates regulatory adherence</li>
              <li><strong>Continuity:</strong> Helps future work and maintenance</li>
              <li><strong>Quality:</strong> Shows professional standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure and write clear technical reports",
              "Document inspections, tests, and findings accurately",
              "Maintain site records and daily logs",
              "Create effective photographic documentation",
              "Prepare handover documentation",
              "Manage records retention and storage"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Report Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Technical Report Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-structured technical report helps readers find information quickly and understand your findings clearly. Whether it's an inspection report, fault investigation, or project summary, consistent structure improves clarity and professionalism.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard report structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Title and reference:</strong> What the report is about, unique reference number</li>
                <li><strong>Executive summary:</strong> Key findings and recommendations in brief</li>
                <li><strong>Introduction/scope:</strong> What was examined, why, and limitations</li>
                <li><strong>Findings:</strong> Detailed observations with supporting evidence</li>
                <li><strong>Recommendations:</strong> What action is needed</li>
                <li><strong>Appendices:</strong> Test results, photographs, supporting documents</li>
              </ul>
            </div>

            <p>
              The executive summary is crucial for busy readers who may not read the full report. It should stand alone - anyone reading only the summary should understand the key points and what action is needed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Reports may be read by people who weren't present and don't know the context. Write so that anyone reading it can understand what you found and why it matters.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Documenting Findings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Documenting Findings Accurately
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate documentation of findings - whether faults, observations, or test results - requires precision and objectivity. Your records may be used as evidence in disputes, insurance claims, or legal proceedings. Vague or incomplete records cause problems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>"Ring final circuit kitchen - socket 3 from DB, L-N reading 0.02 ohm indicates short circuit"</li>
                  <li>Specific location identified</li>
                  <li>Test result included</li>
                  <li>Nature of fault described</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Poor Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>"Fault found in kitchen"</li>
                  <li>Location vague</li>
                  <li>No test data</li>
                  <li>Fault not described</li>
                </ul>
              </div>
            </div>

            <p>
              For inspection reports, use standard classification systems (C1/C2/C3/FI for EICRs). Reference the specific regulation or standard contravened. This provides consistency and clarity about the severity and nature of findings.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Instead of "cables not to standard", write "Cables identified as non-compliant with BS 7671 Regulation 522.8 - no additional protection provided for cables buried less than 50mm in wall."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Site Records */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Site Records and Daily Logs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Site diaries and daily logs create a contemporaneous record of what happened on site each day. They're invaluable for reconstructing events, resolving disputes, and supporting claims. The key is to record information at the time, not rely on memory later.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Information to record in site diaries:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Date, weather conditions, start and finish times</li>
                <li>Work completed and areas worked in</li>
                <li>Who was on site (your team, other trades, visitors)</li>
                <li>Instructions received and from whom</li>
                <li>Problems encountered and how resolved</li>
                <li>Materials delivered or used</li>
                <li>Any accidents, near misses, or safety concerns</li>
              </ul>
            </div>

            <p>
              Contemporaneous records - made at the time of events - carry much more weight than records reconstructed later. Courts and arbitrators give greater credibility to documentation created in real-time rather than compiled afterwards.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If it's not written down, it didn't happen - at least as far as evidence is concerned. A site diary entry from the day carries far more weight than a recollection months or years later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Photographic Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Photographic Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Photographs provide powerful evidence of site conditions, completed work, and defects found. Modern smartphones make photographic documentation easy, but photographs must be properly managed to be useful as evidence.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Before</p>
                <p className="text-white/90 text-xs">Existing conditions, defects found, areas before work</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">During</p>
                <p className="text-white/90 text-xs">Hidden work, containment routes, cable installations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">After</p>
                <p className="text-white/90 text-xs">Completed work, final installation, testing setup</p>
              </div>
            </div>

            <p>
              Photographs should be clear, well-lit, and show the relevant detail. Include context (wider shot showing location, then close-up of detail). Label photographs with date, location, and description. Don't edit photographs beyond cropping - altered images lose evidential value.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Photograph work before it's hidden - cable routes in walls, containment before covers, connections before panels are closed. This evidence is impossible to recreate later and invaluable if work is questioned.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete records at the time, not days or weeks later</li>
                <li>Be specific - vague records are almost as bad as no records</li>
                <li>Use standard forms and templates for consistency</li>
                <li>Keep originals secure and make backup copies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compile all certificates, test results, and warranties</li>
                <li>Include operating and maintenance instructions</li>
                <li>Provide as-built drawings showing actual installation</li>
                <li>Include emergency contact information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Documentation Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vagueness:</strong> "Some issues found" tells no one anything</li>
                <li><strong>Retrospective creation:</strong> Records made later lack credibility</li>
                <li><strong>Missing dates:</strong> Undated records are nearly useless as evidence</li>
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
                <p className="font-medium text-white mb-1">Report Checklist</p>
                <ul className="space-y-0.5">
                  <li>Clear title and reference</li>
                  <li>Executive summary</li>
                  <li>Scope and limitations</li>
                  <li>Detailed findings</li>
                  <li>Recommendations</li>
                  <li>Supporting appendices</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Photo Documentation</p>
                <ul className="space-y-0.5">
                  <li>Date and time stamped</li>
                  <li>Location identified</li>
                  <li>Clear and well-lit</li>
                  <li>Context plus detail shots</li>
                  <li>Labelled and described</li>
                  <li>Securely stored</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Effective Communication
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3-3">
              Next: Working with Other Trades
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section3_2;
