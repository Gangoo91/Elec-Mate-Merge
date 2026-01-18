import { ArrowLeft, ArrowRight, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documenting Faults and Generating Service Reports - Instrumentation Course";
const DESCRIPTION = "Learn professional fault documentation and service report writing for instrumentation systems, including templates, best practices, and compliance requirements.";

const quickCheckQuestions = [
  {
    question: "What's the primary benefit of documenting before-and-after readings?",
    options: [
      "It looks professional",
      "It proves the fault existed and verifies the repair was successful",
      "It's required by insurance",
      "It increases billable hours"
    ],
    correctAnswer: 1
  },
  {
    question: "Why should technicians use standardised report templates?",
    options: [
      "To make reports longer",
      "To ensure consistent information capture across all technicians",
      "Because management requires it",
      "To avoid thinking"
    ],
    correctAnswer: 1
  }
];

const quizQuestions = [
  {
    id: "im8s5-q1",
    question: "Why are before-and-after readings useful in reports?",
    options: [
      "They look professional",
      "They prove the fault existed and verify the repair was successful",
      "They're required by law",
      "They increase the cost of service"
    ],
    correctAnswer: 1,
    explanation: "Before-and-after readings provide evidence that a fault existed and demonstrate that the repair was successful, creating accountability and verification of work quality."
  },
  {
    id: "im8s5-q2",
    question: "What should every service report include?",
    options: [
      "Only the final result",
      "Device ID, date/time, technician name, fault description, actions taken, and verification results",
      "Just the part numbers used",
      "Only photos of the equipment"
    ],
    correctAnswer: 1,
    explanation: "Every service report should include device identification, timestamps, technician details, fault description, actions taken, and verification results to ensure complete documentation."
  },
  {
    id: "im8s5-q3",
    question: "How can reports help identify trends?",
    options: [
      "They can't help with trends",
      "By reviewing multiple reports over time to spot recurring patterns, common failure modes, and environmental factors",
      "Only if they're very detailed",
      "By comparing costs only"
    ],
    correctAnswer: 1,
    explanation: "Reviewing multiple reports over time reveals patterns like recurring failure modes, environmental factors, or design weaknesses that aren't apparent from individual incidents."
  },
  {
    id: "im8s5-q4",
    question: "What's the benefit of using a template?",
    options: [
      "It looks more professional",
      "It ensures consistent information capture, mandatory fields completion, and standardised format across all technicians",
      "It's faster to complete",
      "It reduces paper usage"
    ],
    correctAnswer: 1,
    explanation: "Templates ensure consistent information capture across all technicians, guarantee mandatory fields are completed, and create standardised formats that support quality control and database integration."
  },
  {
    id: "im8s5-q5",
    question: "Why attach photos or test data?",
    options: [
      "To make reports longer",
      "To provide visual evidence of faults, document repair quality, and support future diagnostics with actual measurements",
      "Because cameras are expensive",
      "To impress management"
    ],
    correctAnswer: 1,
    explanation: "Photos and test data provide visual evidence of faults, document repair quality, support warranty claims, and give future technicians actual measurements and visual references for similar problems."
  }
];

const faqs = [
  {
    question: "How detailed should my fault description be?",
    answer: "Detailed enough that another technician could understand what happened without asking questions. Include symptoms, when and how the fault was discovered, duration, frequency (intermittent or continuous), and impact on operations."
  },
  {
    question: "What if I don't have time for detailed documentation?",
    answer: "Use voice recording or quick notes during the job, then complete the formal report immediately after. Templates speed up the process significantly. Poor documentation costs more time in the long run when faults recur or warranty claims fail."
  },
  {
    question: "Should I document even minor repairs?",
    answer: "Yes. Minor repairs today can indicate developing problems. A pattern of minor issues on the same equipment often predicts major failure. This data is also valuable for maintenance planning and budgeting."
  },
  {
    question: "How long should I keep service reports?",
    answer: "Follow your organisation's retention policy, but typically 7-10 years minimum for compliance purposes. Many organisations keep records for the entire asset lifecycle. Electronic systems make long-term storage practical and searchable."
  }
];

const InstrumentationModule8Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-8">
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
          <FileText className="h-6 w-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Documenting Faults and Generating Service Reports</h1>
        <p className="text-gray-400 text-sm">Section 8.5 - 20 minutes</p>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 max-w-3xl mx-auto">
        {/* Quick Summary Boxes - Level 2 Pattern */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Document before/after readings</li>
              <li>- Include device ID, date, technician</li>
              <li>- Attach photos and test data</li>
              <li>- Use templates for consistency</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Every fault needs documentation</li>
              <li>- Supports warranty claims</li>
              <li>- Reveals recurring patterns</li>
              <li>- Proves compliance</li>
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
              <p className="text-gray-300 text-sm">Know what should be included in a fault report</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">Learn the value of clear, professional documentation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">Link documentation to maintenance and compliance</p>
            </div>
          </div>
        </div>

        {/* Section 01: Essential Report Elements */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Essential Report Elements</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Good fault documentation supports future diagnostics, proves compliance, and
              creates a knowledge base. Professional documentation transforms individual
              fault-finding experiences into organisational knowledge.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3">Basic Information Required</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Device & Location</p>
                  <ul className="text-sm space-y-1">
                    <li>- Device tag number (e.g., PT-101A)</li>
                    <li>- Plant area and specific location</li>
                    <li>- Manufacturer and model</li>
                    <li>- Work order reference number</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Fault Description</p>
                  <ul className="text-sm space-y-1">
                    <li>- Exact symptoms observed</li>
                    <li>- Duration of the fault</li>
                    <li>- Frequency (intermittent/continuous)</li>
                    <li>- Impact on process operations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-3">Readings Before and After Fix</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Pre-Repair Measurements</p>
                  <ul className="text-sm space-y-1">
                    <li>- Signal values (mA readings)</li>
                    <li>- Controller indications</li>
                    <li>- Voltage measurements</li>
                    <li>- Resistance values</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Post-Repair Verification</p>
                  <ul className="text-sm space-y-1">
                    <li>- Corrected readings</li>
                    <li>- Calibration data</li>
                    <li>- Functional test results</li>
                    <li>- Alarm testing</li>
                  </ul>
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

        {/* Section 02: Actions and Documentation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Actions and Documentation</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Recording actions taken, parts used, and supporting evidence creates a complete
              picture of the maintenance event for future reference.
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-medium mb-3">Actions Taken</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Repair Actions</p>
                  <ul className="text-sm space-y-1">
                    <li>- Component replacements</li>
                    <li>- Calibration adjustments</li>
                    <li>- Connection repairs</li>
                    <li>- Cleaning procedures</li>
                    <li>- Software updates</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Parts Used</p>
                  <ul className="text-sm space-y-1">
                    <li>- Part numbers</li>
                    <li>- Quantities</li>
                    <li>- Manufacturer details</li>
                    <li>- Serial numbers</li>
                    <li>- Warranty info</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Tools & Time</p>
                  <ul className="text-sm space-y-1">
                    <li>- Test equipment used</li>
                    <li>- Calibration standards</li>
                    <li>- Safety equipment</li>
                    <li>- Special tools</li>
                    <li>- Time spent</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-3">Attach Photos Where Possible</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Visual Documentation</p>
                  <ul className="text-sm space-y-1">
                    <li>- Fault evidence (damaged components)</li>
                    <li>- Before/after comparison photos</li>
                    <li>- Installation details</li>
                    <li>- Meter readings and displays</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Supporting Documents</p>
                  <ul className="text-sm space-y-1">
                    <li>- Test certificates</li>
                    <li>- Wiring diagrams</li>
                    <li>- Trend data graphs</li>
                    <li>- Safety documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Report Template */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Service Report Template</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Using templates ensures consistency across all technicians and guarantees
              that critical information is never overlooked.
            </p>
            <div className="bg-card/50 rounded-lg p-4 font-mono text-sm">
              <div className="border-b border-gray-600 pb-3 mb-3">
                <p className="text-white font-bold text-centre">INSTRUMENTATION FAULT REPORT</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Work Order:</p>
                  <div className="border-b border-gray-600 h-6"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Date:</p>
                  <div className="border-b border-gray-600 h-6"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Technician:</p>
                  <div className="border-b border-gray-600 h-6"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Time:</p>
                  <div className="border-b border-gray-600 h-6"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-elec-yellow text-xs font-medium">DEVICE INFORMATION</p>
                  <p className="text-gray-400 text-xs mt-1">Tag Number: _______ Location: _______</p>
                </div>
                <div>
                  <p className="text-elec-yellow text-xs font-medium">FAULT DESCRIPTION</p>
                  <p className="text-gray-400 text-xs mt-1">Symptoms: _______________________</p>
                </div>
                <div>
                  <p className="text-elec-yellow text-xs font-medium">MEASUREMENTS</p>
                  <p className="text-gray-400 text-xs mt-1">Before: _______ After: _______</p>
                </div>
                <div>
                  <p className="text-elec-yellow text-xs font-medium">ACTIONS TAKEN</p>
                  <p className="text-gray-400 text-xs mt-1">[ ] Calibrated [ ] Cleaned [ ] Replaced [ ] Repaired</p>
                </div>
                <div>
                  <p className="text-elec-yellow text-xs font-medium">VERIFICATION</p>
                  <p className="text-gray-400 text-xs mt-1">Technician Sign: _______ Date: _______</p>
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
            <h4 className="text-blue-400 font-medium mb-3">Recurring Moisture Issue Revealed Through Documentation</h4>
            <p className="text-gray-300 text-sm mb-4">
              After several unexplained faults across different systems, the maintenance team
              reviews past service logs and discovers a recurring moisture issue affecting
              multiple assets, prompting a systematic design upgrade.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">1</span>
                <p className="text-sm text-gray-300">Analysis of 6 months of service reports</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">2</span>
                <p className="text-sm text-gray-300">Common thread: moisture-related failures in similar locations</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">3</span>
                <p className="text-sm text-gray-300">Root cause: poor drainage around junction boxes</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">4</span>
                <p className="text-sm text-gray-300">Cost of reactive repairs: GBP12,000 over 6 months</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">5</span>
                <p className="text-sm text-gray-300">Solution: upgraded IP rating and improved drainage</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <p className="text-green-400 font-medium text-sm mb-1">Result</p>
              <p className="text-gray-300 text-sm">
                The systematic documentation allowed the team to identify a design weakness
                that wasn't obvious from individual failures. The GBP8,000 upgrade investment
                eliminated future moisture-related failures, saving an estimated GBP24,000
                annually in maintenance costs.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Benefits of Professional Documentation</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Immediate Benefits</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  Faster diagnosis of similar faults
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  Proof of work completed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  Warranty claim support
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  Training material for new staff
                </li>
              </ul>
            </div>
            <div className="bg-card/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Long-term Value</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  Reliability trend analysis
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  Maintenance optimisation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  Design improvement guidance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  Regulatory compliance evidence
                </li>
              </ul>
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
            title="Section 8.5 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Link to="/upskilling/instrumentation-module-8-section-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-8-section-6">
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

export default InstrumentationModule8Section5;
