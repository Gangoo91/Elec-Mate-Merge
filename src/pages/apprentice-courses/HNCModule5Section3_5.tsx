import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Final Account - HNC Module 5 Section 3.5";
const DESCRIPTION = "Master final account procedures in building services projects: final measurement, account agreement, retention release, defects liability period, and financial close-out processes.";

const quickCheckQuestions = [
  {
    id: "final-measurement-purpose",
    question: "What is the primary purpose of final measurement in a building services contract?",
    options: ["To calculate profit margins", "To establish the true extent of work executed", "To determine liquidated damages", "To assess quality standards"],
    correctIndex: 1,
    explanation: "Final measurement establishes the actual extent of work executed on site, allowing accurate valuation of the completed works against the contract sum and any variations."
  },
  {
    id: "retention-release",
    question: "When is the second half of retention typically released?",
    options: ["At practical completion", "At the end of the defects liability period", "When the final account is agreed", "Six months after completion"],
    correctIndex: 1,
    explanation: "Half of retention is released at practical completion, and the remaining half is released at the end of the defects liability period once all defects have been satisfactorily rectified."
  },
  {
    id: "defects-liability",
    question: "What is the typical duration of a defects liability period in UK building contracts?",
    options: ["3 months", "6 months", "12 months", "24 months"],
    correctIndex: 2,
    explanation: "The defects liability period (also called rectification period) is typically 12 months from practical completion under most UK standard form contracts, though this can vary by contract."
  },
  {
    id: "final-certificate",
    question: "What does the issue of a Final Certificate signify?",
    options: ["Work has started", "Practical completion achieved", "Final settlement of all financial matters", "Planning permission granted"],
    correctIndex: 2,
    explanation: "The Final Certificate represents the conclusive settlement of financial matters between the parties, confirming the final contract sum and releasing any remaining retention."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a re-measurement contract, how is the final account determined?",
    options: [
      "By the original tender sum only",
      "By measuring actual work executed against bill rates",
      "By the contractor's submitted costs",
      "By averaging tender and final costs"
    ],
    correctAnswer: 1,
    explanation: "In re-measurement contracts, the final account is determined by measuring the actual quantities of work executed on site and valuing them against the rates in the bills of quantities."
  },
  {
    id: 2,
    question: "What percentage is typically held as retention in building services contracts?",
    options: ["1-2%", "3-5%", "8-10%", "15-20%"],
    correctAnswer: 1,
    explanation: "Retention is typically 3-5% of the contract sum in UK building contracts, with 5% being common. Half is released at practical completion and half at the end of the defects liability period."
  },
  {
    id: 3,
    question: "A contractor's final account includes provisional sum expenditure of £45,000. The provisional sum allowed was £50,000. What adjustment is made?",
    options: ["Add £45,000", "Deduct £5,000", "Deduct £50,000 and add £45,000", "No adjustment needed"],
    correctAnswer: 2,
    explanation: "The original provisional sum (£50,000) is omitted from the contract sum, and the actual expenditure (£45,000) is added. This results in a net credit of £5,000 to the employer."
  },
  {
    id: 4,
    question: "Under JCT contracts, within what period must the contractor submit their final account documentation?",
    options: ["1 month of practical completion", "3 months of practical completion", "6 months of practical completion", "12 months of practical completion"],
    correctAnswer: 2,
    explanation: "Under JCT contracts, the contractor must submit all documentation required for computing the final statement within 6 months of practical completion."
  },
  {
    id: 5,
    question: "Which document must be issued before the Final Certificate can be released?",
    options: ["Certificate of Practical Completion", "Certificate of Making Good Defects", "Building Regulations Completion Certificate", "Performance Bond"],
    correctAnswer: 1,
    explanation: "The Certificate of Making Good Defects (or Making Good certificate) must be issued confirming all defects have been remedied before the Final Certificate can be released."
  },
  {
    id: 6,
    question: "In lump sum contracts, variations are valued using:",
    options: [
      "Contractor's actual costs only",
      "Contract rates where applicable, or fair rates where not",
      "A fixed percentage of contract value",
      "Market rates at tender date"
    ],
    correctAnswer: 1,
    explanation: "Variations are valued using contract rates where the work is similar to bill items, or fair rates and prices where the work differs significantly and contract rates do not apply."
  },
  {
    id: 7,
    question: "What is the purpose of a retention bond?",
    options: [
      "To guarantee the contractor's performance",
      "To replace cash retention with a bank guarantee",
      "To secure payment from the employer",
      "To guarantee completion dates"
    ],
    correctAnswer: 1,
    explanation: "A retention bond allows the contractor to receive payment in full without cash retention being held, replacing it with a bank or insurance company guarantee for the same amount."
  },
  {
    id: 8,
    question: "A £2.5m electrical installation contract has 5% retention. What is released at practical completion?",
    options: ["£62,500", "£125,000", "£250,000", "£25,000"],
    correctAnswer: 0,
    explanation: "Total retention is £2,500,000 x 5% = £125,000. Half is released at practical completion = £62,500. The remaining £62,500 is held until the end of the defects liability period."
  },
  {
    id: 9,
    question: "Claims for loss and expense in the final account must typically be:",
    options: [
      "Submitted within 14 days of the event",
      "Supported by records and evidence",
      "Agreed before practical completion",
      "Limited to 10% of contract value"
    ],
    correctAnswer: 1,
    explanation: "Claims for loss and expense must be supported by contemporaneous records, cost breakdowns, and evidence demonstrating the cause and effect relationship between the event and the loss."
  },
  {
    id: 10,
    question: "The Final Certificate under JCT becomes conclusive evidence of certain matters after:",
    options: ["14 days", "28 days", "6 months", "12 months"],
    correctAnswer: 1,
    explanation: "Under JCT contracts, the Final Certificate becomes conclusive evidence of certain matters (including that the contractor has fulfilled obligations regarding materials and workmanship) after 28 days if neither party has raised disputes."
  },
  {
    id: 11,
    question: "Which of the following is NOT typically included in final account adjustments?",
    options: [
      "Measured variations",
      "Fluctuations (if applicable)",
      "Preliminary costs already paid",
      "Provisional sum adjustments"
    ],
    correctAnswer: 2,
    explanation: "Preliminary costs that have already been paid through interim valuations are not adjusted again in the final account - they form part of the certified sums already paid."
  },
  {
    id: 12,
    question: "During the defects liability period, who is responsible for insuring the works?",
    options: [
      "Always the contractor",
      "Always the employer",
      "Depends on the contract terms",
      "The contract administrator"
    ],
    correctAnswer: 2,
    explanation: "Responsibility for insurance during the defects liability period depends on the contract terms. Under JCT, it typically transfers to the employer at practical completion for new works."
  }
];

