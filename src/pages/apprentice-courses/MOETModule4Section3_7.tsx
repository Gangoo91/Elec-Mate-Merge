import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation of Faults - MOET Module 4 Section 3.7";
const DESCRIPTION = "Recording and reporting fault diagnosis outcomes including job cards, maintenance logs, fault reports, root cause analysis documentation, CMMS entries and the importance of accurate records for compliance, reliability and continuous improvement.";

const quickCheckQuestions = [
  {
    id: "fault-report-purpose",
    question: "The primary purpose of completing a detailed fault report after every repair is to:",
    options: [
      "Satisfy the paperwork requirements of the health and safety department",
      "Create a historical record that aids future fault diagnosis, identifies recurring problems, demonstrates compliance and supports continuous improvement",
      "Give the technician something to do after the repair is complete",
      "Prove that the technician was working during their shift"
    ],
    correctIndex: 1,
    explanation: "Fault reports serve multiple purposes beyond the immediate repair. They create a searchable maintenance history that helps future technicians diagnose similar faults more quickly. They identify recurring problems that may indicate a design weakness or environmental issue. They demonstrate regulatory compliance and due diligence. They provide data for reliability analysis and continuous improvement programmes."
  },
  {
    id: "root-cause-analysis",
    question: "A root cause analysis (RCA) differs from a standard fault report because it:",
    options: [
      "Is shorter and simpler than a fault report",
      "Only records what was replaced",
      "Investigates why the fault occurred in the first place and identifies actions to prevent recurrence, not just what failed",
      "Is only required for electrical faults, not mechanical ones"
    ],
    correctIndex: 2,
    explanation: "A standard fault report records what happened, what was found and what was done to repair it. A root cause analysis goes further — it asks why the fault occurred and keeps asking 'why' until the underlying cause is identified. For example, a motor bearing failure (symptom) may be caused by misalignment (immediate cause), which was caused by inadequate foundation maintenance (root cause). The RCA then recommends corrective actions to address the root cause and prevent recurrence."
  },
  {
    id: "cmms-entry",
    question: "When completing a CMMS (Computerised Maintenance Management System) entry for a fault repair, the most important information to record accurately is:",
    options: [
      "Only the time taken so the job can be costed",
      "The fault symptoms, diagnostic steps taken, root cause identified, repair actions completed, parts used, and any recommendations for preventing recurrence",
      "Only the parts used for stock control purposes",
      "Only the asset number and a one-word description"
    ],
    correctIndex: 1,
    explanation: "A complete CMMS entry should capture the full story of the fault: what was reported, what was found during investigation, what tests were performed, what the root cause was determined to be, what repair actions were taken, what parts were used, what the outcome was, and what recommendations were made. This comprehensive record supports future diagnosis, reliability analysis, spare parts planning and compliance requirements."
  },
  {
    id: "photographic-evidence",
    question: "Photographic evidence taken during fault diagnosis is valuable because it:",
    options: [
      "Makes the fault report look more professional",
      "Provides an objective, visual record of conditions found that can be reviewed later, shared with colleagues, used for training, and supports any subsequent investigation or claim",
      "Is only useful if the technician cannot write clearly",
      "Is required by BS 7671 for every fault repair"
    ],
    correctIndex: 1,
    explanation: "Photographs capture details that may not be adequately described in written text — the extent of damage, the condition of components, cable routing, the state of connections, environmental conditions and any safety concerns. They can be reviewed by engineers who were not present, used for training purposes, attached to CMMS records, and provide evidence in the event of a dispute, insurance claim or regulatory investigation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A fault report should be completed:",
    options: [
      "Only for faults that took more than two hours to repair",
      "For every fault repair, regardless of complexity, as soon as practicable after the work is completed",
      "Only when the supervisor specifically requests it",
      "At the end of the month as a batch"
    ],
    correctAnswer: 1,
    explanation: "Every fault repair should be documented, even seemingly trivial ones. A loose connection that took five minutes to repair may be the third occurrence this year on the same circuit — a pattern that would only be visible if all three events were recorded. Completing the report promptly ensures that details are fresh and accurate. Batch reporting at the end of a period leads to incomplete and inaccurate records."
  },
  {
    id: 2,
    question: "The '5 Whys' technique in root cause analysis involves:",
    options: [
      "Asking five different people what they think the cause was",
      "Asking 'why' repeatedly (typically about five times) to drill down from the symptom through immediate causes to the underlying root cause",
      "Checking five different possible causes in parallel",
      "Writing the report in five paragraphs"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys is a simple but effective root cause analysis technique. Starting from the symptom, you ask 'why did this happen?' and then ask 'why?' about each successive answer. For example: Motor tripped on overload (Why?) — Drawing excessive current (Why?) — Bearing seized (Why?) — Lubrication had failed (Why?) — Preventive maintenance schedule was not followed (Why?) — No PM system in place. The root cause is the lack of a preventive maintenance system, not the bearing failure."
  },
  {
    id: 3,
    question: "A CMMS (Computerised Maintenance Management System) provides value to an organisation by:",
    options: [
      "Eliminating the need for skilled technicians",
      "Providing a searchable database of maintenance history, enabling trend analysis, scheduling preventive maintenance, tracking spare parts and supporting compliance evidence",
      "Only generating printed work orders",
      "Replacing the need for fault diagnosis skills"
    ],
    correctAnswer: 1,
    explanation: "A CMMS is a central repository for all maintenance data. It records the complete maintenance history of every asset, enables analysis of failure patterns and trends, schedules and tracks preventive maintenance, manages spare parts inventory, calculates maintenance costs, and provides the documented evidence needed for regulatory compliance, insurance and audits. It transforms raw maintenance data into actionable information for reliability improvement."
  },
  {
    id: 4,
    question: "When recording fault symptoms in a report, you should describe:",
    options: [
      "Only your conclusion about what caused the fault",
      "The observable symptoms exactly as reported by the operator and as found during your investigation, without jumping to conclusions about the cause",
      "Only what you could measure with instruments",
      "Only what was visible to the naked eye"
    ],
    correctAnswer: 1,
    explanation: "Recording symptoms accurately and separately from the diagnosis is essential. The operator's report of what they observed, and your own observations on arrival, are primary evidence. Recording them without interpretation preserves this evidence for future analysis. If your diagnosis later proves incorrect, the accurately recorded symptoms can be re-analysed. Mixing symptoms with conclusions confuses the record and may bias future investigators."
  },
  {
    id: 5,
    question: "A maintenance log book kept in an electrical switchroom should record:",
    options: [
      "Only the names of people who enter the room",
      "All work carried out, modifications made, test results, faults found, operational changes, and any relevant observations about the condition of the installation",
      "Only major breakdowns and replacements",
      "Only planned maintenance activities"
    ],
    correctAnswer: 1,
    explanation: "An electrical switchroom log book is a legal document that provides a chronological record of everything that happens to the installation. It should record all routine maintenance, fault repairs, modifications, test results, operational changes, environmental observations and any concerns. This record is invaluable for fault diagnosis (showing what has changed), compliance evidence, and understanding the history of the installation."
  },
  {
    id: 6,
    question: "The Electricity at Work Regulations 1989 require that:",
    options: [
      "All electrical work must be done by an apprentice",
      "Electrical systems must be maintained so as to prevent danger, and while records are not explicitly mandated, they are the only practical way to demonstrate compliance",
      "Only new installations need maintenance records",
      "Records are only required for systems over 415 V"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(2) of the Electricity at Work Regulations 1989 requires that electrical systems be maintained so as to prevent danger. While the regulations do not explicitly require written records, HSE Guidance Note HSR25 makes clear that records are the only practical way to demonstrate that a maintenance programme exists and is being followed. In the event of an incident, the absence of records would make it very difficult to demonstrate compliance."
  },
  {
    id: 7,
    question: "When documenting a modification made during a fault repair, you should record:",
    options: [
      "Nothing — modifications during repairs are normal and do not need recording",
      "The exact nature of the modification, why it was necessary, who authorised it, what was changed, and ensure that drawings and documentation are updated to reflect the as-built condition",
      "Only the parts that were changed",
      "Only the cost of the modification"
    ],
    correctAnswer: 1,
    explanation: "Any modification to an electrical installation must be fully documented. The record should include what was changed and why, who authorised the change, the technical justification, the components used, and any test results confirming the modification is safe and effective. Critically, all affected drawings, schematics and documentation must be updated to show the as-built condition. Undocumented modifications are a significant safety risk and a frequent source of confusion during future maintenance."
  },
  {
    id: 8,
    question: "Spare parts used during a fault repair should be recorded in the fault report primarily to:",
    options: [
      "Make the report longer",
      "Enable stock replenishment, track component reliability, support warranty claims, and ensure the correct replacement part is used if the same fault recurs",
      "Only for accounting purposes",
      "Only if the parts cost more than fifty pounds"
    ],
    correctAnswer: 1,
    explanation: "Recording parts used serves multiple purposes: it triggers stock replenishment to ensure parts availability for future faults; it tracks which components fail most frequently, supporting reliability improvement and bulk purchasing decisions; it provides evidence for warranty claims against manufacturers; and it ensures that if the same fault recurs, the next technician knows exactly what part to use. Part numbers, manufacturers and batch numbers should all be recorded."
  },
  {
    id: 9,
    question: "A trend analysis of maintenance records showing increasing frequency of overheating faults on a motor would indicate:",
    options: [
      "The maintenance records are wrong",
      "A progressive deterioration that requires investigation — possibly bearing wear, insulation degradation, ventilation blockage, or increasing load — before the motor fails catastrophically",
      "The motor is getting better at handling heat",
      "No action is required until the motor actually fails"
    ],
    correctAnswer: 1,
    explanation: "Trend analysis is one of the most valuable outputs of good maintenance documentation. An increasing frequency of similar faults on the same asset indicates progressive deterioration. Identifying this trend early allows planned intervention (bearing replacement, cleaning, load investigation) at a convenient time, avoiding the much greater cost and disruption of an unplanned failure. This is predictive maintenance — using data to anticipate and prevent failures."
  },
  {
    id: 10,
    question: "A permit to work system is documented because:",
    options: [
      "It creates unnecessary paperwork",
      "The written permit provides a formal record that hazards have been identified, precautions specified, and authorisation given — protecting both the workers and the organisation",
      "It is only needed for work on gas installations",
      "Verbal permissions are always sufficient for electrical work"
    ],
    correctAnswer: 1,
    explanation: "A permit to work is a formal, documented safety system used for work that involves significant risk, including electrical work on or near live or recently de-energised systems. The written permit records the hazards identified, the precautions required, the isolation arrangements, the authorisation chain, the time limitations, and the handback procedure. It is a legal document that demonstrates due diligence and provides evidence that proper safety procedures were followed."
  },
  {
    id: 11,
    question: "When handing over a completed fault repair to the operator, you should:",
    options: [
      "Simply leave the area without speaking to anyone",
      "Verbally explain what was found and repaired, confirm the equipment is safe to operate, demonstrate correct operation, document the handover, and note any recommendations or limitations",
      "Send an email the following week",
      "Only inform the supervisor and not the operator"
    ],
    correctAnswer: 1,
    explanation: "A proper handover is the final step in the fault repair process. The operator needs to know what was found, what was done, whether there are any limitations or temporary measures in place, and whether any follow-up work is needed. A verbal explanation supplemented by written documentation (job card, CMMS entry, log book entry) ensures clear communication. The operator should confirm they are satisfied and that the equipment is operating correctly before you leave."
  },
  {
    id: 12,
    question: "The primary benefit of maintaining accurate, detailed maintenance records over several years is:",
    options: [
      "Creating a large filing system",
      "Building a comprehensive asset history that enables trend analysis, supports capital replacement decisions, provides compliance evidence, and continuously improves maintenance effectiveness",
      "Keeping the administration department busy",
      "Only satisfying insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Long-term maintenance records are a strategic asset. They reveal patterns invisible in short-term data — seasonal variations, gradual deterioration, the true reliability of different equipment brands, the effectiveness of maintenance strategies, and the optimal replacement interval for assets. This data supports evidence-based decisions about capital expenditure, maintenance strategy, spare parts stocking, and workforce planning. Organisations with good maintenance data consistently achieve higher equipment availability at lower cost."
  }
];

const faqs = [
  {
    question: "What should I include in a fault report?",
    answer: "A complete fault report should include: date, time and location; asset identification (number, description, location); who reported the fault and the reported symptoms; your findings on arrival; diagnostic steps taken and test results; root cause identified; repair actions completed; parts used (with part numbers); test results after repair confirming safe operation; time taken; any recommendations for preventing recurrence; and your name and signature. Photographs and sketches are valuable additions where relevant."
  },
  {
    question: "How detailed should my CMMS entries be?",
    answer: "Detailed enough that a competent technician who was not involved in the repair could understand what happened, what was done, and why. Avoid abbreviations that are not universally understood. Record the full diagnostic process, not just the conclusion. Include test results with values, not just 'passed' or 'failed'. Note environmental conditions if they are relevant. The test of a good CMMS entry is whether it would help someone diagnose the same fault if it recurred in five years' time when you are no longer available to ask."
  },
  {
    question: "When is a root cause analysis required?",
    answer: "Formally, an RCA should be conducted for significant failures (safety-related, production-critical, high-cost), recurring faults, and any incident that resulted in or could have resulted in injury. Informally, every technician should think about root cause for every fault — even if the formal report is brief. Asking 'why did this fail?' rather than just 'what failed?' is the foundation of reliability improvement. Many organisations set thresholds (e.g., downtime exceeding four hours, repair cost exceeding a set amount) that trigger a formal RCA."
  },
  {
    question: "What are the legal requirements for maintenance records in the UK?",
    answer: "The Electricity at Work Regulations 1989 require maintenance to prevent danger but do not explicitly mandate records. However, HSE Guidance Note HSR25 and the IET Code of Practice for In-Service Inspection and Testing make clear that records are essential to demonstrate compliance. BS 7671 requires an Electrical Installation Certificate for new work and a Minor Works Certificate or Electrical Installation Condition Report as appropriate. Health and safety legislation (HASAWA 1974, MHSWR 1999) requires risk assessments and safe systems of work to be documented. In practice, the absence of maintenance records creates a presumption of non-compliance."
  },
  {
    question: "How long should maintenance records be kept?",
    answer: "There is no single statutory retention period for all maintenance records, but general guidance suggests: Electrical Installation Certificates and EICRs should be kept for the life of the installation. Routine maintenance records should be kept for at least the asset life plus a reasonable period (typically six years to align with the limitation period for civil claims). Records related to accidents or incidents should be kept for at least forty years (to cover latent injury claims). CMMS data should be retained indefinitely as it has ongoing value for trend analysis and asset management."
  },
  {
    question: "Should I update drawings when I make a modification during a fault repair?",
    answer: "Absolutely. Any modification to an electrical installation — whether planned or arising from a fault repair — must be reflected in the as-built drawings and documentation. An undocumented modification is a safety risk: future technicians will rely on drawings that no longer represent reality. At minimum, mark up the affected drawing with the change and date, and arrange for the formal drawing to be updated. Record the modification in the log book, CMMS and on the appropriate electrical certificate (Minor Works Certificate or Amendment to an Electrical Installation Certificate)."
  }
];

const MOETModule4Section3_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <FileText className="h-4 w-4" />
            <span>Module 4.3.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation of Faults
          </h1>
          <p className="text-white/80">
            Recording, reporting and learning from fault diagnosis outcomes
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault reports:</strong> Record symptoms, diagnosis, repair actions, parts and recommendations</li>
              <li className="pl-1"><strong>Root cause:</strong> Go beyond what failed to why it failed and how to prevent recurrence</li>
              <li className="pl-1"><strong>CMMS:</strong> Computerised records enable trend analysis, scheduling and compliance evidence</li>
              <li className="pl-1"><strong>Legal:</strong> Records demonstrate compliance with EAW Regs, HASAWA and BS 7671</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Professional practice:</strong> Accurate documentation is a core competence, not optional paperwork</li>
              <li className="pl-1"><strong>Future technicians:</strong> Your records help the next person diagnose faster and safer</li>
              <li className="pl-1"><strong>Continuous improvement:</strong> Trend data drives reliability programmes</li>
              <li className="pl-1"><strong>ST1426:</strong> Documentation and reporting is assessed in the EPA</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Complete accurate fault reports that capture the full diagnostic and repair process",
              "Conduct root cause analysis using the 5 Whys and fishbone diagram techniques",
              "Make effective CMMS entries that support future diagnosis and trend analysis",
              "Understand the legal and regulatory requirements for maintenance documentation in the UK",
              "Use maintenance data for trend analysis and reliability improvement",
              "Follow proper handover procedures including verbal explanation and written records"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Importance of Fault Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documentation is the final — and arguably most undervalued — step in the fault diagnosis process. A repair that is completed but not documented is a repair that benefits no one except the immediate situation. Without a written record, the knowledge gained during diagnosis is lost: the next technician who encounters the same fault starts from scratch, recurring problems are not identified, compliance cannot be demonstrated, and the organisation cannot learn from its maintenance experience.
            </p>
            <p>
              For the maintenance technician, documentation is not an administrative burden — it is a professional responsibility. The Electricity at Work Regulations 1989 require that electrical systems be maintained so as to prevent danger. While the regulations do not explicitly mandate written records, HSE Guidance Note HSR25 makes clear that records are the only practical means of demonstrating that a systematic maintenance regime exists and is being followed. In the event of an incident, the quality of your maintenance records will be scrutinised.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Fault Documentation Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Future diagnosis:</strong> A well-documented fault repair enables the next technician to diagnose a similar or recurring fault far more quickly</li>
                <li className="pl-1"><strong>Pattern recognition:</strong> Records reveal trends — increasing failure rates, seasonal patterns, recurring root causes — that are invisible without data</li>
                <li className="pl-1"><strong>Compliance evidence:</strong> Demonstrates adherence to the Electricity at Work Regulations, HASAWA 1974, and BS 7671</li>
                <li className="pl-1"><strong>Legal protection:</strong> Provides evidence of due diligence in the event of an incident, claim or prosecution</li>
                <li className="pl-1"><strong>Asset management:</strong> Supports capital replacement decisions by providing evidence of equipment condition and reliability</li>
                <li className="pl-1"><strong>Knowledge transfer:</strong> Preserves the diagnostic knowledge of experienced technicians for the benefit of the wider team</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Cost of Poor Documentation</p>
              <p className="text-sm text-white">
                Poor maintenance documentation has real consequences. A technician spends two hours diagnosing a fault that a colleague fixed last month but did not record — that is two hours of lost productivity and extended downtime. A recurring fault goes unrecognised because each occurrence is documented differently or not at all. An undocumented modification causes a safety incident because the next technician relied on drawings that no longer represent reality. Insurance claims are rejected because there is no evidence of a maintenance regime. These are not hypothetical scenarios — they happen regularly in organisations with inadequate documentation practices.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The best time to complete a fault report is immediately after the repair, while the details are fresh. A report completed two days later will inevitably be less accurate and less complete than one written on the spot. Make documentation a habit, not an afterthought.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fault Reports, Job Cards and Log Books
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fault report is the primary document that records the details of a fault diagnosis and repair. Different organisations use different formats — paper job cards, digital forms, CMMS work orders — but the essential content is the same. A good fault report tells the complete story: what was reported, what was found, what was done, and what should happen next.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Content of a Fault Report</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Details to Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Identification</td>
                      <td className="border border-white/10 px-3 py-2">Date, time, job/work order number, asset number, asset description, location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Reported fault</td>
                      <td className="border border-white/10 px-3 py-2">Who reported it, when, what symptoms they described, any relevant context (time of day, conditions, what was happening)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Findings on arrival</td>
                      <td className="border border-white/10 px-3 py-2">State of equipment when you arrived, observable symptoms, any differences from the reported description</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Diagnostic process</td>
                      <td className="border border-white/10 px-3 py-2">Tests performed, measurements taken (with values), areas inspected, sequence of diagnostic steps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Root cause</td>
                      <td className="border border-white/10 px-3 py-2">Identified cause of the fault, how it was confirmed, contributing factors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Repair actions</td>
                      <td className="border border-white/10 px-3 py-2">What was replaced, repaired or adjusted; method used; any temporary measures in place</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Parts used</td>
                      <td className="border border-white/10 px-3 py-2">Part numbers, descriptions, quantities, manufacturers, batch numbers where relevant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Post-repair testing</td>
                      <td className="border border-white/10 px-3 py-2">Tests performed to confirm repair, results obtained, confirmation of safe operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Recommendations</td>
                      <td className="border border-white/10 px-3 py-2">Preventive actions, follow-up work required, modifications suggested, PM schedule changes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Sign-off</td>
                      <td className="border border-white/10 px-3 py-2">Technician name, signature, date, time completed, total time on task, handover confirmation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Log Books and Site Records</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Switchroom log book:</strong> A bound, sequential record of all work, observations and events in the switchroom — a legal document that should never have pages removed</li>
                <li className="pl-1"><strong>Plant room log:</strong> Records operational parameters, abnormal conditions, maintenance visits and any concerns</li>
                <li className="pl-1"><strong>Permit to work file:</strong> Archived permits provide evidence of safe working practices and isolation procedures</li>
                <li className="pl-1"><strong>Test record file:</strong> Periodic test results for the installation, enabling comparison over time</li>
                <li className="pl-1"><strong>Modification register:</strong> A chronological record of all modifications, with references to drawings, certificates and authorisations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional tip:</strong> Write your fault report as if the reader is a competent technician who has never seen this installation before. Avoid unexplained abbreviations. Be specific about locations, component references and measured values. A report that states "fixed loose wire in panel" is far less useful than "Re-terminated L3 supply conductor at contactor KM4 terminal 1 in MCC Panel 3 — found loose with evidence of arcing and overheating. Torqued to 2.5 Nm per manufacturer specification."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Root Cause Analysis Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Root cause analysis (RCA) is the discipline of investigating not just what failed, but why it failed. A standard fault repair addresses the immediate symptom: the motor bearing failed, so the bearing was replaced. Root cause analysis asks deeper questions: why did the bearing fail? Was it the wrong type? Was it poorly lubricated? Was the motor misaligned? Was there excessive vibration from an external source? Only by identifying and addressing the root cause can you prevent the fault from recurring.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 5 Whys Technique</p>
              <p className="text-sm text-white mb-3">
                The 5 Whys is a simple, effective technique that drills down from the symptom to the root cause by repeatedly asking "why?" Each answer becomes the basis for the next question. While the name suggests five iterations, the actual number varies — the key is to keep asking until you reach a cause that can be addressed with a systemic action.
              </p>
              <div className="bg-white/5 rounded p-3 text-sm text-white space-y-2">
                <p><strong className="text-elec-yellow/80">Problem:</strong> Motor overload protection tripped repeatedly on conveyor drive</p>
                <p><strong className="text-elec-yellow/80">Why 1:</strong> Motor drawing excessive current → bearing had seized</p>
                <p><strong className="text-elec-yellow/80">Why 2:</strong> Why did the bearing seize? → Lubrication had failed — bearing was dry</p>
                <p><strong className="text-elec-yellow/80">Why 3:</strong> Why had lubrication failed? → Grease nipple was blocked and inaccessible</p>
                <p><strong className="text-elec-yellow/80">Why 4:</strong> Why was the grease nipple blocked and inaccessible? → Motor mounting position makes the grease point unreachable without scaffolding</p>
                <p><strong className="text-elec-yellow/80">Why 5:</strong> Why has this not been addressed? → No preventive maintenance task exists for this bearing point</p>
                <p className="pt-2 border-t border-white/10"><strong className="text-green-400">Root cause:</strong> Inaccessible grease point not included in PM schedule</p>
                <p><strong className="text-green-400">Corrective actions:</strong> (1) Fit remote grease line to accessible location (2) Add to PM schedule at three-monthly interval (3) Audit other motors for similar access issues</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fishbone (Ishikawa) Diagram</p>
              <p className="text-sm text-white mb-3">
                For more complex faults with multiple potential causes, the fishbone diagram provides a structured framework. The fault (effect) is placed at the head of the fish, and potential causes are categorised along the bones under standard headings:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Man (People):</strong> Operator error, inadequate training, incorrect procedure followed, fatigue</li>
                <li className="pl-1"><strong>Machine (Equipment):</strong> Component wear, design weakness, inadequate rating, age</li>
                <li className="pl-1"><strong>Method (Process):</strong> Incorrect operating procedure, inadequate maintenance strategy, poor work instructions</li>
                <li className="pl-1"><strong>Material (Components):</strong> Substandard parts, incorrect specification, material degradation, counterfeit components</li>
                <li className="pl-1"><strong>Measurement (Data):</strong> Incorrect calibration, wrong instrument used, misread results</li>
                <li className="pl-1"><strong>Mother Nature (Environment):</strong> Temperature, humidity, contamination, vibration, EMC</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Root Cause Categories in Electrical Maintenance</p>
              <p className="text-sm text-white">
                Analysis of maintenance records across industrial sites consistently shows that the most common root causes of electrical faults are: inadequate preventive maintenance (connections not re-torqued, filters not cleaned, insulation not tested), environmental factors not addressed (heat, moisture, contamination), design weaknesses (undersized components, inadequate IP rating), and human factors (incorrect installation, wrong settings, procedure not followed). Recognising these categories helps you focus your RCA on the most probable areas.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The purpose of root cause analysis is not to assign blame — it is to prevent recurrence. Focus on systemic causes (processes, procedures, design) rather than individual actions. A finding of "operator error" is not a root cause — it should prompt further questions: why did the operator make that error? Was the procedure unclear? Was training inadequate? Was the equipment poorly designed?
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CMMS and Digital Maintenance Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Computerised Maintenance Management Systems (CMMS) have transformed maintenance documentation from static paper files into dynamic, searchable databases that support analysis, planning and decision-making. As a maintenance technician, you will be expected to make accurate and detailed CMMS entries as part of your daily work. The quality of the data you enter directly determines the value the system provides to the organisation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CMMS Core Functions for Maintenance Technicians</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Work order management:</strong> Receiving, recording and closing out fault repair and preventive maintenance work orders</li>
                <li className="pl-1"><strong>Asset history:</strong> Viewing the complete maintenance history of any asset — previous faults, repairs, modifications, test results</li>
                <li className="pl-1"><strong>Spare parts:</strong> Recording parts used, checking stock availability, and triggering reorder when levels drop</li>
                <li className="pl-1"><strong>Failure coding:</strong> Classifying faults by type, cause and location using standardised codes — essential for trend analysis</li>
                <li className="pl-1"><strong>Planned maintenance:</strong> Scheduling and recording preventive maintenance tasks at defined intervals</li>
                <li className="pl-1"><strong>Document management:</strong> Linking drawings, manuals, test certificates and photographs to asset records</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Writing Effective CMMS Entries</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Be specific:</strong> "Re-terminated L1 at contactor KM3, terminal T1 — found loose with discolouration. Torqued to 2.5 Nm" is far better than "tightened connection"</li>
                <li className="pl-1"><strong>Include measurements:</strong> "Insulation resistance L1-E: 0.8 M ohm (minimum acceptable 1.0 M ohm per BS 7671)" — values provide evidence and enable trend comparison</li>
                <li className="pl-1"><strong>Use correct failure codes:</strong> Accurate coding enables the CMMS to produce meaningful reports on failure types and trends</li>
                <li className="pl-1"><strong>Record the diagnostic process:</strong> Not just the conclusion — the steps taken and tests performed are valuable for future reference</li>
                <li className="pl-1"><strong>Add recommendations:</strong> If you identified a preventive action, record it as a recommendation — this drives continuous improvement</li>
                <li className="pl-1"><strong>Attach photographs:</strong> Where relevant, attach photographs to the work order — a picture of a burnt-out contactor tells a story that words cannot</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trend Analysis from CMMS Data</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Increasing failure frequency on specific assets</li>
                  <li className="pl-1">Common failure modes across asset types</li>
                  <li className="pl-1">Seasonal or environmental patterns</li>
                  <li className="pl-1">Mean time between failures (MTBF)</li>
                  <li className="pl-1">Mean time to repair (MTTR)</li>
                  <li className="pl-1">Cost per failure for replacement planning</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Planned vs reactive maintenance ratio</li>
                  <li className="pl-1">PM completion rate and compliance</li>
                  <li className="pl-1">Equipment availability percentage</li>
                  <li className="pl-1">Repeat failure rate (same fault, same asset)</li>
                  <li className="pl-1">Work order backlog and aging</li>
                  <li className="pl-1">Spare parts usage and stock turns</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional standard:</strong> The quality of your CMMS entries reflects your professionalism. Supervisors, engineers and managers read these entries. Future technicians rely on them. Auditors examine them. Take the same pride in your documentation as you do in your technical work — both are essential elements of professional maintenance practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handover, Communication and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documentation does not exist in isolation — it is part of a broader communication process that includes verbal handover, team briefings, shift reports and management reporting. The best fault report in the world is wasted if it sits in a filing cabinet and no one reads it. Effective maintenance organisations use their documentation to drive continuous improvement: learning from every fault, identifying systemic weaknesses, and progressively improving equipment reliability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Procedure After Fault Repair</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Verbal briefing:</strong> Explain to the operator and/or supervisor what was found, what was done, and whether there are any limitations or follow-up requirements</li>
                <li className="pl-1"><strong>Demonstration:</strong> Where appropriate, demonstrate that the equipment is operating correctly and safely</li>
                <li className="pl-1"><strong>Written confirmation:</strong> Complete the fault report, CMMS entry and any relevant log book entries before leaving the site</li>
                <li className="pl-1"><strong>Safety confirmation:</strong> Confirm that all safety systems (guards, interlocks, emergency stops) are reinstated and functional</li>
                <li className="pl-1"><strong>Permit cancellation:</strong> If a permit to work was issued, follow the formal cancellation and handback procedure</li>
                <li className="pl-1"><strong>Outstanding work:</strong> If any follow-up work is required, record it as a new work order or recommendation — do not leave it to memory</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Using Documentation for Continuous Improvement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Failure review meetings:</strong> Regular review of significant faults and their root causes — sharing lessons learned across the team</li>
                <li className="pl-1"><strong>Reliability-centred maintenance:</strong> Using failure data to optimise PM frequencies — increase intervals where no faults occur, decrease where faults are frequent</li>
                <li className="pl-1"><strong>Design-out maintenance:</strong> Where recurring faults indicate a design weakness, proposing modifications to eliminate the fault mode</li>
                <li className="pl-1"><strong>Training needs:</strong> Analysis of fault records may reveal knowledge gaps that can be addressed through targeted training</li>
                <li className="pl-1"><strong>Spare parts optimisation:</strong> Usage data from fault records supports decisions about which parts to stock, in what quantity, and from which supplier</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Documentation and Modifications</p>
              <p className="text-sm text-white">
                Any modification made to an electrical installation — whether planned or arising from a fault repair — must be fully documented and reflected in the as-built drawings. An undocumented modification is a serious safety risk. The next technician may isolate the wrong circuit, apply the wrong test parameters, or misunderstand the circuit operation because the documentation does not match reality. At minimum, a modification requires: a description of the change, technical justification, authorisation, updated drawings, an appropriate electrical certificate (Minor Works or Amendment), and a CMMS record. Many organisations also require a formal Management of Change (MOC) process for significant modifications.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Shift and Team Communication</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Shift handover:</strong> Brief the incoming shift on any outstanding faults, temporary repairs in place, or equipment operating under restrictions</li>
                <li className="pl-1"><strong>Team toolbox talks:</strong> Share significant fault findings with the team so everyone benefits from the diagnostic experience</li>
                <li className="pl-1"><strong>Escalation:</strong> If a fault reveals a safety concern or a systemic issue beyond your authority to resolve, escalate it in writing to the appropriate person</li>
                <li className="pl-1"><strong>Management reporting:</strong> Provide accurate data for KPI reports, downtime records and maintenance cost tracking</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> As an apprentice working towards your ST1426 End Point Assessment, your ability to document faults accurately and communicate effectively will be directly assessed. The EPA professional discussion will include questions about how you record and report maintenance activities. Developing good documentation habits now — during your apprenticeship — will serve you throughout your career and distinguish you as a thorough, professional technician.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Documentation Essentials</p>
                <ul className="space-y-0.5">
                  <li>Fault report — complete for every repair</li>
                  <li>CMMS entry — searchable, coded, detailed</li>
                  <li>Log book — chronological site record</li>
                  <li>Root cause analysis — for significant faults</li>
                  <li>Modification register — every change recorded</li>
                  <li>Photographic evidence — conditions found</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>Electricity at Work Regulations 1989 (Reg 4(2))</li>
                  <li>HSE Guidance Note HSR25</li>
                  <li>BS 7671 — Electrical Installation Certificates</li>
                  <li>HASAWA 1974 — General duties</li>
                  <li>IET Code of Practice — In-Service Testing</li>
                  <li>ST1426 — Documentation and reporting KSBs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Intermittent Faults
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section3_7;
