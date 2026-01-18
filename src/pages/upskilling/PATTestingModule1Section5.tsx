import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PAT Testing Implementation and Best Practices - PAT Testing Module 1";
const DESCRIPTION = "Learn how to implement an effective PAT testing programme, including planning, testing processes, record keeping, staff training, and handling failed equipment.";

const quickCheckQuestions = [
  {
    id: "pat-components",
    question: "What are the two main components of PAT testing?",
    options: [
      "Visual inspection and user training",
      "Visual inspection and electrical testing",
      "Electrical testing and documentation",
      "Documentation and user training"
    ],
    correctIndex: 1,
    explanation: "PAT testing consists of visual inspection (checking for obvious damage) and electrical testing (measuring safety parameters like earth continuity and insulation resistance)."
  },
  {
    id: "visual-inspection",
    question: "What should you check during visual inspection?",
    options: [
      "Only the plug and cable",
      "Just the equipment casing",
      "Cable, plug, equipment casing, and any obvious damage",
      "Only internal components"
    ],
    correctIndex: 2,
    explanation: "Visual inspection should cover the entire appliance including cable condition, plug integrity, equipment casing, and any signs of damage, overheating, or wear."
  },
  {
    id: "who-can-test",
    question: "Who can perform PAT testing?",
    options: [
      "Only qualified electricians",
      "Anyone with basic training and competence",
      "Only the equipment manufacturer",
      "Only certified PAT testing companies"
    ],
    correctIndex: 1,
    explanation: "PAT testing can be performed by competent persons with adequate training, not necessarily qualified electricians, though they must understand the equipment and testing procedures."
  },
  {
    id: "failed-equipment",
    question: "What happens if equipment fails PAT testing?",
    options: [
      "It can continue to be used with caution",
      "It must be removed from service immediately",
      "It can be used for one more month",
      "Only the failed test needs to be repeated"
    ],
    correctIndex: 1,
    explanation: "Equipment that fails PAT testing must be removed from service immediately to prevent potential electrical hazards. It can only be returned to service after repair and successful retesting."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the two main components of PAT testing?",
    options: [
      "Visual inspection and user training",
      "Visual inspection and electrical testing",
      "Electrical testing and documentation",
      "Documentation and user training"
    ],
    correctAnswer: 1,
    explanation: "PAT testing consists of visual inspection (checking for obvious damage) and electrical testing (measuring safety parameters like earth continuity and insulation resistance)."
  },
  {
    id: 2,
    question: "What should you check during visual inspection?",
    options: [
      "Only the plug and cable",
      "Just the equipment casing",
      "Cable, plug, equipment casing, and any obvious damage",
      "Only internal components"
    ],
    correctAnswer: 2,
    explanation: "Visual inspection should cover the entire appliance including cable condition, plug integrity, equipment casing, and any signs of damage, overheating, or wear."
  },
  {
    id: 3,
    question: "Who can perform PAT testing?",
    options: [
      "Only qualified electricians",
      "Anyone with basic training and competence",
      "Only the equipment manufacturer",
      "Only certified PAT testing companies"
    ],
    correctAnswer: 1,
    explanation: "PAT testing can be performed by competent persons with adequate training, not necessarily qualified electricians, though they must understand the equipment and testing procedures."
  },
  {
    id: 4,
    question: "What happens if equipment fails PAT testing?",
    options: [
      "It can continue to be used with caution",
      "It must be removed from service immediately",
      "It can be used for one more month",
      "Only the failed test needs to be repeated"
    ],
    correctAnswer: 1,
    explanation: "Equipment that fails PAT testing must be removed from service immediately to prevent potential electrical hazards. It can only be returned to service after repair and successful retesting."
  },
  {
    id: 5,
    question: "How should PAT testing results be recorded?",
    options: [
      "Mental notes are sufficient",
      "Simple pass/fail labels only",
      "Detailed records with dates, results, and equipment identification",
      "Only failed tests need recording"
    ],
    correctAnswer: 2,
    explanation: "Comprehensive records should include equipment identification, test dates, detailed results, tester identity, and any remedial actions taken."
  },
  {
    id: 6,
    question: "What is the first phase of implementing a PAT programme?",
    options: [
      "Buying testing equipment",
      "Training staff",
      "Equipment audit and risk assessment",
      "Testing all equipment immediately"
    ],
    correctAnswer: 2,
    explanation: "The first phase is assessment - conducting an equipment audit, risk assessing each area, defining testing frequencies, and creating an equipment register."
  },
  {
    id: 7,
    question: "Which of these is an essential component of PAT tester training?",
    options: [
      "How to repair failed equipment",
      "Understanding electrical safety principles and test interpretation",
      "Only how to use the testing equipment",
      "Legal qualifications in electrical installation"
    ],
    correctAnswer: 1,
    explanation: "Essential training includes understanding electrical safety principles, equipment classification, testing equipment operation, and interpreting test results correctly."
  },
  {
    id: 8,
    question: "What should be done with failed equipment that cannot be repaired?",
    options: [
      "Return it to the manufacturer",
      "Store it in case it's needed later",
      "Dispose of it safely and update records",
      "Use it only for non-critical tasks"
    ],
    correctAnswer: 2,
    explanation: "Equipment that cannot be economically repaired should be disposed of safely (following WEEE regulations) and records updated to remove it from the equipment register."
  },
  {
    id: 9,
    question: "How often should PAT testing competency be reassessed?",
    options: [
      "Only at initial training",
      "Every 5 years minimum",
      "Regularly, with ongoing development",
      "Never, once trained always competent"
    ],
    correctAnswer: 2,
    explanation: "Competency should be regularly assessed and maintained through ongoing training, updates on regulatory changes, and practical skills evaluation."
  },
  {
    id: 10,
    question: "What is a common implementation pitfall to avoid?",
    options: [
      "Starting with conservative testing frequencies",
      "Training multiple staff members",
      "Treating PAT as a one-size-fits-all solution",
      "Maintaining detailed records"
    ],
    correctAnswer: 2,
    explanation: "A common pitfall is treating PAT as one-size-fits-all rather than adapting the programme to specific equipment types, environments, and risk levels."
  }
];

