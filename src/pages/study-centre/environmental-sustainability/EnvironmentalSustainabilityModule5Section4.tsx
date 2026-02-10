import { ArrowLeft, ArrowRight, Leaf, ShieldCheck, Globe, FileText, ClipboardList, Building, Search, TrendingUp, Award, CheckCircle, RefreshCw, BarChart3, Target, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "pdca-cycle-purpose",
    question: "What is the purpose of the Plan-Do-Check-Act (PDCA) cycle in an Environmental Management System?",
    options: [
      "To complete a one-off environmental audit and then close the project",
      "To provide a framework for continual improvement of environmental performance",
      "To satisfy planning permission requirements for new developments",
      "To calculate the carbon footprint of individual employees"
    ],
    correctIndex: 1,
    explanation:
      "The Plan-Do-Check-Act (PDCA) cycle is the fundamental framework underpinning an Environmental Management System. It provides a structured, iterative approach to continual improvement of environmental performance. In the 'Plan' phase, the organisation identifies its environmental aspects, sets objectives, and plans actions. In 'Do', it implements those actions and operational controls. In 'Check', it monitors and measures performance against objectives. In 'Act', it takes corrective action and makes improvements based on the findings. The cycle then repeats, driving ongoing improvement. This is not a one-off exercise — it is a perpetual cycle that ensures the organisation never stops improving its environmental performance."
  },
  {
    id: "emas-vs-iso-difference",
    question: "What is the key difference between EMAS and ISO 14001 regarding public disclosure?",
    options: [
      "EMAS requires a publicly available environmental statement; ISO 14001 does not",
      "ISO 14001 requires public disclosure; EMAS keeps all information confidential",
      "Both require identical levels of public disclosure",
      "Neither scheme requires any form of public reporting"
    ],
    correctIndex: 0,
    explanation:
      "The key difference is that EMAS (Eco-Management and Audit Scheme) requires organisations to produce and publish an environmental statement that is publicly available and validated by an accredited environmental verifier. This statement must include a description of the organisation's activities, its environmental policy, a summary of significant environmental impacts, environmental performance data, objectives and targets, and evidence of legal compliance. ISO 14001, by contrast, does not require any public disclosure of environmental performance data. Whilst an organisation certified to ISO 14001 must have an environmental policy available to the public, the detailed performance information remains internal. This transparency requirement makes EMAS more demanding but also more credible in the eyes of regulators and the public."
  },
  {
    id: "environmental-auditing-purpose",
    question: "What is the primary purpose of an internal environmental audit within an EMS?",
    options: [
      "To prepare marketing materials about environmental performance",
      "To verify conformance with the EMS requirements and identify opportunities for improvement",
      "To calculate annual energy bills for the finance department",
      "To replace the need for external certification audits"
    ],
    correctIndex: 1,
    explanation:
      "The primary purpose of an internal environmental audit is to verify that the Environmental Management System conforms to the planned arrangements, including the requirements of ISO 14001 or EMAS, and to identify opportunities for improvement. Internal audits are a systematic, independent, and documented process for obtaining audit evidence and evaluating it objectively to determine the extent to which the audit criteria are fulfilled. They check whether procedures are being followed, whether operational controls are effective, whether objectives and targets are being met, and whether legal compliance is maintained. Internal audits do not replace external certification audits — rather, they complement them by providing ongoing assurance between external audit visits. The findings from internal audits feed into the management review process, which in turn drives continual improvement."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do small electrical contractors need a formal EMS?",
    answer:
      "Whilst there is no legal requirement for small electrical contractors to hold ISO 14001 or EMAS certification, there are compelling reasons to implement at least a proportionate environmental management system. Many principal contractors and clients now require subcontractors to demonstrate environmental management capability as a condition of tender or framework membership. Even a simple, documented EMS covering waste management, pollution prevention, energy efficiency, and legal compliance can satisfy these requirements. The system does not need to be complex — it needs to be proportionate to the scale of the organisation and its environmental impacts. A sole trader or micro-business might operate with a one-page environmental policy, a simple aspects and impacts register, a legal compliance checklist, and documented procedures for key activities such as waste segregation and spill response. The key principle is that the system should be practical, implemented, and maintained — not an elaborate paper exercise that sits in a filing cabinet."
  },
  {
    question: "How often must ISO 14001 certification be renewed?",
    answer:
      "ISO 14001 certification follows a three-year cycle. The initial certification audit is the most comprehensive, covering all clauses of the standard and all significant processes. Following successful certification, the organisation receives a certificate valid for three years. During those three years, the certification body conducts surveillance audits — typically annually (at approximately 12-month and 24-month intervals after certification). Surveillance audits are smaller in scope than the initial certification audit but still cover key elements of the system, including environmental policy, objectives and targets, operational controls, monitoring and measurement, compliance evaluation, internal audits, management review, and any areas of concern from previous audits. At the end of the three-year cycle, a re-certification audit is conducted, which is similar in scope to the initial certification audit. If the organisation passes, the certificate is renewed for another three years. It is important to understand that certification can be suspended or withdrawn if surveillance audits reveal serious non-conformances that are not addressed within agreed timescales."
  },
  {
    question: "What is an environmental aspects and impacts register?",
    answer:
      "An environmental aspects and impacts register is a central document (or database) that systematically identifies all the ways in which an organisation's activities, products, and services interact with the environment (aspects) and the resulting changes to the environment (impacts). For an electrical contractor, typical aspects would include: energy consumption (impact: greenhouse gas emissions, resource depletion), waste generation from cable off-cuts, packaging, and redundant equipment (impact: landfill use, potential contamination), use of hazardous substances such as solvents, adhesives, and PVC (impact: air pollution, soil/water contamination), transport fuel consumption from vehicle fleet (impact: greenhouse gas emissions, air quality), water use for testing and cleaning (impact: resource depletion), and noise from power tools and generators (impact: disturbance to wildlife and local community). Each aspect is assessed for significance using criteria such as the scale and severity of the impact, the likelihood of occurrence, legal requirements, stakeholder concerns, and the organisation's ability to influence the impact. The register is a living document that must be reviewed whenever activities change, new work streams are introduced, or incidents occur."
  },
  {
    question: "Can an EMS actually save money, or is it just a compliance cost?",
    answer:
      "A well-implemented EMS consistently delivers measurable cost savings that exceed the investment in implementation and maintenance. The savings come from multiple sources. First, waste reduction: by measuring and managing waste streams, organisations typically reduce waste volumes by 15-30%, directly reducing skip hire, disposal, and landfill tax costs. Second, energy efficiency: systematic monitoring of energy consumption identifies inefficiencies and drives behaviour change, typically yielding 10-20% energy cost savings. Third, material efficiency: tracking material usage reduces over-ordering, wastage, and the cost of storing surplus materials. Fourth, incident prevention: proactive environmental management reduces the risk of pollution incidents that can result in Environment Agency enforcement notices, fines (unlimited under the Environmental Permitting Regulations), and costly clean-up operations. Fifth, insurance: some insurers offer reduced environmental liability premiums to organisations with certified EMS. Sixth, tender qualification: without an EMS or equivalent, many organisations are excluded from tenders entirely, so the EMS protects and generates revenue. The Construction Industry Research and Information Association (CIRIA) has published case studies showing typical payback periods of 12-24 months for EMS implementation in construction, with ongoing annual savings thereafter."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What does the acronym EMS stand for in the context of environmental management?",
    options: [
      "Electrical Monitoring System",
      "Environmental Management System",
      "Energy Measurement Standard",
      "European Manufacturing Specification"
    ],
    correctAnswer: 1,
    explanation:
      "EMS stands for Environmental Management System. It is a structured framework that helps organisations manage their environmental responsibilities in a systematic way. An EMS provides the organisational structure, planning activities, responsibilities, practices, procedures, processes, and resources for developing, implementing, maintaining, and continually improving environmental performance. The most widely recognised EMS framework is ISO 14001, which provides the international standard for environmental management systems."
  },
  {
    id: 2,
    question:
      "How many clauses does ISO 14001:2015 contain?",
    options: [
      "5 clauses",
      "7 clauses",
      "10 clauses",
      "14 clauses"
    ],
    correctAnswer: 2,
    explanation:
      "ISO 14001:2015 contains 10 clauses, following the High Level Structure (HLS) that is common to all modern ISO management system standards. The 10 clauses are: 1 — Scope, 2 — Normative references, 3 — Terms and definitions, 4 — Context of the organisation, 5 — Leadership, 6 — Planning, 7 — Support, 8 — Operation, 9 — Performance evaluation, and 10 — Improvement. Clauses 1 to 3 are introductory and non-auditable; clauses 4 to 10 contain the requirements that organisations must meet to achieve certification."
  },
  {
    id: 3,
    question:
      "Which of the following is NOT a requirement of ISO 14001?",
    options: [
      "Establishing an environmental policy",
      "Maintaining a legal compliance register",
      "Publishing an annual environmental statement to the public",
      "Conducting management reviews"
    ],
    correctAnswer: 2,
    explanation:
      "Publishing an annual environmental statement to the public is NOT a requirement of ISO 14001 — it is a requirement of EMAS (Eco-Management and Audit Scheme). ISO 14001 requires the environmental policy to be available to the public, but it does not require the publication of detailed environmental performance data. The other three options — establishing an environmental policy, maintaining a legal compliance register, and conducting management reviews — are all core requirements of ISO 14001. The public disclosure requirement is one of the key differences that distinguishes EMAS from ISO 14001."
  },
  {
    id: 4,
    question:
      "In the PDCA cycle, what happens during the 'Check' phase?",
    options: [
      "Environmental objectives and targets are established",
      "Operational controls and procedures are implemented",
      "Performance is monitored, measured, and evaluated against objectives",
      "Corrective actions are taken to address non-conformances"
    ],
    correctAnswer: 2,
    explanation:
      "During the 'Check' phase of the PDCA cycle, performance is monitored, measured, and evaluated against objectives and targets. This includes tracking key performance indicators (KPIs), conducting compliance evaluations to verify legal requirements are being met, performing internal audits to assess system conformance, and analysing data to identify trends and areas for improvement. The 'Plan' phase is where objectives and targets are established, the 'Do' phase is where operational controls are implemented, and the 'Act' phase is where corrective actions are taken. The 'Check' phase is the critical feedback loop that provides the evidence base for informed decision-making in the subsequent 'Act' and 'Plan' phases."
  },
  {
    id: 5,
    question:
      "What must an organisation identify as the first step in implementing an EMS on site?",
    options: [
      "The cost of certification",
      "Its environmental aspects and their associated impacts",
      "The name of the EMS coordinator",
      "The schedule for the first external audit"
    ],
    correctAnswer: 1,
    explanation:
      "The first step in implementing an EMS on site is to identify the organisation's environmental aspects and their associated impacts. An environmental aspect is any element of an organisation's activities, products, or services that interacts with the environment — for example, energy consumption, waste generation, emissions to air, discharges to water, use of raw materials, and noise. The associated impact is the resulting change to the environment — for example, greenhouse gas emissions, landfill use, air pollution, water contamination, resource depletion, or disturbance to wildlife. This identification process forms the foundation of the entire EMS because it determines what the organisation needs to manage, control, and improve."
  },
  {
    id: 6,
    question:
      "What is a non-conformance in the context of an environmental audit?",
    options: [
      "A minor administrative error in the audit report",
      "A failure to meet a requirement of the EMS standard or the organisation's own procedures",
      "A disagreement between the auditor and the auditee",
      "An aspect that has not yet been assessed for significance"
    ],
    correctAnswer: 1,
    explanation:
      "A non-conformance (also written as non-conformity) is a failure to fulfil a requirement — either a requirement of the EMS standard (such as ISO 14001) or the organisation's own documented procedures, policies, objectives, or legal obligations. Non-conformances are classified as 'major' or 'minor'. A major non-conformance is a systematic failure or the absence of a required element that significantly undermines the effectiveness of the EMS — for example, no environmental policy, no aspects register, or no internal audit programme. A minor non-conformance is an isolated lapse or partial failure that does not undermine the system as a whole — for example, a single training record missing or one monitoring reading not recorded. Both types require corrective action, but a major non-conformance will typically prevent certification or trigger suspension of an existing certificate if not resolved promptly."
  },
  {
    id: 7,
    question:
      "Which KPI would be most appropriate for measuring waste management performance on a construction site?",
    options: [
      "Number of employees trained in fire safety",
      "Tonnes of waste diverted from landfill as a percentage of total waste generated",
      "The total value of the construction contract",
      "Number of site visitors per month"
    ],
    correctAnswer: 1,
    explanation:
      "Tonnes of waste diverted from landfill as a percentage of total waste generated is the most appropriate KPI for measuring waste management performance. This KPI captures both the volume of waste being managed and the effectiveness of recycling and recovery efforts. It is a widely used metric in the construction industry, with many clients and frameworks setting targets of 90% or higher diversion from landfill. The KPI can be tracked using waste transfer notes and duty of care documentation, which are already legal requirements. It provides a clear, measurable, and comparable indicator that can be benchmarked against industry standards and tracked over time to demonstrate continual improvement."
  },
  {
    id: 8,
    question:
      "What practical benefit does EMS certification provide when tendering for work?",
    options: [
      "It guarantees the organisation will win every tender",
      "It qualifies the organisation for tenders that require demonstrated environmental management capability",
      "It removes the need to submit method statements",
      "It allows the organisation to charge higher rates without justification"
    ],
    correctAnswer: 1,
    explanation:
      "EMS certification (ISO 14001 or EMAS) qualifies the organisation for tenders that require demonstrated environmental management capability. Many principal contractors, public sector clients, and framework agreements now include ISO 14001 certification (or equivalent) as a mandatory pre-qualification requirement. Without certification, the organisation is excluded from the tender process entirely, regardless of its technical competence or price competitiveness. Certification demonstrates to clients that the organisation takes environmental management seriously, has a systematic approach to managing its environmental impacts, is subject to independent third-party verification, and is committed to continual improvement. This does not guarantee winning tenders, but it is increasingly a prerequisite for being invited to tender at all."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function EnvironmentalSustainabilityModule5Section4() {
  useSEO({
    title: "Environmental Management Systems | Environmental & Sustainability Module 5.4",
    description:
      "Learn about Environmental Management Systems including ISO 14001:2015, EMAS, implementing an EMS on site, environmental auditing, continual improvement, and practical benefits.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Management Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how organisations systematically manage their environmental responsibilities through structured frameworks &mdash; from ISO 14001 certification to practical on-site implementation and continual improvement
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>EMS:</strong> Systematic framework for managing environmental impacts</li>
              <li><strong>ISO 14001:</strong> International standard with 10 clauses</li>
              <li><strong>EMAS:</strong> EU scheme requiring public environmental statement</li>
              <li><strong>PDCA:</strong> Plan-Do-Check-Act drives continual improvement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>ISO 14001:2015:</strong> Environmental management systems</li>
              <li><strong>ISO 14004:</strong> General guidelines on implementation</li>
              <li><strong>ISO 19011:</strong> Guidelines for auditing management systems</li>
              <li><strong>EMAS Regulation:</strong> EC No 1221/2009 (amended)</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what an Environmental Management System (EMS) is and explain its purpose",
              "Describe the structure and key requirements of ISO 14001:2015",
              "Compare EMAS with ISO 14001 and explain the public disclosure requirement",
              "Outline the steps for implementing an EMS on a construction site",
              "Explain the environmental auditing process including internal and external audits",
              "Describe the role of KPIs, benchmarking, and management review in continual improvement",
              "Identify the practical business benefits of EMS certification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: What Is an EMS?                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">01</span>
              What Is an EMS?
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An <strong>Environmental Management System (EMS)</strong> is a structured framework that enables an organisation to systematically manage its environmental responsibilities. It provides the organisational structure, planning activities, responsibilities, practices, procedures, processes, and resources for developing, implementing, achieving, reviewing, and maintaining the organisation&rsquo;s environmental policy and improving its environmental performance.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Purpose &amp; Systematic Approach</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The purpose of an EMS is not simply to comply with environmental legislation &mdash; though compliance is a fundamental requirement. An EMS goes further by establishing a systematic, proactive approach to:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Identifying environmental aspects</strong> &mdash; understanding all the ways in which the organisation&rsquo;s activities, products, and services interact with the environment, both positively and negatively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Assessing environmental impacts</strong> &mdash; evaluating the significance of those interactions, considering factors such as scale, severity, probability, duration, and reversibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Setting objectives and targets</strong> &mdash; establishing measurable goals for reducing negative impacts and enhancing positive contributions to the environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Implementing operational controls</strong> &mdash; putting in place procedures, work instructions, and controls to manage significant environmental aspects during normal operations, abnormal conditions, and emergency situations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Monitoring and measuring performance</strong> &mdash; tracking environmental performance against objectives using key performance indicators (KPIs) and taking corrective action when targets are not being met</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Continual Improvement &amp; PDCA</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The cornerstone principle of any EMS is <strong>continual improvement</strong>. This is achieved through the <strong>Plan-Do-Check-Act (PDCA)</strong> framework, also known as the Deming Cycle:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "PLAN", desc: "Establish environmental objectives, identify aspects and impacts, determine legal requirements, plan actions to address risks and opportunities, allocate resources" },
                    { label: "DO", desc: "Implement the planned actions, establish operational controls, deliver training, establish communication processes, manage documented information" },
                    { label: "CHECK", desc: "Monitor and measure performance against objectives, evaluate compliance with legal requirements, conduct internal audits, analyse and evaluate data" },
                    { label: "ACT", desc: "Take corrective action on non-conformances, address audit findings, conduct management review, identify opportunities for improvement, update the system" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-bold text-emerald-400">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why &ldquo;System&rdquo; Matters</p>
                <p className="text-sm text-white/80">
                  The word &ldquo;system&rdquo; is critical. An EMS is not a single document or a one-off project. It is an integrated set of interconnected processes, procedures, and practices that work together as a coherent whole. Each element supports and reinforces the others: the environmental policy sets the direction, the aspects register identifies what needs managing, the objectives provide measurable targets, the operational controls ensure day-to-day compliance, the monitoring verifies effectiveness, the audits provide independent assurance, and the management review closes the loop by ensuring top management remains engaged and accountable. Without this systematic integration, environmental management becomes fragmented, reactive, and ineffective.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: ISO 14001:2015                                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">02</span>
              ISO 14001:2015
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>ISO 14001:2015</strong> is the internationally recognised standard for environmental management systems, published by the International Organisation for Standardisation (ISO). It provides a framework that any organisation &mdash; regardless of size, sector, or geographical location &mdash; can follow to establish, implement, maintain, and continually improve an EMS. The 2015 revision introduced significant changes including a stronger emphasis on leadership, risk-based thinking, and lifecycle perspective.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The 10 Clauses of ISO 14001:2015</p>
                </div>
                <div className="space-y-3">
                  {[
                    { clause: "Clause 1 — Scope", desc: "Defines the scope of the standard and confirms it is applicable to any organisation wishing to establish, implement, maintain, and continually improve an EMS." },
                    { clause: "Clause 2 — Normative References", desc: "States that there are no normative references for ISO 14001:2015 — it is a self-contained standard." },
                    { clause: "Clause 3 — Terms and Definitions", desc: "Defines key terms used throughout the standard, ensuring consistent interpretation." },
                    { clause: "Clause 4 — Context of the Organisation", desc: "Requires the organisation to understand its context (internal and external issues), the needs and expectations of interested parties, and to determine the scope of the EMS." },
                    { clause: "Clause 5 — Leadership", desc: "Requires top management to demonstrate leadership and commitment, establish the environmental policy, and assign roles, responsibilities, and authorities." },
                    { clause: "Clause 6 — Planning", desc: "Addresses actions to address risks and opportunities, environmental aspects and impacts identification, compliance obligations, environmental objectives, and planning to achieve them." },
                    { clause: "Clause 7 — Support", desc: "Covers resources, competence, awareness, communication (internal and external), and documented information (the documents and records the EMS requires)." },
                    { clause: "Clause 8 — Operation", desc: "Addresses operational planning and control, including management of processes consistent with a lifecycle perspective, and emergency preparedness and response." },
                    { clause: "Clause 9 — Performance Evaluation", desc: "Covers monitoring, measurement, analysis, and evaluation; compliance evaluation; internal audit; and management review." },
                    { clause: "Clause 10 — Improvement", desc: "Addresses non-conformity and corrective action, and continual improvement of the EMS." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.clause}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">High Level Structure (HLS)</p>
                <p className="text-sm text-white/80">
                  ISO 14001:2015 follows the <strong>High Level Structure (HLS)</strong>, also known as Annex SL. This is a common framework shared by all modern ISO management system standards, including ISO 9001 (quality), ISO 45001 (occupational health and safety), and ISO 50001 (energy). The HLS uses the same clause numbering, core text, and common terms and definitions across all these standards. This makes it significantly easier for organisations to integrate multiple management systems into a single Integrated Management System (IMS), avoiding duplication of effort and ensuring a coherent approach to management across quality, environment, health and safety, and energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Key ISO 14001 Requirements                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">03</span>
              Key ISO 14001 Requirements
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Whilst all ten clauses of ISO 14001 are important, several key requirements form the operational backbone of the standard. These are the elements that auditors will examine most closely, and they are the areas where organisations must demonstrate robust implementation to achieve and maintain certification.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Core Requirements</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Environmental Policy</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The environmental policy is the foundation of the EMS. It must be appropriate to the purpose and context of the organisation, provide a framework for setting environmental objectives, include a commitment to protection of the environment (including prevention of pollution), include a commitment to fulfil compliance obligations, and include a commitment to continual improvement. The policy must be documented, communicated within the organisation, and available to interested parties (including the public). It is not a generic statement &mdash; it must reflect the specific environmental context and significant aspects of the organisation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Aspects and Impacts Register</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The organisation must identify the environmental aspects of its activities, products, and services that it can control or influence, and determine which aspects have or can have a significant environmental impact. This is documented in an <strong>aspects and impacts register</strong>. For each aspect, the register records: the activity or process, the aspect itself, the associated impact(s), the conditions (normal, abnormal, emergency), the significance assessment, and the controls in place. Significance is typically assessed using a scoring methodology that considers factors such as scale, severity, probability, duration, reversibility, and the existence of legal requirements.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Legal Compliance Register</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The organisation must identify and have access to the compliance obligations related to its environmental aspects. These include legislative and regulatory requirements (e.g., Environmental Protection Act 1990, Environmental Permitting Regulations 2016, Hazardous Waste Regulations 2005), industry codes of practice, contractual requirements, and any voluntary commitments. The legal compliance register must be maintained and kept up to date as legislation changes. The organisation must periodically evaluate compliance with these obligations and maintain documented evidence of the evaluation results.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Objectives and Targets</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Environmental objectives must be established for relevant functions and levels of the organisation, consistent with the environmental policy. Objectives must be measurable (where practicable), monitored, communicated, and updated as appropriate. For each objective, the organisation must determine what will be done, what resources will be required, who will be responsible, when it will be completed, and how the results will be evaluated. Targets are the specific, quantified performance requirements that support the achievement of objectives &mdash; for example, &ldquo;reduce skip waste to landfill by 25% by December 2026.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Operational Controls</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The organisation must establish operational controls for processes associated with its significant environmental aspects. These controls ensure that activities are carried out in a way that prevents or minimises adverse environmental impacts. Examples include: waste segregation procedures, spill response kits and procedures, dust suppression measures, noise management plans, energy management procedures, and procurement specifications for environmentally preferable materials. Controls must also address operations carried out by contractors and suppliers that can influence the organisation&rsquo;s environmental performance.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Emergency Preparedness</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The organisation must identify potential emergency situations and potential accidents that can have an environmental impact, and plan how it will respond. This includes fuel and chemical spills, uncontrolled emissions to air, discharges to watercourses, fire (and the environmental impact of fire-fighting water run-off), and failure of pollution prevention infrastructure. Emergency procedures must be established, tested periodically (through drills and exercises), and revised based on lessons learned. Equipment such as spill kits, bunds, and absorbent materials must be maintained and accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: EMAS                                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">04</span>
              EMAS (Eco-Management and Audit Scheme)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Eco-Management and Audit Scheme (EMAS)</strong> is a voluntary environmental management instrument developed by the European Commission. It was first established in 1993 and has been revised several times, most recently under Regulation (EC) No 1221/2009 (as amended). EMAS builds upon ISO 14001 but adds additional requirements that make it a more demanding &mdash; and in many respects more rigorous &mdash; scheme.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">EMAS vs ISO 14001: Key Differences</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Environmental Statement (Public Disclosure)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The most significant difference is that EMAS requires organisations to produce and publish an <strong>environmental statement</strong> that is publicly available. This statement must include: a description of the organisation and its activities, the environmental policy, a description of all significant environmental aspects, a summary of quantitative data on environmental performance (including core indicators for energy efficiency, material efficiency, water usage, waste generation, biodiversity, and emissions), objectives and targets, and a declaration of legal compliance. The statement must be validated by an accredited EMAS environmental verifier. ISO 14001 has no equivalent public disclosure requirement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Legal Compliance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      EMAS requires demonstrated legal compliance as a prerequisite for registration. The organisation must provide evidence that it is in full compliance with all applicable environmental legislation. ISO 14001 requires a commitment to compliance and periodic compliance evaluation, but does not require demonstrated full compliance as a condition of certification. This distinction is important &mdash; an organisation can be certified to ISO 14001 whilst having minor compliance gaps that it is actively working to close, whereas EMAS registration requires those gaps to be closed before registration is granted.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Employee Involvement</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      EMAS places a stronger emphasis on employee involvement in the environmental management process. Whilst ISO 14001 requires awareness and competence, EMAS specifically requires active employee participation in the identification of environmental aspects, the development of objectives and targets, and the improvement of environmental performance. This participatory approach recognises that the people doing the work are often best placed to identify practical improvements and that engagement increases the likelihood of successful implementation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Core Performance Indicators</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      EMAS requires organisations to report on specific core performance indicators, providing standardised metrics that allow comparison between organisations and tracking of trends over time. These core indicators cover: energy efficiency (total energy consumption and proportion from renewables), material efficiency (annual mass-flow of key materials), water (total annual water consumption), waste (total annual generation by type and disposal route), biodiversity (land use in terms of built-up area), and emissions (total annual greenhouse gas emissions and total annual emissions to air). ISO 14001 does not prescribe specific indicators.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">EMAS in the UK Post-Brexit</p>
                <p className="text-sm text-white/80">
                  Following the UK&rsquo;s departure from the European Union, EMAS is no longer directly available for UK-based organisations (as it is an EU regulation). However, the UK government has retained the ability to recognise EMAS under its environmental regulatory framework, and organisations that previously held EMAS registration may choose to transition to ISO 14001 or maintain EMAS through an EU-based subsidiary. For UK electrical contractors, ISO 14001 remains the most relevant and widely recognised EMS standard. Some international clients and projects may still reference EMAS, so understanding it remains professionally valuable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Implementing an EMS on Site                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">05</span>
              Implementing an EMS on Site
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Implementing an EMS on a construction site requires a practical, structured approach. The system must be proportionate to the scale and complexity of the project, relevant to the actual environmental risks, and integrated into the day-to-day management of the site rather than existing as a separate administrative burden. The following steps outline the implementation process.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Implementation Steps</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 1: Environmental Aspects Identification</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Conduct a thorough review of all site activities and identify every environmental aspect. Walk the site, review method statements, consult with operatives, and consider the full lifecycle of activities from mobilisation through construction to demobilisation. For an electrical contractor, typical aspects include: energy consumption (site accommodation, power tools, temporary lighting), waste generation (cable off-cuts, packaging, redundant equipment, excavation spoil), use of hazardous substances (solvents, flux, PVC adhesive, cable-pulling lubricant), emissions from generators and vehicles, noise from power tools and generators, dust from chasing and drilling, and water use for testing, cleaning, and dust suppression.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 2: Significant Impacts Assessment</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Not all environmental aspects are equally significant. The significance assessment process evaluates each aspect using defined criteria to determine which require the most attention and resources. A typical scoring methodology considers: the scale of the impact (how large an area or volume is affected), the severity (how damaging the impact is), the probability of occurrence (how likely it is to happen), the duration (how long the impact persists), the reversibility (whether the impact can be undone), whether legal requirements apply, and stakeholder concern (whether the aspect is of particular concern to neighbours, regulators, or clients). Aspects that score above a defined threshold are classified as &ldquo;significant&rdquo; and must have specific objectives, targets, and operational controls assigned to them.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 3: Setting Objectives and Targets</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      For each significant environmental aspect, set measurable objectives and specific targets. Objectives should be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. Examples for an electrical installation project: &ldquo;Achieve 95% diversion of waste from landfill by project completion,&rdquo; &ldquo;Reduce energy consumption in site accommodation by 15% compared to the previous project,&rdquo; &ldquo;Zero environmental incidents resulting in enforcement action.&rdquo; Targets break these objectives into actionable steps with assigned responsibilities and deadlines.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 4: Establishing Procedures</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Develop practical procedures for managing each significant environmental aspect. Procedures should be concise, clear, and written for the people who will use them &mdash; not for auditors. A good environmental procedure includes: the purpose (why the procedure exists), the scope (what activities it covers), the responsibilities (who does what), the method (step-by-step instructions), the records (what must be documented), and the emergency response (what to do if something goes wrong). Procedures should be displayed in relevant locations &mdash; for example, waste segregation instructions at the waste compound, spill response procedures near fuel and chemical storage areas.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 5: Training and Awareness</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      All site personnel must receive environmental awareness training appropriate to their role. At a minimum, every person on site should understand: the environmental policy and what it means for their work, the significant environmental aspects relevant to their activities, the procedures they must follow, the consequences of departure from procedures (both environmental and disciplinary), and how to report environmental incidents and concerns. Supervisors and managers require more detailed training on the EMS, their specific responsibilities, monitoring requirements, and incident investigation procedures. Training records must be maintained as documented evidence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Step 6: Documentation and Record-Keeping</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EMS requires documented information to be created, maintained, and retained. This includes: the environmental policy, the aspects and impacts register, the legal compliance register, objectives and targets, operational procedures, training records, monitoring and measurement records, audit reports, management review minutes, and records of incidents and corrective actions. Documentation should be proportionate &mdash; ISO 14001:2015 deliberately avoids prescribing specific documents, allowing organisations flexibility. The emphasis is on having the documented information necessary to ensure the system is effective, not on creating paperwork for its own sake. Electronic systems are preferred over paper-based systems for ease of updating, accessibility, and searchability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Environmental Auditing                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">06</span>
              Environmental Auditing
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environmental auditing is a critical component of any EMS. Audits provide systematic, independent, and documented assessment of whether the EMS is being implemented effectively, whether it conforms to the requirements of the standard, and whether it is achieving the desired environmental outcomes. There are two main types of environmental audit: <strong>internal audits</strong> (conducted by the organisation itself) and <strong>external audits</strong> (conducted by an independent certification body).
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Internal Audits</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The organisation must conduct internal audits at planned intervals to provide information on whether the EMS conforms to the organisation&rsquo;s own requirements and the requirements of ISO 14001, and is effectively implemented and maintained.
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Audit programme</strong> &mdash; the organisation must establish an audit programme that defines the frequency, methods, responsibilities, and reporting requirements. The programme should ensure all elements of the EMS are audited within a defined cycle (typically 12 months), with more frequent auditing of high-risk areas or areas with a history of non-conformance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Auditor competence</strong> &mdash; internal auditors must be competent and impartial. They should not audit their own work. Auditor training (typically to ISO 19011 standard) ensures they understand audit principles, techniques, and reporting requirements. Many organisations train multiple internal auditors so that audits can be conducted by someone independent of the area being audited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Audit planning</strong> &mdash; each individual audit should be planned in advance, with a defined scope, criteria, and schedule. The audit plan should be communicated to the auditee so that relevant personnel and documentation are available. An opening meeting sets expectations and a closing meeting presents preliminary findings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">External Audits (Certification Body)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  External audits are conducted by a UKAS-accredited certification body. These provide independent, third-party verification that the EMS meets the requirements of ISO 14001.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Stage 1 Audit (Document Review)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The Stage 1 audit assesses the organisation&rsquo;s readiness for certification. The auditor reviews the EMS documentation to verify that it meets the requirements of the standard, evaluates the organisation&rsquo;s understanding of the requirements, and identifies any areas of concern that need to be addressed before the Stage 2 audit. The Stage 1 audit may be conducted off-site or on-site.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Stage 2 Audit (Implementation Audit)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The Stage 2 audit is the main certification audit, conducted on-site. The auditor examines the implementation and effectiveness of the EMS through interviews with personnel at all levels, observation of activities and processes, review of records and documented evidence, and verification that the EMS is achieving its intended outcomes. This is the audit that determines whether certification is granted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Non-Conformance &amp; Corrective Action</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  When an audit identifies a failure to meet a requirement, it is raised as a <strong>non-conformance</strong> (also called a non-conformity):
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Major Non-Conformance", desc: "A systematic failure or absence of a required element that significantly undermines the EMS. Examples: no environmental policy, no aspects register, no internal audit programme, systematic failure to monitor legal compliance. A major NC will prevent initial certification or may trigger suspension of an existing certificate." },
                    { label: "Minor Non-Conformance", desc: "An isolated lapse or partial failure that does not undermine the system as a whole. Examples: a single training record missing, one monitoring reading not recorded, a procedure not updated after a minor change. Minor NCs require corrective action but do not prevent certification." },
                    { label: "Corrective Action Process", desc: "For each NC, the organisation must: investigate the root cause (not just the symptom), define corrective actions to address the root cause and prevent recurrence, assign responsibility and timescales, implement the actions, and verify effectiveness. The corrective action record is reviewed at the next audit." },
                    { label: "Management Review", desc: "Audit findings (both internal and external) must be reported to top management as an input to the management review process. This ensures that management is aware of system performance, non-conformances, and improvement opportunities, and can allocate resources and set priorities accordingly." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Continual Improvement                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">07</span>
              Continual Improvement
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Continual improvement is the fundamental purpose of an EMS. It is not about achieving perfection &mdash; it is about consistently and systematically enhancing environmental performance over time. ISO 14001 requires the organisation to continually improve the suitability, adequacy, and effectiveness of the EMS to enhance environmental performance. This section examines the tools and mechanisms that drive continual improvement.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Performance Indicators (KPIs)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  KPIs are quantified metrics that track environmental performance over time. Effective environmental KPIs for a construction or electrical contracting organisation include:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Waste diversion rate", desc: "Percentage of total waste diverted from landfill through recycling, recovery, or reuse. Industry target: 90%+ diversion from landfill." },
                    { label: "Energy intensity", desc: "Energy consumption per unit of output (e.g., kWh per £100k turnover, or kWh per m² of installation area). Tracks efficiency rather than just volume." },
                    { label: "Carbon emissions", desc: "Total CO₂ equivalent emissions (Scope 1, 2, and where practical Scope 3). Increasingly required by clients and frameworks." },
                    { label: "Water consumption", desc: "Total water usage per project or per unit of activity. Especially important in water-stressed areas or for activities requiring significant water use." },
                    { label: "Environmental incidents", desc: "Number and severity of environmental incidents (spills, pollution events, complaints). Target: zero incidents requiring regulatory notification." },
                    { label: "Legal compliance", desc: "Percentage compliance score from compliance evaluations. Target: 100% compliance with all applicable environmental legislation." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Benchmarking &amp; Targets</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Benchmarking compares the organisation&rsquo;s environmental performance against relevant reference points:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Internal benchmarking</strong> &mdash; comparing performance between different projects, sites, or time periods within the same organisation. This identifies best practice and underperformance within the organisation&rsquo;s own operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>External benchmarking</strong> &mdash; comparing performance against industry averages, sector leaders, or published standards. Sources include WRAP (Waste and Resources Action Programme), CIRIA (Construction Industry Research and Information Association), and BRE (Building Research Establishment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong>Client benchmarking</strong> &mdash; many clients publish environmental performance expectations or targets. Meeting or exceeding these benchmarks strengthens the commercial relationship and supports future tender submissions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Management Review</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The management review is the mechanism by which top management maintains oversight of the EMS and drives continual improvement. ISO 14001 specifies both the required inputs and expected outputs:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Management Review Inputs</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Status of actions from previous reviews, changes in external/internal issues, the needs and expectations of interested parties, significant environmental aspects, risks and opportunities, the extent to which objectives have been met, environmental performance data including KPI trends, the status of corrective actions, audit results (internal and external), compliance evaluation results, communications from interested parties (including complaints), and opportunities for continual improvement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Management Review Outputs</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Conclusions on the continuing suitability, adequacy, and effectiveness of the EMS, decisions related to continual improvement opportunities, decisions related to any need for changes to the EMS (including resources, policy, objectives, and other elements), actions needed when objectives have not been met, opportunities to improve integration of the EMS with other business processes, and any implications for the strategic direction of the organisation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Learning from Incidents</p>
                <p className="text-sm text-white/80">
                  Environmental incidents &mdash; whether actual (a spill, an unauthorised discharge, a waste duty of care breach) or near-misses (a situation that could have resulted in an incident) &mdash; are valuable sources of learning. Every incident should be investigated to determine its root cause (not just the immediate cause), and the findings should be used to improve the EMS. Near-miss reporting is particularly valuable because it provides insight into system weaknesses before they result in actual harm. An organisation that actively encourages near-miss reporting and learns from every incident will improve more quickly than one that only reacts to serious events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Practical Benefits                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">08</span>
              Practical Benefits
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Whilst the environmental benefits of an EMS are self-evident, the practical business benefits are equally compelling. For electrical contractors operating in an increasingly competitive and environmentally conscious market, EMS certification delivers tangible commercial, legal, and operational advantages.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Business Benefits of EMS Certification</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Tender Qualification</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      ISO 14001 certification is increasingly a mandatory pre-qualification requirement for tenders, particularly in the public sector, for major contractors, and within framework agreements. Without certification, organisations are excluded from the tender process entirely, regardless of price or technical competence. Certification opens doors to contracts that would otherwise be inaccessible. Major frameworks such as Procure Partnerships, Pagabo, Crown Commercial Service, and NHS Shared Business Services all include environmental management requirements in their pre-qualification criteria.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Client Requirements</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Beyond formal tender requirements, many principal contractors and clients require their supply chain to demonstrate environmental management capability as a condition of appointment. This may be expressed as a requirement for ISO 14001 certification, or as a broader requirement to provide evidence of a functioning EMS. Even where certification is not mandated, having it demonstrates a level of environmental management maturity that gives clients confidence in the subcontractor&rsquo;s ability to manage environmental risks on their projects.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Legal Compliance Assurance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EMS provides a systematic mechanism for identifying, accessing, and complying with environmental legislation. The legal compliance register ensures the organisation knows what laws apply to its activities, and the periodic compliance evaluation process verifies that those laws are being met. This significantly reduces the risk of inadvertent non-compliance, which can result in Environment Agency enforcement notices, prosecution, unlimited fines (under the Environmental Permitting Regulations 2016), and criminal records for responsible individuals. The &ldquo;due diligence&rdquo; defence is strengthened by evidence of a systematic approach to compliance management.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cost Savings</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A well-implemented EMS consistently delivers measurable cost savings. Waste reduction: measuring and managing waste streams typically reduces waste volumes by 15&ndash;30%, directly reducing skip hire and landfill tax costs (currently &pound;103.70 per tonne for standard rated waste). Energy efficiency: systematic monitoring typically yields 10&ndash;20% energy cost savings through identification of inefficiencies and behaviour change. Material efficiency: tracking material usage reduces over-ordering and wastage. These savings are recurring and cumulative, typically delivering a payback period of 12&ndash;24 months on the EMS implementation investment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Risk Reduction</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Proactive environmental management reduces the risk of pollution incidents, regulatory enforcement, project delays caused by environmental non-compliance, damage to watercourses or protected habitats, community complaints and planning objections, and insurance claims. Each of these risks carries significant financial and reputational consequences. A pollution incident requiring clean-up can cost tens or hundreds of thousands of pounds, and a prosecution can result in unlimited fines plus the costs of legal defence. The EMS provides a structured approach to identifying and controlling these risks before they materialise.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Reputation &amp; Competitive Advantage</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Environmental credentials are increasingly important to clients, investors, employees, and the wider public. ISO 14001 certification provides independent, third-party verification that the organisation takes environmental management seriously. This strengthens the organisation&rsquo;s reputation, differentiates it from competitors who lack certification, supports bids for environmentally sensitive projects, attracts environmentally conscious employees (particularly younger workers entering the industry), and demonstrates corporate social responsibility. In a market where technical competence and price are often similar between competitors, environmental credentials can be the differentiating factor that wins contracts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  DIAGRAM: ISO 14001 PDCA Cycle with Clause Mapping            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
            <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              ISO 14001 PDCA Cycle with Clause Mapping
            </h3>
            <div className="space-y-3">
              {/* Centre: Leadership */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-emerald-400">LEADERSHIP &amp; COMMITMENT</p>
                <p className="text-[10px] text-white/50 mt-1">Clause 5 &mdash; Environmental policy, roles, responsibilities, authorities</p>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>

              {/* PLAN */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-emerald-400">PLAN</p>
                <p className="text-[10px] text-white/50 mt-1">Clause 4 (Context) &amp; Clause 6 (Planning)</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Globe className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Context</p>
                  <p className="text-[10px] text-white/50">Internal/external issues, interested parties, scope</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <ClipboardList className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Aspects &amp; Impacts</p>
                  <p className="text-[10px] text-white/50">Identification, significance assessment, compliance obligations</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Target className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Objectives</p>
                  <p className="text-[10px] text-white/50">Measurable targets, action plans, resources</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>

              {/* DO */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-emerald-400">DO</p>
                <p className="text-[10px] text-white/50 mt-1">Clause 7 (Support) &amp; Clause 8 (Operation)</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-center">
                  <FileText className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-400">Support</p>
                  <p className="text-[10px] text-white/50">Resources, competence, awareness, communication, documents</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-center">
                  <Building className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-400">Operational Controls</p>
                  <p className="text-[10px] text-white/50">Procedures, work instructions, lifecycle perspective</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-center">
                  <Leaf className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-400">Emergency Preparedness</p>
                  <p className="text-[10px] text-white/50">Spill response, pollution prevention, drills</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>

              {/* CHECK */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-emerald-400">CHECK</p>
                <p className="text-[10px] text-white/50 mt-1">Clause 9 (Performance Evaluation)</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <BarChart3 className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Monitoring</p>
                  <p className="text-[10px] text-white/50">KPIs, measurement, compliance evaluation</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <Search className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Internal Audit</p>
                  <p className="text-[10px] text-white/50">Planned programme, competent auditors, NC reporting</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <BookOpen className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Management Review</p>
                  <p className="text-[10px] text-white/50">Inputs, outputs, decisions, resource allocation</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>

              {/* ACT */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-3 text-center">
                <p className="text-xs font-bold text-emerald-400">ACT</p>
                <p className="text-[10px] text-white/50 mt-1">Clause 10 (Improvement)</p>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-4 bg-emerald-500/30" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <TrendingUp className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Corrective Action</p>
                  <p className="text-[10px] text-white/50">Root cause analysis, prevent recurrence</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <RefreshCw className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Continual Improvement</p>
                  <p className="text-[10px] text-white/50">Enhance suitability, adequacy, effectiveness</p>
                </div>
              </div>

              <p className="text-xs text-white/50 text-center mt-4">
                The cycle repeats continuously &mdash; each iteration builds on the previous one, driving ongoing improvement in environmental performance.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  DIAGRAM: EMS Implementation Steps Flowchart                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
            <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Building className="h-4 w-4" />
              EMS Implementation Steps Flowchart
            </h3>
            <div className="space-y-3">
              {[
                { step: "1", title: "Initial Environmental Review", desc: "Baseline assessment of current environmental performance, legal compliance status, and existing practices", icon: Search },
                { step: "2", title: "Environmental Policy", desc: "Top management commits to protection of the environment, compliance, and continual improvement", icon: FileText },
                { step: "3", title: "Aspects & Impacts Identification", desc: "Systematic identification of all environmental aspects and assessment of their significance", icon: ClipboardList },
                { step: "4", title: "Legal Compliance Register", desc: "Identify all applicable environmental legislation and establish a compliance evaluation process", icon: ShieldCheck },
                { step: "5", title: "Objectives, Targets & Programmes", desc: "Set measurable environmental objectives with action plans, responsibilities, and timescales", icon: Target },
                { step: "6", title: "Operational Controls & Procedures", desc: "Develop and implement procedures for managing significant aspects during all conditions", icon: Building },
                { step: "7", title: "Training & Awareness", desc: "Ensure all personnel are competent and aware of their environmental responsibilities", icon: BookOpen },
                { step: "8", title: "Monitoring, Auditing & Review", desc: "Track KPIs, conduct audits, evaluate compliance, and review the system at management level", icon: BarChart3 }
              ].map((item, i) => (
                <div key={i}>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <item.icon className="h-4 w-4 text-emerald-400" />
                        <p className="text-xs font-bold text-white">{item.title}</p>
                      </div>
                      <p className="text-[10px] text-white/50">{item.desc}</p>
                    </div>
                  </div>
                  {i < 7 && (
                    <div className="flex justify-center">
                      <div className="w-px h-3 bg-emerald-500/30" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loop-back arrow */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-2 text-center mt-2">
                <RefreshCw className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-emerald-400">CYCLE REPEATS &mdash; CONTINUAL IMPROVEMENT</p>
                <p className="text-[10px] text-white/50">Review outputs feed back into planning for the next cycle</p>
              </div>

              <p className="text-xs text-white/50 text-center mt-4">
                Implementation is not a linear process &mdash; later steps may reveal the need to revisit and refine earlier steps. The entire system matures over successive PDCA cycles.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-6">
              Next: Module 6
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