const faqs = [
  {
    question: "What is the difference between re-measurement and lump sum contracts for final accounts?",
    answer: "In a lump sum contract, the contract sum is fixed and only adjusted for variations, provisional sums, and claims. The final account reconciles these adjustments. In a re-measurement contract, the final account is calculated by measuring all work actually executed and valuing it against bill rates - there is no fixed price and the final sum emerges from the measurement process."
  },
  {
    question: "How long does the employer have to settle the final account?",
    answer: "Under JCT contracts, once the final statement is agreed or determined, the Final Certificate must be issued within 2 months. Payment is then due within 14 days of issue. However, final account agreement itself can take several months depending on complexity and the quality of records maintained during the project."
  },
  {
    question: "Can the employer deduct liquidated damages from the final account?",
    answer: "Yes, if the contractor failed to complete on time and no extension of time was granted, the employer can deduct liquidated damages at the rate stated in the contract. These should have been notified and deducted during the project, but any outstanding amounts can be reconciled in the final account. The contractor may dispute this if they believe extensions were due."
  },
  {
    question: "What happens if defects are not rectified during the defects liability period?",
    answer: "If the contractor fails to rectify notified defects, the employer can employ others to carry out the work and deduct the cost from the retention or final account. The Making Good certificate cannot be issued until defects are resolved, which delays the Final Certificate and release of remaining retention."
  },
  {
    question: "How should daywork be valued in the final account?",
    answer: "Daywork is valued using the daywork rates stated in the contract (often based on RICS/ECA schedules plus percentage additions for overheads and profit). Detailed records signed by the clerk of works or contract administrator are essential - these should be submitted within the timescales stated in the contract, typically within 7 days of execution."
  },
  {
    question: "What records should a building services contractor maintain for final account purposes?",
    answer: "Essential records include: daily site diaries, signed daywork sheets, variation instructions and responses, measurement records, delivery tickets, labour allocation records, plant hire records, photographic evidence, correspondence regarding delays or disruption, and as-built drawings. Good record-keeping significantly reduces final account disputes."
  }
];

