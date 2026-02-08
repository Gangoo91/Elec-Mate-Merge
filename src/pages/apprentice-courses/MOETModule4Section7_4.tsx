import { ArrowLeft, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Industry Best Practices in RCM - MOET Module 4 Section 7.4";
const DESCRIPTION = "Industry best practices in reliability-centred maintenance for electrical systems, including standards compliance (SAE JA1011, BS EN 13306, PAS 55/ISO 55000), CMMS integration, continuous improvement, and building a reliability culture within maintenance teams aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "rcm-standard",
    question: "The international standard that defines the minimum requirements for a genuine RCM process is:",
    options: [
      "BS 7671 (IET Wiring Regulations)",
      "SAE JA1011 — Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes",
      "ISO 9001 (Quality Management)",
      "BS EN 62305 (Lightning Protection)"
    ],
    correctIndex: 1,
    explanation: "SAE JA1011 was published by SAE International (formerly the Society of Automotive Engineers) to define the minimum criteria that any process must meet to be called RCM. It requires that the process addresses all seven RCM questions in sequence, uses a structured decision logic for selecting maintenance tasks, and results in documented, auditable maintenance strategies. Any process that claims to be RCM but does not comply with JA1011 is not genuine RCM. The companion standard JA1012 provides detailed guidance on how to apply JA1011."
  },
  {
    id: "cmms-role",
    question: "In RCM best practice, a Computerised Maintenance Management System (CMMS) is essential because it:",
    options: [
      "Replaces the need for maintenance technicians",
      "Provides the data infrastructure to schedule PM tasks, record failure history, track condition monitoring trends, manage spare parts, and generate the KPIs needed to measure and improve maintenance effectiveness",
      "Only generates invoices for maintenance work",
      "Only stores equipment photographs"
    ],
    correctIndex: 1,
    explanation: "The CMMS is the backbone of an RCM-based maintenance programme. It manages work orders (both planned and reactive), schedules PM tasks and generates alerts when tasks are due, records failure codes and causes for every breakdown (enabling trend analysis), stores condition monitoring data and flags deterioration trends, manages spare parts inventory aligned to criticality, and generates KPIs (PM compliance, MTBF, MTTR, planned ratio) that measure maintenance effectiveness. Without a well-configured CMMS, it is virtually impossible to implement and sustain an effective RCM programme."
  },
  {
    id: "continuous-improvement",
    question: "Continuous improvement in maintenance best practice means:",
    options: [
      "Making one improvement and then stopping",
      "Systematically analysing failures, reviewing maintenance effectiveness, adjusting strategies based on evidence, and embedding a culture where every breakdown is treated as a learning opportunity that leads to a specific improvement action",
      "Only replacing old equipment with new equipment",
      "Only training new apprentices"
    ],
    correctIndex: 1,
    explanation: "Continuous improvement is a fundamental principle of RCM best practice. It involves: analysing every significant failure to identify the root cause and prevent recurrence (RCA), reviewing PM effectiveness by comparing actual failure rates with predictions, adjusting PM intervals and techniques based on condition monitoring data and failure history, benchmarking maintenance KPIs against industry standards and tracking trends, sharing lessons learned across the organisation, and embedding a culture where the maintenance programme is never considered 'finished' but is always being refined."
  },
  {
    id: "reliability-culture",
    question: "A 'reliability culture' in a maintenance organisation is characterised by:",
    options: [
      "Blame and punishment when equipment fails",
      "An organisational mindset where everyone — from apprentice technician to site director — understands that reliability is everyone's responsibility, where data drives decisions, where failures are investigated without blame, and where continuous improvement is part of daily practice",
      "Only the maintenance manager caring about equipment reliability",
      "Ignoring all breakdowns and hoping they do not recur"
    ],
    correctIndex: 1,
    explanation: "A reliability culture goes beyond having good maintenance procedures — it is an organisational mindset. Key characteristics include: leadership commitment (management actively supports and resources maintenance improvement), data-driven decisions (maintenance strategy is based on evidence, not opinion or tradition), blame-free investigation (failures are investigated to find systemic causes, not to punish individuals), shared responsibility (operators, maintainers and engineers all contribute to equipment reliability), and continuous learning (every failure, every PM visit and every condition monitoring result is an opportunity to improve)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "SAE JA1011 requires that an RCM process must:",
    options: [
      "Only consider the most expensive equipment",
      "Address all seven RCM questions in sequence for each asset in its operating context, use a structured decision logic for task selection, and produce documented maintenance strategies",
      "Only apply to aircraft maintenance",
      "Only consider safety consequences"
    ],
    correctAnswer: 1,
    explanation: "SAE JA1011 sets clear requirements: the process must define functions and performance standards (Question 1), identify functional failures (Q2), identify failure modes (Q3), describe failure effects (Q4), classify failure consequences (Q5), select proactive tasks using a structured decision logic (Q6), and define default actions when no proactive task is feasible (Q7). The process must be applied to each asset in its operating context, not generically. The output must be documented, traceable and auditable. This ensures rigour and consistency in the maintenance programme."
  },
  {
    id: 2,
    question: "BS EN 13306 (Maintenance Terminology) is important because it:",
    options: [
      "Specifies wiring regulations for the UK",
      "Provides standardised definitions for maintenance terms (corrective, preventive, condition-based, predictive, etc.) ensuring consistent communication within and between organisations",
      "Only applies to building maintenance",
      "Only defines electrical testing procedures"
    ],
    correctAnswer: 1,
    explanation: "BS EN 13306 defines standard maintenance terminology used across Europe and internationally. Consistent definitions are essential: when everyone uses the same meaning for 'corrective maintenance', 'condition-based maintenance', 'preventive maintenance', 'failure mode', 'functional failure', etc., communication is clear, training is consistent, and benchmarking between organisations is meaningful. Using non-standard or ambiguous terminology leads to confusion, especially when discussing maintenance strategies with different departments, contractors or regulatory bodies."
  },
  {
    id: 3,
    question: "ISO 55000 (Asset Management) relates to RCM because it:",
    options: [
      "Only covers financial assets",
      "Provides the overarching framework for managing physical assets over their entire lifecycle, within which RCM provides the specific methodology for determining maintenance requirements",
      "Only applies to road and bridge maintenance",
      "Replaces the need for any maintenance"
    ],
    correctAnswer: 1,
    explanation: "ISO 55000 (which replaced PAS 55) provides the international standard for asset management — the systematic and coordinated activities through which an organisation optimally manages its physical assets and their associated performance, risks and expenditures over their lifecycle. RCM is a key tool within the asset management framework: ISO 55000 defines what the organisation wants to achieve (optimal asset performance at acceptable risk and cost), and RCM provides the methodology for determining how to maintain each asset to achieve those objectives."
  },
  {
    id: 4,
    question: "A well-configured CMMS should enable the maintenance team to:",
    options: [
      "Only print work orders",
      "Schedule and track all PM tasks, record accurate failure data (failure codes, causes, actions), manage condition monitoring data, track spare parts, generate maintenance KPIs, and provide the data needed for continuous improvement analysis",
      "Only record the names of maintenance technicians",
      "Only calculate the maintenance budget"
    ],
    correctAnswer: 1,
    explanation: "A CMMS is only as good as the data it contains and the way it is used. Best practice CMMS configuration includes: a complete asset register linked to criticality ratings, PM schedules aligned to criticality and RCM outcomes, standardised failure codes that enable meaningful analysis (not just 'other' or 'general fault'), condition monitoring integration or data recording, spare parts management linked to asset criticality, automated KPI reporting (PM compliance, MTBF, MTTR, planned ratio), and mobile access for technicians to record findings in real time."
  },
  {
    id: 5,
    question: "The most common reason that CMMS failure data is of poor quality is:",
    options: [
      "The CMMS software is defective",
      "Technicians are not trained on the importance of accurate data recording, or the failure code structure is too complex, too vague, or not aligned to actual failure modes — making it difficult or time-consuming to record meaningful information",
      "The data is too accurate",
      "The CMMS is too expensive"
    ],
    correctAnswer: 1,
    explanation: "CMMS data quality is primarily a people and process issue, not a software issue. Common causes of poor data include: technicians not understanding why accurate recording matters (lack of training on the purpose of failure data), failure code structures that are too vague ('electrical fault'), too complex (200+ codes), or not aligned to actual failure modes, time pressure discouraging detailed recording, and no feedback loop showing technicians how their data is used to improve maintenance. Best practice involves simple, meaningful failure codes, training on data importance, and regular feedback to technicians on how their data drives improvements."
  },
  {
    id: 6,
    question: "Benchmarking maintenance performance involves:",
    options: [
      "Only comparing maintenance budgets",
      "Comparing maintenance KPIs (PM compliance, planned ratio, MTBF, MTTR, maintenance cost as % of RAV, availability) against industry standards, similar organisations, and the organisation's own historical trends to identify improvement opportunities",
      "Only counting the number of maintenance staff",
      "Only measuring how fast technicians can run between jobs"
    ],
    correctAnswer: 1,
    explanation: "Benchmarking provides context for maintenance KPIs — a 75% planned ratio only becomes meaningful when compared to the industry best practice of 80%+ and the organisation's own historical performance. Benchmarking sources include: industry associations (BSRIA, BIFM, Reliabilityweb), professional bodies (IET, IMechE), published standards, and internal historical data. Effective benchmarking identifies specific gaps between current performance and best practice, and drives targeted improvement actions. It should cover both efficiency metrics (cost, resource utilisation) and effectiveness metrics (reliability, availability, failure rates)."
  },
  {
    id: 7,
    question: "A maintenance improvement programme should be driven by:",
    options: [
      "Personal opinions about which equipment is most problematic",
      "Data analysis — Pareto analysis of failure data to identify the top failure modes, root cause analysis to understand why they occur, and targeted improvement actions with measurable outcomes",
      "Only the maintenance budget",
      "Only the age of the equipment"
    ],
    correctAnswer: 1,
    explanation: "Data-driven improvement is a core best practice. The process typically follows: (1) Pareto analysis of CMMS failure data to identify the top 20% of failure modes that cause 80% of the impact (downtime, cost, safety incidents); (2) Root cause analysis of the top failure modes to understand the underlying causes; (3) Targeted improvement actions (revised PM tasks, design modifications, training, procedure changes); (4) Implementation with clear ownership and timescales; (5) Measurement of outcomes to verify the improvement was effective. This structured approach ensures improvement effort is focused where it will deliver the greatest benefit."
  },
  {
    id: 8,
    question: "The 'Plan-Do-Check-Act' (PDCA) cycle applies to maintenance improvement by:",
    options: [
      "Only planning maintenance work",
      "Plan (analyse data, identify improvements, define actions), Do (implement the improvement), Check (measure the results — did MTBF improve? Did failures reduce?), Act (standardise successful improvements and address any remaining gaps) — then repeat",
      "Only checking equipment condition",
      "Only acting on emergency breakdowns"
    ],
    correctAnswer: 1,
    explanation: "The PDCA cycle (also known as the Deming cycle) provides a structured framework for continuous improvement. In maintenance: Plan — analyse failure data, identify the most impactful failure modes, and develop specific improvement actions (revised PM, design change, training). Do — implement the actions. Check — measure the results over a defined period (has MTBF improved? Have failures of this type reduced? Has the KPI improved?). Act — if successful, standardise the improvement and extend it to similar assets; if not successful, analyse why and try a different approach. The cycle then repeats, driving progressive improvement."
  },
  {
    id: 9,
    question: "Operator-driven reliability (ODR) is a best practice where:",
    options: [
      "Operators replace the maintenance team entirely",
      "Operators are trained to perform basic care tasks (visual inspections, cleaning, lubrication, minor adjustments) and to detect and report early signs of equipment deterioration, complementing the maintenance team's more specialised work",
      "Operators are not allowed to touch any equipment",
      "Only operators perform maintenance during night shifts"
    ],
    correctAnswer: 1,
    explanation: "Operator-driven reliability (also known as autonomous maintenance in TPM — Total Productive Maintenance) recognises that operators are the people most familiar with their equipment's normal behaviour. They are best placed to detect early abnormalities: unusual noise, vibration, smell, temperature, leaks, or performance changes. Best practice trains operators to: perform basic care tasks (cleaning, inspection, lubrication), recognise early warning signs of common failure modes, report deterioration accurately using standardised forms, and take ownership of equipment condition in their area. This early detection capability significantly extends the P-F interval for many failure modes."
  },
  {
    id: 10,
    question: "Root cause analysis (RCA) should be performed for:",
    options: [
      "Only the most expensive repairs",
      "All failures on Critical (A) assets, repeated failures on any asset, failures with safety or environmental consequences, and any failure that reveals a gap in the current maintenance programme — the goal is to learn from every significant failure and prevent recurrence",
      "Only failures that occur during normal working hours",
      "Only failures reported by the management team"
    ],
    correctAnswer: 1,
    explanation: "The trigger for RCA should be based on consequences and learning potential, not on cost alone. Best practice requires RCA for: every unplanned failure on Critical (A) assets (regardless of repair cost), any failure with actual or potential safety consequences, any failure with environmental consequences, repeated failures on any asset (indicating a systemic issue), and any failure that the maintenance team believes reveals a gap in the current programme. The purpose is not to assign blame but to identify systemic causes and implement actions that prevent recurrence. The learning from RCA should be shared across the organisation."
  },
  {
    id: 11,
    question: "Training and competence development is a best practice element because:",
    options: [
      "It only benefits the training provider",
      "Maintenance effectiveness depends directly on the competence of the people performing the work — technicians need both technical skills (fault-finding, condition monitoring, repair techniques) and analytical skills (RCA, FMEA, data interpretation) to implement RCM effectively",
      "It is only needed for new apprentices",
      "It is only required by law for safety tasks"
    ],
    correctAnswer: 1,
    explanation: "People are the most important element of any maintenance programme. The best CMMS, the most detailed FMEA, and the most comprehensive PM schedule will deliver poor results if the technicians performing the work lack the competence to execute it effectively. Best practice training covers: technical skills (fault diagnosis, condition monitoring techniques, repair and installation standards), analytical skills (RCA methodology, FMEA participation, data interpretation), system skills (CMMS use, work order management, documentation), and soft skills (communication, teamwork, problem-solving). ST1426 recognises this by embedding continuous professional development in the apprenticeship standard."
  },
  {
    id: 12,
    question: "In the context of ST1426 and the End Point Assessment, demonstrating knowledge of RCM best practices shows the assessor that you can:",
    options: [
      "Only recite definitions from textbooks",
      "Understand the strategic context of maintenance (why different strategies exist for different assets), apply structured analytical techniques (RCA, FMEA, criticality analysis), contribute to continuous improvement, and articulate how maintenance effectiveness is measured and improved — demonstrating the knowledge, skills and behaviours expected of a competent maintenance technician",
      "Only perform reactive repairs",
      "Only follow instructions without understanding why"
    ],
    correctAnswer: 1,
    explanation: "The ST1426 End Point Assessment values technicians who understand the 'why' behind maintenance practices, not just the 'how'. Demonstrating knowledge of RCM best practices in the professional discussion shows: strategic understanding (you know why different assets have different maintenance strategies), analytical capability (you can participate in FMEA, RCA and criticality analysis), data literacy (you understand maintenance KPIs and how your work affects them), continuous improvement mindset (you actively look for ways to improve reliability), and professional awareness (you know the relevant standards and how they apply to your work). This is what distinguishes a competent technician from someone who simply follows instructions."
  }
];

