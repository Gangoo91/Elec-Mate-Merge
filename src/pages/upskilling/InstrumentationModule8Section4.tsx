import { ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Preventive Maintenance Routines - Instrumentation Course";
const DESCRIPTION = "Learn preventive maintenance best practices for instrumentation systems including PM checklists, calibration scheduling, and high-risk area identification.";

const quickCheckQuestions = [
  {
    question: "What's the primary goal of preventive maintenance?",
    options: [
      "To keep technicians busy",
      "To identify potential problems before they cause failures",
      "To replace all equipment regularly",
      "To document everything"
    ],
    correctAnswer: 1
  },
  {
    question: "How often should critical process instruments typically be calibrated?",
    options: [
      "Every 5 years",
      "Every 6 months",
      "Only when they fail",
      "Weekly"
    ],
    correctAnswer: 1
  }
];

const quizQuestions = [
  {
    id: "im8s4-q1",
    question: "What's the main goal of preventive maintenance?",
    options: [
      "To keep technicians busy",
      "To identify and address potential problems before they cause failures, reducing downtime and costs",
      "To replace all equipment regularly",
      "To satisfy management requirements"
    ],
    correctAnswer: 1,
    explanation: "The main goal of preventive maintenance is to identify and address potential problems before they cause failures, thereby reducing downtime, costs, and safety risks."
  },
  {
    id: "im8s4-q2",
    question: "Name two items you'd check during a PM inspection.",
    options: [
      "Only calibration certificates",
      "Cable termination tightness and junction box seal integrity",
      "Just the sensor readings",
      "Only the documentation"
    ],
    correctAnswer: 1,
    explanation: "During PM inspections, you should check cable termination tightness to prevent loose connections and junction box seal integrity to prevent moisture ingress."
  },
  {
    id: "im8s4-q3",
    question: "Why are cable glands important to inspect?",
    options: [
      "They're expensive to replace",
      "They prevent moisture ingress which can cause corrosion, signal degradation, and system failures",
      "They look nice when clean",
      "They're easy to check"
    ],
    correctAnswer: 1,
    explanation: "Cable glands are critical sealing points that prevent moisture ingress. Failed glands allow water into enclosures, causing corrosion, signal degradation, and potential system failures."
  },
  {
    id: "im8s4-q4",
    question: "How can PM prevent calibration errors?",
    options: [
      "By replacing all sensors annually",
      "By tracking calibration dates, monitoring drift trends, and scheduling timely recalibration",
      "By never calibrating anything",
      "By using only digital instruments"
    ],
    correctAnswer: 1,
    explanation: "PM prevents calibration errors by tracking calibration due dates, monitoring performance trends for drift, and ensuring timely recalibration before accuracy degrades."
  },
  {
    id: "im8s4-q5",
    question: "What's a good tool for scheduling PM tasks?",
    options: [
      "Paper notebooks only",
      "CMMS (Computerised Maintenance Management System) or electronic scheduling systems",
      "Memory alone",
      "Random scheduling"
    ],
    correctAnswer: 1,
    explanation: "A CMMS or electronic scheduling system provides automated reminders, tracks maintenance history, manages resources, and ensures consistent execution of PM activities."
  }
];

const faqs = [
  {
    question: "How do I decide on PM frequency for different instruments?",
    answer: "Consider criticality (safety, environmental, production impact), historical reliability data, manufacturer recommendations, and environmental conditions. Critical safety instruments may need monthly checks whilst non-critical monitoring devices might only need annual inspection."
  },
  {
    question: "What should I do if I find a problem during PM?",
    answer: "Document the finding immediately, assess severity and impact, implement temporary controls if needed, raise a work order for corrective action, and update the PM schedule if the issue indicates a need for more frequent checks."
  },
  {
    question: "How do I track calibration drift?",
    answer: "Record as-found readings before any adjustments during each calibration. Compare these over time to identify drift patterns. Modern CMMS systems can graph this data automatically and alert you to accelerating drift that might indicate impending failure."
  },
  {
    question: "What are high-risk areas that need extra attention?",
    answer: "Hazardous area equipment, safety instrumented systems (SIS), emergency shutdown systems, environmental monitoring, and any instrument where failure could cause injury, environmental damage, or significant production loss."
  }
];

const InstrumentationModule8Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <Link to="/upskilling/instrumentation-module-8">
            <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module 8
            </Button>
          </Link>
        </div>
      </div>

      {/* Centred Title Header */}
      <div className="px-4 pt-6 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
          <Shield className="h-6 w-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Preventive Maintenance Routines</h1>
        <p className="text-gray-400 text-sm">Section 8.4 - 25 minutes</p>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 max-w-3xl mx-auto">
        {/* Quick Summary Boxes - Level 2 Pattern */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>- PM reduces breakdowns and costs</li>
              <li>- Clean sensors, check terminations</li>
              <li>- Track calibration dates religiously</li>
              <li>- Monitor trends for early warnings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Monthly visual inspections</li>
              <li>- Quarterly cleaning and tightening</li>
              <li>- Annual calibration verification</li>
              <li>- High-risk areas need extra attention</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="bg-card/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm">Define what's included in preventive maintenance (PM)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">Learn how to create a basic PM checklist</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">Recognise high-risk areas that need regular checks</p>
            </div>
          </div>
        </div>

        {/* Section 01: Essential PM Tasks */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Essential PM Tasks</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Preventive maintenance reduces breakdowns, improves safety, and extends the life
              of instrumentation systems. A well-structured preventive maintenance programme
              identifies potential problems before they cause costly failures or safety incidents.
            </p>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-3">Clean Sensors and Inspect for Physical Damage</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white font-medium mb-2">Cleaning Procedures</p>
                    <ul className="text-sm space-y-1">
                      <li>- Remove buildup without damaging elements</li>
                      <li>- Check for corrosion and scale formation</li>
                      <li>- Clear impulse lines and drain ports</li>
                      <li>- Inspect for debris and alignment issues</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium mb-2">Physical Inspection</p>
                    <ul className="text-sm space-y-1">
                      <li>- Housing integrity (cracks, corrosion)</li>
                      <li>- Cable entry points and strain relief</li>
                      <li>- Mounting hardware condition</li>
                      <li>- Process connections for leaks</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-3">Verify Cable Terminations and Grounding</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white font-medium mb-2">Cable Checks</p>
                    <ul className="text-sm space-y-1">
                      <li>- Terminal tightness</li>
                      <li>- Wire condition (fraying, oxidation)</li>
                      <li>- Strain relief verification</li>
                      <li>- Label updates</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium mb-2">Grounding System</p>
                    <ul className="text-sm space-y-1">
                      <li>- Earth continuity resistance</li>
                      <li>- Shield connections</li>
                      <li>- Ground rod condition</li>
                      <li>- Bonding connections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctAnswer={quickCheckQuestions[0].correctAnswer}
          />
        </div>

        {/* Section 02: Calibration Management */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Calibration Management</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Confirming calibration dates and rescheduling when needed is a critical part of PM.
              Drift in instrument readings can cause process problems, safety risks, and compliance issues.
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-medium mb-3">Calibration Frequency Guidelines</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-card/30 rounded p-3">
                    <p className="text-white font-medium text-sm">Critical Applications</p>
                    <p className="text-elec-yellow text-lg font-mono">Every 6 months</p>
                    <p className="text-gray-400 text-xs">Safety, environmental, SIS</p>
                  </div>
                  <div className="bg-card/30 rounded p-3">
                    <p className="text-white font-medium text-sm">Standard Process</p>
                    <p className="text-elec-yellow text-lg font-mono">Annual</p>
                    <p className="text-gray-400 text-xs">Normal production instruments</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-card/30 rounded p-3">
                    <p className="text-white font-medium text-sm">Non-Critical Monitoring</p>
                    <p className="text-elec-yellow text-lg font-mono">Bi-annual</p>
                    <p className="text-gray-400 text-xs">Indication only, no control</p>
                  </div>
                  <div className="bg-card/30 rounded p-3">
                    <p className="text-white font-medium text-sm">Environmental Factors</p>
                    <p className="text-elec-yellow text-lg font-mono">Adjust as needed</p>
                    <p className="text-gray-400 text-xs">Harsh conditions = more frequent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: PM Checklist Template */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">PM Checklist Template</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              A structured checklist ensures consistent maintenance across all technicians
              and prevents important tasks from being overlooked.
            </p>
            <div className="bg-card/30 rounded-lg p-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    Monthly Tasks
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Visual inspection of field devices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Check alarm log for unusual activity
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Inspect junction box seals
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Review trending data for drift
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    Quarterly Tasks
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      Clean sensor elements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      Test ground system continuity
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      Verify cable termination tightness
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      Update calibration schedule
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    Annual Tasks
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Complete calibration verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Insulation resistance testing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Replace desiccant packs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Comprehensive performance review
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    High-Risk Areas
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-400" />
                      Hazardous area certifications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-400" />
                      Safety instrumented systems
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-400" />
                      Critical process measurements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-400" />
                      Emergency shutdown systems
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctAnswer={quickCheckQuestions[1].correctAnswer}
          />
        </div>

        {/* Section 04: Real World Example */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Real World Example</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-3">Routine Maintenance Reveals Hidden Corrosion</h4>
            <p className="text-gray-300 text-sm mb-4">
              During a routine quarterly inspection, a technician discovers early signs of
              corrosion on a field transmitter cable gland. The proactive maintenance
              approach prevents a costly signal failure and potential safety incident.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">1</span>
                <p className="text-sm text-gray-300">White crystalline deposits noticed around cable entry</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">2</span>
                <p className="text-sm text-gray-300">Removed cable gland to inspect internal condition</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">3</span>
                <p className="text-sm text-gray-300">Found damaged seal allowing moisture ingress</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">4</span>
                <p className="text-sm text-gray-300">Replaced gland and upgraded to better seal material</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">5</span>
                <p className="text-sm text-gray-300">Added similar transmitters to enhanced inspection schedule</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <p className="text-green-400 font-medium text-sm mb-1">Result</p>
              <p className="text-gray-300 text-sm">
                The proactive approach caught the problem before signal degradation occurred,
                preventing an estimated GBP15,000 in production losses. The replacement cost
                was less than GBP200, demonstrating the value of systematic preventive maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Practical Guidance</h3>
          <div className="bg-card/30 rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Use a CMMS to track all PM tasks with automated reminders and work order generation.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Take photos during inspections to document condition and create a historical record.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Review alarm logs regularly - frequent alarms often indicate developing problems.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Coordinate PM schedules with production to minimise process interruptions.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <Quiz
            title="Section 8.4 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Link to="/upskilling/instrumentation-module-8-section-3">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-8-section-5">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation active:scale-[0.98]">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule8Section4;