const HNCModule5Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Final Account
          </h1>
          <p className="text-white/80">
            Final measurement, account agreement, retention release, defects liability period and financial close-out
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Final measurement:</strong> Establishes actual work quantities executed</li>
              <li className="pl-1"><strong>Retention:</strong> Typically 5%, half released at PC, half at DLP end</li>
              <li className="pl-1"><strong>Defects period:</strong> Usually 12 months from practical completion</li>
              <li className="pl-1"><strong>Final Certificate:</strong> Conclusive financial settlement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E variations:</strong> Often significant due to coordination changes</li>
              <li className="pl-1"><strong>Testing records:</strong> Essential for final account evidence</li>
              <li className="pl-1"><strong>Commissioning data:</strong> Supports variation claims</li>
              <li className="pl-1"><strong>As-built drawings:</strong> Required before final payment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand final measurement processes for re-measurement and lump sum contracts",
              "Prepare and negotiate final account submissions",
              "Manage retention release procedures and requirements",
              "Administer the defects liability period effectively",
              "Process financial close-out and Final Certificate",
              "Maintain records to support final account claims"
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

        {/* Section 1: Final Measurement Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Final Measurement Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Final measurement is the process of establishing the true extent of work executed on site,
              forming the basis for calculating the final contract sum. The approach differs significantly
              between re-measurement and lump sum contracts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Re-measurement vs Lump Sum Contracts:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Re-measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lump Sum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contract sum</td>
                      <td className="border border-white/10 px-3 py-2">Provisional, based on estimated quantities</td>
                      <td className="border border-white/10 px-3 py-2">Fixed, unless varied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final account basis</td>
                      <td className="border border-white/10 px-3 py-2">Full measurement of all work executed</td>
                      <td className="border border-white/10 px-3 py-2">Contract sum plus/minus adjustments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quantity risk</td>
                      <td className="border border-white/10 px-3 py-2">Employer bears quantity risk</td>
                      <td className="border border-white/10 px-3 py-2">Contractor bears quantity risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Common use</td>
                      <td className="border border-white/10 px-3 py-2">Refurbishment, incomplete design</td>
                      <td className="border border-white/10 px-3 py-2">New build, complete design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valuation method</td>
                      <td className="border border-white/10 px-3 py-2">Measured quantities x bill rates</td>
                      <td className="border border-white/10 px-3 py-2">Contract rates for similar work</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Final Measurement Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable runs:</strong> Actual installed lengths often differ from tender allowances due to routing changes</li>
                <li className="pl-1"><strong>Containment:</strong> Re-measure cable tray, trunking and conduit against as-built drawings</li>
                <li className="pl-1"><strong>Distribution boards:</strong> Verify final circuit configurations against specification</li>
                <li className="pl-1"><strong>Luminaires:</strong> Count against lighting layouts, noting any substitutions</li>
                <li className="pl-1"><strong>Control wiring:</strong> Often requires detailed measurement due to late coordination</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Take photographs during installation to support measurements, particularly for concealed services that cannot be verified once covered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Variations Settlement and Account Agreement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Variations Settlement and Account Agreement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final account must reconcile all variations issued during the contract. Proper
              valuation and agreement of variations is often the most contentious aspect of final
              account negotiation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variation Valuation Hierarchy</p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1">Contract rates where work is of similar character</li>
                  <li className="pl-1">Pro-rata contract rates where similar but different conditions</li>
                  <li className="pl-1">Fair rates and prices where contract rates not applicable</li>
                  <li className="pl-1">Daywork as last resort (with proper records)</li>
                </ol>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Account Adjustments</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measured variations (additions/omissions)</li>
                  <li className="pl-1">Provisional sum expenditure reconciliation</li>
                  <li className="pl-1">Prime cost sum adjustments</li>
                  <li className="pl-1">Fluctuations (if contract allows)</li>
                  <li className="pl-1">Loss and expense claims</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Account Statement Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Original contract sum</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£2,500,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Add: Measured variations (net)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£185,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Omit: Provisional sums allowed</td>
                      <td className="border border-white/10 px-3 py-2 text-right">(£150,000)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Add: Provisional sum expenditure</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£142,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Add: Loss and expense (agreed)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£45,000</td>
                    </tr>
                    <tr className="bg-white/5 font-medium">
                      <td className="border border-white/10 px-3 py-2">Final Contract Sum</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£2,722,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Dispute Areas in M&E Final Accounts</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coordination changes:</strong> Who instructed the change and was it a variation?</li>
                <li className="pl-1"><strong>Specification interpretation:</strong> Was the specified product or equivalent installed?</li>
                <li className="pl-1"><strong>Daywork rates:</strong> Application of percentage additions for overheads</li>
                <li className="pl-1"><strong>Prolongation costs:</strong> Linking delays to specific variations</li>
                <li className="pl-1"><strong>Design development:</strong> Distinguishing design changes from detail development</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Negotiation approach:</strong> Agree undisputed items first to establish momentum, then focus on disputed items with supporting evidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Retention Release and Defects Liability Period */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Retention Release and Defects Liability Period
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Retention is money held back from interim payments as security for proper completion
              of the works and rectification of defects. Understanding the release mechanism and
              defects liability obligations is essential for financial planning.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Release Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention Held</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Released</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">During construction</td>
                      <td className="border border-white/10 px-3 py-2">Full retention (typically 5%)</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Practical completion</td>
                      <td className="border border-white/10 px-3 py-2">2.5%</td>
                      <td className="border border-white/10 px-3 py-2">2.5% (first moiety)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">During DLP</td>
                      <td className="border border-white/10 px-3 py-2">2.5%</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End of DLP / Making Good</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2">2.5% (second moiety)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defects Liability Obligations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Rectify defects notified by contract administrator</li>
                  <li className="pl-1">Attend site within reasonable time</li>
                  <li className="pl-1">Complete remedial work at own cost</li>
                  <li className="pl-1">Maintain adequate insurance cover</li>
                  <li className="pl-1">Provide access for employer's operations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Bond Alternative</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Bank or surety guarantee replaces cash retention</li>
                  <li className="pl-1">Contractor receives full payment</li>
                  <li className="pl-1">Improves contractor cash flow significantly</li>
                  <li className="pl-1">Employer has same security level</li>
                  <li className="pl-1">Bond cost typically 1-2% of retention value</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Calculation Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Contract sum: £1,800,000</p>
                <p>Retention percentage: 5%</p>
                <p>Total retention: £1,800,000 x 5% = <strong>£90,000</strong></p>
                <p className="mt-2">Released at Practical Completion: £45,000</p>
                <p>Released at end of DLP: £45,000</p>
                <p className="mt-2 text-white/60">Cash flow impact: £90,000 held for 12+ months post-PC</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Building Services Defects</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical:</strong> Earth fault loop impedance failures, RCD nuisance tripping, labelling errors</li>
                <li className="pl-1"><strong>Lighting:</strong> Incorrect colour temperature, control system programming issues</li>
                <li className="pl-1"><strong>Fire alarm:</strong> False alarm patterns, detector positioning issues</li>
                <li className="pl-1"><strong>Data:</strong> Network testing failures, fibre attenuation issues</li>
                <li className="pl-1"><strong>BMS:</strong> Control strategy deficiencies, sensor calibration drift</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Conduct a pre-DLP walkthrough before the defects period expires to identify any outstanding issues before Making Good certificate is due.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Final Certificate and Financial Close-out */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Final Certificate and Financial Close-out
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Final Certificate represents the conclusive financial settlement of the contract,
              releasing remaining retention and confirming the adjusted contract sum. Understanding
              the certification process and its legal implications is crucial.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-conditions for Final Certificate</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Practical Completion certificate issued</li>
                <li className="pl-1">Defects liability period completed</li>
                <li className="pl-1">Making Good certificate issued (all defects rectified)</li>
                <li className="pl-1">Final account documentation submitted by contractor</li>
                <li className="pl-1">Final account agreed or determined by contract administrator</li>
                <li className="pl-1">As-built drawings and O&M manuals provided</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">JCT Final Certificate Timeline</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Practical Completion</span>
                  <span className="text-white/70">Day 0</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Contractor submits final account docs</span>
                  <span className="text-white/70">Within 6 months of PC</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>End of Defects Liability Period</span>
                  <span className="text-white/70">12 months from PC</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Making Good Certificate issued</span>
                  <span className="text-white/70">When all defects rectified</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Final Certificate issued</span>
                  <span className="text-white/70">Within 2 months of final account agreement</span>
                </div>
                <div className="flex justify-between">
                  <span>Final payment due</span>
                  <span className="text-white/70">14 days from Final Certificate</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Certificate Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final contract sum</td>
                      <td className="border border-white/10 px-3 py-2">Agreed adjusted contract sum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total previously certified</td>
                      <td className="border border-white/10 px-3 py-2">Sum of all interim certificates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balance due</td>
                      <td className="border border-white/10 px-3 py-2">Final sum minus previously certified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retention release</td>
                      <td className="border border-white/10 px-3 py-2">Remaining retention held</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Net payment due</td>
                      <td className="border border-white/10 px-3 py-2">Final payment to contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Legal Effect of Final Certificate</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Becomes conclusive evidence after 28 days (unless disputed)</li>
                <li className="pl-1">Confirms contractor fulfilled material/workmanship obligations</li>
                <li className="pl-1">Settles all financial claims under the contract</li>
                <li className="pl-1">Does not affect common law rights for latent defects</li>
                <li className="pl-1">Limitation periods for claims continue to run separately</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Financial Close-out Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All variations agreed and valued</li>
                <li className="pl-1">Provisional and prime cost sums reconciled</li>
                <li className="pl-1">Daywork accounts agreed</li>
                <li className="pl-1">Loss and expense claims settled</li>
                <li className="pl-1">Contra charges reconciled</li>
                <li className="pl-1">Subcontractor final accounts closed</li>
                <li className="pl-1">Retention bonds returned (if applicable)</li>
                <li className="pl-1">Performance bond released</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commercial reality:</strong> Final accounts often take 12-24 months to agree on complex projects. Maintaining good records and professional relationships speeds this process considerably.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Retention Calculation and Release</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An electrical subcontract has a final account value of £850,000 with 5% retention. Calculate the retention release amounts.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Final account value: £850,000</p>
                <p>Total retention: £850,000 x 5% = <strong>£42,500</strong></p>
                <p className="mt-2">At Practical Completion:</p>
                <p>First moiety released: £42,500 ÷ 2 = <strong>£21,250</strong></p>
                <p className="mt-2">At end of Defects Liability Period:</p>
                <p>Second moiety released: <strong>£21,250</strong></p>
                <p className="mt-2 text-green-400">Total cash flow impact: £42,500 held during construction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Provisional Sum Adjustment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A contract allowed £75,000 provisional sum for BMS. Actual expenditure was £82,500. Calculate the adjustment.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Provisional sum allowed: £75,000</p>
                <p>Actual BMS expenditure: £82,500</p>
                <p className="mt-2">Adjustment calculation:</p>
                <p>Omit provisional sum: (£75,000)</p>
                <p>Add actual expenditure: £82,500</p>
                <p className="mt-2">Net adjustment: £82,500 - £75,000 = <strong>+£7,500</strong></p>
                <p className="mt-2 text-white/60">This £7,500 addition is included in the final account</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Final Account Summary</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Prepare a final account summary for an electrical installation contract.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original contract sum:                      £1,250,000</p>
                <p className="mt-2">Additions:</p>
                <p>  Variation instructions (16 no.)            +£127,450</p>
                <p>  Provisional sum expenditure (net of allowance) +£8,200</p>
                <p>  Agreed loss and expense                    +£34,000</p>
                <p className="mt-2">Deductions:</p>
                <p>  Omitted works (VI-003, VI-008)             -£18,750</p>
                <p>  Liquidated damages (2 weeks)               -£14,000</p>
                <p className="mt-2 border-t border-white/20 pt-2">
                  Final contract sum:                     <strong>£1,386,900</strong>
                </p>
                <p className="mt-2">Previously certified:                   £1,315,555</p>
                <p>Balance due (including retention):           <strong>£71,345</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Final Account Preparation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Collate all variation instructions chronologically</li>
                <li className="pl-1">Prepare detailed measurement of each variation</li>
                <li className="pl-1">Assemble supporting records (daywork sheets, delivery notes)</li>
                <li className="pl-1">Calculate provisional sum expenditure against allowances</li>
                <li className="pl-1">Document any claims with evidence and calculations</li>
                <li className="pl-1">Cross-reference interim valuations for consistency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard retention: <strong>5%</strong> (3% on some contracts)</li>
                <li className="pl-1">Defects liability period: <strong>12 months</strong> (typically)</li>
                <li className="pl-1">Final account submission: <strong>6 months from PC</strong> (JCT)</li>
                <li className="pl-1">Final Certificate becomes conclusive: <strong>28 days</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Poor records</strong> - Cannot substantiate claims without contemporaneous evidence</li>
                <li className="pl-1"><strong>Late submission</strong> - Missing contractual deadlines weakens position</li>
                <li className="pl-1"><strong>Underclaiming</strong> - Failing to identify all entitled variations</li>
                <li className="pl-1"><strong>Ignoring preliminaries</strong> - Prolongation affects time-related costs</li>
                <li className="pl-1"><strong>Subcontractor oversights</strong> - Ensure sub-final accounts are captured</li>
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
                <p className="font-medium text-white mb-1">Final Account Components</p>
                <ul className="space-y-0.5">
                  <li>Original contract sum</li>
                  <li>Measured variations (+ and -)</li>
                  <li>Provisional sum adjustments</li>
                  <li>Loss and expense claims</li>
                  <li>Contra charges and deductions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Milestones</p>
                <ul className="space-y-0.5">
                  <li>PC - 50% retention released</li>
                  <li>End DLP - 50% retention released</li>
                  <li>Making Good - Required for FC</li>
                  <li>Final Certificate - Conclusive after 28 days</li>
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
            <Link to="../h-n-c-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cost Management
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_5;