const faqs = [
  {
    question: "Do I need to know all these standards and frameworks for the ST1426 EPA?",
    answer: "You do not need to know every detail of every standard. What the EPA assessors look for is an understanding of the principles: why RCM is important (function-focused, consequence-driven maintenance), how criticality affects maintenance strategy (not all equipment is treated equally), why data matters (CMMS records drive improvement), and how continuous improvement works (learn from failures, adjust the programme). Being able to describe how you have applied these principles in your workplace — even at a basic level — is more valuable than memorising standard numbers."
  },
  {
    question: "How does RCM best practice apply if my employer uses a very basic maintenance system?",
    answer: "You can apply RCM principles regardless of the sophistication of your employer's systems. Even without a formal CMMS, you can: think about criticality when prioritising your work (focus on the most important equipment first), provide accurate feedback on equipment condition during PM visits, ask 'why' when failures occur (basic root cause thinking), and suggest improvements based on what you observe. If your employer uses a paper-based system, you can still record meaningful failure information. The principles of RCM — function focus, consequence-driven strategy, evidence-based decisions — apply at any level of organisational maturity."
  },
  {
    question: "What is the difference between RCM and TPM?",
    answer: "RCM (Reliability-Centred Maintenance) is a process for deciding what maintenance to do — it analyses functions, failure modes, consequences and tasks. TPM (Total Productive Maintenance) is a broader philosophy for involving the whole organisation in equipment care — it includes autonomous maintenance by operators, focused improvement activities, planned maintenance, quality maintenance, and education/training. They are complementary: RCM provides the analytical rigour for determining maintenance tasks, while TPM provides the organisational framework for executing them. Many best-practice organisations use elements of both."
  },
  {
    question: "How can I contribute to continuous improvement as an apprentice?",
    answer: "As an apprentice, you can contribute in several ways: record accurate, detailed information on work orders (what you found, what you did, what parts you used), report any unexpected findings during PM visits to your supervisor, ask questions when you see maintenance practices that seem ineffective or inefficient, participate in team discussions about failure causes and improvements, take photographs of unusual conditions for the maintenance record, and suggest improvements based on your observations. Your fresh perspective is valuable — sometimes people who have been doing something for years stop questioning whether it is the best approach."
  },
  {
    question: "Is RCM only for large organisations with big maintenance teams?",
    answer: "No. While a full classical RCM analysis requires significant effort and is most commonly applied by larger organisations, the principles can be applied at any scale. A sole trader electrician can apply RCM thinking by considering the criticality of different circuits when prioritising work, a small maintenance team can use simplified FMEA to identify the most important failure modes, and any organisation can use basic Pareto analysis of failure data to focus improvement effort. The key principle — applying the right maintenance strategy to each asset based on the consequences of its failure — is universally applicable."
  }
];

