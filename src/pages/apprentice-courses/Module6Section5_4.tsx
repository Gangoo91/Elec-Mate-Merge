import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Module6Section5_4 = () => {
  useSEO(
    "Interpreting Insulation Resistance Test Results against BS 7671 - Level 2 Electrical Testing & Inspection",
    "Understanding minimum values, interpreting readings and making safety decisions"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum insulation resistance value for most low-voltage circuits according to BS 7671?",
      options: ["0.5 MΩ", "1 MΩ", "2 MΩ", "5 MΩ"],
      correctAnswer: 1,
      explanation: "BS 7671 specifies a minimum of 1 MΩ for most low-voltage circuits, though higher values are typically expected in practice."
    },
    {
      id: 2,
      question: "What does a reading significantly below 1 MΩ indicate?",
      options: ["Perfect insulation", "Possible insulation breakdown or contamination", "Normal wear", "High efficiency"],
      correctAnswer: 1,
      explanation: "A reading well below 1 MΩ suggests potential insulation breakdown, moisture ingress, contamination, or physical damage."
    },
    {
      id: 3,
      question: "If you get a reading of 0.3 MΩ, what should you do?",
      options: ["Accept it as satisfactory", "Investigate and rectify before energising", "Energise the circuit", "Ignore the reading"],
      correctAnswer: 1,
      explanation: "Any reading below 1 MΩ requires investigation and rectification before the circuit can be safely energised."
    },
    {
      id: 4,
      question: "True or False: Environmental conditions can affect insulation resistance readings.",
      options: ["True", "False", "Only in winter", "Only outdoors"],
      correctAnswer: 0,
      explanation: "True. Temperature, humidity, moisture, and contamination can all significantly affect insulation resistance readings."
    },
    {
      id: 5,
      question: "What is considered a 'good' insulation resistance reading in practice?",
      options: ["Exactly 1 MΩ", "Several MΩ or higher", "0.5 MΩ", "Any positive reading"],
      correctAnswer: 1,
      explanation: "In practice, good insulation typically shows readings of several megaohms or higher, well above the minimum 1 MΩ requirement."
    },
    {
      id: 6,
      question: "If parallel paths exist during testing, how might this affect the reading?",
      options: ["Increase the reading", "Make the reading artificially lower", "Have no effect", "Make it more accurate"],
      correctAnswer: 1,
      explanation: "Parallel paths can make insulation resistance readings artificially lower, which is why proper isolation is crucial."
    },
    {
      id: 7,
      question: "What action should be taken if a circuit fails the insulation resistance test?",
      options: ["Energise it anyway", "Do not energise until fault is found and rectified", "Test it again tomorrow", "Reduce the test voltage"],
      correctAnswer: 1,
      explanation: "A circuit that fails the insulation resistance test must not be energised until the fault is located and properly rectified."
    },
    {
      id: 8,
      question: "Which factor is most likely to cause temporarily low readings?",
      options: ["Cold weather", "Moisture or dampness", "High voltage", "New cables"],
      correctAnswer: 1,
      explanation: "Moisture or dampness is the most common cause of temporarily low insulation resistance readings."
    },
    {
      id: 9,
      question: "When should insulation resistance results be recorded?",
      options: ["The next day", "Immediately after testing", "At the end of the week", "Only if they fail"],
      correctAnswer: 1,
      explanation: "Results should be recorded immediately after testing to ensure accuracy and prevent confusion with other readings."
    },
    {
      id: 10,
      question: "In the real-world example, what caused the apparent insulation fault?",
      options: ["Damaged cables", "Moisture in the installation", "Faulty test equipment", "High ambient temperature"],
      correctAnswer: 1,
      explanation: "Moisture in a basement consumer unit caused low readings, which improved significantly once the moisture was removed and the installation dried out."
    }
  ];

  const faqs = [
    {
      question: "What is the minimum insulation resistance value according to BS 7671?",
      answer: "Generally 1 MΩ for most low-voltage circuits, though specific requirements may vary depending on the installation type and voltage rating."
    },
    {
      question: "Can environmental conditions affect test results?",
      answer: "Yes. Temperature, humidity, moisture, and contamination can all significantly impact insulation resistance readings."
    },
    {
      question: "What should I do if readings are borderline (close to 1 MΩ)?",
      answer: "Investigate further. Look for potential causes such as moisture, contamination, or poor connections before deciding whether to energise."
    },
    {
      question: "Is it safe to energise a circuit with readings just above 1 MΩ?",
      answer: "While technically compliant, it's good practice to investigate why readings are close to the minimum. Higher readings are expected in good installations."
    },
    {
      question: "How do I distinguish between genuine faults and test errors?",
      answer: "Repeat the test, check connections, verify isolation, and consider environmental factors. Consistent low readings usually indicate genuine issues."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.5.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Interpreting Insulation Resistance Test Results
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding minimum values, interpreting readings and making safety decisions against BS 7671
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              <strong className="text-elec-yellow">In 30 seconds:</strong> Minimum 1MΩ for most LV circuits. High readings = good insulation. Low readings = investigate before energising. Consider environmental factors.
            </p>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• <strong>Spot:</strong> Readings below 1MΩ or borderline values</li>
              <li>• <strong>Use:</strong> BS 7671 minimum values as guidance</li>
              <li>• <strong>Check:</strong> Environmental factors affecting readings</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p className="text-white/70 mb-4">By the end of this subsection, learners will be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Identify the minimum insulation resistance values specified in BS 7671</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Interpret test readings and determine whether they are satisfactory</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Understand factors that can affect insulation resistance readings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Make appropriate safety decisions based on test results</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Interpreting insulation resistance test results correctly is crucial for electrical safety. BS 7671 provides minimum acceptable values, but understanding what these readings mean in practice - and when to take action - requires experience and knowledge.
              </p>
            </div>
          </section>

          {/* Minimum Values */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Minimum Values According to BS 7671
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <p>
                BS 7671 establishes clear minimum insulation resistance values. For circuits up to 500V, the absolute minimum is <strong>1MΩ</strong> when tested at 500V DC. Any reading of 1MΩ or below constitutes an automatic failure.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Critical Failure Thresholds</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>≤ 1MΩ:</strong> Automatic failure - circuit must not be energised</li>
                  <li>• <strong>0.5-1MΩ:</strong> Serious insulation breakdown requiring immediate investigation</li>
                  <li>• <strong>&lt;0.5MΩ:</strong> Dangerous condition - potential imminent failure</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Investigation Thresholds</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>1.1-2MΩ:</strong> Requires investigation before energising</li>
                  <li>• <strong>2.1-5MΩ:</strong> Monitor closely, consider environmental factors</li>
                  <li>• <strong>&gt;5MΩ:</strong> Generally satisfactory for most installations</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="minimum-values-check"
            question="What is the minimum insulation resistance value for most low-voltage circuits according to BS 7671?"
            options={["0.5 MΩ", "1 MΩ", "2 MΩ", "5 MΩ"]}
            correctIndex={1}
            explanation="BS 7671 specifies a minimum of 1 MΩ for most low-voltage circuits, though this is considered the absolute minimum and higher values are expected in good installations."
          />

          {/* Interpreting Readings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Interpreting High and Low Readings
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-3">High Resistance Readings (Good Condition)</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>10-50MΩ:</strong> Excellent condition, new or well-maintained cables</li>
                  <li>• <strong>5-10MΩ:</strong> Very good condition, suitable for energising</li>
                  <li>• <strong>2-5MΩ:</strong> Good condition but monitor trends over time</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Borderline Readings (Requires Investigation)</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>1.5-2MΩ:</strong> May indicate ageing, moisture, or contamination</li>
                  <li>• <strong>1.1-1.5MΩ:</strong> Strong indication of developing problems</li>
                  <li>• <strong>1.01-1.1MΩ:</strong> Technically compliant but professionally concerning</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Low Readings (Failure Conditions)</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>0.8-1MΩ:</strong> Insulation breakdown, investigate immediately</li>
                  <li>• <strong>0.3-0.8MΩ:</strong> Significant deterioration, likely moisture/damage</li>
                  <li>• <strong>&lt;0.3MΩ:</strong> Dangerous condition, potential short circuit risk</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="interpretation-check"
            question="What does a reading significantly below 1 MΩ indicate?"
            options={["Perfect insulation", "Possible insulation breakdown or contamination", "Normal wear", "High efficiency"]}
            correctIndex={1}
            explanation="A reading well below 1 MΩ suggests potential insulation breakdown, moisture ingress, contamination, or physical damage that requires investigation."
          />

          {/* Factors Affecting Results */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Factors Affecting Results
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Environmental Factors</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Temperature:</strong> Higher temps reduce readings by ~2% per °C above 20°C</li>
                  <li>• <strong>Humidity:</strong> &gt;80% relative humidity can halve resistance values</li>
                  <li>• <strong>Moisture:</strong> Direct water contact can drop readings to &lt;0.1MΩ</li>
                  <li>• <strong>Contamination:</strong> Dust, grease, salt spray reduce surface resistance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Cable Age and Condition</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>New cables (0-5 years):</strong> Typically 20-100MΩ+</li>
                  <li>• <strong>Mature cables (5-15 years):</strong> Usually 5-20MΩ in good condition</li>
                  <li>• <strong>Older cables (15-25 years):</strong> May show 2-8MΩ if well maintained</li>
                  <li>• <strong>Ageing cables (25+ years):</strong> Often 1-3MΩ, requiring close monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="factors-check"
            question="Which factor is most likely to cause temporarily low readings?"
            options={["Cold weather", "Moisture or dampness", "High voltage", "New cables"]}
            correctIndex={1}
            explanation="Moisture or dampness is the most common cause of temporarily low insulation resistance readings, especially in damp environments or during wet weather."
          />

          {/* Making Safety Decisions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Making Safety Decisions
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Immediate Action Required (Do NOT Energise)</h3>
                <ul className="text-sm space-y-2">
                  <li>• Any reading ≤ 1MΩ - automatic failure requiring fault investigation</li>
                  <li>• Significant reading variation between repeat tests</li>
                  <li>• Evidence of physical damage or moisture ingress</li>
                  <li>• Downward trend in successive periodic inspections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Investigation Before Energising (1.1-2MΩ)</h3>
                <ul className="text-sm space-y-2">
                  <li>• Check environmental conditions (temperature, humidity)</li>
                  <li>• Verify proper isolation and test setup</li>
                  <li>• Consider cable age and historical test results</li>
                  <li>• Repeat test after environmental improvement if applicable</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-3">Generally Safe to Energise (&gt;2MΩ)</h3>
                <ul className="text-sm space-y-2">
                  <li>• High confidence in circuit safety</li>
                  <li>• Still monitor future test trends</li>
                  <li>• Record results and any observations</li>
                  <li>• Consider if readings are appropriate for installation age/type</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="decisions-check"
            question="If you get a reading of 0.3 MΩ, what should you do?"
            options={["Accept it as satisfactory", "Investigate and rectify before energising", "Energise the circuit", "Ignore the reading"]}
            correctIndex={1}
            explanation="Any reading below 1 MΩ requires investigation and rectification before the circuit can be safely energised. Never compromise on safety."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Good insulation typically shows readings well above the minimum - several MΩ is normal</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Borderline readings (close to 1MΩ) should be investigated even if they technically comply</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Consider environmental factors - moisture and humidity can temporarily reduce readings</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Repeat tests if results are unexpected or inconsistent</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>When in doubt, don't energise - investigate further or seek advice</span>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-white font-medium mb-3">Office Building - Moisture Issue</p>
              <div className="text-white/80 text-sm space-y-3 leading-relaxed">
                <p>
                  During a periodic inspection at an office building, an electrician found insulation resistance readings of only 0.4MΩ on several lighting circuits. Initially concerned about widespread insulation failure, he investigated further.
                </p>
                <p>
                  He discovered that the consumer unit was located in a basement area with high humidity and some water ingress. After the moisture issue was resolved and the installation allowed to dry out, the same circuits showed readings above 5MΩ, well within acceptable limits.
                </p>
                <p className="font-medium text-green-400 mt-3">
                  Lesson: Environmental factors can significantly affect readings. Don't immediately assume permanent damage - investigate the root cause first.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-white/10 rounded-lg px-4 bg-white/5"
                >
                  <AccordionTrigger className="text-white hover:text-elec-yellow text-left text-sm py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Key Takeaways
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Minimum Values</h3>
                <p className="text-white/70 text-xs">1MΩ minimum for LV circuits per BS 7671, higher values expected</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-2 text-sm">Interpretation</h3>
                <p className="text-white/70 text-xs">High readings = good insulation, low readings = investigate</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-blue-400 mb-2 text-sm">Factors</h3>
                <p className="text-white/70 text-xs">Environment, moisture, temperature affect readings</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-2 text-sm">Safety Decisions</h3>
                <p className="text-white/70 text-xs">When in doubt, investigate - never compromise safety</p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Performing the Test
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 6.5
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section5_4;