const faqs = [
  {
    question: "Do I need formal qualifications to do PAT testing?",
    answer: "No formal qualifications are legally required, but testers must be 'competent' - meaning they have sufficient training, knowledge, and experience. Most employers require completion of a recognised PAT testing course and ongoing competency assessment."
  },
  {
    question: "What equipment do I need to start PAT testing?",
    answer: "At minimum, you need a PAT tester (combined or separate instruments), test labels or tags, a means of recording results, and appropriate PPE. More comprehensive programmes may include barcode scanners, database software, and calibration equipment."
  },
  {
    question: "How long does it take to test one appliance?",
    answer: "A typical appliance takes 2-5 minutes including visual inspection, electrical tests, labelling, and recording. Complex equipment or those requiring repair assessment take longer. Experienced testers can process 100-150 items per day."
  },
  {
    question: "Can we use in-house staff or should we outsource?",
    answer: "Both options are valid. In-house testing offers flexibility and lower per-test costs but requires training investment. Outsourcing provides expertise and equipment without capital outlay. Many organisations use a hybrid approach - in-house for routine testing and contractors for specialist equipment."
  },
  {
    question: "What happens if equipment is damaged between tests?",
    answer: "Users should report damage immediately, and equipment should be removed from service until inspected. User awareness training is essential - staff should know how to identify obvious damage and the importance of reporting it rather than continuing to use faulty equipment."
  },
  {
    question: "How do we handle equipment that's always in use?",
    answer: "Schedule testing during downtime, maintenance windows, or shift changes. For critical equipment, have spare units available or plan testing during annual shutdowns. Some organisations use portable testers that can be brought to equipment locations."
  }
];