const MOETModule4Section7_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Award className="h-4 w-4" />
            <span>Module 4.7.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Industry Best Practices in RCM
          </h1>
          <p className="text-white/80">
            Standards, systems and culture that underpin world-class maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Standards:</strong> SAE JA1011 defines genuine RCM; ISO 55000 provides the asset management framework</li>
              <li className="pl-1"><strong>CMMS:</strong> Essential data infrastructure for scheduling, recording and analysing maintenance</li>
              <li className="pl-1"><strong>Data-driven:</strong> Pareto analysis, RCA and KPIs drive targeted improvements</li>
              <li className="pl-1"><strong>Culture:</strong> Reliability is everyone's responsibility, not just the maintenance team's</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Data quality:</strong> Accurate work order recording enables meaningful analysis</li>
              <li className="pl-1"><strong>Improvement:</strong> Every failure is a learning opportunity — contribute to RCA</li>
              <li className="pl-1"><strong>Competence:</strong> Ongoing skills development is a best practice requirement</li>
              <li className="pl-1"><strong>ST1426 EPA:</strong> Demonstrates strategic understanding of maintenance management</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key standards that define RCM best practice (SAE JA1011, ISO 55000, BS EN 13306)",
              "Explain the role of CMMS in supporting an effective RCM programme",
              "Describe how data analysis drives continuous improvement in maintenance",
              "Apply the PDCA cycle to maintenance improvement activities",
              "Explain the characteristics of a reliability culture in a maintenance organisation",
              "Contribute to continuous improvement through accurate data recording and RCA participation"
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
            Standards and Frameworks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              World-class maintenance organisations do not invent their own approaches from scratch — they build on established international standards and frameworks that represent decades of accumulated knowledge and best practice. Understanding these standards provides the maintenance technician with a professional foundation and a common language for discussing maintenance strategy.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SAE JA1011 / JA1012 — RCM Process Standard</h3>
                <p className="text-sm text-white">
                  Defines the minimum requirements for a genuine RCM process. JA1011 sets the criteria; JA1012 provides the implementation guide. Key requirements: all seven questions addressed in sequence, structured decision logic for task selection, and documented outcomes. Any process that does not meet these criteria should not be called RCM. This standard ensures rigour and consistency and prevents the dilution of RCM into superficial exercises.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 55000 / 55001 / 55002 — Asset Management</h3>
                <p className="text-sm text-white">
                  The international framework for managing physical assets over their entire lifecycle. ISO 55001 specifies the requirements for an asset management system; ISO 55002 provides implementation guidance. RCM fits within this framework as the methodology for determining maintenance requirements. ISO 55000 also covers asset lifecycle decisions (acquisition, operation, maintenance, modification and disposal), risk management, and the alignment of asset management with organisational objectives.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 13306 — Maintenance Terminology</h3>
                <p className="text-sm text-white">
                  Provides standardised definitions for maintenance terms: corrective maintenance, preventive maintenance, condition-based maintenance, predictive maintenance, predetermined maintenance, failure mode, functional failure, and many more. Using standard terminology ensures clear communication within the organisation, with contractors, and with regulatory bodies. It eliminates ambiguity and supports effective benchmarking.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 15341 — Maintenance Key Performance Indicators</h3>
                <p className="text-sm text-white">
                  Defines a set of standardised maintenance KPIs covering three categories: economic (maintenance cost efficiency), technical (equipment reliability and availability), and organisational (work management effectiveness). Using standardised KPIs enables meaningful benchmarking against industry peers and consistent internal tracking over time.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> You do not need to memorise these standard numbers, but you should understand the principles they represent. SAE JA1011 = rigorous RCM process. ISO 55000 = lifecycle asset management. BS EN 13306 = common language. BS EN 15341 = measuring performance. Together they form the professional framework within which modern maintenance operates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CMMS and Data-Driven Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Computerised Maintenance Management System (CMMS) is the data backbone of modern maintenance. Without it, maintenance decisions are based on memory, habit and best guesses. With a well-configured and well-used CMMS, maintenance decisions can be based on evidence: actual failure data, condition monitoring trends, PM compliance records and cost analysis. The CMMS transforms maintenance from an art based on individual experience into a discipline driven by organisational knowledge.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CMMS Best Practice Configuration</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CMMS Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Asset register</td>
                      <td className="border border-white/10 px-3 py-2">Complete, with unique tag numbers, criticality ratings, and parent-child relationships</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Failure codes</td>
                      <td className="border border-white/10 px-3 py-2">Simple, meaningful, aligned to actual failure modes — maximum 15-20 codes per equipment type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PM schedules</td>
                      <td className="border border-white/10 px-3 py-2">Linked to criticality, with clear task descriptions and expected findings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Work order workflow</td>
                      <td className="border border-white/10 px-3 py-2">Planned, assigned, in progress, completed, closed — with mandatory fields for failure cause and actions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Spare parts</td>
                      <td className="border border-white/10 px-3 py-2">Linked to assets, with stock levels aligned to criticality (critical spares held, non-critical sourced)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">KPI dashboards</td>
                      <td className="border border-white/10 px-3 py-2">Automated reporting of PM compliance, MTBF, MTTR, planned ratio, availability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The Technician's Role in Data Quality</p>
              <p className="text-sm text-white mb-2">
                As a maintenance technician, you are the primary data generator. The quality of every maintenance decision depends on the quality of the data you record:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accurate failure codes:</strong> Select the code that best describes what actually failed and why — do not default to "other"</li>
                <li className="pl-1"><strong>Detailed notes:</strong> Describe what you found, what you did, and what condition the equipment was in — "replaced motor" tells us nothing; "motor bearing DE failed, excessive vibration noted 3 months ago during PM, bearing replaced and aligned to 0.05mm" tells us everything</li>
                <li className="pl-1"><strong>Time recording:</strong> Accurate time data enables MTTR calculation and work planning</li>
                <li className="pl-1"><strong>Parts recording:</strong> Record which parts were used — this supports spare parts planning</li>
                <li className="pl-1"><strong>PM feedback:</strong> Record what you found during each PM visit, not just "completed"</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> "Garbage in, garbage out" applies absolutely to CMMS data. If failure codes are wrong, notes are empty, and times are guessed, the system cannot provide meaningful analysis. If the data is accurate and detailed, the system becomes a powerful tool for continuous improvement. Every work order you complete is a contribution to the organisation's maintenance knowledge.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Continuous Improvement in Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A maintenance programme that never changes is a maintenance programme that is falling behind. Equipment ages, operating conditions change, new failure modes emerge, and the organisation's understanding of its assets deepens with experience. Continuous improvement is the process of using this evolving knowledge to progressively refine the maintenance programme, driving better reliability at lower cost over time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The PDCA Improvement Cycle Applied to Maintenance</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Plan</h3>
                  <p className="text-sm text-white">Analyse CMMS data (Pareto of failures, trend analysis). Identify the top failure modes by impact. Perform RCA on significant failures. Develop specific improvement actions.</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="text-sm font-medium text-green-400 mb-1">Do</h3>
                  <p className="text-sm text-white">Implement the improvement: revised PM task, new condition monitoring route, design modification, operator training, or procedure change. Document the change.</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <h3 className="text-sm font-medium text-yellow-400 mb-1">Check</h3>
                  <p className="text-sm text-white">Measure the results over a defined period: has the failure rate reduced? Has MTBF improved? Has the KPI moved in the right direction? Did the improvement achieve its objective?</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="text-sm font-medium text-purple-400 mb-1">Act</h3>
                  <p className="text-sm text-white">If successful, standardise the improvement and extend to similar assets. If not, analyse why and try a different approach. Update the FMEA and maintenance plan. Start the next cycle.</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pareto Analysis for Maintenance Improvement</p>
              <p className="text-sm text-white mb-2">
                The Pareto principle (80/20 rule) applies powerfully to maintenance: typically 20% of failure modes cause 80% of the downtime, cost and safety incidents. Identifying and targeting this top 20% delivers the greatest improvement for the least effort.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Extract failure data from the CMMS for a defined period (typically 12 months)</li>
                <li className="pl-1"><strong>Step 2:</strong> Rank failure modes by impact (downtime hours, cost, or number of occurrences)</li>
                <li className="pl-1"><strong>Step 3:</strong> Identify the top 5-10 failure modes that account for the majority of impact</li>
                <li className="pl-1"><strong>Step 4:</strong> Perform root cause analysis on each of the top failure modes</li>
                <li className="pl-1"><strong>Step 5:</strong> Develop and implement targeted improvement actions for each</li>
                <li className="pl-1"><strong>Step 6:</strong> Measure the results and repeat the analysis</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Continuous improvement is not about making massive changes — it is about making many small, evidence-based improvements over time. Each improvement may seem modest, but the cumulative effect over months and years is transformational. The organisations that achieve world-class maintenance performance do so through sustained, disciplined application of the improvement cycle, not through one-off projects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building a Reliability Culture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most sophisticated RCM process, the best CMMS, and the most comprehensive maintenance programme will deliver only a fraction of their potential if the organisational culture does not support them. A reliability culture is one where everyone — from the board of directors to the newest apprentice — understands that equipment reliability is not just the maintenance team's problem but a shared organisational responsibility.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristics of a Reliability Culture</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Leadership commitment</span>
                  <span>Management actively supports maintenance improvement, provides resources, and visibly prioritises reliability in decision-making</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Data-driven decisions</span>
                  <span>Maintenance strategy is based on evidence (failure data, condition monitoring, risk analysis), not tradition, opinion or budget convenience</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Blame-free investigation</span>
                  <span>Failures are investigated to find systemic causes (training gaps, procedure weaknesses, design issues), not to punish individuals</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Shared responsibility</span>
                  <span>Operators care for their equipment, maintainers investigate root causes, engineers support design improvements, and management provides resources</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Continuous learning</span>
                  <span>Every failure, every PM visit and every condition monitoring result is an opportunity to improve. Knowledge is shared, not hoarded</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[140px]">Competence investment</span>
                  <span>The organisation invests in training and development because it recognises that people are the most important element of the maintenance system</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What the Technician Can Influence</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Record accurate, detailed work order data</li>
                  <li className="pl-1">Report equipment conditions honestly (good and bad)</li>
                  <li className="pl-1">Participate in RCA and FMEA when invited</li>
                  <li className="pl-1">Suggest improvements based on practical experience</li>
                  <li className="pl-1">Share knowledge with colleagues and apprentices</li>
                  <li className="pl-1">Take pride in the reliability of 'your' equipment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of a Weak Reliability Culture</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maintenance is seen as a cost to be minimised, not an investment</li>
                  <li className="pl-1">Breakdowns are accepted as inevitable rather than investigated</li>
                  <li className="pl-1">PM tasks are skipped when production is busy</li>
                  <li className="pl-1">CMMS data is incomplete or inaccurate</li>
                  <li className="pl-1">Operators do not report early warning signs</li>
                  <li className="pl-1">Training is seen as a cost, not an investment</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Final thought:</strong> Module 4 has taken you from the fundamentals of maintenance techniques, through fault diagnosis and condition monitoring, to root cause analysis and reliability-centred maintenance. These are not isolated topics — they form an integrated system. Good condition monitoring detects failures early. Good fault diagnosis identifies what went wrong. Good RCA identifies why it went wrong. Good RCM ensures the right strategy is applied to prevent recurrence. And a reliability culture ensures all of this actually happens consistently, every day. As a maintenance technician, you are at the heart of this system.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>SAE JA1011 — RCM process requirements</li>
                  <li>SAE JA1012 — RCM implementation guide</li>
                  <li>ISO 55000/55001 — Asset management framework</li>
                  <li>BS EN 13306 — Maintenance terminology</li>
                  <li>BS EN 15341 — Maintenance KPIs</li>
                  <li>BS 7671 — IET Wiring Regulations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Best Practice Principles</p>
                <ul className="space-y-0.5">
                  <li>Function-focused, consequence-driven maintenance</li>
                  <li>CMMS with accurate, meaningful data</li>
                  <li>Pareto analysis to focus improvement effort</li>
                  <li>PDCA cycle for structured improvement</li>
                  <li>RCA for every significant failure</li>
                  <li>Reliability culture: everyone's responsibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Module completion message */}
        <div className="mb-8 p-6 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Module 4 Complete</h3>
          <p className="text-sm text-white/80">
            You have completed all sections of Module 4: Maintenance Techniques and Fault Diagnosis. This module has covered planned and reactive maintenance strategies, condition monitoring and predictive techniques, systematic fault diagnosis, root cause analysis, and reliability-centred maintenance. These topics form the foundation of professional electrical maintenance practice aligned to ST1426.
          </p>
        </div>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Criticality Analysis
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4">
              Back to Module 4 Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section7_4;
