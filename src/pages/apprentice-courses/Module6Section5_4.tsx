import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section5_4 = () => {
  useSEO(
    "Interpreting Insulation Resistance Test Results against BS 7671 - Level 2 Electrical Testing & Inspection",
    "Understanding minimum values, interpreting readings and making safety decisions"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.5.4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Interpreting Insulation Resistance Test Results against BS 7671
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding minimum values, interpreting readings and making safety decisions
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Minimum 1 MΩ for most LV circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>High readings = good insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Low readings = investigate before energising</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Consider environmental factors</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Readings below 1 MΩ or borderline values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> BS 7671 minimum values as guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Environmental factors affecting readings</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Interpreting insulation resistance test results correctly is crucial for electrical safety. BS 7671 provides minimum acceptable values, but understanding what these readings mean in practice — and when to take action — requires experience and knowledge. A reading that technically meets the standard may still indicate potential problems, while seemingly low readings might be explained by environmental factors. This subsection explains how to interpret results professionally and make informed decisions about circuit safety.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify the minimum insulation resistance values specified in BS 7671</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Interpret test readings and determine whether they are satisfactory</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand factors that can affect insulation resistance readings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Make appropriate safety decisions based on test results</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Minimum Values according to BS 7671 */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Minimum Values according to BS 7671</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        BS 7671 establishes clear minimum insulation resistance values that form the foundation of electrical safety. For circuits up to 500V (most domestic and commercial installations), the absolute minimum is <strong>1 MΩ</strong> when tested at 500V DC. Any reading of 1 MΩ or below constitutes an automatic failure and the circuit must not be energised under any circumstances.
                      </p>
                      
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Critical Failure Thresholds:</h4>
                        <ul className="text-sm space-y-1 text-red-700 text-elec-yellow">
                          <li>• <strong>≤ 1 MΩ:</strong> Automatic failure - circuit must not be energised</li>
                          <li>• <strong>0.5 - 1 MΩ:</strong> Serious insulation breakdown requiring immediate investigation</li>
                          <li>• <strong>&lt; 0.5 MΩ:</strong> Dangerous condition - potential imminent failure</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Investigation Thresholds:</h4>
                        <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                          <li>• <strong>1.1 - 2 MΩ:</strong> Requires investigation before energising</li>
                          <li>• <strong>2.1 - 5 MΩ:</strong> Monitor closely, consider environmental factors</li>
                          <li>• <strong>&gt; 5 MΩ:</strong> Generally satisfactory for most installations</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        Different installation types have varying requirements. SELV circuits (&lt; 50V) require only 0.25 MΩ, while circuits between 500V-1000V require 1 MΩ, and those above 1000V require 1 MΩ per kV. However, these are absolute minimums - professional practice demands much higher values.
                      </p>
                    </div>
                  </div>
                </div>
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

          {/* 2. Interpreting High and Low Readings */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Interpreting High and Low Readings</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Understanding what different readings actually mean is crucial for making sound professional judgements. The reading tells a story about the condition of the insulation and the potential risks involved.
                      </p>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">High Resistance Readings (Good Condition):</h4>
                        <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                          <li>• <strong>10-50 MΩ:</strong> Excellent condition, new or well-maintained cables</li>
                          <li>• <strong>5-10 MΩ:</strong> Very good condition, suitable for energising</li>
                          <li>• <strong>2-5 MΩ:</strong> Good condition but monitor trends over time</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Borderline Readings (Requires Investigation):</h4>
                        <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                          <li>• <strong>1.5-2 MΩ:</strong> May indicate ageing, moisture, or contamination</li>
                          <li>• <strong>1.1-1.5 MΩ:</strong> Strong indication of developing problems</li>
                          <li>• <strong>1.01-1.1 MΩ:</strong> Technically compliant but professionally concerning</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Low Readings (Failure Conditions):</h4>
                        <ul className="text-sm space-y-1 text-red-700 text-elec-yellow">
                          <li>• <strong>0.8-1 MΩ:</strong> Insulation breakdown, investigate immediately</li>
                          <li>• <strong>0.3-0.8 MΩ:</strong> Significant deterioration, likely moisture/damage</li>
                          <li>• <strong>&lt; 0.3 MΩ:</strong> Dangerous condition, potential short circuit risk</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        Remember that readings can vary with environmental conditions. A reading of 1.8 MΩ in cold, dry conditions might drop to 0.9 MΩ in warm, humid weather - both readings tell you about the same cable in different conditions.
                      </p>
                    </div>
                  </div>
                </div>
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

          {/* 3. Factors Affecting Results */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3 text-base">Factors Affecting Results</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Multiple factors can significantly influence insulation resistance readings. Understanding these helps distinguish between genuine insulation faults and temporary conditions that might resolve naturally.
                      </p>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Environmental Factors:</h4>
                        <ul className="text-sm space-y-1 text-blue-700 text-elec-yellow">
                          <li>• <strong>Temperature:</strong> Higher temps reduce readings by ~2% per °C above 20°C</li>
                          <li>• <strong>Humidity:</strong> &gt;80% relative humidity can halve resistance values</li>
                          <li>• <strong>Moisture:</strong> Direct water contact can drop readings to &lt;0.1 MΩ</li>
                          <li>• <strong>Contamination:</strong> Dust, grease, salt spray reduce surface resistance</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Cable Age and Condition:</h4>
                        <ul className="text-sm space-y-1 text-purple-700 text-elec-yellow">
                          <li>• <strong>New cables (0-5 years):</strong> Typically 20-100 MΩ+</li>
                          <li>• <strong>Mature cables (5-15 years):</strong> Usually 5-20 MΩ in good condition</li>
                          <li>• <strong>Older cables (15-25 years):</strong> May show 2-8 MΩ if well maintained</li>
                          <li>• <strong>Ageing cables (25+ years):</strong> Often 1-3 MΩ, requiring close monitoring</li>
                          <li>• <strong>Deteriorating cables:</strong> Readings trending downward over successive tests</li>
                        </ul>
                      </div>

                      <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-3">
                        <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">Installation Factors:</h4>
                        <ul className="text-sm space-y-1 text-cyan-700 dark:text-cyan-300">
                          <li>• <strong>Cable length:</strong> Longer runs may show slightly lower readings</li>
                          <li>• <strong>Cable type:</strong> PVC degrades faster than XLPE in heat/UV</li>
                          <li>• <strong>Installation method:</strong> Underground/damp areas more susceptible</li>
                          <li>• <strong>Parallel paths:</strong> Multiple circuits can create false low readings</li>
                          <li>• <strong>Connected equipment:</strong> Electronics can provide leakage paths</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        <strong>Critical Point:</strong> A cable showing 15 MΩ when new might legitimately read 2 MΩ after 20 years of service and still be perfectly safe. Context and trends matter more than absolute values.
                      </p>
                    </div>
                  </div>
                </div>
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

          {/* 4. Making Safety Decisions */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Making Safety Decisions</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Professional electrical work demands sound decision-making based on test results, industry standards, and safety principles. The decision to energise a circuit should never be taken lightly or based solely on whether readings technically meet minimum standards.
                      </p>

                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Immediate Action Required (Do NOT Energise):</h4>
                        <ul className="text-sm space-y-1 text-red-700 text-elec-yellow">
                          <li>• Any reading ≤ 1 MΩ - automatic failure requiring fault investigation</li>
                          <li>• Significant reading variation between repeat tests</li>
                          <li>• Evidence of physical damage or moisture ingress</li>
                          <li>• Downward trend in successive periodic inspections</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Investigation Before Energising (1.1-2 MΩ):</h4>
                        <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                          <li>• Check environmental conditions (temperature, humidity)</li>
                          <li>• Verify proper isolation and test setup</li>
                          <li>• Consider cable age and historical test results</li>
                          <li>• Repeat test after environmental improvement if applicable</li>
                          <li>• Document reasoning for energising if proceeding</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Generally Safe to Energise (&gt; 2 MΩ):</h4>
                        <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                          <li>• High confidence in circuit safety</li>
                          <li>• Still monitor future test trends</li>
                          <li>• Record results and any observations</li>
                          <li>• Consider if readings are appropriate for installation age/type</li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 dark:bg-[#121212]/20 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Professional Decision Matrix:</h4>
                        <div className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                          <p><strong>Consider these factors together:</strong></p>
                          <ul className="space-y-1 ml-4">
                            <li>• Absolute reading value vs BS 7671 minimums</li>
                            <li>• Installation age and expected performance</li>
                            <li>• Environmental conditions during testing</li>
                            <li>• Circuit criticality and safety implications</li>
                            <li>• Historical trend data if available</li>
                            <li>• Client requirements and risk tolerance</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Documentation Requirements:</h4>
                        <ul className="text-sm space-y-1 text-blue-700 text-elec-yellow">
                          <li>• Always record actual readings, not just "PASS/FAIL"</li>
                          <li>• Note environmental conditions during testing</li>
                          <li>• Document any remedial actions taken</li>
                          <li>• Include professional judgement reasoning for borderline cases</li>
                          <li>• Recommend monitoring intervals for ageing installations</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        <strong>Remember:</strong> Your professional competence and legal responsibilities extend beyond simply meeting minimum standards. When in doubt, always err on the side of caution - it's better to investigate further or delay energising than to risk safety.
                      </p>
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Good insulation typically shows readings well above the minimum — several megaohms is normal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Borderline readings (close to 1 MΩ) should be investigated even if they technically comply</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Consider environmental factors — moisture and humidity can temporarily reduce readings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Repeat tests if results are unexpected or inconsistent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>When in doubt, don't energise — investigate further or seek advice</span>
            </li>
          </ul>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-white">
              During a periodic inspection at an office building, an electrician found insulation resistance readings of only 0.4 MΩ on several lighting circuits. Initially concerned about widespread insulation failure, he investigated further and discovered that the consumer unit was located in a basement area with high humidity and some water ingress. After the moisture issue was resolved and the installation allowed to dry out, the same circuits showed readings above 5 MΩ, well within acceptable limits.
            </p>
            <div className="p-3 sm:p-4 bg-transparent border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                ✅ <strong>Lesson:</strong> Environmental factors can significantly affect readings. Don't immediately assume permanent damage — investigate the root cause first.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-primary/20 pl-4">
                <p className="font-medium text-white mb-2 text-sm sm:text-base">
                  <strong>Q:</strong> {faq.question}
                </p>
                <p className="text-white text-sm">
                  <strong>A:</strong> {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">📋 Pocket Guide: Interpreting IR Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-white">BS 7671 Values:</h3>
              <ul className="space-y-1 text-white">
                <li>• Minimum: 1 MΩ (LV circuits)</li>
                <li>• Good practice: Several MΩ+</li>
                <li>• Borderline: Close to minimum</li>
                <li>• Unacceptable: Below 1 MΩ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-white">Decision Matrix:</h3>
              <ul className="space-y-1 text-white">
                <li>• High readings: Safe to energise</li>
                <li>• Borderline: Investigate first</li>
                <li>• Low readings: Do not energise</li>
                <li>• Consider environment factors</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg border border-elec-yellow/20">
              <h3 className="font-medium text-blue-700 text-elec-yellow mb-2 text-sm">Minimum Values</h3>
              <p className="text-xs text-white">1 MΩ minimum for LV circuits per BS 7671, higher values expected</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-green-500/20">
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-2 text-sm">Interpretation</h3>
              <p className="text-xs text-white">High readings = good insulation, low readings = investigate</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-orange-500/20">
              <h3 className="font-medium text-orange-700 text-elec-yellow mb-2 text-sm">Factors</h3>
              <p className="text-xs text-white">Environment, moisture, temperature affect readings</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-red-500/20">
              <h3 className="font-medium text-red-700 text-elec-yellow mb-2 text-sm">Safety Decisions</h3>
              <p className="text-xs text-white">When in doubt, investigate — never compromise safety</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz
            title="Interpreting IR Test Results Quiz"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="order-2 sm:order-1" asChild>
            <Link to="../5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Performing the IR Test
            </Link>
          </Button>
          <Button className="order-1 sm:order-2" asChild>
            <Link to="..">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section5_4;