const PATTestingModule1Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PAT Testing Implementation and Best Practices
          </h1>
          <p className="text-white/80">
            Building an effective and sustainable PAT testing programme
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Two stages:</strong> Visual inspection + electrical testing</li>
              <li><strong>Competence:</strong> Training required, not just qualifications</li>
              <li><strong>Failed items:</strong> Remove from service immediately</li>
              <li><strong>Records:</strong> Essential for compliance and improvement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Damage, wear, overheating signs</li>
              <li><strong>Use:</strong> Systematic approach for consistent results</li>
              <li><strong>Apply:</strong> Clear procedures and documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan and implement a PAT testing programme",
              "Understand the complete testing process",
              "Develop effective record-keeping systems",
              "Train staff and manage ongoing competence",
              "Handle failed equipment and remedial actions",
              "Optimise costs while maintaining safety standards"
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

        {/* Section 1: Complete Testing Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Complete Testing Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding PAT testing theory is one thing — implementing it effectively is another.
              A successful programme combines visual inspection with electrical testing in a systematic approach.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Visual Inspection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check cable for cuts, nicks, or damage</li>
                  <li>Inspect plug for cracks or loose connections</li>
                  <li>Examine equipment casing for damage</li>
                  <li>Look for signs of overheating or burning</li>
                  <li>Verify appropriate fuse rating</li>
                  <li>Check strain relief and cable entry</li>
                  <li>Assess general cleanliness and condition</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Electrical Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Earth continuity test (Class I equipment)</li>
                  <li>Insulation resistance test (all equipment)</li>
                  <li>Earth leakage test (if applicable)</li>
                  <li>Functional checks and operation tests</li>
                  <li>Load testing for extension leads</li>
                  <li>Polarity checks where relevant</li>
                  <li>RCD operation tests (portable RCDs)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Visual Inspection Detail */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Visual Inspection in Detail
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is critical — it catches approximately 95% of faults. A thorough visual check
              should be performed before any electrical testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to look for:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Cable Condition</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Cuts, nicks, or exposed conductors</li>
                    <li>Kinks, tight bends, or strain damage</li>
                    <li>Signs of crushing or abrasion</li>
                    <li>Damage from heat or chemicals</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Plug Condition</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Cracked or damaged casing</li>
                    <li>Burn marks or discolouration</li>
                    <li>Bent or damaged pins</li>
                    <li>Correctly rated fuse fitted</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Equipment Casing</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Cracks or breaks in housing</li>
                    <li>Missing screws or covers</li>
                    <li>Signs of tampering or repair</li>
                    <li>Contamination (dust, liquids)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Warning Signs</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Burn marks or scorch marks</li>
                    <li>Melted plastic</li>
                    <li>Unusual odours</li>
                    <li>Loose or rattling parts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Implementation Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Implementation Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Phase 1: Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Conduct equipment audit</li>
                  <li>Risk assess each area</li>
                  <li>Define testing frequencies</li>
                  <li>Identify resource requirements</li>
                  <li>Create equipment register</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Phase 2: Setup</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Acquire testing equipment</li>
                  <li>Train competent persons</li>
                  <li>Develop procedures and forms</li>
                  <li>Create labelling system</li>
                  <li>Set up record keeping</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Phase 3: Operation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Begin systematic testing</li>
                  <li>Monitor and review results</li>
                  <li>Handle failed equipment</li>
                  <li>Update records continuously</li>
                  <li>Annual programme review</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Staff Training and Competency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Staff Training and Competency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Knowledge Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical safety principles</li>
                  <li>Equipment classification systems</li>
                  <li>Testing equipment operation</li>
                  <li>Interpreting test results</li>
                  <li>Common faults and failures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Skills Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visual inspection techniques</li>
                  <li>Safe testing procedures</li>
                  <li>Record keeping and documentation</li>
                  <li>Equipment labelling systems</li>
                  <li>Handling failed equipment</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-1">Initial Training</p>
                <p className="text-xs text-white">2-3 days formal course covering legal requirements, testing theory, hands-on practice, and assessment</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-1">Ongoing Development</p>
                <p className="text-xs text-white">Regular updates on regulatory changes, new equipment types, improved techniques, and incident learning</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-1">Competency Assessment</p>
                <p className="text-xs text-white">Regular evaluation of technical knowledge, practical skills, record accuracy, and safety compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Handling Failed Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handling Failed Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When equipment fails PAT testing:</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Immediately remove from service</strong> — disconnect and isolate the equipment</li>
                <li><strong>2. Apply a FAIL label</strong> — clearly mark as unsafe, including date and reason</li>
                <li><strong>3. Inform the user</strong> — explain why equipment cannot be used</li>
                <li><strong>4. Assess for repair</strong> — determine if economically viable to repair</li>
                <li><strong>5. Repair or dispose</strong> — repair by competent person or safely dispose</li>
                <li><strong>6. Retest after repair</strong> — must pass all tests before returning to service</li>
                <li><strong>7. Update records</strong> — document all actions taken</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Never allow failed equipment to be used, even temporarily.
              The risks far outweigh any operational inconvenience.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Best Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Implementation Best Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Success Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Senior management commitment and support</li>
                  <li>Clear policies and procedures documented</li>
                  <li>Adequate resources allocated for the programme</li>
                  <li>Regular training and competency updates</li>
                  <li>Integration with other safety management systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Common Pitfalls to Avoid</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Treating PAT as a one-size-fits-all solution</li>
                  <li>Inadequate competency training for testers</li>
                  <li>Poor record keeping and tracking systems</li>
                  <li>Focusing on compliance rather than safety outcomes</li>
                  <li>Insufficient budget planning for ongoing costs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Setting Up a Programme</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with a comprehensive equipment audit</li>
                <li>Involve stakeholders from all departments</li>
                <li>Set realistic timelines for implementation</li>
                <li>Plan for both initial testing and ongoing maintenance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Conducting Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always complete visual inspection first</li>
                <li>Follow a consistent testing sequence</li>
                <li>Record results immediately — don't rely on memory</li>
                <li>Apply labels and update records before moving to next item</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping visual inspection</strong> — it catches 95% of faults</li>
                <li><strong>Rushing through tests</strong> — thoroughness prevents accidents</li>
                <li><strong>Poor labelling</strong> — clear labels prevent confusion</li>
                <li><strong>Delayed record updates</strong> — update immediately for accuracy</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Testing Process</p>
                <ul className="space-y-0.5">
                  <li>1. Visual inspection first</li>
                  <li>2. Electrical tests (earth, insulation)</li>
                  <li>3. Label with result and date</li>
                  <li>4. Update records immediately</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Failed Equipment</p>
                <ul className="space-y-0.5">
                  <li>Remove from service immediately</li>
                  <li>Apply FAIL label clearly</li>
                  <li>Repair or dispose safely</li>
                  <li>Retest before returning to use</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default PATTestingModule1Section5;
